"use client";

import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";

const REPRESENTATIVE_MATTERS = [
  {
    number: "01",
    title: "Banking Recovery & Enforcement",
    forum: "DRT · DRAT · SARFAESI",
    description:
      "Advising and representing financial institutions, businesses and individual stakeholders in recovery, enforcement, securitisation and appellate proceedings.",
  },
  {
    number: "02",
    title: "Insolvency & Creditor Strategy",
    forum: "IBC · NCLT · NCLAT",
    description:
      "Assisting creditors and stakeholders in insolvency proceedings, claim-related disputes, resolution strategy and applications arising under the Insolvency and Bankruptcy Code.",
  },
  {
    number: "03",
    title: "Commercial Disputes & Recovery",
    forum: "Commercial Courts · Civil Courts",
    description:
      "Representation in contractual disputes, commercial recovery proceedings, dishonoured-payment matters and related interim applications.",
  },
  {
    number: "04",
    title: "Arbitration & Contractual Claims",
    forum: "Arbitral Tribunals · Courts",
    description:
      "Advice and representation in arbitration strategy, contractual claims, interim protection and proceedings connected with arbitral awards.",
  },
  {
    number: "05",
    title: "Property, Title & Succession",
    forum: "Civil Courts · Advisory",
    description:
      "Advice relating to property disputes, title review, due diligence, succession, wills and associated civil proceedings.",
  },
  {
    number: "06",
    title: "Intellectual Property",
    forum: "Trademark · Copyright · Advisory",
    description:
      "Assistance with trademark protection, intellectual property strategy, objections, enforcement concerns and related commercial advice.",
  },
] as const;

const INTRODUCTION =
  "A selection of the contentious and advisory work undertaken by the practice, described at a high level to preserve client confidentiality.";

const CLOSING_NOTE =
  "Each engagement is approached according to its legal, commercial and practical context. Past experience does not indicate or guarantee a particular outcome.";

export default function Experience() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative overflow-hidden border-b border-[#B8B0A2] bg-[#E8E3D8] text-[#111111]"
    >
      <Container className="py-[clamp(6rem,8vw,9rem)]">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-14 xl:gap-x-20">
          <div className="min-w-0 lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <FadeIn>
                <div className="border-t border-[#B8B0A2] pt-6">
                  <div className="flex items-start justify-between gap-8">
                    <div>
                      <p className="font-serif text-[clamp(1.6rem,1.8vw,2rem)] font-medium leading-[1.1] tracking-[-0.03em] text-[#111111]">
                        Representative Experience
                      </p>

                      <p className="mt-4 text-[0.68rem] font-medium uppercase tracking-[0.27em] text-[#5C6570]">
                        Selected Matter Categories
                      </p>
                    </div>

                    <span className="pt-1 text-[0.68rem] font-medium tracking-[0.2em] text-[#B08D57]">
                      03
                    </span>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.08}>
                <div
                  id="experience-heading"
                  className={clsx(
                    "mt-10",
                    "[&>div]:!max-w-none",
                    "[&_h2]:!max-w-[11ch]",
                    "[&_h2]:!text-[clamp(2.8rem,3.8vw,4.5rem)]",
                    "[&_h2]:!leading-[1.03]",
                    "[&_h2]:!tracking-[-0.045em]"
                  )}
                >
                  <SectionHeading title="Experience shaped by the demands of the matter." />
                </div>
              </FadeIn>

              <FadeIn delay={0.16}>
                <p className="mt-8 max-w-[35rem] text-[1rem] leading-[1.8] text-[#5C6570]">
                  {INTRODUCTION}
                </p>
              </FadeIn>

              <FadeIn delay={0.24}>
                <div className="mt-9">
                  <Button href="#contact" size="large">
                    Discuss a Matter
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-8">
            <ol className="border-b border-[#B8B0A2]">
              {REPRESENTATIVE_MATTERS.map((matter, index) => (
                <motion.li
                  key={matter.number}
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 24,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.72,
                    delay: shouldReduceMotion ? 0 : index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-t border-[#B8B0A2]"
                >
                  <a
                    href="#contact"
                    aria-label={`Discuss ${matter.title}`}
                    className={clsx(
                      "group grid grid-cols-[2.5rem_minmax(0,1fr)_2.5rem]",
                      "gap-x-5 gap-y-6 py-8 sm:py-10",
                      "transition-colors duration-500",
                      "hover:bg-white/20",
                      "focus-visible:outline focus-visible:outline-2",
                      "focus-visible:outline-offset-4",
                      "focus-visible:outline-[#B08D57]",
                      "lg:grid-cols-[3rem_minmax(0,0.95fr)_minmax(0,1.15fr)_2.5rem]",
                      "lg:items-start lg:gap-x-8 lg:px-5",
                      "xl:gap-x-10 xl:px-7"
                    )}
                  >
                    <span
                      className={clsx(
                        "pt-1 text-[0.66rem] font-medium tracking-[0.2em]",
                        "text-[#5C6570] transition-colors duration-300",
                        "group-hover:text-[#B08D57]",
                        "group-focus-visible:text-[#B08D57]"
                      )}
                    >
                      {matter.number}
                    </span>

                    <div className="min-w-0">
                      <h3
                        className={clsx(
                          "max-w-[17ch] font-serif",
                          "text-[clamp(1.7rem,2.2vw,2.5rem)]",
                          "font-medium leading-[1.08]",
                          "tracking-[-0.035em] text-[#111111]",
                          "transition-transform duration-500",
                          "group-hover:translate-x-1.5",
                          "group-focus-visible:translate-x-1.5",
                          "motion-reduce:transform-none"
                        )}
                      >
                        {matter.title}
                      </h3>

                      <p className="mt-4 text-[0.68rem] font-medium uppercase leading-5 tracking-[0.2em] text-[#B08D57]">
                        {matter.forum}
                      </p>
                    </div>

                    <p
                      className={clsx(
                        "col-span-2 col-start-2",
                        "max-w-[40rem] text-[0.97rem]",
                        "leading-[1.75] text-[#5C6570]",
                        "lg:col-span-1 lg:col-start-3"
                      )}
                    >
                      {matter.description}
                    </p>

                    <span
                      aria-hidden="true"
                      className={clsx(
                        "col-start-3 row-start-1",
                        "flex h-10 w-10 items-center justify-center",
                        "border border-[#B8B0A2] text-[#111111]",
                        "transition-[border-color,color,transform] duration-300",
                        "group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                        "group-hover:border-[#B08D57]",
                        "group-hover:text-[#B08D57]",
                        "group-focus-visible:-translate-y-0.5",
                        "group-focus-visible:translate-x-0.5",
                        "group-focus-visible:border-[#B08D57]",
                        "group-focus-visible:text-[#B08D57]",
                        "motion-reduce:transform-none",
                        "lg:col-start-4"
                      )}
                    >
                      <ArrowUpRight size={17} strokeWidth={1.4} />
                    </span>
                  </a>
                </motion.li>
              ))}
            </ol>

            <FadeIn delay={0.16}>
              <div className="mt-10 grid gap-6 border-t border-[#B8B0A2] pt-8 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-x-10">
                <p className="text-[0.66rem] font-medium uppercase tracking-[0.24em] text-[#B08D57]">
                  Important Note
                </p>

                <p className="max-w-[43rem] text-sm leading-7 text-[#5C6570]">
                  {CLOSING_NOTE}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}