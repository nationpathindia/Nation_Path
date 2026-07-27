import { NextResponse } from "next/server";

import { calculateAbhijitMuhurat } from "@/lib/astro/calculations/muhurta/abhijit";

export async function GET() {
  return NextResponse.json(
    calculateAbhijitMuhurat({
      date: new Date("2026-07-01"),
      latitude: 17.385,
      longitude: 78.4867,
    })
  );
}