"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";

interface Topic {
  id: string;
  name: string;
  slug: string;
}

export default function TrendingTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loaded, setLoaded] = useState(false);

  const containerRef =
    useRef<HTMLElement | null>(null);

  const loadingRef =
    useRef(false);

  useEffect(() => {
    const element =
      containerRef.current;

    if (!element) {
      return;
    }

    /*
     * DO NOT LOAD TRENDING TOPICS
     * DURING INITIAL PAGE LOAD.
     *
     * Wait until the component is close
     * to the viewport.
     */
    const observer =
      new IntersectionObserver(
        (entries) => {
          const entry =
            entries[0];

          if (
            !entry?.isIntersecting ||
            loadingRef.current
          ) {
            return;
          }

          loadingRef.current = true;

          observer.disconnect();

          const load = async () => {
            try {
              const res =
                await fetch(
                  "/api/trending-topics",
                  {
                    cache: "force-cache",
                  }
                );

              if (!res.ok) {
                throw new Error(
                  `Trending topics request failed: ${res.status}`
                );
              }

              const data =
                await res.json();

              if (
                Array.isArray(data)
              ) {
                setTopics(data);
              } else if (
                Array.isArray(
                  data?.topics
                )
              ) {
                setTopics(
                  data.topics
                );
              }
            } catch {
              setTopics([]);
            } finally {
              setLoaded(true);
            }
          };

          /*
           * Let critical rendering finish
           * before starting the request.
           */
          if (
            typeof window !==
              "undefined" &&
            "requestIdleCallback" in
              window
          ) {
            (
              window as Window & {
                requestIdleCallback: (
                  callback: () => void,
                  options?: {
                    timeout: number;
                  }
                ) => number;
              }
            ).requestIdleCallback(
              load,
              {
                timeout: 3000,
              }
            );
          } else {
            setTimeout(
              load,
              1000
            );
          }
        },
        {
          rootMargin:
            "500px 0px",
          threshold: 0.01,
        }
      );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  /*
   * Keep the DOM target mounted so
   * IntersectionObserver can detect it.
   */
  if (
    loaded &&
    !topics.length
  ) {
    return (
      <section
        ref={
          containerRef as React.RefObject<HTMLElement>
        }
        className="hidden"
        aria-hidden="true"
      />
    );
  }

  return (
    <section
      ref={
        containerRef as React.RefObject<HTMLElement>
      }
      className="
        border-t
        border-b
        border-[var(--news-border)]
        py-6
      "
      aria-labelledby="trending-topics-heading"
    >
      {/* HEADER */}

      <div
        className="
          flex
          items-center
          justify-between
          mb-5
        "
      >
        <h2
          id="trending-topics-heading"
          className="
            text-xs
            uppercase
            tracking-[0.25em]
            font-bold
            text-[var(--news-text)]
          "
        >
          Trending Topics
        </h2>

        <span
          className="
            w-2
            h-2
            rounded-full
            bg-[var(--news-orange)]
          "
          aria-hidden="true"
        />
      </div>

      {/* TOPIC LIST */}

      {topics.length > 0 && (
        <div
          className="
            flex
            flex-wrap
            gap-2
          "
        >
          {topics.map(
            (topic) => (
              <Link
                key={topic.id}
                href={`/${topic.slug}`}
                className="
                  px-3
                  py-1.5
                  rounded-full
                  bg-[var(--news-cream)]
                  border
                  border-[var(--news-border)]
                  text-xs
                  font-medium
                  text-[var(--news-text)]
                  hover:border-[var(--news-orange)]
                  hover:text-[var(--news-orange)]
                  transition
                "
              >
                #{topic.name}
              </Link>
            )
          )}
        </div>
      )}
    </section>
  );
}

