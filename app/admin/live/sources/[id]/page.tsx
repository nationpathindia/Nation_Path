"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Globe2,
  Loader2,
  Radio,
  Save,
  Trash2,
} from "lucide-react";

type SourceType = "rss" | "api" | "manual" | "newsroom";

type Source = {
  id: string;
  name: string;
  type: SourceType;
  url?: string | null;
  rssUrl?: string | null;
  apiUrl?: string | null;
  isActive: boolean;
  priority: number;
  trustLevel: number | string;
  fetchIntervalSeconds: number;
  defaultSegment?: string | null;
  lastFetchedAt?: string | null;
  nextFetchAt?: string | null;
  lastSuccessAt?: string | null;
  lastErrorAt?: string | null;
  consecutiveErrors: number;
  _count?: {
    events: number;
    updates: number;
  };
};

type FormState = {
  name: string;
  type: SourceType;
  url: string;
  rssUrl: string;
  apiUrl: string;
  isActive: boolean;
  priority: number;
  trustLevel: string;
  fetchIntervalSeconds: number;
  defaultSegment: string;
};

const segments = [
  { value: "", label: "All Segments" },
  { value: "sports", label: "Sports" },
  { value: "india", label: "India" },
  { value: "world", label: "World" },
  { value: "business", label: "Business" },
  { value: "breaking", label: "Breaking / Special" },
];

const types: { value: SourceType; label: string }[] = [
  { value: "rss", label: "RSS" },
  { value: "api", label: "API" },
  { value: "manual", label: "Manual" },
  { value: "newsroom", label: "Newsroom" },
];

const intervals = [
  { value: 30, label: "30 seconds" },
  { value: 60, label: "1 minute" },
  { value: 300, label: "5 minutes" },
  { value: 600, label: "10 minutes" },
  { value: 1800, label: "30 minutes" },
  { value: 3600, label: "1 hour" },
];

const trustLevels = [
  { value: "standard", label: "Standard" },
  { value: "trusted", label: "Trusted" },
  { value: "high", label: "High Trust" },
];

function trustLevelToLabel(value: number | string | null | undefined) {
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();

    if (normalized === "high" || normalized === "3") return "high";
    if (normalized === "trusted" || normalized === "2") return "trusted";
    return "standard";
  }

  if (value === 3) return "high";
  if (value === 2) return "trusted";

  return "standard";
}

function formatDate(value?: string | null) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function intervalLabel(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  return `${Math.round(seconds / 3600)}h`;
}

function emptyForm(): FormState {
  return {
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
  };
}

