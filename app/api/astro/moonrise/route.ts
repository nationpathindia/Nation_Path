import { NextResponse } from "next/server";
import { calculateMoonrise } from "@/lib/astro/calculations/moonrise";

export async function GET() {
  return NextResponse.json(
    calculateMoonrise({
      date: new Date("2026-07-01"),
      latitude: 17.385,
      longitude: 78.4867,
    })
  );
}