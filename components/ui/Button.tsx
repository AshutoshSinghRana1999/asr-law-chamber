import Link from "next/link";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function Button({
  children,
  href = "#",
  variant = "primary",
  className,
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center gap-2 rounded-full px-7 py-4 transition-all duration-300 font-medium",
    {
      "bg-[#111111] text-white hover:bg-[#B08D57] hover:-translate-y-1":
        variant === "primary",

      "border border-[#E7E2D8] text-[#111111] hover:border-[#B08D57] hover:text-[#B08D57]":
        variant === "secondary",
    },
    className
  );

  return (
    <Link href={href} className={classes}>
      {children}
      <ArrowRight size={18} />
    </Link>
  );
}