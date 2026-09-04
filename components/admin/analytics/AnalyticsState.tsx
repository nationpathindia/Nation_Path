"use client";

import {
  AlertTriangle,
  BarChart3,
  RefreshCw,
} from "lucide-react";

interface AnalyticsLoadingStateProps {
  rows?: number;
}

interface AnalyticsErrorStateProps {
  message?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
}

export function AnalyticsLoadingState({
  rows = 4,
}: AnalyticsLoadingStateProps) {
  const contentRows = Math.max(
    2,
    Math.min(rows, 4)
  );

  return (
    <div className="space-y-5 animate-pulse">
      {/* KPI SKELETON */}
      <section>
        <div className="mb-3">
          <div className="h-4 w-40 rounded-md bg-white/[0.06]" />
          <div className="mt-1.5 h-2.5 w-64 rounded-md bg-white/[0.04]" />
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="h-2.5 w-20 rounded bg-white/[0.06]" />

                  <div className="mt-2.5 h-6 w-20 rounded-md bg-white/[0.07]" />

                  <div className="mt-1.5 h-2 w-16 rounded bg-white/[0.04]" />
                </div>

                <div className="h-7 w-7 shrink-0 rounded-lg bg-white/[0.06]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRAFFIC SKELETON */}
      <div className="grid gap-4 xl:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-white/[0.06] bg-black/20"
          >
            <div className="border-b border-white/[0.05] px-4 py-3.5 sm:px-5">
              <div className="h-3.5 w-32 rounded bg-white/[0.06]" />

              <div className="mt-1.5 h-2.5 w-52 rounded bg-white/[0.04]" />
            </div>

            <div className="p-4 sm:p-5">
              <div className="h-[220px] rounded-xl bg-white/[0.018] sm:h-[250px]" />
            </div>
          </div>
        ))}
      </div>

      {/* CONTENT SKELETON */}
      <div className="grid gap-4 xl:grid-cols-2">
        {Array.from({ length: contentRows }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-white/[0.06] bg-black/20"
          >
            <div className="border-b border-white/[0.05] px-4 py-3.5 sm:px-5">
              <div className="h-3.5 w-32 rounded bg-white/[0.06]" />

              <div className="mt-1.5 h-2.5 w-52 rounded bg-white/[0.04]" />
            </div>

            <div className="divide-y divide-white/[0.045]">
              {Array.from({ length: 3 }).map((_, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex gap-3 px-4 py-3.5 sm:px-5"
                >
                  <div className="h-7 w-7 shrink-0 rounded-lg bg-white/[0.06]" />

                  <div className="min-w-0 flex-1">
                    <div className="h-3.5 w-3/4 rounded bg-white/[0.06]" />

                    <div className="mt-2 h-2.5 w-1/2 rounded bg-white/[0.04]" />

                    <div className="mt-3 flex gap-2">
                      <div className="h-2.5 w-14 rounded bg-white/[0.035]" />
                      <div className="h-2.5 w-14 rounded bg-white/[0.035]" />
                      <div className="h-2.5 w-14 rounded bg-white/[0.035]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AnalyticsErrorState({
  message = "Unable to load analytics data.",
  onRetry,
  isRetrying = false,
}: AnalyticsErrorStateProps) {
  return (
    <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-red-400/10 bg-black/20 px-5">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-red-400/10 bg-red-500/10 text-red-400">
          <AlertTriangle
            size={19}
            strokeWidth={1.8}
          />
        </div>

        <h2 className="mt-3.5 text-base font-semibold text-white">
          Analytics unavailable
        </h2>

        <p className="mx-auto mt-1.5 max-w-xs text-xs leading-5 text-gray-500">
          {message}
        </p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            disabled={isRetrying}
            className="
              mt-4
              inline-flex
              items-center
              gap-2
              rounded-lg
              border
              border-[#28529a]/40
              bg-[#163C80]
              px-3.5
              py-2
              text-xs
              font-semibold
              text-white
              transition
              hover:bg-[#1d4b9c]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <RefreshCw
              size={13}
              strokeWidth={1.8}
              className={isRetrying ? "animate-spin" : ""}
            />

            {isRetrying ? "Retrying..." : "Retry"}
          </button>
        )}

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[9px] uppercase tracking-[0.08em] text-gray-700">
          <BarChart3
            size={10}
            strokeWidth={1.8}
          />

          NationPath Analytics
        </div>
      </div>
    </div>
  );
}

