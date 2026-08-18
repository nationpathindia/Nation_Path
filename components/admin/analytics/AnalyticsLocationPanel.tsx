"use client";

import {
  Globe2,
  MapPin,
  Users,
  Eye,
  BookOpen,
  TrendingUp,
} from "lucide-react";

export interface AnalyticsLocationItem {
  id?: string;
  name: string;
  country?: string | null;
  state?: string | null;
  city?: string | null;

  users?: number;
  sessions?: number;
  views?: number;
  reads?: number;
  events?: number;
  percentage?: number;
}

interface AnalyticsLocationPanelProps {
  locations?: AnalyticsLocationItem[];
  title?: string;
  description?: string;
}

function number(value?: number) {
  return Number.isFinite(value) ? Number(value) : 0;
}

function getLocationLabel(location: AnalyticsLocationItem) {
  if (location.name?.trim()) {
    return location.name.trim();
  }

  return (
    location.city?.trim() ||
    location.state?.trim() ||
    location.country?.trim() ||
    "Unknown"
  );
}

function getLocationSecondaryLabel(location: AnalyticsLocationItem) {
  const parts = [
    location.city,
    location.state,
    location.country,
  ]
    .map((value) => value?.trim())
    .filter(Boolean);

  const primary = getLocationLabel(location);

  const secondary = parts.filter(
    (value) => value !== primary
  );

  return secondary.join(", ");
}

function LocationMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Eye;
  label: string;
  value: number;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <Icon
        size={13}
        strokeWidth={1.8}
        className="shrink-0 text-gray-500"
      />

      <div className="min-w-0">
        <p className="truncate text-[10px] uppercase tracking-[0.06em] text-gray-600">
          {label}
        </p>

        <p className="mt-0.5 text-xs font-semibold text-gray-300">
          {value.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

function LocationRow({
  location,
  index,
  maxViews,
}: {
  location: AnalyticsLocationItem;
  index: number;
  maxViews: number;
}) {
  const users = number(location.users);
  const sessions = number(location.sessions);
  const views = number(location.views);
  const reads = number(location.reads);
  const events = number(location.events);

  const suppliedPercentage =
    typeof location.percentage === "number" &&
    Number.isFinite(location.percentage)
      ? location.percentage
      : null;

  const percentage =
    suppliedPercentage !== null
      ? suppliedPercentage
      : maxViews > 0
        ? (views / maxViews) * 100
        : 0;

  const safePercentage = Math.max(
    0,
    Math.min(100, percentage)
  );

  const locationName = getLocationLabel(location);
  const secondaryLabel =
    getLocationSecondaryLabel(location);

  return (
    <div className="group px-5 py-4 transition-colors duration-200 hover:bg-white/[0.025]">
      <div className="flex gap-4">
        {/* RANK */}

        <div className="flex w-8 shrink-0 items-start justify-center">
          <div
            className={[
              "flex h-8 w-8 items-center justify-center rounded-lg",
              "text-xs font-bold",
              index === 0
                ? "bg-[#EA661B]/10 text-[#EA661B]"
                : index === 1
                  ? "bg-white/[0.07] text-gray-300"
                  : index === 2
                    ? "bg-white/[0.05] text-gray-400"
                    : "bg-white/[0.04] text-gray-500",
            ].join(" ")}
          >
            {index + 1}
          </div>
        </div>

        {/* LOCATION */}

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <MapPin
                  size={14}
                  strokeWidth={1.8}
                  className="shrink-0 text-[#EA661B]"
                />

                <p className="truncate text-sm font-semibold text-gray-100 transition-colors group-hover:text-white">
                  {locationName}
                </p>
              </div>

              {secondaryLabel && (
                <p className="mt-1 truncate pl-5 text-xs text-gray-600">
                  {secondaryLabel}
                </p>
              )}
            </div>

            {/* DESKTOP VIEWS */}

            <div className="hidden shrink-0 text-right sm:block">
              <p className="text-sm font-semibold text-white">
                {views.toLocaleString()}
              </p>

              <p className="mt-0.5 text-[10px] text-gray-600">
                views
              </p>
            </div>
          </div>

          {/* ACTIVITY BAR */}

          <div className="mt-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] uppercase tracking-[0.07em] text-gray-600">
                Audience activity
              </span>

              <span className="text-[10px] font-medium text-gray-600">
                {Math.round(safePercentage)}%
              </span>
            </div>

            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className={[
                  "h-full rounded-full",
                  "bg-gradient-to-r from-[#163C80] to-[#234E9A]",
                  "transition-all duration-500",
                ].join(" ")}
                style={{
                  width: `${Math.max(
                    safePercentage > 0 ? 3 : 0,
                    safePercentage
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* METRICS */}

          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-5">
            <LocationMetric
              icon={Eye}
              label="Views"
              value={views}
            />

            <LocationMetric
              icon={Users}
              label="Users"
              value={users}
            />

            <LocationMetric
              icon={Globe2}
              label="Sessions"
              value={sessions}
            />

            <LocationMetric
              icon={BookOpen}
              label="Reads"
              value={reads}
            />

            <LocationMetric
              icon={TrendingUp}
              label="Events"
              value={events}
            />
          </div>

          {/* MOBILE VIEWS */}

          <div className="mt-3 flex items-center gap-1.5 sm:hidden">
            <Eye
              size={12}
              strokeWidth={1.8}
              className="text-gray-500"
            />

            <span className="text-xs font-medium text-gray-400">
              {views.toLocaleString()}
            </span>

            <span className="text-[10px] text-gray-600">
              views
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsLocationPanel({
  locations = [],
  title = "Audience by Location",
  description = "Geographic distribution of NationPath audience and content engagement.",
}: AnalyticsLocationPanelProps) {
  const visibleLocations = [...locations]
    .sort(
      (a, b) =>
        number(b.views) - number(a.views)
    )
    .slice(0, 10);

  const maxViews = Math.max(
    ...visibleLocations.map((location) =>
      number(location.views)
    ),
    1
  );

  return (
    <section
      className={[
        "overflow-hidden rounded-2xl",
        "border border-white/10",
        "bg-white/[0.035]",
      ].join(" ")}
    >
      {/* HEADER */}

      <div className="flex flex-col gap-3 border-b border-white/[0.07] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Globe2
              size={17}
              strokeWidth={1.8}
              className="shrink-0 text-[#EA661B]"
            />

            <h2 className="text-lg font-semibold text-white">
              {title}
            </h2>
          </div>

          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {description}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 text-xs text-gray-500">
          <MapPin
            size={13}
            strokeWidth={1.8}
            className="text-[#EA661B]"
          />

          Geographic intelligence
        </div>
      </div>

      {/* CONTENT */}

      {visibleLocations.length === 0 ? (
        <div className="flex min-h-[220px] items-center justify-center px-5 text-center">
          <div>
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-gray-600">
              <Globe2
                size={18}
                strokeWidth={1.8}
              />
            </div>

            <p className="mt-3 text-sm font-medium text-gray-400">
              No location data available
            </p>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-gray-600">
              Geographic analytics will appear as
              audience activity is recorded.
            </p>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.06]">
          {visibleLocations.map(
            (location, index) => (
              <LocationRow
                key={
                  location.id ||
                  `${getLocationLabel(location)}-${index}`
                }
                location={location}
                index={index}
                maxViews={maxViews}
              />
            )
          )}
        </div>
      )}

      {/* FOOTER */}

      {visibleLocations.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] px-5 py-3">
          <p className="text-xs text-gray-600">
            Top {visibleLocations.length} locations
          </p>

          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <TrendingUp
              size={12}
              strokeWidth={1.8}
            />

            Audience engagement
          </div>
        </div>
      )}
    </section>
  );
}