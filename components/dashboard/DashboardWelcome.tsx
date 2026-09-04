"use client";

import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function DashboardWelcome() {
  return (
    <section
      className="
        group relative overflow-hidden
        rounded-[24px]
        border border-white/70
        bg-[#FFFDF8]/60
        shadow-[0_18px_55px_rgba(51,18,10,0.07)]
        backdrop-blur-2xl
      "
    >
      {/* =====================================================
          GLASS ATMOSPHERE
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* warm light */}
        <div
          className="
            absolute -right-24 -top-28
            h-72 w-72 rounded-full
            bg-[#EA661B]/[0.09]
            blur-[85px]
          "
        />

        {/* navy atmosphere */}
        <div
          className="
            absolute -bottom-36 left-[28%]
            h-72 w-72 rounded-full
            bg-[#163C80]/[0.055]
            blur-[95px]
          "
        />

        {/* gold atmosphere */}
        <div
          className="
            absolute right-[28%] top-12
            h-40 w-40 rounded-full
            bg-[#C6A15B]/[0.09]
            blur-[70px]
          "
        />

        {/* glass highlight */}
        <div
          className="
            absolute left-[12%] top-0
            h-px w-[55%]
            bg-gradient-to-r
            from-transparent
            via-white
            to-transparent
            opacity-80
          "
        />

        {/* subtle grain */}
        <div
          className="
            absolute inset-0
            opacity-[0.028]
            [background-image:radial-gradient(#33120a_0.7px,transparent_0.7px)]
            [background-size:15px_15px]
          "
        />
      </div>

      {/* =====================================================
          EDITORIAL EDGE
      ===================================================== */}

      <div
        className="
          absolute left-0 top-0 h-full w-[3px]
          bg-gradient-to-b
          from-[#EA661B]
          via-[#C6A15B]
          to-[#163C80]
        "
      />

      <div className="relative px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex items-center justify-between gap-5">
          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="min-w-0 flex-1">
            {/* Eyebrow */}

            <div className="flex flex-wrap items-center gap-2.5">
              <div
                className="
                  inline-flex items-center gap-1.5
                  rounded-full
                  border border-[#C6A15B]/20
                  bg-[#C6A15B]/[0.055]
                  px-2.5 py-1
                  backdrop-blur-md
                "
              >
                <Sparkles className="h-3 w-3 text-[#8B6A25]" />

                <span
                  className="
                    text-[9px] font-bold
                    uppercase tracking-[0.17em]
                    text-[#8B6A25]
                  "
                >
                  NationPath Intelligence
                </span>
              </div>

              <span className="h-1 w-1 rounded-full bg-[#D6CEC1]" />

              <div className="flex items-center gap-1.5 text-[10px] text-[#8B8F97]">
                <CalendarDays className="h-3 w-3" />
                Thursday, August 20
              </div>
            </div>

            {/* Heading */}

            <h1
              className="
                mt-3
                max-w-2xl
                text-2xl
                font-semibold
                leading-tight
                tracking-[-0.035em]
                text-[#33120a]
                sm:text-3xl
              "
            >
              Your world,
              <span className="text-[#EA661B]">
                {" "}
                intelligently connected.
              </span>
            </h1>

            <p
              className="
                mt-2 max-w-2xl
                text-xs leading-5
                text-[#64748B]
                sm:text-sm
              "
            >
              Discover what matters across NationPath — from breaking news
              to your personal journey.
            </p>

            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                className="
                  group/button
                  inline-flex items-center gap-2
                  rounded-full
                  border border-[#33120a]
                  bg-[#33120a]/95
                  px-4 py-2
                  text-[11px]
                  font-semibold
                  text-white
                  shadow-[0_7px_20px_rgba(51,18,10,0.15)]
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:border-[#EA661B]
                  hover:bg-[#EA661B]
                "
              >
                Explore today's intelligence

                <ArrowRight
                  className="
                    h-3.5 w-3.5
                    transition
                    group-hover/button:translate-x-0.5
                  "
                />
              </button>

              {/* Live pill */}

              <div
                className="
                  inline-flex items-center gap-2
                  rounded-full
                  border border-white/80
                  bg-white/40
                  px-3 py-2
                  shadow-[0_4px_15px_rgba(51,18,10,0.035)]
                  backdrop-blur-xl
                "
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="
                      absolute h-full w-full
                      animate-ping
                      rounded-full
                      bg-[#EA661B]/40
                    "
                  />

                  <span className="relative h-2 w-2 rounded-full bg-[#EA661B]" />
                </span>

                <TrendingUp className="h-3 w-3 text-[#EA661B]" />

                <span className="text-[10px] font-medium text-[#475569]">
                  12 trending now
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              INTELLIGENCE ORB
          ================================================= */}

          <div className="hidden shrink-0 sm:block">
            <div className="relative flex h-28 w-28 items-center justify-center">
              {/* soft glow */}

              <div
                className="
                  absolute
                  h-20 w-20
                  rounded-full
                  bg-gradient-to-br
                  from-[#163C80]/10
                  via-[#C6A15B]/10
                  to-[#EA661B]/10
                  blur-2xl
                "
              />

              {/* outer glass ring */}

              <div
                className="
                  absolute inset-0
                  rounded-full
                  border border-white/80
                  bg-white/[0.08]
                  backdrop-blur-md
                "
              />

              {/* navy ring */}

              <div
                className="
                  absolute inset-3
                  rounded-full
                  border border-[#163C80]/10
                  border-dashed
                "
              />

              {/* gold ring */}

              <div
                className="
                  absolute inset-6
                  rounded-full
                  border border-[#C6A15B]/15
                "
              />

              {/* Core glass */}

              <div
                className="
                  relative flex h-12 w-12
                  items-center justify-center
                  rounded-[16px]
                  border border-white
                  bg-white/65
                  shadow-[0_10px_28px_rgba(51,18,10,0.10)]
                  backdrop-blur-xl
                "
              >
                <Sparkles className="h-5 w-5 text-[#EA661B]" />
              </div>

              {/* orbit dots */}

              <span
                className="
                  absolute right-3 top-5
                  h-1.5 w-1.5
                  rounded-full
                  bg-[#EA661B]
                  shadow-[0_0_10px_rgba(234,102,27,0.45)]
                "
              />

              <span
                className="
                  absolute bottom-5 left-3
                  h-1.5 w-1.5
                  rounded-full
                  bg-[#163C80]
                  shadow-[0_0_10px_rgba(22,60,128,0.35)]
                "
              />

              <span
                className="
                  absolute left-6 top-3
                  h-1.5 w-1.5
                  rounded-full
                  bg-[#C6A15B]
                "
              />
            </div>
          </div>
        </div>

        {/* =====================================================
            INTELLIGENCE STRIP
        ===================================================== */}

        <div
          className="
            mt-5
            grid
            border-t border-white/60
            pt-3
            sm:grid-cols-3
          "
        >
          <InsightItem
            label="News"
            value="24"
            description="new stories"
            accent="orange"
          />

          <InsightItem
            label="Trending"
            value="12"
            description="gaining attention"
            accent="navy"
          />

          <InsightItem
            label="Activity"
            value="8"
            description="saved stories"
            accent="gold"
          />
        </div>
      </div>
    </section>
  );
}

function InsightItem({
  label,
  value,
  description,
  accent,
}: {
  label: string;
  value: string;
  description: string;
  accent: "orange" | "navy" | "gold";
}) {
  const accentClasses = {
    orange: "bg-[#EA661B]",
    navy: "bg-[#163C80]",
    gold: "bg-[#C6A15B]",
  };

  return (
    <div
      className="
        group
        flex items-center gap-2.5
        rounded-xl
        px-2 py-2
        transition
        hover:bg-white/40
      "
    >
      <span
        className={`h-7 w-0.5 rounded-full ${accentClasses[accent]}`}
      />

      <div className="min-w-0 flex-1">
        <p
          className="
            text-[9px] font-bold
            uppercase tracking-[0.16em]
            text-[#8B6A25]
          "
        >
          {label}
        </p>

        <div className="mt-0.5 flex items-baseline gap-1.5">
          <span
            className="
              text-base font-bold
              tracking-tight
              text-[#33120a]
            "
          >
            {value}
          </span>

          <span className="truncate text-[10px] text-[#8B8F97]">
            {description}
          </span>
        </div>
      </div>

      <ChevronRight
        className="
          h-3 w-3
          text-[#C8BFAF]
          opacity-0
          transition
          group-hover:translate-x-0.5
          group-hover:opacity-100
        "
      />
    </div>
  );
}