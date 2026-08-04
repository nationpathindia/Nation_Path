"use client";

import { motion } from "framer-motion";
import { ListChecks } from "lucide-react";


type Props = {
  takeaways?: unknown;
};



export default function EditorialTakeaways({
  takeaways,
}: Props) {


  if (!takeaways) {
    return null;
  }



  const items: string[] = Array.isArray(takeaways)

    ? takeaways.filter(
        (item): item is string =>
          typeof item === "string" &&
          item.trim().length > 0
      )

    : typeof takeaways === "string"

    ? takeaways
        .split("\n")
        .map(item => item.trim())
        .filter(Boolean)

    : [];




  if (items.length === 0) {
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
          mb-6
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

          <ListChecks size={20}/>

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
            Summary
          </p>



          <h3
            className="
              text-xl
              font-bold
              text-[#163C80]
            "
          >
            Key Takeaways
          </h3>


        </div>


      </div>







      <ul
        className="
          space-y-4
        "
      >

        {
          items.map((item,index)=>(


            <li
              key={index}
              className="
                flex
                gap-3
                text-base
                leading-7
                text-gray-700
              "
            >


              <span
                className="
                  mt-2
                  h-2
                  w-2
                  shrink-0
                  rounded-full
                  bg-[#EA661B]
                "
              />


              <span>
                {item}
              </span>


            </li>


          ))
        }


      </ul>




    </motion.section>

  );

}