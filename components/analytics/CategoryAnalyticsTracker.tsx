"use client";

import { useEffect, useRef } from "react";

type CategoryAnalyticsTrackerProps = {
  categoryId: string;
  categoryUrl: string;
};

const SESSION_KEY =
  "nationpath_analytics_session";

const READ_TIME_MS = 30_000;

const SCROLL_MILESTONES = [25, 50, 75, 100];

function getSessionId(): string {
  try {
    const existing =
      sessionStorage.getItem(SESSION_KEY);

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
  categoryId: string,
  eventType: string,
  categoryUrl: string,
  metadata?: Record<string, unknown>
) {
  try {
    const payload = JSON.stringify({
      eventType,
      categoryId,
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
        categoryUrl,
        ...metadata,
      },
    });

    const blob = new Blob([payload], {
      type: "application/json",
    });

    if (
      typeof navigator !== "undefined" &&
      typeof navigator.sendBeacon === "function"
    ) {
      const sent =
        navigator.sendBeacon(
          "/api/analytics/category-event",
          blob
        );

      if (sent) {
        return;
      }
    }

    void fetch(
      "/api/analytics/category-event",
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
    // Analytics must never break the category page.
  }
}

function getScrollPercentage(): number {
  if (typeof window === "undefined") {
    return 0;
  }

  const documentHeight =
    document.documentElement.scrollHeight;

  const viewportHeight =
    window.innerHeight;

  const scrollableHeight =
    documentHeight - viewportHeight;

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

export default function CategoryAnalyticsTracker({
  categoryId,
  categoryUrl,
}: CategoryAnalyticsTrackerProps) {
  const accumulatedActiveMs =
    useRef<number>(0);

  const activeStartedAt =
    useRef<number>(Date.now());

  const isActive =
    useRef<boolean>(true);

  const maxScroll =
    useRef<number>(0);

  const sentOpen =
    useRef<boolean>(false);

  const sentView =
    useRef<boolean>(false);

  const sentRead =
    useRef<boolean>(false);

  const sentMilestones =
    useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!sentOpen.current) {
      sentOpen.current = true;

      sendEvent(
        categoryId,
        "open",
        categoryUrl
      );
    }

    if (!sentView.current) {
      sentView.current = true;

      sendEvent(
        categoryId,
        "view",
        categoryUrl
      );
    }

    const updateActiveTime = () => {
      if (!isActive.current) {
        return;
      }

      const now = Date.now();

      accumulatedActiveMs.current +=
        now - activeStartedAt.current;

      activeStartedAt.current = now;
    };

    const sendReadEvent = () => {
      if (sentRead.current) {
        return;
      }

      updateActiveTime();

      sentRead.current = true;

      sendEvent(
        categoryId,
        "read",
        categoryUrl,
        {
          readPercentage:
            maxScroll.current,

          durationSeconds:
            Math.round(
              accumulatedActiveMs.current /
                1000
            ),
        }
      );
    };

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

      for (
        const milestone of
        SCROLL_MILESTONES
      ) {
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
            categoryId,
            "scroll",
            categoryUrl,
            {
              percentage: milestone,
              maxScroll:
                maxScroll.current,
            }
          );
        }
      }

      if (
        percentage >= 75 &&
        !sentRead.current
      ) {
        sendReadEvent();
      }
    };

    const handleVisibilityChange = () => {
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

      window.clearInterval(interval);
    };
  }, [categoryId, categoryUrl]);

  return null;
}