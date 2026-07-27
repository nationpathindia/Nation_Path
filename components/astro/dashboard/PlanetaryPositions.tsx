"use client";

import * as React from "react";

import {
  ArrowDown,
  ArrowUp,
  Circle,
  Loader2,
  Orbit,
  ShieldCheck,
  Sparkles,
  Stars,
} from "lucide-react";

import { cn } from "@/lib/utils";

export type PlanetMotion = "direct" | "retrograde";

export type PlanetStrength =
  | "very-strong"
  | "strong"
  | "average"
  | "weak"
  | "debilitated";

export type PlanetStatus =
  | "exalted"
  | "own-sign"
  | "friendly"
  | "neutral"
  | "enemy"
  | "debilitated";

export interface PlanetaryPosition {
  id: string;
  name: string;
  sanskritName: string;
  zodiacSign: string;
  degree: number;
  nakshatra: string;
  pada: 1 | 2 | 3 | 4;
  motion: PlanetMotion;
  house: number;
  strength: PlanetStrength;
  status: PlanetStatus;
  icon?: React.ReactNode;
}

export interface PlanetaryPositionsProps {
  data?: PlanetaryPosition[];
  isLoading?: boolean;
  error?: string | null;
  title?: string;
  subtitle?: string;
  className?: string;
  onPlanetClick?: (planet: PlanetaryPosition) => void;
}

const STATUS_STYLES: Record<
  PlanetStatus,
  {
    label: string;
    badge: string;
  }
> = {
  exalted: {
    label: "Exalted",
    badge:
      "border-[#C9A227]/30 bg-[#C9A227]/10 text-[#8A6D12]",
  },

  "own-sign": {
    label: "Own Sign",
    badge:
      "border-[#0B2A6F]/20 bg-[#0B2A6F]/10 text-[#0B2A6F]",
  },

  friendly: {
    label: "Friendly",
    badge:
      "border-slate-300 bg-slate-100 text-slate-700",
  },

  neutral: {
    label: "Neutral",
    badge:
      "border-slate-200 bg-slate-50 text-slate-600",
  },

  enemy: {
    label: "Enemy",
    badge:
      "border-amber-300 bg-amber-50 text-amber-700",
  },

  debilitated: {
    label: "Debilitated",
    badge:
      "border-red-200 bg-red-50 text-red-700",
  },
};

const STRENGTH_STYLES: Record<
  PlanetStrength,
  {
    value: number;
    color: string;
    label: string;
  }
> = {
  "very-strong": {
    value: 100,
    color: "bg-[#0B2A6F]",
    label: "Very Strong",
  },

  strong: {
    value: 82,
    color: "bg-[#315FAF]",
    label: "Strong",
  },

  average: {
    value: 58,
    color: "bg-[#C9A227]",
    label: "Average",
  },

  weak: {
    value: 34,
    color: "bg-amber-500",
    label: "Weak",
  },

  debilitated: {
    value: 15,
    color: "bg-red-500",
    label: "Debilitated",
  },
};
function formatDegree(value: number): string {
  return `${value.toFixed(2)}°`;
}

function getMotionLabel(
  motion: PlanetMotion,
): {
  label: string;
  icon: React.ReactNode;
  className: string;
} {
  if (motion === "retrograde") {
    return {
      label: "Retrograde",
      icon: <ArrowDown className="h-3.5 w-3.5" />,
      className:
        "border-amber-300 bg-amber-50 text-amber-700",
    };
  }

  return {
    label: "Direct",
    icon: <ArrowUp className="h-3.5 w-3.5" />,
    className:
      "border-[#C9A227]/30 bg-[#C9A227]/10 text-[#8A6D12]",
  };
}

function PlanetSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#E8E5DA] bg-white">
      <div className="animate-pulse p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-[#F4F1E8]" />

            <div className="space-y-2">
              <div className="h-4 w-28 rounded bg-[#F4F1E8]" />
              <div className="h-3 w-20 rounded bg-[#F4F1E8]" />
            </div>
          </div>

          <div className="h-8 w-24 rounded-full bg-[#F4F1E8]" />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="
                rounded-2xl
                border
                border-[#ECE8DD]
                bg-[#FAFAF7]
                p-4
              "
            >
              <div className="mb-2 h-3 w-16 rounded bg-[#ECE8DD]" />

              <div className="h-5 w-24 rounded bg-[#ECE8DD]" />
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="mb-2 h-3 w-32 rounded bg-[#ECE8DD]" />

          <div className="h-2 rounded-full bg-[#ECE8DD]" />
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-dashed
        border-[#C9A227]/25
        bg-[#FAFAF7]
        px-8
        py-16
        text-center
      "
    >
      <Orbit className="mx-auto mb-5 h-12 w-12 text-[#C9A227]" />

      <h3
        className="
          font-serif
          text-xl
          font-semibold
          text-[#071426]
        "
      >
        Planetary positions unavailable
      </h3>

      <p
        className="
          mx-auto
          mt-4
          max-w-lg
          text-sm
          leading-7
          text-slate-600
        "
      >
        Planetary calculations are not available for the selected chart.
        Once astronomical computation finishes, every Graha will appear
        automatically.
      </p>
    </div>
  );
}

function ErrorState({
  message,
}: {
  message: string;
}) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-red-200
        bg-red-50
        p-8
      "
    >
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-red-100 p-3">
          <ShieldCheck className="h-5 w-5 text-red-600" />
        </div>

        <div>
          <h3 className="font-semibold text-red-700">
            Unable to load planetary positions
          </h3>

          <p className="mt-2 text-sm leading-7 text-red-600">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
function PlanetCard({
  planet,
  onClick,
}: {
  planet: PlanetaryPosition;
  onClick?: (planet: PlanetaryPosition) => void;
}) {
  const strength = STRENGTH_STYLES[planet.strength];
  const status = STATUS_STYLES[planet.status];
  const motion = getMotionLabel(planet.motion);

  return (
    <button
      type="button"
      onClick={() => onClick?.(planet)}
      className={cn(
        "group relative overflow-hidden rounded-3xl",
        "border border-[#E8E5DA] bg-white",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:border-[#C9A227]/40",
        "hover:shadow-lg",
        "focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-[#C9A227]/40",
      )}
    >
      <span className="absolute left-0 top-0 h-full w-1 bg-transparent transition-all duration-300 group-hover:bg-[#C9A227]" />

      <div className="p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#C9A227]/30 bg-[#FAFAF7] text-[#C9A227]">
              {planet.icon ?? <Stars className="h-6 w-6" />}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-serif text-xl font-semibold text-[#071426]">
                  {planet.name}
                </h3>

                <span
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]",
                    status.badge,
                  )}
                >
                  {status.label}
                </span>
              </div>

              <p className="mt-1 text-sm italic text-slate-500">
                {planet.sanskritName}
              </p>
            </div>
          </div>

          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
              "text-[11px] font-semibold uppercase tracking-[0.12em]",
              motion.className,
            )}
          >
            {motion.icon}
            {motion.label}
          </span>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Zodiac Sign", planet.zodiacSign],
            ["Longitude", formatDegree(planet.degree)],
            ["House", planet.house],
            ["Nakshatra", planet.nakshatra],
            ["Pada", planet.pada],
            ["Strength", strength.label],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-[#ECE8DD] bg-[#FAFAF7] p-4"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                {label}
              </p>

              <p className="mt-2 font-semibold text-[#071426]">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="mb-3 flex justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Planetary Strength
            </span>

            <span className="text-sm font-semibold text-[#071426]">
              {strength.value}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-[#ECE8DD]">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                strength.color,
              )}
              style={{
                width: `${strength.value}%`,
              }}
            />
          </div>
        </div>
      </div>
    </button>
  );
}

export default function PlanetaryPositions({
  data = [],
  isLoading = false,
  error = null,
  title = "Today's Planetary Positions",
  subtitle = "Track the movement, strength and placement of every Graha through authentic Vedic astronomical calculations.",
  className,
  onPlanetClick,
}: PlanetaryPositionsProps) {
  const hasData = data.length > 0;

  return (
    <section className={cn("my-20", className)}>
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#8A6D12]">
          <Orbit className="h-3.5 w-3.5" />
          Planetary Dashboard
        </div>

        <h2 className="mt-6 font-serif text-3xl font-bold text-[#071426] md:text-4xl">
          {title}
        </h2>

        <div className="mx-auto mt-5 h-px w-24 bg-[#C9A227]/40" />

        <p className="mt-6 leading-8 text-slate-600">
          {subtitle}
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          <div className="flex justify-center gap-3 text-[#8A6D12]">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Calculating planetary positions...</span>
          </div>

          {Array.from({ length: 9 }).map((_, index) => (
            <PlanetSkeleton key={index} />
          ))}
        </div>
      ) : error ? (
        <ErrorState message={error} />
      ) : !hasData ? (
        <EmptyState />
      ) : (
        <div className="grid gap-8">
          {data.map((planet) => (
            <PlanetCard
              key={planet.id}
              planet={planet}
              onClick={onPlanetClick}
            />
          ))}
        </div>
      )}
    </section>
  );
}