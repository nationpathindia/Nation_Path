import { NextRequest, NextResponse } from "next/server";

import { getNakshatraTiming } from "@/lib/astro/calculations/panchang";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const date = searchParams.get("date")
    ? new Date(searchParams.get("date")!)
    : new Date();

  const result = getNakshatraTiming(date);

  return NextResponse.json({
    success: true,
    requestedDate: date.toISOString(),
    data: result,
  });
}