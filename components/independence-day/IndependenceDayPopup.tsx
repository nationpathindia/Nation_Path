"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { independenceTheme } from "./IndependenceTheme";

const STORAGE_KEY = "nationpath-independence-popup-closed";

export default function IndependenceDayPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const alreadyClosed =
      window.sessionStorage.getItem(STORAGE_KEY);

    if (alreadyClosed) return;

    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, 1800);

    return () => window.clearTimeout(timer);
  }, []);

  const closePopup = () => {
    window.sessionStorage.setItem(STORAGE_KEY, "true");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          {/* Transparent backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-transparent"
            onClick={closePopup}
            aria-hidden="true"
          />

          {/* Center wrapper */}
          <div className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.95,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pointer-events-auto relative w-full max-w-[620px]"
            >
              {/* Close */}
              <button
                type="button"
                onClick={closePopup}
                aria-label="Close Independence Day popup"
                className="
                  absolute
                  -right-2
                  -top-2
                  z-30
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/70
                  bg-white/50
                  text-[#102F68]/60
                  shadow-lg
                  backdrop-blur-xl
                  transition
                  hover:scale-105
                  hover:bg-white/80
                  hover:text-[#102F68]
                "
              >
                <X size={16} />
              </button>

              <Link
                href="/independence-day"
                onClick={closePopup}
                className="group block"
              >
                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-[1.8rem]
                    border
                    border-white/60
                    bg-white/[0.25]
                    shadow-[0_25px_100px_rgba(16,47,104,0.16)]
                    backdrop-blur-2xl
                    backdrop-saturate-150
                  "
                >
                  {/* Top Tiranga rail */}
                  <div className="relative h-[4px] overflow-hidden">
                    <motion.div
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-y-0 w-full"
                      style={{
                        background:
                          independenceTheme.gradients.tricolor,
                      }}
                    />
                  </div>

                  {/* Saffron glow */}
                  <motion.div
                    animate={{
                      scale: [1, 1.12, 1],
                      opacity: [0.18, 0.35, 0.18],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="
                      pointer-events-none
                      absolute
                      -right-28
                      -top-28
                      h-72
                      w-72
                      rounded-full
                      bg-[#FF9933]/10
                      blur-3xl
                    "
                  />

                  {/* Green glow */}
                  <motion.div
                    animate={{
                      scale: [1.08, 1, 1.08],
                      opacity: [0.15, 0.3, 0.15],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="
                      pointer-events-none
                      absolute
                      -bottom-28
                      -left-28
                      h-72
                      w-72
                      rounded-full
                      bg-[#138808]/10
                      blur-3xl
                    "
                  />

                  {/* Chakra watermark */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 45,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="
                      pointer-events-none
                      absolute
                      -right-12
                      top-16
                      h-48
                      w-48
                      rounded-full
                      border-2
                      border-[#163C80]
                      opacity-[0.035]
                    "
                  >
                    <div className="absolute inset-5 rounded-full border border-[#163C80]" />

                    <div className="absolute left-1/2 top-1/2 h-[160px] w-px -translate-x-1/2 -translate-y-1/2 bg-[#163C80]" />

                    <div className="absolute left-1/2 top-1/2 h-px w-[160px] -translate-x-1/2 -translate-y-1/2 bg-[#163C80]" />

                    <div className="absolute left-1/2 top-1/2 h-[130px] w-px -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#163C80]" />

                    <div className="absolute left-1/2 top-1/2 h-px w-[130px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#163C80]" />

                    <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#163C80]" />
                  </motion.div>

                  {/* Content */}
                  <div className="relative px-5 py-6 sm:px-8 sm:py-7">
                    {/* Eyebrow */}
                    <div className="flex items-center justify-center gap-2 sm:justify-start">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FF9933]" />

                      <p className="text-[8px] font-black tracking-[0.24em] text-[#102F68]/45 sm:text-[9px]">
                        NATIONPATH INDIA PRESENTS
                      </p>

                      <span className="h-1.5 w-1.5 rounded-full bg-[#138808]" />
                    </div>

                    {/* Main heading */}
                    <div className="mt-4 text-center sm:text-left">
                      <p className="text-[10px] font-black tracking-[0.22em] text-[#FF9933] sm:text-[11px]">
                        15 AUGUST 2026
                      </p>

                      <h3 className="mt-2 text-[2.15rem] font-black leading-[0.92] tracking-[-0.07em] text-[#102F68] sm:text-[3rem]">
                        Happy{" "}
                        <span className="text-[#FF9933]">
                          Independence Day
                        </span>{" "}
                        <span className="text-[#138808]">🇮🇳</span>
                      </h3>

                      <p className="mt-3 text-sm font-semibold leading-relaxed text-[#102F68]/55 sm:text-[15px]">
                        India&apos;s journey.
                        <span className="mx-1.5 text-[#FF9933]">
                          One nation.
                        </span>
                        Countless stories.
                      </p>
                    </div>

                    {/* Railway */}
                    <div className="relative mt-7 h-[76px]">
                      <div className="absolute left-0 right-0 top-[39px] h-[3px] rounded-full bg-[#102F68]/10" />

                      <div className="absolute left-0 right-0 top-[48px] h-px bg-[#102F68]/10" />

                      <motion.div
                        animate={{
                          width: ["12%", "88%", "12%"],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute left-0 top-[39px] h-[3px] rounded-full"
                        style={{
                          background:
                            independenceTheme.gradients.tricolor,
                        }}
                      />

                      <div className="absolute left-0 right-0 top-[33px] flex justify-between">
                        {["1947", "1950", "1991", "2023", "2026"].map(
                          (year, index) => (
                            <div
                              key={year}
                              className="relative"
                            >
                              <motion.span
                                animate={
                                  index === 4
                                    ? {
                                        scale: [1, 1.3, 1],
                                        opacity: [0.6, 1, 0.6],
                                      }
                                    : undefined
                                }
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                }}
                                className="
                                  block
                                  h-4
                                  w-4
                                  rounded-full
                                  border-[3px]
                                  border-white/80
                                  bg-[#163C80]
                                "
                              />

                              <span className="
                                absolute
                                left-1/2
                                top-6
                                -translate-x-1/2
                                text-[7px]
                                font-black
                                tracking-[0.1em]
                                text-[#102F68]/35
                              ">
                                {year}
                              </span>
                            </div>
                          ),
                        )}
                      </div>

                      {/* Train */}
                      <motion.div
                        animate={{
                          left: ["2%", "88%"],
                        }}
                        transition={{
                          duration: 4.5,
                          repeat: Infinity,
                          repeatDelay: 0.5,
                          ease: [0.45, 0, 0.55, 1],
                        }}
                        className="absolute top-[-1px] z-10 -translate-x-1/2"
                      >
                        <div className="relative h-12 w-20">
                          <motion.span
                            animate={{
                              opacity: [0, 0.45, 0],
                              y: [4, -4, -9],
                              x: [0, 3, 7],
                            }}
                            transition={{
                              duration: 1.4,
                              repeat: Infinity,
                            }}
                            className="
                              absolute
                              left-1
                              top-0
                              h-3
                              w-3
                              rounded-full
                              bg-[#163C80]/15
                              blur-[2px]
                            "
                          />

                          <div className="absolute left-5 top-2">
                            <div className="h-1.5 w-3 rounded-t bg-[#102F68]" />
                            <div className="mx-auto h-3 w-1.5 bg-[#102F68]" />
                          </div>

                          <div className="absolute left-4 top-5 h-5 w-7 rounded-t bg-[#102F68]">
                            <div className="absolute left-1 top-1 h-2 w-2 rounded-[1px] bg-white/75" />
                            <div className="absolute right-1 top-1 h-2 w-2 rounded-[1px] bg-white/75" />
                          </div>

                          <div className="absolute bottom-2 left-0 h-5 w-[68px] rounded-md border-2 border-[#FF9933] bg-[#102F68]">
                            <div className="absolute left-2 right-2 top-1.5 h-[2px] rounded-full bg-[#FF9933]" />
                          </div>

                          <div className="absolute bottom-0 left-2 flex gap-8">
                            {[0, 1].map((wheel) => (
                              <motion.span
                                key={wheel}
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 0.5,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                className="
                                  h-3
                                  w-3
                                  rounded-full
                                  border-2
                                  border-[#102F68]
                                  bg-[#F5F1E8]
                                "
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Footer */}
                    <div className="
                      mt-2
                      flex
                      flex-col
                      items-center
                      gap-4
                      border-t
                      border-[#102F68]/[0.07]
                      pt-4
                      sm:flex-row
                      sm:justify-between
                    ">
                      <div className="text-center sm:text-left">
                        <p className="text-[8px] font-black tracking-[0.17em] text-slate-400">
                          A SPECIAL STORY BY NATIONPATH INDIA
                        </p>

                        <p className="mt-1 text-xs font-bold text-[#102F68]/60">
                          From freedom to the India of tomorrow.
                        </p>
                      </div>

                      <div className="
                        flex
                        items-center
                        gap-2
                        rounded-full
                        bg-[#102F68]/95
                        px-5
                        py-2.5
                        text-[9px]
                        font-black
                        tracking-[0.14em]
                        text-white
                      ">
                        EXPLORE
                        <ArrowRight size={13} />
                      </div>
                    </div>
                  </div>

                  {/* Bottom green rail */}
                  <div className="relative h-[3px] overflow-hidden bg-[#138808]/10">
                    <motion.div
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        duration: 3.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="
                        absolute
                        inset-y-0
                        w-full
                        bg-gradient-to-r
                        from-transparent
                        via-[#138808]/70
                        to-transparent
                      "
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </>
      ) : null}
    </AnimatePresence>
  );
}