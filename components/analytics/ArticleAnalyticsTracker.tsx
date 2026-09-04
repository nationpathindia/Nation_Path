"use client";

import {
  useEffect,
  useRef,
} from "react";

//////////////////////////////////////////////////////////////
//
// NATIONPATH ANALYTICS
// MASTER ANALYTICS TRACKER
//
// Supports:
// - Article
// - Editorial
// - Astro
// - Category
//
// Backend:
// - Content  → /api/analytics/event
// - Category → /api/analytics/category-event
//
// IMPORTANT:
// - One reusable tracker
// - No Prisma
// - No analytics calculations
// - SPA navigation safe
// - StrictMode safe
// - Analytics must never break UI
//
//////////////////////////////////////////////////////////////

type ArticleEventType =
  | "view"
  | "read"
  | "like"
  | "reaction"
  | "share"
  | "video_play"
  | "video_complete";

type CategoryEventType =
  | "view"
  | "open"
  | "read"
  | "scroll";

type ContentType =
  | "article"
  | "editorial"
  | "astro";

type AnalyticsTrackerProps =
  | {
      type: ContentType;
      articleId: string;
      articleUrl?: string;
    }
  | {
      type: "category";
      categoryId: string;
      categoryUrl?: string;
    };

const SESSION_KEY =
  "nationpath_analytics_session";

const READ_TIME_MS =
  15_000;

const READ_SCROLL_PERCENTAGE =
  50;

//////////////////////////////////////////////////////////////
// SESSION
//////////////////////////////////////////////////////////////

