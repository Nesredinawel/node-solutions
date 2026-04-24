"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ProjectsPageHero,
  ProjectFilters,
  ProjectsIntro,
  ProjectsGrid,
  ProjectsPageCta,
} from "@/features/projects";
import {
  projectCategories,
  projectsData,
} from "@/features/projects/data/projects.data";
import { ScrollToSectionButton } from "@/shared/components/common/scroll-to-section-button";
import { getProjects } from "@/app/api/strapi/api";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [allProjects, setAllProjects] = useState<any[]>(projectsData);

  useEffect(() => {
    getProjects().then((res) => {
      if (Array.isArray(res) && res.length > 0) {
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
        setAllProjects(mappedProjects);
      }
    });
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return allProjects;
    return allProjects.filter(
      (project) => project.category === activeCategory
    );
  }, [activeCategory, allProjects]);

  return (
    <main className="">
      <ProjectsPageHero />

      <div className="container-main pt-8">
        <ProjectFilters
          categories={[...projectCategories]}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      <ProjectsIntro />
      <ProjectsGrid projects={filteredProjects} />
      <ProjectsPageCta />

      <ScrollToSectionButton targetId="projects-top" />
    </main>
  );
}