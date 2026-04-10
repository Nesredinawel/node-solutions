"use client";

import { useMemo, useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/lib/utils";

type MediaItem = {
  type: "image" | "video";
  src: string;
  poster?: string;
  thumb?: string;
};

// ✅ Named export (Option 1)
export function ProjectDetailMain({ project }: any) {
  const media = useMemo<MediaItem[]>(() => {
    if (project.media?.length) return project.media;
    if (project.images?.length) {
      return project.images.map((src: string) => ({ type: "image", src }));
    }
    return [{ type: "image", src: project.image }];
  }, [project]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const active = media[activeIndex];

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: any) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: any) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) next();
    if (diff < -50) prev();
  };

  const next = () => setActiveIndex((i) => (i + 1) % media.length);
  const prev = () => setActiveIndex((i) => (i - 1 + media.length) % media.length);

  return (
    <section className="container-main py-6 md:py-10">
      <div className="rounded-2xl border bg-[var(--background-soft)] shadow-card overflow-hidden">

        <div
          className="relative h-[260px] md:h-[520px] overflow-hidden cursor-pointer"
          onClick={() => setIsFullscreen(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.src}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              {active.type === "video" ? (
                <video
                  src={active.src}
                  poster={active.poster}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                />
              ) : (
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${active.src})` }}
                />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {media.length > 1 && (
          <div className="flex gap-2 p-3 overflow-x-auto">
            {media.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "h-14 w-20 rounded-lg overflow-hidden border",
                  idx === activeIndex ? "border-primary" : "border-border"
                )}
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                  backgroundImage: `url(${item.type === "video" ? (item.thumb || item.poster || "") : (item.thumb || item.src)})`
                }}
                />
              </button>
            ))}
          </div>
        )}

        <div className="p-4 md:p-6">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className="text-xl md:text-3xl font-semibold">
                {project.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                {project.url}
              </p>
            </div>

            <Link
              href={project.url}
              target="_blank"
              className="h-10 w-10 flex items-center justify-center border rounded-md"
            >
              <ArrowUpRight size={18} />
            </Link>
          </div>

          <p className="mt-4 text-sm md:text-base text-muted-foreground leading-7">
            {project.longDescription}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex justify-between items-center p-4">
              <span className="text-white text-sm">
                {activeIndex + 1} / {media.length}
              </span>
              <button onClick={() => setIsFullscreen(false)}>
                <X className="text-white" />
              </button>
            </div>

            <div
              className="flex-1 flex items-center justify-center"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.src}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {active.type === "video" ? (
                    <video
                      src={active.src}
                      className="max-h-full max-w-full"
                      controls
                      autoPlay
                    />
                  ) : (
                    <img
                      src={active.src}
                      className="max-h-full max-w-full object-contain"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-between p-4">
              <button onClick={prev} className="text-white">Prev</button>
              <button onClick={next} className="text-white">Next</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
