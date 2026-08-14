"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Check,
  Cpu,
  Globe2,
  GraduationCap,
  Leaf,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sprout,
  Telescope,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

type EraId = "past" | "present" | "future";

type EraPoint = {
  icon: LucideIcon;
  title: string;
  text: string;
};

type Era = {
  id: EraId;
  year: string;
  label: string;
  station: string;
  title: string;
  intro: string;
  accent: string;
  icon: LucideIcon;
  points: EraPoint[];
};

const eras: Era[] = [
  {
    id: "past",
    year: "1947",
    label: "BUILT",
    station: "THE FOUNDATIONS",
    title: "A young republic began building.",
    intro:
      "Freedom was the beginning. India then had to build the institutions, infrastructure, capabilities and systems that could hold together a vast new democracy.",
    accent: "#FF9933",
    icon: Building2,
    points: [
      {
        icon: ShieldCheck,
        title: "Democracy",
        text: "Constitution, elections and institutions established the framework of the republic.",
      },
      {
        icon: Sprout,
        title: "Food Security",
        text: "Agricultural transformation helped move the country beyond recurring scarcity.",
      },
      {
        icon: Zap,
        title: "Industry",
        text: "Steel, power, dams, transport and public institutions became development foundations.",
      },
      {
        icon: Telescope,
        title: "Science & Space",
        text: "Scientific institutions and a young space programme created capabilities for the future.",
      },
      {
        icon: GraduationCap,
        title: "Education",
        text: "Universities, research institutions and expanding schooling opened new pathways.",
      },
    ],
  },
  {
    id: "present",
    year: "2026",
    label: "BECOMING",
    station: "THE INDIA OF TODAY",
    title: "A country changing in real time.",
    intro:
      "At 80, India's transformation is visible everywhere — in digital life, infrastructure, science, entrepreneurship, connectivity and the aspirations of a young population.",
    accent: "#163C80",
    icon: TrendingUp,
    points: [
      {
        icon: Smartphone,
        title: "Digital India",
        text: "Digital identity, instant payments and public digital platforms have changed everyday life.",
      },
      {
        icon: Rocket,
        title: "Space & Science",
        text: "Lunar exploration, new missions and research continue expanding India's capabilities.",
      },
      {
        icon: TrendingUp,
        title: "Growing Economy",
        text: "Manufacturing, services, startups and entrepreneurship are reshaping opportunity.",
      },
      {
        icon: Building2,
        title: "Connectivity",
        text: "Roads, railways, airports and telecom networks continue shrinking distances.",
      },
      {
        icon: Users,
        title: "Young India",
        text: "A large young population is bringing new skills, ideas, businesses and expectations.",
      },
    ],
  },
  {
    id: "future",
    year: "2047+",
    label: "IMAGINING",
    station: "THE NEXT DESTINATION",
    title: "The India future generations could inherit.",
    intro:
      "The future is not a fixed destination. It will be shaped by choices made today — in technology, education, sustainability, institutions and human development.",
    accent: "#138808",
    icon: Globe2,
    points: [
      {
        icon: GraduationCap,
        title: "Human Development",
        text: "Quality education, healthcare and opportunity reaching more people.",
      },
      {
        icon: Leaf,
        title: "Clean Growth",
        text: "Cities, industries and energy systems growing with greater responsibility.",
      },
      {
        icon: Cpu,
        title: "Advanced Technology",
        text: "AI, robotics, advanced manufacturing and research becoming everyday capabilities.",
      },
      {
        icon: Globe2,
        title: "Global India",
        text: "A stronger role in technology, trade, science and diplomacy.",
      },
      {
        icon: Users,
        title: "Quality of Life",
        text: "Progress ultimately measured through dignity, opportunity and better lives.",
      },
    ],
  },
];

/* ========================================================================= */
/*                         FLYING TIME PARTICLES                              */
/* ========================================================================= */

