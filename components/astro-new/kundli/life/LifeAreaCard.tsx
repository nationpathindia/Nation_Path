"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// LIFE BLUEPRINT CARD
//
// Personal Destiny Manuscript
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import { Compass } from "lucide-react";


interface LifeAreaCardProps {
  area:string;
  title:string;
  description:string;
}


export default function LifeAreaCard({
  area,
  title,
  description,
}:LifeAreaCardProps){

  return (

    <motion.div

      whileHover={{
        y:-8
      }}

      transition={{
        duration:.25
      }}

      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-[#D4AF37]/35
        bg-[#F1E6C8]
        p-6
        shadow-sm
      "

    >


      {/* Golden Manuscript Glow */}

      <div
        className="
          absolute
          -right-10
          -top-10
          h-32
          w-32
          rounded-full
          bg-[#D4AF37]/15
          blur-3xl
        "
      />



      {/* Compass Seal */}

      <div

        className="
          relative
          mb-6
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          border
          border-[#D4AF37]/50
          bg-[#FFF9E8]
          text-[#8B5E00]
          transition
          group-hover:bg-[#D4AF37]
          group-hover:text-[#120C08]
        "

      >

        <Compass size={20}/>

      </div>




      <p

        className="
          text-xs
          uppercase
          tracking-[0.25em]
          text-[#8B5E00]
        "

      >

        {area}

      </p>




      <h3

        className="
          mt-3
          font-serif
          text-xl
          text-[#3B2600]
        "

      >

        {title}

      </h3>




      <p

        className="
          mt-4
          text-sm
          leading-relaxed
          text-[#5A3908]
        "

      >

        {description}

      </p>



      {/* Blueprint Line */}

      <div

        className="
          mt-6
          h-px
          w-12
          bg-[#D4AF37]
          transition-all
          group-hover:w-20
        "

      />


    </motion.div>

  );

}