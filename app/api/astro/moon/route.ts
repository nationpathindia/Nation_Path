import { NextResponse } from "next/server";

export async function GET() {
  const hour = new Date().getHours();

  let phase = "Neutral";

  if (hour < 6) phase = "Moon Energy Low 🌑";
  else if (hour < 12) phase = "Rising Energy 🌒";
  else if (hour < 18) phase = "Peak Emotional Flow 🌕";
  else phase = "Cooling Energy 🌘";

  return NextResponse.json({
    success: true,
    data: {
      moonPhase: phase,
      emotionalLevel: hour,
      guidance:
        "Focus on clarity, avoid emotional decisions in high lunar energy.",
    },
  });
}