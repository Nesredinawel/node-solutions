import { Orbit } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export function AboutPageCta() {
  return (
    <section className="container-main pb-20">
      <div className="border border-border bg-[var(--background-soft)] p-6 shadow-card md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-border bg-card text-primary shadow-glow">
            <Orbit size={34} />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Today, Node Solution Continues to Thrive as a Leading Digital
              Solutions Agency.....
            </h2>

            <p className="mt-4 max-w-4xl text-sm leading-8 text-muted-foreground md:text-base">
              Combining the power of design, engineering, and structured delivery,
              we create transformative digital experiences that help businesses
              grow with confidence. We invite you to join us on that journey and
              discover how we can bring your next vision to life.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-background p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <span className="rounded-md border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
                Welcome to Node Solution
              </span>

              <span className="rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground">
                Where collaboration, expertise, and client-centric thinking shape
                the future of digital innovation.
              </span>
            </div>

            <div className="lg:shrink-0">
              <Button href="/contact">Request Services</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}