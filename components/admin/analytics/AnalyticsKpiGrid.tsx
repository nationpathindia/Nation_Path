"use client";

import {
  Activity,
  BookOpen,
  Eye,
  FileText,
  FolderTree,
  Heart,
  Layers3,
  MessageSquareText,
  Newspaper,
  Share2,
  Sparkles,
  Users,
  CalendarClock,
} from "lucide-react";

import AnalyticsMetricCard from "./AnalyticsMetricCard";

/* =========================================================
   NATIONPATH ANALYTICS
   KPI GRID — LOCKED ENHANCED VERSION

   Responsibilities:
   - Current platform snapshot
   - Current published article count
   - Current scheduled article count
   - Today's calendar-day publishing count
   - Selected-range publishing count
   - Current categories
   - Current content-type counts
   - Current registered users
   - Selected analytics-period performance
   - Dynamic range-aware descriptions

   IMPORTANT:
   - Reads canonical dashboard API data only
   - No Prisma queries
   - No analytics calculations
   - No legacy admin dashboard dependency
   - Platform metrics remain current/live
   - Analytics Performance follows selected range
   - Published In Range follows selected range
   - No duplicate analytics logic
========================================================= */

export type AnalyticsTimeRange =
  | "1h"
  | "6h"
  | "24h"
  | "7d"
  | "30d"
  | "90d"
  | "all";

interface AnalyticsKpiGridProps {
  range?: AnalyticsTimeRange;

  platform?: {
    /* Current platform content */
    totalArticles?: number;
    liveArticles?: number;
    scheduledArticles?: number;

    /* Calendar-day publishing */
    todayArticles?: number;
    publishedToday?: number;

    /* Current platform structure */
    totalCategories?: number;

    /* Historical cumulative analytics */
    allTimeViews?: number;

    /* Current content types */
    newsArticles?: number;
    astroArticles?: number;
    editorialArticles?: number;

    /* Users */
    totalUsers?: number;
    activeUsers?: number;
  };

  overview?: {
    /* Selected analytics range */
    totalEvents?: number;

    articleEvents?: number;
    categoryEvents?: number;

    views?: number;
    opens?: number;
    reads?: number;
    scrolls?: number;

    shares?: number;
    reactions?: number;
    likes?: number;

    videoPlays?: number;
    videoCompletes?: number;

    uniqueUsers?: number;
    uniqueSessions?: number;

    /* Selected-range publishing */
    publishedInRange?: number;
  };
}

/* =========================================================
   SAFE NUMBER
========================================================= */

function value(input?: number) {
  return Number.isFinite(input) ? Number(input) : 0;
}

/* =========================================================
   RANGE LABEL
========================================================= */

function getRangeLabel(range: AnalyticsTimeRange): string {
  switch (range) {
    case "1h":
      return "Last 1 hour";

    case "6h":
      return "Last 6 hours";

    case "24h":
      return "Last 24 hours";

    case "7d":
      return "Last 7 days";

    case "30d":
      return "Last 30 days";

    case "90d":
      return "Last 90 days";

    case "all":
      return "All time";

    default:
      return "Selected range";
  }
}

/* =========================================================
   RANGE SHORT LABEL
========================================================= */

function getRangeShortLabel(range: AnalyticsTimeRange): string {
  switch (range) {
    case "1h":
      return "1h";

    case "6h":
      return "6h";

    case "24h":
      return "24h";

    case "7d":
      return "7d";

    case "30d":
      return "30d";

    case "90d":
      return "90d";

    case "all":
      return "All Time";

    default:
      return "Selected";
  }
}

/* =========================================================
   COMPONENT
========================================================= */

