import { NextResponse } from "next/server";

import { calculateYamaganda } from "@/lib/astro/calculations/muhurta";

export async function GET() {
  return NextResponse.json(
    calculateYamaganda({
      date: new Date("2026-07-01"),
      latitude: 17.385,
      longitude: 78.4867,
    })
  );
}