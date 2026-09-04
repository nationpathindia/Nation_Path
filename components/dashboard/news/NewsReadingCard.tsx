"use client";

import {
  ArrowUpRight,
  BookOpen,
  Clock3,
  Play,
  Sparkles,
} from "lucide-react";

export default function NewsReadingCard() {
  return (
    <section
      className="
        relative overflow-hidden rounded-2xl
        border border-[#E7DFD2]/80
        bg-white/[0.42]
        backdrop-blur-xl
        shadow-[0_10px_30px_rgba(51,18,10,0.045)]
      "
    >
      {/* Ambient editorial atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute -left-16 -bottom-20
            h-40 w-40 rounded-full
            bg-[#163C80]/[0.055]
            blur-3xl
          "
        />

        <div
          className="
            absolute right-[-30px] top-[-40px]
            h-36 w-36 rounded-full
            bg-[#EA661B]/[0.055]
            blur-3xl
          "
        />

        <div
          className="
            absolute inset-0 opacity-[0.025]
            [background-image:radial-gradient(#33120a_0.7px,transparent_0.7px)]
            [background-size:10px_10px]
          "
        />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-9 w-9 items-center justify-center
                rounded-xl
                border border-[#163C80]/10
                bg-[#163C80]/[0.045]
              "
            >
              <BookOpen className="h-4 w-4 text-[#163C80]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <p
                  className="
                    text-[9px] font-bold uppercase
                    tracking-[0.18em] text-[#8B6A25]
                  "
                >
                  Your Reading
                </p>

                <span className="h-1 w-1 rounded-full bg-[#C6A15B]" />

                <span className="text-[9px] text-[#9A948B]">
                  Pick up where you left off
                </span>
              </div>

              <h2 className="mt-0.5 text-[15px] font-bold text-[#33120A]">
                Continue Reading
              </h2>
            </div>
          </div>

          <button
            type="button"
            className="
              flex h-8 w-8 items-center justify-center
              rounded-full
              border border-[#E7DFD2]/80
              bg-white/35
              text-[#9A948B]
              backdrop-blur-md
              transition
              hover:border-[#EA661B]/25
              hover:bg-white/55
              hover:text-[#EA661B]
            "
            aria-label="View saved stories"
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Reading shelf */}
        <div className="px-4 pb-4 sm:px-5">
          <article
            className="
              group relative overflow-hidden
              rounded-xl
              border border-[#E7DFD2]/70
              bg-[#FFFDF8]/35
              backdrop-blur-md
              transition-all duration-300
              hover:border-[#C6A15B]/30
              hover:bg-white/[0.48]
              hover:shadow-[0_12px_28px_rgba(51,18,10,0.055)]
            "
          >
            {/* Editorial side rail */}
            <div
              className="
                absolute left-0 top-0 h-full w-[3px]
                bg-gradient-to-b
                from-[#EA661B]
                via-[#C6A15B]
                to-[#163C80]
              "
            />

            <div className="flex items-stretch">
              {/* Main story */}
              <div className="min-w-0 flex-1 p-4 sm:p-5">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="
                      inline-flex items-center gap-1.5
                      rounded-full
                      border border-[#EA661B]/10
                      bg-[#EA661B]/[0.055]
                      px-2 py-1
                      text-[9px] font-bold uppercase
                      tracking-[0.14em] text-[#EA661B]
                    "
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#EA661B]" />
                    India
                  </span>

                  <span className="text-[#D0C7B9]">·</span>

                  <div className="flex items-center gap-1 text-[9px] text-[#8B8F97]">
                    <Clock3 className="h-3 w-3" />
                    6 min read
                  </div>
                </div>

                {/* Story */}
                <h3
                  className="
                    mt-2.5
                    max-w-2xl
                    text-[15px]
                    font-semibold
                    leading-[1.45]
                    tracking-[-0.01em]
                    text-[#33120A]
                    transition-colors
                    group-hover:text-[#163C80]
                  "
                >
                  Understanding the stories shaping India today
                </h3>

                <p
                  className="
                    mt-1.5 max-w-xl
                    text-[10px] leading-5
                    text-[#8B8F97]
                  "
                >
                  A concise look at the developments, decisions and ideas
                  shaping the country right now.
                </p>

                {/* Progress row */}
                <div className="mt-4 flex items-center gap-3">
                  <div
                    className="
                      h-1 flex-1 overflow-hidden
                      rounded-full bg-[#E7DFD2]/80
                    "
                  >
                    <div
                      className="
                        h-full w-[62%]
                        rounded-full
                        bg-gradient-to-r
                        from-[#EA661B]
                        via-[#C6A15B]
                        to-[#C6A15B]
                      "
                    />
                  </div>

                  <span
                    className="
                      text-[9px] font-bold
                      tabular-nums text-[#8B6A25]
                    "
                  >
                    62%
                  </span>
                </div>
              </div>

              {/* Continue zone */}
              <div
                className="
                  flex w-20 shrink-0 flex-col
                  items-center justify-center
                  border-l border-[#E7DFD2]/60
                  bg-white/[0.16]
                  px-3
                  transition
                  group-hover:bg-[#EA661B]/[0.025]
                  sm:w-24
                "
              >
                <div
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-full
                    border border-[#33120A]/10
                    bg-[#33120A]
                    text-white
                    shadow-[0_6px_18px_rgba(51,18,10,0.12)]
                    transition-all duration-200
                    group-hover:scale-105
                    group-hover:bg-[#EA661B]
                  "
                >
                  <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
                </div>

                <span
                  className="
                    mt-2 text-[8px] font-bold
                    uppercase tracking-[0.12em]
                    text-[#8B6A25]
                  "
                >
                  Continue
                </span>
              </div>
            </div>
          </article>

          {/* Small contextual footer */}
          <div className="mt-3 flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-[#C6A15B]" />

              <span className="text-[9px] text-[#8B8F97]">
                Your reading journey
              </span>
            </div>

            <span className="text-[9px] font-medium text-[#9A948B]">
              Almost halfway there
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}