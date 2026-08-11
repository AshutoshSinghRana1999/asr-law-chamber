"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import {
  type MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

const NAVIGATION = [
  {
    label: "Expertise",
    href: "/#expertise",
    id: "expertise",
  },
  {
    label: "About",
    href: "/#about",
    id: "about",
  },
  {
    label: "Insights",
    href: "/#insights",
    id: "insights",
  },
  {
    label: "Contact",
    href: "/#contact",
    id: "contact",
  },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const isHomePage = pathname === "/";

  const scrollToSection = useCallback(
    (sectionId: string, updateHistory = true) => {
      const section = document.getElementById(sectionId);

      if (!section) {
        return;
      }

      const header = document.querySelector<HTMLElement>(
        "[data-site-header]"
      );

      const headerHeight =
        header?.getBoundingClientRect().height ??
        (window.innerWidth >= 1024 ? 92 : 84);

      const sectionTop =
        section.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      if (
        updateHistory &&
        window.location.hash !== `#${sectionId}`
      ) {
        window.history.pushState(
          null,
          "",
          `#${sectionId}`
        );
      }

      window.scrollTo({
        top: Math.max(0, sectionTop),
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });

      setActiveSection(sectionId);
    },
    [shouldReduceMotion]
  );

  const handleNavigationClick = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    if (!isHomePage) {
      setIsMenuOpen(false);
      return;
    }

    event.preventDefault();
    setIsMenuOpen(false);

    window.requestAnimationFrame(() => {
      scrollToSection(sectionId);
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isHomePage) {
      setActiveSection("");
      return;
    }

    const sections = NAVIGATION.map((item) =>
      document.getElementById(item.id)
    ).filter(
      (section): section is HTMLElement => Boolean(section)
    );

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio -
              first.intersectionRatio
          );

        if (visibleEntries.length > 0) {
          setActiveSection(
            visibleEntries[0].target.id
          );
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0.05, 0.2, 0.5, 0.75],
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [isHomePage, pathname]);

  useEffect(() => {
    if (!isHomePage) {
      return;
    }

    const hashSection = window.location.hash.replace(
      "#",
      ""
    );

    const isKnownSection = NAVIGATION.some(
      (item) => item.id === hashSection
    );

    if (!hashSection || !isKnownSection) {
      return;
    }

    const firstFrame = window.requestAnimationFrame(
      () => {
        const secondFrame =
          window.requestAnimationFrame(() => {
            scrollToSection(hashSection, false);
          });

        return () => {
          window.cancelAnimationFrame(secondFrame);
        };
      }
    );

    return () => {
      window.cancelAnimationFrame(firstFrame);
    };
  }, [isHomePage, scrollToSection]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        data-site-header
        className={clsx(
          "fixed inset-x-0 top-0 z-50",
          "transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500",
          isMenuOpen
            ? [
                "border-b border-[var(--border)]",
                "bg-[rgba(247,246,243,0.94)]",
                "shadow-[0_8px_30px_rgba(17,17,17,0.045)]",
                "backdrop-blur-xl",
              ]
            : isScrolled
              ? [
                  "border-b border-black/10",
                  "bg-[rgba(247,246,243,0.72)]",
                  "shadow-[0_8px_30px_rgba(17,17,17,0.08)]",
                  "backdrop-blur-xl",
                ]
              : isHomePage
                ? "border-b border-black/10 bg-transparent"
                : [
                    "border-b border-[var(--border)]",
                    "bg-[rgba(247,246,243,0.82)]",
                    "backdrop-blur-xl",
                  ]
        )}
      >
        <Container>
          <div className="relative flex h-[84px] items-center justify-between lg:h-[92px]">
            <Link
              href="/"
              aria-label="ASR LAW homepage"
              onClick={closeMenu}
              className={clsx(
                "group relative z-10 flex items-center gap-3.5",
                "focus-visible:outline focus-visible:outline-2",
                "focus-visible:outline-offset-4",
                "focus-visible:outline-[var(--accent)]"
              )}
            >
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden sm:h-[52px] sm:w-[52px]">
                <Image
                  src="/images/logo.png"
                  alt="ASR LAW monogram"
                  width={58}
                  height={58}
                  priority
                  className={clsx(
                    "h-full w-full object-contain",
                    "transition-transform duration-500",
                    "group-hover:scale-[1.04]"
                  )}
                />
              </span>

              <span className="flex flex-col">
                <span
                  className={clsx(
                    "font-serif text-[1.05rem] font-medium",
                    "leading-none tracking-[0.2em]",
                    "text-[var(--text-primary)]",
                    "transition-colors duration-500",
                    "sm:text-[1.12rem]"
                  )}
                >
                  ASR LAW
                </span>

                <span
                  className={clsx(
                    "mt-1.5 hidden text-[0.58rem] font-medium",
                    "uppercase leading-none tracking-[0.24em]",
                    "text-[var(--text-secondary)]",
                    "transition-colors duration-500 sm:block"
                  )}
                >
                  Advocates &amp; Legal Consultants
                </span>
              </span>
            </Link>

            <nav
  aria-label="Primary navigation"
  className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex xl:gap-9"
>
              {NAVIGATION.map((item) => {
                const isActive =
                  activeSection === item.id;

                return (
                  <Link
                    key={item.id}
                    href={
                      isHomePage
                        ? `#${item.id}`
                        : item.href
                    }
                    onClick={(event) =>
                      handleNavigationClick(
                        event,
                        item.id
                      )
                    }
                    aria-current={
                      isActive
                        ? "location"
                        : undefined
                    }
                    className={clsx(
                      "group relative py-3 text-[0.82rem] font-medium",
                      "uppercase tracking-[0.13em]",
                      "transition-colors duration-300",
                      isActive
                        ? "text-[var(--text-primary)]"
                        : [
                            "text-[var(--text-secondary)]",
                            "hover:text-[var(--text-primary)]",
                          ]
                    )}
                  >
                    {item.label}

                    {isActive ? (
                      <motion.span
                        layoutId="navbar-active-indicator"
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-1 h-px bg-[var(--accent)]"
                        transition={{
                          duration: 0.35,
                          ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                          ],
                        }}
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className={clsx(
                          "absolute inset-x-0 bottom-1 h-px",
                          "origin-right scale-x-0 bg-[var(--accent)]",
                          "transition-transform duration-500",
                          "group-hover:origin-left",
                          "group-hover:scale-x-100"
                        )}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              aria-label={
                isMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() =>
                setIsMenuOpen(
                  (current) => !current
                )
              }
              className={clsx(
                "relative z-10 flex h-11 w-11 items-center justify-center lg:hidden",
                "text-[var(--text-primary)]",
                "transition-colors duration-300",
                "hover:text-[var(--accent)]",
                "focus-visible:outline focus-visible:outline-2",
                "focus-visible:outline-offset-4",
                "focus-visible:outline-[var(--accent)]"
              )}
            >
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                {isMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{
                      opacity: 0,
                      rotate: -30,
                      scale: 0.85,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: 30,
                      scale: 0.85,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                  >
                    <X
                      aria-hidden="true"
                      size={25}
                      strokeWidth={1.5}
                    />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{
                      opacity: 0,
                      rotate: 30,
                      scale: 0.85,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: -30,
                      scale: 0.85,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                  >
                    <Menu
                      aria-hidden="true"
                      size={27}
                      strokeWidth={1.4}
                    />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className={clsx(
              "fixed inset-x-0 bottom-0 top-[84px] z-40 lg:hidden",
              "overflow-y-auto bg-[var(--background)]"
            )}
            initial={{
              opacity: 0,
              y: -12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -12,
            }}
            transition={{
              duration: 0.35,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          >
            <Container className="flex min-h-full flex-col py-10 sm:py-14">
              <nav
                aria-label="Mobile navigation"
                className="flex flex-col"
              >
                {NAVIGATION.map(
                  (item, index) => {
                    const isActive =
                      activeSection === item.id;

                    return (
                      <motion.div
                        key={item.id}
                        initial={{
                          opacity: 0,
                          y: 22,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.55,
                          delay:
                            0.08 +
                            index * 0.06,
                          ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                          ],
                        }}
                      >
                        <Link
                          href={
                            isHomePage
                              ? `#${item.id}`
                              : item.href
                          }
                          onClick={(event) =>
                            handleNavigationClick(
                              event,
                              item.id
                            )
                          }
                          aria-current={
                            isActive
                              ? "location"
                              : undefined
                          }
                          className={clsx(
                            "group flex items-center justify-between",
                            "border-b border-[var(--border)] py-5",
                            "font-serif text-[clamp(2.25rem,10vw,3.75rem)]",
                            "font-medium leading-none tracking-[-0.035em]",
                            "transition-colors duration-300",
                            isActive
                              ? "text-[var(--accent)]"
                              : [
                                  "text-[var(--text-primary)]",
                                  "hover:text-[var(--accent)]",
                                ]
                          )}
                        >
                          <span>
                            {item.label}
                          </span>

                          <span
                            aria-hidden="true"
                            className={clsx(
                              "font-sans text-[0.68rem] font-medium",
                              "tracking-[0.2em]",
                              "text-[var(--text-secondary)]",
                              "transition-transform duration-300",
                              "group-hover:translate-x-1"
                            )}
                          >
                            0{index + 1}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  }
                )}
              </nav>

              <motion.div
                className="mt-auto pt-12"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.45,
                }}
              >
                <Button
                  href="/#contact"
                  size="large"
                  onClick={closeMenu}
                >
                  Schedule Consultation
                </Button>

                <div
                  className={clsx(
                    "mt-10 grid gap-6 border-t border-[var(--border)] pt-7",
                    "text-sm text-[var(--text-secondary)] sm:grid-cols-2"
                  )}
                >
                  <div>
                    <p className="eyebrow mb-3">
                      Location
                    </p>

                    <p className="max-w-[17rem] leading-6">
                      New Delhi, India
                    </p>
                  </div>

                  <div>
                    <p className="eyebrow mb-3">
                      Contact
                    </p>

                    <div className="flex flex-col items-start gap-1.5">
                      <a
                        href="tel:+918839476921"
                        className="transition-colors duration-300 hover:text-[var(--accent)]"
                      >
                        +91 88394 76921
                      </a>

                      <a
                        href="mailto:advocateashutoshsinghrana@gmail.com"
                        className={clsx(
                          "break-all transition-colors duration-300",
                          "hover:text-[var(--accent)]"
                        )}
                      >
                        advocateashutoshsinghrana@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}