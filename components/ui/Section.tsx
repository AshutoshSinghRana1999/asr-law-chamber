type Props = {
  children: React.ReactNode;
  id?: string;
};

export default function Section({
  children,
  id,
}: Props) {
  return (
    <section
      id={id}
      className="py-24 lg:py-32"
    >
      {children}
    </section>
  );
}