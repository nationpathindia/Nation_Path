"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// KUNDLI INTELLIGENCE EXPERIENCE
//
// COSMIC BLUEPRINT REVEAL
//
// Short Awakening Transition
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import CosmicBlueprintAnimation from "./CosmicBlueprintAnimation";


export default function KundliReveal() {

  return (

    <section
      className="
        relative
        overflow-hidden
        bg-[#120C08]
        px-5
        py-12
        md:px-10
        md:py-16
      "
    >


      {/* Soft Atmosphere */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-72
          w-72
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#D4AF37]/10
          blur-[100px]
        "
      />



      <div
        className="
          relative
          mx-auto
          max-w-4xl
          text-center
        "
      >



        {/* Small Awakening Mark */}

        <motion.div

          initial={{
            opacity:0,
            scale:.8
          }}

          whileInView={{
            opacity:1,
            scale:1
          }}

          viewport={{
            once:true
          }}

          className="
            mx-auto
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-[#D4AF37]/40
            bg-[#1B120A]
            text-[#D4AF37]
          "
        >

          <Sparkles size={20}/>

        </motion.div>




        <motion.p

          initial={{
            opacity:0,
            y:10
          }}

          whileInView={{
            opacity:1,
            y:0
          }}

          viewport={{
            once:true
          }}

          transition={{
            duration:.5
          }}

          className="
            mt-5
            text-xs
            uppercase
            tracking-[0.4em]
            text-[#D4AF37]
          "
        >

          Cosmic Awakening

        </motion.p>




        <motion.h2

          initial={{
            opacity:0,
            y:15
          }}

          whileInView={{
            opacity:1,
            y:0
          }}

          viewport={{
            once:true
          }}

          className="
            mt-3
            font-serif
            text-2xl
            text-[#F8F1DE]
            md:text-4xl
          "
        >

          Your Blueprint Is Awakening

        </motion.h2>




        <motion.p

          initial={{
            opacity:0
          }}

          whileInView={{
            opacity:1
          }}

          viewport={{
            once:true
          }}

          className="
            mx-auto
            mt-3
            max-w-md
            text-sm
            text-[#C9B58A]
          "
        >

          Preparing your personal cosmic map.

        </motion.p>




        {/* Compact Animation */}

        <motion.div

          initial={{
            opacity:0,
            scale:.95
          }}

          whileInView={{
            opacity:1,
            scale:1
          }}

          viewport={{
            once:true
          }}

          transition={{
            duration:.8,
            delay:.2
          }}

          className="
            mt-4
            flex
            justify-center
          "
        >

          <CosmicBlueprintAnimation />

        </motion.div>




        <p
          className="
            mt-2
            text-[10px]
            uppercase
            tracking-[0.3em]
            text-[#8B5E00]
          "
        >

          Opening Personal Archive

        </p>



      </div>


    </section>

  );

}