function TimeParticles({
  direction,
  active,
}: {
  direction: "past" | "future" | null;
  active: boolean;
}) {
  if (!active || !direction) return null;

  const particles = Array.from({ length: 12 });

  return (
    <div className="pointer-events-none absolute inset-[-35px] z-50 overflow-visible">
      {particles.map((_, index) => {
        const angle = (index / particles.length) * Math.PI * 2;
        const radius = 70 + (index % 3) * 15;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        const directionMultiplier = direction === "past" ? -1 : 1;

        return (
          <motion.span
            key={index}
            className="absolute left-1/2 top-1/2 h-[2px] w-[2px] rounded-full bg-[#D96F0A]"
            initial={{
              opacity: 0,
              x: x * 0.35,
              y: y * 0.35,
              scale: 0.4,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              x: x * directionMultiplier,
              y: y * directionMultiplier,
              scale: [0.4, 1, 0.2],
            }}
            transition={{
              duration: 0.8 + (index % 4) * 0.08,
              ease: "easeOut",
              delay: index * 0.025,
            }}
          />
        );
      })}
    </div>
  );
}

/* ========================================================================= */
/*                              RAILWAY CLOCK                                */
/* ========================================================================= */

function RailwayClock({
  activeEra,
  transitionDirection,
  isTravelling,
}: {
  activeEra: EraId;
  transitionDirection: "past" | "future" | null;
  isTravelling: boolean;
}) {
  const activeIndex =
    activeEra === "past" ? 0 : activeEra === "present" ? 1 : 2;

  const handRotation =
    activeEra === "past" ? -48 : activeEra === "present" ? 0 : 48;

  return (
    <div className="relative h-[210px] w-[210px] sm:h-[235px] sm:w-[235px]">
      <TimeParticles
        direction={transitionDirection}
        active={isTravelling}
      />

      {/* Time travel label */}
      <AnimatePresence>
        {isTravelling && transitionDirection && (
          <motion.div
            initial={{
              opacity: 0,
              y: 6,
              scale: 0.92,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -5,
              scale: 0.96,
            }}
            className="pointer-events-none absolute -top-7 left-1/2 z-[70] -translate-x-1/2 whitespace-nowrap"
          >
            <div className="flex items-center gap-2 rounded-full border border-[#163C80]/10 bg-[#F4EBDD]/90 px-3 py-1 shadow-sm backdrop-blur-md">
              <motion.span
                animate={{
                  x:
                    transitionDirection === "past"
                      ? [-2, -6, -2]
                      : [2, 6, 2],
                }}
                transition={{
                  duration: 0.45,
                  repeat: 1,
                }}
                className="text-[8px] font-black text-[#D96F0A]"
              >
                {transitionDirection === "past" ? "←" : "→"}
              </motion.span>

              <span className="text-[7px] font-black tracking-[0.2em] text-[#163C80]/55">
                {transitionDirection === "past"
                  ? "TIME REWIND"
                  : "TIME AHEAD"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient shadow */}
      <div className="absolute inset-3 rounded-full bg-[#163C80]/10 blur-2xl" />

      {/* Railway metal housing */}
      <div className="absolute inset-0 rounded-full border-[6px] border-[#A87942]/40 bg-[#B98B55]/10 shadow-[inset_0_0_0_2px_rgba(22,60,128,0.08),0_16px_35px_rgba(22,60,128,0.12)]" />

      {/* Inner brass ring */}
      <div className="absolute inset-[8px] rounded-full border-2 border-[#163C80]/15 bg-[#D8C7A8]" />

      {/* Face */}
      <div className="absolute inset-[14px] overflow-hidden rounded-full border border-[#163C80]/15 bg-[#F4EBDD] shadow-[inset_0_0_25px_rgba(22,60,128,0.08)]">
        {/* Paper texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(22,60,128,0.55) 0.55px, transparent 0.55px)",
            backgroundSize: "5px 5px",
          }}
        />

        {/* Rewind wash */}
        <AnimatePresence>
          {isTravelling && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                opacity: [0, 0.12, 0],
                scale: [0.5, 1.2, 1.4],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.85,
                ease: "easeOut",
              }}
              className="pointer-events-none absolute inset-0 z-10 rounded-full border-[3px] border-[#D96F0A]/30"
            />
          )}
        </AnimatePresence>

        {/* Clock ticks */}
        {Array.from({ length: 12 }).map((_, index) => {
          const rotation = index * 30;

          return (
            <span
              key={index}
              className="absolute left-1/2 top-2 h-3 w-px origin-[0_91px] bg-[#163C80]/30 sm:origin-[0_104px]"
              style={{
                transform: `translateX(-50%) rotate(${rotation}deg)`,
              }}
            />
          );
        })}

        {/* Major ticks */}
        {[0, 3, 6, 9].map((index) => {
          const rotation = index * 30;

          return (
            <span
              key={`major-${index}`}
              className="absolute left-1/2 top-1.5 h-4 w-[2px] origin-[0_92px] bg-[#163C80]/60 sm:origin-[0_105px]"
              style={{
                transform: `translateX(-50%) rotate(${rotation}deg)`,
              }}
            />
          );
        })}

        {/* Numerals */}
        <span className="absolute left-1/2 top-6 -translate-x-1/2 text-[10px] font-black text-[#163C80]/65">
          12
        </span>

        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-[#163C80]/65">
          3
        </span>

        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-[#163C80]/65">
          6
        </span>

        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-[#163C80]/65">
          9
        </span>

        {/* Inner dial */}
        <div className="absolute inset-[28px] rounded-full border border-[#163C80]/10" />

        {/* Journey hand */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-20 h-[70px] w-[2px] origin-bottom sm:h-[82px]"
          animate={{
            rotate: handRotation,
          }}
          transition={{
            type: "spring",
            stiffness: isTravelling ? 115 : 80,
            damping: isTravelling ? 14 : 16,
            mass: 0.8,
          }}
          style={{
            marginLeft: "-1px",
            marginTop: "-70px",
          }}
        >
          <div className="absolute bottom-0 left-1/2 h-full w-full -translate-x-1/2 rounded-full bg-[#D96F0A] shadow-[0_0_8px_rgba(217,111,10,0.3)]" />

          <div className="absolute -top-1 left-1/2 h-0 w-0 -translate-x-1/2 border-l-[4px] border-r-[4px] border-b-[9px] border-l-transparent border-r-transparent border-b-[#D96F0A]" />
        </motion.div>

        {/* Flying second hand */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-30 h-[78px] w-px origin-bottom"
          animate={{
            rotate: isTravelling
              ? transitionDirection === "past"
                ? [0, -540]
                : [0, 540]
              : [0, 360],
          }}
          transition={{
            duration: isTravelling ? 0.75 : 18,
            repeat: isTravelling ? 0 : Infinity,
            ease: isTravelling
              ? [0.55, 0.08, 0.25, 1]
              : "linear",
          }}
          style={{
            marginLeft: "-0.5px",
            marginTop: "-78px",
          }}
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[#FF9933]" />
        </motion.div>

        {/* Centre */}
        <motion.div
          animate={{
            scale: isTravelling ? [1, 1.25, 1] : 1,
          }}
          transition={{
            duration: 0.65,
          }}
          className="absolute left-1/2 top-1/2 z-40 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#F4EBDD] bg-[#163C80] shadow-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF9933]" />
        </motion.div>

        {/* Era label */}
        <div className="absolute bottom-[31px] left-1/2 -translate-x-1/2 text-center">
          <p className="text-[6px] font-black tracking-[0.24em] text-[#163C80]/30">
            INDIA @ 80
          </p>

          <AnimatePresence mode="wait">
            <motion.p
              key={eras[activeIndex].year}
              initial={{
                opacity: 0,
                y: 4,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -3,
              }}
              transition={{
                duration: 0.25,
              }}
              className="mt-1 text-[10px] font-black tracking-[0.1em] text-[#163C80]/60"
            >
              {eras[activeIndex].year}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Railway plate */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border border-[#163C80]/15 bg-[#E7D8BF] px-4 py-1.5 shadow-sm">
        <p className="whitespace-nowrap text-[7px] font-black tracking-[0.22em] text-[#163C80]">
          <span className="font-black">NATIONPATH · INDIA</span>
        </p>
      </div>
    </div>
  );
}

/* ========================================================================= */
/*                              ERA BUTTON                                   */
/* ========================================================================= */

function EraButton({
  era,
  active,
  onClick,
}: {
  era: Era;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="group relative text-left outline-none"
    >
      <div className="flex items-center gap-3">
        <motion.span
          animate={{
            scale: active ? 1.12 : 1,
          }}
          transition={{
            duration: 0.25,
          }}
          className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border"
          style={{
            borderColor: active
              ? era.accent
              : "rgba(22,60,128,0.16)",
            background: active ? era.accent : "#F3EDE2",
            color: active ? "#fff" : "rgba(22,60,128,0.35)",
            boxShadow: active
              ? `0 0 0 6px ${era.accent}18`
              : "none",
          }}
        >
          {active ? (
            <Check size={13} strokeWidth={2.5} />
          ) : (
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
          )}
        </motion.span>

        <div>
          <p
            className={`text-[clamp(1.2rem,3vw,1.8rem)] font-black leading-none tracking-[-0.05em] ${
              active
                ? "text-[#163C80]"
                : "text-[#163C80]/35"
            }`}
          >
            {era.year}
          </p>

          <p
            className="mt-1 text-[7px] font-black tracking-[0.2em]"
            style={{
              color: active
                ? era.accent
                : "rgba(16,24,39,0.28)",
            }}
          >
            {era.label}
          </p>
        </div>
      </div>
    </button>
  );
}

/* ========================================================================= */
/*                           MAIN COMPONENT                                  */
/* ========================================================================= */

export default function TheIndiaAhead() {
  const [activeEra, setActiveEra] =
    useState<EraId>("present");

  const [transitionDirection, setTransitionDirection] =
    useState<"past" | "future" | null>(null);

  const [isTravelling, setIsTravelling] =
    useState(false);

  const active =
    eras.find((era) => era.id === activeEra) ??
    eras[1];

  useEffect(() => {
    if (!isTravelling) return;

    const timeout = window.setTimeout(() => {
      setIsTravelling(false);
      setTransitionDirection(null);
    }, 900);

    return () => window.clearTimeout(timeout);
  }, [isTravelling]);

  const handleEraChange = (nextEra: EraId) => {
    if (
      nextEra === activeEra ||
      isTravelling
    ) {
      return;
    }

    const currentIndex = eras.findIndex(
      (era) => era.id === activeEra,
    );

    const nextIndex = eras.findIndex(
      (era) => era.id === nextEra,
    );

    setTransitionDirection(
      nextIndex < currentIndex
        ? "past"
        : "future",
    );

    setIsTravelling(true);
    setActiveEra(nextEra);
  };

  const journeyPosition =
    activeEra === "past"
      ? "4%"
      : activeEra === "present"
        ? "50%"
        : "94%";

  const journeyWidth =
    activeEra === "past"
      ? "0%"
      : activeEra === "present"
        ? "50%"
        : "94%";

  return (
    <section className="relative overflow-hidden bg-[#F3EDE2] py-10 sm:py-12 lg:py-14">
      {/* =========================================================
          ATMOSPHERE
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10%] top-[-20%] h-[360px] w-[360px] rounded-full bg-[#163C80]/[0.035] blur-[110px]" />

        <div className="absolute bottom-[-20%] left-[15%] h-[320px] w-[320px] rounded-full bg-[#138808]/[0.035] blur-[110px]" />

        <div className="absolute left-[-10%] top-[52%] h-px w-[120%] bg-[#163C80]/[0.025]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* =========================================================
            HEADER
        ========================================================== */}

        <div className="grid gap-8 lg:grid-cols-[1fr_250px] lg:items-center">
          <div>
            <motion.div
              initial={{
                opacity: 0,
                x: -12,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-[#138808]" />

              <span className="text-[9px] font-black tracking-[0.28em] text-[#138808]">
                THE ROAD AHEAD
              </span>
            </motion.div>

            <motion.h2
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
                amount: 0.3,
              }}
              transition={{
                duration: 0.45,
              }}
              className="mt-3 max-w-4xl text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[0.9] tracking-[-0.065em] text-[#163C80]"
            >
              From what we built
              <span className="text-[#D96F0A]">
                {" "}
                to what comes next.
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
                amount: 0.3,
              }}
              transition={{
                duration: 0.4,
                delay: 0.08,
              }}
              className="mt-4 max-w-2xl text-sm leading-6 text-[#101827]/55 sm:text-base sm:leading-7"
            >
              Eighty years is a journey — from the foundations of
              1947, through the India of today, towards the possibilities
              of 2047 and beyond.
            </motion.p>
          </div>

          {/* Clock */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex justify-center lg:justify-end"
          >
            <RailwayClock
              activeEra={activeEra}
              transitionDirection={transitionDirection}
              isTravelling={isTravelling}
            />
          </motion.div>
        </div>

        {/* =========================================================
            JOURNEY TIMELINE
        ========================================================== */}

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
            amount: 0.3,
          }}
          transition={{
            duration: 0.45,
          }}
          className="relative mt-8 border-y border-[#163C80]/10 py-6 sm:py-7"
        >
          {/* Railway track */}
          <div className="pointer-events-none absolute left-[16px] right-[16px] top-[42px] hidden sm:block">
            {/* Base rail */}
            <div className="absolute left-0 right-0 top-0 h-px bg-[#163C80]/10" />

            {/* Lower rail */}
            <div className="absolute left-0 right-0 top-[5px] h-px bg-[#163C80]/[0.045]" />

            {/* Active journey */}
            <motion.div
              className="absolute left-0 top-[-1px] h-[2px] origin-left"
              animate={{
                width: journeyWidth,
              }}
              transition={{
                duration: isTravelling
                  ? 0.85
                  : 1.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                background:
                  "linear-gradient(90deg, #FF9933, #163C80 52%, #138808)",
              }}
            />

            {/* Sleeper marks */}
            {Array.from({ length: 17 }).map(
              (_, index) => (
                <span
                  key={index}
                  className="absolute top-[-2px] h-[7px] w-px bg-[#163C80]/10"
                  style={{
                    left: `${index * 6.25}%`,
                  }}
                />
              ),
            )}

            {/* Travelling light */}
            <motion.span
              className="absolute top-[-4px] h-3 w-3 -translate-x-1/2 rounded-full bg-[#D96F0A] shadow-[0_0_0_5px_rgba(217,111,10,0.10),0_0_16px_rgba(217,111,10,0.35)]"
              animate={{
                left: journeyPosition,
                scale: isTravelling
                  ? [1, 1.35, 1]
                  : 1,
              }}
              transition={{
                left: {
                  type: "spring",
                  stiffness: isTravelling
                    ? 110
                    : 80,
                  damping: isTravelling
                    ? 15
                    : 16,
                  mass: 0.8,
                },
                scale: {
                  duration: 0.7,
                },
              }}
            />

            {/* Small travelling glow */}
            <motion.span
              className="absolute top-[-7px] h-5 w-5 -translate-x-1/2 rounded-full bg-[#D96F0A]/10 blur-md"
              animate={{
                left: journeyPosition,
                scale: isTravelling
                  ? [1, 1.8, 1]
                  : 1,
              }}
              transition={{
                duration: 0.7,
              }}
            />
          </div>

          <div className="relative grid gap-5 sm:grid-cols-3 sm:gap-0">
            {eras.map((era) => (
              <EraButton
                key={era.id}
                era={era}
                active={era.id === activeEra}
                onClick={() =>
                  handleEraChange(era.id)
                }
              />
            ))}
          </div>
        </motion.div>

        {/* =========================================================
            ACTIVE ERA CONTENT
        ========================================================== */}

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
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
              duration: 0.35,
              ease: "easeOut",
            }}
            className="mt-7"
          >
            {/* Era heading */}
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl border"
                    style={{
                      borderColor: `${active.accent}30`,
                      background: `${active.accent}0D`,
                      color: active.accent,
                    }}
                  >
                    <active.icon
                      size={18}
                      strokeWidth={1.4}
                    />
                  </div>

                  <div>
                    <p
                      className="text-[8px] font-black tracking-[0.2em]"
                      style={{
                        color: active.accent,
                      }}
                    >
                      {active.station}
                    </p>

                    <p className="mt-0.5 text-[7px] font-black tracking-[0.18em] text-[#101827]/25">
                      {active.year} · {active.label}
                    </p>
                  </div>
                </div>

                <h3 className="mt-4 max-w-xl text-[clamp(1.65rem,3vw,2.55rem)] font-black leading-[0.96] tracking-[-0.055em] text-[#163C80]">
                  {active.title}
                </h3>
              </div>

              <p className="max-w-2xl text-sm leading-6 text-[#101827]/55 sm:text-[15px] sm:leading-7">
                {active.intro}
              </p>
            </div>

            {/* Transformation Cards */}
            <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-[#163C80]/10 bg-[#163C80]/10 sm:grid-cols-2 lg:grid-cols-5">
              {active.points.map(
                (point, index) => {
                  const PointIcon =
                    point.icon;

                  return (
                    <motion.article
                      key={point.title}
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.3,
                        delay:
                          index * 0.045,
                      }}
                      whileHover={{
                        y: -3,
                      }}
                      className="group relative min-h-[140px] overflow-hidden border-white/20 bg-white/30 p-4 backdrop-blur-md transition-all duration-300 hover:bg-white/45 hover:shadow-[0_14px_30px_rgba(22,60,128,0.08)] sm:p-5"
                    >
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-transparent opacity-70" />

                      <div
                        className="absolute inset-x-0 top-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          background:
                            active.accent,
                        }}
                      />

                      <motion.div
                        className="absolute -right-8 -top-8 h-20 w-20 rounded-full blur-2xl"
                        animate={{
                          opacity: [
                            0.02,
                            0.07,
                            0.02,
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat:
                            Infinity,
                          delay:
                            index * 0.2,
                        }}
                        style={{
                          background:
                            active.accent,
                        }}
                      />

                      <div
                        className="relative flex h-8 w-8 items-center justify-center rounded-lg border bg-white/25 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
                        style={{
                          borderColor: `${active.accent}25`,
                          color:
                            active.accent,
                        }}
                      >
                        <PointIcon
                          size={15}
                          strokeWidth={1.5}
                        />
                      </div>

                      <p className="relative mt-4 text-[10px] font-black tracking-[0.02em] text-[#163C80]">
                        {point.title}
                      </p>

                      <p className="relative mt-2 text-[9px] leading-4 text-[#101827]/45">
                        {point.text}
                      </p>

                      <span className="absolute bottom-3 right-4 text-[8px] font-black tracking-[0.15em] text-[#163C80]/10">
                        0{index + 1}
                      </span>
                    </motion.article>
                  );
                },
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* =========================================================
            CLOSING
        ========================================================== */}

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
            amount: 0.4,
          }}
          transition={{
            duration: 0.4,
          }}
          className="mt-6 flex flex-col gap-3 border-t border-[#163C80]/10 pt-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm font-bold tracking-[-0.02em] text-[#163C80]/65 sm:text-base">
            We inherited a story.
            <span className="text-[#D96F0A]">
              {" "}
              The next chapter is still being written.
            </span>
          </p>

          <div
            className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.16em]"
            style={{
              color: active.accent,
            }}
          >
            Explore the journey
            <ArrowRight size={12} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}