"use client";

import {
  Activity,
  BarChart3,
  CircleDollarSign,
  MousePointerClick,
  Eye,
  Megaphone,
  Percent,
  TrendingUp,
} from "lucide-react";

export interface AnalyticsAdsPanelData {
  activeAds?: number;
  adViews?: number;
  adClicks?: number;
  impressions?: number;
  clicks?: number;
  ctr?: number;
  revenue?: number;
  fillRate?: number;
}

interface AnalyticsAdsPanelProps {
  ads?: AnalyticsAdsPanelData;
}

function number(value?: number) {
  return Number(value) || 0;
}

function formatNumber(value?: number) {
  return number(value).toLocaleString();
}

function formatCurrency(value?: number) {
  return number(value).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });
}

function calculateCtr(
  clicks: number,
  impressions: number
) {
  if (!impressions) {
    return 0;
  }

  return (clicks / impressions) * 100;
}

function Metric({
  label,
  value,
  icon: Icon,
  accent = "navy",
  description,
}: {
  label: string;
  value: string;
  icon: typeof Eye;
  accent?: "navy" | "orange" | "green";
  description?: string;
}) {
  const iconClass = {
    navy: "bg-[#163C80]/15 text-[#7FA1E0]",
    orange: "bg-[#EA661B]/10 text-[#EA661B]",
    green: "bg-emerald-500/10 text-emerald-400",
  }[accent];

  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-gray-500">
            {label}
          </p>

          <p className="mt-1.5 truncate text-xl font-bold tracking-tight text-white">
            {value}
          </p>
        </div>

        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconClass}`}
        >
          <Icon
            size={16}
            strokeWidth={1.8}
          />
        </div>
      </div>

      {description && (
        <p className="mt-2 text-[10px] text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
}

export default function AnalyticsAdsPanel({
  ads,
}: AnalyticsAdsPanelProps) {
  const activeAds = number(
    ads?.activeAds
  );

  const adViews = number(
    ads?.adViews
  );

  const adClicks = number(
    ads?.adClicks
  );

  const impressions = number(
    ads?.impressions
  );

  const clicks = number(
    ads?.clicks
  );

  const ctr =
    typeof ads?.ctr === "number"
      ? ads.ctr
      : calculateCtr(
          clicks || adClicks,
          impressions || adViews
        );

  const revenue = number(
    ads?.revenue
  );

  const fillRate = number(
    ads?.fillRate
  );

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
      {/* HEADER */}

      <div className="flex flex-col gap-3 border-b border-white/[0.07] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Megaphone
              size={17}
              strokeWidth={1.8}
              className="text-[#EA661B]"
            />

            <h2 className="text-lg font-semibold text-white">
              Advertising Intelligence
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Ad delivery, audience response and monetization performance.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Activity
            size={13}
            strokeWidth={1.8}
          />

          Monetization
        </div>
      </div>

      {/* PRIMARY METRICS */}

      <div className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          label="Active Ads"
          value={formatNumber(activeAds)}
          icon={Megaphone}
          accent="navy"
          description="Currently active placements"
        />

        <Metric
          label="Ad Views"
          value={formatNumber(adViews)}
          icon={Eye}
          accent="orange"
          description="Recorded ad impressions"
        />

        <Metric
          label="Ad Clicks"
          value={formatNumber(adClicks)}
          icon={MousePointerClick}
          accent="green"
          description="Recorded ad interactions"
        />

        <Metric
          label="CTR"
          value={`${ctr.toFixed(2)}%`}
          icon={Percent}
          accent="orange"
          description="Click-through rate"
        />
      </div>

      {/* SECONDARY */}

      <div className="grid gap-4 border-t border-white/[0.06] p-5 sm:grid-cols-3">
        <div className="rounded-xl bg-white/[0.02] p-4">
          <div className="flex items-center gap-2">
            <BarChart3
              size={14}
              strokeWidth={1.8}
              className="text-gray-500"
            />

            <p className="text-xs text-gray-500">
              Impressions
            </p>
          </div>

          <p className="mt-2 text-lg font-semibold text-white">
            {formatNumber(impressions || adViews)}
          </p>

          <p className="mt-1 text-[10px] text-gray-600">
            Total ad delivery opportunities
          </p>
        </div>

        <div className="rounded-xl bg-white/[0.02] p-4">
          <div className="flex items-center gap-2">
            <CircleDollarSign
              size={14}
              strokeWidth={1.8}
              className="text-gray-500"
            />

            <p className="text-xs text-gray-500">
              Revenue
            </p>
          </div>

          <p className="mt-2 text-lg font-semibold text-white">
            {formatCurrency(revenue)}
          </p>

          <p className="mt-1 text-[10px] text-gray-600">
            Recorded advertising revenue
          </p>
        </div>

        <div className="rounded-xl bg-white/[0.02] p-4">
          <div className="flex items-center gap-2">
            <TrendingUp
              size={14}
              strokeWidth={1.8}
              className="text-gray-500"
            />

            <p className="text-xs text-gray-500">
              Fill Rate
            </p>
          </div>

          <p className="mt-2 text-lg font-semibold text-white">
            {fillRate.toFixed(1)}%
          </p>

          <p className="mt-1 text-[10px] text-gray-600">
            Available when ad inventory data exists
          </p>
        </div>
      </div>

      {/* PERFORMANCE SUMMARY */}

      <div className="border-t border-white/[0.06] px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-gray-400">
              Advertising performance
            </p>

            <p className="mt-1 text-[11px] text-gray-600">
              CTR is calculated from available impression and click data.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-2">
            <Percent
              size={13}
              strokeWidth={1.8}
              className="text-[#EA661B]"
            />

            <span className="text-xs font-semibold text-gray-300">
              {ctr.toFixed(2)}% CTR
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

