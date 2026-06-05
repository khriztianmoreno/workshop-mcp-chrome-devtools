import { ProjectsFilterGrid } from "./projects-filter-grid";
import type { Project } from "@/lib/types";

export async function ProjectsGrid() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/projects`
      : "http://localhost:3000/api/projects",
    { cache: "no-store" }
  ).catch(() => null);

  let projects: Project[] = [];
  if (res?.ok) {
    try {
      const data = await res.json();
      projects = data.projects ?? [];
    } catch (e) {
      const mod = await import("@/lib/mocks/projects");
      projects = mod.projects;
    }
  } else {
    const mod = await import("@/lib/mocks/projects");
    projects = mod.projects;
  }

  return <ProjectsFilterGrid projects={projects} />;
}
