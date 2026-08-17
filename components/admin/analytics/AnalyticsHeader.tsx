"use client";

import {
  Check,
  Clock3,
  Loader2,
  RefreshCw,
} from "lucide-react";

import type { AnalyticsTimeRange } from "@/lib/analytics/types";

interface AnalyticsHeaderProps {
  range: AnalyticsTimeRange;
  onRangeChange: (
    range: AnalyticsTimeRange
  ) => void;

  onRefresh: () => void;

  loading?: boolean;

  autoRefresh?: boolean;

  onAutoRefreshChange?: (
    enabled: boolean
  ) => void;

  lastUpdated?: Date | null;
}

const RANGES: {
  value: AnalyticsTimeRange;
  label: string;
}[] = [
  {
    value: "1h",
    label: "1 Hour",
  },
  {
    value: "6h",
    label: "6 Hours",
  },
  {
    value: "24h",
    label: "24 Hours",
  },
  {
    value: "7d",
    label: "7 Days",
  },
  {
    value: "30d",
    label: "30 Days",
  },
  {
    value: "90d",
    label: "90 Days",
  },
  {
    value: "all",
    label: "All Time",
  },
];

function formatLastUpdated(
  date?: Date | null
) {
  if (!date) {
    return "Not updated yet";
  }

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function AnalyticsHeader({
  range,
  onRangeChange,
  onRefresh,
  loading = false,
  autoRefresh = true,
  onAutoRefreshChange,
  lastUpdated,
}: AnalyticsHeaderProps) {
  return (
    <header className="space-y-6">
      {/* =====================================================
          TITLE
      ===================================================== */}

      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EA661B]/10 text-[#EA661B]">
              <Check
                size={19}
                strokeWidth={2}
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                NationPath Analytics
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Audience, content and engagement intelligence.
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            STATUS
        ================================================= */}

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2">
            <span
              className={`h-2 w-2 rounded-full ${
                autoRefresh
                  ? "bg-emerald-400"
                  : "bg-gray-600"
              }`}
            />

            <span className="text-xs text-gray-400">
              {autoRefresh
                ? "Auto refresh ON"
                : "Auto refresh OFF"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock3
              size={13}
              strokeWidth={1.8}
            />

            <span>
              Updated{" "}
              {formatLastUpdated(
                lastUpdated
              )}
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          CONTROLS
      ===================================================== */}

      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-3 sm:flex-row sm:items-center sm:justify-between">
        {/* RANGE */}

        <div className="flex flex-wrap items-center gap-1.5">
          {RANGES.map((item) => {
            const active =
              range === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() =>
                  onRangeChange(
                    item.value
                  )
                }
                disabled={loading}
                className={[
                  "rounded-lg px-3 py-2 text-xs font-medium transition",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  active
                    ? "bg-[#163C80] text-white shadow-sm"
                    : "text-gray-500 hover:bg-white/[0.06] hover:text-gray-200",
                ].join(" ")}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* ACTIONS */}

        <div className="flex items-center gap-2">
          {onAutoRefreshChange && (
            <button
              type="button"
              onClick={() =>
                onAutoRefreshChange(
                  !autoRefresh
                )
              }
              className={[
                "rounded-lg border px-3 py-2 text-xs font-medium transition",
                autoRefresh
                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                  : "border-white/10 bg-white/[0.03] text-gray-500 hover:text-gray-300",
              ].join(" ")}
            >
              {autoRefresh
                ? "Auto"
                : "Manual"}
            </button>
          )}

          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-[#EA661B] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#d95d17] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <Loader2
                size={14}
                className="animate-spin"
              />
            ) : (
              <RefreshCw
                size={14}
              />
            )}

            {loading
              ? "Refreshing..."
              : "Refresh"}
          </button>
        </div>
      </div>
    </header>
  );
}

