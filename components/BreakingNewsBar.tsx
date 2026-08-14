"use client";

import { useEffect, useMemo, useState } from "react";

type BreakingArticle = {
  id: string;
  title: string;
  slug: string;
};

const FALLBACK_HEADLINE =
  "Latest news updates from NationPath India";

export default function BreakingNewsBar() {
  const [breaking, setBreaking] = useState<BreakingArticle[]>([]);

  useEffect(() => {
    let mounted = true;

    const loadBreaking = async () => {
      try {
        const res = await fetch("/api/push-breaking", {
          method: "GET",
          cache: "default",
        });

        if (!res.ok) {
          console.error(
            "BREAKING API STATUS:",
            res.status
          );
          return;
        }

        const data = await res.json();

        if (
          mounted &&
          data?.success &&
          Array.isArray(data.breaking)
        ) {
          setBreaking(data.breaking);
        }
      } catch (error) {
        console.error(
          "BREAKING BAR ERROR:",
          error
        );
      }
    };

    // Background load — does not block initial render.
    loadBreaking();

    // Refresh every 60 seconds.
    const interval = window.setInterval(
      loadBreaking,
      60000
    );

    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  const headlines = useMemo(() => {
    const titles = breaking
      .map((item) => item?.title?.trim())
      .filter(Boolean);

    return titles.length > 0
      ? titles
      : [FALLBACK_HEADLINE];
  }, [breaking]);

  const ticker = useMemo(
    () => [...headlines, ...headlines],
    [headlines]
  );

  return (
    <div
      className="
        relative
        news-breaking
        overflow-hidden
        group
      "
      aria-label="Breaking news"
    >
      <div
        className="
          news-container
          flex
          items-center
          h-9
          md:h-10
          relative
          z-10
        "
      >
        {/* BREAKING LABEL */}

        <div
          className="
            flex
            items-center
            gap-2
            bg-[var(--news-breaking-badge)]
            px-2.5
            py-1
            rounded-sm
            shrink-0
          "
        >
          <span
            className="
              w-1.5
              h-1.5
              rounded-full
              bg-white
              animate-pulse
            "
            aria-hidden="true"
          />

          <span
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-white
            "
          >
            Breaking
          </span>
        </div>

        {/* TICKER */}

        <div
          className="
            overflow-hidden
            ml-3
            flex-1
          "
        >
          <div
            className="
              flex
              w-max
              whitespace-nowrap
              animate-marquee
              group-hover:[animation-play-state:paused]
            "
          >
            {ticker.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="
                  text-xs
                  md:text-sm
                  font-medium
                  text-[var(--news-breaking-text)]
                  mx-4
                "
              >
                {item}

                <span
                  className="
                    ml-4
                    text-[var(--news-breaking-dot)]
                  "
                  aria-hidden="true"
                >
                  •
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

