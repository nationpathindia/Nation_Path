"use client";

import { useMemo, useState } from "react";

import {
  Eye,
  Globe2,
  MapPin,
  MousePointerClick,
  Users,
} from "lucide-react";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

/* =========================================================
   NATIONPATH ANALYTICS
   LOCATION INTELLIGENCE — ENHANCED FINAL

   API SOURCE OF TRUTH:

   locations[]:
   - country
   - countryCode
   - state
   - city
   - views
   - sessions
   - share

   RULES:
   - Event based
   - No fake metrics
   - No Article.views
   - No UI-side analytics calculation
   - API-provided share is used directly
   - Existing location tracking preserved
========================================================= */

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

function getLocationId(
  location: AnalyticsLocationItem
) {
  return [
    location.countryCode || location.country || "unknown",
    location.state || "",
    location.city || "",
  ].join("|");
}

function getLocationName(
  location: AnalyticsLocationItem
) {
  return (
    location.city?.trim() ||
    location.state?.trim() ||
    location.country?.trim() ||
    "Unknown"
  );
}

function getSecondaryLocation(
  location: AnalyticsLocationItem
) {
  const primary = getLocationName(location);

  const parts = [
    location.city,
    location.state,
    location.country,
  ]
    .map((value) => value?.trim())
    .filter(Boolean);

  return parts
    .filter((value) => value !== primary)
    .join(", ");
}

/* =========================================================
   METRIC
========================================================= */

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1.5">
        <Icon
          size={12}
          strokeWidth={1.8}
          className="text-gray-600"
        />

        <span
          className="
            text-[9px]
            uppercase
            tracking-[0.08em]
            text-gray-600
          "
        >
          {label}
        </span>
      </div>

      <p
        className="
          mt-1
          text-sm
          font-semibold
          tabular-nums
          text-gray-200
        "
      >
        {formatNumber(value)}
      </p>
    </div>
  );
}

/* =========================================================
   TOOLTIP
========================================================= */

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    payload?: {
      name?: string;
      views?: number;
      sessions?: number;
      share?: number;
    };
  }>;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0]?.payload;

  if (!item) {
    return null;
  }

  return (
    <div
      className="
        rounded-lg
        border
        border-white/10
        bg-[#080D18]/95
        px-3
        py-2
        shadow-xl
        backdrop-blur-xl
      "
    >
      <p className="text-xs font-medium text-white">
        {item.name || "Unknown"}
      </p>

      <p className="mt-1 text-[10px] text-gray-500">
        {formatNumber(number(item.views))} views
      </p>

      <p className="mt-0.5 text-[10px] text-gray-600">
        {formatNumber(number(item.sessions))} sessions
        {" · "}
        {formatShare(item.share)}
      </p>
    </div>
  );
}

/* =========================================================
   COMPONENT
========================================================= */

