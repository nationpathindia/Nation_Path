"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Archive,
  ArrowRight,
  Bot,
  Building2,
  CalendarClock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  ClipboardCheck,
  Filter,
  Flag,
  Globe2,
  Loader2,
  PauseCircle,
  Plus,
  Radio,
  RefreshCw,
  Search,
  Trophy,
  XCircle,
  Zap,
  Trash2,
  AlertTriangle,
} from "lucide-react";

type LiveSegment =
  | "sports"
  | "india"
  | "world"
  | "business"
  | "breaking";

type LiveEventStatus =
  | "draft"
  | "scheduled"
  | "live"
  | "paused"
  | "completed"
  | "archived";

interface LiveEvent {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  segment: LiveSegment;
  status: LiveEventStatus;
  coverImage?: string | null;
  isFeatured?: boolean;
  showOnHomepage?: boolean;
  showInLiveCenter?: boolean;
  enableAutomation?: boolean;
  startAt?: string | null;
  endAt?: string | null;
  updateCount?: number;
  lastUpdateAt?: string | null;
  lastPublishedAt?: string | null;
  _count?: {
    updates?: number;
    sources?: number;
    articleLinks?: number;
    automationRules?: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

interface ApiResponse {
  success?: boolean;
  data?: {
    events?: LiveEvent[];
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    overview?: {
      live?: number;
      scheduled?: number;
      paused?: number;
      completed?: number;
    };
  };
  error?: string;
  message?: string;
}

const SEGMENTS: {
  value: LiveSegment | "all";
  label: string;
  icon: typeof Radio;
}[] = [
  {
    value: "all",
    label: "All Segments",
    icon: Radio,
  },
  {
    value: "sports",
    label: "Sports",
    icon: Trophy,
  },
  {
    value: "india",
    label: "India",
    icon: Flag,
  },
  {
    value: "world",
    label: "World",
    icon: Globe2,
  },
  {
    value: "business",
    label: "Business",
    icon: Building2,
  },
  {
    value: "breaking",
    label: "Breaking / Special",
    icon: Zap,
  },
];

const STATUS_OPTIONS: {
  value: LiveEventStatus | "all";
  label: string;
}[] = [
  { value: "all", label: "All Status" },
  { value: "live", label: "Live" },
  { value: "scheduled", label: "Scheduled" },
  { value: "paused", label: "Paused" },
  { value: "completed", label: "Completed" },
  { value: "draft", label: "Draft" },
  { value: "archived", label: "Archived" },
];

function formatDate(value?: string | null) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function relativeTime(value?: string | null) {
  if (!value) return "No updates";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "No updates";

  const diff = Date.now() - date.getTime();

  if (diff < 0) {
    const futureMinutes = Math.floor(
      Math.abs(diff) / 60000
    );

    if (futureMinutes < 1) return "Starting soon";

    if (futureMinutes < 60) {
      return `in ${futureMinutes}m`;
    }

    const futureHours = Math.floor(
      futureMinutes / 60
    );

    if (futureHours < 24) {
      return `in ${futureHours}h`;
    }

    return `in ${Math.floor(futureHours / 24)}d`;
  }

  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);

  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);

  return `${days}d ago`;
}

function segmentLabel(segment: LiveSegment) {
  return (
    SEGMENTS.find(
      (item) => item.value === segment
    )?.label ?? segment
  );
}

function SegmentIcon({
  segment,
}: {
  segment: LiveSegment;
}) {
  const item = SEGMENTS.find(
    (entry) => entry.value === segment
  );

  const Icon = item?.icon ?? Radio;

  return <Icon className="h-4 w-4" />;
}

function statusClasses(status: LiveEventStatus) {
  switch (status) {
    case "live":
      return "bg-red-50 text-red-700 border-red-200";

    case "scheduled":
      return "bg-amber-50 text-amber-700 border-amber-200";

    case "paused":
      return "bg-orange-50 text-orange-700 border-orange-200";

    case "completed":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "archived":
      return "bg-slate-100 text-slate-600 border-slate-200";

    default:
      return "bg-slate-50 text-slate-600 border-slate-200";
  }
}

