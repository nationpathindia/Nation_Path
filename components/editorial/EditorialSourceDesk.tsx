"use client";

import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";


type SourceItem = {
  name?: string;
  type?: string;
  link?: string;
  description?: string;
};



type Props = {
  sourceDesk?: unknown;
};



export default function EditorialSourceDesk({
  sourceDesk,
}: Props) {


  if (
    !Array.isArray(sourceDesk) ||
    sourceDesk.length === 0
  ) {
    return null;
  }



  const sources = Array.isArray(sourceDesk)
  ? sourceDesk
  : (
      sourceDesk &&
      typeof sourceDesk === "object" &&
      "sources" in sourceDesk
    )
  ? (sourceDesk as any).sources
  : [];



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

          <Newspaper size={20}/>

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
            Editorial Transparency
          </p>



          <h3
            className="
              text-xl
              font-bold
              text-[#163C80]
            "
          >
            Source Desk
          </h3>


        </div>


      </div>







      <div
        className="
          space-y-4
        "
      >


        {
         sources.map((source:any,index:number)=>(


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
                source.name &&
                <h4
                  className="
                    font-bold
                    text-[#163C80]
                  "
                >
                  {source.name}
                </h4>
              }





              {
                source.type &&
                <p
                  className="
                    mt-1
                    text-xs
                    uppercase
                    tracking-wide
                    text-[#EA661B]
                  "
                >
                  {source.type}
                </p>
              }






              {
                source.description &&
                <p
                  className="
                    mt-3
                    text-sm
                    leading-7
                    text-gray-600
                  "
                >
                  {source.description}
                </p>
              }






              {
                source.link &&
                <a
                  href={source.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-3
                    inline-block
                    text-sm
                    font-semibold
                    text-[#163C80]
                    hover:text-[#EA661B]
                  "
                >
                  View Source →
                </a>
              }



            </div>


          ))
        }


      </div>




    </motion.section>

  );

}