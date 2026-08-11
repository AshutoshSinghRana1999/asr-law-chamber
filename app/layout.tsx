import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";

import Navbar from "@/components/layout/Navbar";
import DisclaimerModal from "@/components/shared/DisclaimerModal";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://asrlaw.in"),

  applicationName: "ASR LAW",

  title: {
    default: "ASR LAW | Advocates & Legal Consultants",
    template: "%s | ASR LAW",
  },

  description:
    "ASR LAW is an independent legal practice based in New Delhi advising and representing businesses, financial institutions and individuals in banking and finance, DRT and SARFAESI, insolvency and bankruptcy, commercial and civil litigation, arbitration and intellectual property matters.",

  authors: [
    {
      name: "ASR LAW",
    },
  ],

  creator: "ASR LAW",
  publisher: "ASR LAW",

  category: "Legal Services",

  openGraph: {
    title: "ASR LAW | Advocates & Legal Consultants",
    description:
      "Independent legal practice in New Delhi providing commercially focused advice and representation to businesses, financial institutions and individuals.",
    type: "website",
    locale: "en_IN",
    siteName: "ASR LAW",
  },

  twitter: {
    card: "summary_large_image",
    title: "ASR LAW | Advocates & Legal Consultants",
    description:
      "Independent legal practice in New Delhi providing commercially focused advice and representation to businesses, financial institutions and individuals.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body
        className={`${inter.variable} ${cormorant.variable} antialiased`}
      >
        <DisclaimerModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}