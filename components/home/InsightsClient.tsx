"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";

type Insight = {
  title: string;
  slug: string;
  description: string;
  category: string;
  publishedAt: string;
  author: string;
  coverImage: string;
  featured: boolean;
  readingTime: string;
};

interface InsightsClientProps {
  insights: Insight[];
}

interface InsightImageProps {
  insight: Insight;
  sizes: string;
  className?: string;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function InsightImage({
  insight,
  sizes,
  className,
}: InsightImageProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      className={clsx(
        "relative overflow-hidden bg-[#E8E3D8]",
        className
      )}
    >
      {insight.coverImage && !imageFailed ? (
        <Image
          src={insight.coverImage}
          alt={insight.title}
          fill
          sizes={sizes}
          draggable={false}
          onError={() => setImageFailed(true)}
          className={clsx(
            "object-cover",
            "transition-transform duration-[900ms]",
            "ease-[cubic-bezier(0.22,1,0.36,1)]",
            "group-hover:scale-[1.04]",
            "group-focus-visible:scale-[1.04]",
            "motion-reduce:transform-none",
            "motion-reduce:transition-none"
          )}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-[var(--text-primary)]">
            ASR LAW
          </span>

          <span className="text-[0.68rem] font-medium uppercase tracking-[0.25em] text-[var(--text-secondary)]">
            Insights
          </span>
        </div>
      )}
    </div>
  );
}

function ArticleMetadata({
  insight,
}: {
  insight: Insight;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-[var(--text-secondary)]">
      <span className="text-[var(--accent)]">
        {insight.category}
      </span>

      <span
        aria-hidden="true"
        className="h-px w-5 bg-[var(--border)]"
      />

      <time dateTime={insight.publishedAt}>
        {formatDate(insight.publishedAt)}
      </time>

      <span
        aria-hidden="true"
        className="h-1 w-1 bg-[var(--border)]"
      />

      <span>{insight.readingTime}</span>
    </div>
  );
}

function FeaturedArticle({
  insight,
}: {
  insight: Insight;
}) {
  return (
    <article>
      <Link
        href={`/insights/${insight.slug}`}
        aria-label={`Read ${insight.title}`}
        className={clsx(
          "group grid gap-8 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16",
          "focus-visible:outline focus-visible:outline-2",
          "focus-visible:outline-offset-4",
          "focus-visible:outline-[var(--accent)]"
        )}
      >
        <InsightImage
          insight={insight}
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="aspect-[16/10] lg:col-span-7"
        />

        <div className="border-t border-[var(--border)] pt-7 lg:col-span-5">
          <div className="flex items-start justify-between gap-8">
            <ArticleMetadata insight={insight} />

            <span
              aria-hidden="true"
              className={clsx(
                "flex h-10 w-10 shrink-0 items-center justify-center",
                "border border-[var(--border)]",
                "transition duration-300",
                "group-hover:-translate-y-0.5",
                "group-hover:translate-x-0.5",
                "group-hover:border-[var(--accent)]",
                "group-hover:text-[var(--accent)]"
              )}
            >
              <ArrowUpRight size={17} strokeWidth={1.4} />
            </span>
          </div>

          <h3 className="mt-7 max-w-[18ch] font-serif text-[clamp(2rem,3vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.04em] text-[var(--text-primary)]">
            {insight.title}
          </h3>

          <p className="mt-6 max-w-[42rem] text-[0.98rem] leading-[1.8] text-[var(--text-secondary)]">
            {insight.description}
          </p>

          <span className="mt-7 inline-flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
            Read insight
            <ArrowUpRight size={15} strokeWidth={1.4} />
          </span>
        </div>
      </Link>
    </article>
  );
}

function SliderArticle({
  insight,
}: {
  insight: Insight;
}) {
  return (
    <article className="w-[82vw] shrink-0 sm:w-[420px] lg:w-[460px]">
      <Link
        href={`/insights/${insight.slug}`}
        aria-label={`Read ${insight.title}`}
        className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
      >
        <InsightImage
          insight={insight}
          sizes="(min-width: 1024px) 460px, 82vw"
          className="aspect-[4/3]"
        />

        <div className="border-b border-[var(--border)] pb-8 pt-6">
          <ArticleMetadata insight={insight} />

          <div className="mt-5 flex items-start justify-between gap-6">
            <h3 className="max-w-[18ch] font-serif text-[clamp(1.5rem,2vw,2rem)] font-medium leading-[1.1] tracking-[-0.035em] text-[var(--text-primary)]">
              {insight.title}
            </h3>

            <ArrowUpRight
              aria-hidden="true"
              size={17}
              strokeWidth={1.4}
              className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </div>

          <p className="mt-4 line-clamp-3 text-[0.94rem] leading-[1.7] text-[var(--text-secondary)]">
            {insight.description}
          </p>
        </div>
      </Link>
    </article>
  );
}

