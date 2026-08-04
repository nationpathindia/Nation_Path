"use client";

import { motion } from "framer-motion";
import { ArrowRightCircle } from "lucide-react";


type Props = {
  whatsNext?: string | null;
};



export default function EditorialWhatsNext({
  whatsNext,
}: Props) {


  if (!whatsNext) return null;


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
        border-[#163C80]/20
        bg-[#163C80]/5
        p-6
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
            bg-[#163C80]
            text-white
          "
        >

          <ArrowRightCircle size={21}/>

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
            Future Outlook
          </p>



          <h3
            className="
              text-xl
              font-bold
              text-[#163C80]
            "
          >
            What Happens Next
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

        {whatsNext}

      </p>





    </motion.section>

  );

}