"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Clock, RotateCcw, Timer } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SLIDES } from "../_shared/slides";
import { NOTES } from "../_shared/notes-loader";
import { useSlideSync } from "../_shared/use-slide-sync";

// ─── Slide preview ─────────────────────────────────────────────────────────

const STAGE_W = 1440;
const STAGE_H = 900;

function SlidePreview({
  Component,
  className = "",
}: {
  Component: React.FC;
  className?: string;
}) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const { width, height } = el.getBoundingClientRect();
      const s = Math.min(width / STAGE_W, height / STAGE_H);
      setScale(s);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={boxRef}
      className={`relative overflow-hidden rounded-2xl border-2 border-ink-700 bg-ink-950 ${className}`}
    >
      <div
        className="pointer-events-none absolute left-0 top-0 origin-top-left"
        style={{
          width: `${STAGE_W}px`,
          height: `${STAGE_H}px`,
          transform: `scale(${scale})`,
        }}
      >
        <Component />
      </div>
    </div>
  );
}

// ─── Splitters ─────────────────────────────────────────────────────────────

function VSplitter({ onResize }: { onResize: (dx: number) => void }) {
  const draggingRef = useRef(false);
  const lastRef = useRef(0);
  const onResizeRef = useRef(onResize);
  onResizeRef.current = onResize;

  const onMouseDown = (e: React.MouseEvent) => {
    draggingRef.current = true;
    lastRef.current = e.clientX;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    e.preventDefault();
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - lastRef.current;
      lastRef.current = e.clientX;
      onResizeRef.current(dx);
    };
    const onUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div
      role="separator"
      aria-orientation="vertical"
      onMouseDown={onMouseDown}
      className="group relative w-3 shrink-0 cursor-col-resize select-none"
      title="Arrastrá para redimensionar"
    >
      <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 rounded-full bg-ink-700 transition-colors group-hover:bg-signal-cyan/70" />
    </div>
  );
}

function HSplitter({ onResize }: { onResize: (dy: number) => void }) {
  const draggingRef = useRef(false);
  const lastRef = useRef(0);
  const onResizeRef = useRef(onResize);
  onResizeRef.current = onResize;

  const onMouseDown = (e: React.MouseEvent) => {
    draggingRef.current = true;
    lastRef.current = e.clientY;
    document.body.style.cursor = "row-resize";
    document.body.style.userSelect = "none";
    e.preventDefault();
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      const dy = e.clientY - lastRef.current;
      lastRef.current = e.clientY;
      onResizeRef.current(dy);
    };
    const onUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      onMouseDown={onMouseDown}
      className="group relative h-3 shrink-0 cursor-row-resize select-none"
      title="Arrastrá para redimensionar"
    >
      <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded-full bg-ink-700 transition-colors group-hover:bg-signal-cyan/70" />
    </div>
  );
}

// ─── Layout persistence ────────────────────────────────────────────────────

type Layout = { notesWidth: number; upcomingHeight: number };
const DEFAULT_LAYOUT: Layout = { notesWidth: 560, upcomingHeight: 220 };
const LS_KEY = "slides-speaker-layout-v2";

function loadLayout(): Layout {
  if (typeof window === "undefined") return DEFAULT_LAYOUT;
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return DEFAULT_LAYOUT;
    const parsed = JSON.parse(raw) as Partial<Layout>;
    return {
      notesWidth:
        typeof parsed.notesWidth === "number"
          ? parsed.notesWidth
          : DEFAULT_LAYOUT.notesWidth,
      upcomingHeight:
        typeof parsed.upcomingHeight === "number"
          ? parsed.upcomingHeight
          : DEFAULT_LAYOUT.upcomingHeight,
    };
  } catch {
    return DEFAULT_LAYOUT;
  }
}

