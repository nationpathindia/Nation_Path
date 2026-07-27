import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.TWELVEDATA_API_KEY;

    const symbols = [
      "NIFTY",
      "SENSEX",
      "USD/INR",
      "XAU/USD",
    ];

    const results = await Promise.all(
      symbols.map(async (symbol) => {
        const res = await fetch(
          `https://api.twelvedata.com/price?symbol=${encodeURIComponent(
            symbol
          )}&apikey=${apiKey}`,
          {
            next: {
              revalidate: 60,
            },
          }
        );

        return res.json();
      })
    );

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch market data" },
      { status: 500 }
    );
  }
}