"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ChevronRight,
  Eye,
  Globe2,
  MapPin,
  MousePointerClick,
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

export interface AnalyticsLocationItem {
  country: string;
  countryCode?: string | null;
  state?: string | null;
  city?: string | null;
  views?: number;
  sessions?: number;
  share?: number;
}

interface AnalyticsLocationPanelProps {
  locations?: AnalyticsLocationItem[];
  title?: string;
  description?: string;
  live?: boolean;
}

const CHART_SEGMENTS = [
  "#f97316",
  "#3b82f6",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
];

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

  if (share <= 0) return "0%";

  return `${share % 1 === 0 ? share.toFixed(0) : share.toFixed(1)}%`;
}

function getLocationId(location: AnalyticsLocationItem) {
  return [
    location.countryCode || location.country || "unknown",
    location.state || "",
    location.city || "",
  ].join("|");
}

function getLocationName(location: AnalyticsLocationItem) {
  return (
    location.city?.trim() ||
    location.state?.trim() ||
    location.country?.trim() ||
    "Unknown"
  );
}

function getSecondaryLocation(location: AnalyticsLocationItem) {
  const primary = getLocationName(location);

  const parts = [location.city, location.state, location.country]
    .map((value) => value?.trim())
    .filter(Boolean);

  return parts.filter((value) => value !== primary).join(", ");
}

function getLocationColor(index: number) {
  return CHART_SEGMENTS[index % CHART_SEGMENTS.length];
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.025] px-2.5 py-2 backdrop-blur-md">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.035] text-slate-500">
        <Icon className="h-3.5 w-3.5" />
      </div>

      <div className="min-w-0">
        <p className="text-[8px] font-medium uppercase tracking-[0.14em] text-slate-600">
          {label}
        </p>

        <p className="mt-0.5 truncate text-[12px] font-semibold text-slate-300">
          {value}
        </p>
      </div>
    </div>
  );
}

