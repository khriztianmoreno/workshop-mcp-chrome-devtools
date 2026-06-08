"use client";

import { SpeakerView } from "@khriztianmoreno/speaker-kit";
import { supabase } from "@/lib/supabase";
import { SLIDES } from "../_shared/slides";
import { NOTES } from "../_shared/notes-loader";

export default function SpeakerPage() {
  return (
    <SpeakerView
      slides={SLIDES}
      notes={NOTES}
      channel="workshop-med-chrome-devtools"
      supabase={supabase}
    />
  );
}
