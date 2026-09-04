"use client";

/*
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// PREMIUM HOROSCOPE
// PLANETARY INTELLIGENCE — COSMIC OBSERVATORY
//
// CMS ONLY
// NO ENGINE
// NO CALCULATION
// NO AI
//
// LOCKED:
//
// • Reads planetary content from CMS only
// • No planetary calculation
// • No strength calculation
// • No generated interpretation
// • Missing CMS fields remain hidden
//
// EXPERIENCE:
//
// • Two planets visible at once
// • Auto rotation every 15 seconds
// • Manual next button
// • 3D planetary transition
// • Living cosmic atmosphere
// • Subtle orbital motion
// • Premium midnight-indigo palette
//////////////////////////////////////////////////////////////
*/

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  ArrowRight,
  ArrowUpRight,
  Orbit,
  Sparkles,
} from "lucide-react";

import type {
  CmsHoroscopePlanet,
} from "./types";

//////////////////////////////////////////////////////////////
// PROPS
//////////////////////////////////////////////////////////////

interface Props {
  planets?: CmsHoroscopePlanet[];
}

//////////////////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////////////////

const CARDS_PER_VIEW = 2;
const ROTATION_INTERVAL = 15000;

//////////////////////////////////////////////////////////////
// COMPONENT
//////////////////////////////////////////////////////////////

