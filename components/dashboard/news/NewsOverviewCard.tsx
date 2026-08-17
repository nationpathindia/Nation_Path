"use client";

import { ArrowUpRight, Clock3, Flame, Newspaper } from "lucide-react";

export default function NewsOverviewCard() {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#111936] to-[#070B1A] p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Newspaper className="h-4 w-4" />
            News Intelligence
          </div>

          <h2 className="mt-3 text-2xl font-bold text-white">
            Your News Feed
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-400">
            Stay updated with the stories that matter across India and the
            world.
          </p>
        </div>

        <div className="rounded-2xl bg-[#EA661B]/10 p-3">
          <Flame className="h-5 w-5 text-[#EA661B]" />
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs text-gray-500">Latest</p>
          <p className="mt-1 text-lg font-bold text-white">24</p>
          <p className="text-xs text-gray-500">new stories</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs text-gray-500">Trending</p>
          <p className="mt-1 text-lg font-bold text-white">12</p>
          <p className="text-xs text-gray-500">hot stories</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs text-gray-500">Reading</p>
          <p className="mt-1 text-lg font-bold text-white">8</p>
          <p className="text-xs text-gray-500">saved stories</p>
        </div>
      </div>
    </div>
  );
}