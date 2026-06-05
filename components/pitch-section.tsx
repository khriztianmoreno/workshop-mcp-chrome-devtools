// ---------------------------------------------------------------------------
// Pillar 1 demo target.
//
// During the workshop the instructor will:
//   1. Open any reference screenshot they like (Stripe pricing, Linear
//      feature page, a Dribbble shot — anything visually striking).
//   2. Paste the image into the Antigravity IDE agent and ask it to
//      build the JSX/Tailwind that recreates the section here.
//   3. The agent fills in this component and the landing page picks it up
//      via the existing <PitchSection /> mount in app/page.tsx.
//
// Keep the stub below — it is the visual "hole" the audience will see fill
// in real time. Do NOT pre-build the section.
// ---------------------------------------------------------------------------

import { ImagePlus, Sparkles } from "lucide-react";

export function PitchSection() {
  return (
    <section id="pitch" className="py-16">
      <div className="container-narrow">
        <div className="panel relative flex flex-col items-center justify-center gap-4 overflow-hidden p-12 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.18),transparent_60%)]" />
          <div className="relative">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/[0.04]">
              <ImagePlus className="h-5 w-5 text-ink-400" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Drop a screenshot here. Watch it become code.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-ink-300">
              This section is intentionally empty. During the workshop we paste a
              reference image into Antigravity IDE and ask the agent to
              recreate the UI in-place.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-signal-violet/30 bg-signal-violet/10 px-3 py-1.5 text-xs font-semibold text-signal-violet">
              <Sparkles className="h-3.5 w-3.5" />
              awaiting screenshot → JSX
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
