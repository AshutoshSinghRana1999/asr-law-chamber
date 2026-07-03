import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.asrlaw.com"),

  title: {
    default: "ASR Law | Advocates & Legal Consultants",
    template: "%s | ASR Law",
  },

  description:
    "ASR Law is a New Delhi based law firm providing strategic legal services in Banking & Finance, DRT, SARFAESI, Insolvency & Bankruptcy, Commercial Litigation, Civil Litigation, Arbitration, Property Law and Intellectual Property Rights.",

  keywords: [
    "ASR Law",
    "Law Firm Delhi",
    "Advocate Delhi",
    "Banking Lawyer Delhi",
    "DRT Lawyer",
    "SARFAESI Lawyer",
    "IBC Lawyer",
    "Commercial Litigation",
    "Civil Litigation",
    "Property Lawyer",
    "IPR Lawyer",
    "Intellectual Property Lawyer",
  ],

  authors: [
    {
      name: "ASR Law",
    },
  ],

  creator: "ASR Law",

  openGraph: {
    title: "ASR Law",
    description:
      "Strategic legal solutions for businesses, financial institutions and individuals.",
    type: "website",
    locale: "en_IN",
    siteName: "ASR Law",
  },

  robots: {
    index: true,
    follow: true,
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
        className={`${inter.variable} ${cormorant.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}