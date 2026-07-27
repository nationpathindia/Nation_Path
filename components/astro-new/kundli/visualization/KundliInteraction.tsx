"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// KUNDLI INTELLIGENCE EXPERIENCE
//
// BLUEPRINT CHAPTER INDEX
//
// Ancient Archive Navigation
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import {
  CircleDot,
  Home,
  Sparkles,
  ArrowRight,
} from "lucide-react";


const OPTIONS = [
  {
    number:"01",
    icon:CircleDot,
    title:"Planetary Forces",
    description:
      "The celestial energies recorded at your birth moment.",
  },
  {
    number:"02",
    icon:Home,
    title:"Life Chambers",
    description:
      "The twelve areas where your journey unfolds.",
  },
  {
    number:"03",
    icon:Sparkles,
    title:"Personal Journey",
    description:
      "Your patterns, abilities and cosmic direction.",
  },
];



export default function KundliInteraction(){

  return (

    <div
      className="
        flex
        h-full
        flex-col
        justify-center
      "
    >


      {/* Header */}

      <div
        className="
          mb-8
        "
      >

        <p
          className="
            text-xs
            uppercase
            tracking-[0.4em]
            text-[#8B5E00]
          "
        >
          Blueprint Chapters
        </p>


        <h3
          className="
            mt-3
            font-serif
            text-3xl
            text-[#3B2600]
          "
        >
          Explore Your Archive
        </h3>


        <div
          className="
            mt-4
            h-px
            w-20
            bg-[#D4AF37]
          "
        />

      </div>






      {/* Chapter List */}

      <div
        className="
          space-y-4
        "
      >

      {
        OPTIONS.map((item,index)=>{

          const Icon = item.icon;


          return (

            <motion.div

              key={item.title}

              initial={{
                opacity:0,
                x:25
              }}

              whileInView={{
                opacity:1,
                x:0
              }}

              viewport={{
                once:true
              }}

              transition={{
                duration:.5,
                delay:index*.12
              }}

              className="
                group
                relative
                flex
                gap-4
                overflow-hidden
                border-b
                border-[#D4AF37]/20
                pb-5
                pt-3
              "

            >



              {/* Gold Hover Line */}

              <div
                className="
                  absolute
                  left-0
                  top-0
                  h-full
                  w-1
                  bg-[#D4AF37]
                  opacity-0
                  transition
                  group-hover:opacity-100
                "
              />





              {/* Number */}

              <div
                className="
                  w-8
                  font-serif
                  text-2xl
                  text-[#D4AF37]
                "
              >

                {item.number}

              </div>






              {/* Icon */}

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#D4AF37]/40
                  text-[#8B5E00]
                  transition
                  group-hover:bg-[#D4AF37]
                  group-hover:text-[#120C08]
                "
              >

                <Icon size={18}/>

              </div>






              {/* Content */}

              <div
                className="
                  flex-1
                "
              >

                <h4
                  className="
                    font-serif
                    text-xl
                    text-[#3B2600]
                  "
                >

                  {item.title}

                </h4>


                <p
                  className="
                    mt-1
                    text-sm
                    leading-relaxed
                    text-[#5A3908]
                  "
                >

                  {item.description}

                </p>



              </div>






              <ArrowRight

                size={16}

                className="
                  mt-3
                  text-[#8B5E00]
                  opacity-0
                  transition
                  group-hover:translate-x-1
                  group-hover:opacity-100
                "

              />



            </motion.div>

          );

        })
      }


      </div>


    </div>

  );

}