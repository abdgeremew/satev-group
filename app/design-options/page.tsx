"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, CircleDot } from "lucide-react";
import { useState } from "react";

const concepts = [
  { id: "atlas", number: "01", name: "Atlas", description: "Editorial industrial", note: "Balanced · confident · scalable" },
  { id: "halo", number: "02", name: "Halo", description: "Bright precision", note: "Clean · open · corporate" },
  { id: "forge", number: "03", name: "Forge", description: "Obsidian technology", note: "Bold · premium · technical" },
  { id: "horizon", number: "04", name: "Horizon", description: "Immersive field story", note: "Human · cinematic · energetic" },
  { id: "gridline", number: "05", name: "Gridline", description: "Modular innovation", note: "Structured · modern · informative" },
] as const;

type ConceptId = (typeof concepts)[number]["id"];

export default function DesignOptionsPage() {
  const [selected, setSelected] = useState<ConceptId>("atlas");
  const concept = concepts.find((item) => item.id === selected)!;

  return <main className="concepts-page">
    <aside className="concept-picker">
      <div className="concept-picker-head">
        <Link href="/" className="concept-back"><ArrowLeft size={16} /> Current concept</Link>
        <p>SATEV design study</p>
        <h1>Choose a direction.</h1>
        <span>These are visual prototypes. Your current homepage is unchanged.</span>
      </div>
      <div className="concept-list" role="tablist" aria-label="Design concepts">
        {concepts.map((item) => <button key={item.id} type="button" role="tab" aria-selected={selected === item.id} className={selected === item.id ? "active" : ""} onClick={() => setSelected(item.id)}>
          <span className="concept-number">{item.number}</span><span><strong>{item.name}</strong><small>{item.description}</small></span>{selected === item.id ? <Check size={16} /> : null}
        </button>)}
      </div>
      <div className="concept-picker-foot"><strong>{concept.name}</strong><span>{concept.note}</span></div>
    </aside>

    <section className="concept-stage">
      <div className="concept-browserbar"><i /><i /><i /><span>satev.tech</span><em>Homepage concept · {concept.number}</em></div>
      <div className={`concept-canvas concept-${selected}`}>
        <ConceptHeader variant={selected} />
        {selected === "atlas" ? <Atlas /> : null}
        {selected === "halo" ? <Halo /> : null}
        {selected === "forge" ? <Forge /> : null}
        {selected === "horizon" ? <Horizon /> : null}
        {selected === "gridline" ? <Gridline /> : null}
      </div>
    </section>
  </main>;
}

function ConceptHeader({ variant }: { variant: ConceptId }) {
  return <header className="mock-header">
    <Image src="/satev-logo-transparent.png" alt="SATEV Group" width={150} height={42} priority />
    <nav><span>Company</span><span>RevoV</span><span>Journey</span><span>Team</span></nav>
    <button>{variant === "halo" ? "Talk to us" : "Contact"}<ArrowRight size={14} /></button>
  </header>;
}

function Atlas() {
  return <>
    <section className="mock-hero atlas-hero">
      <div className="mock-copy"><p>ETHIOPIAN ENGINEERING · BUILT FOR THE REAL WORLD</p><h2>The ultimate<br />engineering<span>.</span></h2><h3>SATEV builds intelligent systems that turn ambitious ideas into useful, dependable products.</h3><Link href="/#about">Discover SATEV <ArrowRight size={16} /></Link></div>
      <div className="atlas-machine"><Image src="/revov-hero-2026.avif" alt="RevoV smart vending machine" fill sizes="50vw" /></div>
      <div className="atlas-proof"><strong>600+</strong><span>Transactions on RevoV</span><strong>1.8M+</strong><span>Capital / ETB</span><strong>5+</strong><span>Partners</span></div>
    </section>
    <section className="mock-next atlas-next"><span>OUR FIRST PRODUCT</span><h3>Smart vending,<br />engineered here.</h3><p>Connected hardware. Dependable payments. Real-world utility.</p></section>
  </>;
}

