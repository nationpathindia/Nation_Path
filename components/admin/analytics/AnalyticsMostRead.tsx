"use client";

import {
  ArrowUpRight,
  BookOpen,
  Eye,
  FileText,
  Medal,
  Share2,
} from "lucide-react";

export interface AnalyticsMostReadItem {
  id: string;
  title: string;
  views?: number;
  reads?: number;
  shares?: number;
  category?: {
    name?: string | null;
  } | null;
  contentType?:
    | "news"
    | "editorial"
    | "astro"
    | string;
}

interface AnalyticsMostReadProps {
  articles?: AnalyticsMostReadItem[];
}

function number(value?: number) {
  return Number(value) || 0;
}

function getReadRate(
  views: number,
  reads: number
) {
  if (views <= 0) {
    return 0;
  }

  return Math.min(
    100,
    (reads / views) * 100
  );
}

function getContentTypeLabel(
  contentType?: string
) {
  switch (contentType) {
    case "editorial":
      return "Editorial";

    case "astro":
      return "Astrology";

    case "news":
      return "News";

    default:
      return "News";
  }
}

function getContentTypeClass(
  contentType?: string
) {
  switch (contentType) {
    case "editorial":
      return "bg-[#163C80]/15 text-[#7FA1E0]";

    case "astro":
      return "bg-[#EA661B]/10 text-[#EA661B]";

    default:
      return "bg-emerald-500/10 text-emerald-400";
  }
}

function getRankClass(
  index: number
) {
  if (index === 0) {
    return "bg-[#EA661B]/10 text-[#EA661B]";
  }

  if (index === 1) {
    return "bg-white/[0.08] text-gray-300";
  }

  if (index === 2) {
    return "bg-[#163C80]/15 text-[#7FA1E0]";
  }

  return "bg-white/[0.035] text-gray-500";
}

function ArticleRow({
  article,
  index,
}: {
  article: AnalyticsMostReadItem;
  index: number;
}) {
  const views = number(article.views);
  const reads = number(article.reads);
  const shares = number(article.shares);

  const readRate = getReadRate(
    views,
    reads
  );

  return (
    <div className="group grid grid-cols-[40px_minmax(0,1fr)] gap-4 px-5 py-4 transition hover:bg-white/[0.025] md:grid-cols-[40px_minmax(0,1fr)_110px_110px_90px] md:items-center">
      {/* RANK */}

      <div
        className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${getRankClass(
          index
        )}`}
      >
        {index < 3 ? (
          <Medal
            size={15}
            strokeWidth={1.8}
          />
        ) : (
          index + 1
        )}
      </div>

      {/* ARTICLE */}

      <div className="min-w-0">
        <div className="flex min-w-0 items-center gap-2">
          <p className="truncate text-sm font-semibold text-gray-100 group-hover:text-white">
            {article.title}
          </p>

          <ArrowUpRight
            size={13}
            strokeWidth={1.8}
            className="hidden shrink-0 text-gray-600 transition group-hover:text-gray-400 sm:block"
          />
        </div>

        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <span className="truncate text-xs text-gray-500">
            {article.category?.name ||
              "Uncategorized"}
          </span>

          <span className="text-gray-700">
            •
          </span>

          <span
            className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium ${getContentTypeClass(
              article.contentType
            )}`}
          >
            {getContentTypeLabel(
              article.contentType
            )}
          </span>
        </div>

        {/* MOBILE METRICS */}

        <div className="mt-3 flex items-center gap-4 md:hidden">
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <Eye
              size={12}
              strokeWidth={1.8}
            />
            {views.toLocaleString()}
          </span>

          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <BookOpen
              size={12}
              strokeWidth={1.8}
            />
            {reads.toLocaleString()}
          </span>

          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <Share2
              size={12}
              strokeWidth={1.8}
            />
            {shares.toLocaleString()}
          </span>
        </div>
      </div>

      {/* VIEWS */}

      <div className="hidden md:block">
        <p className="text-xs text-gray-600">
          Views
        </p>

        <p className="mt-1 text-sm font-semibold text-gray-200">
          {views.toLocaleString()}
        </p>
      </div>

      {/* READS */}

      <div className="hidden md:block">
        <p className="text-xs text-gray-600">
          Reads
        </p>

        <p className="mt-1 text-sm font-semibold text-gray-200">
          {reads.toLocaleString()}
        </p>

        <div className="mt-2 h-1 w-20 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-[#EA661B]"
            style={{
              width: `${readRate}%`,
            }}
          />
        </div>
      </div>

      {/* SHARES */}

      <div className="hidden md:block">
        <p className="text-xs text-gray-600">
          Shares
        </p>

        <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-gray-200">
          <Share2
            size={13}
            strokeWidth={1.8}
            className="text-gray-500"
          />

          {shares.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default function AnalyticsMostRead({
  articles = [],
}: AnalyticsMostReadProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
      {/* HEADER */}

      <div className="flex flex-col gap-3 border-b border-white/[0.07] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen
              size={17}
              strokeWidth={1.8}
              className="text-[#EA661B]"
            />

            <h2 className="text-lg font-semibold text-white">
              Most Read
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Articles generating the strongest reading activity in the selected period.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <FileText
            size={13}
            strokeWidth={1.8}
          />

          Top {Math.min(
            articles.length,
            10
          )}
        </div>
      </div>

      {/* TABLE HEADER */}

      {articles.length > 0 && (
        <div className="hidden grid-cols-[40px_minmax(0,1fr)_110px_110px_90px] gap-4 border-b border-white/[0.06] px-5 py-3 md:grid">
          <div />

          <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-gray-600">
            Article
          </p>

          <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-gray-600">
            Views
          </p>

          <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-gray-600">
            Reads
          </p>

          <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-gray-600">
            Shares
          </p>
        </div>
      )}

      {/* CONTENT */}

      {articles.length === 0 ? (
        <div className="flex min-h-[180px] items-center justify-center px-5 text-center">
          <div>
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-gray-600">
              <BookOpen
                size={18}
                strokeWidth={1.8}
              />
            </div>

            <p className="mt-3 text-sm font-medium text-gray-400">
              No reading data available
            </p>

            <p className="mt-1 text-xs text-gray-600">
              Articles will appear here once reading events are recorded.
            </p>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.06]">
          {articles
            .slice(0, 10)
            .map((article, index) => (
              <ArticleRow
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

      {articles.length > 0 && (
        <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3">
          <p className="text-xs text-gray-600">
            Ranked by reading activity
          </p>

          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Eye
              size={12}
              strokeWidth={1.8}
            />

            Content intelligence
          </div>
        </div>
      )}
    </section>
  );
}

