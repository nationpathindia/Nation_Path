"use client";

import {
  Activity,
  Cpu,
  Eye,
  Globe,
  Laptop,
  Monitor,
  Server,
  Smartphone,
  Tablet,
  Users,
} from "lucide-react";
/* =========================================================
   API CONTRACT
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
  fallback: string
) {
  const normalized = value?.trim();

  return normalized || fallback;
}

/* =========================================================
   DEVICE ICON
========================================================= */

function getDeviceIcon(
  device: string
) {
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

  if (
    value.includes("desktop") ||
    value.includes("laptop") ||
    value.includes("computer") ||
    value.includes("mac") ||
    value.includes("windows")
  ) {
    return Monitor;
  }

  return Laptop;
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
}: {
  icon: React.ElementType;
  label: string;
  views: number;
  sessions: number;
  share: number;
}) {
  return (
    <div className="group">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              border
              border-white/[0.06]
              bg-white/[0.035]
              text-gray-500
              transition-colors
              duration-300
              group-hover:border-white/[0.1]
              group-hover:bg-white/[0.055]
              group-hover:text-gray-300
            "
          >
            <Icon size={14} strokeWidth={1.8} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-gray-300">
              {label}
            </p>

            <p className="mt-0.5 text-[10px] text-gray-600">
              {formatNumber(sessions)} sessions
            </p>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-xs font-semibold text-white tabular-nums">
            {formatNumber(views)}
          </p>

          <p className="mt-0.5 text-[10px] font-medium text-gray-600 tabular-nums">
            {formatShare(share)}
          </p>
        </div>
      </div>

      <div
        className="
          mt-2.5
          h-1.5
          overflow-hidden
          rounded-full
          bg-white/[0.055]
        "
      >
        <div
          className="
            h-full
            rounded-full
            bg-[#163C80]
            transition-all
            duration-700
          "
          style={{
            width: `${Math.min(
              Math.max(share, views ? 2 : 0),
              100
            )}%`,
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   COMPACT METRIC
========================================================= */

function MetricCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-xl
        border
        border-white/[0.08]
        bg-black/20
        px-4
        py-4
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-white/[0.15]
        hover:bg-white/[0.045]
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          -right-8
          -top-8
          h-20
          w-20
          rounded-full
          bg-orange-500/[0.07]
          blur-2xl
        "
      />

      <div className="relative">
        <div className="flex items-center gap-2.5">
          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              border
              border-orange-400/10
              bg-orange-500/10
              text-orange-400
            "
          >
            <Icon size={15} strokeWidth={1.9} />
          </div>

          <p
            className="
              truncate
              text-[10px]
              font-medium
              uppercase
              tracking-[0.12em]
              text-gray-500
            "
          >
            {label}
          </p>
        </div>

        <p
          className="
            mt-4
            text-2xl
            font-bold
            leading-none
            tracking-tight
            text-white
            tabular-nums
          "
        >
          {value}
        </p>

        <p className="mt-2 truncate text-[10px] text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold tracking-tight text-white">
        {title}
      </h3>

      <p className="mt-1 text-[11px] text-gray-600">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   DISTRIBUTION PANEL
========================================================= */

function DistributionPanel({
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
        rounded-xl
        border
        border-white/[0.07]
        bg-black/15
        p-4
      "
    >
      <div className="mb-5 flex items-start gap-3">
        <div
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-lg
            border
            border-white/[0.06]
            bg-white/[0.035]
            text-gray-500
          "
        >
          <Icon size={15} strokeWidth={1.8} />
        </div>

        <div className="min-w-0">
          <h3 className="text-xs font-semibold text-white">
            {title}
          </h3>

          <p className="mt-1 text-[10px] leading-relaxed text-gray-600">
            {description}
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   COMPONENT
========================================================= */

export default function AnalyticsAudiencePanel({
  data,
}: AnalyticsAudiencePanelProps) {
  const devices = data?.devices ?? [];
  const browsers = data?.browsers ?? [];
  const operatingSystems =
    data?.operatingSystems ?? [];

  const totalDeviceViews = devices.reduce(
    (sum, item) =>
      sum + number(item.views),
    0
  );

  const totalDeviceSessions = devices.reduce(
    (sum, item) =>
      sum + number(item.sessions),
    0
  );

  const topDevice = devices[0];
  const topBrowser = browsers[0];
  const topOperatingSystem =
    operatingSystems[0];

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.08]
        bg-white/[0.025]
        shadow-[0_20px_70px_rgba(0,0,0,0.18)]
      "
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-orange-500/[0.055]
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          -left-24
          h-64
          w-64
          rounded-full
          bg-[#163C80]/[0.045]
          blur-3xl
        "
      />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          relative
          border-b
          border-white/[0.07]
          px-5
          py-5
          md:px-6
        "
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-orange-400/10
                bg-orange-500/10
                text-orange-400
              "
            >
              <Users size={17} strokeWidth={1.8} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-semibold tracking-tight text-white">
                  Audience Intelligence
                </h2>

                <span
                  className="
                    rounded-full
                    border
                    border-white/[0.07]
                    bg-white/[0.035]
                    px-2
                    py-0.5
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.1em]
                    text-gray-500
                  "
                >
                  Event Based
                </span>
              </div>

              <p className="mt-1 text-xs text-gray-600">
                Audience access patterns across devices, browsers and operating systems.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative space-y-7 p-5 md:p-6">

        {/* ===================================================
            AUDIENCE SNAPSHOT
        =================================================== */}

        <div>
          <SectionHeader
            title="Audience Snapshot"
            description="Selected-period audience access signals from analytics events."
          />

          <div
            className="
              grid
              gap-3
              sm:grid-cols-2
              xl:grid-cols-4
            "
          >
            <MetricCard
              icon={Eye}
              label="Audience Views"
              value={formatNumber(totalDeviceViews)}
              description="Views with device telemetry"
            />

            <MetricCard
              icon={Users}
              label="Device Sessions"
              value={formatNumber(totalDeviceSessions)}
              description="Sessions represented by devices"
            />

            <MetricCard
              icon={Monitor}
              label="Top Device"
              value={normalizeLabel(
                topDevice?.device,
                "Unknown"
              )}
              description={
                topDevice
                  ? `${formatShare(topDevice.share)} of views`
                  : "No device signal"
              }
            />

            <MetricCard
              icon={Globe}
              label="Top Browser"
              value={normalizeLabel(
                topBrowser?.browser,
                "Unknown"
              )}
              description={
                topBrowser
                  ? `${formatShare(topBrowser.share)} of views`
                  : "No browser signal"
              }
            />
          </div>
        </div>

        {/* ===================================================
            DEVICE INTELLIGENCE
        =================================================== */}

        <DistributionPanel
          title="Device Intelligence"
          description="Audience access distribution by device type."
          icon={Monitor}
        >
          {devices.length ? (
            devices.map((item, index) => {
              const label = normalizeLabel(
                item.device,
                "Unknown"
              );

              return (
                <DistributionRow
                  key={`${label}-${index}`}
                  icon={getDeviceIcon(label)}
                  label={label}
                  views={number(item.views)}
                  sessions={number(item.sessions)}
                  share={number(item.share)}
                />
              );
            })
          ) : (
            <EmptyState label="No device telemetry available." />
          )}
        </DistributionPanel>

        {/* ===================================================
            BROWSER + OS
        =================================================== */}

        <div className="grid gap-3 lg:grid-cols-2">

          {/* =================================================
              BROWSER
          ================================================= */}

          <DistributionPanel
            title="Browser Intelligence"
            description="Browser distribution across article view events."
            icon={Globe}
          >
            {browsers.length ? (
              browsers.slice(0, 8).map(
                (item, index) => (
                  <DistributionRow
                    key={`${item.browser}-${index}`}
                    icon={Globe}
                    label={normalizeLabel(
                      item.browser,
                      "Unknown"
                    )}
                    views={number(
                      item.views
                    )}
                    sessions={number(
                      item.sessions
                    )}
                    share={number(
                      item.share
                    )}
                  />
                )
              )
            ) : (
              <EmptyState label="No browser telemetry available." />
            )}
          </DistributionPanel>

          {/* =================================================
              OPERATING SYSTEM
          ================================================= */}

          <DistributionPanel
            title="Operating System"
            description="Operating-system distribution across article view events."
            icon={Cpu}
          >
            {operatingSystems.length ? (
              operatingSystems.slice(0, 8).map(
                (item, index) => (
                  <DistributionRow
                    key={`${item.os}-${index}`}
                    icon={Cpu}
                    label={normalizeLabel(
                      item.os,
                      "Unknown"
                    )}
                    views={number(
                      item.views
                    )}
                    sessions={number(
                      item.sessions
                    )}
                    share={number(
                      item.share
                    )}
                  />
                )
              )
            ) : (
              <EmptyState label="No operating-system telemetry available." />
            )}
          </DistributionPanel>
        </div>

        {/* ===================================================
            DATA SIGNAL
        =================================================== */}

        <div
          className="
            flex
            flex-col
            gap-2
            rounded-xl
            border
            border-white/[0.06]
            bg-white/[0.018]
            px-4
            py-3
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

            <span className="text-[10px] uppercase tracking-[0.12em] text-gray-600">
              Audience telemetry
            </span>
          </div>

          <span className="text-[10px] text-gray-700">
            Device · Browser · OS · Session signals
          </span>
        </div>
      </div>
    </section>
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
        rounded-lg
        border
        border-dashed
        border-white/[0.06]
        bg-white/[0.015]
        px-4
        py-6
        text-center
      "
    >
      <Server
        size={16}
        strokeWidth={1.7}
        className="mx-auto text-gray-700"
      />

      <p className="mt-2 text-[10px] text-gray-600">
        {label}
      </p>
    </div>
  );
}

