"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// KUNDLI INTELLIGENCE EXPERIENCE
//
// PREMIUM COSMIC REPORT
//
// Royal Blueprint Invitation
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import {
  Crown,
  Sparkles,
  ArrowRight,
  ScrollText,
} from "lucide-react";


const FEATURES = [
  "Detailed Planet Intelligence",
  "House Analysis",
  "Life Journey Map",
  "Timing Cycles",
  "Personal Guidance",
  "AI Astro Insights",
];


export default function KundliPremiumBanner(){

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


      {/* Royal Glow */}

      <div

        className="
          absolute
          left-1/2
          top-1/2
          h-[520px]
          w-[520px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#D4AF37]/15
          blur-[150px]
        "

      />




      <motion.div

        initial={{
          opacity:0,
          y:30
        }}

        whileInView={{
          opacity:1,
          y:0
        }}

        viewport={{
          once:true
        }}

        transition={{
          duration:.8
        }}

        className="
          relative
          mx-auto
          max-w-5xl
          overflow-hidden
          rounded-[40px]
          border
          border-[#D4AF37]/40
          bg-[#120C08]
          p-8
          text-center
          shadow-2xl
          md:p-14
        "

      >



        {/* Inner Border */}

        <div

          className="
            pointer-events-none
            absolute
            inset-4
            rounded-[32px]
            border
            border-[#D4AF37]/20
          "

        />




        <div

          className="
            relative
          "

        >



          {/* Crown Seal */}

          <motion.div

            animate={{
              y:[0,-5,0]
            }}

            transition={{
              duration:3,
              repeat:Infinity
            }}

            className="
              mx-auto
              mb-7
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              border
              border-[#D4AF37]/50
              bg-[#1B120A]
              text-[#D4AF37]
            "

          >

            <Crown size={30}/>

          </motion.div>





          <p

            className="
              flex
              items-center
              justify-center
              gap-2
              text-xs
              uppercase
              tracking-[0.35em]
              text-[#D4AF37]
            "

          >

            <Sparkles size={14}/>

            Premium Cosmic Report

          </p>





          <h2

            className="
              mt-6
              font-serif
              text-3xl
              leading-tight
              text-[#FFF9E8]
              md:text-5xl
            "

          >

            Your Complete
            <br/>

            Cosmic Manuscript

          </h2>





          <p

            className="
              mx-auto
              mt-5
              max-w-2xl
              leading-relaxed
              text-[#E7D9B8]
            "

          >

            Transform your birth chart into a deeper
            personal guide with planetary wisdom,
            life patterns and future timing insights.

          </p>






          {/* Features */}

          <div

            className="
              mt-10
              grid
              gap-4
              sm:grid-cols-2
            "

          >

            {
              FEATURES.map((item)=>(

                <div

                  key={item}

                  className="
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-[#D4AF37]/20
                    bg-[#1B120A]
                    px-5
                    py-4
                    text-left
                    text-sm
                    text-[#F8F1DE]
                  "

                >

                  <ScrollText
                    size={16}
                    className="text-[#D4AF37]"
                  />

                  {item}


                </div>

              ))
            }


          </div>







          {/* CTA */}

          <button

            className="
              mt-10
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-[#D4AF37]
              px-9
              py-4
              text-sm
              font-semibold
              text-[#120C08]
              transition
              hover:bg-[#8B5E00]
              hover:text-white
            "

          >

            Unlock My Cosmic Blueprint

            <ArrowRight size={18}/>

          </button>



        </div>


      </motion.div>


    </section>

  );

}