// ─── Timer ─────────────────────────────────────────────────────────────────

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatElapsed(ms: number) {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function useWallClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function useElapsed(startedAt: number | null) {
  const [, setTick] = useState(0);
  useEffect(() => {
    if (startedAt === null) return;
    const t = setInterval(() => setTick((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, [startedAt]);
  return startedAt === null ? 0 : Date.now() - startedAt;
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function SpeakerPage() {
  const total = SLIDES.length;
  const { index, goNext, goPrev } = useSlideSync(total);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [layout, setLayout] = useState<Layout>(DEFAULT_LAYOUT);
  const [hydrated, setHydrated] = useState(false);

  const now = useWallClock();
  const elapsed = useElapsed(startedAt);

  useEffect(() => {
    setLayout(loadLayout());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(LS_KEY, JSON.stringify(layout));
    } catch {
      // ignore quota
    }
  }, [layout, hydrated]);

  useEffect(() => {
    if (startedAt === null && index > 0) {
      setStartedAt(Date.now());
    }
  }, [index, startedAt]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (["ArrowRight", "ArrowDown", " "].includes(e.key)) {
        e.preventDefault();
        goNext();
      } else if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        goPrev();
      } else if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        setStartedAt(Date.now());
      } else if ((e.key === "r" || e.key === "R") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setLayout(DEFAULT_LAYOUT);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  const onResizeNotes = useCallback((dx: number) => {
    setLayout((prev) => {
      const max = Math.max(320, window.innerWidth - 400);
      const min = 280;
      const next = Math.max(min, Math.min(max, prev.notesWidth - dx));
      return { ...prev, notesWidth: next };
    });
  }, []);

  const onResizeUpcoming = useCallback((dy: number) => {
    setLayout((prev) => {
      const max = Math.max(160, window.innerHeight - 320);
      const min = 90;
      const next = Math.max(min, Math.min(max, prev.upcomingHeight - dy));
      return { ...prev, upcomingHeight: next };
    });
  }, []);

  const current = SLIDES[index];
  const next = SLIDES[index + 1] ?? null;
  const notes = NOTES[current.id] ?? "_(sin notas para este slide)_";

  return (
    <div className="flex h-screen flex-col bg-ink-950 p-4 text-white">
      {/* ── Header: counter + title + timer + clock + nav ── */}
      <header className="mb-3 flex shrink-0 items-center justify-between gap-6 rounded-2xl border-2 border-ink-700 bg-ink-900 px-6 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink-400">
            Slide
          </span>
          <span className="font-mono text-2xl font-extrabold text-white">
            {index + 1}
            <span className="text-ink-500"> / {total}</span>
          </span>
          <span className="ml-3 truncate text-sm font-medium text-ink-200">
            {current.title}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-5">
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-signal-cyan" />
            <span className="font-mono text-2xl font-bold text-signal-cyan tabular-nums">
              {formatElapsed(elapsed)}
            </span>
            <button
              onClick={() => setStartedAt(Date.now())}
              className="ml-1 rounded-md border border-ink-600 px-2 py-1 text-xs text-ink-300 hover:border-ink-500 hover:text-white"
              title="Reiniciar timer (T)"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-ink-400" />
            <span className="font-mono text-2xl font-bold tabular-nums">
              {pad(now.getHours())}:{pad(now.getMinutes())}
            </span>
          </div>

          <div className="ml-2 flex items-center gap-2 border-l-2 border-ink-700 pl-5">
            <button
              onClick={goPrev}
              disabled={index === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink-600 bg-ink-800 text-ink-200 transition-colors hover:border-ink-500 hover:text-white disabled:pointer-events-none disabled:opacity-30"
              title="Slide anterior (←)"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goNext}
              disabled={index === total - 1}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-signal-cyan/60 bg-signal-cyan/10 text-signal-cyan transition-colors hover:border-signal-cyan hover:text-white disabled:pointer-events-none disabled:opacity-30"
              title="Siguiente slide (→)"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Main row: [current/upcoming column] | splitter | [notes column] ── */}
      <div className="flex min-h-0 flex-1">
        {/* Left column: current + upcoming stacked */}
        <div className="flex min-w-0 flex-1 flex-col">
          <SlidePreview Component={current.Component} className="min-h-0 flex-1" />

          <HSplitter onResize={onResizeUpcoming} />

          {next ? (
            <div
              className="relative flex shrink-0 gap-3"
              style={{ height: layout.upcomingHeight }}
            >
              <div className="flex items-center gap-2 self-stretch px-2">
                <span className="rotate-180 [writing-mode:vertical-rl] text-[10px] font-bold uppercase tracking-widest text-signal-orange">
                  Upcoming
                </span>
              </div>
              <SlidePreview
                Component={next.Component}
                className="h-full flex-1"
              />
            </div>
          ) : (
            <div
              className="flex shrink-0 items-center justify-center rounded-2xl border-2 border-dashed border-ink-700 text-sm text-ink-500"
              style={{ height: layout.upcomingHeight }}
            >
              Último slide
            </div>
          )}
        </div>

        <VSplitter onResize={onResizeNotes} />

        {/* Right column: notes */}
        <aside
          className="overflow-y-auto rounded-2xl border-2 border-ink-700 bg-ink-900 p-6"
          style={{ width: layout.notesWidth, flexShrink: 0 }}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-ink-400">
              Notas
            </span>
            <span className="font-mono text-[10px] text-ink-500">{current.id}</span>
          </div>
          <div className="prose-notes">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{notes}</ReactMarkdown>
          </div>
        </aside>
      </div>
    </div>
  );
}
