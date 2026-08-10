"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
} from "react";

interface AdType {
  id: string;

  type:
    | "image"
    | "adsense"
    | "script";

  imageUrl?: string;
  link?: string;
  adsenseCode?: string;
}

interface Props {
  placement: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdRenderer({
  placement,
}: Props) {
  const [ad, setAd] =
    useState<AdType | null>(null);

  const [visible, setVisible] =
    useState(false);

  const [loaded, setLoaded] =
    useState(false);

  const containerRef =
    useRef<HTMLDivElement | null>(null);

  const impressionSent =
    useRef<string | null>(null);

  const adsenseLoaded =
    useRef(false);

  /*
   * Keep existing ad slot dimensions
   * to prevent layout shifts.
   */
  function slotHeight() {
    if (
      placement.includes("top") ||
      placement.includes("header")
    ) {
      return "min-h-[90px]";
    }

    if (
      placement === "article_bottom"
    ) {
      return "";
    }

    return "min-h-[250px]";
  }

  /*
   * VISIBILITY OBSERVER
   *
   * Determines when the ad container
   * is close enough to the viewport.
   */
  useEffect(() => {
    const element =
      containerRef.current;

    if (!element) {
      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);

            observer.disconnect();
          }
        },
        {
          rootMargin: "300px",
          threshold: 0.01,
        }
      );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  /*
   * FETCH AD
   *
   * Ads are deliberately kept outside
   * the initial homepage critical path.
   *
   * homepage_top waits for browser idle
   * before requesting the ad.
   */
  useEffect(() => {
    if (!visible || !placement) {
      return;
    }

    const controller =
      new AbortController();

    let timeoutId:
      ReturnType<typeof setTimeout> | null =
      null;

    let idleId:
      number | null = null;

    const loadAd = async () => {
      try {
        const res =
          await fetch(
            `/api/ads/serve?placement=${encodeURIComponent(
              placement
            )}`,
            {
              signal:
                controller.signal,
              cache: "no-store",
            }
          );

        if (!res.ok) {
          throw new Error(
            `Ad request failed: ${res.status}`
          );
        }

        const data =
          await res.json();

        if (
          data?.success &&
          data?.ad
        ) {
          setAd(data.ad);
        }
      } catch (error: any) {
        if (
          error?.name !==
          "AbortError"
        ) {
          console.error(
            "Ad loading failed",
            error
          );
        }
      } finally {
        setLoaded(true);
      }
    };

    /*
     * TOP HOMEPAGE ADS
     *
     * Do not compete with initial
     * homepage rendering.
     */
    if (
      placement ===
        "homepage_top" &&
      typeof window !==
        "undefined" &&
      "requestIdleCallback" in
        window
    ) {
      idleId =
        window.requestIdleCallback(
          () => {
            loadAd();
          },
          {
            timeout: 4000,
          }
        );
    }

    /*
     * HEADER ADS
     */
    else if (
      placement.includes(
        "header"
      ) &&
      typeof window !==
        "undefined" &&
      "requestIdleCallback" in
        window
    ) {
      idleId =
        window.requestIdleCallback(
          () => {
            loadAd();
          },
          {
            timeout: 3000,
          }
        );
    }

    /*
     * OTHER ADS
     *
     * Load during browser idle time.
     */
    else if (
      typeof window !==
        "undefined" &&
      "requestIdleCallback" in
        window
    ) {
      idleId =
        window.requestIdleCallback(
          () => {
            loadAd();
          },
          {
            timeout: 2500,
          }
        );
    }

    /*
     * Browser fallback.
     */
    else {
      timeoutId =
        setTimeout(
          loadAd,
          placement ===
            "homepage_top"
            ? 4000
            : 1000
        );
    }

    return () => {
      controller.abort();

      if (
        timeoutId !== null
      ) {
        clearTimeout(
          timeoutId
        );
      }

      if (
        idleId !== null &&
        typeof window !==
          "undefined" &&
        "cancelIdleCallback" in
          window
      ) {
        window.cancelIdleCallback(
          idleId
        );
      }
    };
  }, [
    visible,
    placement,
  ]);

