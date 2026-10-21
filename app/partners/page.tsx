import type { Metadata } from "next";
import Image from "next/image";
import { InnerHero } from "../page-parts";
import { SiteFrame } from "../site-shell";

export const metadata: Metadata = { title: "Partners", description: "Organizations working with SATEV Group and RevoV.", alternates: { canonical: "/partners" } };
const partners = [{ name: "Coca-Cola", image: "/partner-cocacola.png" }, { name: "Elias", image: "/partner-elias.png" }, { name: "AASTU", image: "/partner-aastu.png" }, { name: "SantimPay", image: "/partner-santimpay.png" }];

export default function PartnersPage() {
  return <SiteFrame><InnerHero eyebrow="OUR PARTNERS" title="Built together." summary="RevoV moves forward through collaboration with organizations that understand products, payments, campuses, and customers." />
    <section className="partners-page-grid">{partners.map((partner, index) => <article key={partner.name}><span>0{index + 1}</span><Image src={partner.image} alt={partner.name} width={300} height={180} quality={95} /><h2>{partner.name}</h2></article>)}</section>
    <section className="partner-callout"><p>PARTNERSHIPS</p><h2>Have a location, platform, or idea that fits RevoV?</h2><a href="/contact">Talk with our team</a></section>
  </SiteFrame>;
}
