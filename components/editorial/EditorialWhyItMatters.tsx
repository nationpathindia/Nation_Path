"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";


type Props = {
  whyItMatters?: string | null;
};



export default function EditorialWhyItMatters({
  whyItMatters,
}: Props) {


  if (!whyItMatters) return null;


  return (

    <motion.section

      initial={{
        opacity:0,
        y:20,
      }}

      animate={{
        opacity:1,
        y:0,
      }}

      transition={{
        duration:0.4,
      }}

      className="
        my-8
        rounded-2xl
        border
        border-[#EA661B]/20
        bg-white
        p-6
        shadow-sm
        md:p-8
      "

    >


      <div
        className="
          mb-5
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
            bg-[#EA661B]
            text-white
          "
        >

          <Lightbulb size={20}/>

        </div>




        <div>

          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[#EA661B]
            "
          >
            Analysis
          </p>



          <h3
            className="
              text-xl
              font-bold
              text-[#163C80]
            "
          >
            Why It Matters
          </h3>


        </div>



      </div>





      <p
        className="
          text-base
          leading-8
          text-gray-700
        "
      >

        {whyItMatters}

      </p>



    </motion.section>

  );

}