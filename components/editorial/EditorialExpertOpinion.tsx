"use client";

import { motion } from "framer-motion";
import { UserRound } from "lucide-react";


type ExpertItem = {
  name?: string;
  role?: string;
  opinion?: string;
  quote?: string;
};


type Props = {
  expertOpinion?: unknown;
};



export default function EditorialExpertOpinion({
  expertOpinion,
}: Props) {


  if (!expertOpinion) {
    return null;
  }



  const experts: ExpertItem[] = Array.isArray(expertOpinion)
    ? expertOpinion
    : (
        expertOpinion &&
        typeof expertOpinion === "object"
      )
    ? [expertOpinion as ExpertItem]
    : [];



  if (experts.length === 0) {
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
        bg-gray-50
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
            bg-[#163C80]
            text-white
          "
        >

          <UserRound size={20}/>

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
            Expert View
          </p>


          <h3
            className="
              text-xl
              font-bold
              text-[#163C80]
            "
          >
            Expert Perspective
          </h3>


        </div>


      </div>





      <div
        className="
          space-y-6
        "
      >


        {
          experts.map((expert,index)=>(


            <div
              key={index}
              className="
                rounded-xl
                border
                border-gray-200
                bg-white
                p-5
              "
            >


              {
                expert.name &&
                <h4
                  className="
                    font-bold
                    text-[#163C80]
                  "
                >
                  {expert.name}
                </h4>
              }




              {
                expert.role &&
                <p
                  className="
                    mt-1
                    text-xs
                    uppercase
                    tracking-wide
                    text-[#EA661B]
                  "
                >
                  {expert.role}
                </p>
              }





              {
                expert.quote &&
                <blockquote
                  className="
                    mt-4
                    border-l-4
                    border-[#EA661B]
                    pl-4
                    text-sm
                    italic
                    leading-7
                    text-gray-700
                  "
                >
                  "{expert.quote}"
                </blockquote>
              }





              {
                expert.opinion &&
                <p
                  className="
                    mt-4
                    text-sm
                    leading-7
                    text-gray-600
                  "
                >
                  {expert.opinion}
                </p>
              }


            </div>


          ))
        }


      </div>



    </motion.section>

  );

}