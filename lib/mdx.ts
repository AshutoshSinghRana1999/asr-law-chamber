import fs from "fs";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_PATH = path.join(
  process.cwd(),
  "content",
  "insights"
);

const PUBLIC_PATH = path.join(process.cwd(), "public");

export interface InsightHeading {
  id: string;
  title: string;
}

export interface InsightSummary {
  title: string;
  slug: string;
  description: string;
  category: string;
  publishedAt: string;
  author: string;
  coverImage: string;
  featured: boolean;
  readingTime: string;
}

export interface Insight extends InsightSummary {
  content: string;
  headings: InsightHeading[];
}

function requireString(
  data: Record<string, unknown>,
  key: string,
  fileName: string
): string {
  const value = data[key];

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(
      `Missing or invalid "${key}" in ${fileName}`
    );
  }

  return value.trim();
}

function optionalString(
  data: Record<string, unknown>,
  key: string,
  fallback = ""
): string {
  const value = data[key];

  return typeof value === "string" && value.trim()
    ? value.trim()
    : fallback;
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

function removeInlineMarkdown(value: string): string {
  return value
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_~`]/g, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function extractHeadings(content: string): InsightHeading[] {
  const headings: InsightHeading[] = [];
  const usedIds = new Map<string, number>();

  for (const line of content.split(/\r?\n/)) {
    const match = line.match(/^##\s+(.+?)\s*#*\s*$/);

    if (!match) {
      continue;
    }

    const title = removeInlineMarkdown(match[1]);

    if (!title) {
      continue;
    }

    const baseId = createHeadingId(title);

    if (!baseId) {
      continue;
    }

    const duplicateCount = usedIds.get(baseId) ?? 0;
    usedIds.set(baseId, duplicateCount + 1);

    const id =
      duplicateCount === 0
        ? baseId
        : `${baseId}-${duplicateCount + 1}`;

    headings.push({
      id,
      title,
    });
  }

  return headings;
}

function toSummary(insight: Insight): InsightSummary {
  const {
    content: _content,
    headings: _headings,
    ...summary
  } = insight;

  return summary;
}

const readAllInsightFiles = cache((): Insight[] => {
  if (!fs.existsSync(CONTENT_PATH)) {
    return [];
  }

  const files = fs
    .readdirSync(CONTENT_PATH)
    .filter((file) => file.endsWith(".mdx"));

  const usedSlugs = new Set<string>();

  const insights = files.map((file) => {
    const filePath = path.join(CONTENT_PATH, file);
    const source = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(source);

    const frontmatter = data as Record<string, unknown>;
    const fallbackSlug = file.replace(/\.mdx$/, "");

    const slug = optionalString(
      frontmatter,
      "slug",
      fallbackSlug
    );

    if (usedSlugs.has(slug)) {
      throw new Error(
        `Duplicate insight slug "${slug}" found in ${file}`
      );
    }

    usedSlugs.add(slug);

    const publishedAt = requireString(
      frontmatter,
      "publishedAt",
      file
    );

    if (Number.isNaN(Date.parse(publishedAt))) {
      throw new Error(
        `Invalid "publishedAt" date in ${file}. Use YYYY-MM-DD.`
      );
    }

    return {
      title: requireString(frontmatter, "title", file),
      slug,
      description: requireString(
        frontmatter,
        "description",
        file
      ),
      category: requireString(
        frontmatter,
        "category",
        file
      ),
      publishedAt,
      author: optionalString(
        frontmatter,
        "author",
        "ASR LAW"
      ),
      coverImage: optionalString(
        frontmatter,
        "coverImage"
      ),
      featured: frontmatter.featured === true,
      readingTime: readingTime(content).text,
      content,
      headings: extractHeadings(content),
    };
  });

  return insights.sort(
    (first, second) =>
      new Date(second.publishedAt).getTime() -
      new Date(first.publishedAt).getTime()
  );
});

/**
 * Returns article metadata only.
 * Used by homepage and archive listings so full article
 * content is not sent to Client Components.
 */
export function getAllInsights(): InsightSummary[] {
  return readAllInsightFiles().map(toSummary);
}

/**
 * Returns the complete article, including its MDX content
 * and automatically extracted level-two headings.
 */
export function getInsightBySlug(
  slug: string
): Insight | undefined {
  return readAllInsightFiles().find(
    (insight) => insight.slug === slug
  );
}

export function getInsightSlugs(): string[] {
  return readAllInsightFiles().map(
    (insight) => insight.slug
  );
}

/**
 * Prioritises articles in the same category, then fills
 * remaining spaces with the latest articles from other categories.
 */
export function getRelatedInsights(
  currentSlug: string,
  category: string,
  limit = 3
): InsightSummary[] {
  const availableInsights = getAllInsights().filter(
    (insight) => insight.slug !== currentSlug
  );

  const sameCategory = availableInsights.filter(
    (insight) => insight.category === category
  );

  const otherCategories = availableInsights.filter(
    (insight) => insight.category !== category
  );

  return [...sameCategory, ...otherCategories].slice(
    0,
    Math.max(0, limit)
  );
}

/**
 * Prevents broken local images while article artwork is
 * still being added to the public folder.
 */
export function publicAssetExists(src: string): boolean {
  if (!src) {
    return false;
  }

  if (/^https?:\/\//i.test(src)) {
    return true;
  }

  const cleanPath = src
    .split(/[?#]/)[0]
    .replace(/^\/+/, "");

  const assetPath = path.resolve(PUBLIC_PATH, cleanPath);
  const publicRoot = path.resolve(PUBLIC_PATH);

  if (!assetPath.startsWith(`${publicRoot}${path.sep}`)) {
    return false;
  }

  return fs.existsSync(assetPath);
}