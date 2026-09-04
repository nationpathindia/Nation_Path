"use client";

import Link from "next/link";
import { useState } from "react";

interface Props {
  posts: any[];
  deletePost: (id: string) => void;
}

export default function PostsMobileCards({
  posts,
  deletePost,
}: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  function statusStyle(status: string) {
    if (status === "approved")
      return "bg-green-500/20 text-green-300";

    if (status === "pending")
      return "bg-yellow-500/20 text-yellow-300";

    if (status === "draft")
      return "bg-slate-500/20 text-slate-300";

    return "bg-white/10 text-gray-300";
  }

  function intel(post: any) {
    const fields = [
      "shortBrief",
      "background",
      "timeline",
      "expertOpinion",
      "factCheck",
      "whatsNext",
      "keyTakeaways",
      "sourceDesk",
    ];

    return fields.filter(
      (field) =>
        post[field] &&
        (Array.isArray(post[field])
          ? post[field].length
          : true)
    ).length;
  }

  function getArticleUrl(post: any) {
    if (!post.slug || !post.category?.slug) {
      return null;
    }

    return `https://www.nationpathindia.com/${post.category.slug}/${post.slug}`;
  }

  async function copyArticleLink(post: any) {
    const url = getArticleUrl(post);

    if (!url) {
      console.error("ARTICLE URL ERROR", {
        id: post.id,
        slug: post.slug,
        category: post.category,
      });

      return;
    }

    try {
      await navigator.clipboard.writeText(url);

      setCopiedId(post.id);

      setTimeout(() => {
        setCopiedId(null);
      }, 1500);
    } catch (error) {
      console.error("COPY LINK ERROR", error);
    }
  }

  return (
    <div
      className="
        md:hidden
        space-y-3
      "
    >
      {posts.map((post) => {
        const articleUrl = getArticleUrl(post);

        return (
          <div
            key={post.id}
            className="
              bg-black/30
              backdrop-blur-xl
              border
              border-white/10
              rounded-xl
              p-3
            "
          >
            <div
              className="
                flex
                justify-between
                gap-3
              "
            >
              <h3
                className="
                  text-sm
                  font-semibold
                  text-white
                  line-clamp-2
                  leading-snug
                "
              >
                {post.title}
              </h3>

              <span
                className="
                  text-[10px]
                  text-orange-400
                  font-semibold
                  whitespace-nowrap
                "
              >
                Intel {intel(post)}/8
              </span>
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                mt-2
                text-[11px]
                text-gray-400
                flex-wrap
              "
            >
              <span>
                {post.category?.name || "General"}
              </span>

              <span>•</span>

              <span>
                {post.createdAt
                  ? new Date(
                      post.createdAt
                    ).toLocaleDateString()
                  : ""}
              </span>

              <span>•</span>

              <span
                className="
                  text-gray-300
                  font-medium
                  whitespace-nowrap
                "
              >
                👁{" "}
                {Number(
                  post.views || 0
                ).toLocaleString()}
              </span>
            </div>

            <div
              className="
                flex
                gap-2
                flex-wrap
                mt-3
              "
            >
              <span
                className={`
                  px-2
                  py-1
                  rounded-md
                  text-[10px]
                  ${
                    post.isEditorial
                      ? "bg-purple-500/20 text-purple-300"
                      : "bg-blue-500/20 text-blue-300"
                  }
                `}
              >
                {post.isEditorial
                  ? "Editorial"
                  : "News"}
              </span>

              <span
                className={`
                  px-2
                  py-1
                  rounded-md
                  text-[10px]
                  ${statusStyle(post.status)}
                `}
              >
                {post.status}
              </span>

              {post.breaking && (
                <span
                  className="
                    px-2
                    py-1
                    rounded-md
                    text-[10px]
                    bg-orange-500/20
                    text-orange-300
                  "
                >
                  🔥 Breaking
                </span>
              )}

              {post.featured && (
                <span
                  className="
                    px-2
                    py-1
                    rounded-md
                    text-[10px]
                    bg-yellow-500/20
                    text-yellow-300
                  "
                >
                  ⭐ Featured
                </span>
              )}

              {post.flash && (
                <span
                  className="
                    px-2
                    py-1
                    rounded-md
                    text-[10px]
                    bg-blue-500/20
                    text-blue-300
                  "
                >
                  ⚡ Flash
                </span>
              )}
            </div>

            <div
              className="
                flex
                gap-2
                flex-wrap
                mt-4
              "
            >
              <Link
                href={`/admin/posts/edit/${post.id}`}
                className="
                  px-3
                  py-1.5
                  rounded-lg
                  bg-[#163C80]
                  text-[11px]
                  font-semibold
                "
              >
                Edit
              </Link>

              {articleUrl ? (
                <Link
                  href={articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    px-3
                    py-1.5
                    rounded-lg
                    bg-green-600/80
                    text-[11px]
                    font-semibold
                  "
                >
                  View
                </Link>
              ) : (
                <span
                  className="
                    px-3
                    py-1.5
                    rounded-lg
                    bg-gray-600/50
                    text-gray-400
                    text-[11px]
                    font-semibold
                    cursor-not-allowed
                  "
                >
                  View
                </span>
              )}

              <button
                type="button"
                onClick={() =>
                  copyArticleLink(post)
                }
                disabled={!articleUrl}
                className="
                  px-3
                  py-1.5
                  rounded-lg
                  bg-white/10
                  hover:bg-white/20
                  text-[11px]
                  font-semibold
                  transition
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                "
              >
                {copiedId === post.id
                  ? "Copied ✓"
                  : "Copy Link"}
              </button>

              <button
                onClick={() =>
                  deletePost(post.id)
                }
                className="
                  px-3
                  py-1.5
                  rounded-lg
                  bg-red-600/80
                  text-[11px]
                  font-semibold
                "
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}