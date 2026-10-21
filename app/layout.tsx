import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://satev.tech"),
  title: {
    default: "SATEV GROUP: The Ultimate Engineering",
    template: "%s | SATEV Group",
  },
  description:
    "SATEV Group PLC is an Ethiopian engineering and technology company building RevoV smart vending, IoT, automation, software, and connected products.",
  keywords: ["SATEV Group", "RevoV", "smart vending Ethiopia", "IoT engineering", "vending machine Addis Ababa"],
  openGraph: {
    url: "https://satev.tech/",
    siteName: "SATEV GROUP",
    title: "SATEV GROUP: The Ultimate Engineering",
    description: "Technology-driven engineering and RevoV smart vending solutions from Ethiopia.",
    type: "website",
    images: ["/satev-logo.jpg"],
  },
  twitter: { card: "summary", title: "SATEV GROUP: The Ultimate Engineering", description: "Engineering intelligent systems in Ethiopia. Discover RevoV, our team, and our technology focus.", images: ["/satev-logo.jpg"] },
  robots: { index: true, follow: true },
  verification: { google: "1owhLFXfSN5bKpmwlT8vGMSwpoqi_E5ulCG7zmk76aM" },
  icons: {
    icon: "/favicon.jpg",
    shortcut: "/favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://satev.tech/#organization",
              name: "SATEV GROUP",
              alternateName: ["SATEV", "SATEV Group PLC"],
              legalName: "SATEV Group PLC",
              url: "https://satev.tech/",
              logo: { "@type": "ImageObject", url: "https://satev.tech/satev-logo-transparent.png" },
              email: "contact@satev.tech",
              description: "SATEV Group PLC is an Ethiopian engineering and technology company building intelligent systems, automation, software, and connected products including RevoV smart vending.",
              contactPoint: [{ "@type": "ContactPoint", contactType: "business inquiries", email: "contact@satev.tech", url: "https://satev.tech/contact" }],
              knowsAbout: ["Engineering", "Internet of Things", "Automation", "Robotics", "Software development", "Smart vending", "RevoV"],
              sameAs: ["https://www.facebook.com/profile.php?id=61587278017149", "https://www.instagram.com/satev_group", "https://www.linkedin.com/company/satev-group/", "https://t.me/Satev_Group", "https://www.tiktok.com/@satev_group", "https://linktr.ee/SATEV_Group"]
            },
            { "@type": "WebSite", "@id": "https://satev.tech/#website", url: "https://satev.tech/", name: "SATEV GROUP", inLanguage: "en", publisher: { "@id": "https://satev.tech/#organization" } },
          ],
        }).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