export default function LiveSourceEditPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const sourceId = useMemo(() => {
    const raw = params?.id;

    if (Array.isArray(raw)) {
      return raw[0] || "";
    }

    return raw || "";
  }, [params]);

  const [source, setSource] = useState<Source | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [disabling, setDisabling] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadSource = useCallback(async () => {
    if (!sourceId) {
      setError("Invalid source ID.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/admin/live/sources/${encodeURIComponent(sourceId)}`,
        {
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to load source");
      }

      const data: Source = result.data;

      if (!data) {
        throw new Error("Source not found.");
      }

      setSource(data);

      setForm({
        name: data.name || "",
        type: data.type || "rss",
        url: data.url || "",
        rssUrl: data.rssUrl || "",
        apiUrl: data.apiUrl || "",
        isActive: Boolean(data.isActive),
        priority: Number(data.priority ?? 0),
        trustLevel: trustLevelToLabel(data.trustLevel),
        fetchIntervalSeconds: Number(
          data.fetchIntervalSeconds ?? 300
        ),
        defaultSegment: data.defaultSegment || "",
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load source"
      );
    } finally {
      setLoading(false);
    }
  }, [sourceId]);

  useEffect(() => {
    loadSource();
  }, [loadSource]);

  function updateForm<K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));

    setSuccess("");
    setError("");
  }

  async function saveChanges() {
    if (!sourceId) {
      setError("Invalid source ID.");
      return;
    }

    if (!form.name.trim()) {
      setError("Source name is required.");
      return;
    }

    if (form.type === "rss" && !form.rssUrl.trim() && !form.url.trim()) {
      setError("RSS source requires an RSS Feed URL or Source URL.");
      return;
    }

    if (form.type === "api" && !form.apiUrl.trim() && !form.url.trim()) {
      setError("API source requires an API URL or Source URL.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `/api/admin/live/sources/${encodeURIComponent(sourceId)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name.trim(),
            type: form.type,
            url: form.url.trim() || null,
            rssUrl: form.rssUrl.trim() || null,
            apiUrl: form.apiUrl.trim() || null,
            isActive: form.isActive,
            priority: Number(form.priority) || 0,
            trustLevel: form.trustLevel,
            fetchIntervalSeconds: Number(
              form.fetchIntervalSeconds
            ),
            defaultSegment: form.defaultSegment || null,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to update source");
      }

      const updated: Source = result.data;

      if (updated) {
        setSource(updated);

        setForm({
          name: updated.name || "",
          type: updated.type || "rss",
          url: updated.url || "",
          rssUrl: updated.rssUrl || "",
          apiUrl: updated.apiUrl || "",
          isActive: Boolean(updated.isActive),
          priority: Number(updated.priority ?? 0),
          trustLevel: trustLevelToLabel(updated.trustLevel),
          fetchIntervalSeconds: Number(
            updated.fetchIntervalSeconds ?? 300
          ),
          defaultSegment: updated.defaultSegment || "",
        });
      }

      setSuccess("Live source updated successfully.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update source"
      );
    } finally {
      setSaving(false);
    }
  }

  async function disableSource() {
    if (!source) return;

    const confirmed = window.confirm(
      `Disable "${source.name}"? This will stop the source from being used by Live automation.`
    );

    if (!confirmed) return;

    setDisabling(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `/api/admin/live/sources/${encodeURIComponent(source.id)}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to disable source");
      }

      setSource((current) =>
        current
          ? {
              ...current,
              isActive: false,
            }
          : current
      );

      setForm((current) => ({
        ...current,
        isActive: false,
      }));

      setSuccess("Live source disabled successfully.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to disable source"
      );
    } finally {
      setDisabling(false);
    }
  }

  const sourceUrl =
    source?.rssUrl ||
    source?.apiUrl ||
    source?.url ||
    "";

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F5EF] text-slate-900">
        <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
            <Loader2
              size={20}
              className="animate-spin text-[#163C80]"
            />
            <span className="text-sm font-semibold">
              Loading live source...
            </span>
          </div>
        </div>
      </main>
    );
  }

  if (error && !source) {
    return (
      <main className="min-h-screen bg-[#F7F5EF] text-slate-900">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <Link
            href="/admin/live/sources"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#163C80] hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Live Sources
          </Link>

          <div className="rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
            <div className="mx-auto max-w-lg text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                <Globe2 size={22} />
              </div>

              <h1 className="mt-4 text-xl font-bold">
                Unable to load source
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                {error}
              </p>

              <button
                onClick={loadSource}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#163C80] px-5 py-2.5 text-sm font-semibold text-white"
              >
                <Radio size={16} />
                Try Again
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!source) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#F7F5EF] text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/admin/live/sources"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#163C80] hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Live Sources
          </Link>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[#163C80] p-3 text-white">
                <Radio size={22} />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight">
                    Edit Live Source
                  </h1>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                      form.isActive
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {form.isActive ? "Active" : "Disabled"}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Update source configuration and Live Center fetch settings.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {sourceUrl && (
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold shadow-sm hover:bg-slate-50"
                >
                  <ExternalLink size={16} />
                  Open Source
                </a>
              )}

              <button
                onClick={disableSource}
                disabled={disabling || !form.isActive}
                className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 shadow-sm disabled:cursor-not-allowed disabled:opacity-40"
              >
                {disabling ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Trash2 size={16} />
                )}
                Disable
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            <CheckCircle2 size={17} />
            {success}
          </div>
        )}

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="font-bold">Source Configuration</h2>
              <p className="mt-1 text-xs text-slate-500">
                Configure how Live Center connects to this source.
              </p>
            </div>

            <div className="grid gap-5 p-5 md:grid-cols-2">
              <label className="md:col-span-2">
                <span className="mb-1.5 block text-xs font-bold">
                  Source Name
                </span>

                <input
                  value={form.name}
                  onChange={(event) =>
                    updateForm("name", event.target.value)
                  }
                  placeholder="Example: Official Sports Feed"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#163C80] focus:ring-2 focus:ring-[#163C80]/10"
                />
              </label>

              <label>
                <span className="mb-1.5 block text-xs font-bold">
                  Type
                </span>

                <select
                  value={form.type}
                  onChange={(event) =>
                    updateForm(
                      "type",
                      event.target.value as SourceType
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#163C80]"
                >
                  {types.map((item) => (
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
                  onChange={(event) =>
                    updateForm("defaultSegment", event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#163C80]"
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
                  onChange={(event) =>
                    updateForm("url", event.target.value)
                  }
                  placeholder="https://..."
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#163C80]"
                />
              </label>

              {form.type === "rss" && (
                <label className="md:col-span-2">
                  <span className="mb-1.5 block text-xs font-bold">
                    RSS Feed URL
                  </span>

                  <input
                    value={form.rssUrl}
                    onChange={(event) =>
                      updateForm("rssUrl", event.target.value)
                    }
                    placeholder="https://example.com/rss.xml"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#163C80]"
                  />

                  <p className="mt-1.5 text-[11px] text-slate-400">
                    RSS sources are used by the Live ingestion engine.
                  </p>
                </label>
              )}

              {form.type === "api" && (
                <label className="md:col-span-2">
                  <span className="mb-1.5 block text-xs font-bold">
                    API URL
                  </span>

                  <input
                    value={form.apiUrl}
                    onChange={(event) =>
                      updateForm("apiUrl", event.target.value)
                    }
                    placeholder="https://api.example.com/..."
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#163C80]"
                  />

                  <p className="mt-1.5 text-[11px] text-slate-400">
                    API sources require a dedicated adapter before automated
                    ingestion.
                  </p>
                </label>
              )}

              <label>
                <span className="mb-1.5 block text-xs font-bold">
                  Fetch Interval
                </span>

                <select
                  value={form.fetchIntervalSeconds}
                  onChange={(event) =>
                    updateForm(
                      "fetchIntervalSeconds",
                      Number(event.target.value)
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#163C80]"
                >
                  {intervals.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="mb-1.5 block text-xs font-bold">
                  Trust Level
                </span>

                <select
                  value={form.trustLevel}
                  onChange={(event) =>
                    updateForm("trustLevel", event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#163C80]"
                >
                  {trustLevels.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="mb-1.5 block text-xs font-bold">
                  Priority
                </span>

                <input
                  type="number"
                  value={form.priority}
                  onChange={(event) =>
                    updateForm("priority", Number(event.target.value))
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#163C80]"
                />

                <p className="mt-1.5 text-[11px] text-slate-400">
                  Higher priority sources can be preferred when multiple
                  sources are available.
                </p>
              </label>

              <label className="flex min-h-[82px] items-center gap-3 rounded-xl bg-slate-50 p-4">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(event) =>
                    updateForm("isActive", event.target.checked)
                  }
                  className="h-4 w-4 rounded border-slate-300"
                />

                <div>
                  <div className="text-sm font-bold">
                    Source active
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500">
                    Allow this source to participate in Live automation.
                  </div>
                </div>
              </label>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/admin/live/sources"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold"
              >
                <ArrowLeft size={16} />
                Cancel
              </Link>

              <button
                onClick={saveChanges}
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#163C80] px-6 py-2.5 text-sm font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <Save size={17} />
                )}

                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </section>

          <aside className="space-y-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <Globe2 size={18} className="text-[#163C80]" />
                <h2 className="font-bold">Source Health</h2>
              </div>

              <div className="mt-5">
                {source.consecutiveErrors === 0 ? (
                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-600">
                    <CheckCircle2 size={18} />
                    Healthy
                  </div>
                ) : (
                  <div className="text-sm font-bold text-red-600">
                    {source.consecutiveErrors} consecutive errors
                  </div>
                )}
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex justify-between gap-4 text-xs">
                  <span className="text-slate-400">
                    Last fetched
                  </span>
                  <span className="text-right font-semibold">
                    {formatDate(source.lastFetchedAt)}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-xs">
                  <span className="text-slate-400">
                    Last success
                  </span>
                  <span className="text-right font-semibold">
                    {formatDate(source.lastSuccessAt)}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-xs">
                  <span className="text-slate-400">
                    Last error
                  </span>
                  <span className="text-right font-semibold">
                    {formatDate(source.lastErrorAt)}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-xs">
                  <span className="text-slate-400">
                    Next fetch
                  </span>
                  <span className="text-right font-semibold">
                    {formatDate(source.nextFetchAt)}
                  </span>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-bold">Usage</h2>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    Events
                  </p>
                  <p className="mt-1 text-xl font-bold">
                    {source._count?.events ?? 0}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    Updates
                  </p>
                  <p className="mt-1 text-xl font-bold">
                    {source._count?.updates ?? 0}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-between text-xs">
                <span className="text-slate-400">
                  Fetch interval
                </span>
                <span className="font-semibold">
                  {intervalLabel(source.fetchIntervalSeconds)}
                </span>
              </div>

              <div className="mt-2 flex justify-between text-xs">
                <span className="text-slate-400">
                  Priority
                </span>
                <span className="font-semibold">
                  {source.priority}
                </span>
              </div>

              <div className="mt-2 flex justify-between text-xs">
                <span className="text-slate-400">
                  Trust
                </span>
                <span className="font-semibold capitalize">
                  {trustLevelToLabel(source.trustLevel)}
                </span>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-bold">Source ID</h2>
              <p className="mt-2 break-all rounded-lg bg-slate-50 p-3 font-mono text-[11px] text-slate-500">
                {source.id}
              </p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}