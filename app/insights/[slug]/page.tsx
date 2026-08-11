import ArticleContactCTA from "@/components/insights/ArticleContactCTA";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  isValidElement,
  type ReactNode,
} from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

import ArticleTableOfContents from "@/components/insights/ArticleTableOfContents";

import {
  getInsightBySlug,
  getInsightSlugs,
  getRelatedInsights,
  publicAssetExists,
} from "@/lib/mdx";

type InsightPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://asrlaw.in"
).replace(/\/$/, "");

function createAbsoluteUrl(value: string): string {
  return new URL(value, `${SITE_URL}/`).toString();
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

function createHeadingId(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getNodeText(node: ReactNode): string {
  if (
    typeof node === "string" ||
    typeof node === "number"
  ) {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join("");
  }

  if (
    isValidElement<{
      children?: ReactNode;
    }>(node)
  ) {
    return getNodeText(node.props.children);
  }

  return "";
}

function createMdxComponents() {
  const usedHeadingIds = new Map<string, number>();

  return {
    h2: ({
      children,
    }: {
      children?: ReactNode;
    }) => {
      const headingTitle = getNodeText(children);
      const baseId = createHeadingId(headingTitle);
      const duplicateCount =
        usedHeadingIds.get(baseId) ?? 0;

      usedHeadingIds.set(
        baseId,
        duplicateCount + 1
      );

      const id =
        duplicateCount === 0
          ? baseId
          : `${baseId}-${duplicateCount + 1}`;

      return (
        <h2
          id={id}
          className="font-serif font-medium leading-[1.2] tracking-[-0.02em] text-[#111111]"
          style={{
            fontSize: "1.84rem",
          }}
        >
          {children}
        </h2>
      );
    },
  };
}

export function generateStaticParams() {
  return getInsightSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) {
    return {
      title: "Insight Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const articleUrl = createAbsoluteUrl(
    `/insights/${insight.slug}`
  );

  const hasCoverImage = publicAssetExists(
    insight.coverImage
  );

  const coverImageUrl = hasCoverImage
    ? createAbsoluteUrl(insight.coverImage)
    : undefined;

  return {
    title: insight.title,
    description: insight.description,

    alternates: {
      canonical: articleUrl,
    },

    openGraph: {
      type: "article",
      title: `${insight.title} | ASR LAW`,
      description: insight.description,
      url: articleUrl,
      siteName: "ASR LAW",
      locale: "en_IN",
      publishedTime: insight.publishedAt,
      authors: [insight.author],
      section: insight.category,
      images: coverImageUrl
        ? [
            {
              url: coverImageUrl,
              alt: insight.title,
            },
          ]
        : [],
    },

    twitter: {
      card: coverImageUrl
        ? "summary_large_image"
        : "summary",
      title: `${insight.title} | ASR LAW`,
      description: insight.description,
      images: coverImageUrl
        ? [coverImageUrl]
        : [],
    },
  };
}

export default async function InsightArticlePage({
  params,
}: InsightPageProps) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) {
    notFound();
  }

  const articleUrl = createAbsoluteUrl(
    `/insights/${insight.slug}`
  );

  const hasCoverImage = publicAssetExists(
    insight.coverImage
  );

  const coverImageUrl = hasCoverImage
    ? createAbsoluteUrl(insight.coverImage)
    : undefined;

  const relatedInsights = getRelatedInsights(
    insight.slug,
    insight.category,
    3
  );

  const mdxComponents = createMdxComponents();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.description,
    articleSection: insight.category,
    datePublished: insight.publishedAt,
    inLanguage: "en-IN",
    url: articleUrl,

    author: {
      "@type":
        insight.author === "ASR LAW"
          ? "Organization"
          : "Person",
      name: insight.author,
      ...(insight.author === "ASR LAW"
        ? {
            url: SITE_URL,
          }
        : {}),
    },

    publisher: {
      "@type": "Organization",
      name: "ASR LAW",
      url: SITE_URL,
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },

    ...(coverImageUrl
      ? {
          image: coverImageUrl,
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            structuredData
          ).replace(/</g, "\\u003c"),
        }}
      />

      <main className="bg-[#F7F6F3] text-[#111111]">
        <article>
          <header className="mx-auto max-w-[980px] px-6 pb-10 pt-32 lg:px-10 lg:pb-12 lg:pt-36">
            <Link
              href="/insights"
              className="mb-7 inline-flex text-sm uppercase tracking-[0.18em] text-[#5C6570] transition-colors hover:text-[#B08D57] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B08D57]"
            >
              ← Back to Insights
            </Link>

            <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-[#B08D57] sm:text-sm">
              {insight.category}
            </p>

            <h1
              className="max-w-[30ch] font-serif font-medium leading-[1.12] tracking-[-0.025em] text-[#111111]"
              style={{
                fontSize: "clamp(2.3rem, 3vw, 2.92rem)",
              }}
            >
              {insight.title}
            </h1>

            <p className="mt-6 max-w-[48rem] text-justify text-[0.98rem] leading-8 text-[#5C6570] sm:text-base">
              {insight.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#5C6570]">
              <span>{insight.author}</span>

              <span aria-hidden="true">
                •
              </span>

              <time
                dateTime={insight.publishedAt}
              >
                {formatDate(
                  insight.publishedAt
                )}
              </time>

              <span aria-hidden="true">
                •
              </span>

              <span>
                {insight.readingTime}
              </span>
            </div>
          </header>

          {hasCoverImage && (
            <div className="relative mx-auto aspect-[2/1] max-w-[900px] overflow-hidden">
              <Image
                src={insight.coverImage}
                alt={insight.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 960px) 100vw, 900px"
              />
            </div>
          )}

          <section className="mx-auto max-w-[1080px] px-6 py-12 lg:px-10 lg:py-16 xl:px-0">
            <div className="lg:grid lg:grid-cols-[200px_minmax(0,700px)] lg:items-stretch lg:gap-12 xl:gap-16">
              <ArticleTableOfContents
                headings={insight.headings}
              />

              <div
                className="
                  insight-content
                  min-w-0
                  text-[1rem] leading-[1.9] text-[#333333]
                  [&>*+*]:mt-6
                  [&_p]:text-justify
                  [&_h2]:mt-11
                  [&_h2]:scroll-mt-32
                  [&_h3]:mt-8
                  [&_h3]:scroll-mt-32
                  [&_h3]:font-serif
                  [&_h3]:!text-[1.2rem]
                  [&_h3]:font-medium
                  [&_h3]:!leading-[1.25]
                  [&_h3]:text-[#111111]
                  [&_a]:text-[#8E6D3B]
                  [&_a]:underline
                  [&_a]:underline-offset-4
                  [&_strong]:font-semibold
                  [&_strong]:text-[#111111]
                  [&_blockquote]:my-10
                  [&_blockquote]:border-l-2
                  [&_blockquote]:border-[#B08D57]
                  [&_blockquote]:pl-7
                  [&_blockquote]:font-serif
                  [&_blockquote]:text-[1.05rem]
                  [&_blockquote]:leading-relaxed
                  [&_blockquote]:text-[#111111]
                "
              >
                <MDXRemote
                  source={insight.content}
                  components={
                    mdxComponents
                  }
                />

                <ArticleContactCTA />
              </div>
            </div>
          </section>
        </article>

        {relatedInsights.length > 0 && (
          <aside
            aria-labelledby="related-insights-heading"
            className="border-t border-[#D8D3C8]"
          >
            <div className="mx-auto max-w-[1100px] px-6 py-14 lg:px-10 lg:py-16">
              <div className="mb-10 flex flex-col gap-4 border-b border-[#D8D3C8] pb-7 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#B08D57]">
                    Continue reading
                  </p>

                  <h2
                    id="related-insights-heading"
                    className="mt-3 font-serif !text-[clamp(1.65rem,2.2vw,2.1rem)] !font-medium !tracking-[-0.03em]"
                  >
                    Related Insights
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
                {relatedInsights.map(
                  (relatedInsight) => {
                    const hasRelatedImage =
                      publicAssetExists(
                        relatedInsight.coverImage
                      );

                    return (
                      <article
                        key={
                          relatedInsight.slug
                        }
                      >
                        <Link
                          href={`/insights/${relatedInsight.slug}`}
                          className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B08D57]"
                        >
                          {hasRelatedImage ? (
                            <div className="relative aspect-[16/9] overflow-hidden bg-[#E8E3D8]">
                              <Image
                                src={
                                  relatedInsight.coverImage
                                }
                                alt={
                                  relatedInsight.title
                                }
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                              />
                            </div>
                          ) : (
                            <div className="flex aspect-[16/9] flex-col justify-between bg-[#E8E3D8] p-6">
                              <span className="text-xs font-medium uppercase tracking-[0.24em] text-[#111111]">
                                ASR LAW
                              </span>

                              <span className="text-xs font-medium uppercase tracking-[0.22em] text-[#5C6570]">
                                Legal Insight
                              </span>
                            </div>
                          )}

                          <div className="border-b border-[#D8D3C8] pb-8 pt-6">
                            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B08D57]">
                              {
                                relatedInsight.category
                              }
                            </p>

                            <h3 className="mt-4 max-w-[22ch] font-serif !text-[1.15rem] !font-medium !leading-[1.25] !tracking-[-0.02em] transition-colors group-hover:text-[#8E6D3B]">
                              {
                                relatedInsight.title
                              }
                            </h3>

                            <div className="mt-5 flex flex-wrap gap-x-3 text-xs text-[#5C6570]">
                              <time
                                dateTime={
                                  relatedInsight.publishedAt
                                }
                              >
                                {formatDate(
                                  relatedInsight.publishedAt
                                )}
                              </time>

                              <span aria-hidden="true">
                                •
                              </span>

                              <span>
                                {
                                  relatedInsight.readingTime
                                }
                              </span>
                            </div>
                          </div>
                        </Link>
                      </article>
                    );
                  }
                )}
              </div>
            </div>
          </aside>
        )}
      </main>
    </>
  );
}