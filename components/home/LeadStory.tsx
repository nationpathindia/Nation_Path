import Image from "next/image";
import Link from "next/link";

import { cloudinaryImageUrl } from "@/lib/cloudinary-image";

interface LeadStoryProps {
  article: any;
}

export default function LeadStory({
  article,
}: LeadStoryProps) {
  if (!article) {
    return null;
  }

  /* ============================================================
     ARTICLE URL
  ============================================================ */

  const articleUrl =
    article?.category?.slug &&
    article?.slug
      ? `/${article.category.slug}/${article.slug}`
      : "#";

  /* ============================================================
     PRIMARY IMAGE
     
     Priority:
     1. Explicit primary gallery image
     2. First gallery image
     3. Legacy images array

     Original database URL is NEVER modified.
  ============================================================ */

  const primaryImage =
    article?.imageGallery?.find(
      (image: any) =>
        image?.isPrimary &&
        typeof image?.url === "string" &&
        image.url.trim()
    )?.url ||
    article?.imageGallery?.find(
      (image: any) =>
        typeof image?.url === "string" &&
        image.url.trim()
    )?.url ||
    article?.images?.find(
      (image: any) =>
        typeof image === "string" &&
        image.trim()
    ) ||
    null;

  /* ============================================================
     IMAGE ALT
  ============================================================ */

  const imageAlt =
    article?.imageGallery?.find(
      (image: any) =>
        image?.isPrimary &&
        typeof image?.alt === "string" &&
        image.alt.trim()
    )?.alt?.trim() ||
    article?.imageGallery?.find(
      (image: any) =>
        typeof image?.alt === "string" &&
        image.alt.trim()
    )?.alt?.trim() ||
    `${article?.title || "News"} - Nation Path India`;

  /* ============================================================
     SUMMARY
  ============================================================ */

  function cleanText(
    value: unknown
  ): string {
    if (
      typeof value !== "string" ||
      !value
    ) {
      return "";
    }

    return value
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
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

  const summary =
    cleanText(summarySource);

  const shortSummary =
    summary.length > 300
      ? `${summary
          .slice(0, 300)
          .trim()}...`
      : summary;

  /* ============================================================
     PUBLISHED DATE
  ============================================================ */

  let publishedDate:
    | string
    | undefined;

  let displayDate = "";

  if (article?.createdAt) {
    const date = new Date(
      article.createdAt
    );

    if (
      !Number.isNaN(
        date.getTime()
      )
    ) {
      publishedDate =
        date.toISOString();

      displayDate =
        date.toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          }
        );
    }
  }

  /* ============================================================
     IMAGE DELIVERY
     
     Existing Cloudinary:
       f_auto,q_auto,w_1200

     New R2:
       original URL unchanged

     Next/Image:
       responsive optimization
       AVIF/WebP according to next.config
  ============================================================ */

  const deliveryImage =
    primaryImage
      ? cloudinaryImageUrl(
          primaryImage,
          1200
        )
      : null;

  /* ============================================================
     CANONICAL ARTICLE URL
  ============================================================ */

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
          article?.title ||
          "News article"
        }`}
      >
        {/* ======================================================
            HERO IMAGE
        ====================================================== */}

        {deliveryImage ? (
          <div
            className="
              relative
              mb-7
              aspect-[16/9]
              w-full
              overflow-hidden
              rounded-2xl
              bg-[var(--news-soft)]
            "
          >
            <Image
              src={deliveryImage}
              alt={imageAlt}
              fill
              priority
              sizes="
                (max-width: 768px) 100vw,
                (max-width: 1280px) 66vw,
                1200px
              "
              className="
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-[1.025]
              "
              itemProp="image"
            />

            {/* Editorial image depth */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-t
                from-black/30
                via-transparent
                to-transparent
              "
            />

            {/* Image edge label */}

            <div
              className="
                pointer-events-none
                absolute
                left-5
                bottom-5
                flex
                items-center
                gap-3
                text-white
              "
            >
              <span
                className="
                  h-[2px]
                  w-8
                  bg-[var(--news-editorial-gold)]
                "
              />

              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.25em]
                  font-semibold
                  drop-shadow-sm
                "
              >
                Lead Story
              </span>
            </div>
          </div>
        ) : (
          <div
            className="
              relative
              mb-7
              aspect-[16/9]
              w-full
              overflow-hidden
              rounded-2xl
              bg-[var(--news-soft)]
              flex
              items-center
              justify-center
            "
          >
            <span
              className="
                text-[10px]
                uppercase
                tracking-[0.25em]
                text-[var(--news-light-text)]
              "
            >
              NationPath News
            </span>
          </div>
        )}

        {/* ======================================================
            CATEGORY
        ====================================================== */}

        {article?.category?.name ? (
          <div
            className="
              category-badge
              mb-5
            "
          >
            <span
              className="
                category-line
              "
            />

            <span
              itemProp="articleSection"
            >
              {article.category.name}
            </span>
          </div>
        ) : null}

        {/* ======================================================
            HEADLINE
        ====================================================== */}

        <h1
          className="
            news-headline
            max-w-4xl
            text-3xl
            sm:text-4xl
            lg:text-[38px]
            xl:text-[42px]
            font-semibold
            leading-[1.12]
            tracking-[-0.018em]
            transition-colors
            duration-300
            group-hover:text-[var(--news-editorial-gold)]
          "
          itemProp="headline"
        >
          {article.title}
        </h1>

        {/* ======================================================
            SUMMARY
        ====================================================== */}

        {shortSummary ? (
          <p
            className="
              news-body
              mt-6
              max-w-3xl
              text-base
              sm:text-lg
              leading-7
              line-clamp-3
            "
            itemProp="description"
          >
            {shortSummary}
          </p>
        ) : null}

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
            text-[10px]
            sm:text-[11px]
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

          {publishedDate &&
          displayDate ? (
            <>
              <span
                aria-hidden="true"
              >
                •
              </span>

              <time
                dateTime={
                  publishedDate
                }
                itemProp="datePublished"
              >
                {displayDate}
              </time>
            </>
          ) : null}
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
            text-[var(--news-editorial-gold)]
          "
        >
          <span
            className="
              border-b
              border-[var(--news-editorial-gold)]
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

      {absoluteArticleUrl ? (
        <meta
          itemProp="mainEntityOfPage"
          content={
            absoluteArticleUrl
          }
        />
      ) : null}
    </article>
  );
}

