import Image from "next/image";
import Link from "next/link";

import SectionHeader from "@/components/common/SectionHeader";

import {
  cloudinaryImageUrl,
} from "@/lib/cloudinary-image";

interface LatestNewsProps {
  articles: any;
}

export default function LatestNews({
  articles,
}: LatestNewsProps) {
  if (!articles?.length) {
    return null;
  }

  /* =====================================================
     IMAGE INTELLIGENCE
     
     Priority:
     1. Primary gallery image
     2. First gallery image
     3. Legacy images array

     Original database URL is NEVER modified.
  ===================================================== */

  function getPrimaryImage(
    article: any,
  ): string | null {
    return (
      article?.imageGallery?.find(
        (image: any) =>
          image?.isPrimary &&
          typeof image?.url === "string" &&
          image.url.trim(),
      )?.url ||
      article?.imageGallery?.find(
        (image: any) =>
          typeof image?.url === "string" &&
          image.url.trim(),
      )?.url ||
      article?.images?.find(
        (image: any) =>
          typeof image === "string" &&
          image.trim(),
      ) ||
      null
    );
  }

  /* =====================================================
     IMAGE ALT
  ===================================================== */

  function getImageAlt(
    article: any,
  ): string {
    return (
      article?.imageGallery?.find(
        (image: any) =>
          image?.isPrimary &&
          typeof image?.alt === "string" &&
          image.alt.trim(),
      )?.alt?.trim() ||
      article?.imageGallery?.find(
        (image: any) =>
          typeof image?.alt === "string" &&
          image.alt.trim(),
      )?.alt?.trim() ||
      `${article?.title || "News"} - Nation Path India`
    );
  }

  /* =====================================================
     SUMMARY INTELLIGENCE
  ===================================================== */

  function cleanText(
    value: unknown,
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

  function getSummary(
    article: any,
    limit: number = 220,
  ): string {
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

  function articleUrl(
    article: any,
  ): string {
    return article?.category?.slug &&
      article?.slug
      ? `/${article.category.slug}/${article.slug}`
      : "#";
  }

  /* =====================================================
     IMAGE DELIVERY
     
     Existing Cloudinary:
       cloudinaryImageUrl()
       → f_auto,q_auto,w_600

     New R2:
       cloudinaryImageUrl()
       → URL unchanged

     Next/Image:
       → responsive optimization
       → AVIF/WebP according to next.config
       → browser-sized delivery

     IMPORTANT:
       No `unoptimized`.
  ===================================================== */

  function getDeliveryImage(
    article: any,
  ): string | null {
    const image =
      getPrimaryImage(article);

    if (!image) {
      return null;
    }

    return cloudinaryImageUrl(
      image,
      600,
    );
  }

  return (
    <section
      className="
        border-t
        border-[var(--news-border)]
        pt-10
        sm:pt-14
        pb-8
      "
      aria-labelledby="latest-news-heading"
    >
      <SectionHeader
        title="Latest News"
      />

      <div
        className="
          divide-y
          divide-[var(--news-border)]
          mt-8
        "
      >
        {articles.map(
          (article: any) => {
            const deliveryImage =
              getDeliveryImage(
                article,
              );

            return (
              <article
                key={article.id}
                className="
                  group
                  grid
                  grid-cols-1
                  sm:grid-cols-12
                  gap-6
                  sm:gap-8
                  py-8
                  sm:py-10
                "
                itemScope
                itemType="https://schema.org/NewsArticle"
              >
                {/* =================================================
                    IMAGE
                ================================================= */}

                <div
                  className="
                    sm:col-span-4
                  "
                >
                  <Link
                    href={articleUrl(
                      article,
                    )}
                    className="block"
                    aria-label={`Read ${
                      article?.title ||
                      "news article"
                    }`}
                  >
                    {deliveryImage ? (
                      <div
                        className="
                          relative
                          aspect-[16/10]
                          overflow-hidden
                          rounded-xl
                          bg-[var(--news-soft)]
                        "
                      >
                        <Image
                          src={deliveryImage}
                          alt={getImageAlt(
                            article,
                          )}
                          fill
                          sizes="
                            (max-width: 640px) 100vw,
                            (max-width: 1024px) 40vw,
                            420px
                          "
                          loading="lazy"
                          className="
                            object-cover
                            transition-transform
                            duration-700
                            ease-out
                            group-hover:scale-[1.04]
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
                  </Link>
                </div>

                {/* =================================================
                    CONTENT
                ================================================= */}

                <div
                  className="
                    sm:col-span-8
                    flex
                    flex-col
                    justify-center
                  "
                >
                  <Link
                    href={articleUrl(
                      article,
                    )}
                    className="block"
                  >
                    {/* CATEGORY */}

                    {article?.category
                      ?.name ? (
                      <div
                        className="
                          category-badge
                          mb-3
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
                          {
                            article
                              .category
                              .name
                          }
                        </span>
                      </div>
                    ) : null}

                    {/* HEADLINE */}

                    <h2
                      className="
                        news-headline
                        text-xl
                        sm:text-2xl
                        lg:text-[32px]
                        leading-[1.15]
                        transition-colors
                        duration-300
                        group-hover:text-[var(--news-editorial-gold)]
                      "
                      itemProp="headline"
                    >
                      {article?.title}
                    </h2>

                    {/* SUMMARY */}

                    {getSummary(
                      article,
                    ) ? (
                      <p
                        className="
                          news-body
                          mt-4
                          max-w-3xl
                          text-sm
                          sm:text-base
                          line-clamp-3
                        "
                        itemProp="description"
                      >
                        {getSummary(
                          article,
                        )}
                      </p>
                    ) : null}

                    {/* META */}

                    <div
                      className="
                        mt-5
                        flex
                        flex-wrap
                        items-center
                        gap-2
                        text-[10px]
                        uppercase
                        tracking-[0.18em]
                        text-[var(--news-light-text)]
                      "
                    >
                      <span
                        itemProp="author"
                        className="font-medium"
                      >
                        NationPath
                        Editorial Desk
                      </span>

                      {article?.createdAt ? (
                        <>
                          <span>
                            •
                          </span>

                          <time
                            itemProp="datePublished"
                            dateTime={(() => {
                              const date =
                                new Date(
                                  article.createdAt,
                                );

                              return Number.isNaN(
                                date.getTime(),
                              )
                                ? undefined
                                : date.toISOString();
                            })()}
                          >
                            {(() => {
                              const date =
                                new Date(
                                  article.createdAt,
                                );

                              if (
                                Number.isNaN(
                                  date.getTime(),
                                )
                              ) {
                                return "";
                              }

                              return date.toLocaleDateString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                },
                              );
                            })()}
                          </time>
                        </>
                      ) : null}
                    </div>
                  </Link>
                </div>

                {/* =================================================
                    STRUCTURED DATA
                ================================================= */}

                <meta
                  itemProp="publisher"
                  content="Nation Path India"
                />
              </article>
            );
          },
        )}
      </div>
    </section>
  );
}

