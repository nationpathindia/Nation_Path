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
  return (
    <div className="space-y-6 animate-pulse">
      {/* KPI SKELETON */}

      <section>
        <div className="mb-4">
          <div className="h-5 w-44 rounded bg-white/[0.06]" />

          <div className="mt-2 h-3 w-72 rounded bg-white/[0.04]" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({
            length: 8,
          }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="h-3 w-24 rounded bg-white/[0.06]" />

                  <div className="mt-3 h-8 w-28 rounded bg-white/[0.07]" />

                  <div className="mt-2 h-2.5 w-20 rounded bg-white/[0.04]" />
                </div>

                <div className="h-9 w-9 rounded-lg bg-white/[0.06]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CHART SKELETON */}

      <div className="grid gap-6 xl:grid-cols-2">
        {Array.from({
          length: 2,
        }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"
          >
            <div className="h-5 w-40 rounded bg-white/[0.06]" />

            <div className="mt-2 h-3 w-64 rounded bg-white/[0.04]" />

            <div className="mt-6 h-[280px] rounded-xl bg-white/[0.025]" />
          </div>
        ))}
      </div>

      {/* CONTENT SKELETON */}

      <div className="grid gap-6 xl:grid-cols-2">
        {Array.from({
          length: Math.max(2, Math.min(rows, 4)),
        }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025]"
          >
            <div className="border-b border-white/[0.06] p-5">
              <div className="h-5 w-40 rounded bg-white/[0.06]" />

              <div className="mt-2 h-3 w-64 rounded bg-white/[0.04]" />
            </div>

            <div className="divide-y divide-white/[0.05]">
              {Array.from({
                length: 4,
              }).map(
                (_, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex gap-4 p-5"
                  >
                    <div className="h-8 w-8 shrink-0 rounded-lg bg-white/[0.06]" />

                    <div className="min-w-0 flex-1">
                      <div className="h-4 w-3/4 rounded bg-white/[0.06]" />

                      <div className="mt-2 h-3 w-1/2 rounded bg-white/[0.04]" />

                      <div className="mt-4 h-3 w-2/3 rounded bg-white/[0.035]" />
                    </div>
                  </div>
                )
              )}
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
    <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-red-400/10 bg-white/[0.025] px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
          <AlertTriangle
            size={21}
            strokeWidth={1.8}
          />
        </div>

        <h2 className="mt-4 text-lg font-semibold text-white">
          Analytics unavailable
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          {message}
        </p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            disabled={isRetrying}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#163C80] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1d4b9c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={14}
              strokeWidth={1.8}
              className={
                isRetrying
                  ? "animate-spin"
                  : ""
              }
            />

            {isRetrying
              ? "Retrying..."
              : "Retry"}
          </button>
        )}

        <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-gray-700">
          <BarChart3
            size={11}
            strokeWidth={1.8}
          />

          NationPath Analytics
        </div>
      </div>
    </div>
  );
}

