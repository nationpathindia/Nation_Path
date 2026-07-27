"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// KUNDLI INTELLIGENCE EXPERIENCE
//
// PREMIUM COSMIC REPORT
//
// Royal Manuscript Conversion Chamber
//////////////////////////////////////////////////////////////

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Crown,
  Sparkles,
  ScrollText,
  LockKeyhole,
  Star,
} from "lucide-react";



const UNLOCKS = [

  "Complete Planet Intelligence",

  "Life Chapter Analysis",

  "Future Timing Intelligence",

];





export default function KundliPremiumBanner(){


  return (

    <section

      className="
        relative
        overflow-hidden
        bg-[#120C08]
        px-5
        py-16
        md:px-10
        md:py-24
      "

    >



      {/* Golden Manuscript Aura */}

      <div

        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[420px]
          w-[420px]
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
          max-w-4xl
          overflow-hidden
          rounded-[2.5rem]
          border
          border-[#D4AF37]/30
          bg-[#1B120A]
          px-6
          py-12
          text-center
          shadow-[0_30px_90px_rgba(0,0,0,0.45)]
          md:px-12
          md:py-16
        "

      >




        {/* Decorative Stars */}

        <div

          className="
            absolute
            left-8
            top-8
            text-[#D4AF37]/50
          "

        >

          <Star size={18}/>

        </div>


        <div

          className="
            absolute
            right-8
            top-10
            text-[#D4AF37]/40
          "

        >

          <Sparkles size={20}/>

        </div>







        {/* Label */}

        <motion.p

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

          transition={{
            duration:.5
          }}

          className="
            text-[10px]
            uppercase
            tracking-[0.45em]
            text-[#D4AF37]
          "

        >

          Premium Cosmic Report

        </motion.p>








        {/* Royal Seal */}

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

          transition={{
            duration:.6
          }}

          className="
            relative
            mx-auto
            mt-7
            flex
            h-28
            w-28
            items-center
            justify-center
          "

        >



          <motion.div

            animate={{
              rotate:360
            }}

            transition={{
              duration:45,
              repeat:Infinity,
              ease:"linear"
            }}

            className="
              absolute
              inset-0
              rounded-full
              border
              border-[#D4AF37]/30
            "

          />




          <div

            className="
              flex
              h-20
              w-20
              flex-col
              items-center
              justify-center
              rounded-full
              border
              border-[#D4AF37]/60
              bg-[#120C08]
              text-[#D4AF37]
              shadow-[0_0_35px_rgba(212,175,55,0.2)]
            "

          >

            <Crown size={24}/>


            <span

              className="
                mt-1
                text-[8px]
                tracking-[0.35em]
              "

            >

              NPA

            </span>


          </div>



        </motion.div>









        {/* Heading */}

        <motion.h2

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
            duration:.6,
            delay:.1
          }}

          className="
            mt-8
            font-serif
            text-3xl
            leading-tight
            text-[#FFF9E8]
            md:text-5xl
          "

        >

          Your Cosmic Manuscript
          <br />

          Awaits

        </motion.h2>








        <motion.p

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

          transition={{
            duration:.5,
            delay:.2
          }}

          className="
            mx-auto
            mt-5
            max-w-xl
            text-sm
            leading-relaxed
            text-[#DCCCA6]
            md:text-base
          "

        >

          Your birth chart revealed the foundation.
          Your planetary cycles revealed the journey.
          Unlock the complete intelligence layer of your cosmic blueprint.

        </motion.p>









        {/* Unlock List */}

        <div

          className="
            mx-auto
            mt-9
            flex
            max-w-md
            flex-col
            gap-3
          "

        >

          {
            UNLOCKS.map((item,index)=>(


              <motion.div

                key={item}

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

                transition={{
                  delay:index*.1
                }}

                className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  text-sm
                  text-[#E7D9B8]
                "

              >

                <Sparkles

                  size={14}

                  className="
                    text-[#D4AF37]
                  "

                />


                {item}


              </motion.div>


            ))
          }


        </div>









        {/* CTA */}

        <Link

          href="/pricing"

          className="
            group
            mx-auto
            mt-10
            inline-flex
            items-center
            gap-3
            rounded-full
            bg-[#D4AF37]
            px-8
            py-4
            text-sm
            font-semibold
            uppercase
            tracking-[0.18em]
            text-[#120C08]
            transition
            duration-300
            hover:bg-[#F0C95A]
            hover:shadow-[0_15px_45px_rgba(212,175,55,0.35)]
          "

        >

          <LockKeyhole size={16}/>


          Reveal My Complete Blueprint


          <ScrollText

            size={17}

            className="
              transition-transform
              group-hover:translate-x-1
            "

          />


        </Link>






      </div>


    </section>

  );

}