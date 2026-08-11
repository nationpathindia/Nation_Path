import Image from "next/image";
import Link from "next/link";

import SectionHeader from "@/components/common/SectionHeader";

import {
  cloudinaryImageUrl,
} from "@/lib/cloudinary-image";

interface CategoryBlockProps {
  title: string;
  slug: string;
  description?: string;
  articles: any[];
}

export default function CategoryBlock({
  title,
  slug,
  description,
  articles,
}: CategoryBlockProps) {
  if (!articles?.length) {
    return null;
  }

  const main = articles[0];
  const side = articles.slice(1, 4);

  /* =====================================================
     IMAGE INTELLIGENCE
  ===================================================== */

  function getPrimaryImage(article: any) {
    return (
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
      null
    );
  }

  function getImageAlt(article: any) {
    return (
      article?.imageGallery?.find(
        (image: any) =>
          image?.isPrimary &&
          image?.alt
      )?.alt ||
      article?.imageGallery?.find(
        (image: any) =>
          image?.alt
      )?.alt ||
      `${article?.title || "News article"} - Nation Path India`
    );
  }

  /* =====================================================
     SUMMARY INTELLIGENCE
  ===================================================== */

  function cleanText(value: unknown) {
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
      .replace(/\s+/g, " ")
      .trim();
  }

  function getSummary(
    article: any,
    limit: number = 230
  ) {
    const source =
      article?.excerpt ||
      article?.shortBrief ||
      article?.content ||
      "";

    const text = cleanText(source);

    return text.length > limit
      ? `${text.slice(0, limit)}...`
      : text;
  }

  /* =====================================================
     ARTICLE URL
  ===================================================== */

  const articleUrl = (article: any) => {
    if (
      !article?.category?.slug ||
      !article?.slug
    ) {
      return "#";
    }

    return `/${article.category.slug}/${article.slug}`;
  };

  /* =====================================================
     IMAGE DELIVERY
     
     Cloudinary:
       f_auto,q_auto,w_720

     Non-Cloudinary:
       original URL

     Next/Vercel image transformations:
       BYPASSED
  ===================================================== */

  const mainImage = getPrimaryImage(main);

  const optimizedMainImage = mainImage
    ? cloudinaryImageUrl(
        mainImage,
        720
      )
    : null;

  return (
    <section
      className="
        py-10
        sm:py-14
        border-t
        border-[var(--news-border)]
      "
      aria-labelledby={`${slug}-section-heading`}
    >
      {/* =================================================
          SECTION HEADER
      ================================================= */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          justify-between
          gap-4
          mb-8
        "
      >
        <div>
          <div
            id={`${slug}-section-heading`}
          >
            <SectionHeader
              title={title}
            />
          </div>

          {description ? (
            <p
              className="
                mt-3
                max-w-xl
                text-sm
                leading-relaxed
                text-[var(--news-muted)]
              "
            >
              {description}
            </p>
          ) : null}
        </div>

        <Link
          href={`/${slug}`}
          className="
            text-[11px]
            uppercase
            tracking-[0.22em]
            font-semibold
            text-[var(--news-editorial-gold)]
            hover:text-[var(--news-editorial-gold-soft)]
            transition-colors
            whitespace-nowrap
          "
        >
          View All →
        </Link>
      </div>

      {/* =================================================
          EDITORIAL GRID
      ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-12
          gap-8
          lg:gap-10
        "
      >
        {/* =================================================
            FEATURE STORY
        ================================================= */}

        <article
          className="lg:col-span-7"
          itemScope
          itemType="https://schema.org/NewsArticle"
        >
          <Link
            href={articleUrl(main)}
            className="group block"
          >
            {/* IMAGE */}

            <div
              className="
                relative
                aspect-[16/9]
                overflow-hidden
                rounded-2xl
                bg-[var(--news-soft)]
                mb-6
              "
            >
              {optimizedMainImage ? (
                <Image
                  src={optimizedMainImage}
                  alt={getImageAlt(main)}
                  fill
                  sizes="
                    (max-width: 768px) 100vw,
                    720px
                  "
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
              ) : (
                <div
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    text-xs
                    uppercase
                    tracking-widest
                    text-[var(--news-light-text)]
                  "
                >
                  NationPath India
                </div>
              )}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/25
                  via-transparent
                "
              />
            </div>

            {/* TITLE */}

            <h2
              className="
                news-headline
                text-2xl
                sm:text-3xl
                lg:text-[26px]
                xl:text-[30px]
                font-medium
                leading-[1.16]
                tracking-[-0.012em]
                transition-colors
                duration-300
                group-hover:text-[var(--news-editorial-gold)]
              "
              itemProp="headline"
            >
              {main.title}
            </h2>

            {/* SUMMARY */}

            {getSummary(main) ? (
              <p
                className="
                  news-body
                  mt-4
                  max-w-2xl
                  line-clamp-3
                "
                itemProp="description"
              >
                {getSummary(main)}
              </p>
            ) : null}

            {/* META */}

            <div
              className="
                mt-5
                flex
                items-center
                gap-2
                text-[10px]
                uppercase
                tracking-[0.18em]
                text-[var(--news-light-text)]
              "
            >
              <span className="font-medium">
                NationPath Editorial Desk
              </span>

              {main?.createdAt ? (
                <>
                  <span>•</span>

                  <time
                    dateTime={new Date(
                      main.createdAt
                    ).toISOString()}
                    itemProp="datePublished"
                  >
                    {new Date(
                      main.createdAt
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
              ) : null}
            </div>
          </Link>
        </article>

        {/* =================================================
            SIDE STORIES
        ================================================= */}

        <div
          className="
            lg:col-span-5
            divide-y
            divide-[var(--news-border)]
          "
        >
          {side.map(
            (article: any) => (
              <article
                key={article.id}
                className="
                  py-6
                  first:pt-0
                  last:pb-0
                "
              >
                <Link
                  href={articleUrl(article)}
                  className="group block"
                >
                  <h3
                    className="
                      news-headline
                      text-lg
                      sm:text-xl
                      font-medium
                      leading-[1.28]
                      tracking-[-0.008em]
                      transition-colors
                      duration-300
                      group-hover:text-[var(--news-editorial-gold)]
                    "
                  >
                    {article.title}
                  </h3>

                  {getSummary(
                    article,
                    120
                  ) ? (
                    <p
                      className="
                        mt-3
                        text-sm
                        leading-relaxed
                        text-[var(--news-muted)]
                        line-clamp-2
                      "
                    >
                      {getSummary(
                        article,
                        120
                      )}
                    </p>
                  ) : null}

                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      gap-2
                      text-[10px]
                      uppercase
                      tracking-[0.18em]
                      text-[var(--news-light-text)]
                    "
                  >
                    <span className="font-medium">
                      NationPath Editorial Desk
                    </span>

                    {article?.createdAt ? (
                      <>
                        <span>•</span>

                        <time
                          dateTime={new Date(
                            article.createdAt
                          ).toISOString()}
                        >
                          {new Date(
                            article.createdAt
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                            }
                          )}
                        </time>
                      </>
                    ) : null}
                  </div>
                </Link>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}