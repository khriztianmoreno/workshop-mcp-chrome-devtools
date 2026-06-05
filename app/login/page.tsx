"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, Mail, Trophy } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg(null);

    try {
      // BUG (Pillar 2b): the endpoint is misspelled. The real route lives at
      // /api/login. During the workshop the audience opens the DevTools
      // Network tab, sees a 404 on /api/lgoin and asks the agent to fix it.
      const res = await fetch("/api/lgoin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(`Server responded ${res.status}. Check the Network tab.`);
        return;
      }

      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setErrorMsg((err as Error).message);
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="container-narrow flex min-h-[calc(100vh-4rem)] items-center justify-center py-16">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 text-xs text-ink-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to the wall
          </Link>

          <div className="panel relative overflow-hidden p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal-orange/60 to-transparent" />

            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-signal-orange to-signal-violet">
                <Trophy className="h-4 w-4 text-ink-950" />
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight">
                  Sign in to submit
                </h1>
                <p className="text-xs text-ink-400">
                  Only team captains. One submission per team.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink-200">
                  Email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-ink-500" />
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="captain@team.dev"
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink-200">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-ink-500" />
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary w-full disabled:opacity-60"
              >
                {status === "loading" ? "Signing in…" : "Sign in"}
              </button>

              {status === "error" && (
                <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                  {errorMsg ?? "Something went wrong."}
                </p>
              )}
              {status === "ok" && (
                <p className="rounded-lg border border-signal-lime/30 bg-signal-lime/10 px-3 py-2 text-xs text-signal-lime">
                  Signed in! (mock) — your dashboard is the next demo.
                </p>
              )}
            </form>

            <p className="mt-6 text-center text-xs text-ink-500">
              No account? Just type anything — auth is mocked for the demo.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
