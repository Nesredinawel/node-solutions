import { Button } from "@/shared/components/ui/button";

const tags = [
  "Branding",
  "Digital Marketing",
  "Interior & Construction",
  "IT Solutions",
];

export function HeroSection() {
  return (
    <section
  id="home-top"
  className="relative overflow-hidden border-b border-border"
>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1800&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 hero-vignette" />

      <div className="container-main relative flex min-h-[88vh] flex-col items-center justify-center text-center">
        <div className="max-w-4xl">
          <p className="mb-4 inline-flex rounded-full border border-border bg-card px-4 py-1 text-xs uppercase tracking-[0.2em] text-black dark:text-primary backdrop-blur-sm">
            Creative • Technical • Strategic
          </p>

          <h1 className="text-4xl font-bold leading-tight text-foreground md:text-6xl">
            Building Brands, Spaces, and
            <br className="hidden md:block" /> Digital Experiences
          </h1>

          <p className="hero-subtitle mx-auto mt-5 max-w-2xl text-sm leading-7 md:text-lg">
  Node Solution helps businesses grow through design, digital strategy,
  printing excellence, and reliable IT infrastructure.
</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="hero-chip rounded-full px-4 py-2 text-sm font-medium text-foreground shadow-card transition hover:scale-[1.02]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/contact" className="min-w-[170px]">
              Start a Project
            </Button>
            <Button href="/services" variant="secondary" className="min-w-[170px]">
              Explore Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}