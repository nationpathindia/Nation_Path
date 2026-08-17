"use client";

import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Eye,
  FolderTree,
  Share2,
  TrendingUp,
} from "lucide-react";

export interface AnalyticsCategoryItem {
  id: string;
  name: string;

  views?: number;
  reads?: number;
  shares?: number;
  events?: number;
  score?: number;

  percentage?: number;
}

interface AnalyticsCategoryPerformanceProps {
  categories?: AnalyticsCategoryItem[];
}

function number(value?: number) {
  return Number(value) || 0;
}

function getScore(
  category: AnalyticsCategoryItem
) {
  if (
    typeof category.score === "number" &&
    Number.isFinite(category.score)
  ) {
    return category.score;
  }

  return (
    number(category.views) +
    number(category.reads) * 2 +
    number(category.shares) * 3
  );
}

function getPerformanceLabel(score: number) {
  if (score >= 1000) {
    return "Leading";
  }

  if (score >= 500) {
    return "Strong";
  }

  if (score >= 100) {
    return "Growing";
  }

  return "Emerging";
}

function getPerformanceClass(score: number) {
  if (score >= 500) {
    return "text-emerald-400";
  }

  if (score >= 100) {
    return "text-[#EA661B]";
  }

  return "text-gray-500";
}

function CategoryRow({
  category,
  index,
  maxViews,
}: {
  category: AnalyticsCategoryItem;
  index: number;
  maxViews: number;
}) {
  const views = number(category.views);
  const reads = number(category.reads);
  const shares = number(category.shares);
  const events = number(category.events);

  const score = getScore(category);

  const percentage =
    typeof category.percentage === "number"
      ? category.percentage
      : maxViews > 0
        ? (views / maxViews) * 100
        : 0;

  const performanceLabel =
    getPerformanceLabel(score);

  return (
    <div className="group px-5 py-4 transition hover:bg-white/[0.025]">
      <div className="flex gap-4">
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
        </div>

        {/* CONTENT */}

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold text-gray-100 group-hover:text-white">
                  {category.name}
                </p>

                <ArrowUpRight
                  size={13}
                  strokeWidth={1.8}
                  className="hidden shrink-0 text-gray-700 sm:block"
                />
              </div>

              <div className="mt-1.5 flex items-center gap-2">
                <span className="text-xs text-gray-600">
                  {events.toLocaleString()} events
                </span>

                <span className="text-gray-700">
                  •
                </span>

                <span
                  className={`text-xs font-medium ${getPerformanceClass(
                    score
                  )}`}
                >
                  {performanceLabel}
                </span>
              </div>
            </div>

            {/* SCORE */}

            <div className="shrink-0 text-right">
              <p
                className={`text-sm font-semibold ${getPerformanceClass(
                  score
                )}`}
              >
                {score.toLocaleString()}
              </p>

              <p className="mt-0.5 text-[10px] text-gray-600">
                performance score
              </p>
            </div>
          </div>

          {/* PERFORMANCE BAR */}

          <div className="mt-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] uppercase tracking-[0.07em] text-gray-600">
                Audience activity
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
                    3,
                    Math.min(100, percentage)
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* METRICS */}

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <CategoryMetric
              icon={Eye}
              label="Views"
              value={views}
            />

            <CategoryMetric
              icon={BookOpen}
              label="Reads"
              value={reads}
            />

            <CategoryMetric
              icon={Share2}
              label="Shares"
              value={shares}
            />

            <CategoryMetric
              icon={BarChart3}
              label="Events"
              value={events}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Eye;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon
        size={13}
        strokeWidth={1.8}
        className="shrink-0 text-gray-500"
      />

      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-[0.06em] text-gray-600">
          {label}
        </p>

        <p className="mt-0.5 text-xs font-semibold text-gray-300">
          {value.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default function AnalyticsCategoryPerformance({
  categories = [],
}: AnalyticsCategoryPerformanceProps) {
  const visibleCategories =
    categories.slice(0, 10);

  const maxViews = Math.max(
    ...visibleCategories.map((item) =>
      number(item.views)
    ),
    1
  );

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
      {/* HEADER */}

      <div className="flex flex-col gap-3 border-b border-white/[0.07] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <FolderTree
              size={17}
              strokeWidth={1.8}
              className="text-[#EA661B]"
            />

            <h2 className="text-lg font-semibold text-white">
              Category Performance
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Which content categories are generating the strongest audience engagement.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <TrendingUp
            size={13}
            strokeWidth={1.8}
            className="text-[#EA661B]"
          />

          Engagement ranking
        </div>
      </div>

      {/* CONTENT */}

      {visibleCategories.length === 0 ? (
        <div className="flex min-h-[180px] items-center justify-center px-5 text-center">
          <div>
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-gray-600">
              <FolderTree
                size={18}
                strokeWidth={1.8}
              />
            </div>

            <p className="mt-3 text-sm font-medium text-gray-400">
              No category analytics available
            </p>

            <p className="mt-1 text-xs text-gray-600">
              Category performance will appear as analytics events accumulate.
            </p>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.06]">
          {visibleCategories.map(
            (category, index) => (
              <CategoryRow
                key={
                  category.id ||
                  `${index}-${category.name}`
                }
                category={category}
                index={index}
                maxViews={maxViews}
              />
            )
          )}
        </div>
      )}

      {/* FOOTER */}

      {visibleCategories.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] px-5 py-3">
          <p className="text-xs text-gray-600">
            Top {visibleCategories.length} categories
          </p>

          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <TrendingUp
              size={12}
              strokeWidth={1.8}
            />

            Ranked by engagement
          </div>
        </div>
      )}
    </section>
  );
}

