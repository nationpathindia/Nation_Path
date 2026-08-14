"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { independenceTheme } from "./IndependenceTheme";

type ChapterKey = "people" | "places" | "ideas" | "future";

type Chapter = {
  key: ChapterKey;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  images: string[];
  labels: string[];
  accent: string;
};

const {
  colors: {
    navy,
    saffron,
    green,
    white,
    ivory,
    chakra,
  },
} = independenceTheme;

const chapters: Chapter[] = [
  {
    key: "people",
    number: "01",
    eyebrow: "THE PEOPLE",
    title: "India moves because its people do.",
    description:
      "Farmers, makers, teachers, workers, students, entrepreneurs and families — millions of everyday journeys shaping the country.",
    images: [
      "/images/independence-day/close-up/people.avif",
      "/images/independence-day/close-up/people2.avif",
      "/images/independence-day/close-up/people3.avif",
      "/images/independence-day/close-up/people4.avif",
      "/images/independence-day/close-up/people5.avif",
      "/images/independence-day/close-up/people6.avif",
    ],
    labels: ["PEOPLE", "WORK", "COMMUNITIES", "GENERATIONS"],
    accent: saffron,
  },
  {
    key: "places",
    number: "02",
    eyebrow: "THE PLACES",
    title: "A country changes every few hundred kilometres.",
    description:
      "Mountains, coastlines, cities, villages and everything between them create thousands of different ways of living.",
    images: [
      "/images/independence-day/close-up/places.jpg",
      "/images/independence-day/close-up/places2.avif",
      "/images/independence-day/close-up/places3.avif",
      "/images/independence-day/close-up/places4.avif",
      "/images/independence-day/close-up/places5.avif",
      "/images/independence-day/close-up/places6.avif",
    ],
    labels: ["HIMALAYAS", "CITIES", "COAST", "HEARTLAND"],
    accent: green,
  },
  {
    key: "ideas",
    number: "03",
    eyebrow: "THE IDEAS",
    title: "Some of India's biggest journeys began as ideas.",
    description:
      "Science, engineering, digital infrastructure and entrepreneurship are expanding what India can build and imagine.",
    images: [
      "/images/independence-day/close-up/ideas.avif",
      "/images/independence-day/close-up/ideas1.avif",
      "/images/independence-day/close-up/ideas3.avif",
      "/images/independence-day/close-up/ideas4.avif",
      "/images/independence-day/close-up/ideas5.avif",
      "/images/independence-day/close-up/ideas6.avif",
    ],
    labels: ["SCIENCE", "DIGITAL", "ENGINEERING", "INNOVATION"],
    accent: navy,
  },
  {
    key: "future",
    number: "04",
    eyebrow: "THE NEXT INDIA",
    title: "The next India is already being built.",
    description:
      "Space, artificial intelligence, clean energy, advanced manufacturing and deep technology are opening a new chapter.",
    images: [
      "/images/independence-day/close-up/future1.avif",
      "/images/independence-day/close-up/future2.avif",
      "/images/independence-day/close-up/future3.avif",
      "/images/independence-day/close-up/future4.avif",
      "/images/independence-day/close-up/future5.avif",
      "/images/independence-day/close-up/future6.avif",
    ],
    labels: ["AI", "SPACE", "ENERGY", "DEEP TECH"],
    accent: saffron,
  },
];

/* =========================================================
   ASHOKA CHAKRA
   POSITION NEVER ANIMATES
   ROTATION ONLY
========================================================= */

function AshokaMini({
  size = "small",
  opacity = 1,
}: {
  size?: "small" | "large";
  opacity?: number;
}) {
  const dimension = size === "large" ? 28 : 20;

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: size === "large" ? 14 : 20,
        repeat: Infinity,
        ease: "linear",
      }}
      aria-hidden="true"
      className="relative flex shrink-0 items-center justify-center rounded-full border-2"
      style={{
        width: dimension,
        height: dimension,
        opacity,
        borderColor: chakra,
      }}
    >
      <div
        className="absolute rounded-full border"
        style={{
          width: dimension * 0.66,
          height: dimension * 0.66,
          borderColor: `${chakra}B3`,
        }}
      />

      {Array.from({ length: 12 }).map((_, index) => (
        <span
          key={index}
          className="absolute bottom-1/2 left-1/2 h-[42%] w-px origin-bottom"
          style={{
            backgroundColor: `${chakra}CC`,
            transform: `translateX(-50%) rotate(${index * 30}deg)`,
          }}
        />
      ))}

      <span
        className="absolute h-1 w-1 rounded-full"
        style={{
          backgroundColor: chakra,
        }}
      />
    </motion.div>
  );
}