function LocationRow({
  location,
  index,
  active,
  onClick,
}: {
  location: AnalyticsLocationItem;
  index: number;
  active?: boolean;
  onClick?: () => void;
}) {
  const color = getLocationColor(index);

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group w-full rounded-xl px-2.5 py-2 text-left transition-all",
        active
          ? "bg-white/[0.065] ring-1 ring-white/[0.07]"
          : "hover:bg-white/[0.035]",
      ].join(" ")}
    >
      <div className="flex items-center gap-2.5">
        {/* RANK */}
        <span className="w-4 shrink-0 text-center text-[8px] font-bold text-slate-700">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* COUNTRY CODE */}
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-[7px] font-bold uppercase"
          style={{
            borderColor: `${color}35`,
            backgroundColor: `${color}0d`,
            color,
          }}
        >
          {location.countryCode?.slice(0, 2) || "—"}
        </div>

        {/* LOCATION */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-[10px] font-semibold text-slate-300">
              {getLocationName(location)}
            </span>

            <span className="shrink-0 text-[8px] font-semibold text-slate-500">
              {formatShare(location.share)}
            </span>
          </div>

          {getSecondaryLocation(location) && (
            <p className="mt-0.5 truncate text-[8px] text-slate-700">
              {getSecondaryLocation(location)}
            </p>
          )}

          <div className="mt-1.5 h-[3px] overflow-hidden rounded-full bg-white/[0.05]">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${Math.min(
                  Math.max(number(location.share), 0),
                  100,
                )}%`,
                backgroundColor: color,
                boxShadow: `0 0 8px ${color}45`,
              }}
            />
          </div>
        </div>

        {/* VIEWS */}
        <div className="w-11 shrink-0 text-right">
          <p className="text-[9px] font-semibold text-slate-400">
            {formatNumber(number(location.views))}
          </p>

          <p className="text-[7px] uppercase tracking-wider text-slate-700">
            views
          </p>
        </div>

        {onClick && (
          <ChevronRight className="h-3 w-3 shrink-0 text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-slate-500" />
        )}
      </div>
    </button>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-dashed border-white/[0.07] bg-white/[0.015]">
      <div className="text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-slate-600">
          <Globe2 className="h-5 w-5" />
        </div>

        <p className="mt-3 text-xs font-semibold text-slate-400">
          No location data
        </p>

        <p className="mt-1 text-[10px] text-slate-600">
          Geographic signals will appear here.
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   ALL LOCATIONS MODAL
   Rendered through document.body so dashboard stacking/
   overflow contexts cannot hide the popup.
========================================================= */

function AllLocationsModal({
  locations,
  onClose,
}: {
  locations: AnalyticsLocationItem[];
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="All locations"
    >
      {/* BACKDROP */}
      <button
        type="button"
        aria-label="Close locations"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/75 backdrop-blur-md"
      />

      {/* MODAL */}
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/[0.10] bg-[#111318]/95 shadow-[0_30px_100px_rgba(0,0,0,0.75)] backdrop-blur-2xl">
        {/* GLASS GLOW */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-orange-500/[0.08] blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-violet-500/[0.07] blur-3xl" />

        {/* TOP GLASS HIGHLIGHT */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

        {/* HEADER */}
        <div className="relative flex shrink-0 items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-4 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-orange-500/15 bg-orange-500/[0.07] text-orange-400 shadow-[0_0_25px_rgba(249,115,22,0.08)]">
              <Globe2 className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="truncate text-sm font-semibold text-slate-100">
                  All Locations
                </h4>

                <span className="hidden rounded-full border border-orange-500/15 bg-orange-500/[0.06] px-2 py-0.5 text-[7px] font-semibold uppercase tracking-[0.12em] text-orange-400 sm:inline-flex">
                  Intelligence
                </span>
              </div>

              <p className="mt-0.5 truncate text-[10px] text-slate-600">
                Complete geographic audience distribution
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.025] text-slate-500 transition hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-slate-200"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* BODY */}
        <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4">
          {/* SUMMARY STRIP */}
          <div className="mb-3 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 backdrop-blur-md">
              <p className="text-[7px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                Locations
              </p>

              <p className="mt-1 text-sm font-bold text-slate-200">
                {locations.length}
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 backdrop-blur-md">
              <p className="text-[7px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                Ranking
              </p>

              <p className="mt-1 text-sm font-bold text-slate-200">
                View Events
              </p>
            </div>
          </div>

          {/* INFO */}
          <div className="mb-3 flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2 backdrop-blur-md">
            <Activity className="h-3.5 w-3.5 shrink-0 text-orange-400" />

            <span className="text-[9px] font-medium uppercase tracking-[0.13em] text-slate-500">
              Ranked by view events
            </span>

            <span className="ml-auto text-[9px] text-slate-600">
              {locations.length} locations
            </span>
          </div>

          {/* ALL LOCATION ROWS */}
          <div className="space-y-1">
            {locations.map((location, index) => (
              <LocationRow
                key={getLocationId(location)}
                location={location}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="relative flex shrink-0 items-center gap-2 border-t border-white/[0.07] px-4 py-3 sm:px-5">
          <MapPin className="h-3 w-3 shrink-0 text-slate-700" />

          <span className="text-[8px] text-slate-600">
            Event based geographic telemetry
          </span>

          <button
            type="button"
            onClick={onClose}
            className="ml-auto rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[9px] font-medium text-slate-500 transition hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-slate-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function AnalyticsLocationPanel({
  locations,
  title = "Location Intelligence",
  description = "Geographic audience signals.",
  live = true,
}: AnalyticsLocationPanelProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const sortedLocations = useMemo(() => {
    return [...(locations || [])].sort(
      (a, b) => number(b.views) - number(a.views),
    );
  }, [locations]);

  const topLocations = sortedLocations.slice(0, 5);

  const selectedLocation = useMemo(() => {
    if (!selectedId) {
      return sortedLocations[0];
    }

    return (
      sortedLocations.find(
        (location) => getLocationId(location) === selectedId,
      ) || sortedLocations[0]
    );
  }, [selectedId, sortedLocations]);

  const totalViews = sortedLocations.reduce(
    (sum, location) => sum + number(location.views),
    0,
  );

  const totalSessions = sortedLocations.reduce(
    (sum, location) => sum + number(location.sessions),
    0,
  );

  if (!sortedLocations.length) {
    return (
      <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101114] shadow-[0_16px_50px_rgba(0,0,0,0.25)]">
        <div className="border-b border-white/[0.06] px-4 py-3">
          <h3 className="text-sm font-semibold text-slate-200">
            {title}
          </h3>

          <p className="mt-0.5 text-[10px] text-slate-600">
            {description}
          </p>
        </div>

        <div className="p-4">
          <EmptyState />
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101114] shadow-[0_16px_50px_rgba(0,0,0,0.28)]">
        {/* AMBIENT GLASS LIGHT */}
        <div className="pointer-events-none absolute -left-16 -top-20 h-44 w-44 rounded-full bg-orange-500/[0.035] blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 -right-20 h-40 w-40 rounded-full bg-violet-500/[0.025] blur-3xl" />

        {/* TOP GLASS LINE */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.10] to-transparent" />

        <div className="relative">
          {/* HEADER */}
          <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-orange-500/15 bg-orange-500/[0.07] text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.08)]">
                <Globe2 className="h-4 w-4" />

                {live && (
                  <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-[#101114] bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-sm font-semibold text-slate-100">
                    {title}
                  </h3>

                  {live && (
                    <span className="hidden items-center gap-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-emerald-400 sm:flex">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      Live
                    </span>
                  )}
                </div>

                <p className="mt-0.5 truncate text-[10px] text-slate-600">
                  {description}
                </p>
              </div>
            </div>

            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.025] text-slate-600">
              <Activity className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* METRICS */}
          <div className="grid grid-cols-2 gap-2 border-b border-white/[0.06] p-3">
            <Metric
              icon={Eye}
              label="View Events"
              value={formatNumber(totalViews)}
            />

            <Metric
              icon={Users}
              label="Sessions"
              value={formatNumber(totalSessions)}
            />
          </div>

          {/* DONUT */}
          <div className="px-4 pt-4">
            <div className="relative mx-auto h-[168px] w-[168px]">
              <div className="pointer-events-none absolute inset-5 rounded-full bg-orange-500/[0.025] blur-xl" />

              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topLocations}
                    dataKey="views"
                    nameKey="country"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={76}
                    paddingAngle={3}
                    stroke="none"
                    isAnimationActive
                  >
                    {topLocations.map((location, index) => (
                      <Cell
                        key={getLocationId(location)}
                        fill={getLocationColor(index)}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value) => [
                      formatNumber(Number(value)),
                      "Views",
                    ]}
                    contentStyle={{
                      background: "rgba(24,26,31,0.96)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      borderRadius: 10,
                      color: "#e2e8f0",
                      fontSize: 10,
                      boxShadow: "0 15px 40px rgba(0,0,0,0.45)",
                      backdropFilter: "blur(12px)",
                    }}
                    labelStyle={{
                      color: "#94a3b8",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* CENTER */}
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <div className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-full border border-orange-500/15 bg-orange-500/[0.07] shadow-[0_0_20px_rgba(249,115,22,0.08)]">
                  <Globe2 className="h-3.5 w-3.5 text-orange-400" />
                </div>

                <span className="text-[8px] font-medium uppercase tracking-[0.14em] text-slate-600">
                  Audience
                </span>

                <span className="mt-0.5 text-base font-bold text-slate-100">
                  {formatNumber(totalViews)}
                </span>

                <span className="text-[8px] text-slate-700">
                  view events
                </span>
              </div>
            </div>

            {/* LEGEND */}
            <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1.5">
              {topLocations.map((location, index) => (
                <button
                  key={getLocationId(location)}
                  type="button"
                  onClick={() =>
                    setSelectedId(getLocationId(location))
                  }
                  className="flex max-w-[45%] items-center gap-1.5 rounded-md px-1 py-0.5 transition hover:bg-white/[0.035]"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{
                      backgroundColor: getLocationColor(index),
                      boxShadow: `0 0 6px ${getLocationColor(index)}55`,
                    }}
                  />

                  <span className="truncate text-[9px] font-medium text-slate-500">
                    {getLocationName(location)}
                  </span>

                  <span className="shrink-0 text-[8px] font-semibold text-slate-600">
                    {formatShare(location.share)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* LEADING LOCATION */}
          {selectedLocation && (
            <div className="mx-4 mt-4 overflow-hidden rounded-xl border border-orange-500/10 bg-gradient-to-br from-orange-500/[0.07] via-orange-500/[0.025] to-transparent p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-orange-500/10 bg-orange-500/[0.07] text-orange-400">
                    <MapPin className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-orange-400">
                      Leading Location
                    </p>

                    <p className="mt-0.5 truncate text-xs font-bold text-slate-100">
                      {getLocationName(selectedLocation)}
                    </p>

                    {getSecondaryLocation(selectedLocation) && (
                      <p className="mt-0.5 truncate text-[9px] text-slate-600">
                        {getSecondaryLocation(selectedLocation)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold text-orange-400">
                    {formatShare(selectedLocation.share)}
                  </p>

                  <p className="text-[8px] uppercase tracking-wider text-slate-700">
                    share
                  </p>
                </div>
              </div>

              <div className="mt-2.5 grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-white/[0.045] bg-black/10 px-2.5 py-2">
                  <p className="text-[8px] uppercase tracking-wider text-slate-700">
                    Views
                  </p>

                  <p className="mt-0.5 text-[11px] font-semibold text-slate-300">
                    {formatNumber(number(selectedLocation.views))}
                  </p>
                </div>

                <div className="rounded-lg border border-white/[0.045] bg-black/10 px-2.5 py-2">
                  <p className="text-[8px] uppercase tracking-wider text-slate-700">
                    Sessions
                  </p>

                  <p className="mt-0.5 text-[11px] font-semibold text-slate-300">
                    {formatNumber(number(selectedLocation.sessions))}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TOP 5 */}
          <div className="px-4 pb-4 pt-4">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-slate-600">
                  Top Locations
                </p>

                <p className="mt-0.5 text-[9px] text-slate-700">
                  Highest geographic activity
                </p>
              </div>

              <MousePointerClick className="h-3 w-3 text-slate-700" />
            </div>

            <div className="space-y-1">
              {topLocations.map((location, index) => (
                <LocationRow
                  key={getLocationId(location)}
                  location={location}
                  index={index}
                  active={
                    selectedId === getLocationId(location)
                  }
                  onClick={() =>
                    setSelectedId(getLocationId(location))
                  }
                />
              ))}
            </div>

            {/* EXPAND */}
            {sortedLocations.length > 5 && (
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="group mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500 transition hover:border-orange-500/15 hover:bg-orange-500/[0.04] hover:text-orange-400"
              >
                <Globe2 className="h-3 w-3" />

                View all {sortedLocations.length} locations

                <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </button>
            )}
          </div>

          {/* FOOTER */}
          <div className="flex items-center gap-2 border-t border-white/[0.06] px-4 py-2.5">
            <Globe2 className="h-3 w-3 text-slate-700" />

            <span className="text-[8px] text-slate-700">
              Geographic intelligence · Event based telemetry
            </span>

            <span className="ml-auto text-[8px] font-medium text-slate-700">
              {sortedLocations.length} locations
            </span>
          </div>
        </div>
      </section>

      {/* ALL LOCATIONS POPUP */}
      {showAll && (
        <AllLocationsModal
          locations={sortedLocations}
          onClose={() => setShowAll(false)}
        />
      )}
    </>
  );
}