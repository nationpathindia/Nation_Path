"use client";

import {
  ArrowUpRight,
  BookOpen,
  Eye,
  FileText,
  Flame,
  MessageCircle,
  Share2,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export interface AnalyticsTopContentItem {
  id: string;
  title: string;

  views?: number;
  reads?: number;
  shares?: number;
  reactions?: number;

  score?: number;

  category?: {
    id?: string;
    name?: string | null;
  } | null;

  contentType?: "news" | "editorial" | "astro" | string;
}

interface AnalyticsTopContentProps {
  articles?: AnalyticsTopContentItem[];
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

function getTypeLabel(type?: string) {
  switch (type) {
    case "editorial":
      return "Editorial";

    case "astro":
      return "Astrology";

    default:
      return "News";
  }
}

function getTypeClass(type?: string) {
  switch (type) {
    case "editorial":
      return "bg-blue-500/10 text-blue-300";

    case "astro":
      return "bg-orange-500/10 text-orange-400";

    default:
      return "bg-emerald-500/10 text-emerald-400";
  }
}

function Metric({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Eye;
  value: number;
  label: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-1.5">
      <Icon
        size={12}
        strokeWidth={1.8}
        className="shrink-0 text-gray-600"
      />

      <span className="text-[11px] font-semibold tabular-nums text-gray-300">
        {compactNumber(value)}
      </span>

      <span className="text-[9px] uppercase tracking-wide text-gray-700">
        {label}
      </span>
    </div>
  );
}

function ContentRow({
  article,
  index,
}: {
  article: AnalyticsTopContentItem;
  index: number;
}) {
  const views = number(article.views);
  const reads = number(article.reads);
  const shares = number(article.shares);
  const reactions = number(article.reactions);

  const hasScore =
    typeof article.score === "number" &&
    Number.isFinite(article.score);

  const isFirst = index === 0;

  return (
    <article
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

        <div className="w-7 shrink-0 pt-0.5">
          <div
            className={[
              "flex h-7 w-7 items-center justify-center rounded-lg border",
              isFirst
                ? "border-orange-500/20 bg-orange-500/10 text-orange-400"
                : "border-white/[0.06] bg-white/[0.025] text-gray-600",
            ].join(" ")}
          >
            {isFirst ? (
              <Flame
                size={13}
                strokeWidth={1.8}
              />
            ) : (
              <span className="font-mono text-[10px] font-semibold">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
          </div>
        </div>

        {/* CONTENT */}

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-start gap-1.5">
                <h3
                  className={[
                    "line-clamp-2 leading-[1.4]",
                    "text-[13px] sm:text-[14px]",
                    "font-semibold tracking-[-0.01em]",
                    isFirst
                      ? "text-white"
                      : "text-gray-200",
                    "group-hover:text-white",
                  ].join(" ")}
                >
                  {article.title}
                </h3>

                <ArrowUpRight
                  size={11}
                  strokeWidth={1.8}
                  className="mt-0.5 hidden shrink-0 text-gray-700 transition group-hover:text-gray-400 sm:block"
                />
              </div>

              <div className="mt-1.5 flex min-w-0 items-center gap-1.5">
                <span className="truncate text-[10px] text-gray-600">
                  {article.category?.name || "Uncategorized"}
                </span>

                <span className="text-gray-800">
                  •
                </span>

                <span
                  className={[
                    "shrink-0 rounded-full px-1.5 py-0.5",
                    "text-[8px] font-medium uppercase tracking-[0.05em]",
                    getTypeClass(article.contentType),
                  ].join(" ")}
                >
                  {getTypeLabel(article.contentType)}
                </span>
              </div>
            </div>

            {/* API SCORE */}

            {hasScore && (
              <div className="hidden shrink-0 sm:block">
                <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.025] px-2 py-1.5">
                  <TrendingUp
                    size={11}
                    strokeWidth={1.8}
                    className="text-orange-400"
                  />

                  <div className="text-right">
                    <p className="font-mono text-[11px] font-semibold tabular-nums text-gray-300">
                      {article.score!.toLocaleString("en-IN")}
                    </p>

                    <p className="text-[8px] uppercase tracking-[0.07em] text-gray-700">
                      Score
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* METRICS */}

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2.5">
            <Metric
              icon={Eye}
              value={views}
              label="Views"
            />

            <Metric
              icon={BookOpen}
              value={reads}
              label="Reads"
            />

            <Metric
              icon={Share2}
              value={shares}
              label="Shares"
            />

            <Metric
              icon={MessageCircle}
              value={reactions}
              label="Reactions"
            />
          </div>

          {/* MOBILE SCORE */}

          {hasScore && (
            <div className="mt-2.5 flex items-center gap-1.5 sm:hidden">
              <Sparkles
                size={11}
                strokeWidth={1.8}
                className="text-orange-400"
              />

              <span className="font-mono text-[10px] font-semibold tabular-nums text-gray-400">
                {article.score!.toLocaleString("en-IN")}
              </span>

              <span className="text-[8px] uppercase tracking-[0.07em] text-gray-700">
                API score
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function AnalyticsTopContent({
  articles = [],
}: AnalyticsTopContentProps) {
  /*
   * Preserve the API-provided ordering.
   * The UI must not create a second ranking formula.
   */
  const visibleArticles = articles.slice(0, 10);

  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-black/25 backdrop-blur-xl">
      {/* HEADER */}

      <header className="flex items-center justify-between gap-4 border-b border-white/[0.06] px-4 py-4 sm:px-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-500/10">
              <Sparkles
                size={13}
                strokeWidth={1.8}
                className="text-orange-400"
              />
            </div>

            <div className="min-w-0">
              <h2 className="text-sm font-semibold tracking-[-0.01em] text-white">
                Top Content
              </h2>

              <p className="mt-0.5 hidden text-[10px] text-gray-600 sm:block">
                Highest-performing content from analytics data.
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

          <span className="text-[8px] font-medium uppercase tracking-[0.08em] text-gray-600">
            Top {visibleArticles.length}
          </span>
        </div>
      </header>

      {/* CONTENT */}

      {visibleArticles.length === 0 ? (
        <div className="flex min-h-[170px] items-center justify-center px-5 text-center">
          <div>
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025]">
              <FileText
                size={17}
                strokeWidth={1.7}
                className="text-gray-600"
              />
            </div>

            <p className="mt-3 text-xs font-medium text-gray-400">
              No top content available
            </p>

            <p className="mt-1 text-[10px] text-gray-700">
              Performance data will appear as analytics accumulate.
            </p>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.045]">
          {visibleArticles.map((article, index) => (
            <ContentRow
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

      {/* FOOTER */}

      {visibleArticles.length > 0 && (
        <footer className="flex items-center justify-between gap-3 border-t border-white/[0.05] px-4 py-2.5 sm:px-5">
          <span className="text-[9px] uppercase tracking-[0.07em] text-gray-700">
            API-ranked content
          </span>

          <div className="flex items-center gap-1.5 text-[9px] text-gray-700">
            <BookOpen
              size={10}
              strokeWidth={1.7}
            />

            <span>
              Views · Reads · Shares · Reactions
            </span>
          </div>
        </footer>
      )}
    </section>
  );
}