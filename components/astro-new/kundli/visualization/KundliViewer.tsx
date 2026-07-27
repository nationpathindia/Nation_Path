"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// KUNDLI INTELLIGENCE EXPERIENCE
//
// ANCIENT VEDIC CHART ROOM
//
// Personal Cosmic Blueprint Archive
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import {
  ScrollText,
  Sparkles,
  Crown,
} from "lucide-react";

import KundliInteraction from "./KundliInteraction";


export default function KundliViewer() {


  return (

    <section
      className="
        bg-[#F8F1DE]
        px-5
        py-20
        md:px-10
        md:py-28
      "
    >


      <div
        className="
          mx-auto
          max-w-7xl
        "
      >



        {/* HEADER */}

        <motion.div

          initial={{
            opacity:0,
            y:20
          }}

          whileInView={{
            opacity:1,
            y:0
          }}

          viewport={{
            once:true
          }}

          transition={{
            duration:.7
          }}

          className="
            mb-12
            text-center
          "

        >

          <ScrollText

            size={28}

            className="
              mx-auto
              text-[#8B5E00]
            "

          />


          <p
            className="
              mt-5
              text-xs
              uppercase
              tracking-[0.45em]
              text-[#8B5E00]
            "
          >
            Personal Cosmic Archive
          </p>



          <h2
            className="
              mt-4
              font-serif
              text-3xl
              text-[#3B2600]
              md:text-5xl
            "
          >
            Your Vedic Blueprint
          </h2>



          <p
            className="
              mx-auto
              mt-5
              max-w-xl
              text-sm
              leading-relaxed
              text-[#5A3908]
              md:text-base
            "
          >
            Open your personal manuscript of planetary
            patterns, life chambers and cosmic intelligence.
          </p>


        </motion.div>








        {/* MAIN ARCHIVE */}

        <motion.div

          initial={{
            opacity:0,
            y:35
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
            overflow-hidden
            rounded-[40px]
            border
            border-[#D4AF37]/40
            bg-[#EFE2C0]
            p-5
            shadow-[0_35px_100px_rgba(139,94,0,0.18)]
            md:p-10
          "

        >




          {/* Royal Inner Frame */}

          <div
            className="
              pointer-events-none
              absolute
              inset-4
              rounded-[32px]
              border
              border-[#D4AF37]/25
            "
          />







          <div
            className="
              relative
              grid
              gap-8
              lg:grid-cols-[1.15fr_.85fr]
              lg:items-stretch
            "
          >








            {/* LEFT : CHART ROOM */}

            <div
              className="
                relative
                flex
                min-h-[460px]
                items-center
                justify-center
                overflow-hidden
                rounded-[32px]
                border
                border-[#D4AF37]/35
                bg-[#FFF9E8]
                p-8
              "
            >



              {/* Manuscript Glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  h-80
                  w-80
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-[#D4AF37]/10
                  blur-[110px]
                "
              />






              {/* Chart Frame */}

              <motion.div

                initial={{
                  opacity:0,
                  scale:.92
                }}

                whileInView={{
                  opacity:1,
                  scale:1
                }}

                viewport={{
                  once:true
                }}

                transition={{
                  duration:.8
                }}

                className="
                  relative
                  flex
                  h-80
                  w-80
                  items-center
                  justify-center
                  rounded-[26px]
                  border
                  border-[#8B5E00]/35
                  bg-[#F8F1DE]
                  shadow-inner
                  md:h-[370px]
                  md:w-[370px]
                "

              >



                {/* Future KundliSvg Mount */}

                <div
                  className="
                    flex
                    flex-col
                    items-center
                    text-center
                    text-[#8B5E00]
                  "
                >

                  <Crown
                    size={38}
                    className="
                      mb-5
                      text-[#D4AF37]
                    "
                  />


                  <p
                    className="
                      font-serif
                      text-2xl
                    "
                  >
                    Your Kundli
                  </p>


                  <p
                    className="
                      mt-2
                      text-xs
                      uppercase
                      tracking-[0.35em]
                    "
                  >
                    Sacred Chart
                  </p>


                </div>



              </motion.div>




            </div>










            {/* RIGHT : CHAPTERS */}

            <div
              className="
                rounded-[32px]
                border
                border-[#D4AF37]/30
                bg-[#F8EFD6]
                p-6
                md:p-8
              "
            >

              <KundliInteraction />

            </div>






          </div>








          {/* FOOTER */}

          <div
            className="
              relative
              mt-8
              flex
              items-center
              justify-center
              gap-2
              text-center
              text-xs
              uppercase
              tracking-[0.3em]
              text-[#8B5E00]
            "
          >

            <Sparkles size={14}/>

            Personal Cosmic Manuscript

          </div>



        </motion.div>



      </div>



    </section>

  );

}