//////////////////////////////////////////////////////////////
// NATIONPATH ANALYTICS
// SHARED TYPES
//
// Purpose:
// - Shared contracts for News / Editorial / Astro analytics
// - No Prisma queries
// - No UI logic
// - No API logic
//////////////////////////////////////////////////////////////

/**
 * Analytics product/domain.
 */
export type AnalyticsDomain =
  | "news"
  | "editorial"
  | "astro";

/**
 * Raw analytics events supported by the platform.
 */
export type AnalyticsEventType =
  | "view"
  | "open"
  | "read"
  | "scroll"
  | "like"
  | "reaction"
  | "share"
  | "video_play"
  | "video_complete";

/**
 * Supported analytics time windows.
 */
export type AnalyticsTimeRange =
  | "1h"
  | "6h"
  | "24h"
  | "7d"
  | "30d"
  | "90d"
  | "all";

/**
 * Generic analytics query options.
 */
export interface AnalyticsQueryOptions {
  domain?: AnalyticsDomain;

  categoryId?: string;

  articleId?: string;

  eventTypes?: AnalyticsEventType[];

  timeRange?: AnalyticsTimeRange;

  limit?: number;
}

/**
 * Basic event counts.
 */
export interface AnalyticsEventCounts {
  views: number;
  opens: number;
  reads: number;
  scrolls: number;
  likes: number;
  reactions: number;
  shares: number;
  videoPlays: number;
  videoCompletes: number;
}

/**
 * Generic engagement metrics.
 */
export interface AnalyticsEngagement {
  totalEvents: number;

  uniqueUsers: number;

  uniqueSessions: number;

  engagementScore: number;
}

/**
 * Article analytics result.
 *
 * Canonical detailed analytics contract.
 */
export interface ArticleAnalyticsResult
  extends AnalyticsEventCounts,
    AnalyticsEngagement {
  articleId: string;

  title?: string;

  slug?: string;

  categoryId?: string;

  categoryName?: string;

  domain?: AnalyticsDomain;

  lastActivityAt?: Date;
}

/**
 * Legacy/article-list analytics item.
 *
 * Kept intentionally because existing analytics dashboard/article
 * queries currently return this shape.
 *
 * This is NOT the same thing as ArticleAnalyticsResult.
 */
export interface ArticleAnalyticsItem {
  id: string;

  title: string;

  slug: string;

  images: string[];

  views: number;

  category: {
    id: string;
    slug: string;
    name: string;
  };

  isAstrology: boolean;

  isEditorial: boolean;
}

/**
 * Category analytics item used by existing category/trending queries.
 */
export interface CategoryAnalyticsItem {
  id: string;

  name: string;

  slug: string;

  score: number;
}

/**
 * Most-read article result.
 */
export interface MostReadArticle {
  articleId: string;

  title: string;

  slug: string;

  categoryId?: string;

  categoryName?: string;

  views: number;

  reads: number;

  uniqueReaders: number;

  score: number;
}

/**
 * Trending article result.
 */
export interface TrendingArticle {
  articleId: string;

  title: string;

  slug: string;

  categoryId?: string;

  categoryName?: string;

  views: number;

  reads: number;

  shares: number;

  reactions: number;

  engagementScore: number;

  trendingScore: number;

  lastActivityAt?: Date;
}

/**
 * Trending topic/category result.
 */
export interface TrendingTopic {
  id: string;

  name: string;

  slug: string;

  articleCount: number;

  views: number;

  reads: number;

  engagementScore: number;

  trendingScore: number;
}

/**
 * Category analytics result.
 */
export interface CategoryAnalyticsResult {
  categoryId: string;

  name: string;

  slug: string;

  domain?: AnalyticsDomain;

  articleCount: number;

  views: number;

  uniqueReaders: number;

  reads: number;

  shares: number;

  reactions: number;

  engagementScore: number;

  trendingScore: number;
}

/**
 * Platform-level analytics overview.
 */
export interface AnalyticsOverview {
  domain?: AnalyticsDomain;

  timeRange: AnalyticsTimeRange;

  totalViews: number;

  totalOpens: number;

  totalReads: number;

  totalShares: number;

  totalReactions: number;

  totalVideoPlays: number;

  totalVideoCompletes: number;

  uniqueUsers: number;

  uniqueSessions: number;

  engagementScore: number;
}

