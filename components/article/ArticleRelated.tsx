import Image from "next/image";
import Link from "next/link";

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

export default function ArticleRelated({
  articles,
}: ArticleRelatedProps) {
  if (!Array.isArray(articles) || articles.length === 0) {
    return null;
  }

  /*
   * =====================================================
   * IMAGE INTELLIGENCE
   * =====================================================
   *
   * Priority:
   *
   * 1. Primary imageGallery image
   * 2. First imageGallery image
   * 3. Legacy images[0]
   *
   * Original database URLs remain untouched.
   * Cloudinary optimization happens only at delivery time.
   */

  function getPrimaryImage(article: any): string | null {
    const gallery: GalleryImage[] = Array.isArray(
      article?.imageGallery,
    )
      ? article.imageGallery.filter(
          (image: GalleryImage) =>
            image &&
            typeof image.url === "string" &&
            image.url.trim().length > 0,
        )
      : [];

    const primary =
      gallery.find(
        (image: GalleryImage) =>
          image.isPrimary === true,
      ) || gallery[0];

    if (primary?.url) {
      return primary.url;
    }

    if (
      Array.isArray(article?.images) &&
      typeof article.images[0] === "string"
    ) {
      return article.images[0];
    }

    return null;
  }

  function getImageAlt(article: any): string {
    const gallery: GalleryImage[] = Array.isArray(
      article?.imageGallery,
    )
      ? article.imageGallery
      : [];

    const primary =
      gallery.find(
        (image: GalleryImage) =>
          image?.isPrimary === true,
      ) || gallery[0];

    return (
      primary?.alt?.trim() ||
      (typeof article?.title === "string"
        ? `${article.title} - Nation Path India`
        : "NationPath News")
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
        {articles
          .slice(0, 6)
          .map((article: any) => {
            const primaryImage =
              getPrimaryImage(article);

            /*
             * Cloudinary delivery optimization.
             *
             * 640px is appropriate for the related-story
             * card width.
             */
            const optimizedImage =
              primaryImage
                ? cloudinaryImageUrl(
                    primaryImage,
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
                : "#";

            const createdAt =
              article?.createdAt
                ? new Date(
                    article.createdAt,
                  )
                : null;

            const formattedDate =
              createdAt &&
              !Number.isNaN(
                createdAt.getTime(),
              )
                ? createdAt.toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    },
                  )
                : "";

            return (
              <article
                key={
                  article?.id ||
                  `${article?.slug}-${article?.title}`
                }
                className="group"
              >
                <Link
                  href={articleUrl}
                  className="block"
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
                          (max-width: 640px) 100vw,
                          (max-width: 1024px) 50vw,
                          33vw
                        "
                        loading="lazy"
                        /*
                         * IMPORTANT:
                         *
                         * Cloudinary already optimized the
                         * image. Do not send it through
                         * Vercel's image optimizer again.
                         */
                        unoptimized
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
                    {article?.category?.name ||
                      "News"}
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
                    {article?.title}
                  </h3>

                  {/* DATE */}

                  {formattedDate && (
                    <p
                      className="
                        mt-3
                        text-[11px]
                        uppercase
                        tracking-[0.18em]
                        text-gray-500
                      "
                    >
                      {formattedDate}
                    </p>
                  )}
                </Link>
              </article>
            );
          })}
      </div>
    </section>
  );
}

