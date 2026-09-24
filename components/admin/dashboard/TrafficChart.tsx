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
  LineChart,
  Line,
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
  Eye,
} from "lucide-react";

interface TrafficItem {
  date?: string;
  views?: number;
}

interface LifetimeTrafficItem {
  key?: string;
  date?: string;
  views?: number;
}

interface Props {
  data?: TrafficItem[];
  lifetimeData?: LifetimeTrafficItem[];
}

type TrafficRange = "7d" | "30d" | "90d" | "lifetime";

const ranges: {
  value: TrafficRange;
  label: string;
}[] = [
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
  { value: "90d", label: "90 Days" },
  { value: "lifetime", label: "Lifetime" },
];

const LOW_THRESHOLD = 2500;
const STRONG_THRESHOLD = 5000;
const HIGH_THRESHOLD = 10000;
const VERY_HIGH_THRESHOLD = 15000;

function getTrafficLevel(views: number) {
  if (views >= VERY_HIGH_THRESHOLD) {
    return {
      label: "Very High",
      color: "#7c3aed",
      soft: "#f3edff",
    };
  }

  if (views >= HIGH_THRESHOLD) {
    return {
      label: "High",
      color: "#3986d7",
      soft: "#edf5fd",
    };
  }

  if (views >= STRONG_THRESHOLD) {
    return {
      label: "Strong",
      color: "#21a477",
      soft: "#e7f7f1",
    };
  }

  if (views >= LOW_THRESHOLD) {
    return {
      label: "Moderate",
      color: "#e5a72f",
      soft: "#fff6df",
    };
  }

  return {
    label: "Low",
    color: "#ef5350",
    soft: "#fff0ef",
  };
}

