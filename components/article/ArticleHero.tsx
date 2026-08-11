"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

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
}

export default function ArticleHero({
  image,
  images = [],
  imageGallery = [],
  title,
  shareUrl,
}: ArticleHeroProps) {
  /*
   * =====================================================
   * BUILD GALLERY
   * =====================================================
   *
   * Priority:
   *
   * 1. imageGallery
   * 2. images[]
   * 3. single image
   *
   * Original database URLs are never modified.
   */

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
          url,
          alt: title,
          caption: "",
          isPrimary: false,
        }));
    }

    if (image) {
      return [
        {
          url: image,
          alt: title,
          caption: "",
          isPrimary: true,
        },
      ];
    }

    return [];
  }, [imageGallery, images, image, title]);

  /*
   * =====================================================
   * PRIMARY IMAGE
   * =====================================================
   */

  const initialIndex = useMemo(() => {
    const primaryIndex = gallery.findIndex(
      (item) => item.isPrimary === true,
    );

    return primaryIndex >= 0 ? primaryIndex : 0;
  }, [gallery]);

  const [activeIndex, setActiveIndex] =
    useState(initialIndex);

  /*
   * =====================================================
   * RESET WHEN ARTICLE / GALLERY CHANGES
   * =====================================================
   */

  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [initialIndex]);

  /*
   * =====================================================
   * SAFETY
   * =====================================================
   */

  if (gallery.length === 0) {
    return null;
  }

  const safeActiveIndex =
    activeIndex >= 0 &&
    activeIndex < gallery.length
      ? activeIndex
      : 0;

  const activeImage =
    gallery[safeActiveIndex];

  if (!activeImage?.url) {
    return null;
  }

  /*
   * =====================================================
   * CLOUDINARY DELIVERY URL
   * =====================================================
   *
   * Cloudinary handles:
   *
   * - f_auto
   * - q_auto
   * - requested width
   *
   * We intentionally keep `unoptimized` on next/image
   * so Vercel does NOT proxy/optimize the image again.
   */

  const optimizedImage = useMemo(() => {
    return cloudinaryImageUrl(
      activeImage.url,
      1200,
    );
  }, [activeImage.url]);

  if (!optimizedImage) {
    return null;
  }

  /*
   * =====================================================
   * SLIDER CONTROLS
   * =====================================================
   */

  function nextImage() {
    setActiveIndex((current) =>
      current >= gallery.length - 1
        ? 0
        : current + 1,
    );
  }

  function previousImage() {
    setActiveIndex((current) =>
      current <= 0
        ? gallery.length - 1
        : current - 1,
    );
  }

  /*
   * =====================================================
   * AUTO SLIDER
   * =====================================================
   */

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
    }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, [gallery.length]);

  /*
   * =====================================================
   * RENDER
   * =====================================================
   */

  return (
    <div className="mb-12">
      <div
        className="
          group
          relative
          aspect-[16/10]
          w-full
          overflow-hidden
          rounded-2xl
          bg-black/5
          sm:aspect-[16/9]
        "
      >
        <Image
          key={activeImage.url}
          src={optimizedImage}
          alt={activeImage.alt || title}
          fill
          priority={safeActiveIndex === initialIndex}
          loading={
            safeActiveIndex === initialIndex
              ? undefined
              : "lazy"
          }
          sizes="
            (max-width: 640px) 100vw,
            (max-width: 1024px) 90vw,
            1200px
          "
          unoptimized
          className="
            object-cover
            scale-100
            transition-all
            duration-[1200ms]
            ease-out
            group-hover:scale-105
          "
        />

        {gallery.length > 1 && (
          <>
            <button
              type="button"
              onClick={previousImage}
              aria-label="Previous image"
              className="
                absolute
                left-4
                top-1/2
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                bg-black/40
                text-xl
                text-white
                backdrop-blur-md
              "
            >
              ‹
            </button>

            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="
                absolute
                right-4
                top-1/2
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                bg-black/40
                text-xl
                text-white
                backdrop-blur-md
              "
            >
              ›
            </button>

            <div
              className="
                absolute
                bottom-5
                left-1/2
                flex
                -translate-x-1/2
                gap-2
              "
            >
              {gallery.map((item, index) => (
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
                    h-2
                    rounded-full
                    transition-all
                    ${
                      safeActiveIndex === index
                        ? "w-6 bg-white"
                        : "w-2 bg-white/60"
                    }
                  `}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {activeImage.caption && (
        <div
          className="
            mt-3
            text-sm
            italic
            text-gray-500
          "
        >
          {activeImage.caption}
        </div>
      )}

      <div
        className="
          mt-4
          flex
          flex-col
          gap-3
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
            text-xs
            uppercase
            tracking-[0.18em]
            text-gray-500
          "
        >
          <span
            className="
              h-[1px]
              w-8
              bg-[#EA661B]
            "
          />

          NationPath Visual Report
        </div>

        <ArticleShareBar
          title={title}
          url={shareUrl}
        />
      </div>
    </div>
  );
}

