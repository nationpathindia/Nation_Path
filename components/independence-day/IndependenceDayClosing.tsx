"use client";

import { motion } from "framer-motion";
import { ArrowUp, Heart, Sparkles } from "lucide-react";

import { independenceTheme } from "./IndependenceTheme";

const chakraSpokes = Array.from({ length: 24 });

function AshokaChakra() {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative inline-flex h-7 w-7 shrink-0 items-center justify-center"
      aria-label="Ashoka Chakra"
    >
      {/* Saffron accent ring */}
      <span className="absolute inset-0 rounded-full border border-[#FF9933]/35" />

      {/* Chakra */}
      <span className="relative flex h-[22px] w-[22px] items-center justify-center rounded-full border-[1.2px] border-[#163C80] bg-[#FFFDF8]/80 shadow-[0_2px_8px_rgba(22,60,128,0.08)]">
        {/* Inner ring */}
        <span className="absolute inset-[4px] rounded-full border-[0.8px] border-[#163C80]/80" />

        {/* Hub */}
        <span className="absolute h-[3px] w-[3px] rounded-full bg-[#163C80]" />

        {/* 24 spokes */}
        {chakraSpokes.map((_, index) => (
          <span
            key={index}
            className="absolute left-1/2 top-1/2 h-[8px] w-[0.7px] origin-bottom bg-[#163C80]/90"
            style={{
              transform: `translate(-50%, -100%) rotate(${index * 15}deg)`,
            }}
          />
        ))}
      </span>

      {/* Green micro accent */}
      <span className="absolute -bottom-[1px] left-1/2 h-[2px] w-2 -translate-x-1/2 rounded-full bg-[#138808]/65" />
    </motion.span>
  );
}

