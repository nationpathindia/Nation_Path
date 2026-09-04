"use client";

/*
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// PREMIUM HOROSCOPE
// VEDIC REMEDY / GUIDANCE
//
// FINAL LOCKED DESIGN
//
// CMS ONLY
// NO ENGINE
// NO CALCULATION
// NO AI
//
// LOCKED:
// • Reads CMS data only
// • No remedy calculation
// • No generated interpretation
// • CMS content rendered as supplied
//
// DESIGN:
// • Premium Cosmic / Vedic
// • Deep cosmic surface
// • Gold + violet constellation accents
// • Subtle ambient motion
// • Practice as primary focus
// • Guidance / Why This Helps as intelligence cards
// • Compact but premium
//////////////////////////////////////////////////////////////
*/

import { motion } from "framer-motion";

import {
  HeartHandshake,
  Sparkles,
  ArrowRight,
  Compass,
} from "lucide-react";

import type { CmsHoroscopeRemedy } from "./types";

//////////////////////////////////////////////////////////////
// PROPS
//////////////////////////////////////////////////////////////

interface Props {
  remedy?: CmsHoroscopeRemedy;
}

//////////////////////////////////////////////////////////////
// COMPONENT
//////////////////////////////////////////////////////////////

export default function HoroscopeRemedy({
  remedy,
}: Props) {
  ////////////////////////////////////////////////////////////
  // EMPTY
  ////////////////////////////////////////////////////////////

  if (!remedy) {
    return null;
  }

  const hasContent =
    Boolean(remedy.title) ||
    Boolean(remedy.practice) ||
    Boolean(remedy.guidance) ||
    Boolean(remedy.reason) ||
    Boolean(remedy.category);

  if (!hasContent) {
    return null;
  }

  const hasDetails =
    Boolean(remedy.guidance) ||
    Boolean(remedy.reason);

  ////////////////////////////////////////////////////////////
  // RENDER
  ////////////////////////////////////////////////////////////

  return (
    <section
      data-section="remedy"
      aria-labelledby="remedy-title"
      className="
        relative
        px-3
        md:px-6
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 18,
          scale: 0.985,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.12,
        }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          group
          relative
          isolate
          overflow-hidden
          rounded-[26px]
          border
          border-[#8c6aaf]/22
          bg-[#08062b]
          shadow-[0_25px_75px_rgba(5,3,35,.22)]
          sm:rounded-[30px]
        "
      >
        {/* ================================================== */}
        {/* COSMIC ATMOSPHERE */}
        {/* ================================================== */}

        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-28
            -top-32
            h-[340px]
            w-[340px]
            rounded-full
            bg-[#8c1682]/[0.12]
            blur-[115px]
          "
          animate={{
            x: [0, 18, 0],
            y: [0, 12, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-32
            -left-28
            h-[300px]
            w-[300px]
            rounded-full
            bg-[#34136d]/[0.22]
            blur-[110px]
          "
          animate={{
            x: [0, -14, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Central subtle gold aura */}

        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-[42%]
            top-[38%]
            h-[230px]
            w-[230px]
            rounded-full
            bg-[#d4af37]/[0.035]
            blur-[100px]
          "
          animate={{
            opacity: [0.35, 0.7, 0.35],
            scale: [0.95, 1.08, 0.95],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Fine cosmic stars */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.035]
            [background-image:radial-gradient(rgba(255,255,255,.9)_1px,transparent_1px)]
            [background-size:34px_34px]
          "
        />

        {/* Top signal */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-7
            right-7
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-[#e5c64e]/60
            to-transparent
            sm:left-9
            sm:right-9
          "
        />

        {/* Moving constellation signal */}

        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-[8%]
            top-[23%]
            h-1
            w-1
            rounded-full
            bg-[#e5c64e]
            shadow-[0_0_12px_#e5c64e]
          "
          animate={{
            opacity: [0.2, 0.75, 0.2],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            right-[12%]
            top-[31%]
            h-1.5
            w-1.5
            rounded-full
            bg-[#d96bb5]
            shadow-[0_0_14px_#d96bb5]
          "
          animate={{
            opacity: [0.15, 0.6, 0.15],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
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
                justify-between
                gap-4
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2.5
                "
              >
                <motion.div
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
                    border-[#d4af37]/25
                    bg-[#d4af37]/[0.07]
                    text-[#dfc45a]
                  "
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(212,175,55,0)",
                      "0 0 18px rgba(212,175,55,.12)",
                      "0 0 0 rgba(212,175,55,0)",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <HeartHandshake
                    size={16}
                    strokeWidth={1.6}
                  />

                  <span
                    className="
                      absolute
                      inset-[-4px]
                      rounded-full
                      border
                      border-[#8c6aaf]/10
                    "
                  />
                </motion.div>

                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.3em]
                    text-[#d8bd55]
                    sm:text-[10px]
                    sm:tracking-[0.34em]
                  "
                >
                  Vedic Guidance
                </p>
              </div>

              {/* Observatory marker */}

              <div
                aria-hidden="true"
                className="
                  hidden
                  items-center
                  gap-2
                  text-[#77718d]
                  sm:flex
                "
              >
                <Compass
                  size={13}
                  strokeWidth={1.4}
                />

                <span
                  className="
                    text-[7px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                  "
                >
                  Daily Practice
                </span>
              </div>
            </div>

            {/* CATEGORY */}

            {remedy.category && (
              <motion.p
                initial={{
                  opacity: 0,
                  x: -6,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.35,
                  delay: 0.08,
                }}
                className="
                  mt-4
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  text-[#a98bd4]
                  sm:text-[9px]
                "
              >
                {remedy.category}
              </motion.p>
            )}

            {/* TITLE */}

            {remedy.title && (
              <h2
                id="remedy-title"
                className="
                  mt-2
                  max-w-3xl
                  font-serif
                  text-[1.45rem]
                  font-semibold
                  leading-tight
                  tracking-[-0.025em]
                  text-[#eee2b7]
                  sm:text-[1.65rem]
                  md:text-[1.85rem]
                "
              >
                {remedy.title}
              </h2>
            )}

            {/* Header constellation line */}

            <div
              aria-hidden="true"
              className="
                mt-4
                flex
                items-center
                gap-2
              "
            >
              <span
                className="
                  h-px
                  w-10
                  bg-gradient-to-r
                  from-[#d4af37]/70
                  to-transparent
                "
              />

              <span
                className="
                  h-1
                  w-1
                  rounded-full
                  bg-[#d4af37]
                  shadow-[0_0_8px_#d4af37]
                "
              />

              <span
                className="
                  h-px
                  w-16
                  bg-gradient-to-r
                  from-[#d4af37]/25
                  to-transparent
                "
              />
            </div>
          </header>

          {/* ================================================== */}
          {/* TODAY'S PRACTICE — PRIMARY */}
          {/* ================================================== */}

          {remedy.practice && (
            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.45,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                group/practice
                relative
                mt-5
                overflow-hidden
                rounded-[19px]
                border
                border-[#d4af37]/20
                bg-[#0e0b35]/80
                p-4
                shadow-[0_12px_35px_rgba(0,0,0,.16)]
                backdrop-blur-md
                sm:p-5
              "
            >
              {/* Practice glow */}

              <motion.div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -right-12
                  -top-12
                  h-28
                  w-28
                  rounded-full
                  bg-[#d4af37]/[0.08]
                  blur-[45px]
                "
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.45, 0.8, 0.45],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Left signal */}

              <div
                aria-hidden="true"
                className="
                  absolute
                  bottom-4
                  left-0
                  top-4
                  w-px
                  bg-gradient-to-b
                  from-transparent
                  via-[#d4af37]/60
                  to-transparent
                "
              />

              <div
                className="
                  relative
                  flex
                  items-start
                  gap-3.5
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
                    border-[#d4af37]/20
                    bg-[#d4af37]/[0.07]
                    text-[#dfc45a]
                  "
                >
                  <Sparkles
                    size={16}
                    strokeWidth={1.5}
                  />
                </div>

                <div className="min-w-0">
                  <p
                    className="
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-[#d8bd55]
                      sm:text-[9px]
                    "
                  >
                    Today's Practice
                  </p>

                  <p
                    className="
                      mt-2
                      text-[13px]
                      font-medium
                      leading-[1.75]
                      text-[#ddd5c4]
                      sm:text-[14px]
                      sm:leading-6
                    "
                  >
                    {remedy.practice}
                  </p>
                </div>
              </div>

              {/* Bottom signal */}

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
                  via-[#d4af37]/25
                  to-transparent
                "
              />
            </motion.div>
          )}

          {/* ================================================== */}
          {/* GUIDANCE / REASON */}
          {/* ================================================== */}

          {hasDetails && (
            <div
              className="
                mt-3
                grid
                gap-3
                md:grid-cols-2
              "
            >
              {remedy.guidance && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: 0.16,
                  }}
                  whileHover={{
                    y: -2,
                  }}
                  className="
                    group/detail
                    relative
                    overflow-hidden
                    rounded-[17px]
                    border
                    border-[#8c6aaf]/18
                    bg-[#0c0930]/70
                    p-4
                    transition-all
                    duration-300
                    hover:border-[#d4af37]/25
                    hover:bg-[#100c39]/85
                  "
                >
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      -right-8
                      -top-8
                      h-20
                      w-20
                      rounded-full
                      bg-[#8c1682]/[0.08]
                      blur-[32px]
                      transition-transform
                      duration-500
                      group-hover/detail:scale-[1.5]
                    "
                  />

                  <p
                    className="
                      relative
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-[#a98bd4]
                      sm:text-[9px]
                    "
                  >
                    Guidance
                  </p>

                  <p
                    className="
                      relative
                      mt-2
                      text-[11px]
                      leading-[1.7]
                      text-[#aaa1ba]
                      sm:text-[12px]
                    "
                  >
                    {remedy.guidance}
                  </p>

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
                      via-[#8c6aaf]/20
                      to-transparent
                    "
                  />
                </motion.div>
              )}

              {remedy.reason && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: 0.21,
                  }}
                  whileHover={{
                    y: -2,
                  }}
                  className="
                    group/detail
                    relative
                    overflow-hidden
                    rounded-[17px]
                    border
                    border-[#8c6aaf]/18
                    bg-[#0c0930]/70
                    p-4
                    transition-all
                    duration-300
                    hover:border-[#d4af37]/25
                    hover:bg-[#100c39]/85
                  "
                >
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      -right-8
                      -top-8
                      h-20
                      w-20
                      rounded-full
                      bg-[#d4af37]/[0.06]
                      blur-[32px]
                      transition-transform
                      duration-500
                      group-hover/detail:scale-[1.5]
                    "
                  />

                  <p
                    className="
                      relative
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-[#d8bd55]
                      sm:text-[9px]
                    "
                  >
                    Why This Helps
                  </p>

                  <p
                    className="
                      relative
                      mt-2
                      text-[11px]
                      leading-[1.7]
                      text-[#aaa1ba]
                      sm:text-[12px]
                    "
                  >
                    {remedy.reason}
                  </p>

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
                      via-[#d4af37]/18
                      to-transparent
                    "
                  />
                </motion.div>
              )}
            </div>
          )}

          {/* ================================================== */}
          {/* FOOTER SIGNAL */}
          {/* ================================================== */}

          {(remedy.practice ||
            remedy.guidance ||
            remedy.reason) && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.4,
                delay: 0.25,
              }}
              className="
                mt-4
                flex
                items-center
                justify-between
                gap-4
                border-t
                border-white/[0.055]
                pt-4
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
                  className="
                    h-1.5
                    w-1.5
                    shrink-0
                    rounded-full
                    bg-[#d4af37]
                    shadow-[0_0_9px_rgba(212,175,55,.55)]
                  "
                />

                <span
                  className="
                    truncate
                    text-[7px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-[#77718d]
                    sm:text-[8px]
                  "
                >
                  A mindful practice for today
                </span>
              </div>

              <motion.div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-1.5
                  text-[#a98bd4]
                "
                whileHover={{
                  x: 3,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <span
                  className="
                    text-[7px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                  "
                >
                  Astro Guidance
                </span>

                <ArrowRight
                  size={12}
                  strokeWidth={1.6}
                />
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}