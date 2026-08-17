"use client";

import {
  CheckCircle2,
  Clock3,
  RefreshCw,
} from "lucide-react";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import type {
  AnalyticsDashboardData,
} from "@/lib/analytics/dashboard";

import type {
  AnalyticsTimeRange,
} from "@/lib/analytics/types";

/* =========================================================
   ANALYTICS COMPONENTS
========================================================= */

import AnalyticsHeader from "@/components/admin/analytics/AnalyticsHeader";
import AnalyticsKpiGrid from "@/components/admin/analytics/AnalyticsKpiGrid";
import AnalyticsTrafficChart from "@/components/admin/analytics/AnalyticsTrafficChart";
import AnalyticsContentPerformance from "@/components/admin/analytics/AnalyticsContentPerformance";
import AnalyticsMostRead from "@/components/admin/analytics/AnalyticsMostRead";
import AnalyticsTrending from "@/components/admin/analytics/AnalyticsTrending";
import AnalyticsCategoryPerformance from "@/components/admin/analytics/AnalyticsCategoryPerformance";
import AnalyticsTopContent from "@/components/admin/analytics/AnalyticsTopContent";
import AnalyticsEngagementPanel from "@/components/admin/analytics/AnalyticsEngagementPanel";

import AnalyticsAudiencePanel from "@/components/admin/analytics/AnalyticsAudiencePanel";
import AnalyticsLocationPanel from "@/components/admin/analytics/AnalyticsLocationPanel";
import AnalyticsLocationPerformance from "@/components/admin/analytics/AnalyticsLocationPerformance";
import AnalyticsSourcePanel from "@/components/admin/analytics/AnalyticsSourcePanel";
import AnalyticsAdsPanel from "@/components/admin/analytics/AnalyticsAdsPanel";
import AnalyticsRevenuePanel from "@/components/admin/analytics/AnalyticsRevenuePanel";
import AnalyticsLiveActivity from "@/components/admin/analytics/AnalyticsLiveActivity";

import {
  AnalyticsErrorState,
  AnalyticsLoadingState,
} from "@/components/admin/analytics/AnalyticsState";

/* =========================================================
   CONFIG
========================================================= */

const AUTO_REFRESH_MS = 30_000;

/* =========================================================
   PAGE
========================================================= */

