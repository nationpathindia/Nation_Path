"use client";

import {
  Activity,
  BookOpen,
  Eye,
  Users,
} from "lucide-react";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* =========================================================
   NATIONPATH ANALYTICS

   TRAFFIC INTELLIGENCE
   LOCKED VERSION

   RESPONSIBILITIES
   ---------------------------------------------------------
   • Visualize API-provided traffic series
   • Views / Reads / Sessions
   • Premium traffic presentation
   • No API calls
   • No database access
   • No backend analytics logic
   • No legacy analytics dependency
========================================================= */

/* =========================================================
   TYPES
========================================================= */

export interface AnalyticsTrafficPoint {
  label: string;
  views?: number;
  reads?: number;
  sessions?: number;
}

interface AnalyticsTrafficChartProps {
  data?: AnalyticsTrafficPoint[];
  title?: string;
  description?: string;
}

/* =========================================================
   SAFE NUMBER
========================================================= */

function number(value?: number): number {
  return typeof value === "number" &&
    Number.isFinite(value)
    ? value
    : 0;
}

/* =========================================================
   FORMAT NUMBER
========================================================= */

function formatNumber(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }

  return value.toLocaleString("en-IN");
}

/* =========================================================
   TOOLTIP
========================================================= */

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;

  payload?: Array<{
    dataKey?: string;
    value?: number;
  }>;

  label?: string;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const labels: Record<string, string> = {
    views: "Views",
    reads: "Reads",
    sessions: "Sessions",
  };

  const icons: Record<string, typeof Eye> = {
    views: Eye,
    reads: BookOpen,
    sessions: Users,
  };

  return (
    <div
      className="
        min-w-[190px]
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.10]
        bg-[#070B14]/95
        shadow-[0_18px_50px_rgba(0,0,0,0.45)]
        backdrop-blur-2xl
      "
    >
      {/* Tooltip header */}

      <div
        className="
          border-b
          border-white/[0.07]
          px-4
          py-3
        "
      >
        <p
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.16em]
            text-gray-500
          "
        >
          Traffic Signal
        </p>

        <p
          className="
            mt-1
            text-xs
            font-medium
            text-gray-300
          "
        >
          {label}
        </p>
      </div>

      {/* Values */}

      <div className="space-y-2 px-4 py-3">
        {payload.map((item) => {
          const key = item.dataKey || "";

          const Icon =
            icons[key] || Activity;

          const iconClass =
            key === "views"
              ? "text-orange-400"
              : key === "reads"
                ? "text-emerald-400"
                : "text-blue-400";

          return (
            <div
              key={key}
              className="
                flex
                items-center
                justify-between
                gap-8
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <Icon
                  size={13}
                  strokeWidth={2}
                  className={iconClass}
                />

                <span
                  className="
                    text-xs
                    text-gray-400
                  "
                >
                  {labels[key] || key}
                </span>
              </div>

              <span
                className="
                  text-xs
                  font-semibold
                  tabular-nums
                  text-white
                "
              >
                {formatNumber(
                  number(item.value)
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   SUMMARY METRIC
========================================================= */

function SummaryMetric({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Eye;
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div
      className="
        group
        relative
        min-w-[108px]
        overflow-hidden
        rounded-xl
        border
        border-white/[0.07]
        bg-black/20
        px-3.5
        py-3
        transition-all
        duration-300
        hover:border-white/[0.12]
        hover:bg-white/[0.035]
      "
    >
      {/* Accent glow */}

      <div
        className={`
          pointer-events-none
          absolute
          -right-4
          -top-5
          h-14
          w-14
          rounded-full
          blur-2xl
          opacity-30
          ${accent}
        `}
      />

      <div
        className="
          relative
          z-10
          flex
          items-center
          gap-1.5
        "
      >
        <Icon
          size={12}
          strokeWidth={2}
          className={
            accent
              .replace("bg-", "text-")
              .replace("/20", "")
          }
        />

        <span
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.13em]
            text-gray-500
          "
        >
          {label}
        </span>
      </div>

      <div
        className="
          relative
          z-10
          mt-1.5
        "
      >
        <p
          className="
            text-base
            font-bold
            leading-none
            tracking-tight
            tabular-nums
            text-white
          "
        >
          {formatNumber(value)}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   CUSTOM LEGEND
========================================================= */

function TrafficLegend() {
  const items = [
    {
      key: "views",
      label: "Views",
      color: "bg-orange-400",
    },
    {
      key: "reads",
      label: "Reads",
      color: "bg-emerald-400",
    },
    {
      key: "sessions",
      label: "Sessions",
      color: "bg-blue-400",
    },
  ];

  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        gap-x-4
        gap-y-2
      "
    >
      {items.map((item) => (
        <div
          key={item.key}
          className="
            flex
            items-center
            gap-1.5
          "
        >
          <span
            className={`
              h-1.5
              w-1.5
              rounded-full
              ${item.color}
            `}
          />

          <span
            className="
              text-[10px]
              font-medium
              text-gray-500
            "
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   COMPONENT
========================================================= */

export default function AnalyticsTrafficChart({
  data = [],
  title = "Content Traffic",
  description =
    "Views, sessions and reads across the selected analytics window.",
}: AnalyticsTrafficChartProps) {
  /* =======================================================
     API DATA → DISPLAY DATA
  ======================================================= */

  const chartData = data.map((item) => ({
    label: item.label,
    views: number(item.views),
    reads: number(item.reads),
    sessions: number(item.sessions),
  }));

  /* =======================================================
     DISPLAY TOTALS

     These summarize only the supplied traffic points.
     No independent analytics source is used.
  ======================================================= */

  const totalViews = chartData.reduce(
    (sum, item) => sum + item.views,
    0
  );

  const totalReads = chartData.reduce(
    (sum, item) => sum + item.reads,
    0
  );

  const totalSessions = chartData.reduce(
    (sum, item) => sum + item.sessions,
    0
  );

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.08]
        bg-white/[0.025]
        shadow-[0_12px_40px_rgba(0,0,0,0.16)]
        backdrop-blur-xl
      "
    >
      {/* ===================================================
          AMBIENT LIGHT
      =================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-20
          -top-24
          h-64
          w-64
          rounded-full
          bg-orange-500/[0.07]
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-24
          bottom-0
          h-48
          w-48
          rounded-full
          bg-blue-500/[0.035]
          blur-3xl
        "
      />

      {/* ===================================================
          HEADER
      =================================================== */}

      <div
        className="
          relative
          z-10
          border-b
          border-white/[0.06]
          px-5
          py-5
          md:px-6
        "
      >
        <div
          className="
            flex
            flex-col
            gap-5
            xl:flex-row
            xl:items-start
            xl:justify-between
          "
        >
          {/* Title */}

          <div className="min-w-0">
            <div
              className="
                flex
                items-center
                gap-2.5
              "
            >
              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-orange-400/15
                  bg-orange-500/10
                "
              >
                <Activity
                  size={15}
                  strokeWidth={1.9}
                  className="text-orange-400"
                />
              </div>

              <div className="min-w-0">
                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-2
                  "
                >
                  <h2
                    className="
                      text-base
                      font-semibold
                      tracking-tight
                      text-white
                    "
                  >
                    {title}
                  </h2>

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      border
                      border-emerald-400/15
                      bg-emerald-400/[0.07]
                      px-2
                      py-1
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-emerald-400
                    "
                  >
                    <span
                      className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-emerald-400
                        shadow-[0_0_8px_rgba(52,211,153,0.7)]
                      "
                    />

                    Live
                  </span>
                </div>

                <p
                  className="
                    mt-1.5
                    max-w-2xl
                    text-xs
                    leading-5
                    text-gray-500
                  "
                >
                  {description}
                </p>
              </div>
            </div>
          </div>

          {/* Summary */}

          <div
            className="
              flex
              max-w-full
              gap-2
              overflow-x-auto
              pb-1
              scrollbar-none
            "
          >
            <SummaryMetric
              icon={Eye}
              label="Views"
              value={totalViews}
              accent="bg-orange-500/20"
            />

            <SummaryMetric
              icon={BookOpen}
              label="Reads"
              value={totalReads}
              accent="bg-emerald-500/20"
            />

            <SummaryMetric
              icon={Users}
              label="Sessions"
              value={totalSessions}
              accent="bg-blue-500/20"
            />
          </div>
        </div>
      </div>

      {/* ===================================================
          CHART AREA
      =================================================== */}

      <div
        className="
          relative
          z-10
          px-4
          pb-5
          pt-4
          md:px-6
        "
      >
        {/* Chart toolbar */}

        <div
          className="
            mb-2
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <TrafficLegend />

          <span
            className="
              hidden
              text-[9px]
              uppercase
              tracking-[0.12em]
              text-gray-700
              sm:block
            "
          >
            Traffic signals
          </span>
        </div>

        {/* Chart */}

        <div
          className="
            h-[285px]
            w-full
          "
        >
          {chartData.length === 0 ? (
            <div
              className="
                flex
                h-full
                flex-col
                items-center
                justify-center
                rounded-xl
                border
                border-dashed
                border-white/[0.08]
                bg-black/[0.10]
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/[0.07]
                  bg-white/[0.025]
                "
              >
                <Activity
                  size={17}
                  className="text-gray-600"
                />
              </div>

              <p
                className="
                  mt-3
                  text-sm
                  font-medium
                  text-gray-500
                "
              >
                No traffic data available
              </p>

              <p
                className="
                  mt-1
                  text-[10px]
                  text-gray-700
                "
              >
                Traffic signals will appear here
              </p>
            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={chartData}
                margin={{
                  top: 14,
                  right: 8,
                  left: -18,
                  bottom: 4,
                }}
              >
                <CartesianGrid
                  stroke="rgba(255,255,255,0.045)"
                  strokeDasharray="3 5"
                  vertical={false}
                />

                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  minTickGap={22}
                  tick={{
                    fill: "#667085",
                    fontSize: 10,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  width={48}
                  tick={{
                    fill: "#667085",
                    fontSize: 10,
                  }}
                  tickFormatter={(value) =>
                    formatNumber(Number(value))
                  }
                />

                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{
                    stroke:
                      "rgba(255,255,255,0.10)",
                    strokeDasharray:
                      "4 4",
                  }}
                />

                {/* Views */}

                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#EA661B"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{
                    r: 4,
                    strokeWidth: 2,
                    stroke: "#070B14",
                  }}
                  animationDuration={700}
                  connectNulls
                />

                {/* Reads */}

                <Line
                  type="monotone"
                  dataKey="reads"
                  stroke="#34D399"
                  strokeWidth={2.2}
                  dot={false}
                  activeDot={{
                    r: 4,
                    strokeWidth: 2,
                    stroke: "#070B14",
                  }}
                  animationDuration={850}
                  connectNulls
                />

                {/* Sessions */}

                <Line
                  type="monotone"
                  dataKey="sessions"
                  stroke="#6D91D8"
                  strokeWidth={2.2}
                  dot={false}
                  activeDot={{
                    r: 4,
                    strokeWidth: 2,
                    stroke: "#070B14",
                  }}
                  animationDuration={1000}
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* ===================================================
          FOOTER SIGNAL
      =================================================== */}

      {chartData.length > 0 && (
        <div
          className="
            relative
            z-10
            flex
            items-center
            justify-between
            border-t
            border-white/[0.05]
            px-5
            py-3
            md:px-6
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-orange-400
              "
            />

            <span
              className="
                text-[9px]
                font-medium
                uppercase
                tracking-[0.12em]
                text-gray-600
              "
            >
              Traffic intelligence
            </span>
          </div>

          <span
            className="
              text-[9px]
              text-gray-700
            "
          >
            {chartData.length} signal points
          </span>
        </div>
      )}
    </section>
  );
}

