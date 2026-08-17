"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface UseAnalyticsAutoRefreshOptions {
  intervalMs?: number;
  enabled?: boolean;
}

interface UseAnalyticsAutoRefreshResult {
  isRefreshing: boolean;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
}

export function useAnalyticsAutoRefresh({
  intervalMs = 30_000,
  enabled = true,
}: UseAnalyticsAutoRefreshOptions = {}): UseAnalyticsAutoRefreshResult {
  const [isRefreshing, setIsRefreshing] =
    useState(false);

  const [lastUpdated, setLastUpdated] =
    useState<Date | null>(null);

  const mountedRef =
    useRef(true);

  const refresh = useCallback(
    async () => {
      if (!mountedRef.current) {
        return;
      }

      setIsRefreshing(true);

      try {
        /*
         * The actual dashboard fetch is intentionally
         * triggered by the page through a custom event.
         *
         * This keeps the hook independent from the
         * analytics API implementation.
         */

        window.dispatchEvent(
          new CustomEvent(
            "nationpath:analytics-refresh"
          )
        );

        if (mountedRef.current) {
          setLastUpdated(new Date());
        }
      } finally {
        if (mountedRef.current) {
          setIsRefreshing(false);
        }
      }
    },
    []
  );

  useEffect(() => {
    mountedRef.current = true;

    if (!enabled) {
      return () => {
        mountedRef.current = false;
      };
    }

    const timer =
      window.setInterval(() => {
        void refresh();
      }, intervalMs);

    return () => {
      mountedRef.current = false;

      window.clearInterval(timer);
    };
  }, [
    enabled,
    intervalMs,
    refresh,
  ]);

  return {
    isRefreshing,
    lastUpdated,
    refresh,
  };
}

