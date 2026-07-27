import { NextResponse } from "next/server";

import {
  calculateRiseSet,
} from "@/lib/astro/calculations/riseSet";

import {
  Planet,
  RiseTransitFlag,
} from "@/lib/astro/client";

export async function GET() {
  const result = calculateRiseSet(
    Planet.Sun,
    RiseTransitFlag.Rise,
    {
      date: new Date("2026-07-01"),
      latitude: 17.385,
      longitude: 78.4867,
    }
  );

  return NextResponse.json(result);
}