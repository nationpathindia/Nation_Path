"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cloudinaryImageUrl } from "@/lib/cloudinary-image";

interface ArticleRelatedProps {
  articles: any;
}

interface GalleryImage {
  url: string;
  alt?: string;
  caption?: string;
  isPrimary?: boolean;
}

/* =====================================================
   PRIMARY IMAGE

   Priority:
   1. Primary gallery image
   2. First valid gallery image
   3. First valid images[] entry
   4. primaryImage
===================================================== */

function getPrimaryImage(
  article: any,
): GalleryImage | null {
  const gallery: GalleryImage[] =
    Array.isArray(article?.imageGallery)
      ? article.imageGallery.filter(
          (image: GalleryImage) =>
            image &&
            typeof image.url === "string" &&
            image.url.trim().length > 0,
        )
      : [];

  const primary =
    gallery.find(
      (image) => image.isPrimary === true,
    ) || gallery[0];

  if (primary?.url) {
    return {
      ...primary,
      url: primary.url.trim(),
    };
  }

  if (Array.isArray(article?.images)) {
    const firstImage =
      article.images.find(
        (image: any) =>
          typeof image === "string" &&
          image.trim().length > 0,
      );

    if (firstImage) {
      return {
        url: firstImage.trim(),
        alt:
          typeof article?.primaryImageAlt === "string" &&
          article.primaryImageAlt.trim()
            ? article.primaryImageAlt.trim()
            : article?.title || "NationPath News",
      };
    }
  }

  if (
    typeof article?.primaryImage === "string" &&
    article.primaryImage.trim().length > 0
  ) {
    return {
      url: article.primaryImage.trim(),
      alt:
        typeof article?.primaryImageAlt === "string" &&
        article.primaryImageAlt.trim()
          ? article.primaryImageAlt.trim()
          : article?.title || "NationPath News",
    };
  }

  return null;
}

/* =====================================================
   IMAGE ALT
===================================================== */

function getImageAlt(
  article: any,
  primaryImage: GalleryImage | null,
): string {
  return (
    primaryImage?.alt?.trim() ||
    (typeof article?.primaryImageAlt === "string" &&
    article.primaryImageAlt.trim()
      ? article.primaryImageAlt.trim()
      : typeof article?.title === "string"
        ? article.title
        : "NationPath News")
  );
}

/* =====================================================
   DATE
===================================================== */

function getFormattedDate(article: any): string {
  const date =
    article?.publishedAt ||
    article?.createdAt;

  if (!date) {
    return "";
  }

  try {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      },
    );
  } catch {
    return "";
  }
}

/* =====================================================
   COMPONENT
===================================================== */

