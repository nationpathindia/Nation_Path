import Image from "next/image";
import Link from "next/link";

import {
  cloudinaryImageUrl,
} from "@/lib/cloudinary-image";

interface ArticleRelatedProps {
  articles: any;
}

interface GalleryImage {
  url: string;
  alt?: string;
  caption?: string;
  isPrimary?: boolean;
}

export default function ArticleRelated({
  articles,
}: ArticleRelatedProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  /*
   * IMAGE INTELLIGENCE
   *
   * Preserve the existing image fallback chain:
   *
   * 1. Primary imageGallery image
   * 2. First imageGallery image
   * 3. Existing images[0]
   *
   * Only Cloudinary delivery is optimized.
   * Database URLs are never modified.
   */
  function getPrimaryImage(article: any): string | null {
    const gallery: GalleryImage[] = Array.isArray(
      article?.imageGallery
    )
      ? article.imageGallery
      : [];

    return (
      gallery.find(
        (image: GalleryImage) =>
          image?.isPrimary
      )?.url ||
      gallery[0]?.url ||
      article?.images?.[0] ||
      null
    );
  }

  function getImageAlt(article: any): string {
    const gallery: GalleryImage[] = Array.isArray(
      article?.imageGallery
    )
      ? article.imageGallery
      : [];

    return (
      gallery.find(
        (image: GalleryImage) =>
          image?.isPrimary
      )?.alt ||
      gallery[0]?.alt ||
      `${article?.title || "News"} - Nation Path India`
    );
  }

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
          mb-8
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

        <h2
          className="
            text-[11px]
            font-bold
            uppercase
            tracking-[0.35em]
            text-[#163C80]
          "
        >
          Related Stories
        </h2>
      </div>

      {/* GRID */}

      <div
        className="
          grid
          gap-10
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {articles.slice(0, 6).map((article: any) => {
          const primaryImage =
            getPrimaryImage(article);

          const optimizedImage =
            primaryImage
              ? cloudinaryImageUrl(
                  primaryImage,
                  640
                )
              : null;

          return (
            <article
              key={article.id}
              className="
                group
              "
            >
              <Link
                href={`/${article.category?.slug}/${article.slug}`}
                className="
                  block
                "
              >
                {/* IMAGE */}

                {optimizedImage && (
                  <div
                    className="
                      relative
                      aspect-[16/9]
                      overflow-hidden
                      rounded-xl
                      bg-[#F5F5F5]
                    "
                  >
                    <Image
                      src={optimizedImage}
                      alt={getImageAlt(article)}
                      fill
                      sizes="
                        (max-width:640px) 100vw,
                        (max-width:1024px) 50vw,
                        33vw
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

                {/* CATEGORY */}

                <p
                  className="
                    mt-5
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.3em]
                    text-[#EA661B]
                  "
                >
                  {article.category?.name || "News"}
                </p>

                {/* TITLE */}

                <h3
                  className="
                    mt-2
                    font-serif
                    text-xl
                    font-bold
                    leading-snug
                    tracking-tight
                    text-[#111]
                    transition-colors
                    group-hover:text-[#163C80]
                  "
                >
                  {article.title}
                </h3>

                {/* DATE */}

                <p
                  className="
                    mt-3
                    text-[11px]
                    uppercase
                    tracking-[0.18em]
                    text-gray-500
                  "
                >
                  {new Date(
                    article.createdAt
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </p>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}

