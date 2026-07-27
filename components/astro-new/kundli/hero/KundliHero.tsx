"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// KUNDLI INTELLIGENCE EXPERIENCE
//
// HERO SECTION
//
// Personal Cosmic Blueprint Experience
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import KundliHeroVisual from "./KundliHeroVisual";

const HIGHLIGHTS = [
  "Planet Intelligence",
  "12 House Analysis",
  "Life Timing Insights",
];

export default function KundliHero() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#FFF9E8]
        px-5
        py-20
        md:px-10
        md:py-28
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          left-1/2
          top-0
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-[#D4AF37]/10
          blur-[140px]
        "
      />

      <div
        className="
          relative
          mx-auto
          grid
          max-w-7xl
          items-center
          gap-14
          lg:grid-cols-2
        "
      >
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          {/* Badge */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#D4AF37]/30
              bg-[#F8F1DE]
              px-4
              py-2
              text-sm
              font-medium
              text-[#8B5E00]
            "
          >
            <Sparkles size={15} />

            Vedic Intelligence Experience
          </div>

          {/* Editorial Label */}

          <p
            className="
              mt-8
              text-xs
              font-semibold
              uppercase
              tracking-[0.35em]
              text-[#8B5E00]
            "
          >
            Personal Birth Chart Analysis
          </p>

          {/* Heading */}

          <h1
            className="
              mt-4
              font-serif
              text-4xl
              leading-tight
              text-[#3B2600]
              sm:text-5xl
              lg:text-6xl
            "
          >
            Your Cosmic
            <br />

            <span className="text-[#8B5E00]">
              Blueprint
            </span>
          </h1>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-7
              max-w-xl
              text-base
              leading-8
              text-[#5A3908]
              md:text-lg
              lg:mx-0
            "
          >
            Your Kundli is a detailed map of planetary energies,
            life opportunities, karmic patterns and important
            timings calculated from the exact moment of your birth.
            Explore the wisdom hidden within your celestial design.
          </p>

          {/* Highlights */}

          <div
            className="
              mt-8
              grid
              gap-4
              sm:grid-cols-2
            "
          >
            {HIGHLIGHTS.map((item) => (
              <div
                key={item}
                className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  border
                  border-[#D4AF37]/20
                  bg-[#F8F1DE]/70
                  px-4
                  py-3
                  lg:justify-start
                "
              >
                <CheckCircle2
                  size={18}
                  className="text-[#D4AF37]"
                />

                <span
                  className="
                    text-sm
                    font-medium
                    text-[#3B2600]
                  "
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="
              mt-10
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-[#D4AF37]
              px-8
              py-4
              font-semibold
              text-[#120C08]
              shadow-xl
              shadow-[#D4AF37]/20
              transition
              hover:bg-[#8B5E00]
              hover:text-white
            "
          >
            Create My Blueprint

            <ArrowRight size={18} />
          </motion.button>

          {/* Trust Strip */}

          <div
            className="
              mt-8
              flex
              flex-wrap
              items-center
              justify-center
              gap-3
              text-sm
              text-[#6B4A16]
              lg:justify-start
            "
          >
            <span>Swiss Ephemeris</span>

            <span className="text-[#D4AF37]">•</span>

            <span>Vedic Astrology</span>

            <span className="text-[#D4AF37]">•</span>

            <span>Astro Intelligence</span>
          </div>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.94,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.25,
          }}
        >
          <KundliHeroVisual />
        </motion.div>
      </div>

      {/* Scroll Indicator */}

      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="
          mt-16
          flex
          flex-col
          items-center
          justify-center
          text-[#8B5E00]
        "
      >
        <span
          className="
            text-xs
            uppercase
            tracking-[0.35em]
          "
        >
          Begin Journey
        </span>

        <ChevronDown
          size={20}
          className="mt-2"
        />
      </motion.div>
    </section>
  );
}