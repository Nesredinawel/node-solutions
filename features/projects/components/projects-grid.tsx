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

export function ProjectsGrid({ projects }: ProjectsGridProps) {
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