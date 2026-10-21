const MAX_BYTES = 16000;
const unavailable = "Message delivery is temporarily unavailable. Please email contact@satev.tech.";
const json = (body, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

// Best-effort per-instance protection. Configure Vercel WAF rate limiting before launch.
export function createInquiryHandler({ env = () => process.env, send = fetch, now = Date.now } = {}) {
  const attempts = new Map();
  return async function handle(request) {
    if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin) return json({ error: "Invalid request origin." }, 403);
    if (!request.headers.get("content-type")?.startsWith("application/json")) return json({ error: "JSON required." }, 415);
    if (Number(request.headers.get("content-length")) > MAX_BYTES) return json({ error: "Message too large." }, 413);
    const time = now();
    for (const [key, item] of attempts) if (item.until <= time) attempts.delete(key);
    const ip = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || "local";
    const bucket = attempts.get(ip) || { count: 0, until: time + 600000 };
    if (bucket.count >= 5 || attempts.size >= 10000) return json({ error: "Too many attempts. Please try again in ten minutes." }, 429);
    bucket.count++;
    attempts.set(ip, bucket);
    let data;
    try {
      const reader = request.body?.getReader();
      if (!reader) return json({ error: "Request body required." }, 400);
      const chunks = [];
      let size = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > MAX_BYTES) { await reader.cancel(); return json({ error: "Message too large." }, 413); }
        chunks.push(value);
      }
      const bytes = new Uint8Array(size);
      let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
      data = JSON.parse(new TextDecoder().decode(bytes));
    } catch { return json({ error: "Invalid request." }, 400); }
    if (!data || typeof data !== "object" || Array.isArray(data)) return json({ error: "Invalid request." }, 400);
    if (data.website) return json({ error: "Unable to accept this submission." }, 400);
    const field = (key) => typeof data[key] === "string" ? data[key].trim() : "";
    const kind = field("kind"), name = field("name"), email = field("email"), phone = field("phone"), message = field("message"), service = field("service");
    const company = field("company"), requestType = field("requestType"), location = field("location"), brief = field("brief");
    if (!["contact", "waitlist", "order"].includes(kind) || name.length < 2 || name.length > 100 || [...name].some(char => char.charCodeAt(0) < 32) || email.length > 254 || service.length > 120 || /[\r\n]/.test(service) || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) {
      return json({ error: "Please enter your name and a valid email address." }, 400);
    }
    if (kind === "contact" && (message.length < 10 || message.length > 5000)) return json({ error: "Please enter a message between 10 and 5,000 characters." }, 400);
    if (kind === "waitlist" && (!/^[+\d\s().-]{7,30}$/.test(phone) || phone.replace(/\D/g, "").length < 7)) return json({ error: "Please enter a valid phone number." }, 400);
    if (kind === "order" && (requestType.length < 2 || requestType.length > 120 || location.length < 2 || location.length > 200 || brief.length < 20 || brief.length > 5000 || company.length > 120 || /[\r\n]/.test(requestType + location + company) || (phone && !/^[+\d\s().-]{7,30}$/.test(phone)))) {
      return json({ error: "Please complete the RevoV request with a valid location and a brief of at least 20 characters." }, 400);
    }
    const config = env();
    const recipient = config.CONTACT_TO_EMAIL || "contact@satev.tech";
    if (!config.RESEND_API_KEY || !config.CONTACT_FROM_EMAIL || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(recipient)) return json({ error: unavailable }, 503);
    try {
      const response = await send("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${config.RESEND_API_KEY}`, "Content-Type": "application/json" },
        signal: AbortSignal.timeout(10000),
        body: JSON.stringify({
          from: config.CONTACT_FROM_EMAIL,
          to: [recipient],
          reply_to: email,
          subject: kind === "waitlist" ? "RevoV waitlist signup" : kind === "order" ? "RevoV deployment request" : "SATEV website inquiry",
          text: [`Type: ${kind}`, `Name: ${name}`, `Email: ${email}`, kind === "waitlist" ? `Phone: ${phone}\nConsent: Requested RevoV updates via website waitlist.` : kind === "order" ? `Phone: ${phone || "Not supplied"}\nOrganization: ${company || "Not supplied"}\nRequest: ${requestType}\nLocation: ${location}\nBrief:\n${brief}` : `${service ? `Service: ${service}\n` : ""}Message:\n${message}`].join("\n\n"),
        }),
      });
      if (!response.ok) return json({ error: unavailable }, 502);
      const result = await response.json();
      if (!result.id) return json({ error: unavailable }, 502);
      return json({ success: true }, 202);
    } catch { return json({ error: unavailable }, 502); }
  };
}
