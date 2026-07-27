import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const zodiacSigns = [
  "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
  "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    // 🔐 CRON SECURITY (optional but recommended)
    if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dateString = today.toISOString().split("T")[0];

    let generated = 0;
    let skipped = 0;

    for (const sign of zodiacSigns) {
      const slug = `${sign.toLowerCase()}-${dateString}`;

      // 🛑 skip if already exists
      const existing = await prisma.article.findUnique({
        where: { slug },
      });

      if (existing) {
        skipped++;
        continue;
      }

      // 🔥 OPENAI CALL
      const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.8,
          messages: [
            {
              role: "system",
              content:
                "You are a professional astrologer. Always return ONLY valid JSON. No markdown, no extra text.",
            },
            {
              role: "user",
              content: `
Write today's horoscope for ${sign}.

Return ONLY this JSON format:

{
  "career": number (0-100),
  "love": number (0-100),
  "finance": number (0-100),
  "health": number (0-100),

  "dayEnergy": "High" | "Medium" | "Low",
  "mood": "short emotional description",
  "bestTime": "e.g. 10 AM - 2 PM",
  "warning": "short caution line",

  "content": "<h3>Career</h3><p>...</p><h3>Love</h3><p>...</p><h3>Health</h3><p>...</p><h3>Finance</h3><p>...</p><h3>Lucky Insights</h3><ul><li><strong>Lucky Color:</strong> ...</li><li><strong>Lucky Number:</strong> ...</li></ul>"
}

Rules:
- 350–450 words inside content
- Human, emotional tone
- No markdown, no backticks
`,
            },
          ],
        }),
      });

      const aiData = await aiRes.json();

      const raw = aiData?.choices?.[0]?.message?.content;

      if (!raw) {
        console.log(`No response for ${sign}`);
        skipped++;
        continue;
      }

      // 🧠 SAFE JSON PARSE
      let parsed;
      try {
        parsed = JSON.parse(raw);
      } catch (err) {
        console.log(`JSON parse failed for ${sign}`);
        skipped++;
        continue;
      }

      // 💾 SAVE TO DATABASE
      await prisma.article.create({
        data: {
          title: `${sign} Horoscope Today`,
          slug,
          content: parsed.content,

          isAstrology: true,
          zodiacSign: sign,
          horoscopeDate: today,
          status: "approved",
          publishedAt: today,

          // AI POWERED FIELDS
          careerScore: parsed.career,
          loveScore: parsed.love,
          financeScore: parsed.finance,
          healthScore: parsed.health,

          dayEnergy: parsed.dayEnergy,
          mood: parsed.mood,
          bestTime: parsed.bestTime,
          warning: parsed.warning,
        },
      });

      generated++;
      console.log(`Generated horoscope for ${sign}`);
    }

    return NextResponse.json({
      success: true,
      message: "Horoscope generation completed",
      generated,
      skipped,
    });
  } catch (error) {
    console.error("CRON ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Generation failed",
      },
      { status: 500 }
    );
  }
}