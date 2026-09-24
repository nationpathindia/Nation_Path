"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { cloudinaryImageUrl } from "@/lib/cloudinary-image";

interface EditorialHeroProps {
  articles: any[];
}

/* =====================================================
   IMAGE RESOLVER
===================================================== */

function getImage(article: any): string | null {
  const gallery = Array.isArray(article?.imageGallery)
    ? article.imageGallery
    : [];

  return (
    gallery.find(
      (image: any) =>
        image?.isPrimary &&
        typeof image?.url === "string" &&
        image.url.trim()
    )?.url ||
    gallery.find(
      (image: any) =>
        typeof image?.url === "string" &&
        image.url.trim()
    )?.url ||
    article?.images?.find(
      (image: any) =>
        typeof image === "string" &&
        image.trim()
    ) ||
    article?.primaryImage ||
    null
  );
}

/* =====================================================
   DELIVERY IMAGE

   Cloudinary → optimized Cloudinary delivery URL
   R2 → original public URL unchanged

   IMPORTANT:
   Native <img> is used below.
   No Next.js Image Optimization.
===================================================== */

function getDeliveryImage(
  article: any,
  width: number
): string | null {
  const image = getImage(article);

  if (!image) {
    return null;
  }

  return cloudinaryImageUrl(image, width);
}

/* =====================================================
   DATE
===================================================== */

function getDate(article: any): string {
  const date =
    article?.publishedAt ||
    article?.createdAt;

  if (!date) {
    return "";
  }

  try {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  } catch {
    return "";
  }
}

/* =====================================================
   VIEWS
===================================================== */

function getViews(article: any): string | null {
  if (
    typeof article?.views !== "number" ||
    article.views <= 0
  ) {
    return null;
  }

  return article.views.toLocaleString("en-IN");
}

/* =====================================================
   COMPONENT
===================================================== */

export default function EditorialHero({
  articles,
}: EditorialHeroProps) {
  if (
    !Array.isArray(articles) ||
    articles.length === 0
  ) {
    return null;
  }

  const featured = articles[0];
  const secondary = articles.slice(1, 4);

  const featuredImage =
    getDeliveryImage(
      featured,
      1200
    );

  return (
    <section className="space-y-7">
      {/* =================================================
          SECTION HEADER
      ================================================= */}

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
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
            Featured Insights
          </h2>
        </div>

        <span
          className="
            hidden
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-gray-400
            sm:block
          "
        >
          Editorial Desk
        </span>
      </div>

      {/* =================================================
          FEATURED STORY
      ================================================= */}

      <motion.article
        initial={{
          opacity: 0,
          y: 18,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
        className="
          group
          overflow-hidden
          rounded-2xl
          border
          border-black/10
          bg-white
          shadow-[0_8px_30px_rgba(0,0,0,0.05)]
        "
      >
        <Link
          href={`/editorial/${featured.slug}`}
          className="block"
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
              <img
                src={featuredImage}
                alt={
                  featured.title ||
                  "NationPath Featured Insight"
                }
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-[1.025]
                "
              />

              {/* Image depth */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/75
                  via-black/10
                  to-transparent
                "
              />

              {/* Editorial badge */}
              <div
                className="
                  absolute
                  left-5
                  top-5
                  rounded-full
                  border
                  border-white/30
                  bg-black/35
                  px-3
                  py-1.5
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-white
                  backdrop-blur-sm
                "
              >
                Featured Insight
              </div>

              {/* Image bottom metadata */}
              <div
                className="
                  absolute
                  bottom-5
                  left-5
                  right-5
                  flex
                  items-end
                  justify-between
                  gap-4
                "
              >
                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-white/80
                  "
                >
                  NationPath Editorial
                </span>

                {getDate(featured) && (
                  <span
                    className="
                      text-[10px]
                      font-medium
                      text-white/75
                    "
                  >
                    {getDate(featured)}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Featured content */}
          <div className="p-5 sm:p-7">
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
                max-w-5xl
                text-2xl
                font-bold
                leading-[1.12]
                tracking-tight
                text-gray-950
                transition-colors
                duration-300
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
                  mt-4
                  max-w-4xl
                  text-sm
                  leading-6
                  text-gray-600
                  sm:text-base
                  sm:leading-7
                "
              >
                {featured.excerpt}
              </p>
            )}

            <div
              className="
                mt-5
                flex
                flex-wrap
                items-center
                gap-3
                text-xs
                text-gray-500
              "
            >
              {!featuredImage &&
                getDate(featured) && (
                  <span>
                    {getDate(featured)}
                  </span>
                )}

              {getViews(featured) && (
                <>
                  {getDate(featured) &&
                    !featuredImage && (
                      <span
                        aria-hidden="true"
                        className="text-gray-300"
                      >
                        •
                      </span>
                    )}

                  <span>
                    {getViews(featured)} views
                  </span>
                </>
              )}

              <span
                className="
                  ml-auto
                  inline-flex
                  items-center
                  gap-2
                  font-semibold
                  text-[#163C80]
                "
              >
                Read Insight

                <span
                  aria-hidden="true"
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  →
                </span>
              </span>
            </div>
          </div>
        </Link>
      </motion.article>

      {/* =================================================
          SECONDARY STORIES
      ================================================= */}

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
          {secondary.map(
            (article, index) => {
              const image =
                getDeliveryImage(
                  article,
                  700
                );

              return (
                <motion.article
                  key={
                    article?.id ||
                    article?.slug ||
                    `editorial-${index}`
                  }
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
                    delay: index * 0.06,
                    ease: "easeOut",
                  }}
                  className="
                    group
                    overflow-hidden
                    rounded-xl
                    border
                    border-black/10
                    bg-white
                    shadow-[0_5px_20px_rgba(0,0,0,0.035)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                  "
                >
                  <Link
                    href={`/editorial/${article.slug}`}
                    className="block"
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
                        <img
                          src={image}
                          alt={
                            article.title ||
                            "NationPath Insight"
                          }
                          loading="lazy"
                          decoding="async"
                          className="
                            absolute
                            inset-0
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-600
                            ease-out
                            group-hover:scale-[1.04]
                          "
                        />

                        <div
                          aria-hidden="true"
                          className="
                            absolute
                            inset-x-0
                            bottom-0
                            h-20
                            bg-gradient-to-t
                            from-black/45
                            to-transparent
                          "
                        />

                        <span
                          className="
                            absolute
                            left-4
                            top-4
                            rounded-full
                            bg-white/90
                            px-2.5
                            py-1
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.16em]
                            text-[#163C80]
                            backdrop-blur-sm
                          "
                        >
                          Insight
                        </span>
                      </div>
                    )}

                    <div className="p-4 sm:p-5">
                      {!image && (
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
                      )}

                      <h3
                        className="
                          text-base
                          font-bold
                          leading-snug
                          text-gray-950
                          transition-colors
                          duration-300
                          group-hover:text-[#163C80]
                          sm:text-lg
                        "
                      >
                        {article.title}
                      </h3>

                      <div
                        className="
                          mt-3
                          flex
                          items-center
                          justify-between
                          gap-3
                          text-xs
                          text-gray-500
                        "
                      >
                        <span>
                          {getDate(article)}
                        </span>

                        <span
                          className="
                            font-semibold
                            text-[#163C80]
                            opacity-0
                            transition-opacity
                            duration-300
                            group-hover:opacity-100
                          "
                        >
                          Read →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            }
          )}
        </div>
      )}
    </section>
  );
}

