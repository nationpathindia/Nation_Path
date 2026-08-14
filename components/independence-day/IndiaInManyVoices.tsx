"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  MessageCircle,
  Pause,
  Play,
  Quote,
  Waves,
} from "lucide-react";
import { useEffect, useState } from "react";

import { independenceTheme } from "./IndependenceTheme";

type VoiceTheme = {
  number: string;
  label: string;
  title: string;
  description: string;
  image: string;
};

const voices: VoiceTheme[] = [
  {
    number: "01",
    label: "BELONGING",
    title: "What does India mean to you?",
    description:
      "For some, it is a place. For others, a language, a memory, a family, a landscape or a feeling that is difficult to put into words.",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1800&q=82",
  },
  {
    number: "02",
    label: "MEMORY",
    title: "What do we carry forward?",
    description:
      "Every generation inherits stories, traditions and experiences — and decides which ones will travel into the future.",
    image:
      "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1800&q=82",
  },
  {
    number: "03",
    label: "HOPE",
    title: "What do we want India to become?",
    description:
      "A nation's future is also a collection of hopes: better opportunities, stronger communities and possibilities yet to be imagined.",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=82",
  },
];

const AUTO_PLAY_DURATION = 9000;

export default function IndiaInManyVoices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progressKey, setProgressKey] = useState(0);

  const activeVoice = voices[activeIndex];

  const nextVoice = () => {
    setExpanded(false);

    setActiveIndex((current) => (current + 1) % voices.length);

    setProgressKey((current) => current + 1);
  };

  const selectVoice = (index: number) => {
    setExpanded(false);
    setActiveIndex(index);
    setProgressKey((current) => current + 1);
  };

  const toggleExpanded = () => {
    setExpanded((current) => !current);
  };

  const toggleAutoplay = () => {
    setIsAutoPlaying((current) => !current);
    setProgressKey((current) => current + 1);
  };

  /*
   * ------------------------------------------------------------
   * AUTOPLAY
   * ------------------------------------------------------------
   *
   * Autoplay is intentionally controlled only by the AUTO / PLAY
   * button. Section hover does not pause the carousel.
   */
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = window.setInterval(() => {
      setExpanded(false);

      setActiveIndex((current) => (current + 1) % voices.length);

      setProgressKey((current) => current + 1);
    }, AUTO_PLAY_DURATION);

    return () => window.clearInterval(timer);
  }, [isAutoPlaying]);

  return (
    <section className="relative overflow-hidden bg-[#F5EEDF] py-16 sm:py-20 lg:py-24">
      {/* =========================================================
          ATMOSPHERE
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Warm cream light */}
        <div className="absolute -left-[18%] top-[5%] h-[520px] w-[520px] rounded-full bg-[#FF9933]/[0.065] blur-[120px]" />

        <div className="absolute -right-[15%] bottom-[5%] h-[560px] w-[560px] rounded-full bg-[#138808]/[0.05] blur-[130px]" />

        <div className="absolute left-[42%] top-[30%] h-[400px] w-[400px] rounded-full bg-[#163C80]/[0.025] blur-[120px]" />

        {/* Paper grain */}
        <div
          className="absolute inset-0 opacity-[0.13] mix-blend-multiply"
          style={{
            backgroundImage:
              "radial-gradient(rgba(22,60,128,0.38) 0.45px, transparent 0.45px)",
            backgroundSize: "6px 6px",
          }}
        />

        {/* Faded India image */}
        <div
          className="absolute right-[-12%] top-[3%] h-[680px] w-[680px] rounded-full bg-cover bg-center grayscale opacity-[0.035] blur-[0.3px]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1800&q=82')",
          }}
        />

        {/* Editorial vertical rails */}
        <div className="absolute left-[4%] top-0 hidden h-full w-px bg-[#163C80]/[0.035] lg:block" />

        <div className="absolute right-[4%] top-0 hidden h-full w-px bg-[#163C80]/[0.035] lg:block" />

        {/* Subtle center light */}
        <div className="absolute left-1/2 top-[14%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-white/20 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* =========================================================
            TOP EDITORIAL HEADER
        ========================================================== */}

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
          {/* LEFT — SECTION IDENTITY */}

          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#138808]" />

              <span className="text-[9px] font-black tracking-[0.28em] text-[#138808]">
                INDIA IN MANY VOICES
              </span>
            </div>

            <div className="mt-7 flex items-center gap-4">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#163C80]/10 bg-[#FFFDF8]/65 text-[#163C80] shadow-[0_8px_25px_rgba(22,60,128,0.05)] backdrop-blur-xl">
                <MessageCircle size={20} strokeWidth={1.4} />

                <span className="absolute bottom-0.5 right-0.5 h-2 w-2 rounded-full bg-[#FF9933]" />
              </div>

              <div>
                <p className="text-[8px] font-black tracking-[0.22em] text-[#163C80]/35">
                  15 AUGUST 2026
                </p>

                <p className="mt-1 text-[9px] font-black tracking-[0.18em] text-[#163C80]">
                  INDIA @ 80
                </p>
              </div>
            </div>

            <div className="mt-7 max-w-sm">
              <p className="text-[clamp(1.05rem,1.45vw,1.35rem)] font-semibold leading-[1.35] tracking-[-0.025em] text-[#163C80]/65">
                A country this vast cannot be described with one definition.
              </p>

              <div className="mt-5 flex items-center gap-3">
                <span className="h-px w-8 bg-[#FF9933]/60" />

                <span className="text-[8px] font-black tracking-[0.2em] text-[#163C80]/30">
                  ONE NATION · MANY PERSPECTIVES
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — QUESTION */}

          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-[9px] font-black tracking-[0.25em] text-[#FF9933]"
            >
              THE QUESTION
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.06, duration: 0.7 }}
              className="mt-3 max-w-4xl text-[clamp(2.7rem,5.8vw,5.8rem)] font-black leading-[0.88] tracking-[-0.065em] text-[#163C80]"
            >
              What does{" "}
              <span className="text-[#FF9933]">India mean?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.12, duration: 0.65 }}
              className="mt-6 max-w-xl text-sm leading-6 text-[#163C80]/55 sm:text-base sm:leading-7"
            >
              There may never be one answer. And perhaps that is precisely
              what makes the story worth telling.
            </motion.p>
          </div>
        </div>

        {/* =========================================================
            COMPACT EDITORIAL QUOTE
        ========================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mt-10 border-y border-[#163C80]/10 py-6 sm:py-7 lg:py-8"
        >
          <div className="grid gap-5 lg:grid-cols-[42px_minmax(0,1fr)_210px] lg:items-center lg:gap-6">
            {/* Quote mark */}

            <div className="flex items-start pt-1">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#FF9933]/20 bg-[#FFFDF8]/60 text-[#FF9933] shadow-[0_8px_20px_rgba(255,153,51,0.05)] backdrop-blur-xl">
                <Quote size={16} strokeWidth={1.25} />
              </div>
            </div>

            {/* Compact quote */}

            <div className="min-w-0 lg:pl-1">
              <p className="max-w-3xl text-[clamp(1.25rem,2.25vw,2.15rem)] font-black leading-[1.05] tracking-[-0.04em] text-[#163C80]">
                A nation becomes larger than its map when millions of
                different lives find a place within the same story.
              </p>
            </div>

            {/* Compact editorial thought */}

            <div className="relative border-l border-[#163C80]/10 pl-4 sm:pl-5 lg:ml-2 lg:pl-5">
              {/* Tricolor micro rail */}

              <div className="absolute left-[-2px] top-0 h-full w-[3px] overflow-hidden rounded-full bg-gradient-to-b from-[#FF9933] via-[#163C80] to-[#138808]" />

              <div className="flex items-center gap-2">
                <span className="text-[7px] font-black tracking-[0.2em] text-[#FF9933]">
                  EDITORIAL
                </span>

                <span className="text-[7px] font-black text-[#163C80]/20">
                  |
                </span>

                <span className="text-[7px] font-black tracking-[0.18em] text-[#163C80]/35">
                  THOUGHT
                </span>
              </div>

              <p className="mt-2 max-w-[180px] text-[9px] font-medium leading-[1.45] text-[#163C80]/45">
                One country. Millions of perspectives. No single answer.
              </p>

              <div className="mt-3 flex items-center gap-2">
                <span className="h-px w-5 bg-[#138808]/45" />

                <span className="text-[6px] font-black tracking-[0.18em] text-[#163C80]/25">
                  INDIA @ 80
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* =========================================================
            VOICE NAVIGATION
        ========================================================== */}

        <div className="mt-8 flex items-center justify-between border-b border-[#163C80]/10 pb-4">
          <div className="flex items-center gap-2">
            {voices.map((voice, index) => (
              <button
                key={voice.number}
                type="button"
                onClick={() => selectVoice(index)}
                aria-label={`Show ${voice.label}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className="group flex items-center gap-2"
              >
                <span
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === activeIndex
                      ? "w-10 bg-[#FF9933]"
                      : "w-3 bg-[#163C80]/15 group-hover:bg-[#163C80]/30"
                  }`}
                />

                <span
                  className={`hidden text-[8px] font-black tracking-[0.15em] transition-colors sm:block ${
                    index === activeIndex
                      ? "text-[#163C80]/60"
                      : "text-[#163C80]/20"
                  }`}
                >
                  {voice.number}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden text-[8px] font-black tracking-[0.18em] text-[#163C80]/25 sm:block">
              VOICES
            </span>

            <span className="text-[9px] font-black text-[#163C80]/50">
              {String(activeIndex + 1).padStart(2, "0")} / 03
            </span>

            {/* AUTO PLAY CONTROL */}

            <button
              type="button"
              onClick={toggleAutoplay}
              aria-label={
                isAutoPlaying
                  ? "Pause automatic voices"
                  : "Play automatic voices"
              }
              className="group flex items-center gap-2 rounded-full border border-[#163C80]/10 bg-[#FFFDF8]/55 px-3 py-1.5 text-[#163C80]/45 backdrop-blur-xl transition-all hover:border-[#FF9933]/30 hover:text-[#FF9933]"
            >
              {isAutoPlaying ? (
                <Pause size={11} strokeWidth={2} />
              ) : (
                <Play size={11} strokeWidth={2} />
              )}

              <span className="text-[7px] font-black tracking-[0.18em]">
                {isAutoPlaying ? "AUTO" : "PLAY"}
              </span>
            </button>
          </div>
        </div>

        {/* =========================================================
            SINGLE ACTIVE VOICE
        ========================================================== */}

        <div className="relative mt-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={activeVoice.number}
              initial={{
                opacity: 0,
                y: 45,
                rotateX: 5,
              }}
              animate={{
                opacity: 1,
                y: 0,
                rotateX: 0,
              }}
              exit={{
                opacity: 0,
                y: -35,
                rotateX: -4,
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                transformPerspective: 1200,
              }}
              className="group relative overflow-hidden rounded-[1.5rem] border border-[#163C80]/10 bg-[#FFFDF8]/20 shadow-[0_20px_70px_rgba(22,60,128,0.045)]"
            >
              {/* =================================================
                  BACKGROUND IMAGE
              ================================================= */}

              <motion.div
                initial={{ scale: 1.08 }}
                animate={{
                  scale: expanded ? 1.035 : 1,
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="pointer-events-none absolute inset-0 bg-cover bg-center grayscale"
                style={{
                  backgroundImage: `url("${activeVoice.image}")`,
                }}
              />

              {/* Cream overlay */}

              <div
                className={`pointer-events-none absolute inset-0 transition-all duration-700 ${
                  expanded
                    ? "bg-[#F5EEDF]/[0.79]"
                    : "bg-[#F5EEDF]/[0.91]"
                }`}
              />

              {/* Image glow */}

              <div className="pointer-events-none absolute right-[-5%] top-[-20%] h-[360px] w-[360px] rounded-full bg-[#FF9933]/10 blur-[100px]" />

              <div className="pointer-events-none absolute bottom-[-15%] left-[20%] h-[260px] w-[260px] rounded-full bg-[#138808]/[0.055] blur-[100px]" />

              {/* =================================================
                  TOP TRICOLOR LINE
              ================================================= */}

              <div
                className="absolute left-0 right-0 top-0 h-[3px]"
                style={{
                  background: independenceTheme.gradients.tricolor,
                }}
              />

              {/* =================================================
                  ACTIVE CARD CONTENT
              ================================================= */}

              <button
                type="button"
                onClick={toggleExpanded}
                aria-expanded={expanded}
                className="relative z-10 w-full text-left outline-none"
              >
                <motion.div
                  layout
                  className="px-5 py-7 sm:px-8 sm:py-9 lg:px-12 lg:py-10"
                >
                  <div className="grid gap-7 lg:grid-cols-[0.1fr_0.2fr_1fr_auto] lg:items-center lg:gap-10">
                    {/* Number */}

                    <div>
                      <p className="text-[10px] font-black tracking-[0.18em] text-[#163C80]/25">
                        {activeVoice.number}
                      </p>

                      <div className="mt-3 h-px w-7 bg-[#FF9933]/50" />
                    </div>

                    {/* Label */}

                    <div>
                      <p className="text-[9px] font-black tracking-[0.22em] text-[#138808]">
                        {activeVoice.label}
                      </p>

                      <div
                        className={`mt-4 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 ${
                          expanded
                            ? "border-[#FF9933]/40 bg-[#FF9933]/10 text-[#FF9933]"
                            : "border-[#163C80]/10 bg-[#FFFDF8]/50 text-[#163C80]"
                        }`}
                      >
                        <Waves size={17} strokeWidth={1.4} />
                      </div>
                    </div>

                    {/* Question */}

                    <div>
                      <h3 className="max-w-4xl text-[clamp(1.7rem,3.2vw,3.35rem)] font-black leading-[0.98] tracking-[-0.055em] text-[#163C80]">
                        {activeVoice.title}
                      </h3>

                      <div className="mt-4 flex items-center gap-3">
                        <span className="h-px w-7 bg-[#163C80]/15" />

                        <span className="text-[8px] font-black tracking-[0.18em] text-[#163C80]/30">
                          {expanded ? "CLOSE VOICE" : "EXPLORE THIS VOICE"}
                        </span>
                      </div>
                    </div>

                    {/* Toggle */}

                    <motion.div
                      animate={{
                        rotate: expanded ? 180 : 0,
                      }}
                      transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#163C80]/10 bg-[#FFFDF8]/55 text-[#163C80] shadow-sm backdrop-blur-xl"
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </div>

                  {/* =================================================
                      EXPANDED CONTENT
                  ================================================= */}

                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0,
                          y: 25,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          y: 15,
                        }}
                        transition={{
                          duration: 0.55,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="mt-8 border-t border-[#163C80]/10 pt-8">
                          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-12">
                            {/* Image */}

                            <div className="relative h-52 overflow-hidden rounded-[1.25rem] border border-white/60 bg-[#E9DDC8] shadow-[0_20px_50px_rgba(22,60,128,0.08)] sm:h-64">
                              <motion.div
                                initial={{ scale: 1.12 }}
                                animate={{ scale: 1 }}
                                transition={{
                                  duration: 0.9,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                  backgroundImage: `url("${activeVoice.image}")`,
                                }}
                              />

                              <div className="absolute inset-0 bg-gradient-to-t from-[#163C80]/50 via-transparent to-transparent" />

                              <div className="absolute bottom-4 left-4">
                                <span className="border border-white/25 bg-[#163C80]/35 px-3 py-1.5 text-[8px] font-black tracking-[0.18em] text-white backdrop-blur-md">
                                  {activeVoice.label}
                                </span>
                              </div>
                            </div>

                            {/* Description */}

                            <div>
                              <p className="text-[9px] font-black tracking-[0.22em] text-[#FF9933]">
                                THE VOICE BEHIND THE QUESTION
                              </p>

                              <p className="mt-4 max-w-2xl text-base leading-7 text-[#163C80]/65 sm:text-lg sm:leading-8">
                                {activeVoice.description}
                              </p>

                              <div className="mt-6 flex items-center gap-3">
                                <span className="h-px w-8 bg-[#138808]/40" />

                                <span className="text-[8px] font-black tracking-[0.2em] text-[#163C80]/30">
                                  YOUR EXPERIENCE BELONGS HERE
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </button>

              {/* =================================================
                  PROGRESS TIMER
              ================================================= */}

              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#163C80]/[0.06]">
                {isAutoPlaying && !expanded && (
                  <motion.div
                    key={`${activeVoice.number}-${progressKey}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: AUTO_PLAY_DURATION / 1000,
                      ease: "linear",
                    }}
                    className="h-full bg-[#FF9933]"
                  />
                )}

                {!isAutoPlaying && (
                  <div className="h-full w-0 bg-[#FF9933]" />
                )}
              </div>

              {/* Glass reflection */}

              <motion.div
                initial={{
                  x: "-120%",
                }}
                animate={{
                  x: "120%",
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeInOut",
                  delay: 0.25,
                }}
                className="pointer-events-none absolute inset-y-0 z-20 w-1/4 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
            </motion.article>
          </AnimatePresence>
        </div>

        {/* =========================================================
            NEXT / MANUAL CONTROL
        ========================================================== */}

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#163C80]/15" />

            <span className="text-[8px] font-black tracking-[0.2em] text-[#163C80]/25">
              {expanded
                ? "READING THE STORY"
                : isAutoPlaying
                  ? "NEXT VOICE IN 9 SECONDS"
                  : "AUTOPLAY PAUSED"}
            </span>
          </div>

          <button
            type="button"
            onClick={nextVoice}
            className="group flex items-center gap-2 text-[8px] font-black tracking-[0.18em] text-[#163C80]/45 transition-colors hover:text-[#FF9933]"
          >
            NEXT

            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#163C80]/10 transition-all duration-300 group-hover:translate-x-1 group-hover:border-[#FF9933]/30">
              <ArrowUpRight size={13} />
            </span>
          </button>
        </div>

        {/* =========================================================
            CLOSING
        ========================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
          className="mt-14 border-t border-[#163C80]/10 pt-8 text-center"
        >
          <p className="text-lg font-black tracking-[-0.03em] text-[#163C80] sm:text-xl">
            Many voices.
            <span className="text-[#FF9933]"> One conversation.</span>
          </p>

          <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-[#FF9933] via-[#163C80] to-[#138808]" />
        </motion.div>
      </div>
    </section>
  );
}

