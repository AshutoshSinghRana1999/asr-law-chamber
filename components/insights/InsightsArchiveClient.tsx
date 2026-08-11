"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { InsightSummary } from "@/lib/mdx";

const categories = [
  "All",
  "Banking & Finance",
  "DRT & SARFAESI",
  "Insolvency & Bankruptcy",
  "Commercial & Civil Litigation",
  "Arbitration",
  "Property & IP",
] as const;

type Category = (typeof categories)[number];

type InsightsArchiveClientProps = {
  insights: InsightSummary[];
};

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDate(date: string): string {
  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return dateFormatter.format(parsedDate);
}

function ArticleImage({
  insight,
}: {
  insight: InsightSummary;
}) {
  const [hasImageError, setHasImageError] = useState(false);
  const showImage =
    Boolean(insight.coverImage) && !hasImageError;

  return (
    <div className="relative aspect-[2/1] overflow-hidden bg-[#E8E3D8]">
      {showImage ? (
        <Image
          src={insight.coverImage as string}
          alt={`Cover image for ${insight.title}`}
          fill
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          onError={() => setHasImageError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#5C6570]">
            ASR LAW
          </span>

          <div>
            <div className="mb-4 h-px w-10 bg-[#B08D57]" />

            <p className="max-w-[15rem] font-serif text-lg leading-snug text-[#111111]">
              {insight.category}
            </p>
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-[#111111]/0 transition-colors duration-500 group-hover:bg-[#111111]/5" />
    </div>
  );
}

function ArticleCard({
  insight,
  index,
}: {
  insight: InsightSummary;
  index: number;
}) {
  const articleUrl = `/insights/${insight.slug}`;

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 12,
      }}
      transition={{
        duration: 0.42,
        delay: Math.min(index * 0.04, 0.2),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex h-full flex-col border border-[#111111]/12 bg-[#F7F6F3] transition-transform duration-500 ease-out hover:-translate-y-1"
    >
      <Link
        href={articleUrl}
        aria-label={`Read ${insight.title}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D57] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F7F6F3]"
      >
        <ArticleImage insight={insight} />
      </Link>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-6 md:px-7 md:pb-7">
        <p className="mb-4 text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-[#B08D57]">
          {insight.category}
        </p>

        <h2 className="font-serif !text-[clamp(1.25rem,1.45vw,1.5rem)] !font-medium !leading-[1.18] !tracking-[-0.02em] !text-[#111111]">
          <Link
            href={articleUrl}
            className="transition-colors duration-300 hover:text-[#5C6570] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D57] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F7F6F3]"
          >
            {insight.title}
          </Link>
        </h2>

        <p className="mt-4 overflow-hidden text-justify text-[0.9rem] leading-7 text-[#5C6570] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
          {insight.description}
        </p>

        <div className="mt-6 flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.12em] text-[#5C6570]">
          <time dateTime={insight.publishedAt}>
            {formatDate(insight.publishedAt)}
          </time>

          <span
            aria-hidden="true"
            className="text-[#B08D57]"
          >
            ·
          </span>

          <span>{insight.readingTime}</span>
        </div>

        <div className="mt-auto pt-7">
          <Link
            href={articleUrl}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#111111] underline-offset-4 transition-colors duration-300 hover:text-[#B08D57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D57] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F7F6F3]"
          >
            <span>Read Insight</span>

            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.6}
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function InsightsArchiveClient({
  insights,
}: InsightsArchiveClientProps) {
  const [activeCategory, setActiveCategory] =
    useState<Category>("All");

  const filteredInsights = useMemo(() => {
    if (activeCategory === "All") {
      return insights;
    }

    return insights.filter(
      (insight) =>
        insight.category === activeCategory
    );
  }, [activeCategory, insights]);

  const archiveLabel =
    activeCategory === "All"
      ? "All Insights"
      : activeCategory;

  const articleCountLabel =
    filteredInsights.length === 1
      ? "Article"
      : "Articles";

  return (
    <main className="min-h-screen bg-[#F7F6F3] text-[#1D1D1D]">
      <section className="border-b border-[#111111]/10 pb-12 pt-32 md:pb-16 md:pt-36">
        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-[1320px] px-6 md:px-10 xl:px-16"
        >
          <div className="max-w-4xl">
            <div className="mb-6 flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-[#B08D57]"
              />

              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#B08D57]">
                ASR LAW Insights
              </p>
            </div>

            <h1 className="font-serif !text-[clamp(2.5rem,4vw,3.75rem)] !font-medium !leading-none !tracking-[-0.03em] !text-[#111111]">
              Insights
            </h1>

            <p className="mt-6 max-w-2xl text-justify text-base leading-8 text-[#5C6570] md:text-[1.05rem]">
              Perspectives on commercial law, dispute
              resolution, finance and regulatory
              developments.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[1320px] px-6 md:px-10 xl:px-16">
          <nav
            aria-label="Filter insights by practice area"
            className="border-b border-[#111111]/12"
          >
            <div className="flex flex-wrap gap-x-7 gap-y-2">
              {categories.map((category) => {
                const isActive =
                  activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() =>
                      setActiveCategory(category)
                    }
                    className={`relative min-h-12 pb-4 pt-1 text-left text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D57] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F7F6F3] ${
                      isActive
                        ? "text-[#111111]"
                        : "text-[#5C6570] hover:text-[#111111]"
                    }`}
                  >
                    {category}

                    <span
                      aria-hidden="true"
                      className={`absolute bottom-[-1px] left-0 h-[2px] bg-[#B08D57] transition-all duration-300 ${
                        isActive
                          ? "w-full opacity-100"
                          : "w-0 opacity-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </nav>

          <div
            className="mb-8 mt-7 flex items-center justify-between border-b border-[#111111]/8 pb-5"
            aria-live="polite"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5C6570]">
              <span className="text-[#111111]">
                {archiveLabel}
              </span>

              <span
                aria-hidden="true"
                className="mx-2 text-[#B08D57]"
              >
                ·
              </span>

              {filteredInsights.length}{" "}
              {articleCountLabel}
            </p>
          </div>

          <AnimatePresence
            mode="wait"
            initial={false}
          >
            {filteredInsights.length > 0 ? (
              <motion.div
                key={activeCategory}
                layout
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.22,
                }}
                className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3"
              >
                {filteredInsights.map(
                  (insight, index) => (
                    <ArticleCard
                      key={insight.slug}
                      insight={insight}
                      index={index}
                    />
                  )
                )}
              </motion.div>
            ) : (
              <motion.div
                key={`empty-${activeCategory}`}
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="border-y border-[#111111]/10 py-16 text-center md:py-20"
              >
                <div className="mx-auto max-w-xl">
                  <span
                    aria-hidden="true"
                    className="mx-auto mb-7 block h-px w-12 bg-[#B08D57]"
                  />

                  <h2 className="font-serif !text-[clamp(1.8rem,2.5vw,2.4rem)] !font-medium !tracking-[-0.02em] !text-[#111111]">
                    More perspectives are forthcoming
                  </h2>

                  <p className="mt-5 text-base leading-7 text-[#5C6570]">
                    No insights have been published in this
                    area yet.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveCategory("All")
                    }
                    className="mt-8 inline-flex items-center gap-2 border-b border-[#111111] pb-1 text-sm font-semibold text-[#111111] transition-colors duration-300 hover:border-[#B08D57] hover:text-[#B08D57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D57] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F7F6F3]"
                  >
                    <span>
                      Return to All Insights
                    </span>

                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4"
                      strokeWidth={1.6}
                    />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}