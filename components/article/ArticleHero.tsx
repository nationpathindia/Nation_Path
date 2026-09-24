"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Images,
} from "lucide-react";

import ArticleShareBar from "@/components/article/ArticleShareBar";
import { cloudinaryImageUrl } from "@/lib/cloudinary-image";

interface GalleryImage {
  url: string;
  alt?: string;
  caption?: string;
  isPrimary?: boolean;
}

interface ArticleHeroProps {
  image?: string;
  images?: string[];
  imageGallery?: GalleryImage[];
  title: string;
  shareUrl: string;
  articleId?: string;
}

export default function ArticleHero({
  image,
  images = [],
  imageGallery = [],
  title,
  shareUrl,
  articleId,
}: ArticleHeroProps) {
  /* =====================================================
     BUILD GALLERY
  ===================================================== */

  const gallery = useMemo<GalleryImage[]>(() => {
    if (imageGallery.length > 0) {
      return imageGallery.filter(
        (item) =>
          item &&
          typeof item.url === "string" &&
          item.url.trim().length > 0,
      );
    }

    if (images.length > 0) {
      return images
        .filter(
          (url) =>
            typeof url === "string" &&
            url.trim().length > 0,
        )
        .map((url) => ({
          url: url.trim(),
          alt: title,
          caption: "",
          isPrimary: false,
        }));
    }

    if (
      typeof image === "string" &&
      image.trim().length > 0
    ) {
      return [
        {
          url: image.trim(),
          alt: title,
          caption: "",
          isPrimary: true,
        },
      ];
    }

    return [];
  }, [imageGallery, images, image, title]);

  /* =====================================================
     PRIMARY IMAGE INDEX
  ===================================================== */

  const initialIndex = useMemo(() => {
    const primaryIndex = gallery.findIndex(
      (item) => item.isPrimary === true,
    );

    return primaryIndex >= 0
      ? primaryIndex
      : 0;
  }, [gallery]);

  const [activeIndex, setActiveIndex] =
    useState(initialIndex);

  /* =====================================================
     RESET WHEN GALLERY CHANGES
  ===================================================== */

  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [initialIndex, gallery.length]);

  /* =====================================================
     SAFE ACTIVE INDEX
  ===================================================== */

  const safeActiveIndex =
    gallery.length > 0 &&
    activeIndex >= 0 &&
    activeIndex < gallery.length
      ? activeIndex
      : 0;

  const activeImage =
    gallery[safeActiveIndex] || null;

  /* =====================================================
     DELIVERY IMAGE

     Cloudinary → existing Cloudinary transformation
     R2 → original public URL unchanged

     Native <img> → browser direct delivery
     No Next.js /_next/image optimization.
  ===================================================== */

  const deliveryImage = useMemo(() => {
    if (!activeImage?.url) {
      return null;
    }

    return cloudinaryImageUrl(
      activeImage.url,
      1200,
    );
  }, [activeImage?.url]);

  /* =====================================================
     SLIDER CONTROLS
  ===================================================== */

  function nextImage() {
    if (gallery.length <= 1) {
      return;
    }

    setActiveIndex((current) =>
      current >= gallery.length - 1
        ? 0
        : current + 1,
    );
  }

  function previousImage() {
    if (gallery.length <= 1) {
      return;
    }

    setActiveIndex((current) =>
      current <= 0
        ? gallery.length - 1
        : current - 1,
    );
  }

  /* =====================================================
     AUTO SLIDER
  ===================================================== */

  useEffect(() => {
    if (gallery.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) =>
        current >= gallery.length - 1
          ? 0
          : current + 1,
      );
    }, 6000);

    return () => {
      window.clearInterval(timer);
    };
  }, [gallery.length]);

  /* =====================================================
     SAFETY RENDER
  ===================================================== */

  if (
    !activeImage?.url ||
    !deliveryImage
  ) {
    return null;
  }

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="mb-12">
      {/* =================================================
          HERO IMAGE
      ================================================= */}

      <div
        className="
          group
          relative
          overflow-hidden
          rounded-2xl
          bg-[#F3F2EE]
          shadow-[0_12px_40px_rgba(0,0,0,0.08)]
          ring-1
          ring-black/10
          sm:rounded-3xl
        "
      >
        <div
          className="
            relative
            aspect-[16/10]
            w-full
            sm:aspect-[16/9]
          "
        >
          <img
            key={activeImage.url}
            src={deliveryImage}
            alt={
              activeImage.alt?.trim() ||
              title ||
              "NationPath article image"
            }
            loading={
              safeActiveIndex === initialIndex
                ? "eager"
                : "lazy"
            }
            fetchPriority={
              safeActiveIndex === initialIndex
                ? "high"
                : "auto"
            }
            decoding="async"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              transition-transform
              duration-1000
              ease-out
              group-hover:scale-[1.015]
            "
          />

          {/* =================================================
              IMAGE OVERLAY
          ================================================= */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black/45
              via-transparent
              to-black/5
            "
          />

          {/* =================================================
              TOP LABEL
          ================================================= */}

          <div
            className="
              absolute
              left-4
              top-4
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/25
              bg-black/30
              px-3
              py-1.5
              text-[9px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-white
              backdrop-blur-md
              sm:left-5
              sm:top-5
            "
          >
            <Images
              size={12}
              strokeWidth={1.8}
            />

            <span>
              Visual Report
            </span>
          </div>

          {/* =================================================
              IMAGE COUNTER
          ================================================= */}

          {gallery.length > 1 && (
            <div
              className="
                absolute
                right-4
                top-4
                rounded-full
                border
                border-white/25
                bg-black/35
                px-3
                py-1.5
                text-[10px]
                font-semibold
                text-white
                backdrop-blur-md
                sm:right-5
                sm:top-5
              "
            >
              {safeActiveIndex + 1} /{" "}
              {gallery.length}
            </div>
          )}

          {/* =================================================
              PREVIOUS
          ================================================= */}

          {gallery.length > 1 && (
            <button
              type="button"
              onClick={previousImage}
              aria-label="Previous image"
              className="
                absolute
                left-3
                top-1/2
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/25
                bg-black/35
                text-white
                opacity-80
                backdrop-blur-md
                transition-all
                duration-300
                hover:scale-105
                hover:bg-black/55
                sm:left-5
                sm:h-11
                sm:w-11
              "
            >
              <ChevronLeft
                size={20}
                strokeWidth={1.8}
              />
            </button>
          )}

          {/* =================================================
              NEXT
          ================================================= */}

          {gallery.length > 1 && (
            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="
                absolute
                right-3
                top-1/2
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/25
                bg-black/35
                text-white
                opacity-80
                backdrop-blur-md
                transition-all
                duration-300
                hover:scale-105
                hover:bg-black/55
                sm:right-5
                sm:h-11
                sm:w-11
              "
            >
              <ChevronRight
                size={20}
                strokeWidth={1.8}
              />
            </button>
          )}

          {/* =================================================
              DOT NAVIGATION
          ================================================= */}

          {gallery.length > 1 && (
            <div
              className="
                absolute
                bottom-4
                left-1/2
                flex
                max-w-[70%]
                -translate-x-1/2
                items-center
                gap-1.5
                rounded-full
                border
                border-white/15
                bg-black/30
                px-3
                py-2
                backdrop-blur-md
              "
            >
              {gallery.map(
                (item, index) => (
                  <button
                    key={`${index}-${item.url}`}
                    type="button"
                    onClick={() =>
                      setActiveIndex(index)
                    }
                    aria-label={`Go to image ${
                      index + 1
                    }`}
                    aria-current={
                      safeActiveIndex === index
                        ? "true"
                        : undefined
                    }
                    className={`
                      h-1.5
                      rounded-full
                      transition-all
                      duration-300
                      ${
                        safeActiveIndex === index
                          ? "w-6 bg-white"
                          : "w-1.5 bg-white/50 hover:bg-white/80"
                      }
                    `}
                  />
                ),
              )}
            </div>
          )}

          {/* =================================================
              MOBILE IMAGE INDEX
          ================================================= */}

          {gallery.length > 1 && (
            <div
              className="
                absolute
                bottom-4
                right-4
                hidden
                rounded-full
                bg-black/35
                px-2.5
                py-1
                text-[9px]
                font-medium
                text-white
                backdrop-blur-md
                sm:block
              "
            >
              Swipe / Select
            </div>
          )}
        </div>
      </div>

      {/* =================================================
          CAPTION
      ================================================= */}

      {activeImage.caption && (
        <div
          className="
            mt-3
            border-l-2
            border-[#EA661B]
            pl-3
            text-xs
            italic
            leading-5
            text-gray-500
            sm:text-sm
          "
        >
          {activeImage.caption}
        </div>
      )}

      {/* =================================================
          META + SHARE
      ================================================= */}

      <div
        className="
          mt-5
          flex
          flex-col
          gap-4
          border-b
          border-black/10
          pb-5
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-gray-500
          "
        >
          <span
            aria-hidden="true"
            className="
              h-px
              w-8
              bg-[#EA661B]
            "
          />

          <span>
            NationPath Visual Report
          </span>

          {gallery.length > 1 && (
            <>
              <span className="text-gray-300">
                •
              </span>

              <span>
                {gallery.length} Images
              </span>
            </>
          )}
        </div>

        <ArticleShareBar
          title={title}
          url={shareUrl}
          articleId={articleId}
        />
      </div>
    </div>
  );
}

