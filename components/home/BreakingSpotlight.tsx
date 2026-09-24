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

type LiveEvent = {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  segment?: string | null;
  coverImage?: string | null;
  lastUpdateAt?: string | Date | null;
  updateCount?: number | null;
  isFeatured?: boolean;
  showOnHomepage?: boolean;
};

interface Props {
  items?: Item[];
  liveEvent?: LiveEvent | null;
}

export default function BreakingSpotlight({
  items = [],
  liveEvent = null,
}: Props) {
  const [list, setList] = useState<Item[]>(items);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  /*
   * SYNC SERVER ITEMS
   *
   * Breaking news continues to come from the
   * existing homepage server query.
   *
   * No additional client-side breaking API call.
   */
  useEffect(() => {
    setList(items);
    setIndex(0);
  }, [items]);

  /*
   * AUTO ROTATION
   *
   * Only the normal Breaking News items rotate.
   * LIVE NOW remains fixed until the server provides
   * another active live event.
   */
  useEffect(() => {
    if (liveEvent || list.length <= 1 || paused) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % list.length);
    }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, [list.length, paused, liveEvent]);

  /*
   * LIVE EVENT HAS PRIORITY
   */
  if (liveEvent) {
    const segmentLabel =
      liveEvent.segment === "sports"
        ? "Sports"
        : liveEvent.segment === "india"
          ? "India"
          : liveEvent.segment === "world"
            ? "World"
            : liveEvent.segment === "business"
              ? "Business"
              : liveEvent.segment === "breaking"
                ? "Breaking / Special"
                : "Live Coverage";

    return (
      <div
        className="
          relative
          overflow-hidden
          rounded-xl
          border
          border-red-500/40
          bg-red-50/60
          backdrop-blur-md
          px-5
          py-4
          sm:px-6
          sm:py-5
        "
        aria-label="Live Now"
      >
        {/* LIVE TOP LINE */}
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
              bg-red-500
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
                h-2.5
                w-2.5
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
                  h-2.5
                  w-2.5
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
                text-red-600
              "
            >
              Live Now
            </span>
          </div>

          <span
            className="
              rounded-full
              border
              border-red-500/30
              bg-red-500/10
              px-2.5
              py-1
              text-[9px]
              uppercase
              tracking-[0.16em]
              font-bold
              text-red-600
            "
          >
            Live Center
          </span>
        </div>

        {/* SEGMENT */}
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
          {segmentLabel}
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
          {liveEvent.title}
        </div>

        {/* DESCRIPTION */}
        <div
          className="
            mt-2
            text-sm
            text-gray-600
            leading-relaxed
            line-clamp-2
          "
        >
          {liveEvent.description ||
            "Follow the latest developments and continuous updates from the Nation Path Live Desk."}
        </div>

        {/* FOOTER */}
        <div
          className="
            mt-4
            flex
            flex-wrap
            items-center
            justify-between
            gap-3
          "
        >
          <Link
            href={`/live/${liveEvent.slug}`}
            className="
              inline-flex
              items-center
              gap-2
              text-xs
              uppercase
              tracking-widest
              font-bold
              text-red-600
              hover:text-red-700
              transition
            "
          >
            View Live Coverage
            <span aria-hidden="true">→</span>
          </Link>

          <Link
            href="/live"
            className="
              text-[10px]
              uppercase
              tracking-widest
              font-semibold
              text-[#163C80]
              hover:text-[#EA661B]
              transition
            "
          >
            All Live →
          </Link>
        </div>
      </div>
    );
  }

  /*
   * NO LIVE EVENT
   *
   * Existing Breaking News behavior remains intact.
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