"use client";

import {
  ArrowUpRight,
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
    accent: "#163C80",
    tint: "rgba(22,60,128,0.055)",
  },
  {
    name: "World",
    count: 84,
    icon: Globe2,
    accent: "#8B6A25",
    tint: "rgba(198,161,91,0.065)",
  },
  {
    name: "Business",
    count: 56,
    icon: BriefcaseBusiness,
    accent: "#EA661B",
    tint: "rgba(234,102,27,0.055)",
  },
  {
    name: "Technology",
    count: 42,
    icon: Cpu,
    accent: "#7C3AED",
    tint: "rgba(124,58,237,0.045)",
  },
  {
    name: "Sports",
    count: 37,
    icon: Trophy,
    accent: "#16A34A",
    tint: "rgba(22,163,74,0.045)",
  },
  {
    name: "Health",
    count: 29,
    icon: HeartPulse,
    accent: "#E11D48",
    tint: "rgba(225,29,72,0.045)",
  },
];

export default function NewsCategoryCard() {
  return (
    <section
      className="
        relative overflow-hidden rounded-[22px]
        border border-[#D8CDBD]/65
        bg-[#FFFDF8]/[0.38]
        backdrop-blur-2xl
        shadow-[0_12px_32px_rgba(51,18,10,0.045)]
        transition-shadow duration-300
        hover:shadow-[0_16px_38px_rgba(51,18,10,0.065)]
      "
    >
      {/* =====================================================
          ATMOSPHERE
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute -right-20 -top-24
            h-44 w-44 rounded-full
            bg-[#C6A15B]/[0.07]
            blur-3xl
          "
        />

        <div
          className="
            absolute -bottom-24 left-1/3
            h-40 w-40 rounded-full
            bg-[#163C80]/[0.035]
            blur-3xl
          "
        />

        <div
          className="
            absolute inset-0 opacity-[0.025]
            [background-image:radial-gradient(#33120A_0.65px,transparent_0.65px)]
            [background-size:10px_10px]
          "
        />
      </div>

      <div className="relative">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            flex items-center justify-between
            border-b border-[#D8CDBD]/50
            px-5 py-4
          "
        >
          <div>
            <div className="flex items-center gap-2">
              <span
                className="
                  h-[2px] w-6 rounded-full
                  bg-gradient-to-r
                  from-[#EA661B]
                  to-[#C6A15B]
                "
              />

              <p
                className="
                  text-[9px] font-bold
                  uppercase tracking-[0.2em]
                  text-[#8B6A25]
                "
              >
                Explore
              </p>
            </div>

            <h2
              className="
                mt-1
                text-[15px]
                font-bold
                tracking-[-0.01em]
                text-[#33120A]
              "
            >
              News Categories
            </h2>
          </div>

          <button
            type="button"
            className="
              group/all
              inline-flex items-center gap-1.5
              rounded-full
              border border-[#D8CDBD]/60
              bg-white/[0.22]
              px-2.5 py-1.5
              text-[9px] font-semibold
              text-[#8B6A25]
              backdrop-blur-md
              transition
              hover:border-[#EA661B]/20
              hover:bg-[#EA661B]/[0.04]
              hover:text-[#EA661B]
            "
          >
            All

            <ArrowUpRight
              className="
                h-3 w-3
                transition-transform
                group-hover/all:-translate-y-0.5
                group-hover/all:translate-x-0.5
              "
            />
          </button>
        </div>

        {/* =====================================================
            CATEGORY GRID
        ===================================================== */}

        <div className="relative grid grid-cols-2 gap-2.5 p-4 sm:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.name}
                type="button"
                className="
                  group/card relative overflow-hidden
                  rounded-[15px]
                  border border-[#D8CDBD]/50
                  bg-white/[0.18]
                  p-3
                  text-left
                  backdrop-blur-xl
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:border-white/80
                  hover:bg-white/[0.34]
                  hover:shadow-[0_8px_22px_rgba(51,18,10,0.055)]
                "
              >
                {/* Individual colour wash */}
                <div
                  className="
                    pointer-events-none
                    absolute -right-8 -top-8
                    h-20 w-20 rounded-full
                    opacity-0 blur-2xl
                    transition-opacity duration-200
                    group-hover/card:opacity-100
                  "
                  style={{
                    background: category.tint,
                  }}
                />

                {/* Accent rail */}
                <span
                  className="
                    absolute left-0 top-3
                    h-7 w-[2px]
                    rounded-r-full
                    opacity-40
                    transition-all duration-200
                    group-hover/card:h-10
                    group-hover/card:opacity-100
                  "
                  style={{
                    backgroundColor: category.accent,
                  }}
                />

                <div className="relative flex items-center justify-between">
                  <div
                    className="
                      flex h-8 w-8
                      items-center justify-center
                      rounded-[10px]
                      border border-white/70
                      bg-white/[0.38]
                      shadow-[0_3px_10px_rgba(51,18,10,0.045)]
                      backdrop-blur-md
                      transition-transform duration-200
                      group-hover/card:scale-105
                    "
                  >
                    <Icon
                      className="h-4 w-4"
                      style={{
                        color: category.accent,
                      }}
                    />
                  </div>

                  <ArrowUpRight
                    className="
                      h-3.5 w-3.5
                      text-[#C9C0B2]
                      transition-all duration-200
                      group-hover/card:-translate-y-0.5
                      group-hover/card:translate-x-0.5
                      group-hover/card:text-[#8B6A25]
                    "
                  />
                </div>

                <div className="relative mt-3">
                  <p
                    className="
                      text-[12px]
                      font-bold
                      tracking-[-0.01em]
                      text-[#33120A]
                    "
                  >
                    {category.name}
                  </p>

                  <p className="mt-1 text-[9px] text-[#8B8F97]">
                    {category.count} stories
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* =====================================================
            INSIGHT
        ===================================================== */}

        <div className="relative mx-4 mb-4">
          <div
            className="
              flex items-center justify-between
              rounded-[14px]
              border border-[#D8CDBD]/45
              bg-white/[0.18]
              px-3.5 py-2.5
              backdrop-blur-xl
            "
          >
            <div className="flex min-w-0 items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#EA661B]" />

              <p className="truncate text-[10px] text-[#5F6368]">
                India is leading today's coverage
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              <span className="text-[10px] font-bold text-[#33120A]">
                128
              </span>

              <span className="text-[9px] text-[#8B8F97]">
                stories
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}