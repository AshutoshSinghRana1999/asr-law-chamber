"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEvent,
  ReactNode,
} from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "small" | "medium" | "large";

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  showArrow?: boolean;
  className?: string;
  disabled?: boolean;
};

type LinkButtonProps = CommonProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "children" | "className" | "href"
  > & {
    href: string;
  };

type NativeButtonProps = CommonProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "className" | "disabled"
  > & {
    href?: never;
  };

type ButtonProps = LinkButtonProps | NativeButtonProps;

const sizeClasses: Record<ButtonSize, string> = {
  small: "min-h-10 gap-2.5 text-sm",
  medium: "min-h-11 gap-3 text-[0.95rem]",
  large: "min-h-12 gap-3.5 text-base",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "font-medium text-[var(--text-primary)]",
  secondary: "font-normal text-[var(--text-secondary)]",
};

export default function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "medium",
    showArrow = true,
    className,
    disabled = false,
  } = props;

  const classes = clsx(
    "group relative inline-flex w-fit items-center justify-center",
    "pb-2 pt-1 transition-colors duration-300",
    "hover:text-[var(--accent)]",
    "focus-visible:outline focus-visible:outline-2",
    "focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]",
    "motion-reduce:transition-none",
    sizeClasses[size],
    variantClasses[variant],
    disabled && "pointer-events-none cursor-not-allowed opacity-45",
    className
  );

  const content = (
    <>
      <span>{children}</span>

      {showArrow && (
        <ArrowRight
          aria-hidden="true"
          strokeWidth={1.6}
          className={clsx(
            "shrink-0 transition-transform duration-300",
            "group-hover:translate-x-1.5",
            "motion-reduce:transform-none motion-reduce:transition-none",
            size === "small" && "h-4 w-4",
            size === "medium" && "h-[1.1rem] w-[1.1rem]",
            size === "large" && "h-5 w-5"
          )}
        />
      )}

      <span
        aria-hidden="true"
        className={clsx(
          "absolute inset-x-0 bottom-0 h-px",
          "origin-right scale-x-0 bg-[var(--accent)]",
          "transition-transform duration-500",
          "group-hover:origin-left group-hover:scale-x-100",
          "motion-reduce:transition-none"
        )}
      />
    </>
  );

  if ("href" in props && props.href) {
    const {
      href,
      target,
      rel,
      onClick,
      ...anchorProps
    } = props as LinkButtonProps;

    const isExternal =
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:");

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }

      onClick?.(event);
    };

    if (isExternal) {
      return (
        <a
          {...anchorProps}
          href={href}
          target={target}
          rel={
            target === "_blank"
              ? rel ?? "noopener noreferrer"
              : rel
          }
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : anchorProps.tabIndex}
          onClick={handleClick}
          className={classes}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        {...anchorProps}
        href={href}
        target={target}
        rel={rel}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : anchorProps.tabIndex}
        onClick={handleClick}
        className={classes}
      >
        {content}
      </Link>
    );
  }

  const {
    type = "button",
    ...buttonProps
  } = props as NativeButtonProps;

  return (
    <button
      {...buttonProps}
      type={type}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
}