"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// KUNDLI INTELLIGENCE EXPERIENCE
//
// COSMIC AWAKENING SEAL
//
// Short transition animation
//
// NOT a Kundli renderer
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";


export default function CosmicBlueprintAnimation() {


  return (

    <div
      className="
        relative
        flex
        h-[220px]
        w-[220px]
        items-center
        justify-center
      "
    >



      {/* Soft Light */}

      <motion.div

        animate={{
          scale:[1,1.15,1],
          opacity:[0.25,0.45,0.25]
        }}

        transition={{
          duration:5,
          repeat:Infinity,
          ease:"easeInOut"
        }}

        className="
          absolute
          inset-0
          rounded-full
          bg-[#D4AF37]/20
          blur-[70px]
        "

      />




      {/* Ancient Seal */}

      <motion.div

        initial={{
          opacity:0,
          scale:.6
        }}

        whileInView={{
          opacity:1,
          scale:1
        }}

        viewport={{
          once:true
        }}

        transition={{
          duration:1
        }}

        className="
          relative
          flex
          h-28
          w-28
          items-center
          justify-center
          rounded-full
          border
          border-[#D4AF37]/50
          bg-[#1B120A]
          shadow-[0_0_50px_rgba(212,175,55,0.25)]
        "
      >



        {/* Inner Symbol */}

        <motion.div

          animate={{
            rotate:360
          }}

          transition={{
            duration:30,
            repeat:Infinity,
            ease:"linear"
          }}

          className="
            absolute
            inset-3
            rounded-full
            border
            border-dashed
            border-[#D4AF37]/40
          "

        />



        <Sparkles
          size={34}
          className="
            text-[#D4AF37]
          "
        />



      </motion.div>





      {/* Small Golden Marks */}

      {
        [
          "top-2 left-1/2",
          "bottom-4 left-8",
          "top-10 right-6",
          "bottom-8 right-10",
        ].map((pos,index)=>(

          <motion.span

            key={index}

            animate={{
              opacity:[.2,1,.2],
              scale:[1,1.4,1]
            }}

            transition={{
              duration:3+index,
              repeat:Infinity
            }}

            className={`
              absolute
              ${pos}
              h-1.5
              w-1.5
              rounded-full
              bg-[#D4AF37]
            `}

          />

        ))
      }



    </div>

  );

}