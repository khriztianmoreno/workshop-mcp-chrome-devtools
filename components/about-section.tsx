// ---------------------------------------------------------------------------
// Pillar 3b demo target.
//
// The body copy below is a placeholder. During the workshop the instructor
// opens the Agent Manager, spawns a second agent and asks it to rewrite this
// section as polished marketing copy — in parallel with the main agent doing
// other work. Both agents commit to the same repo.
// ---------------------------------------------------------------------------

import { Megaphone } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-16">
      <div className="container-narrow">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-start">
          <div>
            <div className="mb-2 flex items-center gap-2 text-signal-cyan">
              <Megaphone className="h-4 w-4" />
              <span className="font-mono text-xs uppercase tracking-[0.18em]">
                about agenthub
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Why a marketplace, not just a list?
            </h2>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-ink-300">
            {/* TODO: replace with polished marketing copy (delegate this to
                a secondary agent via the Agent Manager during the workshop).
                Keep the three-paragraph rhythm but rewrite the content. */}
            <p>
              [PLACEHOLDER PARAGRAPH] We built AgentHub because finding a
              reliable AI agent felt like scrolling a GitHub repo with no
              README. Most agents are buried in threads, blog posts, or
              half-finished npm packages that haven't been touched in months.
            </p>
            <p>
              [PLACEHOLDER PARAGRAPH] AgentHub gives every agent a canonical
              page: a clear tagline, the tech stack it runs on, the team
              behind it, and a community vote so the actually-useful ones
              float to the top.
            </p>
            <p>
              [PLACEHOLDER PARAGRAPH] Use it to find your next workflow
              upgrade, to publish what you've built, or to benchmark your
              agent against what the community is shipping. No paywalls, no
              gatekeeping. We don't take a cut.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
