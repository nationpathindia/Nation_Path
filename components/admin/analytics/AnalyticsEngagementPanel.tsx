"use client";

import {
  Activity,
  BookOpen,
  Eye,
  Heart,
  MousePointerClick,
  Share2,
  Users,
} from "lucide-react";

export interface AnalyticsEngagementPanelData {
  views?: number;
  opens?: number;
  reads?: number;
  shares?: number;
  reactions?: number;
  likes?: number;
  uniqueUsers?: number;
  uniqueSessions?: number;
}

interface AnalyticsEngagementPanelProps {
  data?: AnalyticsEngagementPanelData;
}

function number(value?: number) {
  return Number(value) || 0;
}

function percentage(
  value: number,
  total: number
) {
  if (!total || total <= 0) {
    return 0;
  }

  return Math.min(
    100,
    Math.round((value / total) * 100)
  );
}

function EngagementMetric({
  label,
  value,
  icon: Icon,
  percentageValue,
  accent = "navy",
}: {
  label: string;
  value: number;
  icon: typeof Eye;
  percentageValue?: number;
  accent?: "navy" | "orange" | "green";
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

          <p className="mt-1.5 text-xl font-bold tracking-tight text-white">
            {value.toLocaleString()}
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

      {typeof percentageValue === "number" && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-gray-600">
              Engagement share
            </span>

            <span className="font-medium text-gray-500">
              {percentageValue}%
            </span>
          </div>

          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.05]">
            <div
              className="h-full rounded-full bg-[#163C80] transition-all duration-500"
              style={{
                width: `${Math.max(
                  percentageValue,
                  percentageValue > 0 ? 2 : 0
                )}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function AnalyticsEngagementPanel({
  data,
}: AnalyticsEngagementPanelProps) {
  const views = number(data?.views);
  const opens = number(data?.opens);
  const reads = number(data?.reads);
  const shares = number(data?.shares);
  const reactions = number(data?.reactions);
  const likes = number(data?.likes);
  const uniqueUsers = number(data?.uniqueUsers);
  const uniqueSessions = number(
    data?.uniqueSessions
  );

  const totalInteractions =
    opens +
    reads +
    shares +
    reactions +
    likes;

  const readRate = percentage(
    reads,
    views
  );

  const shareRate = percentage(
    shares,
    views
  );

  const reactionRate = percentage(
    reactions + likes,
    views
  );

  const sessionDepth = percentage(
    reads,
    uniqueSessions || views
  );

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
      {/* HEADER */}

      <div className="border-b border-white/[0.07] px-5 py-5">
        <div className="flex items-center gap-2">
          <Activity
            size={17}
            strokeWidth={1.8}
            className="text-[#EA661B]"
          />

          <h2 className="text-lg font-semibold text-white">
            Engagement Intelligence
          </h2>
        </div>

        <p className="mt-1 text-sm text-gray-500">
          How visitors move from viewing content to meaningful engagement.
        </p>
      </div>

      {/* FUNNEL */}

      <div className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-4">
        <EngagementMetric
          label="Views"
          value={views}
          icon={Eye}
          percentageValue={100}
          accent="orange"
        />

        <EngagementMetric
          label="Reads"
          value={reads}
          icon={BookOpen}
          percentageValue={readRate}
          accent="green"
        />

        <EngagementMetric
          label="Shares"
          value={shares}
          icon={Share2}
          percentageValue={shareRate}
          accent="orange"
        />

        <EngagementMetric
          label="Reactions"
          value={reactions + likes}
          icon={Heart}
          percentageValue={reactionRate}
          accent="navy"
        />
      </div>

      {/* SECONDARY INTELLIGENCE */}

      <div className="grid gap-4 border-t border-white/[0.06] p-5 sm:grid-cols-3">
        <div className="rounded-xl bg-white/[0.02] p-4">
          <div className="flex items-center gap-2">
            <MousePointerClick
              size={14}
              strokeWidth={1.8}
              className="text-gray-500"
            />

            <p className="text-xs text-gray-500">
              Opens
            </p>
          </div>

          <p className="mt-2 text-lg font-semibold text-white">
            {opens.toLocaleString()}
          </p>

          <p className="mt-1 text-[10px] text-gray-600">
            Article entry interactions
          </p>
        </div>

        <div className="rounded-xl bg-white/[0.02] p-4">
          <div className="flex items-center gap-2">
            <Users
              size={14}
              strokeWidth={1.8}
              className="text-gray-500"
            />

            <p className="text-xs text-gray-500">
              Unique Users
            </p>
          </div>

          <p className="mt-2 text-lg font-semibold text-white">
            {uniqueUsers.toLocaleString()}
          </p>

          <p className="mt-1 text-[10px] text-gray-600">
            Distinct authenticated visitors
          </p>
        </div>

        <div className="rounded-xl bg-white/[0.02] p-4">
          <div className="flex items-center gap-2">
            <Activity
              size={14}
              strokeWidth={1.8}
              className="text-gray-500"
            />

            <p className="text-xs text-gray-500">
              Sessions
            </p>
          </div>

          <p className="mt-2 text-lg font-semibold text-white">
            {uniqueSessions.toLocaleString()}
          </p>

          <p className="mt-1 text-[10px] text-gray-600">
            Unique analytics sessions
          </p>
        </div>
      </div>

      {/* SUMMARY */}

      <div className="border-t border-white/[0.06] px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-gray-400">
              Total meaningful interactions
            </p>

            <p className="mt-1 text-sm text-gray-600">
              Opens, reads, shares, reactions and likes
            </p>
          </div>

          <p className="text-lg font-bold text-white">
            {totalInteractions.toLocaleString()}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-[10px] text-gray-600">
          <span>
            Read rate: {readRate}%
          </span>

          <span>
            Share rate: {shareRate}%
          </span>

          <span>
            Reaction rate: {reactionRate}%
          </span>

          <span>
            Session depth: {sessionDepth}%
          </span>
        </div>
      </div>
    </section>
  );
}

