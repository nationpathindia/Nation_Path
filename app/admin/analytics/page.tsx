"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";

import AnalyticsHeader from "@/components/admin/analytics/AnalyticsHeader";
import AnalyticsKpiGrid from "@/components/admin/analytics/AnalyticsKpiGrid";
import AnalyticsTrafficChart from "@/components/admin/analytics/AnalyticsTrafficChart";
import AnalyticsAudiencePanel from "@/components/admin/analytics/AnalyticsAudiencePanel";
import AnalyticsLocationPanel from "@/components/admin/analytics/AnalyticsLocationPanel";
import AnalyticsContentPerformance from "@/components/admin/analytics/AnalyticsContentPerformance";
import AnalyticsMostRead from "@/components/admin/analytics/AnalyticsMostRead";
import AnalyticsTrending from "@/components/admin/analytics/AnalyticsTrending";
import AnalyticsCategoryPerformance from "@/components/admin/analytics/AnalyticsCategoryPerformance";
import AnalyticsTopContent from "@/components/admin/analytics/AnalyticsTopContent";
import AnalyticsEngagementPanel from "@/components/admin/analytics/AnalyticsEngagementPanel";
import AnalyticsSourcePanel from "@/components/admin/analytics/AnalyticsSourcePanel";
import {
  AnalyticsErrorState,
  AnalyticsLoadingState,
} from "@/components/admin/analytics/AnalyticsState";

type AnalyticsTimeRange = "24h" | "7d" | "30d";

type AnalyticsDashboardData = {
  overview?: any;
  platform?: any;

  traffic?: any[];
  locations?: any[];

  sources?: any[];

  acquisition?: {
    sources?: any[];
    mediums?: any[];
    campaigns?: any[];
  };

  audience?: {
    devices?: any[];
    browsers?: any[];
    operatingSystems?: any[];
  };

  contentPerformance?: any[];
  mostRead?: any[];
  topContent?: any[];

  trending?: any[];
  trendingCategories?: any[];
  categories?: any[];

  news?: any;
  editorial?: any;
  astrology?: any;

  engagement?: any;
  video?: any;

  categoryAnalytics?: any;
  live?: any;

  meta?: any;

  [key: string]: any;
};

type AnalyticsDashboardResponse = {
  success: boolean;
  data: AnalyticsDashboardData;
};

const AUTO_REFRESH_MS = 30_000;

