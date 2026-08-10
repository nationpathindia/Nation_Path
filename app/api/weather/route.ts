import { NextResponse } from "next/server";

export const revalidate = 1800;

type WeatherResponse = {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  humidity: number;
  wind: number;
  aqi: number;
  sunrise: string;
  sunset: string;
};

export async function GET(req: Request) {
  try {
    const headers = req.headers;

    const city =
      headers.get("x-vercel-ip-city") ||
      "New Delhi";

    const country =
      headers.get("x-vercel-ip-country") ||
      "India";

    const latitude =
      headers.get("x-vercel-ip-latitude") ||
      "28.6139";

    const longitude =
      headers.get("x-vercel-ip-longitude") ||
      "77.2090";

    const weatherUrl =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${encodeURIComponent(latitude)}` +
      `&longitude=${encodeURIComponent(longitude)}` +
      `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m` +
      `&daily=sunrise,sunset` +
      `&timezone=auto`;

    const aqiUrl =
      `https://air-quality-api.open-meteo.com/v1/air-quality` +
      `?latitude=${encodeURIComponent(latitude)}` +
      `&longitude=${encodeURIComponent(longitude)}` +
      `&current=us_aqi`;

    /*
     * Weather + AQI run in parallel.
     * They are now server-side requests and
     * are no longer made directly by the browser.
     */
    const [weatherRes, aqiRes] = await Promise.all([
      fetch(weatherUrl, {
        next: {
          revalidate: 1800,
        },
      }),

      fetch(aqiUrl, {
        next: {
          revalidate: 1800,
        },
      }),
    ]);

    if (!weatherRes.ok) {
      throw new Error(
        `Weather API failed: ${weatherRes.status}`
      );
    }

    if (!aqiRes.ok) {
      throw new Error(
        `AQI API failed: ${aqiRes.status}`
      );
    }

    const [weatherJson, aqiJson] =
      await Promise.all([
        weatherRes.json(),
        aqiRes.json(),
      ]);

    const current = weatherJson?.current;
    const daily = weatherJson?.daily;

    if (!current || !daily) {
      throw new Error(
        "Invalid weather response"
      );
    }

    const weather: WeatherResponse = {
      city,
      country,

      temperature: Math.round(
        Number(current.temperature_2m ?? 0)
      ),

      condition: getCondition(
        Number(current.weather_code ?? 0)
      ),

      humidity: Number(
        current.relative_humidity_2m ?? 0
      ),

      wind: Math.round(
        Number(current.wind_speed_10m ?? 0)
      ),

      aqi: Number(
        aqiJson?.current?.us_aqi ?? 0
      ),

      sunrise: formatTime(
        daily.sunrise?.[0]
      ),

      sunset: formatTime(
        daily.sunset?.[0]
      ),
    };

    return NextResponse.json(
      {
        success: true,
        weather,
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "public, s-maxage=1800, stale-while-revalidate=3600",
        },
      }
    );
  } catch (error) {
    console.error(
      "Weather API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        weather: null,
        error: "Unable to load weather",
      },
      {
        status: 500,
        headers: {
          "Cache-Control":
            "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  }
}

function getCondition(
  code: number
): string {
  if (code === 0) {
    return "Clear Sky";
  }

  if (code <= 3) {
    return "Partly Cloudy";
  }

  if (code <= 67) {
    return "Rain";
  }

  return "Cloudy";
}

function formatTime(
  value?: string
): string {
  if (!value) {
    return "--";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "--";
  }

  return date.toLocaleTimeString(
    "en-IN",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }
  );
}

