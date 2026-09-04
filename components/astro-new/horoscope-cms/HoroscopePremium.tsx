"use client";

/*
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// LIFE INTELLIGENCE
//
// FINAL LOCKED UI
//
// STATIC READY-MADE PROMO
// NO CMS
// NO ENGINE
// NO CALCULATION
// NO AI
//
// DESIGN:
// • Premium Cosmic / Vedic
// • Compact intelligence banner
// • Mini astro-data graphic
// • Floating insight nodes
// • Gold + violet cosmic palette
// • Mobile friendly
// • CTA → /register
//////////////////////////////////////////////////////////////
*/

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Sparkles,
  Stars,
  Orbit,
  LockKeyhole,
} from "lucide-react";

export default function LifeIntelligence() {
  const insights = [
    "Life Patterns",
    "Career Energy",
    "Relationship",
    "Personal Growth",
  ];

  return (
    <section
      data-section="life-intelligence"
      className="px-3 md:px-6"
    >
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
          amount: 0.1,
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative
          isolate
          overflow-hidden
          rounded-[22px]
          border
          border-[#9b7bd4]/20
          bg-[#09072a]
          shadow-[0_22px_60px_rgba(0,0,0,.24)]
          sm:rounded-[26px]
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
          {/* Violet nebula */}

          <motion.div
            animate={{
              x: ["-3%", "4%", "-3%"],
              y: ["0%", "3%", "0%"],
              opacity: [0.08, 0.14, 0.08],
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
              bg-[#7137a8]
              blur-[100px]
            "
          />

          {/* Magenta nebula */}

          <motion.div
            animate={{
              x: ["3%", "-4%", "3%"],
              opacity: [0.06, 0.12, 0.06],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              -right-24
              -bottom-28
              h-60
              w-60
              rounded-full
              bg-[#9b2f83]
              blur-[100px]
            "
          />

          {/* Center gold intelligence glow */}

          <div
            className="
              absolute
              left-[38%]
              top-1/2
              h-40
              w-40
              -translate-y-1/2
              rounded-full
              bg-[#d4af37]/[0.035]
              blur-[75px]
            "
          />

          {/* Micro star field */}

          <div
            className="
              absolute
              inset-0
              opacity-[0.022]
              [background-image:radial-gradient(rgba(255,255,255,.9)_1px,transparent_1px)]
              [background-size:30px_30px]
            "
          />

          {/* Moving signal */}

          <motion.div
            animate={{
              x: ["-120%", "520%"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              left-0
              top-0
              h-px
              w-1/4
              bg-gradient-to-r
              from-transparent
              via-[#d9bd55]
              to-transparent
              opacity-60
            "
          />

          {/* Tiny stars */}

          <span
            className="
              absolute
              left-[9%]
              top-[27%]
              h-1
              w-1
              rounded-full
              bg-[#dfc55c]
              shadow-[0_0_9px_#dfc55c]
              opacity-50
            "
          />

          <span
            className="
              absolute
              right-[26%]
              top-[18%]
              h-[3px]
              w-[3px]
              rounded-full
              bg-[#c47bd8]
              shadow-[0_0_8px_#c47bd8]
              opacity-55
            "
          />

          <span
            className="
              absolute
              right-[12%]
              bottom-[25%]
              h-1
              w-1
              rounded-full
              bg-[#d4af37]
              shadow-[0_0_8px_#d4af37]
              opacity-40
            "
          />
        </div>

        {/* ================================================== */}
        {/* MAIN CONTENT */}
        {/* ================================================== */}

        <div
          className="
            relative
            z-10
            flex
            flex-col
            gap-5
            p-4
            sm:p-5
            md:flex-row
            md:items-center
            md:gap-6
            md:p-6
          "
        >
          {/* ================================================== */}
          {/* MINI INTELLIGENCE GRAPHIC */}
          {/* ================================================== */}

          <div
            className="
              relative
              flex
              shrink-0
              items-center
              justify-center
              md:w-[150px]
            "
          >
            <div
              className="
                relative
                h-[112px]
                w-[112px]
                sm:h-[124px]
                sm:w-[124px]
              "
            >
              {/* Outer intelligence frame */}

              <div
                className="
                  absolute
                  inset-[8px]
                  rotate-45
                  rounded-[13px]
                  border
                  border-[#d4af37]/20
                  bg-[#0c092e]/65
                "
              />

              {/* Inner frame */}

              <div
                className="
                  absolute
                  inset-[20px]
                  rotate-45
                  border
                  border-[#9b7bd4]/20
                "
              />

              {/* ================================================== */}
              {/* ABSTRACT LIFE MAP */}
              {/* ================================================== */}

              <svg
                viewBox="0 0 120 120"
                className="
                  absolute
                  inset-[12px]
                  h-[calc(100%-24px)]
                  w-[calc(100%-24px)]
                "
                aria-hidden="true"
              >
                {/* structural lines */}

                <path
                  d="
                    M60 8
                    L92 28
                    L110 60
                    L92 92
                    L60 112
                    L28 92
                    L10 60
                    L28 28
                    Z
                  "
                  fill="none"
                  stroke="rgba(155,123,212,.25)"
                  strokeWidth="1"
                />

                <path
                  d="
                    M60 8
                    L60 112
                    M10 60
                    L110 60
                    M28 28
                    L92 92
                    M92 28
                    L28 92
                  "
                  fill="none"
                  stroke="rgba(212,175,55,.19)"
                  strokeWidth="1"
                />

                {/* life path */}

                <motion.path
                  d="
                    M18 78
                    C32 55, 37 82, 51 58
                    C63 38, 67 70, 79 48
                    C87 35, 96 45, 103 30
                  "
                  fill="none"
                  stroke="rgba(212,175,55,.55)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeDasharray="4 4"
                  animate={{
                    strokeDashoffset: [0, -24],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* insight nodes */}

                {[
                  [18, 78],
                  [51, 58],
                  [79, 48],
                  [103, 30],
                  [60, 60],
                ].map(([cx, cy], index) => (
                  <motion.circle
                    key={`${cx}-${cy}`}
                    cx={cx}
                    cy={cy}
                    r={index === 4 ? 3 : 2}
                    fill={
                      index === 4
                        ? "#d4af37"
                        : "#9b7bd4"
                    }
                    animate={{
                      opacity: [0.35, 1, 0.35],
                      r:
                        index === 4
                          ? [2.5, 3.5, 2.5]
                          : [1.5, 2.5, 1.5],
                    }}
                    transition={{
                      duration:
                        2.5 + index * 0.35,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  />
                ))}
              </svg>

              {/* Center intelligence seal */}

              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 18px rgba(212,175,55,.04)",
                    "0 0 28px rgba(212,175,55,.12)",
                    "0 0 18px rgba(212,175,55,.04)",
                  ],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  left-1/2
                  top-1/2
                  flex
                  h-10
                  w-10
                  -translate-x-1/2
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#d4af37]/30
                  bg-[#09072a]
                "
              >
                <Brain
                  size={15}
                  strokeWidth={1.5}
                  className="text-[#dfc45b]"
                />
              </motion.div>

              <span
                className="
                  absolute
                  -bottom-5
                  left-1/2
                  -translate-x-1/2
                  whitespace-nowrap
                  text-[6px]
                  font-bold
                  uppercase
                  tracking-[0.24em]
                  text-[#716a84]
                "
              >
                Life Intelligence
              </span>
            </div>
          </div>

          {/* ================================================== */}
          {/* TEXT CONTENT */}
          {/* ================================================== */}

          <div className="min-w-0 flex-1">
            {/* Eyebrow */}

            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <Sparkles
                size={11}
                className="text-[#d8bd55]"
              />

              <span
                className="
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.28em]
                  text-[#d8bd55]
                "
              >
                Life Intelligence
              </span>

              <span
                className="
                  h-px
                  w-8
                  bg-gradient-to-r
                  from-[#d4af37]/50
                  to-transparent
                "
              />
            </div>

            {/* Title */}

            <h2
              className="
                mt-2
                font-serif
                text-[19px]
                font-semibold
                leading-tight
                tracking-[-0.025em]
                text-[#eee5ca]
                sm:text-[21px]
              "
            >
              Understand the Patterns
              Behind Your Life
            </h2>

            {/* Description */}

            <p
              className="
                mt-1.5
                max-w-xl
                text-[11px]
                leading-[1.65]
                text-[#aaa3bb]
                sm:text-[12px]
              "
            >
              Explore deeper dimensions of your
              journey through a premium cosmic
              intelligence experience.
            </p>

            {/* ================================================== */}
            {/* INSIGHT CONSTELLATION */}
            {/* ================================================== */}

            <div
              className="
                mt-3
                flex
                flex-wrap
                gap-1.5
              "
            >
              {insights.map((item, index) => (
                <motion.span
                  key={item}
                  initial={{
                    opacity: 0,
                    y: 4,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                  }}
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-white/[0.065]
                    bg-white/[0.025]
                    px-2.5
                    py-1.5
                    text-[8px]
                    font-medium
                    text-[#c7c0d0]
                  "
                >
                  <span
                    className="
                      h-1
                      w-1
                      rounded-full
                      bg-[#d4af37]
                      shadow-[0_0_5px_rgba(212,175,55,.5)]
                    "
                  />

                  {item}
                </motion.span>
              ))}
            </div>
          </div>

          {/* ================================================== */}
          {/* CTA */}
          {/* ================================================== */}

          <div
            className="
              flex
              shrink-0
              items-center
              md:pl-1
            "
          >
            <Link href="/register">
              <motion.span
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                  group
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  border
                  border-[#d4af37]/40
                  bg-[#d4af37]
                  px-4
                  py-2.5
                  text-[9px]
                  font-bold
                  text-[#09072a]
                  shadow-[0_10px_28px_rgba(212,175,55,.15)]
                  transition-all
                  duration-300
                  hover:bg-[#e4c65b]
                  sm:w-auto
                "
              >
                <LockKeyhole
                  size={11}
                  strokeWidth={2}
                />

                Explore Free

                <ArrowRight
                  size={12}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                  "
                />
              </motion.span>
            </Link>
          </div>
        </div>

        {/* ================================================== */}
        {/* BOTTOM SIGNAL */}
        {/* ================================================== */}

        <div
          aria-hidden="true"
          className="
            absolute
            bottom-0
            left-1/2
            h-px
            w-[34%]
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-[#d4af37]
            to-transparent
            opacity-30
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            bottom-2
            right-4
            opacity-15
          "
        >
          <Stars
            size={12}
            className="text-[#d4af37]"
          />
        </div>
      </motion.div>
    </section>
  );
}

