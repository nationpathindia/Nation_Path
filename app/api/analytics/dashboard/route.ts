//////////////////////////////////////////////////////////////
// NATIONPATH ANALYTICS
// DASHBOARD API
//
// Responsibilities:
// - Expose canonical analytics dashboard data
// - Read analytics through lib/analytics
// - Accept analytics time range
//
// IMPORTANT:
// - No Prisma queries here
// - No analytics calculations here
// - No duplicate event weights
// - No duplicate time-range logic
// - Uses canonical lib/analytics/dashboard.ts
//////////////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

import {
  getAnalyticsDashboard,
} from "@/lib/analytics/dashboard";

import type {
  AnalyticsTimeRange,
} from "@/lib/analytics/types";

export const dynamic = "force-dynamic";

//////////////////////////////////////////////////////////////
// VALID TIME RANGES
//////////////////////////////////////////////////////////////

const VALID_RANGES: readonly AnalyticsTimeRange[] = [
  "1h",
  "6h",
  "24h",
  "7d",
  "30d",
  "90d",
  "all",
];

//////////////////////////////////////////////////////////////
// RANGE VALIDATION
//////////////////////////////////////////////////////////////

function getTimeRange(
  value: string | null
): AnalyticsTimeRange {
  if (
    value &&
    (
      VALID_RANGES as readonly string[]
    ).includes(value)
  ) {
    return value as AnalyticsTimeRange;
  }

  return "24h";
}

//////////////////////////////////////////////////////////////
// GET
//////////////////////////////////////////////////////////////

export async function GET(
  request: NextRequest
) {
  try {
    const range = getTimeRange(
      request.nextUrl.searchParams.get(
        "range"
      )
    );

    const dashboard =
      await getAnalyticsDashboard(
        range
      );

    return NextResponse.json(
      {
        success: true,
        data: dashboard,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "[Analytics] Dashboard API failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to load analytics dashboard",
      },
      {
        status: 500,
      }
    );
  }
}