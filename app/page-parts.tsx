import Image from "next/image";

export function InnerHero({ eyebrow, title, summary, image, imageAlt }: { eyebrow: string; title: string; summary: string; image?: string; imageAlt?: string }) {
  return <section className="inner-hero">
    {image ? <Image src={image} alt={imageAlt ?? ""} fill priority quality={95} sizes="100vw" /> : null}
    <div className="inner-hero-overlay" />
    <div className="inner-hero-copy"><p>{eyebrow}</p><h1>{title}</h1><h2>{summary}</h2></div>
  </section>;
}

export function SplitStory({ image, alt, eyebrow, title, children, reverse = false, dark = false }: { image: string; alt: string; eyebrow: string; title: string; children: React.ReactNode; reverse?: boolean; dark?: boolean }) {
  return <section className={`wide-story ${dark ? "story-blue" : "story-light"} ${reverse ? "reverse" : ""}`}><div className="wide-story-image"><Image src={image} alt={alt} fill quality={95} sizes="(max-width: 900px) 100vw, 52vw" /></div><div className="wide-story-copy"><p className="section-kicker">{eyebrow}</p><h2>{title}</h2><div className="story-body">{children}</div></div></section>;
}
