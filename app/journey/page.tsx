import type { Metadata } from "next";
import Image from "next/image";
import { InnerHero } from "../page-parts";
import { SiteFrame } from "../site-shell";

export const metadata: Metadata = { title: "Our Journey", description: "Follow the development and launch of RevoV.", alternates: { canonical: "/journey" } };
const gallery = Array.from({ length: 6 }, (_, index) => `/gallery-${index + 1}.avif`);

export default function JourneyPage() {
  return <SiteFrame><InnerHero eyebrow="OUR JOURNEY" title="Learning by building." summary="Every prototype, installation, and customer interaction has helped turn RevoV into a stronger product." image="/revov-home-hero-vending-crop.avif" imageAlt="RevoV smart vending machine" />
    <section className="journey-timeline"><article><span>01 / LAUNCH</span><strong>June 2026</strong><p>Official RevoV launch</p></article><article><span>02 / DEMAND</span><strong>6+</strong><p>RevoV orders</p></article><article><span>03 / PIPELINE</span><strong>8+</strong><p>Orders in progress</p></article></section>
    <section className="field-gallery">{gallery.map((src, index) => <figure key={src}><Image src={src} alt="People using and discovering RevoV" width={448} height={570} quality={95} sizes="(max-width: 700px) 100vw, 33vw" /><figcaption><span>FIELD NOTE 0{index + 1}</span><strong>RevoV meets the real world.</strong></figcaption></figure>)}</section>
  </SiteFrame>;
}
