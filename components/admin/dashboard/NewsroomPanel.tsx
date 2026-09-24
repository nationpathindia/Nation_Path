"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Eye,
  Share2,
} from "lucide-react";

interface Article {
  id: string;
  title: string;
  slug: string;
  views: number;
  status: string;
  createdAt: string;
  publishedAt?: string | null;
  featured?: boolean;
  breaking?: boolean;
  isEditorial?: boolean;
  primaryImage?: string | null;

  category?: {
    name?: string | null;
    slug?: string | null;
  } | null;

  author?: {
    name?: string | null;
  } | null;
}

interface Props {
  latest: Article[];
}

const PER_PAGE = 5;
const MAX_ARTICLES = 30;

export default function NewsroomPanel({ latest }: Props) {
  const [page, setPage] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  /*
   * Dashboard API already returns the latest 30 approved articles.
   * No new API / no backend change.
   */
  const articles = useMemo(
    () => (latest || []).slice(0, MAX_ARTICLES),
    [latest]
  );

  const totalArticles = articles.length;

  const totalPages = Math.max(
    1,
    Math.ceil(totalArticles / PER_PAGE)
  );

  /*
   * Keep page valid if data changes.
   */
  useEffect(() => {
    setPage((current) =>
      Math.min(Math.max(current, 1), totalPages)
    );
  }, [totalPages]);

  const safePage = Math.min(
    Math.max(page, 1),
    totalPages
  );

  const pageStart = (safePage - 1) * PER_PAGE;

  const pageArticles = articles.slice(
    pageStart,
    pageStart + PER_PAGE
  );

  const featuredArticle = pageArticles[0] || null;
  const sideArticles = pageArticles.slice(1, 5);

  function getArticleUrl(article: Article) {
    if (!article?.slug) {
      return null;
    }

    if (article.isEditorial) {
      return `https://www.nationpathindia.com/editorial/${article.slug}`;
    }

    const categorySlug = article.category?.slug;

    if (!categorySlug) {
      return null;
    }

    return `https://www.nationpathindia.com/${categorySlug}/${article.slug}`;
  }

  async function shareArticle(article: Article) {
    const url = getArticleUrl(article);

    if (!url) {
      return;
    }

    try {
      await navigator.clipboard.writeText(url);

      setCopiedId(article.id);

      window.setTimeout(() => {
        setCopiedId((current) =>
          current === article.id ? null : current
        );
      }, 1800);
    } catch (error) {
      console.error("COPY ARTICLE LINK ERROR", error);
    }
  }

  function formatPublishedDate(article: Article) {
    const value =
      article.publishedAt || article.createdAt;

    if (!value) {
      return "Published";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Published";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="admin-card overflow-hidden">
      {/* HEADER */}
      <div className="px-5 sm:px-6 py-5 border-b border-[var(--admin-border)]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--admin-success)] animate-pulse" />

              <h2 className="admin-section-title">
                Latest Published
              </h2>
            </div>

            <p className="admin-section-description mt-1">
              Latest approved stories from the newsroom.
            </p>
          </div>

          <div className="text-right">
            <div className="admin-metric text-lg">
              {totalArticles}
            </div>

            <div className="admin-small-text">
              Articles
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      {pageArticles.length === 0 ? (
        <div className="px-6 py-14 text-center">
          <p className="admin-body-text">
            No published articles found.
          </p>
        </div>
      ) : (
        <div className="p-4 sm:p-5">
          <div className="grid xl:grid-cols-[minmax(0,1.65fr)_minmax(340px,1fr)] gap-4">
            {/* FEATURED ARTICLE */}
            {featuredArticle && (
              <ArticleFeatureCard
                article={featuredArticle}
                copied={copiedId === featuredArticle.id}
                onShare={() =>
                  shareArticle(featuredArticle)
                }
                formatDate={() =>
                  formatPublishedDate(featuredArticle)
                }
                getArticleUrl={getArticleUrl}
              />
            )}

            {/* SIDE ARTICLES */}
            <div className="grid gap-3">
              {sideArticles.map((article) => (
                <ArticleCompactCard
                  key={article.id}
                  article={article}
                  copied={copiedId === article.id}
                  onShare={() => shareArticle(article)}
                  formatDate={() =>
                    formatPublishedDate(article)
                  }
                  getArticleUrl={getArticleUrl}
                />
              ))}
            </div>
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between gap-4 mt-5 pt-4 border-t border-[var(--admin-border)]">
              <button
                type="button"
                disabled={safePage === 1}
                onClick={() =>
                  setPage((current) =>
                    Math.max(1, current - 1)
                  )
                }
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  px-3
                  py-2
                  rounded-lg
                  border
                  border-[var(--admin-border)]
                  bg-white
                  text-xs
                  font-semibold
                  text-[var(--admin-text-secondary)]
                  hover:bg-[var(--admin-surface-hover)]
                  disabled:opacity-35
                  disabled:cursor-not-allowed
                  transition
                "
              >
                <ChevronLeft size={14} />
                Previous
              </button>

              <div className="flex items-center gap-2">
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() =>
                      setPage(pageNumber)
                    }
                    className={`
                      w-8
                      h-8
                      rounded-lg
                      text-xs
                      font-bold
                      transition
                      ${
                        pageNumber === safePage
                          ? "bg-[var(--admin-primary)] text-white shadow-sm"
                          : "bg-white border border-[var(--admin-border)] text-[var(--admin-text-secondary)] hover:bg-[var(--admin-surface-hover)]"
                      }
                    `}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>

              <button
                type="button"
                disabled={safePage === totalPages}
                onClick={() =>
                  setPage((current) =>
                    Math.min(
                      totalPages,
                      current + 1
                    )
                  )
                }
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  px-3
                  py-2
                  rounded-lg
                  border
                  border-[var(--admin-border)]
                  bg-white
                  text-xs
                  font-semibold
                  text-[var(--admin-text-secondary)]
                  hover:bg-[var(--admin-surface-hover)]
                  disabled:opacity-35
                  disabled:cursor-not-allowed
                  transition
                "
              >
                Next
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   FEATURED ARTICLE
========================================================= */

function ArticleFeatureCard({
  article,
  copied,
  onShare,
  formatDate,
  getArticleUrl,
}: {
  article: Article;
  copied: boolean;
  onShare: () => void;
  formatDate: () => string;
  getArticleUrl: (article: Article) => string | null;
}) {
  const articleUrl = getArticleUrl(article);

  return (
    <article className="group overflow-hidden rounded-2xl border border-[var(--admin-border)] bg-white">
      {/* IMAGE */}
      <div className="relative aspect-[16/8.5] overflow-hidden bg-[var(--admin-surface-soft)]">
        {article.primaryImage ? (
          <img
            src={article.primaryImage}
            alt={article.title || "Article image"}
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-[1.025]
            "
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Eye
              size={28}
              className="text-[var(--admin-text-muted)]"
            />
          </div>
        )}

        {/* IMAGE OVERLAY */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/65 to-transparent pointer-events-none" />

        {/* EDITORIAL / BREAKING INDICATOR */}
        <div className="absolute top-3 left-3 flex gap-2">
          {article.isEditorial && (
            <span className="px-2.5 py-1 rounded-full bg-[var(--admin-ai)] text-white text-[10px] font-bold">
              Editorial
            </span>
          )}

          {!article.isEditorial && article.breaking && (
            <span className="px-2.5 py-1 rounded-full bg-[var(--admin-danger)] text-white text-[10px] font-bold">
              Breaking
            </span>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-5">
        {/* CATEGORY + DATE */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
          <span className="text-[10px] uppercase tracking-[0.10em] font-bold text-[var(--admin-primary-dark)]">
            {article.isEditorial
              ? "Editorial"
              : article.category?.name || "General"}
          </span>

          <span className="text-[var(--admin-text-muted)]">
            •
          </span>

          <span className="text-[11px] text-[var(--admin-text-muted)]">
            {formatDate()}
          </span>
        </div>

        {/* HEADLINE */}
        {articleUrl ? (
          <Link
            href={articleUrl}
            target="_blank"
            className="block"
          >
            <h3 className="
              text-lg
              sm:text-xl
              font-bold
              leading-tight
              tracking-[-0.025em]
              text-[var(--admin-text)]
              group-hover:text-[var(--admin-primary-dark)]
              transition
            ">
              {article.title || "Untitled Article"}
            </h3>
          </Link>
        ) : (
          <h3 className="
            text-lg
            sm:text-xl
            font-bold
            leading-tight
            tracking-[-0.025em]
            text-[var(--admin-text)]
          ">
            {article.title || "Untitled Article"}
          </h3>
        )}

        {/* FOOTER */}
        <div className="flex items-center justify-between gap-3 mt-5 pt-4 border-t border-[var(--admin-border)]">
          <div className="inline-flex items-center gap-1.5 text-[var(--admin-text-secondary)]">
            <Eye
              size={15}
              strokeWidth={1.8}
            />

            <span className="text-xs font-bold tabular-nums">
              {Number(article.views || 0).toLocaleString(
                "en-IN"
              )}
            </span>

            <span className="text-[10px] text-[var(--admin-text-muted)]">
              views
            </span>
          </div>

          <ShareButton
            copied={copied}
            disabled={!articleUrl}
            onClick={onShare}
          />
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   COMPACT ARTICLE
========================================================= */

function ArticleCompactCard({
  article,
  copied,
  onShare,
  formatDate,
  getArticleUrl,
}: {
  article: Article;
  copied: boolean;
  onShare: () => void;
  formatDate: () => string;
  getArticleUrl: (article: Article) => string | null;
}) {
  const articleUrl = getArticleUrl(article);

  return (
    <article className="group flex gap-3 p-3 rounded-xl border border-[var(--admin-border)] bg-white hover:bg-[var(--admin-surface-hover)] transition">
      {/* IMAGE */}
      <div className="relative w-[112px] sm:w-[128px] shrink-0 aspect-[4/3] overflow-hidden rounded-lg bg-[var(--admin-surface-soft)]">
        {article.primaryImage ? (
          <img
            src={article.primaryImage}
            alt={article.title || "Article image"}
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              transition-transform
              duration-300
              group-hover:scale-[1.04]
            "
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Eye
              size={20}
              className="text-[var(--admin-text-muted)]"
            />
          </div>
        )}

        {article.breaking && !article.isEditorial && (
          <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-[var(--admin-danger)] text-white text-[8px] font-bold">
            BREAKING
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="min-w-0 flex-1 flex flex-col">
        {/* CATEGORY + DATE */}
        <div className="flex items-center gap-1.5 min-w-0 mb-1.5">
          <span className="text-[9px] uppercase tracking-[0.08em] font-bold text-[var(--admin-primary-dark)] truncate">
            {article.isEditorial
              ? "Editorial"
              : article.category?.name || "General"}
          </span>

          <span className="text-[var(--admin-text-muted)] shrink-0">
            •
          </span>

          <span className="text-[10px] text-[var(--admin-text-muted)] whitespace-nowrap">
            {formatDate()}
          </span>
        </div>

        {/* HEADLINE */}
        {articleUrl ? (
          <Link
            href={articleUrl}
            target="_blank"
            className="
              text-sm
              font-bold
              leading-[1.3]
              text-[var(--admin-text)]
              line-clamp-2
              group-hover:text-[var(--admin-primary-dark)]
              transition
            "
          >
            {article.title || "Untitled Article"}
          </Link>
        ) : (
          <div className="
            text-sm
            font-bold
            leading-[1.3]
            text-[var(--admin-text)]
            line-clamp-2
          ">
            {article.title || "Untitled Article"}
          </div>
        )}

        {/* FOOTER */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-2.5">
          <div className="inline-flex items-center gap-1 text-[var(--admin-text-secondary)]">
            <Eye
              size={13}
              strokeWidth={1.8}
            />

            <span className="text-[10px] font-bold tabular-nums">
              {Number(article.views || 0).toLocaleString(
                "en-IN"
              )}
            </span>

            <span className="text-[9px] text-[var(--admin-text-muted)]">
              views
            </span>
          </div>

          <ShareButton
            copied={copied}
            disabled={!articleUrl}
            onClick={onShare}
            compact
          />
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   SHARE BUTTON
========================================================= */

function ShareButton({
  copied,
  disabled,
  onClick,
  compact = false,
}: {
  copied: boolean;
  disabled: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={copied ? "Link copied" : "Share link"}
      aria-label={copied ? "Link copied" : "Share link"}
      className={`
        inline-flex
        items-center
        justify-center
        gap-1.5
        rounded-lg
        border
        transition
        shrink-0
        ${
          compact
            ? "w-7 h-7"
            : "px-3 py-2"
        }
        ${
          copied
            ? "border-[var(--admin-success)] bg-[var(--admin-success-soft)] text-[var(--admin-success)]"
            : "border-[var(--admin-border)] bg-white text-[var(--admin-text-secondary)] hover:border-[var(--admin-primary)] hover:bg-[var(--admin-primary-soft)] hover:text-[var(--admin-primary-dark)]"
        }
        disabled:opacity-30
        disabled:cursor-not-allowed
      `}
    >
      {copied ? (
        <Check
          size={compact ? 13 : 14}
          strokeWidth={2}
        />
      ) : (
        <Share2
          size={compact ? 13 : 14}
          strokeWidth={1.8}
        />
      )}

      {!compact && (
        <span className="text-xs font-semibold">
          Share Link
        </span>
      )}
    </button>
  );
}

