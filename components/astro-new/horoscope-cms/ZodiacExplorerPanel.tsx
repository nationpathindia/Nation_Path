"use client";

/*
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// ZODIAC EXPLORER
// FINAL LOCKED — PREMIUM COSMIC ZODIAC PLAYING CARDS
//
// DESKTOP  : 6 × 2
// MOBILE   : 4 × 3
//
// FRONT    : Zodiac symbol + name
// BACK     : CMS zodiac details + CMS Vedic Name Initials
//
// AUTO     : ONE CARD FLIPS AT A TIME
//            PREVIOUS CARD RETURNS TO FRONT
//
// CLICK    : Open zodiac horoscope
//
// CMS ONLY
// NO ENGINE
// NO CALCULATION
// NO AI
//
// VISUAL
// PREMIUM COSMIC
// GOLD COSMIC CARD
// NO WHITE LINES
// SUBTLE GOLD MOTION
// NO HEAVY SHADOW
//////////////////////////////////////////////////////////////
*/

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

import type { CmsZodiacItem } from "./types";

interface Props {
  zodiac?: CmsZodiacItem[];
  active?: string;
}

export default function ZodiacExplorerPanel({
  zodiac = [],
  active,
}: Props) {
  //////////////////////////////////////////////////////////////
  // LOCK TO 12 ZODIACS
  //////////////////////////////////////////////////////////////

  const cards = useMemo(
    () => zodiac.slice(0, 12),
    [zodiac]
  );

  //////////////////////////////////////////////////////////////
  // FLIP STATE
  //
  // ONLY ONE CARD CAN BE FLIPPED AT A TIME.
  //
  // Example:
  //
  // Aries BACK
  // ↓
  // Aries FRONT + Taurus BACK
  // ↓
  // Taurus FRONT + Gemini BACK
  //
  //////////////////////////////////////////////////////////////

  const [flipped, setFlipped] = useState<
    Record<number, boolean>
  >({});

  //////////////////////////////////////////////////////////////
  // CONTINUOUS ZODIAC AUTO FLIP
  //
  // IMPORTANT:
  // Previous card is automatically reset to FRONT.
  //////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!cards.length) return;

    let index = 0;

    const timer = window.setInterval(() => {
      const current = index % cards.length;

      setFlipped(() => ({
        [current]: true,
      }));

      index += 1;
    }, 3000);

    return () => {
      window.clearInterval(timer);
    };
  }, [cards.length]);

  //////////////////////////////////////////////////////////////
  // EMPTY
  //////////////////////////////////////////////////////////////

  if (!cards.length) return null;

  //////////////////////////////////////////////////////////////
  // HELPERS
  //////////////////////////////////////////////////////////////

  const getName = (item: CmsZodiacItem) =>
    item.name ||
    item.english ||
    item.zodiac ||
    "Zodiac";

  const getSlug = (item: CmsZodiacItem) =>
    item.slug ||
    item.zodiac ||
    "";

  //////////////////////////////////////////////////////////////
  // CMS VEDIC NAME INITIALS
  //
  // CMS ONLY
  // NO CALCULATION
  // NO HARDCODE
  //////////////////////////////////////////////////////////////
