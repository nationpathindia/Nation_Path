"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  TrainFront,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { independenceTheme } from "./IndependenceTheme";

type Transformation = {
  title: string;
  category: string;
  statement: string;
  names: string[];
};

type Milestone = {
  year: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  accent: "saffron" | "chakra" | "green";
  tag?: string;
  transformation: Transformation;
};

const milestones: Milestone[] = [
  {
    year: "1947",
    eyebrow: "THE BEGINNING",
    title: "A nation begins its journey.",
    description:
      "India emerged as an independent nation, beginning a new chapter built around democracy, institutions and the promise of a shared future.",
    image: "/images/independence-day/journey/india-1947.jpg",
    imageAlt: "India in 1947",
    accent: "saffron",
    tag: "FOUNDATION",
    transformation: {
      title: "A nation takes shape.",
      category: "NATION BUILDING",
      statement:
        "Freedom became the starting point for building institutions, infrastructure and a democratic nation.",
      names: [
        "Jawaharlal Nehru",
        "Sardar Patel",
        "B.R. Ambedkar",
        "Rajendra Prasad",
      ],
    },
  },
  {
    year: "1950",
    eyebrow: "THE REPUBLIC",
    title: "A Constitution. A Republic.",
    description:
      "India became a republic, establishing a constitutional framework that would guide the world's largest democracy through generations of change.",
    image: "/images/independence-day/journey/india-1947.jpg",
    imageAlt: "India at the beginning of the Republic",
    accent: "chakra",
    tag: "DEMOCRACY",
    transformation: {
      title: "Democracy gets its foundation.",
      category: "REPUBLIC",
      statement:
        "The Constitution transformed independence into a working democratic republic built on rights, institutions and the rule of law.",
      names: [
        "B.R. Ambedkar",
        "Rajendra Prasad",
        "Jawaharlal Nehru",
        "Sardar Patel",
      ],
    },
  },
  {
    year: "1951–70s",
    eyebrow: "BUILDING INDIA",
    title: "Building the foundations.",
    description:
      "Institutions, industries, dams, universities and scientific organisations helped lay the foundations of a modern Indian economy.",
    image: "/images/independence-day/journey/building-india.jpg",
    imageAlt: "Building modern India",
    accent: "green",
    tag: "ECONOMY",
    transformation: {
      title: "India builds its foundations.",
      category: "INDUSTRY • SCIENCE",
      statement:
        "Dams, industries, universities and scientific institutions created the foundations of a more self-reliant India.",
      names: [
        "Homi J. Bhabha",
        "Vikram Sarabhai",
        "Verghese Kurien",
        "M. Visvesvaraya",
      ],
    },
  },
  {
    year: "1975–80",
    eyebrow: "INDIA ENTERS SPACE",
    title: "Looking beyond Earth.",
    description:
      "India's early space programme transformed scientific ambition into a national capability, beginning a remarkable journey from experimental satellites to planetary exploration.",
    image: "/images/independence-day/journey/aryabhata.jpg",
    imageAlt: "Aryabhata satellite",
    accent: "chakra",
    tag: "SCIENCE",
    transformation: {
      title: "India looks beyond Earth.",
      category: "SPACE • SCIENCE",
      statement:
        "India moved from scientific ambition to national capability, building the institutions that would take the country into space.",
      names: [
        "Vikram Sarabhai",
        "Satish Dhawan",
        "A.P.J. Abdul Kalam",
        "ISRO",
      ],
    },
  },
  {
    year: "1991",
    eyebrow: "OPENING UP",
    title: "A new economic chapter.",
    description:
      "Economic reforms opened India to greater competition, investment and global markets — reshaping industries, aspirations and the trajectory of growth.",
    image: "/images/independence-day/journey/india-1991.jpg",
    imageAlt: "India during the economic transformation of the 1990s",
    accent: "saffron",
    tag: "ECONOMY",
    transformation: {
      title: "India opens to the world.",
      category: "ECONOMY",
      statement:
        "Economic reforms shifted India from a tightly controlled economy towards competition, investment and global markets.",
      names: [
        "P.V. Narasimha Rao",
        "Manmohan Singh",
        "Montek Singh Ahluwalia",
        "Amar Nath Varma",
      ],
    },
  },
  {
    year: "2000s",
    eyebrow: "CONNECTED INDIA",
    title: "The country goes digital.",
    description:
      "Telecom, software and internet access connected millions of Indians to new markets, new ideas and new possibilities.",
    image: "/images/independence-day/journey/connected-india.jpg",
    imageAlt: "Connected India and digital transformation",
    accent: "chakra",
    tag: "TECHNOLOGY",
    transformation: {
      title: "India becomes connected.",
      category: "TELECOM • DIGITAL",
      statement:
        "Telecom, software and the internet transformed how Indians communicate, work, build businesses and access services.",
      names: [
        "Sam Pitroda",
        "Nandan Nilekani",
        "Azim Premji",
        "IT industry",
      ],
    },
  },
  {
    year: "2008",
    eyebrow: "TO THE MOON",
    title: "India reaches for the Moon.",
    description:
      "Chandrayaan-1 marked a defining moment in India's space journey, demonstrating that the country could undertake ambitious missions beyond Earth.",
    image: "/images/independence-day/journey/chandrayaan-1.webp",
    imageAlt: "Chandrayaan-1 mission",
    accent: "saffron",
    tag: "SPACE",
    transformation: {
      title: "India reaches the Moon.",
      category: "SPACE",
      statement:
        "Chandrayaan-1 turned India's space programme into a planetary exploration capability and strengthened its place in global space science.",
      names: [
        "ISRO",
        "Mylswamy Annadurai",
        "G. Madhavan Nair",
        "A.P.J. Abdul Kalam",
      ],
    },
  },
  {
    year: "2013",
    eyebrow: "TO MARS",
    title: "The Mars moment.",
    description:
      "Mangalyaan carried India's ambitions to Mars and became a symbol of scientific ingenuity, persistence and efficient engineering.",
    image: "/images/independence-day/journey/mangalyaan.jpg",
    imageAlt: "Mangalyaan Mars Orbiter Mission",
    accent: "chakra",
    tag: "MARS",
    transformation: {
      title: "India reaches Mars.",
      category: "SPACE • MARS",
      statement:
        "Mangalyaan showed that India could execute an ambitious interplanetary mission with remarkable engineering efficiency.",
      names: [
        "ISRO",
        "K. Radhakrishnan",
        "M. Annadurai",
        "Mangalyaan",
      ],
    },
  },
  {
    year: "2023",
    eyebrow: "NEW SPACE ERA",
    title: "A historic lunar landing.",
    description:
      "Chandrayaan-3's successful soft landing near the Moon's south polar region marked another milestone in India's space exploration story.",
    image: "/images/independence-day/journey/chandrayaan-3.jpg",
    imageAlt: "Chandrayaan-3 lunar mission",
    accent: "green",
    tag: "MOON",
    transformation: {
      title: "India lands where few have.",
      category: "LUNAR EXPLORATION",
      statement:
        "Chandrayaan-3 demonstrated precision landing capability and opened another chapter in India's lunar exploration.",
      names: [
        "ISRO",
        "S. Somanath",
        "P. Veeramuthuvel",
        "N. Biren Singh",
      ],
    },
  },
  {
    year: "2026",
    eyebrow: "THE NEXT CHAPTER",
    title: "From achievement to ambition.",
    description:
      "India enters its 80th year of independence with a rapidly changing economy, expanding technology ecosystem and increasingly ambitious scientific goals.",
    image: "/images/independence-day/journey/aditya-l1.jpg",
    imageAlt: "Aditya-L1 solar mission",
    accent: "saffron",
    tag: "2026",
    transformation: {
      title: "From achievement to ambition.",
      category: "NEXT FRONTIER",
      statement:
        "India's next chapter stretches from human spaceflight and solar science to deeper technological and scientific capability.",
      names: [
        "ISRO",
        "Gaganyaan",
        "Aditya-L1",
        "India's next generation",
      ],
    },
  },
];

