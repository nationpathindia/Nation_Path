"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  Bot,
  CheckCircle2,
  Clock3,
  Edit3,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  X,
  XCircle,
  Zap,
} from "lucide-react";

type Rule = {
  id: string;
  name: string;
  status: "active" | "paused" | "disabled";
  sourceIds: string[];
  keywords: string[];
  excludeKeywords: string[];
  matchMode: string;
  fetchIntervalSeconds: number;
  autoPublish: boolean;
  requireVerification: boolean;
  autoBreaking: boolean;
  autoSummarize: boolean;
  autoClassify: boolean;
  autoDeduplicate: boolean;
  autoEventMatch: boolean;
  lastRunAt?: string | null;
  nextRunAt?: string | null;
  totalRuns: number;
  totalFetched: number;
  totalPublished: number;
  totalRejected: number;
  lastError?: string | null;
  event: {
    id: string;
    title: string;
    slug: string;
    segment: string;
    status: string;
  };
};

type EventItem = {
  id: string;
  title: string;
  slug: string;
  segment: string;
  status: string;
};

type SourceItem = {
  id: string;
  name: string;
  type: string;
  url?: string | null;
  rssUrl?: string | null;
  apiUrl?: string | null;
  isActive: boolean;
};

function date(value?: string | null) {
  if (!value) return "Never";

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function interval(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  return `${Math.round(seconds / 3600)}h`;
}

export default function LiveAutomationPage() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [showCreate, setShowCreate] =
    useState(false);

  const [events, setEvents] =
    useState<EventItem[]>([]);

  const [sources, setSources] =
    useState<SourceItem[]>([]);

  const [loadingFormData, setLoadingFormData] =
    useState(false);

  const [creating, setCreating] =
    useState(false);

  const [formError, setFormError] =
    useState("");

  const [form, setForm] = useState({
    eventId: "",
    name: "",
    sourceIds: [] as string[],
    keywords: "",
    excludeKeywords: "",
    matchMode: "any",
    fetchIntervalSeconds: 300,
    status: "active",
    autoPublish: false,
    requireVerification: true,
    autoBreaking: false,
    autoSummarize: true,
    autoClassify: true,
    autoDeduplicate: true,
    autoEventMatch: true,
  });

  async function load() {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        limit: "100",
      });

      if (search.trim()) {
        params.set(
          "search",
          search.trim()
        );
      }

      if (status) {
        params.set("status", status);
      }

      const response = await fetch(
        `/api/admin/live/automation?${params.toString()}`,
        {
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "Failed to load automation rules"
        );
      }

      setRules(result.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [search, status]);

  async function openCreate() {
    setShowCreate(true);
    setFormError("");
    setLoadingFormData(true);

    try {
      const [eventsResponse, sourcesResponse] =
        await Promise.all([
          fetch(
            "/api/admin/live/events?limit=100",
            {
              cache: "no-store",
            }
          ),
          fetch(
            "/api/admin/live/sources?limit=100&active=true",
            {
              cache: "no-store",
            }
          ),
        ]);

      const eventsResult =
        await eventsResponse.json();

      const sourcesResult =
        await sourcesResponse.json();

      if (
        !eventsResponse.ok ||
        !eventsResult.success
      ) {
        throw new Error(
          eventsResult.error ||
            "Failed to load live events"
        );
      }

      if (
        !sourcesResponse.ok ||
        !sourcesResult.success
      ) {
        throw new Error(
          sourcesResult.error ||
            "Failed to load live sources"
        );
      }

     const availableEvents = (
  Array.isArray(eventsResult.data)
    ? eventsResult.data
    : Array.isArray(eventsResult.data?.events)
      ? eventsResult.data.events
      : []
) as EventItem[];

const availableSources = (
  Array.isArray(sourcesResult.data)
    ? sourcesResult.data
    : Array.isArray(sourcesResult.data?.sources)
      ? sourcesResult.data.sources
      : []
) as SourceItem[];

      setEvents(availableEvents);

      setSources(
        availableSources.filter(
          (source) =>
            source.isActive
        )
      );

      const firstUsableEvent =
        availableEvents.find(
          (event) =>
            event.status !==
              "archived" &&
            event.status !==
              "completed"
        );

      setForm((current) => ({
        ...current,
        eventId:
          current.eventId ||
          firstUsableEvent?.id ||
          "",
      }));
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Failed to load form data"
      );
    } finally {
      setLoadingFormData(false);
    }
  }

  function closeCreate() {
    if (creating) return;

    setShowCreate(false);
    setFormError("");

    setForm({
      eventId: "",
      name: "",
      sourceIds: [],
      keywords: "",
      excludeKeywords: "",
      matchMode: "any",
      fetchIntervalSeconds: 300,
      status: "active",
      autoPublish: false,
      requireVerification: true,
      autoBreaking: false,
      autoSummarize: true,
      autoClassify: true,
      autoDeduplicate: true,
      autoEventMatch: true,
    });
  }

  function toggleSource(
    sourceId: string
  ) {
    setForm((current) => ({
      ...current,
      sourceIds:
        current.sourceIds.includes(
          sourceId
        )
          ? current.sourceIds.filter(
              (id) =>
                id !== sourceId
            )
          : [
              ...current.sourceIds,
              sourceId,
            ],
    }));
  }

  function parseList(
    value: string
  ) {
    return Array.from(
      new Set(
        value
          .split(/[\n,]+/)
          .map((item) =>
            item.trim()
          )
          .filter(Boolean)
      )
    );
  }

  async function createRule() {
    setFormError("");

    const name =
      form.name.trim();

    if (!name) {
      setFormError(
        "Automation rule name is required."
      );
      return;
    }

    if (!form.eventId) {
      setFormError(
        "Please select a Live Event."
      );
      return;
    }

    if (
      form.autoPublish &&
      form.requireVerification
    ) {
      setFormError(
        "Auto Publish cannot be enabled while verification is required."
      );
      return;
    }

    if (
      !Number.isInteger(
        Number(
          form.fetchIntervalSeconds
        )
      ) ||
      Number(
        form.fetchIntervalSeconds
      ) < 30 ||
      Number(
        form.fetchIntervalSeconds
      ) > 86400
    ) {
      setFormError(
        "Fetch interval must be between 30 and 86400 seconds."
      );
      return;
    }

    setCreating(true);

    try {
      const response = await fetch(
        "/api/admin/live/automation",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            eventId: form.eventId,
            name,
            sourceIds:
              form.sourceIds,
            keywords: parseList(
              form.keywords
            ),
            excludeKeywords:
              parseList(
                form.excludeKeywords
              ),
            matchMode:
              form.matchMode,
            fetchIntervalSeconds:
              Number(
                form.fetchIntervalSeconds
              ),
            status: form.status,
            autoPublish:
              form.autoPublish,
            requireVerification:
              form.requireVerification,
            autoBreaking:
              form.autoBreaking,
            autoSummarize:
              form.autoSummarize,
            autoClassify:
              form.autoClassify,
            autoDeduplicate:
              form.autoDeduplicate,
            autoEventMatch:
              form.autoEventMatch,
          }),
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.error ||
            "Failed to create automation rule"
        );
      }

      closeCreate();
      await load();

      alert(
        "Automation rule created successfully."
      );
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Failed to create automation rule"
      );
    } finally {
      setCreating(false);
    }
  }

  async function changeStatus(
    rule: Rule,
    nextStatus:
      | "active"
      | "paused"
  ) {
    try {
      const response = await fetch(
        `/api/admin/live/automation/${rule.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status: nextStatus,
          }),
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.error ||
            "Failed to update rule"
        );
      }

      await load();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to update automation"
      );
    }
  }

  async function runNow(
    rule: Rule
  ) {
    setRunning(rule.id);

    try {
      const response = await fetch(
        `/api/admin/live/automation/${rule.id}/run`,
        {
          method: "POST",
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.error ||
            "Automation run failed"
        );
      }

      alert(
        `Automation completed.\nNext run: ${date(
          result.data?.nextRunAt
        )}`
      );

      await load();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Automation run failed"
      );
    } finally {
      setRunning(null);
    }
  }

  return (
    <>
      <main className="min-h-screen bg-[#F7F5EF] text-slate-900">
        <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Link
                href="/admin/live"
                className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-[#163C80] hover:underline"
              >
                <ArrowLeft size={16} />
                Back to Live Center
              </Link>

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#EA661B] p-3 text-white">
                  <Bot size={22} />
                </div>

                <div>
                  <h1 className="text-2xl font-bold">
                    Live Automation
                  </h1>

                  <p className="text-sm text-slate-500">
                    Control source ingestion,
                    verification and publishing
                    rules.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={load}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold shadow-sm"
              >
                <RefreshCw size={16} />
                Refresh
              </button>

              <button
                onClick={openCreate}
                className="inline-flex items-center gap-2 rounded-xl bg-[#163C80] px-4 py-2.5 text-sm font-semibold text-white"
              >
                <Plus size={17} />
                Create Automation Rule
              </button>
            </div>
          </div>

          <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Active Rules
              </p>

              <p className="mt-2 text-2xl font-bold">
                {
                  rules.filter(
                    (rule) =>
                      rule.status ===
                      "active"
                  ).length
                }
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Automation currently enabled
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Published
              </p>

              <p className="mt-2 text-2xl font-bold">
                {rules.reduce(
                  (sum, rule) =>
                    sum +
                    rule.totalPublished,
                  0
                )}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Updates published through rules
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Verification
              </p>

              <p className="mt-2 flex items-center gap-2 text-2xl font-bold">
                <ShieldCheck size={24} />

                {
                  rules.filter(
                    (rule) =>
                      rule.requireVerification
                  ).length
                }
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Rules requiring verification
              </p>
            </div>
          </div>

          <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-3 md:grid-cols-[1fr_220px]">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search automation rule..."
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#163C80]"
                />
              </div>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value
                  )
                }
                className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
              >
                <option value="">
                  All Status
                </option>
                <option value="active">
                  Active
                </option>
                <option value="paused">
                  Paused
                </option>
                <option value="disabled">
                  Disabled
                </option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">
              Loading automation rules...
            </div>
          ) : rules.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <Zap
                className="mx-auto text-slate-300"
                size={42}
              />

              <p className="mt-3 font-semibold">
                No automation rules
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Create an automation rule
                for a Live Event to begin
                source ingestion.
              </p>

              <button
                onClick={openCreate}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#163C80] px-4 py-2.5 text-sm font-semibold text-white"
              >
                <Plus size={16} />
                Create Automation Rule
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {rules.map((rule) => (
                <div
                  key={rule.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="flex flex-col gap-4 p-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-bold">
                          {rule.name}
                        </h2>

                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase ${
                            rule.status ===
                            "active"
                              ? "bg-emerald-100 text-emerald-700"
                              : rule.status ===
                                  "paused"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {rule.status}
                        </span>

                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold capitalize">
                          {rule.event.segment}
                        </span>
                      </div>

                      <Link
                        href={`/admin/live/${rule.event.id}`}
                        className="mt-2 block truncate text-sm font-medium text-[#163C80] hover:underline"
                      >
                        {rule.event.title}
                      </Link>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          runNow(rule)
                        }
                        disabled={
                          rule.status !==
                            "active" ||
                          running ===
                            rule.id
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-[#EA661B] px-3 py-2 text-xs font-bold text-white disabled:opacity-40"
                      >
                        <Activity
                          size={15}
                          className={
                            running ===
                            rule.id
                              ? "animate-pulse"
                              : ""
                          }
                        />

                        {running ===
                        rule.id
                          ? "Running..."
                          : "Run Now"}
                      </button>

                      {rule.status ===
                      "active" ? (
                        <button
                          onClick={() =>
                            changeStatus(
                              rule,
                              "paused"
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold"
                        >
                          <Pause size={14} />
                          Pause
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            changeStatus(
                              rule,
                              "active"
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 px-3 py-2 text-xs font-bold text-emerald-700"
                        >
                          <Play size={14} />
                          Activate
                        </button>
                      )}

                      <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-slate-100 px-3 py-2 text-xs font-bold text-slate-400">
                        <Edit3 size={14} />
                        Edit
                      </span>
                    </div>
                  </div>

                  <div className="grid border-t border-slate-100 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="border-b p-4 lg:border-b-0 lg:border-r">
                      <p className="text-[11px] font-bold uppercase text-slate-400">
                        Sources
                      </p>

                      <p className="mt-1 font-bold">
                        {rule.sourceIds
                          .length ||
                          "All"}
                      </p>
                    </div>

                    <div className="border-b p-4 lg:border-b-0 lg:border-r">
                      <p className="text-[11px] font-bold uppercase text-slate-400">
                        Fetch Interval
                      </p>

                      <p className="mt-1 flex items-center gap-1.5 font-bold">
                        <Clock3 size={15} />
                        {interval(
                          rule.fetchIntervalSeconds
                        )}
                      </p>
                    </div>

                    <div className="border-b p-4 lg:border-b-0 lg:border-r">
                      <p className="text-[11px] font-bold uppercase text-slate-400">
                        Last Run
                      </p>

                      <p className="mt-1 font-bold">
                        {date(
                          rule.lastRunAt
                        )}
                      </p>
                    </div>

                    <div className="p-4">
                      <p className="text-[11px] font-bold uppercase text-slate-400">
                        Next Run
                      </p>

                      <p className="mt-1 font-bold">
                        {date(
                          rule.nextRunAt
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 p-4">
                    <div className="flex flex-wrap gap-2">
                      {rule.autoSummarize && (
                        <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11px] font-semibold">
                          <CheckCircle2 size={13} />
                          Summarize
                        </span>
                      )}

                      {rule.autoClassify && (
                        <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11px] font-semibold">
                          Classify
                        </span>
                      )}

                      {rule.autoDeduplicate && (
                        <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11px] font-semibold">
                          Deduplicate
                        </span>
                      )}

                      {rule.autoEventMatch && (
                        <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11px] font-semibold">
                          Event Match
                        </span>
                      )}

                      {rule.requireVerification && (
                        <span className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1.5 text-[11px] font-semibold text-blue-700">
                          <ShieldCheck size={13} />
                          Verification Required
                        </span>
                      )}

                      {rule.autoPublish && (
                        <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-700">
                          Auto Publish
                        </span>
                      )}

                      {rule.autoBreaking && (
                        <span className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1.5 text-[11px] font-semibold text-red-700">
                          <Zap size={13} />
                          Auto Breaking
                        </span>
                      )}

                      {!rule.autoPublish &&
                        rule.requireVerification && (
                          <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1.5 text-[11px] font-semibold text-amber-700">
                            <XCircle size={13} />
                            Human Review Gate
                          </span>
                        )}
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
                      <div>
                        <span className="text-slate-400">
                          Runs
                        </span>
                        <div className="mt-1 font-bold">
                          {rule.totalRuns}
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-400">
                          Fetched
                        </span>
                        <div className="mt-1 font-bold">
                          {rule.totalFetched}
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-400">
                          Published
                        </span>
                        <div className="mt-1 font-bold text-emerald-600">
                          {rule.totalPublished}
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-400">
                          Rejected
                        </span>
                        <div className="mt-1 font-bold text-red-600">
                          {rule.totalRejected}
                        </div>
                      </div>
                    </div>

                    {rule.lastError && (
                      <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-3 text-xs text-red-700">
                        <strong>
                          Last error:
                        </strong>{" "}
                        {rule.lastError}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h2 className="text-lg font-bold">
                  Create Automation Rule
                </h2>

                <p className="text-xs text-slate-500">
                  Configure how this Live Event receives source updates.
                </p>
              </div>

              <button
                onClick={closeCreate}
                disabled={creating}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-40"
              >
                <X size={19} />
              </button>
            </div>

            <div className="overflow-y-auto p-5">
              {formError && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {formError}
                </div>
              )}

              {loadingFormData ? (
                <div className="py-16 text-center text-sm text-slate-500">
                  Loading Live Events and Sources...
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                        Rule Name
                      </span>

                      <input
                        value={form.name}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            name: e.target.value,
                          })
                        }
                        placeholder="e.g. India Breaking RSS"
                        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#163C80]"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                        Live Event
                      </span>

                      <select
                        value={form.eventId}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            eventId:
                              e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#163C80]"
                      >
                        <option value="">
                          Select Live Event
                        </option>

                        {events
                          .filter(
                            (event) =>
                              event.status !==
                                "archived" &&
                              event.status !==
                                "completed"
                          )
                          .map(
                            (event) => (
                              <option
                                key={
                                  event.id
                                }
                                value={
                                  event.id
                                }
                              >
                                {event.title} —{" "}
                                {event.segment}
                              </option>
                            )
                          )}
                      </select>
                    </label>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                          Sources
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Leave all unselected to allow all active sources.
                        </p>
                      </div>

                      {form.sourceIds.length >
                        0 && (
                        <button
                          type="button"
                          onClick={() =>
                            setForm({
                              ...form,
                              sourceIds: [],
                            })
                          }
                          className="text-xs font-semibold text-[#163C80] hover:underline"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    <div className="max-h-44 overflow-y-auto rounded-xl border border-slate-200">
                      {sources.length ===
                      0 ? (
                        <div className="p-5 text-center text-sm text-slate-500">
                          No active Live Sources found.
                        </div>
                      ) : (
                        <div className="divide-y divide-slate-100">
                          {sources.map(
                            (source) => {
                              const selected =
                                form.sourceIds.includes(
                                  source.id
                                );

                              return (
                                <button
                                  key={
                                    source.id
                                  }
                                  type="button"
                                  onClick={() =>
                                    toggleSource(
                                      source.id
                                    )
                                  }
                                  className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${
                                    selected
                                      ? "bg-blue-50"
                                      : "hover:bg-slate-50"
                                  }`}
                                >
                                  <span
                                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                                      selected
                                        ? "border-[#163C80] bg-[#163C80] text-white"
                                        : "border-slate-300 bg-white"
                                    }`}
                                  >
                                    {selected && (
                                      <CheckCircle2
                                        size={
                                          14
                                        }
                                      />
                                    )}
                                  </span>

                                  <span className="min-w-0">
                                    <span className="block truncate text-sm font-semibold">
                                      {
                                        source.name
                                      }
                                    </span>

                                    <span className="block text-xs capitalize text-slate-400">
                                      {
                                        source.type
                                      }
                                    </span>
                                  </span>
                                </button>
                              );
                            }
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                        Match Mode
                      </span>

                      <select
                        value={
                          form.matchMode
                        }
                        onChange={(e) =>
                          setForm({
                            ...form,
                            matchMode:
                              e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                      >
                        <option value="any">
                          Any keyword
                        </option>
                        <option value="all">
                          All keywords
                        </option>
                      </select>
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                        Fetch Interval
                      </span>

                      <select
                        value={
                          form.fetchIntervalSeconds
                        }
                        onChange={(e) =>
                          setForm({
                            ...form,
                            fetchIntervalSeconds:
                              Number(
                                e.target
                                  .value
                              ),
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                      >
                        <option value={30}>
                          30 seconds
                        </option>
                        <option value={60}>
                          1 minute
                        </option>
                        <option value={300}>
                          5 minutes
                        </option>
                        <option value={600}>
                          10 minutes
                        </option>
                        <option value={900}>
                          15 minutes
                        </option>
                        <option value={1800}>
                          30 minutes
                        </option>
                        <option value={3600}>
                          1 hour
                        </option>
                      </select>
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                        Initial Status
                      </span>

                      <select
                        value={form.status}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            status:
                              e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                      >
                        <option value="active">
                          Active
                        </option>
                        <option value="paused">
                          Paused
                        </option>
                        <option value="disabled">
                          Disabled
                        </option>
                      </select>
                    </label>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                        Keywords
                      </span>

                      <textarea
                        value={
                          form.keywords
                        }
                        onChange={(e) =>
                          setForm({
                            ...form,
                            keywords:
                              e.target.value,
                          })
                        }
                        placeholder="One per line or comma separated"
                        rows={4}
                        className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#163C80]"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                        Exclude Keywords
                      </span>

                      <textarea
                        value={
                          form.excludeKeywords
                        }
                        onChange={(e) =>
                          setForm({
                            ...form,
                            excludeKeywords:
                              e.target.value,
                          })
                        }
                        placeholder="One per line or comma separated"
                        rows={4}
                        className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#163C80]"
                      />
                    </label>
                  </div>

                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Automation Controls
                    </p>

                    <div className="grid gap-2 sm:grid-cols-2">
                      {[
                        [
                          "requireVerification",
                          "Require Verification",
                          "Keep imported updates behind human review.",
                        ],
                        [
                          "autoPublish",
                          "Auto Publish",
                          "Publish matching updates automatically.",
                        ],
                        [
                          "autoBreaking",
                          "Auto Breaking",
                          "Allow matching updates to be marked breaking.",
                        ],
                        [
                          "autoSummarize",
                          "Auto Summarize",
                          "Enable automated source summarization.",
                        ],
                        [
                          "autoClassify",
                          "Auto Classify",
                          "Automatically classify incoming updates.",
                        ],
                        [
                          "autoDeduplicate",
                          "Auto Deduplicate",
                          "Prevent duplicate incoming updates.",
                        ],
                        [
                          "autoEventMatch",
                          "Auto Event Match",
                          "Match source updates to this Live Event.",
                        ],
                      ].map(
                        ([
                          key,
                          label,
                          description,
                        ]) => {
                          const checked =
                            form[
                              key as keyof typeof form
                            ] as boolean;

                          return (
                            <label
                              key={key}
                              className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${
                                checked
                                  ? "border-blue-200 bg-blue-50"
                                  : "border-slate-200 bg-white"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={
                                  checked
                                }
                                onChange={(
                                  e
                                ) =>
                                  setForm({
                                    ...form,
                                    [key]:
                                      e
                                        .target
                                        .checked,
                                  })
                                }
                                className="mt-1 h-4 w-4 accent-[#163C80]"
                              />

                              <span>
                                <span className="block text-sm font-semibold">
                                  {label}
                                </span>

                                <span className="mt-0.5 block text-xs text-slate-500">
                                  {
                                    description
                                  }
                                </span>
                              </span>
                            </label>
                          );
                        }
                      )}
                    </div>
                  </div>

                  {form.autoPublish &&
                    form.requireVerification && (
                      <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                        Auto Publish and Require
                        Verification cannot both
                        be enabled.
                      </div>
                    )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-5 py-4">
              <button
                onClick={closeCreate}
                disabled={creating}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold disabled:opacity-40"
              >
                Cancel
              </button>

              <button
                onClick={createRule}
                disabled={
                  creating ||
                  loadingFormData
                }
                className="inline-flex items-center gap-2 rounded-xl bg-[#163C80] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
              >
                {creating ? (
                  <>
                    <RefreshCw
                      size={16}
                      className="animate-spin"
                    />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Create Rule
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}