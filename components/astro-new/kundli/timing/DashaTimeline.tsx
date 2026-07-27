"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// KUNDLI INTELLIGENCE EXPERIENCE
//
// TIMING INTELLIGENCE
//
// COSMIC CLOCK
//
// Interactive Planetary Seasons
//////////////////////////////////////////////////////////////

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock3,
  Sparkles,
  History,
  Telescope,
} from "lucide-react";

import TimingCard from "./TimingCard";


const SEASONS = {

  past: {

    label:"Past Era",

    title:"Previous Life Season",

    description:
      "Explore the planetary patterns, lessons and experiences that created your foundation and inner growth.",

  },


  current: {

    label:"Current Season",

    title:"Present Life Energy",

    description:
      "Understand the planetary influences shaping your decisions, responsibilities, growth and transformation.",

  },


  future: {

    label:"Future Chapter",

    title:"Upcoming Evolution",

    description:
      "Discover the upcoming planetary themes, opportunities and transitions waiting in your journey.",

  },

};





export default function DashaTimeline(){


  const [active,setActive] = useState<
    "past" | "current" | "future"
  >("current");



  const season = SEASONS[active];



  const OPTIONS = [

    {
      id:"past",
      icon:<History size={16}/>,
      text:"Past"
    },

    {
      id:"current",
      icon:<Sparkles size={16}/>,
      text:"Now"
    },

    {
      id:"future",
      icon:<Telescope size={16}/>,
      text:"Future"
    }

  ];



  return (

    <section

      className="
        relative
        overflow-hidden
        bg-[#120C08]
        px-5
        py-14
        md:px-10
        md:py-20
      "

    >



      {/* Cosmic Light */}

      <div

        className="
          absolute
          left-1/2
          top-[-100px]
          h-[320px]
          w-[320px]
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
          max-w-3xl
        "

      >





        {/* Title */}

        <motion.div

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
            duration:.5
          }}

          className="
            text-center
          "

        >


          <p

            className="
              text-[10px]
              uppercase
              tracking-[0.45em]
              text-[#D4AF37]
            "

          >

            Timing Intelligence

          </p>




          <h2

            className="
              mt-3
              font-serif
              text-3xl
              text-[#FFF9E8]
              md:text-5xl
            "

          >

            Cosmic Clock

          </h2>





          {/* Sacred Clock */}

          <div

            className="
              relative
              mx-auto
              mt-5
              flex
              h-[72px]
              w-[72px]
              items-center
              justify-center
            "

          >


            {/* Outer Ring */}

            <motion.div

              animate={{
                rotate:360
              }}

              transition={{
                duration:40,
                repeat:Infinity,
                ease:"linear"
              }}

              className="
                absolute
                inset-0
                rounded-full
                border
                border-[#D4AF37]/30
              "

            />



            {/* Inner Ring */}

            <div

              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                border
                border-[#D4AF37]/50
                bg-[#1B120A]
                text-[#D4AF37]
                shadow-[0_0_25px_rgba(212,175,55,0.18)]
              "

            >

              <Clock3 size={26}/>

            </div>



          </div>





          <p

            className="
              mx-auto
              mt-4
              max-w-md
              text-sm
              leading-relaxed
              text-[#DCCCA6]
            "

          >

            Your journey unfolds through planetary seasons.
            Explore the rhythm of your cosmic timeline.

          </p>


        </motion.div>








        {/* Clock Selector */}

        <div

          className="
            relative
            mx-auto
            mt-8
            flex
            max-w-md
            items-center
            justify-between
          "

        >


          {/* Time Line */}

          <div

            className="
              absolute
              left-8
              right-8
              top-6
              h-px
              bg-[#D4AF37]/25
            "

          />




          {
            OPTIONS.map((item)=>(


              <button

                key={item.id}

                onClick={()=>setActive(item.id as any)}

                className="
                  relative
                  z-10
                  flex
                  flex-col
                  items-center
                  gap-2
                "

              >


                <span

                  className={`
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    border
                    transition-all
                    duration-300
                    ${
                      active===item.id
                      ?
                      "border-[#D4AF37] bg-[#D4AF37] text-[#120C08] scale-110"
                      :
                      "border-[#D4AF37]/40 bg-[#1B120A] text-[#D4AF37]"
                    }
                  `}

                >

                  {item.icon}

                </span>



                <span

                  className={`
                    text-[10px]
                    uppercase
                    tracking-[0.3em]
                    ${
                      active===item.id
                      ?
                      "text-[#D4AF37]"
                      :
                      "text-[#8B5E00]"
                    }
                  `}

                >

                  {item.text}

                </span>



              </button>


            ))
          }


        </div>







        {/* Active Chapter */}

        <motion.div

          key={active}

          initial={{
            opacity:0,
            y:15
          }}

          animate={{
            opacity:1,
            y:0
          }}

          transition={{
            duration:.4
          }}

          className="
            mt-8
          "

        >



          <div

            className="
              mb-4
              flex
              justify-center
              items-center
              gap-2
              text-[#D4AF37]
            "

          >

            <Sparkles size={14}/>


            <span

              className="
                text-[10px]
                uppercase
                tracking-[0.35em]
              "

            >

              {season.label}

            </span>


          </div>





          <TimingCard

            period={season.label}

            title={season.title}

            description={season.description}

          />



        </motion.div>





      </div>



    </section>

  );

}