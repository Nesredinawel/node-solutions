import { ProjectCard } from "./project-card";

type RelatedProjectsProps = {
  projects: {
    slug: string;
    title: string;
    subtitle: string;
    url: string;
    description: string;
    category: string;
    image: string;
  }[];
};

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (!projects.length) return null;

  return (
    <section className="container-main pb-10 md:pb-12">
      <div className="border-t border-border pt-10">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Related Projects
        </h2>

        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              subtitle={project.subtitle}
              url={project.url}
              description={project.description}
              image={project.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}