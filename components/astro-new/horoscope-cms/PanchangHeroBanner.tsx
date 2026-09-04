"use client";

/*
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// PANCHANG HERO — FINAL LOCKED
//
// PREMIUM COSMIC / VEDIC
// HERO-WIDTH MATCHED
// COMPACT STRIPE
// NO EXTRA OUTER PADDING
// NO HORIZONTAL SCROLL
//
// CMS / API EXPERIENCE ONLY
//
// NO ENGINE
// NO CALCULATION
//////////////////////////////////////////////////////////////
*/

import { useEffect, useMemo, useState } from "react";

import { motion } from "framer-motion";

import {
  Sun,
  Moon,
  Sparkles,
  CircleDot,
  Orbit,
  Stars,
} from "lucide-react";


/*
//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////
*/

interface PanchangData {
  timestamp?: string;

  paksha?: {
    name?: string;
  };

  vara?: {
    name?: string;
  };

  moonPhase?: {
    name?: string;
    illumination?: number;
  };

  tithi?: {
    name?: string;
    paksha?: string;
  };

  nakshatra?: {
    name?: string;
    pada?: number;
  };

  yoga?: {
    name?: string;
  };

  karana?: {
    name?: string;
  };

  moonRashi?: {
    name?: string;
  };

  sunRashi?: {
    name?: string;
  };
}


/*
//////////////////////////////////////////////////////////////
// COMPONENT
//////////////////////////////////////////////////////////////
*/

