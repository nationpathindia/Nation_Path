"use client";

import {
  Activity,
  BookOpen,
  Eye,
  Flame,
  Heart,
  Newspaper,
  Share2,
  Sparkles,
  TrendingUp,
} from "lucide-react";

interface ContentPerformance {
  totalEvents?: number;
  views?: number;
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

type ContentType = "news" | "editorial" | "astro";

const CONTENT_CONFIG = {
  news: {
    label: "News",
    description: "Newsroom performance",
    icon: Newspaper,
    iconBox: "bg-emerald-500/10",
    iconText: "text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-400",
    bar: "bg-emerald-400",
  },

  editorial: {
    label: "Editorial",
    description: "Analysis & opinion",
    icon: BookOpen,
    iconBox: "bg-blue-500/10",
    iconText: "text-blue-300",
    badge: "bg-blue-500/10 text-blue-300",
    bar: "bg-blue-400",
  },

  astro: {
    label: "Astrology",
    description: "Astro intelligence",
    icon: Sparkles,
    iconBox: "bg-orange-500/10",
    iconText: "text-orange-400",
    badge: "bg-orange-500/10 text-orange-400",
    bar: "bg-orange-400",
  },
} as const;

function number(value?: number) {
  return Number.isFinite(value) ? Number(value) : 0;
}

function formatNumber(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }

  return value.toLocaleString("en-IN");
}

function percent(value: number, total: number) {
  if (!total) return 0;

  return Number(((value / total) * 100).toFixed(1));
}

function getScore(readRate: number, shareRate: number, engagement: number) {
  return Math.min(
    100,
    Math.round(
      readRate * 0.45 +
        shareRate * 0.25 +
        engagement * 0.3
    )
  );
}

function ScoreBadge({ value }: { value: number }) {
  let label = "Building";
  let color = "text-gray-500";

  if (value >= 80) {
    label = "Excellent";
    color = "text-emerald-400";
  } else if (value >= 60) {
    label = "Strong";
    color = "text-blue-300";
  } else if (value >= 35) {
    label = "Growing";
    color = "text-orange-400";
  }

  return (
    <div className="flex items-center gap-1.5">
      <TrendingUp size={13} className={color} />

      <span className={`text-[11px] font-semibold ${color}`}>
        {label}
      </span>

      <span className="text-[10px] text-gray-600">
        {value}
      </span>
    </div>
  );
}

function ContentIcon({ type }: { type: ContentType }) {
  const config = CONTENT_CONFIG[type];
  const Icon = config.icon;

  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${config.iconBox} ${config.iconText}`}
    >
      <Icon size={17} strokeWidth={1.8} />
    </div>
  );
}

function MiniMetric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/[0.05] bg-white/[0.02] px-2.5 py-2">
      <div className="flex items-center gap-1.5 text-gray-500">
        {icon}

        <span className="text-[11px]">
          {label}
        </span>
      </div>

      <span className="text-xs font-semibold text-white">
        {formatNumber(value)}
      </span>
    </div>
  );
}

function IntelligenceMetric({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <p className="text-[9px] font-medium tracking-[0.12em] text-gray-600">
        {label}
      </p>

      <p className="mt-0.5 text-sm font-semibold text-white">
        {value}%
      </p>
    </div>
  );
}

function ContentCard({
  type,
  data,
}: {
  type: ContentType;
  data?: ContentPerformance;
}) {
  const config = CONTENT_CONFIG[type];

  const views = number(data?.views);
  const reads = number(data?.reads);
  const shares = number(data?.shares);

  const interactions =
    number(data?.reactions) + number(data?.likes);

  const events = number(data?.totalEvents);

  const readRate = percent(reads, views);
  const shareRate = percent(shares, views);

  const engagement = percent(
    reads + shares + interactions,
    views
  );

  const score = getScore(
    readRate,
    shareRate,
    engagement
  );

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-black/25 p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.14]">
      {/* Ambient glow */}
      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full blur-3xl ${config.iconBox}`}
      />

      {/* Header */}
      <div className="relative flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <ContentIcon type={type} />

          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-white">
              {config.label}
            </h3>

            <p className="mt-0.5 truncate text-[10px] text-gray-500">
              {config.description}
            </p>
          </div>
        </div>

        <div
          className={`flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[10px] ${config.badge}`}
        >
          <Activity size={11} />
          {formatNumber(events)}
        </div>
      </div>

      {/* Reach + Score */}
      <div className="relative mt-4 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3.5 py-3">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.14em] text-gray-600">
              Views
            </p>

            <p className="mt-0.5 text-2xl font-bold tracking-tight text-white">
              {formatNumber(views)}
            </p>
          </div>

          <ScoreBadge value={score} />
        </div>

        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.05]">
          <div
            className={`h-full rounded-full ${config.bar}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Core metrics */}
      <div className="mt-3 grid grid-cols-2 gap-1.5">
        <MiniMetric
          icon={<Eye size={12} />}
          label="Views"
          value={views}
        />

        <MiniMetric
          icon={<BookOpen size={12} />}
          label="Reads"
          value={reads}
        />

        <MiniMetric
          icon={<Share2 size={12} />}
          label="Shares"
          value={shares}
        />

        <MiniMetric
          icon={<Heart size={12} />}
          label="Interactions"
          value={interactions}
        />
      </div>

      {/* Intelligence */}
      <div className="mt-3 grid grid-cols-3 gap-2 border-t border-white/[0.05] pt-3">
        <IntelligenceMetric
          label="READ RATE"
          value={readRate}
        />

        <IntelligenceMetric
          label="SHARE RATE"
          value={shareRate}
        />

        <IntelligenceMetric
          label="ENGAGEMENT"
          value={engagement}
        />
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
    <section className="space-y-3">
      {/* Section heading */}
      <div>
        <div className="flex items-center gap-2">
          <Flame
            size={16}
            className="text-orange-400"
          />

          <h2 className="text-base font-semibold text-white">
            Content Intelligence
          </h2>
        </div>

        <p className="mt-1 text-xs text-gray-500">
          Performance across NationPath content ecosystems.
        </p>
      </div>

      {/* Content cards */}
      <div className="grid gap-3 lg:grid-cols-3">
        <ContentCard
          type="news"
          data={news}
        />

        <ContentCard
          type="editorial"
          data={editorial}
        />

        <ContentCard
          type="astro"
          data={astrology}
        />
      </div>
    </section>
  );
}