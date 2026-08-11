"use client";

import { useEffect, useState } from "react";

import type { InsightHeading } from "@/lib/mdx";

type ArticleTableOfContentsProps = {
  headings: InsightHeading[];
};

export default function ArticleTableOfContents({
  headings,
}: ArticleTableOfContentsProps) {
  const [activeHeading, setActiveHeading] = useState(
    headings[0]?.id ?? ""
  );

  useEffect(() => {
    if (headings.length === 0) {
      return;
    }

    const headingElements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter(
        (element): element is HTMLElement => Boolean(element)
      );

    if (headingElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              first.boundingClientRect.top -
              second.boundingClientRect.top
          );

        const firstVisibleEntry = visibleEntries[0];

        if (firstVisibleEntry) {
          setActiveHeading(firstVisibleEntry.target.id);
        }
      },
      {
        rootMargin: "-18% 0px -68% 0px",
        threshold: [0, 1],
      }
    );

    headingElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  function handleHeadingClick(id: string) {
    setActiveHeading(id);
  }

  return (
    <>
      <div className="mb-10 border-y border-[#D8D3C8] py-6 lg:hidden">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#B08D57]">
          On this page
        </p>

        <nav
          aria-label="Article table of contents"
          className="mt-5"
        >
          <ol className="grid gap-3 sm:grid-cols-2">
            {headings.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  onClick={() =>
                    handleHeadingClick(heading.id)
                  }
                  className="text-sm leading-6 text-[#5C6570] transition-colors hover:text-[#111111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B08D57]"
                >
                  {heading.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <aside className="hidden lg:sticky lg:top-28 lg:block lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:border-l lg:border-[#D8D3C8] lg:pl-6 lg:pr-3">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#B08D57]">
          On this page
        </p>

        <nav
          aria-label="Article table of contents"
          className="mt-6"
        >
          <ol className="space-y-4">
            {headings.map((heading) => {
              const isActive =
                activeHeading === heading.id;

              return (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    aria-current={
                      isActive ? "location" : undefined
                    }
                    onClick={() =>
                      handleHeadingClick(heading.id)
                    }
                    className={`relative block text-sm leading-6 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B08D57] ${
                      isActive
                        ? "text-[#111111]"
                        : "text-[#5C6570] hover:text-[#111111]"
                    }`}
                  >
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute -left-[25px] top-[0.55rem] h-1.5 w-1.5 rounded-full bg-[#B08D57]"
                      />
                    )}

                    {heading.title}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      </aside>
    </>
  );
}