"use client";

import {
  ArrowUpRight,
  BookOpen,
  Eye,
  Flame,
  Share2,
  TrendingUp,
} from "lucide-react";

export interface AnalyticsTrendingItem {
  id: string;
  title: string;

  views?: number;
  reads?: number;
  shares?: number;
  score?: number;

  category?: {
    name?: string | null;
  } | null;

  contentType?:
    | "news"
    | "editorial"
    | "astro"
    | string;
}

interface AnalyticsTrendingProps {
  articles?: AnalyticsTrendingItem[];
}

function number(value?: number) {
  return Number.isFinite(value) ? Number(value) : 0;
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

function typeLabel(type?: string) {
  if (type === "astro") return "Astro";
  if (type === "editorial") return "Editorial";
  return "News";
}

function typeStyle(type?: string) {
  if (type === "astro") {
    return "bg-orange-500/10 text-orange-400";
  }

  if (type === "editorial") {
    return "bg-blue-500/10 text-blue-300";
  }

  return "bg-emerald-500/10 text-emerald-400";
}

function momentumLabel(score?: number) {
  if (typeof score !== "number") {
    return "Trending";
  }

  if (score >= 1000) return "Viral";
  if (score >= 500) return "Hot";
  if (score >= 100) return "Rising";

  return "Building";
}

function rankStyle(index: number) {
  if (index === 0) {
    return "border-orange-500/20 bg-orange-500/10 text-orange-400";
  }

  if (index === 1) {
    return "border-white/10 bg-white/[0.06] text-gray-300";
  }

  if (index === 2) {
    return "border-blue-500/15 bg-blue-500/10 text-blue-300";
  }

  return "border-white/[0.06] bg-white/[0.025] text-gray-500";
}

function TrendingRow({
  article,
  index,
}: {
  article: AnalyticsTrendingItem;
  index: number;
}) {
  const views = number(article.views);
  const reads = number(article.reads);
  const shares = number(article.shares);

  const hasScore =
    typeof article.score === "number" &&
    Number.isFinite(article.score);

  const score = hasScore ? article.score! : null;

  return (
    <div className="group flex items-center gap-3 px-4 py-3 transition hover:bg-white/[0.025] sm:px-5">
      {/* Rank */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-[11px] font-bold ${rankStyle(
          index
        )}`}
      >
        {index === 0 ? (
          <Flame size={13} />
        ) : (
          index + 1
        )}
      </div>

      {/* Main content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="truncate text-xs font-semibold text-gray-200 transition group-hover:text-white sm:text-sm">
            {article.title}
          </p>

          <ArrowUpRight
            size={12}
            className="hidden shrink-0 text-gray-600 transition group-hover:text-gray-300 sm:block"
          />
        </div>

        <div className="mt-1.5 flex min-w-0 items-center gap-1.5">
          <span className="truncate text-[10px] text-gray-500">
            {article.category?.name || "Uncategorized"}
          </span>

          <span className="text-gray-700">•</span>

          <span
            className={`shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-semibold ${typeStyle(
              article.contentType
            )}`}
          >
            {typeLabel(article.contentType)}
          </span>

          {hasScore && (
            <>
              <span className="text-gray-700">•</span>

              <span className="flex items-center gap-1 text-[9px] text-orange-400">
                <TrendingUp size={10} />
                {momentumLabel(score ?? undefined)}
              </span>
            </>
          )}
        </div>

        {/* Metrics */}
        <div className="mt-2.5 flex items-center gap-4">
          <Metric
            icon={<Eye size={11} />}
            value={views}
          />

          <Metric
            icon={<BookOpen size={11} />}
            value={reads}
          />

          <Metric
            icon={<Share2 size={11} />}
            value={shares}
          />
        </div>
      </div>

      {/* Score */}
      {hasScore && (
        <div className="hidden shrink-0 text-right sm:block">
          <p className="text-[8px] uppercase tracking-wider text-gray-600">
            Score
          </p>

          <p className="mt-0.5 text-xs font-semibold text-white">
            {score}
          </p>
        </div>
      )}

      <ArrowUpRight
        size={13}
        className="hidden shrink-0 text-gray-700 transition group-hover:text-gray-300 md:block"
      />
    </div>
  );
}

function Metric({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: number;
}) {
  return (
    <span className="flex items-center gap-1 text-[10px] text-gray-500">
      {icon}
      {compactNumber(value)}
    </span>
  );
}

export default function AnalyticsTrending({
  articles = [],
}: AnalyticsTrendingProps) {
  const data = articles.slice(0, 10);

  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-black/25 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] px-4 py-4 sm:px-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Flame
              size={16}
              className="shrink-0 text-orange-400"
            />

            <h2 className="text-base font-semibold text-white">
              Trending Intelligence
            </h2>
          </div>

          <p className="mt-1 text-[11px] text-gray-500">
            Content momentum from current analytics data.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 rounded-lg border border-orange-500/15 bg-orange-500/[0.07] px-2.5 py-1.5 text-[9px] font-semibold text-orange-400">
          <TrendingUp size={10} />
          TRENDING
        </div>
      </div>

      {/* Content */}
      {data.length === 0 ? (
        <div className="flex h-36 items-center justify-center text-xs text-gray-500">
          No trending activity yet
        </div>
      ) : (
        <div className="divide-y divide-white/[0.05]">
          {data.map((article, index) => (
            <TrendingRow
              key={
                article.id ||
                `${index}-${article.title}`
              }
              article={article}
              index={index}
            />
          ))}
        </div>
      )}

      {/* Footer */}
      {data.length > 0 && (
        <div className="border-t border-white/[0.05] px-4 py-2.5 sm:px-5">
          <span className="text-[10px] text-gray-600">
            Ranked using analytics-provided trending data
          </span>
        </div>
      )}
    </section>
  );
}