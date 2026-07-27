import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { sign, content } = await req.json();

    if (!sign || !content) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const prompt = `
Convert this horoscope into a SHORT viral Instagram caption (max 40 words).

Sign: ${sign}
Content: ${content}

Return JSON ONLY:
{
  "title": "",
  "subtitle": "",
  "lucky": "",
  "caption": ""
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
          { role: "system", content: "You are a viral astrology copywriter." },
          { role: "user", content: prompt },
        ],
        temperature: 0.8,
      }),
    });

    const data = await aiRes.json();
    const text = data?.choices?.[0]?.message?.content;

    return NextResponse.json({ success: true, data: JSON.parse(text) });

  } catch (e) {
    return NextResponse.json({ success: false });
  }
}