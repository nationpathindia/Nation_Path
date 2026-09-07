"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  ChevronRight,
  CircleHelp,
  Cpu,
  Eye,
  Globe,
  Monitor,
  Server,
  Smartphone,
  Tablet,
  Users,
  X,
} from "lucide-react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

/* =========================================================
   API CONTRACT — UNCHANGED
========================================================= */

export interface AnalyticsAudienceDevice {
  device?: string;
  views?: number;
  sessions?: number;
  share?: number;
}

export interface AnalyticsAudienceBrowser {
  browser?: string;
  views?: number;
  sessions?: number;
  share?: number;
}

export interface AnalyticsAudienceOperatingSystem {
  os?: string;
  views?: number;
  sessions?: number;
  share?: number;
}

export interface AnalyticsAudiencePanelData {
  devices?: AnalyticsAudienceDevice[];
  browsers?: AnalyticsAudienceBrowser[];
  operatingSystems?: AnalyticsAudienceOperatingSystem[];
}

interface AnalyticsAudiencePanelProps {
  data?: AnalyticsAudiencePanelData;
}

/* =========================================================
   TYPES
========================================================= */

type AudienceMode =
  | "devices"
  | "browsers"
  | "operatingSystems";

/* =========================================================
   HELPERS
========================================================= */

function number(value?: number) {
  return Number.isFinite(value) ? Number(value) : 0;
}

function formatNumber(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }

  return value.toLocaleString("en-IN");
}

function formatShare(value?: number) {
  const share = number(value);

  if (share <= 0) {
    return "0%";
  }

  return `${share % 1 === 0 ? share.toFixed(0) : share.toFixed(1)}%`;
}

function normalizeLabel(
  value: string | undefined,
  fallback: string,
) {
  const normalized = value?.trim();

  return normalized || fallback;
}

function getDeviceIcon(device: string) {
  const value = device.toLowerCase();

  if (
    value.includes("mobile") ||
    value.includes("phone") ||
    value.includes("android") ||
    value.includes("iphone")
  ) {
    return Smartphone;
  }

  if (
    value.includes("tablet") ||
    value.includes("ipad")
  ) {
    return Tablet;
  }

  return Monitor;
}

function getModeLabel(mode: AudienceMode) {
  if (mode === "devices") return "Devices";
  if (mode === "browsers") return "Browsers";
  return "Operating Systems";
}

function getModeDescription(mode: AudienceMode) {
  if (mode === "devices") {
    return "How readers access NationPath.";
  }

  if (mode === "browsers") {
    return "Browser distribution across readers.";
  }

  return "Operating-system distribution across readers.";
}

function getModeIcon(mode: AudienceMode) {
  if (mode === "devices") return Monitor;
  if (mode === "browsers") return Globe;
  return Cpu;
}

function getModeKey(mode: AudienceMode) {
  if (mode === "devices") return "device";
  if (mode === "browsers") return "browser";
  return "os";
}

/* =========================================================
   CHART PALETTE
========================================================= */

const CHART_SEGMENTS = [
  "#f97316",
  "#3b82f6",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
];

/* =========================================================
   MINI STAT
========================================================= */

