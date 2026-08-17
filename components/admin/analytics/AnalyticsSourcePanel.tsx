"use client";

import {
  ArrowUpRight,
  Globe2,
  Link2,
  Search,
  Share2,
  Users,
} from "lucide-react";

export interface AnalyticsSourceItem {
  id?: string;
  name: string;
  type?:
    | "direct"
    | "search"
    | "social"
    | "referral"
    | string;

  users?: number;
  sessions?: number;
  views?: number;
  percentage?: number;
}

interface AnalyticsSourcePanelProps {
  sources?: AnalyticsSourceItem[];
}

function number(value?: number) {
  return Number(value) || 0;
}

function getSourceIcon(type?: string) {
  switch (type) {
    case "search":
      return Search;

    case "social":
      return Share2;

    case "referral":
      return Link2;

    default:
      return Globe2;
  }
}

function getSourceLabel(type?: string) {
  switch (type) {
    case "search":
      return "Search";

    case "social":
      return "Social";

    case "referral":
      return "Referral";

    case "direct":
      return "Direct";

    default:
      return "Other";
  }
}

function getSourceClass(type?: string) {
  switch (type) {
    case "search":
      return "bg-[#163C80]/15 text-[#7FA1E0]";

    case "social":
      return "bg-[#EA661B]/10 text-[#EA661B]";

    case "referral":
      return "bg-emerald-500/10 text-emerald-400";

    case "direct":
      return "bg-white/[0.06] text-gray-300";

    default:
      return "bg-white/[0.04] text-gray-500";
  }
}

function SourceRow({
  source,
  index,
  maxViews,
}: {
  source: AnalyticsSourceItem;
  index: number;
  maxViews: number;
}) {
  const Icon = getSourceIcon(source.type);

  const users = number(source.users);
  const sessions = number(source.sessions);
  const views = number(source.views);

  const percentage =
    typeof source.percentage === "number"
      ? source.percentage
      : maxViews > 0
        ? (views / maxViews) * 100
        : 0;

  return (
    <div className="group px-5 py-4 transition hover:bg-white/[0.025]">
      <div className="flex gap-4">
        {/* RANK */}

        <div className="flex w-8 shrink-0 items-start justify-center">
          <div
            className={[
              "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold",
              index === 0
                ? "bg-[#EA661B]/10 text-[#EA661B]"
                : "bg-white/[0.04] text-gray-500",
            ].join(" ")}
          >
            {index + 1}
          </div>
        </div>

        {/* SOURCE */}

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Icon
                  size={15}
                  strokeWidth={1.8}
                  className="shrink-0 text-[#EA661B]"
                />

                <p className="truncate text-sm font-semibold text-gray-100 group-hover:text-white">
                  {source.name}
                </p>
              </div>

              <div className="mt-1.5 flex items-center gap-2">
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium ${getSourceClass(
                    source.type
                  )}`}
                >
                  {getSourceLabel(source.type)}
                </span>
              </div>
            </div>

            <div className="hidden shrink-0 text-right sm:block">
              <p className="text-sm font-semibold text-white">
                {views.toLocaleString()}
              </p>

              <p className="mt-0.5 text-[10px] text-gray-600">
                views
              </p>
            </div>
          </div>

          {/* ACTIVITY BAR */}

          <div className="mt-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] uppercase tracking-[0.07em] text-gray-600">
                Traffic contribution
              </span>

              <span className="text-[10px] text-gray-600">
                {Math.round(
                  Math.max(
                    0,
                    Math.min(100, percentage)
                  )
                )}
                %
              </span>
            </div>

            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-[#163C80] transition-all"
                style={{
                  width: `${Math.max(
                    views > 0 ? 3 : 0,
                    Math.min(100, percentage)
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* METRICS */}

          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <Users
                size={13}
                strokeWidth={1.8}
                className="text-gray-500"
              />

              <div>
                <p className="text-[10px] uppercase tracking-[0.05em] text-gray-600">
                  Users
                </p>

                <p className="mt-0.5 text-xs font-semibold text-gray-300">
                  {users.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Globe2
                size={13}
                strokeWidth={1.8}
                className="text-gray-500"
              />

              <div>
                <p className="text-[10px] uppercase tracking-[0.05em] text-gray-600">
                  Sessions
                </p>

                <p className="mt-0.5 text-xs font-semibold text-gray-300">
                  {sessions.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpRight
                size={13}
                strokeWidth={1.8}
                className="text-gray-500"
              />

              <div>
                <p className="text-[10px] uppercase tracking-[0.05em] text-gray-600">
                  Views
                </p>

                <p className="mt-0.5 text-xs font-semibold text-gray-300">
                  {views.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* MOBILE VIEWS */}

          <div className="mt-3 flex items-center gap-1.5 sm:hidden">
            <ArrowUpRight
              size={12}
              strokeWidth={1.8}
              className="text-gray-500"
            />

            <span className="text-xs font-semibold text-gray-400">
              {views.toLocaleString()}
            </span>

            <span className="text-[10px] text-gray-600">
              views
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsSourcePanel({
  sources = [],
}: AnalyticsSourcePanelProps) {
  const visibleSources = sources.slice(0, 10);

  const maxViews = Math.max(
    ...visibleSources.map((source) =>
      number(source.views)
    ),
    1
  );

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
      {/* HEADER */}

      <div className="flex flex-col gap-3 border-b border-white/[0.07] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Globe2
              size={17}
              strokeWidth={1.8}
              className="text-[#EA661B]"
            />

            <h2 className="text-lg font-semibold text-white">
              Traffic Sources
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Where NationPath audience is coming from.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <ArrowUpRight
            size={13}
            strokeWidth={1.8}
            className="text-[#EA661B]"
          />

          Acquisition intelligence
        </div>
      </div>

      {/* CONTENT */}

      {visibleSources.length === 0 ? (
        <div className="flex min-h-[200px] items-center justify-center px-5 text-center">
          <div>
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-gray-600">
              <Globe2
                size={18}
                strokeWidth={1.8}
              />
            </div>

            <p className="mt-3 text-sm font-medium text-gray-400">
              No traffic source data available
            </p>

            <p className="mt-1 text-xs text-gray-600">
              Source analytics will appear as traffic is recorded.
            </p>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.06]">
          {visibleSources.map(
            (source, index) => (
              <SourceRow
                key={
                  source.id ||
                  `${source.name}-${index}`
                }
                source={source}
                index={index}
                maxViews={maxViews}
              />
            )
          )}
        </div>
      )}

      {/* FOOTER */}

      {visibleSources.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] px-5 py-3">
          <p className="text-xs text-gray-600">
            Top {visibleSources.length} traffic sources
          </p>

          <p className="text-xs text-gray-600">
            Direct • Search • Social • Referral
          </p>
        </div>
      )}
    </section>
  );
}

