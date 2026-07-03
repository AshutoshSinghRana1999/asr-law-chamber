type Props = {
  children: React.ReactNode;
};

export default function Card({
  children,
}: Props) {
  return (
    <div className="rounded-3xl bg-white shadow-lg p-8 transition duration-300 hover:-translate-y-2">
      {children}
    </div>
  );
}