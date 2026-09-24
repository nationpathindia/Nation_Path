"use client";

import { useEffect, useState } from "react";
import LiveUpdateCard from "./LiveUpdateCard";

interface Props {
  slug: string;
  initialUpdates: any[];
}

export default function LiveTimeline({
  slug,
  initialUpdates,
}: Props) {
  const [updates, setUpdates] =
    useState<any[]>(initialUpdates);

  const [newUpdates, setNewUpdates] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  async function refreshUpdates() {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/live/events/${encodeURIComponent(
          slug
        )}/updates?limit=100`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) return;

      const data = await response.json();

      const incoming =
        data.data?.updates ||
        data.updates ||
        [];

      if (!incoming.length) return;

      const existingIds = new Set(
        updates.map((item) => item.id)
      );

      const count = incoming.filter(
        (item: any) =>
          !existingIds.has(item.id)
      ).length;

      if (count > 0) {
        setNewUpdates(count);
      }

      setUpdates(incoming);
    } catch {
      // Silent failure.
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = window.setInterval(
      refreshUpdates,
      30000
    );

    return () => {
      window.clearInterval(timer);
    };
  }, [slug, updates]);

  function showNewUpdates() {
    setNewUpdates(0);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <section>
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-red-600">
            Live Timeline
          </p>

          <h2 className="mt-1 text-2xl font-black text-slate-950">
            Latest Updates
          </h2>
        </div>

        <span className="text-xs text-slate-500">
          {loading ? "Updating…" : "Auto-updating"}
        </span>
      </div>

      {newUpdates > 0 && (
        <button
          type="button"
          onClick={showNewUpdates}
          className="mb-5 w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700 transition hover:bg-red-100"
        >
          {newUpdates} new{" "}
          {newUpdates === 1
            ? "update"
            : "updates"}{" "}
          available — view latest
        </button>
      )}

      {updates.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="font-semibold text-slate-800">
            No published updates yet.
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Live updates will appear here as coverage develops.
          </p>
        </div>
      ) : (
        <div className="space-y-5 sm:border-l sm:border-slate-200 sm:pl-10">
          {updates.map((update) => (
            <LiveUpdateCard
              key={update.id}
              update={update}
            />
          ))}
        </div>
      )}
    </section>
  );
}