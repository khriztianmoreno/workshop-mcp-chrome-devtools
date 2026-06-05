"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type NavMsg = {
  type: "navigate";
  index: number;
  senderId: string;
  ts: number;
};

type ReqStateMsg = {
  type: "request-state";
  senderId: string;
};

type SyncMsg = NavMsg | ReqStateMsg;

const PRESENTER_SLUG =
  process.env.NEXT_PUBLIC_PRESENTER_SLUG || "khriztianmoreno-default";

function genSenderId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function useSlideSync(total: number) {
  const [index, setIndex] = useState(0);
  const senderIdRef = useRef<string>("");
  const indexRef = useRef(0);
  const bcRef = useRef<BroadcastChannel | null>(null);
  const rtRef = useRef<RealtimeChannel | null>(null);

  if (!senderIdRef.current) {
    senderIdRef.current = genSenderId();
  }

  // Keep ref in sync with state so handlers (which close over the ref) can
  // respond to request-state with the latest index.
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const channelName = `slides-${PRESENTER_SLUG}`;

  // Apply a remote nav msg if it isn't from this window
  const applyMsg = useCallback(
    (msg: SyncMsg) => {
      if (msg.senderId === senderIdRef.current) return;
      if (msg.type === "navigate") {
        const clamped = Math.max(0, Math.min(total - 1, msg.index));
        setIndex(clamped);
      } else if (msg.type === "request-state") {
        // Respond with our current index
        emit({ type: "navigate", index: indexRef.current });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [total]
  );

  // Emit a payload over both transports
  const emit = useCallback((payload: { type: SyncMsg["type"]; index?: number }) => {
    const senderId = senderIdRef.current;
    const ts = Date.now();
    let msg: SyncMsg;
    if (payload.type === "navigate") {
      msg = { type: "navigate", index: payload.index ?? 0, senderId, ts };
    } else {
      msg = { type: "request-state", senderId };
    }
    bcRef.current?.postMessage(msg);
    rtRef.current?.send({ type: "broadcast", event: "sync", payload: msg });
  }, []);

  // Setup transports
  useEffect(() => {
    // BroadcastChannel — same-origin, same-browser, instant
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      const bc = new BroadcastChannel(channelName);
      bcRef.current = bc;
      bc.onmessage = (ev: MessageEvent<SyncMsg>) => applyMsg(ev.data);
    }

    // Supabase Realtime — cross-device
    const channel = supabase.channel(channelName, {
      config: { broadcast: { self: false } },
    });
    rtRef.current = channel;
    channel
      .on("broadcast", { event: "sync" }, ({ payload }) => {
        applyMsg(payload as SyncMsg);
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          // Ask whoever is already in the channel for current state
          emit({ type: "request-state" });
        }
      });

    return () => {
      bcRef.current?.close();
      bcRef.current = null;
      channel.unsubscribe();
      rtRef.current = null;
    };
  }, [channelName, applyMsg, emit]);

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(total - 1, next));
      setIndex(clamped);
      emit({ type: "navigate", index: clamped });
    },
    [total, emit]
  );

  const goNext = useCallback(() => goTo(indexRef.current + 1), [goTo]);
  const goPrev = useCallback(() => goTo(indexRef.current - 1), [goTo]);

  return { index, goTo, goNext, goPrev };
}