function Halo() {
  return <>
    <section className="mock-hero halo-hero">
      <div className="halo-orbit"><div className="halo-image"><Image src="/revov-hero-2026.avif" alt="RevoV smart vending machine" fill sizes="46vw" /></div><span className="orbit-one" /><span className="orbit-two" /></div>
      <div className="mock-copy"><p>TECHNOLOGY, MADE USEFUL</p><h2>Engineering a smarter everyday.</h2><h3>From connected vending to intelligent systems, SATEV designs products around how people actually live and work.</h3><div><Link href="/#revov">Explore RevoV <ArrowRight size={16} /></Link><Link href="/#about" className="halo-secondary">About SATEV</Link></div></div>
      <div className="halo-cards"><article><CircleDot size={18} /><strong>IoT connected</strong><span>Designed to stay visible and dependable.</span></article><article><CircleDot size={18} /><strong>Locally built</strong><span>Engineering rooted in Ethiopia.</span></article></div>
    </section>
    <section className="mock-next halo-next"><p>Trusted progress</p><strong>600+</strong><span>transactions</span><strong>6+</strong><span>orders</span><strong>5+</strong><span>partners</span></section>
  </>;
}

function Forge() {
  return <>
    <section className="mock-hero forge-hero">
      <div className="forge-grid" />
      <div className="forge-index">S / 01</div>
      <div className="mock-copy"><p>SATEV GROUP / ADDIS ABABA</p><h2>WE BUILD<br /><span>SYSTEMS</span><br />THAT WORK.</h2><h3>IoT. Robotics. Automation. Software. One multidisciplinary team, engineered for scale.</h3><Link href="/#solutions">View our work <ArrowRight size={16} /></Link></div>
      <div className="forge-machine"><Image src="/revov-hero-2026.avif" alt="RevoV smart vending machine" fill sizes="45vw" /></div>
      <div className="forge-ticker"><span>REVOV</span><span>CONNECTED COMMERCE</span><span>LOCAL ENGINEERING</span><span>AFRICAN INNOVATION</span></div>
    </section>
    <section className="mock-next forge-next"><span>01 ,  PRODUCT</span><h3>RevoV changes how refreshment moves.</h3><div>Designed <b>here.</b> Built for <b>everywhere.</b></div></section>
  </>;
}

function Horizon() {
  return <>
    <section className="mock-hero horizon-hero">
      <Image src="/gallery-4.avif" alt="Customers discovering RevoV" fill sizes="100vw" />
      <div className="horizon-overlay" />
      <div className="horizon-count">01 <span>/ 03</span></div>
      <div className="mock-copy"><p>FROM ETHIOPIA TO EVERYDAY LIFE</p><h2>Technology people can see, touch, and trust.</h2><h3>SATEV turns complex engineering into simple experiences, starting with RevoV.</h3><Link href="/#journey">See our journey <ArrowRight size={16} /></Link></div>
      <div className="horizon-story"><span>NOW SHOWING</span><strong>RevoV in the field</strong><p>Real customers. Real transactions. Real momentum.</p></div>
    </section>
    <section className="mock-next horizon-next"><span>Built through experience</span><div><strong>600+</strong><small>Transactions</small></div><div><strong>8+</strong><small>In progress</small></div><p>Engineering gets better when it meets the real world.</p></section>
  </>;
}

function Gridline() {
  return <>
    <section className="mock-hero gridline-hero">
      <div className="gridline-title"><p>SATEV / ENGINEERING COMPANY</p><h2>Ideas become<br />infrastructure.</h2><h3>We design, manufacture, and deploy intelligent systems for Africa and beyond.</h3><Link href="/#capabilities">Our capabilities <ArrowRight size={16} /></Link></div>
      <div className="gridline-product"><span>PRODUCT / 001</span><div><Image src="/revov-home-hero-vending-crop.avif" alt="RevoV smart vending machine" fill sizes="42vw" /></div><strong>RevoV</strong><p>IoT-enabled smart vending</p></div>
      <div className="gridline-module module-a"><span>FOCUS</span><strong>IoT + AI</strong></div>
      <div className="gridline-module module-b"><span>PROOF</span><strong>600+</strong><small>transactions</small></div>
      <div className="gridline-module module-c"><span>BASE</span><strong>Addis Ababa</strong></div>
    </section>
    <section className="mock-next gridline-next"><span>One company. Multiple disciplines.</span><div>Robotics</div><div>Automation</div><div>Software</div><div>Product design</div></section>
  </>;
}
