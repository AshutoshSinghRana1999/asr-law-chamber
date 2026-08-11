"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";

const PRACTICE_AREAS = [
  {
    number: "01",
    title: "Banking & Finance",
    description:
      "Strategic advice and representation for lenders, financial institutions, businesses and individual stakeholders across banking and finance matters.",
    image: "/images/practice/banking-finance.png",
    alt: "Editorial image representing banking and finance practice",
    href: "/expertise/banking-finance",
  },
  {
    number: "02",
    title: "DRT & SARFAESI",
    description:
      "Representation in debt recovery, enforcement and securitisation proceedings before Debt Recovery Tribunals and appellate forums.",
    image: "/images/practice/drt-sarfaesi.png",
    alt: "Editorial image representing debt recovery and secured enforcement",
    href: "/expertise/drt-sarfaesi",
  },
  {
    number: "03",
    title: "Insolvency & Bankruptcy",
    description:
      "Commercially focused guidance through insolvency proceedings, creditor remedies, resolution strategy and related disputes.",
    image: "/images/practice/insolvency.png",
    alt: "Editorial image representing insolvency and bankruptcy practice",
    href: "/expertise/insolvency-bankruptcy",
  },
  {
    number: "04",
    title: "Commercial & Civil Litigation",
    description:
      "Clear, strategic representation in complex contractual, commercial and civil disputes before courts and specialist forums.",
    image:
      "/images/practice/commercial-civil-litigation.png",
    alt: "Editorial image representing commercial and civil litigation",
    href: "/expertise/commercial-civil-litigation",
  },
  {
    number: "05",
    title: "Arbitration",
    description:
      "Advice and representation across commercial arbitration, interim measures, tribunal proceedings, award challenges and enforcement.",
    image: "/images/practice/arbitration.png",
    alt: "Editorial image representing arbitration and dispute resolution",
    href: "/expertise/arbitration",
  },
  {
    number: "06",
    title: "Intellectual Property Rights",
    description:
      "Advice and representation in trademark infringement, passing off, brand protection and the enforcement of intellectual property rights.",
    image: "/images/practice/ipr.png",
    alt: "Editorial image representing intellectual property rights",
    href: "/expertise/intellectual-property-rights",
  },
] as const;

