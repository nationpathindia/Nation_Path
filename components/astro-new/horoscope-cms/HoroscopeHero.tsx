"use client";

/*
//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO
//
// HOROSCOPE HERO — FINAL RESPONSIVE / MOBILE LOCK
//
// CMS FIRST
// No calculation
// No astrology engine
// No AI generation
//
// Zodiac identity → CMS / Zodiac Master
// Name initials → CMS / Zodiac Master
// Modality → CMS / Zodiac Master → media.modality
//
// PREMIUM COSMIC / VEDIC
// DESKTOP + TABLET + MOBILE RESPONSIVE
//
//////////////////////////////////////////////////////////////
*/

import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  ArrowUpRight,
  CircleDot,
  Leaf,
  Orbit,
  Sparkles,
  X,
  Zap,
} from "lucide-react";


/*
//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////
*/

/*
 * IMPORTANT:
 *
 * Do NOT use:
 *
 *   Record<string, unknown>
 *
 * directly as the public component prop type.
 *
 * CmsHoroscopeHero is a closed TypeScript interface and therefore
 * does not necessarily have a string index signature.
 *
 * We accept the CMS contract at the component boundary as unknown
 * and narrow it safely with isRecord() before reading fields.
 */

type RecordValue = Record<string, unknown>;

interface HoroscopeHeroProps {
  hero?: unknown;
  identity?: unknown;
  zodiac?: unknown;
  traits?: unknown;
}


/*
//////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////
*/

function isRecord(
  value: unknown
): value is RecordValue {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}


function stringValue(
  value: unknown
): string {
  return typeof value === "string"
    ? value.trim()
    : "";
}


function normalizeText(
  value: unknown
): string {
  return stringValue(value)
    .replace(/\s+/g, " ")
    .trim();
}


function capitalize(
  value: string
): string {
  if (!value) return "";

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
}


/*
//////////////////////////////////////////////////////////////
// CLEAN ZODIAC NAME
//
// Prevents values such as:
//
// Taurus Daily Horoscope
// Taurus Rashi
// TaurussvgApril 20 - May 20
//
// from reaching the UI.
//////////////////////////////////////////////////////////////
*/

function cleanZodiacName(
  value: string
): string {
  if (!value) return "";

  let result = value
    .replace(
      /\b(daily|weekly|monthly|yearly)\b/gi,
      " "
    )
    .replace(
      /\bhoroscope\b/gi,
      " "
    )
    .replace(
      /\brashi\b/gi,
      " "
    )
    .replace(
      /\bsvg\b/gi,
      " "
    )
    .replace(
      /\b\d{1,2}\s*[-–]\s*\d{1,2}\b/g,
      " "
    )
    .replace(
      /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b.*$/i,
      ""
    )
    .replace(/\s+/g, " ")
    .trim();

  return result;
}


/*
//////////////////////////////////////////////////////////////
// DESCRIPTION
//////////////////////////////////////////////////////////////
*/

function extractDescription(
  hero?: RecordValue | null
): string {
  if (!hero) return "";

  const candidates = [
    hero.description,
    hero.prediction,
    hero.content,
    hero.summary,
    hero.message,
    hero.reading,
  ];

  for (const value of candidates) {
    const text = normalizeText(value);

    if (text) {
      return text;
    }
  }

  return "";
}


/*
//////////////////////////////////////////////////////////////
// NAME INITIALS
//
// CMS / Zodiac Master ONLY
// No hardcoded syllables
// No calculation
//////////////////////////////////////////////////////////////
*/

function extractInitials(
  zodiac?: RecordValue | null,
  identity?: RecordValue | null
): string[] {
  const zodiacIdentity =
    zodiac?.identity;

  const sources: unknown[] = [
    isRecord(zodiacIdentity)
      ? zodiacIdentity.nameInitials
      : undefined,

    zodiac?.nameInitials,

    identity?.nameInitials,
  ];

  for (const source of sources) {
    if (!Array.isArray(source)) {
      continue;
    }

    const values = source
      .filter(
        (
          item
        ): item is string =>
          typeof item === "string" &&
          item.trim().length > 0
      )
      .map((item) =>
        item.trim()
      );

    if (values.length > 0) {
      return values;
    }
  }

  return [];
}


/*
//////////////////////////////////////////////////////////////
// COMPACT PROFILE ITEM
//////////////////////////////////////////////////////////////
*/

interface ProfileItemProps {
  icon: ReactNode;
  label: string;
  value: string;
  delay?: number;
}

