"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// KUNDLI INTELLIGENCE EXPERIENCE
//
// HOUSE INTELLIGENCE
//
// Twelve Life Chambers Map
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import {
  Home,
  Sparkles,
  Crown,
} from "lucide-react";


const HOUSES = [
  {
    number:"01",
    name:"Identity",
    meaning:"Self & Personality",
  },
  {
    number:"02",
    name:"Wealth",
    meaning:"Resources & Values",
  },
  {
    number:"03",
    name:"Courage",
    meaning:"Skills & Expression",
  },
  {
    number:"04",
    name:"Foundation",
    meaning:"Home & Inner Peace",
  },
  {
    number:"05",
    name:"Creativity",
    meaning:"Talent & Joy",
  },
  {
    number:"06",
    name:"Service",
    meaning:"Health & Discipline",
  },
  {
    number:"07",
    name:"Partnership",
    meaning:"Relationships",
  },
  {
    number:"08",
    name:"Transformation",
    meaning:"Change & Depth",
  },
  {
    number:"09",
    name:"Wisdom",
    meaning:"Learning & Dharma",
  },
  {
    number:"10",
    name:"Career",
    meaning:"Work & Purpose",
  },
  {
    number:"11",
    name:"Gains",
    meaning:"Networks & Dreams",
  },
  {
    number:"12",
    name:"Spirituality",
    meaning:"Release & Inner Growth",
  },
];



export default function HouseIntelligence(){


  return (

    <section
      className="
        relative
        overflow-hidden
        bg-[#EFE2C0]
        px-5
        py-20
        md:px-10
        md:py-24
      "
    >



      {/* Background */}

      <div
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          h-[400px]
          w-[400px]
          rounded-full
          bg-[#D4AF37]/10
          blur-[140px]
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
            mb-10
            text-center
          "
        >

          <Home
            size={28}
            className="
              mx-auto
              text-[#8B5E00]
            "
          />


          <p
            className="
              mt-4
              text-xs
              uppercase
              tracking-[0.45em]
              text-[#8B5E00]
            "
          >
            House Intelligence
          </p>


          <h2
            className="
              mt-4
              font-serif
              text-3xl
              text-[#3B2600]
              md:text-5xl
            "
          >
            Twelve Life Chambers
          </h2>


          <p
            className="
              mx-auto
              mt-4
              max-w-xl
              text-sm
              text-[#5A3908]
            "
          >
            The twelve spaces where your
            personal journey unfolds.
          </p>


        </div>








        {/* Life Map */}

        <div
          className="
            rounded-[34px]
            border
            border-[#D4AF37]/40
            bg-[#F8F1DE]
            p-6
            shadow-[0_30px_80px_rgba(139,94,0,0.15)]
            md:p-10
          "
        >



          <div
            className="
              grid
              gap-x-8
              gap-y-5
              md:grid-cols-3
              lg:grid-cols-4
            "
          >


          {
            HOUSES.map((house,index)=>(

              <motion.div

                key={house.number}

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
                  delay:index*.04
                }}

                className="
                  group
                  relative
                  border-b
                  border-[#D4AF37]/25
                  pb-4
                  transition
                  hover:border-[#8B5E00]
                "

              >



                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <span
                    className="
                      font-serif
                      text-lg
                      text-[#D4AF37]
                    "
                  >
                    {house.number}
                  </span>



                  <h3
                    className="
                      font-serif
                      text-lg
                      text-[#3B2600]
                    "
                  >
                    {house.name}
                  </h3>


                </div>



                <p
                  className="
                    mt-2
                    pl-8
                    text-xs
                    text-[#6B4A16]
                  "
                >
                  {house.meaning}
                </p>



              </motion.div>

            ))
          }


          </div>




          {/* Footer Seal */}

          <div
            className="
              mt-8
              flex
              items-center
              justify-center
              gap-2
              text-xs
              uppercase
              tracking-[0.3em]
              text-[#8B5E00]
            "
          >

            <Crown size={14}/>

            Your Life Architecture

            <Sparkles size={14}/>

          </div>



        </div>





      </div>


    </section>

  );

}