import { NextResponse } from "next/server";

import { calculateNightDuration } from "@/lib/astro/calculations/nightDuration";

export async function GET() {
  return NextResponse.json(
    calculateNightDuration({
      date: new Date("2026-07-01"),
      latitude: 17.385,
      longitude: 78.4867,
    })
  );
}