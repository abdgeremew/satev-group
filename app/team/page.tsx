import type { Metadata } from "next";
import Image from "next/image";
import { InnerHero } from "../page-parts";
import { SiteFrame } from "../site-shell";

export const metadata: Metadata = { title: "Team", description: "Meet the engineering and operations team behind SATEV Group.", alternates: { canonical: "/team" } };
const members = [{ image: "/team-1.avif", name: "Samuel Alemu", role: "Founder", detail: "AI & Mechatronics Engineer" }, { image: "/team-2.avif", name: "Ermias Tigistu", role: "Co-Founder / CPO", detail: "Mechatronics Engineer" }, { image: "/team-3.avif", name: "Natnael Tamirat", role: "COO", detail: "Mechatronics Engineer" }, { image: "/team-4.avif", name: "Abdi Geremew", role: "CTO", detail: "Software Engineer" }];

export default function TeamPage() {
  return <SiteFrame><InnerHero eyebrow="THE TEAM" title="Different disciplines. One product mindset." summary="Engineering, product, operations, and software work side by side from the earliest prototype to daily operation." />
    <section className="team-page-grid">{members.map((member, index) => <article key={member.name}><div><Image src={member.image} alt={member.name} fill quality={95} sizes="(max-width: 700px) 100vw, 25vw" /></div><span>0{index + 1}</span><h2>{member.name}</h2><p>{member.role}</p><small>{member.detail}</small></article>)}</section>
  </SiteFrame>;
}