function StatusIcon({
  status,
}: {
  status: LiveEventStatus;
}) {
  switch (status) {
    case "live":
      return <CircleDot className="h-3.5 w-3.5" />;

    case "scheduled":
      return (
        <CalendarClock className="h-3.5 w-3.5" />
      );

    case "paused":
      return (
        <PauseCircle className="h-3.5 w-3.5" />
      );

    case "completed":
      return (
        <CheckCircle2 className="h-3.5 w-3.5" />
      );

    case "archived":
      return <Archive className="h-3.5 w-3.5" />;

    default:
      return <CircleDot className="h-3.5 w-3.5" />;
  }
}

export default function AdminLiveCenterPage() {
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [segment, setSegment] =
    useState<LiveSegment | "all">("all");
  const [status, setStatus] =
    useState<LiveEventStatus | "all">("all");
  const [featured, setFeatured] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [overview, setOverview] = useState({
    live: 0,
    scheduled: 0,
    paused: 0,
    completed: 0,
  });

  const [actionLoading, setActionLoading] =
    useState<string | null>(null);

  const [notice, setNotice] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [confirmAction, setConfirmAction] =
    useState<{
      type: "archive" | "delete";
      event: LiveEvent;
    } | null>(null);

  const limit = 12;

  const fetchEvents = useCallback(
    async (isRefresh = false) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const params = new URLSearchParams();

        if (segment !== "all") {
          params.set("segment", segment);
        }

        if (status !== "all") {
          params.set("status", status);
        }

        if (search.trim()) {
          params.set("search", search.trim());
        }

        if (featured) {
          params.set("featured", "true");
        }

        params.set("page", String(page));
        params.set("limit", String(limit));

        const response = await fetch(
          `/api/admin/live/events?${params.toString()}`,
          {
            method: "GET",
            cache: "no-store",
            credentials: "include",
          }
        );

        const result: ApiResponse =
          await response.json();

        if (!response.ok || result.success === false) {
          throw new Error(
            result.error ||
              result.message ||
              "Failed to load Live Center."
          );
        }

        const data = result.data;

        setEvents(data?.events ?? []);

        setTotal(
          data?.pagination?.total ?? 0
        );

        setTotalPages(
          data?.pagination?.totalPages ?? 1
        );

        setOverview({
          live: data?.overview?.live ?? 0,
          scheduled:
            data?.overview?.scheduled ?? 0,
          paused:
            data?.overview?.paused ?? 0,
          completed:
            data?.overview?.completed ?? 0,
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load Live Center."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [
      featured,
      page,
      search,
      segment,
      status,
    ]
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      fetchEvents();
    }, 250);

    return () =>
      window.clearTimeout(timer);
  }, [fetchEvents]);

  useEffect(() => {
    setPage(1);
  }, [
    segment,
    status,
    featured,
    search,
  ]);

  const visibleStats = useMemo(
    () => [
      {
        label: "Live Now",
        value: overview.live,
        icon: Radio,
        href: "/admin/live?status=live",
        className:
          "border-red-200 bg-red-50/60",
        iconClass: "text-red-600",
      },
      {
        label: "Scheduled",
        value: overview.scheduled,
        icon: CalendarClock,
        href: "/admin/live?status=scheduled",
        className:
          "border-amber-200 bg-amber-50/60",
        iconClass: "text-amber-600",
      },
      {
        label: "Paused",
        value: overview.paused,
        icon: PauseCircle,
        href: "/admin/live?status=paused",
        className:
          "border-orange-200 bg-orange-50/60",
        iconClass: "text-orange-600",
      },
      {
        label: "Completed",
        value: overview.completed,
        icon: CheckCircle2,
        href: "/admin/live?status=completed",
        className:
          "border-emerald-200 bg-emerald-50/60",
        iconClass: "text-emerald-600",
      },
    ],
    [overview]
  );

  const clearFilters = () => {
    setSearch("");
    setSegment("all");
    setStatus("all");
    setFeatured(false);
    setPage(1);
  };

  const runArchive = async (
    event: LiveEvent
  ) => {
    if (actionLoading) return;

    setActionLoading(event.id);
    setNotice(null);

    try {
      const response = await fetch(
        `/api/admin/live/events/${event.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            status: "archived",
            showInLiveCenter: false,
            showOnHomepage: false,
            enableAutomation: false,
          }),
        }
      );

      const result = await response.json();

      if (
        !response.ok ||
        result.success === false
      ) {
        throw new Error(
          result.error ||
            result.message ||
            "Failed to archive live event."
        );
      }

      setNotice({
        type: "success",
        message:
          "Live event archived successfully.",
      });

      setConfirmAction(null);

      await fetchEvents(true);
    } catch (err) {
      setNotice({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Failed to archive live event.",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const runDelete = async (
    event: LiveEvent
  ) => {
    if (actionLoading) return;

    setActionLoading(event.id);
    setNotice(null);

    try {
      const response = await fetch(
        `/api/admin/live/events/${event.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (
        !response.ok ||
        result.success === false
      ) {
        throw new Error(
          result.error ||
            result.message ||
            "Failed to delete live event."
        );
      }

      setNotice({
        type: "success",
        message:
          "Live event permanently deleted.",
      });

      setConfirmAction(null);

      /*
       * If the current page only contained one event,
       * move back one page when possible.
       */
      if (
        events.length === 1 &&
        page > 1
      ) {
        setPage((current) =>
          Math.max(1, current - 1)
        );
      } else {
        await fetchEvents(true);
      }
    } catch (err) {
      setNotice({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Failed to delete live event.",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const executeConfirmedAction =
    async () => {
      if (!confirmAction) return;

      if (
        confirmAction.type ===
        "archive"
      ) {
        await runArchive(
          confirmAction.event
        );
        return;
      }

      await runDelete(
        confirmAction.event
      );
    };

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-700">
                <Radio className="h-3.5 w-3.5" />
                Live Center
              </span>

              <span className="text-xs font-medium text-slate-500">
                Real-time editorial events
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Live Updates
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              Manage live events, rolling
              updates, sources and automated
              coverage from one newsroom
              workspace.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() =>
                fetchEvents(true)
              }
              disabled={refreshing}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {refreshing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Refresh
            </button>

            <Link
              href="/admin/live/create"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#163C80] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#12336d]"
            >
              <Plus className="h-4 w-4" />
              Create Live Event
            </Link>
          </div>
        </div>

        {/* NOTICE */}
        {notice && (
          <div
            className={`mb-5 flex items-start gap-3 rounded-xl border p-4 text-sm ${
              notice.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {notice.type ===
            "success" ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
            ) : (
              <XCircle className="mt-0.5 h-5 w-5 shrink-0" />
            )}

            <p className="font-semibold">
              {notice.message}
            </p>

            <button
              type="button"
              onClick={() =>
                setNotice(null)
              }
              className="ml-auto rounded-md p-1 hover:bg-black/5"
              aria-label="Dismiss"
            >
              <XCircle className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* KPI STRIP */}
        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {visibleStats.map(
            (stat) => {
              const Icon = stat.icon;

              return (
                <Link
                  key={stat.label}
                  href={stat.href}
                  className={`rounded-xl border p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${stat.className}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {stat.label}
                      </p>

                      <p className="mt-2 text-2xl font-bold text-slate-900">
                        {stat.value}
                      </p>
                    </div>

                    <div className="rounded-lg bg-white p-2 shadow-sm">
                      <Icon
                        className={`h-5 w-5 ${stat.iconClass}`}
                      />
                    </div>
                  </div>
                </Link>
              );
            }
          )}
        </div>

        {/* SEGMENT NAV */}
        <div className="mb-5 overflow-x-auto">
          <div className="flex min-w-max items-center gap-2">
            {SEGMENTS.map(
              (item) => {
                const Icon =
                  item.icon;

                const active =
                  segment ===
                  item.value;

                return (
                  <button
                    key={
                      item.value
                    }
                    type="button"
                    onClick={() =>
                      setSegment(
                        item.value
                      )
                    }
                    className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-semibold transition ${
                      active
                        ? "border-[#163C80] bg-[#163C80] text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* FILTERS */}
        <div className="mb-5 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search live events..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#163C80] focus:bg-white focus:ring-2 focus:ring-[#163C80]/10"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <select
                  value={status}
                  onChange={(
                    event
                  ) =>
                    setStatus(
                      event.target
                        .value as
                        | LiveEventStatus
                        | "all"
                    )
                  }
                  className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pl-9 pr-9 text-sm font-medium text-slate-700 outline-none focus:border-[#163C80] focus:ring-2 focus:ring-[#163C80]/10"
                >
                  {STATUS_OPTIONS.map(
                    (item) => (
                      <option
                        key={
                          item.value
                        }
                        value={
                          item.value
                        }
                      >
                        {item.label}
                      </option>
                    )
                  )}
                </select>
              </div>

              <button
                type="button"
                onClick={() =>
                  setFeatured(
                    (value) =>
                      !value
                  )
                }
                className={`inline-flex h-10 items-center gap-2 rounded-lg border px-3.5 text-sm font-semibold transition ${
                  featured
                    ? "border-[#EA661B] bg-orange-50 text-[#EA661B]"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Zap className="h-4 w-4" />
                Featured
              </button>

              {(search ||
                segment !==
                  "all" ||
                status !==
                  "all" ||
                featured) && (
                <button
                  type="button"
                  onClick={
                    clearFilters
                  }
                  className="inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                >
                  <XCircle className="h-4 w-4" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <XCircle className="mt-0.5 h-5 w-5 shrink-0" />

            <div className="flex-1">
              <p className="font-semibold">
                Unable to load Live Center
              </p>

              <p className="mt-0.5 text-red-600">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                fetchEvents(true)
              }
              className="rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
            >
              Retry
            </button>
          </div>
        )}

        {/* CONTENT */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <h2 className="font-bold text-slate-900">
                Live Events
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                {total} event
                {total === 1
                  ? ""
                  : "s"}{" "}
                found
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ClipboardCheck className="h-4 w-4" />
              Editorial control
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-[360px] items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-slate-500">
                <Loader2 className="h-7 w-7 animate-spin text-[#163C80]" />

                <span className="text-sm font-medium">
                  Loading live events...
                </span>
              </div>
            </div>
          ) : events.length ===
            0 ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 rounded-2xl bg-slate-100 p-4">
                <Radio className="h-8 w-8 text-slate-400" />
              </div>

              <h3 className="text-lg font-bold text-slate-800">
                No live events found
              </h3>

              <p className="mt-1 max-w-md text-sm text-slate-500">
                Create your first live
                event or change the
                current filters to see
                existing coverage.
              </p>

              <Link
                href="/admin/live/create"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#163C80] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#12336d]"
              >
                <Plus className="h-4 w-4" />
                Create Live Event
              </Link>
            </div>
          ) : (
            <>
              {/* DESKTOP TABLE */}
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[1250px]">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/70 text-left">
                      <th className="px-5 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Event
                      </th>

                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Segment
                      </th>

                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Status
                      </th>

                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Updates
                      </th>

                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Automation
                      </th>

                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Last Update
                      </th>

                      <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {events.map(
                      (event) => {
                        const updates =
                          event._count
                            ?.updates ??
                          event.updateCount ??
                          0;

                        const sources =
                          event._count
                            ?.sources ??
                          0;

                        const busy =
                          actionLoading ===
                          event.id;

                        return (
                          <tr
                            key={
                              event.id
                            }
                            className="group transition hover:bg-slate-50/70"
                          >
                            <td className="px-5 py-4">
                              <div className="max-w-[390px]">
                                <div className="flex items-start gap-2">
                                  {event.status ===
                                    "live" && (
                                    <span className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-red-500" />
                                  )}

                                  <div>
                                    <p className="font-semibold leading-5 text-slate-900">
                                      {
                                        event.title
                                      }
                                    </p>

                                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                                      {event.isFeatured && (
                                        <span className="font-semibold text-[#EA661B]">
                                          Featured
                                        </span>
                                      )}

                                      {event.showOnHomepage && (
                                        <span>
                                          Homepage
                                        </span>
                                      )}

                                      <span>
                                        {
                                          sources
                                        }{" "}
                                        source
                                        {sources ===
                                        1
                                          ? ""
                                          : "s"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="px-4 py-4">
                              <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700">
                                <SegmentIcon
                                  segment={
                                    event.segment
                                  }
                                />
                                {segmentLabel(
                                  event.segment
                                )}
                              </span>
                            </td>

                            <td className="px-4 py-4">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold capitalize ${statusClasses(
                                  event.status
                                )}`}
                              >
                                <StatusIcon
                                  status={
                                    event.status
                                  }
                                />
                                {
                                  event.status
                                }
                              </span>
                            </td>

                            <td className="px-4 py-4">
                              <div>
                                <p className="font-semibold text-slate-800">
                                  {
                                    updates
                                  }
                                </p>

                                <p className="text-xs text-slate-400">
                                  live updates
                                </p>
                              </div>
                            </td>

                            <td className="px-4 py-4">
                              {event.enableAutomation ? (
                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                                  <Bot className="h-4 w-4" />
                                  Enabled
                                </span>
                              ) : (
                                <span className="text-xs font-medium text-slate-400">
                                  Manual
                                </span>
                              )}
                            </td>

                            <td className="px-4 py-4">
                              <div>
                                <p className="text-sm font-medium text-slate-700">
                                  {relativeTime(
                                    event.lastPublishedAt ||
                                      event.lastUpdateAt
                                  )}
                                </p>

                                <p className="mt-0.5 text-xs text-slate-400">
                                  {formatDate(
                                    event.lastPublishedAt ||
                                      event.lastUpdateAt
                                  )}
                                </p>
                              </div>
                            </td>

                            <td className="px-5 py-4">
                              <div className="flex items-center justify-end gap-1.5">
                                <Link
                                  href={`/admin/live/${event.id}`}
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:border-[#163C80] hover:text-[#163C80]"
                                >
                                  Open
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </Link>

                                {event.status !==
                                  "archived" && (
                                  <button
                                    type="button"
                                    disabled={
                                      busy
                                    }
                                    onClick={() =>
                                      setConfirmAction(
                                        {
                                          type: "archive",
                                          event,
                                        }
                                      )
                                    }
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
                                  >
                                    <Archive className="h-3.5 w-3.5" />
                                    Archive
                                  </button>
                                )}

                                <button
                                  type="button"
                                  disabled={
                                    busy
                                  }
                                  onClick={() =>
                                    setConfirmAction(
                                      {
                                        type: "delete",
                                        event,
                                      }
                                    )
                                  }
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  {busy ? (
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                  ) : (
                                    <Trash2 className="h-3.5 w-3.5" />
                                  )}
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>

              {/* MOBILE / TABLET */}
              <div className="grid gap-3 p-3 lg:hidden">
                {events.map(
                  (event) => {
                    const updates =
                      event._count
                        ?.updates ??
                      event.updateCount ??
                      0;

                    const sources =
                      event._count
                        ?.sources ??
                      0;

                    const busy =
                      actionLoading ===
                      event.id;

                    return (
                      <div
                        key={
                          event.id
                        }
                        className="rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 hover:bg-slate-50"
                      >
                        <Link
                          href={`/admin/live/${event.id}`}
                          className="block"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="mb-2 flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-600">
                                  <SegmentIcon
                                    segment={
                                      event.segment
                                    }
                                  />
                                  {segmentLabel(
                                    event.segment
                                  )}
                                </span>

                                <span
                                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-bold capitalize ${statusClasses(
                                    event.status
                                  )}`}
                                >
                                  <StatusIcon
                                    status={
                                      event.status
                                    }
                                  />
                                  {
                                    event.status
                                  }
                                </span>
                              </div>

                              <h3 className="font-bold leading-5 text-slate-900">
                                {
                                  event.title
                                }
                              </h3>
                            </div>

                            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
                          </div>

                          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3">
                            <div>
                              <p className="text-[10px] font-bold uppercase text-slate-400">
                                Updates
                              </p>

                              <p className="mt-1 text-sm font-bold text-slate-800">
                                {
                                  updates
                                }
                              </p>
                            </div>

                            <div>
                              <p className="text-[10px] font-bold uppercase text-slate-400">
                                Sources
                              </p>

                              <p className="mt-1 text-sm font-bold text-slate-800">
                                {
                                  sources
                                }
                              </p>
                            </div>

                            <div>
                              <p className="text-[10px] font-bold uppercase text-slate-400">
                                Activity
                              </p>

                              <p className="mt-1 text-sm font-bold text-slate-800">
                                {relativeTime(
                                  event.lastPublishedAt ||
                                    event.lastUpdateAt
                                )}
                              </p>
                            </div>
                          </div>

                          {event.enableAutomation && (
                            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                              <Bot className="h-3.5 w-3.5" />
                              Automation enabled
                            </div>
                          )}
                        </Link>

                        {/* MOBILE ACTIONS */}
                        <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3">
                          <Link
                            href={`/admin/live/${event.id}`}
                            className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 hover:border-[#163C80] hover:text-[#163C80]"
                          >
                            Open
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>

                          {event.status !==
                            "archived" && (
                            <button
                              type="button"
                              disabled={
                                busy
                              }
                              onClick={() =>
                                setConfirmAction(
                                  {
                                    type: "archive",
                                    event,
                                  }
                                )
                              }
                              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 text-xs font-bold text-amber-700 hover:bg-amber-100 disabled:opacity-50"
                            >
                              <Archive className="h-3.5 w-3.5" />
                              Archive
                            </button>
                          )}

                          <button
                            type="button"
                            disabled={busy}
                            onClick={() =>
                              setConfirmAction(
                                {
                                  type: "delete",
                                  event,
                                }
                              )
                            }
                            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 text-xs font-bold text-red-700 hover:bg-red-100 disabled:opacity-50"
                          >
                            {busy ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="h-3.5 w-3.5" />
                            )}
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </>
          )}

          {/* PAGINATION */}
          {!loading &&
            events.length > 0 &&
            totalPages > 1 && (
              <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <p className="text-xs font-medium text-slate-500">
                  Page {page} of{" "}
                  {totalPages}
                </p>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={
                      page <= 1
                    }
                    onClick={() =>
                      setPage(
                        (current) =>
                          Math.max(
                            1,
                            current - 1
                          )
                      )
                    }
                    className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  <button
                    type="button"
                    disabled={
                      page >=
                      totalPages
                    }
                    onClick={() =>
                      setPage(
                        (current) =>
                          Math.min(
                            totalPages,
                            current + 1
                          )
                      )
                    }
                    className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {confirmAction && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="p-6">
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
                  confirmAction.type ===
                  "delete"
                    ? "bg-red-50 text-red-600"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                {confirmAction.type ===
                "delete" ? (
                  <Trash2 className="h-6 w-6" />
                ) : (
                  <Archive className="h-6 w-6" />
                )}
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                {confirmAction.type ===
                "delete"
                  ? "Delete Live Event?"
                  : "Archive Live Event?"}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                <span className="font-semibold text-slate-700">
                  "
                  {
                    confirmAction
                      .event
                      .title
                  }
                  "
                </span>
                {confirmAction.type ===
                "delete"
                  ? " will be permanently deleted along with its timeline updates, automation rules, event-source mappings and article links. This action cannot be undone."
                  : " will be removed from active Live coverage. Its timeline and editorial data will be retained."}
              </p>

              {confirmAction.type ===
                "delete" && (
                <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs leading-5 text-red-700">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

                  <span>
                    Permanent deletion
                    cannot be undone.
                    Master Live Source
                    records are preserved.
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50/70 p-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={
                  actionLoading !==
                  null
                }
                onClick={() =>
                  setConfirmAction(
                    null
                  )
                }
                className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={
                  actionLoading !==
                  null
                }
                onClick={
                  executeConfirmedAction
                }
                className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60 ${
                  confirmAction.type ===
                  "delete"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-amber-600 hover:bg-amber-700"
                }`}
              >
                {actionLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : confirmAction.type ===
                  "delete" ? (
                  <Trash2 className="h-4 w-4" />
                ) : (
                  <Archive className="h-4 w-4" />
                )}

                {confirmAction.type ===
                "delete"
                  ? "Delete Permanently"
                  : "Archive Event"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}