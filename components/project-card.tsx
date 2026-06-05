import { ChevronUp, Flame, Users } from "lucide-react";
import { cn, formatVotes } from "@/lib/utils";
import type { Project } from "@/lib/types";

const categoryStyles: Record<Project["category"], string> = {
  automation: "text-signal-violet bg-signal-violet/10 border-signal-violet/30",
  devtools: "text-signal-cyan bg-signal-cyan/10 border-signal-cyan/30",
  data: "text-signal-amber bg-signal-amber/10 border-signal-amber/30",
  writing: "text-signal-orange bg-signal-orange/10 border-signal-orange/30",
  research: "text-signal-lime bg-signal-lime/10 border-signal-lime/30",
  productivity: "text-ink-200 bg-white/5 border-white/15",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="panel group relative flex flex-col gap-4 overflow-hidden transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]">
      {/* BUG 2d — plain <img> with no width/height, no loading="lazy", no sizes.
          All 8 cover images (800×450 px each) load immediately at full resolution,
          blocking the main thread and tanking LCP. Fix: replace with next/image
          and add picsum.photos to images.remotePatterns in next.config.js. */}
      <img
        src={project.coverImage}
        alt={project.name}
        className="h-40 w-full object-cover"
      />
      <div className="flex flex-col gap-4 p-5 pt-0">
      <header className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-transparent text-2xl ring-1 ring-white/10">
          {project.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold tracking-tight">
              {project.name}
            </h3>
            {project.trending && (
              <span className="inline-flex items-center gap-1 rounded-full bg-signal-orange/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-signal-orange">
                <Flame className="h-2.5 w-2.5" />
                Hot
              </span>
            )}
          </div>
          <p className="mt-0.5 line-clamp-2 text-xs text-ink-300">
            {project.tagline}
          </p>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-1.5">
        <span
          className={cn(
            "rounded-md border px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider",
            categoryStyles[project.category]
          )}
        >
          {project.category}
        </span>
        {project.techStack.slice(0, 3).map((tech) => (
          <span key={tech} className="chip">
            {tech}
          </span>
        ))}
      </div>

      <footer className="mt-auto flex items-center justify-between border-t border-white/5 pt-3">
        <div className="flex items-center gap-1.5 text-xs text-ink-400">
          <Users className="h-3 w-3" />
          <span>{project.team}</span>
          <span className="text-ink-500">·</span>
          <span>{project.members}</span>
        </div>
        <button className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-ink-100 transition-colors hover:border-signal-orange/40 hover:text-signal-orange">
          <ChevronUp className="h-3 w-3" />
          {formatVotes(project.votes)}
        </button>
      </footer>
      </div>
    </article>
  );
}
