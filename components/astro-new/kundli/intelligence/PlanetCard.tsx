"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// PLANET INTELLIGENCE CARD
//
// Royal Cosmic Archive
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import { Star } from "lucide-react";


interface PlanetCardProps {
  planet:string;
  title:string;
  description:string;
}


export default function PlanetCard({
  planet,
  title,
  description,
}:PlanetCardProps){

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
        border-[#D4AF37]/30
        bg-[#1B120A]
        p-6
        shadow-xl
      "

    >


      {/* Gold Aura */}

      <div
        className="
          absolute
          -right-10
          -top-10
          h-32
          w-32
          rounded-full
          bg-[#D4AF37]/10
          blur-3xl
        "
      />



      {/* Seal */}

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
          bg-[#120C08]
          text-[#D4AF37]
          group-hover:bg-[#D4AF37]
          group-hover:text-[#120C08]
          transition
        "

      >

        <Star size={20}/>

      </div>




      <p

        className="
          text-xs
          uppercase
          tracking-[0.25em]
          text-[#D4AF37]
        "

      >

        {planet}

      </p>



      <h3

        className="
          mt-3
          font-serif
          text-xl
          text-[#FFF9E8]
        "

      >

        {title}

      </h3>



      <p

        className="
          mt-4
          text-sm
          leading-relaxed
          text-[#E7D9B8]
        "

      >

        {description}

      </p>



      {/* Bottom Engraving */}

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