"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";


type FactItem = {
  claim?: string;
  status?: string;
  explanation?: string;
};


type Props = {
  factCheck?: unknown;
};


export default function EditorialFactCheck({
  factCheck,
}: Props) {


  if (!factCheck) {
    return null;
  }



  const facts: FactItem[] = Array.isArray(factCheck)
    ? factCheck
    : (
        factCheck &&
        typeof factCheck === "object"
      )
    ? [factCheck as FactItem]
    : [];



  if (facts.length === 0) {
    return null;
  }




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
        bg-white
        p-6
        md:p-8
      "

    >


      <div
        className="
          mb-8
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

          <BadgeCheck size={20}/>

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
            Verification
          </p>


          <h3
            className="
              text-xl
              font-bold
              text-[#163C80]
            "
          >
            Fact Check
          </h3>


        </div>


      </div>





      <div
        className="
          space-y-5
        "
      >


        {
          facts.map((fact,index)=>(


            <div
              key={index}
              className="
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                p-5
              "
            >


              {
                fact.claim &&
                <p
                  className="
                    font-semibold
                    text-gray-800
                  "
                >
                  {fact.claim}
                </p>
              }




              {
                fact.status &&
                <span
                  className="
                    mt-3
                    inline-flex
                    rounded-full
                    bg-[#163C80]
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-white
                  "
                >
                  {fact.status}
                </span>
              }





              {
                fact.explanation &&
                <p
                  className="
                    mt-4
                    text-sm
                    leading-7
                    text-gray-600
                  "
                >
                  {fact.explanation}
                </p>
              }


            </div>


          ))
        }


      </div>



    </motion.section>

  );

}