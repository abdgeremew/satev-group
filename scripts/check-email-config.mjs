const key = process.env.RESEND_API_KEY;
const sender = process.env.CONTACT_FROM_EMAIL;
const recipient = process.env.CONTACT_TO_EMAIL || "contact@satev.tech";

if (!key || !sender) {
  console.error("Missing RESEND_API_KEY or CONTACT_FROM_EMAIL.");
  process.exitCode = 1;
} else {
  const address = sender.match(/<([^<>]+)>/)?.[1] || sender;
  const senderDomain = address.split("@")[1];
  console.log(`Sender domain: ${senderDomain || "invalid"}`);
  console.log(`Recipient: ${recipient}`);
  try {
    const response = await fetch("https://api.resend.com/domains", {
      headers: { Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.log(`Resend domain lookup: HTTP ${response.status}${error.name ? ` (${error.name})` : ""}.`);
    } else {
      const result = await response.json();
      const domain = result.data?.find((item) => item.name === senderDomain);
      console.log(`Sender domain status: ${domain?.status || "not found"}`);
      if (!domain || domain.status !== "verified") process.exitCode = 1;
    }
  } catch {
    console.error("Could not reach Resend's domain API.");
    process.exitCode = 1;
  }
}
