import Link from "next/link";
import { Bot } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-ink-950/70 backdrop-blur">
      <div className="container-narrow flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-signal-cyan to-signal-violet shadow-[0_4px_20px_-4px_rgba(34,211,238,0.5)]">
            <Bot className="h-4 w-4 text-ink-950" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight">AgentHub</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-400">
              agent marketplace
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-ink-300 md:flex">
          <Link href="#projects" className="transition-colors hover:text-white">
            Agents
          </Link>
          <Link href="#pitch" className="transition-colors hover:text-white">
            Features
          </Link>
          <Link href="#about" className="transition-colors hover:text-white">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/login" className="btn-secondary h-9 px-4 text-xs">
            Sign in
          </Link>
          <Link href="/login" className="btn-primary h-9 px-4 text-xs">
            Publish agent
          </Link>
        </div>
      </div>
    </header>
  );
}
