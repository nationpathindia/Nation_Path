"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import {
  Maximize2,
  X,
  TrendingUp,
  TrendingDown,
  Activity,
  CalendarDays,
  FileText,
} from "lucide-react";

interface PublishingItem {
  date?: string;
  articles?: number;
}

interface LifetimePublishingItem {
  key?: string;
  date?: string;
  articles?: number;
}

interface Props {
  data?: PublishingItem[];
  dailyData?: PublishingItem[];
  lifetimeData?: LifetimePublishingItem[];
}

type PublishingRange = "7d" | "30d" | "90d" | "lifetime";

const ranges: {
  value: PublishingRange;
  label: string;
}[] = [
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
  { value: "90d", label: "90 Days" },
  { value: "lifetime", label: "Lifetime" },
];

/*
 * Publishing intensity levels
 *
 * < 5    = Low
 * 5–9    = Moderate
 * 10–19  = Good
 * 20–29  = Strong
 * 30+    = Excellent
 */
const MODERATE_THRESHOLD = 5;
const GOOD_THRESHOLD = 10;
const STRONG_THRESHOLD = 20;
const EXCELLENT_THRESHOLD = 30;

function getPublishingLevel(articles: number) {
  if (articles >= EXCELLENT_THRESHOLD) {
    return {
      label: "Excellent",
      color: "#21a477",
      soft: "#e7f7f1",
    };
  }

  if (articles >= STRONG_THRESHOLD) {
    return {
      label: "Strong",
      color: "#3986d7",
      soft: "#edf5fd",
    };
  }

  if (articles >= GOOD_THRESHOLD) {
    return {
      label: "Good",
      color: "#e5a72f",
      soft: "#fff6df",
    };
  }

  if (articles >= MODERATE_THRESHOLD) {
    return {
      label: "Moderate",
      color: "#d97706",
      soft: "#fff4e8",
    };
  }

  return {
    label: "Low",
    color: "#ef5350",
    soft: "#fff0ef",
  };
}

function normalizeDailyData(data: PublishingItem[] = []) {
  return data
    .map((item) => ({
      date: String(item?.date || ""),
      articles: Number(item?.articles || 0),
    }))
    .filter((item) => item.date)
    .sort((a, b) => {
      const aTime = new Date(a.date).getTime();
      const bTime = new Date(b.date).getTime();

      if (!Number.isNaN(aTime) && !Number.isNaN(bTime)) {
        return aTime - bTime;
      }

      return 0;
    });
}

function normalizeLifetimeData(
  data: LifetimePublishingItem[] = []
) {
  return data
    .map((item) => ({
      key: String(item?.key || ""),
      date: String(item?.date || ""),
      articles: Number(item?.articles || 0),
    }))
    .filter((item) => item.date)
    .sort((a, b) => a.key.localeCompare(b.key));
}

function getLatestDays(
  data: Array<{
    date: string;
    articles: number;
  }>,
  days: number
) {
  return data.slice(-days);
}

function formatNumber(value: number) {
  return Number(value || 0).toLocaleString("en-IN");
}

/*
 * Technical background grid.
 * Preserved from the existing Publishing Intelligence design.
 */
