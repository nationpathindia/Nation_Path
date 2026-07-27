"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// KUNDLI HERO VISUAL
//
// Luxury Vedic Manuscript Experience
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import HeroKundliPlate from "./HeroKundliPlate";

export default function KundliHeroVisual() {
  return (
    <div
      className="
        relative
        mx-auto
        flex
        aspect-square
        w-full
        max-w-[520px]
        items-center
        justify-center
      "
    >

      {/* Soft Golden Aura */}

      <motion.div
        animate={{
          scale:[1,1.08,1],
          opacity:[0.35,0.65,0.35],
        }}
        transition={{
          duration:6,
          repeat:Infinity,
        }}
        className="
          absolute
          h-[460px]
          w-[460px]
          rounded-full
          bg-[#D4AF37]/20
          blur-[120px]
        "
      />


      {/* Outer Royal Halo */}

      <motion.div
        animate={{
          rotate:360,
        }}
        transition={{
          duration:140,
          repeat:Infinity,
          ease:"linear",
        }}
        className="
          absolute
          h-[440px]
          w-[440px]
          rounded-full
          border
          border-[#D4AF37]/25
        "
      />


      {/* Secondary Engraved Ring */}

      <motion.div
        animate={{
          rotate:-360,
        }}
        transition={{
          duration:100,
          repeat:Infinity,
          ease:"linear",
        }}
        className="
          absolute
          h-[390px]
          w-[390px]
          rounded-full
          border
          border-dashed
          border-[#8B5E00]/20
        "
      />


      {/* Manuscript Plate */}

      <div
        className="
          relative
          flex
          h-[360px]
          w-[360px]
          items-center
          justify-center
          rounded-[32px]
          border
          border-[#D4AF37]/40
          bg-[#F8F1DE]
          shadow-[0_25px_80px_rgba(139,94,0,0.15)]
        "
      >

        {/* Paper Texture */}

        <div
          className="
            absolute
            inset-0
            rounded-[32px]
            bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15),transparent_65%)]
          "
        />


        {/* Inner Gold Frame */}

        <div
          className="
            absolute
            inset-5
            rounded-[26px]
            border
            border-[#D4AF37]/20
          "
        />


        {/* Kundli Plate */}

        <div
          className="
            relative
            z-10
            h-[330px]
            w-[330px]
          "
        >
          <HeroKundliPlate />
        </div>


        {/* Center Glow */}

        <motion.div
          animate={{
            opacity:[0.3,0.7,0.3],
            scale:[1,1.15,1],
          }}
          transition={{
            duration:4,
            repeat:Infinity,
          }}
          className="
            pointer-events-none
            absolute
            h-24
            w-24
            rounded-full
            bg-[#D4AF37]/20
            blur-2xl
          "
        />

      </div>


      {/* Top Label */}

      <motion.div
        animate={{
          y:[0,-8,0],
        }}
        transition={{
          duration:5,
          repeat:Infinity,
        }}
        className="
          absolute
          right-2
          top-20
          flex
          items-center
          gap-2
          rounded-full
          border
          border-[#D4AF37]/30
          bg-[#FFF9E8]
          px-4
          py-2
          text-xs
          font-medium
          text-[#8B5E00]
          shadow-sm
        "
      >
        <Sparkles size={14}/>

        Planetary Intelligence
      </motion.div>


      {/* Bottom Label */}

      <motion.div
        animate={{
          y:[0,8,0],
        }}
        transition={{
          duration:5,
          repeat:Infinity,
        }}
        className="
          absolute
          bottom-20
          left-0
          rounded-full
          border
          border-[#D4AF37]/30
          bg-[#FFF9E8]
          px-4
          py-2
          text-xs
          font-medium
          text-[#8B5E00]
          shadow-sm
        "
      >
        Life Blueprint
      </motion.div>


    </div>
  );
}