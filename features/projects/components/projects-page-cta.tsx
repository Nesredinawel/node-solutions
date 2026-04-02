import { Orbit } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export function ProjectsPageCta() {
  return (
    <section className="pb-20 pt-6">
      <div className="container-main">
        <div className="section-banner-bg relative overflow-hidden border border-border px-6 py-16 text-center shadow-glow md:px-10 md:py-20">
          <div className="absolute inset-0 grid-pattern opacity-25" />

          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-border bg-card text-primary backdrop-blur-sm">
              <Orbit size={28} />
            </div>

            <h2 className="mt-6 text-2xl font-semibold text-foreground md:text-4xl">
              Let us Bring your Ideas to Life in the Digital World.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
              Whether you need a website, brand system, digital platform, or
              technical solution, we are committed to building experiences that
              align with your goals and exceed expectations.
            </p>

            <div className="mt-8">
              <Button href="/contact">Start Project</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}