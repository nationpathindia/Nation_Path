"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { cloudinaryImageUrl } from "@/lib/cloudinary-image";

interface EditorialLatestProps {
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
    gallery.find((image: any) => image?.isPrimary)?.url ||
    gallery[0]?.url ||
    article?.images?.[0] ||
    null
  );
}

/* =====================================================
   DELIVERY IMAGE
   - Cloudinary → optimized transformation
   - R2 → original public URL
===================================================== */

function getDeliveryImage(article: any): string | null {
  const image = getImage(article);

  if (!image) {
    return null;
  }

  return cloudinaryImageUrl(image, 700);
}

/* =====================================================
   DATE
===================================================== */

function getDate(article: any): string {
  const date = article?.publishedAt || article?.createdAt;

  if (!date) {
    return "";
  }

  try {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
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

export default function EditorialLatest({
  articles,
}: EditorialLatestProps) {
  if (!Array.isArray(articles) || articles.length === 0) {
    return null;
  }

  return (
    <section className="space-y-7">
      {/* =================================================
          SECTION HEADER
      ================================================= */}

      <div
        className="
          flex
          items-end
          justify-between
          gap-4
          border-b
          border-black/10
          pb-4
        "
      >
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

          <div>
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

            <p
              className="
                mt-1
                hidden
                text-[11px]
                text-gray-400
                sm:block
              "
            >
              Analysis, perspective and editorial viewpoints
            </p>
          </div>
        </div>

        <span
          className="
            shrink-0
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.16em]
            text-gray-400
          "
        >
          {articles.length}{" "}
          {articles.length === 1 ? "Story" : "Stories"}
        </span>
      </div>

      {/* =================================================
          ARTICLE LIST
      ================================================= */}

      <div className="space-y-0">
        {articles.map((article, index) => {
          const image = getDeliveryImage(article);

          return (
            <motion.article
              key={
                article?.id ||
                article?.slug ||
                `editorial-latest-${index}`
              }
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
                ease: "easeOut",
              }}
              className="
                group
                border-b
                border-black/10
                py-5
                first:pt-0
                last:border-b-0
                last:pb-0
              "
            >
              <Link
                href={`/editorial/${article.slug}`}
                className="
                  grid
                  grid-cols-[110px_minmax(0,1fr)]
                  gap-4
                  sm:grid-cols-[190px_minmax(0,1fr)]
                  sm:gap-5
                  lg:grid-cols-[220px_minmax(0,1fr)]
                "
              >
                {/* =================================================
                    IMAGE
                ================================================= */}

                {image ? (
                  <div
                    className="
                      relative
                      aspect-[16/10]
                      overflow-hidden
                      rounded-xl
                      bg-gray-100
                      ring-1
                      ring-black/5
                    "
                  >
                    <Image
                      src={image}
                      alt={
                        article.title ||
                        "NationPath Insight"
                      }
                      fill
                      sizes="
                        (max-width: 640px) 110px,
                        (max-width: 1024px) 190px,
                        220px
                      "
                      className="
                        object-cover
                        transition-transform
                        duration-600
                        ease-out
                        group-hover:scale-[1.045]
                      "
                    />

                    <div
                      aria-hidden="true"
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/20
                        via-transparent
                        to-transparent
                        opacity-70
                      "
                    />

                    <span
                      className="
                        absolute
                        left-2.5
                        top-2.5
                        rounded-full
                        bg-white/90
                        px-2
                        py-1
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.14em]
                        text-[#163C80]
                        backdrop-blur-sm
                        sm:left-3
                        sm:top-3
                        sm:px-2.5
                      "
                    >
                      Insight
                    </span>
                  </div>
                ) : (
                  <div
                    className="
                      flex
                      aspect-[16/10]
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#F5F4F0]
                      px-3
                      text-center
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.14em]
                      text-gray-400
                      ring-1
                      ring-black/5
                    "
                  >
                    NationPath
                    <br />
                    Insight
                  </div>
                )}

                {/* =================================================
                    CONTENT
                ================================================= */}

                <div
                  className="
                    flex
                    min-w-0
                    flex-col
                    justify-center
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <span
                      className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-[#EA661B]
                      "
                    />

                    <p
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-[#EA661B]
                      "
                    >
                      Editorial Insight
                    </p>
                  </div>

                  <h3
                    className="
                      mt-2
                      line-clamp-3
                      text-base
                      font-bold
                      leading-snug
                      tracking-tight
                      text-gray-950
                      transition-colors
                      duration-300
                      group-hover:text-[#163C80]
                      sm:text-xl
                      sm:leading-snug
                    "
                  >
                    {article.title}
                  </h3>

                  {article.excerpt && (
                    <p
                      className="
                        mt-2
                        hidden
                        line-clamp-2
                        text-sm
                        leading-6
                        text-gray-600
                        sm:block
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
                      gap-x-3
                      gap-y-1.5
                      text-[10px]
                      text-gray-500
                      sm:text-xs
                    "
                  >
                    {getDate(article) && (
                      <span>
                        {getDate(article)}
                      </span>
                    )}

                    {getViews(article) && (
                      <>
                        <span
                          aria-hidden="true"
                          className="text-gray-300"
                        >
                          •
                        </span>

                        <span>
                          {getViews(article)} views
                        </span>
                      </>
                    )}

                    <span
                      className="
                        ml-auto
                        hidden
                        font-semibold
                        text-[#163C80]
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                        group-hover:text-[#EA661B]
                        sm:inline-flex
                      "
                    >
                      Read →
                    </span>
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