import Image from "next/image";
import Link from "next/link";

import {
  cloudinaryImageUrl,
} from "@/lib/cloudinary-image";

interface ArticleNextStoryProps {
  article: any;
}

interface GalleryImage {
  url: string;
  alt?: string;
  caption?: string;
  isPrimary?: boolean;
}

export default function ArticleNextStory({
  article,
}: ArticleNextStoryProps) {
  if (!article) {
    return null;
  }

  const articleUrl =
    article?.category?.slug
      ? `/${article.category.slug}/${article.slug}`
      : "#";

  /*
   * IMAGE INTELLIGENCE
   *
   * Priority:
   * 1. Primary image from imageGallery
   * 2. First image from imageGallery
   * 3. Legacy images[0]
   */

  const gallery: GalleryImage[] = Array.isArray(
    article?.imageGallery
  )
    ? article.imageGallery
    : [];

  const primaryGalleryImage =
    gallery.find(
      (image: GalleryImage) =>
        image?.isPrimary
    ) || gallery[0];

  const originalImage =
    primaryGalleryImage?.url ||
    article?.images?.[0] ||
    null;

  /*
   * CLOUDINARY DELIVERY
   *
   * Keep non-Cloudinary URLs untouched.
   * Cloudinary images receive automatic format,
   * quality and width optimization.
   */

  const imageSrc = originalImage
    ? cloudinaryImageUrl(
        originalImage,
        640
      )
    : null;

  const imageAlt =
    primaryGalleryImage?.alt ||
    `${article.title} - Nation Path India`;

  return (
    <section
      className="
        mt-16
        border-t
        border-black/10
        pt-10
      "
    >
      {/* HEADER */}

      <div
        className="
          mb-6
          flex
          items-center
          gap-3
        "
      >
        <span
          className="
            h-[2px]
            w-8
            bg-[#EA661B]
          "
        />

        <p
          className="
            text-[11px]
            font-bold
            uppercase
            tracking-[0.35em]
            text-[#163C80]
          "
        >
          Next Story
        </p>
      </div>

      <Link
        href={articleUrl}
        className="
          group
          block
        "
      >
        <div
          className="
            grid
            grid-cols-1
            overflow-hidden
            rounded-2xl
            border
            border-black/10
            bg-white
            transition-all
            duration-300
            hover:shadow-xl
            md:grid-cols-[320px_1fr]
          "
        >
          {/* IMAGE */}

          {imageSrc && (
            <div
              className="
                relative
                aspect-[16/10]
                overflow-hidden
                md:aspect-auto
              "
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="
                  (max-width:768px) 100vw,
                  320px
                "
                loading="lazy"
                className="
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-105
                "
              />
            </div>
          )}

          {/* CONTENT */}

          <div
            className="
              flex
              flex-col
              justify-center
              p-5
              sm:p-7
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.28em]
                  text-[#EA661B]
                "
              >
                {article.category?.name || "News"}
              </span>
            </div>

            <h3
              className="
                mt-3
                font-serif
                text-xl
                font-bold
                leading-snug
                tracking-tight
                text-[#111]
                transition-colors
                group-hover:text-[#163C80]
                sm:text-3xl
              "
            >
              {article.title}
            </h3>

            {article.excerpt && (
              <p
                className="
                  mt-3
                  line-clamp-2
                  text-sm
                  leading-relaxed
                  text-gray-600
                "
              >
                {article.excerpt}
              </p>
            )}

            <div
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                text-xs
                font-bold
                uppercase
                tracking-widest
                text-[#163C80]
              "
            >
              Read Full Story

              <span
                className="
                  transition-transform
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}

