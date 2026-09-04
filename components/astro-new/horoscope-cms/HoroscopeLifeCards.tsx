"use client";

/*
//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// PREMIUM HOROSCOPE — LIFE INTELLIGENCE
//
// CMS FIRST
// NO ENGINE
// NO CALCULATION
// NO AI
//
// LOCKED:
//
// • Reads CMS data only
// • Career / Love / Finance / Health cards ALWAYS visible
// • CMS content shown exactly when available
// • Missing CMS content gets a subtle empty state
// • No horoscope content generated here
//
// DESIGN:
//
// Premium Cosmic Life Observatory
// Dark cosmic palette
// Gold + violet accents
// 4-card life constellation
// Compact but premium
// Subtle living motion
//////////////////////////////////////////////////////////////
*/

import {
  Activity,
  ArrowUpRight,
  BriefcaseBusiness,
  Heart,
  WalletCards,
  Sparkles,
  CircleDot,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import type {
  CmsHoroscopeLife,
} from "./types";

//////////////////////////////////////////////////////////////
// PROPS
//////////////////////////////////////////////////////////////

interface Props {
  life?: CmsHoroscopeLife;
}

//////////////////////////////////////////////////////////////
// CARD CONFIG
//////////////////////////////////////////////////////////////

const cards = [
  {
    key: "career",
    label: "Career",
    icon: BriefcaseBusiness,
    accent: "career",
    number: "01",
  },
  {
    key: "love",
    label: "Love",
    icon: Heart,
    accent: "love",
    number: "02",
  },
  {
    key: "finance",
    label: "Finance",
    icon: WalletCards,
    accent: "finance",
    number: "03",
  },
  {
    key: "health",
    label: "Health",
    icon: Activity,
    accent: "health",
    number: "04",
  },
] as const;

//////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////

function getValue(
  life: CmsHoroscopeLife | undefined,
  key: keyof CmsHoroscopeLife,
) {
  const value = life?.[key];

  if (
    typeof value === "string" &&
    value.trim().length > 0
  ) {
    return value.trim();
  }

  return "";
}

//////////////////////////////////////////////////////////////
// COMPONENT
//////////////////////////////////////////////////////////////

export default function HoroscopeLifeCards({
  life,
}: Props) {
  ////////////////////////////////////////////////////////////
  // ALWAYS RENDER THE LIFE SECTION
  ////////////////////////////////////////////////////////////

  return (
    <section
      data-section="life-intelligence"
      aria-labelledby="life-intelligence-title"
      className="
        relative
        px-3
        md:px-6
      "
    >
      <motion.div
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
          amount: 0.08,
        }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          group
          relative
          isolate
          overflow-hidden
          rounded-[24px]
          border
          border-[#8c6aaf]/20
          bg-[#08062b]
          shadow-[0_24px_70px_rgba(5,3,35,.18)]
          sm:rounded-[28px]
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
          {/* Violet upper glow */}

          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.75, 1, 0.75],
              x: [0, 8, 0],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              -right-28
              -top-32
              h-[330px]
              w-[330px]
              rounded-full
              bg-[#8c1682]/16
              blur-[110px]
            "
          />

          {/* Deep violet lower glow */}

          <motion.div
            animate={{
              scale: [1, 1.06, 1],
              opacity: [0.7, 0.95, 0.7],
              x: [0, -7, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
            className="
              absolute
              -left-28
              bottom-[-150px]
              h-[330px]
              w-[330px]
              rounded-full
              bg-[#34136d]/24
              blur-[105px]
            "
          />

          {/* Central gold atmosphere */}

          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.4, 0.75, 0.4],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="
              absolute
              left-[42%]
              top-[25%]
              h-[260px]
              w-[260px]
              rounded-full
              bg-[#d4a53b]/[0.045]
              blur-[110px]
            "
          />

          {/* Fine stars */}

          <div
            className="
              absolute
              inset-0
              opacity-[0.025]
              [background-image:radial-gradient(rgba(255,255,255,.9)_1px,transparent_1px)]
              [background-size:36px_36px]
            "
          />

          {/* Top gold signal */}

          <motion.div
            initial={{
              scaleX: 0,
              opacity: 0,
            }}
            whileInView={{
              scaleX: 1,
              opacity: 0.7,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute
              left-6
              right-6
              top-0
              h-[2px]
              origin-left
              bg-gradient-to-r
              from-transparent
              via-[#e5c54d]
              to-transparent
              sm:left-8
              sm:right-8
            "
          />

          {/* ================================================== */}
          {/* AMBIENT CONSTELLATION DOTS */}
          {/* ================================================== */}

          <motion.span
            animate={{
              y: [0, -6, 0],
              opacity: [0.25, 0.7, 0.25],
              scale: [1, 1.35, 1],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              left-[12%]
              top-[24%]
              h-1
              w-1
              rounded-full
              bg-[#e7c953]
              shadow-[0_0_12px_#e7c953]
            "
          />

          <motion.span
            animate={{
              y: [0, 7, 0],
              x: [0, 3, 0],
              opacity: [0.2, 0.65, 0.2],
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="
              absolute
              right-[17%]
              top-[20%]
              h-1.5
              w-1.5
              rounded-full
              bg-[#d96bb5]
              shadow-[0_0_13px_#d96bb5]
            "
          />

          <motion.span
            animate={{
              y: [0, -5, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.4, 1],
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
              left-[45%]
              h-1
              w-1
              rounded-full
              bg-[#e5c64e]
              shadow-[0_0_9px_#e5c64e]
            "
          />

          {/* Fourth tiny star */}

          <motion.span
            animate={{
              x: [0, 5, 0],
              opacity: [0.15, 0.5, 0.15],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="
              absolute
              right-[42%]
              bottom-[12%]
              h-1
              w-1
              rounded-full
              bg-[#a98bd4]
            "
          />
        </div>

        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

        <header
          className="
            relative
            z-10
            flex
            items-start
            justify-between
            gap-5
            px-5
            pb-5
            pt-6
            sm:px-7
            sm:pb-6
            sm:pt-7
            lg:px-8
            lg:pb-6
            lg:pt-7
          "
        >
          <div className="min-w-0">
            {/* Eyebrow */}

            <motion.div
              initial={{
                opacity: 0,
                x: -8,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.45,
              }}
              className="
                flex
                items-center
                gap-2.5
              "
            >
              <motion.span
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
                  duration: 0.55,
                  delay: 0.1,
                }}
                className="
                  h-px
                  w-8
                  origin-left
                  bg-[#e1c34f]/65
                  sm:w-10
                "
              />

              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.28em]
                  text-[#d8bd55]
                  sm:text-[10px]
                  sm:tracking-[0.32em]
                "
              >
                Life Intelligence
              </p>
            </motion.div>

            {/* Title */}

            <motion.h2
              id="life-intelligence-title"
              initial={{
                opacity: 0,
                y: 7,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: 0.08,
              }}
              className="
                mt-2.5
                font-serif
                text-[1.45rem]
                font-semibold
                leading-tight
                tracking-[-0.025em]
                text-[#eee2b7]
                sm:text-[1.65rem]
                md:text-[1.8rem]
              "
            >
              Life at a Glance
            </motion.h2>

            {/* Description */}

            <motion.p
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
                duration: 0.45,
                delay: 0.15,
              }}
              className="
                mt-1.5
                max-w-2xl
                text-[12px]
                leading-5
                text-[#aaa1ba]
                sm:text-[13px]
              "
            >
              Explore today's guidance across the
              important areas of your life.
            </motion.p>
          </div>

          {/* ================================================== */}
          {/* HEADER CONSTELLATION */}
          {/* ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              rotate: -10,
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
              duration: 0.55,
              delay: 0.12,
            }}
            aria-hidden="true"
            className="
              relative
              hidden
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-[#d4af37]/20
              bg-[#d4af37]/[0.045]
              text-[#dfc45a]
              sm:flex
            "
          >
            {/* Outer rotating ring */}

            <motion.span
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                inset-1.5
                rounded-full
                border
                border-dashed
                border-[#d4af37]/20
              "
            />

            {/* Inner pulse */}

            <motion.span
              animate={{
                scale: [1, 1.12, 1],
                opacity: [0.65, 1, 0.65],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                h-7
                w-7
                rounded-full
                border
                border-[#d4af37]/10
              "
            />

            <CircleDot
              size={17}
              strokeWidth={1.5}
            />
          </motion.div>
        </header>

        {/* ================================================== */}
        {/* CONSTELLATION DIVIDER */}
        {/* ================================================== */}

        <motion.div
          initial={{
            scaleX: 0,
            opacity: 0,
          }}
          whileInView={{
            scaleX: 1,
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
          }}
          aria-hidden="true"
          className="
            relative
            z-10
            mx-5
            h-px
            origin-center
            bg-gradient-to-r
            from-transparent
            via-[#d4af37]/25
            to-transparent
            sm:mx-7
            lg:mx-8
          "
        />

        {/* ================================================== */}
        {/* LIFE CONSTELLATION LINE */}
        {/* ================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            relative
            z-10
            mx-5
            hidden
            h-4
            sm:block
            sm:mx-7
            lg:mx-8
          "
        >
          <div
            className="
              absolute
              left-[12%]
              right-[12%]
              top-2
              h-px
              bg-gradient-to-r
              from-transparent
              via-[#d4af37]/15
              to-transparent
            "
          />

          {[12, 37, 62].map((position, index) => (
            <motion.span
              key={position}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.35, 0.8, 0.35],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.65,
              }}
              className="
                absolute
                top-[5px]
                h-1.5
                w-1.5
                rounded-full
                border
                border-[#d4af37]/50
                bg-[#0a082d]
              "
              style={{
                left: `${position}%`,
              }}
            />
          ))}

          <motion.span
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.35, 0.8, 0.35],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.95,
            }}
            className="
              absolute
              right-[12%]
              top-[5px]
              h-1.5
              w-1.5
              rounded-full
              border
              border-[#d4af37]/50
              bg-[#0a082d]
            "
          />
        </div>

        {/* ================================================== */}
        {/* CARDS */}
        {/* ================================================== */}

        <div
          className="
            relative
            z-10
            grid
            grid-cols-1
            gap-3
            p-5
            sm:grid-cols-2
            sm:gap-4
            sm:p-7
            lg:grid-cols-4
            lg:p-8
            lg:pt-5
          "
        >
          {cards.map((card, index) => {
            const value = getValue(
              life,
              card.key,
            );

            const Icon = card.icon;

            return (
              <LifeCard
                key={card.key}
                label={card.label}
                number={card.number}
                icon={Icon}
                value={value}
                accent={card.accent}
                index={index}
              />
            );
          })}
        </div>

        {/* ================================================== */}
        {/* FOOTER */}
        {/* ================================================== */}

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
            duration: 0.5,
            delay: 0.35,
          }}
          className="
            relative
            z-10
            flex
            items-center
            justify-between
            gap-4
            border-t
            border-white/[0.055]
            px-5
            py-4
            sm:px-7
            lg:px-8
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <motion.span
              animate={{
                scale: [1, 1.35, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
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
              tracking-[0.18em]
              text-[#77718d]
            "
          >
            <Sparkles
              size={9}
              className="text-[#b99a40]"
            />

            CMS Life Guidance
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

//////////////////////////////////////////////////////////////
// LIFE CARD
//////////////////////////////////////////////////////////////

interface LifeCardProps {
  label: string;
  number: string;
  icon: React.ElementType;
  value: string;
  accent:
    | "career"
    | "love"
    | "finance"
    | "health";
  index: number;
}

function LifeCard({
  label,
  number,
  icon: Icon,
  value,
  accent,
  index,
}: LifeCardProps) {
  const accentGlow =
    accent === "love"
      ? "bg-[#c6539e]/[0.10]"
      : accent === "finance"
        ? "bg-[#d4af37]/[0.10]"
        : accent === "health"
          ? "bg-[#5eaa92]/[0.08]"
          : "bg-[#7757b5]/[0.10]";

  const accentIcon =
    accent === "love"
      ? "text-[#d875b5]"
      : accent === "finance"
        ? "text-[#dfc45a]"
        : accent === "health"
          ? "text-[#75b9a5]"
          : "text-[#a98bd4]";

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 18,
        scale: 0.975,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.55,
        delay: 0.18 + index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -4,
        transition: {
          duration: 0.25,
        },
      }}
      className="
        group/card
        relative
        flex
        min-h-[205px]
        flex-col
        overflow-hidden
        rounded-[15px]
        border
        border-white/[0.075]
        bg-gradient-to-br
        from-[#151039]/90
        via-[#0d092f]/95
        to-[#110a35]/90
        p-5
        shadow-[0_14px_35px_rgba(0,0,0,.14)]
        transition-[border-color,box-shadow]
        duration-300
        hover:border-[#d4af37]/25
        hover:shadow-[0_20px_45px_rgba(0,0,0,.22)]
        sm:min-h-[215px]
        sm:p-5
      "
    >
      {/* ================================================== */}
      {/* CARD GLOW */}
      {/* ================================================== */}

      <motion.div
        aria-hidden="true"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.65, 1, 0.65],
        }}
        transition={{
          duration: 5 + index,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.5,
        }}
        className={`
          pointer-events-none
          absolute
          -right-14
          -top-14
          h-32
          w-32
          rounded-full
          blur-[48px]
          transition-transform
          duration-500
          group-hover/card:scale-[1.5]
          ${accentGlow}
        `}
      />

      {/* ================================================== */}
      {/* SECONDARY CARD GLOW */}
      {/* ================================================== */}

      <motion.div
        aria-hidden="true"
        animate={{
          x: [0, -8, 0],
          y: [0, 5, 0],
          opacity: [0, 0.35, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.8,
        }}
        className="
          pointer-events-none
          absolute
          -bottom-10
          -left-10
          h-24
          w-24
          rounded-full
          bg-[#8c1682]/[0.08]
          blur-[45px]
        "
      />

      {/* ================================================== */}
      {/* TOP SIGNAL */}
      {/* ================================================== */}

      <motion.div
        aria-hidden="true"
        animate={{
          x: ["-120%", "220%"],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          repeatDelay: 8 + index,
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
          via-[#d4af37]
          to-transparent
          opacity-45
        "
      />

      {/* ================================================== */}
      {/* CARD HEADER */}
      {/* ================================================== */}

      <div
        className="
          relative
          flex
          items-start
          justify-between
          gap-3
        "
      >
        {/* Icon */}

        <motion.div
          whileHover={{
            scale: 1.06,
            rotate: 2,
          }}
          transition={{
            duration: 0.25,
          }}
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-[12px]
            border
            border-white/[0.07]
            bg-white/[0.025]
            ${accentIcon}
            transition-all
            duration-300
            group-hover/card:border-[#d4af37]/25
            group-hover/card:bg-[#d4af37]/[0.055]
          `}
        >
          <motion.div
            animate={{
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.35,
            }}
          >
            <Icon
              size={18}
              strokeWidth={1.65}
            />
          </motion.div>
        </motion.div>

        {/* Number */}

        <span
          className="
            rounded-full
            border
            border-white/[0.06]
            bg-white/[0.025]
            px-2
            py-1
            text-[7px]
            font-bold
            tracking-[0.16em]
            text-[#625b7c]
          "
        >
          {number}
        </span>
      </div>

      {/* ================================================== */}
      {/* CONTENT */}
      {/* ================================================== */}

      <div
        className="
          relative
          mt-5
          flex
          flex-1
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
          <h3
            className="
              font-serif
              text-[18px]
              font-semibold
              tracking-[-0.015em]
              text-[#eee2b7]
            "
          >
            {label}
          </h3>

          <ArrowUpRight
            size={14}
            className="
              text-[#5e5676]
              transition-all
              duration-300
              group-hover/card:-translate-y-0.5
              group-hover/card:translate-x-0.5
              group-hover/card:text-[#d9bd55]
            "
          />
        </div>

        {/* Accent line */}

        <motion.div
          aria-hidden="true"
          initial={{
            width: 0,
            opacity: 0,
          }}
          whileInView={{
            width: "2rem",
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.45,
            delay: 0.4 + index * 0.08,
          }}
          className="
            mt-2.5
            h-px
            bg-gradient-to-r
            from-[#d4af37]/65
            to-transparent
            transition-all
            duration-300
            group-hover/card:w-14
          "
        />

        {/* ================================================== */}
        {/* CMS CONTENT */}
        {/* ================================================== */}

        {value ? (
          <motion.p
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
              duration: 0.45,
              delay: 0.45 + index * 0.08,
            }}
            className="
              mt-4
              text-[13px]
              leading-[1.78]
              text-[#bdb6c9]
              sm:text-[13.5px]
            "
          >
            {value}
          </motion.p>
        ) : (
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
              duration: 0.4,
              delay: 0.45 + index * 0.08,
            }}
            className="
              mt-4
              flex
              flex-1
              flex-col
              justify-center
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <motion.span
                animate={{
                  scale: [1, 1.35, 1],
                  opacity: [0.35, 0.7, 0.35],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.4,
                }}
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#d4af37]/45
                "
              />

              <span
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#746c88]
                "
              >
                Guidance unavailable
              </span>
            </div>

            <p
              className="
                mt-2
                max-w-[220px]
                text-[11px]
                leading-5
                text-[#625b78]
              "
            >
              This section will appear when
              horoscope guidance is available.
            </p>
          </motion.div>
        )}
      </div>

      {/* ================================================== */}
      {/* BOTTOM ACCENT */}
      {/* ================================================== */}

      <motion.div
        aria-hidden="true"
        initial={{
          scaleX: 0.4,
          opacity: 0.35,
        }}
        whileInView={{
          scaleX: 1,
          opacity: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.7,
          delay: 0.45 + index * 0.08,
        }}
        className="
          pointer-events-none
          absolute
          bottom-0
          left-5
          right-5
          h-px
          origin-center
          bg-gradient-to-r
          from-transparent
          via-[#d4af37]/20
          to-transparent
        "
      />
    </motion.article>
  );
}