export default function PanchangHeroBanner() {
  const [panchang, setPanchang] =
    useState<PanchangData | null>(null);


  /*
  ////////////////////////////////////////////////////////////
  // FETCH
  ////////////////////////////////////////////////////////////
  */

  useEffect(() => {
    let mounted = true;

    async function fetchPanchang() {
      try {
        const response = await fetch(
          "/api/astro/panchang"
        );

        if (!response.ok) {
          throw new Error(
            `Panchang request failed: ${response.status}`
          );
        }

        const json = await response.json();

        if (mounted) {
          setPanchang(
            json?.data ?? null
          );
        }
      } catch (error) {
        console.error(
          "Panchang loading error",
          error
        );
      }
    }

    fetchPanchang();

    return () => {
      mounted = false;
    };
  }, []);


  /*
  ////////////////////////////////////////////////////////////
  // DATE
  ////////////////////////////////////////////////////////////
  */

  const date = useMemo(() => {
    if (!panchang?.timestamp) {
      return {
        day: "28",
        month: "AUG",
        year: "2026",
      };
    }

    const value = new Date(
      panchang.timestamp
    );

    return {
      day: value
        .getDate()
        .toString()
        .padStart(2, "0"),

      month: value
        .toLocaleString("en-US", {
          month: "short",
        })
        .toUpperCase(),

      year: value.getFullYear().toString(),
    };
  }, [panchang?.timestamp]);


  /*
  ////////////////////////////////////////////////////////////
  // CORE PANCHANG
  ////////////////////////////////////////////////////////////
  */

  const mainItems = [
    {
      icon: Moon,
      title: "तिथि",
      value:
        panchang?.tithi?.name ||
        "--",
      sub:
        panchang?.tithi?.paksha ||
        "",
    },

    {
      icon: Sparkles,
      title: "नक्षत्र",
      value:
        panchang?.nakshatra?.name ||
        "--",
      sub:
        panchang?.nakshatra?.pada
          ? `पाद ${panchang.nakshatra.pada}`
          : "",
    },

    {
      icon: Sun,
      title: "योग",
      value:
        panchang?.yoga?.name ||
        "--",
      sub: "",
    },

    {
      icon: CircleDot,
      title: "करण",
      value:
        panchang?.karana?.name ||
        "--",
      sub: "",
    },

    {
      icon: Moon,
      title: "चंद्र चरण",
      value:
        panchang?.moonPhase?.name ||
        "--",
      sub:
        panchang?.moonPhase?.illumination != null
          ? `${Math.round(
              panchang.moonPhase.illumination
            )}% प्रकाश`
          : "",
    },
  ];


  /*
  ////////////////////////////////////////////////////////////
  // CONTEXT
  ////////////////////////////////////////////////////////////
  */

  const bottomItems = [
    {
      label: "पक्ष",
      value:
        panchang?.paksha?.name ||
        "--",
    },

    {
      label: "वार",
      value:
        panchang?.vara?.name ||
        "--",
    },

    {
      label: "चंद्र राशि",
      value:
        panchang?.moonRashi?.name ||
        "--",
    },

    {
      label: "सूर्य राशि",
      value:
        panchang?.sunRashi?.name ||
        "--",
    },
  ];


  /*
  ////////////////////////////////////////////////////////////
  // UI
  ////////////////////////////////////////////////////////////
  */

  return (
    <section
      data-section="panchang-hero"
      className="
        relative
        w-full
        min-w-0
        overflow-hidden
      "
    >

      <motion.div
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
        className="
          relative
          w-full
          min-w-0
          overflow-hidden
          border
          border-[rgba(224,185,88,.12)]
          bg-[linear-gradient(135deg,rgba(19,14,40,.97),rgba(8,6,23,.99))]
          shadow-[0_20px_65px_rgba(0,0,0,.28)]
        "
      >

        {/* ==================================================
            COSMIC ATMOSPHERE
            ================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            overflow-hidden
          "
        >

          {/* Purple nebula */}

          <motion.div
            animate={{
              x: [
                "-4%",
                "4%",
                "-4%",
              ],
              y: [
                "-2%",
                "3%",
                "-2%",
              ],
              opacity: [
                0.13,
                0.19,
                0.13,
              ],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              -left-24
              -top-24
              h-64
              w-64
              rounded-full
              bg-[#65156d]
              blur-[95px]
            "
          />

          {/* Pink nebula */}

          <motion.div
            animate={{
              x: [
                "3%",
                "-3%",
                "3%",
              ],
              opacity: [
                0.08,
                0.14,
                0.08,
              ],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              -right-20
              -top-20
              h-56
              w-56
              rounded-full
              bg-[#a20b7f]
              blur-[100px]
            "
          />

          {/* Gold center glow */}

          <div
            className="
              absolute
              left-1/2
              -top-24
              h-56
              w-56
              -translate-x-1/2
              rounded-full
              bg-[#d8ae42]
              opacity-[0.045]
              blur-[95px]
            "
          />

          {/* Radial cosmic field */}

          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,.08),transparent_55%)]
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_center,transparent_38%,rgba(2,2,8,.45)_100%)]
            "
          />


          {/* ==================================================
              STARS
              ================================================== */}

          <motion.span
            animate={{
              opacity: [
                0.12,
                0.7,
                0.12,
              ],
              scale: [
                0.7,
                1.15,
                0.7,
              ],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              left-[9%]
              top-[35%]
              h-1
              w-1
              rounded-full
              bg-[#f2d24e]
              shadow-[0_0_10px_#f2d24e]
            "
          />

          <motion.span
            animate={{
              opacity: [
                0.08,
                0.55,
                0.08,
              ],
              scale: [
                0.8,
                1.2,
                0.8,
              ],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              delay: 1.2,
              ease: "easeInOut",
            }}
            className="
              absolute
              right-[18%]
              top-[30%]
              h-1
              w-1
              rounded-full
              bg-[#df62b1]
              shadow-[0_0_9px_#df62b1]
            "
          />

          <motion.span
            animate={{
              opacity: [
                0.05,
                0.38,
                0.05,
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: 2,
              ease: "easeInOut",
            }}
            className="
              absolute
              bottom-[18%]
              left-[42%]
              h-[3px]
              w-[3px]
              rounded-full
              bg-[#d8ae42]
              shadow-[0_0_8px_#d8ae42]
            "
          />

        </div>


        {/* ==================================================
            TOP GOLD HAIRLINE
            ================================================== */}

        <div
          aria-hidden="true"
          className="
            absolute
            left-1/2
            top-0
            z-20
            h-px
            w-[58%]
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-[#f2d24e]
            to-transparent
            opacity-40
          "
        />


        {/* ==================================================
            HEADER
            ================================================== */}

        <div
          className="
            relative
            z-10
            flex
            min-h-[48px]
            items-center
            justify-between
            gap-3
            border-b
            border-white/[0.045]
            px-4
            py-2.5
            sm:px-6
          "
        >

          {/* LEFT */}

          <div
            className="
              flex
              min-w-0
              items-center
              gap-2.5
            "
          >

            <motion.span
              animate={{
                rotate: [
                  0,
                  8,
                  0,
                  -8,
                  0,
                ],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                flex
                h-6
                w-6
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[rgba(242,210,78,.18)]
                bg-[rgba(242,210,78,.045)]
                shadow-[0_0_18px_rgba(242,210,78,.05)]
              "
            >
              <Sparkles
                size={11}
                className="text-[#d9b950]"
              />
            </motion.span>


            <div className="min-w-0">

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <h2
                  className="
                    truncate
                    font-serif
                    text-[15px]
                    font-semibold
                    tracking-[-0.025em]
                    text-[#eee5ca]
                    sm:text-base
                  "
                >
                  Daily Panchang
                </h2>

                <span
                  className="
                    hidden
                    h-1
                    w-1
                    rounded-full
                    bg-[#d9b950]
                    opacity-50
                    sm:block
                  "
                />

                <span
                  className="
                    hidden
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-[#77718b]
                    sm:block
                  "
                >
                  Vedic
                </span>

              </div>

            </div>

          </div>


          {/* DATE */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-2
              border
              border-[rgba(242,210,78,.13)]
              bg-[rgba(242,210,78,.035)]
              px-2.5
              py-1.5
              shadow-[0_0_22px_rgba(242,210,78,.025)]
              sm:px-3
            "
          >

            <span
              className="
                h-4
                w-px
                bg-gradient-to-b
                from-transparent
                via-[#f2d24e]
                to-transparent
                opacity-60
              "
            />

            <div
              className="
                flex
                items-baseline
                gap-1
              "
            >

              <span
                className="
                  text-[13px]
                  font-bold
                  leading-none
                  text-[#eee5ca]
                  sm:text-sm
                "
              >
                {date.day}
              </span>

              <span
                className="
                  text-[7px]
                  font-bold
                  tracking-[0.16em]
                  text-[#d9b950]
                  sm:text-[8px]
                "
              >
                {date.month}
              </span>

              <span
                className="
                  text-[7px]
                  text-[#77718b]
                  sm:text-[8px]
                "
              >
                {date.year}
              </span>

            </div>

          </div>

        </div>


        {/* ==================================================
            CORE PANCHANG
            ================================================== */}

        <div
          className="
            relative
            z-10
            grid
            min-w-0
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-5
          "
        >

          {mainItems.map(
            (item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.35,
                    delay:
                      index * 0.045,
                  }}
                  className="
                    group
                    relative
                    min-w-0
                    overflow-hidden
                    border-b
                    border-r
                    border-white/[0.045]
                    px-3
                    py-2.5
                    transition-colors
                    duration-300
                    hover:bg-white/[0.018]
                    md:border-b-0
                    md:last:border-r-0
                  "
                >

                  {/* Hover glow */}

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      -right-5
                      -top-5
                      h-14
                      w-14
                      rounded-full
                      bg-[#a20b7f]
                      opacity-0
                      blur-[26px]
                      transition-opacity
                      duration-300
                      group-hover:opacity-25
                    "
                  />


                  {/* Icon + label */}

                  <div
                    className="
                      relative
                      flex
                      min-w-0
                      items-center
                      gap-1.5
                    "
                  >

                    <Icon
                      size={11}
                      className="
                        shrink-0
                        text-[#d9b950]
                        opacity-80
                      "
                    />

                    <span
                      className="
                        truncate
                        text-[7px]
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-[#77718b]
                      "
                    >
                      {item.title}
                    </span>

                  </div>


                  {/* Main value */}

                  <p
                    className="
                      relative
                      mt-1
                      truncate
                      font-serif
                      text-[12px]
                      font-semibold
                      leading-tight
                      text-[#eee5ca]
                      sm:text-[13px]
                    "
                  >
                    {item.value}
                  </p>


                  {/* Sub */}

                  {item.sub && (
                    <p
                      className="
                        relative
                        mt-0.5
                        truncate
                        text-[7px]
                        leading-tight
                        text-[#bca76a]
                      "
                    >
                      {item.sub}
                    </p>
                  )}

                </motion.div>
              );
            }
          )}

        </div>


        {/* ==================================================
            CONTEXT STRIP
            ================================================== */}

        <div
          className="
            relative
            z-10
            border-t
            border-white/[0.045]
            bg-black/[0.13]
            px-4
            py-2
            sm:px-6
          "
        >

          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-4
            "
          >

            {bottomItems.map(
              (item, index) => (
                <motion.div
                  key={item.label}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay:
                      0.15 +
                      index * 0.04,
                  }}
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-1.5
                    border-r
                    border-white/[0.035]
                    px-2
                    first:pl-0
                    last:border-r-0
                    sm:px-3
                  "
                >

                  <Orbit
                    size={9}
                    className="
                      shrink-0
                      text-[#a79b70]
                      opacity-70
                    "
                  />

                  <div
                    className="
                      min-w-0
                      truncate
                    "
                  >

                    <span
                      className="
                        mr-1
                        text-[7px]
                        text-[#666078]
                      "
                    >
                      {item.label}
                    </span>

                    <span
                      className="
                        truncate
                        text-[9px]
                        font-semibold
                        text-[#d9d0b4]
                      "
                    >
                      {item.value}
                    </span>

                  </div>

                </motion.div>
              )
            )}

          </div>

        </div>


        {/* ==================================================
            BOTTOM ACCENT
            ================================================== */}

        <div
          aria-hidden="true"
          className="
            absolute
            bottom-0
            left-1/2
            z-20
            h-px
            w-[48%]
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-[#d8ae42]
            to-transparent
            opacity-30
          "
        />


        {/* Moving cosmic sweep */}

        <motion.div
          aria-hidden="true"
          animate={{
            x: [
              "-120%",
              "520%",
            ],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            pointer-events-none
            absolute
            bottom-0
            left-0
            z-20
            h-px
            w-[18%]
            bg-gradient-to-r
            from-transparent
            via-[#df62b1]
            to-transparent
            opacity-50
          "
        />


        {/* ==================================================
            MICRO COSMIC ORNAMENT
            ================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            bottom-2
            right-5
            hidden
            opacity-20
            sm:block
          "
        >
          <Stars
            size={12}
            className="text-[#d8ae42]"
          />
        </div>

      </motion.div>

    </section>
  );
}

