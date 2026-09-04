"use client";

import {
  Activity,
  BookOpen,
  Eye,
  FileText,
  FolderTree,
  Heart,
  MessageSquareText,
  Newspaper,
  Share2,
  Sparkles,
  Users,
} from "lucide-react";

import AnalyticsMetricCard from "./AnalyticsMetricCard";

/* =========================================================
   NATIONPATH ANALYTICS

   KPI GRID
   ENHANCED / LOCKED VERSION

   SOURCE
   ---------------------------------------------------------
   • /api/analytics/dashboard

   RULES
   ---------------------------------------------------------
   • Presentation only
   • No API calls
   • No database access
   • No analytics calculations
   • No legacy lib/analytics dependency
   • Current API range contract only
   • No video KPI / video calculation
========================================================= */

export type AnalyticsTimeRange =
  | "24h"
  | "7d"
  | "30d";

interface AnalyticsKpiGridProps {
  range?: AnalyticsTimeRange;

  platform?: {
    views?: number;
    reads?: number;
    sessions?: number;
    users?: number;
    anonymousSessions?: number;

    newsTotal?: number;
    newsPublished?: number;
    newsReads?: number;

    categoryViews?: number;
    categoryOpens?: number;
    categoryReads?: number;
    categoryScrolls?: number;

    likes?: number;
    shares?: number;
    reactions?: number;

    videoPlays?: number;
    videoCompletes?: number;

    readRate?: number;
    engagementRate?: number;
    videoCompletionRate?: number;
  };

  overview?: {
    range?: AnalyticsTimeRange;

    views?: number;
    reads?: number;
    sessions?: number;
    users?: number;
    uniqueVisitors?: number;

    readRate?: number;
    averageReadDuration?: number;
    averageReadPercentage?: number;

    likes?: number;
    shares?: number;
    reactions?: number;

    engagementRate?: number;
    shareRate?: number;
    likeRate?: number;
    reactionRate?: number;

    videoPlays?: number;
    videoCompletes?: number;
    videoCompletionRate?: number;

    changes?: {
      views?: number;
      reads?: number;
      sessions?: number;
    };
  };

  news?: {
    total?: number;
    published?: number;
    reads?: number;
  };
}

/* =========================================================
   HELPERS
========================================================= */

function numberValue(value?: number) {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : 0;
}

function formatNumber(value?: number) {
  return numberValue(value).toLocaleString("en-IN");
}

function formatPercentage(value?: number) {
  return `${numberValue(value).toFixed(1)}%`;
}

function formatDuration(value?: number) {
  const seconds = numberValue(value);

  if (seconds < 60) {
    return `${Math.round(seconds)}s`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);

  return `${minutes}m ${remainingSeconds}s`;
}

