import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { sign1, sign2 } = body;

    if (!sign1 || !sign2) {
      return NextResponse.json(
        { success: false, error: "Missing signs" },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert astrologer.

Give compatibility analysis between ${sign1} and ${sign2}.

Return STRICT JSON only:

{
  "score": number (0-100),
  "summary": "short relationship summary",
  "love": "love compatibility insight",
  "trust": "trust level explanation",
  "communication": "communication style analysis",
  "advice": "relationship advice"
}
`;

    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a precise astrology AI." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    const data = await aiRes.json();

    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      return NextResponse.json(
        { success: false, error: "AI failed" },
        { status: 500 }
      );
    }

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid AI JSON" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: parsed,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}