import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ArticleContactCTA() {
  return (
    <section className="mt-14 border-y border-[#D8D3C8] py-9">
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#B08D57]">
        Discuss a related matter
      </p>

      <p className="mt-5 max-w-xl text-base leading-7 text-[#5C6570]">
        ASR LAW advises clients on commercial disputes, financial enforcement,
        arbitration, insolvency and intellectual-property matters.
      </p>

      <Link
        href="/#contact"
        className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#111111] transition-colors hover:text-[#B08D57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B08D57]"
      >
        Contact the Firm

        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4"
          strokeWidth={1.6}
        />
      </Link>
    </section>
  );
}