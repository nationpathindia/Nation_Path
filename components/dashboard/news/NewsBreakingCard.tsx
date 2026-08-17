"use client";

import { ArrowUpRight, Flame } from "lucide-react";

const stories = [
  {
    category: "India",
    title: "India continues its journey of growth and transformation",
    time: "12 min ago",
  },
  {
    category: "World",
    title: "Major developments shaping today's global landscape",
    time: "28 min ago",
  },
  {
    category: "Technology",
    title: "New technology trends changing the way India works",
    time: "41 min ago",
  },
];

export default function NewsBreakingCard() {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B1023] p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10">
            <Flame className="h-4 w-4 text-red-400" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-red-400">
              Breaking
            </p>

            <h2 className="font-bold text-white">
              Latest Stories
            </h2>
          </div>
        </div>

        <button className="text-gray-500 transition hover:text-white">
          <ArrowUpRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-6 divide-y divide-white/10">
        {stories.map((story, index) => (
          <div
            key={index}
            className="group py-4 first:pt-0 last:pb-0"
          >
            <div className="flex items-start gap-4">
              <span className="mt-1 text-xs font-semibold text-[#EA661B]">
                0{index + 1}
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500">
                  {story.category} · {story.time}
                </p>

                <h3 className="mt-1 text-sm font-semibold leading-5 text-gray-200 transition group-hover:text-white">
                  {story.title}
                </h3>
              </div>

              <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-gray-600 transition group-hover:text-[#EA661B]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}