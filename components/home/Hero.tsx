import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-[#F7F6F3]">

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

        <div>

          <p className="uppercase tracking-[0.35em] text-[#B08D57] mb-6">
            New Delhi • India
          </p>

          <h1 className="text-6xl lg:text-8xl leading-none mb-8">

            Precision.

            <br />

            Strategy.

            <br />

            Results.

          </h1>

          <p className="text-xl text-gray-600 max-w-xl mb-10 leading-9">

            ASR Law delivers strategic legal solutions for businesses,
            financial institutions and individuals across India.

          </p>

          <div className="flex gap-5">

            <Button href="/contact">
              Schedule Consultation
            </Button>

            <Button
              href="/practice-areas"
              variant="secondary"
            >
              Explore Services
            </Button>

          </div>

        </div>

        <div className="relative">

          <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">

            <img
              src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200&auto=format&fit=crop"
              alt="Modern architecture"
              className="w-full h-full object-cover"
            />

          </div>

        </div>

      </div>

    </section>
  );
}