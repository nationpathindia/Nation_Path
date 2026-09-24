"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileCheck2,
  Loader2,
  RefreshCw,
  Search,
  ShieldAlert,
  XCircle,
} from "lucide-react";

type ReviewUpdate = {
  id: string;
  headline?: string | null;
  content: string;
  status: string;
  verificationStatus: string;
  isBreaking: boolean;
  isPinned: boolean;
  isAutomated: boolean;
  sourceName?: string | null;
  sourceUrl?: string | null;
  createdAt: string;
  publishedAt?: string | null;
  verificationNotes?: string | null;
  event: {
    id: string;
    title: string;
    slug: string;
    segment: string;
    status: string;
  };
  author?: {
    id: string;
    name?: string | null;
    email?: string | null;
  } | null;
  source?: {
    id: string;
    name: string;
    type: string;
    trustLevel: number;
  } | null;
};

const verificationOptions = [
  {
    value: "under_review",
    label: "Under Review",
  },
  {
    value: "verified",
    label: "Verified",
  },
  {
    value: "partially_verified",
    label: "Partially Verified",
  },
  {
    value: "correction_required",
    label: "Correction Required",
  },
  {
    value: "unverified",
    label: "Unverified",
  },
];

function formatDate(value?: string | null) {
  if (!value) return "—";

  return new Date(value).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function badgeClass(value: string) {
  switch (value) {
    case "verified":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "partially_verified":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "correction_required":
      return "bg-red-50 text-red-700 border-red-200";
    case "published":
      return "bg-blue-50 text-blue-700 border-blue-200";
    default:
      return "bg-slate-50 text-slate-600 border-slate-200";
  }
}

export default function LiveReviewPage() {
  const [items, setItems] = useState<ReviewUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] =
    useState("under_review");

  const [overview, setOverview] = useState({
    underReview: 0,
    correctionRequired: 0,
  });

  const load = useCallback(async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams();

      params.set(
        "verificationStatus",
        filter
      );

      params.set("limit", "50");

      if (search.trim()) {
        params.set("search", search.trim());
      }

      const response = await fetch(
        `/api/admin/live/review?${params.toString()}`,
        {
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Failed to load review queue"
        );
      }

      setItems(result.data || []);
      setOverview(
        result.overview || {
          underReview: 0,
          correctionRequired: 0,
        }
      );
    } catch (error) {
      console.error(error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [filter, search]);

  useEffect(() => {
    load();
  }, [load]);

  async function review(
    id: string,
    verificationStatus: string,
    status?: string
  ) {
    setActionId(id);

    try {
      const response = await fetch(
        "/api/admin/live/review",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            verificationStatus,
            status,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Review action failed"
        );
      }

      await load();
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error
          ? error.message
          : "Review action failed"
      );
    } finally {
      setActionId(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F5EF]">
      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#EA661B]">
              <FileCheck2 className="h-4 w-4" />
              LIVE CENTER
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#163C80] sm:text-3xl">
              Review Queue
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Verify automated and manually submitted live updates
              before publication.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={load}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>

            <Link
              href="/admin/live"
              className="inline-flex items-center gap-2 rounded-xl bg-[#163C80] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-95"
            >
              Live Center
            </Link>
          </div>
        </div>

        {/* KPI */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                Under Review
              </span>
              <Clock3 className="h-5 w-5 text-amber-500" />
            </div>

            <div className="text-3xl font-bold text-[#163C80]">
              {overview.underReview}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                Correction Required
              </span>
              <ShieldAlert className="h-5 w-5 text-red-500" />
            </div>

            <div className="text-3xl font-bold text-red-600">
              {overview.correctionRequired}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search headline, content, source or event..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#163C80] focus:bg-white"
              />
            </div>

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium outline-none focus:border-[#163C80]"
            >
              {verificationOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Queue */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
              <Loader2 className="h-7 w-7 animate-spin text-[#163C80]" />
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
              <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-emerald-500" />

              <h2 className="text-lg font-bold text-slate-800">
                Review queue is clear
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                No updates match the current filter.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="border-b border-slate-100 px-5 py-4">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${badgeClass(
                            item.verificationStatus
                          )}`}
                        >
                          {item.verificationStatus.replace(
                            /_/g,
                            " "
                          )}
                        </span>

                        {item.isBreaking && (
                          <span className="rounded-full bg-red-600 px-2.5 py-1 text-xs font-bold text-white">
                            BREAKING
                          </span>
                        )}

                        {item.isAutomated && (
                          <span className="rounded-full bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700">
                            AUTOMATED
                          </span>
                        )}
                      </div>

                      <h2 className="text-lg font-bold text-slate-900">
                        {item.headline ||
                          "Live Update"}
                      </h2>

                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        <span>
                          {item.event.title}
                        </span>

                        <span>
                          {item.event.segment}
                        </span>

                        <span>
                          {formatDate(
                            item.createdAt
                          )}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/admin/live/${item.event.id}`}
                      className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#163C80] hover:underline"
                    >
                      Open Event
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="grid gap-5 p-5 lg:grid-cols-[1fr_280px]">
                  <div>
                    <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                      {item.content}
                    </p>

                    <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
                      <strong>Source:</strong>{" "}
                      {item.sourceName ||
                        item.source?.name ||
                        "Manual"}

                      {item.source?.trustLevel !==
                        undefined && (
                        <span className="ml-2">
                          • Trust {item.source.trustLevel}/100
                        </span>
                      )}

                      {item.sourceUrl && (
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-2 font-semibold text-[#163C80] hover:underline"
                        >
                          View Source
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      disabled={actionId === item.id}
                      onClick={() =>
                        review(
                          item.id,
                          "verified",
                          "published"
                        )
                      }
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
                    >
                      {actionId === item.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4" />
                      )}
                      Verify & Publish
                    </button>

                    <button
                      disabled={actionId === item.id}
                      onClick={() =>
                        review(
                          item.id,
                          "partially_verified",
                          "published"
                        )
                      }
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-bold text-amber-700 hover:bg-amber-100 disabled:opacity-50"
                    >
                      <AlertTriangle className="h-4 w-4" />
                      Partially Verify
                    </button>

                    <button
                      disabled={actionId === item.id}
                      onClick={() =>
                        review(
                          item.id,
                          "correction_required"
                        )
                      }
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-700 hover:bg-red-100 disabled:opacity-50"
                    >
                      <ShieldAlert className="h-4 w-4" />
                      Correction Required
                    </button>

                    <button
                      disabled={actionId === item.id}
                      onClick={() =>
                        review(
                          item.id,
                          "unverified",
                          "archived"
                        )
                      }
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                    >
                      <XCircle className="h-4 w-4" />
                      Archive
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}