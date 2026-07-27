import { NextResponse } from "next/server";

import { calculateBrahmaMuhurat } from "@/lib/astro/calculations/muhurta/brahma";

export async function GET() {

  return NextResponse.json(

    calculateBrahmaMuhurat({

      date: new Date("2026-07-01"),

      latitude: 17.385,

      longitude: 78.4867,

    })

  );

}