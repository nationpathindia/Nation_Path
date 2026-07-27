import { NextResponse } from "next/server";

import {
  getMoonPhase,
} from "@/lib/astro/calculations/moonPhase";

export async function GET() {

  const today = new Date();

  return NextResponse.json({

    success: true,

    date: today.toISOString().split("T")[0],

    moon: getMoonPhase(today),

  });

}