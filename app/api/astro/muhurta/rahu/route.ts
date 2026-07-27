import { NextResponse } from "next/server";

import { calculateRahuKaal } from "@/lib/astro/calculations/muhurta/rahu";

export async function GET() {

  return NextResponse.json(

    calculateRahuKaal({

      date: new Date("2026-07-01"),

      latitude: 17.385,

      longitude: 78.4867,

    })

  );

}