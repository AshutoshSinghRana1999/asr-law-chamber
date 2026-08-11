import type { Metadata } from "next";

import Hero from "@/components/home/Hero";
import Expertise from "@/components/home/Expertise";
import About from "@/components/home/About";
import Insights from "@/components/home/Insights";
import Contact from "@/components/home/Contact";

export const metadata: Metadata = {
  title: {
    absolute:
      "ASR LAW | Advocates & Legal Consultants in New Delhi",
  },
  description:
    "ASR LAW is an independent legal practice in New Delhi advising and representing businesses, financial institutions and individuals in banking and finance, DRT and SARFAESI, insolvency and bankruptcy, commercial and civil litigation, arbitration and intellectual property matters.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "ASR LAW | Advocates & Legal Consultants in New Delhi",
    description:
      "Independent legal practice in New Delhi providing commercially focused legal advice and representation to businesses, financial institutions and individuals.",
    url: "/",
    type: "website",
    locale: "en_IN",
    siteName: "ASR LAW",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "ASR LAW | Advocates & Legal Consultants in New Delhi",
    description:
      "Independent legal practice in New Delhi providing commercially focused legal advice and representation to businesses, financial institutions and individuals.",
  },
};

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://asrlaw.in/#organization",
  name: "ASR LAW",
  url: "https://asrlaw.in",
  description:
    "Independent legal practice based in New Delhi providing legal advice and representation to businesses, financial institutions and individuals.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "New Delhi",
    addressCountry: "IN",
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  knowsAbout: [
    "Banking and Finance Law",
    "DRT Proceedings",
    "SARFAESI Act",
    "Insolvency and Bankruptcy Law",
    "Commercial Litigation",
    "Civil Litigation",
    "Arbitration",
    "Intellectual Property Law",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            organizationStructuredData
          ).replace(/</g, "\\u003c"),
        }}
      />

      <main>
        <Hero />
        <Expertise />
        <About />
        <Insights />
        <Contact />
      </main>
    </>
  );
}