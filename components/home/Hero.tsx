"use client";

import Image from "next/image";
import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";

const HERO_COPY =
  "Supporting businesses, financial institutions and individuals through commercially focused legal advice and representation across India.";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[100svh] overflow-hidden border-b border-black/10 bg-[#F7F6F3] pt-[84px] lg:pt-[92px]"
    >
      {/* Full hero background image */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                scale: 1.02,
              }
        }
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: shouldReduceMotion ? 0 : 1.35,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Image
          src="/images/hero/hero-bg.png"
          alt=""
          fill
          priority
          quality={92}
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Very light wash to integrate the image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-white/5"
      />

      {/* Pale gradient behind the main heading */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(247,246,243,0.82)_0%,rgba(247,246,243,0.58)_34%,rgba(247,246,243,0.18)_62%,rgba(247,246,243,0.04)_100%)]"
      />

      {/* Subtle lower fade for the information strip */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(247,246,243,0)_0%,rgba(247,246,243,0)_68%,rgba(247,246,243,0.48)_100%)]"
      />

      <Container className="relative z-10 flex min-h-[calc(100svh-84px)] flex-col lg:min-h-[calc(100svh-92px)]">
        <div className="grid flex-1 content-center gap-14 py-16 sm:py-20 lg:grid-cols-12 lg:gap-0 lg:py-24">
          <div className="lg:col-span-7 lg:pr-14 xl:pr-20">
            <FadeIn delay={0.05}>
              <div className="mb-7 flex items-center gap-4 sm:mb-9">
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-[#B08D57] sm:w-12"
                />

                <p className="text-[0.68rem] font-medium uppercase tracking-[0.3em] !text-[#B08D57]">
                  ASR LAW
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.14}>
              <h1
                id="hero-heading"
                className={clsx(
                  "max-w-none font-serif font-medium !text-[#111111]",
                  "text-[clamp(2.75rem,6.25vw,6.5rem)]",
                  "leading-[0.94] tracking-[-0.055em]"
                )}
              >
                <span className="block whitespace-nowrap">
                  Strategic Legal
                </span>

                <span className="block whitespace-nowrap">
                  Solutions
                  <span className="text-[#B08D57]">.</span>
                </span>
              </h1>
            </FadeIn>
          </div>

          <div className="lg:col-span-5 lg:flex lg:items-start lg:pl-14 xl:pl-20">
            <div className="w-full max-w-[31rem] lg:pt-[4.75rem] xl:pt-[5.5rem]">
              <FadeIn delay={0.24}>
                <p
                  className={clsx(
                    "text-[clamp(1.05rem,1.2vw,1.22rem)]",
                    "leading-[1.8] text-[#5C6570]"
                  )}
                >
                  {HERO_COPY}
                </p>
              </FadeIn>

              <FadeIn delay={0.34}>
                <div className="mt-8 flex flex-col items-start gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-8 lg:flex-col lg:items-start xl:flex-row xl:items-center">
                  <Button href="#contact" size="large">
                    Schedule Consultation
                  </Button>

                  <Button
                    href="#expertise"
                    variant="secondary"
                    size="large"
                  >
                    Explore Expertise
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        <FadeIn delay={0.46}>
          <div
            className={clsx(
              "grid border-t border-black/10",
              "bg-[rgba(247,246,243,0.5)] backdrop-blur-[2px]",
              "sm:grid-cols-3"
            )}
          >
            <div className="flex min-h-20 items-center border-b border-black/10 py-5 sm:border-b-0 sm:pr-8">
              <div>
                <p className="mb-1 text-[0.62rem] font-medium uppercase tracking-[0.25em] text-[#5C6570]">
                  Office
                </p>

                <p className="text-sm text-[#111111]">
                  New Delhi, India
                </p>
              </div>
            </div>

            <div className="flex min-h-20 items-center border-b border-black/10 py-5 sm:border-b-0 sm:border-l sm:border-r sm:border-black/10 sm:px-8">
              <div>
                <p className="mb-1 text-[0.62rem] font-medium uppercase tracking-[0.25em] text-[#5C6570]">
                  Practice
                </p>

                <p className="text-sm text-[#111111]">
                  Independent Law Practice
                </p>
              </div>
            </div>

            <div className="flex min-h-20 items-center py-5 sm:justify-end sm:pl-8">
              <a
                href="#expertise"
                aria-label="Scroll to expertise"
                className={clsx(
                  "group inline-flex items-center gap-3",
                  "text-[0.66rem] font-medium uppercase tracking-[0.25em]",
                  "text-[#5C6570]",
                  "transition-colors duration-300",
                  "hover:text-[#B08D57]",
                  "focus-visible:outline focus-visible:outline-2",
                  "focus-visible:outline-offset-4 focus-visible:outline-[#B08D57]"
                )}
              >
                <span>Scroll</span>

                <motion.span
                  aria-hidden="true"
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: [0, 4, 0],
                        }
                  }
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={clsx(
                    "flex h-8 w-8 items-center justify-center",
                    "border border-black/15",
                    "transition-colors duration-300",
                    "group-hover:border-[#B08D57]"
                  )}
                >
                  <ArrowDown size={14} strokeWidth={1.5} />
                </motion.span>
              </a>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}