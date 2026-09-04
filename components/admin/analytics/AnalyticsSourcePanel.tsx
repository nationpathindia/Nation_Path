"use client";

import {
  ArrowUpRight,
  Globe2,
  Link2,
  Search,
  Share2,
  TrendingUp,
  Activity,
} from "lucide-react";

export interface AnalyticsSourceItem {
  source: string;
  views?: number;
  sessions?: number;
  share?: number;
}

export interface AnalyticsMediumItem {
  medium: string;
  views?: number;
  sessions?: number;
  share?: number;
}

export interface AnalyticsCampaignItem {
  campaign: string;
  views?: number;
  sessions?: number;
  share?: number;
}

interface AnalyticsSourcePanelProps {
  sources?: AnalyticsSourceItem[];
  mediums?: AnalyticsMediumItem[];
  campaigns?: AnalyticsCampaignItem[];
}

function number(value?: number) {
  return Number.isFinite(value) ? Number(value) : 0;
}

function compact(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }

  return value.toLocaleString("en-IN");
}

function percentage(value?: number) {
  if (!Number.isFinite(value)) {
    return null;
  }

  return Math.max(0, Math.min(100, Number(value)));
}

function sourceIcon(name: string) {
  const value = name.toLowerCase();

  if (value === "google" || value.includes("search")) {
    return Search;
  }

  if (
    value.includes("facebook") ||
    value.includes("instagram") ||
    value.includes("youtube") ||
    value.includes("whatsapp") ||
    value.includes("twitter") ||
    value.includes("linkedin") ||
    value.includes("social")
  ) {
    return Share2;
  }

  if (
    value === "direct"
  ) {
    return Globe2;
  }

  return Link2;
}

function sourceBadge(name: string) {
  const value = name.toLowerCase();

  if (
    value === "google" ||
    value.includes("search")
  ) {
    return "bg-blue-500/10 text-blue-300";
  }

  if (
    value.includes("facebook") ||
    value.includes("instagram") ||
    value.includes("youtube") ||
    value.includes("whatsapp") ||
    value.includes("twitter") ||
    value.includes("linkedin") ||
    value.includes("social")
  ) {
    return "bg-orange-500/10 text-orange-400";
  }

  if (value === "direct") {
    return "bg-white/[0.06] text-gray-300";
  }

  return "bg-emerald-500/10 text-emerald-400";
}

function SourceMetric({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof Activity;
}) {
  return (
    <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] px-2.5 py-2">
      <div className="flex items-center gap-1.5">
        <Icon
          size={10}
          strokeWidth={1.8}
          className="text-gray-600"
        />

        <span className="text-[8px] uppercase tracking-wide text-gray-600">
          {label}
        </span>
      </div>

      <p className="mt-1 text-xs font-semibold tabular-nums text-gray-300">
        {compact(value)}
      </p>
    </div>
  );
}