function ProfileItem({
  icon,
  label,
  value,
  delay = 0,
}: ProfileItemProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 6,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
        delay,
      }}
      className="
        group
        relative
        flex
        min-w-0
        items-center
        gap-2
        border-r
        border-white/[0.055]
        px-2.5
        py-2.5
        last:border-r-0
        sm:px-3
        sm:py-2
      "
    >
      <span
        className="
          flex
          h-6
          w-6
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          border-[rgba(242,210,78,.13)]
          bg-[rgba(242,210,78,.045)]
          text-[#d9b950]
          transition-all
          duration-300
          group-hover:border-[rgba(242,210,78,.28)]
          group-hover:bg-[rgba(242,210,78,.08)]
          group-hover:shadow-[0_0_16px_rgba(242,210,78,.08)]
        "
      >
        {icon}
      </span>

      <div className="min-w-0 flex-1">
        <p
          className="
            text-[6.5px]
            font-bold
            uppercase
            tracking-[0.17em]
            text-[#77728e]
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
            leading-tight
            text-[#eadfbd]
            sm:text-[11px]
          "
        >
          {value}
        </p>
      </div>
    </motion.div>
  );
}


/*
//////////////////////////////////////////////////////////////
// COMPONENT
//////////////////////////////////////////////////////////////
*/

export default function HoroscopeHero({
  hero,
  identity,
  zodiac,
  traits,
}: HoroscopeHeroProps) {

  const [detailsOpen, setDetailsOpen] =
    useState(false);


  /*
  ////////////////////////////////////////////////////////////
  // SAFE CMS RECORD NORMALIZATION
  //
  // The parent CMS types may be interfaces such as
  // CmsHoroscopeHero. They are intentionally NOT forced into
  // Record<string, unknown>.
  //
  // We narrow unknown → RecordValue here.
  ////////////////////////////////////////////////////////////
  */

  const heroRecord =
    isRecord(hero)
      ? hero
      : null;

  const identityRecord =
    isRecord(identity)
      ? identity
      : null;

  const zodiacRecord =
    isRecord(zodiac)
      ? zodiac
      : null;

  const traitsRecord =
    isRecord(traits)
      ? traits
      : null;


  /*
  ////////////////////////////////////////////////////////////
  // ESC KEY
  ////////////////////////////////////////////////////////////
  */

  useEffect(() => {
    if (!detailsOpen) return;

    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setDetailsOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [detailsOpen]);


  /*
  ////////////////////////////////////////////////////////////
  // ZODIAC MASTER IDENTITY
  ////////////////////////////////////////////////////////////
  */

  const zodiacIdentity =
    isRecord(zodiacRecord?.identity)
      ? zodiacRecord.identity
      : null;


  /*
  ////////////////////////////////////////////////////////////
  // ZODIAC MASTER MEDIA
  ////////////////////////////////////////////////////////////
  */

  const zodiacMedia =
    isRecord(zodiacRecord?.media)
      ? zodiacRecord.media
      : null;


  /*
  ////////////////////////////////////////////////////////////
  // ZODIAC NAME
  ////////////////////////////////////////////////////////////
  */

  const englishName =
    cleanZodiacName(
      stringValue(
        isRecord(zodiacRecord?.names)
          ? zodiacRecord.names.english
          : undefined
      ) ||
      stringValue(zodiacRecord?.english) ||
      stringValue(zodiacRecord?.name) ||
      stringValue(
        isRecord(identityRecord)
          ? identityRecord.english
          : undefined
      ) ||
      stringValue(heroRecord?.title)
    ) || "Zodiac";


  /*
  ////////////////////////////////////////////////////////////
  // HINDI NAME
  ////////////////////////////////////////////////////////////
  */

  const hindiName =
    stringValue(
      isRecord(zodiacRecord?.names)
        ? zodiacRecord.names.hindi
        : undefined
    ) ||
    stringValue(zodiacRecord?.hindi) ||
    stringValue(
      isRecord(zodiacIdentity)
        ? zodiacIdentity.rashi
        : undefined
    ) ||
    stringValue(
      isRecord(identityRecord)
        ? identityRecord.rashi
        : undefined
    );


  /*
  ////////////////////////////////////////////////////////////
  // HOROSCOPE CONTENT
  ////////////////////////////////////////////////////////////
  */

  const description =
    extractDescription(heroRecord);


  /*
  ////////////////////////////////////////////////////////////
  // ELEMENT
  ////////////////////////////////////////////////////////////
  */

  const element =
    stringValue(zodiacRecord?.element) ||
    stringValue(
      isRecord(zodiacIdentity)
        ? zodiacIdentity.element
        : undefined
    ) ||
    stringValue(
      isRecord(identityRecord)
        ? identityRecord.element
        : undefined
    ) ||
    stringValue(traitsRecord?.element);


  /*
  ////////////////////////////////////////////////////////////
  // RULING PLANET
  ////////////////////////////////////////////////////////////
  */

  const rulingPlanet =
    stringValue(
      isRecord(zodiacRecord?.names)
        ? zodiacRecord.names.rulingPlanet
        : undefined
    ) ||
    stringValue(
      isRecord(zodiacIdentity)
        ? zodiacIdentity.rulingPlanet
        : undefined
    ) ||
    stringValue(
      isRecord(identityRecord)
        ? identityRecord.rulingPlanet
        : undefined
    ) ||
    stringValue(zodiacRecord?.rulingPlanet) ||
    stringValue(zodiacRecord?.planet) ||
    stringValue(traitsRecord?.rulingPlanet) ||
    stringValue(traitsRecord?.planet);


  /*
  ////////////////////////////////////////////////////////////
  // ENERGY
  ////////////////////////////////////////////////////////////
  */

  const energy =
    stringValue(
      isRecord(zodiacIdentity)
        ? zodiacIdentity.energy
        : undefined
    ) ||
    stringValue(zodiacRecord?.energy) ||
    stringValue(
      isRecord(identityRecord)
        ? identityRecord.energy
        : undefined
    ) ||
    stringValue(traitsRecord?.energy);


  /*
  ////////////////////////////////////////////////////////////
  // MODALITY
  //
  // CMS / Zodiac Master ONLY
  ////////////////////////////////////////////////////////////
  */

  const modality =
    stringValue(
      zodiacMedia?.modality
    );


  /*
  ////////////////////////////////////////////////////////////
  // DATES
  ////////////////////////////////////////////////////////////
  */

  const dates =
    stringValue(
      isRecord(zodiacIdentity)
        ? zodiacIdentity.dates
        : undefined
    ) ||
    stringValue(zodiacRecord?.dates) ||
    stringValue(
      isRecord(identityRecord)
        ? identityRecord.dates
        : undefined
    );


  /*
  ////////////////////////////////////////////////////////////
  // NAME INITIALS
  ////////////////////////////////////////////////////////////
  */

  const nameInitials =
    useMemo(
      () =>
        extractInitials(
          zodiacRecord,
          identityRecord
        ),
      [
        zodiacRecord,
        identityRecord,
      ]
    );


  /*
  ////////////////////////////////////////////////////////////
  // SYMBOL
  ////////////////////////////////////////////////////////////
  */

  const symbol =
    stringValue(
      zodiacMedia?.icon
    ) ||
    stringValue(
      isRecord(zodiacRecord?.seo)
        ? zodiacRecord.seo.symbol
        : undefined
    ) ||
    stringValue(
      zodiacRecord?.symbol
    ) ||
    stringValue(
      isRecord(zodiacIdentity)
        ? zodiacIdentity.symbol
        : undefined
    ) ||
    stringValue(
      isRecord(identityRecord)
        ? identityRecord.symbol
        : undefined
    );


  const symbolIsImage =
    symbol.startsWith("/") ||
    symbol.startsWith("http://") ||
    symbol.startsWith("https://") ||
    symbol.startsWith("data:image");


  const symbolSource =
    symbol || "✦";


  /*
  ////////////////////////////////////////////////////////////
  // RENDER
  ////////////////////////////////////////////////////////////
  */

  return (
    <>
      <section
        data-section="horoscope-hero"
        className="
          relative
          w-full
          max-w-full
          overflow-hidden
          rounded-none
          border
          border-[rgba(224,185,88,.10)]
          bg-[linear-gradient(135deg,rgba(19,14,40,.96),rgba(8,6,23,.98))]
          shadow-[0_20px_60px_rgba(0,0,0,.25)]
          sm:rounded-[2px]
          sm:shadow-[0_25px_80px_rgba(0,0,0,.28)]
        "
      >

        {/* ==================================================
            COSMIC BACKGROUND
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

          <div
            className="
              absolute
              -left-24
              -top-28
              h-[240px]
              w-[240px]
              rounded-full
              bg-[#65156d]
              opacity-[0.14]
              blur-[90px]
              sm:h-[300px]
              sm:w-[300px]
              sm:opacity-[0.17]
              sm:blur-[100px]
              animate-[pulse_9s_ease-in-out_infinite]
            "
          />

          <div
            className="
              absolute
              -right-24
              top-[10%]
              h-[240px]
              w-[240px]
              rounded-full
              bg-[#a20b7f]
              opacity-[0.09]
              blur-[95px]
              sm:h-[300px]
              sm:w-[300px]
              sm:opacity-[0.12]
              sm:blur-[110px]
              animate-[pulse_11s_ease-in-out_infinite]
            "
          />

          <div
            className="
              absolute
              left-[43%]
              -top-24
              h-[220px]
              w-[220px]
              rounded-full
              bg-[#d8ae42]
              opacity-[0.035]
              blur-[85px]
              sm:h-[280px]
              sm:w-[280px]
              sm:blur-[100px]
            "
          />

          <motion.span
            animate={{
              opacity: [
                0.12,
                0.6,
                0.12,
              ],
              scale: [
                0.8,
                1.1,
                0.8,
              ],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              left-[7%]
              top-[25%]
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
                0.5,
                0.08,
              ],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              delay: 1,
              ease: "easeInOut",
            }}
            className="
              absolute
              right-[18%]
              top-[22%]
              h-1
              w-1
              rounded-full
              bg-[#e05bb0]
              shadow-[0_0_10px_#e05bb0]
            "
          />

          <motion.span
            animate={{
              opacity: [
                0.08,
                0.4,
                0.08,
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
              bottom-[15%]
              left-[38%]
              h-[3px]
              w-[3px]
              rounded-full
              bg-[#d7b84e]
              shadow-[0_0_8px_#d7b84e]
            "
          />

        </div>


        {/* ==================================================
            TOP LABEL
            ================================================== */}

        <div
          className="
            relative
            z-10
            flex
            min-w-0
            items-center
            justify-between
            border-b
            border-white/[0.045]
            px-3.5
            py-2.5
            sm:px-6
            sm:py-3
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
                bg-[#f2d24e]
                shadow-[0_0_10px_rgba(242,210,78,.75)]
              "
            />

            <span
              className="
                truncate
                text-[7px]
                font-bold
                uppercase
                tracking-[0.20em]
                text-[#d9c478]
                sm:text-[8px]
                sm:tracking-[0.24em]
              "
            >
              Daily Horoscope
            </span>

          </div>


          <span
            className="
              ml-3
              hidden
              shrink-0
              text-[7px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-[#68627d]
              sm:block
            "
          >
            NationPath Astro
          </span>

        </div>


        {/* ==================================================
            MAIN CONTENT
            ================================================== */}

        <div
          className="
            relative
            z-10
            flex
            flex-col
            lg:grid
            lg:grid-cols-[1.55fr_.95fr]
          "
        >

          {/* =================================================
              LEFT
              ================================================= */}

          <div
            className="
              relative
              min-w-0
              px-3.5
              py-5
              sm:px-6
              sm:py-6
              lg:px-8
              lg:py-6
            "
          >

            <div
              aria-hidden="true"
              className="
                absolute
                left-0
                top-7
                h-20
                w-px
                bg-gradient-to-b
                from-[#f2d24e]/40
                to-transparent
              "
            />


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
                duration: 0.55,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="min-w-0"
            >

              {/* =================================================
                  TITLE + HINDI
                  ================================================= */}

              <div
                className="
                  flex
                  min-w-0
                  flex-wrap
                  items-baseline
                  gap-x-2.5
                  gap-y-1
                  sm:gap-x-3
                "
              >

                <h1
                  className="
                    min-w-0
                    max-w-full
                    break-words
                    font-serif
                    text-[2rem]
                    font-semibold
                    leading-[0.95]
                    tracking-[-0.045em]
                    text-[#f2ead2]
                    xs:text-[2.15rem]
                    sm:text-[2.7rem]
                    lg:text-[3rem]
                  "
                >
                  {englishName}
                </h1>


                {hindiName && (
                  <>
                    <span
                      className="
                        hidden
                        h-1
                        w-1
                        rounded-full
                        bg-[#70687e]
                        sm:block
                      "
                    />

                    <span
                      className="
                        font-serif
                        text-[14px]
                        leading-none
                        text-[#d9c47a]
                        sm:text-[17px]
                      "
                    >
                      {hindiName}
                    </span>
                  </>
                )}

              </div>


              {/* =================================================
                  COMPACT PROFILE
                  ================================================= */}

              {(
                element ||
                rulingPlanet ||
                energy ||
                modality
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
                    delay: 0.08,
                    duration: 0.4,
                  }}
                  className="
                    mt-4
                    grid
                    grid-cols-2
                    overflow-hidden
                    rounded-[2px]
                    border
                    border-[rgba(255,255,255,.065)]
                    bg-[rgba(5,5,40,.34)]
                    sm:grid-cols-4
                  "
                >

                  {element && (
                    <ProfileItem
                      icon={
                        <CircleDot
                          size={11}
                        />
                      }
                      label="Element"
                      value={capitalize(
                        element
                      )}
                      delay={0.04}
                    />
                  )}


                  {rulingPlanet && (
                    <ProfileItem
                      icon={
                        <Orbit
                          size={11}
                        />
                      }
                      label="Ruler"
                      value={rulingPlanet}
                      delay={0.07}
                    />
                  )}


                  {energy && (
                    <ProfileItem
                      icon={
                        <Zap
                          size={11}
                        />
                      }
                      label="Energy"
                      value={energy}
                      delay={0.10}
                    />
                  )}


                  {modality && (
                    <ProfileItem
                      icon={
                        <Leaf
                          size={11}
                        />
                      }
                      label="Modality"
                      value={capitalize(
                        modality
                      )}
                      delay={0.13}
                    />
                  )}

                </motion.div>
              )}


              {/* =================================================
                  READING
                  ================================================= */}

              {description && (

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
                    delay: 0.15,
                    duration: 0.45,
                  }}
                  className="
                    relative
                    mt-3.5
                    w-full
                    max-w-[780px]
                    overflow-hidden
                    rounded-[2px]
                    border
                    border-[rgba(222,176,219,.10)]
                    bg-[rgba(10,5,55,.42)]
                    shadow-[0_12px_35px_rgba(0,0,0,.18)]
                    backdrop-blur-[8px]
                  "
                >

                  <div
                    aria-hidden="true"
                    className="
                      absolute
                      -right-14
                      -top-16
                      h-32
                      w-32
                      rounded-full
                      bg-[#a2088a]
                      opacity-[0.13]
                      blur-[60px]
                    "
                  />


                  <div
                    className="
                      relative
                      px-3.5
                      py-3.5
                      sm:px-4
                      sm:py-4
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

                      <Sparkles
                        size={12}
                        className="shrink-0 text-[#f2d24e]"
                      />

                      <span
                        className="
                          truncate
                          text-[7px]
                          font-bold
                          uppercase
                          tracking-[0.18em]
                          text-[#e6cb73]
                          sm:tracking-[0.21em]
                        "
                      >
                        Today's Cosmic Reading
                      </span>

                    </div>


                    <p
                      className="
                        mt-2
                        line-clamp-3
                        max-w-[730px]
                        break-words
                        text-[11px]
                        leading-[1.65]
                        text-[#eadcae]
                        sm:text-[12px]
                        lg:text-[13px]
                      "
                    >
                      {description}
                    </p>


                    <motion.button
                      type="button"
                      whileHover={{
                        y: -1,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      onClick={() =>
                        setDetailsOpen(true)
                      }
                      className="
                        mt-2.5
                        inline-flex
                        min-h-[34px]
                        items-center
                        gap-1.5
                        rounded-[2px]
                        border
                        border-[rgba(242,210,78,.25)]
                        bg-[rgba(242,210,78,.06)]
                        px-3
                        py-1.5
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        text-[#f2d24e]
                        transition
                        hover:border-[rgba(242,210,78,.42)]
                        hover:bg-[rgba(242,210,78,.11)]
                      "
                    >
                      See more

                      <ArrowUpRight
                        size={11}
                      />

                    </motion.button>

                  </div>

                </motion.div>
              )}


              {/* =================================================
                  VEDIC NAME SYLLABLES
                  ================================================= */}

              {nameInitials.length > 0 && (

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 7,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.2,
                    duration: 0.35,
                  }}
                  className="
                    mt-2.5
                    w-full
                    max-w-[780px]
                    overflow-hidden
                    rounded-[2px]
                    border
                    border-[rgba(222,176,219,.09)]
                    bg-[rgba(12,5,50,.30)]
                    px-3
                    py-2.5
                    sm:px-3.5
                  "
                >

                  <div
                    className="
                      flex
                      min-w-0
                      items-start
                      justify-between
                      gap-2
                    "
                  >

                    <div className="min-w-0">

                      <p
                        className="
                          truncate
                          text-[6.5px]
                          font-bold
                          uppercase
                          tracking-[0.17em]
                          text-[#e6cb73]
                          sm:tracking-[0.2em]
                        "
                      >
                        Vedic Name Syllables
                      </p>

                      <p
                        className="
                          mt-0.5
                          text-[8px]
                          text-[#8f89a5]
                        "
                      >
                        Traditional naming references
                      </p>

                    </div>


                    <span
                      className="
                        shrink-0
                        border
                        border-[rgba(242,210,78,.15)]
                        bg-[rgba(242,210,78,.045)]
                        px-1.5
                        py-1
                        text-[6px]
                        font-bold
                        uppercase
                        tracking-[0.10em]
                        text-[#e6cb73]
                        sm:px-2
                        sm:text-[6.5px]
                        sm:tracking-[0.12em]
                      "
                    >
                      Zodiac Master
                    </span>

                  </div>


                  <div
                    className="
                      mt-2
                      flex
                      max-w-full
                      flex-wrap
                      gap-1
                    "
                  >

                    {nameInitials.map(
                      (
                        item,
                        index
                      ) => (

                        <motion.span
                          key={`${item}-${index}`}
                          initial={{
                            opacity: 0,
                            y: 5,
                            scale: 0.94,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          transition={{
                            duration: 0.2,
                            delay:
                              index * 0.025,
                          }}
                          whileHover={{
                            y: -2,
                            scale: 1.03,
                          }}
                          className="
                            flex
                            min-h-[30px]
                            min-w-[38px]
                            shrink-0
                            items-center
                            justify-center
                            rounded-[2px]
                            border
                            border-[rgba(242,210,78,.18)]
                            bg-[rgba(12,8,52,.62)]
                            px-2
                            font-serif
                            text-[11px]
                            font-semibold
                            text-[#e9ca77]
                          "
                        >
                          {item}
                        </motion.span>

                      )
                    )}

                  </div>

                </motion.div>

              )}

            </motion.div>

          </div>


          {/* =================================================
              DESKTOP DIVIDER
              ================================================= */}

          <div
            aria-hidden="true"
            className="
              absolute
              bottom-[8%]
              left-[64%]
              top-[8%]
              hidden
              w-px
              bg-gradient-to-b
              from-transparent
              via-[rgba(211,62,120,.32)]
              to-transparent
              lg:block
            "
          />


          {/* =================================================
              RIGHT ZODIAC OBSERVATORY
              ================================================= */}

          <motion.aside
            initial={{
              opacity: 0,
              x: 10,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
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
              min-h-[235px]
              w-full
              min-w-0
              flex-col
              items-center
              justify-center
              overflow-hidden
              border-t
              border-white/[0.045]
              px-4
              py-5
              sm:min-h-[300px]
              sm:py-6
              lg:min-h-0
              lg:border-t-0
              lg:px-6
            "
          >

            {/* Ambient glow */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[180px]
                w-[180px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[#79096c]
                opacity-[0.14]
                blur-[70px]
                sm:h-[220px]
                sm:w-[220px]
                sm:opacity-[0.17]
                sm:blur-[85px]
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[80px]
                w-[80px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[#e2b84c]
                opacity-[0.06]
                blur-[32px]
                sm:h-[100px]
                sm:w-[100px]
                sm:opacity-[0.07]
                sm:blur-[40px]
              "
            />


            {/* =================================================
                OBSERVATORY
                ================================================= */}

            <div
              className="
                relative
                flex
                h-[155px]
                w-[155px]
                shrink-0
                items-center
                justify-center
                sm:h-[205px]
                sm:w-[205px]
              "
            >

              {/* Outer frame */}

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 52,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute
                  inset-0
                  rounded-full
                  border
                  border-[rgba(242,210,78,.12)]
                  sm:border-[rgba(242,210,78,.15)]
                "
              />


              {/* Pink orbit */}

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 31,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute
                  inset-[11px]
                  rounded-full
                  border
                  border-[rgba(218,91,170,.12)]
                  [transform:rotate(-34deg)_scaleY(.48)]
                  sm:inset-[14px]
                  sm:border-[rgba(218,91,170,.15)]
                "
              >

                <span
                  className="
                    absolute
                    left-1/2
                    top-[-3px]
                    h-[6px]
                    w-[6px]
                    -translate-x-1/2
                    rounded-full
                    bg-[#e05bb0]
                    shadow-[0_0_8px_#e05bb0]
                    sm:top-[-4px]
                    sm:h-[7px]
                    sm:w-[7px]
                  "
                />

              </motion.div>


              {/* Gold orbit */}

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
                  inset-[22px]
                  rounded-full
                  border
                  border-[rgba(242,210,78,.08)]
                  [transform:rotate(56deg)_scaleY(.32)]
                  sm:inset-[28px]
                  sm:border-[rgba(242,210,78,.10)]
                "
              >

                <span
                  className="
                    absolute
                    right-[-2px]
                    top-1/2
                    h-[5px]
                    w-[5px]
                    -translate-y-1/2
                    rounded-full
                    bg-[#f2d24e]
                    shadow-[0_0_8px_#f2d24e]
                    sm:right-[-3px]
                    sm:h-[6px]
                    sm:w-[6px]
                  "
                />

              </motion.div>


              {/* Inner field */}

              <div
                className="
                  absolute
                  inset-[31px]
                  rounded-full
                  border
                  border-[rgba(255,255,255,.035)]
                  bg-[radial-gradient(circle_at_40%_34%,rgba(229,188,75,.10),rgba(116,12,104,.09)_42%,rgba(9,6,30,.48)_74%)]
                  shadow-[inset_0_0_30px_rgba(168,30,135,.08)]
                  sm:inset-[38px]
                  sm:border-[rgba(255,255,255,.04)]
                  sm:shadow-[inset_0_0_35px_rgba(168,30,135,.08)]
                "
              />


              {/* Stars */}

              <motion.span
                animate={{
                  opacity: [
                    0.2,
                    0.7,
                    0.2,
                  ],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  left-[42px]
                  top-[45px]
                  h-[3px]
                  w-[3px]
                  rounded-full
                  bg-[#f2d24e]
                  shadow-[0_0_7px_#f2d24e]
                  sm:left-[52px]
                  sm:top-[54px]
                "
              />


              <motion.span
                animate={{
                  opacity: [
                    0.12,
                    0.6,
                    0.12,
                  ],
                }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  delay: 1,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  bottom-[45px]
                  right-[42px]
                  h-[3px]
                  w-[3px]
                  rounded-full
                  bg-[#df62b1]
                  shadow-[0_0_8px_#df62b1]
                  sm:bottom-[55px]
                  sm:right-[52px]
                "
              />


              {/* Zodiac symbol */}

              <motion.div
                animate={{
                  y: [
                    0,
                    -2,
                    0,
                  ],
                  scale: [
                    1,
                    1.015,
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
                  z-20
                  flex
                  h-[90px]
                  w-[90px]
                  items-center
                  justify-center
                  sm:h-[115px]
                  sm:w-[115px]
                "
              >

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    inset-[14px]
                    rounded-full
                    bg-[#e2b84c]
                    opacity-[0.045]
                    blur-[18px]
                    sm:inset-[16px]
                    sm:opacity-[0.05]
                    sm:blur-[20px]
                  "
                />


                {symbolIsImage ? (

                  <img
                    src={symbolSource}
                    alt={`${englishName} zodiac`}
                    className="
                      relative
                      z-10
                      h-[62px]
                      w-[62px]
                      object-contain
                      sm:h-[88px]
                      sm:w-[88px]
                    "
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(78%) sepia(48%) saturate(610%) hue-rotate(359deg) brightness(95%) contrast(91%) drop-shadow(0 0 14px rgba(242,205,78,.28))",
                    }}
                  />

                ) : (

                  <span
                    className="
                      relative
                      z-10
                      font-serif
                      text-[4rem]
                      leading-none
                      text-[#d4a445]
                      drop-shadow-[0_0_18px_rgba(242,210,78,.28)]
                      sm:text-[5.3rem]
                    "
                  >
                    {symbolSource}
                  </span>

                )}

              </motion.div>

            </div>


            {/* =================================================
                RIGHT LABEL
                ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 7,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.22,
                duration: 0.4,
              }}
              className="
                relative
                z-10
                -mt-0.5
                max-w-full
                text-center
                sm:-mt-1
              "
            >

              <h2
                className="
                  font-serif
                  text-[1.2rem]
                  font-semibold
                  tracking-[-0.025em]
                  text-[#eee5c9]
                  sm:text-[1.45rem]
                "
              >
                {englishName}
              </h2>


              {hindiName && (
                <p
                  className="
                    mt-0.5
                    font-serif
                    text-[11px]
                    text-[#d8bd67]
                    sm:text-[12px]
                  "
                >
                  {hindiName}
                </p>
              )}


              {dates && (
                <p
                  className="
                    mt-1.5
                    max-w-[220px]
                    text-[7px]
                    font-semibold
                    uppercase
                    tracking-[0.13em]
                    text-[#89829d]
                    sm:text-[8px]
                    sm:tracking-[0.16em]
                  "
                >
                  {dates}
                </p>
              )}

            </motion.div>

          </motion.aside>

        </div>


        {/* ==================================================
            FOOTER
            ================================================== */}

        <div
          className="
            relative
            z-10
            flex
            min-w-0
            items-center
            justify-between
            gap-3
            border-t
            border-white/[0.045]
            bg-black/[0.12]
            px-3.5
            py-2
            sm:px-6
          "
        >

          <span
            className="
              min-w-0
              truncate
              text-[6px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-[#666078]
              sm:text-[6.5px]
              sm:tracking-[0.18em]
            "
          >
            {englishName} • Daily Reading
          </span>


          <span
            className="
              flex
              shrink-0
              items-center
              gap-1.5
              text-[6px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-[#666078]
              sm:text-[6.5px]
              sm:tracking-[0.16em]
            "
          >

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#63c89b]
                shadow-[0_0_7px_rgba(99,200,155,.7)]
              "
            />

            CMS

          </span>

        </div>

      </section>


      {/* ====================================================
          FULL READING MODAL
          MOBILE SAFE
          ==================================================== */}

      <AnimatePresence>

        {detailsOpen && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-end
              justify-center
              overflow-hidden
              bg-black/75
              p-0
              backdrop-blur-md
              sm:items-center
              sm:p-4
            "
            style={{
              paddingBottom:
                "env(safe-area-inset-bottom)",
            }}
            onClick={() =>
              setDetailsOpen(false)
            }
          >

            <motion.div
              initial={{
                opacity: 0,
                y: 18,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 10,
                scale: 0.98,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="
                relative
                flex
                max-h-[92dvh]
                w-full
                flex-col
                overflow-hidden
                rounded-t-[10px]
                border
                border-[rgba(242,210,78,.14)]
                bg-[linear-gradient(145deg,rgba(22,15,42,.99),rgba(7,5,20,.995))]
                shadow-[0_30px_100px_rgba(0,0,0,.65)]
                sm:max-h-[82vh]
                sm:max-w-2xl
                sm:rounded-none
              "
            >

              {/* CLOSE */}

              <button
                type="button"
                onClick={() =>
                  setDetailsOpen(false)
                }
                aria-label="Close reading"
                className="
                  absolute
                  right-3
                  top-3
                  z-20
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/[0.08]
                  bg-white/[0.045]
                  text-[#aaa3bb]
                  transition
                  hover:border-[rgba(242,210,78,.25)]
                  hover:text-[#f2d24e]
                  sm:right-4
                  sm:top-4
                  sm:h-8
                  sm:w-8
                  sm:rounded-none
                "
              >
                <X size={15} />
              </button>


              {/* HEADER */}

              <div
                className="
                  shrink-0
                  border-b
                  border-white/[0.06]
                  px-4
                  py-5
                  pr-14
                  sm:px-7
                  sm:py-6
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <Sparkles
                    size={13}
                    className="shrink-0 text-[#f2d24e]"
                  />

                  <span
                    className="
                      text-[7px]
                      font-bold
                      uppercase
                      tracking-[0.17em]
                      text-[#e6cb73]
                      sm:text-[8px]
                      sm:tracking-[0.2em]
                    "
                  >
                    Today's Cosmic Reading
                  </span>

                </div>


                <h3
                  className="
                    mt-2
                    font-serif
                    text-[1.55rem]
                    font-semibold
                    leading-tight
                    text-[#eee5ca]
                    sm:text-2xl
                  "
                >
                  {englishName}
                </h3>


                {hindiName && (
                  <p
                    className="
                      mt-1
                      font-serif
                      text-sm
                      text-[#d8bd67]
                    "
                  >
                    {hindiName}
                  </p>
                )}

              </div>


              {/* CONTENT */}

              <div
                className="
                  min-h-0
                  flex-1
                  overflow-y-auto
                  overscroll-contain
                  px-4
                  py-5
                  [-webkit-overflow-scrolling:touch]
                  sm:px-7
                  sm:py-7
                "
              >

                <p
                  className="
                    whitespace-pre-line
                    break-words
                    text-[13px]
                    leading-[1.8]
                    text-[#d9d0b4]
                    sm:text-[14px]
                    sm:leading-[1.85]
                  "
                >
                  {description}
                </p>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </>
  );
}

