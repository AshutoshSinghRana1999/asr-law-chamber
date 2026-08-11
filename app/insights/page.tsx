import type { Metadata } from "next";

import InsightsArchiveClient from "@/components/insights/InsightsArchiveClient";
import { getAllInsights } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Legal Insights & Commentary",

  description:
    "Legal insights and commentary from ASR LAW on banking and finance, DRT and SARFAESI, insolvency and bankruptcy, commercial disputes, arbitration and intellectual property law.",

  alternates: {
    canonical: "/insights",
  },

  openGraph: {
    title: "Legal Insights & Commentary | ASR LAW",
    description:
      "Analysis and commentary from ASR LAW on banking, secured enforcement, insolvency, commercial disputes, arbitration and intellectual property law.",
    url: "/insights",
    type: "website",
    locale: "en_IN",
    siteName: "ASR LAW",
  },

  twitter: {
    card: "summary_large_image",
    title: "Legal Insights & Commentary | ASR LAW",
    description:
      "Analysis and commentary from ASR LAW on banking, secured enforcement, insolvency, commercial disputes, arbitration and intellectual property law.",
  },
};

export default function InsightsPage() {
  const insights = getAllInsights();

  return <InsightsArchiveClient insights={insights} />;
}