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

  const articleUrl =
    article?.category?.slug
      ? `/${article.category.slug}/${article.slug}`
      : "#";

  /*
   * IMAGE INTELLIGENCE
   */

  const primaryImage =
    article?.imageGallery?.find(
      (image: any) => image?.isPrimary
    )?.url ||
    article?.imageGallery?.[0]?.url ||
    article?.images?.[0] ||
    null;

  const imageAlt =
    article?.imageGallery?.find(
      (image: any) => image?.isPrimary
    )?.alt ||
    `${article.title} - Nation Path India`;

  /*
   * SUMMARY INTELLIGENCE
   */

  function cleanText(html: string) {
    if (!html) return "";

    return html
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  const summarySource =
    article?.excerpt ||
    article?.shortBrief ||
    article?.content ||
    "";

  const summary = cleanText(summarySource);

  /*
   * CARD STYLES
   */

  const styles = {
    large: {
      image: "aspect-[16/9]",
      title:
        "text-3xl sm:text-4xl lg:text-[44px]",
      excerpt: true,
      spacing: "mb-6",
    },

    default: {
      image: "aspect-[16/9]",
      title:
        "text-xl sm:text-2xl lg:text-[28px]",
      excerpt: true,
      spacing: "mb-5",
    },

    compact: {
      image: "aspect-[16/10]",
      title: "text-lg sm:text-xl",
      excerpt: false,
      spacing: "mb-4",
    },
  };

  const style = styles[size];

  /*
   * CLOUDINARY DELIVERY
   *
   * Original database URL remains unchanged.
   * Cloudinary handles:
   *
   * f_auto
   * q_auto
   * width
   *
   * Next.js image optimizer is intentionally bypassed.
   * This allows the browser to receive the optimized
   * Cloudinary AVIF/WebP asset directly.
   */

  const imageWidth =
    size === "large"
      ? 1200
      : size === "default"
      ? 900
      : 600;

  const optimizedImage = primaryImage
    ? cloudinaryImageUrl(
        primaryImage,
        imageWidth
      )
    : null;

  return (
    <article>
      <Link
        href={articleUrl}
        className="block group"
        aria-label={`Read article: ${article.title}`}
      >
        {optimizedImage && (
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
              sizes={
                size === "large"
                  ? "(max-width:768px) 100vw, 750px"
                  : "(max-width:768px) 100vw, 450px"
              }
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
        )}

        {article?.category?.name && (
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
        )}

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
          {article.title}
        </h2>

        {style.excerpt && summary && (
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
              ? `${summary.slice(0, 180)}...`
              : summary}
          </p>
        )}

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

          {article.createdAt && (
            <>
              <span>•</span>

              <time
                dateTime={new Date(
                  article.createdAt
                ).toISOString()}
                itemProp="datePublished"
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
              </time>
            </>
          )}
        </div>
      </Link>

      <meta
        itemProp="publisher"
        content="Nation Path India"
      />

      <meta
        itemProp="mainEntityOfPage"
        content={`https://nationpathindia.com${articleUrl}`}
      />
    </article>
  );
}

