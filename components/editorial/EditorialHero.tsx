"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface EditorialHeroProps {
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
    month: "short",
    year: "numeric",
  });
}

export default function EditorialHero({
  articles,
}: EditorialHeroProps) {
  if (!articles?.length) {
    return null;
  }

  const featured = articles[0];
  const secondary = articles.slice(1, 4);

  const featuredImage = getImage(featured);

  return (
    <section className="space-y-6">
      {/* SECTION LABEL */}

      <div className="flex items-center gap-3">
        <span className="h-1 w-8 rounded-full bg-[#EA661B]" />

        <h2
          className="
            text-xs
            font-bold
            uppercase
            tracking-[0.25em]
            text-[#163C80]
          "
        >
          Featured Insights
        </h2>
      </div>

      {/* FEATURED STORY */}

      <motion.article
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
        }}
        className="
          overflow-hidden
          rounded-2xl
          border
          border-black/10
          bg-white
        "
      >
        <Link
          href={`/editorial/${featured.slug}`}
          className="group block"
        >
          {featuredImage && (
            <div
              className="
                relative
                aspect-[16/8]
                overflow-hidden
                bg-gray-100
              "
            >
              <Image
                src={featuredImage}
                alt={featured.title}
                fill
                priority
                className="
                  object-cover
                  transition
                  duration-500
                  group-hover:scale-[1.02]
                "
              />

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  h-32
                  bg-gradient-to-t
                  from-black/70
                  to-transparent
                "
              />
            </div>
          )}

          <div className="p-5 sm:p-6">
            <p
              className="
                mb-3
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#EA661B]
              "
            >
              NationPath Insight
            </p>

            <h3
              className="
                max-w-4xl
                text-2xl
                font-bold
                leading-tight
                tracking-tight
                text-gray-950
                transition
                group-hover:text-[#163C80]
                sm:text-3xl
                lg:text-4xl
              "
            >
              {featured.title}
            </h3>

            {featured.excerpt && (
              <p
                className="
                  mt-3
                  max-w-3xl
                  text-sm
                  leading-6
                  text-gray-600
                  sm:text-base
                "
              >
                {featured.excerpt}
              </p>
            )}

            <div
              className="
                mt-4
                flex
                flex-wrap
                items-center
                gap-3
                text-xs
                text-gray-500
              "
            >
              <span>
                {getDate(featured)}
              </span>

              {typeof featured.views === "number" &&
                featured.views > 0 && (
                  <>
                    <span className="text-gray-300">
                      |
                    </span>

                    <span>
                      {featured.views.toLocaleString("en-IN")} views
                    </span>
                  </>
                )}
            </div>
          </div>
        </Link>
      </motion.article>

      {/* SECONDARY STORIES */}

      {secondary.length > 0 && (
        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {secondary.map((article, index) => {
            const image = getImage(article);

            return (
              <motion.article
                key={article.id}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
                className="
                  overflow-hidden
                  rounded-xl
                  border
                  border-black/10
                  bg-white
                "
              >
                <Link
                  href={`/editorial/${article.slug}`}
                  className="group block"
                >
                  {image && (
                    <div
                      className="
                        relative
                        aspect-[16/9]
                        overflow-hidden
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
                          duration-500
                          group-hover:scale-[1.03]
                        "
                      />
                    </div>
                  )}

                  <div className="p-4">
                    <p
                      className="
                        mb-2
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.18em]
                        text-[#EA661B]
                      "
                    >
                      Insight
                    </p>

                    <h3
                      className="
                        text-base
                        font-bold
                        leading-snug
                        text-gray-950
                        transition
                        group-hover:text-[#163C80]
                      "
                    >
                      {article.title}
                    </h3>

                    <div
                      className="
                        mt-3
                        text-xs
                        text-gray-500
                      "
                    >
                      {getDate(article)}
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      )}
    </section>
  );
}