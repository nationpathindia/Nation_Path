"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useState } from "react";

/*
============================================================
 SITE PROMOTION POPUP
============================================================

Purpose:
- Site-wide promotional campaign
- Mounted from app/layout.tsx
- Reusable for future campaigns
- Remembers user dismissal
- Does not interfere with page content

Current Campaign:
- Independence Day 2026
============================================================
*/

const PROMOTION_ID = "independence-day-2026";
const SHOW_DELAY = 5000;

const STORAGE_KEY = `nationpath-promotion-closed-${PROMOTION_ID}`;

export default function SitePromotionPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    /*
     * Don't show the popup again if the user
     * already closed this campaign.
     */
    try {
      const alreadyClosed = window.localStorage.getItem(STORAGE_KEY);

      if (alreadyClosed === "true") {
        return;
      }
    } catch {
      // Ignore localStorage errors.
    }

    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, SHOW_DELAY);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const closePopup = () => {
    setIsVisible(false);

    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Ignore localStorage errors.
    }
  };

  const openPromotion = () => {
    closePopup();

    window.location.href = "/independence-day";
  };

  /*
   * Prevent SSR / hydration mismatch.
   */
  if (!isMounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 20,
            scale: 0.97,
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            fixed
            bottom-5
            right-5
            z-[9999]
            w-[calc(100%-2rem)]
            max-w-[390px]
            sm:bottom-6
            sm:right-6
          "
          role="dialog"
          aria-label="NationPath India special"
        >
          <div
            className="
              relative
              overflow-hidden
              rounded-[1.35rem]
              border
              border-[#163C80]/10
              bg-[#F8F1E4]/95
              shadow-[0_25px_80px_rgba(22,60,128,0.16)]
              backdrop-blur-2xl
            "
          >
            {/* ==================================================
                ATMOSPHERE
            ================================================== */}

            <div className="pointer-events-none absolute inset-0">
              {/* Saffron glow */}

              <div
                className="
                  absolute
                  -right-20
                  -top-20
                  h-48
                  w-48
                  rounded-full
                  bg-[#FF9933]/10
                  blur-[55px]
                "
              />

              {/* Green glow */}

              <div
                className="
                  absolute
                  -bottom-24
                  -left-20
                  h-48
                  w-48
                  rounded-full
                  bg-[#138808]/[0.07]
                  blur-[55px]
                "
              />

              {/* Paper texture */}

              <div
                className="absolute inset-0 opacity-[0.07] mix-blend-multiply"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(22,60,128,0.4) 0.45px, transparent 0.45px)",
                  backgroundSize: "6px 6px",
                }}
              />
            </div>

            {/* ==================================================
                TRICOLOUR TOP RAIL
            ================================================== */}

            <div className="relative h-[3px] w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF9933] via-[#FFFDF8] to-[#138808]" />

              <motion.div
                initial={{ x: "-120%" }}
                animate={{ x: "420%" }}
                transition={{
                  duration: 2.4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 5,
                }}
                className="
                  absolute
                  inset-y-0
                  left-0
                  w-20
                  bg-white/60
                  blur-[2px]
                "
              />
            </div>

            {/* ==================================================
                CLOSE BUTTON
            ================================================== */}

            <button
              type="button"
              onClick={closePopup}
              aria-label="Close promotion"
              className="
                absolute
                right-3
                top-3
                z-20
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                border
                border-[#163C80]/10
                bg-[#FFFDF8]/65
                text-[#163C80]/45
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-[#FF9933]/30
                hover:bg-[#FFFDF8]
                hover:text-[#FF9933]
              "
            >
              <X size={14} strokeWidth={1.8} />
            </button>

            {/* ==================================================
                CONTENT
            ================================================== */}

            <div className="relative px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
              {/* Editorial label */}

              <div className="flex items-center gap-2">
                <span className="h-px w-7 bg-[#FF9933]" />

                <span
                  className="
                    text-[8px]
                    font-black
                    tracking-[0.24em]
                    text-[#FF9933]
                  "
                >
                  NATIONPATH INDIA SPECIAL
                </span>
              </div>

              {/* Date */}

              <p
                className="
                  mt-3
                  text-[7px]
                  font-black
                  tracking-[0.2em]
                  text-[#163C80]/30
                "
              >
                15 AUGUST 2026 · INDIA @ 80
              </p>

              {/* Heading */}

              <h2
                className="
                  mt-2
                  max-w-[310px]
                  text-[clamp(1.45rem,4vw,2rem)]
                  font-black
                  leading-[0.95]
                  tracking-[-0.055em]
                  text-[#163C80]
                "
              >
                India,{" "}
                <span className="text-[#FF9933]">
                  Beyond
                </span>{" "}
                The Headlines.
              </h2>

              {/* Description */}

              <p
                className="
                  mt-3
                  max-w-[320px]
                  text-[11px]
                  leading-[1.55]
                  text-[#163C80]/55
                "
              >
                One nation. Many stories. Explore our special
                Independence Day experience — built to look beyond
                the day's headlines.
              </p>

              {/* ==================================================
                  CTA
              ================================================== */}

              <button
                type="button"
                onClick={openPromotion}
                className="
                  group
                  mt-5
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-[#163C80]/10
                  bg-[#163C80]
                  px-4
                  py-3
                  text-left
                  text-white
                  shadow-[0_10px_30px_rgba(22,60,128,0.12)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-[0_15px_35px_rgba(22,60,128,0.18)]
                "
              >
                <div>
                  <p
                    className="
                      text-[8px]
                      font-black
                      tracking-[0.18em]
                      text-white/55
                    "
                  >
                    EXPLORE THE EXPERIENCE
                  </p>

                  <p className="mt-0.5 text-[11px] font-bold">
                    India @ 80
                  </p>
                </div>

                <span
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white/10
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  <ArrowUpRight size={15} strokeWidth={1.8} />
                </span>
              </button>

              {/* Bottom micro line */}

              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="h-px w-5 bg-[#FF9933]/40" />

                <span
                  className="
                    text-[6px]
                    font-black
                    tracking-[0.2em]
                    text-[#163C80]/25
                  "
                >
                  ONE COUNTRY · MANY STORIES
                </span>

                <span className="h-px w-5 bg-[#138808]/40" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}