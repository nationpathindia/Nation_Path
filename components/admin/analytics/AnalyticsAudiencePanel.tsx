"use client";

import {
  Activity,
  BookOpen,
  Eye,
  Monitor,
  Smartphone,
  Tablet,
  Users,
} from "lucide-react";

export interface AnalyticsAudiencePanelData {
  totalUsers?: number;
  uniqueUsers?: number;
  uniqueSessions?: number;

  newUsers?: number;
  returningUsers?: number;

  desktop?: number;
  mobile?: number;
  tablet?: number;

  viewsPerSession?: number;
  readsPerSession?: number;
}

interface AnalyticsAudiencePanelProps {
  data?: AnalyticsAudiencePanelData;

  platform?: {
    totalUsers?: number;
  };
}

function number(value?: number) {
  return Number(value) || 0;
}

function percentage(
  value: number,
  total: number
) {
  if (!total) return 0;

  return Math.round(
    (value / total) * 100
  );
}

function AudienceMetric({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  description?: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
      <div className="flex items-center gap-2">
        <Icon
          size={14}
          strokeWidth={1.8}
          className="text-[#EA661B]"
        />

        <p className="text-xs font-medium text-gray-500">
          {label}
        </p>
      </div>

      <p className="mt-2 text-xl font-bold tracking-tight text-white">
        {value}
      </p>

      {description && (
        <p className="mt-1 text-[10px] text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
}

function DeviceRow({
  icon: Icon,
  label,
  value,
  total,
}: {
  icon: typeof Monitor;
  label: string;
  value: number;
  total: number;
}) {
  const percent = percentage(
    value,
    total
  );

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon
            size={14}
            strokeWidth={1.8}
            className="text-gray-500"
          />

          <span className="text-xs text-gray-400">
            {label}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-300">
            {value.toLocaleString()}
          </span>

          <span className="text-[10px] text-gray-600">
            {percent}%
          </span>
        </div>
      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-[#163C80] transition-all"
          style={{
            width: `${Math.max(
              value > 0 ? 2 : 0,
              Math.min(100, percent)
            )}%`,
          }}
        />
      </div>
    </div>
  );
}

export default function AnalyticsAudiencePanel({
  data,
  platform,
}: AnalyticsAudiencePanelProps) {
  const totalUsers = number(
    platform?.totalUsers
  );

  const uniqueUsers = number(
    data?.uniqueUsers
  );

  const uniqueSessions = number(
    data?.uniqueSessions
  );

  const newUsers = number(
    data?.newUsers
  );

  const returningUsers = number(
    data?.returningUsers
  );

  const desktop = number(
    data?.desktop
  );

  const mobile = number(
    data?.mobile
  );

  const tablet = number(
    data?.tablet
  );

  const deviceTotal =
    desktop +
    mobile +
    tablet;

  const viewsPerSession =
    number(data?.viewsPerSession);

  const readsPerSession =
    number(data?.readsPerSession);

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
      {/* HEADER */}

      <div className="border-b border-white/[0.07] px-5 py-5">
        <div className="flex items-center gap-2">
          <Users
            size={17}
            strokeWidth={1.8}
            className="text-[#EA661B]"
          />

          <h2 className="text-lg font-semibold text-white">
            Audience Intelligence
          </h2>
        </div>

        <p className="mt-1 text-sm text-gray-500">
          Understand who is using NationPath and how they consume content.
        </p>
      </div>

      <div className="space-y-6 p-5">
        {/* USER METRICS */}

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <AudienceMetric
            icon={Users}
            label="Total Users"
            value={totalUsers.toLocaleString()}
            description="Platform accounts"
          />

          <AudienceMetric
            icon={Activity}
            label="Unique Users"
            value={uniqueUsers.toLocaleString()}
            description="Selected period"
          />

          <AudienceMetric
            icon={Eye}
            label="Sessions"
            value={uniqueSessions.toLocaleString()}
            description="Selected period"
          />

          <AudienceMetric
            icon={BookOpen}
            label="Views / Session"
            value={viewsPerSession.toFixed(1)}
            description="Average content views"
          />
        </div>

        {/* NEW / RETURNING */}

        <div>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-200">
                Audience Mix
              </p>

              <p className="mt-1 text-xs text-gray-600">
                New versus returning audience.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  New Users
                </span>

                <span className="text-sm font-semibold text-white">
                  {newUsers.toLocaleString()}
                </span>
              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-[#EA661B]"
                  style={{
                    width: `${Math.max(
                      newUsers > 0 ? 2 : 0,
                      Math.min(
                        100,
                        percentage(
                          newUsers,
                          newUsers +
                            returningUsers
                        )
                      )
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Returning Users
                </span>

                <span className="text-sm font-semibold text-white">
                  {returningUsers.toLocaleString()}
                </span>
              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-[#163C80]"
                  style={{
                    width: `${Math.max(
                      returningUsers > 0
                        ? 2
                        : 0,
                      Math.min(
                        100,
                        percentage(
                          returningUsers,
                          newUsers +
                            returningUsers
                        )
                      )
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* DEVICES */}

        <div>
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-200">
              Device Distribution
            </p>

            <p className="mt-1 text-xs text-gray-600">
              How the audience accesses NationPath.
            </p>
          </div>

          <div className="space-y-4">
            <DeviceRow
              icon={Monitor}
              label="Desktop"
              value={desktop}
              total={deviceTotal}
            />

            <DeviceRow
              icon={Smartphone}
              label="Mobile"
              value={mobile}
              total={deviceTotal}
            />

            <DeviceRow
              icon={Tablet}
              label="Tablet"
              value={tablet}
              total={deviceTotal}
            />
          </div>
        </div>

        {/* ENGAGEMENT */}

        <div className="grid gap-3 sm:grid-cols-2">
          <AudienceMetric
            icon={BookOpen}
            label="Reads / Session"
            value={readsPerSession.toFixed(1)}
            description="Average reading events"
          />

          <AudienceMetric
            icon={Activity}
            label="Audience Activity"
            value={uniqueUsers.toLocaleString()}
            description="Unique engaged users"
          />
        </div>
      </div>
    </section>
  );
}