function SourceRow({
  name,
  type,
  views,
  sessions,
  share,
  index,
}: {
  name: string;
  type: "Source" | "Medium" | "Campaign";
  views?: number;
  sessions?: number;
  share?: number;
  index: number;
}) {
  const Icon =
    type === "Source"
      ? sourceIcon(name)
      : type === "Medium"
        ? Activity
        : Link2;

  const safeViews = number(views);
  const safeSessions = number(sessions);
  const safeShare = percentage(share);

  const isFirst = index === 0;

  return (
    <div
      className={[
        "group relative px-4 py-4 sm:px-5",
        "transition-colors duration-200",
        "hover:bg-white/[0.025]",
        isFirst ? "bg-white/[0.012]" : "",
      ].join(" ")}
    >
      {isFirst && (
        <div className="absolute inset-y-0 left-0 w-[2px] bg-orange-500" />
      )}

      <div className="flex gap-3">
        {/* RANK */}

        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.025]">
          <span
            className={
              isFirst
                ? "font-mono text-[10px] font-bold text-orange-400"
                : "font-mono text-[10px] font-semibold text-gray-600"
            }
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          {/* HEADER */}

          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <Icon
                  size={13}
                  strokeWidth={1.8}
                  className="shrink-0 text-orange-400"
                />

                <p className="truncate text-sm font-semibold text-gray-200 transition group-hover:text-white">
                  {name}
                </p>

                <ArrowUpRight
                  size={10}
                  className="hidden shrink-0 text-gray-700 group-hover:text-gray-400 sm:block"
                />
              </div>

              <div className="mt-1.5 flex items-center gap-1.5">
                <span
                  className={[
                    "rounded-md px-1.5 py-0.5",
                    "text-[8px] font-medium uppercase tracking-[0.05em]",
                    type === "Source"
                      ? sourceBadge(name)
                      : "bg-white/[0.05] text-gray-400",
                  ].join(" ")}
                >
                  {type}
                </span>

                {isFirst && (
                  <span className="rounded-md bg-orange-500/10 px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-[0.05em] text-orange-400">
                    Top
                  </span>
                )}
              </div>
            </div>

            {/* VIEWS */}

            <div className="shrink-0 text-right">
              <p className="text-sm font-semibold tabular-nums text-white">
                {compact(safeViews)}
              </p>

              <p className="text-[8px] uppercase tracking-wide text-gray-700">
                Views
              </p>
            </div>
          </div>

          {/* API SHARE */}

          {safeShare !== null && (
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-[0.08em] text-gray-700">
                  Traffic Share
                </span>

                <span className="text-[9px] font-medium tabular-nums text-gray-500">
                  {safeShare}%
                </span>
              </div>

              <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/[0.05]">
                <div
                  className="h-full rounded-full bg-orange-500"
                  style={{
                    width: `${safeShare}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* METRICS */}

          <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-2">
            <SourceMetric
              label="Sessions"
              value={safeSessions}
              icon={Activity}
            />

            <SourceMetric
              label="Views"
              value={safeViews}
              icon={Globe2}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function AcquisitionGroup({
  title,
  items,
  type,
}: {
  title: string;
  items: Array<{
    name: string;
    views?: number;
    sessions?: number;
    share?: number;
  }>;
  type: "Source" | "Medium" | "Campaign";
}) {
  const data = items.slice(0, 10);

  return (
    <div>
      <div className="flex items-center justify-between border-b border-white/[0.045] px-4 py-2.5 sm:px-5">
        <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-gray-500">
          {title}
        </span>

        <span className="text-[8px] uppercase tracking-wide text-gray-700">
          Top {data.length}
        </span>
      </div>

      {data.length === 0 ? (
        <div className="px-5 py-6 text-center">
          <p className="text-[10px] text-gray-700">
            No {title.toLowerCase()} data available
          </p>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.045]">
          {data.map((item, index) => (
            <SourceRow
              key={`${type}-${item.name}-${index}`}
              name={item.name}
              type={type}
              views={item.views}
              sessions={item.sessions}
              share={item.share}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AnalyticsSourcePanel({
  sources = [],
  mediums = [],
  campaigns = [],
}: AnalyticsSourcePanelProps) {
  const hasData =
    sources.length > 0 ||
    mediums.length > 0 ||
    campaigns.length > 0;

  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-black/25 backdrop-blur-xl">
      {/* HEADER */}

      <header className="flex items-center justify-between gap-4 border-b border-white/[0.06] px-4 py-4 sm:px-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-500/10">
              <Globe2
                size={13}
                strokeWidth={1.8}
                className="text-orange-400"
              />
            </div>

            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-white">
                Acquisition Intelligence
              </h2>

              <p className="mt-0.5 hidden text-[10px] text-gray-600 sm:block">
                Sources, mediums and campaigns driving audience traffic.
              </p>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.025] px-2.5 py-1.5">
          <TrendingUp
            size={10}
            strokeWidth={1.8}
            className="text-orange-400"
          />

          <span className="text-[8px] uppercase tracking-[0.08em] text-gray-600">
            Acquisition
          </span>
        </div>
      </header>

      {/* CONTENT */}

      {!hasData ? (
        <div className="flex min-h-[170px] items-center justify-center px-5 text-center">
          <div>
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025]">
              <Globe2
                size={17}
                strokeWidth={1.7}
                className="text-gray-600"
              />
            </div>

            <p className="mt-3 text-xs font-medium text-gray-400">
              No acquisition data available
            </p>

            <p className="mt-1 text-[10px] text-gray-700">
              Traffic acquisition data will appear as analytics accumulate.
            </p>
          </div>
        </div>
      ) : (
        <div>
          <AcquisitionGroup
            title="Sources"
            type="Source"
            items={sources.map(item => ({
              name: item.source,
              views: item.views,
              sessions: item.sessions,
              share: item.share,
            }))}
          />

          <AcquisitionGroup
            title="Mediums"
            type="Medium"
            items={mediums.map(item => ({
              name: item.medium,
              views: item.views,
              sessions: item.sessions,
              share: item.share,
            }))}
          />

          <AcquisitionGroup
            title="Campaigns"
            type="Campaign"
            items={campaigns.map(item => ({
              name: item.campaign,
              views: item.views,
              sessions: item.sessions,
              share: item.share,
            }))}
          />
        </div>
      )}

      {/* FOOTER */}

      {hasData && (
        <footer className="flex items-center justify-between gap-3 border-t border-white/[0.05] px-4 py-2.5 sm:px-5">
          <span className="text-[9px] uppercase tracking-[0.07em] text-gray-700">
            API-ranked acquisition data
          </span>

          <span className="text-[9px] text-gray-700">
            Source · Medium · Campaign
          </span>
        </footer>
      )}
    </section>
  );
}