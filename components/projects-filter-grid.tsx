"use client";

import { useState, useEffect } from "react";
import { Rocket } from "lucide-react";
import { ProjectCard } from "./project-card";
import { cn } from "@/lib/utils";
import type { Project, ProjectCategory } from "@/lib/types";

const ALL_CATEGORIES = [
  "all",
  "automation",
  "devtools",
  "data",
  "writing",
  "research",
  "productivity",
] as const;

type Filter = ProjectCategory | "all";

export function ProjectsFilterGrid({
  projects: initialProjects,
}: {
  projects: Project[];
}) {
  const [activeCategory, setActiveCategory] = useState<Filter>("all");
  const [displayProjects, setDisplayProjects] = useState<Project[]>(
    [...initialProjects].sort((a, b) => b.votes - a.votes)
  );

  // BUG 2c — filteredProjects is computed inline without useMemo.
  // When activeCategory !== "all", .filter() returns a new array on every render.
  // useEffect sees a new reference each cycle → calls setDisplayProjects on every
  // render → React throws "Maximum update depth exceeded" as soon as the user
  // clicks any category filter other than "all".
  const filteredProjects =
    activeCategory === "all"
      ? initialProjects
      : initialProjects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    setDisplayProjects([...filteredProjects].sort((a, b) => b.votes - a.votes));
  }, [filteredProjects]); // ← new array ref on every render when filtered → infinite loop

  return (
    <section id="projects" className="py-16">
      <div className="container-narrow">
        <header className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-signal-orange">
              <Rocket className="h-4 w-4" />
              <span className="font-mono text-xs uppercase tracking-[0.18em]">
                explore agents
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Discover what the community is building
            </h2>
            <p className="mt-1 max-w-xl text-sm text-ink-300">
              Browse agents by category and upvote the ones that solve your
              workflow. New agents added every week.
            </p>
          </div>
          <span className="hidden font-mono text-xs uppercase tracking-wider text-ink-400 md:inline">
            {displayProjects.length} agents
          </span>
        </header>

        <div className="mb-6 flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-mono uppercase tracking-wider transition-colors",
                activeCategory === cat
                  ? "border-signal-orange bg-signal-orange/10 text-signal-orange"
                  : "border-white/10 text-ink-400 hover:border-white/20 hover:text-ink-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
