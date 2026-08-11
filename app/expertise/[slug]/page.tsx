import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import {
  expertiseAreas,
  expertiseSlugs,
  getExpertiseBySlug,
} from "@/data/expertise";
import {
  getAllInsights,
  type InsightSummary,
} from "@/lib/mdx";

type ExpertisePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return expertiseSlugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ExpertisePageProps): Promise<Metadata> {
  const { slug } = await params;
  const expertise = getExpertiseBySlug(slug);

  if (!expertise) {
    return {
      title: "Expertise Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const pageUrl = `/expertise/${expertise.slug}`;

  return {
    title: expertise.seoTitle,
    description: expertise.seoDescription,

    alternates: {
      canonical: pageUrl,
    },

    openGraph: {
      title: `${expertise.seoTitle} | ASR LAW`,
      description: expertise.seoDescription,
      url: pageUrl,
      type: "website",
      locale: "en_IN",
      siteName: "ASR LAW",
    },

    twitter: {
      card: "summary_large_image",
      title: `${expertise.seoTitle} | ASR LAW`,
      description: expertise.seoDescription,
    },
  };
}

function formatDate(date: string): string {
  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}

function RelatedInsightCard({
  insight,
}: {
  insight: InsightSummary;
}) {
  return (
    <article className="border-b border-[#D8D3C8] pb-8">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B08D57]">
        {insight.category}
      </p>

      <h3 className="mt-4 max-w-[24ch] font-serif text-[1.45rem] font-medium leading-tight tracking-[-0.02em] text-[#111111]">
        <Link
          href={`/insights/${insight.slug}`}
          className="transition-colors hover:text-[#8E6D3B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B08D57]"
        >
          {insight.title}
        </Link>
      </h3>

      <p className="mt-4 text-justify text-sm leading-7 text-[#5C6570]">
        {insight.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-3 text-xs text-[#5C6570]">
        <time dateTime={insight.publishedAt}>
          {formatDate(insight.publishedAt)}
        </time>

        <span aria-hidden="true">•</span>

        <span>{insight.readingTime}</span>
      </div>

      <Link
        href={`/insights/${insight.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#111111] transition-colors hover:text-[#B08D57] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B08D57]"
      >
        Read Insight
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4"
          strokeWidth={1.6}
        />
      </Link>
    </article>
  );
}

export default async function ExpertisePage({
  params,
}: ExpertisePageProps) {
  const { slug } = await params;
  const expertise = getExpertiseBySlug(slug);

  if (!expertise) {
    notFound();
  }

  const relatedInsights = getAllInsights()
    .filter(
      (insight) =>
        insight.category === expertise.relatedCategory
    )
    .slice(0, 3);

  return (
    <main className="bg-[#F7F6F3] text-[#111111]">
      <section className="border-b border-[#D8D3C8]">
        <div className="mx-auto max-w-[1180px] px-6 pb-20 pt-36 lg:px-10 lg:pb-24 lg:pt-40 xl:px-0">
          <Link
            href="/#expertise"
            className="inline-flex text-sm uppercase tracking-[0.18em] text-[#5C6570] transition-colors hover:text-[#B08D57] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B08D57]"
          >
            ← Back to Expertise
          </Link>

          <p className="mt-12 text-xs font-medium uppercase tracking-[0.24em] text-[#B08D57]">
            {expertise.eyebrow}
          </p>

          <h1 className="mt-6 max-w-4xl font-serif text-[2.25rem] leading-[1.08] tracking-[-0.03em] sm:text-[2.9rem] lg:text-[3.5rem]">
            {expertise.title}
          </h1>

          <p className="mt-7 max-w-3xl text-justify text-base leading-8 text-[#5C6570] sm:text-lg">
            {expertise.description}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-6 py-20 lg:px-10 lg:py-28 xl:px-0">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#B08D57]">
              Overview
            </p>

            <div className="mt-6 space-y-6">
              {expertise.overview.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-justify text-[1rem] leading-[1.9] text-[#333333]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <aside className="border-l border-[#D8D3C8] pl-6 lg:pl-8">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#B08D57]">
              Key capabilities
            </p>

            <ul className="mt-6 space-y-4">
              {expertise.services.map((service) => (
                <li
                  key={service}
                  className="relative pl-5 text-sm leading-7 text-[#333333]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[0.7rem] h-1.5 w-1.5 rounded-full bg-[#B08D57]"
                  />

                  {service}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {relatedInsights.length > 0 && (
        <section className="border-t border-[#D8D3C8]">
          <div className="mx-auto max-w-[1180px] px-6 py-20 lg:px-10 lg:py-24 xl:px-0">
            <div className="mb-10 flex flex-col gap-4 border-b border-[#D8D3C8] pb-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#B08D57]">
                  Related analysis
                </p>

                <h2 className="mt-3 font-serif text-[2rem] font-medium tracking-[-0.025em] text-[#111111]">
                  Insights in {expertise.title}
                </h2>
              </div>

              <Link
                href="/insights"
                className="text-xs font-medium uppercase tracking-[0.2em] text-[#5C6570] transition-colors hover:text-[#B08D57] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B08D57]"
              >
                View all insights →
              </Link>
            </div>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {relatedInsights.map((insight) => (
                <RelatedInsightCard
                  key={insight.slug}
                  insight={insight}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-[#D8D3C8]">
        <div className="mx-auto max-w-[1180px] px-6 py-16 lg:px-10 lg:py-20 xl:px-0">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#B08D57]">
            Discuss a related matter
          </p>

          <p className="mt-5 max-w-2xl text-justify text-base leading-8 text-[#5C6570]">
            ASR LAW assists clients with disputes, transactions and
            enforcement issues relating to {expertise.title.toLowerCase()}.
          </p>

          <Link
            href="/#contact"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#111111] transition-colors hover:text-[#B08D57] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B08D57]"
          >
            Contact the Firm
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4"
              strokeWidth={1.6}
            />
          </Link>
        </div>
      </section>
    </main>
  );
}