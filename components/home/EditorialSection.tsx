import Link from "next/link";

import SectionHeader from "@/components/common/SectionHeader";
import { cloudinaryImageUrl } from "@/lib/cloudinary-image";

interface EditorialSectionProps {
  articles: any[];
}

export default function EditorialSection({
  articles,
}: EditorialSectionProps) {
  if (!articles?.length) {
    return null;
  }

  const featured = articles[0];
  const others = articles.slice(1, 5);

  /* =====================================================
     IMAGE INTELLIGENCE
  ===================================================== */

  function getPrimaryImage(article: any): string | null {
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
      article?.primaryImage ||
      null
    );
  }

  function getImageAlt(article: any): string {
    return (
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
      article?.primaryImageAlt?.trim() ||
      `${article?.title || "Editorial"} - Nation Path India`
    );
  }

  /* =====================================================
     IMAGE DELIVERY

     Cloudinary:
       cloudinaryImageUrl()
       → Cloudinary transformation

     R2:
       original media.nationpathindia.com URL unchanged

     IMPORTANT:
       No next/image.
       Direct browser delivery prevents Vercel
       Image Optimization transformations.
  ===================================================== */

  function getDeliveryImage(article: any): string | null {
    const source = getPrimaryImage(article);

    if (!source) {
      return null;
    }

    return cloudinaryImageUrl(source, 720);
  }

  function getSummary(article: any): string {
    const source =
      article?.excerpt ||
      article?.shortBrief ||
      article?.content ||
      "";

    if (typeof source !== "string") {
      return "";
    }

    const clean = source
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/\s+/g, " ")
      .trim();

    return clean.length > 260
      ? `${clean.slice(0, 260)}...`
      : clean;
  }

  const featuredImage =
    getDeliveryImage(featured);

  return (
    <section
      className="
        py-12
        sm:py-16
        border-t
        border-[var(--news-border)]
      "
      aria-labelledby="editorial-section-heading"
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        id="editorial-section-heading"
        className="mb-8"
      >
        <SectionHeader title="Editorial" />
      </div>

      {/* =================================================
          EDITORIAL LAYOUT
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
            FEATURED EDITORIAL
        ================================================= */}

        <Link
          href={`/editorial/${featured.slug}`}
          className="
            lg:col-span-7
            group
            block
          "
        >
          {/* FEATURE IMAGE */}

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
            {featuredImage ? (
              <img
                src={featuredImage}
                alt={getImageAlt(featured)}
                loading="lazy"
                decoding="async"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-[1.035]
                "
              />
            ) : (
              <div
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  text-[10px]
                  uppercase
                  tracking-[0.25em]
                  text-[var(--news-light-text)]
                "
              >
                NationPath Editorial
              </div>
            )}

            {/* EDITORIAL OVERLAY */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-t
                from-black/45
                via-black/5
                to-transparent
              "
            />

            {/* LABEL ON IMAGE */}

            <div
              className="
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
                  text-[10px]
                  uppercase
                  tracking-[0.28em]
                  font-semibold
                "
              >
                Opinion Desk
              </span>
            </div>
          </div>

          {/* FEATURE CONTENT */}

          <div className="pr-2">
            <h2
              className="
                news-headline
                font-serif
                font-bold
                text-3xl
                sm:text-4xl
                lg:text-[38px]
                leading-[1.12]
                tracking-tight
                text-[var(--news-text)]
                group-hover:text-[var(--news-editorial-gold)]
                transition-colors
                duration-300
              "
            >
              {featured.title}
            </h2>

            {getSummary(featured) ? (
              <p
                className="
                  mt-5
                  max-w-3xl
                  text-[15px]
                  leading-7
                  text-[var(--news-muted)]
                  line-clamp-3
                "
              >
                {getSummary(featured)}
              </p>
            ) : null}

            <div
              className="
                mt-6
                flex
                items-center
                gap-3
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-[var(--news-light-text)]
              "
            >
              <span className="font-semibold">
                NationPath Editorial
              </span>

              {featured?.createdAt ? (
                <>
                  <span>•</span>

                  <time
                    dateTime={new Date(
                      featured.createdAt
                    ).toISOString()}
                  >
                    {new Date(
                      featured.createdAt
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
          </div>
        </Link>

        {/* =================================================
            OTHER EDITORIALS
        ================================================= */}

        <div
          className="
            lg:col-span-5
            border-t
            border-[var(--news-border)]
            lg:border-t-0
          "
        >
          {others.map(
            (article: any, index: number) => {
              const image =
                getDeliveryImage(article);

              return (
                <Link
                  key={article.id}
                  href={`/editorial/${article.slug}`}
                  className="
                    group
                    grid
                    grid-cols-[120px_1fr]
                    sm:grid-cols-[145px_1fr]
                    gap-5
                    py-5
                    first:pt-0
                    last:pb-0
                    border-b
                    last:border-b-0
                    border-[var(--news-border)]
                  "
                >
                  {/* THUMBNAIL */}

                  <div
                    className="
                      relative
                      aspect-[4/3]
                      overflow-hidden
                      rounded-xl
                      bg-[var(--news-soft)]
                    "
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={getImageAlt(article)}
                        loading="lazy"
                        decoding="async"
                        className="
                          absolute
                          inset-0
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-500
                          ease-out
                          group-hover:scale-[1.05]
                        "
                      />
                    ) : (
                      <div
                        className="
                          absolute
                          inset-0
                          flex
                          items-center
                          justify-center
                          text-[8px]
                          uppercase
                          tracking-[0.16em]
                          text-[var(--news-light-text)]
                          text-center
                          px-2
                        "
                      >
                        Editorial
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}

                  <div className="min-w-0">
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        mb-2
                      "
                    >
                      <span
                        className="
                          h-[2px]
                          w-5
                          bg-[var(--news-editorial-gold)]
                        "
                      />

                      <span
                        className="
                          text-[9px]
                          uppercase
                          tracking-[0.22em]
                          font-semibold
                          text-[var(--news-editorial-gold)]
                        "
                      >
                        Editorial
                      </span>
                    </div>

                    <h3
                      className="
                        news-headline
                        font-serif
                        text-lg
                        sm:text-xl
                        leading-[1.22]
                        text-[var(--news-text)]
                        group-hover:text-[var(--news-editorial-gold)]
                        transition-colors
                        duration-300
                        line-clamp-3
                      "
                    >
                      {article.title}
                    </h3>

                    <div
                      className="
                        mt-3
                        flex
                        items-center
                        gap-2
                        text-[9px]
                        uppercase
                        tracking-[0.18em]
                        text-[var(--news-light-text)]
                      "
                    >
                      <span>
                        {String(index + 2).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <span>•</span>

                      <span>
                        NationPath Desk
                      </span>
                    </div>
                  </div>
                </Link>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}

