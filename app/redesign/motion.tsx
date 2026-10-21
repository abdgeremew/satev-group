"use client";

import { useEffect } from "react";
import Image from "next/image";

export function ScrollMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".rd-page .rd-split > *, .rd-page .rd-centered, .rd-page .rd-feature-band, .rd-page .rd-capabilities > article, .rd-page .rd-solution, .rd-page .rd-team-grid > article, .rd-page .rd-gallery-grid > a, .rd-page .rd-contact-box"));
    let observer: IntersectionObserver | undefined;
    const reset = () => { observer?.disconnect(); targets.forEach(el => { el.removeAttribute("data-reveal"); el.removeAttribute("data-visible"); el.style.removeProperty("--reveal-delay"); }); };
    const start = () => {
      reset();
      if (preference.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.visible = "true"; observer?.unobserve(entry.target); }
      }), { threshold: 0.08 });
      targets.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) return;
        const siblingIndex = Array.from(el.parentElement?.children ?? []).indexOf(el);
        el.dataset.reveal = el.parentElement?.classList.contains("rd-split") ? (siblingIndex === 0 ? "left" : "right") : "up";
        el.style.setProperty("--reveal-delay", `${Math.min(siblingIndex % 4, 3) * 75}ms`);
        observer?.observe(el);
      });
    };
    start(); preference.addEventListener("change", start);
    return () => { reset(); preference.removeEventListener("change", start); };
  }, []);

  useEffect(() => {
    const navigation = Array.from(document.querySelectorAll<HTMLAnchorElement>(".approved-main-nav a[href^='#']"));
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".rd-approved-page section[id]"));
    const navForSection: Record<string, string> = {
      home: "home", about: "about", revov: "solutions", capabilities: "solutions",
      partners: "partners", solutions: "solutions", journey: "journey", team: "journey", gallery: "journey",
    };
    let frame = 0;
    const update = () => {
      frame = 0;
      const marker = Math.max(120, window.innerHeight * .3);
      let current = "home";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= marker) current = navForSection[section.id] ?? current;
      }
      for (const link of navigation) {
        const active = link.getAttribute("href") === `#${current}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}

const partners = [["cocacola", "Coca-Cola"], ["elias", "Elias"], ["aastu", "AASTU"], ["santimpay", "SantimPay"]];
export function PartnerMotion() {
  return <div className="rd-partner-carousel"><div className="rd-partner-window"><div className="rd-partner-track">{[0, 1].map(copy => <div className="rd-partner-set" key={copy} aria-hidden={copy === 1 ? true : undefined}>{partners.map(([key, name]) => <div className="rd-partner-card" key={key}><Image src={`/partner-${key}-trim.avif`} alt={copy === 0 ? name : ""} loading="lazy" decoding="async" width={600} height={240} quality={95} sizes="(max-width: 800px) 190px, 265px"/></div>)}</div>)}</div></div></div>;
}
