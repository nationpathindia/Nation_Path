"use client";

import {
  Activity,
  BookOpen,
  Eye,
  Heart,
  Share2,
  Users,
} from "lucide-react";

export interface AnalyticsEngagementPanelData {
  views?: number;
  reads?: number;
  shares?: number;
  reactions?: number;
  likes?: number;

  uniqueUsers?: number;
  uniqueSessions?: number;

  readRate?: number;
  shareRate?: number;
  reactionRate?: number;
  engagementRate?: number;
}

interface AnalyticsOverviewData {
  views?: number;
  reads?: number;
  sessions?: number;
  users?: number;

  likes?: number;
  shares?: number;
  reactions?: number;

  readRate?: number;
  shareRate?: number;
  reactionRate?: number;
  engagementRate?: number;
}

interface AnalyticsVideoData {
  videoPlays?: number;
  videoCompletes?: number;
  videoCompletionRate?: number;
}

interface Props {
  data?: AnalyticsEngagementPanelData;
  overview?: AnalyticsOverviewData;
  video?: AnalyticsVideoData;
}

function number(value?: number) {
  return Number.isFinite(value) ? Number(value) : 0;
}

function percentage(value?: number) {
  if (!Number.isFinite(value)) return 0;

  return Math.max(
    0,
    Math.min(100, Number(value))
  );
}

function compactNumber(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }

  return value.toLocaleString("en-IN");
}

const styles = {
  orange: {
    icon: "bg-orange-500/10 text-orange-400",
    bar: "bg-orange-500",
  },
  green: {
    icon: "bg-emerald-500/10 text-emerald-400",
    bar: "bg-emerald-500",
  },
  blue: {
    icon: "bg-blue-500/10 text-blue-300",
    bar: "bg-blue-400",
  },
};

