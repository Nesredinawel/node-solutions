import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
  };
};

export function ProjectDetailMain({ project }: ProjectDetailMainProps) {
  return (
    <section className="container-main py-10 md:py-12">
      <article className="overflow-hidden rounded-2xl border border-border bg-[var(--background-soft)] shadow-card">
        <div className="p-4 md:p-6">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="relative h-[320px] overflow-hidden md:h-[520px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${project.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/30" />
              <div className="absolute inset-0 grid-pattern opacity-10" />
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