"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// PREMIUM HOROSCOPE
// COMPATIBILITY
//
// CMS ONLY
// NO ENGINE
// NO CALCULATION
// NO AI
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import {
  Heart,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import type { CmsHoroscopeCompatibility } from "./types";

interface Props {
  compatibility?: CmsHoroscopeCompatibility;
}

export default function HoroscopeCompatibility({
  compatibility,
}: Props) {
  if (!compatibility) return null;

  const hasContent =
    compatibility.title ||
    compatibility.description ||
    compatibility.link;

  if (!hasContent) return null;

  return (
    <section className="px-3 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border border-[#D4AF37]/30
          bg-[#FFF9E8]
          p-5
          shadow-[0_25px_70px_rgba(122,31,31,.08)]
          md:p-7
        "
      >

        {/* COSMIC BACKGROUND */}

        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-64
            w-64
            rounded-full
            bg-[#D4AF37]/10
            blur-[110px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-24
            -left-24
            h-56
            w-56
            rounded-full
            bg-[#7A1F1F]/8
            blur-[100px]
          "
        />

        <div className="relative z-10">

          {/* HEADER */}

          <div className="flex items-center gap-2">

            <div
              className="
                rounded-full
                bg-[#D4AF37]/15
                p-2
              "
            >
              <Heart
                size={16}
                className="text-[#8B5E00]"
              />
            </div>

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-[#8B5E00]
              "
            >
              Cosmic Compatibility
            </p>

          </div>


          {/* TITLE */}

          {compatibility.title && (
            <h2
              className="
                mt-3
                font-serif
                text-xl
                font-bold
                text-[#3B2600]
                md:text-2xl
              "
            >
              {compatibility.title}
            </h2>
          )}


          {/* DESCRIPTION */}

          {compatibility.description && (
            <div
              className="
                mt-4
                rounded-2xl
                border
                border-[#D4AF37]/20
                bg-white/55
                p-4
                backdrop-blur-md
              "
            >

              <div className="flex items-start gap-3">

                <Sparkles
                  size={16}
                  className="
                    mt-1
                    shrink-0
                    text-[#D4AF37]
                  "
                />

                <p
                  className="
                    text-sm
                    leading-6
                    text-[#5F4A25]
                  "
                >
                  {compatibility.description}
                </p>

              </div>

            </div>
          )}


          {/* CTA */}

          {compatibility.link && (
            <motion.a
              href={compatibility.link}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#D4AF37]/40
                bg-[#3B2600]
                px-4
                py-2.5
                text-xs
                font-bold
                text-[#FFF9E8]
                shadow-[0_12px_30px_rgba(59,38,0,.18)]
                transition-all
                hover:bg-[#4B3100]
              "
            >
              Explore Compatibility

              <ArrowUpRight size={14} />
            </motion.a>
          )}

        </div>
      </motion.div>
    </section>
  );
}