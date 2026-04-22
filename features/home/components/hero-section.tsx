"use client";

import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { heroImages, heroTags } from "../data/home.data";
import { getHero } from "@/app/api/strapi/route";

export function HeroSection() {
  const [active, setActive] = useState(0);
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const result = await getHero();
        setHeroData(result);
      } catch (error) {
        console.error("Failed to load hero:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % heroImages.length);
    }, 4500);

    return () => window.clearInterval(id);
  }, []);

  console.log(heroData)

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % heroImages.length);
    }, 4500);

    return () => window.clearInterval(id);
  }, []);

  if (loading) return <div className="min-h-[88vh] w-full bg-background" />;
  if (!heroData) return null;
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
           {heroData.header}
          </h1>

          <p className="hero-subtitle mx-auto mt-5 max-w-2xl text-sm leading-7 md:text-lg">
            {heroData.subheader}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {heroData.badge?.map((item, index) => (
              <span
                key={index} 
                className="hero-chip rounded-full px-4 py-2 text-sm font-medium text-foreground shadow-card transition hover:scale-[1.02]"
              >
                {item.value}
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