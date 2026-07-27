import { NextResponse } from "next/server";
import { calculateMoonset } from "@/lib/astro/calculations/moonset";

export async function GET() {
  return NextResponse.json(
    calculateMoonset({
      date: new Date("2026-07-01"),
      latitude: 17.385,
      longitude: 78.4867,
    })
  );
}