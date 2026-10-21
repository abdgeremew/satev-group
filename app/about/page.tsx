import type { Metadata } from "next";
import { InnerHero, SplitStory } from "../page-parts";
import { SiteFrame } from "../site-shell";

export const metadata: Metadata = { title: "About", description: "Meet the multidisciplinary engineering company behind RevoV.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return <SiteFrame><InnerHero eyebrow="ABOUT SATEV" title="Engineering with a practical purpose." summary="We bring mechanical engineering, software, AI, robotics, and product design together to build systems people can depend on." image="/satev-about-logo.avif" imageAlt="SATEV Group" />
    <SplitStory image="/revov-home-hero-vending-crop.avif" alt="RevoV smart vending machine" eyebrow="HOW WE WORK" title="From first sketch to working product."><p>Our team handles research, prototyping, manufacturing, software, and deployment as one connected process. The result is faster learning and products shaped by real use.</p></SplitStory>
    <section className="principles-section"><article><span>01</span><h2>Focus</h2><p>IoT, AI, robotics, automation, software, and engineering design.</p></article><article><span>02</span><h2>Strength</h2><p>In-house, multidisciplinary engineering and rapid product development.</p></article><article><span>03</span><h2>Vision</h2><p>Build intelligent systems that improve industries and everyday life.</p></article><article><span>04</span><h2>Mission</h2><p>Develop scalable engineering solutions for Africa and the world.</p></article></section>
  </SiteFrame>;
}