const getInitials = (
  item: CmsZodiacItem
): string[] => {
  if (!Array.isArray(item.nameInitials)) {
    return [];
  }

  return item.nameInitials
    .filter(
      (value): value is string =>
        typeof value === "string" &&
        value.trim().length > 0
    )
    .map((value) => value.trim())
    .slice(0, 6);
};

  //////////////////////////////////////////////////////////////
  // GOLD IMAGE FILTER
  //
  // Forces CMS zodiac artwork into premium gold language.
  //////////////////////////////////////////////////////////////

  const goldImageFilter =
    "brightness(0) saturate(100%) invert(78%) sepia(48%) saturate(610%) hue-rotate(359deg) brightness(95%) contrast(91%) drop-shadow(0 0 7px rgba(242,205,78,.48))";

  //////////////////////////////////////////////////////////////
  // RENDER
  //////////////////////////////////////////////////////////////

  return (
    <section
      data-section="zodiac-explorer"
      className="px-3 md:px-6"
    >
      <div
        className="
          relative
          isolate
          overflow-hidden
          rounded-[20px]
          border
          border-[#d4af37]/[0.13]
          bg-[#080625]
          px-3
          py-3.5
          sm:px-4
          sm:py-4
          md:rounded-[24px]
          md:px-5
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
          <div
            className="
              absolute
              -right-28
              -top-32
              h-64
              w-64
              rounded-full
              bg-[#8d318f]/[0.11]
              blur-[105px]
            "
          />

          <div
            className="
              absolute
              -bottom-32
              -left-28
              h-64
              w-64
              rounded-full
              bg-[#49318d]/[0.13]
              blur-[105px]
            "
          />

          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-40
              w-40
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[#d4af37]/[0.025]
              blur-[90px]
            "
          />

          <div
            className="
              absolute
              inset-0
              opacity-[0.018]
              [background-image:radial-gradient(rgba(212,175,55,.8)_1px,transparent_1px)]
              [background-size:28px_28px]
            "
          />
        </div>

        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

        <div
          className="
            relative
            z-10
            mb-3
            flex
            items-center
            justify-between
          "
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{
                rotate: [0, 6, -6, 0],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles
                size={16}
                strokeWidth={1.7}
                className="text-[#d4af37]"
              />
            </motion.div>

            <span
              className="
                text-[9.5px]
                font-bold
                uppercase
                tracking-[0.27em]
                text-[#e1c65a]
              "
            >
              Zodiac Explorer
            </span>
          </div>

          <div
            className="
              relative
              overflow-hidden
              rounded-full
              border
              border-[#d4af37]/[0.16]
              bg-[#d4af37]/[0.035]
              px-2.5
              py-1
            "
          >
            <motion.span
              aria-hidden="true"
              className="
                absolute
                inset-y-0
                -left-5
                w-5
                rotate-[18deg]
                bg-gradient-to-r
                from-transparent
                via-[#d4af37]/[0.16]
                to-transparent
              "
              animate={{
                left: ["-20%", "130%"],
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                repeatDelay: 2.5,
                ease: "easeInOut",
              }}
            />

            <span
              className="
                relative
                text-[7.5px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-[#9e925f]
              "
            >
              12 Signs
            </span>
          </div>
        </div>

        {/* ================================================== */}
        {/* CARD TABLE */}
        {/* ================================================== */}

        <div
          className="
            relative
            z-10
            grid
            grid-cols-4
            gap-1
            sm:gap-1.5
            md:grid-cols-6
            md:gap-1.5
          "
        >
          {cards.map((item, index) => {
            const name = getName(item);
            const slug = getSlug(item);

            const isFlipped = !!flipped[index];

            const initials = getInitials(item);

            const isActive =
              active?.toLowerCase() ===
              item.zodiac?.toLowerCase();

            return (
              <motion.a
                key={`${item.zodiac}-${slug}-${index}`}
                href={`/astro/horoscope/${slug}`}
                initial={{
                  opacity: 0,
                  y: 6,
                  scale: 0.97,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.08,
                }}
                transition={{
                  duration: 0.25,
                  delay: index * 0.025,
                }}
                whileHover={{
                  y: -3,
                  scale: 1.025,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="
                  group
                  relative
                  mx-auto
                  block
                  aspect-[0.82]
                  w-[75%]
                  [perspective:1200px]
                "
                aria-label={`Open ${name} horoscope`}
              >
                {/* ================================================== */}
                {/* MOVING GOLD OUTLINE */}
                {/* ================================================== */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -inset-[1px]
                    overflow-hidden
                    rounded-[10px]
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                >
                  <motion.div
                    className="
                      absolute
                      left-[-60%]
                      top-1/2
                      h-px
                      w-[220%]
                      bg-gradient-to-r
                      from-transparent
                      via-[#d4af37]/[0.55]
                      to-transparent
                    "
                    animate={{
                      x: ["-20%", "35%"],
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>

                {/* ================================================== */}
                {/* 3D CARD */}
                {/* ================================================== */}

                <motion.div
                  animate={{
                    rotateY: isFlipped ? 180 : 0,
                  }}
                  transition={{
                    duration: 0.78,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    relative
                    h-full
                    w-full
                    [transform-style:preserve-3d]
                  "
                >
                  {/* ================================================== */}
                  {/* FRONT */}
                  {/* ================================================== */}

                  <div
                    className={[
                      `
                        absolute
                        inset-0
                        overflow-hidden
                        rounded-[8px]
                        border
                        bg-[linear-gradient(145deg,#100b34,#09072a)]
                        [backface-visibility:hidden]
                        transition-all
                        duration-500
                        sm:rounded-[9px]
                      `,
                      isActive
                        ? `
                          border-[#d4af37]/70
                          shadow-[0_0_18px_rgba(212,175,55,.12)]
                        `
                        : `
                          border-[#d4af37]/[0.18]
                          group-hover:border-[#d4af37]/[0.48]
                        `,
                    ].join(" ")}
                  >
                    {/* GOLD INNER FRAME */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-[3px]
                        rounded-[6px]
                        border
                        border-[#d4af37]/[0.12]
                        transition-all
                        duration-700
                        group-hover:border-[#d4af37]/[0.24]
                        sm:inset-[3px]
                        sm:rounded-[7px]
                      "
                    />

                    {/* GOLD CORNER DETAILS */}

                    <span
                      className="
                        pointer-events-none
                        absolute
                        left-[5px]
                        top-[5px]
                        h-2
                        w-2
                        border-l
                        border-t
                        border-[#d4af37]/[0.34]
                        transition-all
                        duration-500
                        group-hover:h-2.5
                        group-hover:w-2.5
                        group-hover:border-[#d4af37]/[0.60]
                      "
                    />

                    <span
                      className="
                        pointer-events-none
                        absolute
                        right-[5px]
                        top-[5px]
                        h-2
                        w-2
                        border-r
                        border-t
                        border-[#d4af37]/[0.34]
                        transition-all
                        duration-500
                        group-hover:h-2.5
                        group-hover:w-2.5
                        group-hover:border-[#d4af37]/[0.60]
                      "
                    />

                    <span
                      className="
                        pointer-events-none
                        absolute
                        bottom-[5px]
                        left-[5px]
                        h-2
                        w-2
                        border-b
                        border-l
                        border-[#d4af37]/[0.22]
                      "
                    />

                    <span
                      className="
                        pointer-events-none
                        absolute
                        bottom-[5px]
                        right-[5px]
                        h-2
                        w-2
                        border-b
                        border-r
                        border-[#d4af37]/[0.22]
                      "
                    />

                    {/* INNER COSMIC CIRCLE */}

                    <motion.div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-[45%]
                        h-[68%]
                        w-[68%]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        border
                        border-[#d4af37]/[0.055]
                      "
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    {/* NUMBER */}

                    <span
                      className="
                        absolute
                        left-1.5
                        top-1.5
                        z-20
                        font-serif
                        text-[7.7px]
                        font-bold
                        text-[#d4af37]/75
                        sm:left-2
                        sm:top-2
                        sm:text-[8.2px]
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* STAR */}

                    <motion.span
                      className="
                        absolute
                        right-1.5
                        top-1.5
                        z-20
                        text-[9px]
                        text-[#d4af37]/70
                        sm:right-2
                        sm:top-2
                        sm:text-[10px]
                      "
                      animate={{
                        opacity: [0.45, 0.9, 0.45],
                        scale: [1, 1.12, 1],
                      }}
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.12,
                      }}
                    >
                      ✦
                    </motion.span>

                    {/* ================================================== */}
                    {/* SYMBOL GLOW */}
                    {/* ================================================== */}

                    <motion.div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-[45%]
                        h-14
                        w-14
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-[#d4af37]/[0.07]
                        blur-[18px]
                      "
                      animate={{
                        scale: [1, 1.12, 1],
                        opacity: [0.55, 0.85, 0.55],
                      }}
                      transition={{
                        duration: 3.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.1,
                      }}
                    />

                    {/* ================================================== */}
                    {/* ZODIAC EMBLEM */}
                    {/* ================================================== */}

                    <div
                      className="
                        absolute
                        left-1/2
                        top-[45%]
                        z-10
                        flex
                        h-[39px]
                        w-[39px]
                        -translate-x-1/2
                        -translate-y-1/2
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-full
                        border
                        border-[#d4af37]/[0.34]
                        bg-[#15103d]
                        transition-all
                        duration-500
                        group-hover:border-[#d4af37]/[0.62]
                        sm:h-[45px]
                        sm:w-[45px]
                      "
                    >
                      {/* Animated gold ring */}

                      <motion.div
                        aria-hidden="true"
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          rounded-full
                          border
                          border-[#d4af37]/[0.12]
                        "
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />

                      {item.image ? (
                        <img
                          src={item.image}
                          alt={name}
                          className="
                            relative
                            z-10
                            h-[82%]
                            w-[82%]
                            object-contain
                            transition-transform
                            duration-500
                            group-hover:scale-110
                          "
                          style={{
                            filter: goldImageFilter,
                          }}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <span
                          className="
                            relative
                            z-10
                            select-none
                            font-serif
                            text-[25px]
                            leading-none
                            text-[#d4af37]
                            drop-shadow-[0_0_9px_rgba(242,205,78,.55)]
                            transition-transform
                            duration-500
                            group-hover:scale-110
                            sm:text-[27px]
                          "
                        >
                          {item.symbol || "✦"}
                        </span>
                      )}
                    </div>

                    {/* GOLD DIVIDER */}

                    <motion.div
                      className="
                        absolute
                        bottom-6
                        left-1/2
                        h-px
                        w-7
                        -translate-x-1/2
                        bg-gradient-to-r
                        from-transparent
                        via-[#d4af37]/[0.42]
                        to-transparent
                      "
                      animate={{
                        width: ["28px", "36px", "28px"],
                        opacity: [0.45, 0.8, 0.45],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* NAME */}

                    <div
                      className="
                        absolute
                        bottom-1.5
                        left-1
                        right-1
                        z-20
                        text-center
                        sm:bottom-2
                      "
                    >
                      <p
                        className="
                          truncate
                          font-serif
                          text-[8.8px]
                          font-semibold
                          tracking-[0.01em]
                          text-[#d4af37]
                          drop-shadow-[0_0_6px_rgba(212,175,55,.18)]
                          transition-all
                          duration-300
                          group-hover:text-[#f2d24e]
                          sm:text-[9.8px]
                        "
                      >
                        {name}
                      </p>
                    </div>

                    {/* GOLD SHINE */}

                    <motion.div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        -left-[70%]
                        top-0
                        h-full
                        w-[38%]
                        rotate-[18deg]
                        bg-gradient-to-r
                        from-transparent
                        via-[#d4af37]/[0.075]
                        to-transparent
                        opacity-0
                      "
                      animate={{
                        left: ["-70%", "130%"],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 3.8,
                        repeat: Infinity,
                        repeatDelay: 2.2,
                        ease: "easeInOut",
                        delay: index * 0.18,
                      }}
                    />
                  </div>

                  {/* ================================================== */}
                  {/* BACK */}
                  {/* ================================================== */}

                  <div
                    className="
                      absolute
                      inset-0
                      overflow-hidden
                      rounded-[8px]
                      border
                      border-[#d4af37]/[0.28]
                      bg-[linear-gradient(145deg,#120d38,#09072b)]
                      [backface-visibility:hidden]
                      [transform:rotateY(180deg)]
                      sm:rounded-[9px]
                    "
                  >
                    {/* BACK INNER FRAME */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-[3px]
                        rounded-[6px]
                        border
                        border-[#d4af37]/[0.12]
                        sm:inset-[3px]
                        sm:rounded-[7px]
                      "
                    />

                    {/* BACK GOLD CORNERS */}

                    <span
                      className="
                        pointer-events-none
                        absolute
                        left-[5px]
                        top-[5px]
                        h-2
                        w-2
                        border-l
                        border-t
                        border-[#d4af37]/[0.30]
                      "
                    />

                    <span
                      className="
                        pointer-events-none
                        absolute
                        right-[5px]
                        top-[5px]
                        h-2
                        w-2
                        border-r
                        border-t
                        border-[#d4af37]/[0.30]
                      "
                    />

                    {/* BACK GOLD GLOW */}

                    <motion.div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-[35%]
                        h-24
                        w-24
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-[#d4af37]/[0.035]
                        blur-[26px]
                      "
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.5, 0.85, 0.5],
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* BACK TOP */}

                    <div
                      className="
                        relative
                        z-10
                        flex
                        items-center
                        justify-between
                        px-1.5
                        pt-1.5
                        sm:px-2
                        sm:pt-2
                      "
                    >
                      <span
                        className="
                          font-serif
                          text-[7.7px]
                          font-bold
                          text-[#d4af37]/80
                          sm:text-[8.2px]
                        "
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <motion.div
                        animate={{
                          x: [0, 1.5, 0],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 2.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <ArrowUpRight
                          size={12}
                          strokeWidth={1.7}
                          className="text-[#d4af37]"
                        />
                      </motion.div>
                    </div>

                    {/* MINI SYMBOL */}

                    <div
                      className="
                        relative
                        z-10
                        mx-auto
                        mt-1
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-full
                        border
                        border-[#d4af37]/[0.30]
                        bg-[#09072a]
                        sm:h-8
                        sm:w-8
                      "
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt=""
                          className="
                            h-[80%]
                            w-[80%]
                            object-contain
                          "
                          style={{
                            filter: goldImageFilter,
                          }}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <span
                          className="
                            font-serif
                            text-[17px]
                            text-[#d4af37]
                            drop-shadow-[0_0_7px_rgba(212,175,55,.52)]
                            sm:text-[18px]
                          "
                        >
                          {item.symbol || "✦"}
                        </span>
                      )}
                    </div>

                    {/* NAME */}

                    <p
                      className="
                        relative
                        z-10
                        mt-1
                        truncate
                        px-1
                        text-center
                        font-serif
                        text-[8.8px]
                        font-semibold
                        text-[#d4af37]
                        sm:text-[9.8px]
                      "
                    >
                      {name}
                    </p>

                    {/* GOLD DIVIDER */}

                    <motion.div
                      className="
                        relative
                        z-10
                        mx-auto
                        mt-1
                        h-px
                        w-8
                        bg-gradient-to-r
                        from-transparent
                        via-[#d4af37]/[0.40]
                        to-transparent
                      "
                      animate={{
                        width: ["28px", "38px", "28px"],
                        opacity: [0.4, 0.75, 0.4],
                      }}
                      transition={{
                        duration: 3.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* ================================================== */}
                    {/* CMS DETAILS */}
                    {/* ================================================== */}

                    <div
                      className="
                        relative
                        z-10
                        mt-1.5
                        space-y-1
                        px-1.5
                      "
                    >
                      {/* ELEMENT */}

                      {item.element && (
                        <div
                          className="
                            rounded-[5px]
                            border
                            border-[#d4af37]/[0.13]
                            bg-[#d4af37]/[0.035]
                            px-1.5
                            py-1
                            transition-all
                            duration-300
                            hover:border-[#d4af37]/[0.30]
                          "
                        >
                          <p
                            className="
                              text-[5.5px]
                              font-bold
                              uppercase
                              tracking-[0.10em]
                              text-[#81795f]
                              sm:text-[6px]
                            "
                          >
                            Element
                          </p>

                          <p
                            className="
                              mt-0.5
                              truncate
                              text-[7.5px]
                              font-medium
                              text-[#d4af37]
                              sm:text-[8px]
                            "
                          >
                            {item.element}
                          </p>
                        </div>
                      )}

                      {/* RULING PLANET */}

                      {item.planet && (
                        <div
                          className="
                            rounded-[5px]
                            border
                            border-[#d4af37]/[0.11]
                            bg-[#9b7bd4]/[0.035]
                            px-1.5
                            py-1
                            transition-all
                            duration-300
                            hover:border-[#d4af37]/[0.28]
                          "
                        >
                          <p
                            className="
                              text-[5.5px]
                              font-bold
                              uppercase
                              tracking-[0.10em]
                              text-[#81795f]
                              sm:text-[6px]
                            "
                          >
                            Ruling Planet
                          </p>

                          <p
                            className="
                              mt-0.5
                              truncate
                              text-[7.5px]
                              font-medium
                              text-[#d4af37]
                              sm:text-[8px]
                            "
                          >
                            {item.planet}
                          </p>
                        </div>
                      )}

                      {/* ================================================== */}
                      {/* VEDIC NAME INITIALS */}
                      {/* CMS ZODIAC MASTER ONLY */}
                      {/* ================================================== */}

                      {initials.length > 0 && (
                        <div
                          className="
                            rounded-[5px]
                            border
                            border-[#d4af37]/[0.14]
                            bg-[#d4af37]/[0.035]
                            px-1.5
                            py-1
                            transition-all
                            duration-300
                            hover:border-[#d4af37]/[0.30]
                          "
                        >
                          <p
                            className="
                              text-[5.5px]
                              font-bold
                              uppercase
                              tracking-[0.08em]
                              text-[#81795f]
                              sm:text-[6px]
                            "
                          >
                            Name Initials
                          </p>

                          <div
                            className="
                              mt-1
                              flex
                              flex-wrap
                              justify-center
                              gap-[3px]
                            "
                          >
                            {initials.map(
                              (
                                initial,
                                initialIndex
                              ) => (
                                <motion.span
                                  key={`${initial}-${initialIndex}`}
                                  initial={{
                                    opacity: 0,
                                    scale: 0.88,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    scale: 1,
                                  }}
                                  transition={{
                                    duration: 0.22,
                                    delay:
                                      initialIndex *
                                      0.025,
                                  }}
                                  className="
                                    inline-flex
                                    min-h-[16px]
                                    min-w-[19px]
                                    items-center
                                    justify-center
                                    rounded-[3px]
                                    border
                                    border-[#d4af37]/[0.20]
                                    bg-[#0b082d]
                                    px-1
                                    font-serif
                                    text-[7.5px]
                                    font-semibold
                                    text-[#d4af37]
                                    transition-all
                                    duration-300
                                    hover:border-[#d4af37]/[0.48]
                                    hover:text-[#f2d24e]
                                    sm:min-h-[17px]
                                    sm:min-w-[20px]
                                    sm:text-[8px]
                                  "
                                >
                                  {initial}
                                </motion.span>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* EXPLORE */}

                    <div
                      className="
                        absolute
                        bottom-1.5
                        left-0
                        right-0
                        z-10
                        text-center
                        sm:bottom-2
                      "
                    >
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-0.5
                          text-[5.5px]
                          font-bold
                          uppercase
                          tracking-[0.12em]
                          text-[#a09262]
                          sm:text-[6px]
                        "
                      >
                        Explore
                        <ArrowUpRight size={8} />
                      </span>
                    </div>

                    {/* BACK GOLD ATMOSPHERE */}

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-[radial-gradient(circle_at_50%_28%,rgba(212,175,55,.055),transparent_55%)]
                      "
                    />

                    {/* MOVING GOLD LINE */}

                    <motion.div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        left-[-30%]
                        top-0
                        h-full
                        w-px
                        bg-gradient-to-b
                        from-transparent
                        via-[#d4af37]/[0.28]
                        to-transparent
                      "
                      animate={{
                        left: ["-20%", "120%"],
                        opacity: [0, 0.7, 0],
                      }}
                      transition={{
                        duration: 4.2,
                        repeat: Infinity,
                        repeatDelay: 1.8,
                        ease: "easeInOut",
                        delay: index * 0.15,
                      }}
                    />
                  </div>
                </motion.div>
              </motion.a>
            );
          })}
        </div>

        {/* ================================================== */}
        {/* FOOTER */}
        {/* ================================================== */}

        <div
          className="
            relative
            z-10
            mt-2.5
            flex
            items-center
            justify-center
            gap-1.5
          "
        >
          <motion.span
            className="
              h-px
              w-5
              bg-gradient-to-r
              from-transparent
              to-[#d4af37]/[0.28]
            "
            animate={{
              width: ["20px", "30px", "20px"],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <span
            className="
              text-[6.5px]
              font-bold
              uppercase
              tracking-[0.17em]
              text-[#786e50]
            "
          >
            Tap a card to explore
          </span>

          <motion.span
            className="
              h-px
              w-5
              bg-gradient-to-l
              from-transparent
              to-[#d4af37]/[0.28]
            "
            animate={{
              width: ["20px", "30px", "20px"],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </section>
  );
}