export default function AnalyticsPage() {
  const [range, setRange] =
    useState<AnalyticsTimeRange>("24h");

  const [data, setData] =
    useState<AnalyticsDashboardData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [lastUpdated, setLastUpdated] =
    useState<Date | null>(null);

  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const fetchAnalytics = useCallback(
    async (isRefresh = false) => {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError(null);

      try {
        const response = await fetch(
          `/api/analytics/dashboard?range=${encodeURIComponent(
            range
          )}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Analytics request failed (${response.status})`
          );
        }

        const result =
          (await response.json()) as AnalyticsDashboardResponse;

        if (!isMountedRef.current) {
          return;
        }

        if (!result.success || !result.data) {
          throw new Error(
            "Analytics response is invalid."
          );
        }

        setData(result.data);
        setLastUpdated(new Date());
      } catch (err) {
        if (!isMountedRef.current) {
          return;
        }

        const message =
          err instanceof Error
            ? err.message
            : "Unable to load analytics data.";

        setError(message);
      } finally {
        if (!isMountedRef.current) {
          return;
        }

        if (isRefresh) {
          setRefreshing(false);
        } else {
          setLoading(false);
        }
      }
    },
    [range]
  );

  useEffect(() => {
    fetchAnalytics(false);
  }, [fetchAnalytics]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      fetchAnalytics(true);
    }, AUTO_REFRESH_MS);

    return () => {
      window.clearInterval(interval);
    };
  }, [fetchAnalytics]);

  const handleRangeChange = (
    nextRange: AnalyticsTimeRange
  ) => {
    setRange(nextRange);
  };

  const handleRefresh = () => {
    fetchAnalytics(true);
  };

  const formatLastUpdated = () => {
    if (!lastUpdated) {
      return "Waiting for first sync";
    }

    return lastUpdated.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  if (loading && !data) {
    return (
      <main className="min-h-screen bg-[#05070b] text-white">
        <div className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
          <AnalyticsHeader
            range={range}
            onRangeChange={handleRangeChange}
            onRefresh={handleRefresh}
            loading={loading}
          />

          <div className="mt-5">
            <AnalyticsLoadingState />
          </div>
        </div>
      </main>
    );
  }

  if (error && !data) {
    return (
      <main className="min-h-screen bg-[#05070b] text-white">
        <div className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
          <AnalyticsHeader
            range={range}
            onRangeChange={handleRangeChange}
            onRefresh={handleRefresh}
            loading={loading}
          />

          <div className="mt-5">
            <AnalyticsErrorState
              message={error}
              onRetry={handleRefresh}
              isRetrying={refreshing}
            />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#05070b] text-white">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
        <AnalyticsHeader
          range={range}
          onRangeChange={handleRangeChange}
          onRefresh={handleRefresh}
          loading={loading}
        />

        {/* CONNECTION STATUS */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>

            <span className="text-[11px] font-medium text-gray-300">
              Analytics Connected
            </span>

            <span className="text-[10px] text-gray-600">
              {range}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[10px] text-gray-600">
            <span>
              Updated {formatLastUpdated()}
            </span>

            <span className="hidden h-3 w-px bg-white/[0.08] sm:block" />

            <span className="flex items-center gap-1.5">
              <RefreshCw
                size={10}
                strokeWidth={1.8}
                className={
                  refreshing
                    ? "animate-spin text-blue-400"
                    : ""
                }
              />
              Auto refresh 30s
            </span>
          </div>
        </div>

        <div className="mt-5 space-y-7">
          {/* EXECUTIVE OVERVIEW */}
          <section>
            <div className="mb-3">
              <h2 className="text-sm font-semibold text-white">
                Executive Overview
              </h2>

              <p className="mt-1 text-[11px] text-gray-600">
                Core platform performance across the selected window.
              </p>
            </div>

            <AnalyticsKpiGrid
              range={range}
              platform={data?.platform}
              overview={data?.overview}
            />
          </section>

          {/* TRAFFIC INTELLIGENCE */}
          <section>
            <div className="mb-3">
              <h2 className="text-sm font-semibold text-white">
                Traffic Intelligence
              </h2>

              <p className="mt-1 text-[11px] text-gray-600">
                Views, reads and sessions across the selected analytics window.
              </p>
            </div>

            <AnalyticsTrafficChart
              data={data?.traffic || []}
            />
          </section>

          {/* AUDIENCE INTELLIGENCE */}
          <section>
            <div className="mb-3">
              <h2 className="text-sm font-semibold text-white">
                Audience Intelligence
              </h2>

              <p className="mt-1 text-[11px] text-gray-600">
                Audience behaviour, device distribution and geographic reach.
              </p>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
           <AnalyticsAudiencePanel
  data={data?.overview}
/>

              <AnalyticsLocationPanel
                locations={data?.locations || []}
              />
            </div>
          </section>

          {/* CONTENT INTELLIGENCE */}
          <section>
            <div className="mb-3">
              <h2 className="text-sm font-semibold text-white">
                Content Intelligence
              </h2>

              <p className="mt-1 text-[11px] text-gray-600">
                Content performance, readership, trends and category behaviour.
              </p>
            </div>

            <div className="space-y-4">
              <AnalyticsContentPerformance
                news={data?.news}
                editorial={data?.editorial}
                astrology={data?.astrology}
              />

              <div className="grid gap-4 xl:grid-cols-2">
                <AnalyticsMostRead
                  articles={data?.mostRead || []}
                />

                <AnalyticsTrending
                  articles={data?.trending || []}
                />

                <AnalyticsCategoryPerformance
                  categories={data?.categories || []}
                />

                <AnalyticsTopContent
                  articles={data?.topContent || []}
                />
              </div>
            </div>
          </section>

          {/* ENGAGEMENT INTELLIGENCE */}
          <section>
            <div className="mb-3">
              <h2 className="text-sm font-semibold text-white">
                Engagement Intelligence
              </h2>

              <p className="mt-1 text-[11px] text-gray-600">
                Reading depth, interactions and video engagement signals.
              </p>
            </div>

            <AnalyticsEngagementPanel
              data={data?.engagement}
              overview={data?.overview}
              video={data?.video}
            />
          </section>

          {/* ACQUISITION INTELLIGENCE */}
          <section>
            <div className="mb-3">
              <h2 className="text-sm font-semibold text-white">
                Acquisition Intelligence
              </h2>

              <p className="mt-1 text-[11px] text-gray-600">
                Traffic sources, mediums and campaigns supplied by analytics events.
              </p>
            </div>

            <AnalyticsSourcePanel
              sources={data?.acquisition?.sources || []}
              mediums={data?.acquisition?.mediums || []}
              campaigns={data?.acquisition?.campaigns || []}
            />
          </section>
        </div>

        {/* FOOTER */}
        <footer className="mt-8 border-t border-white/[0.05] py-5">
          <div className="flex flex-col gap-1.5 text-[10px] text-gray-700 sm:flex-row sm:items-center sm:justify-between">
            <span>
              NationPath Analytics
            </span>

            <span>
              Event-based analytics · Live-updating every 30 seconds
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}