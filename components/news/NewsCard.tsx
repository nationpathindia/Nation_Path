import Image from "next/image";
import Link from "next/link";

import { cloudinaryImageUrl } from "@/lib/cloudinary-image";

interface NewsCardProps {
  article: any;
  size?: "default" | "large" | "compact";
}

export default function NewsCard({
  article,
  size = "default",
}: NewsCardProps) {
  if (!article) return null;

  /*
   * =====================================================
   * ARTICLE URL
   * =====================================================
   */

  const articleUrl =
    article?.category?.slug && article?.slug
      ? `/${article.category.slug}/${article.slug}`
      : "#";

  /*
   * =====================================================
   * IMAGE INTELLIGENCE
   * =====================================================
   *
   * Priority:
   * 1. Primary gallery image
   * 2. First gallery image
   * 3. Legacy images array
   *
   * Original database URL is never modified.
   */

  const primaryImage =
    article?.imageGallery?.find(
      (image: any) =>
        image?.isPrimary && image?.url
    )?.url ||
    article?.imageGallery?.find(
      (image: any) => image?.url
    )?.url ||
    article?.images?.find(
      (image: any) =>
        typeof image === "string" &&
        image.trim()
    ) ||
    null;

  /*
   * =====================================================
   * IMAGE ALT
   * =====================================================
   */

  const imageAlt =
    article?.imageGallery?.find(
      (image: any) =>
        image?.isPrimary && image?.alt
    )?.alt ||
    article?.imageGallery?.find(
      (image: any) => image?.alt
    )?.alt ||
    `${article?.title || "News article"} - Nation Path India`;

  /*
   * =====================================================
   * SUMMARY
   * =====================================================
   */

  function cleanText(value: unknown): string {
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

  /*
   * =====================================================
   * CARD VARIANTS
   * =====================================================
   */

  const cardStyles = {
    large: {
      image: "aspect-[16/9]",
      title:
        "text-3xl sm:text-4xl lg:text-[44px]",
      excerpt: true,
      spacing: "mb-6",
      imageWidth: 1200,
      imageSizes:
        "(max-width: 768px) 100vw, 750px",
    },

    default: {
      image: "aspect-[16/9]",
      title:
        "text-xl sm:text-2xl lg:text-[28px]",
      excerpt: true,
      spacing: "mb-5",
      imageWidth: 900,
      imageSizes:
        "(max-width: 768px) 100vw, 600px",
    },

    compact: {
      image: "aspect-[16/10]",
      title:
        "text-lg sm:text-xl",
      excerpt: false,
      spacing: "mb-4",
      imageWidth: 600,
      imageSizes:
        "(max-width: 768px) 100vw, 450px",
    },
  };

  const style =
    cardStyles[size];

  /*
   * =====================================================
   * SAFE IMAGE DELIVERY
   * =====================================================
   *
   * Cloudinary:
   *   f_auto
   *   q_auto
   *   w_<width>
   *
   * Non-Cloudinary:
   *   Original URL remains unchanged.
   *
   * unoptimized:
   *   Prevents Next/Vercel from creating another
   *   image transformation on top of Cloudinary.
   */

  const optimizedImage =
    primaryImage
      ? cloudinaryImageUrl(
          primaryImage,
          style.imageWidth
        )
      : null;

  /*
   * =====================================================
   * SAFE DATE
   * =====================================================
   */

  let publishedDate: string | undefined;
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

  /*
   * =====================================================
   * ABSOLUTE ARTICLE URL
   * =====================================================
   */

  const absoluteArticleUrl =
    articleUrl !== "#"
      ? `https://nationpathindia.com${articleUrl}`
      : undefined;

  return (
    <article>
      <Link
        href={articleUrl}
        className="block group"
        aria-label={`Read article: ${
          article?.title ||
          "News article"
        }`}
      >
        {/* =================================================
            IMAGE
        ================================================= */}

        {optimizedImage ? (
          <div
            className={`
              relative
              overflow-hidden
              rounded-xl
              bg-[var(--news-soft)]
              ${style.image}
              ${style.spacing}
            `}
          >
            <Image
              src={optimizedImage}
              alt={imageAlt}
              fill
              sizes={style.imageSizes}
              unoptimized
              loading="lazy"
              className="
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-[1.035]
              "
              itemProp="image"
            />

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-t
                from-black/20
                via-transparent
                to-transparent
                opacity-80
              "
            />
          </div>
        ) : null}

        {/* =================================================
            CATEGORY
        ================================================= */}

        {article?.category?.name ? (
          <div
            className="
              category-badge
              mb-3
            "
          >
            <span className="category-line" />

            <span itemProp="articleSection">
              {article.category.name}
            </span>
          </div>
        ) : null}

        {/* =================================================
            HEADLINE
        ================================================= */}

        <h2
          className={`
            news-headline
            ${style.title}
            transition-colors
            duration-300
            group-hover:text-[var(--news-editorial-gold)]
          `}
          itemProp="headline"
        >
          {article?.title}
        </h2>

        {/* =================================================
            SUMMARY
        ================================================= */}

        {style.excerpt &&
        summary ? (
          <p
            className="
              news-body
              mt-4
              text-sm
              sm:text-base
              leading-relaxed
              line-clamp-3
            "
            itemProp="description"
          >
            {summary.length > 180
              ? `${summary
                  .slice(0, 180)
                  .trim()}...`
              : summary}
          </p>
        ) : null}

        {/* =================================================
            META
        ================================================= */}

        <div
          className="
            mt-5
            flex
            flex-wrap
            items-center
            gap-2
            text-[10px]
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
              <span aria-hidden="true">
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
      </Link>

      {/* =================================================
          STRUCTURED DATA
      ================================================= */}

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

