"use client";

import {
  Activity,
  BookOpen,
  Eye,
  FileText,
  Heart,
  MousePointerClick,
  Radio,
  Share2,
  Sparkles,
  UserRound,
} from "lucide-react";

export interface AnalyticsLiveActivityItem {
  id?: string;

  eventType?: string;

  articleId?: string;

  articleTitle?: string;

  title?: string;

  contentType?:
    | "news"
    | "editorial"
    | "astro"
    | string;

  userId?: string | null;

  sessionId?: string | null;

  createdAt?: string | Date;

  metadata?: Record<
    string,
    unknown
  >;
}

interface AnalyticsLiveActivityProps {
  activity?: AnalyticsLiveActivityItem[];
  updatedAt?: string | Date;
}

function getEventLabel(
  eventType?: string
) {
  switch (eventType) {
    case "view":
      return "Viewed";

    case "open":
      return "Opened";

    case "read":
      return "Read";

    case "scroll":
      return "Scrolled";

    case "like":
      return "Liked";

    case "reaction":
      return "Reacted";

    case "share":
      return "Shared";

    case "video_play":
      return "Played video";

    case "video_complete":
      return "Completed video";

    default:
      return eventType
        ? eventType.replaceAll(
            "_",
            " "
          )
        : "Activity";
  }
}

function getEventIcon(
  eventType?: string
) {
  switch (eventType) {
    case "view":
      return Eye;

    case "open":
      return MousePointerClick;

    case "read":
      return BookOpen;

    case "scroll":
      return Activity;

    case "like":
      return Heart;

    case "reaction":
      return Sparkles;

    case "share":
      return Share2;

    case "video_play":
    case "video_complete":
      return Radio;

    default:
      return Activity;
  }
}

function getEventClass(
  eventType?: string
) {
  switch (eventType) {
    case "view":
    case "open":
      return {
        icon: "bg-[#163C80]/15 text-[#7FA1E0]",
        dot: "bg-[#7FA1E0]",
      };

    case "read":
      return {
        icon: "bg-emerald-500/10 text-emerald-400",
        dot: "bg-emerald-400",
      };

    case "share":
    case "like":
    case "reaction":
      return {
        icon: "bg-[#EA661B]/10 text-[#EA661B]",
        dot: "bg-[#EA661B]",
      };

    default:
      return {
        icon: "bg-white/[0.05] text-gray-500",
        dot: "bg-gray-500",
      };
  }
}

function getTypeLabel(
  type?: string
) {
  switch (type) {
    case "editorial":
      return "Editorial";

    case "astro":
      return "Astrology";

    default:
      return "News";
  }
}

function getTypeClass(
  type?: string
) {
  switch (type) {
    case "editorial":
      return "bg-[#163C80]/15 text-[#7FA1E0]";

    case "astro":
      return "bg-[#EA661B]/10 text-[#EA661B]";

    default:
      return "bg-emerald-500/10 text-emerald-400";
  }
}

function formatTime(
  value?: string | Date
) {
  if (!value) {
    return "Just now";
  }

  const date =
    value instanceof Date
      ? value
      : new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "Just now";
  }

  const diff =
    Date.now() -
    date.getTime();

  const seconds =
    Math.max(0, diff) / 1000;

  if (seconds < 10) {
    return "Just now";
  }

  if (seconds < 60) {
    return `${Math.floor(
      seconds
    )}s ago`;
  }

  const minutes =
    seconds / 60;

  if (minutes < 60) {
    return `${Math.floor(
      minutes
    )}m ago`;
  }

  const hours =
    minutes / 60;

  if (hours < 24) {
    return `${Math.floor(
      hours
    )}h ago`;
  }

  return date.toLocaleTimeString(
    "en-IN",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}

function getArticleTitle(
  item: AnalyticsLiveActivityItem
) {
  return (
    item.articleTitle ||
    item.title ||
    "Content interaction"
  );
}

function ActivityRow({
  item,
}: {
  item: AnalyticsLiveActivityItem;
}) {
  const Icon = getEventIcon(
    item.eventType
  );

  const eventStyle =
    getEventClass(
      item.eventType
    );

  const title =
    getArticleTitle(item);

  return (
    <div className="group flex gap-3 px-5 py-3.5 transition hover:bg-white/[0.025]">
      {/* EVENT ICON */}

      <div className="relative flex shrink-0">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${eventStyle.icon}`}
        >
          <Icon
            size={15}
            strokeWidth={1.8}
          />
        </div>

        <span
          className={`absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 rounded-full ring-2 ring-[#111318] ${eventStyle.dot}`}
        />
      </div>

      {/* CONTENT */}

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-300">
              {getEventLabel(
                item.eventType
              )}
            </p>

            <p className="mt-0.5 line-clamp-1 text-xs text-gray-500 group-hover:text-gray-400">
              {title}
            </p>
          </div>

          <span className="shrink-0 text-[10px] text-gray-600">
            {formatTime(
              item.createdAt
            )}
          </span>
        </div>

        <div className="mt-1.5 flex items-center gap-2">
          {item.contentType && (
            <span
              className={`rounded-md px-1.5 py-0.5 text-[9px] font-medium ${getTypeClass(
                item.contentType
              )}`}
            >
              {getTypeLabel(
                item.contentType
              )}
            </span>
          )}

          {item.sessionId && (
            <div className="flex items-center gap-1 text-[9px] text-gray-700">
              <UserRound
                size={9}
                strokeWidth={1.8}
              />

              Session
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsLiveActivity({
  activity = [],
  updatedAt,
}: AnalyticsLiveActivityProps) {
  const visibleActivity =
    activity.slice(0, 15);

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
      {/* HEADER */}

      <div className="flex flex-col gap-3 border-b border-white/[0.07] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Activity
              size={17}
              strokeWidth={1.8}
              className="text-[#EA661B]"
            />

            <h2 className="text-lg font-semibold text-white">
              Live Activity
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Recent audience interactions across NationPath content.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>

          <span className="text-xs text-gray-500">
            Live
          </span>
        </div>
      </div>

      {/* ACTIVITY */}

      {visibleActivity.length ===
      0 ? (
        <div className="flex min-h-[220px] items-center justify-center px-5 text-center">
          <div>
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-gray-600">
              <Activity
                size={18}
                strokeWidth={1.8}
              />
            </div>

            <p className="mt-3 text-sm font-medium text-gray-400">
              No recent activity
            </p>

            <p className="mt-1 text-xs text-gray-600">
              Audience interactions will appear here automatically.
            </p>
          </div>
        </div>
      ) : (
        <div className="max-h-[520px] overflow-y-auto divide-y divide-white/[0.06]">
          {visibleActivity.map(
            (item, index) => (
              <ActivityRow
                key={
                  item.id ||
                  `${item.eventType}-${item.createdAt}-${index}`
                }
                item={item}
              />
            )
          )}
        </div>
      )}

      {/* FOOTER */}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] px-5 py-3">
        <div className="flex items-center gap-1.5 text-[10px] text-gray-600">
          <FileText
            size={11}
            strokeWidth={1.8}
          />

          {visibleActivity.length} recent events
        </div>

        {updatedAt && (
          <p className="text-[10px] text-gray-600">
            Updated{" "}
            {formatTime(
              updatedAt
            )}
          </p>
        )}
      </div>
    </section>
  );
}

