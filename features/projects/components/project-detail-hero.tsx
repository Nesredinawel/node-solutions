"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type ProjectDetailHeroProps = {
  title: string;
};

export function ProjectDetailHero({ title }: ProjectDetailHeroProps) {
  const router = useRouter();

  return (
    <section className="container-main pt-16 md:pt-20">
      <div className="flex items-center gap-4 border-b border-border pb-8">
        
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card/80 backdrop-blur-md text-foreground transition hover:bg-card hover:scale-[1.05] active:scale-[0.95]"
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>

        {/* Title */}
        <h1 className="text-xl font-medium text-muted-foreground md:text-4xl leading-tight">
          {title}
        </h1>
      </div>
    </section>
  );
}