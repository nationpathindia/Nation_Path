"use client";

import { useEffect, useRef, useState } from "react";

interface AdType {
  id: string;
  type: "image" | "adsense" | "script";
  imageUrl?: string;
  link?: string;
  adsenseCode?: string;
}

export default function AdRenderer({
  placement,
}: {
  placement: string;
}) {
  const [ad, setAd] = useState<AdType | null>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const impressionSent = useRef<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      {
        rootMargin: "200px",
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !placement) return;

    const fetchAd = async () => {
      try {
        const res = await fetch(
          `/api/ads/serve?placement=${placement}`,
          {
            cache: "no-store",
          }
        );

        const data = await res.json();

        if (data?.success && data?.ad) {
          setAd(data.ad);
        }

        setLoaded(true);
      } catch (err) {
        console.error(err);
        setLoaded(true);
      }
    };

    fetchAd();
  }, [visible, placement]);

  useEffect(() => {
    if (!ad?.id) return;

    if (impressionSent.current === ad.id) return;

    fetch("/api/ads/impression", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adId: ad.id,
      }),
    }).catch(() => {});

    impressionSent.current = ad.id;
  }, [ad]);

  const handleClick = async () => {
    if (!ad?.id) return;

    try {
      await fetch("/api/ads/click", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adId: ad.id,
        }),
      });

      if (ad.link) {
        window.open(ad.link, "_blank");
      }
    } catch {}
  };

  useEffect(() => {
    if (ad?.type !== "adsense") return;

    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [ad]);

  return (
    <div
      ref={containerRef}
      className="w-full flex justify-center"
    >
      {!loaded ? null : !ad ? (
        <div className="w-full max-w-[970px] h-[90px] border border-dashed border-gray-300 bg-gray-50 rounded flex items-center justify-center text-gray-400 text-xs tracking-[0.25em] uppercase">
          Advertisement
        </div>
      ) : ad.type === "image" && ad.imageUrl ? (
        <img
          src={ad.imageUrl}
          alt="Advertisement"
          onClick={handleClick}
          className="cursor-pointer rounded max-w-full h-auto"
        />
      ) : ad.type === "adsense" && ad.adsenseCode ? (
        <div
          dangerouslySetInnerHTML={{
            __html: ad.adsenseCode,
          }}
        />
      ) : ad.type === "script" && ad.adsenseCode ? (
        <div
          dangerouslySetInnerHTML={{
            __html: ad.adsenseCode,
          }}
        />
      ) : null}
    </div>
  );
}