export default function AnalyticsLocationPanel({
  locations = [],
  title = "Audience by Location",
  description = "Geographic audience intelligence from article view events.",
  live = false,
}: AnalyticsLocationPanelProps) {
  const sorted = useMemo(
    () =>
      [...locations].sort(
        (a, b) =>
          number(b.views) -
          number(a.views)
      ),
    [locations]
  );

  const visibleLocations = sorted.slice(0, 5);

  const otherViews = sorted
    .slice(5)
    .reduce(
      (sum, item) =>
        sum + number(item.views),
      0
    );

  const totalViews = sorted.reduce(
    (sum, item) =>
      sum + number(item.views),
    0
  );

  const chartData = [
    ...visibleLocations.map(
      (location) => ({
        id: getLocationId(location),
        name: getLocationName(location),
        views: number(location.views),
        sessions: number(
          location.sessions
        ),
        share: number(location.share),
      })
    ),

    ...(otherViews > 0
      ? [
          {
            id: "others",
            name: "Others",
            views: otherViews,
            sessions: sorted
              .slice(5)
              .reduce(
                (sum, item) =>
                  sum +
                  number(
                    item.sessions
                  ),
                0
              ),
            share:
              totalViews > 0
                ? sorted
                    .slice(5)
                    .reduce(
                      (sum, item) =>
                        sum +
                        number(
                          item.share
                        ),
                      0
                    )
                : 0,
          },
        ]
      : []),
  ];

  const [selectedId, setSelectedId] =
    useState<string | null>(
      chartData[0]?.id || null
    );

  /*
   * If selected location disappears after
   * range refresh, automatically fall back
   * to the top location.
   */
  const selectedLocation =
    sorted.find(
      (location) =>
        getLocationId(location) ===
        selectedId
    ) || sorted[0];

  const activeSelectedId =
    selectedLocation
      ? getLocationId(selectedLocation)
      : null;

  const selectedName = selectedLocation
    ? getLocationName(
        selectedLocation
      )
    : "No location";

  const selectedSecondary =
    selectedLocation
      ? getSecondaryLocation(
          selectedLocation
        )
      : "";

  const selectedShare =
    selectedLocation
      ? number(
          selectedLocation.share
        )
      : 0;

  /* =======================================================
     EMPTY STATE
  ======================================================= */

  if (!locations.length) {
    return (
      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-white/[0.035]
        "
      >
        <div
          className="
            border-b
            border-white/[0.07]
            px-5
            py-4
          "
        >
          <div className="flex items-center gap-2">
            <Globe2
              size={16}
              strokeWidth={1.8}
              className="text-[#EA661B]"
            />

            <h2 className="text-base font-semibold text-white">
              {title}
            </h2>
          </div>

          <p className="mt-1 text-xs text-gray-600">
            {description}
          </p>
        </div>

        <div
          className="
            flex
            h-[180px]
            flex-col
            items-center
            justify-center
            gap-2
            text-xs
            text-gray-600
          "
        >
          <Globe2
            size={20}
            strokeWidth={1.5}
            className="text-gray-700"
          />

          <span>
            No location data available
          </span>
        </div>
      </section>
    );
  }

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
          bg-orange-500/[0.045]
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
          bg-[#163C80]/[0.04]
          blur-3xl
        "
      />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          relative
          flex
          items-center
          justify-between
          border-b
          border-white/[0.07]
          px-5
          py-4
          md:px-6
        "
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Globe2
              size={16}
              strokeWidth={1.8}
              className="text-[#EA661B]"
            />

            <h2 className="text-base font-semibold tracking-tight text-white">
              {title}
            </h2>

            {live && (
              <span
                className="
                  flex
                  items-center
                  gap-1
                  rounded-full
                  border
                  border-emerald-400/20
                  bg-emerald-400/10
                  px-2
                  py-0.5
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-wide
                  text-emerald-400
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Live
              </span>
            )}
          </div>

          <p className="mt-1 text-xs text-gray-600">
            {description}
          </p>
        </div>

        <MapPin
          size={14}
          strokeWidth={1.8}
          className="shrink-0 text-gray-600"
        />
      </div>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div
        className="
          grid
          gap-0
          md:grid-cols-[42%_58%]
        "
      >
        {/* ===================================================
            DONUT
        =================================================== */}

        <div
          className="
            relative
            flex
            min-h-[280px]
            items-center
            justify-center
            border-b
            border-white/[0.06]
            px-4
            py-5
            md:border-b-0
            md:border-r
          "
        >
          <div className="h-[230px] w-full max-w-[280px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="views"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={67}
                  outerRadius={91}
                  paddingAngle={2}
                  stroke="rgba(11,15,23,0.95)"
                  strokeWidth={2}
                 onClick={(entry) => {
  const id = (entry as { id?: string | number })?.id;

  if (id !== undefined && id !== null) {
    setSelectedId(String(id));
  }
}}
                  className="cursor-pointer outline-none"
                >
                  {chartData.map(
                    (entry) => (
                      <Cell
                        key={entry.id}
                        opacity={
                          activeSelectedId ===
                          entry.id
                            ? 1
                            : 0.65
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip
                  content={
                    <CustomTooltip />
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* CENTER */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              flex
              -translate-x-1/2
              -translate-y-1/2
              flex-col
              items-center
            "
          >
            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.12em]
                text-gray-600
              "
            >
              Views
            </span>

            <span
              className="
                mt-1
                text-xl
                font-bold
                tabular-nums
                text-white
              "
            >
              {formatNumber(totalViews)}
            </span>

            <span className="mt-0.5 text-[9px] text-gray-600">
              by location
            </span>
          </div>

          {/* LEGEND */}

          <div
            className="
              absolute
              bottom-3
              left-4
              right-4
              flex
              flex-wrap
              justify-center
              gap-x-3
              gap-y-1
            "
          >
            {chartData.map(
              (location) => (
                <button
                  key={location.id}
                  type="button"
                  onClick={() =>
                    setSelectedId(
                      location.id
                    )
                  }
                  className={`
                    text-[9px]
                    transition
                    ${
                      activeSelectedId ===
                      location.id
                        ? "font-semibold text-white"
                        : "text-gray-600 hover:text-gray-400"
                    }
                  `}
                >
                  {location.name}{" "}
                  {formatShare(
                    location.share
                  )}
                </button>
              )
            )}
          </div>
        </div>

        {/* ===================================================
            DETAIL
        =================================================== */}

        <div className="min-w-0 p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-gray-600
                "
              >
                Top / Selected Location
              </p>

              <div className="mt-1 flex items-center gap-2">
                <MapPin
                  size={14}
                  strokeWidth={1.8}
                  className="shrink-0 text-[#EA661B]"
                />

                <h3 className="truncate text-lg font-semibold text-white">
                  {selectedName}
                </h3>
              </div>

              {selectedSecondary && (
                <p className="mt-0.5 pl-5 text-[10px] text-gray-600">
                  {selectedSecondary}
                </p>
              )}

              {selectedLocation?.countryCode && (
                <p className="mt-1 pl-5 text-[9px] uppercase tracking-[0.1em] text-gray-700">
                  {selectedLocation.countryCode}
                </p>
              )}
            </div>

            <div className="shrink-0 text-right">
              <p className="text-lg font-bold tabular-nums text-white">
                {formatShare(
                  selectedShare
                )}
              </p>

              <p className="text-[9px] text-gray-600">
                audience share
              </p>
            </div>
          </div>

          {/* =================================================
              METRICS
          ================================================= */}

          {selectedLocation && (
            <div
              className="
                mt-5
                grid
                grid-cols-2
                gap-4
                border-y
                border-white/[0.06]
                py-4
                sm:grid-cols-3
              "
            >
              <Metric
                icon={MousePointerClick}
                label="Sessions"
                value={number(
                  selectedLocation.sessions
                )}
              />

              <Metric
                icon={Eye}
                label="Views"
                value={number(
                  selectedLocation.views
                )}
              />

              <Metric
                icon={Users}
                label="Share"
                value={number(
                  selectedLocation.share
                )}
              />
            </div>
          )}

          {/* =================================================
              LOCATION BREAKDOWN
          ================================================= */}

          {selectedLocation && (
            <div className="mt-5">
              <p
                className="
                  mb-3
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.1em]
                  text-gray-600
                "
              >
                Geographic Breakdown
              </p>

              <div className="grid gap-2 sm:grid-cols-3">
                <LocationDetail
                  label="Country"
                  value={
                    selectedLocation.country ||
                    "Unknown"
                  }
                />

                <LocationDetail
                  label="State"
                  value={
                    selectedLocation.state ||
                    "Unknown"
                  }
                />

                <LocationDetail
                  label="City"
                  value={
                    selectedLocation.city ||
                    "Unknown"
                  }
                />
              </div>
            </div>
          )}

          {/* =================================================
              TOP LOCATIONS
          ================================================= */}

          <div className="mt-5">
            <div className="mb-3 flex items-center justify-between">
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.1em]
                  text-gray-600
                "
              >
                Location Ranking
              </p>

              <Globe2
                size={12}
                strokeWidth={1.8}
                className="text-gray-700"
              />
            </div>

            <div className="space-y-2.5">
              {visibleLocations.map(
                (location, index) => {
                  const id =
                    getLocationId(
                      location
                    );

                  const isSelected =
                    id ===
                    activeSelectedId;

                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() =>
                        setSelectedId(id)
                      }
                      className={`
                        group
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-lg
                        border
                        px-3
                        py-2.5
                        text-left
                        transition-all
                        ${
                          isSelected
                            ? "border-white/[0.1] bg-white/[0.045]"
                            : "border-transparent bg-white/[0.012] hover:border-white/[0.06] hover:bg-white/[0.025]"
                        }
                      `}
                    >
                      <span
                        className="
                          w-4
                          shrink-0
                          text-[9px]
                          font-semibold
                          tabular-nums
                          text-gray-700
                        "
                      >
                        {index + 1}
                      </span>

                      <div className="min-w-0 flex-1">
                        <p
                          className={`
                            truncate
                            text-[11px]
                            font-medium
                            ${
                              isSelected
                                ? "text-white"
                                : "text-gray-400"
                            }
                          `}
                        >
                          {getLocationName(
                            location
                          )}
                        </p>

                        <p className="mt-0.5 truncate text-[9px] text-gray-700">
                          {getSecondaryLocation(
                            location
                          )}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-[10px] font-semibold tabular-nums text-gray-300">
                          {formatNumber(
                            number(
                              location.views
                            )
                          )}
                        </p>

                        <p className="mt-0.5 text-[9px] tabular-nums text-gray-700">
                          {formatShare(
                            location.share
                          )}
                        </p>
                      </div>
                    </button>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          border-t
          border-white/[0.06]
          px-5
          py-2.5
        "
      >
        <span
          className="
            text-[9px]
            uppercase
            tracking-[0.08em]
            text-gray-700
          "
        >
          {locations.length} locations tracked
        </span>

        <span className="text-[9px] text-gray-700">
          Click a location to inspect
        </span>
      </div>
    </section>
  );
}

/* =========================================================
   LOCATION DETAIL
========================================================= */

function LocationDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-lg
        border
        border-white/[0.06]
        bg-white/[0.018]
        px-3
        py-2.5
      "
    >
      <p
        className="
          text-[8px]
          uppercase
          tracking-[0.1em]
          text-gray-700
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          truncate
          text-[11px]
          font-medium
          text-gray-400
        "
        title={value}
      >
        {value}
      </p>
    </div>
  );
}

