import type { Metadata } from "next";
import ContactPage from "../redesign/contact/page";

export const metadata: Metadata = {
  title: { absolute: "SATEV GROUP | The Ultimate Engineering" },
  description: "SATEV Group is an innovation driven engineering and technology company focused on building intelligent systems, breakthrough technologies, advanced automation, and future-focused infrastructure solutions. From RevoV smart vending to connected systems, SATEV Group turns ambitious ideas into practical products, designed and developed in Ethiopia.",
  alternates: { canonical: "https://satev.tech/contact" },
  openGraph: { title: "SATEV GROUP | The Ultimate Engineering", url: "https://satev.tech/contact" },
};

export default function Page() { return <ContactPage />; }