const accentMap = {
  saffron: "#FF9933",
  chakra: "#163C80",
  green: "#138808",
};

/* ============================================================
   MINI LOCOMOTIVE
============================================================ */

function TrainIcon({
  active,
  color,
}: {
  active: boolean;
  color: string;
}) {
  return (
    <motion.div
      animate={
        active
          ? {
              y: [0, -2, 0],
              rotate: [0, 0.4, -0.25, 0],
            }
          : {
              y: 0,
              rotate: 0,
            }
      }
      transition={{
        duration: 0.55,
        repeat: active ? Infinity : 0,
        ease: "easeInOut",
      }}
      className="relative h-[62px] w-[96px]"
    >
      {/* moving shadow */}
      <motion.div
        animate={
          active
            ? {
                opacity: [0.14, 0.3, 0.14],
                scaleX: [0.8, 1, 0.8],
              }
            : {
                opacity: 0.14,
              }
        }
        transition={{
          duration: 1.1,
          repeat: active ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-[8px] h-3 w-[78px] rounded-full blur-xl"
        style={{
          backgroundColor: color,
        }}
      />

      {/* steam */}
      <motion.div
        animate={
          active
            ? {
                opacity: [0.08, 0.26, 0],
                x: [0, 3, 8],
                y: [0, -5, -10],
                scale: [0.7, 1, 1.25],
              }
            : {
                opacity: 0,
              }
        }
        transition={{
          duration: 1.5,
          repeat: active ? Infinity : 0,
          ease: "easeOut",
        }}
        className="absolute left-[10px] top-[-5px] h-4 w-4 rounded-full bg-[#163C80]/20 blur-[3px]"
      />

      {/* chimney */}
      <div className="absolute left-[27px] top-[7px] z-10">
        <div className="h-2 w-4 rounded-t-sm bg-[#102F68]" />
        <div className="mx-auto h-4 w-2 bg-[#102F68]" />
      </div>

      {/* cabin */}
      <div className="absolute left-[19px] top-[17px] z-10 h-[26px] w-[33px] rounded-t-[6px] bg-[#102F68]">
        <div className="absolute left-[4px] top-[5px] h-[9px] w-[9px] rounded-[2px] bg-white/80" />
        <div className="absolute left-[18px] top-[5px] h-[9px] w-[9px] rounded-[2px] bg-white/80" />

        <div
          className="absolute -right-[3px] bottom-[4px] h-[5px] w-[5px] rounded-full"
          style={{
            backgroundColor: color,
          }}
        />
      </div>

      {/* body */}
      <div
        className="absolute bottom-[14px] left-[4px] z-20 h-[21px] w-[80px] rounded-[5px] border-2 bg-[#102F68]"
        style={{
          borderColor: color,
        }}
      >
        <div
          className="absolute -right-[8px] top-[4px] h-[12px] w-[9px] rounded-r-[5px]"
          style={{
            backgroundColor: color,
          }}
        />

        <div
          className="absolute left-[6px] right-[9px] top-[6px] h-[2px] rounded-full opacity-80"
          style={{
            backgroundColor: color,
          }}
        />

        <motion.div
          animate={
            active
              ? {
                  opacity: [0.45, 1, 0.45],
                  scale: [0.8, 1.15, 0.8],
                }
              : {
                  opacity: 0.45,
                }
          }
          transition={{
            duration: 0.75,
            repeat: active ? Infinity : 0,
          }}
          className="absolute -right-[10px] top-[3px] h-[6px] w-[6px] rounded-full"
          style={{
            backgroundColor: "#FFF8EA",
            boxShadow: `0 0 14px ${color}`,
          }}
        />
      </div>

      {/* front light */}
      <div
        className="absolute bottom-[20px] right-[-6px] z-30 h-[4px] w-[9px] rounded-full"
        style={{
          backgroundColor: color,
        }}
      />

      {/* wheels */}
      <div className="absolute bottom-[5px] left-[14px] z-30 flex gap-[32px]">
        {[0, 1].map((wheel) => (
          <motion.span
            key={wheel}
            animate={
              active
                ? {
                    rotate: 360,
                  }
                : {
                    rotate: 0,
                  }
            }
            transition={{
              duration: 0.55,
              repeat: active ? Infinity : 0,
              ease: "linear",
            }}
            className="relative h-[14px] w-[14px] rounded-full border-2 border-[#102F68] bg-[#F5F1E8]"
          >
            <span
              className="absolute left-1/2 top-1/2 h-[4px] w-[4px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                backgroundColor: color,
              }}
            />
          </motion.span>
        ))}
      </div>

      <div
        className="absolute bottom-[1px] left-0 h-[2px] w-[90px] rounded-full opacity-25"
        style={{
          backgroundColor: color,
        }}
      />
    </motion.div>
  );
}