function normalizeDailyData(data: TrafficItem[] = []) {
  return data
    .map((item) => ({
      date: String(item?.date || ""),
      views: Number(item?.views || 0),
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
  data: LifetimeTrafficItem[] = []
) {
  return data
    .map((item) => ({
      key: String(item?.key || ""),
      date: String(item?.date || ""),
      views: Number(item?.views || 0),
    }))
    .filter((item) => item.date)
    .sort((a, b) => a.key.localeCompare(b.key));
}

function getLatestDays(
  data: Array<{
    date: string;
    views: number;
  }>,
  days: number
) {
  return data.slice(-days);
}

function formatNumber(value: number) {
  return Number(value || 0).toLocaleString("en-IN");
}

function formatCompactNumber(value: number) {
  const number = Number(value || 0);

  if (number >= 10000000) {
    return `${(number / 10000000).toFixed(1)}Cr`;
  }

  if (number >= 100000) {
    return `${(number / 100000).toFixed(1)}L`;
  }

  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`;
  }

  return number.toLocaleString("en-IN");
}

export default function TrafficChart({
  data = [],
  lifetimeData = [],
}: Props) {
  const [expanded, setExpanded] = useState(false);

  /*
   * IMPORTANT:
   * This state belongs only to the expanded preview.
   * The dashboard itself always renders dashboardData = latest 7 days.
   */
  const [range, setRange] =
    useState<TrafficRange>("7d");

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /*
   * Lock page scrolling only while preview is open.
   */
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

  /*
   * ESC closes the preview and resets it to 7 Days.
   */
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

  const normalizedLifetimeData = useMemo(
    () =>
      normalizeLifetimeData(
        lifetimeData
      ),
    [lifetimeData]
  );

  /*
   * =========================================================
   * DASHBOARD DATA
   * =========================================================
   *
   * NEVER depends on `range`.
   *
   * This guarantees that selecting Lifetime inside the modal
   * can never change the regular dashboard chart.
   */
  const dashboardData = useMemo(
    () =>
      getLatestDays(
        normalizedData,
        7
      ),
    [normalizedData]
  );

  /*
   * =========================================================
   * EXPANDED DATA
   * =========================================================
   */
  const chartData = useMemo(() => {
    switch (range) {
      case "lifetime":
        return normalizedLifetimeData.map(
          (item) => ({
            date: item.date,
            views: item.views,
          })
        );

      case "30d":
        return getLatestDays(
          normalizedData,
          30
        );

      case "90d":
        return getLatestDays(
          normalizedData,
          90
        );

      case "7d":
      default:
        return getLatestDays(
          normalizedData,
          7
        );
    }
  }, [
    normalizedData,
    normalizedLifetimeData,
    range,
  ]);

  /*
   * Dashboard summary.
   */
  const dashboardTotal = useMemo(
    () =>
      dashboardData.reduce(
        (sum, item) =>
          sum + Number(item.views || 0),
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
        Number(item.views || 0) >
        Number(max.views || 0)
          ? item
          : max,
      dashboardData[0]
    );
  }, [dashboardData]);

  /*
   * Expanded summary.
   */
  const trafficStats = useMemo(() => {
    const total = chartData.reduce(
      (sum, item) =>
        sum + Number(item.views || 0),
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
              Number(item.views || 0) >
              Number(max.views || 0)
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
            ].views || 0
          )
        : 0;

    const previous =
      chartData.length > 1
        ? Number(
            chartData[
              chartData.length - 2
            ].views || 0
          )
        : 0;

    const change =
      previous > 0
        ? ((latest - previous) /
            previous) *
          100
        : 0;

    return {
      totalViews: total,
      averageViews: average,
      peakDay: peak?.date || "-",
      peakViews: Number(
        peak?.views || 0
      ),
      latestViews: latest,
      previousViews: previous,
      change,
    };
  }, [chartData]);

  /*
   * Keep chart headroom above the 15K reference line.
   */
  const chartMax = useMemo(() => {
    const highest = Math.max(
      ...chartData.map((item) =>
        Number(item.views || 0)
      ),
      VERY_HIGH_THRESHOLD
    );

    return highest * 1.12;
  }, [chartData]);

  /*
   * =========================================================
   * OPEN / CLOSE
   * =========================================================
   *
   * CLOSE ALWAYS RESETS RANGE TO 7 DAYS.
   */
  const closeExpanded = useCallback(() => {
    setExpanded(false);
    setRange("7d");
  }, []);

  const openExpanded = useCallback(
    (
      selectedRange: TrafficRange = "7d"
    ) => {
      setRange(selectedRange);
      setExpanded(true);
    },
    []
  );

  /*
   * Backdrop click.
   *
   * We intentionally put this handler on the actual backdrop
   * instead of relying on target/currentTarget of the outer
   * portal wrapper.
   */
  const handleBackdropMouseDown = useCallback(
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

  /*
   * =========================================================
   * CHART RENDERER
   * =========================================================
   */
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
          <div className="text-center">
            <Activity
              size={22}
              className="
                mx-auto
                mb-2
                text-[var(--admin-text-muted)]
              "
            />

            <p className="text-sm font-semibold text-[var(--admin-text)]">
              No traffic data available
            </p>

            <p className="text-xs text-[var(--admin-text-muted)] mt-1">
              {expandedMode &&
              range === "lifetime"
                ? "No lifetime view history was found."
                : "No view data was found for this period."}
            </p>
          </div>
        </div>
      );
    }

    const localChartMax = Math.max(
      ...chartDataset.map((item) =>
        Number(item.views || 0)
      ),
      VERY_HIGH_THRESHOLD
    ) * 1.12;

    return (
      <div
        style={{
          height: chartHeight,
        }}
        className="w-full"
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
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
                    ? "trafficLineGradientExpanded"
                    : "trafficLineGradientDashboard"
                }
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop
                  offset="0%"
                  stopColor="#087d8a"
                />

                <stop
                  offset="100%"
                  stopColor="#13b8c8"
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#c7e1e5"
              strokeDasharray="4 5"
              strokeOpacity={0.72}
              vertical={true}
              horizontal={true}
            />

            <ReferenceLine
              y={LOW_THRESHOLD}
              stroke="#e5a72f"
              strokeDasharray="6 5"
              strokeWidth={1}
              strokeOpacity={0.8}
              label={{
                value: "2.5K",
                position:
                  "insideTopLeft",
                fill: "#9a6b00",
                fontSize: 9,
                fontWeight: 700,
              }}
            />

            <ReferenceLine
              y={STRONG_THRESHOLD}
              stroke="#21a477"
              strokeDasharray="6 5"
              strokeWidth={1}
              strokeOpacity={0.8}
              label={{
                value: "5K",
                position:
                  "insideTopLeft",
                fill: "#21a477",
                fontSize: 9,
                fontWeight: 700,
              }}
            />

            <ReferenceLine
              y={HIGH_THRESHOLD}
              stroke="#3986d7"
              strokeDasharray="6 5"
              strokeWidth={1}
              strokeOpacity={0.82}
              label={{
                value: "10K",
                position:
                  "insideTopLeft",
                fill: "#3986d7",
                fontSize: 9,
                fontWeight: 700,
              }}
            />

            <ReferenceLine
              y={VERY_HIGH_THRESHOLD}
              stroke="#7c3aed"
              strokeDasharray="6 5"
              strokeWidth={1.2}
              strokeOpacity={0.82}
              label={{
                value: "15K+",
                position:
                  "insideTopLeft",
                fill: "#7c3aed",
                fontSize: 9,
                fontWeight: 700,
              }}
            />

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
              tickFormatter={(value) =>
                formatCompactNumber(
                  Number(value)
                )
              }
            />

            <Tooltip
              cursor={{
                stroke: "#13b8c8",
                strokeWidth: 1,
                strokeDasharray:
                  "4 4",
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
                const views =
                  Number(value || 0);

                const level =
                  getTrafficLevel(
                    views
                  );

                return [
                  `${formatNumber(
                    views
                  )} views`,
                  level.label,
                ];
              }}
            />

            <Line
              type="monotone"
              dataKey="views"
              stroke={
                expandedMode
                  ? "url(#trafficLineGradientExpanded)"
                  : "url(#trafficLineGradientDashboard)"
              }
              strokeWidth={
                expandedMode
                  ? 3
                  : 2.5
              }
              connectNulls
              dot={(props: any) => {
                const cx = props?.cx;
                const cy = props?.cy;
                const payload =
                  props?.payload;

                if (
                  typeof cx !==
                    "number" ||
                  typeof cy !==
                    "number"
                ) {
                  return null;
                }

                const level =
                  getTrafficLevel(
                    Number(
                      payload?.views ||
                        0
                    )
                  );

                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={
                      expandedMode
                        ? 4
                        : 3.5
                    }
                    fill={level.color}
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                );
              }}
              activeDot={{
                r: 6,
                strokeWidth: 2,
                stroke: "#ffffff",
                fill: "#13b8c8",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <>
      {/* =====================================================
          DASHBOARD TRAFFIC CARD
      ===================================================== */}

      <section className="admin-card overflow-hidden">
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
                  Traffic Intelligence
                </h2>
              </div>

              <p className="admin-section-description mt-1.5">
                Real article views · last 7 days
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
              aria-label="Expand traffic analytics"
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
              7 Day Views
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
                getTrafficLevel(
                  Number(
                    dashboardPeak?.views ||
                      0
                  )
                ).soft,

              borderColor:
                `${getTrafficLevel(
                  Number(
                    dashboardPeak?.views ||
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
                  getTrafficLevel(
                    Number(
                      dashboardPeak?.views ||
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
                <span className="w-2 h-2 rounded-full bg-[var(--admin-warning)]" />
                Moderate
              </span>

              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[var(--admin-success)]" />
                Strong
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

      {/* =====================================================
          COMPACT PREMIUM MODAL
      ===================================================== */}

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
            {/* BACKDROP */}

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

            {/* MODAL */}

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
              aria-label="Traffic Intelligence"
            >
              {/* TOP ACCENT */}

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

              {/* HEADER */}

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
                      Traffic Intelligence
                    </h2>

                    <p className="text-[11px] text-[var(--admin-text-muted)] mt-0.5">
                      Real article view performance
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
                  aria-label="Close traffic analytics"
                >
                  <X size={15} />
                </button>
              </div>

              {/* SCROLLABLE BODY */}

              <div
                className="
                  min-h-0
                  overflow-y-auto
                  bg-[var(--admin-workspace)]
                "
              >
                <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-4 sm:py-5">
                  {/* RANGE SELECTOR */}

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
                          Traffic Range
                        </p>

                        <p className="text-[10px] text-[var(--admin-text-muted)]">
                          Select viewing period
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

                  {/* STATS */}

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    <div
                      className="
                        rounded-xl
                        bg-white
                        border
                        border-[var(--admin-border)]
                        p-3.5
                      "
                    >
                      <div className="flex items-center justify-between">
                        <p className="admin-label">
                          Total Views
                        </p>

                        <Eye
                          size={13}
                          className="text-[var(--admin-primary-dark)]"
                        />
                      </div>

                      <p className="admin-metric mt-2.5">
                        {formatNumber(
                          trafficStats.totalViews
                        )}
                      </p>
                    </div>

                    <div
                      className="
                        rounded-xl
                        bg-white
                        border
                        border-[var(--admin-border)]
                        p-3.5
                      "
                    >
                      <p className="admin-label">
                        Average
                      </p>

                      <p className="admin-metric mt-2.5">
                        {formatNumber(
                          trafficStats.averageViews
                        )}
                      </p>
                    </div>

                    <div
                      className="rounded-xl border p-3.5"
                      style={{
                        backgroundColor:
                          getTrafficLevel(
                            trafficStats.peakViews
                          ).soft,

                        borderColor:
                          `${getTrafficLevel(
                            trafficStats.peakViews
                          ).color}35`,
                      }}
                    >
                      <p className="admin-label">
                        Peak Views
                      </p>

                      <p
                        className="admin-metric mt-2.5"
                        style={{
                          color:
                            getTrafficLevel(
                              trafficStats.peakViews
                            ).color,
                        }}
                      >
                        {formatNumber(
                          trafficStats.peakViews
                        )}
                      </p>
                    </div>

                    <div
                      className="
                        rounded-xl
                        bg-white
                        border
                        border-[var(--admin-border)]
                        p-3.5
                      "
                    >
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
                              trafficStats.change >=
                              0
                                ? "bg-[var(--admin-success-soft)] text-[var(--admin-success)]"
                                : "bg-[var(--admin-danger-soft)] text-[var(--admin-danger)]"
                            }
                          `}
                        >
                          {trafficStats.change >=
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
                            trafficStats.change >=
                            0
                              ? "text-xs font-bold text-[var(--admin-success)]"
                              : "text-xs font-bold text-[var(--admin-danger)]"
                          }
                        >
                          {trafficStats.change >=
                          0
                            ? "+"
                            : ""}
                          {trafficStats.change.toFixed(
                            1
                          )}
                          %
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CHART */}

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
                            Traffic Trend
                          </p>
                        </div>

                        <p className="text-[10px] text-[var(--admin-text-muted)] mt-1">
                          {range ===
                          "lifetime"
                            ? "Monthly lifetime view history"
                            : `Daily views · ${
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

                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="flex items-center gap-1 text-[9px] font-semibold text-[var(--admin-text-muted)]">
                          <span className="w-2 h-2 rounded-full bg-[var(--admin-danger)]" />
                          &lt;2.5K
                        </span>

                        <span className="flex items-center gap-1 text-[9px] font-semibold text-[var(--admin-text-muted)]">
                          <span className="w-2 h-2 rounded-full bg-[var(--admin-warning)]" />
                          2.5K
                        </span>

                        <span className="flex items-center gap-1 text-[9px] font-semibold text-[var(--admin-text-muted)]">
                          <span className="w-2 h-2 rounded-full bg-[var(--admin-success)]" />
                          5K
                        </span>

                        <span className="flex items-center gap-1 text-[9px] font-semibold text-[var(--admin-text-muted)]">
                          <span className="w-2 h-2 rounded-full bg-[var(--admin-info)]" />
                          10K
                        </span>

                        <span className="flex items-center gap-1 text-[9px] font-semibold text-[var(--admin-text-muted)]">
                          <span
                            className="
                              w-2
                              h-2
                              rounded-full
                              bg-[#7c3aed]
                            "
                          />
                          15K+
                        </span>
                      </div>
                    </div>

                    <div
                      className="
                        px-2
                        sm:px-4
                        pt-2
                        pb-3
                        bg-[var(--admin-surface-soft)]
                      "
                    >
                      {renderChart(
                        360,
                        true,
                        chartData
                      )}
                    </div>
                  </div>

                  {/* FOOTER */}

                  <div className="flex flex-wrap items-center justify-between gap-3 mt-3 px-1">
                    <div className="flex items-center gap-4">
                      <span className="text-[9px] font-semibold text-[var(--admin-text-muted)]">
                        Peak:{" "}
                        <span className="text-[var(--admin-text-secondary)]">
                          {
                            trafficStats.peakDay
                          }
                        </span>
                      </span>

                      <span className="text-[9px] font-semibold text-[var(--admin-text-muted)]">
                        {chartData.length}{" "}
                        {range ===
                        "lifetime"
                          ? "months"
                          : "days"}
                      </span>
                    </div>

                    <span className="text-[9px] font-semibold text-[var(--admin-text-muted)]">
                      2.5K · 5K · 10K · 15K+
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