function Metric({
  label,
  value,
  icon: Icon,
  percent,
  color = "orange",
}: {
  label: string;
  value: number;
  icon: typeof Eye;
  percent?: number;
  color?: keyof typeof styles;
}) {
  const style = styles[color];
  const hasPercent = typeof percent === "number";

  return (
    <div className="rounded-xl border border-white/[0.06] bg-black/20 px-3.5 py-3 transition-colors hover:border-white/[0.12]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[9px] uppercase tracking-[0.08em] text-gray-600">
            {label}
          </p>

          <p className="mt-1 text-lg font-semibold tabular-nums text-white">
            {compactNumber(value)}
          </p>
        </div>

        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${style.icon}`}
        >
          <Icon
            size={13}
            strokeWidth={1.8}
          />
        </div>
      </div>

      {hasPercent && (
        <div className="mt-2.5">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[8px] uppercase tracking-wide text-gray-700">
              Rate
            </span>

            <span className="text-[9px] font-medium tabular-nums text-gray-500">
              {percent!.toFixed(0)}%
            </span>
          </div>

          <div className="h-1 overflow-hidden rounded-full bg-white/[0.05]">
            <div
              className={`h-full rounded-full ${style.bar}`}
              style={{
                width: `${percentage(percent)}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function SecondaryMetric({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof Eye;
}) {
  return (
    <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2.5">
      <div className="flex items-center gap-1.5">
        <Icon
          size={11}
          strokeWidth={1.8}
          className="text-gray-600"
        />

        <span className="text-[9px] uppercase tracking-wide text-gray-600">
          {label}
        </span>
      </div>

      <p className="mt-1.5 text-sm font-semibold tabular-nums text-gray-200">
        {compactNumber(value)}
      </p>
    </div>
  );
}

export default function AnalyticsEngagementPanel({
  data,
  overview,
  video,
}: Props) {
  /*
   * Prefer the engagement object when available.
   * Fall back to canonical overview fields because the
   * current dashboard API exposes the core engagement
   * metrics there.
   */

  const views = number(
    data?.views ?? overview?.views
  );

  const reads = number(
    data?.reads ?? overview?.reads
  );

  const shares = number(
    data?.shares ?? overview?.shares
  );

  const reactions = number(
    data?.reactions ?? overview?.reactions
  );

  const likes = number(
    data?.likes ?? overview?.likes
  );

  const users = number(
    data?.uniqueUsers ?? overview?.users
  );

  const sessions = number(
    data?.uniqueSessions ?? overview?.sessions
  );

  const readRate = percentage(
    data?.readRate ?? overview?.readRate
  );

  const shareRate = percentage(
    data?.shareRate ?? overview?.shareRate
  );

  const reactionRate = percentage(
    data?.reactionRate ?? overview?.reactionRate
  );

  const engagementRate = percentage(
    data?.engagementRate ?? overview?.engagementRate
  );

  const videoPlays = number(
    video?.videoPlays
  );

  const videoCompletes = number(
    video?.videoCompletes
  );

  const videoCompletionRate = percentage(
    video?.videoCompletionRate
  );

  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-black/25 backdrop-blur-xl">
      {/* HEADER */}

      <header className="border-b border-white/[0.06] px-4 py-4 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-500/10">
              <Activity
                size={13}
                strokeWidth={1.8}
                className="text-orange-400"
              />
            </div>

            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-white">
                Engagement Intelligence
              </h2>

              <p className="mt-0.5 hidden text-[10px] text-gray-600 sm:block">
                Reader interaction and engagement signals.
              </p>
            </div>
          </div>

          <div className="hidden shrink-0 items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.025] px-2.5 py-1.5 sm:flex">
            <Activity
              size={9}
              className="text-orange-400"
            />

            <span className="text-[8px] uppercase tracking-[0.08em] text-gray-600">
              API metrics
            </span>
          </div>
        </div>
      </header>

      {/* PRIMARY METRICS */}

      <div className="grid gap-2.5 p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-4">
        <Metric
          label="Views"
          value={views}
          icon={Eye}
        />

        <Metric
          label="Reads"
          value={reads}
          icon={BookOpen}
          percent={readRate}
          color="green"
        />

        <Metric
          label="Shares"
          value={shares}
          icon={Share2}
          percent={shareRate}
        />

        <Metric
          label="Reactions"
          value={reactions}
          icon={Heart}
          percent={reactionRate}
          color="blue"
        />
      </div>

      {/* SECONDARY */}

      <div className="grid grid-cols-2 gap-2.5 border-t border-white/[0.05] p-4 sm:grid-cols-3 sm:p-5">
        <SecondaryMetric
          label="Users"
          value={users}
          icon={Users}
        />

        <SecondaryMetric
          label="Sessions"
          value={sessions}
          icon={Activity}
        />

        <SecondaryMetric
          label="Likes"
          value={likes}
          icon={Heart}
        />
      </div>

      {/* SUMMARY */}

      <footer className="grid grid-cols-2 gap-2.5 border-t border-white/[0.05] p-4 sm:grid-cols-4 sm:px-5">
        <div>
          <p className="text-[8px] uppercase tracking-[0.08em] text-gray-700">
            Engagement Rate
          </p>

          <p className="mt-1 text-sm font-semibold tabular-nums text-white">
            {engagementRate.toFixed(0)}%
          </p>
        </div>

        <div>
          <p className="text-[8px] uppercase tracking-[0.08em] text-gray-700">
            Video Plays
          </p>

          <p className="mt-1 text-sm font-semibold tabular-nums text-white">
            {compactNumber(videoPlays)}
          </p>
        </div>

        <div>
          <p className="text-[8px] uppercase tracking-[0.08em] text-gray-700">
            Video Completes
          </p>

          <p className="mt-1 text-sm font-semibold tabular-nums text-white">
            {compactNumber(videoCompletes)}
          </p>
        </div>

        <div>
          <p className="text-[8px] uppercase tracking-[0.08em] text-gray-700">
            Completion Rate
          </p>

          <p className="mt-1 text-sm font-semibold tabular-nums text-white">
            {videoCompletionRate.toFixed(0)}%
          </p>
        </div>
      </footer>
    </section>
  );
}