/* ============================================================
   STATION
============================================================ */

function Station({
  milestone,
  index,
  active,
  onClick,
}: {
  milestone: Milestone;
  index: number;
  active: boolean;
  onClick: () => void;
}) {
  const accent = accentMap[milestone.accent];

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Go to ${milestone.year}: ${milestone.title}`}
      className="group relative flex min-w-[96px] flex-col items-center outline-none"
    >
      <motion.span
        animate={{
          scale: active ? 1.3 : 1,
        }}
        transition={{
          duration: 0.3,
        }}
        className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-[3px] border-[#F5F1E8]"
        style={{
          backgroundColor: active ? accent : "#C9C5BB",
          boxShadow: active
            ? `0 0 0 5px ${accent}18, 0 0 20px ${accent}35`
            : "none",
        }}
      />

      {/* active pulse */}
      {active && (
        <motion.span
          initial={{
            opacity: 0.6,
            scale: 0.8,
          }}
          animate={{
            opacity: 0,
            scale: 2.25,
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="pointer-events-none absolute top-[-3px] h-5 w-5 rounded-full"
          style={{
            border: `1px solid ${accent}`,
          }}
        />
      )}

      <span
        className={`mt-3 text-[11px] font-black tracking-[0.12em] transition-all sm:text-xs ${
          active
            ? "scale-105 text-[#102F68]"
            : "text-slate-400"
        }`}
      >
        {milestone.year}
      </span>

      <span
        className={`mt-1 max-w-[96px] text-center text-[8px] font-black tracking-[0.12em] transition-opacity sm:text-[9px] ${
          active
            ? "opacity-75"
            : "opacity-30 group-hover:opacity-60"
        }`}
        style={{
          color: active ? accent : "#64748B",
        }}
      >
        {milestone.tag}
      </span>

      <span className="sr-only">
        Station {index + 1}
      </span>
    </button>
  );
}

/* ============================================================
   STATION STORY
============================================================ */

function StationStory({
  milestone,
  index,
  nextMilestone,
  onNext,
}: {
  milestone: Milestone;
  index: number;
  nextMilestone: Milestone | null;
  onNext: () => void;
}) {
  const accent = accentMap[milestone.accent];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${milestone.year}-${milestone.title}`}
        initial={{
          opacity: 0,
          y: 18,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: -12,
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]"
      >
        {/* MAIN STORY */}
        <div className="overflow-hidden rounded-[1.75rem] border border-[#102F68]/8 bg-white shadow-[0_20px_60px_rgba(16,47,104,0.08)]">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-[280px] overflow-hidden sm:min-h-[340px] lg:min-h-[390px]">
              <motion.img
                initial={{
                  scale: 1.08,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.8,
                }}
                src={milestone.image}
                alt={milestone.imageAlt}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="absolute inset-0 bg-gradient-to-t from-[#07162F]/75 via-[#07162F]/10 to-transparent"
              />

              <div className="absolute left-5 top-5 flex items-center gap-2">
                <motion.span
                  animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                  }}
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: accent,
                    boxShadow: `0 0 16px ${accent}`,
                  }}
                />

                <span className="text-[9px] font-black tracking-[0.2em] text-white/70">
                  STATION{" "}
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="absolute bottom-5 left-5">
                <p className="text-[9px] font-black tracking-[0.18em] text-white/55">
                  {milestone.tag}
                </p>

                <p className="mt-1 text-4xl font-black tracking-[-0.06em] text-white sm:text-5xl">
                  {milestone.year}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-10">
              <motion.div
                animate={{
                  width: [48, 68, 48],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-5 h-1.5 rounded-full"
                style={{
                  backgroundColor: accent,
                }}
              />

              <p
                className="text-[11px] font-black tracking-[0.2em]"
                style={{
                  color: accent,
                }}
              >
                {milestone.eyebrow}
              </p>

              <h3 className="mt-3 max-w-xl text-3xl font-black leading-[1.03] tracking-[-0.05em] text-[#102F68] sm:text-4xl lg:text-[2.65rem]">
                {milestone.title}
              </h3>

              <p className="mt-5 max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                {milestone.description}
              </p>

              <div className="mt-6 flex items-center gap-3">
                <span
                  className="rounded-full border px-3 py-1.5 text-[9px] font-black tracking-[0.15em]"
                  style={{
                    borderColor: `${accent}35`,
                    color: accent,
                    backgroundColor: `${accent}08`,
                  }}
                >
                  {milestone.tag}
                </span>

                <span className="text-[10px] font-semibold text-slate-400">
                  India&apos;s journey
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* NEXT STATION */}
        <button
          type="button"
          onClick={nextMilestone ? onNext : undefined}
          className="group relative min-h-[230px] overflow-hidden rounded-[1.75rem] border border-[#163C80]/10 bg-[#FFFDF8] p-6 text-left shadow-[0_18px_50px_rgba(16,47,104,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(16,47,104,0.1)] sm:p-7 lg:min-h-[390px]"
        >
          {/* living Tiranga top stripe */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] overflow-hidden">
            <motion.div
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3.8,
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

          {/* green stripe */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 overflow-hidden bg-[#138808]/20">
            <motion.div
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 4.6,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-[#138808] to-transparent"
            />
          </div>

          <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-px bg-[#163C80]/[0.035]" />

          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#FF9933]/[0.09] blur-3xl"
          />

          <motion.div
            animate={{
              scale: [1.08, 1, 1.08],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-[#138808]/[0.08] blur-3xl"
          />

          {/* chakra watermark */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
            className="pointer-events-none absolute -bottom-8 -right-8 opacity-[0.045]"
          >
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-[2px] border-[#163C80]">
              <div className="h-24 w-24 rounded-full border border-[#163C80]" />

              <div className="absolute h-[110px] w-px bg-[#163C80]" />
              <div className="absolute h-px w-[110px] bg-[#163C80]" />

              <div className="absolute h-[78px] w-px rotate-45 bg-[#163C80]" />
              <div className="absolute h-px w-[78px] rotate-45 bg-[#163C80]" />

              <div className="absolute h-[78px] w-px -rotate-45 bg-[#163C80]" />
              <div className="absolute h-px w-[78px] -rotate-45 bg-[#163C80]" />

              <div className="h-3 w-3 rounded-full bg-[#163C80]" />
            </div>
          </motion.div>

          <div className="relative flex h-full flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-black tracking-[0.2em] text-[#138808]">
                  NEXT STATION
                </p>

                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#163C80]/10 bg-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight
                    size={14}
                    className="text-[#163C80]/55"
                  />
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <motion.div
                  animate={{
                    y: [0, -2, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#163C80]/10 bg-white shadow-sm"
                >
                  <TrainFront
                    size={24}
                    strokeWidth={1.8}
                    className="text-[#163C80]"
                  />

                  <motion.span
                    animate={{
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                    }}
                    className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#FF9933]"
                  />

                  <span className="absolute bottom-1.5 left-2 h-1 w-5 rounded-full bg-[#138808]/60" />
                </motion.div>

                <div>
                  <p className="text-2xl font-black tracking-[-0.05em] text-[#102F68] sm:text-[1.7rem]">
                    {nextMilestone
                      ? nextMilestone.year
                      : "END"}
                  </p>

                  <p
                    className="mt-0.5 text-[9px] font-black tracking-[0.16em]"
                    style={{
                      color: nextMilestone
                        ? accentMap[nextMilestone.accent]
                        : "#138808",
                    }}
                  >
                    {nextMilestone?.tag ??
                      "THE JOURNEY CONTINUES"}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mt-9">
              <p className="max-w-[230px] text-xl font-black leading-[1.05] tracking-[-0.035em] text-[#102F68] sm:text-[1.35rem]">
                {nextMilestone
                  ? nextMilestone.title
                  : "The journey continues."}
              </p>

              <div className="mt-5 flex items-center gap-2">
                <motion.span
                  animate={{
                    width: [28, 45, 28],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="h-px bg-[#FF9933]"
                />

                <span className="text-[9px] font-black tracking-[0.16em] text-[#102F68]/40">
                  BOARD THE NEXT MOMENT
                </span>

                <ArrowRight
                  size={12}
                  className="text-[#138808]/70 transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </div>
          </div>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

/* ============================================================
   MAIN SECTION
============================================================ */

export default function IndiaInOneMinute() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.2,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const trainProgress = useMotionValue(0);

  const springProgress = useSpring(trainProgress, {
    stiffness: 110,
    damping: 22,
    mass: 0.65,
  });

  const trainLeft = useTransform(
    springProgress,
    [0, 1],
    ["0%", "100%"]
  );

  const activeMilestone = milestones[activeIndex];

  const nextIndex =
    activeIndex < milestones.length - 1
      ? activeIndex + 1
      : null;

  const nextMilestone =
    nextIndex !== null
      ? milestones[nextIndex]
      : null;

  useEffect(() => {
    if (!isAutoPlaying || !isInView) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        if (current >= milestones.length - 1) {
          return 0;
        }

        return current + 1;
      });
    }, 5200);

    return () => {
      window.clearInterval(timer);
    };
  }, [isAutoPlaying, isInView]);

  useEffect(() => {
    const progress =
      milestones.length <= 1
        ? 0
        : activeIndex / (milestones.length - 1);

    trainProgress.set(progress);
  }, [activeIndex, trainProgress]);

  const goTo = (index: number) => {
    const nextIndex = Math.max(
      0,
      Math.min(index, milestones.length - 1)
    );

    setIsAutoPlaying(false);
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    goTo(
      activeIndex === 0
        ? milestones.length - 1
        : activeIndex - 1
    );
  };

  const next = () => {
    goTo(
      activeIndex === milestones.length - 1
        ? 0
        : activeIndex + 1
    );
  };

  const progressPercentage =
    milestones.length <= 1
      ? 100
      : ((activeIndex + 1) / milestones.length) * 100;

  return (
    <section
      ref={sectionRef}
      id="india-in-one-minute"
      className="relative overflow-hidden bg-[#F5F1E8] py-24 sm:py-28 lg:py-32"
    >
      {/* ======================================================
          AMBIENT TRIRANGA ATMOSPHERE
      ======================================================= */}

      <motion.div
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-64 top-0 h-[600px] w-[600px] rounded-full bg-[#FF9933]/[0.055] blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1.05, 1, 1.05],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-64 bottom-0 h-[600px] w-[600px] rounded-full bg-[#138808]/[0.055] blur-3xl"
      />

      {/* subtle chakra atmosphere */}
      <div className="pointer-events-none absolute left-1/2 top-[30%] h-[420px] w-[420px] -translate-x-1/2 rounded-full border border-[#163C80]/[0.025]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* ====================================================
            HEADER
        ===================================================== */}

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <motion.p
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
              className="text-xs font-black tracking-[0.24em] text-[#FF9933]"
            >
              THE JOURNEY
            </motion.p>

            <motion.h2
              initial={{
                opacity: 0,
                y: 18,
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
                duration: 0.6,
              }}
              className="mt-3 max-w-4xl text-5xl font-black tracking-[-0.06em] text-[#102F68] sm:text-6xl lg:text-7xl"
            >
              India{" "}
              <span className="text-[#FF9933]">
                in one minute.
              </span>
            </motion.h2>

            <motion.p
              initial={{
                opacity: 0,
                y: 14,
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
                duration: 0.6,
                delay: 0.08,
              }}
              className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg"
            >
              Board the journey through modern India.
              At every station, the train stops — and a
              moment in the nation&apos;s story comes alive.
            </motion.p>
          </div>

          <div className="lg:justify-self-end">
            <motion.div
              initial={{
                opacity: 0,
                x: 20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
              className="flex items-center gap-4"
            >
              <motion.div
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="h-12 w-1 rounded-full bg-gradient-to-b from-[#FF9933] via-[#163C80] to-[#138808] bg-[length:100%_200%]"
              />

              <div>
                <p className="text-2xl font-black tracking-tight text-[#102F68] sm:text-3xl">
                  1947 → 2026
                </p>

                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  The India journey
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ====================================================
            RAILWAY
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mt-16 sm:mt-20"
        >
          {/* DESKTOP */}

          <div className="relative hidden h-[92px] md:block">
            <div className="absolute left-[45px] right-[45px] top-[10px]">
              {/* rail base */}
              <div className="absolute left-0 right-0 top-[10px] h-[4px] rounded-full bg-[#102F68]/10" />

              {/* tricolor active rail */}
              <motion.div
                className="absolute left-0 top-[10px] h-[4px] overflow-hidden rounded-full"
                animate={{
                  width: `${
                    (activeIndex /
                      (milestones.length - 1)) *
                    100
                  }%`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 24,
                }}
                style={{
                  background:
                    independenceTheme.gradients
                      .tricolor,
                }}
              >
                <motion.div
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/80 to-transparent blur-[1px]"
                />
              </motion.div>

              {/* second rail */}
              <div className="absolute left-0 right-0 top-[20px] h-px bg-[#102F68]/10" />

              {/* sleepers */}
              <div className="absolute left-0 right-0 top-[7px] flex justify-between opacity-20">
                {milestones.map((milestone) => (
                  <span
                    key={`sleeper-${milestone.year}`}
                    className="h-7 w-px bg-[#102F68]"
                  />
                ))}
              </div>
            </div>

            <div className="relative z-10 flex items-start justify-between">
              {milestones.map((milestone, index) => (
                <Station
                  key={`${milestone.year}-${milestone.title}`}
                  milestone={milestone}
                  index={index}
                  active={activeIndex === index}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>

            <motion.div
              className="pointer-events-none absolute top-[-38px] z-30"
              style={{
                left: trainLeft,
                translateX: "-50%",
              }}
            >
              <TrainIcon
                active
                color={accentMap[activeMilestone.accent]}
              />
            </motion.div>
          </div>

          {/* MOBILE */}

          <div className="md:hidden">
            <div className="overflow-x-auto pb-3 scrollbar-none">
              <div className="relative min-w-[940px] px-4">
                <div className="relative z-10 flex items-start justify-between">
                  {milestones.map((milestone, index) => (
                    <Station
                      key={`${milestone.year}-${milestone.title}`}
                      milestone={milestone}
                      index={index}
                      active={activeIndex === index}
                      onClick={() => goTo(index)}
                    />
                  ))}
                </div>

                <div className="absolute left-[45px] right-[45px] top-[10px]">
                  <div className="absolute left-0 right-0 top-[10px] h-[4px] rounded-full bg-[#102F68]/10" />

                  <motion.div
                    className="absolute left-0 top-[10px] h-[4px] rounded-full"
                    animate={{
                      width: `${
                        (activeIndex /
                          (milestones.length - 1)) *
                        100
                      }%`,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 24,
                    }}
                    style={{
                      background:
                        independenceTheme.gradients
                          .tricolor,
                    }}
                  />

                  <div className="absolute left-0 right-0 top-[20px] h-px bg-[#102F68]/10" />
                </div>

                <motion.div
                  className="pointer-events-none absolute top-[-38px] z-30"
                  animate={{
                    left: `${
                      (activeIndex /
                        (milestones.length - 1)) *
                      100
                    }%`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 24,
                  }}
                  style={{
                    translateX: "-50%",
                  }}
                >
                  <TrainIcon
                    active
                    color={
                      accentMap[activeMilestone.accent]
                    }
                  />
                </motion.div>
              </div>
            </div>

            <p className="mt-1 text-center text-[9px] font-black tracking-[0.2em] text-slate-400">
              SWIPE ACROSS THE JOURNEY
            </p>
          </div>
        </motion.div>

        {/* ====================================================
            ACTIVE STORY
        ===================================================== */}

        <div className="mt-7 sm:mt-9">
          <StationStory
            milestone={activeMilestone}
            index={activeIndex}
            nextMilestone={nextMilestone}
            onNext={next}
          />
        </div>

        {/* ====================================================
            CONTROLS
        ===================================================== */}

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-[#102F68]/8 pt-5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={previous}
              aria-label="Previous station"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#102F68]/12 bg-white text-[#102F68] transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <ChevronLeft size={17} />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next station"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#102F68]/12 bg-white text-[#102F68] transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <ChevronRight size={17} />
            </button>

            <button
              type="button"
              onClick={() =>
                setIsAutoPlaying((value) => !value)
              }
              className="ml-1 inline-flex items-center gap-2 rounded-full border border-[#102F68]/10 px-3 py-2 text-[9px] font-black tracking-[0.15em] text-[#102F68]/55 transition hover:border-[#102F68]/25 hover:text-[#102F68]"
            >
              <TrainFront size={12} />

              {isAutoPlaying
                ? "AUTO JOURNEY"
                : "PAUSED"}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black tracking-[0.15em] text-slate-400">
              STATION
            </span>

            <span className="text-sm font-black text-[#102F68]">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>

            <span className="text-slate-300">/</span>

            <span className="text-sm font-black text-slate-400">
              {String(milestones.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ====================================================
            STATION-WISE TRANSFORMATION
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.7,
          }}
          className="relative mt-16 overflow-hidden rounded-[1.5rem] border border-[#102F68]/10 bg-[#FFFDF8] shadow-[0_18px_55px_rgba(16,47,104,0.06)] sm:mt-20"
        >
          {/* ==================================================
              LIVING TIRANGA TOP STRIPE
          ================================================== */}

          <div className="relative h-[5px] overflow-hidden">
            <motion.div
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-y-0 w-full"
              style={{
                background:
                  independenceTheme.gradients.tricolor,
              }}
            />

            <motion.div
              animate={{
                x: ["-120%", "120%"],
              }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-y-0 w-[30%] bg-gradient-to-r from-transparent via-white/90 to-transparent blur-[1px]"
            />
          </div>

          {/* soft atmosphere */}
          <motion.div
            animate={{
              x: ["-8%", "8%", "-8%"],
              opacity: [0.45, 0.75, 0.45],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute -left-24 top-0 h-40 w-64 rounded-full bg-[#FF9933]/[0.08] blur-3xl"
          />

          <motion.div
            animate={{
              x: ["8%", "-8%", "8%"],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute -right-24 bottom-0 h-40 w-64 rounded-full bg-[#138808]/[0.08] blur-3xl"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeMilestone.year}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative p-5 sm:p-6 lg:p-7"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                {/* SECTION LABEL */}

                <div className="flex shrink-0 items-center gap-4 lg:w-[270px]">
                  <motion.div
                    animate={{
                      scale: [1, 1.04, 1],
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `${
                        accentMap[
                          activeMilestone.accent
                        ]
                      }10`,
                      border: `1px solid ${
                        accentMap[
                          activeMilestone.accent
                        ]
                      }20`,
                    }}
                  >
                    <span
                      className="text-[11px] font-black tracking-[0.12em]"
                      style={{
                        color:
                          accentMap[
                            activeMilestone.accent
                          ],
                      }}
                    >
                      {String(activeIndex + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <motion.span
                      animate={{
                        scale: [1, 1.6, 1],
                        opacity: [0.25, 0, 0.25],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="absolute inset-0 rounded-xl"
                      style={{
                        border: `1px solid ${
                          accentMap[
                            activeMilestone.accent
                          ]
                        }`,
                      }}
                    />
                  </motion.div>

                  <div>
                    <p className="text-[9px] font-black tracking-[0.2em] text-[#FF9933]">
                      THE TRANSFORMATION
                    </p>

                    <p className="mt-1 text-xl font-black tracking-[-0.04em] text-[#102F68] sm:text-[1.3rem]">
                      {activeMilestone.transformation.title}
                    </p>
                  </div>
                </div>

                {/* TRANSFORMATION STATEMENT */}

                <div className="min-w-0 flex-1">
                  <p
                    className="text-[9px] font-black tracking-[0.16em]"
                    style={{
                      color:
                        accentMap[
                          activeMilestone.accent
                        ],
                    }}
                  >
                    {activeMilestone.year} ·{" "}
                    {
                      activeMilestone.transformation
                        .category
                    }
                  </p>

                  <p className="mt-1 max-w-2xl text-[15px] font-bold leading-6 text-[#102F68] sm:text-base sm:leading-7">
                    {
                      activeMilestone.transformation
                        .statement
                    }
                  </p>
                </div>

                {/* NAMES TO REMEMBER */}

                <div className="shrink-0 sm:w-[330px]">
                  <p className="mb-2.5 text-[8px] font-black tracking-[0.18em] text-slate-400">
                    NAMES TO REMEMBER
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {activeMilestone.transformation.names
                      .slice(0, 4)
                      .map((name, nameIndex) => (
                        <motion.span
                          key={name}
                          initial={{
                            opacity: 0,
                            y: 5,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.3,
                            delay: nameIndex * 0.05,
                          }}
                          className="rounded-full border px-3 py-1.5 text-[9px] font-black tracking-[0.04em]"
                          style={{
                            borderColor: `${
                              accentMap[
                                activeMilestone.accent
                              ]
                            }25`,
                            color:
                              accentMap[
                                activeMilestone.accent
                              ],
                            backgroundColor: `${
                              accentMap[
                                activeMilestone.accent
                              ]
                            }07`,
                          }}
                        >
                          {name}
                        </motion.span>
                      ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ==================================================
              ACTIVE PROGRESS — LIVING TRIRANGA STRIPE
          ================================================== */}

          <div className="relative h-[7px] overflow-hidden bg-[#102F68]/[0.035]">
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${progressPercentage}%`,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 24,
              }}
              className="relative h-full overflow-hidden"
              style={{
                background:
                  independenceTheme.gradients.tricolor,
              }}
            >
              {/* moving light */}
              <motion.div
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/85 to-transparent"
              />
            </motion.div>

            {/* tiny chakra pulse at active end */}
            <motion.span
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0.35, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border border-white/80 bg-[#163C80] shadow-[0_0_12px_rgba(22,60,128,0.35)]"
              style={{
                left: `calc(${progressPercentage}% - 6px)`,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}