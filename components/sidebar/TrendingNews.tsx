"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SectionHeader from "@/components/common/SectionHeader";

type Article = {
  id: string;
  title: string;
  slug: string;
  category?: {
    slug: string;
    name: string;
  };
};

export default function TrendingNews() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    let timeoutId:
      | ReturnType<typeof setTimeout>
      | null = null;

    let idleId: number | null = null;

    const fetchTrending = async () => {
      if (cancelled) return;

      try {
        const res = await fetch("/api/trending", {
          method: "GET",
          cache: "force-cache",
        });

        if (!res.ok) {
          throw new Error(
            `Trending request failed: ${res.status}`
          );
        }

        const data = await res.json();

        const list: Article[] =
          Array.isArray(data)
            ? data
            : Array.isArray(data?.articles)
            ? data.articles
            : Array.isArray(data?.news)
            ? data.news
            : Array.isArray(data?.data)
            ? data.data
            : [];

        if (!cancelled) {
          setNews(list);
        }
      } catch (error) {
        if (!cancelled) {
          console.error(
            "Trending error:",
            error
          );

          setNews([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    const scheduleLoad = () => {
      if (cancelled) return;

      if (
        typeof window !== "undefined" &&
        "requestIdleCallback" in window
      ) {
        idleId = (
          window as Window & {
            requestIdleCallback: (
              callback: () => void,
              options?: { timeout: number }
            ) => number;

            cancelIdleCallback: (
              id: number
            ) => void;
          }
        ).requestIdleCallback(
          fetchTrending,
          {
            timeout: 2500,
          }
        );

        return;
      }

      timeoutId = setTimeout(
        fetchTrending,
        1200
      );
    };

    scheduleLoad();

    return () => {
      cancelled = true;

      if (
        idleId !== null &&
        typeof window !== "undefined" &&
        "cancelIdleCallback" in window
      ) {
        (
          window as Window & {
            cancelIdleCallback: (
              id: number
            ) => void;
          }
        ).cancelIdleCallback(idleId);
      }

      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const articleUrl = (item: Article) => {
    if (item?.category?.slug) {
      return `/${item.category.slug}/${item.slug}`;
    }

    return `/article/${item.slug}`;
  };

  /*
   * Trending is intentionally deferred.
   *
   * Do not render a loading message in the initial
   * sidebar because Trending is not above-the-fold
   * critical content.
   */
  if (loading || !news.length) {
    return null;
  }

  return (
    <section
      className="
        border-t
        border-[var(--news-border)]
        pt-6
      "
      aria-labelledby="trending-news-heading"
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
        <div id="trending-news-heading">
          <SectionHeader title="Trending Now" />
        </div>

        <span
          className="
            flex
            items-center
            gap-2
            text-[10px]
            uppercase
            font-bold
            tracking-[0.18em]
            text-[var(--news-orange)]
          "
        >
          LIVE

          <span
            className="
              w-2
              h-2
              rounded-full
              bg-[var(--news-orange)]
            "
            aria-hidden="true"
          />
        </span>
      </div>

      {/* TRENDING LIST */}

      <div
        className="
          divide-y
          divide-[var(--news-border)]
        "
      >
        {news
          .slice(0, 6)
          .map((item, index) => (
            <Link
              key={item.id}
              href={articleUrl(item)}
              className="
                group
                block
                py-4
              "
            >
              <div
                className="
                  flex
                  gap-4
                "
              >
                {/* RANK */}

                <span
                  className="
                    text-xl
                    font-serif
                    font-bold
                    text-[var(--news-editorial-gold)]
                    w-5
                    shrink-0
                  "
                >
                  {index + 1}
                </span>

                {/* STORY */}

                <div>
                  <p
                    className="
                      font-serif
                      text-base
                      leading-snug
                      text-[var(--news-text)]
                      group-hover:text-[var(--news-orange)]
                      transition
                      line-clamp-2
                    "
                  >
                    {item.title}
                  </p>

                  {item.category?.name && (
                    <p
                      className="
                        mt-2
                        text-[10px]
                        uppercase
                        tracking-[0.18em]
                        text-[var(--news-light-text)]
                      "
                    >
                      {item.category.name}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}