"use client";

import { useMemo, useState } from "react";
import {
  ProjectsPageHero,
  ProjectFilters,
  ProjectsIntro,
  ProjectsGrid,
  ProjectsPageCta,
} from "@/features/projects";
import { projectCategories, projectsData } from "@/features/projects/data/projects.data";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projectsData;

    return projectsData.filter(
      (project) => project.category === activeCategory
    );
  }, [activeCategory]);

  return (
    <main className="">
      <ProjectsPageHero />

      <div className="container-main pt-8">
        <ProjectFilters
          categories={projectCategories}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      <ProjectsIntro />

      <ProjectsGrid projects={filteredProjects} />

      <ProjectsPageCta />
    </main>
  );
}