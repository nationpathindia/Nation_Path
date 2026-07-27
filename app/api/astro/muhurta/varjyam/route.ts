import { NextRequest, NextResponse } from "next/server";

import { getVarjyam } from "@/lib/astro/calculations/muhurta";

export async function GET(
  request: NextRequest
) {
  const { searchParams } =
    new URL(request.url);

  const date =
    searchParams.get("date");

  const targetDate =
    date
      ? new Date(
          date.replace(" ", "+")
        )
      : new Date();

  if (
    Number.isNaN(
      targetDate.getTime()
    )
  ) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid date provided",
        received: date,
      },
      {
        status: 400,
      }
    );
  }

  const result =
    getVarjyam(
      targetDate
    );

  return NextResponse.json({
    success: true,

    timestamp:
      new Date().toISOString(),

    requestedDate:
      targetDate.toISOString(),

    data: result,
  });
}