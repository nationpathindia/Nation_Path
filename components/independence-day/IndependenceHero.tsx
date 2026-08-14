"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
} from "lucide-react";

import { independenceTheme } from "./IndependenceTheme";

const chakraSpokes = Array.from({ length: 24 });

function AshokaChakra() {
  return (
    <span
      className="relative inline-flex h-4 w-4 shrink-0 items-center justify-center"
      aria-hidden="true"
    >
      <span className="absolute inset-0 rounded-full border border-white/35" />

      <span className="relative flex h-3 w-3 items-center justify-center rounded-full border border-white/70">
        <span className="absolute inset-[2px] rounded-full border border-white/55" />

        {chakraSpokes.map((_, index) => (
          <span
            key={index}
            className="absolute left-1/2 top-1/2 h-[4px] w-[0.5px] origin-bottom bg-white/70"
            style={{
              transform: `translate(-50%, -100%) rotate(${index * 15}deg)`,
            }}
          />
        ))}

        <span className="absolute h-[2px] w-[2px] rounded-full bg-white" />
      </span>
    </span>
  );
}

export default function IndependenceHero() {
  return (
    <section
      id="independence-hero"
      aria-labelledby="independence-hero-title"
      className="relative isolate min-h-[calc(100vh-80px)] overflow-hidden bg-[#07172F] text-white"
    >
      {/* =========================================================
          HERO IMAGE
      ========================================================== */}

      <div className="absolute inset-0">
        <img
          src="/images/independence-day/hero-india.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center md:object-[center_42%]"
        />

        {/* Warm paper wash */}
        <div className="absolute inset-0 bg-[#F7F1E7]/[0.06]" />

        {/* =====================================================
            TRICOLOUR ATMOSPHERE
        ====================================================== */}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,153,51,0.22) 0%, rgba(255,253,248,0.025) 42%, rgba(19,136,8,0.20) 100%)",
          }}
        />

        {/* Stronger editorial readability on left */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(5,18,36,0.82) 0%, rgba(5,18,36,0.68) 22%, rgba(5,18,36,0.40) 45%, rgba(5,18,36,0.12) 72%, rgba(5,18,36,0.02) 100%)",
          }}
        />

        {/* Soft centre wash */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 58% 48%, rgba(255,253,248,0.10) 0%, rgba(255,253,248,0.025) 30%, transparent 60%)",
          }}
        />

        {/* Bottom green / cinematic fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-80"
          style={{
            background:
              "linear-gradient(to top, rgba(5,18,36,0.82) 0%, rgba(5,18,36,0.42) 38%, transparent 100%)",
          }}
        />

        {/* Top saffron fade */}
        <div
          className="absolute inset-x-0 top-0 h-36"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,153,51,0.14), transparent)",
          }}
        />
      </div>

      {/* =========================================================
          SAFFRON ATMOSPHERE
      ========================================================== */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8 }}
        className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-[#FF9933]/[0.16] blur-[120px]"
      />

      {/* =========================================================
          GREEN ATMOSPHERE
      ========================================================== */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="pointer-events-none absolute -bottom-44 -left-44 h-[520px] w-[520px] rounded-full bg-[#138808]/[0.16] blur-[120px]"
      />

      {/* =========================================================
          CAMPAIGN GRADIENT
      ========================================================== */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          background: independenceTheme.gradients.hero,
        }}
      />

      {/* =========================================================
          TOP TRICOLOUR LINE
      ========================================================== */}

      <div
        className="absolute left-0 right-0 top-0 z-30 h-1.5"
        style={{
          background: independenceTheme.gradients.tricolor,
        }}
      />

      {/* =========================================================
          ASHOKA CHAKRA
      ========================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.72,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
        }}
        className="pointer-events-none absolute -right-36 top-1/2 hidden -translate-y-1/2 md:block lg:-right-24"
        aria-hidden="true"
      >
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 90,
            repeat: Infinity,
            ease: "linear",
          }}
          className="relative flex h-[560px] w-[560px] items-center justify-center rounded-full border-[5px] border-white/[0.16]"
        >
          {Array.from({ length: 24 }).map((_, index) => (
            <span
              key={index}
              className="absolute left-1/2 top-1/2 h-[270px] w-[1.5px] -translate-x-1/2 -translate-y-full origin-bottom bg-white/[0.15]"
              style={{
                transform: `translateX(-50%) translateY(-100%) rotate(${
                  index * 15
                }deg)`,
              }}
            />
          ))}

          <div className="h-20 w-20 rounded-full border-[3px] border-white/[0.16]" />
        </motion.div>
      </motion.div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================== */}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-5 py-24 sm:px-8 lg:px-12">
        <div className="w-full max-w-5xl">

          {/* =====================================================
              EYEBROW
          ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="flex flex-wrap items-center gap-4"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#06142C]/30 px-4 py-2 text-[10px] font-black tracking-[0.2em] text-white backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF9933] shadow-[0_0_12px_rgba(255,153,51,0.8)]" />

              {independenceTheme.campaign.eyebrow}
            </span>

            <span className="flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] text-white/70">
              <CalendarDays size={14} />

              {independenceTheme.campaign.date}
            </span>
          </motion.div>

          {/* =====================================================
              MAIN TITLE
          ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.85,
              delay: 0.1,
              ease: "easeOut",
            }}
          >
            <h1
              id="independence-hero-title"
              className="mt-8 font-black tracking-[-0.075em] drop-shadow-[0_8px_35px_rgba(0,0,0,0.28)]"
            >
              {/* INDIA */}

              <span className="block text-[clamp(4.5rem,13vw,10rem)] leading-[0.78]">
                INDIA
              </span>

              {/* =================================================
                  ANNIVERSARY LOCKUP
              ================================================== */}

              <span className="mt-5 flex items-end gap-2 sm:mt-6 sm:gap-3">

                {/* Small @ */}

                <span className="mb-5 text-[clamp(1rem,2vw,1.55rem)] font-bold leading-none tracking-[-0.03em] text-white/70 sm:mb-7">
                  @
                </span>

                {/* 80 */}

                <span
                  className="relative flex items-end select-none"
                  aria-label="80 years of independence"
                >
                  {/* 8 */}

                  <motion.span
                    initial={{
                      opacity: 0,
                      x: -10,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: 0.15,
                      duration: 0.65,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative z-10 text-[clamp(5.5rem,15vw,11rem)] font-black leading-[0.68] tracking-[-0.16em] text-[#138808]"
                    style={{
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      WebkitTextStroke:
                        "0.5px rgba(255,255,255,0.12)",
                    }}
                  >
                    8
                  </motion.span>

                  {/* 0 */}

                  <motion.span
                    initial={{
                      opacity: 0,
                      x: 10,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: 0.22,
                      duration: 0.65,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative -ml-3 text-[clamp(5.5rem,15vw,11rem)] font-black leading-[0.68] tracking-[-0.16em] text-[#FF9933]"
                    style={{
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      WebkitTextStroke:
                        "0.5px rgba(255,255,255,0.12)",
                    }}
                  >
                    0
                  </motion.span>

                  {/* Small anniversary lockup */}

                  <motion.span
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.55,
                      duration: 0.5,
                    }}
                    className="absolute -bottom-7 left-2 flex items-center gap-2 sm:-bottom-8"
                  >
                    <span className="h-px w-7 bg-[#FF9933]/80 sm:w-9" />

                    <span className="whitespace-nowrap text-[7px] font-black tracking-[0.25em] text-white/60 sm:text-[8px]">
                      1947 — 2026
                    </span>

                    <span className="h-px w-7 bg-[#138808]/80 sm:w-9" />
                  </motion.span>
                </span>
              </span>
            </h1>
          </motion.div>

          {/* =====================================================
              EDITORIAL DIVIDER
          ====================================================== */}

          <motion.div
            initial={{
              width: 0,
              opacity: 0,
            }}
            animate={{
              width: "100%",
              opacity: 1,
            }}
            transition={{
              duration: 0.9,
              delay: 0.45,
            }}
            className="mt-14 h-px max-w-2xl bg-white/25"
          />

          {/* =====================================================
              TAGLINE
          ====================================================== */}

          <motion.p
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.55,
            }}
            className="mt-7 max-w-3xl text-2xl font-semibold leading-[1.12] tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)] sm:text-3xl lg:text-4xl"
          >
            {independenceTheme.campaign.tagline}
          </motion.p>

          {/* =====================================================
              DESCRIPTION
          ====================================================== */}

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 0.75,
            }}
            className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8"
          >
            From freedom in 1947 to a nation still writing its
            next chapter — explore the people, places, ideas and
            moments that make India what it is at 80.
          </motion.p>

          {/* =====================================================
              CTA + TIMELINE
          ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.9,
            }}
            className="mt-9 flex flex-wrap items-center gap-5"
          >
            <a
              href="#india-in-one-minute"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-black text-[#163C80] shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FAF7F1]"
            >
              Begin the journey

              <ArrowDown
                size={17}
                className="transition-transform duration-300 group-hover:translate-y-1"
              />
            </a>

            <div className="flex items-center gap-3 text-xs font-bold tracking-[0.12em] text-white/60">
              <span>1947</span>

              <span className="h-px w-8 bg-white/30" />

              <span>2026</span>

              <ArrowRight
                size={14}
                className="text-[#FF9933]"
              />
            </div>
          </motion.div>

          {/* =====================================================
              NATIONPATH SIGNATURE
          ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1.15,
            }}
            className="mt-14 flex items-center gap-3"
          >
            <span
              className="h-1 w-12 rounded-full"
              style={{
                background: independenceTheme.gradients.tricolor,
              }}
            />

            <span className="text-[9px] font-black tracking-[0.24em] text-white/45">
              A NATIONPATH INDIA SPECIAL
            </span>
          </motion.div>
        </div>
      </div>

      {/* =========================================================
          SCROLL INDICATOR
      ========================================================== */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.3,
        }}
        className="absolute bottom-8 right-6 z-20 hidden items-center gap-3 text-[9px] font-black tracking-[0.22em] text-white/40 sm:flex lg:right-12"
      >
        SCROLL TO EXPLORE

        <span className="h-8 w-px bg-white/20" />

        <ArrowDown size={13} />
      </motion.div>

      {/* =========================================================
          IMAGE CREDIT
      ========================================================== */}

      <div className="absolute bottom-7 left-5 z-20 sm:left-8 lg:left-12">
        <p className="text-[8px] font-medium tracking-[0.04em] text-white/40">
          Photo: Government of India / PIB
        </p>
      </div>

      {/* =========================================================
          BOTTOM TRICOLOUR
      ========================================================== */}

      <div className="absolute bottom-0 left-0 right-0 z-30 grid h-1 grid-cols-3">
        <div className="bg-[#FF9933]" />
        <div className="bg-white" />
        <div className="bg-[#138808]" />
      </div>
    </section>
  );
}