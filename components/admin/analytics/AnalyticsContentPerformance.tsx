"use client";

import {
  Activity,
  ArrowUpRight,
  BookOpen,
  Eye,
  FileText,
  Heart,
  Newspaper,
  Share2,
  Sparkles,
} from "lucide-react";

interface ContentPerformance {
  totalEvents?: number;
  views?: number;
  opens?: number;
  reads?: number;
  shares?: number;
  reactions?: number;
  likes?: number;
}

interface AnalyticsContentPerformanceProps {
  news?: ContentPerformance;
  editorial?: ContentPerformance;
  astrology?: ContentPerformance;
}

function number(value?: number) {
  return Number(value) || 0;
}

function getEngagementRate(
  data?: ContentPerformance
) {
  const views = number(data?.views);

  if (views <= 0) {
    return 0;
  }

  const engagement =
    number(data?.reads) +
    number(data?.shares) +
    number(data?.reactions) +
    number(data?.likes);

  return Math.min(
    100,
    (engagement / views) * 100
  );
}

function formatRate(value: number) {
  return `${value.toFixed(1)}%`;
}

function ContentIcon({
  type,
}: {
  type: "news" | "editorial" | "astro";
}) {
  if (type === "astro") {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EA661B]/10 text-[#EA661B]">
        <Sparkles
          size={18}
          strokeWidth={1.9}
        />
      </div>
    );
  }

  if (type === "editorial") {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#163C80]/15 text-[#6D91D8]">
        <BookOpen
          size={18}
          strokeWidth={1.9}
        />
      </div>
    );
  }

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
      <Newspaper
        size={18}
        strokeWidth={1.9}
      />
    </div>
  );
}

function PerformanceRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2.5 text-gray-500">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.04]">
          {icon}
        </span>

        <span className="text-xs">
          {label}
        </span>
      </div>

      <span className="text-sm font-semibold text-gray-200">
        {value.toLocaleString()}
      </span>
    </div>
  );
}

function ContentCard({
  type,
  title,
  description,
  data,
}: {
  type: "news" | "editorial" | "astro";
  title: string;
  description: string;
  data?: ContentPerformance;
}) {
  const views = number(data?.views);
  const reads = number(data?.reads);
  const opens = number(data?.opens);
  const shares = number(data?.shares);
  const reactions = number(
    data?.reactions
  );
  const likes = number(data?.likes);
  const events = number(
    data?.totalEvents
  );

  const engagementRate =
    getEngagementRate(data);

  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-white/20">
      {/* HEADER */}

      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <ContentIcon type={type} />

          <div className="min-w-0">
            <h3 className="font-semibold text-white">
              {title}
            </h3>

            <p className="mt-0.5 truncate text-xs text-gray-500">
              {description}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 rounded-lg bg-white/[0.04] px-2 py-1 text-xs text-gray-500">
          <Activity
            size={12}
            strokeWidth={1.8}
          />

          {events.toLocaleString()}
        </div>
      </div>

      {/* PRIMARY METRIC */}

      <div className="mt-6 rounded-xl border border-white/[0.06] bg-black/10 p-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-gray-600">
              Views
            </p>

            <p className="mt-1 text-2xl font-bold tracking-tight text-white">
              {views.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-1 text-xs font-medium text-gray-500">
            <Eye
              size={13}
              strokeWidth={1.8}
            />

            Content reach
          </div>
        </div>
      </div>

      {/* METRICS */}

      <div className="mt-5 space-y-3">
        <PerformanceRow
          icon={
            <BookOpen
              size={14}
              strokeWidth={1.8}
            />
          }
          label="Reads"
          value={reads}
        />

        <PerformanceRow
          icon={
            <FileText
              size={14}
              strokeWidth={1.8}
            />
          }
          label="Opens"
          value={opens}
        />

        <PerformanceRow
          icon={
            <Share2
              size={14}
              strokeWidth={1.8}
            />
          }
          label="Shares"
          value={shares}
        />

        <PerformanceRow
          icon={
            <Heart
              size={14}
              strokeWidth={1.8}
            />
          }
          label="Reactions"
          value={reactions}
        />
      </div>

      {/* FOOTER */}

      <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.08em] text-gray-600">
            Engagement Rate
          </p>

          <p className="mt-1 text-sm font-semibold text-white">
            {formatRate(
              engagementRate
            )}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <ArrowUpRight
            size={14}
            strokeWidth={1.8}
          />

          {likes.toLocaleString()} likes
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsContentPerformance({
  news,
  editorial,
  astrology,
}: AnalyticsContentPerformanceProps) {
  return (
    <section className="space-y-4">
      {/* SECTION HEADER */}

      <div>
        <div className="flex items-center gap-2">
          <Activity
            size={17}
            strokeWidth={1.8}
            className="text-[#EA661B]"
          />

          <h2 className="text-lg font-semibold text-white">
            Content Performance
          </h2>
        </div>

        <p className="mt-1 text-sm text-gray-500">
          Compare how News, Editorial and Astrology content perform during the selected period.
        </p>
      </div>

      {/* CONTENT CARDS */}

      <div className="grid gap-5 lg:grid-cols-3">
        <ContentCard
          type="news"
          title="News"
          description="Core newsroom content"
          data={news}
        />

        <ContentCard
          type="editorial"
          title="Editorial"
          description="Analysis and opinion content"
          data={editorial}
        />

        <ContentCard
          type="astro"
          title="Astrology"
          description="Astro intelligence content"
          data={astrology}
        />
      </div>
    </section>
  );
}

