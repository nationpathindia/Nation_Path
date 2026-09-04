"use client";

/*
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// PREMIUM HOROSCOPE
// VEDIC GUIDANCE — FINAL LOCK
//
// CMS FIRST
// NO ENGINE
// NO CALCULATION
// NO AI
//
// SOURCE OF TRUTH:
// MongoDB Horoscope CMS
//
// LOCKED:
// • Reads CMS data only
// • No interpretation
// • No calculation
// • No generated content
// • Missing fields remain hidden
// • CMS values are rendered as received
//////////////////////////////////////////////////////////////
*/

import { motion } from "framer-motion";

import {
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

import type { CmsHoroscopeVedic } from "./types";

//////////////////////////////////////////////////////////////
// PROPS
//////////////////////////////////////////////////////////////

interface Props {
  vedic?: CmsHoroscopeVedic;
}

//////////////////////////////////////////////////////////////
// COMPONENT
//////////////////////////////////////////////////////////////

export default function HoroscopeVedic({
  vedic,
}: Props) {
  ////////////////////////////////////////////////////////////
  // EMPTY
  ////////////////////////////////////////////////////////////

  if (!vedic) {
    return null;
  }

  ////////////////////////////////////////////////////////////
  // SAFE CMS ARRAYS
  //
  // Presentation-only filtering.
  // Actual CMS content is never transformed.
  ////////////////////////////////////////////////////////////

  const favorable = Array.isArray(vedic.favorable)
    ? vedic.favorable.filter(
        (item): item is string =>
          typeof item === "string" &&
          item.trim().length > 0
      )
    : [];

  const avoid = Array.isArray(vedic.avoid)
    ? vedic.avoid.filter(
        (item): item is string =>
          typeof item === "string" &&
          item.trim().length > 0
      )
    : [];

  ////////////////////////////////////////////////////////////
  // NOTHING TO DISPLAY
  ////////////////////////////////////////////////////////////

  if (!favorable.length && !avoid.length) {
    return null;
  }

  ////////////////////////////////////////////////////////////
  // RENDER
  ////////////////////////////////////////////////////////////

  return (
    <section
      data-section="vedic-guidance"
      aria-labelledby="vedic-guidance-title"
      className="
        relative
        px-3
        md:px-6
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 16,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          margin: "-60px",
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="
          group
          relative
          isolate
          overflow-hidden
          rounded-[28px]
          border
          border-[#C9A227]/25
          bg-[radial-gradient(circle_at_85%_8%,rgba(201,162,39,.10),transparent_30%),radial-gradient(circle_at_8%_92%,rgba(108,43,92,.12),transparent_32%),linear-gradient(135deg,#160F24_0%,#21142D_46%,#171021_100%)]
          shadow-[0_28px_80px_rgba(13,8,25,.28)]
          sm:rounded-[32px]
        "
      >
        {/* ================================================== */}
        {/* COSMIC AMBIENCE */}
        {/* ================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-24
            -top-28
            h-72
            w-72
            rounded-full
            bg-[#C9A227]/[0.12]
            blur-[105px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-28
            -left-24
            h-64
            w-64
            rounded-full
            bg-[#7D4A8A]/[0.16]
            blur-[105px]
          "
        />

        {/* subtle celestial light */}

        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            right-[18%]
            top-10
            h-1
            w-1
            rounded-full
            bg-[#E7CB70]
            shadow-[0_0_12px_rgba(231,203,112,.8)]
          "
          animate={{
            opacity: [0.25, 0.9, 0.25],
            scale: [0.8, 1.35, 0.8],
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-[34%]
            bottom-12
            h-1
            w-1
            rounded-full
            bg-[#B98AC7]
            shadow-[0_0_12px_rgba(185,138,199,.75)]
          "
          animate={{
            opacity: [0.15, 0.65, 0.15],
            scale: [0.7, 1.2, 0.7],
          }}
          transition={{
            duration: 4.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* top celestial line */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-8
            right-8
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-[#D8B84C]/70
            to-transparent
          "
        />

        {/* ================================================== */}
        {/* CONTENT */}
        {/* ================================================== */}

        <div
          className="
            relative
            z-10
            p-5
            sm:p-7
            lg:p-8
          "
        >
          {/* ================================================== */}
          {/* HEADER */}
          {/* ================================================== */}

          <header>
            <div
              className="
                flex
                items-center
                gap-2.5
              "
            >
              <div
                aria-hidden="true"
                className="
                  relative
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#D8B84C]/25
                  bg-[#D8B84C]/[0.10]
                  text-[#E4C866]
                  shadow-[0_0_22px_rgba(201,162,39,.08)]
                "
              >
                <Sparkles
                  size={16}
                  strokeWidth={1.7}
                />

                <span
                  aria-hidden="true"
                  className="
                    absolute
                    inset-0
                    rounded-full
                    border
                    border-[#D8B84C]/10
                  "
                />
              </div>

              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.30em]
                  text-[#D8B84C]
                  sm:text-[10px]
                  sm:tracking-[0.34em]
                "
              >
                Vedic Wisdom
              </p>
            </div>

            <div
              className="
                mt-3
                flex
                items-start
                justify-between
                gap-4
              "
            >
              <div className="min-w-0">
                <h2
                  id="vedic-guidance-title"
                  className="
                    font-serif
                    text-[1.35rem]
                    font-bold
                    leading-tight
                    tracking-[-0.02em]
                    text-[#FFF7DD]
                    sm:text-xl
                    md:text-2xl
                  "
                >
                  Favorable &amp; Cautions
                </h2>

                <p
                  className="
                    mt-1.5
                    max-w-2xl
                    text-[12px]
                    leading-5
                    text-[#D8CCBC]/75
                    sm:text-[13px]
                    md:text-sm
                  "
                >
                  Traditional guidance curated for this
                  horoscope period.
                </p>
              </div>

              <div
                aria-hidden="true"
                className="
                  hidden
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#D8B84C]/20
                  bg-[#D8B84C]/[0.07]
                  text-[#D8B84C]
                  sm:flex
                "
              >
                <ShieldCheck
                  size={17}
                  strokeWidth={1.6}
                />
              </div>
            </div>
          </header>

          {/* ================================================== */}
          {/* DIVIDER */}
          {/* ================================================== */}

          <div
            aria-hidden="true"
            className="
              mt-5
              h-px
              bg-gradient-to-r
              from-transparent
              via-[#D8B84C]/25
              to-transparent
            "
          />

          {/* ================================================== */}
          {/* GUIDANCE GRID */}
          {/* ================================================== */}

          <div
            className="
              mt-5
              grid
              gap-3
              md:grid-cols-2
              md:gap-4
            "
          >
            {/* ================================================== */}
            {/* FAVORABLE */}
            {/* ================================================== */}

            {favorable.length > 0 && (
              <motion.div
                whileHover={{
                  y: -2,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="
                  group/favorable
                  relative
                  overflow-hidden
                  rounded-[20px]
                  border
                  border-[#A7C98A]/20
                  bg-white/[0.055]
                  p-4
                  shadow-[0_12px_35px_rgba(0,0,0,.12)]
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:border-[#B8D99B]/35
                  hover:bg-white/[0.075]
                  sm:p-5
                "
              >
                {/* green atmospheric glow */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -right-10
                    -top-10
                    h-24
                    w-24
                    rounded-full
                    bg-[#8DB56B]/[0.10]
                    blur-2xl
                    transition-transform
                    duration-500
                    group-hover/favorable:scale-[1.5]
                  "
                />

                {/* top accent */}

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    left-0
                    right-0
                    top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-[#A7C98A]/45
                    to-transparent
                  "
                />

                {/* heading */}

                <div
                  className="
                    relative
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2.5
                    "
                  >
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-[11px]
                        border
                        border-[#A7C98A]/20
                        bg-[#A7C98A]/[0.09]
                        text-[#B9D69E]
                      "
                    >
                      <CheckCircle2
                        size={17}
                        strokeWidth={1.7}
                      />
                    </div>

                    <div>
                      <p
                        className="
                          text-[8px]
                          font-bold
                          uppercase
                          tracking-[0.22em]
                          text-[#AFCB92]
                        "
                      >
                        Positive Path
                      </p>

                      <p
                        className="
                          mt-0.5
                          text-sm
                          font-semibold
                          text-[#FFF7DD]
                        "
                      >
                        Favorable
                      </p>
                    </div>
                  </div>

                  <Sparkles
                    aria-hidden="true"
                    size={14}
                    className="
                      text-[#B9D69E]/50
                    "
                  />
                </div>

                {/* items */}

                <div className="relative mt-4 space-y-2">
                  {favorable.map((item, index) => (
                    <motion.div
                      key={`${item}-${index}`}
                      initial={{
                        opacity: 0,
                        x: -7,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.2,
                      }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.045,
                      }}
                      className="
                        group/item
                        flex
                        items-start
                        gap-2.5
                        rounded-[13px]
                        border
                        border-[#A7C98A]/[0.12]
                        bg-[#A7C98A]/[0.035]
                        px-3
                        py-2.5
                        transition-all
                        duration-300
                        hover:border-[#A7C98A]/25
                        hover:bg-[#A7C98A]/[0.06]
                      "
                    >
                      <span
                        aria-hidden="true"
                        className="
                          mt-[5px]
                          h-1.5
                          w-1.5
                          shrink-0
                          rounded-full
                          bg-[#B9D69E]
                          shadow-[0_0_8px_rgba(185,214,158,.55)]
                        "
                      />

                      <p
                        className="
                          min-w-0
                          text-[11px]
                          leading-[1.55]
                          text-[#DDD3C5]
                          sm:text-xs
                        "
                      >
                        {item}
                      </p>

                      <ArrowUpRight
                        aria-hidden="true"
                        size={11}
                        className="
                          mt-[2px]
                          shrink-0
                          text-[#A7C98A]/0
                          transition-all
                          duration-300
                          group-hover/item:text-[#A7C98A]/55
                        "
                      />
                    </motion.div>
                  ))}
                </div>

                {/* bottom line */}

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    bottom-0
                    left-5
                    right-5
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-[#A7C98A]/20
                    to-transparent
                  "
                />
              </motion.div>
            )}

            {/* ================================================== */}
            {/* CAUTIONS */}
            {/* ================================================== */}

            {avoid.length > 0 && (
              <motion.div
                whileHover={{
                  y: -2,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="
                  group/caution
                  relative
                  overflow-hidden
                  rounded-[20px]
                  border
                  border-[#B97A88]/20
                  bg-white/[0.045]
                  p-4
                  shadow-[0_12px_35px_rgba(0,0,0,.12)]
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:border-[#C78A98]/35
                  hover:bg-white/[0.065]
                  sm:p-5
                "
              >
                {/* caution atmospheric glow */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -right-10
                    -top-10
                    h-24
                    w-24
                    rounded-full
                    bg-[#A65D73]/[0.11]
                    blur-2xl
                    transition-transform
                    duration-500
                    group-hover/caution:scale-[1.5]
                  "
                />

                {/* top accent */}

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    left-0
                    right-0
                    top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-[#B97A88]/45
                    to-transparent
                  "
                />

                {/* heading */}

                <div
                  className="
                    relative
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2.5
                    "
                  >
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-[11px]
                        border
                        border-[#B97A88]/20
                        bg-[#B97A88]/[0.09]
                        text-[#D09AA7]
                      "
                    >
                      <XCircle
                        size={17}
                        strokeWidth={1.7}
                      />
                    </div>

                    <div>
                      <p
                        className="
                          text-[8px]
                          font-bold
                          uppercase
                          tracking-[0.22em]
                          text-[#C48A98]
                        "
                      >
                        Mindful Path
                      </p>

                      <p
                        className="
                          mt-0.5
                          text-sm
                          font-semibold
                          text-[#FFF7DD]
                        "
                      >
                        Cautions
                      </p>
                    </div>
                  </div>

                  <ShieldCheck
                    aria-hidden="true"
                    size={14}
                    className="
                      text-[#C48A98]/45
                    "
                  />
                </div>

                {/* items */}

                <div className="relative mt-4 space-y-2">
                  {avoid.map((item, index) => (
                    <motion.div
                      key={`${item}-${index}`}
                      initial={{
                        opacity: 0,
                        x: 7,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.2,
                      }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.045,
                      }}
                      className="
                        group/item
                        flex
                        items-start
                        gap-2.5
                        rounded-[13px]
                        border
                        border-[#B97A88]/[0.11]
                        bg-[#B97A88]/[0.03]
                        px-3
                        py-2.5
                        transition-all
                        duration-300
                        hover:border-[#B97A88]/25
                        hover:bg-[#B97A88]/[0.055]
                      "
                    >
                      <span
                        aria-hidden="true"
                        className="
                          mt-[5px]
                          h-1.5
                          w-1.5
                          shrink-0
                          rounded-full
                          bg-[#D09AA7]
                          shadow-[0_0_8px_rgba(208,154,167,.45)]
                        "
                      />

                      <p
                        className="
                          min-w-0
                          text-[11px]
                          leading-[1.55]
                          text-[#DDD3C5]
                          sm:text-xs
                        "
                      >
                        {item}
                      </p>

                      <ArrowUpRight
                        aria-hidden="true"
                        size={11}
                        className="
                          mt-[2px]
                          shrink-0
                          text-[#C48A98]/0
                          transition-all
                          duration-300
                          group-hover/item:text-[#C48A98]/55
                        "
                      />
                    </motion.div>
                  ))}
                </div>

                {/* bottom line */}

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    bottom-0
                    left-5
                    right-5
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-[#B97A88]/20
                    to-transparent
                  "
                />
              </motion.div>
            )}
          </div>

          {/* ================================================== */}
          {/* FOOTER MICRO CTA */}
          {/* ================================================== */}

          <div
            className="
              mt-4
              flex
              items-center
              justify-between
              gap-3
              border-t
              border-[#D8B84C]/10
              pt-3.5
            "
          >
            <div
              className="
                flex
                min-w-0
                items-center
                gap-2
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-1.5
                  w-1.5
                  shrink-0
                  rounded-full
                  bg-[#D8B84C]
                  shadow-[0_0_8px_rgba(216,184,76,.55)]
                "
              />

              <span
                className="
                  truncate
                  text-[9px]
                  font-medium
                  tracking-[0.08em]
                  text-[#CFC2B2]/65
                  sm:text-[10px]
                "
              >
                Traditional guidance · CMS curated
              </span>
            </div>

            <ArrowUpRight
              aria-hidden="true"
              size={14}
              className="
                shrink-0
                text-[#D8B84C]/50
              "
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}