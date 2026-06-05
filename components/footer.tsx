import { Bot } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5 py-10">
      <div className="container-narrow flex flex-col items-start justify-between gap-6 text-sm text-ink-400 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-signal-cyan to-signal-violet">
            <Bot className="h-3 w-3 text-ink-950" />
          </div>
          <span className="text-xs">
            AgentHub · built live during a workshop on AI-powered web dev
          </span>
        </div>
        <div className="flex items-center gap-5 font-mono text-[11px] uppercase tracking-wider">
          <span>v0.1</span>
          <span>© 2026</span>
          <span className="text-signal-cyan">made with antigravity ide</span>
        </div>
      </div>
    </footer>
  );
}