export default function AdminAnalyticsPage() {
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

  /* =======================================================
     FETCH
  ======================================================= */

  const fetchAnalytics =
    useCallback(
      async (silent = false) => {
        try {
          if (silent) {
            setRefreshing(true);
          } else {
            setLoading(true);
          }

          setError(null);

          const response =
            await fetch(
              `/api/analytics/dashboard?range=${encodeURIComponent(
                range
              )}`,
              {
                method: "GET",
                cache: "no-store",
              }
            );

          const result =
            await response.json();

          if (
            !response.ok ||
            !result.success
          ) {
            throw new Error(
              result?.error ||
                "Failed to load analytics."
            );
          }

          setData(result.data);
          setLastUpdated(new Date());
        } catch (err) {
          console.error(
            "NATIONPATH ANALYTICS ERROR",
            err
          );

          setError(
            err instanceof Error
              ? err.message
              : "Failed to load analytics."
          );
        } finally {
          setLoading(false);
          setRefreshing(false);
        }
      },
      [range]
    );

  /* =======================================================
     INITIAL LOAD + RANGE CHANGE
  ======================================================= */

  useEffect(() => {
    void fetchAnalytics(false);
  }, [fetchAnalytics]);

  /* =======================================================
     AUTO REFRESH
  ======================================================= */

  useEffect(() => {
    const interval =
      window.setInterval(() => {
        void fetchAnalytics(true);
      }, AUTO_REFRESH_MS);

    return () => {
      window.clearInterval(interval);
    };
  }, [fetchAnalytics]);

  /* =======================================================
     MANUAL REFRESH
  ======================================================= */

  const handleRefresh =
    useCallback(() => {
      void fetchAnalytics(true);
    }, [fetchAnalytics]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (
    loading &&
    !data
  ) {
    return (
      <div className="min-h-full bg-[#0B0F17] text-white">
        <div className="mx-auto max-w-[1600px] px-4 py-6 md:px-6 lg:px-8 lg:py-8">
          <AnalyticsLoadingState />
        </div>
      </div>
    );
  }

  /* =======================================================
     INITIAL ERROR
  ======================================================= */

  if (
    error &&
    !data
  ) {
    return (
      <div className="min-h-full bg-[#0B0F17] text-white">
        <div className="mx-auto max-w-[1600px] px-4 py-8 md:px-6 lg:px-8">
          <AnalyticsErrorState
            message={error}
            onRetry={() =>
              void fetchAnalytics(false)
            }
            isRetrying={loading}
          />
        </div>
      </div>
    );
  }

  /* =======================================================
     MAIN DASHBOARD
  ======================================================= */

  return (
    <div className="min-h-full bg-[#0B0F17] text-white">
      <div className="mx-auto max-w-[1600px] space-y-8 px-4 py-6 md:px-6 lg:px-8 lg:py-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <AnalyticsHeader
          range={range}
          onRangeChange={setRange}
          loading={
            loading ||
            refreshing
          }
          onRefresh={handleRefresh}
        />

        {/* =================================================
            LIVE STATUS
        ================================================= */}

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">

          <div className="flex items-center gap-2 text-xs text-gray-500">

            <CheckCircle2
              size={14}
              strokeWidth={1.8}
              className="text-emerald-400"
            />

            <span>
              Analytics connected
            </span>

            <span className="text-gray-700">
              •
            </span>

            <span>
              {data?.overview?.range ||
                range}
            </span>

          </div>

          <div className="flex items-center gap-2 text-xs text-gray-600">

            <Clock3
              size={13}
              strokeWidth={1.8}
            />

            <span>
              {lastUpdated
                ? `Updated ${lastUpdated.toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }
                  )}`
                : "Updating..."}
            </span>

            <span className="text-gray-700">
              •
            </span>

            <span>
              Auto-refresh 30s
            </span>

            {refreshing && (
              <RefreshCw
                size={12}
                strokeWidth={1.8}
                className="animate-spin text-[#EA661B]"
              />
            )}
          </div>
        </div>

        {/* =================================================
            BACKGROUND ERROR
        ================================================= */}

        {error && data && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-400/10 bg-amber-400/[0.04] px-4 py-3">

            <p className="text-xs text-amber-300">
              Latest refresh failed.
              Showing the previous
              analytics snapshot.
            </p>

            <button
              type="button"
              onClick={handleRefresh}
              className="text-xs font-medium text-gray-400 transition hover:text-white"
            >
              Retry
            </button>
          </div>
        )}

        {/* =================================================
            01 — KPI
        ================================================= */}
<AnalyticsKpiGrid
  range={range}
  platform={data?.platform}
  overview={data?.overview}
/>

        {/* =================================================
            02 — TRAFFIC
        ================================================= */}

        <section className="space-y-4">

          <div>
            <h2 className="text-lg font-semibold text-white">
              Traffic Intelligence
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Real analytics activity across
              the selected analytics window.
            </p>
          </div>

          <AnalyticsTrafficChart
            data={data?.traffic || []}
          />

        </section>

        {/* =================================================
            03 — AUDIENCE
        ================================================= */}

        <section className="space-y-4">

          <div>
            <h2 className="text-lg font-semibold text-white">
              Audience Intelligence
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Audience activity and geographic
              distribution across NationPath.
            </p>
          </div>

          <AnalyticsAudiencePanel
            data={data?.overview}
            platform={data?.platform}
          />

        </section>

        {/* =================================================
            04 — LOCATION
        ================================================= */}

        <section className="space-y-4">

          <div>
            <h2 className="text-lg font-semibold text-white">
              Location Intelligence
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Real geographic analytics from
              tracked audience events.
            </p>
          </div>

          <AnalyticsLocationPanel
            locations={data?.locations || []}
          />

          <AnalyticsLocationPerformance
            locations={data?.locations || []}
          />

        </section>

        {/* =================================================
            05 — CONTENT
        ================================================= */}

        <section className="space-y-4">

          <div>
            <h2 className="text-lg font-semibold text-white">
              Content Intelligence
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              News, Editorial and Astrology
              performance across the selected
              analytics window.
            </p>
          </div>

          <AnalyticsContentPerformance
            news={data?.news}
            editorial={data?.editorial}
            astrology={data?.astrology}
          />

        </section>

        {/* =================================================
            06 — MOST READ + TRENDING
        ================================================= */}

        <div className="grid gap-6 xl:grid-cols-2">

          <AnalyticsMostRead
            articles={
              data?.mostRead || []
            }
          />

          <AnalyticsTrending
            articles={
              data?.trending || []
            }
          />

        </div>

        {/* =================================================
            07 — CATEGORY
        ================================================= */}

        <AnalyticsCategoryPerformance
          categories={
            data?.trendingCategories || []
          }
        />

        {/* =================================================
            08 — TOP CONTENT
        ================================================= */}

        <AnalyticsTopContent
          articles={
            data?.mostRead || []
          }
        />

        {/* =================================================
            09 — ENGAGEMENT
        ================================================= */}

        <AnalyticsEngagementPanel
          data={data?.overview}
        />

        {/* =================================================
            10 — SOURCE
        ================================================= */}

        <section className="space-y-4">

          <div>
            <h2 className="text-lg font-semibold text-white">
              Traffic Sources
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Acquisition and referral intelligence.
            </p>
          </div>

          <AnalyticsSourcePanel />
        </section>

        {/* =================================================
            11 — ADS
        ================================================= */}

        <section className="space-y-4">

          <div>
            <h2 className="text-lg font-semibold text-white">
              Advertising
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Advertising performance intelligence.
            </p>
          </div>

          <AnalyticsAdsPanel />
        </section>

        {/* =================================================
            12 — REVENUE
        ================================================= */}

        <section className="space-y-4">

          <div>
            <h2 className="text-lg font-semibold text-white">
              Revenue Intelligence
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Platform revenue and monetization
              intelligence.
            </p>
          </div>

          <AnalyticsRevenuePanel />
        </section>

        {/* =================================================
            13 — LIVE ACTIVITY
        ================================================= */}

        <section className="space-y-4">

          <div>
            <h2 className="text-lg font-semibold text-white">
              Live Activity
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Current analytics activity and
              real-time platform signals.
            </p>
          </div>

          <AnalyticsLiveActivity />
        </section>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-5 text-[11px] text-gray-600">

          <span>
            NationPath Analytics Intelligence Center
          </span>

          <div className="flex items-center gap-2">

            <span>
              Live analytics
            </span>

            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

            <span>
              Auto-refresh enabled
            </span>

          </div>

        </div>

      </div>
    </div>
  );
}