function TechnicalGrid({
  expanded = false,
}: {
  expanded?: boolean;
}) {
  return (
    <>
      {/* Fine vertical + horizontal lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(8,125,138,0.13) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(8,125,138,0.13) 1px,
              transparent 1px
            )
          `,
          backgroundSize: expanded
            ? "42px 42px"
            : "34px 34px",
        }}
      />

      {/* Larger structural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(8,125,138,0.10) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(8,125,138,0.10) 1px,
              transparent 1px
            )
          `,
          backgroundSize: expanded
            ? "168px 168px"
            : "136px 136px",
        }}
      />

      {/* Horizontal highlight line */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-0
          right-0
          top-[36%]
          z-[1]
          h-px
          bg-[rgba(19,184,200,0.14)]
        "
      />

      {/* Vertical highlight line */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          top-0
          bottom-0
          left-[48%]
          z-[1]
          w-px
          bg-[rgba(19,184,200,0.11)]
        "
      />

      {/* Soft glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-[1]
          h-[72%]
          w-[72%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[radial-gradient(circle,rgba(19,184,200,0.10),transparent_68%)]
        "
      />
    </>
  );
}

/*
 * REAL PUBLISHING TARGET / REFERENCE LINES
 *
 * These are actual Recharts ReferenceLine elements.
 * They are separate from TechnicalGrid and remain visible
 * on both dashboard and expanded charts.
 */
function PublishingTargetLines() {
  return (
    <>
      <ReferenceLine
        y={MODERATE_THRESHOLD}
        stroke="#d97706"
        strokeDasharray="6 5"
        strokeWidth={1}
        strokeOpacity={0.82}
        label={{
          value: "5",
          position: "insideTopLeft",
          fill: "#b45309",
          fontSize: 9,
          fontWeight: 700,
        }}
      />

      <ReferenceLine
        y={GOOD_THRESHOLD}
        stroke="#e5a72f"
        strokeDasharray="6 5"
        strokeWidth={1}
        strokeOpacity={0.82}
        label={{
          value: "10",
          position: "insideTopLeft",
          fill: "#9a6b00",
          fontSize: 9,
          fontWeight: 700,
        }}
      />

      <ReferenceLine
        y={STRONG_THRESHOLD}
        stroke="#3986d7"
        strokeDasharray="6 5"
        strokeWidth={1}
        strokeOpacity={0.82}
        label={{
          value: "20",
          position: "insideTopLeft",
          fill: "#3986d7",
          fontSize: 9,
          fontWeight: 700,
        }}
      />

      <ReferenceLine
        y={EXCELLENT_THRESHOLD}
        stroke="#21a477"
        strokeDasharray="6 5"
        strokeWidth={1.2}
        strokeOpacity={0.85}
        label={{
          value: "30+",
          position: "insideTopLeft",
          fill: "#21a477",
          fontSize: 9,
          fontWeight: 700,
        }}
      />
    </>
  );
}

export default function PublishingTrend({
  data = [],
  dailyData = [],
  lifetimeData = [],
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [range, setRange] =
    useState<PublishingRange>("7d");
  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!expanded) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [expanded]);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpanded(false);
        setRange("7d");
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [expanded]);

  const normalizedData = useMemo(
    () => normalizeDailyData(data),
    [data]
  );

  const normalizedDailyData = useMemo(
    () => normalizeDailyData(dailyData),
    [dailyData]
  );

  const normalizedLifetimeData = useMemo(
    () =>
      normalizeLifetimeData(
        lifetimeData
      ),
    [lifetimeData]
  );

  /*
   * Dashboard keeps using the original
   * publishingTrend dataset.
   */
  const dashboardData = useMemo(() => {
    const source =
      normalizedData.length > 0
        ? normalizedData
        : normalizedDailyData;

    return getLatestDays(source, 7);
  }, [
    normalizedData,
    normalizedDailyData,
  ]);

  /*
   * Expanded range data.
   */
  const chartData = useMemo(() => {
    const dailySource =
      normalizedDailyData.length > 0
        ? normalizedDailyData
        : normalizedData;

    switch (range) {
      case "lifetime":
        return normalizedLifetimeData.map(
          (item) => ({
            date: item.date,
            articles: item.articles,
          })
        );

      case "30d":
        return getLatestDays(
          dailySource,
          30
        );

      case "90d":
        return getLatestDays(
          dailySource,
          90
        );

      case "7d":
      default:
        return getLatestDays(
          normalizedData.length > 0
            ? normalizedData
            : dailySource,
          7
        );
    }
  }, [
    normalizedData,
    normalizedDailyData,
    normalizedLifetimeData,
    range,
  ]);

  const dashboardTotal = useMemo(
    () =>
      dashboardData.reduce(
        (sum, item) =>
          sum + Number(item.articles || 0),
        0
      ),
    [dashboardData]
  );

  const dashboardAverage = useMemo(() => {
    if (!dashboardData.length) {
      return 0;
    }

    return Math.round(
      dashboardTotal /
        dashboardData.length
    );
  }, [
    dashboardData,
    dashboardTotal,
  ]);

  const dashboardPeak = useMemo(() => {
    if (!dashboardData.length) {
      return null;
    }

    return dashboardData.reduce(
      (max, item) =>
        Number(item.articles || 0) >
        Number(max.articles || 0)
          ? item
          : max,
      dashboardData[0]
    );
  }, [dashboardData]);

  const publishingStats = useMemo(() => {
    const total = chartData.reduce(
      (sum, item) =>
        sum + Number(item.articles || 0),
      0
    );

    const average = Math.round(
      total /
        Math.max(chartData.length, 1)
    );

    const peak =
      chartData.length > 0
        ? chartData.reduce(
            (max, item) =>
              Number(item.articles || 0) >
              Number(max.articles || 0)
                ? item
                : max,
            chartData[0]
          )
        : null;

    const latest =
      chartData.length > 0
        ? Number(
            chartData[
              chartData.length - 1
            ].articles || 0
          )
        : 0;

    const previous =
      chartData.length > 1
        ? Number(
            chartData[
              chartData.length - 2
            ].articles || 0
          )
        : 0;

    const change =
      previous > 0
        ? ((latest - previous) /
            previous) *
          100
        : 0;

    return {
      totalArticles: total,
      averageArticles: average,
      peakDay: peak?.date || "-",
      peakArticles: Number(
        peak?.articles || 0
      ),
      latestArticles: latest,
      previousArticles: previous,
      change,
    };
  }, [chartData]);

  const chartMax = useMemo(() => {
    const highest = Math.max(
      ...chartData.map((item) =>
        Number(item.articles || 0)
      ),
      EXCELLENT_THRESHOLD
    );

    return highest * 1.18;
  }, [chartData]);

  const closeExpanded = useCallback(() => {
    setExpanded(false);
    setRange("7d");
  }, []);

  const openExpanded = useCallback(
    (
      selectedRange: PublishingRange = "7d"
    ) => {
      setRange(selectedRange);
      setExpanded(true);
    },
    []
  );

  const handleBackdropMouseDown =
    useCallback(
      (
        event: React.MouseEvent<HTMLDivElement>
      ) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          closeExpanded();
        }
      },
      [closeExpanded]
    );

  const renderChart = (
    chartHeight: number,
    expandedMode = false,
    chartDataset = chartData
  ) => {
    if (!chartDataset.length) {
      return (
        <div
          style={{
            height: chartHeight,
          }}
          className="
            relative
            overflow-hidden
            flex
            items-center
            justify-center
            rounded-xl
            bg-[var(--admin-surface-soft)]
            border
            border-dashed
            border-[var(--admin-border-strong)]
          "
        >
          <TechnicalGrid
            expanded={expandedMode}
          />

          <div className="relative z-20 text-center">
            <Activity
              size={22}
              className="
                mx-auto
                mb-2
                text-[var(--admin-text-muted)]
              "
            />

            <p className="text-sm font-semibold text-[var(--admin-text)]">
              No publishing data available
            </p>

            <p className="text-xs text-[var(--admin-text-muted)] mt-1">
              {expandedMode &&
              range === "lifetime"
                ? "No lifetime publishing history was found."
                : "No publishing data was found for this period."}
            </p>
          </div>
        </div>
      );
    }

    const localChartMax = Math.max(
      ...chartDataset.map((item) =>
        Number(item.articles || 0)
      ),
      EXCELLENT_THRESHOLD
    ) * 1.18;

    return (
      <div
        style={{
          height: chartHeight,
        }}
        className="
          relative
          w-full
          overflow-hidden
          rounded-xl
        "
      >
        {/* ALWAYS VISIBLE TECHNICAL BACKGROUND */}
        <TechnicalGrid
          expanded={expandedMode}
        />

        {/* Recharts sits above background */}
        <div className="relative z-20 w-full h-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={chartDataset}
              margin={{
                top: 28,
                right: 20,
                left: -18,
                bottom: 8,
              }}
            >
              <defs>
                <linearGradient
                  id={
                    expandedMode
                      ? "publishingBarGradientExpanded"
                      : "publishingBarGradientDashboard"
                  }
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#13b8c8"
                  />

                  <stop
                    offset="100%"
                    stopColor="#087d8a"
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#9fc8cd"
                strokeDasharray="4 5"
                strokeOpacity={0.48}
                vertical={true}
                horizontal={true}
              />

              {/* REAL TARGET / REFERENCE LINES */}
              <PublishingTargetLines />

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                interval={
                  chartDataset.length > 15
                    ? Math.floor(
                        chartDataset.length /
                          8
                      )
                    : 0
                }
                tick={{
                  fill: "#53666b",
                  fontSize:
                    expandedMode
                      ? 10
                      : 9,
                  fontWeight: 600,
                }}
                dy={10}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
                domain={[
                  0,
                  Math.ceil(
                    expandedMode
                      ? localChartMax
                      : chartMax
                  ),
                ]}
                tick={{
                  fill: "#53666b",
                  fontSize: 10,
                }}
              />

              <Tooltip
                cursor={{
                  fill: "rgba(19,184,200,0.06)",
                }}
                contentStyle={{
                  background:
                    "rgba(255,255,255,0.98)",
                  border:
                    "1px solid #c7e1e5",
                  borderRadius: "12px",
                  boxShadow:
                    "0 10px 28px rgba(7,52,59,0.14)",
                  fontSize: "12px",
                  padding: "10px 12px",
                }}
                labelStyle={{
                  color: "#172326",
                  fontWeight: 700,
                  marginBottom: 5,
                }}
                formatter={(value: any) => {
                  const articles =
                    Number(value || 0);

                  const level =
                    getPublishingLevel(
                      articles
                    );

                  return [
                    `${formatNumber(
                      articles
                    )} articles`,
                    level.label,
                  ];
                }}
              />

              <Bar
                dataKey="articles"
                fill={
                  expandedMode
                    ? "url(#publishingBarGradientExpanded)"
                    : "url(#publishingBarGradientDashboard)"
                }
                radius={[
                  5,
                  5,
                  2,
                  2,
                ]}
                maxBarSize={
                  expandedMode
                    ? 34
                    : 38
                }
              >
                {chartDataset.map(
                  (item, index) => {
                    const level =
                      getPublishingLevel(
                        Number(
                          item.articles ||
                            0
                        )
                      );

                    return (
                      <Cell
                        key={`${item.date}-${index}`}
                        fill={level.color}
                      />
                    );
                  }
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="admin-card overflow-hidden">
        {/* Gradient top border */}
        <div
          className="
            h-1
            w-full
            bg-gradient-to-r
            from-[var(--admin-primary-dark)]
            to-[var(--admin-primary)]
          "
        />

        <div className="px-5 sm:px-6 pt-5 sm:pt-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="
                    w-2
                    h-2
                    rounded-full
                    bg-[var(--admin-primary)]
                    shadow-[0_0_0_4px_rgba(19,184,200,0.10)]
                  "
                />

                <h2 className="admin-section-title">
                  Publishing Intelligence
                </h2>
              </div>

              <p className="admin-section-description mt-1.5">
                Article publishing activity · last 7 days
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                openExpanded("7d")
              }
              className="
                w-8
                h-8
                rounded-lg
                border
                border-[var(--admin-border)]
                bg-[var(--admin-surface-soft)]
                flex
                items-center
                justify-center
                text-[var(--admin-text-muted)]
                transition-all
                hover:text-[var(--admin-primary-dark)]
                hover:border-[var(--admin-primary)]
                hover:bg-[var(--admin-primary-soft)]
              "
              aria-label="Expand publishing analytics"
            >
              <Maximize2 size={14} />
            </button>
          </div>
        </div>

        <div className="px-5 sm:px-6 mt-4">
          <span
            className="
              inline-flex
              items-center
              gap-1.5
              px-2.5
              py-1
              rounded-full
              bg-[var(--admin-primary-soft)]
              text-[10px]
              font-bold
              text-[var(--admin-primary-dark)]
            "
          >
            <CalendarDays size={11} />
            Last 7 Days
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 px-5 sm:px-6 mt-4">
          <div
            className="
              rounded-xl
              bg-[var(--admin-surface-soft)]
              border
              border-[var(--admin-border)]
              px-3
              py-3
            "
          >
            <p className="admin-label">
              7 Day Articles
            </p>

            <p className="admin-metric mt-2">
              {formatNumber(
                dashboardTotal
              )}
            </p>
          </div>

          <div
            className="
              rounded-xl
              bg-[var(--admin-surface-soft)]
              border
              border-[var(--admin-border)]
              px-3
              py-3
            "
          >
            <p className="admin-label">
              Daily Average
            </p>

            <p className="admin-metric mt-2">
              {formatNumber(
                dashboardAverage
              )}
            </p>
          </div>

          <div
            className="rounded-xl border px-3 py-3"
            style={{
              backgroundColor:
                getPublishingLevel(
                  Number(
                    dashboardPeak?.articles ||
                      0
                  )
                ).soft,

              borderColor:
                `${getPublishingLevel(
                  Number(
                    dashboardPeak?.articles ||
                      0
                  )
                ).color}30`,
            }}
          >
            <p className="admin-label">
              Peak Day
            </p>

            <p
              className="text-sm font-bold mt-2 truncate"
              style={{
                color:
                  getPublishingLevel(
                    Number(
                      dashboardPeak?.articles ||
                        0
                    )
                  ).color,
              }}
            >
              {dashboardPeak?.date ||
                "-"}
            </p>
          </div>
        </div>

        {/* Dashboard chart */}
        <div
          className="
            mx-3
            sm:mx-5
            lg:mx-6
            mt-4
            mb-5
            rounded-2xl
            border
            border-[var(--admin-border)]
            overflow-hidden
            bg-[var(--admin-surface-soft)]
          "
        >
          <div className="px-4 pt-3 flex items-center justify-between">
            <div className="flex items-center gap-3 text-[10px] font-semibold text-[var(--admin-text-muted)]">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[var(--admin-danger)]" />
                Low
              </span>

              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#d97706]" />
                Moderate
              </span>

              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[var(--admin-warning)]" />
                Good
              </span>

              <span className="hidden sm:flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[var(--admin-info)]" />
                Strong
              </span>

              <span className="hidden md:flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[var(--admin-success)]" />
                Excellent
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                openExpanded("7d")
              }
              className="
                hidden
                sm:flex
                items-center
                gap-1.5
                text-[10px]
                font-bold
                text-[var(--admin-primary-dark)]
                hover:underline
              "
            >
              View details
              <Maximize2 size={11} />
            </button>
          </div>

          <div className="px-2 sm:px-3 pt-1 pb-2">
            {renderChart(
              270,
              false,
              dashboardData
            )}
          </div>
        </div>
      </section>

      {/* Expanded modal */}
      {mounted &&
        expanded &&
        createPortal(
          <div
            className="
              fixed
              inset-0
              z-[9999]
              flex
              items-center
              justify-center
              p-3
              sm:p-5
            "
            style={{
              isolation: "isolate",
            }}
          >
            {/* Backdrop */}
            <div
              className="
                absolute
                inset-0
                bg-[rgba(6,27,32,0.42)]
                backdrop-blur-[5px]
              "
              onMouseDown={
                handleBackdropMouseDown
              }
              aria-hidden="true"
            />

            {/* Modal */}
            <div
              className="
                relative
                z-10
                w-full
                max-w-[1040px]
                max-h-[calc(100vh-32px)]
                sm:max-h-[calc(100vh-48px)]
                overflow-hidden
                flex
                flex-col
                rounded-[20px]
                border
                border-[var(--admin-border-strong)]
                bg-[var(--admin-workspace)]
                shadow-[0_28px_80px_rgba(6,27,32,0.25)]
              "
              role="dialog"
              aria-modal="true"
              aria-label="Publishing Intelligence"
            >
              {/* Modal top gradient */}
              <div
                className="
                  h-1
                  shrink-0
                  bg-gradient-to-r
                  from-[var(--admin-primary-dark)]
                  via-[var(--admin-primary)]
                  to-[var(--admin-success)]
                "
              />

              {/* Header */}
              <div
                className="
                  shrink-0
                  flex
                  items-center
                  justify-between
                  gap-4
                  px-5
                  sm:px-6
                  py-4
                  bg-white
                  border-b
                  border-[var(--admin-border)]
                "
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="
                      w-9
                      h-9
                      shrink-0
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      bg-[var(--admin-primary-soft)]
                      border
                      border-[var(--admin-border)]
                      text-[var(--admin-primary-dark)]
                    "
                  >
                    <TrendingUp
                      size={17}
                    />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-bold tracking-tight text-[var(--admin-text)]">
                      Publishing Intelligence
                    </h2>

                    <p className="text-[11px] text-[var(--admin-text-muted)] mt-0.5">
                      Real article publishing performance
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={
                    closeExpanded
                  }
                  className="
                    w-8
                    h-8
                    shrink-0
                    rounded-lg
                    border
                    border-[var(--admin-border)]
                    bg-[var(--admin-surface-soft)]
                    flex
                    items-center
                    justify-center
                    text-[var(--admin-text-muted)]
                    hover:text-[var(--admin-danger)]
                    hover:border-[var(--admin-danger)]
                    hover:bg-[var(--admin-danger-soft)]
                    transition
                  "
                  aria-label="Close publishing analytics"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Body */}
              <div
                className="
                  min-h-0
                  overflow-y-auto
                  bg-[var(--admin-workspace)]
                "
              >
                <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-4 sm:py-5">

                  {/* Range */}
                  <div
                    className="
                      flex
                      flex-col
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                      gap-3
                      mb-4
                      p-3
                      rounded-xl
                      bg-white
                      border
                      border-[var(--admin-border)]
                    "
                  >
                    <div className="flex items-center gap-2">
                      <CalendarDays
                        size={14}
                        className="text-[var(--admin-primary-dark)]"
                      />

                      <div>
                        <p className="text-xs font-bold text-[var(--admin-text)]">
                          Publishing Range
                        </p>

                        <p className="text-[10px] text-[var(--admin-text-muted)]">
                          Select publishing period
                        </p>
                      </div>
                    </div>

                    <div
                      className="
                        inline-flex
                        self-start
                        sm:self-auto
                        flex-wrap
                        gap-1
                        p-1
                        rounded-lg
                        bg-[var(--admin-surface-soft)]
                        border
                        border-[var(--admin-border)]
                      "
                    >
                      {ranges.map(
                        (item) => {
                          const active =
                            range ===
                            item.value;

                          return (
                            <button
                              key={
                                item.value
                              }
                              type="button"
                              aria-pressed={
                                active
                              }
                              onClick={() =>
                                setRange(
                                  item.value
                                )
                              }
                              className="
                                min-w-[72px]
                                px-3
                                py-1.5
                                rounded-md
                                text-[10px]
                                sm:text-[11px]
                                font-bold
                                border
                                transition-all
                                duration-150
                              "
                              style={{
                                backgroundColor:
                                  active
                                    ? "#13b8c8"
                                    : "#f7fcfc",

                                color:
                                  active
                                    ? "#ffffff"
                                    : "#53666b",

                                borderColor:
                                  active
                                    ? "#13b8c8"
                                    : "#dcecef",

                                boxShadow:
                                  active
                                    ? "0 3px 10px rgba(19,184,200,0.22)"
                                    : "none",

                                opacity: 1,

                                WebkitTextFillColor:
                                  active
                                    ? "#ffffff"
                                    : "#53666b",
                              }}
                            >
                              {
                                item.label
                              }
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    <div className="rounded-xl bg-white border border-[var(--admin-border)] p-3.5">
                      <div className="flex items-center justify-between">
                        <p className="admin-label">
                          Published
                        </p>

                        <FileText
                          size={13}
                          className="text-[var(--admin-primary-dark)]"
                        />
                      </div>

                      <p className="admin-metric mt-2.5">
                        {formatNumber(
                          publishingStats.totalArticles
                        )}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white border border-[var(--admin-border)] p-3.5">
                      <p className="admin-label">
                        Average
                      </p>

                      <p className="admin-metric mt-2.5">
                        {formatNumber(
                          publishingStats.averageArticles
                        )}
                      </p>
                    </div>

                    <div
                      className="rounded-xl border p-3.5"
                      style={{
                        backgroundColor:
                          getPublishingLevel(
                            publishingStats.peakArticles
                          ).soft,

                        borderColor:
                          `${getPublishingLevel(
                            publishingStats.peakArticles
                          ).color}35`,
                      }}
                    >
                      <p className="admin-label">
                        Peak Articles
                      </p>

                      <p
                        className="admin-metric mt-2.5"
                        style={{
                          color:
                            getPublishingLevel(
                              publishingStats.peakArticles
                            ).color,
                        }}
                      >
                        {formatNumber(
                          publishingStats.peakArticles
                        )}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white border border-[var(--admin-border)] p-3.5">
                      <p className="admin-label">
                        Movement
                      </p>

                      <div className="flex items-center gap-2 mt-2.5">
                        <span
                          className={`
                            w-6
                            h-6
                            rounded-md
                            flex
                            items-center
                            justify-center
                            ${
                              publishingStats.change >=
                              0
                                ? "bg-[var(--admin-success-soft)] text-[var(--admin-success)]"
                                : "bg-[var(--admin-danger-soft)] text-[var(--admin-danger)]"
                            }
                          `}
                        >
                          {publishingStats.change >=
                          0 ? (
                            <TrendingUp
                              size={12}
                            />
                          ) : (
                            <TrendingDown
                              size={12}
                            />
                          )}
                        </span>

                        <p
                          className={
                            publishingStats.change >=
                            0
                              ? "text-xs font-bold text-[var(--admin-success)]"
                              : "text-xs font-bold text-[var(--admin-danger)]"
                          }
                        >
                          {publishingStats.change >=
                          0
                            ? "+"
                            : ""}
                          {publishingStats.change.toFixed(
                            1
                          )}
                          %
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Publishing Trend */}
                  <div
                    className="
                      rounded-2xl
                      bg-white
                      border
                      border-[var(--admin-border)]
                      overflow-hidden
                    "
                  >
                    <div
                      className="
                        px-4
                        sm:px-5
                        py-3.5
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        gap-3
                        border-b
                        border-[var(--admin-border)]
                      "
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="
                              w-2
                              h-2
                              rounded-full
                              bg-[var(--admin-primary)]
                              shadow-[0_0_0_4px_rgba(19,184,200,0.10)]
                            "
                          />

                          <p className="text-sm font-bold text-[var(--admin-text)]">
                            Publishing Trend
                          </p>
                        </div>

                        <p className="text-[10px] text-[var(--admin-text-muted)] mt-1">
                          {range ===
                          "lifetime"
                            ? "Lifetime publishing history"
                            : `Daily articles · ${
                                ranges.find(
                                  (
                                    item
                                  ) =>
                                    item.value ===
                                    range
                                )?.label
                              }`}
                        </p>
                      </div>

                      {/* Full level legend */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="flex items-center gap-1 text-[9px] font-semibold text-[var(--admin-text-muted)]">
                          <span className="w-2 h-2 rounded-full bg-[var(--admin-danger)]" />
                          &lt;5
                        </span>

                        <span className="flex items-center gap-1 text-[9px] font-semibold text-[var(--admin-text-muted)]">
                          <span className="w-2 h-2 rounded-full bg-[#d97706]" />
                          5+
                        </span>

                        <span className="flex items-center gap-1 text-[9px] font-semibold text-[var(--admin-text-muted)]">
                          <span className="w-2 h-2 rounded-full bg-[var(--admin-warning)]" />
                          10+
                        </span>

                        <span className="flex items-center gap-1 text-[9px] font-semibold text-[var(--admin-text-muted)]">
                          <span className="w-2 h-2 rounded-full bg-[var(--admin-info)]" />
                          20+
                        </span>

                        <span className="flex items-center gap-1 text-[9px] font-semibold text-[var(--admin-text-muted)]">
                          <span className="w-2 h-2 rounded-full bg-[var(--admin-success)]" />
                          30+
                        </span>
                      </div>
                    </div>

                    {/* Chart shell with technical grid + REAL target lines */}
                    <div
                      className="
                        relative
                        overflow-hidden
                        px-2
                        sm:px-4
                        pt-2
                        pb-3
                        bg-[var(--admin-surface-soft)]
                      "
                    >
                      <TechnicalGrid expanded />

                      <div className="relative z-20">
                        {renderChart(
                          360,
                          true,
                          chartData
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mt-3 px-1">
                    <div className="flex items-center gap-4">
                      <span className="text-[9px] font-semibold text-[var(--admin-text-muted)]">
                        Peak:{" "}
                        <span className="text-[var(--admin-text-secondary)]">
                          {
                            publishingStats.peakDay
                          }
                        </span>
                      </span>

                      <span className="text-[9px] font-semibold text-[var(--admin-text-muted)]">
                        {
                          chartData.length
                        }{" "}
                        {range ===
                        "lifetime"
                          ? "periods"
                          : "days"}
                      </span>
                    </div>

                    <span className="text-[9px] font-semibold text-[var(--admin-text-muted)]">
                      &lt;5 · 5+ · 10+ · 20+ · 30+
                    </span>
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

