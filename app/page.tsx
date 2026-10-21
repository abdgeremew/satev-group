import type { Metadata } from "next";
import RedesignPage from "./redesign/page";

export const metadata: Metadata = {
  title: { absolute: "SATEV GROUP: The Ultimate Engineering" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function HomePage() {
  return (
    <>
      <RedesignPage />
    </>
  );
}

