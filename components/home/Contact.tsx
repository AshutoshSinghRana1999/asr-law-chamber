"use client";

import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Mail,
  Phone,
  Send,
  type LucideIcon,
} from "lucide-react";
import { useRef, useState, type FormEvent } from "react";

import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";

const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLScH-mgpefEh6aAq45AsRvAvmrrTK4kLk4kLE5MV6ARuHYiKKQ/formResponse";


const FORM_FIELDS = {
  name: "entry.2005620554",
  email: "entry.1045781291",
  address: "entry.1065046570",
  phone: "entry.1166974658",
  query: "entry.839337160",
} as const;

type ContactMethod = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
};

const CONTACT_METHODS: ContactMethod[] = [
  {
    label: "Telephone",
    value: "+91 88394 76921",
    href: "tel:+918839476921",
    icon: Phone,
  },
  {
    label: "Email",
    value: "advocateashutoshsinghrana@gmail.com",
    href: "mailto:advocateashutoshsinghrana@gmail.com",
    icon: Mail,
  },
];

const FIELD_LABEL_CLASS_NAME = clsx(
  "block text-[0.64rem] font-medium uppercase",
  "tracking-[0.22em] text-[#B08D57]"
);

const FIELD_CLASS_NAME = clsx(
  "block w-full appearance-none rounded-none",
  "border-0 border-b border-[#5A5A5A]",
  "bg-transparent px-0 py-3.5",
  "text-base leading-7 text-[#F7F6F3]",
  "caret-[#B08D57]",
  "placeholder:text-[#777A7C]",
  "transition-colors duration-300",
  "hover:border-[#81735E]",
  "focus:border-[#B08D57] focus:outline-none focus:ring-0",
  "focus-visible:border-[#B08D57]",
  "disabled:cursor-not-allowed disabled:opacity-60",
  "autofill:bg-transparent autofill:text-[#F7F6F3]"
);

