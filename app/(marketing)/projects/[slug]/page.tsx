import { notFound } from "next/navigation";
import {
  ProjectDetailHero,
  ProjectDetailMain,
  RelatedProjects,
  ProjectsPageCta,
} from "@/features/projects";
import { projectsData } from "@/features/projects/data/projects.data";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;

  const project = projectsData.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = projectsData
    .filter((item) => item.slug !== project.slug && item.category === project.category)
    .slice(0, 2);

  return (
    <main className="">
      <ProjectDetailHero title={project.subtitle} />
      <ProjectDetailMain project={project} />
      <RelatedProjects projects={relatedProjects} />
      <ProjectsPageCta />
    </main>
  );
}