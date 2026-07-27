import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("q")?.trim();

    if (!query || query.length < 2) {
      return NextResponse.json([]);
    }

    const url = new URL("https://nominatim.openstreetmap.org/search");

    url.searchParams.set("q", query);
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("addressdetails", "1");
    url.searchParams.set("limit", "8");

    const response = await fetch(url.toString(), {
      headers: {
        "User-Agent": "NationPath Astro (support@nationpathindia.com)",
        Accept: "application/json",
      },
      next: {
        revalidate: 60 * 60 * 24, // 24 hours
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch locations." },
        { status: 500 }
      );
    }

    const data = await response.json();

    const locations = data.map((item: any) => ({
      displayName: item.display_name,
      city:
        item.address?.city ||
        item.address?.town ||
        item.address?.village ||
        item.address?.municipality ||
        null,
      district:
        item.address?.county ||
        item.address?.state_district ||
        null,
      state: item.address?.state || null,
      country: item.address?.country || null,
      postalCode: item.address?.postcode || null,
      latitude: Number(item.lat),
      longitude: Number(item.lon),
    }));

    return NextResponse.json(locations);
  } catch (error) {
    console.error("Location Search Error:", error);

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}