export default function IndependenceDayClosing() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden bg-[#F1E8D8] text-[#163C80]">
      {/* =========================================================
          ATMOSPHERE
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{
            x: [0, 18, 0],
            y: [0, -8, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-[10%] top-[-70%] h-[360px] w-[360px] rounded-full bg-[#FF9933]/[0.09] blur-[90px]"
        />

        <motion.div
          animate={{
            x: [0, -18, 0],
            y: [0, 8, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-[10%] bottom-[-70%] h-[360px] w-[360px] rounded-full bg-[#138808]/[0.08] blur-[90px]"
        />

        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-multiply"
          style={{
            backgroundImage:
              "radial-gradient(rgba(22,60,128,0.32) 0.45px, transparent 0.45px)",
            backgroundSize: "6px 6px",
          }}
        />

        <div className="absolute right-[7%] top-1/2 hidden h-44 w-28 -translate-y-1/2 rotate-[14deg] rounded-[45%_55%_48%_52%] border border-[#163C80]/[0.025] lg:block" />
      </div>

      {/* =========================================================
          COMPACT PREMIUM MODULE
      ========================================================== */}

      <div className="relative mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-7 lg:px-10">
        {/* =======================================================
            TRICOLOUR RAIL
        ======================================================== */}

        <div className="relative h-[3px] w-full overflow-hidden rounded-full">
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-full"
            style={{
              background: independenceTheme.gradients.tricolor,
            }}
          />

          <motion.span
            animate={{
              x: ["-120%", "450%"],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut",
            }}
            className="absolute inset-y-0 left-0 w-24 bg-white/55 blur-[2px]"
          />
        </div>

        {/* =======================================================
            MAIN ROW
        ======================================================== */}

        <div className="mx-auto mt-5 grid items-center gap-5 sm:grid-cols-[170px_minmax(0,1fr)_150px] sm:gap-7">
          {/* =====================================================
              INDIA @ 80 ANNIVERSARY EMBLEM
          ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 8,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex justify-center sm:justify-start"
          >
            <div
              className="relative h-[112px] w-[158px]"
              aria-label="India at 80 — 1947 to 2026"
            >
              {/* =================================================
                  SOFT AURA
              ================================================== */}

              <motion.div
                animate={{
                  opacity: [0.12, 0.28, 0.12],
                  scale: [0.96, 1.04, 0.96],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-[19px] top-[29px] h-[60px] w-[60px] rounded-full bg-[#FF9933]/12 blur-[22px]"
              />

              {/* =================================================
                  INDIA LABEL
              ================================================== */}

              <div className="absolute left-[7px] top-0">
                <span className="text-[6px] font-black tracking-[0.32em] text-[#163C80]/45">
                  INDIA
                </span>
              </div>

              {/* =================================================
                  CLEAN 80
                  8 = GREEN
                  0 = SAFFRON
              ================================================== */}

              <div
                className="absolute left-[2px] top-[12px] select-none whitespace-nowrap"
                aria-label="India at 80"
              >
                {/* 8 */}

                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block text-[5.7rem] font-black leading-none tracking-[-0.18em] text-[#138808]"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    WebkitTextStroke: "0.45px rgba(22,60,128,0.10)",
                  }}
                >
                  8
                </motion.span>

                {/* 0 */}

                <motion.span
                  initial={{ opacity: 0, x: 5 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.08,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative inline-block text-[5.7rem] font-black leading-none tracking-[-0.18em] text-[#FF9933]"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    WebkitTextStroke: "0.45px rgba(22,60,128,0.10)",
                  }}
                >
                  0
                </motion.span>
              </div>

              {/* =================================================
                  80 UNDERLINE
              ================================================== */}

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 67 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.3,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute bottom-[22px] left-[7px] h-[2px] overflow-hidden rounded-full"
              >
                <div
                  className="h-full w-full"
                  style={{
                    background: independenceTheme.gradients.tricolor,
                  }}
                />
              </motion.div>

              {/* =================================================
                  ANNIVERSARY LOCKUP
              ================================================== */}

              <div className="absolute bottom-[1px] left-[7px]">
                <div className="flex items-center gap-1.5">
                  <span className="h-px w-4 bg-[#FF9933]/70" />

                  <span className="text-[5px] font-black tracking-[0.24em] text-[#163C80]/45">
                    1947 — 2026
                  </span>

                  <span className="h-px w-4 bg-[#138808]/70" />
                </div>

                <p className="mt-1 text-[5px] font-black tracking-[0.28em] text-[#163C80]/30">
                  80 YEARS OF INDEPENDENCE
                </p>
              </div>

              {/* =================================================
                  SUBTLE LIGHT SWEEP
              ================================================== */}

              <motion.div
                animate={{
                  x: ["-140%", "260%"],
                }}
                transition={{
                  duration: 1.7,
                  repeat: Infinity,
                  repeatDelay: 7,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute left-[3px] top-[15px] h-[76px] w-[18px] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/25 to-transparent blur-[2px]"
              />
            </div>
          </motion.div>

          {/* =====================================================
              EDITORIAL MESSAGE
          ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.08,
              duration: 0.55,
            }}
            className="min-w-0 text-center sm:border-l sm:border-[#163C80]/10 sm:pl-7 sm:text-left"
          >
            {/* =================================================
                STORY CONTINUES LABEL
            ================================================== */}

            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <motion.span
                animate={{
                  width: [20, 32, 20],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-px bg-[#FF9933]"
              />

              <span className="text-[7px] font-black tracking-[0.25em] text-[#FF9933]">
                THE STORY CONTINUES
              </span>

              <motion.span
                animate={{
                  width: [20, 32, 20],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
                className="h-px bg-[#138808]"
              />
            </div>

            {/* =================================================
                MAIN MESSAGE + CHAKRA SEPARATOR
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.14,
                duration: 0.55,
              }}
              className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:justify-start"
            >
              <span className="text-[clamp(1.55rem,3vw,2.65rem)] font-black leading-[0.9] tracking-[-0.055em] text-[#163C80]">
                One country.
              </span>

              {/* =================================================
                  ASHOKA CHAKRA
                  PREMIUM INLINE SEPARATOR
              ================================================== */}

              <AshokaChakra />

              <span className="relative text-[clamp(1.55rem,3vw,2.65rem)] font-black leading-[0.9] tracking-[-0.055em] text-[#138808]">
                Many stories.

                <motion.span
                  initial={{
                    width: 0,
                  }}
                  whileInView={{
                    width: "100%",
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: 0.55,
                    duration: 0.55,
                  }}
                  className="absolute -bottom-1 left-0 h-[2px] bg-[#FF9933]/45"
                />
              </span>
            </motion.div>

            <p className="mt-2 max-w-xl text-[9px] leading-4 text-[#163C80]/42 sm:text-[10px]">
              Eight decades behind us. A story still being written by every
              generation.
            </p>
          </motion.div>

          {/* =====================================================
              DATE / JAI HIND
          ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 8,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.15,
              duration: 0.55,
            }}
            className="flex items-center justify-center gap-4 sm:block sm:border-l sm:border-[#163C80]/10 sm:pl-7"
          >
            <div className="flex items-center gap-1.5">
              <motion.span
                animate={{
                  rotate: [0, 8, -8, 0],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles
                  size={10}
                  strokeWidth={1.8}
                  className="text-[#FF9933]"
                />
              </motion.span>

              <span className="text-[7px] font-black tracking-[0.18em] text-[#163C80]/40">
                15 AUGUST 2026
              </span>
            </div>

            <motion.p
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
                delay: 0.35,
                duration: 0.45,
              }}
              className="mt-1 text-[13px] font-black tracking-[0.08em] text-[#163C80]/65"
            >
              Jai Hind.
            </motion.p>

            {/* Micro flag */}

            <div className="relative mt-2 h-[3px] w-12 overflow-hidden rounded-full">
              <motion.div
                animate={{
                  x: ["-8%", "8%", "-8%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex h-full w-[112%]"
              >
                <span className="w-1/3 bg-[#FF9933]" />
                <span className="w-1/3 bg-[#FFFDF8]" />
                <span className="w-1/3 bg-[#138808]" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* =======================================================
            BOTTOM MICRO FOOTER
        ======================================================== */}

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
            delay: 0.25,
            duration: 0.5,
          }}
          className="mt-5 flex items-center justify-between border-t border-[#163C80]/10 pt-3"
        >
          <div className="flex items-center gap-1.5">
            <motion.span
              animate={{
                scale: [1, 1.12, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart
                size={9}
                strokeWidth={1.8}
                className="text-[#FF9933]"
                fill="currentColor"
              />
            </motion.span>

            <span className="text-[6px] font-black tracking-[0.2em] text-[#163C80]/28">
              A NATIONPATH INDIA SPECIAL
            </span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-1.5 text-[6px] font-black tracking-[0.18em] text-[#163C80]/25 transition-colors hover:text-[#FF9933]"
          >
            TOP

            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#163C80]/10 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#FF9933]/30 group-hover:bg-[#FF9933]/[0.04] group-hover:-translate-y-0.5">
              <ArrowUp size={9} />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

