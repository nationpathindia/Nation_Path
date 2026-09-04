"use client";

/*
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// PREMIUM HOROSCOPE — LUCKY FACTORS
//
// CMS FIRST
// NO ENGINE
// NO CALCULATION
// NO AI
//
// LOCKED:
//
// • Reads CMS data only
// • No lucky values are calculated here
// • Missing CMS values are hidden
//
// DESIGN:
//
// • Premium Cosmic / Vedic
// • Dark observatory palette
// • Compact Lucky constellation
// • Gold + violet atmosphere
// • Mobile-safe label + value layout
// • Subtle motion
//////////////////////////////////////////////////////////////
*/

import { motion } from "framer-motion";

import {
  Clover,
  Palette,
  Compass,
  Clock3,
  Gem,
  CircleDollarSign,
  Sparkles,
} from "lucide-react";

import type {
  CmsHoroscopeLucky,
} from "./types";

//////////////////////////////////////////////////////////////
// PROPS
//////////////////////////////////////////////////////////////

interface Props {
  lucky?: CmsHoroscopeLucky;
}

//////////////////////////////////////////////////////////////
// COMPONENT
//////////////////////////////////////////////////////////////

export default function HoroscopeLucky({
  lucky,
}: Props) {
  ////////////////////////////////////////////////////////////
  // EMPTY
  ////////////////////////////////////////////////////////////

  if (!lucky) {
    return null;
  }

  ////////////////////////////////////////////////////////////
  // CMS VALUES
  //
  // No calculation.
  // No transformation.
  // No generated content.
  ////////////////////////////////////////////////////////////

  const items = [
    {
      icon: Clover,
      label: "Lucky Number",
      value: lucky.number,
      index: "01",
    },
    {
      icon: Palette,
      label: "Lucky Color",
      value: lucky.color,
      index: "02",
    },
    {
      icon: Compass,
      label: "Lucky Direction",
      value: lucky.direction,
      index: "03",
    },
    {
      icon: Clock3,
      label: "Lucky Time",
      value: lucky.time,
      index: "04",
    },
    {
      icon: Gem,
      label: "Gemstone",
      value: lucky.gemstone,
      index: "05",
    },
    {
      icon: CircleDollarSign,
      label: "Lucky Metal",
      value: lucky.metal,
      index: "06",
    },
  ].filter((item) =>
    typeof item.value === "string"
      ? item.value.trim().length > 0
      : item.value !== undefined &&
        item.value !== null
  );

  ////////////////////////////////////////////////////////////
  // NOTHING TO DISPLAY
  ////////////////////////////////////////////////////////////

  if (items.length === 0) {
    return null;
  }

  ////////////////////////////////////////////////////////////
  // RENDER
  ////////////////////////////////////////////////////////////

  return (
    <section
      data-section="lucky-factors"
      aria-labelledby="lucky-factors-title"
      className="
        relative
        px-3
        md:px-6
      "
    >
      <div
        className="
          group
          relative
          isolate
          overflow-hidden
          rounded-[24px]
          border
          border-[#8c6aaf]/20
          bg-[#08062b]
          shadow-[0_24px_70px_rgba(5,3,35,.18)]
          sm:rounded-[28px]
        "
      >
        {/* ================================================== */}
        {/* COSMIC ATMOSPHERE */}
        {/* ================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            overflow-hidden
          "
        >
          {/* Violet upper glow */}

          <motion.div
            className="
              absolute
              -right-28
              -top-32
              h-[300px]
              w-[300px]
              rounded-full
              bg-[#8c1682]/16
              blur-[105px]
            "
            animate={{
              x: [0, 12, 0],
              y: [0, 10, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Deep violet lower glow */}

          <motion.div
            className="
              absolute
              -left-28
              bottom-[-140px]
              h-[310px]
              w-[310px]
              rounded-full
              bg-[#34136d]/24
              blur-[105px]
            "
            animate={{
              x: [0, -10, 0],
              y: [0, -8, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Central gold atmosphere */}

          <motion.div
            className="
              absolute
              left-[43%]
              top-[28%]
              h-[230px]
              w-[230px]
              rounded-full
              bg-[#d4af37]/[0.045]
              blur-[105px]
            "
            animate={{
              opacity: [0.45, 0.8, 0.45],
              scale: [0.95, 1.08, 0.95],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Fine stars */}

          <div
            className="
              absolute
              inset-0
              opacity-[0.028]
              [background-image:radial-gradient(rgba(255,255,255,.9)_1px,transparent_1px)]
              [background-size:34px_34px]
            "
          />

          {/* Gold top signal */}

          <motion.div
            className="
              absolute
              left-6
              right-6
              top-0
              h-[2px]
              bg-gradient-to-r
              from-transparent
              via-[#e5c54d]
              to-transparent
              sm:left-8
              sm:right-8
            "
            animate={{
              opacity: [0.45, 0.85, 0.45],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Constellation points */}

          <motion.span
            className="
              absolute
              left-[11%]
              top-[25%]
              h-1
              w-1
              rounded-full
              bg-[#e7c953]
              shadow-[0_0_12px_#e7c953]
            "
            animate={{
              opacity: [0.25, 0.75, 0.25],
              scale: [0.8, 1.35, 0.8],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.span
            className="
              absolute
              right-[16%]
              top-[18%]
              h-1.5
              w-1.5
              rounded-full
              bg-[#d96bb5]
              shadow-[0_0_13px_#d96bb5]
            "
            animate={{
              opacity: [0.2, 0.65, 0.2],
              scale: [0.8, 1.25, 0.8],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7,
            }}
          />

          <motion.span
            className="
              absolute
              bottom-[17%]
              left-[46%]
              h-1
              w-1
              rounded-full
              bg-[#e5c64e]
              shadow-[0_0_10px_#e5c64e]
            "
            animate={{
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
          />
        </div>

        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

        <header
          className="
            relative
            z-10
            flex
            items-start
            justify-between
            gap-4
            px-5
            pb-4
            pt-5
            sm:gap-5
            sm:px-7
            sm:pb-5
            sm:pt-6
            lg:px-8
            lg:pb-5
            lg:pt-6
          "
        >
          <div className="min-w-0">
            {/* Eyebrow */}

            <div
              className="
                flex
                items-center
                gap-2.5
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-px
                  w-7
                  shrink-0
                  bg-[#e1c34f]/65
                  sm:w-9
                "
              />

              <p
                className="
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.28em]
                  text-[#d8bd55]
                  sm:text-[9px]
                  sm:tracking-[0.32em]
                "
              >
                Today&apos;s Guidance
              </p>
            </div>

            {/* Title */}

            <h2
              id="lucky-factors-title"
              className="
                mt-2
                font-serif
                text-[1.3rem]
                font-semibold
                leading-tight
                tracking-[-0.025em]
                text-[#eee2b7]
                sm:text-[1.5rem]
                md:text-[1.65rem]
              "
            >
              Lucky Factors
            </h2>

            <p
              className="
                mt-1
                max-w-xl
                text-[11px]
                leading-5
                text-[#aaa1ba]
                sm:text-[12px]
              "
            >
              Your favorable elements for today.
            </p>
          </div>

          {/* ================================================== */}
          {/* HEADER ORBIT */}
          {/* ================================================== */}

          <div
            aria-hidden="true"
            className="
              relative
              hidden
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-[#d4af37]/20
              bg-[#d4af37]/[0.045]
              text-[#dfc45a]
              sm:flex
            "
          >
            <motion.span
              className="
                absolute
                inset-1
                rounded-full
                border
                border-dashed
                border-[#d4af37]/20
              "
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <Sparkles
              size={15}
              strokeWidth={1.5}
            />
          </div>
        </header>

        {/* ================================================== */}
        {/* DIVIDER */}
        {/* ================================================== */}

        <div
          aria-hidden="true"
          className="
            relative
            z-10
            mx-5
            h-px
            bg-gradient-to-r
            from-transparent
            via-[#d4af37]/22
            to-transparent
            sm:mx-7
            lg:mx-8
          "
        />

        {/* ================================================== */}
        {/* LUCKY CONSTELLATION */}
        {/* ================================================== */}

        <div
          className="
            relative
            z-10
            px-5
            pb-5
            pt-4
            sm:px-7
            sm:pb-6
            sm:pt-5
            lg:px-8
          "
        >
          {/* Subtle constellation rail */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-[13%]
              right-[13%]
              top-[29px]
              hidden
              h-px
              bg-gradient-to-r
              from-transparent
              via-[#d4af37]/10
              to-transparent
              md:block
            "
          />

          {/* ================================================== */}
          {/* GRID */}
          {/* ================================================== */}

          <div
            className="
              grid
              grid-cols-2
              gap-2.5
              sm:gap-3
              md:grid-cols-3
            "
          >
            {items.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.label}
                  initial={{
                    opacity: 0,
                    y: 12,
                    scale: 0.985,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.42,
                    delay: index * 0.055,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -3,
                  }}
                  className="
                    group/card
                    relative
                    min-h-[112px]
                    overflow-hidden
                    rounded-[15px]
                    border
                    border-white/[0.07]
                    bg-gradient-to-br
                    from-[#151039]/95
                    via-[#0d092f]/95
                    to-[#110a35]/95
                    p-3.5
                    shadow-[0_12px_30px_rgba(0,0,0,.14)]
                    transition-all
                    duration-300
                    hover:border-[#d4af37]/25
                    hover:shadow-[0_18px_38px_rgba(0,0,0,.22)]
                    sm:min-h-[118px]
                    sm:p-4
                  "
                >
                  {/* ================================================== */}
                  {/* CARD GLOW */}
                  {/* ================================================== */}

                  <motion.div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      -right-10
                      -top-10
                      h-24
                      w-24
                      rounded-full
                      bg-[#d4af37]/[0.055]
                      blur-[40px]
                    "
                    whileHover={{
                      scale: 1.5,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                  />

                  {/* ================================================== */}
                  {/* TOP SIGNAL */}
                  {/* ================================================== */}

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      left-4
                      right-4
                      top-0
                      h-px
                      bg-gradient-to-r
                      from-transparent
                      via-[#d4af37]/25
                      to-transparent
                    "
                  />

                  {/* ================================================== */}
                  {/* CARD HEADER */}
                  {/* ================================================== */}

                  <div
                    className="
                      relative
                      flex
                      items-start
                      justify-between
                      gap-2
                    "
                  >
                    {/* Icon */}

                    <motion.div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-[11px]
                        border
                        border-[#d4af37]/15
                        bg-[#d4af37]/[0.045]
                        text-[#dfc45a]
                        transition-colors
                        duration-300
                        group-hover/card:border-[#d4af37]/30
                        group-hover/card:bg-[#d4af37]/[0.075]
                      "
                      whileHover={{
                        rotate: -5,
                        scale: 1.06,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                    >
                      <Icon
                        size={16}
                        strokeWidth={1.65}
                      />
                    </motion.div>

                    {/* Index */}

                    <span
                      className="
                        shrink-0
                        rounded-full
                        border
                        border-white/[0.055]
                        bg-white/[0.02]
                        px-1.5
                        py-[3px]
                        text-[6px]
                        font-bold
                        tracking-[0.16em]
                        text-[#5f5878]
                      "
                    >
                      {item.index}
                    </span>
                  </div>

                  {/* ================================================== */}
                  {/* LABEL + VALUE — MOBILE SAFE */}
                  {/* ================================================== */}

                  <div
                    className="
                      relative
                      mt-4
                      flex
                      items-start
                      justify-between
                      gap-2
                    "
                  >
                    {/* Label */}

                    <p
                      className="
                        min-w-0
                        flex-1
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.11em]
                        text-[#817a98]
                        sm:text-[9px]
                        sm:tracking-[0.15em]
                      "
                    >
                      {item.label}
                    </p>

                    {/* Value */}

                    <motion.p
                      className="
                        min-w-0
                        max-w-[62%]
                        break-words
                        text-right
                        font-serif
                        text-[14px]
                        font-bold
                        leading-[1.25]
                        tracking-[-0.01em]
                        text-[#eee2b7]
                        sm:text-[17px]
                        sm:leading-5
                      "
                      whileHover={{
                        scale: 1.025,
                      }}
                    >
                      {item.value}
                    </motion.p>
                  </div>

                  {/* ================================================== */}
                  {/* CONSTELLATION POINT */}
                  {/* ================================================== */}

                  <motion.span
                    aria-hidden="true"
                    className="
                      absolute
                      bottom-3
                      right-3
                      h-1
                      w-1
                      rounded-full
                      bg-[#d4af37]/45
                      shadow-[0_0_8px_rgba(212,175,55,.35)]
                    "
                    animate={{
                      opacity: [0.35, 0.9, 0.35],
                      scale: [0.8, 1.25, 0.8],
                    }}
                    transition={{
                      duration: 3 + index * 0.25,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.25,
                    }}
                  />

                  {/* ================================================== */}
                  {/* BOTTOM ACCENT */}
                  {/* ================================================== */}

                  <div
                    aria-hidden="true"
                    className="
                      absolute
                      bottom-0
                      left-4
                      right-4
                      h-px
                      bg-gradient-to-r
                      from-transparent
                      via-[#d4af37]/15
                      to-transparent
                    "
                  />
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* ================================================== */}
        {/* FOOTER SIGNAL */}
        {/* ================================================== */}

        <div
          className="
            relative
            z-10
            flex
            items-center
            justify-between
            gap-3
            border-t
            border-white/[0.045]
            px-5
            py-3
            sm:gap-4
            sm:px-7
            lg:px-8
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
            <motion.span
              className="
                h-1.5
                w-1.5
                shrink-0
                rounded-full
                bg-[#e5c64e]
                shadow-[0_0_9px_rgba(229,198,78,.5)]
              "
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <span
              className="
                truncate
                text-[6px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#706982]
                sm:text-[7px]
              "
            >
              NationPath Astro
            </span>
          </div>

          <div
            className="
              flex
              min-w-0
              shrink-0
              items-center
              gap-1.5
              text-[6px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-[#706982]
              sm:text-[7px]
              sm:tracking-[0.16em]
            "
          >
            <Sparkles
              size={8}
              className="shrink-0 text-[#b99a40]"
            />

            <span className="truncate">
              CMS Life Guidance
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

