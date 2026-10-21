import type { Metadata } from "next";
import Link from "next/link";
import { ResponsiveImage } from "../responsive-image";
import { InnerHero } from "../page-parts";
import { SiteFrame } from "../site-shell";

export const metadata: Metadata = {
  title: "Our Solutions",
  description:
    "Explore SATEV Group’s RevoV smart vending, engineering, automation, IoT, and software solutions, designed and supported in Ethiopia.",
  alternates: { canonical: "/solutions" },
};

const solutions = [
  {
    title: "RevoV Smart Vending",
    description:
      "An IoT-enabled vending experience combining connected hardware, cashless payments, and convenient access for businesses, campuses, and public spaces.",
    image: "/revov-original-product.avif",
    alt: "RevoV smart vending machine by SATEV Group",
  },
  {
    title: "Engineering & Automation",
    description:
      "Mechanical and electrical systems, embedded electronics, automation, rapid prototyping, integration, testing, and installation.",
    image: "/engineering-services.avif",
    alt: "Engineering services from SATEV Group",
  },
  {
    title: "Software & Connected Products",
    description:
      "Mobile and web applications, APIs, payment experiences, cloud dashboards, and software that connects digital services to real products.",
    image: "/software-services.avif",
    alt: "Software services from SATEV Group",
  },
];

export default function SolutionsPage() {
  return (
    <SiteFrame>
      <InnerHero
        eyebrow="OUR SOLUTIONS"
        title="Practical technology, engineered for real life."
        summary="SATEV brings hardware, software, and engineering together to build useful products and connected systems."
      />
      <section className="solutions-page-grid" aria-label="SATEV solutions">
        {solutions.map((solution) => (
          <article className="solutions-page-card" key={solution.title}>
            <div className="solutions-page-image">
              <ResponsiveImage src={solution.image} alt={solution.alt} fill width={solution.title === "RevoV Smart Vending" ? 1023 : 1448} height={solution.title === "RevoV Smart Vending" ? 1537 : 1086} sizes="(max-width: 800px) 100vw, 33vw" />
            </div>
            <div className="solutions-page-copy">
              <h2>{solution.title}</h2>
              <p>{solution.description}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="solutions-page-cta">
        <h2>Have a project or location in mind?</h2>
        <p>Talk with the SATEV team about RevoV, engineering, or a connected software solution.</p>
        <Link href="/contact">Contact SATEV</Link>
      </section>
    </SiteFrame>
  );
}
