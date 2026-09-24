"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Edit3,
  ExternalLink,
  Globe2,
  Plus,
  Radio,
  RefreshCw,
  Search,
  ToggleLeft,
  ToggleRight,
  Trash2,
  X,
} from "lucide-react";

type Source = {
  id: string;
  name: string;
  type: "rss" | "api" | "manual" | "newsroom";
  url?: string | null;
  rssUrl?: string | null;
  apiUrl?: string | null;
  isActive: boolean;
  priority: number;
  trustLevel: string;
  fetchIntervalSeconds: number;
  defaultSegment?: string | null;
  lastFetchedAt?: string | null;
  nextFetchAt?: string | null;
  lastSuccessAt?: string | null;
  lastErrorAt?: string | null;
  consecutiveErrors: number;
  _count: {
    events: number;
    updates: number;
  };
};

const segments = [
  { value: "", label: "All Segments" },
  { value: "sports", label: "Sports" },
  { value: "india", label: "India" },
  { value: "world", label: "World" },
  { value: "business", label: "Business" },
  { value: "breaking", label: "Breaking / Special" },
];

const types = [
  { value: "", label: "All Types" },
  { value: "rss", label: "RSS" },
  { value: "api", label: "API" },
  { value: "manual", label: "Manual" },
  { value: "newsroom", label: "Newsroom" },
];

function typeLabel(type: Source["type"]) {
  return {
    rss: "RSS",
    api: "API",
    manual: "Manual",
    newsroom: "Newsroom",
  }[type];
}

function formatDate(value?: string | null) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function intervalLabel(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  return `${Math.round(seconds / 3600)}h`;
}

