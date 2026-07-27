"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// HOUSE INTELLIGENCE CARD
//
// Ancient Life Chapter Archive
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import { Home } from "lucide-react";


interface HouseCardProps {
  house:string;
  title:string;
  description:string;
}


export default function HouseCard({
  house,
  title,
  description,
}:HouseCardProps){

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


      {/* Manuscript Glow */}

      <div
        className="
          absolute
          -right-10
          -top-10
          h-28
          w-28
          rounded-full
          bg-[#D4AF37]/15
          blur-3xl
        "
      />



      {/* House Seal */}

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

        <Home size={20}/>

      </div>




      <p

        className="
          text-xs
          uppercase
          tracking-[0.25em]
          text-[#8B5E00]
        "

      >

        {house}

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




      {/* Chapter Line */}

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