export default function Expertise() {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="relative overflow-hidden bg-[#111111] text-[#F7F6F3]"
    >
      {/* Compact expertise introduction */}
<Container className="pt-16 sm:pt-20 lg:pt-24">
  <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:items-center lg:gap-20">
    <FadeIn>
      <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[#B08D57]">
        Strategic Expertise
      </p>

      <h2
        id="expertise-heading"
        className={clsx(
          "mt-6 max-w-[17ch] font-serif font-medium",
          "text-[clamp(2.6rem,4vw,4.65rem)]",
          "leading-[0.98] tracking-[-0.045em]",
          "!text-[#F7F6F3]"
        )}
      >
        Legal insight shaped around complex commercial realities.
      </h2>
    </FadeIn>

    <FadeIn delay={0.12} className="lg:justify-self-end">
      <div className="max-w-[35rem] border-l border-[#343434] pl-6 sm:pl-8">
        <p className="text-[0.98rem] leading-7 text-[#B8B9BA]">
          ASR LAW advises businesses, financial institutions and individuals
          across contentious and advisory matters, with a focus on practical
          strategy, clear communication and commercially grounded outcomes.
        </p>

        <div className="mt-7 border-t border-[#343434] pt-6">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-[#B08D57]">
            Core capabilities
          </p>

          <p className="mt-3 text-sm leading-7 text-[#929597]">
            Recovery <span className="mx-2 text-[#B08D57]">·</span>
            Insolvency <span className="mx-2 text-[#B08D57]">·</span>
            Commercial Disputes{" "}
            <span className="mx-2 text-[#B08D57]">·</span>
            Arbitration <span className="mx-2 text-[#B08D57]">·</span>
            Intellectual Property
          </p>
        </div>
      </div>
    </FadeIn>
  </div>
</Container>

      {/* Desktop interactive panels */}
      <FadeIn delay={0.16} className="mt-12 hidden lg:block">
        <div
          className="flex h-[34rem] w-full overflow-hidden border-y border-[#343434] xl:h-[36rem]"
          role="group"
          aria-label="ASR LAW practice areas"
        >
          {PRACTICE_AREAS.map((area, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={area.title}
                onMouseEnter={() => setActiveIndex(index)}
                className={clsx(
                  "group relative min-w-0 basis-0 overflow-hidden",
                  "border-l border-[#343434] first:border-l-0",
                  "transition-[flex-grow] duration-700",
                  "ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isActive ? "grow-[2.35]" : "grow"
                )}
              >
                <Link
                  href={area.href}
                  aria-label={`Explore ${area.title}`}
                  onFocus={() => setActiveIndex(index)}
                  className={clsx(
                    "relative block h-full w-full text-left",
                    "focus-visible:z-20 focus-visible:outline",
                    "focus-visible:outline-2",
                    "focus-visible:outline-offset-[-2px]",
                    "focus-visible:outline-[#B08D57]"
                  )}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[#181818]"
                  />

                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-0"
                    animate={{
                      scale:
                        isActive && !shouldReduceMotion
                          ? 1.045
                          : 1,
                    }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 1.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Image
                      src={area.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </motion.div>

                  <div
                    aria-hidden="true"
                    className={clsx(
                      "absolute inset-0 transition-colors duration-700",
                      isActive
                        ? "bg-black/15"
                        : "bg-black/55 group-hover:bg-black/30"
                    )}
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-black/90 via-black/40 to-transparent"
                  />

                  <div className="relative z-10 flex h-full flex-col justify-between px-5 py-6 xl:px-7 xl:py-7">
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={clsx(
                          "text-[0.62rem] font-medium uppercase",
                          "tracking-[0.26em] transition-colors duration-500",
                          isActive
                            ? "text-[#B08D57]"
                            : "text-[#D5D0C8]"
                        )}
                      >
                        {area.number}
                      </span>

                      <motion.span
                        aria-hidden="true"
                        className={clsx(
                          "flex h-9 w-9 shrink-0 items-center justify-center",
                          "border transition-colors duration-500",
                          isActive
                            ? "border-[#B08D57] text-[#B08D57]"
                            : "border-white/25 text-white/70"
                        )}
                        animate={{
                          x:
                            isActive && !shouldReduceMotion
                              ? 0
                              : -2,
                          y:
                            isActive && !shouldReduceMotion
                              ? 0
                              : 2,
                        }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <ArrowUpRight
                          size={16}
                          strokeWidth={1.4}
                        />
                      </motion.span>
                    </div>

                    <div className="grid h-[15rem] grid-rows-[6.5rem_1fr]">
                      <h3
                        className={clsx(
                          "self-end",
                          "max-w-[13ch] font-serif",
                          "text-[clamp(1.45rem,1.85vw,2.55rem)]",
                          "font-medium leading-[1.02]",
                          "tracking-[-0.035em]",
                          "!text-[#F7F6F3]"
                        )}
                      >
                        {area.title}
                      </h3>

                      <div className="pt-4">
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              key={`${area.title}-content`}
                              initial={{
                                opacity: 0,
                                y: shouldReduceMotion ? 0 : 10,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              exit={{
                                opacity: 0,
                                y: shouldReduceMotion ? 0 : 6,
                              }}
                              transition={{
                                duration: shouldReduceMotion
                                  ? 0
                                  : 0.4,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            >
                              <p className="max-w-[30rem] text-[0.88rem] leading-6 text-[#D3D0CB]">
                                {area.description}
                              </p>

                              <span
                                className={clsx(
                                  "mt-4 inline-flex items-center gap-3",
                                  "text-[0.62rem] font-medium uppercase",
                                  "tracking-[0.22em] text-[#B08D57]"
                                )}
                              >
                                Explore this area

                                <ArrowUpRight
                                  size={14}
                                  strokeWidth={1.4}
                                />
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </FadeIn>

      {/* Mobile and tablet cards */}
      <Container className="lg:hidden">
        <div className="mt-10 divide-y divide-[#343434] border-y border-[#343434]">
          {PRACTICE_AREAS.map((area, index) => (
            <FadeIn key={area.title} delay={index * 0.05}>
              <article className="py-7 sm:py-9">
                <Link
                  href={area.href}
                  aria-label={`Explore ${area.title}`}
                  className={clsx(
                    "group block",
                    "focus-visible:outline focus-visible:outline-2",
                    "focus-visible:outline-offset-4",
                    "focus-visible:outline-[#B08D57]"
                  )}
                >
                  <div className="grid gap-6 md:grid-cols-[0.78fr_1.22fr] md:items-center">
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1A1A]">
                      <Image
                        src={area.image}
                        alt={area.alt}
                        fill
                        sizes="(min-width: 768px) 40vw, 100vw"
                        className="object-cover opacity-80 grayscale-[20%] transition-transform duration-700 group-hover:scale-[1.035]"
                      />

                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-black/25"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between gap-6">
                        <span className="text-[0.62rem] font-medium uppercase tracking-[0.26em] text-[#B08D57]">
                          {area.number}
                        </span>

                        <span
                          aria-hidden="true"
                          className="flex h-9 w-9 items-center justify-center border border-[#3C3C3C] text-[#B08D57]"
                        >
                          <ArrowUpRight
                            size={16}
                            strokeWidth={1.4}
                          />
                        </span>
                      </div>

                      <h3
                        className={clsx(
                          "mt-5 max-w-[16ch] font-serif",
                          "text-[clamp(1.85rem,6.5vw,2.75rem)]",
                          "font-medium leading-[1.04]",
                          "tracking-[-0.035em]",
                          "!text-[#F7F6F3]"
                        )}
                      >
                        {area.title}
                      </h3>

                      <p className="mt-4 max-w-[38rem] text-[0.94rem] leading-7 text-[#B8B9BA]">
                        {area.description}
                      </p>

                      <span
                        className={clsx(
                          "mt-5 inline-flex items-center gap-3",
                          "text-[0.66rem] font-medium uppercase",
                          "tracking-[0.22em] text-[#F7F6F3]",
                          "transition-colors duration-300",
                          "group-hover:text-[#B08D57]"
                        )}
                      >
                        Explore this area

                        <ArrowUpRight
                          aria-hidden="true"
                          size={14}
                          strokeWidth={1.4}
                          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>

      {/* Compact closing CTA */}
      <Container className="pb-20 sm:pb-24 lg:pb-28">
        <FadeIn delay={0.18}>
          <div className="mt-10 flex flex-col gap-6 border-t border-[#343434] pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[38rem] text-sm leading-7 text-[#9EA0A2]">
              Every matter begins with understanding the commercial context,
              identifying the legal risk and defining a practical route
              forward.
            </p>

            <Button
              href="#contact"
              size="large"
              className="!text-[#F7F6F3]"
            >
              Discuss a Matter
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}