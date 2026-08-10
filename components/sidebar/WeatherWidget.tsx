"use client";

import { useEffect, useState } from "react";

import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  Sunrise,
  Sunset,
  Wind,
  Droplets,
  Activity,
} from "lucide-react";

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  humidity: number;
  wind: number;
  aqi: number;
  sunrise: string;
  sunset: string;
}

interface WeatherResponse {
  success?: boolean;
  weather?: WeatherData;
}

export default function WeatherWidget() {
  const [weather, setWeather] =
    useState<WeatherData | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let cancelled = false;

    let timeoutId:
      | ReturnType<typeof setTimeout>
      | null = null;

    let idleId: number | null = null;

    const loadWeather = async () => {
      if (cancelled) return;

      try {
        const res = await fetch("/api/weather", {
          method: "GET",
          cache: "force-cache",
        });

        if (!res.ok) {
          throw new Error(
            `Weather request failed: ${res.status}`
          );
        }

        const data: WeatherResponse =
          await res.json();

        if (
          !cancelled &&
          data.success &&
          data.weather
        ) {
          setWeather(data.weather);
        }
      } catch (error) {
        if (!cancelled) {
          console.error(
            "Weather error:",
            error
          );

          setWeather(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    const scheduleLoad = () => {
      if (cancelled) return;

      if (
        typeof window !== "undefined" &&
        "requestIdleCallback" in window
      ) {
        idleId = (
          window as Window & {
            requestIdleCallback: (
              callback: () => void,
              options?: { timeout: number }
            ) => number;

            cancelIdleCallback: (
              id: number
            ) => void;
          }
        ).requestIdleCallback(
          loadWeather,
          {
            timeout: 2500,
          }
        );

        return;
      }

      timeoutId = setTimeout(
        loadWeather,
        1200
      );
    };

    scheduleLoad();

    return () => {
      cancelled = true;

      if (
        idleId !== null &&
        typeof window !== "undefined" &&
        "cancelIdleCallback" in window
      ) {
        (
          window as Window & {
            cancelIdleCallback: (
              id: number
            ) => void;
          }
        ).cancelIdleCallback(idleId);
      }

      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  /*
   * Weather is intentionally non-critical.
   *
   * Do not render a loading placeholder because
   * that creates unnecessary sidebar work during
   * the initial render.
   */
  if (loading || !weather) {
    return null;
  }

  return (
    <section
      aria-label="Weather Desk"
    >
      {/* HEADER */}

      <div
        className="
          flex
          justify-between
          items-start
          pb-5
          border-b
          border-[var(--news-border)]
        "
      >
        <div>
          <div
            className="
              text-[10px]
              uppercase
              tracking-[0.3em]
              font-bold
              text-[var(--news-light-text)]
            "
          >
            Weather Desk
          </div>

          <div
            className="
              mt-2
              font-semibold
              text-[var(--news-text)]
            "
          >
            {weather.city}, {weather.country}
          </div>
        </div>

        <span
          className="
            w-2
            h-2
            rounded-full
            bg-[var(--news-orange)]
            mt-1
          "
          aria-hidden="true"
        />
      </div>

      {/* MAIN WEATHER */}

      <div className="pt-6">
        <div
          className="
            flex
            justify-between
            items-center
          "
        >
          <div>
            <div
              className="
                text-6xl
                font-serif
                font-bold
                tracking-tight
                text-[var(--news-text)]
              "
            >
              {weather.temperature}°
            </div>

            <div
              className="
                mt-2
                font-semibold
                text-[var(--news-text)]
              "
            >
              {weather.condition}
            </div>
          </div>

          <div
            className="
              w-20
              h-20
              rounded-full
              bg-[var(--news-orange)]/10
              flex
              items-center
              justify-center
            "
          >
            {weatherIcon(weather.condition)}
          </div>
        </div>

        {/* WEATHER DETAILS */}

        <div
          className="
            grid
            grid-cols-3
            gap-4
            mt-8
            pt-5
            border-t
            border-[var(--news-border)]
          "
        >
          <Item
            icon={<Droplets size={14} />}
            title="Humidity"
            value={`${weather.humidity}%`}
          />

          <Item
            icon={<Wind size={14} />}
            title="Wind"
            value={`${weather.wind} km/h`}
          />

          <Item
            icon={<Activity size={14} />}
            title="AQI"
            value={aqi(weather.aqi)}
          />
        </div>

        {/* SUNRISE / SUNSET */}

        <div
          className="
            grid
            grid-cols-2
            gap-4
            mt-6
            pt-5
            border-t
            border-[var(--news-border)]
          "
        >
          <TimeBox
            icon={<Sunrise size={15} />}
            title="Sunrise"
            value={weather.sunrise}
          />

          <TimeBox
            icon={<Sunset size={15} />}
            title="Sunset"
            value={weather.sunset}
          />
        </div>
      </div>
    </section>
  );
}

function Item({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div>
      <div
        className="
          flex
          items-center
          gap-1.5
          text-[var(--news-light-text)]
        "
      >
        {icon}

        <span
          className="
            text-[10px]
            uppercase
            tracking-wider
          "
        >
          {title}
        </span>
      </div>

      <div
        className="
          mt-2
          font-bold
          text-[var(--news-text)]
        "
      >
        {value}
      </div>
    </div>
  );
}

function TimeBox({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-start
        gap-2
      "
    >
      <div
        className="
          mt-0.5
          text-[var(--news-light-text)]
        "
      >
        {icon}
      </div>

      <div>
        <div
          className="
            text-[10px]
            uppercase
            tracking-wider
            font-semibold
            text-[var(--news-light-text)]
          "
        >
          {title}
        </div>

        <div
          className="
            mt-1
            text-sm
            font-bold
            text-[var(--news-text)]
          "
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function weatherIcon(type: string) {
  const props = {
    size: 42,
    strokeWidth: 1.5,
    className:
      "text-[var(--news-orange)]",
  };

  if (type === "Clear Sky") {
    return <Sun {...props} />;
  }

  if (type === "Partly Cloudy") {
    return <CloudSun {...props} />;
  }

  if (type === "Rain") {
    return <CloudRain {...props} />;
  }

  return <Cloud {...props} />;
}

function aqi(value: number) {
  if (value <= 50) {
    return "Good";
  }

  if (value <= 100) {
    return "Moderate";
  }

  if (value <= 150) {
    return "Poor";
  }

  return "Bad";
}