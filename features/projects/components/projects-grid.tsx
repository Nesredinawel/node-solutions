"use client";

import { getProjects } from "@/app/api/strapi/api";
import { ProjectCard } from "./project-card";
import { useEffect, useState } from "react";

type Project = {
  slug: string;
  title: string;
  subtitle: string;
  url: string;
  description: string;
  category: string;
  image: string;
};

type ProjectsGridProps = {
  projects: Project[];
};

export function ProjectsGrid({ projects: initialProjects }: ProjectsGridProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  useEffect(() => {
    getProjects().then((res) => {
      console.log("projects data:", res);
      if (Array.isArray(res) && res.length > 0) {
        // Map the API data to the local Project type
        const mappedProjects = res.map((item: any) => ({
          id: item.id || item.documentId,
          slug: item.slug || "",
          title: item.title || "",
          subtitle: item.subtitle || item.tags?.[0] || "",
          url: item.url || `/projects/${item.slug}`,
          description: item.description || "",
          category: item.category || item.tags?.[0] || "",
          image: item.image || item.images?.[0] || "",
        }));
        setProjects(mappedProjects);
      }
    });
  }, []);
  return (
    <section className="container-main py-10 md:py-12">
      <div className="grid gap-8 lg:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard
            key={(project as any).id || `${project.slug}-${index}`}
            slug={project.slug}
            title={project.title}
            subtitle={project.subtitle}
            url={project.url}
            description={project.description}
            image={project.image}
          />
        ))}
      </div>
    </section>
  );
}