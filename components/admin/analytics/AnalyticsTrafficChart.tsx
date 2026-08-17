"use client";

import {
  Activity,
  BookOpen,
  Eye,
  MousePointerClick,
} from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface AnalyticsTrafficPoint {
  label: string;
  views?: number;
  reads?: number;
  opens?: number;
}

interface AnalyticsTrafficChartProps {
  data?: AnalyticsTrafficPoint[];
  title?: string;
  description?: string;
}

function number(value?: number) {
  return Number(value) || 0;
}

function formatNumber(value: number) {
  return value.toLocaleString();
}

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
    opens: "Opens",
  };

  return (
    <div className="min-w-[170px] rounded-xl border border-white/10 bg-[#0B1220]/95 p-4 shadow-2xl backdrop-blur-md">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.08em] text-gray-500">
        {label}
      </p>

      <div className="space-y-2">
        {payload.map((item) => (
          <div
            key={item.dataKey}
            className="flex items-center justify-between gap-6"
          >
            <span className="text-sm text-gray-400">
              {labels[item.dataKey || ""] ||
                item.dataKey}
            </span>

            <span className="text-sm font-semibold text-white">
              {formatNumber(number(item.value))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AnalyticsTrafficChart({
  data = [],
  title = "Content Traffic",
  description = "Views, opens and reads across the selected analytics window.",
}: AnalyticsTrafficChartProps) {
  const chartData = data.map((item) => ({
    label: item.label,
    views: number(item.views),
    reads: number(item.reads),
    opens: number(item.opens),
  }));

  const totalViews = chartData.reduce(
    (sum, item) => sum + item.views,
    0
  );

  const totalReads = chartData.reduce(
    (sum, item) => sum + item.reads,
    0
  );

  const totalOpens = chartData.reduce(
    (sum, item) => sum + item.opens,
    0
  );

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 md:p-6">
      {/* HEADER */}

      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Activity
              size={17}
              strokeWidth={1.8}
              className="text-[#EA661B]"
            />

            <h2 className="text-lg font-semibold text-white">
              {title}
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            {description}
          </p>
        </div>

        {/* SUMMARY */}

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2.5">
            <div className="flex items-center gap-1.5">
              <Eye
                size={13}
                strokeWidth={2}
                className="text-[#EA661B]"
              />

              <span className="text-[10px] font-medium uppercase tracking-wide text-gray-500">
                Views
              </span>
            </div>

            <p className="mt-1 text-sm font-bold text-white">
              {formatNumber(totalViews)}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2.5">
            <div className="flex items-center gap-1.5">
              <BookOpen
                size={13}
                strokeWidth={2}
                className="text-emerald-400"
              />

              <span className="text-[10px] font-medium uppercase tracking-wide text-gray-500">
                Reads
              </span>
            </div>

            <p className="mt-1 text-sm font-bold text-white">
              {formatNumber(totalReads)}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2.5">
            <div className="flex items-center gap-1.5">
              <MousePointerClick
                size={13}
                strokeWidth={2}
                className="text-[#6D91D8]"
              />

              <span className="text-[10px] font-medium uppercase tracking-wide text-gray-500">
                Opens
              </span>
            </div>

            <p className="mt-1 text-sm font-bold text-white">
              {formatNumber(totalOpens)}
            </p>
          </div>
        </div>
      </div>

      {/* CHART */}

      <div className="mt-6 h-[320px] w-full">
        {chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.015]">
            <div className="text-center">
              <Activity
                size={22}
                strokeWidth={1.6}
                className="mx-auto text-gray-600"
              />

              <p className="mt-3 text-sm text-gray-500">
                No traffic data available for this period.
              </p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={chartData}
              margin={{
                top: 10,
                right: 8,
                left: -18,
                bottom: 5,
              }}
            >
              <CartesianGrid
                stroke="rgba(255,255,255,0.07)"
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#6B7280",
                  fontSize: 11,
                }}
                tickMargin={10}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#6B7280",
                  fontSize: 11,
                }}
                tickFormatter={(value) =>
                  Number(value).toLocaleString()
                }
                width={50}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke:
                    "rgba(255,255,255,0.12)",
                  strokeWidth: 1,
                }}
              />

              <Legend
                verticalAlign="top"
                align="right"
                height={28}
                iconType="circle"
                wrapperStyle={{
                  fontSize: "11px",
                  color: "#9CA3AF",
                }}
                formatter={(value) => {
                  if (value === "views") {
                    return "Views";
                  }

                  if (value === "reads") {
                    return "Reads";
                  }

                  return "Opens";
                }}
              />

              <Line
                type="monotone"
                dataKey="views"
                stroke="#EA661B"
                strokeWidth={2.5}
                dot={false}
                activeDot={{
                  r: 4,
                  strokeWidth: 0,
                }}
                connectNulls
              />

              <Line
                type="monotone"
                dataKey="reads"
                stroke="#34D399"
                strokeWidth={2.2}
                dot={false}
                activeDot={{
                  r: 4,
                  strokeWidth: 0,
                }}
                connectNulls
              />

              <Line
                type="monotone"
                dataKey="opens"
                stroke="#6D91D8"
                strokeWidth={2.2}
                dot={false}
                activeDot={{
                  r: 4,
                  strokeWidth: 0,
                }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}

