"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// KUNDLI INTELLIGENCE EXPERIENCE
//
// PLANETARY INTELLIGENCE LIBRARY
//
// Compact Planet Archive
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  Flame,
  Sparkles,
} from "lucide-react";


const PLANETS = [
  {
    icon: Sun,
    name:"Sun",
    title:"Soul & Identity",
    core:"Leadership",
    element:"Fire",
    strength:"Authority",
    keywords:"Purpose • Confidence • Recognition",
  },
  {
    icon: Moon,
    name:"Moon",
    title:"Mind & Emotions",
    core:"Intuition",
    element:"Water",
    strength:"Sensitivity",
    keywords:"Feelings • Memory • Imagination",
  },
  {
    icon: Flame,
    name:"Mars",
    title:"Energy & Action",
    core:"Courage",
    element:"Fire",
    strength:"Drive",
    keywords:"Power • Passion • Discipline",
  },
  {
    icon: Sparkles,
    name:"Mercury",
    title:"Intelligence",
    core:"Wisdom",
    element:"Air",
    strength:"Communication",
    keywords:"Learning • Logic • Expression",
  },
];



export default function PlanetIntelligence(){


  return (

    <section
      className="
        relative
        overflow-hidden
        bg-[#120C08]
        px-5
        py-16
        md:px-10
        md:py-20
      "
    >


      {/* Atmosphere */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[350px]
          w-[350px]
          -translate-x-1/2
          rounded-full
          bg-[#D4AF37]/10
          blur-[120px]
        "
      />



      <div
        className="
          relative
          mx-auto
          max-w-7xl
        "
      >



        {/* Header */}

        <div
          className="
            mb-8
            text-center
          "
        >

          <p
            className="
              text-xs
              uppercase
              tracking-[0.45em]
              text-[#D4AF37]
            "
          >
            Planetary Intelligence
          </p>


          <h2
            className="
              mt-4
              font-serif
              text-3xl
              text-[#F8F1DE]
              md:text-4xl
            "
          >
            Forces Within Your Blueprint
          </h2>


        </div>





        {/* Compact Archive */}

        <div
          className="
            overflow-hidden
            rounded-[28px]
            border
            border-[#D4AF37]/30
            bg-[#1B120A]
          "
        >


          <div
            className="
              grid
              md:grid-cols-4
            "
          >


          {
            PLANETS.map((planet,index)=>{

              const Icon = planet.icon;


              return (

                <motion.div

                  key={planet.name}

                  initial={{
                    opacity:0,
                    y:15
                  }}

                  whileInView={{
                    opacity:1,
                    y:0
                  }}

                  viewport={{
                    once:true
                  }}

                  transition={{
                    duration:.4,
                    delay:index*.1
                  }}

                  className="
                    group
                    relative
                    px-5
                    py-6
                    text-center
                    transition
                    hover:bg-[#24170D]
                    md:border-r
                    md:border-[#D4AF37]/20
                    last:border-none
                  "

                >



                  {/* Planet Seal */}

                  <div
                    className="
                      mx-auto
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#D4AF37]/50
                      text-[#D4AF37]
                      transition
                      group-hover:bg-[#D4AF37]
                      group-hover:text-[#120C08]
                    "
                  >

                    <Icon size={22}/>

                  </div>





                  <h3
                    className="
                      mt-4
                      font-serif
                      text-xl
                      text-[#F8F1DE]
                    "
                  >
                    {planet.name}
                  </h3>



                  <p
                    className="
                      mt-1
                      text-xs
                      uppercase
                      tracking-[0.2em]
                      text-[#D4AF37]
                    "
                  >
                    {planet.title}
                  </p>





                  {/* Archive Data */}

                  <div
                    className="
                      mt-5
                      space-y-2
                      border-t
                      border-[#D4AF37]/20
                      pt-4
                      text-xs
                    "
                  >

                    <div
                      className="
                        flex
                        justify-between
                        text-[#C9B58A]
                      "
                    >

                      <span>
                        Core
                      </span>

                      <span
                        className="
                          text-[#F8F1DE]
                        "
                      >
                        {planet.core}
                      </span>

                    </div>



                    <div
                      className="
                        flex
                        justify-between
                        text-[#C9B58A]
                      "
                    >

                      <span>
                        Element
                      </span>

                      <span
                        className="
                          text-[#F8F1DE]
                        "
                      >
                        {planet.element}
                      </span>

                    </div>



                    <div
                      className="
                        flex
                        justify-between
                        text-[#C9B58A]
                      "
                    >

                      <span>
                        Strength
                      </span>

                      <span
                        className="
                          text-[#F8F1DE]
                        "
                      >
                        {planet.strength}
                      </span>

                    </div>


                  </div>




                  <p
                    className="
                      mt-4
                      text-[11px]
                      leading-relaxed
                      text-[#8B5E00]
                    "
                  >
                    {planet.keywords}
                  </p>



                </motion.div>


              );

            })

          }


          </div>


        </div>



      </div>


    </section>

  );

}