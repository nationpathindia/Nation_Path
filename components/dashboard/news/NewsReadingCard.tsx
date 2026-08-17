"use client";

import { BookOpen, Clock3, Play } from "lucide-react";

export default function NewsReadingCard() {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#121A36] to-[#090D1C] p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-[#163C80]/30 p-3">
          <BookOpen className="h-5 w-5 text-blue-300" />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
            Your Reading
          </p>

          <h2 className="font-bold text-white">
            Continue Reading
          </h2>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/10 p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-medium text-[#EA661B]">
              INDIA
            </span>

            <h3 className="mt-2 text-base font-semibold leading-6 text-white">
              Understanding the stories shaping India today
            </h3>

            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
              <Clock3 className="h-3.5 w-3.5" />
              6 min read
            </div>
          </div>

          <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition hover:scale-105">
            <Play className="ml-0.5 h-4 w-4 fill-current" />
          </button>
        </div>

        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[62%] rounded-full bg-[#EA661B]" />
        </div>

        <p className="mt-2 text-right text-[11px] text-gray-500">
          62% completed
        </p>
      </div>
    </div>
  );
}