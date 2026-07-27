"use client";

import { useEffect, useRef } from "react";

interface AdProps {
  ad: {
    id: string;
    title?: string;
    type: "banner" | "adsense";
    imageUrl?: string;
    link?: string;
    adsenseCode?: string | null;
  } | null;
}

export default function AdBanner({ ad }: AdProps) {
  const impressionSent = useRef(false);

  // Send impression once
  useEffect(() => {
    if (!ad?.id || impressionSent.current) return;

    fetch("/api/ads/impression", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adId: ad.id }),
    }).catch(() => {});

    impressionSent.current = true;
  }, [ad?.id]);

  // Handle click tracking
  const handleClick = async () => {
    if (!ad?.id) return;

    try {
      await fetch("/api/ads/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adId: ad.id }),
      });
    } catch (error) {
      console.error("Ad click error:", error);
    }
  };

  if (!ad) return null;

  return (
    <div className="w-full flex justify-center my-16">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-10 text-center transition hover:shadow-xl">

        <span className="text-[10px] tracking-[3px] text-gray-400 uppercase block mb-6">
          Advertisement
        </span>

        {/* Banner Ad */}
        {ad.type === "banner" && ad.imageUrl && (
          <a
            href={ad.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="block"
          >
            <img
              src={ad.imageUrl}
              alt={ad.title || "Advertisement"}
              loading="lazy"
              className="mx-auto max-h-60 object-contain transition duration-300 hover:scale-105"
            />
          </a>
        )}

        {/* Adsense Ad */}
        {ad.type === "adsense" && ad.adsenseCode && (
          <div
            className="overflow-hidden"
            dangerouslySetInnerHTML={{ __html: ad.adsenseCode }}
          />
        )}
      </div>
    </div>
  );
}