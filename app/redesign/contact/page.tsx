import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "../redesign.css";
import "../satev-approved-landing.css";
import "./contact.css";
import RedesignContactForm from "./redesign-contact-form";

export const metadata: Metadata = {
  title: "Contact SATEV Group",
  description: "Contact SATEV about RevoV, engineering, and software services.",
  robots: { index: false, follow: false },
};

export default function RedesignContactPage() {
  return <main className="rd-page rd-contact-page rd-approved-contact-page">
    <header className="approved-header"><div className="approved-shell approved-nav-shell"><Link className="approved-brand" href="/" aria-label="SATEV home"><Image src="/satev-logo-transparent.png" alt="SATEV Group" width={800} height={275} quality={95}/></Link><nav className="approved-main-nav" aria-label="Contact navigation"><Link href="/">Home</Link><Link href="/#about">About Us</Link><Link href="/#solutions">Our Solutions</Link><Link href="/#journey">Our Journey</Link><Link href="/#partners">Partners</Link></nav><Link className="approved-top-cta" href="/">Back to Site <span aria-hidden="true">→</span></Link><details className="approved-mobile-menu"><summary>Menu</summary><nav aria-label="Mobile contact navigation"><Link href="/">Home</Link><Link href="/#about">About Us</Link><Link href="/#solutions">Our Solutions</Link><Link href="/#journey">Our Journey</Link><Link href="/#partners">Partners</Link></nav></details></div></header>
    <section className="rd-contact-main"><div className="approved-shell"><div className="rd-contact-layout"><div className="rd-contact-copy"><p className="rd-label">LET’S TALK</p><h1>Let’s build something useful.</h1><p>Tell us about your RevoV, engineering, or software project. Our team will follow up with you.</p><a href="mailto:contact@satev.tech">contact@satev.tech</a></div><RedesignContactForm/></div></div></section>
    <Link className="rd-contact-back" href="/">← Back to SATEV Group</Link>
  </main>;
}