export default function LiveSourcesPage() {
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [segment, setSegment] = useState("");
  const [active, setActive] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showCreate, setShowCreate] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    type: "rss",
    url: "",
    rssUrl: "",
    apiUrl: "",
    isActive: true,
    priority: 0,
    trustLevel: "standard",
    fetchIntervalSeconds: 300,
    defaultSegment: "",
  });

  const loadSources = useCallback(
    async (silent = false) => {
      try {
        if (!silent) setLoading(true);
        else setRefreshing(true);

        const params = new URLSearchParams({
          page: String(page),
          limit: "20",
        });

        if (search.trim()) params.set("search", search.trim());
        if (type) params.set("type", type);
        if (segment) params.set("segment", segment);
        if (active) params.set("active", active);

        const response = await fetch(
          `/api/admin/live/sources?${params.toString()}`,
          {
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || "Failed to load sources");
        }

        setSources(result.data || []);
        setTotalPages(result.pagination?.totalPages || 1);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [page, search, type, segment, active]
  );

  useEffect(() => {
    loadSources();
  }, [loadSources]);

  function resetForm() {
    setForm({
      name: "",
      type: "rss",
      url: "",
      rssUrl: "",
      apiUrl: "",
      isActive: true,
      priority: 0,
      trustLevel: "standard",
      fetchIntervalSeconds: 300,
      defaultSegment: "",
    });
  }

  async function createSource() {
    if (!form.name.trim()) {
      alert("Source name is required.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/admin/live/sources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          defaultSegment: form.defaultSegment || null,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to create source");
      }

      setShowCreate(false);
      resetForm();
      await loadSources(true);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to create source");
    } finally {
      setSaving(false);
    }
  }

  async function toggleSource(source: Source) {
    try {
      const response = await fetch(
        `/api/admin/live/sources/${source.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isActive: !source.isActive,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to update source");
      }

      setSources((current) =>
        current.map((item) =>
          item.id === source.id
            ? { ...item, isActive: !source.isActive }
            : item
        )
      );
    } catch (error) {
      alert(error instanceof Error ? error.message : "Update failed");
    }
  }

  async function disableSource(source: Source) {
    if (!confirm(`Disable "${source.name}"?`)) return;

    try {
      const response = await fetch(
        `/api/admin/live/sources/${source.id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to disable source");
      }

      await loadSources(true);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Delete failed");
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F5EF] text-slate-900">
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
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
              <div className="rounded-xl bg-[#163C80] p-3 text-white">
                <Radio size={22} />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Live Sources
                </h1>
                <p className="text-sm text-slate-500">
                  Manage trusted feeds and live information sources.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => loadSources(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold shadow-sm"
            >
              <RefreshCw
                size={16}
                className={refreshing ? "animate-spin" : ""}
              />
              Refresh
            </button>

            <button
              onClick={() => setShowCreate(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#EA661B] px-4 py-2.5 text-sm font-semibold text-white shadow-sm"
            >
              <Plus size={17} />
              Add Source
            </button>
          </div>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            ["Total Sources", sources.length, "All configured sources"],
            [
              "Active",
              sources.filter((source) => source.isActive).length,
              "Currently enabled",
            ],
            [
              "Healthy",
              sources.filter(
                (source) =>
                  source.isActive && source.consecutiveErrors === 0
              ).length,
              "No consecutive fetch errors",
            ],
          ].map(([label, value, note]) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {label}
              </p>
              <p className="mt-2 text-2xl font-bold">{value}</p>
              <p className="mt-1 text-xs text-slate-500">{note}</p>
            </div>
          ))}
        </div>

        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(event) => {
                  setPage(1);
                  setSearch(event.target.value);
                }}
                placeholder="Search source..."
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#163C80]"
              />
            </div>

            <select
              value={type}
              onChange={(event) => {
                setPage(1);
                setType(event.target.value);
              }}
              className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
            >
              {types.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            <select
              value={segment}
              onChange={(event) => {
                setPage(1);
                setSegment(event.target.value);
              }}
              className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
            >
              {segments.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            <select
              value={active}
              onChange={(event) => {
                setPage(1);
                setActive(event.target.value);
              }}
              className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
            >
              <option value="">All Status</option>
              <option value="true">Active</option>
              <option value="false">Disabled</option>
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <div className="p-12 text-center text-sm text-slate-500">
              Loading live sources...
            </div>
          ) : sources.length === 0 ? (
            <div className="p-12 text-center">
              <Globe2 className="mx-auto text-slate-300" size={42} />
              <p className="mt-3 font-semibold">No live sources found</p>
              <p className="mt-1 text-sm text-slate-500">
                Add an RSS, API, newsroom or manual source to begin.
              </p>
            </div>
          ) : (
            <>
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[1100px]">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
                      <th className="px-5 py-4">Source</th>
                      <th className="px-5 py-4">Type</th>
                      <th className="px-5 py-4">Segment</th>
                      <th className="px-5 py-4">Health</th>
                      <th className="px-5 py-4">Fetch</th>
                      <th className="px-5 py-4">Usage</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {sources.map((source) => (
                      <tr key={source.id} className="hover:bg-slate-50/70">
                        <td className="px-5 py-4">
                          <div className="font-semibold">{source.name}</div>
                          <div className="mt-1 max-w-[280px] truncate text-xs text-slate-400">
                            {source.rssUrl ||
                              source.apiUrl ||
                              source.url ||
                              "No URL configured"}
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold">
                            {typeLabel(source.type)}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-sm capitalize">
                          {source.defaultSegment || "—"}
                        </td>

                        <td className="px-5 py-4">
                          {source.consecutiveErrors === 0 ? (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                              <CheckCircle2 size={14} />
                              Healthy
                            </span>
                          ) : (
                            <span className="text-xs font-semibold text-red-600">
                              {source.consecutiveErrors} errors
                            </span>
                          )}
                          <div className="mt-1 text-[11px] text-slate-400">
                            Last: {formatDate(source.lastFetchedAt)}
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm">
                          {intervalLabel(source.fetchIntervalSeconds)}
                          <div className="mt-1 text-[11px] text-slate-400">
                            Next: {formatDate(source.nextFetchAt)}
                          </div>
                        </td>

                        <td className="px-5 py-4 text-xs text-slate-600">
                          <div>{source._count.events} events</div>
                          <div>{source._count.updates} updates</div>
                        </td>

                        <td className="px-5 py-4">
                          <button
                            onClick={() => toggleSource(source)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold"
                          >
                            {source.isActive ? (
                              <>
                                <ToggleRight
                                  size={24}
                                  className="text-emerald-600"
                                />
                                Active
                              </>
                            ) : (
                              <>
                                <ToggleLeft
                                  size={24}
                                  className="text-slate-400"
                                />
                                Disabled
                              </>
                            )}
                          </button>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-1">
                            <Link
                              href={`/admin/live/sources/${source.id}`}
                              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-[#163C80]"
                              title="Edit"
                            >
                              <Edit3 size={16} />
                            </Link>

                            {(source.rssUrl ||
                              source.apiUrl ||
                              source.url) && (
                              <a
                                href={
                                  source.rssUrl ||
                                  source.apiUrl ||
                                  source.url ||
                                  "#"
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                                title="Open source"
                              >
                                <ExternalLink size={16} />
                              </a>
                            )}

                            <button
                              onClick={() => disableSource(source)}
                              className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                              title="Disable"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="divide-y divide-slate-100 lg:hidden">
                {sources.map((source) => (
                  <div key={source.id} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold">{source.name}</h3>
                        <p className="mt-1 break-all text-xs text-slate-400">
                          {source.rssUrl ||
                            source.apiUrl ||
                            source.url ||
                            "No URL"}
                        </p>
                      </div>

                      <button
                        onClick={() => toggleSource(source)}
                      >
                        {source.isActive ? (
                          <ToggleRight
                            size={26}
                            className="text-emerald-600"
                          />
                        ) : (
                          <ToggleLeft
                            size={26}
                            className="text-slate-400"
                          />
                        )}
                      </button>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded-lg bg-slate-50 p-3">
                        <span className="text-slate-400">Type</span>
                        <div className="mt-1 font-bold">
                          {typeLabel(source.type)}
                        </div>
                      </div>

                      <div className="rounded-lg bg-slate-50 p-3">
                        <span className="text-slate-400">Fetch</span>
                        <div className="mt-1 font-bold">
                          {intervalLabel(source.fetchIntervalSeconds)}
                        </div>
                      </div>

                      <div className="rounded-lg bg-slate-50 p-3">
                        <span className="text-slate-400">Events</span>
                        <div className="mt-1 font-bold">
                          {source._count.events}
                        </div>
                      </div>

                      <div className="rounded-lg bg-slate-50 p-3">
                        <span className="text-slate-400">Updates</span>
                        <div className="mt-1 font-bold">
                          {source._count.updates}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <Link
                        href={`/admin/live/sources/${source.id}`}
                        className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-center text-xs font-bold"
                      >
                        Edit Source
                      </Link>

                      <button
                        onClick={() => disableSource(source)}
                        className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-600"
                      >
                        Disable
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((value) => value - 1)}
              className="rounded-lg border border-slate-200 bg-white p-2 disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage((value) => value + 1)}
              className="rounded-lg border border-slate-200 bg-white p-2 disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b p-5">
              <div>
                <h2 className="text-lg font-bold">Add Live Source</h2>
                <p className="text-xs text-slate-500">
                  Configure a trusted source for Live Center.
                </p>
              </div>

              <button
                onClick={() => setShowCreate(false)}
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-4 p-5 md:grid-cols-2">
              <label className="md:col-span-2">
                <span className="mb-1.5 block text-xs font-bold">
                  Source Name
                </span>
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="Example: Official Sports Feed"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#163C80]"
                />
              </label>

              <label>
                <span className="mb-1.5 block text-xs font-bold">
                  Type
                </span>
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      type: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                >
                  {types
                    .filter((item) => item.value)
                    .map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                </select>
              </label>

              <label>
                <span className="mb-1.5 block text-xs font-bold">
                  Default Segment
                </span>
                <select
                  value={form.defaultSegment}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      defaultSegment: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                >
                  {segments.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="md:col-span-2">
                <span className="mb-1.5 block text-xs font-bold">
                  Source URL
                </span>
                <input
                  value={form.url}
                  onChange={(e) =>
                    setForm({ ...form, url: e.target.value })
                  }
                  placeholder="https://..."
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                />
              </label>

              {form.type === "rss" && (
                <label className="md:col-span-2">
                  <span className="mb-1.5 block text-xs font-bold">
                    RSS Feed URL
                  </span>
                  <input
                    value={form.rssUrl}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        rssUrl: e.target.value,
                      })
                    }
                    placeholder="https://example.com/rss.xml"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                  />
                </label>
              )}

              {form.type === "api" && (
                <label className="md:col-span-2">
                  <span className="mb-1.5 block text-xs font-bold">
                    API URL
                  </span>
                  <input
                    value={form.apiUrl}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        apiUrl: e.target.value,
                      })
                    }
                    placeholder="https://api.example.com/..."
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                  />
                </label>
              )}

              <label>
                <span className="mb-1.5 block text-xs font-bold">
                  Fetch Interval
                </span>
                <select
                  value={form.fetchIntervalSeconds}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      fetchIntervalSeconds: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                >
                  <option value={30}>30 seconds</option>
                  <option value={60}>1 minute</option>
                  <option value={300}>5 minutes</option>
                  <option value={600}>10 minutes</option>
                  <option value={1800}>30 minutes</option>
                  <option value={3600}>1 hour</option>
                </select>
              </label>

              <label>
                <span className="mb-1.5 block text-xs font-bold">
                  Trust Level
                </span>
                <select
                  value={form.trustLevel}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      trustLevel: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                >
                  <option value="standard">Standard</option>
                  <option value="trusted">Trusted</option>
                  <option value="high">High Trust</option>
                </select>
              </label>

              <label>
                <span className="mb-1.5 block text-xs font-bold">
                  Priority
                </span>
                <input
                  type="number"
                  value={form.priority}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      priority: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                />
              </label>

              <label className="flex items-center gap-3 self-end rounded-xl bg-slate-50 p-3">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isActive: e.target.checked,
                    })
                  }
                />
                <span className="text-sm font-semibold">
                  Source active
                </span>
              </label>
            </div>

            <div className="flex justify-end gap-2 border-t bg-slate-50 p-5">
              <button
                onClick={() => setShowCreate(false)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold"
              >
                Cancel
              </button>

              <button
                disabled={saving}
                onClick={createSource}
                className="rounded-xl bg-[#163C80] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
              >
                {saving ? "Saving..." : "Create Source"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}