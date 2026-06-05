<div align="center">

<img src="public/slides/logo.png" alt="Workshop MCP Chrome Devtools" width="100" />

# Workshop MCP Chrome Devtools

**A live-coding workshop on AI agent orchestration, Chrome DevTools MCP, and rapid prototyping under pressure.**

[🇪🇸 Leer en Español](README.es.md) · [📊 View Slides](https://workshop-mcp-chrome-devtools.vercel.app/slides)

---

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-optional-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![Workshop](https://img.shields.io/badge/format-live--workshop-F97316?style=flat-square)

</div>

---

## What Is This?

This repo is the **live demo canvas** for the workshop _"Workshop MCP Chrome Devtools: build fast and unblock with AI"_. It's a hands-on session where you learn to orchestrate AI agents, debug with Chrome DevTools through MCP, and prototype rapidly under pressure. The app itself — DemoDay, a wall of demo projects — is just the surface. Every component, bug, and stub is intentional and exists to be discovered (and fixed) live during the workshop.

You'll see three AI agent reflexes that collapse hours of work into minutes:

| Pillar | Reflex | Time |
|--------|--------|------|
| 1 · Visual Prototyping | Screenshot → JSX in seconds | 10 min |
| 2 · Runtime Debugging | DevTools + MCP → fix 4 real bugs | 20 min |
| 3 · Advanced Orchestration | Parallel agents + autonomous integration fix | 8 min |

---

## Prerequisites

Install these **before** the workshop starts.

| Tool | Version | Notes |
|------|---------|-------|
| [Node.js](https://nodejs.org) | 22+ | Required by Chrome DevTools MCP |
| [pnpm](https://pnpm.io) | 9+ | `npm i -g pnpm` |
| [Google Chrome](https://www.google.com/chrome/) | Latest | Required for DevTools demo |
| [Antigravity IDE](https://antigravity.dev) | Latest | AI agent tool used in the demo |
| [Claude Code](https://claude.ai/code) | Latest | Alternative AI agent (either works) |

> **Supabase** is optional — only needed to follow along with Pillar 3 live. The app runs fully offline without it.

---

## Attendee Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/khriztianmoreno/workshop-mcp-chrome-devtools
cd workshop-mcp-chrome-devtools

# 2. Install dependencies
pnpm install

# 3. Start the dev server
pnpm dev
```

Open **[http://localhost:3000](http://localhost:3000)** — you should see the DemoDay landing page.

> No `.env` file needed. No database, no auth, no external services required to run the app.

### Optional: Supabase (Pillar 3)

```bash
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## Verifying Chrome DevTools Integration

### Checklist

- [ ] **Antigravity IDE is installed and running.** See [Antigravity Official Docs](https://antigravity.dev).
- [ ] **Chrome DevTools MCP is connected to Antigravity IDE.** See [Chrome DevTools MCP Setup](https://github.com/ChromeDevTools/chrome-devtools-mcp).
- [ ] **Repo is cloned and dependencies are installed** (`pnpm install`).
- [ ] **App is running locally** on `http://localhost:3000` (`pnpm dev`).
- [ ] **Google Chrome is open** and pointing to `http://localhost:3000`.

### Quick Test (1 minute)

In Antigravity IDE, send this prompt:

> "Connect to `http://localhost:3000`, tell me what stats are shown on the page, and how many projects are listed in the grid."

**Success:** the agent responds with actual numbers from your running app (e.g., 8 projects in the grid). If it says "I can't access the URL", the Chrome DevTools MCP is not properly configured.

---

## Workshop Structure

### Pillar 1 · Ultra-fast Visual Prototyping

> "Don't start from scratch. Paste a screenshot, get the JSX."

**Target:** `components/pitch-section.tsx` — an intentional empty stub

**Steps:**
1. Find a visually striking reference (Stripe pricing, Linear feature page, anything)
2. Screenshot it
3. Paste into your AI agent and prompt:
   > _"Recreate the section from the image inside `components/pitch-section.tsx` using Tailwind and the `signal-orange`, `signal-violet`, and `signal-cyan` colors defined in `tailwind.config.ts`. Keep the section `id` as `pitch`."_
4. Refresh — the blank section fills in live

**Bonus · Worktree 3D:** try this in a Playground (sandboxed from the main repo):
```
Create a worktree. Do NOT checkout, do NOT switch branches,
do NOT commit to other branches. Only modify files in the current cwd.
If you need to change context, stop and ask.
Convert the current component into a 3D grid using react-three-fiber.
```

---

### Pillar 2 · Real Runtime Debugging

> "The agent reads the runtime — it doesn't guess, it doesn't grep for typos."

Four real bugs intentionally embedded in the code. Each one demonstrates a different DevTools signal.

---

#### Bug 2a · CSS: invisible status pill

**File:** `components/hero.tsx` — white text on white background

**What's broken:** The live status pill in the Hero section is invisible — `text-white` on `bg-white`.

**Steps to reproduce:**
1. Open `http://localhost:3000` — notice the empty white capsule in the hero
2. Inspect it in Chrome DevTools → Elements → see `color: rgb(255,255,255)` on `background-color: rgb(255,255,255)`
3. Change `color` to `#080812` in the inspector to confirm the fix visually

**Prompt for your agent:**
```
In components/hero.tsx the "live status pill" has white text on white background.
DevTools shows color: rgb(255,255,255) on background-color: rgb(255,255,255).
Change text-white to text-ink-950. Only modify that line.
```

---

#### Bug 2b · Network: login posts to a typo'd route

**File:** `app/login/page.tsx` — fetches `/api/lgoin` (typo, should be `/api/login`)

**What's broken:** Submitting the login form returns a 404.

**Steps to reproduce:**
1. Go to `/login`, fill any credentials, click Sign In
2. Open DevTools → Network → filter by Fetch/XHR → see `POST /api/lgoin` returning **404**
3. Note that `app/api/login/route.ts` exists — the route is fine, the caller has the typo

**Prompt for your agent:**
```
The login form at /login returns 404 on submit.
I checked the Network tab in Chrome: the request goes to POST /api/lgoin.
The route tree has app/api/login/route.ts — there's a typo.
Open app/login/page.tsx, find the fetch with the wrong URL, fix it to /api/login.
```

---

#### Bug 2c · Runtime: infinite re-renders in the project grid

**File:** `components/projects-filter-grid.tsx`

**What's broken:** Clicking any category filter button (anything other than "all") causes an infinite re-render loop. The Console floods with `Warning: Maximum update depth exceeded` and the grid freezes.

**Root cause:** `filteredProjects` is computed inline (no `useMemo`), so it produces a new array reference on every render. The `useEffect` depends on it, sees a "changed" dependency every cycle, calls `setDisplayProjects`, triggers a re-render, and loops forever.

**Steps to reproduce:**
1. Open `http://localhost:3000` — the grid loads fine with all projects
2. Open DevTools → Console — confirm it's clean
3. Click the **"ai"** filter button
4. Watch the Console explode with `Maximum update depth exceeded`

**Prompt for your agent:**
```
Connect to localhost:3000 using the Chrome DevTools MCP.
Open the Console — you'll see "Maximum update depth exceeded" repeating.
Analyze the ProjectsFilterGrid component in components/projects-filter-grid.tsx.
The bug fires when clicking any category filter other than "all".
Find why the useEffect creates an infinite re-render loop and fix it
without changing the filtering logic or the UI.
```

**What the fix looks like:** wrap `filteredProjects` in `useMemo([initialProjects, activeCategory])` and remove the circular `useEffect`.

---

#### Bug 2d · Performance: unoptimized images tanking LCP

**File:** `components/project-card.tsx`

**What's broken:** All 8 project cover images (800×450 px, ~200 KB each) load immediately on page load using a plain `<img>` tag — no `loading="lazy"`, no `width`/`height`, no `sizes`. This blocks the main thread and tanks the Largest Contentful Paint score.

**Steps to reproduce:**
1. Open DevTools → Network → hard-reload `http://localhost:3000`
2. Filter by Img — see 8 simultaneous image requests, all loading at full resolution (~1.6 MB total)
3. Switch to Performance tab → record a page load → find the LCP marker deep in the timeline
4. Optional: run Lighthouse on Desktop → see a low Performance score and LCP in red

**Prompt for your agent:**
```
Review the Network and Performance tabs at localhost:3000 using the DevTools MCP.
The project cards load 8 raw images (800×450 px, ~200 KB each) with no lazy loading.
Optimize components/project-card.tsx by replacing the raw <img> with
the next/image component using correct width, height, and sizes props.
Also update next.config.js to allow the picsum.photos domain in images.remotePatterns.
```

**What the fix looks like:**
- Replace `<img src={...}>` with `<Image>` from `next/image`
- Add `width={800}`, `height={450}`, `sizes="(max-width: 768px) 100vw, 33vw"`
- Add `picsum.photos` to `images.remotePatterns` in `next.config.js`

---

### Pillar 3 · Advanced Orchestration

> "Not just parallelizing tasks — agents that fix broken integrations by reading the live runtime."

**Pre-condition:** `/api/projects` is already returning a **500 Internal Server Error**. You can verify this by opening DevTools → Network and reloading `http://localhost:3000`. The project grid still renders (it falls back to the in-memory mock), but the real endpoint is broken.

**Why it's broken:** After the Supabase migration, the Supabase JS client returns rows in PostgreSQL `snake_case` (`tech_stack`, `cover_image`, `is_trending`), but the route tries to access the camelCase keys that don't exist on those rows → `undefined.slice()` → TypeError → 500.

You can see the error body at `http://localhost:3000/api/projects`:
```json
{
  "error": "Cannot read properties of undefined (reading 'slice')",
  "hint": "Supabase returns snake_case columns (tech_stack, cover_image, is_trending) but the route maps to camelCase keys that do not exist on the row."
}
```

#### Agent A · Database migration + autonomous fix (Supabase MCP)

Launch this as a sub-agent and **don't wait for it**:

```
Read lib/mocks/projects.ts and lib/types.ts to understand the shape.
Using the Supabase MCP, create a projects table with snake_case columns
(tech_stack, cover_image, is_trending, plus a category enum and votes).
Write the migration SQL to supabase/schema.sql.
Seed the table with the 8 mock records.
Update app/api/projects/route.ts to read from Supabase.

Once the endpoint is up, open the Chrome DevTools MCP and inspect
the Network tab at localhost:3000.
If /api/projects returns an error, read the response body, identify
the mismatch between the column names Supabase returns (snake_case)
and the ones the frontend expects (camelCase Project type),
and fix the mapping in the API.
Do not finish until /api/projects returns 200 with valid data.
```

**What Agent A does autonomously:**
1. Creates the Supabase table and seeds it
2. Updates `route.ts` to read from Supabase
3. Opens the DevTools Network tab via MCP → sees the 500
4. Reads the error: `"undefined.slice"` + hint about snake_case
5. Traces the mismatch: `row.techStack` (undefined) should be `row.tech_stack`
6. Fixes the column mapping → `/api/projects` returns 200 with real Supabase data

#### Agent B · Marketing copy

Launch this in parallel with Agent A:

```
In components/about-section.tsx there are three paragraphs marked [PLACEHOLDER PARAGRAPH].
Rewrite them as polished marketing copy for a project showcase landing page.
Tone: approachable, slightly irreverent, but serious about the craft.
60–80 words per paragraph. Don't touch headings or JSX structure.
```

**The multiplication moment:** Both agents finish around the same time. Agent A autonomously resolved an integration failure it wasn't explicitly told about. Agent B wrote the copy. You did neither — you orchestrated.

---

## Intentional Bugs — Reference Table

All bugs are intentional. Here's the full map so you can reproduce them at home:

| ID | File | What's broken | Signal in DevTools |
|----|------|---------------|--------------------|
| 2a | `components/hero.tsx:10` | `text-white` on `bg-white` — pill invisible | Elements → computed color |
| 2b | `app/login/page.tsx:25` | `fetch('/api/lgoin')` — typo | Network → POST 404 |
| 2c | `components/projects-filter-grid.tsx` | `useEffect` + inline array → infinite loop | Console → Maximum update depth |
| 2d | `components/project-card.tsx` | `<img>` without lazy/sizes → 8×200 KB on load | Network → Img requests / Lighthouse LCP |
| 3  | `app/api/projects/route.ts` | `row.techStack.slice()` on snake_case row → TypeError | Network → GET /api/projects 500 |

---

## Project Structure

```
app/
  page.tsx                    # Landing (Header + Hero + Grid + Pitch + About + Footer)
  login/page.tsx              # ⚠️  Bug 2b — fetches /api/lgoin (intentional typo)
  api/
    login/route.ts            # Real login endpoint, returns 200
    projects/route.ts         # ⚠️  Bug 3  — snake_case mismatch → 500
  slides/page.tsx             # Full 21-slide interactive presentation
components/
  hero.tsx                    # ⚠️  Bug 2a — invisible status pill
  pitch-section.tsx           # ⚠️  Pillar 1 — empty stub for screenshot demo
  about-section.tsx           # ⚠️  Pillar 3b — placeholder copy for writer agent
  project-card.tsx            # ⚠️  Bug 2d — raw <img> without lazy loading
  projects-filter-grid.tsx    # ⚠️  Bug 2c — infinite re-renders on filter
  projects-grid.tsx           # Server component — fetches projects, falls back to mock
  site-header.tsx
  footer.tsx
lib/
  types.ts                    # Project interface (canonical camelCase shape)
  mocks/projects.ts           # 8 hardcoded projects with coverImage URLs
  utils.ts
supabase/
  schema.sql                  # ⚠️  Pillar 3a — empty stub for the DB agent to fill
public/
  slides/                     # Presentation assets
```

---

## Slides

The full presentation lives at **`/slides`** — keyboard-navigable (arrow keys or space).

**Online:** [https://workshop-mcp-chrome-devtools.vercel.app/slides](https://workshop-mcp-chrome-devtools.vercel.app/slides)
**Local:** [http://localhost:3000/slides](http://localhost:3000/slides)

---

## About the Speaker

<table>
<tr>
<td width="80">
<img src="public/slides/image1.jpg" width="72" style="border-radius:50%" />
</td>
<td>

**Cristian Moreno** · [@khriztianmoreno](https://github.com/khriztianmoreno)

Tech Lead at [Honest](https://honest.net) · Google Developer Expert in Web Technologies

[khriztianmoreno.dev](https://khriztianmoreno.dev) · [Twitter/X](https://twitter.com/khriztianmoreno)

</td>
</tr>
</table>

---

## License

MIT — fork it, run the workshop, make it your own.
