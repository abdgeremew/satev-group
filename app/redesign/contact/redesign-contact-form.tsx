"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function RedesignContactForm() {
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const [service, setService] = useState("General inquiry");

  useEffect(() => {
    const requestedService = new URLSearchParams(window.location.search).get("service");
    if (requestedService && ["RevoV", "Engineering services", "Software services"].includes(requestedService)) {
      const frame = window.requestAnimationFrame(() => setService(requestedService));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");
    setFeedback("");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(form).entries()), kind: "contact" }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) throw new Error(result?.error || "Unable to send your message. Please try again or email contact@satev.tech.");
      form.reset();
      setService("General inquiry");
      setStatus("success");
      setFeedback("Thanks. We will be in touch shortly.");
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Unable to send your message. Please email contact@satev.tech.");
    }
  }

  return <form className="rd-contact-form" onSubmit={submit}>
    <p className="rd-contact-form-title">Send our team a message</p>
    <label className="rd-contact-trap" aria-hidden="true">Leave this empty<input name="website" tabIndex={-1} autoComplete="off"/></label>
    <label>Your name<input name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder="Your name"/></label>
    <label>Your email<input name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@example.com"/></label>
    <label>What can we help with?<select name="service" value={service} onChange={event=>setService(event.target.value)}><option>General inquiry</option><option>RevoV</option><option>Engineering services</option><option>Software services</option><option>Partnership</option></select></label>
    <label>Your message<textarea name="message" required minLength={10} maxLength={5000} rows={5} placeholder="Tell us about your project or question"/></label>
    <button type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending..." : "Send message"}<ArrowRight size={18}/></button>
    <p className={`rd-contact-feedback ${status}`} role="status" aria-live="polite">{feedback}</p>
  </form>;
}
