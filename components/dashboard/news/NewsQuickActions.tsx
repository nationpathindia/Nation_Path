"use client";

import {
  Bookmark,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const actions = [
  {
    title: "Latest News",
    description: "See the newest stories",
    icon: TrendingUp,
  },
  {
    title: "Saved Stories",
    description: "Continue your reading",
    icon: Bookmark,
  },
  {
    title: "Search News",
    description: "Find any story",
    icon: Search,
  },
  {
    title: "AI News",
    description: "Understand stories faster",
    icon: Sparkles,
  },
];

export default function NewsQuickActions() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <button
            key={action.title}
            className="group rounded-2xl border border-white/10 bg-[#0B1023] p-4 text-left transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#10162D]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EA661B]/10">
              <Icon className="h-5 w-5 text-[#EA661B]" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-white">
              {action.title}
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              {action.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}