function getRangeLabel(range: AnalyticsTimeRange) {
  switch (range) {
    case "7d":
      return "Last 7 days";

    case "30d":
      return "Last 30 days";

    default:
      return "Last 24 hours";
  }
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Activity;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
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
          border-white/10
          bg-white/[0.04]
        "
      >
        <Icon
          className="h-4 w-4 text-white/70"
          strokeWidth={1.8}
        />
      </div>

      <div className="min-w-0">
        <h2
          className="
            text-sm
            font-semibold
            tracking-tight
            text-white
          "
        >
          {title}
        </h2>

        <p
          className="
            mt-0.5
            truncate
            text-xs
            text-white/40
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   COMPONENT
========================================================= */

export default function AnalyticsKpiGrid({
  range = "24h",
  platform,
  overview,
  news,
}: AnalyticsKpiGridProps) {
  const activeRange =
    overview?.range || range;

  const rangeLabel =
    getRangeLabel(activeRange);

  /* =======================================================
     CANONICAL NEWS VALUES

     News Total / Published
     → Article DB snapshot

     News Reads
     → ArticleAnalyticsEvent
  ======================================================= */

  const newsTotal = numberValue(
    news?.total ??
      platform?.newsTotal
  );

  const newsPublished = numberValue(
    news?.published ??
      platform?.newsPublished
  );

  const newsReads = numberValue(
    news?.reads ??
      platform?.newsReads
  );

  /* =======================================================
     RANGE-BASED ANALYTICS VALUES

     These values are display-only.
     No calculations are performed here.
  ======================================================= */

  const views = numberValue(
    overview?.views
  );

  const reads = numberValue(
    overview?.reads
  );

  const sessions = numberValue(
    overview?.sessions
  );

  const uniqueVisitors = numberValue(
    overview?.uniqueVisitors
  );

  const likes = numberValue(
    overview?.likes
  );

  const shares = numberValue(
    overview?.shares
  );

  const reactions = numberValue(
    overview?.reactions
  );

  const engagementRate = numberValue(
    overview?.engagementRate
  );

  const readRate = numberValue(
    overview?.readRate
  );

  const averageReadDuration = numberValue(
    overview?.averageReadDuration
  );

  const averageReadPercentage = numberValue(
    overview?.averageReadPercentage
  );

  const users = numberValue(
    overview?.users
  );

  const categoryViews = numberValue(
    platform?.categoryViews
  );

  return (
    <div className="space-y-8">
      {/* =====================================================
          EXECUTIVE OVERVIEW
      ===================================================== */}

      <section>
        <SectionHeader
          icon={Activity}
          title="Executive Overview"
          description={`Core platform snapshot · ${rangeLabel}`}
        />

        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          <AnalyticsMetricCard
            label="News Total"
            value={formatNumber(newsTotal)}
            icon={Newspaper}
            accent="navy"
            description="Total News articles"
          />

          <AnalyticsMetricCard
            label="News Published"
            value={formatNumber(newsPublished)}
            icon={FileText}
            accent="green"
            description="Approved + published News"
          />

          <AnalyticsMetricCard
            label="News Reads"
            value={formatNumber(newsReads)}
            icon={BookOpen}
            accent="orange"
            description={`Event reads · ${rangeLabel}`}
          />

          <AnalyticsMetricCard
            label="Category Views"
            value={formatNumber(categoryViews)}
            icon={FolderTree}
            accent="navy"
            description={`Category view events · ${rangeLabel}`}
          />
        </div>
      </section>

      {/* =====================================================
          TRAFFIC INTELLIGENCE
      ===================================================== */}

      <section>
        <SectionHeader
          icon={Eye}
          title="Traffic Intelligence"
          description={`Audience activity · ${rangeLabel}`}
        />

        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          <AnalyticsMetricCard
            label="Views"
            value={formatNumber(views)}
            icon={Eye}
            accent="orange"
            description={`Article view events · ${rangeLabel}`}
          />

          <AnalyticsMetricCard
            label="Reads"
            value={formatNumber(reads)}
            icon={BookOpen}
            accent="green"
            description={`Article read events · ${rangeLabel}`}
          />

          <AnalyticsMetricCard
            label="Sessions"
            value={formatNumber(sessions)}
            icon={Activity}
            accent="navy"
            description={`Analytics sessions · ${rangeLabel}`}
          />

          <AnalyticsMetricCard
            label="Unique Visitors"
            value={formatNumber(uniqueVisitors)}
            icon={Users}
            accent="orange"
            description={`Unique visitors · ${rangeLabel}`}
          />
        </div>
      </section>

      {/* =====================================================
          ENGAGEMENT INTELLIGENCE
      ===================================================== */}

      <section>
        <SectionHeader
          icon={Heart}
          title="Engagement Intelligence"
          description={`Reader interaction · ${rangeLabel}`}
        />

        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          <AnalyticsMetricCard
            label="Likes"
            value={formatNumber(likes)}
            icon={Heart}
            accent="green"
            description={`Like events · ${rangeLabel}`}
          />

          <AnalyticsMetricCard
            label="Shares"
            value={formatNumber(shares)}
            icon={Share2}
            accent="orange"
            description={`Share events · ${rangeLabel}`}
          />

          <AnalyticsMetricCard
            label="Reactions"
            value={formatNumber(reactions)}
            icon={MessageSquareText}
            accent="navy"
            description={`Reaction events · ${rangeLabel}`}
          />

          <AnalyticsMetricCard
            label="Engagement Rate"
            value={formatPercentage(engagementRate)}
            icon={Sparkles}
            accent="orange"
            description={`Engagement rate · ${rangeLabel}`}
          />
        </div>
      </section>

      {/* =====================================================
          READING INTELLIGENCE
      ===================================================== */}

      <section>
        <SectionHeader
          icon={BookOpen}
          title="Reading Intelligence"
          description={`Content consumption depth · ${rangeLabel}`}
        />

        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          <AnalyticsMetricCard
            label="Read Rate"
            value={formatPercentage(readRate)}
            icon={BookOpen}
            accent="green"
            description="Reads / views"
          />

          <AnalyticsMetricCard
            label="Avg Read Duration"
            value={formatDuration(averageReadDuration)}
            icon={Activity}
            accent="navy"
            description="Average time per read"
          />

          <AnalyticsMetricCard
            label="Avg Read Percentage"
            value={formatPercentage(
              averageReadPercentage
            )}
            icon={FileText}
            accent="orange"
            description="Average content completion"
          />

          <AnalyticsMetricCard
            label="Users"
            value={formatNumber(users)}
            icon={Users}
            accent="navy"
            description={`Users in analytics range · ${rangeLabel}`}
          />
        </div>
      </section>
    </div>
  );
}