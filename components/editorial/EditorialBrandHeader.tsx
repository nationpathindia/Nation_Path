"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function EditorialBrandHeader() {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        mb-8
        border-b
        border-gray-200
        pb-6
      "
    >

      <div
        className="
          flex
          items-center
          gap-3
          mb-3
        "
      >

        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-[#163C80]
            text-white
          "
        >
          <Sparkles size={18} />
        </div>


        <div>

          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.25em]
              text-[#EA661B]
            "
          >
            NationPath
          </p>


          <h2
            className="
              text-xl
              font-bold
              tracking-tight
              text-[#163C80]
            "
          >
            Insight
          </h2>

        </div>


      </div>



      <p
        className="
          max-w-3xl
          text-sm
          leading-6
          text-gray-600
        "
      >
        Deep analysis, context and perspectives behind the stories
        shaping India and the world.
      </p>


    </motion.section>
  );
}