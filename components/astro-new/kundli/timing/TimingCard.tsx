"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// KUNDLI INTELLIGENCE EXPERIENCE
//
// TIMING INTELLIGENCE CARD
//
// Cosmic Time Cycle Archive
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import {
  Clock3,
  Sparkles,
  Orbit,
} from "lucide-react";


interface TimingCardProps {

  period:string;
  title:string;
  description:string;

}



export default function TimingCard({

  period,
  title,
  description,

}:TimingCardProps){


  return (

    <motion.div

      whileHover={{
        y:-3
      }}

      transition={{
        duration:.25
      }}

      className="
        relative
        overflow-hidden
        rounded-[26px]
        border
        border-[#D4AF37]/25
        bg-[#1B120A]
        px-5
        py-6
        md:px-7
        md:py-7
      "

    >


      {/* Soft Cosmic Glow */}

      <div

        className="
          absolute
          right-[-40px]
          top-[-40px]
          h-40
          w-40
          rounded-full
          bg-[#D4AF37]/10
          blur-[70px]
        "

      />



      <div className="relative">


        {/* Header */}

        <div

          className="
            flex
            items-center
            justify-between
          "

        >

          <div

            className="
              flex
              items-center
              gap-3
            "

          >

            <div

              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-[#D4AF37]/40
                bg-[#120C08]
                text-[#D4AF37]
              "

            >

              <Clock3 size={18}/>

            </div>



            <span

              className="
                text-[11px]
                uppercase
                tracking-[0.3em]
                text-[#D4AF37]
              "

            >

              {period}

            </span>


          </div>



          <Orbit

            size={18}

            className="
              text-[#D4AF37]/50
            "

          />


        </div>






        {/* Main Content */}

        <div

          className="
            mt-7
          "

        >

          <p

            className="
              flex
              items-center
              gap-2
              text-[10px]
              uppercase
              tracking-[0.35em]
              text-[#8B5E00]
            "

          >

            <Sparkles size={12}/>

            Planetary Season

          </p>




          <h3

            className="
              mt-3
              font-serif
              text-2xl
              leading-tight
              text-[#FFF9E8]
              md:text-3xl
            "

          >

            {title}

          </h3>




          <p

            className="
              mt-4
              max-w-2xl
              text-sm
              leading-relaxed
              text-[#E7D9B8]
            "

          >

            {description}

          </p>


        </div>








        {/* Cosmic Time Axis */}

        <div

          className="
            mt-7
            flex
            items-center
            gap-3
          "

        >

          <span

            className="
              text-[10px]
              uppercase
              tracking-[0.25em]
              text-[#8B5E00]
            "

          >

            Past

          </span>



          <div

            className="
              relative
              h-px
              flex-1
              bg-[#D4AF37]/25
            "

          >

            <span

              className="
                absolute
                left-1/2
                top-1/2
                h-3
                w-3
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-[#D4AF37]
                bg-[#120C08]
              "

            />


          </div>



          <span

            className="
              text-[10px]
              uppercase
              tracking-[0.25em]
              text-[#D4AF37]
            "

          >

            Now

          </span>



          <div

            className="
              h-px
              flex-1
              bg-[#D4AF37]/25
            "

          />



          <span

            className="
              text-[10px]
              uppercase
              tracking-[0.25em]
              text-[#8B5E00]
            "

          >

            Future

          </span>


        </div>




      </div>


    </motion.div>

  );

}