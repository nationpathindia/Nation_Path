"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Item = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: {
    name?: string;
    slug?: string;
  };
};

interface Props {
  items?: Item[];
}

export default function BreakingSpotlight({
  items = [],
}: Props) {
  const [list, setList] = useState<Item[]>(items);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  /*
   * SYNC SERVER ITEMS
   *
   * Homepage already provides the breaking-news data.
   * Do not fetch breaking data again from the client.
   */
  useEffect(() => {
    setList(items);
    setIndex(0);
  }, [items]);

  /*
   * AUTO ROTATION
   */
  useEffect(() => {
    if (list.length <= 1 || paused) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % list.length);
    }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, [list.length, paused]);

  /*
   * IMPORTANT PERFORMANCE RULE
   *
   * The homepage receives breaking stories from the
   * server-rendered `items` prop.
   *
   * Do NOT open an EventSource / polling request here.
   * Doing so creates an additional network dependency
   * during homepage loading.
   *
   * A future realtime breaking-news layer can be added
   * separately and should be activated only after the
   * initial page has become interactive.
   */

  if (!list.length) {
    return null;
  }

  const current = list[index] || list[0];

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-xl
        border
        border-[#163C80]/60
        bg-[#163C80]/10
        backdrop-blur-md
        px-5
        py-4
        sm:px-6
        sm:py-5
      "
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Breaking News Spotlight"
    >
      {/* MOVING BORDER */}
      <div
        className="
          absolute
          top-0
          left-0
          h-[2px]
          w-full
          overflow-hidden
        "
      >
        <div
          className="
            h-full
            w-1/3
            bg-[#EA661B]
            animate-[slide_3s_linear_infinite]
          "
        />
      </div>

      {/* HEADER */}
      <div
        className="
          flex
          items-center
          justify-between
          mb-3
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <span
            className="
              relative
              flex
              h-2
              w-2
            "
          >
            <span
              className="
                absolute
                h-full
                w-full
                rounded-full
                bg-red-500
                animate-ping
              "
            />

            <span
              className="
                relative
                h-2
                w-2
                rounded-full
                bg-red-500
              "
            />
          </span>

          <span
            className="
              text-[10px]
              uppercase
              tracking-[0.28em]
              font-bold
              text-red-500
            "
          >
            Breaking News
          </span>
        </div>

        <span
          className="
            text-[10px]
            text-[#163C80]/70
            tracking-widest
          "
        >
          {index + 1}/{list.length}
        </span>
      </div>

      {/* CATEGORY */}
      <div
        className="
          text-[10px]
          uppercase
          tracking-[0.22em]
          text-[#163C80]
          font-semibold
          mb-1
        "
      >
        {current.category?.name || "News"}
      </div>

      {/* TITLE */}
      <div
        className="
          font-serif
          font-bold
          text-lg
          sm:text-xl
          leading-snug
          tracking-tight
          text-[#111]
          line-clamp-2
        "
      >
        {current.title}
      </div>

      {/* EXCERPT */}
      <div
        className="
          mt-2
          text-sm
          text-gray-600
          leading-relaxed
          line-clamp-2
        "
      >
        {current.excerpt ||
          "Latest updates from Nation Path India newsroom."}
      </div>

      {/* FOOTER */}
      <div
        className="
          mt-4
          flex
          items-center
          justify-between
        "
      >
        {current.category?.slug && (
          <Link
            href={`/${current.category.slug}/${current.slug}`}
            className="
              text-xs
              uppercase
              tracking-widest
              font-semibold
              text-[#EA661B]
              hover:text-[#b94e10]
              transition
            "
          >
            Read Story →
          </Link>
        )}

        <span
          className="
            text-[10px]
            uppercase
            tracking-widest
            text-gray-500
          "
        >
          Live Desk
        </span>
      </div>
    </div>
  );
}

