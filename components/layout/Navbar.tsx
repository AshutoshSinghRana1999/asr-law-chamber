"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-white/80 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}

        <Link href="/" className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-full border border-[#B08D57] flex items-center justify-center">

            <span className="font-serif text-[#B08D57] text-xl font-semibold">
              ASR
            </span>

          </div>

          <div>

            <h1 className="text-xl font-semibold">
              ASR Law
            </h1>

            <p className="text-xs tracking-[0.3em] uppercase text-gray-500">
              Advocates & Legal Consultants
            </p>

          </div>

        </Link>

        {/* Menu */}

        <nav className="hidden md:flex items-center gap-10 text-sm">

          <Link href="/">Home</Link>

          <Link href="/about">About</Link>

          <Link href="/practice-areas">Practice Areas</Link>

          <Link href="/insights">Insights</Link>

          <Link href="/contact">Contact</Link>

        </nav>

        <Button href="/contact">
          Schedule Consultation
        </Button>

      </div>
    </header>
  );
}