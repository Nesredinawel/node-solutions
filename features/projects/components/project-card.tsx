import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type ProjectCardProps = {
  slug: string;
  title: string;
  subtitle: string;
  url: string;
  description: string;
  image: string;
};

export function ProjectCard({
  slug,
  title,
  subtitle,
  url,
  description,
  image,
}: ProjectCardProps) {
  return (
    <article className="premium-hover group overflow-hidden rounded-2xl border border-border bg-[var(--background-soft)] shadow-card">
      <div className="px-4 pb-4 pt-5 md:px-5">
        <p className="text-sm text-muted-foreground">{subtitle}</p>

        <Link href={`/projects/${slug}`} className="mt-5 block overflow-hidden rounded-xl border border-border">
          <div className="relative h-[240px] overflow-hidden md:h-[280px]">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              style={{ backgroundImage: `url('${image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/30" />
            <div className="absolute inset-0 grid-pattern opacity-10" />
          </div>
        </Link>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <Link href={`/projects/${slug}`}>
              <h3 className="text-xl font-semibold text-foreground transition hover:text-primary">
                {title}
              </h3>
            </Link>

            <p className="mt-2 inline-flex rounded-md border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              {url}
            </p>
          </div>

          <Link
            href={url}
            target="_blank"
            rel="noreferrer"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-card text-foreground transition hover:bg-secondary hover:text-primary"
            aria-label={`Visit ${title}`}
          >
            <ArrowUpRight size={18} />
          </Link>
        </div>

        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          {description}
        </p>
      </div>
    </article>
  );
}