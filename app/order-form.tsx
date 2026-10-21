"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function OrderForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = { ...Object.fromEntries(formData.entries()), kind: "order" };
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null) as { error?: string; success?: boolean } | null;
      if (!response.ok || !result?.success) throw new Error(result?.error || "Unable to submit your request. Please email contact@satev.tech.");
      form.reset();
      setStatus("success");
      setMessage("RevoV request received. Our team will contact you shortly.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to submit your request. Please email contact@satev.tech.");
    }
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div className="field-grid">
        <label>
          Full name
          <input name="name" required minLength={2} placeholder="Your name" />
        </label>
        <label>
          Work email
          <input name="email" type="email" required placeholder="name@company.com" />
        </label>
      </div>
      <div className="field-grid">
        <label>
          Phone
          <input name="phone" inputMode="tel" placeholder="+251..." />
        </label>
        <label>
          Organization
          <input name="company" placeholder="Campus, company, mall, or hub" />
        </label>
      </div>
      <div className="field-grid">
        <label>
          Request type
          <select name="requestType" required defaultValue="">
            <option value="" disabled>Select request type</option>
            <option>Deploy RevoV machine</option>
            <option>Pilot installation</option>
            <option>Purchase machine</option>
            <option>Partnership</option>
            <option>Maintenance or support</option>
          </select>
        </label>
        <label>
          Target location
          <input name="location" required placeholder="City and site name" />
        </label>
      </div>
      <label>
        Deployment brief
        <textarea name="brief" required minLength={20} rows={6} placeholder="Tell us the site, expected users, products, timeline, and quantity if known." />
      </label>
      <button className="submit-button" type="submit" disabled={status === "submitting"}>
        <Send size={18} aria-hidden="true" />
        {status === "submitting" ? "Submitting..." : "Send RevoV request"}
      </button>
      {message ? <p className={`form-message ${status}`}>{message}</p> : null}
    </form>
  );
}
