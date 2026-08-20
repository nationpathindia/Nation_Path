"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

interface EditorialSidebarProps {
  mostRead: any[];
}

function getImage(article: any) {
  const gallery = Array.isArray(article?.imageGallery)
    ? article.imageGallery
    : [];

  return (
    gallery.find((image: any) => image?.isPrimary)?.url ||
    gallery[0]?.url ||
    article?.images?.[0] ||
    null
  );
}

export default function EditorialSidebar({
  mostRead,
}: EditorialSidebarProps) {
  if (!mostRead?.length) {
    return null;
  }

  return (
    <aside className="lg:sticky lg:top-24">
      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-black/10
          bg-white
        "
      >
        {/* HEADER */}

        <div
          className="
            border-b
            border-black/10
            px-5
            py-4
          "
        >
          <div className="flex items-center gap-3">
            <span
              className="
                h-1
                w-7
                rounded-full
                bg-[#EA661B]
              "
            />

            <h2
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.22em]
                text-[#163C80]
              "
            >
              Most Read
            </h2>
          </div>

          <p
            className="
              mt-2
              text-xs
              leading-5
              text-gray-500
            "
          >
            The most-read stories from NationPath Insight.
          </p>
        </div>

        {/* STORIES */}

        <div className="divide-y divide-black/10">
          {mostRead.map((article, index) => {
            const image = getImage(article);

            return (
              <motion.article
                key={article.id}
                initial={{
                  opacity: 0,
                  x: 8,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.04,
                }}
              >
                <Link
                  href={`/editorial/${article.slug}`}
                  className="
                    group
                    flex
                    gap-3
                    p-4
                    transition
                    hover:bg-gray-50
                  "
                >
                  {/* NUMBER */}

                  <div
                    className="
                      flex
                      w-6
                      shrink-0
                      items-start
                      justify-center
                    "
                  >
                    <span
                      className="
                        text-lg
                        font-bold
                        leading-none
                        text-[#EA661B]
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* IMAGE */}

                  {image && (
                    <div
                      className="
                        relative
                        h-16
                        w-20
                        shrink-0
                        overflow-hidden
                        rounded-lg
                        bg-gray-100
                      "
                    >
                      <Image
                        src={image}
                        alt={article.title}
                        fill
                        className="
                          object-cover
                          transition
                          duration-300
                          group-hover:scale-105
                        "
                      />
                    </div>
                  )}

                  {/* CONTENT */}

                  <div className="min-w-0 flex-1">
                    <p
                      className="
                        line-clamp-2
                        text-sm
                        font-semibold
                        leading-5
                        text-gray-900
                        transition
                        group-hover:text-[#163C80]
                      "
                    >
                      {article.title}
                    </p>

                    {typeof article.views === "number" &&
                      article.views > 0 && (
                        <div
                          className="
                            mt-2
                            flex
                            items-center
                            gap-1
                            text-[11px]
                            text-gray-400
                          "
                        >
                          <Eye size={12} />

                          <span>
                            {article.views.toLocaleString("en-IN")}
                          </span>

                          <span>views</span>
                        </div>
                      )}
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </section>
    </aside>
  );
}