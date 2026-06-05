"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

// ─── Tipos ──────────────────────────────────────────────────────────────────

type EmojiKey = "❤️" | "👍" | "👎";

// Positivos se multiplican visualmente, el negativo no
const SPAWN_COUNT: Record<EmojiKey, number> = {
  "❤️": 20,
  "👍": 15,
  "👎": 1,
};

interface Floater {
  id: string;
  emoji: EmojiKey;
  x: number;       // posición inicial horizontal desde la derecha (px)
  delay: number;   // stagger ms
  driftX: number;  // cuánto y hacia dónde deriva mientras sube (-80 a +80)
  size: number;    // tamaño en px (24–42) — variar tamaños da sensación de profundidad
  scale: number;   // escala inicial (0.6–1.2)
  rot0: number;    // rotación inicial en deg
  rot1: number;    // rotación final en deg
  duration: number; // duración total de la animación en segundos
}

// ─── FloatingEmoji ───────────────────────────────────────────────────────────

function FloatingEmoji({
  item,
  onDone,
}: {
  item: Floater;
  onDone: (id: string) => void;
}) {
  useEffect(() => {
    const t = setTimeout(() => onDone(item.id), item.delay + item.duration * 1000 + 100);
    return () => clearTimeout(t);
  }, [item.id, item.delay, item.duration, onDone]);

  const anim = `${item.duration}s ease-in-out ${item.delay}ms both`;

  return (
    // Outer: deriva horizontal en curva
    <div
      className="pointer-events-none absolute bottom-0 select-none"
      style={{
        right: `${item.x}px`,
        ["--rx-dx" as string]: `${item.driftX}px`,
        animation: `rxDrift ${anim}`,
      }}
    >
      {/* Inner: ascenso vertical + escala + rotación */}
      <div
        style={{
          fontSize: `${item.size}px`,
          lineHeight: 1,
          ["--rx-s" as string]: item.scale,
          ["--rx-r0" as string]: `${item.rot0}deg`,
          ["--rx-r1" as string]: `${item.rot1}deg`,
          animation: `rxRise ${anim}`,
        }}
      >
        {item.emoji}
      </div>
    </div>
  );
}

// ─── ReactionButton ──────────────────────────────────────────────────────────

function ReactionButton({
  emoji,
  count,
  onClick,
}: {
  emoji: EmojiKey;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 rounded-xl border-2 border-white/20 bg-ink-800 px-4 py-3 transition-all hover:scale-110 hover:border-white/40 active:scale-95"
    >
      <span className="text-2xl leading-none">{emoji}</span>
      <span className="font-mono text-xs font-bold text-white tabular-nums">
        {count.toLocaleString()}
      </span>
    </button>
  );
}

// ─── ReactionSystem ──────────────────────────────────────────────────────────

const CHANNEL = "slide-reactions-v1";

export function ReactionSystem() {
  const [counts, setCounts] = useState<Record<EmojiKey, number>>({
    "❤️": 0,
    "👍": 0,
    "👎": 0,
  });
  const [floaters, setFloaters] = useState<Floater[]>([]);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  const spawnFloaters = useCallback((emoji: EmojiKey) => {
    const n = SPAWN_COUNT[emoji];
    const batch: Floater[] = Array.from({ length: n }, (_, i) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}-${i}`,
      emoji,
      x: Math.random() * 180 + 30,              // 30–210px desde la derecha
      delay: Math.floor((i / n) * 650 + Math.random() * 180), // stagger natural
      driftX: (Math.random() - 0.5) * 160,       // deriva -80 a +80px (izq o der)
      size: Math.round(22 + Math.random() * 20), // 22–42px — mezcla de chicos y grandes
      scale: 0.55 + Math.random() * 0.65,        // 0.55–1.2
      rot0: (Math.random() - 0.5) * 28,          // rotación inicial -14° a +14°
      rot1: (Math.random() - 0.5) * 52,          // rotación final -26° a +26°
      duration: 1.2 + Math.random() * 0.85,      // 1.2–2.05s — ritmos distintos
    }));
    setFloaters((prev) => [...prev.slice(-100), ...batch]);
  }, []);

  const removeFloater = useCallback((id: string) => {
    setFloaters((prev) => prev.filter((f) => f.id !== id));
  }, []);

  // Conectar al canal de Supabase Realtime
  useEffect(() => {
    const channel = supabase.channel(CHANNEL, {
      config: { broadcast: { self: true } }, // el que hace click también ve el efecto
    });

    channelRef.current = channel;

    channel
      .on("broadcast", { event: "react" }, ({ payload }) => {
        const emoji = payload.emoji as EmojiKey;
        setCounts((prev) => ({ ...prev, [emoji]: prev[emoji] + 1 }));
        spawnFloaters(emoji);
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [spawnFloaters]);

  const react = (emoji: EmojiKey) => {
    channelRef.current?.send({
      type: "broadcast",
      event: "react",
      payload: { emoji },
    });
  };

  return (
    // Ancla relativa para posicionar los floaters respecto al panel
    <div className="fixed bottom-16 right-6 z-50">
      {/* Emojis flotantes */}
      <div className="relative">
        {floaters.map((item) => (
          <FloatingEmoji key={item.id} item={item} onDone={removeFloater} />
        ))}
      </div>

      {/* Panel de botones */}
      <div className="flex flex-row gap-3">
        {(["❤️", "👍", "👎"] as EmojiKey[]).map((emoji) => (
          <ReactionButton
            key={emoji}
            emoji={emoji}
            count={counts[emoji]}
            onClick={() => react(emoji)}
          />
        ))}
      </div>
    </div>
  );
}
