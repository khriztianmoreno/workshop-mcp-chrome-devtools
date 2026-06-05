"use client";

import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactionSystem } from "@/components/reaction-system";
import { SLIDES } from "./_shared/slides";
import { useSlideSync } from "./_shared/use-slide-sync";

export default function SlidesPage() {
  const total = SLIDES.length;
  const { index, goNext, goPrev } = useSlideSync(total);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Don't hijack keys while typing in inputs
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (["ArrowRight", "ArrowDown", " "].includes(e.key)) {
        e.preventDefault();
        goNext();
      } else if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        goPrev();
      } else if (e.key === "s" || e.key === "S") {
        e.preventDefault();
        window.open(
          "/slides/speaker",
          "slides-speaker",
          "popup=yes,width=1280,height=800"
        );
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  const CurrentSlide = SLIDES[index].Component;

  return (
    <div className="relative min-h-screen bg-ink-950">
      <div key={index} style={{ animation: "slideEnter 0.25s ease-out both" }}>
        <CurrentSlide />
      </div>

      <ReactionSystem />

      {/* Navigation */}
      <div className="fixed bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-4">
        <button
          onClick={goPrev}
          disabled={index === 0}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink-600 bg-ink-800 text-ink-200 transition-colors hover:border-ink-500 hover:text-white disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="w-16 text-center font-mono text-sm font-bold text-ink-300">
          {index + 1} / {total}
        </span>
        <button
          onClick={goNext}
          disabled={index === total - 1}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink-600 bg-ink-800 text-ink-200 transition-colors hover:border-ink-500 hover:text-white disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-ink-800">
        <div
          className="h-full bg-gradient-to-r from-signal-orange via-signal-violet to-signal-cyan transition-all duration-300"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
