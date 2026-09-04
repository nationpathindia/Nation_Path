"use client";

/*
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// PREMIUM EDITORIAL HOROSCOPE
//
// CMS FIRST
// NO ENGINE
// NO CALCULATION
// NO AI
//
// DESIGN:
// Premium Compact Cosmic Editorial
// 3-Column Editorial Observatory
// Short Preview + Full Reading Modal
// Dynamic Guidance / Perspective Stripe
//
// DATA:
// CMS ONLY
//////////////////////////////////////////////////////////////
*/

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  BookOpen,
  Quote,
  Sparkles,
  ArrowUpRight,
  Feather,
  X,
  ChevronRight,
} from "lucide-react";

import type {
  CmsHoroscopeEditorial,
} from "./types";

//////////////////////////////////////////////////////////////
// PROPS
//////////////////////////////////////////////////////////////

interface Props {
  editorial?: CmsHoroscopeEditorial;
}

//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

type ReadingKey =
  | "overview"
  | "prediction"
  | "quote"
  | null;

//////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////

function getPreview(
  value?: string,
  maxLength = 125,
) {
  if (!value) return "";

  const clean = value.trim();

  if (clean.length <= maxLength) {
    return clean;
  }

  return `${clean.slice(0, maxLength).trim()}…`;
}

//////////////////////////////////////////////////////////////
// COMPONENT
//////////////////////////////////////////////////////////////