function ContactMethodLink({
  method,
}: {
  method: ContactMethod;
}) {
  const Icon = method.icon;

  return (
    <a
      href={method.href}
      aria-label={`${method.label}: ${method.value}`}
      className={clsx(
        "group flex min-w-0 items-start gap-4",
        "focus-visible:outline focus-visible:outline-1",
        "focus-visible:outline-offset-4",
        "focus-visible:outline-[#B08D57]"
      )}
    >
      <Icon
        aria-hidden="true"
        size={18}
        strokeWidth={1.35}
        className="mt-1 shrink-0 text-[#B08D57]"
      />

      <span className="min-w-0 flex-1">
        <span className="block text-[0.61rem] font-medium uppercase tracking-[0.2em] text-[#85888A]">
          {method.label}
        </span>

        <span
          className={clsx(
            "mt-2 flex min-w-0 items-start gap-3",
            "text-[clamp(1rem,1.1vw,1.12rem)] leading-7",
            "text-[#F7F6F3] transition-colors duration-300",
            "group-hover:text-[#B08D57]",
            "group-focus-visible:text-[#B08D57]"
          )}
        >
          <span className="min-w-0 break-words [overflow-wrap:anywhere]">
            {method.value}
          </span>

          <ArrowUpRight
            aria-hidden="true"
            size={15}
            strokeWidth={1.4}
            className={clsx(
              "mt-1 shrink-0 transition-transform duration-300",
              "group-hover:-translate-y-0.5",
              "group-hover:translate-x-0.5",
              "group-focus-visible:-translate-y-0.5",
              "group-focus-visible:translate-x-0.5",
              "motion-reduce:transform-none"
            )}
          />
        </span>

        <span
          aria-hidden="true"
          className={clsx(
            "mt-1 block h-px w-0 bg-[#B08D57]",
            "transition-[width] duration-300",
            "group-hover:w-full",
            "group-focus-visible:w-full",
            "motion-reduce:transition-none"
          )}
        />
      </span>
    </a>
  );
}

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setIsSubmitting(true);
    setIsSubmitted(false);
    setSubmissionError(false);

    try {
      const formData = new FormData(form);

      // The Google Form was originally configured with an Address
      // question. Keep that entry populated even though the website
      // no longer asks visitors to provide an address.
      formData.set(FORM_FIELDS.address, "Not provided");

      const encodedData = new URLSearchParams();

      formData.forEach((value, key) => {
        if (typeof value === "string") {
          encodedData.append(key, value);
        }
      });

      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: encodedData.toString(),
      });

      form.reset();
      setIsSubmitted(true);
    } catch {
      setSubmissionError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const revealInitial = shouldReduceMotion
    ? false
    : {
        opacity: 0,
        y: 16,
      };

  const fadeInitial = shouldReduceMotion
    ? false
    : {
        opacity: 0,
      };

  const revealTransition = {
    duration: shouldReduceMotion ? 0 : 0.65,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  const fieldTransition = (delay: number) => ({
    duration: shouldReduceMotion ? 0 : 0.55,
    delay: shouldReduceMotion ? 0 : delay,
    ease: [0.22, 1, 0.36, 1] as const,
  });

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative border-b border-[#343434] bg-[#111111] text-[#F7F6F3]"
    >
      <Container className="pb-[clamp(5.5rem,7vw,8rem)] pt-[clamp(5.5rem,7vw,8rem)]">
        <header className="border-t border-[#343434] pt-7 sm:pt-8">
          <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-14 xl:gap-x-16">
            <FadeIn
              distance={20}
              duration={0.7}
              className="min-w-0 lg:col-span-4"
            >
              <div className="flex items-start justify-between gap-8 lg:max-w-[22rem]">
                <div>
                  <p className="font-serif text-[clamp(2.6rem,3.2vw,3.8rem)] font-medium leading-[0.96] tracking-[-0.045em] text-[#F7F6F3]">
                    Contact
                  </p>

                  <p className="mt-5 text-[0.64rem] font-medium uppercase tracking-[0.28em] text-[#A5A8AA]">
                    ASR LAW · New Delhi
                  </p>
                </div>

                <span className="pt-2 text-[0.64rem] font-medium tracking-[0.2em] text-[#B08D57]">
                  05
                </span>
              </div>
            </FadeIn>

            <FadeIn
              delay={0.08}
              direction="none"
              duration={0.75}
              className="min-w-0 lg:col-span-8"
            >
              <div id="contact-heading">
                <SectionHeading
                  title="Begin with a clear conversation."
                  className="max-w-none"
                  titleClassName={clsx(
                    "!max-w-[14ch]",
                    "!text-[clamp(3rem,4vw,4.8rem)]",
                    "!leading-[1.01]",
                    "!tracking-[-0.048em]",
                    "!text-[#F7F6F3]"
                  )}
                />
              </div>

              <p className="mt-7 max-w-[40rem] text-[clamp(0.98rem,1.05vw,1.08rem)] leading-[1.8] text-[#A5A8AA]">
                For legal enquiries, professional instructions or an initial
                discussion, contact ASR LAW or submit the enquiry form below.
              </p>
            </FadeIn>
          </div>
        </header>

        <div className="mt-14 grid grid-cols-1 gap-y-14 lg:mt-16 lg:grid-cols-12 lg:items-start lg:gap-x-14 xl:gap-x-16">
          <motion.div
            initial={revealInitial}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.1,
            }}
            transition={revealTransition}
            className="min-w-0 lg:col-span-7"
          >
            <div className="border border-[#343434] bg-[#151515]">
              <div className="grid gap-6 border-b border-[#343434] px-6 py-7 sm:px-8 md:grid-cols-[minmax(0,1fr)_minmax(14rem,0.8fr)] md:items-end lg:px-9 xl:px-10">
                <div>
                  <p className="text-[0.64rem] font-medium uppercase tracking-[0.23em] text-[#B08D57]">
                    Enquiry Form
                  </p>

                  <h3 className="mt-4 font-serif !text-[clamp(2rem,2.5vw,2.8rem)] !font-medium !leading-[1.05] !tracking-[-0.04em] !text-[#F7F6F3]">
                    How can we assist?
                  </h3>
                </div>

                <p className="max-w-[25rem] text-sm leading-7 text-[#A5A8AA]">
                  Provide a concise overview of the matter and your preferred
                  contact details.
                </p>
              </div>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                aria-busy={isSubmitting}
                className="px-6 py-8 sm:px-8 lg:px-9 xl:px-10"
              >
                <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
                  <motion.div
                    initial={revealInitial}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={fieldTransition(0.02)}
                  >
                    <label
                      htmlFor="contact-name"
                      className={FIELD_LABEL_CLASS_NAME}
                    >
                      Full Name
                    </label>

                    <input
                      id="contact-name"
                      name={FORM_FIELDS.name}
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your full name"
                      disabled={isSubmitting}
                      className={FIELD_CLASS_NAME}
                    />
                  </motion.div>

                  <motion.div
                    initial={revealInitial}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={fieldTransition(0.06)}
                  >
                    <label
                      htmlFor="contact-phone"
                      className={FIELD_LABEL_CLASS_NAME}
                    >
                      Contact Number
                    </label>

                    <input
                      id="contact-phone"
                      name={FORM_FIELDS.phone}
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="+91"
                      disabled={isSubmitting}
                      className={FIELD_CLASS_NAME}
                    />
                  </motion.div>

                  <motion.div
                    initial={revealInitial}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={fieldTransition(0.1)}
                    className="md:col-span-2"
                  >
                    <label
                      htmlFor="contact-email"
                      className={FIELD_LABEL_CLASS_NAME}
                    >
                      Email Address
                    </label>

                    <input
                      id="contact-email"
                      name={FORM_FIELDS.email}
                      type="email"
                      required
                      autoComplete="email"
                      inputMode="email"
                      placeholder="name@example.com"
                      disabled={isSubmitting}
                      className={FIELD_CLASS_NAME}
                    />
                  </motion.div>

                  <motion.div
                    initial={revealInitial}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={fieldTransition(0.14)}
                    className="md:col-span-2"
                  >
                    <label
                      htmlFor="contact-query"
                      className={FIELD_LABEL_CLASS_NAME}
                    >
                      Brief Description
                    </label>

                    <textarea
                      id="contact-query"
                      name={FORM_FIELDS.query}
                      required
                      rows={4}
                      placeholder="Briefly describe the nature of your enquiry"
                      disabled={isSubmitting}
                      className={clsx(
                        FIELD_CLASS_NAME,
                        "min-h-[118px] resize-y"
                      )}
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={revealInitial}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={fieldTransition(0.16)}
                  className="mt-8 flex flex-col gap-7 border-t border-[#343434] pt-7 sm:flex-row sm:items-center sm:justify-between"
                >
                  <p className="max-w-[27rem] text-xs leading-6 text-[#85888A]">
                    Please avoid including confidential or time-sensitive
                    information until the practice confirms that it can
                    consider the matter.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={clsx(
                      "group inline-flex min-h-12 w-full shrink-0",
                      "items-center justify-center gap-4",
                      "border border-[#B08D57] px-6 py-3",
                      "text-[0.66rem] font-medium uppercase",
                      "tracking-[0.2em] text-[#F7F6F3]",
                      "transition-colors duration-300",
                      "hover:bg-[#B08D57] hover:text-[#111111]",
                      "focus-visible:outline focus-visible:outline-2",
                      "focus-visible:outline-offset-4",
                      "focus-visible:outline-[#B08D57]",
                      "disabled:cursor-wait disabled:opacity-60",
                      "disabled:hover:bg-transparent",
                      "disabled:hover:text-[#F7F6F3]",
                      "sm:w-auto"
                    )}
                  >
                    <span>
                      {isSubmitting ? "Submitting…" : "Submit Enquiry"}
                    </span>

                    <Send
                      aria-hidden="true"
                      size={15}
                      strokeWidth={1.5}
                      className={clsx(
                        "transition-transform duration-300",
                        "group-hover:translate-x-1",
                        "motion-reduce:transform-none"
                      )}
                    />
                  </button>
                </motion.div>

                <div
                  aria-live="polite"
                  aria-atomic="true"
                  className={clsx(
                    "grid transition-[grid-template-rows,opacity,margin]",
                    "duration-500 motion-reduce:transition-none",
                    isSubmitted
                      ? "mt-7 grid-rows-[1fr] opacity-100"
                      : "mt-0 grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    {isSubmitted && (
                      <motion.div
                        initial={
                          shouldReduceMotion
                            ? false
                            : {
                                opacity: 0,
                                y: 10,
                              }
                        }
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.45,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex items-start gap-3 border-t border-[#343434] pt-7"
                      >
                        <Check
                          aria-hidden="true"
                          size={17}
                          strokeWidth={1.5}
                          className="mt-1 shrink-0 text-[#B08D57]"
                        />

                        <p className="max-w-[37rem] text-sm leading-7 text-[#D6D2C9]">
                          Your enquiry has been submitted. ASR LAW will review
                          the information and respond using the details
                          provided.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>

                <div
                  aria-live="polite"
                  aria-atomic="true"
                  className={clsx(
                    "grid transition-[grid-template-rows,opacity,margin]",
                    "duration-500 motion-reduce:transition-none",
                    submissionError
                      ? "mt-7 grid-rows-[1fr] opacity-100"
                      : "mt-0 grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    {submissionError && (
                      <p className="border-t border-[#343434] pt-7 text-sm leading-7 text-[#D6D2C9]">
                        The enquiry could not be sent. Please try again or use
                        the direct email address listed alongside the form.
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </motion.div>

          <motion.aside
            aria-label="ASR LAW contact information"
            initial={fadeInitial}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
              amount: 0.1,
            }}
            transition={{
              ...revealTransition,
              delay: shouldReduceMotion ? 0 : 0.1,
            }}
            className="min-w-0 border-t border-[#343434] lg:col-span-5"
          >
            <div className="border-b border-[#343434] py-8 sm:py-9">
              <p className="text-[0.64rem] font-medium uppercase tracking-[0.23em] text-[#B08D57]">
                Direct Contact
              </p>

              <div className="mt-7 grid gap-8">
                {CONTACT_METHODS.map((method) => (
                  <ContactMethodLink
                    key={method.label}
                    method={method}
                  />
                ))}
              </div>
            </div>

            <div className="border-b border-[#343434] py-8 sm:py-9">
              <p className="text-[0.64rem] font-medium uppercase tracking-[0.23em] text-[#B08D57]">
                Important Notice
              </p>

              <p className="mt-6 max-w-[34rem] text-sm leading-7 text-[#A5A8AA]">
                Submitting an enquiry does not create an advocate-client
                relationship. ASR LAW will confirm separately whether it is
                able to consider the matter. Please do not send confidential or
                time-sensitive information before receiving confirmation.
              </p>
            </div>
          </motion.aside>
        </div>
      </Container>
    </section>
  );
}