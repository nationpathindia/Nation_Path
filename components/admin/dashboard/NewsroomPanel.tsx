"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, Copy, Check } from "lucide-react";

interface Props {
  latest: any[];
}

export default function NewsroomPanel({
  latest,
}: Props) {
  const [page, setPage] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const perPage = 5;

  const totalPages = Math.ceil(
    (latest?.length || 0) / perPage
  );

  const start = (page - 1) * perPage;

  const articles =
    latest?.slice(start, start + perPage) || [];

  function getArticleUrl(article: any) {
    const articleSlug = article.slug;

    if (!articleSlug) {
      return null;
    }

    const categorySlug = article.category?.slug;

    if (categorySlug) {
      return `https://www.nationpathindia.com/${categorySlug}/${articleSlug}`;
    }

    return `https://www.nationpathindia.com/${articleSlug}`;
  }

  async function copyArticleLink(article: any) {
    const articleUrl = getArticleUrl(article);

    if (!articleUrl) {
      console.error("ARTICLE SLUG MISSING", article);
      return;
    }

    try {
      await navigator.clipboard.writeText(articleUrl);

      setCopiedId(article.id);

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (error) {
      console.error("COPY ARTICLE LINK ERROR", error);
    }
  }

  return (
    <div
      className="
        bg-black/30
        backdrop-blur-xl
        border
        border-white/10
        rounded-2xl
        p-6
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          justify-between
          items-start
          mb-5
        "
      >
        <div>
          <h2
            className="
              text-lg
              font-semibold
            "
          >
            Newsroom Intelligence
          </h2>

          <p
            className="
              text-sm
              text-gray-400
              mt-1
            "
          >
            Latest publishing activity
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <span
            className="
              text-xs
              text-gray-400
            "
          >
            {latest?.length || 0} Articles
          </span>

          <Link
            href="/admin/posts/create"
            className="
              bg-[#EA661B]
              px-4
              py-2
              rounded-xl
              text-sm
              font-semibold
              hover:opacity-90
              transition
            "
          >
            + Article
          </Link>
        </div>
      </div>

      {/* TABLE */}

      <div
        className="
          overflow-hidden
          rounded-xl
          border
          border-white/10
        "
      >
        <table
          className="
            w-full
            text-sm
          "
        >
          <thead
            className="
              bg-white/5
            "
          >
            <tr
              className="
                text-gray-400
              "
            >
              <th className="text-left px-4 py-3">
                Article
              </th>

              <th className="text-left px-4 py-3">
                Category
              </th>

              <th className="text-left px-4 py-3">
                Status
              </th>

              <th className="text-right px-4 py-3">
                Views
              </th>

              <th className="text-right px-4 py-3">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {articles.map((article: any) => {
              const articleUrl = getArticleUrl(article);

              return (
                <tr
                  key={article.id}
                  className="
                    border-t
                    border-white/10
                    hover:bg-white/5
                    transition
                  "
                >
                  {/* ARTICLE */}

                  <td
                    className="
                      px-4
                      py-4
                      max-w-md
                    "
                  >
                    <Link
                      href={`/admin/posts/edit/${article.id}`}
                      className="
                        font-medium
                        line-clamp-1
                        hover:text-orange-400
                        transition
                      "
                    >
                      {article.title}
                    </Link>

                    <div className="flex gap-2 mt-2">
                      {article.breaking && (
                        <span
                          className="
                            text-[11px]
                            px-2
                            py-1
                            rounded-full
                            bg-red-500/20
                            text-red-400
                          "
                        >
                          Breaking
                        </span>
                      )}

                      {article.featured && (
                        <span
                          className="
                            text-[11px]
                            px-2
                            py-1
                            rounded-full
                            bg-orange-500/20
                            text-orange-400
                          "
                        >
                          Featured
                        </span>
                      )}
                    </div>
                  </td>

                  {/* CATEGORY */}

                  <td
                    className="
                      px-4
                      text-gray-300
                    "
                  >
                    {article.category?.name || "News"}
                  </td>

                  {/* STATUS */}

                  <td className="px-4">
                    <StatusBadge
                      status={article.status}
                    />
                  </td>

                  {/* VIEWS */}

                  <td
                    className="
                      px-4
                      text-right
                      text-gray-400
                    "
                  >
                    <div
                      className="
                        inline-flex
                        items-center
                        justify-end
                        gap-1.5
                      "
                    >
                      <Eye
                        size={14}
                        strokeWidth={1.8}
                        className="text-gray-500"
                      />

                      <span className="font-medium">
                        {Number(
                          article.views || 0
                        ).toLocaleString()}
                      </span>
                    </div>
                  </td>

                  {/* ACTIONS */}

                  <td
                    className="
                      px-4
                      text-right
                    "
                  >
                    <div
                      className="
                        flex
                        justify-end
                        items-center
                        gap-1.5
                      "
                    >
                      {/* VIEW */}

                      {articleUrl && (
                        <a
                          href={articleUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View article"
                          aria-label="View article"
                          className="
                            w-8
                            h-8
                            flex
                            items-center
                            justify-center
                            rounded-lg
                            bg-white/5
                            border
                            border-white/10
                            text-gray-400
                            hover:text-green-400
                            hover:bg-green-500/10
                            hover:border-green-500/20
                            transition
                          "
                        >
                          <Eye
                            size={15}
                            strokeWidth={1.8}
                          />
                        </a>
                      )}

                      {/* COPY LINK */}

                      <button
                        type="button"
                        onClick={() =>
                          copyArticleLink(article)
                        }
                        disabled={!articleUrl}
                        title={
                          copiedId === article.id
                            ? "Copied"
                            : "Copy link"
                        }
                        aria-label={
                          copiedId === article.id
                            ? "Copied"
                            : "Copy link"
                        }
                        className="
                          w-8
                          h-8
                          flex
                          items-center
                          justify-center
                          rounded-lg
                          bg-white/5
                          border
                          border-white/10
                          text-gray-400
                          hover:text-blue-400
                          hover:bg-blue-500/10
                          hover:border-blue-500/20
                          disabled:opacity-30
                          transition
                        "
                      >
                        {copiedId === article.id ? (
                          <Check
                            size={15}
                            strokeWidth={2}
                            className="text-green-400"
                          />
                        ) : (
                          <Copy
                            size={15}
                            strokeWidth={1.8}
                          />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}

      <div
        className="
          flex
          justify-between
          items-center
          mt-5
        "
      >
        <button
          disabled={page === 1}
          onClick={() =>
            setPage((current) =>
              Math.max(1, current - 1)
            )
          }
          className="
            px-4
            py-2
            rounded-lg
            bg-white/10
            disabled:opacity-30
            text-sm
            transition
          "
        >
          ← Previous
        </button>

        <div
          className="
            text-xs
            text-gray-400
          "
        >
          Page {page} / {totalPages || 1}
        </div>

        <button
          disabled={
            page === totalPages ||
            totalPages === 0
          }
          onClick={() =>
            setPage((current) =>
              Math.min(
                totalPages,
                current + 1
              )
            )
          }
          className="
            px-4
            py-2
            rounded-lg
            bg-white/10
            disabled:opacity-30
            text-sm
            transition
          "
        >
          Next →
        </button>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const styles: Record<string, string> = {
    approved:
      "bg-green-500/20 text-green-400",

    pending:
      "bg-yellow-500/20 text-yellow-400",

    draft:
      "bg-gray-500/20 text-gray-300",

    rejected:
      "bg-red-500/20 text-red-400",
  };

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-xs
        ${styles[status] || styles.draft}
      `}
    >
      {status}
    </span>
  );
}