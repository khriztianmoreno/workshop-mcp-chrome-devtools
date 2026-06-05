import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { email } = body as { email?: string };

  await new Promise((r) => setTimeout(r, 250));

  if (!email) {
    return NextResponse.json(
      { error: "email is required" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    user: {
      id: "usr_mock",
      email,
      team: "Captain account (mock)",
    },
  });
}
