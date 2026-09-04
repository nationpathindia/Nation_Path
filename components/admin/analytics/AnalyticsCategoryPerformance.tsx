"use client";

import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Eye,
  FolderTree,
  Flame,
  Share2,
  TrendingUp,
  Users,
} from "lucide-react";

export interface AnalyticsCategoryItem {
  id: string;
  name: string;

  views?: number;
  reads?: number;
  shares?: number;
  events?: number;
  users?: number;
  growth?: number;
  score?: number;
  percentage?: number;
}

interface AnalyticsCategoryPerformanceProps {
  categories?: AnalyticsCategoryItem[];
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

function growthLabel(value: number) {
  if (value >= 50) return "Explosive";
  if (value >= 20) return "Growing";
  if (value > 0) return "Rising";
  return "Stable";
}

function growthClass(value: number) {
  if (value >= 50) return "text-emerald-400";
  if (value > 0) return "text-orange-400";
  return "text-gray-500";
}

function CategoryMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Eye;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] px-2.5 py-2">
      <div className="flex items-center gap-1.5">
        <Icon
          size={11}
          className="text-gray-600"
          strokeWidth={1.8}
        />

        <span className="text-[9px] uppercase tracking-wide text-gray-600">
          {label}
        </span>
      </div>

      <p className="mt-1 text-xs font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

function CategoryRow({
  item,
  index,
}: {
  item: AnalyticsCategoryItem;
  index: number;
}) {
  const views = number(item.views);
  const reads = number(item.reads);
  const shares = number(item.shares);
  const users = number(item.users);
  const events = number(item.events);

  const hasGrowth =
    typeof item.growth === "number" &&
    Number.isFinite(item.growth);

  const hasScore =
    typeof item.score === "number" &&
    Number.isFinite(item.score);

  const hasPercentage =
    typeof item.percentage === "number" &&
    Number.isFinite(item.percentage);

  return (
    <div className="group px-4 py-3.5 transition hover:bg-white/[0.025] sm:px-5">
      <div className="flex items-start gap-3">
        {/* Rank */}
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-[11px] font-bold ${
            index === 0
              ? "border-orange-500/20 bg-orange-500/10 text-orange-400"
              : "border-white/[0.06] bg-white/[0.025] text-gray-500"
          }`}
        >
          {index === 0 ? (
            <Flame size={13} />
          ) : (
            index + 1
          )}
        </div>

        {/* Main */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="truncate text-sm font-semibold text-gray-200 transition group-hover:text-white">
                  {item.name}
                </h3>

                <ArrowUpRight
                  size={12}
                  className="hidden shrink-0 text-gray-600 transition group-hover:text-gray-300 sm:block"
                />
              </div>

              <div className="mt-1 flex items-center gap-1.5">
                {hasGrowth && (
                  <>
                    <span className="text-[10px] text-gray-600">
                      {growthLabel(item.growth!)}
                    </span>

                    <span className="text-gray-700">
                      •
                    </span>

                    <span
                      className={`text-[10px] font-medium ${growthClass(
                        item.growth!
                      )}`}
                    >
                      {item.growth! > 0 ? "+" : ""}
                      {item.growth}%
                    </span>
                  </>
                )}

                {hasScore && (
                  <>
                    {hasGrowth && (
                      <span className="text-gray-700">
                        •
                      </span>
                    )}

                    <span className="text-[10px] text-gray-600">
                      Score {item.score}
                    </span>
                  </>
                )}
              </div>
            </div>

            {hasPercentage && (
              <div className="shrink-0 text-right">
                <p className="text-sm font-semibold text-white">
                  {item.percentage}%
                </p>

                <p className="text-[9px] text-gray-600">
                  Share
                </p>
              </div>
            )}
          </div>

          {/* Metrics */}
          <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-5">
            <CategoryMetric
              icon={Eye}
              label="Views"
              value={compactNumber(views)}
            />

            <CategoryMetric
              icon={BookOpen}
              label="Reads"
              value={compactNumber(reads)}
            />

            <CategoryMetric
              icon={Share2}
              label="Shares"
              value={compactNumber(shares)}
            />

            <CategoryMetric
              icon={Users}
              label="Users"
              value={compactNumber(users)}
            />

            <CategoryMetric
              icon={BarChart3}
              label="Events"
              value={compactNumber(events)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsCategoryPerformance({
  categories = [],
}: AnalyticsCategoryPerformanceProps) {
  /*
   * Preserve API ordering.
   * Do not calculate a new category ranking in the UI.
   */
  const data = categories.slice(0, 10);

  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-black/25 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] px-4 py-4 sm:px-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <FolderTree
              size={16}
              className="shrink-0 text-orange-400"
            />

            <h2 className="text-base font-semibold text-white">
              Category Intelligence
            </h2>
          </div>

          <p className="mt-1 text-[11px] text-gray-500">
            Category performance from audience behaviour.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.025] px-2.5 py-1.5 text-[9px] text-gray-500">
          <TrendingUp size={10} />
          TOP {data.length}
        </div>
      </div>

      {/* Content */}
      {data.length === 0 ? (
        <div className="flex h-36 items-center justify-center text-xs text-gray-500">
          No category intelligence data
        </div>
      ) : (
        <div className="divide-y divide-white/[0.05]">
          {data.map((item, index) => (
            <CategoryRow
              key={item.id || `${item.name}-${index}`}
              item={item}
              index={index}
            />
          ))}
        </div>
      )}

      {/* Footer */}
      {data.length > 0 && (
        <div className="border-t border-white/[0.05] px-4 py-2.5 sm:px-5">
          <span className="text-[10px] text-gray-600">
            Category order supplied by analytics API
          </span>
        </div>
      )}
    </section>
  );
}