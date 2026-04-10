"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { PortfolioDownloadModal } from "./portfolio-download-modal";

export function ProjectsIntro() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDownloadClick = () => {
    setLoading(true);

    // simulate delay (replace with real download logic)
    setTimeout(() => {
      setLoading(false);
      setOpen(true);

      // 👉 trigger toast here (if you use a toast lib)
      console.log("Download started");
    }, 800);
  };

  return (
    <section className="container-main pt-12 md:pt-14">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        
        {/* LEFT CONTENT */}
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            At nod solution
          </h2>

          <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
            We take pride in delivering the kind of work that combines thoughtful
            strategy, elevated design, and reliable execution. Every project is an
            opportunity to solve real business problems while creating experiences
            that feel polished, engaging, and effective.
          </p>
        </div>

        {/* RIGHT CTA */}
        <div className="md:self-end">
          <Button
            variant="secondary"
            onClick={handleDownloadClick}
            disabled={loading}
            className="min-w-[180px]"
          >
            {loading ? "Downloading..." : "Download Portfolio"}
          </Button>
        </div>
      </div>

      <PortfolioDownloadModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}