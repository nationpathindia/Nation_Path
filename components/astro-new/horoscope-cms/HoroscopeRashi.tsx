"use client";

/*
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// HOROSCOPE RASHI — FINAL LOCKED / PREMIUM
//
// CMS / ZODIAC MASTER ONLY
//
// LOCKED:
// ✅ CMS ONLY
// ✅ Zodiac Master ONLY
// ✅ No calculation
// ✅ No Swiss Ephemeris
// ✅ No prediction engine
// ✅ No AI
// ✅ No hardcoded zodiac data
// ✅ No hardcoded name syllables
// ✅ No public "Zodiac Master" label
//
// IMAGE:
// ✅ CMS symbol supported
// ✅ public/zodiac/*.png supported
// ✅ Bare filename supported: aries.png -> /zodiac/aries.png
// ✅ Bare zodiac name supported: aries -> /zodiac/aries.png
// ✅ /aries.png supported -> /zodiac/aries.png
// ✅ /zodiac/aries.png supported
// ✅ zodiac/aries.png supported
// ✅ ./aries.png supported
// ✅ public/zodiac/aries.png supported
// ✅ Remote image supported
//
// UI:
// ✅ Premium Cosmic / Vedic
// ✅ Compact
// ✅ Living cosmic ambience
// ✅ CMS zodiac image
// ✅ GOLDEN RASHI ICON
// ✅ English + Hindi
// ✅ Single-row identity metadata
// ✅ Compact CMS initials
// ✅ Rashi-first visual hierarchy
//////////////////////////////////////////////////////////////
*/

import {
  useMemo,
  type ReactNode,
} from "react";

import { motion } from "framer-motion";

