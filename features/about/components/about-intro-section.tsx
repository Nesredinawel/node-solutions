import { Orbit } from "lucide-react";

export function AboutIntroSection() {
  return (
    <section className="container-main py-14 md:py-20">
      <div className="grid items-center gap-10 border-b border-border pb-14 md:pb-20 lg:grid-cols-2">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            About Node Solution
          </h2>

          <p className="mt-6 text-sm leading-8 text-muted-foreground md:text-base">
            Node Solution is a modern digital solutions company passionate about
            helping businesses grow through thoughtful design, reliable technical
            delivery, and strategic execution. We work across digital marketing,
            creative branding, IT infrastructure, and business-focused digital
            products.
          </p>

          <p className="mt-5 text-sm leading-8 text-muted-foreground md:text-base">
            Our process is structured yet collaborative, combining business
            understanding, creative thinking, and engineering discipline to
            build solutions that are practical, visually polished, and aligned
            with real-world goals.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[420px]">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border shadow-card">
            <div className="absolute inset-0 section-banner-bg" />
            <div className="absolute inset-0 grid-pattern opacity-25" />

            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/30" />
            <div className="absolute top-1/2 h-px w-full -translate-y-1/2 bg-white/30" />

            <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-glow">
              <Orbit size={28} />
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_45%)]" />
          </div>
        </div>
      </div>
    </section>
  );
}