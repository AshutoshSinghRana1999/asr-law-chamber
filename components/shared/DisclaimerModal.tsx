"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

const DISCLAIMER_STORAGE_KEY = "asr-law-disclaimer-accepted";

export default function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const hasAcceptedDisclaimer =
      window.localStorage.getItem(DISCLAIMER_STORAGE_KEY) === "true";

    if (!hasAcceptedDisclaimer) {
      setIsOpen(true);
    }

    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isReady]);

  const handleAccept = () => {
    window.localStorage.setItem(DISCLAIMER_STORAGE_KEY, "true");
    setIsOpen(false);
  };

  if (!isReady || !isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
      aria-describedby="disclaimer-description"
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/75 px-5 py-8 backdrop-blur-sm sm:px-8"
    >
      <div
        className={clsx(
          "relative w-full max-w-3xl",
          "border border-[#3A3A3A] bg-[#111111]",
          "px-6 py-8 text-[#F7F6F3]",
          "shadow-[0_24px_80px_rgba(0,0,0,0.45)]",
          "sm:px-10 sm:py-10 lg:px-12 lg:py-12"
        )}
      >
        <p className="text-[0.66rem] font-medium uppercase tracking-[0.28em] text-[#B08D57]">
          Website Disclaimer
        </p>

        <h2
          id="disclaimer-title"
          className="mt-5 max-w-2xl font-serif text-[1.8rem] font-medium leading-[1.15] tracking-[-0.025em] !text-[#F7F6F3] sm:text-[2.2rem]"
        >
          Important information before proceeding
        </h2>

        <div
          id="disclaimer-description"
          className="mt-7 max-h-[48vh] space-y-5 overflow-y-auto pr-2 text-sm leading-7 text-[#B8B9BA] sm:text-[0.95rem]"
        >
          <p>
            The rules of the Bar Council of India do not permit advocates to
            solicit work or advertise. By accessing this website, you
            acknowledge that you are seeking information about ASR LAW of your
            own accord and that there has been no solicitation, advertisement
            or inducement by ASR LAW or any of its members.
          </p>

          <p>
            The content available on this website is provided solely for
            general informational purposes. It should not be construed as
            legal advice, a legal opinion or a substitute for advice relating
            to any specific facts or circumstances.
          </p>

          <p>
            Accessing this website, using its contents or contacting ASR LAW
            through the website does not by itself create an advocate-client
            relationship. Such a relationship will arise only after a matter
            has been formally accepted and the terms of engagement have been
            confirmed.
          </p>

          <p>
            ASR LAW does not make any representation or warranty regarding the
            completeness, accuracy or continued applicability of the
            information available on this website. Visitors should obtain
            appropriate professional advice before acting on any information
            contained here.
          </p>
        </div>

        <div className="mt-8 border-t border-[#343434] pt-7">
          <button
            type="button"
            onClick={handleAccept}
            autoFocus
            className={clsx(
              "inline-flex min-h-12 items-center justify-center",
              "bg-[#B08D57] px-7",
              "text-[0.7rem] font-semibold uppercase",
              "tracking-[0.2em] text-[#111111]",
              "transition-colors duration-300",
              "hover:bg-[#C29D65]",
              "focus-visible:outline focus-visible:outline-2",
              "focus-visible:outline-offset-4",
              "focus-visible:outline-[#F7F6F3]"
            )}
          >
            I Agree and Proceed
          </button>
        </div>
      </div>
    </div>
  );
}