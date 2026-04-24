"use client";

import { useEffect, useState } from "react";
import { AnimatedLogo } from "@/shared/components/common/animated-logo";
import { getAbout } from "@/app/api/strapi/api";

export function AboutIntroSection() {
  const [aboutText, setAboutText] = useState('');

  useEffect(() => {
    getAbout()
      .then((about) => {
        setAboutText(about?.content);
      })
      .catch((error) => {
        console.error("Failed to fetch about data:", error);
      });
  }, []);

  return (
    <section className="container-main py-14 md:py-20">
      <div className="grid items-center gap-10 border-b border-border pb-14 md:pb-20 lg:grid-cols-2">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            About nod solution
          </h2>

          <p className="mt-6 text-sm leading-8 text-muted-foreground md:text-base">
            {aboutText}
          </p>

        </div>

        <div className="relative mx-auto w-full max-w-[420px]">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border shadow-card">
            <div className="absolute inset-0 section-banner-bg" />
            <div className="absolute inset-0 grid-pattern opacity-25" />

            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/30" />
            <div className="absolute top-1/2 h-px w-full -translate-y-1/2 bg-white/30" />

            <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/60 text-primary shadow-glow">
              <AnimatedLogo size={64} mode="loop" />
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_45%)]" />
          </div>
        </div>
      </div>
    </section>
  );
}