export default function HoroscopePlanetary({
  planets = [],
}: Props) {
  ////////////////////////////////////////////////////////////
  // EMPTY
  ////////////////////////////////////////////////////////////

  if (!planets.length) {
    return null;
  }

  ////////////////////////////////////////////////////////////
  // NORMALIZED PLANETS
  ////////////////////////////////////////////////////////////

  const normalizedPlanets = useMemo(
    () =>
      planets.map((planet, index) => ({
        planet,
        index,
      })),
    [planets],
  );

  ////////////////////////////////////////////////////////////
  // CREATE PAIRS
  ////////////////////////////////////////////////////////////

  const groups = useMemo(() => {
    const result: {
      planet: CmsHoroscopePlanet;
      index: number;
    }[][] = [];

    for (
      let i = 0;
      i < normalizedPlanets.length;
      i += CARDS_PER_VIEW
    ) {
      result.push(
        normalizedPlanets.slice(
          i,
          i + CARDS_PER_VIEW,
        ),
      );
    }

    return result;
  }, [normalizedPlanets]);

  ////////////////////////////////////////////////////////////
  // ACTIVE GROUP
  ////////////////////////////////////////////////////////////

  const [activeGroup, setActiveGroup] = useState(0);

  ////////////////////////////////////////////////////////////
  // MANUAL / AUTO FLIP KEY
  ////////////////////////////////////////////////////////////

  const [flipKey, setFlipKey] = useState(0);

  ////////////////////////////////////////////////////////////
  // HOVER PAUSE
  ////////////////////////////////////////////////////////////

  const [isPaused, setIsPaused] = useState(false);

  ////////////////////////////////////////////////////////////
  // RESET IF CMS CHANGES
  ////////////////////////////////////////////////////////////

  useEffect(() => {
    setActiveGroup(0);
    setFlipKey(0);
  }, [groups.length]);

  ////////////////////////////////////////////////////////////
  // NEXT
  ////////////////////////////////////////////////////////////

  const goNext = () => {
    setActiveGroup(
      (current) =>
        (current + 1) % groups.length,
    );

    setFlipKey(
      (current) => current + 1,
    );
  };

  ////////////////////////////////////////////////////////////
  // AUTO ROTATION
  ////////////////////////////////////////////////////////////

  useEffect(() => {
    if (
      groups.length <= 1 ||
      isPaused
    ) {
      return;
    }

    const timer =
      window.setInterval(
        goNext,
        ROTATION_INTERVAL,
      );

    return () => {
      window.clearInterval(timer);
    };
  }, [
    groups.length,
    isPaused,
  ]);

  ////////////////////////////////////////////////////////////
  // CURRENT GROUP
  ////////////////////////////////////////////////////////////

  const currentGroup =
    groups[activeGroup] ?? groups[0];

  ////////////////////////////////////////////////////////////
  // RANGE
  ////////////////////////////////////////////////////////////

  const currentStart =
    activeGroup * CARDS_PER_VIEW + 1;

  const currentEnd = Math.min(
    currentStart +
      currentGroup.length -
      1,
    normalizedPlanets.length,
  );

  ////////////////////////////////////////////////////////////
  // RENDER
  ////////////////////////////////////////////////////////////

  return (
    <section
      data-section="planetary-intelligence"
      aria-labelledby="planetary-intelligence-title"
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
          rounded-[28px]
          border
          border-[#7562C7]/25
          bg-[#06051D]
          shadow-[0_30px_95px_rgba(4,2,30,.38)]
          sm:rounded-[32px]
        "
      >
        {/* ================================================== */}
        {/* COSMIC BACKGROUND */}
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
          {/* Indigo atmosphere */}

          <div
            className="
              absolute
              -left-36
              -top-36
              h-[420px]
              w-[420px]
              rounded-full
              bg-[#25206D]/35
              blur-[125px]
            "
          />

          {/* Violet atmosphere */}

          <div
            className="
              absolute
              -right-36
              top-[5%]
              h-[380px]
              w-[380px]
              rounded-full
              bg-[#861C87]/20
              blur-[125px]
            "
          />

          {/* Gold solar haze */}

          <div
            className="
              absolute
              left-[38%]
              top-[30%]
              h-[300px]
              w-[300px]
              rounded-full
              bg-[#D4AF37]/[0.045]
              blur-[115px]
            "
          />

          {/* Cyan atmospheric hint */}

          <div
            className="
              absolute
              right-[25%]
              bottom-[-120px]
              h-[240px]
              w-[240px]
              rounded-full
              bg-[#3D9DB4]/[0.035]
              blur-[100px]
            "
          />

          {/* Star field */}

          <div
            className="
              absolute
              inset-0
              opacity-[0.035]
              [background-image:radial-gradient(rgba(255,255,255,.95)_1px,transparent_1px)]
              [background-size:34px_34px]
            "
          />

          {/* Fine gold horizon */}

          <div
            className="
              absolute
              left-8
              right-8
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-[#E5C64E]/75
              to-transparent
            "
          />

          {/* Living stars */}

          <motion.span
            animate={{
              opacity: [0.25, 0.7, 0.25],
              scale: [0.8, 1.25, 0.8],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              left-[11%]
              top-[23%]
              h-1
              w-1
              rounded-full
              bg-[#E8CC59]
              shadow-[0_0_14px_#E8CC59]
            "
          />

          <motion.span
            animate={{
              opacity: [0.2, 0.65, 0.2],
              scale: [1, 1.35, 1],
            }}
            transition={{
              duration: 4.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="
              absolute
              right-[14%]
              top-[20%]
              h-1.5
              w-1.5
              rounded-full
              bg-[#C56FC0]
              shadow-[0_0_15px_#C56FC0]
            "
          />

          <motion.span
            animate={{
              opacity: [0.15, 0.5, 0.15],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="
              absolute
              bottom-[17%]
              left-[46%]
              h-1
              w-1
              rounded-full
              bg-[#66B7C6]
              shadow-[0_0_10px_#66B7C6]
            "
          />
        </div>

        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

        <header
          className="
            relative
            z-10
            px-5
            pb-5
            pt-6
            sm:px-7
            sm:pb-6
            sm:pt-7
            lg:px-8
          "
        >
          <div
            className="
              flex
              items-center
              gap-2.5
            "
          >
            {/* Observatory icon */}

            <motion.div
              animate={{
                rotate: [0, 8, -8, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
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
                border-[#D4AF37]/25
                bg-[#D4AF37]/[0.055]
                text-[#E1C65A]
                shadow-[0_0_25px_rgba(212,175,55,.06)]
              "
            >
              <Orbit
                size={17}
                strokeWidth={1.55}
              />

              <span
                className="
                  absolute
                  right-[4px]
                  top-[4px]
                  h-1
                  w-1
                  rounded-full
                  bg-[#D4AF37]
                  shadow-[0_0_8px_#D4AF37]
                "
              />
            </motion.div>

            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-[#D8BD55]
                sm:text-[10px]
                sm:tracking-[0.34em]
              "
            >
              Cosmic Intelligence
            </p>
          </div>

          <div
            className="
              mt-3
              flex
              items-end
              justify-between
              gap-5
            "
          >
            <div className="min-w-0">
              <h2
                id="planetary-intelligence-title"
                className="
                  font-serif
                  text-[1.45rem]
                  font-semibold
                  leading-tight
                  tracking-[-0.025em]
                  text-[#F1E8C9]
                  sm:text-[1.65rem]
                  md:text-[1.8rem]
                "
              >
                Planetary Influence
              </h2>

              <p
                className="
                  mt-1.5
                  max-w-2xl
                  text-[12px]
                  leading-5
                  text-[#AAA4BC]
                  sm:text-[13px]
                "
              >
                Today's planetary themes and their
                influence as curated by the horoscope CMS.
              </p>
            </div>

            {/* Observatory status */}

            <div
              className="
                hidden
                shrink-0
                items-center
                gap-2
                rounded-full
                border
                border-white/[0.07]
                bg-white/[0.025]
                px-3
                py-1.5
                sm:flex
              "
            >
              <motion.span
                animate={{
                  opacity: [0.35, 1, 0.35],
                  scale: [0.8, 1.15, 0.8],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#D4AF37]
                  shadow-[0_0_9px_#D4AF37]
                "
              />

              <span
                className="
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#777088]
                "
              >
                Observatory
              </span>
            </div>
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
            via-[#7562C7]/30
            to-transparent
            sm:mx-7
            lg:mx-8
          "
        />

        {/* ================================================== */}
        {/* PLANETARY STAGE */}
        {/* ================================================== */}

        <div
          className="
            relative
            z-10
            px-5
            pb-5
            pt-5
            sm:px-7
            sm:pb-6
            sm:pt-6
            lg:px-8
          "
          onMouseEnter={() =>
            setIsPaused(true)
          }
          onMouseLeave={() =>
            setIsPaused(false)
          }
        >
          {/* ================================================== */}
          {/* ORBITAL GUIDE */}
          {/* ================================================== */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-[8%]
              right-[8%]
              top-[2px]
              hidden
              h-8
              overflow-hidden
              sm:block
            "
          >
            <motion.div
              animate={{
                x: ["-4%", "104%"],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                top-3
                h-px
                w-20
                bg-gradient-to-r
                from-transparent
                via-[#B89BE8]/30
                to-transparent
              "
            />
          </div>

          {/* ================================================== */}
          {/* 3D FLIP */}
          {/* ================================================== */}

          <div
            className="
              relative
              [perspective:1500px]
            "
          >
            <motion.div
              key={flipKey}
              initial={{
                opacity: 0,
                rotateY: -88,
                scale: 0.985,
              }}
              animate={{
                opacity: 1,
                rotateY: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.82,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                transformStyle:
                  "preserve-3d",
              }}
              className="
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-2
                sm:gap-4
              "
            >
              {currentGroup.map(
                ({ planet, index }) => (
                  <PlanetCard
                    key={`${getPlanetKey(
                      planet,
                    )}-${index}-${flipKey}`}
                    planet={planet}
                    index={index}
                  />
                ),
              )}

              {currentGroup.length === 1 && (
                <div
                  aria-hidden="true"
                  className="
                    hidden
                    sm:block
                  "
                />
              )}
            </motion.div>
          </div>

          {/* ================================================== */}
          {/* NAVIGATION */}
          {/* ================================================== */}

          <div
            className="
              mt-4
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
              <Sparkles
                size={11}
                strokeWidth={1.5}
                className="shrink-0 text-[#A991DB]"
              />

              <span
                className="
                  truncate
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#69627E]
                "
              >
                Planetary Observatory
              </span>
            </div>

            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              {/* Range */}

              <span
                className="
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-[#625B76]
                "
              >
                {String(
                  currentStart,
                ).padStart(2, "0")}
                {" — "}
                {String(
                  currentEnd,
                ).padStart(2, "0")}
                {" / "}
                {String(
                  normalizedPlanets.length,
                ).padStart(2, "0")}
              </span>

              {/* Dots */}

              <div
                className="
                  hidden
                  items-center
                  gap-1
                  sm:flex
                "
              >
                {groups.map(
                  (_, index) => (
                    <span
                      key={index}
                      className={`
                        h-1
                        rounded-full
                        transition-all
                        duration-500
                        ${
                          index ===
                          activeGroup
                            ? "w-4 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,.45)]"
                            : "w-1 bg-[#4D4762]"
                        }
                      `}
                    />
                  ),
                )}
              </div>

              {/* ================================================== */}
              {/* MANUAL NEXT BUTTON */}
              {/* ================================================== */}

              {groups.length > 1 && (
                <motion.button
                  type="button"
                  onClick={goNext}
                  whileHover={{
                    scale: 1.06,
                  }}
                  whileTap={{
                    scale: 0.92,
                  }}
                  aria-label="Show next planetary influences"
                  className="
                    group/next
                    relative
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    border
                    border-[#D4AF37]/25
                    bg-[#D4AF37]/[0.055]
                    text-[#D9BD55]
                    shadow-[0_0_20px_rgba(212,175,55,.05)]
                    transition-all
                    duration-300
                    hover:border-[#D4AF37]/50
                    hover:bg-[#D4AF37]/[0.10]
                    hover:text-[#F0D56B]
                  "
                >
                  <ArrowRight
                    size={14}
                    strokeWidth={1.7}
                    className="
                      transition-transform
                      duration-300
                      group-hover/next:translate-x-0.5
                    "
                  />

                  {/* Progress sweep */}

                  <motion.span
                    key={activeGroup}
                    initial={{
                      scaleX: 0,
                    }}
                    animate={{
                      scaleX: 1,
                    }}
                    transition={{
                      duration: 15,
                      ease: "linear",
                    }}
                    className="
                      absolute
                      bottom-0
                      left-1
                      right-1
                      h-px
                      origin-left
                      bg-[#D4AF37]/45
                    "
                  />
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* ================================================== */}
        {/* FOOTER */}
        {/* ================================================== */}

        <div
          className="
            relative
            z-10
            flex
            items-center
            justify-between
            gap-4
            border-t
            border-white/[0.055]
            px-5
            py-3.5
            sm:px-7
            lg:px-8
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#D4AF37]
                shadow-[0_0_9px_rgba(212,175,55,.55)]
              "
            />

            <span
              className="
                text-[7px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#625C73]
              "
            >
              NationPath Astro
            </span>
          </div>

          <div
            className="
              flex
              items-center
              gap-1.5
              text-[7px]
              font-bold
              uppercase
              tracking-[0.17em]
              text-[#625C73]
            "
          >
            CMS Planetary Guidance
          </div>
        </div>
      </div>
    </section>
  );
}

//////////////////////////////////////////////////////////////
// PLANET CARD
//////////////////////////////////////////////////////////////

interface PlanetCardProps {
  planet: CmsHoroscopePlanet;
  index: number;
}

function PlanetCard({
  planet,
  index,
}: PlanetCardProps) {
  ////////////////////////////////////////////////////////////
  // CMS VALUES
  ////////////////////////////////////////////////////////////

  const name =
    typeof planet.name === "string" &&
    planet.name.trim()
      ? planet.name.trim()
      : typeof planet.planetKey ===
          "string" &&
        planet.planetKey.trim()
      ? planet.planetKey.trim()
      : "Planet";

  const planetKey =
    typeof planet.planetKey ===
    "string"
      ? planet.planetKey.trim()
      : "";

  const strength =
    typeof planet.strength ===
    "string"
      ? planet.strength.trim()
      : "";

  const title =
    typeof planet.title ===
    "string"
      ? planet.title.trim()
      : "";

  const message =
    typeof planet.message ===
    "string"
      ? planet.message.trim()
      : "";

  const energyLevel =
    typeof planet.energyLevel ===
    "string"
      ? planet.energyLevel.trim()
      : "";

  const icon =
    typeof planet.icon ===
    "string"
      ? planet.icon.trim()
      : "";

  ////////////////////////////////////////////////////////////
  // RENDER
  ////////////////////////////////////////////////////////////

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        delay: index * 0.07,
      }}
      whileHover={{
        y: -4,
      }}
      className="
        group/card
        relative
        min-h-[208px]
        overflow-hidden
        rounded-[19px]
        border
        border-[#7762C8]/20
        bg-gradient-to-br
        from-[#171341]/96
        via-[#0C092A]/98
        to-[#110B32]/96
        p-5
        shadow-[0_17px_45px_rgba(0,0,0,.22)]
        transition-all
        duration-300
        hover:border-[#D4AF37]/30
        hover:shadow-[0_24px_58px_rgba(0,0,0,.30)]
        sm:min-h-[218px]
        sm:p-5.5
      "
    >
      {/* ================================================== */}
      {/* LIVING PLANET GLOW */}
      {/* ================================================== */}

      <motion.div
        aria-hidden="true"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.55, 0.85, 0.55],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.7,
        }}
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-40
          w-40
          rounded-full
          bg-[#76258F]/[0.12]
          blur-[55px]
        "
      />

      {/* Gold planetary haze */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-16
          -left-12
          h-28
          w-28
          rounded-full
          bg-[#D4AF37]/[0.035]
          blur-[45px]
        "
      />

      {/* ================================================== */}
      {/* SUBTLE ORBIT */}
      {/* ================================================== */}

      <motion.div
        aria-hidden="true"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          pointer-events-none
          absolute
          -right-9
          -top-7
          h-24
          w-24
          rounded-full
          border
          border-[#9C83D5]/[0.09]
          rotate-[22deg]
        "
      />

      <motion.span
        aria-hidden="true"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          pointer-events-none
          absolute
          right-[7px]
          top-[5px]
          h-1.5
          w-1.5
          rounded-full
          bg-[#D4AF37]/70
          shadow-[0_0_8px_#D4AF37]
        "
      />

      {/* ================================================== */}
      {/* TOP SIGNAL */}
      {/* ================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-5
          right-5
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#D4AF37]/45
          to-transparent
        "
      />

      {/* ================================================== */}
      {/* HEADER */}
      {/* ================================================== */}

      <div
        className="
          relative
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
            gap-3
          "
        >
          {/* Planet symbol */}

          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 rgba(212,175,55,0)",
                "0 0 22px rgba(212,175,55,.10)",
                "0 0 0 rgba(212,175,55,0)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              relative
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-[#D4AF37]/25
              bg-[#D4AF37]/[0.055]
              text-[18px]
              text-[#E1C65A]
              transition-all
              duration-300
              group-hover/card:border-[#D4AF37]/45
              group-hover/card:bg-[#D4AF37]/[0.09]
            "
          >
            {icon || "✦"}

            <span
              className="
                absolute
                right-[3px]
                top-[4px]
                h-1
                w-1
                rounded-full
                bg-[#B67BD2]
                shadow-[0_0_8px_#B67BD2]
              "
            />
          </motion.div>

          <div className="min-w-0">
            {planetKey && (
              <p
                className="
                  truncate
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-[#9C86D2]
                  sm:text-[9px]
                "
              >
                {planetKey}
              </p>
            )}

            <h3
              className="
                mt-0.5
                truncate
                font-serif
                text-[18px]
                font-semibold
                tracking-[-0.015em]
                text-[#EFE7C8]
                sm:text-[19px]
              "
            >
              {name}
            </h3>
          </div>
        </div>

        {/* Strength */}

        {strength && (
          <span
            className="
              shrink-0
              rounded-full
              border
              border-[#D4AF37]/20
              bg-[#D4AF37]/[0.055]
              px-2.5
              py-1
              text-[7px]
              font-bold
              uppercase
              tracking-[0.1em]
              text-[#D9BD56]
              sm:text-[8px]
            "
          >
            {strength}
          </span>
        )}
      </div>

      {/* ================================================== */}
      {/* CONTENT */}
      {/* ================================================== */}

      {(title || message) && (
        <div className="relative mt-5">
          {title && (
            <h4
              className="
                text-[14px]
                font-semibold
                leading-6
                text-[#E4DBC0]
                sm:text-[15px]
              "
            >
              {title}
            </h4>
          )}

          {message && (
            <p
              className="
                mt-1.5
                line-clamp-3
                text-[12px]
                leading-[1.72]
                text-[#AAA3B9]
                sm:text-[13px]
              "
            >
              {message}
            </p>
          )}
        </div>
      )}

      {/* Empty */}

      {!title && !message && (
        <div
          className="
            relative
            mt-5
            flex
            items-center
            gap-2
          "
        >
          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-[#D4AF37]/45
            "
          />

          <span
            className="
              text-[8px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-[#686178]
            "
          >
            Guidance unavailable
          </span>
        </div>
      )}

      {/* ================================================== */}
      {/* ENERGY */}
      {/* ================================================== */}

      {energyLevel && (
        <div
          className="
            relative
            mt-4
            flex
            items-center
            justify-between
            gap-3
            border-t
            border-white/[0.06]
            pt-3
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <motion.span
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#69AEBB]
                shadow-[0_0_8px_#69AEBB]
              "
            />

            <span
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#746D84]
                sm:text-[9px]
              "
            >
              Energy
            </span>
          </div>

          <span
            className="
              flex
              items-center
              gap-1
              text-[9px]
              font-semibold
              text-[#D7B94F]
              sm:text-[10px]
            "
          >
            {energyLevel}

            <ArrowUpRight
              size={11}
              strokeWidth={1.7}
            />
          </span>
        </div>
      )}

      {/* ================================================== */}
      {/* INDEX */}
      {/* ================================================== */}

      <span
        aria-hidden="true"
        className="
          absolute
          bottom-3
          right-5
          text-[7px]
          font-bold
          tracking-[0.16em]
          text-[#74639C]/45
        "
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* ================================================== */}
      {/* BOTTOM SIGNAL */}
      {/* ================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-5
          right-5
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#D4AF37]/22
          to-transparent
        "
      />
    </motion.article>
  );
}

//////////////////////////////////////////////////////////////
// SAFE PLANET KEY
//////////////////////////////////////////////////////////////

function getPlanetKey(
  planet: CmsHoroscopePlanet,
) {
  if (
    typeof planet.planetKey ===
      "string" &&
    planet.planetKey.trim()
  ) {
    return planet.planetKey.trim();
  }

  if (
    typeof planet.name === "string" &&
    planet.name.trim()
  ) {
    return planet.name.trim();
  }

  return "planet";
}