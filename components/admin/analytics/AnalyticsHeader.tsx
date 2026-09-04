"use client";

import {
  Check,
  Clock3,
  Loader2,
  RefreshCw,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

export type AnalyticsTimeRange =
  | "24h"
  | "7d"
  | "30d";

interface AnalyticsHeaderProps {
  range: AnalyticsTimeRange;

  onRangeChange: (
    range: AnalyticsTimeRange
  ) => void;

  onRefresh: () => void;

  loading?: boolean;
}

/* =========================================================
   RANGES

   LOCKED API SUPPORT:

   GET /api/analytics/dashboard?range=24h
   GET /api/analytics/dashboard?range=7d
   GET /api/analytics/dashboard?range=30d
========================================================= */

const RANGES: {
  value: AnalyticsTimeRange;
  label: string;
  shortLabel: string;
}[] = [
  {
    value: "24h",
    label: "24 Hours",
    shortLabel: "24H",
  },
  {
    value: "7d",
    label: "7 Days",
    shortLabel: "7D",
  },
  {
    value: "30d",
    label: "30 Days",
    shortLabel: "30D",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function AnalyticsHeader({
  range,
  onRangeChange,
  onRefresh,
  loading = false,
}: AnalyticsHeaderProps) {
  return (
    <header className="space-y-5 md:space-y-6">

      {/* ===================================================
         HERO HEADER
      =================================================== */}

      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-white/[0.025]
          px-4
          py-5
          shadow-[0_20px_60px_rgba(0,0,0,0.18)]
          sm:px-5
          md:px-6
          md:py-6
        "
      >

        {/* Subtle ambient glow */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-56
            w-56
            rounded-full
            bg-[#163C80]/10
            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-32
            left-1/3
            h-48
            w-48
            rounded-full
            bg-[#EA661B]/5
            blur-3xl
          "
        />

        <div
          className="
            relative
            flex
            flex-col
            gap-5
            xl:flex-row
            xl:items-center
            xl:justify-between
          "
        >

          {/* ===============================================
             TITLE
          =============================================== */}

          <div className="min-w-0">

            <div className="flex items-start gap-3.5">

              {/* Icon */}

              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[#EA661B]/20
                  bg-[#EA661B]/10
                  text-[#EA661B]
                  shadow-[0_0_24px_rgba(234,102,27,0.08)]
                "
              >
                <Check
                  size={19}
                  strokeWidth={2.2}
                />
              </div>

              {/* Heading */}

              <div className="min-w-0">

                <div className="flex flex-wrap items-center gap-2.5">

                  <h1
                    className="
                      text-xl
                      font-bold
                      tracking-tight
                      text-white
                      sm:text-2xl
                      md:text-3xl
                    "
                  >
                    NationPath Analytics
                  </h1>

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      border
                      border-emerald-400/15
                      bg-emerald-400/[0.06]
                      px-2.5
                      py-1
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-emerald-400
                    "
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span
                        className="
                          absolute
                          inline-flex
                          h-full
                          w-full
                          animate-ping
                          rounded-full
                          bg-emerald-400/60
                        "
                      />
                      <span
                        className="
                          relative
                          inline-flex
                          h-1.5
                          w-1.5
                          rounded-full
                          bg-emerald-400
                        "
                      />
                    </span>

                    Live
                  </span>

                </div>

                <p
                  className="
                    mt-1.5
                    max-w-2xl
                    text-xs
                    leading-5
                    text-gray-500
                    sm:text-sm
                  "
                >
                  Audience, content and engagement intelligence
                  powered by event-based analytics.
                </p>

              </div>

            </div>

          </div>


          {/* ===============================================
             AUTO REFRESH STATUS
          =============================================== */}

          <div
            className="
              inline-flex
              w-fit
              items-center
              gap-2.5
              rounded-xl
              border
              border-white/10
              bg-black/10
              px-3.5
              py-2.5
            "
          >

            <div
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-lg
                bg-white/[0.05]
                text-gray-400
              "
            >
              <Clock3
                size={14}
                strokeWidth={2}
              />
            </div>

            <div>

              <p className="text-[11px] font-medium text-gray-300">
                Auto refresh
              </p>

              <p className="mt-0.5 text-[10px] text-gray-500">
                Every 30 seconds
              </p>

            </div>

            <span
              className="
                ml-1
                h-1.5
                w-1.5
                rounded-full
                bg-emerald-400
                shadow-[0_0_8px_rgba(52,211,153,0.45)]
              "
              aria-label="Auto refresh active"
            />

          </div>

        </div>

      </div>


      {/* ===================================================
         CONTROLS
      =================================================== */}

      <div
        className="
          flex
          flex-col
          gap-3
          rounded-2xl
          border
          border-white/10
          bg-white/[0.02]
          p-2.5
          shadow-[0_12px_40px_rgba(0,0,0,0.12)]
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        {/* ===============================================
           RANGE SELECTOR
        =============================================== */}

        <div
          className="
            flex
            w-full
            flex-wrap
            items-center
            gap-1
            rounded-xl
            bg-black/10
            p-1
            sm:w-auto
          "
          role="group"
          aria-label="Analytics time range"
        >

          {RANGES.map((item) => {

            const active =
              range === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() =>
                  onRangeChange(item.value)
                }
                disabled={loading}
                aria-pressed={active}
                aria-label={`Show analytics for ${item.label}`}
                className={[
                  `
                    group
                    relative
                    rounded-lg
                    px-3
                    py-2
                    text-xs
                    font-medium
                    transition-all
                    duration-200
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#EA661B]/50
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  `,
                  active
                    ? `
                      bg-[#163C80]
                      text-white
                      shadow-[0_4px_14px_rgba(22,60,128,0.28)]
                    `
                    : `
                      text-gray-500
                      hover:bg-white/[0.05]
                      hover:text-gray-200
                    `,
                ].join(" ")}
              >

                {/* Desktop label */}

                <span className="hidden sm:inline">
                  {item.label}
                </span>

                {/* Mobile label */}

                <span className="sm:hidden">
                  {item.shortLabel}
                </span>

                {/* Active indicator */}

                {active && (
                  <span
                    className="
                      absolute
                      bottom-0.5
                      left-1/2
                      h-0.5
                      w-4
                      -translate-x-1/2
                      rounded-full
                      bg-white/60
                    "
                  />
                )}

              </button>
            );

          })}

        </div>


        {/* ===============================================
           CURRENT RANGE + REFRESH
        =============================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-2
            sm:justify-end
          "
        >

          {/* Current range */}

          <div
            className="
              hidden
              items-center
              gap-2
              px-2
              text-[11px]
              text-gray-500
              md:flex
            "
          >

            <span className="h-1 w-1 rounded-full bg-gray-600" />

            <span>
              Viewing
            </span>

            <span className="font-medium text-gray-300">
              {RANGES.find(
                item => item.value === range
              )?.label}
            </span>

          </div>


          {/* Refresh button */}

          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            aria-label={
              loading
                ? "Refreshing analytics"
                : "Refresh analytics"
            }
            className="
              inline-flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#EA661B]
              px-4
              py-2.5
              text-xs
              font-semibold
              text-white
              shadow-[0_6px_18px_rgba(234,102,27,0.16)]
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-[#d95d17]
              hover:shadow-[0_8px_22px_rgba(234,102,27,0.22)]
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#EA661B]/60
              focus-visible:ring-offset-2
              focus-visible:ring-offset-black
              disabled:cursor-not-allowed
              disabled:translate-y-0
              disabled:opacity-60
              sm:w-auto
            "
          >

            {loading ? (
              <Loader2
                size={14}
                className="animate-spin"
              />
            ) : (
              <RefreshCw
                size={14}
                strokeWidth={2}
              />
            )}

            <span>
              {loading
                ? "Refreshing..."
                : "Refresh"
              }
            </span>

          </button>

        </div>

      </div>

    </header>
  );
}