function MiniStat({
  icon: Icon,
  label,
  value,
  meta,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  meta: string;
}) {
  return (
    <div
      className="
        min-w-0
        border-r border-white/[0.045]
        px-3
        last:border-r-0
        sm:px-3.5
      "
    >
      <div className="flex items-center gap-1.5">
        <Icon
          size={11}
          strokeWidth={1.7}
          className="shrink-0 text-gray-600"
        />

        <span
          className="
            truncate
            text-[7px]
            font-medium
            uppercase
            tracking-[0.1em]
            text-gray-600
          "
        >
          {label}
        </span>
      </div>

      <div className="mt-1 flex min-w-0 items-baseline gap-1.5">
        <span
          className="
            truncate
            text-[13px]
            font-semibold
            leading-none
            tracking-tight
            text-gray-200
            tabular-nums
          "
        >
          {value}
        </span>

        <span
          className="
            truncate
            text-[7px]
            text-gray-700
          "
        >
          {meta}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   DISTRIBUTION ROW
========================================================= */

function DistributionRow({
  icon: Icon,
  label,
  views,
  sessions,
  share,
  accent = "#163C80",
}: {
  icon: React.ElementType;
  label: string;
  views: number;
  sessions: number;
  share: number;
  accent?: string;
}) {
  const isUnknown =
    label.toLowerCase() === "unknown";

  return (
    <div className="group">
      <div className="flex items-center gap-2.5">
        <div
          className="
            flex h-6 w-6 shrink-0 items-center justify-center
            rounded-md
            border border-white/[0.045]
            bg-white/[0.015]
            text-gray-600
            transition-colors
            group-hover:border-white/[0.07]
            group-hover:text-gray-400
          "
        >
          <Icon
            size={11}
            strokeWidth={1.7}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-1.5">
              <span
                className="
                  truncate
                  text-[10px]
                  font-medium
                  text-gray-300
                "
              >
                {label}
              </span>

              {isUnknown ? (
                <CircleHelp
                  size={9}
                  strokeWidth={1.5}
                  className="shrink-0 text-gray-800"
                />
              ) : null}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <span className="text-[9px] text-gray-600 tabular-nums">
                {formatNumber(views)}
              </span>

              <span
                className="
                  min-w-[28px]
                  text-right
                  text-[8px]
                  font-medium
                  text-gray-500
                  tabular-nums
                "
              >
                {formatShare(share)}
              </span>
            </div>
          </div>

          <div className="mt-1 flex items-center justify-between gap-2">
            <span className="text-[8px] text-gray-700">
              {formatNumber(sessions)} sessions
            </span>

            <div
              className="
                h-[2px]
                w-20
                overflow-hidden
                rounded-full
                bg-white/[0.035]
                sm:w-28
              "
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(
                    Math.max(share, views ? 3 : 0),
                    100,
                  )}%`,
                  backgroundColor: accent,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   INTELLIGENCE PANEL
========================================================= */

function IntelligencePanel({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        rounded-lg
        border border-white/[0.045]
        bg-black/[0.08]
        px-3
        py-3
      "
    >
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <Icon
            size={12}
            strokeWidth={1.6}
            className="shrink-0 text-gray-600"
          />

          <div className="min-w-0">
            <h3 className="truncate text-[10px] font-semibold text-gray-300">
              {title}
            </h3>

            <p className="truncate text-[8px] text-gray-700">
              {description}
            </p>
          </div>
        </div>

        <Activity
          size={11}
          strokeWidth={1.5}
          className="shrink-0 text-gray-800"
        />
      </div>

      <div className="space-y-2.5">
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  label,
}: {
  label: string;
}) {
  return (
    <div
      className="
        rounded-md
        border border-dashed border-white/[0.04]
        px-3
        py-4
        text-center
      "
    >
      <Server
        size={13}
        strokeWidth={1.5}
        className="mx-auto text-gray-800"
      />

      <p className="mt-1 text-[8px] text-gray-700">
        {label}
      </p>
    </div>
  );
}

/* =========================================================
   MODE SWITCHER
========================================================= */

function AudienceModeSwitcher({
  mode,
  onChange,
}: {
  mode: AudienceMode;
  onChange: (mode: AudienceMode) => void;
}) {
  const modes: {
    id: AudienceMode;
    label: string;
    icon: React.ElementType;
  }[] = [
    {
      id: "devices",
      label: "Device",
      icon: Monitor,
    },
    {
      id: "browsers",
      label: "Browser",
      icon: Globe,
    },
    {
      id: "operatingSystems",
      label: "OS",
      icon: Cpu,
    },
  ];

  return (
    <div
      className="
        flex
        rounded-md
        border border-white/[0.045]
        bg-black/[0.12]
        p-0.5
      "
    >
      {modes.map((item) => {
        const Icon = item.icon;
        const active = mode === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={`
              flex
              items-center
              gap-1
              rounded
              px-2
              py-1
              text-[7px]
              font-medium
              transition-all
              ${
                active
                  ? "bg-white/[0.06] text-gray-300 shadow-sm"
                  : "text-gray-700 hover:text-gray-500"
              }
            `}
          >
            <Icon
              size={9}
              strokeWidth={1.7}
            />

            <span className="hidden sm:inline">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* =========================================================
   GENERIC AUDIENCE CHART
========================================================= */

function AudienceChart({
  mode,
  items,
}: {
  mode: AudienceMode;
  items:
    | AnalyticsAudienceDevice[]
    | AnalyticsAudienceBrowser[]
    | AnalyticsAudienceOperatingSystem[];
}) {
  const chartData = items
    .filter((item) => number(item.views) > 0)
    .slice(0, 5)
    .map((item) => {
      const key = getModeKey(mode);

      const label =
        key === "device"
          ? normalizeLabel(
              (
                item as AnalyticsAudienceDevice
              ).device,
              "Unknown",
            )
          : key === "browser"
            ? normalizeLabel(
                (
                  item as AnalyticsAudienceBrowser
                ).browser,
                "Unknown",
              )
            : normalizeLabel(
                (
                  item as AnalyticsAudienceOperatingSystem
                ).os,
                "Unknown",
              );

      return {
        name: label,
        value: number(item.views),
      };
    });

  if (!chartData.length) {
    return (
      <div
        className="
          flex h-[118px]
          items-center justify-center
          rounded-lg
          border border-white/[0.04]
          bg-black/[0.08]
        "
      >
        <div className="text-center">
          <BarChart3
            size={18}
            strokeWidth={1.4}
            className="mx-auto text-gray-800"
          />

          <p className="mt-2 text-[8px] text-gray-700">
            No audience telemetry available.
          </p>
        </div>
      </div>
    );
  }

  const totalViews = chartData.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  return (
    <div
      className="
        relative
        h-[118px]
        overflow-hidden
        rounded-lg
        border border-white/[0.04]
        bg-black/[0.08]
      "
    >
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-[radial-gradient(circle_at_50%_48%,rgba(249,115,22,0.065),transparent_46%)]
        "
      />

      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={34}
            outerRadius={48}
            paddingAngle={3}
            stroke="transparent"
            isAnimationActive
          >
            {chartData.map((_, index) => (
              <Cell
                key={`${mode}-cell-${index}`}
                fill={
                  CHART_SEGMENTS[
                    index % CHART_SEGMENTS.length
                  ]
                }
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              background: "#101114",
              border:
                "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              fontSize: 10,
            }}
            formatter={(value) => [
              formatNumber(Number(value)),
              "Views",
            ]}
          />
        </PieChart>
      </ResponsiveContainer>

      <div
        className="
          pointer-events-none
          absolute inset-0
          flex items-center justify-center
        "
      >
        <div className="text-center">
          <div
            className="
              text-[17px]
              font-semibold
              tracking-tight
              text-gray-200
              tabular-nums
            "
          >
            {formatNumber(totalViews)}
          </div>

          <div
            className="
              mt-0.5
              text-[7px]
              uppercase
              tracking-[0.12em]
              text-gray-700
            "
          >
            {mode === "devices"
              ? "Device views"
              : mode === "browsers"
                ? "Browser views"
                : "OS views"}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   CHART LEGEND
========================================================= */

function AudienceLegend({
  mode,
  items,
}: {
  mode: AudienceMode;
  items:
    | AnalyticsAudienceDevice[]
    | AnalyticsAudienceBrowser[]
    | AnalyticsAudienceOperatingSystem[];
}) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
      {items.slice(0, 5).map((item, index) => {
        const key = getModeKey(mode);

        const label =
          key === "device"
            ? normalizeLabel(
                (
                  item as AnalyticsAudienceDevice
                ).device,
                "Unknown",
              )
            : key === "browser"
              ? normalizeLabel(
                  (
                    item as AnalyticsAudienceBrowser
                  ).browser,
                  "Unknown",
                )
              : normalizeLabel(
                  (
                    item as AnalyticsAudienceOperatingSystem
                  ).os,
                  "Unknown",
                );

        return (
          <div
            key={`${label}-${index}`}
            className="flex min-w-0 items-center gap-2"
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{
                backgroundColor:
                  CHART_SEGMENTS[
                    index % CHART_SEGMENTS.length
                  ],
              }}
            />

            <span
              className="
                min-w-0
                flex-1
                truncate
                text-[8px]
                text-gray-500
              "
            >
              {label}
            </span>

            <span
              className="
                shrink-0
                text-[8px]
                font-medium
                text-gray-600
                tabular-nums
              "
            >
              {formatShare(item.share)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function AnalyticsAudiencePanel({
  data,
}: AnalyticsAudiencePanelProps) {
  const devices = data?.devices ?? [];
  const browsers = data?.browsers ?? [];
  const operatingSystems =
    data?.operatingSystems ?? [];

  const [showAll, setShowAll] =
    useState(false);

  const [mode, setMode] =
    useState<AudienceMode>("devices");

  const totalDeviceViews = devices.reduce(
    (sum, item) =>
      sum + number(item.views),
    0,
  );

  const totalDeviceSessions = devices.reduce(
    (sum, item) =>
      sum + number(item.sessions),
    0,
  );

  const topDevice = devices[0];
  const topBrowser = browsers[0];

  const selectedItems = useMemo(() => {
    if (mode === "browsers") {
      return browsers;
    }

    if (mode === "operatingSystems") {
      return operatingSystems;
    }

    return devices;
  }, [
    mode,
    devices,
    browsers,
    operatingSystems,
  ]);

  const selectedTotalViews =
    selectedItems.reduce(
      (sum, item) =>
        sum + number(item.views),
      0,
    );

  const knownSelectedViews =
    selectedItems
      .filter((item) => {
        const key = getModeKey(mode);

        const label =
          key === "device"
            ? (
                item as AnalyticsAudienceDevice
              ).device
            : key === "browser"
              ? (
                  item as AnalyticsAudienceBrowser
                ).browser
              : (
                  item as AnalyticsAudienceOperatingSystem
                ).os;

        return (
          normalizeLabel(
            label,
            "Unknown",
          ).toLowerCase() !== "unknown"
        );
      })
      .reduce(
        (sum, item) =>
          sum + number(item.views),
        0,
      );

  const unknownSelectedViews =
    Math.max(
      selectedTotalViews -
        knownSelectedViews,
      0,
    );

  const topSelected = selectedItems[0];

  const allAudienceRows = useMemo(
    () => ({
      devices,
      browsers,
      operatingSystems,
    }),
    [
      devices,
      browsers,
      operatingSystems,
    ],
  );

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-xl
        border border-white/[0.055]
        bg-[#101114]
        shadow-[0_18px_55px_rgba(0,0,0,0.18)]
        lg:min-h-[620px]
      "
    >
      {/* =================================================
          AMBIENT GLOW
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-24
          h-52
          w-52
          rounded-full
          bg-orange-500/[0.035]
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          -left-20
          h-52
          w-52
          rounded-full
          bg-violet-500/[0.025]
          blur-3xl
        "
      />

      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          relative z-10
          flex items-center justify-between
          border-b border-white/[0.045]
          px-4
          py-3
        "
      >
        <div className="flex min-w-0 items-center gap-2">
          <div
            className="
              flex h-7 w-7 shrink-0
              items-center justify-center
              rounded-md
              border border-orange-400/[0.07]
              bg-orange-500/[0.035]
              text-orange-300/70
            "
          >
            <Users
              size={12}
              strokeWidth={1.6}
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2
                className="
                  truncate
                  text-[11px]
                  font-semibold
                  tracking-tight
                  text-gray-200
                "
              >
                Audience Intelligence
              </h2>

              <span
                className="
                  hidden
                  rounded-full
                  border border-white/[0.04]
                  px-1.5
                  py-0.5
                  text-[6px]
                  font-medium
                  uppercase
                  tracking-[0.1em]
                  text-gray-700
                  sm:inline-flex
                "
              >
                Event Based
              </span>
            </div>

            <p className="mt-0.5 truncate text-[8px] text-gray-700">
              Device, browser and operating-system signals.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />

          <span
            className="
              hidden
              text-[6px]
              font-medium
              uppercase
              tracking-[0.1em]
              text-gray-700
              sm:block
            "
          >
            Live
          </span>
        </div>
      </div>

      {/* =================================================
          CONTENT — NO INTERNAL SCROLLBAR
      ================================================= */}

      <div
        className="
          relative z-10
          p-3.5
        "
      >
        <div className="space-y-3">

          {/* =================================================
              SNAPSHOT
          ================================================= */}

          <div
            className="
              grid
              grid-cols-2
              rounded-lg
              border border-white/[0.04]
              bg-black/[0.07]
              py-2.5
              sm:grid-cols-4
            "
          >
            <MiniStat
              icon={Eye}
              label="Views"
              value={formatNumber(
                totalDeviceViews,
              )}
              meta="device"
            />

            <MiniStat
              icon={Users}
              label="Sessions"
              value={formatNumber(
                totalDeviceSessions,
              )}
              meta="device"
            />

            <MiniStat
              icon={Monitor}
              label="Top Device"
              value={normalizeLabel(
                topDevice?.device,
                "Unknown",
              )}
              meta={
                topDevice
                  ? formatShare(
                      topDevice.share,
                    )
                  : "—"
              }
            />

            <MiniStat
              icon={Globe}
              label="Top Browser"
              value={normalizeLabel(
                topBrowser?.browser,
                "Unknown",
              )}
              meta={
                topBrowser
                  ? formatShare(
                      topBrowser.share,
                    )
                  : "—"
              }
            />
          </div>

          {/* =================================================
              AUDIENCE EXPLORER
          ================================================= */}

          <div
            className="
              rounded-lg
              border border-white/[0.045]
              bg-black/[0.08]
              p-3
            "
          >
            <div
              className="
                mb-2.5
                flex
                items-start
                justify-between
                gap-3
              "
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  {(() => {
                    const Icon =
                      getModeIcon(mode);

                    return (
                      <Icon
                        size={11}
                        strokeWidth={1.6}
                        className="text-gray-600"
                      />
                    );
                  })()}

                  <h3 className="text-[10px] font-semibold text-gray-300">
                    Audience Distribution
                  </h3>
                </div>

                <p className="mt-0.5 text-[8px] text-gray-700">
                  {getModeDescription(mode)}
                </p>
              </div>

              <AudienceModeSwitcher
                mode={mode}
                onChange={setMode}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-[1.05fr_0.95fr]">
              {/* Chart */}

              <AudienceChart
                mode={mode}
                items={selectedItems}
              />

              {/* Intelligence */}

              <div className="flex min-h-[118px] flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[7px] font-medium uppercase tracking-[0.1em] text-gray-700">
                      Leading signal
                    </span>

                    <BarChart3
                      size={10}
                      strokeWidth={1.5}
                      className="text-gray-800"
                    />
                  </div>

                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="max-w-[130px] truncate text-[15px] font-semibold tracking-tight text-gray-200">
                      {topSelected
                        ? normalizeLabel(
                            mode === "devices"
                              ? (
                                  topSelected as AnalyticsAudienceDevice
                                ).device
                              : mode === "browsers"
                                ? (
                                    topSelected as AnalyticsAudienceBrowser
                                  ).browser
                                : (
                                    topSelected as AnalyticsAudienceOperatingSystem
                                  ).os,
                            "Unknown",
                          )
                        : "Unknown"}
                    </span>

                    <span className="text-[8px] text-gray-600">
                      {topSelected
                        ? formatShare(
                            topSelected.share,
                          )
                        : "0%"}
                    </span>
                  </div>

                  <p className="mt-1 text-[8px] leading-relaxed text-gray-700">
                    Highest share in the selected
                    audience dimension.
                  </p>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div
                    className="
                      rounded-md
                      border border-white/[0.04]
                      bg-white/[0.012]
                      px-2
                      py-1.5
                    "
                  >
                    <div className="text-[7px] uppercase tracking-[0.08em] text-gray-700">
                      Known
                    </div>

                    <div className="mt-0.5 text-[11px] font-semibold text-gray-400 tabular-nums">
                      {formatShare(
                        selectedTotalViews
                          ? (knownSelectedViews /
                              selectedTotalViews) *
                              100
                          : 0,
                      )}
                    </div>
                  </div>

                  <div
                    className="
                      rounded-md
                      border border-white/[0.04]
                      bg-white/[0.012]
                      px-2
                      py-1.5
                    "
                  >
                    <div className="text-[7px] uppercase tracking-[0.08em] text-gray-700">
                      Unknown
                    </div>

                    <div className="mt-0.5 text-[11px] font-semibold text-gray-500 tabular-nums">
                      {formatShare(
                        selectedTotalViews
                          ? (unknownSelectedViews /
                              selectedTotalViews) *
                              100
                          : 0,
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {selectedItems.length ? (
              <div className="mt-3">
                <AudienceLegend
                  mode={mode}
                  items={selectedItems}
                />
              </div>
            ) : null}
          </div>

          {/* =================================================
              BROWSER + OS
          ================================================= */}

          <div className="grid gap-3 sm:grid-cols-2">
            <IntelligencePanel
              title="Browser"
              description="Browser distribution across view events."
              icon={Globe}
            >
              {browsers.length ? (
                browsers
                  .slice(0, 4)
                  .map((item, index) => (
                    <DistributionRow
                      key={`${item.browser}-${index}`}
                      icon={Globe}
                      label={normalizeLabel(
                        item.browser,
                        "Unknown",
                      )}
                      views={number(
                        item.views,
                      )}
                      sessions={number(
                        item.sessions,
                      )}
                      share={number(
                        item.share,
                      )}
                      accent={
                        CHART_SEGMENTS[
                          index %
                            CHART_SEGMENTS.length
                        ]
                      }
                    />
                  ))
              ) : (
                <EmptyState label="No browser telemetry available." />
              )}
            </IntelligencePanel>

            <IntelligencePanel
              title="Operating System"
              description="OS distribution across view events."
              icon={Cpu}
            >
              {operatingSystems.length ? (
                operatingSystems
                  .slice(0, 4)
                  .map((item, index) => (
                    <DistributionRow
                      key={`${item.os}-${index}`}
                      icon={Cpu}
                      label={normalizeLabel(
                        item.os,
                        "Unknown",
                      )}
                      views={number(
                        item.views,
                      )}
                      sessions={number(
                        item.sessions,
                      )}
                      share={number(
                        item.share,
                      )}
                      accent={
                        CHART_SEGMENTS[
                          (index + 2) %
                            CHART_SEGMENTS.length
                        ]
                      }
                    />
                  ))
              ) : (
                <EmptyState label="No operating-system telemetry available." />
              )}
            </IntelligencePanel>
          </div>

          {/* =================================================
              VIEW ALL
          ================================================= */}

          {(devices.length > 5 ||
            browsers.length > 4 ||
            operatingSystems.length > 4) && (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-1.5
                rounded-lg
                border border-white/[0.045]
                bg-white/[0.012]
                px-3
                py-2
                text-[8px]
                font-medium
                text-gray-600
                transition-all
                hover:border-orange-400/[0.12]
                hover:bg-orange-500/[0.025]
                hover:text-gray-300
              "
            >
              <Globe size={10} />

              View all audience intelligence

              <ChevronRight
                size={10}
                className="text-gray-700"
              />
            </button>
          )}

          {/* =================================================
              SIGNAL FOOTER
          ================================================= */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-3
              border-t
              border-white/[0.035]
              pt-2.5
            "
          >
            <div className="flex min-w-0 items-center gap-1.5">
              <span className="h-1 w-1 shrink-0 rounded-full bg-emerald-400/60" />

              <span
                className="
                  text-[7px]
                  font-medium
                  uppercase
                  tracking-[0.1em]
                  text-gray-700
                "
              >
                Audience telemetry
              </span>
            </div>

            <span className="truncate text-right text-[7px] text-gray-800">
              Device · Browser · OS · Session
            </span>
          </div>
        </div>
      </div>

      {/* =================================================
          ALL AUDIENCE MODAL
      ================================================= */}

      {showAll && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/70
            p-3
            backdrop-blur-sm
            sm:p-6
          "
          role="dialog"
          aria-modal="true"
          aria-label="All audience intelligence"
        >
          <div
            className="
              max-h-[85vh]
              w-full
              max-w-3xl
              overflow-hidden
              rounded-2xl
              border border-white/[0.08]
              bg-[#101114]
              shadow-[0_30px_100px_rgba(0,0,0,0.55)]
            "
          >
            {/* Modal Header */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-white/[0.055]
                px-4
                py-3.5
              "
            >
              <div className="flex items-center gap-2">
                <div
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-orange-400/[0.08]
                    bg-orange-500/[0.04]
                    text-orange-300/70
                  "
                >
                  <Users size={13} />
                </div>

                <div>
                  <h3 className="text-[12px] font-semibold text-gray-200">
                    All Audience Intelligence
                  </h3>

                  <p className="mt-0.5 text-[8px] text-gray-700">
                    Complete event-based audience telemetry.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowAll(false)
                }
                aria-label="Close"
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-md
                  border
                  border-white/[0.05]
                  bg-white/[0.02]
                  text-gray-600
                  transition-colors
                  hover:bg-white/[0.04]
                  hover:text-gray-300
                "
              >
                <X size={13} />
              </button>
            </div>

            {/* Modal Body */}

            <div
              className="
                max-h-[calc(85vh-66px)]
                overflow-y-auto
                p-4
              "
            >
              <div className="grid gap-4 md:grid-cols-3">

                {/* Devices */}

                <IntelligencePanel
                  title="Devices"
                  description="All device signals."
                  icon={Monitor}
                >
                  {allAudienceRows.devices.length ? (
                    allAudienceRows.devices.map(
                      (item, index) => (
                        <DistributionRow
                          key={`modal-device-${index}`}
                          icon={getDeviceIcon(
                            normalizeLabel(
                              item.device,
                              "Unknown",
                            ),
                          )}
                          label={normalizeLabel(
                            item.device,
                            "Unknown",
                          )}
                          views={number(
                            item.views,
                          )}
                          sessions={number(
                            item.sessions,
                          )}
                          share={number(
                            item.share,
                          )}
                          accent={
                            CHART_SEGMENTS[
                              index %
                                CHART_SEGMENTS.length
                            ]
                          }
                        />
                      ),
                    )
                  ) : (
                    <EmptyState label="No device telemetry available." />
                  )}
                </IntelligencePanel>

                {/* Browsers */}

                <IntelligencePanel
                  title="Browsers"
                  description="All browser signals."
                  icon={Globe}
                >
                  {allAudienceRows.browsers.length ? (
                    allAudienceRows.browsers.map(
                      (item, index) => (
                        <DistributionRow
                          key={`modal-browser-${index}`}
                          icon={Globe}
                          label={normalizeLabel(
                            item.browser,
                            "Unknown",
                          )}
                          views={number(
                            item.views,
                          )}
                          sessions={number(
                            item.sessions,
                          )}
                          share={number(
                            item.share,
                          )}
                          accent={
                            CHART_SEGMENTS[
                              index %
                                CHART_SEGMENTS.length
                            ]
                          }
                        />
                      ),
                    )
                  ) : (
                    <EmptyState label="No browser telemetry available." />
                  )}
                </IntelligencePanel>

                {/* Operating Systems */}

                <IntelligencePanel
                  title="Operating Systems"
                  description="All OS signals."
                  icon={Cpu}
                >
                  {allAudienceRows.operatingSystems.length ? (
                    allAudienceRows.operatingSystems.map(
                      (item, index) => (
                        <DistributionRow
                          key={`modal-os-${index}`}
                          icon={Cpu}
                          label={normalizeLabel(
                            item.os,
                            "Unknown",
                          )}
                          views={number(
                            item.views,
                          )}
                          sessions={number(
                            item.sessions,
                          )}
                          share={number(
                            item.share,
                          )}
                          accent={
                            CHART_SEGMENTS[
                              index %
                                CHART_SEGMENTS.length
                            ]
                          }
                        />
                      ),
                    )
                  ) : (
                    <EmptyState label="No operating-system telemetry available." />
                  )}
                </IntelligencePanel>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}