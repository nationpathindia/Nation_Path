"use client";

import {
  ArrowUpRight,
  BookOpen,
  Flame,
  Eye,
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
  return Number(value) || 0;
}

function getTypeLabel(
  type?: string
) {
  switch (type) {
    case "editorial":
      return "Editorial";

    case "astro":
      return "Astrology";

    default:
      return "News";
  }
}

function getTypeClass(
  type?: string
) {
  switch (type) {
    case "editorial":
      return "bg-[#163C80]/15 text-[#7FA1E0]";

    case "astro":
      return "bg-[#EA661B]/10 text-[#EA661B]";

    default:
      return "bg-emerald-500/10 text-emerald-400";
  }
}

function calculateMomentum(
  article: AnalyticsTrendingItem
) {
  if (
    typeof article.score ===
      "number" &&
    Number.isFinite(article.score)
  ) {
    return article.score;
  }

  return (
    number(article.views) +
    number(article.reads) * 2 +
    number(article.shares) * 3
  );
}

function getMomentumLabel(
  score: number
) {
  if (score >= 1000) {
    return "Very High";
  }

  if (score >= 500) {
    return "High";
  }

  if (score >= 100) {
    return "Rising";
  }

  return "Building";
}

function getMomentumClass(
  score: number
) {
  if (score >= 500) {
    return "text-emerald-400";
  }

  if (score >= 100) {
    return "text-[#EA661B]";
  }

  return "text-gray-500";
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

  const momentum =
    calculateMomentum(article);

  const momentumLabel =
    getMomentumLabel(momentum);

  return (
    <div className="group flex gap-4 px-5 py-4 transition hover:bg-white/[0.025]">
      {/* RANK */}

      <div className="flex w-8 shrink-0 flex-col items-center">
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

        {index < 9 && (
          <div className="mt-2 h-full w-px bg-white/[0.05]" />
        )}
      </div>

      {/* CONTENT */}

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              {index === 0 && (
                <Flame
                  size={14}
                  strokeWidth={2}
                  className="shrink-0 text-[#EA661B]"
                />
              )}

              <p className="truncate text-sm font-semibold text-gray-100 group-hover:text-white">
                {article.title}
              </p>

              <ArrowUpRight
                size={13}
                strokeWidth={1.8}
                className="hidden shrink-0 text-gray-700 sm:block"
              />
            </div>

            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-500">
                {article.category?.name ||
                  "Uncategorized"}
              </span>

              <span className="text-gray-700">
                •
              </span>

              <span
                className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium ${getTypeClass(
                  article.contentType
                )}`}
              >
                {getTypeLabel(
                  article.contentType
                )}
              </span>
            </div>
          </div>

          {/* MOMENTUM */}

          <div className="hidden shrink-0 text-right sm:block">
            <p
              className={`text-xs font-semibold ${getMomentumClass(
                momentum
              )}`}
            >
              {momentumLabel}
            </p>

            <p className="mt-1 text-[10px] text-gray-600">
              {momentum.toLocaleString()} score
            </p>
          </div>
        </div>

        {/* METRICS */}

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Eye
              size={12}
              strokeWidth={1.8}
            />

            <span>
              {views.toLocaleString()}
            </span>

            <span className="text-gray-700">
              views
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <BookOpen
              size={12}
              strokeWidth={1.8}
            />

            <span>
              {reads.toLocaleString()}
            </span>

            <span className="text-gray-700">
              reads
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Share2
              size={12}
              strokeWidth={1.8}
            />

            <span>
              {shares.toLocaleString()}
            </span>

            <span className="text-gray-700">
              shares
            </span>
          </div>
        </div>

        {/* MOBILE MOMENTUM */}

        <div className="mt-3 flex items-center gap-1.5 sm:hidden">
          <TrendingUp
            size={12}
            strokeWidth={1.8}
            className={getMomentumClass(
              momentum
            )}
          />

          <span
            className={`text-xs font-medium ${getMomentumClass(
              momentum
            )}`}
          >
            {momentumLabel}
          </span>

          <span className="text-[10px] text-gray-700">
            {momentum.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsTrending({
  articles = [],
}: AnalyticsTrendingProps) {
  const visibleArticles =
    articles.slice(0, 10);

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
      {/* HEADER */}

      <div className="flex flex-col gap-3 border-b border-white/[0.07] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp
              size={17}
              strokeWidth={1.8}
              className="text-[#EA661B]"
            />

            <h2 className="text-lg font-semibold text-white">
              Trending
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Content showing the strongest engagement momentum.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Flame
            size={13}
            strokeWidth={1.8}
            className="text-[#EA661B]"
          />

          Live momentum
        </div>
      </div>

      {/* CONTENT */}

      {visibleArticles.length ===
      0 ? (
        <div className="flex min-h-[180px] items-center justify-center px-5 text-center">
          <div>
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-gray-600">
              <TrendingUp
                size={18}
                strokeWidth={1.8}
              />
            </div>

            <p className="mt-3 text-sm font-medium text-gray-400">
              No trending data available
            </p>

            <p className="mt-1 text-xs text-gray-600">
              Trending content will appear as engagement accumulates.
            </p>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.06]">
          {visibleArticles.map(
            (article, index) => (
              <TrendingRow
                key={
                  article.id ||
                  `${index}-${article.title}`
                }
                article={article}
                index={index}
              />
            )
          )}
        </div>
      )}

      {/* FOOTER */}

      {visibleArticles.length >
        0 && (
        <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3">
          <p className="text-xs text-gray-600">
            Ranked by engagement momentum
          </p>

          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <TrendingUp
              size={12}
              strokeWidth={1.8}
            />

            Real-time analytics
          </div>
        </div>
      )}
    </section>
  );
}

