type Props = {
  title: string;
  subtitle?: string;
  center?: boolean;
};

export default function Heading({
  title,
  subtitle,
  center = false,
}: Props) {
  return (
    <div className={center ? "text-center" : ""}>
      {subtitle && (
        <p className="uppercase tracking-[0.3em] text-sm text-[#B08D57] mb-3">
          {subtitle}
        </p>
      )}

      <h2 className="text-5xl lg:text-6xl font-semibold">
        {title}
      </h2>
    </div>
  );
}