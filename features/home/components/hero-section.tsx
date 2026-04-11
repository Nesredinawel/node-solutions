"use client";

import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { heroImages, heroTags } from "../data/home.data";

export function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % heroImages.length);
    }, 4500);

    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="home-top"
      className="relative overflow-hidden border-b border-border"
    >
      {/* Background slideshow cross-fade */}
      <div className="absolute inset-0">
        {heroImages.map((src, i) => (
          <div
            key={src}
            className={[
              "absolute inset-0 bg-cover bg-center",
              "transition-opacity duration-[1400ms] ease-in-out motion-reduce:transition-none",
              i === active ? "opacity-100" : "opacity-0",
            ].join(" ")}
            style={{ backgroundImage: `url('${src}')` }}
          />
        ))}
      </div>

      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 hero-vignette" />

      <div className="container-main relative flex min-h-[88vh] flex-col items-center justify-center text-center">
        

        <div className="max-w-4xl">
          <p className="mb-4 inline-flex rounded-full border border-border bg-card px-4 py-1 text-xs uppercase tracking-[0.2em] text-black dark:text-white backdrop-blur-sm">
            Creative • Technical • Strategic
          </p>

          <h1 className="text-4xl font-bold leading-tight text-foreground md:text-6xl">
            Building Brands, Spaces, and
            <br className="hidden md:block" /> Digital Experiences
          </h1>

          <p className="hero-subtitle mx-auto mt-5 max-w-2xl text-sm leading-7 md:text-lg">
            nod solution helps businesses grow through design, digital strategy,
            printing excellence, and reliable IT infrastructure.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {heroTags.map((tag) => (
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
            <Button
              href="/services"
              variant="secondary"
              className="min-w-[170px]"
            >
              Explore Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}