export default function HoroscopeEditorial({
  editorial,
}: Props) {
  const [
    activeReading,
    setActiveReading,
  ] = useState<ReadingKey>(null);

  ////////////////////////////////////////////////////////////
  // ACTIVE READING
  ////////////////////////////////////////////////////////////

  const activeContent = useMemo(() => {
    if (!activeReading || !editorial) {
      return null;
    }

    if (activeReading === "overview") {
      return {
        label: "Editorial Overview",
        title: "The Bigger Picture",
        content: editorial.overview,
        icon: BookOpen,
      };
    }

    if (activeReading === "prediction") {
      return {
        label: "Today's Guidance",
        title: "Your Daily Guidance",
        content: editorial.prediction,
        icon: Sparkles,
      };
    }

    return {
      label: "Cosmic Perspective",
      title: "A Thought to Carry",
      content: editorial.quote,
      icon: Quote,
    };
  }, [
    activeReading,
    editorial,
  ]);

  ////////////////////////////////////////////////////////////
  // ESCAPE KEY
  ////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!activeReading) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setActiveReading(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [activeReading]);

  ////////////////////////////////////////////////////////////
  // CLOSE MODAL
  ////////////////////////////////////////////////////////////

  const closeReading = () => {
    setActiveReading(null);
  };

  ////////////////////////////////////////////////////////////
  // CONTENT CHECK
  ////////////////////////////////////////////////////////////

  if (!editorial) {
    return null;
  }

  const hasContent =
    Boolean(editorial.headline) ||
    Boolean(editorial.overview) ||
    Boolean(editorial.prediction) ||
    Boolean(editorial.quote);

  if (!hasContent) {
    return null;
  }

  ////////////////////////////////////////////////////////////
  // DYNAMIC STRIPE LABEL
  ////////////////////////////////////////////////////////////

  const hasGuidance =
    Boolean(editorial.prediction);

  const hasPerspective =
    Boolean(editorial.quote);

  const stripeLabel =
    hasGuidance && hasPerspective
      ? "Guidance • Perspective"
      : hasGuidance
        ? "Today's Guidance"
        : hasPerspective
          ? "Cosmic Perspective"
          : "Editorial Reading";

  const stripeSubLabel =
    hasGuidance && hasPerspective
      ? "Vedic Editorial"
      : hasGuidance
        ? "Daily Insight"
        : hasPerspective
          ? "A Thought to Carry"
          : "NationPath Astro";

  ////////////////////////////////////////////////////////////
  // RENDER
  ////////////////////////////////////////////////////////////

  return (
    <>
      <section
        data-section="editorial"
        aria-labelledby="horoscope-editorial-title"
        className="
          relative
          isolate
          overflow-hidden
          rounded-[22px]
          border
          border-[#8c6aaf]/20
          bg-[#08062b]
          shadow-[0_24px_70px_rgba(5,3,35,.16)]
          sm:rounded-[24px]
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
          <div
            className="
              absolute
              -right-28
              -top-32
              h-[300px]
              w-[300px]
              rounded-full
              bg-[#8c1682]/16
              blur-[105px]
            "
          />

          <div
            className="
              absolute
              -left-24
              bottom-[-145px]
              h-[300px]
              w-[300px]
              rounded-full
              bg-[#34136d]/22
              blur-[100px]
            "
          />

          <div
            className="
              absolute
              left-[46%]
              top-[32%]
              h-[210px]
              w-[210px]
              rounded-full
              bg-[#d4a53b]/[0.04]
              blur-[95px]
            "
          />

          <div
            className="
              absolute
              inset-0
              opacity-[0.022]
              [background-image:radial-gradient(rgba(255,255,255,.9)_1px,transparent_1px)]
              [background-size:36px_36px]
            "
          />

          <motion.div
            initial={{
              scaleX: 0,
            }}
            whileInView={{
              scaleX: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute
              left-5
              right-5
              top-0
              h-[2px]
              origin-left
              bg-gradient-to-r
              from-transparent
              via-[#e5c54d]
              to-transparent
              opacity-70
              sm:left-7
              sm:right-7
            "
          />

          <motion.span
            animate={{
              y: [0, -6, 0],
              opacity: [0.18, 0.55, 0.18],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              left-[11%]
              top-[19%]
              h-1
              w-1
              rounded-full
              bg-[#e8cf63]
              shadow-[0_0_13px_#e8cf63]
            "
          />

          <motion.span
            animate={{
              y: [0, 6, 0],
              opacity: [0.14, 0.48, 0.14],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="
              absolute
              right-[13%]
              top-[27%]
              h-1
              w-1
              rounded-full
              bg-[#d96bb5]
              shadow-[0_0_14px_#d96bb5]
            "
          />

          <motion.span
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.18, 0.5, 0.18],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7,
            }}
            className="
              absolute
              bottom-[18%]
              right-[35%]
              h-1
              w-1
              rounded-full
              bg-[#f0d85a]
            "
          />
        </div>

        {/* ==================================================
            CONTENT
            ================================================== */}

        <div
          className="
            relative
            z-10
            p-4.5
            sm:p-5.5
            lg:p-6
          "
        >
          {/* HEADER */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-4
              border-b
              border-white/[0.065]
              pb-4
              sm:pb-4.5
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
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.85,
                  rotate: -8,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="
                  relative
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-[12px]
                  border
                  border-[#e2bd50]/20
                  bg-[#e2bd50]/[0.06]
                  text-[#e6c64e]
                "
              >
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="
                    absolute
                    inset-1
                    rounded-[9px]
                    border
                    border-dashed
                    border-[#d9a83e]/18
                  "
                />

                <BookOpen
                  size={16}
                  strokeWidth={1.6}
                  className="relative z-10"
                />
              </motion.div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="
                      h-px
                      w-5
                      bg-[#e1c34f]/55
                    "
                  />

                  <p
                    id="horoscope-editorial-title"
                    className="
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.24em]
                      text-[#d8bd55]
                      sm:text-[9px]
                    "
                  >
                    Horoscope Reading
                  </p>
                </div>

                <p
                  className="
                    mt-1
                    text-[11px]
                    font-medium
                    leading-tight
                    text-[#b5adc1]
                    sm:text-[12px]
                  "
                >
                  Editorial guidance for this phase
                </p>
              </div>
            </div>

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
              <Feather
                size={11}
                className="text-[#cda940]"
              />

              <span
                className="
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#817b9a]
                "
              >
                Editorial
              </span>
            </div>
          </div>

          {/* 3 COLUMN EDITORIAL OBSERVATORY */}

          <div
            className="
              mt-4
              grid
              grid-cols-1
              gap-3
              md:grid-cols-3
            "
          >
            {editorial.overview && (
              <EditorialCard
                index={0}
                eyebrow="The Bigger Picture"
                icon={BookOpen}
                preview={getPreview(
                  editorial.overview,
                  125,
                )}
                onOpen={() =>
                  setActiveReading("overview")
                }
                variant="overview"
              />
            )}

            {editorial.prediction && (
              <EditorialCard
                index={1}
                eyebrow="Today's Guidance"
                icon={Sparkles}
                preview={getPreview(
                  editorial.prediction,
                  125,
                )}
                onOpen={() =>
                  setActiveReading("prediction")
                }
                variant="guidance"
              />
            )}

            {editorial.quote && (
              <EditorialCard
                index={2}
                eyebrow="Cosmic Perspective"
                icon={Quote}
                preview={getPreview(
                  editorial.quote,
                  115,
                )}
                onOpen={() =>
                  setActiveReading("quote")
                }
                variant="quote"
              />
            )}
          </div>

          {/* DYNAMIC GUIDANCE / PERSPECTIVE STRIPE */}

          {(hasGuidance || hasPerspective) && (
            <motion.div
              initial={{
                opacity: 0,
                y: 5,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.4,
                delay: 0.15,
              }}
              className="
                relative
                mt-3
                overflow-hidden
                rounded-[15px]
                border
                border-[#b66aa8]/15
                bg-gradient-to-r
                from-[#17103b]/75
                via-[#241242]/70
                to-[#120b35]/75
                px-3.5
                py-2.5
                sm:px-4
              "
            >
              <motion.div
                animate={{
                  x: [
                    "-120%",
                    "220%",
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatDelay: 6,
                  ease: "easeInOut",
                }}
                className="
                  pointer-events-none
                  absolute
                  left-0
                  top-0
                  h-px
                  w-1/4
                  bg-gradient-to-r
                  from-transparent
                  via-[#e8cd58]
                  to-transparent
                  opacity-50
                "
              />

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >
                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-2.5
                  "
                >
                  <span
                    className="
                      relative
                      flex
                      h-5
                      w-5
                      shrink-0
                      items-center
                      justify-center
                    "
                  >
                    <span
                      className="
                        absolute
                        inset-0
                        rounded-full
                        border
                        border-[#d7b84b]/25
                      "
                    />

                    <span
                      className="
                        h-1
                        w-1
                        rounded-full
                        bg-[#e5c64e]
                        shadow-[0_0_8px_#e5c64e]
                      "
                    />
                  </span>

                  <span
                    className="
                      truncate
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.19em]
                      text-[#a39ab8]
                      sm:text-[9px]
                    "
                  >
                    {stripeLabel}
                  </span>
                </div>

                <span
                  className="
                    hidden
                    shrink-0
                    text-[7px]
                    font-semibold
                    uppercase
                    tracking-[0.17em]
                    text-[#625b7c]
                    sm:block
                  "
                >
                  {stripeSubLabel}
                </span>
              </div>
            </motion.div>
          )}

          {/* FOOTER */}

          <div
            className="
              mt-3
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <div className="flex items-center gap-2">
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#e5c64e]
                  shadow-[0_0_9px_rgba(229,198,78,.5)]
                "
              />

              <span
                className="
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#77718d]
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
                text-[#77718d]
              "
            >
              <Sparkles
                size={9}
                className="text-[#b99a40]"
              />

              CMS Editorial
            </div>
          </div>
        </div>
      </section>

      {/* FULL READING MODAL */}

      <AnimatePresence>
        {activeContent &&
          activeReading && (
            <motion.div
              className="
                fixed
                inset-0
                z-[100]
                flex
                items-center
                justify-center
                p-4
                sm:p-6
              "
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            >
              <motion.button
                type="button"
                aria-label="Close reading"
                onClick={closeReading}
                className="
                  absolute
                  inset-0
                  cursor-default
                  bg-[#030218]/80
                  backdrop-blur-md
                "
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
              />

              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="editorial-reading-modal-title"
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: 12,
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.28,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="
                  relative
                  z-10
                  max-h-[85vh]
                  w-full
                  max-w-2xl
                  overflow-hidden
                  rounded-[22px]
                  border
                  border-[#8c6aaf]/25
                  bg-[#09072d]
                  shadow-[0_35px_120px_rgba(0,0,0,.45)]
                  sm:rounded-[24px]
                "
              >
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
                      -right-24
                      -top-24
                      h-64
                      w-64
                      rounded-full
                      bg-[#8c1682]/15
                      blur-[85px]
                    "
                  />

                  <div
                    className="
                      absolute
                      -left-24
                      bottom-[-120px]
                      h-56
                      w-56
                      rounded-full
                      bg-[#34136d]/20
                      blur-[80px]
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      opacity-[0.018]
                      [background-image:radial-gradient(rgba(255,255,255,.9)_1px,transparent_1px)]
                      [background-size:32px_32px]
                    "
                  />
                </div>

                <div
                  className="
                    absolute
                    left-5
                    right-5
                    top-0
                    h-[2px]
                    bg-gradient-to-r
                    from-transparent
                    via-[#e5c54d]
                    to-transparent
                    sm:left-6
                    sm:right-6
                  "
                />

                <div
                  className="
                    relative
                    flex
                    max-h-[85vh]
                    flex-col
                  "
                >
                  {/* MODAL HEADER */}

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-5
                      border-b
                      border-white/[0.07]
                      px-5
                      pb-5
                      pt-6
                      sm:px-7
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >
                      <div
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-[11px]
                          border
                          border-[#e2bd50]/20
                          bg-[#e2bd50]/[0.06]
                          text-[#e6c64e]
                        "
                      >
                        <activeContent.icon
                          size={16}
                          strokeWidth={1.6}
                        />
                      </div>

                      <div>
                        <p
                          className="
                            text-[8px]
                            font-bold
                            uppercase
                            tracking-[0.24em]
                            text-[#d8bd55]
                          "
                        >
                          {activeContent.label}
                        </p>

                        <h3
                          id="editorial-reading-modal-title"
                          className="
                            mt-1
                            font-serif
                            text-[1.35rem]
                            font-semibold
                            leading-tight
                            text-[#eee2b7]
                            sm:text-[1.45rem]
                          "
                        >
                          {activeContent.title}
                        </h3>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={closeReading}
                      aria-label="Close reading"
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/[0.08]
                        bg-white/[0.03]
                        text-[#817b9a]
                        transition
                        hover:border-[#d5b34a]/25
                        hover:bg-white/[0.06]
                        hover:text-[#e4d27b]
                      "
                    >
                      <X size={15} />
                    </button>
                  </div>

                  {/* MODAL CONTENT */}

                  <div
                    className="
                      overflow-y-auto
                      px-5
                      py-6
                      sm:px-7
                      sm:py-7
                    "
                  >
                    <div className="flex gap-4">
                      <div
                        className="
                          mt-1
                          w-[2px]
                          shrink-0
                          rounded-full
                          bg-gradient-to-b
                          from-[#e3c44e]
                          via-[#b55a9c]
                          to-transparent
                        "
                      />

                      <div className="min-w-0">
                        <p
                          className="
                            whitespace-pre-line
                            text-[14px]
                            leading-[1.9]
                            text-[#cbc4d3]
                            sm:text-[15px]
                            sm:leading-[1.95]
                          "
                        >
                          {activeContent.content}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* MODAL FOOTER */}

                  <div
                    className="
                      border-t
                      border-white/[0.06]
                      px-5
                      py-4
                      sm:px-7
                    "
                  >
                    <button
                      type="button"
                      onClick={closeReading}
                      className="
                        group
                        flex
                        w-full
                        items-center
                        justify-between
                        rounded-[13px]
                        border
                        border-[#d5b34a]/15
                        bg-[#d5b34a]/[0.045]
                        px-4
                        py-2.5
                        text-left
                        transition
                        hover:border-[#d5b34a]/25
                        hover:bg-[#d5b34a]/[0.07]
                      "
                    >
                      <span
                        className="
                          text-[8px]
                          font-bold
                          uppercase
                          tracking-[0.2em]
                          text-[#bca96a]
                        "
                      >
                        Close Reading
                      </span>

                      <ChevronRight
                        size={13}
                        className="
                          text-[#766e8b]
                          transition
                          group-hover:translate-x-0.5
                          group-hover:text-[#d9bd55]
                        "
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
      </AnimatePresence>
    </>
  );
}

//////////////////////////////////////////////////////////////
// EDITORIAL CARD
//////////////////////////////////////////////////////////////

interface EditorialCardProps {
  index: number;
  eyebrow: string;
  icon: React.ElementType;
  preview: string;
  onOpen: () => void;
  variant:
    | "overview"
    | "guidance"
    | "quote";
}

function EditorialCard({
  index,
  eyebrow,
  icon: Icon,
  preview,
  onOpen,
  variant,
}: EditorialCardProps) {
  const isGuidance =
    variant === "guidance";

  const isQuote =
    variant === "quote";

  return (
    <motion.button
      type="button"
      onClick={onOpen}
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
        amount: 0.15,
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
      }}
      whileHover={{
        y: -2,
      }}
      className={`
        group
        relative
        min-h-[168px]
        overflow-hidden
        rounded-[15px]
        border
        p-4
        text-left
        transition
        duration-300
        sm:min-h-[175px]
        sm:p-[17px]
        ${
          isGuidance
            ? `
              border-[#d5b34a]/18
              bg-gradient-to-br
              from-[#301944]/65
              via-[#17103b]/78
              to-[#0b082f]/85
            `
            : isQuote
              ? `
                border-[#b66aa8]/16
                bg-gradient-to-br
                from-[#241342]/65
                via-[#100b32]/80
                to-[#180d38]/74
              `
              : `
                border-white/[0.075]
                bg-gradient-to-br
                from-[#17113a]/68
                via-[#0d092f]/80
                to-[#110a35]/74
              `
        }
        hover:border-[#d5b34a]/25
        hover:shadow-[0_14px_40px_rgba(0,0,0,.15)]
      `}
    >
      <div
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute
          -right-14
          -top-16
          h-28
          w-28
          rounded-full
          blur-[48px]
          ${
            isGuidance
              ? "bg-[#a20b8b]/11"
              : isQuote
                ? "bg-[#d24fa4]/9"
                : "bg-[#6e48a5]/9"
          }
        `}
      />

      <motion.div
        animate={{
          x: [
            "-120%",
            "220%",
          ],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          repeatDelay: 7 + index,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          h-px
          w-1/3
          bg-gradient-to-r
          from-transparent
          via-[#e6ca53]
          to-transparent
          opacity-35
        "
      />

      <div
        className="
          relative
          flex
          h-full
          flex-col
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-3
          "
        >
          <div
            className="
              flex
              min-w-0
              items-center
              gap-2.5
            "
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
                border-[#d5b34a]/15
                bg-[#d5b34a]/[0.045]
                text-[#d9bf58]
              "
            >
              <Icon
                size={13}
                strokeWidth={1.7}
              />
            </span>

            <span
              className="
                truncate
                text-[8px]
                font-bold
                uppercase
                tracking-[0.17em]
                text-[#b8aec5]
                sm:text-[9px]
              "
            >
              {eyebrow}
            </span>
          </div>

          <ArrowUpRight
            size={14}
            className="
              shrink-0
              text-[#655e7d]
              transition
              duration-300
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
              group-hover:text-[#ddc458]
            "
          />
        </div>

        <p
          className={`
            mt-3.5
            line-clamp-3
            text-[13px]
            leading-[1.65]
            ${
              isQuote
                ? "font-serif italic text-[#c9bfd2]"
                : "text-[#bdb6c9]"
            }
          `}
        >
          {preview}
        </p>

        <div
          className="
            mt-auto
            flex
            items-center
            gap-2
            pt-4
          "
        >
          <span
            className="
              text-[7px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-[#8a819b]
              transition
              group-hover:text-[#d4bd62]
              sm:text-[8px]
            "
          >
            Read full
          </span>

          <span
            className="
              h-px
              w-7
              bg-[#d5b34a]/25
              transition-all
              duration-300
              group-hover:w-10
              group-hover:bg-[#d5b34a]/55
            "
          />
        </div>
      </div>
    </motion.button>
  );
}

