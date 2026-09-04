"use client";

import type { LucideIcon } from "lucide-react";

/* =========================================================
   NATIONPATH ANALYTICS

   METRIC CARD
   ENHANCED / LOCKED PRESENTATION COMPONENT

   RESPONSIBILITIES
   ---------------------------------------------------------
   • Pure presentation only
   • Displays API-provided metric values
   • No analytics calculation
   • No API calls
   • No database access
   • No legacy analytics dependency

   DESIGN
   ---------------------------------------------------------
   • Premium dark intelligence card
   • Subtle accent glow
   • Clear KPI hierarchy
   • Strong numeric readability
   • Responsive sizing
   • Accessible icon treatment
   • Supports formatted string values
========================================================= */

interface AnalyticsMetricCardProps {
  label: string;

  /*
   * Supports:
   * • Raw numeric API values
   * • Presentation-formatted values such as:
   *   "1,250"
   *   "42.5%"
   *   "1m 24s"
   */
  value: number | string;

  icon: LucideIcon;

  accent?: "navy" | "orange" | "green";

  description?: string;
}

/* =========================================================
   ACCENT SYSTEM
========================================================= */

const ACCENTS = {
  navy: {
    icon:
      "border-[#163C80]/20 bg-[#163C80]/15 text-[#9DB7FF]",

    glow:
      "bg-[#163C80]/20",

    line:
      "bg-[#163C80]/70",

    hover:
      "hover:border-[#163C80]/40",

    value:
      "text-white",
  },

  orange: {
    icon:
      "border-orange-500/15 bg-orange-500/10 text-orange-400",

    glow:
      "bg-orange-500/20",

    line:
      "bg-orange-500/80",

    hover:
      "hover:border-orange-500/40",

    value:
      "text-white",
  },

  green: {
    icon:
      "border-emerald-500/15 bg-emerald-500/10 text-emerald-400",

    glow:
      "bg-emerald-500/20",

    line:
      "bg-emerald-500/80",

    hover:
      "hover:border-emerald-500/40",

    value:
      "text-white",
  },
} as const;

/* =========================================================
   VALUE NORMALIZER
========================================================= */

function getDisplayValue(
  value: number | string
) {
  if (typeof value === "number") {
    return Number.isFinite(value)
      ? value.toLocaleString("en-IN")
      : "0";
  }

  if (typeof value === "string") {
    return value.trim() || "0";
  }

  return "0";
}

/* =========================================================
   COMPONENT
========================================================= */

export default function AnalyticsMetricCard({
  label,
  value,
  icon: Icon,
  accent = "orange",
  description,
}: AnalyticsMetricCardProps) {
  const style = ACCENTS[accent];

  const displayValue =
    getDisplayValue(value);

  return (
    <div
      className={`
        group
        relative
        min-w-0
        overflow-hidden

        min-h-[104px]

        rounded-2xl

        border
        border-white/[0.075]

        bg-white/[0.018]

        px-4
        py-3.5

        backdrop-blur-xl

        shadow-[0_8px_30px_rgba(0,0,0,0.12)]

        transition-all
        duration-300
        ease-out

        hover:-translate-y-0.5
        hover:bg-white/[0.035]
        hover:shadow-[0_14px_38px_rgba(0,0,0,0.22)]

        ${style.hover}
      `}
    >
      {/* =====================================================
          ACCENT GLOW
      ===================================================== */}

      <div
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute
          -right-6
          -top-8

          h-28
          w-28

          rounded-full
          blur-3xl

          opacity-35

          transition-all
          duration-500

          group-hover:scale-110
          group-hover:opacity-65

          ${style.glow}
        `}
      />

      {/* =====================================================
          TOP ACCENT LINE
      ===================================================== */}

      <div
        aria-hidden="true"
        className={`
          absolute
          left-4
          right-4
          top-0

          h-px

          opacity-35

          transition-opacity
          duration-300

          group-hover:opacity-80

          ${style.line}
        `}
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10

          flex
          min-h-[72px]

          items-center
          justify-between

          gap-3
        "
      >
        {/* ===================================================
            TEXT
        =================================================== */}

        <div className="min-w-0 flex-1">
          <p
            className="
              truncate

              text-[10px]
              font-semibold
              uppercase

              tracking-[0.14em]

              text-gray-500

              transition-colors
              duration-300

              group-hover:text-gray-400
            "
          >
            {label}
          </p>

          <div
            className="
              mt-1.5

              flex
              min-w-0

              items-baseline
              gap-2
            "
          >
            <h3
              className={`
                truncate

                text-[23px]
                font-bold

                leading-none

                tracking-[-0.03em]

                tabular-nums

                ${style.value}

                transition-transform
                duration-300

                group-hover:translate-x-0.5

                sm:text-[24px]
              `}
              title={displayValue}
            >
              {displayValue}
            </h3>
          </div>

          {description ? (
            <p
              className="
                mt-1.5

                truncate

                text-[10px]
                leading-4

                text-gray-600

                transition-colors
                duration-300

                group-hover:text-gray-500
              "
              title={description}
            >
              {description}
            </p>
          ) : null}
        </div>

        {/* ===================================================
            ICON
        =================================================== */}

        <div
          className={`
            flex
            h-10
            w-10
            shrink-0

            items-center
            justify-center

            rounded-xl

            border

            shadow-sm

            transition-all
            duration-300

            group-hover:scale-105
            group-hover:shadow-md

            ${style.icon}
          `}
        >
          <Icon
            size={17}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* =====================================================
          BOTTOM MICRO BORDER
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          bottom-0
          left-0
          right-0

          h-px

          bg-gradient-to-r
          from-transparent
          via-white/[0.05]
          to-transparent
        "
      />
    </div>
  );
}