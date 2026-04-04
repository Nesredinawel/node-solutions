"use client";

import { useMemo } from "react";

const brands = ["zapier", "spotify", "zoom", "slack", "amazon", "adobe"];

export function BrandLogos() {
  const repeatedBrands = useMemo(() => [...brands, ...brands], []);

  return (
    <section className="relative overflow-hidden border-b border-border bg-[var(--background-soft)]">
      <div className="container-main py-10 md:py-12">
        <div className="relative">
       

          {/* Brand Marquee */}
          <div className="relative overflow-hidden">
            <div className="brand-marquee-wrapper">
              <div className="brand-marquee flex w-max items-center gap-10 sm:gap-12 md:gap-16 lg:gap-20">
                {repeatedBrands.map((brand, index) => (
                  <div
                    key={`${brand}-${index}`}
                    className="shrink-0 text-center text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground/80 transition duration-300 hover:text-foreground sm:text-sm"
                  >
                    {brand}
                  </div>
                ))}
              </div>
            </div>

            {/* Fade Edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[var(--background-soft)] via-[color:rgba(24,27,32,0.92)] to-transparent sm:w-14 md:w-20 lg:w-24 dark:from-[var(--background-soft)]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[var(--background-soft)] via-[color:rgba(24,27,32,0.92)] to-transparent sm:w-14 md:w-20 lg:w-24 dark:from-[var(--background-soft)]" />
          </div>
        </div>
      </div>
    </section>
  );
}