export default function ArticleRelated({
  articles,
}: ArticleRelatedProps) {
  if (
    !Array.isArray(articles) ||
    articles.length === 0
  ) {
    return null;
  }

  const relatedArticles =
    articles.slice(0, 6);

  return (
    <section
      className="
        mt-16
        border-t
        border-black/10
        pt-10
      "
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          mb-8
          flex
          items-end
          justify-between
          gap-4
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
                text-[10px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-[#163C80]
                sm:text-[11px]
              "
            >
              Related Stories
            </h2>

            <p
              className="
                mt-1.5
                hidden
                text-xs
                text-gray-400
                sm:block
              "
            >
              More stories you may want to explore
            </p>
          </div>
        </div>

        <span
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.15em]
            text-gray-400
          "
        >
          {relatedArticles.length} Stories
        </span>
      </div>

      {/* =================================================
          GRID
      ================================================= */}

      <div
        className="
          grid
          gap-x-6
          gap-y-9
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {relatedArticles.map(
          (article: any, index: number) => {
            const primaryImage =
              getPrimaryImage(article);

            /*
             * Cloudinary:
             *   Existing helper adds delivery transformation.
             *
             * R2:
             *   Public R2 URL remains unchanged.
             *
             * Native <img>:
             *   Direct browser delivery.
             *   No Vercel /_next/image request.
             */
            const imageSrc =
              primaryImage?.url
                ? cloudinaryImageUrl(
                    primaryImage.url,
                    640,
                  )
                : null;

            const categorySlug =
              typeof article?.category?.slug ===
              "string"
                ? article.category.slug
                : "";

            const articleSlug =
              typeof article?.slug === "string"
                ? article.slug
                : "";

            const articleUrl =
              categorySlug && articleSlug
                ? `/${categorySlug}/${articleSlug}`
                : null;

            const formattedDate =
              getFormattedDate(article);

            /*
             * Avoid rendering a broken navigation
             * card when a valid article URL is missing.
             */
            if (!articleUrl) {
              return null;
            }

            return (
              <article
                key={
                  article?.id ||
                  `${articleSlug}-${index}`
                }
                className="
                  group
                  min-w-0
                "
              >
                <Link
                  href={articleUrl}
                  className="block"
                >
                  {/* =================================================
                      IMAGE
                  ================================================= */}

                  {imageSrc ? (
                    <div
                      className="
                        relative
                        aspect-[16/9]
                        overflow-hidden
                        rounded-xl
                        bg-[#F5F4F0]
                        ring-1
                        ring-black/5
                      "
                    >
                      <img
                        src={imageSrc}
                        alt={getImageAlt(
                          article,
                          primaryImage,
                        )}
                        loading="lazy"
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
                          group-hover:scale-[1.045]
                        "
                      />

                      {/* Image overlay */}
                      <div
                        aria-hidden="true"
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/35
                          via-transparent
                          to-transparent
                          opacity-70
                          transition-opacity
                          duration-300
                          group-hover:opacity-90
                        "
                      />

                      {/* Category badge */}
                      <span
                        className="
                          absolute
                          left-3
                          top-3
                          rounded-full
                          border
                          border-white/25
                          bg-black/30
                          px-2.5
                          py-1
                          text-[8px]
                          font-bold
                          uppercase
                          tracking-[0.15em]
                          text-white
                          backdrop-blur-md
                        "
                      >
                        {article?.category?.name ||
                          "News"}
                      </span>

                      {/* Hover arrow */}
                      <span
                        className="
                          absolute
                          right-3
                          top-3
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-full
                          bg-white/90
                          text-[#163C80]
                          opacity-0
                          shadow-sm
                          transition-all
                          duration-300
                          group-hover:opacity-100
                        "
                      >
                        <ArrowUpRight
                          size={14}
                          strokeWidth={2}
                        />
                      </span>
                    </div>
                  ) : (
                    <div
                      className="
                        flex
                        aspect-[16/9]
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#F5F4F0]
                        ring-1
                        ring-black/5
                      "
                    >
                      <span
                        className="
                          text-center
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.18em]
                          text-gray-400
                        "
                      >
                        NationPath
                        <br />
                        News
                      </span>
                    </div>
                  )}

                  {/* =================================================
                      CONTENT
                  ================================================= */}

                  <div className="pt-4">
                    {/* Category */}
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <span
                        aria-hidden="true"
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
                          tracking-[0.25em]
                          text-[#EA661B]
                        "
                      >
                        {article?.category?.name ||
                          "News"}
                      </p>
                    </div>

                    {/* Title */}
                    <h3
                      className="
                        mt-2.5
                        line-clamp-3
                        text-lg
                        font-bold
                        leading-snug
                        tracking-tight
                        text-gray-950
                        transition-colors
                        duration-300
                        group-hover:text-[#163C80]
                        sm:text-xl
                      "
                    >
                      {article?.title}
                    </h3>

                    {/* Excerpt */}
                    {article?.excerpt && (
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

                    {/* Meta */}
                    {formattedDate && (
                      <div
                        className="
                          mt-4
                          flex
                          items-center
                          justify-between
                          gap-3
                          border-t
                          border-black/10
                          pt-3
                        "
                      >
                        <p
                          className="
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-[0.15em]
                            text-gray-400
                          "
                        >
                          {formattedDate}
                        </p>

                        <span
                          className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.12em]
                            text-[#163C80]
                            opacity-0
                            transition-all
                            duration-300
                            group-hover:translate-x-0.5
                            group-hover:opacity-100
                          "
                        >
                          Read →
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              </article>
            );
          },
        )}
      </div>
    </section>
  );
}

