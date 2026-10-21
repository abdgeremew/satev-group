"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Headphones, Menu, MessageCircle, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigation = [
  { href: "/#home", id: "home", label: "Home" },
  { href: "/about", id: "about", label: "About" },
  { href: "/solutions", id: "solutions", label: "Our Solutions" },
  { href: "/partners", id: "partners", label: "Partners" },
  { href: "/contact", id: "contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [atHero, setAtHero] = useState(true);

  useEffect(() => {
    if (pathname !== "/") return;
    const syncHeroState = () => {
      const hero = document.getElementById("home");
      setAtHero(!hero || window.scrollY < Math.max(80, hero.offsetHeight - 120));
    };
    syncHeroState();
    window.addEventListener("scroll", syncHeroState, { passive: true });
    const sections = navigation.filter((item) => item.id === "home").map((item) => item.id).map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActive(visible.target.id);
    }, { rootMargin: "-30% 0px -55% 0px", threshold: [0.08, .25, .5] });
    sections.forEach((section) => observer.observe(section));
    return () => { observer.disconnect(); window.removeEventListener("scroll", syncHeroState); };
  }, [pathname]);

  return <header className={`site-header ${pathname === "/" && atHero ? "hero-header" : ""}`}>
    <Link className="brand" href="/#home" aria-label="SATEV Group home"><Image src="/satev-logo-transparent.png" alt="SATEV Group" width={160} height={45} priority quality={95} /></Link>
    <nav className={open ? "open" : ""} aria-label="Main navigation">
      {navigation.map((item) => <Link key={item.id} href={item.href} className={(item.href === "/#home" ? pathname === "/" && active === item.id : pathname === item.href) ? "active" : ""} onClick={() => { setActive(item.id); setOpen(false); }}>{item.label}</Link>)}
    </nav>
    <div className="header-actions">
      <Link className={`header-contact ${pathname === "/contact" ? "active" : ""}`} href="/contact" onClick={() => { setActive("contact"); setOpen(false); }}>Contact Us <ArrowRight size={20} /></Link>
      <button className="mobile-menu" type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
    </div>
  </header>;
}

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="footer-brand"><Image src="/satev-logo-transparent.png" alt="SATEV Group" width={160} height={45} quality={95} /><p>The ultimate engineering.</p><a href="mailto:contact@satev.tech">contact@satev.tech</a></div>
    <div><h4>Explore</h4><Link href="/about">About</Link><Link href="/solutions">Our Solutions</Link><Link href="/partners">Partners</Link><Link href="/contact">Contact</Link></div>
    <div><h4>Connect</h4><a href="https://www.linkedin.com/company/satev-group/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://www.instagram.com/satev_group" target="_blank" rel="noreferrer">Instagram</a><a href="https://t.me/Satev_Group" target="_blank" rel="noreferrer">Telegram</a><a href="https://www.tiktok.com/@satev_group" target="_blank" rel="noreferrer">TikTok</a></div>
    <Link className="footer-contact-button" href="/contact">Start a conversation</Link>
    <p className="copyright">© 2026 SATEV Group PLC. All rights reserved.</p>
  </footer>;
}

export function SupportButton() {
  const [open, setOpen] = useState(false);
  return <div className={`help-menu ${open ? "open" : ""}`}><div className="help-links"><a href="https://t.me/Revov_bot" target="_blank" rel="noreferrer"><MessageCircle size={18} /> Telegram support</a><a href="https://t.me/Revov_bot" target="_blank" rel="noreferrer">Report an issue</a></div><button className="help-button" type="button" onClick={() => setOpen(!open)}>{open ? <X size={19} /> : <Headphones size={19} />} Help</button></div>;
}

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return <main className="site-page"><SiteHeader />{children}<SiteFooter /><SupportButton /></main>;
}
