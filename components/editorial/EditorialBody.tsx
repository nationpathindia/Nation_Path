"use client";

import { motion } from "framer-motion";


type Props = {
  content?: string | null;
};



function cleanHtml(html:string){

  return html
    .replace(/\s+/g," ")
    .trim();

}



export default function EditorialBody({

  content,

}:Props){


  if(!content) return null;



  const cleanedContent = cleanHtml(content);



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
        my-10
        rounded-2xl
        bg-white
      "

    >


      <div

        className="
          prose
          prose-lg
          max-w-none

          prose-headings:text-[#163C80]

          prose-p:text-gray-700
          prose-p:leading-8

          prose-strong:text-[#163C80]

          prose-a:text-[#EA661B]

          prose-li:text-gray-700

        "

        dangerouslySetInnerHTML={{

          __html: cleanedContent

        }}

      />


    </motion.section>

  );

}