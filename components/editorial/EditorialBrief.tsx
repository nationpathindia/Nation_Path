"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

type Props = {
  shortBrief?: string | null;
};


export default function EditorialBrief({
  shortBrief,
}: Props) {


  if (!shortBrief) return null;


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
        border-gray-200
        bg-gray-50
        p-6
        md:p-8
      "

    >


      <div
        className="
          mb-4
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
            bg-[#163C80]
            text-white
          "
        >

          <FileText size={20}/>

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
            NationPath Insight
          </p>


          <h3
            className="
              text-xl
              font-bold
              text-[#163C80]
            "
          >
            Executive Brief
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

        {shortBrief}

      </p>


    </motion.section>

  );

}