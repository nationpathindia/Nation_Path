"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Props {
  data: any[];
}

export default function PublishingTrend({
  data = [],
}: Props) {
  const totalPublished = data.reduce(
    (sum, item) => sum + (item.articles || 0),
    0
  );

  const avgPublished =
    data.length > 0
      ? Math.round(totalPublished / data.length)
      : 0;

  const highestDay =
    data.length > 0
      ? data.reduce(
          (max, item) =>
            item.articles > max.articles ? item : max,
          {
            date: "-",
            articles: 0,
          }
        )
      : {
          date: "-",
          articles: 0,
        };

  return (
    <div
      className="
      bg-black/30
      backdrop-blur-xl
      border
      border-white/10
      rounded-2xl
      p-6
      "
    >
      {/* ================= HEADER ================= */}

      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Publishing Trend
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Daily newsroom publishing performance
          </p>
        </div>
      </div>

      {/* ================= SUMMARY ================= */}

      <div
        className="
        grid
        grid-cols-3
        gap-4
        mb-7
        "
      >
        <div
          className="
          rounded-xl
          border
          border-white/10
          bg-white/5
          p-4
          "
        >
          <p className="text-xs text-gray-400">
            Total Published
          </p>

          <h3 className="text-2xl font-bold mt-2 text-white">
            {totalPublished}
          </h3>
        </div>

        <div
          className="
          rounded-xl
          border
          border-white/10
          bg-white/5
          p-4
          "
        >
          <p className="text-xs text-gray-400">
            Daily Average
          </p>

          <h3 className="text-2xl font-bold mt-2 text-white">
            {avgPublished}
          </h3>
        </div>

        <div
          className="
          rounded-xl
          border
          border-white/10
          bg-white/5
          p-4
          "
        >
          <p className="text-xs text-gray-400">
            Peak Day
          </p>

          <h3 className="text-lg font-bold mt-2 text-white">
            {highestDay.date}
          </h3>

          <p className="text-sm text-gray-400 mt-1">
            {highestDay.articles} Articles
          </p>
        </div>
      </div>

      {/* ================= CHART ================= */}

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>
          <CartesianGrid
            stroke="#334155"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="date"
            stroke="#94A3B8"
            tick={{
              fill: "#CBD5E1",
              fontSize: 12,
            }}
          />

          <YAxis
            stroke="#94A3B8"
            tick={{
              fill: "#CBD5E1",
              fontSize: 12,
            }}
          />

          <Tooltip
            cursor={{
              fill: "rgba(255,255,255,0.05)",
            }}
            contentStyle={{
              background: "#0F172A",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: "14px",
              color: "#ffffff",
            }}
            labelStyle={{
              color: "#ffffff",
              fontWeight: 700,
            }}
            itemStyle={{
              color: "#ffffff",
              fontWeight: 600,
            }}
            formatter={(value: any) => [
              `${value} Articles`,
              "Published",
            ]}
          />

          <Bar
            dataKey="articles"
            radius={[8, 8, 0, 0]}
          >
            {data.map((entry, index) => {
              let color = "#EF4444";

              if (entry.articles >= 20) {
                color = "#22C55E";
              } else if (entry.articles >= 10) {
                color = "#EAB308";
              } else if (entry.articles >= 5) {
                color = "#F97316";
              }

              return (
                <Cell
                  key={index}
                  fill={color}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* ================= LEGEND ================= */}

      <div
        className="
        flex
        flex-wrap
        gap-5
        mt-6
        text-xs
        text-gray-300
        "
      >
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-red-500" />
          Low (0–4)
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-orange-500" />
          Moderate (5–9)
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-yellow-400" />
          Good (10–19)
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-green-500" />
          Excellent (20+)
        </div>
      </div>
    </div>
  );
}