"use client";

import { useEffect, useState } from "react";
import {
  Bug,
  Check,
  Code2,
  Gauge,
  Network,
  RefreshCw,
  Terminal,
  Users,
  X,
  Zap,
} from "lucide-react";

// ─── Atoms ─────────────────────────────────────────────────────────────────

type BadgeVariant = "orange" | "cyan" | "violet" | "default";

export function Badge({
  variant = "default",
  children,
}: {
  variant?: BadgeVariant;
  children: React.ReactNode;
}) {
  const cls: Record<BadgeVariant, string> = {
    orange: "border-signal-orange/60 bg-signal-orange/20 text-signal-orange",
    cyan: "border-signal-cyan/60 bg-signal-cyan/20 text-signal-cyan",
    violet: "border-signal-violet/60 bg-signal-violet/20 text-signal-violet",
    default: "border-white/30 bg-white/10 text-white",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest ${cls[variant]}`}
    >
      {children}
    </span>
  );
}

export function Prompt({ lines }: { lines: string[] }) {
  return (
    <div className="rounded-xl border-2 border-signal-cyan/50 bg-ink-900 p-6">
      <div className="mb-3 flex items-center gap-2">
        <Terminal className="h-4 w-4 text-signal-cyan" />
        <span className="text-xs font-bold uppercase tracking-widest text-signal-cyan">Prompt</span>
      </div>
      <div className="font-mono text-base leading-relaxed text-signal-cyan">
        {lines.map((line, i) => (
          <p key={i}>{line || " "}</p>
        ))}
      </div>
    </div>
  );
}

// Slide wrapper: full-height, wide, good padding for projector
export function S({
  children,
  center,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div
      className={`mx-auto flex min-h-[calc(100vh-56px)] w-full max-w-7xl flex-col px-20 py-14 ${
        center ? "items-center justify-center text-center" : "justify-center"
      }`}
    >
      {children}
    </div>
  );
}

// ─── PhotoCarousel ─────────────────────────────────────────────────────────

function PhotoCarousel({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 3000);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border-2 border-signal-orange/40" style={{ aspectRatio: "3/4" }}>
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: i === idx ? 1 : 0 }}
        />
      ))}
      {/* Indicador de puntos */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-1.5 rounded-full bg-white transition-all duration-300 ${
              i === idx ? "w-6 opacity-100" : "w-1.5 opacity-40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Slides ────────────────────────────────────────────────────────────────

function Cover() {
  return (
    <S center>
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-wrap justify-center gap-3">
          {["Antigravity IDE", "Chrome DevTools MCP", "Agent Manager"].map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
        <h1 className="gradient-text text-[72px] font-extrabold leading-none tracking-tight">
        Desarrollo web potenciado por IA:
          <br />
          Optimiza tu workflow
        </h1>
        <p className="text-2xl font-semibold text-white">
          El nacimiento del desarrollo Agent-First
        </p>
        <p className="max-w-2xl text-center text-lg text-ink-200">
          Cerrando el bucle entre el código estático y el Runtime vivo
          con Antigravity IDE y Chrome DevTools MCP
        </p>
        <div className="h-0.5 w-32 bg-gradient-to-r from-signal-orange to-signal-violet" />
        <p className="text-base font-semibold text-ink-200">@khriztianmoreno</p>
      </div>
    </S>
  );
}


function AboutMe() {
  const items = [
    {
      label: "Rol",
      value: "Senior Software Engineer & Tech Lead — Honest",
    },
    {
      label: "GDE",
      value: "Google Developer Expert · Web Technologies",
    },
    {
      label: "Comunidad",
      value: "Organizador & Speaker · MedellínJS · JSConf Colombia",
    },
    {
      label: "Foco actual",
      value: "Orquestación de Agentes IA · MCP · ADK · Chrome DevTools",
    },
  ];

  return (
    <S>
      <div className="grid grid-cols-[1fr_280px] items-center gap-16">
        {/* ── Texto ── */}
        <div className="flex flex-col gap-7">
          <Badge>¿Quién está detrás de esta presentación?</Badge>

          <div>
            <h1 className="text-[56px] font-extrabold leading-none text-white">
              Cristian Moreno
            </h1>
            <p className="mt-3 font-mono text-xl font-semibold text-signal-cyan">
              @khriztianmoreno
            </p>
          </div>

          <dl className="flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <dt className="w-28 shrink-0 pt-0.5 font-mono text-xs font-extrabold uppercase tracking-widest text-ink-400">
                  {item.label}
                </dt>
                <dd className="text-base font-medium text-white">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap gap-3">
            <Badge variant="orange">GDE Web</Badge>
            <Badge variant="cyan">MCP</Badge>
            <Badge variant="violet">Agent Orchestration</Badge>
          </div>
        </div>

        {/* ── Carrusel + logo ── */}
        <div className="flex flex-col gap-4">
          <PhotoCarousel
            images={[
              "/slides/image2.jpg",
              "/slides/image1.jpg",
              "/slides/image3.jpg",
            ]}
          />
          <div className="flex flex-col items-center gap-2 rounded-2xl border-2 border-ink-600 bg-ink-800 py-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/slides/logo.png" alt="khriztianmoreno" className="h-8 w-auto" />
            <p className="font-mono text-xs font-bold text-signal-cyan">khriztianmoreno.dev</p>
          </div>
        </div>
      </div>
    </S>
  );
}

function TheAgentsAreBound() {
  return (
    <S center>
      <div className="flex max-w-4xl flex-col items-center gap-8">
        <p className="text-sm font-bold uppercase tracking-widest text-ink-300">
          El problema de la Privación Sensorial
        </p>
        <h1 className="gradient-text text-6xl font-extrabold">Los agentes de IA son ciegos</h1>
        <p className="max-w-2xl text-center text-2xl font-medium text-white">
          Generan código basándose en texto estático, sin saber si la interfaz se rompió.
        </p>
        <div className="mt-4 grid w-full grid-cols-3 gap-5">
          {[
            "No ven si el layout colapsó",
            "No detectan el CORS que bloqueó el fetch",
            "No saben que la consola está llena de errores",
          ].map((item) => (
            <div
              key={item}
              className="flex flex-col items-center gap-4 rounded-2xl border-2 border-red-500/40 bg-red-500/10 p-7 text-center"
            >
              <X className="h-6 w-6 text-red-400" />
              <p className="text-base font-medium text-white">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </S>
  );
}

function ClosedLoop() {
  return (
    <S center>
      <div className="flex max-w-4xl flex-col items-center gap-8">
        <Badge variant="cyan">La solución</Badge>
        <h1 className="gradient-text text-[84px] font-extrabold leading-none">
          Closed-Loop
          <br />
          Execution
        </h1>
        <p className="text-xl font-semibold text-white">Runtime Context Injection</p>
        <div className="mt-4 flex w-full flex-col gap-4">
          <div className="flex items-center gap-5 rounded-xl border-2 border-red-500/30 bg-red-500/10 p-5">
            <span className="shrink-0 rounded-full border border-red-500/50 bg-red-500/20 px-3 py-1 font-mono text-xs font-bold text-red-400">
              ANTES
            </span>
            <span className="font-mono text-lg text-ink-100 line-through decoration-red-400/60">
              Prompt → Código → (pray it works)
            </span>
          </div>
          <div className="flex items-center gap-5 rounded-xl border-2 border-signal-cyan/50 bg-signal-cyan/10 p-5">
            <span className="shrink-0 rounded-full border border-signal-cyan/50 bg-signal-cyan/20 px-3 py-1 font-mono text-xs font-bold text-signal-cyan">
              AHORA
            </span>
            <span className="font-mono text-lg font-semibold text-signal-cyan">
              Prompt ↔ Runtime ↔ Fix ↔ Validación
            </span>
          </div>
        </div>
      </div>
    </S>
  );
}

function ComparisonTable() {
  const rows = [
    ["Visibilidad", "Código fuente estático", "Heurística del DOM y estado vivo del runtime"],
    ["Depuración", "Copy-paste manual de errores", "Acceso directo autónomo vía get_console_message"],
    ["Optimización", "Estimaciones teóricas", "Auditorías reales con performance_start_trace"],
    ["Red", "Inspector manual", "list_network_requests + mocking de scripts"],
  ];
  return (
    <S>
      <div className="flex flex-col gap-7">
        <h1 className="text-5xl font-extrabold text-white">
          Antes vs <span className="gradient-text">Ahora</span>
        </h1>
        <div className="overflow-hidden rounded-2xl border-2 border-ink-600">
          <table className="w-full">
            <thead>
              <tr className="bg-ink-700">
                <th className="w-44 px-7 py-5 text-left text-sm font-bold uppercase tracking-widest text-ink-200">
                  Dimensión
                </th>
                <th className="px-7 py-5 text-left text-sm font-bold uppercase tracking-widest text-red-400">
                  Enfoque Tradicional
                </th>
                <th className="px-7 py-5 text-left text-sm font-bold uppercase tracking-widest text-signal-cyan">
                  Enfoque Agent-First
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([dim, before, after], i) => (
                <tr key={dim} className={i % 2 === 0 ? "bg-ink-900" : "bg-ink-800"}>
                  <td className="px-7 py-5 text-base font-bold text-white">{dim}</td>
                  <td className="px-7 py-5 text-base text-ink-200">{before}</td>
                  <td className="px-7 py-5 text-base font-medium text-white">{after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </S>
  );
}

function ThreeReflexes() {
  const items = [
    {
      num: "01",
      title: "Prototipado Visual Ultrarrápido",
      sub: "Antigravity IDE + screenshot → componente",
      icon: <Code2 className="h-6 w-6" />,
      card: "border-signal-orange/50 bg-signal-orange/10",
      label: "text-signal-orange",
    },
    {
      num: "02",
      title: "Resolución Instantánea de Bloqueos",
      sub: "Chrome DevTools MCP → fix en tiempo real",
      icon: <Bug className="h-6 w-6" />,
      card: "border-signal-cyan/50 bg-signal-cyan/10",
      label: "text-signal-cyan",
    },
    {
      num: "03",
      title: "Multiplicar las Manos del Equipo",
      sub: "Agent Manager → paralelismo sin fricción",
      icon: <Users className="h-6 w-6" />,
      card: "border-signal-violet/50 bg-signal-violet/10",
      label: "text-signal-violet",
    },
  ];
  return (
    <S center>
      <div className="flex w-full max-w-6xl flex-col items-center gap-10">
        <h1 className="text-5xl font-extrabold text-white">
          Tres herramientas. <span className="gradient-text">Tres reflejos.</span>
        </h1>
        <div className="grid w-full grid-cols-3 gap-7">
          {items.map((p) => (
            <div
              key={p.num}
              className={`flex flex-col gap-5 rounded-2xl border-2 p-9 ${p.card}`}
            >
              <span className={`font-mono text-sm font-extrabold ${p.label}`}>{p.num}</span>
              <span className={p.label}>{p.icon}</span>
              <h3 className="text-lg font-bold text-white">{p.title}</h3>
              <p className="text-base text-white">{p.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </S>
  );
}

function Pillar1Intro() {
  return (
    <S>
      <div className="flex max-w-4xl flex-col gap-9">
        <Badge variant="orange">Pilar 01</Badge>
        <h1 className="text-6xl font-extrabold leading-tight text-white">
          Prototipado Visual
          <br />
          <span className="gradient-text">Ultrarrápido</span>
        </h1>
        <blockquote className="border-l-4 border-signal-orange pl-7 text-2xl font-medium italic text-white">
          "No arrancés de cero. Pegá un screenshot, recibí el JSX."
        </blockquote>
        <div className="flex items-center gap-3 rounded-xl border-2 border-ink-600 bg-ink-800 p-5">
          <Code2 className="h-5 w-5 shrink-0 text-ink-300" />
          <span className="font-mono text-sm font-semibold text-ink-300">Target:</span>
          <code className="font-mono text-base font-bold text-signal-orange">
            components/pitch-section.tsx
          </code>
          <span className="text-sm font-medium text-ink-300">— stub vacío</span>
        </div>
      </div>
    </S>
  );
}

function Pillar1Demo() {
  return (
    <S>
      <div className="flex max-w-4xl flex-col gap-7">
        <Badge>Demo · Pilar 01</Badge>
        <h2 className="text-3xl font-extrabold text-white">Flujo en vivo</h2>
        <ol className="flex flex-col gap-4">
          {[
            "Abrí una referencia visual (Stripe, Linear, Dribbble, etc.)",
            "Tomá un screenshot de la sección que querés replicar",
            "Pegalo en Antigravity IDE junto con el prompt",
            "Refresh → el stub se convierte en código real",
          ].map((step, i) => (
            <li key={step} className="flex items-start gap-4 text-xl text-white">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-signal-orange/60 bg-signal-orange/20 text-sm font-extrabold text-signal-orange">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
        <Prompt
          lines={[
            `Toma la imagen pegada arriba. Recreala dentro de`,
            `components/pitch-section.tsx con Tailwind.`,
            `Usa los colores signal-* del tailwind.config.ts.`,
            `Conservá el id="pitch".`,
          ]}
        />
        <div className="flex items-center gap-3 rounded-xl border-2 border-signal-amber/40 bg-signal-amber/10 p-5">
          <Zap className="h-5 w-5 shrink-0 text-signal-amber" />
          <p className="text-base font-medium text-white">
            <strong className="text-signal-amber">Bonus — Playgrounds:</strong> sandboxeá ideas
            locas sin tocar el repo principal
          </p>
        </div>
      </div>
    </S>
  );
}

function Pillar2Intro() {
  const bugs = [
    {
      icon: <Bug className="h-5 w-5 text-red-400" />,
      label: "Bug 2a",
      tag: "CSS",
      file: "components/hero.tsx",
      desc: "Píldora invisible: text-white sobre bg-white",
    },
    {
      icon: <Network className="h-5 w-5 text-red-400" />,
      label: "Bug 2b",
      tag: "Network",
      file: "app/login/page.tsx",
      desc: "Login 404 por typo en la URL del fetch",
    },
    {
      icon: <RefreshCw className="h-5 w-5 text-signal-amber" />,
      label: "Bug 2c",
      tag: "Runtime",
      file: "components/projects-filter-grid.tsx",
      desc: "useEffect sin useMemo → re-renders infinitos al filtrar",
    },
    {
      icon: <Gauge className="h-5 w-5 text-signal-violet" />,
      label: "Bug 2d",
      tag: "Performance",
      file: "components/project-card.tsx",
      desc: "8 imágenes crudas 800×450 sin lazy loading → LCP pésimo",
    },
  ];
  return (
    <S>
      <div className="flex max-w-5xl flex-col gap-8">
        <Badge variant="cyan">Pilar 02</Badge>
        <h1 className="text-6xl font-extrabold leading-tight text-white">
          Depuración de{" "}
          <span className="gradient-text">Runtime Real</span>
        </h1>
        <blockquote className="border-l-4 border-signal-cyan pl-7 text-xl font-medium italic text-white">
          "Cuatro bugs. El agente lee el runtime — no adivina, no busca typos en texto."
        </blockquote>
        <div className="grid grid-cols-2 gap-4">
          {bugs.map((b) => (
            <div
              key={b.label}
              className="flex items-start gap-4 rounded-xl border-2 border-ink-600 bg-ink-800 p-5"
            >
              <div className="mt-0.5 shrink-0">{b.icon}</div>
              <div className="flex min-w-0 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-extrabold text-ink-300">{b.label}</span>
                  <span className="rounded bg-ink-700 px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-ink-400">
                    {b.tag}
                  </span>
                </div>
                <code className="truncate font-mono text-sm font-bold text-red-300">{b.file}</code>
                <span className="text-sm text-white">{b.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </S>
  );
}

function Demo2a() {
  return (
    <S>
      <div className="flex max-w-5xl flex-col gap-6">
        <Badge variant="cyan">Bug 2a — CSS</Badge>
        <h2 className="text-4xl font-extrabold text-white">La píldora invisible</h2>
        <div className="grid grid-cols-2 gap-7">
          <div className="flex flex-col gap-5">
            <p className="text-xs font-extrabold uppercase tracking-widest text-ink-300">
              El problema
            </p>
            <div className="flex flex-col gap-4 rounded-2xl border-2 border-ink-600 bg-ink-800 p-7">
              <div className="inline-flex items-center self-start rounded-full bg-white px-4 py-2 text-sm font-bold text-white">
                247 agents live · open to all builders
              </div>
              <p className="font-mono text-sm font-medium text-ink-200">
                color: #fff sobre background: #fff
              </p>
            </div>
            <ol className="flex flex-col gap-3">
              {[
                "DevTools → Inspect element",
                "Ver: text-white sobre bg-white",
                "Edit color en el inspector → validar",
              ].map((s, i) => (
                <li key={s} className="flex items-center gap-3 text-base text-white">
                  <span className="font-mono font-bold text-signal-cyan">{i + 1}.</span> {s}
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-xs font-extrabold uppercase tracking-widest text-ink-300">El fix</p>
            <Prompt
              lines={[
                `En components/hero.tsx,`,
                `la 'live status pill' tiene fondo`,
                `blanco y texto blanco.`,
                `Cambiá el texto a text-ink-950.`,
              ]}
            />
            <div className="rounded-xl border-2 border-ink-600 bg-ink-800 p-5 font-mono text-base">
              <div className="flex items-center gap-3 text-red-400">
                <X className="h-4 w-4" />
                <span className="font-bold">text-white</span>
              </div>
              <div className="mt-2 flex items-center gap-3 text-green-400">
                <Check className="h-4 w-4" />
                <span className="font-bold">text-ink-950</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </S>
  );
}

function Demo2b() {
  return (
    <S>
      <div className="flex max-w-5xl flex-col gap-6">
        <Badge variant="cyan">Bug 2b — Network</Badge>
        <h2 className="text-4xl font-extrabold text-white">404 en el form de login</h2>
        <div className="grid grid-cols-2 gap-7">
          <div className="flex flex-col gap-5">
            <p className="text-xs font-extrabold uppercase tracking-widest text-ink-300">
              El problema
            </p>
            <div className="flex flex-col gap-4 rounded-2xl border-2 border-ink-600 bg-ink-800 p-6 font-mono text-base">
              <div className="flex items-center gap-3 text-red-400">
                <X className="h-5 w-5" />
                <span>
                  POST /api/<strong>lgoin</strong> → 404
                </span>
              </div>
              <div className="flex items-center gap-3 text-green-400">
                <Check className="h-5 w-5" />
                <span>
                  POST /api/<strong>login</strong> → 200 ✓
                </span>
              </div>
            </div>
            <ol className="flex flex-col gap-3">
              {[
                "Ir a /login → completar form → submit",
                "DevTools → Network → POST 404",
                "Ver fetch('/api/lgoin') en page.tsx",
              ].map((s, i) => (
                <li key={s} className="flex items-center gap-3 text-base text-white">
                  <span className="font-mono font-bold text-signal-cyan">{i + 1}.</span> {s}
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-xs font-extrabold uppercase tracking-widest text-ink-300">El fix</p>
            <Prompt
              lines={[
                `El form de /login da 404. Mirá la`,
                `pestaña Network, revisá la URL del`,
                `fetch en app/login/page.tsx y compará`,
                `con las rutas en app/api/.`,
                `Arreglá el typo.`,
              ]}
            />
          </div>
        </div>
      </div>
    </S>
  );
}

function Demo2c() {
  return (
    <S>
      <div className="flex max-w-5xl flex-col gap-6">
        <Badge variant="cyan">Bug 2c — Runtime · Re-renders</Badge>
        <h2 className="text-4xl font-extrabold text-white">
          <RefreshCw className="mr-3 inline h-8 w-8 text-signal-amber" />
          Re-renders infinitos en la grilla
        </h2>
        <div className="grid grid-cols-2 gap-7">
          <div className="flex flex-col gap-5">
            <p className="text-xs font-extrabold uppercase tracking-widest text-ink-300">
              El problema
            </p>
            <div className="flex flex-col gap-3 rounded-2xl border-2 border-signal-amber/40 bg-signal-amber/10 p-6 font-mono text-sm">
              <p className="text-ink-300">{"// filteredProjects: nueva ref cada render"}</p>
              <p className="text-white">
                {"const filteredProjects ="}
              </p>
              <p className="pl-4 text-red-300">
                {"activeCategory === 'all'"}
              </p>
              <p className="pl-6 text-red-300">{"? [...displayProjects] // ← siempre nuevo"}</p>
              <p className="pl-6 text-red-300">{"  : displayProjects.filter(...)"}</p>
              <p className="mt-2 text-white">{"useEffect(() => {"}</p>
              <p className="pl-4 text-red-300">{"setDisplayProjects([...filteredProjects]"}</p>
              <p className="pl-4 text-red-300">{"  .sort((a,b) => b.votes - a.votes));"}</p>
              <p className="text-white">{"}, [filteredProjects]); // ← loop infinito"}</p>
            </div>
            <div className="rounded-xl border-2 border-red-500/30 bg-red-500/10 p-4">
              <p className="font-mono text-sm font-bold text-red-400">
                ⚠ Maximum update depth exceeded
              </p>
              <p className="mt-1 text-xs text-ink-300">
                Clická cualquier categoría ≠ "all" → la consola explota
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-xs font-extrabold uppercase tracking-widest text-ink-300">El fix</p>
            <Prompt
              lines={[
                "Conéctate a localhost:3000 con el MCP.",
                "Abrí la consola — vas a ver",
                '"Maximum update depth exceeded".',
                "Analizá ProjectsFilterGrid en",
                "components/projects-filter-grid.tsx.",
                "Corregí el useEffect sin cambiar",
                "la lógica de filtrado ni el UI.",
              ]}
            />
            <div className="flex flex-col gap-2 rounded-xl border-2 border-ink-600 bg-ink-800 p-5 font-mono text-sm">
              <div className="flex items-start gap-2 text-red-400">
                <X className="mt-0.5 h-4 w-4 shrink-0" />
                <span>inline array → nueva ref cada render</span>
              </div>
              <div className="flex items-start gap-2 text-green-400">
                <Check className="mt-0.5 h-4 w-4 shrink-0" />
                <span>useMemo → ref estable, sin loop</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </S>
  );
}

function Demo2d() {
  return (
    <S>
      <div className="flex max-w-5xl flex-col gap-6">
        <Badge variant="cyan">Bug 2d — Performance · LCP</Badge>
        <h2 className="text-4xl font-extrabold text-white">
          <Gauge className="mr-3 inline h-8 w-8 text-signal-violet" />
          Imágenes sin optimizar
        </h2>
        <div className="grid grid-cols-2 gap-7">
          <div className="flex flex-col gap-5">
            <p className="text-xs font-extrabold uppercase tracking-widest text-ink-300">
              El problema
            </p>
            <div className="flex flex-col gap-3 rounded-2xl border-2 border-signal-violet/40 bg-signal-violet/10 p-6">
              <div className="flex items-center justify-between font-mono text-sm">
                <span className="text-ink-300">8 imágenes · carga inicial</span>
                <span className="font-bold text-red-400">~1.6 MB</span>
              </div>
              <div className="h-px bg-ink-600" />
              {[
                ["picsum.photos/echo/800/450", "~210 KB", true],
                ["picsum.photos/patchwork/800/450", "~190 KB", true],
                ["picsum.photos/pebble/800/450", "~205 KB", true],
                ["… 5 más", "~1 MB total", true],
              ].map(([url, size, eager]) => (
                <div key={String(url)} className="flex items-center justify-between gap-2">
                  <span className="truncate font-mono text-xs text-ink-300">{String(url)}</span>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="font-mono text-xs font-bold text-red-400">{String(size)}</span>
                    {eager && (
                      <span className="rounded bg-red-500/20 px-1.5 py-0.5 text-[9px] font-bold uppercase text-red-400">
                        eager
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl border-2 border-red-500/30 bg-red-500/10 p-4">
              <p className="font-mono text-sm font-bold text-red-400">LCP &gt; 4 s · Score bajo</p>
              <p className="mt-1 text-xs text-ink-300">
                Sin lazy loading, sin width/height, sin sizes — bloquea el hilo principal
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-xs font-extrabold uppercase tracking-widest text-ink-300">El fix</p>
            <Prompt
              lines={[
                "Revisá Network y Performance en",
                "localhost:3000 con el MCP.",
                "Las tarjetas cargan 8 imgs crudas",
                "sin lazy loading (~200KB c/u).",
                "Optimizá project-card.tsx con",
                "next/image + width, height, sizes.",
                "Actualizá next.config.js para",
                "permitir picsum.photos.",
              ]}
            />
            <div className="flex flex-col gap-2 rounded-xl border-2 border-ink-600 bg-ink-800 p-5 font-mono text-sm">
              <div className="flex items-start gap-2 text-red-400">
                <X className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{"<img src> — sin lazy, sin tamaño"}</span>
              </div>
              <div className="flex items-start gap-2 text-green-400">
                <Check className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{"<Image> — WebP, lazy, srcset auto"}</span>
              </div>
              <div className="flex items-start gap-2 text-green-400">
                <Check className="mt-0.5 h-4 w-4 shrink-0" />
                <span>next.config.js remotePatterns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </S>
  );
}

function Pillar3Intro() {
  return (
    <S>
      <div className="flex max-w-4xl flex-col gap-9">
        <Badge variant="violet">Pilar 03</Badge>
        <h1 className="text-6xl font-extrabold leading-tight text-white">
          Orquestación
          <br />
          <span className="gradient-text">Avanzada</span>
        </h1>
        <blockquote className="border-l-4 border-signal-violet pl-7 text-2xl font-medium italic text-white">
          "No solo paralelizar tareas — agentes que resuelven integraciones fallidas leyendo el runtime."
        </blockquote>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 rounded-xl border-2 border-red-500/30 bg-red-500/10 p-5">
            <Network className="h-5 w-5 shrink-0 text-red-400" />
            <div>
              <p className="text-sm font-bold text-red-300">GET /api/projects → 500</p>
              <p className="text-xs text-ink-300">
                El endpoint de Supabase está roto: la migración existe pero el mapeo de columnas es incorrecto.
              </p>
            </div>
          </div>
          <div className="rounded-xl border-2 border-ink-600 bg-ink-800 p-5">
            <p className="text-base font-medium text-white">
              El <strong className="font-bold text-white">Inbox asíncrono</strong> evita el desorden
              de chats lineales. Si el agente se bloquea en un permiso de Supabase, levanta un
              ticket — vos seguís sin interrupciones.
            </p>
          </div>
        </div>
      </div>
    </S>
  );
}

function Demo3() {
  return (
    <S>
      <div className="flex max-w-5xl flex-col gap-6">
        <Badge>Demo · Pilar 03 — Sincronización en Caliente</Badge>
        <h2 className="text-3xl font-extrabold text-white">
          Orquestación <span className="gradient-text">Avanzada</span>
        </h2>

        {/* Network tab reveal */}
        <div className="flex items-center gap-4 rounded-xl border-2 border-red-500/40 bg-red-500/10 p-4">
          <Network className="h-5 w-5 shrink-0 text-red-400" />
          <div className="flex flex-col gap-0.5">
            <p className="font-mono text-sm font-bold text-red-400">
              GET /api/projects → <span className="text-red-300">500 Internal Server Error</span>
            </p>
            <p className="text-xs text-ink-300">
              Supabase devuelve <code className="text-red-300">tech_stack</code> pero la API accede a{" "}
              <code className="text-red-300">techStack</code> → undefined.slice() → crash
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {/* Agent 3a */}
          <div className="flex flex-col gap-4 rounded-2xl border-2 border-signal-cyan/50 bg-signal-cyan/10 p-6">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-signal-cyan" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-signal-cyan">
                Developer Agent
              </span>
            </div>
            <ol className="flex flex-col gap-2">
              {[
                { step: "Migra Supabase", done: true },
                { step: "Levanta route.ts", done: true },
                { step: "Lee Network tab → 500", done: true },
                { step: "Detecta snake_case ↔ camelCase mismatch", done: true },
                { step: "Corrige el mapeo → 200 ✓", done: true },
              ].map((item) => (
                <li key={item.step} className="flex items-center gap-2 text-sm text-white">
                  <Check className="h-3.5 w-3.5 shrink-0 text-signal-cyan" />
                  {item.step}
                </li>
              ))}
            </ol>
            <div className="mt-auto rounded-lg bg-ink-900 p-3 font-mono text-xs text-ink-300">
              <p className="text-red-400">{"// antes"}</p>
              <p>{"techStack: row.techStack.slice(0,3)"}</p>
              <p className="mt-1 text-green-400">{"// después"}</p>
              <p>{"techStack: row.tech_stack.slice(0,3)"}</p>
            </div>
          </div>

          {/* Agent 3b */}
          <div className="flex flex-col gap-4 rounded-2xl border-2 border-signal-violet/50 bg-signal-violet/10 p-6">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-signal-violet" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-signal-violet">
                Marketing Agent
              </span>
            </div>
            <div className="font-mono text-sm text-ink-200">
              <p>→ components/about-section.tsx</p>
            </div>
            <p className="text-sm font-medium leading-relaxed text-white">
              Reescribí los 3 párrafos <code className="text-ink-300">[PLACEHOLDER]</code> como copy de
              marketing para un marketplace de agentes de IA. Tono cercano, levemente irreverente. 60-80 palabras por párrafo.
            </p>
            <div className="mt-auto flex items-center gap-2 rounded-lg bg-ink-900 p-3">
              <Check className="h-4 w-4 shrink-0 text-signal-violet" />
              <span className="font-mono text-xs text-signal-violet">3 párrafos → copy real</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border-2 border-signal-amber/40 bg-signal-amber/10 p-4">
          <Zap className="h-5 w-5 shrink-0 text-signal-amber" />
          <p className="text-base font-medium text-white">
            El agente no siguió un script —{" "}
            <strong className="text-signal-amber">
              leyó el runtime, diagnosticó el mismatch de tipos y lo resolvió solo.
            </strong>{" "}
            Eso es un colega, no una herramienta.
          </p>
        </div>
      </div>
    </S>
  );
}

function TheTransformation() {
  const rows = [
    {
      dimension: "Cuando hay un error",
      before: "Copiás el mensaje, pegás al chat, esperás",
      after: "El agente lee la consola directo y propone el fix",
    },
    {
      dimension: "Flujo de trabajo",
      before: "Un agente a la vez, vos bloqueado esperando",
      after: "N agentes en paralelo, aprobás en el Inbox cuando querés",
    },
    {
      dimension: "Diseño de UI",
      before: "Describís con palabras lo que imaginás",
      after: "Adjuntás la referencia visual, el agente replica la estructura",
    },
    {
      dimension: "Debugging",
      before: "Inspeccionás el DOM y la red manualmente",
      after: "El agente audita performance y red, te trae el root cause",
    },
    {
      dimension: "Tu rol",
      before: "Escritor de sintaxis",
      after: "Orquestador de Intenciones Agénticas",
      highlight: true,
    },
  ];
  return (
    <S>
      <div className="flex flex-col gap-7">
        <Badge variant="violet">La Transformación</Badge>
        <h1 className="text-5xl font-extrabold text-white">
          Cómo cambia <span className="gradient-text">tu día a día</span>
        </h1>
        <div className="overflow-hidden rounded-2xl border-2 border-ink-600">
          <table className="w-full">
            <thead>
              <tr className="bg-ink-700">
                <th className="w-52 px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-ink-200">
                  Situación
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-red-400">
                  Antes
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-signal-cyan">
                  Con Antigravity IDE + MCP
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.dimension}
                  className={
                    row.highlight
                      ? "bg-signal-violet/10 border-t-2 border-signal-violet/30"
                      : i % 2 === 0
                      ? "bg-ink-900"
                      : "bg-ink-800"
                  }
                >
                  <td className="px-6 py-4 text-base font-bold text-white">
                    {row.dimension}
                  </td>
                  <td className="px-6 py-4 text-base text-ink-200">{row.before}</td>
                  <td
                    className={`px-6 py-4 text-base font-semibold ${
                      row.highlight ? "text-signal-violet" : "text-white"
                    }`}
                  >
                    {row.after}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </S>
  );
}

function Closing() {
  return (
    <S center>
      <div className="flex max-w-5xl flex-col items-center gap-8">
        <h1 className="gradient-text text-[60px] font-extrabold leading-tight">
          Del escritor de sintaxis
          <br />
          al Orquestador de Ingeniería
        </h1>
        <div className="grid w-full grid-cols-3 gap-6 text-left">
          {[
            {
              title: "Validación Determinista",
              desc: "El agente escribe código y lo verifica en el runtime real. Se acabó programar a ciegas.",
              color: "text-signal-orange",
              border: "border-signal-orange/50",
              bg: "bg-signal-orange/10",
            },
            {
              title: "Multiplicación del Output",
              desc: "Un ingeniero dirige Producto, QA, Backend y Marketing de forma asíncrona y paralela.",
              color: "text-signal-violet",
              border: "border-signal-violet/50",
              bg: "bg-signal-violet/10",
            },
            {
              title: "Gestión de Intenciones",
              desc: "El futuro no es escribir sintaxis. Es dirigir sistemas que entienden qué querés construir.",
              color: "text-signal-cyan",
              border: "border-signal-cyan/50",
              bg: "bg-signal-cyan/10",
            },
          ].map((c) => (
            <div key={c.title} className={`rounded-2xl border-2 p-7 ${c.border} ${c.bg}`}>
              <h3 className={`mb-3 text-xs font-extrabold uppercase tracking-widest ${c.color}`}>
                {c.title}
              </h3>
              <p className="text-base font-medium leading-relaxed text-white">{c.desc}</p>
            </div>
          ))}
        </div>
        <blockquote className="border-l-4 border-signal-orange pl-6 text-left text-lg font-medium italic text-white">
          "Este ecosistema marca el fin de la era del Corte y Confección de código
          y el inicio de la era de la Gestión de Intenciones Agénticas."
        </blockquote>
      </div>
    </S>
  );
}

function QnA() {
  return (
    <S center>
      <div className="flex flex-col items-center gap-10">
        <h1 className="gradient-text text-[104px] font-extrabold leading-none">¿Preguntas?</h1>
        <div className="flex flex-wrap justify-center gap-4">
          <Badge>@khriztianmoreno</Badge>
          <Badge>github.com/khriztianmoreno/workshop-mcp-chrome-devtools</Badge>
        </div>
        <div className="rounded-2xl border-2 border-ink-600 bg-ink-800 p-6 text-center">
          <p className="text-base font-medium text-white">
            <code className="font-mono font-bold text-signal-cyan">pnpm dev</code>
            {" → "}
            <code className="font-mono font-bold text-ink-200">localhost:3000</code>
            {" · El código está disponible para explorar"}
          </p>
        </div>
      </div>
    </S>
  );
}

function WhatIsAnAgent() {
  return (
    <S>
      <div className="flex flex-col gap-7">
        <Badge>Conceptos Base</Badge>
        <h1 className="text-5xl font-extrabold text-white">
          ¿Qué es un <span className="gradient-text">Agente de IA</span>?
        </h1>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-5 rounded-2xl border-2 border-red-500/30 bg-red-500/10 p-7">
            <p className="text-xs font-extrabold uppercase tracking-widest text-red-400">
              LLM solo — el cerebro sin cuerpo
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "Texto entra → Texto sale",
                "Sin acceso a herramientas externas",
                "Sin contexto del entorno real",
                "Reactivo: solo responde, no actúa",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-base text-white">
                  <X className="h-4 w-4 shrink-0 text-red-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5 rounded-2xl border-2 border-signal-cyan/50 bg-signal-cyan/10 p-7">
            <p className="text-xs font-extrabold uppercase tracking-widest text-signal-cyan">
              Agente — el cerebro con ojos y manos
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "Percibe: archivos, DOM, consola, red",
                "Razona usando el modelo de lenguaje",
                "Ejecuta: edita código, navega, llama APIs",
                "Itera autónomamente hasta completar la tarea",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-base text-white">
                  <Check className="h-4 w-4 shrink-0 text-signal-cyan" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border-2 border-signal-amber/40 bg-signal-amber/10 p-5">
          <Zap className="h-5 w-5 shrink-0 text-signal-amber" />
          <p className="text-base font-semibold text-white">
            "Un LLM es el cerebro. El Agente es el cerebro con{" "}
            <strong className="text-signal-amber">ojos, manos y memoria</strong>."
          </p>
        </div>
      </div>
    </S>
  );
}

function WhatIsMCP() {
  return (
    <S>
      <div className="flex flex-col gap-7">
        <Badge>Conceptos Base</Badge>
        <div className="flex items-end gap-6">
          <h1 className="text-5xl font-extrabold text-white">
            ¿Qué es <span className="gradient-text">MCP</span>?
          </h1>
          <p className="mb-1 text-lg font-medium text-ink-200">
            Model Context Protocol — Anthropic, 2024
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-4 rounded-2xl border-2 border-ink-600 bg-ink-800 p-7">
            <p className="text-xs font-extrabold uppercase tracking-widest text-ink-300">Sin MCP</p>
            <p className="text-base text-white">
              Cada herramienta habla su propio dialecto. Integración custom para cada combinación de
              modelo + tool.
            </p>
            <p className="font-mono text-sm text-ink-300">
              VSCode plugin ≠ Cursor plugin ≠ Windsurf plugin
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-2xl border-2 border-signal-violet/50 bg-signal-violet/10 p-7">
            <p className="text-xs font-extrabold uppercase tracking-widest text-signal-violet">
              Con MCP
            </p>
            <p className="text-base text-white">
              Protocolo estándar y abierto. Cualquier modelo se conecta a cualquier herramienta que
              implemente MCP.
            </p>
            <p className="font-mono text-sm font-semibold text-signal-violet">
              Chrome DevTools · Supabase · GitHub · Slack · Filesystem
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border-2 border-signal-cyan/40 bg-signal-cyan/10 p-5">
          <Network className="h-5 w-5 shrink-0 text-signal-cyan" />
          <p className="text-base font-semibold text-white">
            "Como{" "}
            <strong className="text-signal-cyan">USB-C para los agentes</strong>: un estándar
            universal para que los modelos accedan a cualquier herramienta."
          </p>
        </div>
      </div>
    </S>
  );
}

function WhyAntigravity() {
  const rows = [
    [
      "Chat",
      "Lineal y bloqueante — respondés antes de continuar",
      "Asíncrono — los agentes trabajan, vos aprobás cuando querés",
    ],
    [
      "Navegador",
      "Externo — vos copiás el error y lo pegás al chat",
      "Nativo — el agente lee el DOM y la consola directamente",
    ],
    [
      "Agentes en paralelo",
      "1 a la vez, el otro espera",
      "N agentes simultáneos + Inbox de aprobaciones no-bloqueante",
    ],
    [
      "Contexto disponible",
      "Código estático solamente",
      "Código + Runtime + DOM + consola + red + performance",
    ],
  ];
  return (
    <S>
      <div className="flex flex-col gap-7">
        <Badge variant="orange">La Diferencia Real</Badge>
        <h1 className="text-5xl font-extrabold text-white">
          ¿Por qué Antigravity IDE y no Cursor?
        </h1>
        <div className="overflow-hidden rounded-2xl border-2 border-ink-600">
          <table className="w-full">
            <thead>
              <tr className="bg-ink-700">
                <th className="w-52 px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-ink-200">
                  Dimensión
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-red-400">
                  Cursor / Copilot / VSCode
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-signal-cyan">
                  Antigravity IDE
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([dim, before, after], i) => (
                <tr key={dim} className={i % 2 === 0 ? "bg-ink-900" : "bg-ink-800"}>
                  <td className="px-6 py-4 text-base font-bold text-white">{dim}</td>
                  <td className="px-6 py-4 text-base text-ink-200">{before}</td>
                  <td className="px-6 py-4 text-base font-medium text-white">{after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-start gap-4 rounded-xl border-2 border-signal-orange/40 bg-signal-orange/10 p-5">
          <Terminal className="mt-0.5 h-5 w-5 shrink-0 text-signal-orange" />
          <p className="text-base font-semibold text-white">
            "No es un chat con esteroides. Es una capa de orquestación donde el{" "}
            <strong className="text-signal-orange">
              browser y el IDE comparten el mismo sistema nervioso
            </strong>
            ."
          </p>
        </div>
      </div>
    </S>
  );
}

function WelcomeQR() {
  return (
    <S center>
      <div className="flex max-w-5xl flex-col items-center gap-8">
        <Badge variant="orange">Conéctate al taller</Badge>
        <h1 className="gradient-text text-5xl font-extrabold tracking-tight">
          Escanea para Empezar
        </h1>
        <p className="max-w-2xl text-center text-lg text-ink-200">
          Sigue la presentación de forma interactiva en tu dispositivo y clona el código fuente para seguir la demostración en vivo.
        </p>

        <div className="mt-6 grid w-full grid-cols-2 gap-12">
          {/* QR Diapositivas */}
          <div className="flex flex-col items-center gap-4">
            <Badge variant="cyan">1. Presentación Interactiva</Badge>
            <div className="relative overflow-hidden rounded-2xl border-4 border-signal-cyan/50 bg-white p-6 shadow-[0_0_50px_-12px_rgba(34,211,238,0.4)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slides/qr-code-slides.png"
                alt="QR Slides"
                className="h-60 w-60"
              />
            </div>
            <p className="font-mono text-xs font-bold text-signal-cyan">
              workshop-mcp-chrome-devtools.vercel.app/slides
            </p>
          </div>

          {/* QR Repositorio */}
          <div className="flex flex-col items-center gap-4">
            <Badge variant="violet">2. Repositorio de GitHub</Badge>
            <div className="relative overflow-hidden rounded-2xl border-4 border-signal-violet/50 bg-white p-6 shadow-[0_0_50px_-12px_rgba(168,85,247,0.4)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/slides/qr-code.png"
                alt="QR GitHub"
                className="h-60 w-60"
              />
            </div>
            <p className="font-mono text-xs font-bold text-signal-violet">
              github.com/khriztianmoreno/workshop-mcp-chrome-devtools
            </p>
          </div>
        </div>
      </div>
    </S>
  );
}

function DownloadKit() {
  return (
    <S>
      <div className="grid grid-cols-[1fr_360px] items-center gap-16">
        {/* ── Instrucciones ── */}
        <div className="flex flex-col gap-7">
          <Badge variant="cyan">Show time</Badge>
          <h1 className="text-6xl font-extrabold leading-tight text-white">
            Hora de <span className="gradient-text">Código</span>
          </h1>
          <p className="text-lg text-ink-200">
            Basta de teoría. Cloná el repo, arrancá el server y seguimos la demo en vivo.
          </p>
          <div className="flex flex-col gap-3 rounded-2xl border-2 border-ink-600 bg-ink-800 p-6 font-mono text-base">
            <code className="text-signal-cyan">
              git clone https://github.com/khriztianmoreno/workshop-mcp-chrome-devtools
            </code>
            <code className="text-signal-cyan">cd workshop-mcp-chrome-devtools</code>
            <code className="text-signal-cyan">pnpm install</code>
            <code className="text-signal-cyan">pnpm dev</code>
          </div>
        </div>

        {/* ── QR + URL ── */}
        <div className="flex flex-col items-center gap-5">
          <div className="rounded-2xl border-4 border-signal-violet/50 bg-white p-6 shadow-[0_0_50px_-12px_rgba(168,85,247,0.4)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/slides/qr-code.png"
              alt="QR GitHub"
              className="h-60 w-60"
            />
          </div>
          <div className="flex flex-col items-center gap-1 rounded-2xl border-2 border-ink-600 bg-ink-800 px-6 py-3 w-full">
            <p className="font-mono text-xs font-bold text-signal-cyan">github.com/khriztianmoreno/workshop-mcp-chrome-devtools</p>
          </div>
        </div>
      </div>
    </S>
  );
}

// ─── Registry ──────────────────────────────────────────────────────────────

export type SlideEntry = {
  id: string;
  Component: React.FC;
  title: string;
};

export const SLIDES: SlideEntry[] = [
  { id: "welcome-qr", Component: WelcomeQR, title: "Welcome / QR" },
  { id: "cover", Component: Cover, title: "Cover" },
  { id: "about-me", Component: AboutMe, title: "About Me" },
  { id: "agents-are-bound", Component: TheAgentsAreBound, title: "Los agentes son ciegos" },
  { id: "what-is-an-agent", Component: WhatIsAnAgent, title: "¿Qué es un Agente?" },
  { id: "what-is-mcp", Component: WhatIsMCP, title: "¿Qué es MCP?" },
  { id: "closed-loop", Component: ClosedLoop, title: "Closed-Loop Execution" },
  { id: "why-antigravity", Component: WhyAntigravity, title: "¿Por qué Antigravity?" },
  { id: "comparison-table", Component: ComparisonTable, title: "Antes vs Ahora" },
  { id: "three-reflexes", Component: ThreeReflexes, title: "Tres herramientas" },
  { id: "download-kit", Component: DownloadKit, title: "Hora de Código" },
  { id: "pillar-1-intro", Component: Pillar1Intro, title: "Pilar 01 — Intro" },
  { id: "pillar-1-demo", Component: Pillar1Demo, title: "Pilar 01 — Demo" },
  { id: "pillar-2-intro", Component: Pillar2Intro, title: "Pilar 02 — Intro" },
  { id: "demo-2a", Component: Demo2a, title: "Demo 2a — CSS" },
  { id: "demo-2b", Component: Demo2b, title: "Demo 2b — Network" },
  { id: "demo-2c", Component: Demo2c, title: "Demo 2c — Runtime" },
  { id: "demo-2d", Component: Demo2d, title: "Demo 2d — Performance" },
  { id: "pillar-3-intro", Component: Pillar3Intro, title: "Pilar 03 — Intro" },
  { id: "demo-3", Component: Demo3, title: "Demo 3 — Orquestación" },
  { id: "transformation", Component: TheTransformation, title: "La Transformación" },
  { id: "closing", Component: Closing, title: "Closing" },
  { id: "qna", Component: QnA, title: "Q&A" },
];
