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
      {/* Soft editorial atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute -right-20 -top-24
            h-44 w-44 rounded-full
            bg-[#E11D48]/[0.045]
            blur-3xl
          "
        />

        <div
          className="
            absolute -bottom-24 left-1/3
            h-40 w-40 rounded-full
            bg-[#EA661B]/[0.035]
            blur-3xl
          "
        />

        {/* Very subtle paper texture */}
        <div
          className="
            absolute inset-0 opacity-[0.025]
            [background-image:radial-gradient(#33120A_0.65px,transparent_0.65px)]
            [background-size:10px_10px]
          "
        />
      </div>

      {/* Small editorial accent */}
      <div
        className="
          absolute left-0 top-5
          h-10 w-[2px]
          rounded-r-full
          bg-[#E11D48]
        "
      />

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
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-9 w-9 items-center justify-center
                rounded-xl
                border border-[#E11D48]/10
                bg-[#E11D48]/[0.055]
                backdrop-blur-md
              "
            >
              <Flame className="h-4 w-4 text-[#E11D48]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E11D48]" />

                <p
                  className="
                    text-[9px] font-bold
                    uppercase tracking-[0.2em]
                    text-[#C21B42]
                  "
                >
                  Live
                </p>
              </div>

              <h2 className="mt-0.5 text-[15px] font-bold tracking-[-0.01em] text-[#33120A]">
                Breaking Stories
              </h2>
            </div>
          </div>

          <button
            type="button"
            aria-label="View all breaking stories"
            className="
              flex h-8 w-8 items-center justify-center
              rounded-full
              border border-[#D8CDBD]/60
              bg-white/[0.25]
              text-[#8B6A25]
              backdrop-blur-md
              transition
              hover:border-[#E11D48]/20
              hover:bg-[#E11D48]/[0.04]
              hover:text-[#E11D48]
            "
          >
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* =====================================================
            STORIES
        ===================================================== */}

        <div className="divide-y divide-[#D8CDBD]/45">
          {stories.map((story, index) => (
            <article
              key={story.title}
              className="
                group px-5 py-4
                transition-colors duration-200
                hover:bg-white/[0.22]
              "
            >
              <div className="flex gap-3">
                {/* Number */}
                <div className="w-5 shrink-0 pt-0.5">
                  <span
                    className="
                      text-[10px] font-bold
                      tabular-nums
                      text-[#B8862D]
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="
                        text-[9px] font-bold
                        uppercase tracking-[0.14em]
                        text-[#8B6A25]
                      "
                    >
                      {story.category}
                    </span>

                    <span className="h-1 w-1 rounded-full bg-[#C6A15B]/60" />

                    <span className="text-[9px] text-[#8B8F97]">
                      {story.time}
                    </span>
                  </div>

                  <h3
                    className="
                      mt-1.5
                      max-w-[34rem]
                      text-[13px]
                      font-semibold
                      leading-5
                      text-[#33120A]
                      transition-colors duration-200
                      group-hover:text-[#EA661B]
                    "
                  >
                    {story.title}
                  </h3>
                </div>

                {/* Arrow */}
                <ArrowUpRight
                  className="
                    mt-1 h-3.5 w-3.5 shrink-0
                    text-[#C9C0B2]
                    opacity-60
                    transition-all duration-200
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-[#EA661B]
                    group-hover:opacity-100
                  "
                />
              </div>
            </article>
          ))}
        </div>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div
          className="
            flex items-center justify-between
            border-t border-[#D8CDBD]/45
            px-5 py-3
          "
        >
          <span className="text-[9px] text-[#8B8F97]">
            Updated moments ago
          </span>

          <button
            type="button"
            className="
              text-[10px]
              font-semibold
              text-[#8B6A25]
              transition-colors
              hover:text-[#EA661B]
            "
          >
            View latest →
          </button>
        </div>
      </div>
    </section>
  );
}