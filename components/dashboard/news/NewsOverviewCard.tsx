"use client";

import {
  ArrowUpRight,
  Flame,
  Newspaper,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function NewsOverviewCard() {
  return (
    <section
      className="
        group relative overflow-hidden
        rounded-[22px]
        border border-white/40
        bg-white/[0.28]
        shadow-[0_14px_40px_rgba(51,18,10,0.045)]
        backdrop-blur-[20px]
        backdrop-saturate-150
        transition-all duration-500
        hover:bg-white/[0.36]
        hover:shadow-[0_18px_48px_rgba(51,18,10,0.065)]
      "
    >
      {/* =====================================================
          AMBIENT GLASS ATMOSPHERE
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Orange atmosphere */}
        <div
          className="
            absolute -right-20 -top-24
            h-48 w-48 rounded-full
            bg-[#EA661B]/[0.065]
            blur-[75px]
            transition-transform duration-700
            group-hover:translate-x-3
            group-hover:-translate-y-2
          "
        />

        {/* Navy atmosphere */}
        <div
          className="
            absolute -bottom-24 left-[28%]
            h-48 w-48 rounded-full
            bg-[#163C80]/[0.035]
            blur-[80px]
            transition-transform duration-700
            group-hover:-translate-x-2
          "
        />

        {/* Gold atmosphere */}
        <div
          className="
            absolute right-[32%] top-[35%]
            h-28 w-28 rounded-full
            bg-[#C6A15B]/[0.05]
            blur-[55px]
          "
        />

        {/* Kids blue — very subtle */}
        <div
          className="
            absolute left-[45%] -top-16
            h-28 w-28 rounded-full
            bg-[#2563EB]/[0.025]
            blur-[60px]
          "
        />

        {/* Fine texture */}
        <div
          className="
            absolute inset-0
            opacity-[0.018]
            [background-image:radial-gradient(#33120A_0.65px,transparent_0.65px)]
            [background-size:14px_14px]
          "
        />

        {/* =================================================
            HOVER GLASS REFLECTION
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute -left-[35%] top-0
            h-full w-[28%]
            skew-x-[-18deg]
            bg-gradient-to-r
            from-transparent
            via-white/[0.18]
            to-transparent
            opacity-0
            transition-all duration-700
            group-hover:left-[115%]
            group-hover:opacity-100
          "
        />

        {/* Top glass edge */}
        <div
          className="
            absolute left-[8%] right-[12%] top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-white/60
            to-transparent
            opacity-70
          "
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative p-4 sm:p-5">
        {/* HEADER */}

        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            {/* Icon */}
            <div
              className="
                relative flex h-9 w-9 shrink-0
                items-center justify-center
                overflow-hidden
                rounded-xl
                border border-[#EA661B]/[0.13]
                bg-[#EA661B]/[0.045]
                backdrop-blur-md
                transition-transform duration-300
                group-hover:scale-[1.04]
              "
            >
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-br
                  from-white/20
                  to-transparent
                "
              />

              <Newspaper className="relative h-4 w-4 text-[#EA661B]" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2
                  className="
                    truncate
                    text-sm font-bold
                    tracking-[-0.01em]
                    text-[#33120A]
                  "
                >
                  News Intelligence
                </h2>

                {/* Calm live indicator */}
                <span
                  className="
                    inline-flex shrink-0
                    items-center gap-1.5
                    rounded-full
                    border border-[#EA661B]/[0.13]
                    bg-[#EA661B]/[0.035]
                    px-2 py-0.5
                    text-[8px]
                    font-bold uppercase
                    tracking-[0.12em]
                    text-[#EA661B]
                  "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#EA661B]" />
                  Live
                </span>
              </div>

              <p className="mt-0.5 text-[10px] text-[#64748B]">
                Your personalized news pulse
              </p>
            </div>
          </div>

          {/* Open */}
          <button
            type="button"
            aria-label="Open News Intelligence"
            className="
              flex h-8 w-8 shrink-0
              items-center justify-center
              rounded-lg
              border border-white/[0.24]
              bg-white/[0.035]
              text-[#64748B]
              backdrop-blur-md
              transition-all duration-200
              hover:-translate-y-0.5
              hover:border-[#EA661B]/[0.20]
              hover:bg-[#EA661B]/[0.045]
              hover:text-[#EA661B]
            "
          >
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* =================================================
            STATS
        ================================================= */}

        <div className="mt-4 grid grid-cols-3 gap-2">
          <StatCard
            icon={<TrendingUp className="h-3.5 w-3.5" />}
            label="Latest"
            value="24"
            suffix="stories"
            accent="orange"
          />

          <StatCard
            icon={<Flame className="h-3.5 w-3.5" />}
            label="Trending"
            value="12"
            suffix="hot"
            accent="gold"
          />

          <StatCard
            icon={<Sparkles className="h-3.5 w-3.5" />}
            label="Reading"
            value="8"
            suffix="saved"
            accent="blue"
          />
        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div
          className="
            mt-3
            flex flex-col gap-2
            border-t border-[#33120A]/[0.05]
            pt-3
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="flex min-w-0 items-center gap-2">
            <span
              className="
                h-1.5 w-1.5 shrink-0
                rounded-full
                bg-[#EA661B]
                shadow-[0_0_7px_rgba(234,102,27,0.25)]
              "
            />

            <p className="truncate text-[9px] text-[#64748B]">
              India · World · Business · Technology
            </p>
          </div>

          <button
            type="button"
            className="
              self-start
              text-[10px]
              font-semibold
              text-[#EA661B]
              transition-colors
              hover:text-[#33120A]
              sm:self-auto
            "
          >
            View all
            <span className="ml-1">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  label,
  value,
  suffix,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  suffix: string;
  accent: "orange" | "gold" | "blue";
}) {
  const styles = {
    orange: {
      icon: "text-[#EA661B]",
      border: "border-[#EA661B]/[0.10]",
      bg: "bg-[#EA661B]/[0.018]",
      hover:
        "hover:border-[#EA661B]/[0.17] hover:bg-[#EA661B]/[0.035]",
      line: "bg-[#EA661B]",
    },

    gold: {
      icon: "text-[#C6A15B]",
      border: "border-[#C6A15B]/[0.11]",
      bg: "bg-[#C6A15B]/[0.018]",
      hover:
        "hover:border-[#C6A15B]/[0.18] hover:bg-[#C6A15B]/[0.035]",
      line: "bg-[#C6A15B]",
    },

    blue: {
      icon: "text-[#2563EB]",
      border: "border-[#2563EB]/[0.08]",
      bg: "bg-[#2563EB]/[0.015]",
      hover:
        "hover:border-[#2563EB]/[0.14] hover:bg-[#2563EB]/[0.03]",
      line: "bg-[#2563EB]",
    },
  };

  const style = styles[accent];

  return (
    <div
      className={`
        group/stat
        relative overflow-hidden
        rounded-xl
        border
        ${style.border}
        ${style.bg}
        px-3 py-3
        backdrop-blur-md
        transition-all duration-300
        hover:-translate-y-0.5
        ${style.hover}
      `}
    >
      {/* Glass highlight */}
      <div
        className="
          pointer-events-none
          absolute inset-x-0 top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-white/40
          to-transparent
        "
      />

      <div className="flex items-center gap-1.5">
        <span className={style.icon}>{icon}</span>

        <span className="text-[9px] font-medium text-[#64748B]">
          {label}
        </span>
      </div>

      <div className="mt-1.5 flex items-baseline gap-1.5">
        <span
          className="
            text-xl
            font-bold
            tracking-[-0.035em]
            text-[#33120A]
          "
        >
          {value}
        </span>

        <span className="text-[9px] text-[#94A3B8]">
          {suffix}
        </span>
      </div>

      {/* Hover accent — static, no animation */}
      <div
        className={`
          absolute bottom-0 left-3 right-3
          h-px
          opacity-0
          transition-opacity duration-300
          group-hover/stat:opacity-60
          ${style.line}
        `}
      />
    </div>
  );
}