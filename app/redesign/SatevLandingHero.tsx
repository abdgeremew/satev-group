import Image from "next/image";
import ApprovedMainNav from "./ApprovedMainNav";
import { ResponsiveImage } from "../responsive-image";

const stats = [
  ["transactions", "1,800+", "RevoV transactions"],
  ["capital", "1.8M+", "Capital / ETB"],
  ["orders", "6+", "RevoV orders"],
  ["partners", "5+", "Partners"],
] as const;

function StatIcon({ type }: { type: (typeof stats)[number][0] }) {
  if (type === "transactions") {
    return <svg viewBox="0 0 32 32" aria-hidden="true"><ellipse cx="16" cy="8" rx="9" ry="4"/><path d="M7 8v7c0 2.2 4 4 9 4s9-1.8 9-4V8M7 15v7c0 2.2 4 4 9 4s9-1.8 9-4v-7"/></svg>;
  }
  if (type === "capital") {
    return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6 25h4V16H6zM14 25h4V11h-4zM22 25h4V6h-4z"/></svg>;
  }
  if (type === "orders") {
    return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 10h18v16H7zM10 10l2-5h8l2 5M12 16h8M16 13v6"/></svg>;
  }
  return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="11" cy="11" r="4"/><circle cx="22" cy="11" r="4"/><path d="M4 26v-3c0-4 3-7 7-7s7 3 7 7v3M17 18c1.3-1.2 3-2 5-2 4 0 7 3 7 7v3"/></svg>;
}

export default function SatevLandingHero() {
  return (
    <div className="approved-landing">
      <header className="approved-header">
        <div className="approved-shell approved-nav-shell">
          <a className="approved-brand" href="#home" aria-label="SATEV Group home">
          <Image src="/satev-logo-transparent.png" alt="SATEV Group" width={800} height={275} priority quality={95} />
          </a>
          <ApprovedMainNav />
          <a className="approved-top-cta" href="/contact">Get In Touch <span aria-hidden="true">→</span></a>
        </div>
      </header>

      <section id="home" className="approved-home-hero">
        <div className="approved-hero-photo" aria-hidden="true">
          <ResponsiveImage src="/revov-hero-panorama-v3.avif" alt="" fill fetchPriority="high" width={1983} height={793} sizes="100vw" />
        </div>
        <div className="approved-photo-shade" aria-hidden="true" />
        <div className="approved-tech-pattern" aria-hidden="true" />

        <div className="approved-shell approved-hero-shell">
          <div className="approved-hero-copy">
            <div className="approved-eyebrow">SATEV GROUP</div>
            <h1>The Ultimate <span>Engineering</span></h1>
            <p>
              We bring engineering, automation, AI, and IoT together to build useful technology.
              From RevoV smart vending to connected systems, SATEV Group turns ambitious ideas into
              practical products, designed and developed in Ethiopia.
            </p>
            <a className="approved-primary-cta" href="#solutions">Explore Our Solutions <span aria-hidden="true">→</span></a>
          </div>
        </div>

        <div className="approved-shell approved-stats-shell">
          <div className="approved-stats-card">
            {stats.map(([icon, value, label]) => (
              <div className="approved-stat-item" key={label}>
                <span className="approved-stat-icon"><StatIcon type={icon} /></span>
                <div><strong>{value}</strong><span>{label}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
