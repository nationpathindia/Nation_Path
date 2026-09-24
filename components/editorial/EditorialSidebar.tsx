"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, ArrowUpRight } from "lucide-react";

import { cloudinaryImageUrl } from "@/lib/cloudinary-image";

interface EditorialSidebarProps {
  mostRead: any[];
}

/* =====================================================
   IMAGE RESOLVER

   Priority:
   1. Primary gallery image
   2. First valid gallery image
   3. First valid images[] entry
   4. primaryImage
===================================================== */

function getImage(article: any): string | null {
  const gallery = Array.isArray(article?.imageGallery)
    ? article.imageGallery
    : [];

  const primaryGalleryImage = gallery.find(
    (image: any) =>
      image?.isPrimary &&
      typeof image?.url === "string" &&
      image.url.trim()
  );

  if (primaryGalleryImage?.url) {
    return primaryGalleryImage.url.trim();
  }

  const firstGalleryImage = gallery.find(
    (image: any) =>
      typeof image?.url === "string" &&
      image.url.trim()
  );

  if (firstGalleryImage?.url) {
    return firstGalleryImage.url.trim();
  }

  const firstImage = Array.isArray(article?.images)
    ? article.images.find(
        (image: any) =>
          typeof image === "string" &&
          image.trim()
      )
    : null;

  if (firstImage) {
    return firstImage.trim();
  }

  if (
    typeof article?.primaryImage === "string" &&
    article.primaryImage.trim()
  ) {
    return article.primaryImage.trim();
  }

  return null;
}

/* =====================================================
   DELIVERY IMAGE

   Cloudinary → Cloudinary transformation
   R2 → original public URL

   Native <img> bypasses Vercel Image Optimization.
===================================================== */

function getDeliveryImage(article: any): string | null {
  const image = getImage(article);

  if (!image) {
    return null;
  }

  return cloudinaryImageUrl(image, 300);
}

/* =====================================================
   VIEWS
===================================================== */

function getViews(article: any): string | null {
  if (
    typeof article?.views !== "number" ||
    article.views <= 0
  ) {
    return null;
  }

  return article.views.toLocaleString("en-IN");
}

/* =====================================================
   COMPONENT
===================================================== */

export default function EditorialSidebar({
  mostRead,
}: EditorialSidebarProps) {
  if (
    !Array.isArray(mostRead) ||
    mostRead.length === 0
  ) {
    return null;
  }

  return (
    <aside className="lg:sticky lg:top-24">
      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-black/10
          bg-white
          shadow-[0_8px_30px_rgba(0,0,0,0.045)]
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            border-b
            border-black/10
            px-5
            py-5
          "
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="
                  h-1
                  w-7
                  rounded-full
                  bg-[#EA661B]
                "
              />

              <h2
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-[#163C80]
                "
              >
                Most Read
              </h2>
            </div>

            <ArrowUpRight
              size={15}
              strokeWidth={1.8}
              className="text-gray-300"
              aria-hidden="true"
            />
          </div>

          <p
            className="
              mt-2
              text-xs
              leading-5
              text-gray-500
            "
          >
            The most-read stories from
            NationPath Insight.
          </p>
        </div>

        {/* =================================================
            STORIES
        ================================================= */}

        <div>
          {mostRead.map((article, index) => {
            const image = getDeliveryImage(article);
            const views = getViews(article);
            const isTopStory = index === 0;

            return (
              <motion.article
                key={
                  article?.id ||
                  article?.slug ||
                  `most-read-${index}`
                }
                initial={{
                  opacity: 0,
                  x: 8,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: Math.min(
                    index * 0.04,
                    0.25
                  ),
                  ease: "easeOut",
                }}
                className="
                  border-b
                  border-black/10
                  last:border-b-0
                "
              >
                <Link
                  href={`/editorial/${article.slug}`}
                  className="
                    group
                    relative
                    flex
                    gap-3
                    p-4
                    transition-colors
                    duration-300
                    hover:bg-[#FAFAF8]
                  "
                >
                  {/* =================================================
                      RANK
                  ================================================= */}

                  <div
                    className="
                      flex
                      w-6
                      shrink-0
                      items-start
                      justify-center
                      pt-0.5
                    "
                  >
                    <span
                      className={`
                        text-lg
                        font-bold
                        leading-none
                        tracking-tight
                        ${
                          isTopStory
                            ? "text-[#EA661B]"
                            : "text-gray-300"
                        }
                      `}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* =================================================
                      IMAGE
                  ================================================= */}

                  {image ? (
                    <div
                      className="
                        relative
                        h-[68px]
                        w-[86px]
                        shrink-0
                        overflow-hidden
                        rounded-lg
                        bg-gray-100
                        ring-1
                        ring-black/5
                      "
                    >
                      <img
                        src={image}
                        alt={
                          article?.title ||
                          "NationPath Insight"
                        }
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
                          group-hover:scale-[1.06]
                        "
                      />

                      <div
                        aria-hidden="true"
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/20
                          to-transparent
                        "
                      />
                    </div>
                  ) : (
                    <div
                      className="
                        flex
                        h-[68px]
                        w-[86px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-[#F5F4F0]
                        px-2
                        text-center
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.12em]
                        text-gray-400
                        ring-1
                        ring-black/5
                      "
                    >
                      Insight
                    </div>
                  )}

                  {/* =================================================
                      CONTENT
                  ================================================= */}

                  <div className="min-w-0 flex-1">
                    <p
                      className="
                        line-clamp-2
                        text-sm
                        font-semibold
                        leading-5
                        text-gray-900
                        transition-colors
                        duration-300
                        group-hover:text-[#163C80]
                      "
                    >
                      {article?.title}
                    </p>

                    {views && (
                      <div
                        className="
                          mt-2
                          flex
                          items-center
                          gap-1.5
                          text-[10px]
                          text-gray-400
                        "
                      >
                        <Eye
                          size={12}
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />

                        <span>{views}</span>

                        <span>views</span>
                      </div>
                    )}
                  </div>

                  {/* =================================================
                      HOVER ARROW
                  ================================================= */}

                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    className="
                      absolute
                      right-3
                      top-3
                      text-[#EA661B]
                      opacity-0
                      transition-all
                      duration-300
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                      group-hover:opacity-100
                    "
                  />
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div
          className="
            border-t
            border-black/10
            bg-[#FAFAF8]
            px-5
            py-3
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-gray-400
            "
          >
            <span>Reader Interest</span>

            <span className="text-[#163C80]">
              Updated
            </span>
          </div>
        </div>
      </section>
    </aside>
  );
}