/* =========================================================
   CHAPTER IMAGE
========================================================= */

function ChapterImage({
  chapter,
  activeImage,
  onChange,
  onComplete,
}: {
  chapter: Chapter;
  activeImage: number;
  onChange: (index: number) => void;
  onComplete: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const inView = useInView(ref, {
    once: false,
    amount: 0.3,
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 60,
    damping: 20,
  });

  const springY = useSpring(mouseY, {
    stiffness: 60,
    damping: 20,
  });

  const imageX = useTransform(springX, [-1, 1], [-5, 5]);
  const imageY = useTransform(springY, [-1, 1], [-4, 4]);

  useEffect(() => {
    if (!inView) return;

    const timer = window.setTimeout(() => {
      const next =
        activeImage + 1 < chapter.images.length
          ? activeImage + 1
          : 0;

      onChange(next);

      if (activeImage + 1 >= chapter.images.length) {
        onComplete();
      }
    }, 4300);

    return () => window.clearTimeout(timer);
  }, [
    activeImage,
    chapter.images.length,
    inView,
    onChange,
    onComplete,
  ]);

  const handleMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    if (!rect.width || !rect.height) return;

    mouseX.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1
    );

    mouseY.set(
      ((event.clientY - rect.top) / rect.height) * 2 - 1
    );
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="relative overflow-hidden rounded-[1.25rem] border bg-white shadow-[0_22px_70px_rgba(16,24,39,0.10)]"
      style={{
        borderColor: `${navy}1A`,
      }}
    >
      {/* IMAGE FRAME */}

      <div className="relative aspect-[16/9] overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.img
            key={`${chapter.key}-${activeImage}`}
            src={chapter.images[activeImage]}
            alt={`${chapter.eyebrow} — India`}
            initial={{
              opacity: 0,
              scale: 1.045,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.015,
            }}
            transition={{
              duration: 0.9,
              ease: "easeInOut",
            }}
            style={{
              x: imageX,
              y: imageY,
            }}
            draggable={false}
            className="absolute inset-[-8px] h-[calc(100%+16px)] w-[calc(100%+16px)] select-none object-cover"
          />
        </AnimatePresence>

        {/* CINEMATIC OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/[0.10] to-black/[0.015]" />

        {/* TOP TRICOLOR RAIL */}

        <div className="absolute left-0 right-0 top-0 grid h-[2px] grid-cols-3">
          <div style={{ backgroundColor: saffron }} />
          <div style={{ backgroundColor: white }} />
          <div style={{ backgroundColor: green }} />
        </div>

        {/* IMAGE META */}

        <div className="absolute left-4 right-4 top-4 flex items-center justify-between sm:left-5 sm:right-5 sm:top-5">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/25 text-[10px] font-black text-white backdrop-blur-md">
              {chapter.number}
            </span>

            <span
              className="h-px w-7"
              style={{
                backgroundColor: chapter.accent,
              }}
            />

            <span className="text-[9px] font-black tracking-[0.2em] text-white/85">
              {chapter.eyebrow}
            </span>
          </div>

          <span className="hidden text-[9px] font-bold tracking-[0.18em] text-white/55 sm:block">
            INDIA · 2026
          </span>
        </div>

        {/* IMAGE TITLE */}

        <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
          <p className="max-w-2xl text-[15px] font-bold leading-[1.15] tracking-[-0.01em] text-white sm:text-base lg:text-[17px]">
            {chapter.title}
          </p>
        </div>
      </div>

      {/* IMAGE PROGRESS */}

      <div className="flex gap-1.5 border-t border-black/[0.06] bg-white px-4 py-3.5 sm:px-5">
        {chapter.images.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`View ${chapter.eyebrow.toLowerCase()} image ${index + 1}`}
            aria-current={
              activeImage === index ? "true" : undefined
            }
            onClick={() => onChange(index)}
            className="relative h-[3px] flex-1 overflow-hidden rounded-full outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              backgroundColor: `${navy}1A`,
            }}
          >
            <motion.span
              initial={false}
              animate={{
                width:
                  activeImage === index
                    ? "100%"
                    : index < activeImage
                      ? "100%"
                      : "0%",
              }}
              transition={{
                duration:
                  activeImage === index ? 4.15 : 0.2,
                ease: "linear",
              }}
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                backgroundColor: chapter.accent,
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function TheIndiaYouDontSee() {
  const [activeChapter, setActiveChapter] =
    useState<ChapterKey>("people");

  const [activeImages, setActiveImages] = useState<
    Record<ChapterKey, number>
  >({
    people: 0,
    places: 0,
    ideas: 0,
    future: 0,
  });

  const current =
    chapters.find(
      (chapter) => chapter.key === activeChapter
    ) ?? chapters[0];

  const changeImage = (index: number) => {
    setActiveImages((state) => ({
      ...state,
      [activeChapter]: index,
    }));
  };

  const moveToNextChapter = () => {
    const currentIndex = chapters.findIndex(
      (chapter) => chapter.key === activeChapter
    );

    const nextIndex =
      (currentIndex + 1) % chapters.length;

    const nextChapter = chapters[nextIndex];

    setActiveChapter(nextChapter.key);

    setActiveImages((state) => ({
      ...state,
      [nextChapter.key]: 0,
    }));
  };

  const handleChapterChange = (key: ChapterKey) => {
    setActiveChapter(key);

    setActiveImages((state) => ({
      ...state,
      [key]: state[key],
    }));
  };

  return (
    <section
      className="relative overflow-hidden text-[#101827]"
      style={{
        backgroundColor: ivory,
        fontFamily: "inherit",
      }}
    >
      {/* =====================================================
          PREMIUM TRICOLOR ATMOSPHERE
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* SAFFRON */}

        <motion.div
          animate={{
            x: ["-15%", "10%", "-15%"],
            opacity: [0.035, 0.07, 0.035],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-[12%] -top-[12%] h-72 w-[65%] rounded-full blur-[105px]"
          style={{
            backgroundColor: saffron,
          }}
        />

        {/* GREEN */}

        <motion.div
          animate={{
            x: ["10%", "-12%", "10%"],
            opacity: [0.025, 0.055, 0.025],
          }}
          transition={{
            duration: 21,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-[12%] -right-[10%] h-72 w-[65%] rounded-full blur-[105px]"
          style={{
            backgroundColor: green,
          }}
        />

        {/* ASHOKA BLUE AURA */}

        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.012, 0.025, 0.012],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
          style={{
            backgroundColor: chakra,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-[4.5rem]">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex items-end justify-between gap-8">
          <div>
            <motion.div
              initial={{
                opacity: 0,
                x: -10,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              className="flex items-center gap-3"
            >
              <span
                className="relative h-[2px] w-9 overflow-hidden"
                style={{
                  backgroundColor: `${saffron}4D`,
                }}
              >
                <motion.span
                  animate={{
                    x: ["-100%", "250%"],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-y-0 left-0 w-1/2"
                  style={{
                    backgroundColor: saffron,
                  }}
                />
              </span>

              <span
                className="text-[10px] font-black tracking-[0.25em]"
                style={{
                  color: navy,
                }}
              >
                LOOK CLOSER
              </span>
            </motion.div>

            <motion.h2
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
                amount: 0.4,
              }}
              transition={{
                duration: 0.5,
              }}
              className="mt-3 max-w-3xl text-[2.35rem] font-black leading-[0.94] tracking-[-0.055em] sm:text-4xl lg:text-[4rem]"
            >
              India,{" "}
              <span style={{ color: saffron }}>
                Up Close.
              </span>
            </motion.h2>

            <motion.p
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
                amount: 0.4,
              }}
              transition={{
                duration: 0.45,
                delay: 0.05,
              }}
              className="mt-3 max-w-lg text-[14px] leading-6 text-[#101827]/55"
            >
              The numbers tell one story. Look closer,
              and another India appears.
            </motion.p>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <span className="text-[8px] font-black tracking-[0.2em] text-[#101827]/25">
              INDIA · 80
            </span>

            <AshokaMini
              size="small"
              opacity={0.8}
            />
          </div>
        </div>

        {/* =====================================================
            DATA STRIPE
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
            amount: 0.25,
          }}
          className="relative mt-7 overflow-hidden border-y"
          style={{
            borderColor: `${navy}1A`,
          }}
        >
          <div className="absolute left-0 right-0 top-0 grid h-[2px] grid-cols-3">
            <div style={{ backgroundColor: saffron }} />
            <div style={{ backgroundColor: white }} />
            <div style={{ backgroundColor: green }} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4">
            {[
              ["1.4B+", "PEOPLE"],
              ["28", "STATES"],
              ["8", "UNION TERRITORIES"],
              ["80", "YEARS · 1947 → 2026"],
            ].map(([value, label], index) => (
              <div
                key={label}
                className={`relative px-4 py-3.5 sm:px-5 ${
                  index !== 3
                    ? "border-b sm:border-b-0 sm:border-r"
                    : ""
                }`}
                style={{
                  borderColor: `${navy}1A`,
                }}
              >
                <div className="text-xl font-black tracking-[-0.04em] sm:text-2xl">
                  {value}
                </div>

                <div className="mt-1 text-[8px] font-black tracking-[0.18em] text-[#101827]/35">
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* ORANGE SWEEP */}

          <motion.div
            animate={{
              left: ["-30%", "130%"],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-0 h-[2px] w-[30%]"
            style={{
              background: `linear-gradient(to right, transparent, ${saffron}, transparent)`,
            }}
          />

          {/* GREEN SWEEP */}

          <motion.div
            animate={{
              left: ["130%", "-30%"],
            }}
            transition={{
              duration: 6.5,
              repeat: Infinity,
              ease: "linear",
              delay: 1.2,
            }}
            className="absolute bottom-0 h-[2px] w-[30%]"
            style={{
              background: `linear-gradient(to right, transparent, ${green}, transparent)`,
            }}
          />
        </motion.div>

        {/* =====================================================
            CHAPTER RAIL
        ====================================================== */}

        <div className="mt-7">
          <div className="mb-2 flex items-center justify-between gap-4">
            <span className="text-[8px] font-black tracking-[0.24em] text-[#101827]/28">
              FOUR PERSPECTIVES
            </span>

            <span className="text-[8px] font-black tracking-[0.18em] text-[#101827]/22">
              LOOK · FEEL · MOVE
            </span>
          </div>

          <div
            className="relative flex h-11 overflow-hidden rounded-full border p-1 shadow-[0_8px_24px_rgba(16,24,39,0.045)] backdrop-blur-sm"
            style={{
              borderColor: `${navy}1A`,
              backgroundColor: "#FFFDF8BF",
            }}
          >
            {chapters.map((chapter) => {
              const active =
                chapter.key === activeChapter;

              return (
                <button
                  key={chapter.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    handleChapterChange(chapter.key)
                  }
                  className="group relative flex flex-1 items-center justify-center overflow-hidden rounded-full outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                >
                  {active && (
                    <motion.span
                      layoutId="chapterPill"
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 28,
                      }}
                      className="absolute inset-0 rounded-full border border-black/[0.05] shadow-[0_3px_12px_rgba(16,24,39,0.08)]"
                      style={{
                        background: `linear-gradient(90deg, ${saffron}2E, rgba(255,255,255,0.95), ${green}2E)`,
                      }}
                    />
                  )}

                  {active && (
                    <motion.span
                      layoutId="chapterTopAccent"
                      className="absolute left-3 right-1/2 top-0 h-[2px] rounded-full"
                      style={{
                        backgroundColor: saffron,
                      }}
                    />
                  )}

                  {active && (
                    <motion.span
                      layoutId="chapterBottomAccent"
                      className="absolute bottom-0 left-1/2 right-3 h-[2px] rounded-full"
                      style={{
                        backgroundColor: green,
                      }}
                    />
                  )}

                  <span
                    className={`relative z-10 flex items-center gap-2 text-[9px] font-black tracking-[0.14em] transition ${
                      active
                        ? "text-[#101827]"
                        : "text-[#101827]/35 group-hover:text-[#101827]/60"
                    }`}
                  >
                    <span
                      className="text-[10px]"
                      style={
                        active
                          ? {
                              color: chapter.accent,
                            }
                          : undefined
                      }
                    >
                      {chapter.number}
                    </span>

                    <span className="hidden sm:inline">
                      {chapter.eyebrow}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            MAIN STORY
        ====================================================== */}

        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -8,
            }}
            transition={{
              duration: 0.38,
              ease: "easeOut",
            }}
            className="mt-6"
          >
            <div className="grid gap-6 lg:grid-cols-[0.52fr_1.48fr] lg:items-center">
              {/* STORY */}

              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-black tracking-[0.18em]"
                    style={{
                      color: current.accent,
                    }}
                  >
                    {current.number}
                  </span>

                  <span
                    className="h-px w-5"
                    style={{
                      backgroundColor: `${navy}26`,
                    }}
                  />

                  <span className="text-[8px] font-black tracking-[0.2em] text-[#101827]/35">
                    {current.eyebrow}
                  </span>
                </div>

                <h3 className="mt-3 max-w-md text-[1.85rem] font-black leading-[1.02] tracking-[-0.045em] sm:text-[2.1rem] lg:text-[2.45rem]">
                  {current.title}
                </h3>

                <p className="mt-3 max-w-md text-[14px] leading-6 text-[#101827]/52">
                  {current.description}
                </p>

                {/* LABELS */}

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {current.labels.map((label) => (
                    <span
                      key={label}
                      className="rounded-full border bg-white/60 px-2.5 py-1 text-[8px] font-black tracking-[0.13em] text-[#101827]/40"
                      style={{
                        borderColor: `${navy}1A`,
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </div>

                {/* EXPLORE */}

                <div className="mt-5 flex items-center gap-2">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full border bg-white/50"
                    style={{
                      borderColor: `${current.accent}55`,
                      color: current.accent,
                    }}
                  >
                    <ArrowUpRight size={13} />
                  </span>

                  <span className="text-[8px] font-black tracking-[0.2em] text-[#101827]/28">
                    EXPLORE THIS INDIA
                  </span>
                </div>
              </div>

              {/* IMAGE */}

              <div className="order-1 lg:order-2">
                <ChapterImage
                  chapter={current}
                  activeImage={
                    activeImages[current.key]
                  }
                  onChange={changeImage}
                  onComplete={moveToNextChapter}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* =====================================================
          FINAL TRICOLOR LINE

          CHAKRA:
          - FIXED CENTER
          - NO X/Y ANIMATION
          - ROTATION ONLY
      ====================================================== */}

      <div className="relative mt-0 h-8 overflow-hidden">
        {/* SUBTLE CENTER GUIDE */}

        <div className="absolute left-0 right-0 top-1/2 h-px bg-black/[0.035]" />

        {/* MAIN TRICOLOR LINE */}

        <div className="absolute left-0 right-0 top-1/2 h-[7px] -translate-y-1/2 overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-3">
            <div style={{ backgroundColor: saffron }} />
            <div style={{ backgroundColor: "#FFFDF8" }} />
            <div style={{ backgroundColor: green }} />
          </div>

          {/* ORANGE MOVING LIGHT */}

          <motion.div
            animate={{
              left: ["-25%", "125%"],
            }}
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-0 h-full w-[28%]"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.9), transparent)",
            }}
          />

          {/* GREEN MOVING LIGHT */}

          <motion.div
            animate={{
              left: ["125%", "-25%"],
            }}
            transition={{
              duration: 5.8,
              repeat: Infinity,
              ease: "linear",
              delay: 1,
            }}
            className="absolute top-0 h-full w-[28%]"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.9), transparent)",
            }}
          />
        </div>

        {/* CENTER ASHOKA CHAKRA */}

        <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full shadow-[0_0_14px_rgba(250,247,241,0.98)]"
            style={{
              backgroundColor: `${ivory}F7`,
            }}
          >
            <AshokaMini
              size="large"
              opacity={1}
            />
          </div>
        </div>
      </div>
    </section>
  );
}