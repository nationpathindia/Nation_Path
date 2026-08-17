"use client";

import {
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
  opens?: number;
  shares?: number;
  reactions?: number;

  score?: number;

  category?: {
    id?: string;
    name?: string | null;
  } | null;

  contentType?:
    | "news"
    | "editorial"
    | "astro"
    | string;
}

interface AnalyticsTopContentProps {
  articles?: AnalyticsTopContentItem[];
}

function number(value?: number) {
  return Number(value) || 0;
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
      return "bg-[#163C80]/15 text-[#7FA1E0]";

    case "astro":
      return "bg-[#EA661B]/10 text-[#EA661B]";

    default:
      return "bg-emerald-500/10 text-emerald-400";
  }
}

function calculateScore(
  article: AnalyticsTopContentItem
) {
  if (
    typeof article.score === "number" &&
    Number.isFinite(article.score)
  ) {
    return article.score;
  }

  return (
    number(article.views) +
    number(article.opens) +
    number(article.reads) * 2 +
    number(article.shares) * 3 +
    number(article.reactions) * 2
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
  const opens = number(article.opens);
  const reads = number(article.reads);
  const shares = number(article.shares);
  const reactions = number(article.reactions);

  const score = calculateScore(article);

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

        {/* CONTENT */}

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-start gap-2">
                {index === 0 && (
                  <Flame
                    size={14}
                    strokeWidth={2}
                    className="mt-0.5 shrink-0 text-[#EA661B]"
                  />
                )}

                <p className="line-clamp-2 text-sm font-semibold leading-5 text-gray-100 group-hover:text-white">
                  {article.title}
                </p>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2">
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

            {/* SCORE */}

            <div className="hidden shrink-0 text-right sm:block">
              <div className="flex items-center justify-end gap-1.5">
                <TrendingUp
                  size={12}
                  strokeWidth={1.8}
                  className="text-[#EA661B]"
                />

                <span className="text-xs font-semibold text-gray-300">
                  {score.toLocaleString()}
                </span>
              </div>

              <p className="mt-1 text-[10px] text-gray-600">
                intelligence score
              </p>
            </div>
          </div>

          {/* METRICS */}

          <div className="mt-4 grid grid-cols-2 gap-y-3 sm:flex sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Eye
                size={12}
                strokeWidth={1.8}
              />

              <span className="font-medium text-gray-400">
                {views.toLocaleString()}
              </span>

              <span className="hidden text-gray-700 sm:inline">
                views
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <FileText
                size={12}
                strokeWidth={1.8}
              />

              <span className="font-medium text-gray-400">
                {opens.toLocaleString()}
              </span>

              <span className="hidden text-gray-700 sm:inline">
                opens
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <BookOpen
                size={12}
                strokeWidth={1.8}
              />

              <span className="font-medium text-gray-400">
                {reads.toLocaleString()}
              </span>

              <span className="hidden text-gray-700 sm:inline">
                reads
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Share2
                size={12}
                strokeWidth={1.8}
              />

              <span className="font-medium text-gray-400">
                {shares.toLocaleString()}
              </span>

              <span className="hidden text-gray-700 sm:inline">
                shares
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <MessageCircle
                size={12}
                strokeWidth={1.8}
              />

              <span className="font-medium text-gray-400">
                {reactions.toLocaleString()}
              </span>

              <span className="hidden text-gray-700 sm:inline">
                reactions
              </span>
            </div>
          </div>

          {/* MOBILE SCORE */}

          <div className="mt-3 flex items-center gap-1.5 sm:hidden">
            <Sparkles
              size={12}
              strokeWidth={1.8}
              className="text-[#EA661B]"
            />

            <span className="text-xs font-medium text-gray-400">
              {score.toLocaleString()}
            </span>

            <span className="text-[10px] text-gray-600">
              intelligence score
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsTopContent({
  articles = [],
}: AnalyticsTopContentProps) {
  const visibleArticles =
    articles.slice(0, 10);

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
      {/* HEADER */}

      <div className="flex flex-col gap-3 border-b border-white/[0.07] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles
              size={17}
              strokeWidth={1.8}
              className="text-[#EA661B]"
            />

            <h2 className="text-lg font-semibold text-white">
              Top Content
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Highest-performing content across views, reads and engagement.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <TrendingUp
            size={13}
            strokeWidth={1.8}
            className="text-[#EA661B]"
          />

          Content intelligence
        </div>
      </div>

      {/* CONTENT */}

      {visibleArticles.length === 0 ? (
        <div className="flex min-h-[200px] items-center justify-center px-5 text-center">
          <div>
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-gray-600">
              <FileText
                size={18}
                strokeWidth={1.8}
              />
            </div>

            <p className="mt-3 text-sm font-medium text-gray-400">
              No top content available
            </p>

            <p className="mt-1 text-xs text-gray-600">
              Content performance will appear as engagement accumulates.
            </p>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.06]">
          {visibleArticles.map(
            (article, index) => (
              <ContentRow
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

      {visibleArticles.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] px-5 py-3">
          <p className="text-xs text-gray-600">
            Top {visibleArticles.length} performing items
          </p>

          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <BookOpen
              size={12}
              strokeWidth={1.8}
            />

            Views • Reads • Shares • Reactions
          </div>
        </div>
      )}
    </section>
  );
}

