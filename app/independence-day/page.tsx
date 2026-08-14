import type { Metadata } from "next";

import IndependenceHero from "@/components/independence-day/IndependenceHero";
import IndiaInOneMinute from "@/components/independence-day/IndiaInOneMinute";
import IndiaAsAPerson from "@/components/independence-day/IndiaAsAPerson";
import OneIndia36Stories from "@/components/independence-day/OneIndia36Stories";
import TheIndiaYouDontSee from "@/components/independence-day/TheIndiaYouDontSee";
import ThePeopleWhoCarryIndia from "@/components/independence-day/ThePeopleWhoCarryIndia";
import TheIndiaAhead from "@/components/independence-day/TheIndiaAhead";
import IndiaInManyVoices from "@/components/independence-day/IndiaInManyVoices";
import IndependenceDayClosing from "@/components/independence-day/IndependenceDayClosing";

export const metadata: Metadata = {
  title: "India @ 80 — Independence Day 2026 | NationPath India",
  description:
    "A NationPath India special celebrating 80 years of India's independence through stories, people, places, ideas and the journey ahead.",
  keywords: [
    "India Independence Day 2026",
    "India at 80",
    "Independence Day India",
    "15 August 2026",
    "NationPath India",
  ],
};

export default function IndependenceDayPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F1]">
      {/* =========================================================
          01 — INDIA @ 80
      ========================================================== */}

      <IndependenceHero />

      {/* =========================================================
          02 — INDIA IN ONE MINUTE
      ========================================================== */}

      <IndiaInOneMinute />

      {/* =========================================================
          03 — IF INDIA WERE A PERSON
      ========================================================== */}

      <IndiaAsAPerson />

      {/* =========================================================
          04 — ONE INDIA. 36 STORIES.
      ========================================================== */}

      <OneIndia36Stories />

      {/* =========================================================
          05 — THE INDIA YOU DON'T SEE
      ========================================================== */}

      <TheIndiaYouDontSee />

      {/* =========================================================
          06 — THE PEOPLE WHO CARRY INDIA
      ========================================================== */}

      <ThePeopleWhoCarryIndia />

      {/* =========================================================
          07 — INDIA AHEAD
      ========================================================== */}

      <TheIndiaAhead />

      {/* =========================================================
          08 — INDIA IN MANY VOICES
      ========================================================== */}

      <IndiaInManyVoices />

      {/* =========================================================
          09 — FINAL INDEPENDENCE DAY CLOSING
      ========================================================== */}

      <IndependenceDayClosing />
    </main>
  );
}