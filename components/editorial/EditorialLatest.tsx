"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface EditorialLatestProps {
  articles: any[];
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

function getDate(article: any) {
  const date = article?.publishedAt || article?.createdAt;

  if (!date) {
    return "";
  }

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function EditorialLatest({
  articles,
}: EditorialLatestProps) {
  if (!articles?.length) {
    return null;
  }

  return (
    <section className="space-y-6">
      {/* SECTION HEADER */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-black/10
          pb-4
        "
      >
        <div className="flex items-center gap-3">
          <span
            className="
              h-1
              w-8
              rounded-full
              bg-[#EA661B]
            "
          />

          <h2
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.25em]
              text-[#163C80]
            "
          >
            Latest Insights
          </h2>
        </div>

        <span
          className="
            text-xs
            text-gray-400
          "
        >
          {articles.length} stories
        </span>
      </div>

      {/* ARTICLES */}

      <div className="space-y-5">
        {articles.map((article, index) => {
          const image = getImage(article);

          return (
            <motion.article
              key={article.id}
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.35,
                delay: Math.min(index * 0.04, 0.25),
              }}
              className="
                group
                border-b
                border-black/10
                pb-5
                last:border-b-0
              "
            >
              <Link
                href={`/editorial/${article.slug}`}
                className="
                  grid
                  grid-cols-1
                  gap-4
                  sm:grid-cols-[180px_minmax(0,1fr)]
                "
              >
                {/* IMAGE */}

                {image ? (
                  <div
                    className="
                      relative
                      aspect-[16/10]
                      overflow-hidden
                      rounded-xl
                      bg-gray-100
                      sm:aspect-[16/10]
                    "
                  >
                    <Image
                      src={image}
                      alt={article.title}
                      fill
                      className="
                        object-cover
                        transition
                        duration-500
                        group-hover:scale-[1.03]
                      "
                    />
                  </div>
                ) : (
                  <div
                    className="
                      flex
                      aspect-[16/10]
                      items-center
                      justify-center
                      rounded-xl
                      bg-gray-100
                      text-xs
                      font-medium
                      uppercase
                      tracking-wider
                      text-gray-400
                    "
                  >
                    NationPath Insight
                  </div>
                )}

                {/* CONTENT */}

                <div className="flex flex-col justify-center">
                  <p
                    className="
                      mb-2
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-[#EA661B]
                    "
                  >
                    Insight
                  </p>

                  <h3
                    className="
                      text-lg
                      font-bold
                      leading-snug
                      tracking-tight
                      text-gray-950
                      transition
                      group-hover:text-[#163C80]
                      sm:text-xl
                    "
                  >
                    {article.title}
                  </h3>

                  {article.excerpt && (
                    <p
                      className="
                        mt-2
                        line-clamp-2
                        text-sm
                        leading-6
                        text-gray-600
                      "
                    >
                      {article.excerpt}
                    </p>
                  )}

                  <div
                    className="
                      mt-3
                      flex
                      flex-wrap
                      items-center
                      gap-3
                      text-xs
                      text-gray-500
                    "
                  >
                    <span>
                      {getDate(article)}
                    </span>

                    {typeof article.views === "number" &&
                      article.views > 0 && (
                        <>
                          <span className="text-gray-300">
                            |
                          </span>

                          <span>
                            {article.views.toLocaleString("en-IN")} views
                          </span>
                        </>
                      )}
                  </div>
                </div>
              </Link>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}