function getSessionId(): string {
  try {
    const existing =
      sessionStorage.getItem(
        SESSION_KEY
      );

    if (existing) {
      return existing;
    }

    const id =
      typeof crypto !==
        "undefined" &&
      typeof crypto.randomUUID ===
        "function"
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

//////////////////////////////////////////////////////////////
// EVENT SENDER
//////////////////////////////////////////////////////////////

function sendAnalyticsEvent(
  endpoint: string,
  payload: Record<
    string,
    unknown
  >
) {
  try {
    const body =
      JSON.stringify(payload);

    const blob =
      new Blob(
        [body],
        {
          type:
            "application/json",
        }
      );

    //////////////////////////////////////////////////////////
    // BEACON
    //////////////////////////////////////////////////////////

    if (
      typeof navigator !==
        "undefined" &&
      typeof navigator.sendBeacon ===
        "function"
    ) {
      const sent =
        navigator.sendBeacon(
          endpoint,
          blob
        );

      if (sent) {
        return;
      }
    }

    //////////////////////////////////////////////////////////
    // FETCH FALLBACK
    //////////////////////////////////////////////////////////

    void fetch(
      endpoint,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body,

        keepalive: true,

        credentials: "same-origin",
      }
    ).catch(() => {});
  } catch {
    //////////////////////////////////////////////////////////
    // Analytics is intentionally fail-safe.
    //////////////////////////////////////////////////////////
  }
}

//////////////////////////////////////////////////////////////
// CURRENT PATH
//////////////////////////////////////////////////////////////

function getCurrentPath():
  | string
  | undefined {
  if (
    typeof window ===
    "undefined"
  ) {
    return undefined;
  }

  return window.location.pathname;
}

//////////////////////////////////////////////////////////////
// REFERRER
//////////////////////////////////////////////////////////////

function getReferrer():
  | string
  | undefined {
  if (
    typeof document ===
    "undefined"
  ) {
    return undefined;
  }

  return (
    document.referrer ||
    undefined
  );
}

//////////////////////////////////////////////////////////////
// SOURCE
//////////////////////////////////////////////////////////////

function getSource(): string {
  if (
    typeof document ===
      "undefined" ||
    !document.referrer
  ) {
    return "direct";
  }

  return "referral";
}

//////////////////////////////////////////////////////////////
// CONTENT EVENT
//////////////////////////////////////////////////////////////

function sendContentEvent(
  contentType: ContentType,
  articleId: string,
  eventType: ArticleEventType,
  articleUrl?: string,
  metadata?: Record<
    string,
    unknown
  >
) {
  sendAnalyticsEvent(
    "/api/analytics/event",
    {
      eventType,

      articleId,

      sessionId:
        getSessionId(),

      path:
        getCurrentPath(),

      source:
        getSource(),

      referrer:
        getReferrer(),

      metadata: {
        contentType,

        articleUrl,

        ...metadata,
      },
    }
  );
}

//////////////////////////////////////////////////////////////
// CATEGORY EVENT
//////////////////////////////////////////////////////////////

function sendCategoryEvent(
  categoryId: string,
  eventType: CategoryEventType,
  categoryUrl?: string,
  metadata?: Record<
    string,
    unknown
  >
) {
  sendAnalyticsEvent(
    "/api/analytics/category-event",
    {
      eventType,

      categoryId,

      sessionId:
        getSessionId(),

      path:
        getCurrentPath(),

      source:
        getSource(),

      referrer:
        getReferrer(),

      metadata: {
        categoryUrl,

        ...metadata,
      },
    }
  );
}

//////////////////////////////////////////////////////////////
// SCROLL %
//////////////////////////////////////////////////////////////

function getScrollPercentage(): number {
  if (
    typeof window ===
    "undefined"
  ) {
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

  if (
    scrollableHeight <= 0
  ) {
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
      Math.round(
        percentage
      )
    )
  );
}

//////////////////////////////////////////////////////////////
// MASTER TRACKER
//////////////////////////////////////////////////////////////

export default function AnalyticsTracker(
  props: AnalyticsTrackerProps
) {
  ////////////////////////////////////////////////////////////
  // CONTENT STATE
  ////////////////////////////////////////////////////////////

  const accumulatedActiveMs =
    useRef<number>(0);

  const activeStartedAt =
    useRef<number>(0);

  const isActive =
    useRef<boolean>(false);

  const maxScroll =
    useRef<number>(0);

  const sentView =
    useRef<boolean>(false);

  const sentRead =
    useRef<boolean>(false);

  ////////////////////////////////////////////////////////////
  // TRACKING EFFECT
  ////////////////////////////////////////////////////////////

  useEffect(() => {
    //////////////////////////////////////////////////////////
    // RESET TRACKER STATE
    //
    // Critical for SPA navigation.
    //////////////////////////////////////////////////////////

    accumulatedActiveMs.current =
      0;

    activeStartedAt.current =
      Date.now();

    isActive.current =
      document.visibilityState ===
      "visible";

    maxScroll.current =
      0;

    sentView.current =
      false;

    sentRead.current =
      false;

    //////////////////////////////////////////////////////////
    // CATEGORY
    //////////////////////////////////////////////////////////

    if (
      props.type ===
      "category"
    ) {
      sendCategoryEvent(
        props.categoryId,
        "view",
        props.categoryUrl
      );

      ////////////////////////////////////////////////////////
      // CATEGORY SCROLL
      //
      // One scroll event once the user reaches 50%.
      ////////////////////////////////////////////////////////

      let sentCategoryScroll =
        false;

      const handleCategoryScroll =
        () => {
          const percentage =
            getScrollPercentage();

          if (
            percentage >=
              READ_SCROLL_PERCENTAGE &&
            !sentCategoryScroll
          ) {
            sentCategoryScroll =
              true;

            sendCategoryEvent(
              props.categoryId,
              "scroll",
              props.categoryUrl,
              {
                scrollPercentage:
                  percentage,
              }
            );
          }
        };

      window.addEventListener(
        "scroll",
        handleCategoryScroll,
        {
          passive: true,
        }
      );

      return () => {
        window.removeEventListener(
          "scroll",
          handleCategoryScroll
        );
      };
    }

    //////////////////////////////////////////////////////////
    // CONTENT
    //////////////////////////////////////////////////////////

    const {
      type,
      articleId,
      articleUrl,
    } = props;

    //////////////////////////////////////////////////////////
    // VIEW
    //////////////////////////////////////////////////////////

    if (
      !sentView.current
    ) {
      sentView.current =
        true;

      sendContentEvent(
        type,
        articleId,
        "view",
        articleUrl
      );
    }

    //////////////////////////////////////////////////////////
    // ACTIVE TIME
    //////////////////////////////////////////////////////////

    const updateActiveTime =
      () => {
        if (
          !isActive.current
        ) {
          return;
        }

        const now =
          Date.now();

        if (
          activeStartedAt.current >
          0
        ) {
          accumulatedActiveMs.current +=
            now -
            activeStartedAt.current;
        }

        activeStartedAt.current =
          now;
      };

    //////////////////////////////////////////////////////////
    // READ
    //////////////////////////////////////////////////////////

    const sendReadEvent =
      (
        trigger:
          | "time"
          | "scroll"
      ) => {
        if (
          sentRead.current
        ) {
          return;
        }

        updateActiveTime();

        sentRead.current =
          true;

        sendContentEvent(
          type,
          articleId,
          "read",
          articleUrl,
          {
            readPercentage:
              maxScroll.current,

            durationSeconds:
              Math.round(
                accumulatedActiveMs.current /
                  1000
              ),

            trigger,
          }
        );
      };

    //////////////////////////////////////////////////////////
    // SCROLL
    //////////////////////////////////////////////////////////

    const handleScroll =
      () => {
        const percentage =
          getScrollPercentage();

        if (
          percentage >
          maxScroll.current
        ) {
          maxScroll.current =
            percentage;
        }

        if (
          percentage >=
            READ_SCROLL_PERCENTAGE &&
          !sentRead.current
        ) {
          sendReadEvent(
            "scroll"
          );
        }
      };

    //////////////////////////////////////////////////////////
    // VISIBILITY
    //////////////////////////////////////////////////////////

    const handleVisibilityChange =
      () => {
        if (
          document.visibilityState ===
          "hidden"
        ) {
          updateActiveTime();

          isActive.current =
            false;

          return;
        }

        if (
          document.visibilityState ===
          "visible"
        ) {
          isActive.current =
            true;

          activeStartedAt.current =
            Date.now();
        }
      };

    //////////////////////////////////////////////////////////
    // ACTIVE READING TIMER
    //////////////////////////////////////////////////////////

    const interval =
      window.setInterval(
        () => {
          if (
            sentRead.current ||
            !isActive.current
          ) {
            return;
          }

          updateActiveTime();

          if (
            accumulatedActiveMs.current >=
            READ_TIME_MS
          ) {
            sendReadEvent(
              "time"
            );
          }
        },
        1_000
      );

    //////////////////////////////////////////////////////////
    // LISTENERS
    //////////////////////////////////////////////////////////

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

    //////////////////////////////////////////////////////////
    // CLEANUP
    //////////////////////////////////////////////////////////

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
  }, [
    props.type,
    props.type ===
    "category"
      ? props.categoryId
      : props.articleId,
    props.type ===
    "category"
      ? props.categoryUrl
      : props.articleUrl,
  ]);

  return null;
}