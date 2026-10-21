"use client";

import { useEffect, useRef, useState } from "react";

const items = [
  ["home", "Home"],
  ["about", "About Us"],
  ["solutions", "Our Solutions"],
  ["journey", "Our Journey"],
  ["partners", "Partners"],
] as const;

export default function ApprovedMainNav() {
  const [active, setActive] = useState("home");
  const mobileMenu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    let frame = 0;
    const updateActive = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const header = document.querySelector<HTMLElement>(".approved-header");
        const marker = (header?.getBoundingClientRect().height ?? 80) + Math.min(100, window.innerHeight * 0.18);
        let current = "home";
        let currentTop = Number.NEGATIVE_INFINITY;
        for (const [id] of items) {
          const section = document.getElementById(id);
          const top = section?.getBoundingClientRect().top;
          if (top !== undefined && top <= marker && top > currentTop) {
            current = id;
            currentTop = top;
          }
        }
        setActive(current);
      });
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive, { passive: true });
    window.addEventListener("hashchange", updateActive);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
      window.removeEventListener("hashchange", updateActive);
    };
  }, []);

  const closeMobileMenu = () => {
    if (mobileMenu.current) mobileMenu.current.open = false;
  };

  return <>
    <nav className="approved-main-nav" aria-label="Main navigation">
      {items.map(([id, label]) => <a key={id} className={active === id ? "active" : undefined} aria-current={active === id ? "location" : undefined} href={`#${id}`}>{label}</a>)}
    </nav>
    <details className="approved-mobile-menu" ref={mobileMenu}>
      <summary>Menu</summary>
      <nav aria-label="Mobile navigation">
        {items.map(([id, label]) => <a key={id} className={active === id ? "active" : undefined} aria-current={active === id ? "location" : undefined} href={`#${id}`} onClick={closeMobileMenu}>{label}</a>)}
        <a href="/contact" onClick={closeMobileMenu}>Contact Us</a>
      </nav>
    </details>
  </>;
}
