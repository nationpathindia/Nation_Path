"use client";

import {
  BriefcaseBusiness,
  Cpu,
  Globe2,
  HeartPulse,
  Landmark,
  Trophy,
} from "lucide-react";

const categories = [
  {
    name: "India",
    count: 128,
    icon: Landmark,
  },
  {
    name: "World",
    count: 84,
    icon: Globe2,
  },
  {
    name: "Business",
    count: 56,
    icon: BriefcaseBusiness,
  },
  {
    name: "Technology",
    count: 42,
    icon: Cpu,
  },
  {
    name: "Sports",
    count: 37,
    icon: Trophy,
  },
  {
    name: "Health",
    count: 29,
    icon: HeartPulse,
  },
];

export default function NewsCategoryCard() {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B1023] p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-[#EA661B]">
          Explore
        </p>

        <h2 className="mt-1 text-xl font-bold text-white">
          News Categories
        </h2>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <button
              key={category.name}
              className="group rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-left transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05]"
            >
              <Icon className="h-5 w-5 text-gray-500 transition group-hover:text-[#EA661B]" />

              <p className="mt-4 text-sm font-semibold text-gray-200">
                {category.name}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {category.count} stories
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}