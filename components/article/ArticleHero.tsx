"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import ArticleShareBar from "@/components/article/ArticleShareBar";

import {
  cloudinaryImageUrl,
} from "@/lib/cloudinary-image";

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
   * GALLERY INTELLIGENCE
   *
   * Preserve existing gallery priority:
   *
   * imageGallery
   * → images
   * → single image
   * → empty
   */

  const gallery: GalleryImage[] =
    imageGallery.length > 0
      ? imageGallery
      : images.length > 0
      ? images.map((url) => ({
          url,
          alt: title,
          caption: "",
          isPrimary: false,
        }))
      : image
      ? [
          {
            url: image,
            alt: title,
            caption: "",
            isPrimary: true,
          },
        ]
      : [];

  /*
   * PRIMARY IMAGE
   */

  const primaryIndex =
    gallery.findIndex(
      (img) => img.isPrimary
    );

  const [activeIndex, setActiveIndex] =
    useState(
      primaryIndex >= 0
        ? primaryIndex
        : 0
    );

  /*
   * RESET ACTIVE IMAGE
   */

  useEffect(() => {
    const primary =
      gallery.findIndex(
        (img) => img.isPrimary
      );

    setActiveIndex(
      primary >= 0
        ? primary
        : 0
    );
  }, [imageGallery]);

  /*
   * AUTO SLIDER
   */

  useEffect(() => {
    if (gallery.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setActiveIndex((prev) =>
        prev === gallery.length - 1
          ? 0
          : prev + 1
      );
    }, 5000);

    return () =>
      clearInterval(timer);
  }, [gallery.length]);

  if (!gallery.length) {
    return null;
  }

  /*
   * SLIDER CONTROLS
   */

  function nextImage() {
    setActiveIndex((prev) =>
      prev === gallery.length - 1
        ? 0
        : prev + 1
    );
  }

  function previousImage() {
    setActiveIndex((prev) =>
      prev === 0
        ? gallery.length - 1
        : prev - 1
    );
  }

  const activeImage =
    gallery[activeIndex];

  /*
   * CLOUDINARY DELIVERY OPTIMIZATION
   *
   * Original database URL remains unchanged.
   * Only delivery URL is optimized.
   */

  const optimizedImage =
    activeImage?.url
      ? cloudinaryImageUrl(
          activeImage.url,
          1200
        )
      : null;

  if (!optimizedImage) {
    return null;
  }

  return (
    <div
      className="
        mb-12
      "
    >
      <div
        className="
          group
          relative
          aspect-[16/10]
          sm:aspect-[16/9]
          w-full
          overflow-hidden
          rounded-2xl
          bg-black/5
        "
      >
        <Image
          key={activeImage.url}
          src={optimizedImage}
          alt={
            activeImage.alt ||
            title
          }
          fill
          priority={
            activeIndex === 0
          }
          sizes="
            (max-width:640px) 100vw,
            (max-width:1024px) 90vw,
            900px
          "
          unoptimized
          className="
            object-cover
            scale-100
            group-hover:scale-105
            transition-all
            duration-[1200ms]
            ease-out
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
                -translate-y-1/2
                flex
                items-center
                justify-center
                h-10
                w-10
                rounded-full
                bg-black/40
                backdrop-blur-md
                border
                border-white/20
                text-white
                text-xl
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
                -translate-y-1/2
                flex
                items-center
                justify-center
                h-10
                w-10
                rounded-full
                bg-black/40
                backdrop-blur-md
                border
                border-white/20
                text-white
                text-xl
              "
            >
              ›
            </button>

            <div
              className="
                absolute
                bottom-5
                left-1/2
                -translate-x-1/2
                flex
                gap-2
              "
            >
              {gallery.map(
                (_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      setActiveIndex(
                        index
                      )
                    }
                    aria-label={
                      `Go to image ${
                        index + 1
                      }`
                    }
                    className={`
                      h-2
                      rounded-full
                      transition-all
                      ${
                        activeIndex ===
                        index
                          ? "w-6 bg-white"
                          : "w-2 bg-white/60"
                      }
                    `}
                  />
                )
              )}
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