  /*
   * REAL IMPRESSION
   */
  useEffect(() => {
    if (
      !ad?.id ||
      !containerRef.current
    ) {
      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio >=
              0.5
          ) {
            const timer =
              setTimeout(() => {
                if (
                  impressionSent.current ===
                  ad.id
                ) {
                  return;
                }

                fetch(
                  "/api/ads/impression",
                  {
                    method:
                      "POST",
                    headers: {
                      "Content-Type":
                        "application/json",
                    },
                    body:
                      JSON.stringify(
                        {
                          adId:
                            ad.id,
                        }
                      ),
                    keepalive: true,
                  }
                ).catch(
                  () => {}
                );

                impressionSent.current =
                  ad.id;
              }, 1000);

            return () => {
              clearTimeout(timer);
            };
          }

          return undefined;
        },
        {
          threshold: 0.5,
        }
      );

    observer.observe(
      containerRef.current
    );

    return () => {
      observer.disconnect();
    };
  }, [ad]);

  /*
   * ADSENSE
   */
  useEffect(() => {
    if (
      ad?.type !==
      "adsense"
    ) {
      return;
    }

    if (
      adsenseLoaded.current
    ) {
      return;
    }

    /*
     * Let the ad DOM settle
     * before asking AdSense
     * to process it.
     */
    const timer =
      setTimeout(() => {
        try {
          window.adsbygoogle =
            window.adsbygoogle ||
            [];

          window.adsbygoogle.push(
            {}
          );

          adsenseLoaded.current =
            true;
        } catch {
          /*
           * AdSense can fail silently.
           */
        }
      }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [ad]);

  /*
   * AD CLICK
   */
  async function handleClick() {
    if (!ad?.id) {
      return;
    }

    try {
      await fetch(
        "/api/ads/click",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body:
            JSON.stringify({
              adId: ad.id,
            }),
          keepalive: true,
        }
      );

      if (ad.link) {
        window.open(
          ad.link,
          "_blank",
          "noopener,noreferrer"
        );
      }
    } catch {
      /*
       * Preserve destination
       * even if tracking fails.
       */
      if (ad.link) {
        window.open(
          ad.link,
          "_blank",
          "noopener,noreferrer"
        );
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className={`w-full flex justify-center overflow-hidden ${slotHeight()}`}
    >
      {!loaded && (
        <div
          className="
            w-full
            min-h-[90px]
            flex
            items-center
            justify-center
            text-xs
            text-gray-400
          "
        >
          Advertisement
        </div>
      )}

      {loaded && !ad && (
        <div
          className="
            w-full
            max-w-[970px]
            h-[90px]
            border
            border-dashed
            border-gray-300
            bg-gray-50
            rounded
            flex
            items-center
            justify-center
            text-gray-400
            text-xs
            tracking-[0.25em]
            uppercase
          "
        >
          Advertisement
        </div>
      )}

      {ad?.type === "image" &&
        ad.imageUrl && (
          <button
            type="button"
            onClick={handleClick}
            className="
              block
              max-w-full
              border-0
              bg-transparent
              p-0
            "
            aria-label="Advertisement"
          >
            <Image
              src={ad.imageUrl}
              alt="Advertisement"
              width={970}
              height={250}
              loading="lazy"
              sizes="
                (max-width: 640px) 100vw,
                (max-width: 1024px) 90vw,
                970px
              "
              className="
                rounded
                max-w-full
                h-auto
              "
            />
          </button>
        )}

      {ad?.type === "adsense" &&
        ad.adsenseCode && (
          <div
            className="
              w-full
              flex
              justify-center
            "
            dangerouslySetInnerHTML={{
              __html:
                ad.adsenseCode,
            }}
          />
        )}

      {ad?.type === "script" &&
        ad.adsenseCode && (
          <div
            className="w-full"
            dangerouslySetInnerHTML={{
              __html:
                ad.adsenseCode,
            }}
          />
        )}
    </div>
  );
}

