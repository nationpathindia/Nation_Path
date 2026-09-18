import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

import { cloudinaryImageUrl } from "@/lib/cloudinary-image";

interface ArticleNextStoryProps {
  article: any;
}

interface GalleryImage {
  url: string;
  alt?: string;
  caption?: string;
  isPrimary?: boolean;
}

/* =====================================================
   IMAGE RESOLVER
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
    return primary;
  }

  if (
    Array.isArray(article?.images) &&
    typeof article.images[0] === "string" &&
    article.images[0].trim().length > 0
  ) {
    return {
      url: article.images[0],
      alt: article?.title || "NationPath News",
    };
  }

  return null;
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
      },
    );
  } catch {
    return "";
  }
}

/* =====================================================
   COMPONENT
===================================================== */

export default function ArticleNextStory({
  article,
}: ArticleNextStoryProps) {
  if (!article) {
    return null;
  }

  /* =====================================================
     ARTICLE URL
  ===================================================== */

  const articleUrl =
    article?.category?.slug && article?.slug
      ? `/${article.category.slug}/${article.slug}`
      : null;

  if (!articleUrl) {
    return null;
  }

  /* =====================================================
     IMAGE
  ===================================================== */

  const primaryImage =
    getPrimaryImage(article);

  const imageSrc = primaryImage?.url
    ? cloudinaryImageUrl(
        primaryImage.url,
        800,
      )
    : null;

  const imageAlt =
    primaryImage?.alt?.trim() ||
    (typeof article?.title === "string"
      ? article.title
      : "NationPath News");

  const categoryName =
    article?.category?.name || "News";

  const publishedDate =
    getDate(article);

  /* =====================================================
     RENDER
  ===================================================== */

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
          mb-6
          flex
          items-center
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

          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.3em]
              text-[#163C80]
              sm:text-[11px]
            "
          >
            Next Story
          </p>
        </div>

        <BookOpen
          size={16}
          strokeWidth={1.7}
          className="text-gray-300"
          aria-hidden="true"
        />
      </div>

      {/* =================================================
          STORY CARD
      ================================================= */}

      <Link
        href={articleUrl}
        className="
          group
          block
          overflow-hidden
          rounded-2xl
          border
          border-black/10
          bg-white
          shadow-[0_8px_30px_rgba(0,0,0,0.04)]
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:shadow-[0_14px_40px_rgba(0,0,0,0.09)]
        "
      >
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-[320px_minmax(0,1fr)]
            lg:grid-cols-[380px_minmax(0,1fr)]
          "
        >
          {/* =================================================
              IMAGE
          ================================================= */}

          {imageSrc ? (
            <div
              className="
                relative
                aspect-[16/10]
                overflow-hidden
                bg-gray-100
                md:aspect-auto
                md:min-h-[250px]
              "
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                loading="lazy"
                sizes="
                  (max-width: 768px) 100vw,
                  (max-width: 1280px) 320px,
                  380px
                "
                className="
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
                  from-black/45
                  via-transparent
                  to-transparent
                  opacity-80
                "
              />

              {/* Category badge */}
              <span
                className="
                  absolute
                  left-4
                  top-4
                  rounded-full
                  border
                  border-white/25
                  bg-black/35
                  px-3
                  py-1.5
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-white
                  backdrop-blur-md
                "
              >
                {categoryName}
              </span>

              {/* Image bottom label */}
              <div
                className="
                  absolute
                  bottom-4
                  left-4
                  right-4
                  flex
                  items-end
                  justify-between
                  gap-3
                "
              >
                <span
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-white/80
                  "
                >
                  Continue Reading
                </span>

                {publishedDate && (
                  <span
                    className="
                      text-[10px]
                      text-white/75
                    "
                  >
                    {publishedDate}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div
              className="
                flex
                min-h-[180px]
                items-center
                justify-center
                bg-[#F5F4F0]
                md:min-h-[250px]
              "
            >
              <div
                className="
                  text-center
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-gray-400
                "
              >
                NationPath
                <br />
                News
              </div>
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
              p-5
              sm:p-7
              lg:p-9
            "
          >
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

              <span
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-[#EA661B]
                "
              >
                {categoryName}
              </span>
            </div>

            {/* Title */}
            <h3
              className="
                mt-3
                max-w-3xl
                text-xl
                font-bold
                leading-[1.18]
                tracking-tight
                text-gray-950
                transition-colors
                duration-300
                group-hover:text-[#163C80]
                sm:text-2xl
                lg:text-3xl
              "
            >
              {article.title}
            </h3>

            {/* Excerpt */}
            {article.excerpt && (
              <p
                className="
                  mt-3
                  max-w-2xl
                  line-clamp-3
                  text-sm
                  leading-6
                  text-gray-600
                  sm:text-base
                  sm:leading-7
                "
              >
                {article.excerpt}
              </p>
            )}

            {/* Bottom action */}
            <div
              className="
                mt-6
                flex
                flex-wrap
                items-center
                justify-between
                gap-4
                border-t
                border-black/10
                pt-4
              "
            >
              <div
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.15em]
                  text-gray-400
                "
              >
                {publishedDate || "Latest Story"}
              </div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-[#163C80]
                  transition-colors
                  group-hover:text-[#EA661B]
                "
              >
                <span>
                  Read Full Story
                </span>

                <ArrowRight
                  size={15}
                  strokeWidth={2}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}