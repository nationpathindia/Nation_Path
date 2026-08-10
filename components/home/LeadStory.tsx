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

  const articleUrl =
    article?.category?.slug
      ? `/${article.category.slug}/${article.slug}`
      : "#";

  /*
   * HERO IMAGE
   *
   * DB URL remains unchanged.
   * Browser receives optimized Cloudinary delivery URL.
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
   * SUMMARY
   */
  const cleanText = (html: string) => {
    if (!html) return "";

    return html
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const summarySource =
    article?.excerpt ||
    article?.shortBrief ||
    article?.content ||
    "";

  const summary = cleanText(summarySource);

  const shortSummary =
    summary.length > 300
      ? summary.slice(0, 300)
      : summary;

  const publishedDate =
    article?.createdAt
      ? new Date(article.createdAt).toISOString()
      : undefined;

  /*
   * CLOUDINARY DELIVERY
   *
   * Original DB image URL is untouched.
   * Only the delivery URL is optimized.
   */
  const optimizedImage = primaryImage
    ? cloudinaryImageUrl(primaryImage, 1200)
    : null;

  return (
    <article
      itemScope
      itemType="https://schema.org/NewsArticle"
    >
      <Link
        href={articleUrl}
        className="group block"
        aria-label={`Read full article: ${article.title}`}
      >
        {optimizedImage && (
          <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-lg bg-[var(--news-soft)]">
            <Image
              src={optimizedImage}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 1200px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              itemProp="image"
            />
          </div>
        )}

        {article?.category?.name && (
          <div className="category-badge mb-5">
            <span className="category-line" />

            <span itemProp="articleSection">
              {article.category.name}
            </span>
          </div>
        )}

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
            {summary.length > 300 && "..."}
          </p>
        )}

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

          {article?.createdAt && (
            <>
              <span>•</span>

              <time
                dateTime={publishedDate}
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
