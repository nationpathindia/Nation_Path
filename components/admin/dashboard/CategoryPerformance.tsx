"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ReferenceLine,
  LabelList,
} from "recharts";
import {
  BarChart3,
  Search,
  X,
  Eye,
  FileText,
  Activity,
  ChevronRight,
  Maximize2,
} from "lucide-react";

interface Props {
  data: any[];
}

const CATEGORY_COLORS = [
  "#13B8C8",
  "#087D8A",
  "#21A477",
  "#3986D7",
  "#8B5CF6",
  "#D97706",
  "#EF5350",
  "#64748B",
  "#0F766E",
  "#7C3AED",
];

function formatNumber(value: number) {
  return Number(value || 0).toLocaleString("en-IN");
}

function Metric({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-[var(--admin-border)] bg-white px-4 py-3.5 shadow-[var(--admin-shadow-sm)]">
      <div className="pointer-events-none absolute -right-5 -top-5 h-16 w-16 rounded-full bg-[var(--admin-primary)] opacity-[0.06] blur-2xl" />

      <div className="relative flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="admin-label truncate">{label}</p>

          <p
            className="admin-metric mt-2 truncate"
            title={String(value)}
          >
            {value}
          </p>
        </div>

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--admin-border)] bg-[var(--admin-primary-soft)] text-[var(--admin-primary-dark)]">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function CategoryPerformance({ data }: Props) {
  const categories = Array.isArray(data) ? data : [];

  const [showBreakdown, setShowBreakdown] = useState(false);
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  const totalCategories = categories.length;

  const totalArticles = categories.reduce(
    (sum, item) => sum + Number(item?.articles || 0),
    0
  );

  const totalViews = categories.reduce(
    (sum, item) => sum + Number(item?.views || 0),
    0
  );

  const sortedCategories = useMemo(() => {
    return [...categories].sort(
      (a, b) => Number(b?.views || 0) - Number(a?.views || 0)
    );
  }, [categories]);

  const topCategory = sortedCategories[0] || {
    name: "-",
    views: 0,
    articles: 0,
  };

  const topThree = sortedCategories.slice(0, 3);

  // Main chart intentionally remains TOP 10.
  const chartData = sortedCategories.slice(0, 10);

  // Modal contains ALL categories.
  const filteredBreakdown = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return sortedCategories;

    return sortedCategories.filter((category) =>
      String(category?.name || "")
        .toLowerCase()
        .includes(query)
    );
  }, [search, sortedCategories]);

  useEffect(() => {
    setMounted(true);

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!showBreakdown) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowBreakdown(false);
        setSearch("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [showBreakdown]);

  const closeBreakdown = () => {
    setShowBreakdown(false);
    setSearch("");
  };

  return (
    <>
      {/* =========================================================
          MAIN CATEGORY PERFORMANCE CARD
      ========================================================= */}
      <section className="relative overflow-hidden rounded-2xl border border-[var(--admin-border)] bg-white shadow-[var(--admin-shadow-md)]">
        {/* GLOBAL CARD TECHNICAL BACKGROUND */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.50]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(19,184,200,0.055) 1px, transparent 1px),
                linear-gradient(90deg, rgba(19,184,200,0.055) 1px, transparent 1px)
              `,
              backgroundSize: "28px 28px",
            }}
          />

          <div
            className="absolute inset-x-0 top-0 h-32 opacity-[0.32]"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent 0px,
                  transparent 7px,
                  rgba(19,184,200,0.085) 8px,
                  transparent 10px
                )
              `,
            }}
          />

          <div
            className="absolute inset-x-0 top-0 h-20 opacity-[0.22]"
            style={{
              background:
                "linear-gradient(180deg, rgba(19,184,200,0.12), transparent)",
            }}
          />

          <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-[var(--admin-primary)] opacity-[0.055] blur-3xl" />

          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[var(--admin-primary-dark)] opacity-[0.03] blur-3xl" />
        </div>

        {/* TOP GRADIENT / TELEMETRY LINE */}
        <div className="relative h-1 w-full bg-gradient-to-r from-[var(--admin-primary-dark)] via-[var(--admin-primary)] to-[var(--admin-success)]" />

        {/* HEADER */}
        <div className="relative border-b border-[var(--admin-border)] bg-white/90 px-4 py-4 backdrop-blur-sm sm:px-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--admin-border)] bg-[var(--admin-primary-soft)] text-[var(--admin-primary-dark)]">
                <BarChart3 size={19} strokeWidth={2.1} />

                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[var(--admin-success)] shadow-[0_0_0_3px_white]" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[15px] font-bold tracking-tight text-[var(--admin-text)] sm:text-base">
                    Category Performance
                  </h2>

                  <span className="rounded-md border border-[var(--admin-primary)]/15 bg-[var(--admin-primary-soft)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--admin-primary-dark)]">
                    Traffic Matrix
                  </span>
                </div>

                <p className="mt-1 text-[11px] leading-5 text-[var(--admin-text-muted)]">
                  Category-wise traffic and content intelligence
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-1.5 rounded-md border border-[var(--admin-border)] bg-[var(--admin-surface-soft)] px-2 py-1.5 sm:flex">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--admin-success)]" />

                <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--admin-text-muted)]">
                  Live Dataset
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShowBreakdown(true)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--admin-border)] bg-white px-3 py-2 text-[11px] font-bold text-[var(--admin-text-secondary)] transition-all hover:-translate-y-0.5 hover:border-[var(--admin-primary)] hover:bg-[var(--admin-primary-soft)] hover:text-[var(--admin-primary-dark)]"
              >
                Full Breakdown
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* SUMMARY METRICS */}
        <div className="relative grid grid-cols-2 gap-3 border-b border-[var(--admin-border)] bg-white/70 p-4 backdrop-blur-[2px] sm:grid-cols-4">
          <Metric
            label="Categories"
            value={formatNumber(totalCategories)}
            icon={<BarChart3 size={15} />}
          />

          <Metric
            label="Published Articles"
            value={formatNumber(totalArticles)}
            icon={<FileText size={15} />}
          />

          <Metric
            label="Total Views"
            value={formatNumber(totalViews)}
            icon={<Eye size={15} />}
          />

          <Metric
            label="Top Category"
            value={topCategory.name || "-"}
            icon={<Activity size={15} />}
          />
        </div>

        {/* TOP THREE */}
        {topThree.length > 0 && (
          <div className="relative border-b border-[var(--admin-border)] bg-white/65 px-4 py-4 backdrop-blur-[2px] sm:px-5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--admin-text-muted)]">
                  Leading Categories
                </p>

                <p className="mt-0.5 text-[11px] text-[var(--admin-text-muted)]">
                  Highest view contribution
                </p>
              </div>

              <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--admin-primary-dark)]">
                TOP 03
              </span>
            </div>

            <div className="grid gap-2.5 md:grid-cols-3">
              {topThree.map((category, index) => {
                const views = Number(category?.views || 0);
                const articles = Number(category?.articles || 0);

                const percentage = totalViews
                  ? ((views / totalViews) * 100).toFixed(1)
                  : "0.0";

                const categoryColor =
                  CATEGORY_COLORS[index % CATEGORY_COLORS.length];

                return (
                  <div
                    key={`${category?.name}-${index}`}
                    className="group relative overflow-hidden rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-soft)] px-3.5 py-3 transition-all hover:-translate-y-0.5 hover:border-[var(--admin-primary)] hover:shadow-[var(--admin-shadow-sm)]"
                  >
                    <div
                      className="absolute bottom-0 left-0 top-0 w-[3px]"
                      style={{ background: categoryColor }}
                    />

                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      style={{
                        backgroundImage: `
                          linear-gradient(
                            rgba(19,184,200,0.045) 1px,
                            transparent 1px
                          ),
                          linear-gradient(
                            90deg,
                            rgba(19,184,200,0.045) 1px,
                            transparent 1px
                          )
                        `,
                        backgroundSize: "18px 18px",
                      }}
                    />

                    <div className="relative flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-extrabold"
                          style={{
                            background: `${categoryColor}18`,
                            color: categoryColor,
                          }}
                        >
                          {index + 1}
                        </span>

                        <div className="min-w-0">
                          <p
                            className="truncate text-[12px] font-bold text-[var(--admin-text)]"
                            title={category?.name || ""}
                          >
                            {category?.name || "-"}
                          </p>

                          <p className="mt-0.5 text-[10px] text-[var(--admin-text-muted)]">
                            {formatNumber(articles)} articles
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-[12px] font-extrabold tabular-nums text-[var(--admin-text)]">
                          {formatNumber(views)}
                        </p>

                        <p className="mt-0.5 text-[9px] font-semibold text-[var(--admin-success)]">
                          {percentage}%
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================
            TRAFFIC MATRIX
        ========================================================= */}
        <div className="relative px-3 pb-3 pt-4 sm:px-5 sm:pb-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--admin-text-muted)]">
                Traffic Matrix / TOP 10
              </p>

              <div className="mt-1 flex items-center gap-2">
                <span className="text-[10px] text-[var(--admin-text-muted)]">
                  View distribution by category
                </span>

                <span className="h-1 w-1 rounded-full bg-[var(--admin-primary)]" />

                <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--admin-success)]">
                  SYS OK
                </span>
              </div>
            </div>

            <div className="hidden text-right sm:block">
              <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[var(--admin-text-muted)]">
                View Index
              </p>

              <p className="mt-0.5 text-[9px] text-[var(--admin-text-secondary)]">
                LOW → HIGH
              </p>
            </div>
          </div>

          {chartData.length === 0 ? (
            <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-dashed border-[var(--admin-border-strong)] bg-[var(--admin-surface-soft)]">
              <div className="text-center">
                <BarChart3
                  size={25}
                  className="mx-auto text-[var(--admin-text-muted)]"
                />

                <p className="mt-2 text-xs font-semibold text-[var(--admin-text-secondary)]">
                  No category data available
                </p>
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-soft)]">
              {/* =====================================================
                  ACTUAL CHART BACKGROUND GRID
                  THIS IS THE IMPORTANT VISIBLE TREND-LINE LAYER
              ===================================================== */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.72]"
                style={{
                  backgroundImage: `
                    linear-gradient(
                      rgba(19,184,200,0.085) 1px,
                      transparent 1px
                    ),
                    linear-gradient(
                      90deg,
                      rgba(19,184,200,0.085) 1px,
                      transparent 1px
                    )
                  `,
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Finer secondary grid */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.46]"
                style={{
                  backgroundImage: `
                    linear-gradient(
                      rgba(8,125,138,0.045) 1px,
                      transparent 1px
                    ),
                    linear-gradient(
                      90deg,
                      rgba(8,125,138,0.045) 1px,
                      transparent 1px
                    )
                  `,
                  backgroundSize: "8px 8px",
                }}
              />

              {/* Horizontal technical scan lines */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.52]"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(
                      0deg,
                      transparent 0px,
                      transparent 9px,
                      rgba(8,125,138,0.065) 10px,
                      transparent 11px
                    )
                  `,
                }}
              />

              {/* Vertical scan lines */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.24]"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(
                      90deg,
                      transparent 0px,
                      transparent 23px,
                      rgba(19,184,200,0.07) 24px,
                      transparent 25px
                    )
                  `,
                }}
              />

              {/* Chart glow / depth */}
              <div className="pointer-events-none absolute -right-20 top-0 h-56 w-56 rounded-full bg-[var(--admin-primary)] opacity-[0.055] blur-3xl" />

              <div className="pointer-events-none absolute -bottom-24 left-10 h-52 w-52 rounded-full bg-[var(--admin-success)] opacity-[0.025] blur-3xl" />

              {/* Technical top labels */}
              <div className="pointer-events-none absolute left-3 right-3 top-2 z-20 flex items-center justify-between">
                <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-[var(--admin-primary-dark)] opacity-80">
                  CATEGORY // VIEW_STREAM
                </span>

                <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-[var(--admin-text-muted)] opacity-80">
                  01 — {String(chartData.length).padStart(2, "0")}
                </span>
              </div>

              <div className="relative h-[340px] px-1 pb-1 pt-5 sm:h-[370px] sm:px-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{
                      top: 8,
                      right: 58,
                      bottom: 8,
                      left: 4,
                    }}
                    barCategoryGap="20%"
                  >
                    {/* RECHARTS GRID LINES */}
                    <CartesianGrid
                      horizontal
                      vertical
                      stroke="rgba(8,125,138,0.22)"
                      strokeDasharray="4 5"
                      strokeWidth={1}
                    />

                    <XAxis
                      type="number"
                      axisLine={{
                        stroke: "rgba(8,125,138,0.28)",
                      }}
                      tickLine={false}
                      tick={{
                        fill: "#53666B",
                        fontSize: 9,
                        fontWeight: 600,
                      }}
                      tickFormatter={(value) =>
                        Number(value).toLocaleString("en-IN")
                      }
                    />

                    <YAxis
                      type="category"
                      dataKey="name"
                      width={128}
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#172326",
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    />

                    <Tooltip
                      cursor={{
                        fill: "rgba(19,184,200,0.075)",
                      }}
                      formatter={(value: number) => [
                        formatNumber(value),
                        "Views",
                      ]}
                      labelFormatter={(label) => String(label)}
                      contentStyle={{
                        background: "#ffffff",
                        border: "1px solid #DCECEF",
                        borderRadius: "10px",
                        boxShadow:
                          "0 12px 28px rgba(7,52,59,0.12)",
                        color: "#172326",
                        fontSize: "11px",
                      }}
                      labelStyle={{
                        color: "#172326",
                        fontWeight: 700,
                        marginBottom: "4px",
                      }}
                      itemStyle={{
                        color: "#087D8A",
                        fontWeight: 700,
                      }}
                    />

                    <ReferenceLine
                      x={0}
                      stroke="rgba(8,125,138,0.30)"
                      strokeWidth={1}
                    />

                    <Bar
                      dataKey="views"
                      radius={[0, 7, 7, 0]}
                      barSize={19}
                      isAnimationActive
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            CATEGORY_COLORS[
                              index % CATEGORY_COLORS.length
                            ]
                          }
                        />
                      ))}

                      <LabelList
                        dataKey="views"
                        position="right"
                        offset={8}
                        formatter={(value: any) =>
                          formatNumber(Number(value || 0))
                        }
                        style={{
                          fill: "#53666B",
                          fontSize: 9,
                          fontWeight: 800,
                        }}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* FOOTER TELEMETRY */}
              <div className="relative flex flex-wrap items-center justify-between gap-2 border-t border-[var(--admin-border)] bg-white/80 px-3 py-2 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <span className="text-[7px] font-bold uppercase tracking-[0.16em] text-[var(--admin-text-muted)]">
                    DATASET
                  </span>

                  <span className="text-[8px] font-extrabold tabular-nums text-[var(--admin-primary-dark)]">
                    {chartData.length.toString().padStart(2, "0")} NODES
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[7px] font-bold uppercase tracking-[0.16em] text-[var(--admin-text-muted)]">
                    VIEW_COUNT
                  </span>

                  <span className="text-[8px] font-extrabold tabular-nums text-[var(--admin-text)]">
                    {formatNumber(totalViews)}
                  </span>

                  <span className="h-1 w-1 rounded-full bg-[var(--admin-success)]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          FULL BREAKDOWN MODAL
      ========================================================= */}
      {mounted &&
        showBreakdown &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5"
            style={{ isolation: "isolate" }}
          >
            {/* BACKDROP */}
            <div
              className="absolute inset-0 bg-[rgba(6,27,32,0.46)] backdrop-blur-[5px]"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                  closeBreakdown();
                }
              }}
              aria-hidden="true"
            />

            {/* MODAL */}
            <div
              className="relative z-10 flex max-h-[calc(100vh-24px)] w-full max-w-[1040px] flex-col overflow-hidden rounded-[20px] border border-[var(--admin-border-strong)] bg-[var(--admin-workspace)] shadow-[0_28px_80px_rgba(6,27,32,0.28)] sm:max-h-[calc(100vh-48px)]"
              role="dialog"
              aria-modal="true"
              aria-label="Category Performance"
            >
              {/* MODAL TOP GRADIENT */}
              <div className="h-1 shrink-0 bg-gradient-to-r from-[var(--admin-primary-dark)] via-[var(--admin-primary)] to-[var(--admin-success)]" />

              {/* MODAL TECHNICAL BACKGROUND */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.42]"
                  style={{
                    backgroundImage: `
                      linear-gradient(
                        rgba(19,184,200,0.05) 1px,
                        transparent 1px
                      ),
                      linear-gradient(
                        90deg,
                        rgba(19,184,200,0.05) 1px,
                        transparent 1px
                      )
                    `,
                    backgroundSize: "28px 28px",
                  }}
                />

                <div
                  className="absolute inset-0 opacity-[0.26]"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(
                        0deg,
                        transparent 0px,
                        transparent 10px,
                        rgba(8,125,138,0.06) 11px,
                        transparent 12px
                      )
                    `,
                  }}
                />

                <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[var(--admin-primary)] opacity-[0.05] blur-3xl" />

                <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[var(--admin-primary-dark)] opacity-[0.025] blur-3xl" />
              </div>

              {/* MODAL HEADER */}
              <div className="relative z-10 shrink-0 border-b border-[var(--admin-border)] bg-white/95 px-5 py-4 backdrop-blur-xl sm:px-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--admin-border)] bg-[var(--admin-primary-soft)] text-[var(--admin-primary-dark)]">
                      <BarChart3 size={17} />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--admin-primary-dark)]">
                          CATEGORY INTELLIGENCE
                        </p>

                        <span className="rounded bg-[var(--admin-success-soft)] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.1em] text-[var(--admin-success)]">
                          {totalCategories} Nodes
                        </span>
                      </div>

                      <h2 className="mt-1 text-base font-bold tracking-tight text-[var(--admin-text)] sm:text-lg">
                        Full Category Breakdown
                      </h2>

                      <p className="mt-0.5 text-[10px] text-[var(--admin-text-muted)] sm:text-[11px]">
                        Complete category traffic and publishing distribution
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={closeBreakdown}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface-soft)] text-[var(--admin-text-muted)] transition hover:border-[var(--admin-danger)] hover:bg-[var(--admin-danger-soft)] hover:text-[var(--admin-danger)]"
                    aria-label="Close category breakdown"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* MODAL SCROLL AREA */}
              <div className="relative z-10 min-h-0 flex-1 overflow-y-auto">
                <div className="mx-auto max-w-[960px] px-4 py-4 sm:px-6 sm:py-5">
                  {/* SEARCH / CONTROL BAR */}
                  <div className="relative mb-4 overflow-hidden rounded-xl border border-[var(--admin-border)] bg-white shadow-[var(--admin-shadow-sm)]">
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.35]"
                      style={{
                        backgroundImage: `
                          linear-gradient(
                            rgba(19,184,200,0.045) 1px,
                            transparent 1px
                          ),
                          linear-gradient(
                            90deg,
                            rgba(19,184,200,0.045) 1px,
                            transparent 1px
                          )
                        `,
                        backgroundSize: "20px 20px",
                      }}
                    />

                    <div className="relative flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--admin-primary-soft)] text-[var(--admin-primary-dark)]">
                          <Search size={13} />
                        </div>

                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--admin-text-muted)]">
                            Dataset Search
                          </p>

                          <p className="mt-0.5 text-[9px] text-[var(--admin-text-muted)]">
                            Search across all categories
                          </p>
                        </div>
                      </div>

                      <div className="relative w-full sm:max-w-[360px]">
                        <Search
                          size={14}
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)]"
                        />

                        <input
                          value={search}
                          onChange={(event) =>
                            setSearch(event.target.value)
                          }
                          placeholder="Search all categories..."
                          className="admin-input h-9 pl-9 pr-9 text-xs"
                        />

                        {search && (
                          <button
                            type="button"
                            onClick={() => setSearch("")}
                            className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-[var(--admin-text-muted)] transition hover:bg-[var(--admin-surface-hover)] hover:text-[var(--admin-text)]"
                            aria-label="Clear search"
                          >
                            <X size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* MODAL SUMMARY */}
                  <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
                    <Metric
                      label="Categories"
                      value={formatNumber(totalCategories)}
                      icon={<BarChart3 size={14} />}
                    />

                    <Metric
                      label="Articles"
                      value={formatNumber(totalArticles)}
                      icon={<FileText size={14} />}
                    />

                    <Metric
                      label="Total Views"
                      value={formatNumber(totalViews)}
                      icon={<Eye size={14} />}
                    />

                    <Metric
                      label="Top Category"
                      value={topCategory.name || "-"}
                      icon={<Activity size={14} />}
                    />
                  </div>

                  {/* TABLE CARD */}
                  <div className="relative overflow-hidden rounded-2xl border border-[var(--admin-border)] bg-white shadow-[var(--admin-shadow-sm)]">
                    {/* TABLE TECHNICAL GRID */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.24]"
                      style={{
                        backgroundImage: `
                          linear-gradient(
                            rgba(19,184,200,0.05) 1px,
                            transparent 1px
                          ),
                          linear-gradient(
                            90deg,
                            rgba(19,184,200,0.05) 1px,
                            transparent 1px
                          )
                        `,
                        backgroundSize: "24px 24px",
                      }}
                    />

                    <div className="relative flex items-center justify-between gap-3 border-b border-[var(--admin-border)] bg-[var(--admin-surface-soft)] px-4 py-3 sm:px-5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-[var(--admin-primary)] shadow-[0_0_0_4px_rgba(19,184,200,0.10)]" />

                          <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-[var(--admin-text)]">
                            Category View Stream
                          </p>
                        </div>

                        <p className="mt-1 text-[9px] text-[var(--admin-text-muted)]">
                          Ranked by total article views
                        </p>
                      </div>

                      <div className="hidden text-right sm:block">
                        <p className="text-[7px] font-bold uppercase tracking-[0.15em] text-[var(--admin-text-muted)]">
                          SYSTEM
                        </p>

                        <p className="mt-0.5 text-[9px] font-bold text-[var(--admin-success)]">
                          LIVE
                        </p>
                      </div>
                    </div>

                    <div className="relative overflow-auto">
                      <div className="min-w-[620px]">
                        {/* TABLE HEADER */}
                        <div className="sticky top-0 z-10 grid grid-cols-[minmax(260px,1fr)_110px_130px_100px] gap-3 border-b border-[var(--admin-border)] bg-[var(--admin-surface-soft)]/95 px-4 py-2.5 backdrop-blur-md sm:px-5">
                          <span className="admin-label">
                            Category
                          </span>

                          <span className="admin-label text-right">
                            Articles
                          </span>

                          <span className="admin-label text-right">
                            Views
                          </span>

                          <span className="admin-label text-right">
                            Share
                          </span>
                        </div>

                        {filteredBreakdown.length === 0 ? (
                          <div className="flex min-h-[220px] items-center justify-center px-5">
                            <div className="text-center">
                              <Search
                                size={24}
                                className="mx-auto text-[var(--admin-text-muted)]"
                              />

                              <p className="mt-2 text-xs font-bold text-[var(--admin-text-secondary)]">
                                No category found
                              </p>

                              <p className="mt-1 text-[10px] text-[var(--admin-text-muted)]">
                                Try another category name.
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="divide-y divide-[var(--admin-border)]">
                            {filteredBreakdown.map(
                              (category, index) => {
                                const views = Number(
                                  category?.views || 0
                                );

                                const articles = Number(
                                  category?.articles || 0
                                );

                                const share = totalViews
                                  ? (
                                      (views / totalViews) *
                                      100
                                    ).toFixed(1)
                                  : "0.0";

                                const categoryColor =
                                  CATEGORY_COLORS[
                                    index %
                                      CATEGORY_COLORS.length
                                  ];

                                return (
                                  <div
                                    key={`${category?.name}-${index}`}
                                    className="group relative grid grid-cols-[minmax(260px,1fr)_110px_130px_100px] items-center gap-3 overflow-hidden px-4 py-3 transition-colors hover:bg-[var(--admin-surface-hover)] sm:px-5"
                                  >
                                    {/* ROW GRID EFFECT */}
                                    <div
                                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                                      style={{
                                        backgroundImage: `
                                          linear-gradient(
                                            rgba(19,184,200,0.04) 1px,
                                            transparent 1px
                                          ),
                                          linear-gradient(
                                            90deg,
                                            rgba(19,184,200,0.04) 1px,
                                            transparent 1px
                                          )
                                        `,
                                        backgroundSize: "18px 18px",
                                      }}
                                    />

                                    <div className="relative flex min-w-0 items-center gap-3">
                                      <span
                                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                                        style={{
                                          background:
                                            categoryColor,
                                          boxShadow: `0 0 0 3px ${categoryColor}12`,
                                        }}
                                      />

                                      <div className="min-w-0">
                                        <p
                                          className="truncate text-[12px] font-bold text-[var(--admin-text)]"
                                          title={category?.name || ""}
                                        >
                                          {category?.name || "-"}
                                        </p>

                                        {index < 3 && !search && (
                                          <p className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.1em] text-[var(--admin-primary-dark)]">
                                            Top performer
                                          </p>
                                        )}
                                      </div>
                                    </div>

                                    <span className="relative text-right text-[11px] font-semibold tabular-nums text-[var(--admin-text-secondary)]">
                                      {formatNumber(articles)}
                                    </span>

                                    <span className="relative text-right text-[11px] font-extrabold tabular-nums text-[var(--admin-text)]">
                                      {formatNumber(views)}
                                    </span>

                                    <span className="relative text-right text-[11px] font-bold tabular-nums text-[var(--admin-success)]">
                                      {share}%
                                    </span>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* MODAL TELEMETRY FOOTER */}
                    <div className="relative border-t border-[var(--admin-border)] bg-[var(--admin-surface-soft)] px-4 py-3 sm:px-5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-[var(--admin-text-muted)]">
                            DISPLAYING
                          </span>

                          <span className="text-[10px] font-extrabold tabular-nums text-[var(--admin-primary-dark)]">
                            {filteredBreakdown.length} /{" "}
                            {totalCategories}
                          </span>

                          {search && (
                            <span className="rounded-md bg-[var(--admin-primary-soft)] px-2 py-1 text-[8px] font-bold text-[var(--admin-primary-dark)]">
                              FILTERED
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-[7px] font-bold uppercase tracking-[0.12em] text-[var(--admin-text-muted)]">
                              Total Views
                            </p>

                            <p className="text-[10px] font-extrabold tabular-nums text-[var(--admin-text)]">
                              {formatNumber(totalViews)}
                            </p>
                          </div>

                          <div className="h-6 w-px bg-[var(--admin-border)]" />

                          <div className="text-right">
                            <p className="text-[7px] font-bold uppercase tracking-[0.12em] text-[var(--admin-text-muted)]">
                              Articles
                            </p>

                            <p className="text-[10px] font-extrabold tabular-nums text-[var(--admin-text)]">
                              {formatNumber(totalArticles)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* MODAL BOTTOM STATUS */}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--admin-success)] shadow-[0_0_0_3px_rgba(33,164,119,0.10)]" />

                      <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-[var(--admin-text-muted)]">
                        Category Intelligence Stream Active
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Maximize2
                        size={10}
                        className="text-[var(--admin-text-muted)]"
                      />

                      <span className="text-[8px] font-semibold text-[var(--admin-text-muted)]">
                        ESC to close
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}