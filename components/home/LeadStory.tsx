import Image from "next/image";
import Link from "next/link";

import { cloudinaryImageUrl } from "@/lib/cloudinary-image";

interface LeadStoryProps {
  article: any;
}

export default function LeadStory({
  article,
}: LeadStoryProps) {
  if (!article) return null;

  /*
   * ============================================================
   * ARTICLE URL
   * ============================================================
   */

  const articleUrl =
    article?.category?.slug && article?.slug
      ? `/${article.category.slug}/${article.slug}`
      : "#";

  /*
   * ============================================================
   * PRIMARY IMAGE
   * ============================================================
   *
   * Priority:
   * 1. Explicit primary image
   * 2. First gallery image
   * 3. Legacy images array
   *
   * Original database URL is never modified.
   */

  const primaryImage =
    article?.imageGallery?.find(
      (image: any) => image?.isPrimary && image?.url
    )?.url ||
    article?.imageGallery?.find(
      (image: any) => image?.url
    )?.url ||
    article?.images?.find(
      (image: any) => typeof image === "string" && image.trim()
    ) ||
    null;

  /*
   * ============================================================
   * IMAGE ALT
   * ============================================================
   */

  const imageAlt =
    article?.imageGallery?.find(
      (image: any) => image?.isPrimary && image?.alt
    )?.alt ||
    article?.imageGallery?.find(
      (image: any) => image?.alt
    )?.alt ||
    `${article?.title || "News"} - Nation Path India`;

  /*
   * ============================================================
   * SUMMARY
   * ============================================================
   */

  function cleanText(value: any): string {
    if (!value || typeof value !== "string") {
      return "";
    }

    return value
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/\s+/g, " ")
      .trim();
  }

  const summarySource =
    article?.excerpt ||
    article?.shortBrief ||
    article?.content ||
    "";

  const summary = cleanText(summarySource);

  const shortSummary =
    summary.length > 300
      ? `${summary.slice(0, 300).trim()}...`
      : summary;

  /*
   * ============================================================
   * PUBLISHED DATE
   * ============================================================
   */

  let publishedDate: string | undefined;
  let displayDate = "";

  if (article?.createdAt) {
    const date = new Date(article.createdAt);

    if (!Number.isNaN(date.getTime())) {
      publishedDate = date.toISOString();

      displayDate = date.toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      );
    }
  }

  /*
   * ============================================================
   * CLOUDINARY DELIVERY
   * ============================================================
   *
   * IMPORTANT:
   *
   * The original database image URL remains untouched.
   *
   * If the image belongs to Cloudinary:
   *
   *   f_auto
   *   q_auto
   *   w_1200
   *
   * are added by cloudinaryImageUrl().
   *
   * If the image is NOT a Cloudinary URL,
   * cloudinaryImageUrl() returns the original URL.
   */

  const optimizedImage = primaryImage
    ? cloudinaryImageUrl(primaryImage, 1200)
    : null;

  /*
   * ============================================================
   * CANONICAL ARTICLE URL
   * ============================================================
   */

  const absoluteArticleUrl =
    articleUrl !== "#"
      ? `https://nationpathindia.com${articleUrl}`
      : undefined;

  return (
    <article
      itemScope
      itemType="https://schema.org/NewsArticle"
    >
      <Link
        href={articleUrl}
        className="group block"
        aria-label={`Read full article: ${
          article?.title || "News article"
        }`}
      >
        {/* ======================================================
            HERO IMAGE
            ====================================================== */}

        {optimizedImage && (
          <div
            className="
              relative
              mb-6
              aspect-[16/9]
              w-full
              overflow-hidden
              rounded-lg
              bg-[var(--news-soft)]
            "
          >
            <Image
              src={optimizedImage}
              alt={imageAlt}
              fill
              priority
              unoptimized
              sizes="
                (max-width: 768px) 100vw,
                (max-width: 1280px) 66vw,
                1200px
              "
              className="
                object-cover
                transition-transform
                duration-500
                ease-out
                group-hover:scale-[1.02]
              "
              itemProp="image"
            />
          </div>
        )}

        {/* ======================================================
            CATEGORY
            ====================================================== */}

        {article?.category?.name && (
          <div className="category-badge mb-5">
            <span className="category-line" />

            <span itemProp="articleSection">
              {article.category.name}
            </span>
          </div>
        )}

        {/* ======================================================
            HEADLINE
            ====================================================== */}

        <h1
          className="
            news-headline
            max-w-4xl
            text-3xl
            sm:text-4xl
            lg:text-[36px]
            xl:text-[40px]
            font-semibold
            leading-[1.14]
            tracking-[-0.018em]
            transition-colors
            duration-300
            group-hover:text-[var(--news-navy)]
          "
          itemProp="headline"
        >
          {article.title}
        </h1>

        {/* ======================================================
            SUMMARY
            ====================================================== */}

        {shortSummary && (
          <p
            className="
              news-body
              mt-6
              max-w-3xl
              text-base
              sm:text-lg
              line-clamp-3
            "
            itemProp="description"
          >
            {shortSummary}
          </p>
        )}

        {/* ======================================================
            META
            ====================================================== */}

        <div
          className="
            mt-7
            flex
            flex-wrap
            items-center
            gap-3
            text-[11px]
            uppercase
            tracking-[0.16em]
            text-[var(--news-light-text)]
          "
        >
          <span
            itemProp="author"
            className="font-semibold"
          >
            NationPath Editorial Desk
          </span>

          {publishedDate && displayDate && (
            <>
              <span aria-hidden="true">
                •
              </span>

              <time
                dateTime={publishedDate}
                itemProp="datePublished"
              >
                {displayDate}
              </time>
            </>
          )}
        </div>

        {/* ======================================================
            READ STORY CTA
            ====================================================== */}

        <div
          className="
            mt-7
            inline-flex
            items-center
            gap-2
            text-xs
            uppercase
            tracking-[0.18em]
            font-semibold
            text-[var(--news-navy)]
          "
        >
          <span
            className="
              border-b
              border-[var(--news-orange)]
              pb-1
            "
          >
            Read Full Story
          </span>

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
        </div>
      </Link>

      {/* ========================================================
          STRUCTURED DATA
          ======================================================== */}

      <meta
        itemProp="publisher"
        content="Nation Path India"
      />

      {absoluteArticleUrl && (
        <meta
          itemProp="mainEntityOfPage"
          content={absoluteArticleUrl}
        />
      )}
    </article>
  );
}