import {
  CalendarDays,
  CircleDot,
  Leaf,
  Orbit,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";

/* ============================================================
   PROPS
============================================================ */

interface HoroscopeRashiProps {
  english?: string;
  hindi?: string;
  sanskrit?: string;
  description?: string;
  dates?: string;
  element?: string;
  nature?: string;
  planet?: string;
  energy?: string;

  /*
   * CMS / Zodiac Master symbol.
   *
   * Supported:
   *
   * aries
   * aries.png
   * /aries.png
   * /zodiac/aries.png
   * zodiac/aries.png
   * https://domain.com/aries.png
   */
  symbol?: string;

  /*
   * CANONICAL CMS INITIALS
   */
  initials?: string[];
}

/* ============================================================
   HELPERS
============================================================ */

function cleanString(value?: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function normalizeName(value?: string): string {
  return cleanString(value)
    .replace(/\s+/g, " ")
    .trim();
}

function cleanInitials(value?: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is string =>
        typeof item === "string" &&
        item.trim().length > 0
    )
    .map((item) => item.trim())
    .filter(Boolean);
}

/* ============================================================
   IMAGE HELPERS
============================================================ */

/*
 * Detect actual image sources coming from CMS.
 */
function isImageSource(value: string): boolean {
  if (!value) {
    return false;
  }

  return (
    value.startsWith("/") ||
    value.startsWith("./") ||
    value.startsWith("../") ||
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:image") ||
    /\.(png|jpg|jpeg|webp|gif|svg)(\?.*)?$/i.test(
      value
    )
  );
}

/*
 * Resolve CMS Zodiac Master symbol to the ACTUAL
 * public asset location.
 */
function resolveSymbolSource(
  value: string
): string {
  const clean = cleanString(value);

  if (!clean) {
    return "";
  }

  /*
   * Remote URL / data URI.
   * Never modify it.
   */
  if (
    clean.startsWith("http://") ||
    clean.startsWith("https://") ||
    clean.startsWith("data:image")
  ) {
    return clean;
  }

  /*
   * Normalize local CMS path.
   */
  let normalized = clean
    .replace(/^\.\/+/, "")
    .replace(/^(\.\.\/)+/, "")
    .replace(/^\/+/, "");

  /*
   * Remove accidental public/ prefix.
   */
  normalized = normalized.replace(
    /^public\/+/i,
    ""
  );

  /*
   * Already inside zodiac folder.
   */
  if (
    normalized
      .toLowerCase()
      .startsWith("zodiac/")
  ) {
    return `/${normalized}`;
  }

  /*
   * CMS supplied an actual filename.
   */
  if (
    /\.(png|jpg|jpeg|webp|gif|svg)(\?.*)?$/i.test(
      normalized
    )
  ) {
    return `/zodiac/${normalized}`;
  }

  /*
   * CMS supplied only the zodiac name.
   *
   * No zodiac names are hardcoded here.
   */
  return `/zodiac/${normalized}.png`;
}

/* ============================================================
   META ITEM
============================================================ */

function MetaItem({
  icon,
  label,
  value,
  last = false,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`
        group
        flex
        min-w-[145px]
        flex-1
        items-center
        gap-2.5
        px-3.5
        py-3
        sm:min-w-[155px]
        sm:px-4
        ${
          !last
            ? "border-r border-white/[0.055]"
            : ""
        }
      `}
    >
      <span
        className="
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          border-[rgba(242,210,78,.12)]
          bg-[rgba(242,210,78,.035)]
          text-[#d9b950]
          transition-all
          duration-300
          group-hover:border-[rgba(242,210,78,.30)]
          group-hover:bg-[rgba(242,210,78,.075)]
          group-hover:shadow-[0_0_20px_rgba(242,210,78,.08)]
        "
      >
        {icon}
      </span>

      <div className="min-w-0">
        <p
          className="
            whitespace-nowrap
            text-[7px]
            font-bold
            uppercase
            tracking-[0.17em]
            text-[#77718b]
          "
        >
          {label}
        </p>

        <p
          className="
            mt-0.5
            truncate
            text-[10px]
            font-semibold
            text-[#e9dfbd]
            sm:text-[11px]
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   COMPONENT
============================================================ */

export default function HoroscopeRashi({
  english,
  hindi,
  sanskrit,
  description,
  dates,
  element,
  nature,
  planet,
  energy,
  symbol,
  initials,
}: HoroscopeRashiProps) {
  /*
   * Sanskrit intentionally not rendered.
   * Rashi section remains compact.
   */
  void sanskrit;

  const safeEnglish = normalizeName(english);
  const safeHindi = normalizeName(hindi);

  const safeDescription =
    cleanString(description);

  const safeDates =
    cleanString(dates);

  const safeElement =
    cleanString(element);

  const safeNature =
    cleanString(nature);

  const safePlanet =
    cleanString(planet);

  const safeEnergy =
    cleanString(energy);

  /*
   * CMS ONLY.
   */
  const safeInitials = useMemo(
    () => cleanInitials(initials),
    [initials]
  );

  /*
   * CMS ONLY.
   */
  const safeSymbol =
    cleanString(symbol);

  /*
   * Resolve CMS image once.
   */
  const symbolSource = useMemo(
    () =>
      resolveSymbolSource(
        safeSymbol
      ),
    [safeSymbol]
  );

  const symbolIsImage =
    Boolean(symbolSource) &&
    isImageSource(symbolSource);

  /*
   * Debug.
   */
  if (
    typeof window !== "undefined"
  ) {
    console.log(
      "NATIONPATH RASHI IMAGE:",
      {
        english: safeEnglish,
        hindi: safeHindi,
        cmsSymbol: safeSymbol,
        resolvedSymbol: symbolSource,
        isImage: symbolIsImage,
        initials: safeInitials,
      }
    );
  }

  return (
    <section
      data-section="horoscope-rashi"
      className="
        group
        relative
        overflow-hidden
        rounded-[26px]
        border
        border-[rgba(224,185,88,.11)]
        bg-[linear-gradient(135deg,rgba(20,14,43,.98),rgba(7,5,23,.99))]
        shadow-[0_28px_100px_rgba(0,0,0,.32)]
      "
    >
      {/* ======================================================
          COSMIC BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        <motion.div
          animate={{
            opacity: [
              0.1,
              0.2,
              0.1,
            ],
            scale: [
              1,
              1.08,
              1,
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-28
            -top-32
            h-[340px]
            w-[340px]
            rounded-full
            bg-[#68176f]
            blur-[115px]
          "
        />

        <motion.div
          animate={{
            opacity: [
              0.06,
              0.15,
              0.06,
            ],
            scale: [
              1,
              1.1,
              1,
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -right-28
            top-[18%]
            h-[320px]
            w-[320px]
            rounded-full
            bg-[#a40d82]
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            left-[50%]
            top-[42%]
            h-[220px]
            w-[220px]
            -translate-x-1/2
            rounded-full
            bg-[#d8ae42]
            opacity-[0.025]
            blur-[90px]
          "
        />

        <motion.span
          animate={{
            x: [
              0,
              42,
              0,
            ],
            y: [
              0,
              -14,
              0,
            ],
            opacity: [
              0.1,
              0.55,
              0.1,
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-[12%]
            top-[22%]
            h-1
            w-1
            rounded-full
            bg-[#f2d24e]
            shadow-[0_0_12px_#f2d24e]
          "
        />

        <motion.span
          animate={{
            x: [
              0,
              -35,
              0,
            ],
            y: [
              0,
              16,
              0,
            ],
            opacity: [
              0.08,
              0.45,
              0.08,
            ],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            delay: 1.2,
            ease: "easeInOut",
          }}
          className="
            absolute
            right-[21%]
            top-[15%]
            h-[3px]
            w-[3px]
            rounded-full
            bg-[#df62b1]
            shadow-[0_0_10px_#df62b1]
          "
        />

        <motion.span
          animate={{
            opacity: [
              0.1,
              0.55,
              0.1,
            ],
            scale: [
              0.8,
              1.2,
              0.8,
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 2,
            ease: "easeInOut",
          }}
          className="
            absolute
            bottom-[15%]
            left-[42%]
            h-[3px]
            w-[3px]
            rounded-full
            bg-[#d7b84e]
            shadow-[0_0_8px_#d7b84e]
          "
        />

        <div
          className="
            absolute
            bottom-0
            left-1/2
            h-px
            w-[78%]
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-[rgba(242,210,78,.28)]
            to-transparent
          "
        />
      </div>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          p-4
          sm:p-6
          lg:p-7
        "
      >
        {/* ====================================================
            HEADER
        ==================================================== */}

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
              min-w-0
              items-center
              gap-2
            "
          >
            <motion.span
              animate={{
                opacity: [
                  0.4,
                  1,
                  0.4,
                ],
                scale: [
                  0.9,
                  1.1,
                  0.9,
                ],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                h-1.5
                w-1.5
                shrink-0
                rounded-full
                bg-[#f2d24e]
                shadow-[0_0_10px_rgba(242,210,78,.8)]
              "
            />

            <span
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#d9c478]
              "
            >
              Rashi Profile
            </span>
          </div>

          <div
            className="
              hidden
              items-center
              gap-1.5
              sm:flex
            "
          >
            <Sparkles
              size={11}
              className="text-[#d8b84f]"
            />

            <span
              className="
                text-[7px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#625d73]
              "
            >
              Cosmic Identity
            </span>
          </div>
        </div>

        {/* ====================================================
            MAIN GRID
        ==================================================== */}

        <div
          className="
            mt-5
            grid
            gap-6
            lg:grid-cols-[minmax(0,1fr)_205px]
            lg:items-center
          "
        >
          {/* ==================================================
              LEFT
          ================================================== */}

          <div className="min-w-0">
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
            >
              <div
                className="
                  flex
                  flex-wrap
                  items-baseline
                  gap-x-3
                  gap-y-1
                "
              >
                <h2
                  className="
                    font-serif
                    text-[2rem]
                    font-semibold
                    leading-none
                    tracking-[-0.045em]
                    text-[#f2ead2]
                    sm:text-[2.45rem]
                  "
                >
                  {safeEnglish ||
                    "Zodiac"}
                </h2>

                {safeHindi &&
                  safeHindi !==
                    safeEnglish && (
                    <>
                      <span
                        aria-hidden="true"
                        className="
                          hidden
                          h-1
                          w-1
                          rounded-full
                          bg-[#756d82]
                          sm:block
                        "
                      />

                      <span
                        className="
                          font-serif
                          text-[15px]
                          text-[#d9c47a]
                          sm:text-[16px]
                        "
                      >
                        {safeHindi}
                      </span>
                    </>
                  )}
              </div>
            </motion.div>

            {/* DESCRIPTION */}

            {safeDescription && (
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
                  delay: 0.08,
                  duration: 0.45,
                }}
                className="
                  mt-4
                  max-w-3xl
                  border-l
                  border-[rgba(242,210,78,.24)]
                  pl-3.5
                  sm:pl-4
                "
              >
                <p
                  className="
                    text-[12px]
                    leading-[1.75]
                    text-[#cfc6aa]
                    sm:text-[13px]
                  "
                >
                  {safeDescription}
                </p>
              </motion.div>
            )}

            {/* ==================================================
                SINGLE ROW METADATA
            ================================================== */}

            {(
              safeElement ||
              safePlanet ||
              safeNature ||
              safeEnergy ||
              safeDates
            ) && (
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
                  delay: 0.14,
                  duration: 0.45,
                }}
                className="
                  mt-5
                  overflow-x-auto
                  rounded-2xl
                  border
                  border-white/[0.065]
                  bg-[rgba(3,3,27,.42)]
                  scrollbar-none
                "
              >
                <div
                  className="
                    flex
                    min-w-max
                    items-stretch
                  "
                >
                  {safeElement && (
                    <MetaItem
                      icon={
                        <CircleDot
                          size={12}
                        />
                      }
                      label="Element"
                      value={safeElement}
                    />
                  )}

                  {safePlanet && (
                    <MetaItem
                      icon={
                        <Orbit
                          size={12}
                        />
                      }
                      label="Ruling Planet"
                      value={safePlanet}
                    />
                  )}

                  {safeNature && (
                    <MetaItem
                      icon={
                        <Leaf
                          size={12}
                        />
                      }
                      label="Nature"
                      value={safeNature}
                    />
                  )}

                  {safeEnergy && (
                    <MetaItem
                      icon={
                        <Zap
                          size={12}
                        />
                      }
                      label="Energy"
                      value={safeEnergy}
                    />
                  )}

                  {safeDates && (
                    <MetaItem
                      icon={
                        <CalendarDays
                          size={12}
                        />
                      }
                      label="Dates"
                      value={safeDates}
                      last
                    />
                  )}
                </div>
              </motion.div>
            )}

            {/* ==================================================
                NAME INITIALS
            ================================================== */}

            {safeInitials.length > 0 && (
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
                  delay: 0.2,
                  duration: 0.45,
                }}
                className="
                  mt-4
                  flex
                  flex-col
                  gap-2.5
                  rounded-2xl
                  border
                  border-[rgba(222,176,219,.09)]
                  bg-[linear-gradient(
                    135deg,
                    rgba(242,210,78,.035),
                    rgba(116,12,104,.035)
                  )]
                  px-3.5
                  py-3
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  sm:px-4
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <Star
                    size={13}
                    className="
                      shrink-0
                      text-[#f2d24e]
                      drop-shadow-[0_0_8px_rgba(242,210,78,.45)]
                    "
                  />

                  <div>
                    <p
                      className="
                        text-[7px]
                        font-bold
                        uppercase
                        tracking-[0.20em]
                        text-[#e6cb73]
                      "
                    >
                      Name Initials
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-[9px]
                        text-[#77718b]
                      "
                    >
                      Auspicious starting syllables
                    </p>
                  </div>
                </div>

                <div
                  className="
                    flex
                    flex-wrap
                    gap-1.5
                  "
                >
                  {safeInitials.map(
                    (
                      initial,
                      index
                    ) => (
                      <motion.span
                        key={`${initial}-${index}`}
                        initial={{
                          opacity: 0,
                          y: 5,
                          scale: 0.9,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        transition={{
                          duration: 0.22,
                          delay:
                            index *
                            0.035,
                        }}
                        whileHover={{
                          y: -2,
                          scale: 1.04,
                        }}
                        className="
                          flex
                          h-[32px]
                          min-w-[40px]
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-[rgba(242,210,78,.17)]
                          bg-[rgba(242,210,78,.045)]
                          px-2
                          font-serif
                          text-[11px]
                          font-semibold
                          text-[#e9ca77]
                          shadow-[inset_0_0_18px_rgba(242,210,78,.02)]
                          transition-colors
                          hover:border-[rgba(242,210,78,.34)]
                          hover:bg-[rgba(242,210,78,.085)]
                        "
                      >
                        {initial}
                      </motion.span>
                    )
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* ==================================================
              RIGHT — RASHI OBSERVATORY
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.65,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="
              relative
              flex
              min-h-[210px]
              items-center
              justify-center
              overflow-hidden
              rounded-[26px]
              border
              border-[rgba(242,210,78,.08)]
              bg-[radial-gradient(
                circle_at_center,
                rgba(116,12,104,.18),
                rgba(9,6,30,.16)_56%,
                transparent_78%
              )]
            "
          >
            {/* INNER AURA */}

            <motion.div
              animate={{
                opacity: [
                  0.15,
                  0.32,
                  0.15,
                ],
                scale: [
                  0.94,
                  1.06,
                  0.94,
                ],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                h-[135px]
                w-[135px]
                rounded-full
                bg-[#8b126f]
                blur-[48px]
              "
            />

            <motion.div
              animate={{
                opacity: [
                  0.08,
                  0.17,
                  0.08,
                ],
                scale: [
                  0.95,
                  1.08,
                  0.95,
                ],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                h-[75px]
                w-[75px]
                rounded-full
                bg-[#e2b84c]
                blur-[25px]
              "
            />

            {/* SUBTLE OBSERVATORY RING */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 38,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                h-[165px]
                w-[165px]
                rounded-full
                border
                border-[rgba(242,210,78,.10)]
              "
            >
              <span
                className="
                  absolute
                  left-1/2
                  top-[-3px]
                  h-1.5
                  w-1.5
                  -translate-x-1/2
                  rounded-full
                  bg-[#f2d24e]
                  shadow-[0_0_9px_#f2d24e]
                "
              />
            </motion.div>

            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 29,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                h-[132px]
                w-[132px]
                rounded-full
                border
                border-[rgba(224,91,176,.08)]
                [transform:rotate(35deg)_scaleY(.48)]
              "
            >
              <span
                className="
                  absolute
                  right-[-2px]
                  top-1/2
                  h-1.5
                  w-1.5
                  -translate-y-1/2
                  rounded-full
                  bg-[#df62b1]
                  shadow-[0_0_9px_#df62b1]
                "
              />
            </motion.div>

            {/* STARS */}

            <motion.span
              animate={{
                opacity: [
                  0.15,
                  0.7,
                  0.15,
                ],
              }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                left-[21%]
                top-[24%]
                h-[3px]
                w-[3px]
                rounded-full
                bg-[#f2d24e]
                shadow-[0_0_7px_#f2d24e]
              "
            />

            <motion.span
              animate={{
                opacity: [
                  0.1,
                  0.6,
                  0.1,
                ],
              }}
              transition={{
                duration: 4.3,
                repeat: Infinity,
                delay: 1,
                ease: "easeInOut",
              }}
              className="
                absolute
                bottom-[23%]
                right-[20%]
                h-[3px]
                w-[3px]
                rounded-full
                bg-[#df62b1]
                shadow-[0_0_8px_#df62b1]
              "
            />

            {/* ==================================================
                RASHI IMAGE
            ================================================== */}

            <motion.div
              animate={{
                y: [
                  0,
                  -3,
                  0,
                ],
                scale: [
                  1,
                  1.018,
                  1,
                ],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                relative
                z-10
                flex
                h-[120px]
                w-[120px]
                items-center
                justify-center
              "
            >
              {/* GOLD IMAGE AURA */}

              <div
                aria-hidden="true"
                className="
                  absolute
                  inset-[10px]
                  rounded-full
                  bg-[#e2b84c]
                  opacity-[0.10]
                  blur-[25px]
                "
              />

              {/* SECONDARY GOLD HALO */}

              <div
                aria-hidden="true"
                className="
                  absolute
                  inset-[25px]
                  rounded-full
                  bg-[#f2d24e]
                  opacity-[0.07]
                  blur-[18px]
                "
              />

              {symbolIsImage ? (
                <img
                  src={symbolSource}
                  alt={
                    safeEnglish
                      ? `${safeEnglish} zodiac symbol`
                      : "Zodiac symbol"
                  }
                  className="
                    relative
                    z-10
                    h-[92px]
                    w-[92px]
                    object-contain

                    brightness-0
                    saturate-100
                    invert-[79%]
                    sepia-[48%]
                    saturate-[900%]
                    hue-rotate-[3deg]
                    brightness-[1.05]
                    contrast-[1.05]

                    drop-shadow-[0_0_18px_rgba(242,205,78,.38)]

                    transition-all
                    duration-500

                    group-hover:scale-[1.04]
                    group-hover:drop-shadow-[0_0_24px_rgba(242,205,78,.52)]
                  "
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  onLoad={(event) => {
                    console.log(
                      "NATIONPATH RASHI IMAGE LOADED:",
                      {
                        cmsSymbol:
                          safeSymbol,
                        resolvedSymbol:
                          symbolSource,
                        naturalWidth:
                          event.currentTarget
                            .naturalWidth,
                        naturalHeight:
                          event.currentTarget
                            .naturalHeight,
                      }
                    );
                  }}
                  onError={(event) => {
                    console.error(
                      "NATIONPATH RASHI IMAGE LOAD FAILED:",
                      {
                        cmsSymbol:
                          safeSymbol,
                        resolvedSymbol:
                          symbolSource,
                      }
                    );

                    event.currentTarget.style.display =
                      "none";
                  }}
                />
              ) : (
                <CircleDot
                  size={52}
                  strokeWidth={1}
                  className="
                    relative
                    z-10
                    text-[rgba(242,210,78,.28)]
                  "
                />
              )}
            </motion.div>

            {/* CORNER ACCENTS */}

            <span
              aria-hidden="true"
              className="
                absolute
                left-4
                top-4
                h-5
                w-5
                border-l
                border-t
                border-[rgba(242,210,78,.18)]
              "
            />

            <span
              aria-hidden="true"
              className="
                absolute
                bottom-4
                right-4
                h-5
                w-5
                border-b
                border-r
                border-[rgba(242,210,78,.18)]
              "
            />

            {/* LIVE INDICATOR */}

            <div
              className="
                absolute
                bottom-3
                left-1/2
                z-20
                flex
                -translate-x-1/2
                items-center
                gap-1.5
              "
            >
              <motion.span
                animate={{
                  opacity: [
                    0.35,
                    1,
                    0.35,
                  ],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#63c89b]
                  shadow-[0_0_7px_rgba(99,200,155,.75)]
                "
              />

              <span
                className="
                  text-[6px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#77718b]
                "
              >
                Rashi
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-between
          border-t
          border-white/[0.045]
          bg-black/[0.12]
          px-4
          py-2.5
          sm:px-6
        "
      >
        <span
          className="
            text-[7px]
            font-bold
            uppercase
            tracking-[0.18em]
            text-[#625d73]
          "
        >
          {safeEnglish || "Zodiac"} • Rashi
        </span>

        <span
          className="
            flex
            items-center
            gap-1.5
            text-[7px]
            font-bold
            uppercase
            tracking-[0.16em]
            text-[#625d73]
          "
        >
          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-[#63c89b]
              shadow-[0_0_7px_rgba(99,200,155,.65)]
            "
          />

          Published
        </span>
      </div>
    </section>
  );
}

