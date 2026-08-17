"use client";

import {
  Globe2,
  MapPin,
  Users,
  Eye,
  BookOpen,
  TrendingUp,
} from "lucide-react";

interface LocationItem {
  country?: string;
  state?: string;
  city?: string;
  views?: number;
  reads?: number;
  users?: number;
  sessions?: number;
  percentage?: number;
}

interface AnalyticsLocationPerformanceProps {
  locations?: LocationItem[];
}

function number(value?: number) {
  return Number(value) || 0;
}

function formatLocation(location: LocationItem) {
  return (
    location.city ||
    location.state ||
    location.country ||
    "Unknown"
  );
}

export default function AnalyticsLocationPerformance({
  locations = [],
}: AnalyticsLocationPerformanceProps) {
  const maxViews = Math.max(
    ...locations.map((item) => number(item.views)),
    1
  );

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 md:p-6">
      {/* HEADER */}

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Globe2
              size={18}
              strokeWidth={1.8}
              className="text-[#EA661B]"
            />

            <h2 className="text-lg font-semibold text-white">
              Audience by Location
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Geographic distribution of NationPath audience and engagement.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
          <MapPin
            size={15}
            className="text-gray-500"
          />

          <span className="text-xs text-gray-400">
            Geographic Intelligence
          </span>
        </div>
      </div>

      {/* EMPTY */}

      {locations.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-white/10 p-8 text-center">
          <MapPin
            size={22}
            className="mx-auto text-gray-600"
          />

          <p className="mt-3 text-sm text-gray-500">
            No location analytics available for this period.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {locations.map((location, index) => {
            const views = number(location.views);
            const reads = number(location.reads);
            const users = number(location.users);
            const sessions = number(location.sessions);

            const width =
              Math.max(
                4,
                Math.min(
                  100,
                  (views / maxViews) * 100
                )
              );

            return (
              <div
                key={`${formatLocation(location)}-${index}`}
                className="rounded-xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-[#163C80]/40"
              >
                {/* LOCATION */}

                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#163C80]/20 text-[#6D91D8]">
                      <MapPin
                        size={17}
                        strokeWidth={1.8}
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {formatLocation(location)}
                      </p>

                      {location.state &&
                        location.city && (
                          <p className="mt-0.5 truncate text-xs text-gray-500">
                            {location.state}
                            {location.country
                              ? `, ${location.country}`
                              : ""}
                          </p>
                        )}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">
                      {views.toLocaleString()}
                    </p>

                    <p className="text-[11px] text-gray-500">
                      views
                    </p>
                  </div>
                </div>

                {/* VIEW BAR */}

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-[#163C80] transition-all"
                    style={{
                      width: `${width}%`,
                    }}
                  />
                </div>

                {/* METRICS */}

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <LocationMetric
                    icon={Eye}
                    label="Views"
                    value={views}
                  />

                  <LocationMetric
                    icon={BookOpen}
                    label="Reads"
                    value={reads}
                  />

                  <LocationMetric
                    icon={Users}
                    label="Users"
                    value={users}
                  />

                  <LocationMetric
                    icon={TrendingUp}
                    label="Sessions"
                    value={sessions}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
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
    <div className="flex items-center gap-2">
      <Icon
        size={14}
        strokeWidth={1.8}
        className="shrink-0 text-gray-500"
      />

      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-[0.06em] text-gray-600">
          {label}
        </p>

        <p className="mt-0.5 text-xs font-semibold text-gray-300">
          {value.toLocaleString()}
        </p>
      </div>
    </div>
  );
}