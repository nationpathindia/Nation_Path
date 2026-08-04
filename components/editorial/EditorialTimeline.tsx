"use client";

import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";


type Props = {
  timeline?: unknown;
};



export default function EditorialTimeline({

  timeline,

}: Props) {



  if (!timeline) return null;



  let items: Array<{
    title?: string;
    description?: string;
    date?: string;
  }> = [];





  /*
  =====================================================
  STRING CMS FORMAT
  =====================================================
  */


  if (typeof timeline === "string") {


    const blocks = timeline

      .split(/(?=\d{4}\s*[–-])/)

      .map((item) => item.trim())

      .filter(Boolean);



    items = blocks.map((block) => {


      const lines = block.split("\n");



      return {

        title: lines[0]?.trim(),

        description:

          lines

            .slice(1)

            .join(" ")

            .trim(),

      };


    });



  }







  /*
  =====================================================
  ARRAY FORMAT
  =====================================================
  */


  else if (Array.isArray(timeline)) {


    items = timeline.map((item:any)=>({

      title:
        item.title ||
        item.date ||
        "",


      description:
        item.description ||
        "",


      date:
        item.date || ""

    }));


  }







  /*
  =====================================================
  OBJECT FORMAT
  =====================================================
  */


  else if (

    typeof timeline === "object" &&

    timeline !== null &&

    "events" in timeline

  ) {



    items = (timeline as any).events.map((item:any)=>({


      title:
        item.title ||
        item.date ||
        "",


      description:
        item.description ||
        "",


      date:
        item.date || ""


    }));



  }





  if(items.length === 0) return null;








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
            bg-[#163C80]
            text-white
          "

        >

          <Clock3 size={20}/>

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

            Context

          </p>





          <h3

            className="
              text-xl
              font-bold
              text-[#163C80]
            "

          >

            Timeline

          </h3>



        </div>



      </div>









      <div className="space-y-8">



        {

          items.map((item,index)=>(


            <div

              key={index}

              className="
                relative
                border-l-2
                border-gray-200
                pl-6
              "

            >



              <div

                className="
                  absolute
                  -left-[9px]
                  top-1
                  h-4
                  w-4
                  rounded-full
                  bg-[#EA661B]
                "

              />







              {

                item.date &&

                <p

                  className="
                    mb-1
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-500
                  "

                >

                  {item.date}

                </p>

              }








              {

                item.title &&

                <h4

                  className="
                    text-base
                    font-bold
                    text-[#163C80]
                  "

                >

                  {item.title}

                </h4>

              }








              {

                item.description &&

                <p

                  className="
                    mt-2
                    text-sm
                    leading-7
                    text-gray-600
                  "

                >

                  {item.description}

                </p>

              }




            </div>


          ))

        }



      </div>





    </motion.section>


  );

}