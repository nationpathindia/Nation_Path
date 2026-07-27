import { NextResponse } from "next/server";

import { calculateGulikaKaal } from "@/lib/astro/calculations/muhurta";

export async function GET() {
  return NextResponse.json(
    calculateGulikaKaal({
      date: new Date("2026-07-01"),
      latitude: 17.385,
      longitude: 78.4867,
    })
  );
}