"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { ProjectMediaItem } from "@/features/projects/data/projects.data";

type ProjectDetailMainProps = {
  project: {
    slug: string;
    title: string;
    subtitle: string;
    url: string;
    description: string;
    longDescription: string;
    category: string;
    image: string;
    images?: string[];
    media?: ProjectMediaItem[];
  };
};

export function ProjectDetailMain({ project }: ProjectDetailMainProps) {
  const media = useMemo<ProjectMediaItem[]>(() => {
    // 1) Prefer `media`
    if (project.media?.length) return project.media;

    // 2) Fallback: `images`
    if (project.images?.length) {
      return Array.from(new Set(project.images)).map((src) => ({
        type: "image" as const,
        src,
      }));
    }

    // 3) Fallback: single `image`
    return [{ type: "image" as const, src: project.image }];
  }, [project.media, project.images, project.image]);

  const [activeIndex, setActiveIndex] = useState(0);
  const active = media[Math.min(activeIndex, media.length - 1)];

  return (
    <section className="container-main py-10 md:py-12">
      <article className="overflow-hidden rounded-2xl border border-border bg-[var(--background-soft)] shadow-card">
        <div className="p-4 md:p-6">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="relative h-[320px] overflow-hidden md:h-[520px]">
              {/* Main media */}
              {active.type === "video" ? (
                <video
                  key={active.src}
                  className="absolute inset-0 h-full w-full object-cover"
                  src={active.src}
                  poster={active.poster}
                  controls
                  autoPlay
                  muted
                  playsInline
                />
              ) : (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
                  style={{ backgroundImage: `url('${active.src}')` }}
                />
              )}

              {/* Overlays (keep your style) */}
              <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/30" />
              <div className="absolute inset-0 grid-pattern opacity-10" />

              {/* Thumbnail selector (top-left) */}
              {media.length > 1 ? (
                <div className="absolute left-4 top-4 z-10">
                  <div className="glass-card rounded-2xl border border-border p-2 shadow-card backdrop-blur-md">
                    <div className="flex flex-col gap-2">
                      {media.slice(0, 6).map((item, idx) => {
                        const isActive = idx === activeIndex;

                        const thumbSrc =
                          item.type === "video"
                            ? item.thumb || item.poster || ""
                            : item.thumb || item.src;

                        return (
                          <button
                            key={`${item.type}-${"src" in item ? item.src : idx}`}
                            type="button"
                            onClick={() => setActiveIndex(idx)}
                            aria-label={`Select media ${idx + 1}`}
                            className={cn(
                              "relative h-12 w-12 overflow-hidden rounded-xl border transition",
                              isActive
                                ? "border-primary shadow-glow"
                                : "border-border hover:border-primary/40"
                            )}
                          >
                            {/* Thumb */}
                            <div
                              className="absolute inset-0 bg-cover bg-center"
                              style={{ backgroundImage: `url('${thumbSrc}')` }}
                            />
                            <div className="absolute inset-0 bg-black/25" />

                            {/* Video icon overlay */}
                            {item.type === "video" ? (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white">
                                  <Play size={14} />
                                </span>
                              </div>
                            ) : null}

                            {isActive ? (
                              <div className="absolute inset-0 ring-2 ring-primary/40" />
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
                {project.title}
              </h2>

              <p className="mt-3 inline-flex rounded-md border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                {project.url}
              </p>
            </div>

            <Link
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-card text-foreground transition hover:bg-secondary hover:text-primary"
              aria-label={`Visit ${project.title}`}
            >
              <ArrowUpRight size={18} />
            </Link>
          </div>

          <p className="mt-6 max-w-5xl text-sm leading-8 text-muted-foreground md:text-base">
            {project.longDescription}
          </p>
        </div>
      </article>
    </section>
  );
}