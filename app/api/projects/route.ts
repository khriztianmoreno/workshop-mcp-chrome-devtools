import { NextResponse } from "next/server";
import { projects } from "@/lib/mocks/projects";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // After the Pillar 3 Supabase migration the Supabase JS client returns
    // rows with PostgreSQL snake_case column names.
    // BUG 3 — the route ships the raw Supabase rows without remapping them
    // to the camelCase Project shape the frontend expects.
    // Accessing .techStack on a row that only has .tech_stack returns
    // undefined → .slice() throws a TypeError → 500 Internal Server Error.
    // ProjectsGrid catches the non-ok response and falls back to the in-memory
    // mock so the page still renders — the breakage is only visible in the
    // Network tab (and via the Chrome DevTools MCP).
    const supabaseRows = projects.map((p) => ({
      id: p.id,
      name: p.name,
      tagline: p.tagline,
      category: p.category,
      team: p.team,
      members: p.members,
      emoji: p.emoji,
      votes: p.votes,
      is_trending: p.trending,    // snake_case — frontend expects `trending`
      tech_stack: p.techStack,    // snake_case — frontend expects `techStack`
      cover_image: p.coverImage,  // snake_case — frontend expects `coverImage`
    }));

    const payload = (supabaseRows as any[]).map((row) => ({
      ...row,
      // Accessing camelCase keys that don't exist on the snake_case row:
      techStack: row.techStack.slice(0, 3), // TypeError: undefined.slice
    }));

    return NextResponse.json({ projects: payload });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message,
        hint: "Supabase returns snake_case columns (tech_stack, cover_image, is_trending) but the route maps to camelCase keys that do not exist on the row.",
      },
      { status: 500 }
    );
  }
}
