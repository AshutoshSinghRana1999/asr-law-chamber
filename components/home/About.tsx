"use client";

import Image from "next/image";
import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";

const PRIMARY_COPY =
  "ASR LAW is an independent legal practice based in New Delhi, advising and representing businesses, financial institutions and individuals across commercial, civil, banking, insolvency, arbitration, property and intellectual property matters.";

const SECONDARY_COPY =
  "The practice is built around close attention to each matter, clear communication and legal strategy shaped by the client’s commercial and practical objectives.";

const PULL_QUOTE =
  "Every matter requires more than legal knowledge. It requires judgment, preparation and a clear understanding of what is at stake.";

const PRINCIPLES = [
  {
    number: "01",
    label: "Approach",
    description: "Focused, prepared and commercially aware.",
  },
  {
    number: "02",
    label: "Communication",
    description: "Clear advice throughout every stage.",
  },
  {
    number: "03",
    label: "Involvement",
    description: "Direct attention to the issues that matter.",
  },
] as const;

export default function About() {
  const shouldReduceMotion = useReducedMotion();
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--background)]"
    >
      <Container className="pb-20 pt-12 sm:pb-24 sm:pt-14 lg:pb-28 lg:pt-16">
        {/* Section headings */}
        <div className="grid grid-cols-1 gap-8 border-t border-[var(--border)] pt-6 lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <FadeIn
            distance={20}
            duration={0.7}
            className="min-w-0 lg:col-span-4"
          >
            <div className="flex items-start justify-between gap-8">
              <div>
                <h2
                  id="about-heading"
                  className={clsx(
                    "max-w-[10ch] font-serif font-medium",
                    "text-[clamp(2.8rem,3.8vw,4.5rem)]",
                    "leading-[1.04] tracking-[-0.045em]",
                    "text-[var(--text-primary)]"
                  )}
                >
                  About ASR LAW
                </h2>

                <p className="mt-4 text-[0.68rem] font-medium uppercase tracking-[0.27em] text-[var(--text-secondary)]">
                  Independent Practice
                </p>
              </div>

              <span className="pt-2 text-[0.68rem] font-medium tracking-[0.2em] text-[var(--accent)]">
                02
              </span>
            </div>
          </FadeIn>

          <FadeIn
            delay={0.08}
            direction="none"
            duration={0.75}
            className="min-w-0 lg:col-span-8"
          >
            <p
              className={clsx(
                "max-w-[18ch] font-serif font-medium",
                "text-[clamp(2.8rem,3.8vw,4.5rem)]",
                "leading-[1.04] tracking-[-0.045em]",
                "text-[var(--text-primary)]"
              )}
            >
              Independent legal practice. Direct strategic involvement.
            </p>
          </FadeIn>
        </div>

        {/* Image, description and guiding principle */}
        <div className="mt-8 grid grid-cols-1 gap-9 md:grid-cols-2 lg:mt-10 lg:grid-cols-12 lg:items-start lg:gap-x-10 xl:gap-x-14">
          <FadeIn
            distance={18}
            duration={0.72}
            className="min-w-0 md:col-span-1 lg:col-span-6"
          >
            <figure>
              <div className="relative aspect-[8/5] overflow-hidden bg-[#DDD8CF]">
                {!imageFailed ? (
                  <>
                    <motion.div
                      className="absolute inset-0"
                      initial={
                        shouldReduceMotion
                          ? false
                          : {
                              scale: 1.035,
                            }
                      }
                      whileInView={{ scale: 1 }}
                      viewport={{
                        once: true,
                        amount: 0.25,
                      }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 1.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Image
                        src="/images/about/about-asr.jpg"
                        alt="Contemporary architectural interior representing ASR LAW's independent legal practice in New Delhi"
                        fill
                        sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                        onError={() => setImageFailed(true)}
                      />
                    </motion.div>

                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-black/[0.04]"
                    />
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col justify-between bg-[#DDD8CF] p-7 sm:p-9">
                    <span className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[var(--text-primary)]">
                      ASR LAW
                    </span>

                    <span className="text-sm text-[var(--text-secondary)]">
                      New Delhi, India
                    </span>
                  </div>
                )}

                <motion.div
                  aria-hidden="true"
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          scaleX: 1,
                        }
                  }
                  whileInView={{ scaleX: 0 }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.9,
                    delay: shouldReduceMotion ? 0 : 0.08,
                    ease: [0.77, 0, 0.18, 1],
                  }}
                  className="absolute inset-0 origin-right bg-[var(--background)]"
                />
              </div>
            </figure>
          </FadeIn>

          <div className="min-w-0 md:col-span-1 lg:col-span-4">
            <FadeIn
              delay={0.08}
              distance={18}
              duration={0.65}
            >
              <p className="text-[clamp(1.05rem,1.15vw,1.15rem)] leading-[1.8] text-[var(--text-primary)]">
                {PRIMARY_COPY}
              </p>
            </FadeIn>

            <FadeIn
              delay={0.14}
              distance={14}
              duration={0.65}
            >
              <p className="mt-5 text-[0.97rem] leading-[1.8] text-[var(--text-secondary)]">
                {SECONDARY_COPY}
              </p>
            </FadeIn>

            <FadeIn
              delay={0.18}
              distance={12}
              duration={0.6}
            >
              <div className="mt-7">
                <Button href="#contact" size="large">
                  Discuss Your Matter
                </Button>
              </div>
            </FadeIn>
          </div>

          <FadeIn
            delay={0.14}
            direction="none"
            duration={0.75}
            className="min-w-0 md:col-span-2 lg:col-span-2"
          >
            <blockquote className="relative border-t border-[var(--border)] pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0 xl:pl-8">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-px w-12 bg-[var(--accent)] lg:h-14 lg:w-px"
              />

              <p className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-[var(--accent)]">
                Guiding Principle
              </p>

              <p className="mt-4 font-serif text-[clamp(1.35rem,1.6vw,1.75rem)] font-medium leading-[1.25] tracking-[-0.025em] text-[var(--text-primary)]">
                {PULL_QUOTE}
              </p>
            </blockquote>
          </FadeIn>
        </div>

        {/* Compact principles strip */}
        <FadeIn
          delay={0.12}
          distance={16}
          duration={0.65}
        >
          <div className="mt-10 grid border-y border-[var(--border)] sm:grid-cols-3">
            {PRINCIPLES.map((principle, index) => (
              <div
                key={principle.label}
                className={clsx(
                  "relative py-5 sm:py-6",
                  index < PRINCIPLES.length - 1 &&
                    "border-b border-[var(--border)] sm:border-b-0 sm:border-r",
                  index === 0 && "sm:pr-8",
                  index === 1 && "sm:px-8",
                  index === 2 && "sm:pl-8"
                )}
              >
                <div className="flex items-center justify-between gap-5">
                  <p className="text-[0.64rem] font-medium uppercase tracking-[0.23em] text-[var(--accent)]">
                    {principle.label}
                  </p>

                  <span className="text-[0.58rem] font-medium tracking-[0.17em] text-[var(--text-secondary)]">
                    {principle.number}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-[var(--text-primary)]">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}