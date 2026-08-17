"use client";

import { useEffect, useRef } from "react";

type ArticleAnalyticsTrackerProps = {
  articleId: string;
  articleUrl: string;
};

const SESSION_KEY = "nationpath_analytics_session";

const READ_TIME_MS = 30_000;

const SCROLL_MILESTONES = [25, 50, 75, 100];

function getSessionId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);

    if (existing) {
      return existing;
    }

    const id =
      typeof crypto !== "undefined" &&
      typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()
            .toString(36)
            .slice(2)}`;

    sessionStorage.setItem(
      SESSION_KEY,
      id
    );

    return id;
  } catch {
    return `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}`;
  }
}

function sendEvent(
  articleId: string,
  eventType: string,
  articleUrl: string,
  metadata?: Record<string, unknown>
) {
  try {
    const payload = JSON.stringify({
      eventType,
      articleId,

      sessionId: getSessionId(),

      path:
        typeof window !== "undefined"
          ? window.location.pathname
          : undefined,

      source:
        typeof document !== "undefined" &&
        document.referrer
          ? "referral"
          : "direct",

      referrer:
        typeof document !== "undefined"
          ? document.referrer || undefined
          : undefined,

      metadata: {
        articleUrl,
        ...metadata,
      },
    });

    const blob = new Blob([payload], {
      type: "application/json",
    });

    if (
      typeof navigator !== "undefined" &&
      typeof navigator.sendBeacon ===
        "function"
    ) {
      const sent =
        navigator.sendBeacon(
          "/api/analytics/event",
          blob
        );

      if (sent) {
        return;
      }
    }

    void fetch(
      "/api/analytics/event",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: payload,

        keepalive: true,
      }
    ).catch(() => {});
  } catch {
    // Analytics must never break the article page.
  }
}

function getScrollPercentage(): number {
  if (typeof window === "undefined") {
    return 0;
  }

  const documentHeight =
    document.documentElement
      .scrollHeight;

  const viewportHeight =
    window.innerHeight;

  const scrollableHeight =
    documentHeight -
    viewportHeight;

  if (scrollableHeight <= 0) {
    return 100;
  }

  const percentage =
    (window.scrollY /
      scrollableHeight) *
    100;

  return Math.min(
    100,
    Math.max(
      0,
      Math.round(percentage)
    )
  );
}

export default function ArticleAnalyticsTracker({
  articleId,
  articleUrl,
}: ArticleAnalyticsTrackerProps) {
  const startedAt = useRef<number>(
    Date.now()
  );

  const accumulatedActiveMs =
    useRef<number>(0);

  const activeStartedAt =
    useRef<number>(Date.now());

  const isActive =
    useRef<boolean>(true);

  const maxScroll =
    useRef<number>(0);

  const sentRead =
    useRef<boolean>(false);

  const sentOpen =
    useRef<boolean>(false);

  const sentView =
    useRef<boolean>(false);

  const sentMilestones =
    useRef<Set<number>>(
      new Set()
    );

  useEffect(() => {
    /*
    |--------------------------------------------------------------------------
    | PREVENT DUPLICATE INITIAL EVENTS
    |--------------------------------------------------------------------------
    */

    if (!sentOpen.current) {
      sentOpen.current = true;

      sendEvent(
        articleId,
        "open",
        articleUrl
      );
    }

    if (!sentView.current) {
      sentView.current = true;

      sendEvent(
        articleId,
        "view",
        articleUrl
      );
    }

    /*
    |--------------------------------------------------------------------------
    | ACTIVE TIME
    |--------------------------------------------------------------------------
    */

    const updateActiveTime =
      () => {
        if (!isActive.current) {
          return;
        }

        const now = Date.now();

        accumulatedActiveMs.current +=
          now -
          activeStartedAt.current;

        activeStartedAt.current =
          now;
      };

    /*
    |--------------------------------------------------------------------------
    | READ EVENT
    |--------------------------------------------------------------------------
    */

    const sendReadEvent = () => {
      if (sentRead.current) {
        return;
      }

      updateActiveTime();

      sentRead.current = true;

      sendEvent(
        articleId,
        "read",
        articleUrl,
        {
          readPercentage:
            maxScroll.current,

          durationSeconds: Math.round(
            accumulatedActiveMs.current /
              1000
          ),
        }
      );
    };

    /*
    |--------------------------------------------------------------------------
    | SCROLL
    |--------------------------------------------------------------------------
    */

    const handleScroll = () => {
      const percentage =
        getScrollPercentage();

      if (
        percentage >
        maxScroll.current
      ) {
        maxScroll.current =
          percentage;
      }

      /*
      |--------------------------------------------------------------------------
      | SCROLL MILESTONES
      |--------------------------------------------------------------------------
      */

      for (const milestone of SCROLL_MILESTONES) {
        if (
          percentage >= milestone &&
          !sentMilestones.current.has(
            milestone
          )
        ) {
          sentMilestones.current.add(
            milestone
          );

          sendEvent(
            articleId,
            "scroll",
            articleUrl,
            {
              percentage: milestone,
              maxScroll:
                maxScroll.current,
            }
          );
        }
      }

      /*
      |--------------------------------------------------------------------------
      | READ AT 75%
      |--------------------------------------------------------------------------
      */

      if (
        percentage >= 75 &&
        !sentRead.current
      ) {
        sendReadEvent();
      }
    };

    /*
    |--------------------------------------------------------------------------
    | VISIBILITY
    |--------------------------------------------------------------------------
    */

    const handleVisibilityChange =
      () => {
        if (
          document.visibilityState ===
          "hidden"
        ) {
          updateActiveTime();

          isActive.current = false;

          return;
        }

        if (
          document.visibilityState ===
          "visible"
        ) {
          isActive.current = true;

          activeStartedAt.current =
            Date.now();
        }
      };

    /*
    |--------------------------------------------------------------------------
    | 30 SECOND READ CHECK
    |--------------------------------------------------------------------------
    */

    const interval =
      window.setInterval(() => {
        if (sentRead.current) {
          return;
        }

        updateActiveTime();

        if (
          accumulatedActiveMs.current >=
          READ_TIME_MS
        ) {
          sendReadEvent();
        }
      }, 5_000);

    /*
    |--------------------------------------------------------------------------
    | EVENT LISTENERS
    |--------------------------------------------------------------------------
    */

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    /*
    |--------------------------------------------------------------------------
    | CLEANUP
    |--------------------------------------------------------------------------
    */

    return () => {
      updateActiveTime();

      window.removeEventListener(
        "scroll",
        handleScroll
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      window.clearInterval(
        interval
      );
    };
  }, [articleId, articleUrl]);

  return null;
}