export default function InsightsClient({
  insights,
}: InsightsClientProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const sliderRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const categories = [
    "All",
    "Banking & Finance",
    "DRT & SARFAESI",
    "Insolvency & Bankruptcy",
    "Commercial & Civil Litigation",
    "Arbitration",
    "Property & IP",
  ];

  const filteredInsights = useMemo(() => {
    if (activeFilter === "All") {
      return insights;
    }

    return insights.filter(
      (insight) => insight.category === activeFilter
    );
  }, [activeFilter, insights]);

  const featuredInsight = filteredInsights[0];
  const olderInsights = filteredInsights.slice(1);

  function moveSlider(direction: "left" | "right") {
    sliderRef.current?.scrollBy({
      left: direction === "right" ? 480 : -480,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <section
      id="insights"
      aria-labelledby="insights-heading"
      className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--background)]"
    >
      <Container className="pb-8 pt-6 sm:pb-10 sm:pt-8 lg:pb-10 lg:pt-8">
        {/* Compact Insights introduction */}
        <div className="grid gap-8 border-t border-[var(--border)] pt-6 lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <FadeIn
            distance={20}
            duration={0.7}
            className="min-w-0 lg:col-span-4"
          >
            <div className="flex items-start justify-between gap-8">
              <div>
                <h2
                  id="insights-heading"
                  className={clsx(
                    "max-w-[17ch] font-serif font-medium",
                    "text-[clamp(2.8rem,3.8vw,4.5rem)]",
                    "leading-[1.04] tracking-[-0.045em]",
                    "text-[var(--text-primary)]"
                  )}
                >
                  Insights
                </h2>

                <p className="mt-4 text-[0.68rem] font-medium uppercase tracking-[0.27em] text-[var(--text-secondary)]">
                  Analysis &amp; Commentary
                </p>
              </div>

              <span className="pt-2 text-[0.68rem] font-medium tracking-[0.2em] text-[var(--accent)]">
                {String(insights.length).padStart(2, "0")}
              </span>
            </div>
          </FadeIn>

          <FadeIn
            delay={0.08}
            direction="none"
            duration={0.75}
            className="min-w-0 lg:col-span-8"
          >
            <div>
              <p
                className={clsx(
                  "max-w-[17ch] font-serif font-medium",
                  "text-[clamp(2.8rem,3.8vw,4.5rem)]",
                  "leading-[1.04] tracking-[-0.045em]",
                  "text-[var(--text-primary)]"
                )}
              >
                Perspectives on law, strategy and commercial risk.
              </p>

              <p className="mt-6 max-w-[46rem] text-[clamp(1rem,1.15vw,1.15rem)] leading-[1.8] text-[var(--text-secondary)]">
                Analysis and commentary on legal developments, procedural
                strategy and issues affecting businesses, financial
                institutions and individual stakeholders.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Category filters */}
        <FadeIn
          delay={0.1}
          distance={14}
          duration={0.6}
        >
          <div
            role="group"
            aria-label="Filter insights by category"
            className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-y border-[var(--border)] py-5"
          >
            {categories.map((category) => {
              const isActive = activeFilter === category;

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(category)}
                  className={clsx(
                    "relative py-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] transition-colors",
                    isActive
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  )}
                >
                  {category}

                  <span
                    aria-hidden="true"
                    className={clsx(
                      "absolute inset-x-0 bottom-0 h-px bg-[var(--accent)] transition-transform duration-500",
                      isActive
                        ? "origin-left scale-x-100"
                        : "origin-right scale-x-0"
                    )}
                  />
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Insight articles */}
        <motion.div
          key={activeFilter}
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 14,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.48,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-12"
        >
          {featuredInsight ? (
            <>
              <FeaturedArticle insight={featuredInsight} />

              {olderInsights.length > 0 && (
                <div className="mt-20">
                  <div className="mb-8 flex items-end justify-between gap-8">
                    <div>
                      <p className="font-serif text-3xl font-medium tracking-[-0.03em]">
                        Earlier insights
                      </p>

                      <p className="mt-2 text-sm text-[var(--text-secondary)]">
                        Explore previous analysis in this section.
                      </p>
                    </div>

                    <div className="hidden gap-3 sm:flex">
                      <button
                        type="button"
                        onClick={() => moveSlider("left")}
                        aria-label="Previous articles"
                        className="flex h-11 w-11 items-center justify-center border border-[var(--border)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      >
                        <ArrowLeft size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => moveSlider("right")}
                        aria-label="Next articles"
                        className="flex h-11 w-11 items-center justify-center border border-[var(--border)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      >
                        <ArrowRight size={17} />
                      </button>
                    </div>
                  </div>

                  <div
                    ref={sliderRef}
                    className="flex snap-x snap-mandatory gap-7 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  >
                    {olderInsights.map((insight, index) => (
                      <motion.div
                        key={insight.slug}
                        className="snap-start"
                        initial={
                          shouldReduceMotion
                            ? false
                            : {
                                opacity: 0,
                                y: 12,
                              }
                        }
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.45,
                          delay: shouldReduceMotion
                            ? 0
                            : Math.min(index * 0.045, 0.18),
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <SliderArticle insight={insight} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="py-16 text-[var(--text-secondary)]">
              No insights are currently available in this category.
            </p>
          )}
        </motion.div>

        {/* Closing disclaimer and link */}
        <FadeIn
          delay={0.12}
          distance={14}
          duration={0.6}
        >
          <div className="mt-16 flex flex-col gap-8 border-t border-[var(--border)] pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[44rem] text-sm leading-7 text-[var(--text-secondary)]">
              The material presented in this section is intended for general
              information and does not constitute legal advice.
            </p>

            <Button href="/insights" size="large">
              View All Insights
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}