export default function AnalyticsKpiGrid({
  range = "24h",
  platform,
  overview,
}: AnalyticsKpiGridProps) {
  const rangeLabel = getRangeLabel(range);
  const rangeShortLabel = getRangeShortLabel(range);

  const todayArticles = value(
    platform?.todayArticles ?? platform?.publishedToday
  );

  return (
    <div className="space-y-10">

      {/* =====================================================
          PLATFORM OVERVIEW
          CURRENT SNAPSHOT — RANGE INDEPENDENT
      ===================================================== */}

      <section>
        <div className="mb-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EA661B]/10">
              <Layers3
                size={17}
                strokeWidth={1.8}
                className="text-[#EA661B]"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold tracking-tight text-white">
                Platform Overview
              </h2>

              <p className="mt-0.5 text-sm text-gray-500">
                Current NationPath content and audience snapshot.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Published */}

          <AnalyticsMetricCard
            label="Published Articles"
            value={value(platform?.liveArticles)}
            icon={Newspaper}
            accent="green"
            description="Currently published"
          />

          {/* Scheduled */}

          <AnalyticsMetricCard
            label="Scheduled Articles"
            value={value(platform?.scheduledArticles)}
            icon={CalendarClock}
            accent="orange"
            description="Currently scheduled"
          />

          {/* Today */}

          <AnalyticsMetricCard
            label="Today's Articles"
            value={todayArticles}
            icon={Newspaper}
            accent="orange"
            description="Published today"
          />

          {/* Total */}

          <AnalyticsMetricCard
            label="Total Articles"
            value={value(platform?.totalArticles)}
            icon={FileText}
            accent="navy"
            description="Current public content"
          />

          {/* Categories */}

          <AnalyticsMetricCard
            label="Categories"
            value={value(platform?.totalCategories)}
            icon={FolderTree}
            accent="navy"
            description="Current platform categories"
          />

          {/* All-time views */}

          <AnalyticsMetricCard
            label="All-Time Views"
            value={value(platform?.allTimeViews)}
            icon={Eye}
            accent="orange"
            description="Cumulative content views"
          />

          {/* News */}

          <AnalyticsMetricCard
            label="News Content"
            value={value(platform?.newsArticles)}
            icon={Newspaper}
            accent="green"
            description="Current public News content"
          />

          {/* Astro */}

          <AnalyticsMetricCard
            label="Astro Content"
            value={value(platform?.astroArticles)}
            icon={Sparkles}
            accent="orange"
            description="Current public Astro content"
          />

          {/* Editorial */}

          <AnalyticsMetricCard
            label="Editorial Content"
            value={value(platform?.editorialArticles)}
            icon={BookOpen}
            accent="navy"
            description="Current public Editorial content"
          />

          {/* Users */}

          <AnalyticsMetricCard
            label="Total Users"
            value={value(platform?.totalUsers)}
            icon={Users}
            accent="navy"
            description="Registered NationPath users"
          />

        </div>
      </section>

      {/* =====================================================
          SELECTED ANALYTICS PERIOD
      ===================================================== */}

      <section>
        <div className="mb-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EA661B]/10">
              <Activity
                size={17}
                strokeWidth={1.8}
                className="text-[#EA661B]"
              />
            </div>

            <div className="flex min-w-0 flex-wrap items-center gap-2.5">
              <h2 className="text-lg font-semibold tracking-tight text-white">
                Analytics Performance
              </h2>

              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                {rangeShortLabel}
              </span>
            </div>
          </div>

          <p className="mt-1.5 text-sm text-gray-500">
            Engagement and publishing activity generated during{" "}
            <span className="text-gray-400">
              {rangeLabel.toLowerCase()}
            </span>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Views */}

          <AnalyticsMetricCard
            label="Views"
            value={value(overview?.views)}
            icon={Eye}
            accent="orange"
            description={`${rangeLabel} content views`}
          />

          {/* Reads */}

          <AnalyticsMetricCard
            label="Reads"
            value={value(overview?.reads)}
            icon={BookOpen}
            accent="green"
            description={`${rangeLabel} completed reads`}
          />

          {/* Opens */}

          <AnalyticsMetricCard
            label="Opens"
            value={value(overview?.opens)}
            icon={Activity}
            accent="navy"
            description={`${rangeLabel} article opens`}
          />

          {/* Total Events */}

          <AnalyticsMetricCard
            label="Total Events"
            value={value(overview?.totalEvents)}
            icon={Layers3}
            accent="navy"
            description={`${rangeLabel} analytics events`}
          />

          {/* Shares */}

          <AnalyticsMetricCard
            label="Shares"
            value={value(overview?.shares)}
            icon={Share2}
            accent="orange"
            description={`${rangeLabel} content shares`}
          />

          {/* Reactions */}

          <AnalyticsMetricCard
            label="Reactions"
            value={value(overview?.reactions)}
            icon={Heart}
            accent="orange"
            description={`${rangeLabel} reactions`}
          />

          {/* Unique Users */}

          <AnalyticsMetricCard
            label="Unique Users"
            value={value(overview?.uniqueUsers)}
            icon={Users}
            accent="green"
            description={`${rangeLabel} unique users`}
          />

          {/* Unique Sessions */}

          <AnalyticsMetricCard
            label="Unique Sessions"
            value={value(overview?.uniqueSessions)}
            icon={MessageSquareText}
            accent="navy"
            description={`${rangeLabel} unique sessions`}
          />

          {/* Published In Range */}

          <AnalyticsMetricCard
            label="Published In Range"
            value={value(overview?.publishedInRange)}
            icon={Newspaper}
            accent="green"
            description={`Articles published during ${rangeLabel.toLowerCase()}`}
          />

          {/* Article Events */}

          <AnalyticsMetricCard
            label="Article Events"
            value={value(overview?.articleEvents)}
            icon={FileText}
            accent="navy"
            description={`${rangeLabel} article events`}
          />

          {/* Category Events */}

          <AnalyticsMetricCard
            label="Category Events"
            value={value(overview?.categoryEvents)}
            icon={FolderTree}
            accent="orange"
            description={`${rangeLabel} category events`}
          />

          {/* Likes */}

          <AnalyticsMetricCard
            label="Likes"
            value={value(overview?.likes)}
            icon={Heart}
            accent="orange"
            description={`${rangeLabel} article likes`}
          />

        </div>
      </section>

    </div>
  );
}