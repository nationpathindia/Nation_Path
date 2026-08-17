"use client";

import {
  Facebook,
  Link as LinkIcon,
  MessageCircle,
  Twitter,
  Check,
} from "lucide-react";

import { useState } from "react";

interface ArticleShareBarProps {
  title: string;
  url: string;
  articleId?: string;
}

type ShareMethod =
  | "whatsapp"
  | "x"
  | "facebook"
  | "copy";

/*
|--------------------------------------------------------------------------
| ANALYTICS SESSION
|--------------------------------------------------------------------------
*/

function getAnalyticsSessionId(): string | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const key =
      "nationpath_analytics_session";

    const existing =
      sessionStorage.getItem(key);

    if (existing) {
      return existing;
    }

    const sessionId =
      typeof crypto !== "undefined" &&
      typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()
            .toString(36)
            .slice(2)}`;

    sessionStorage.setItem(
      key,
      sessionId
    );

    return sessionId;
  } catch {
    return undefined;
  }
}

/*
|--------------------------------------------------------------------------
| SHARE ANALYTICS
|--------------------------------------------------------------------------
*/

function trackShare(
  articleId: string | undefined,
  method: ShareMethod
) {
  if (!articleId) {
    return;
  }

  const payload = {
    eventType: "share",

    articleId,

    sessionId:
      getAnalyticsSessionId(),

    path:
      typeof window !== "undefined"
        ? window.location.pathname
        : undefined,

    source: "article_share",

    referrer:
      typeof document !== "undefined"
        ? document.referrer || undefined
        : undefined,

    metadata: {
      method,
    },
  };

  try {
    const body =
      JSON.stringify(payload);

    const blob = new Blob(
      [body],
      {
        type: "application/json",
      }
    );

    /*
    |--------------------------------------------------------------------------
    | SEND BEACON
    |--------------------------------------------------------------------------
    */

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

    /*
    |--------------------------------------------------------------------------
    | FETCH FALLBACK
    |--------------------------------------------------------------------------
    */

    void fetch(
      "/api/analytics/event",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body,

        keepalive: true,
      }
    ).catch(() => {});
  } catch {
    /*
    Analytics must never
    interfere with sharing.
    */
  }
}

/*
|--------------------------------------------------------------------------
| COMPONENT
|--------------------------------------------------------------------------
*/

export default function ArticleShareBar({
  title,
  url,
  articleId,
}: ArticleShareBarProps) {
  const [copied, setCopied] =
    useState(false);

  const encodedTitle =
    encodeURIComponent(title);

  const encodedUrl =
    encodeURIComponent(url);

  /*
  |--------------------------------------------------------------------------
  | COPY
  |--------------------------------------------------------------------------
  */

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        url
      );

      setCopied(true);

      trackShare(
        articleId,
        "copy"
      );

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | SHARE LINKS
  |--------------------------------------------------------------------------
  */

  const shareLinks = [
    {
      name: "WhatsApp",

      method:
        "whatsapp" as const,

      icon: MessageCircle,

      href:
        `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },

    {
      name: "X",

      method: "x" as const,

      icon: Twitter,

      href:
        `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },

    {
      name: "Facebook",

      method:
        "facebook" as const,

      icon: Facebook,

      href:
        `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <div
      className="
        flex
        items-center
        gap-2
      "
    >
      <span
        className="
          text-[10px]
          font-bold
          uppercase
          tracking-[0.25em]
          text-gray-500
        "
      >
        Share
      </span>

      {shareLinks.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${item.name}`}
            onClick={() => {
              trackShare(
                articleId,
                item.method
              );
            }}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              border
              border-black/10
              text-gray-500
              transition
              hover:border-[#163C80]
              hover:text-[#163C80]
            "
          >
            <Icon size={14} />
          </a>
        );
      })}

      <button
        onClick={copyLink}
        type="button"
        aria-label={
          copied
            ? "Link copied"
            : "Copy article link"
        }
        className="
          flex
          h-8
          items-center
          gap-1.5
          rounded-full
          border
          border-black/10
          px-3
          text-[11px]
          font-semibold
          text-gray-500
          transition
          hover:border-[#EA661B]
          hover:text-[#EA661B]
        "
      >
        {copied ? (
          <Check size={13} />
        ) : (
          <LinkIcon size={13} />
        )}

        {copied
          ? "Copied"
          : "Copy"}
      </button>
    </div>
  );
}