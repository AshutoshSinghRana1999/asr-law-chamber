import clsx from "clsx";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "w-full",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.35em] text-[var(--accent)]">
          {eyebrow}
        </p>
      )}

      <h2
        className={clsx(
          "font-serif text-4xl font-medium leading-tight text-[var(--text-primary)] md:text-5xl lg:text-6xl",
          titleClassName
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={clsx(
            "mt-6 text-lg leading-8 text-[var(--text-secondary)]",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}