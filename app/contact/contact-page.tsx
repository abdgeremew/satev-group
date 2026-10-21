"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowLeft, Mail, Send } from "lucide-react";
import { SiteFrame } from "../site-shell";

export default function ContactPage() {
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const [amharic, setAmharic] = useState(false);
  const name = amharic ? "ስምዎ" : "Your name";
  const email = amharic ? "ኢሜይልዎ" : "Your email";
  const message = amharic ? "እንዴት ልንረዳዎት እንችላለን?" : "Tell us how we can help";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting"); setFeedback("");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(form).entries()), kind: "contact" }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) throw new Error(result?.error || "Unable to send your message. Please email contact@satev.tech.");
      form.reset(); setStatus("success");
      setFeedback(amharic ? "እናመሰግናለን። በቅርቡ እንገናኛለን።" : "Thanks. We will be in touch shortly.");
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Unable to send your message. Please email contact@satev.tech.");
    }
  }

  return <SiteFrame>
    <main className="contact-page" lang={amharic ? "am" : "en"}>
    <section className="contact-section section-shell" aria-labelledby="contact-heading">
      <div className="contact-copy"><Link className="back-to-main" href="/"><ArrowLeft size={18} />{amharic ? "ወደ መነሻ" : "Back to main"}</Link><p className="section-label">{amharic ? "ያግኙን" : "Contact us"}</p><h1 id="contact-heading">{amharic ? "ቀጣዩን አብረን እንገንባ።" : "Let’s build the next useful thing."}</h1><p>{amharic ? "ጥያቄ፣ የአጋርነት ሀሳብ ወይም የRevoV ጭነት እቅድ አለዎት? እኛን ያነጋግሩ።" : "Have a question, partnership idea, or a RevoV deployment in mind? We would love to hear from you."}</p><a className="contact-email" href="mailto:contact@satev.tech"><Mail size={17} />contact@satev.tech</a><button className="contact-language" type="button" onClick={() => setAmharic(!amharic)}>EN / አማ</button></div>
      <form className="contact-form" onSubmit={submit}>
        <label className="form-trap" aria-hidden="true">Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
        <label><span>{name}</span><input name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder={name} /></label>
        <label><span>{email}</span><input name="email" required type="email" maxLength={254} autoComplete="email" placeholder={email} /></label>
        <label><span>{message}</span><textarea name="message" required minLength={10} maxLength={5000} rows={5} placeholder={message} /></label>
        <button className="start-button" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "…" : amharic ? "መልዕክት ላክ" : "Send message"}<Send size={17} /></button>
        <p role="status" aria-live="polite" className={`form-message ${status}`}>{feedback}</p>
      </form>
    </section></main>
  </SiteFrame>;
}
