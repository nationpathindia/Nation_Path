"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// KUNDLI INTELLIGENCE EXPERIENCE
//
// KUNDLI CREATION CHAMBER
//
// Flow:
// Birth Input
// ↓
// Cosmic Activation
// ↓
// Blueprint Preview
//
// UI ONLY
// No engine/API changes
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  User,
  Sparkles,
  Orbit,
  ScrollText,
} from "lucide-react";


const FIELDS = [
  {
    icon: User,
    label: "Your Name",
    placeholder: "Enter your name",
    type: "text",
  },
  {
    icon: CalendarDays,
    label: "Birth Date",
    placeholder: "",
    type: "date",
  },
  {
    icon: Clock3,
    label: "Birth Time",
    placeholder: "",
    type: "time",
  },
  {
    icon: MapPin,
    label: "Birth Place",
    placeholder: "Search your birth city",
    type: "text",
  },
];



type Stage =
  | "input"
  | "loading"
  | "preview";



export default function KundliBirthForm() {


  const [stage,setStage] = useState<Stage>("input");



  useEffect(()=>{

    if(stage !== "loading") return;


    const timer = setTimeout(()=>{

      setStage("preview");

    },3500);



    return ()=>clearTimeout(timer);


  },[stage]);




  function handleReveal(){

    setStage("loading");

  }




  return (

    <section
      className="
        relative
        overflow-hidden
        bg-[#FFF9E8]
        px-5
        py-20
        md:px-10
        md:py-24
      "
    >



      {/* Soft Golden Aura */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[380px]
          w-[380px]
          -translate-x-1/2
          rounded-full
          bg-[#D4AF37]/10
          blur-[130px]
        "
      />




      <div
        className="
          relative
          mx-auto
          max-w-5xl
        "
      >



        {/* Heading */}

        <div
          className="
            mb-10
            text-center
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
            Personal Blueprint Creator
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
            Create Your Cosmic Map
          </h2>


          <p
            className="
              mx-auto
              mt-4
              max-w-xl
              text-sm
              text-[#5A3908]
              md:text-base
            "
          >
            Your birth moment becomes your personal
            Vedic intelligence blueprint.
          </p>


        </div>





        {/* Creation Chamber */}

        <motion.div

          layout

          className="
            relative
            overflow-hidden
            rounded-[36px]
            border
            border-[#D4AF37]/45
            bg-[#F1E6C8]
            p-6
            shadow-[0_35px_90px_rgba(139,94,0,0.18)]
            md:p-10
          "

        >



          {/* Royal Frame */}

          <div
            className="
              pointer-events-none
              absolute
              inset-4
              rounded-[30px]
              border
              border-[#D4AF37]/20
            "
          />



          <AnimatePresence mode="wait">



            {/* INPUT STATE */}

            {
              stage==="input" && (

                <motion.div

                  key="input"

                  initial={{
                    opacity:0,
                    y:20
                  }}

                  animate={{
                    opacity:1,
                    y:0
                  }}

                  exit={{
                    opacity:0,
                    scale:.96
                  }}

                  className="
                    relative
                  "

                >


                  <div
                    className="
                      grid
                      gap-5
                      md:grid-cols-2
                    "
                  >

                  {
                    FIELDS.map((field)=>{

                      const Icon = field.icon;


                      return (

                        <div
                          key={field.label}
                          className="
                            rounded-2xl
                            border
                            border-[#8B5E00]/20
                            bg-[#FFF4D8]
                            p-5
                          "
                        >

                          <label
                            className="
                              mb-3
                              flex
                              items-center
                              gap-2
                              text-xs
                              uppercase
                              tracking-wider
                              text-[#8B5E00]
                            "
                          >

                            <Icon size={15}/>

                            {field.label}

                          </label>


                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            className="
                              w-full
                              bg-transparent
                              text-[#3B2600]
                              outline-none
                              placeholder:text-[#6B4A16]/60
                            "
                          />

                        </div>

                      );

                    })
                  }

                  </div>





                  <button

                    onClick={handleReveal}

                    className="
                      mt-8
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-3
                      rounded-full
                      bg-[#D4AF37]
                      py-4
                      font-semibold
                      text-[#120C08]
                    "

                  >

                    <Sparkles size={18}/>

                    Reveal My Cosmic Blueprint

                  </button>



                </motion.div>

              )
            }







            {/* LOADING STATE */}

            {
              stage==="loading" && (

                <motion.div

                  key="loading"

                  initial={{
                    opacity:0
                  }}

                  animate={{
                    opacity:1
                  }}

                  className="
                    flex
                    min-h-[340px]
                    flex-col
                    items-center
                    justify-center
                    text-center
                  "

                >

                  <motion.div

                    animate={{
                      rotate:360
                    }}

                    transition={{
                      duration:15,
                      repeat:Infinity,
                      ease:"linear"
                    }}

                    className="
                      flex
                      h-28
                      w-28
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#D4AF37]/50
                      bg-[#120C08]
                      shadow-[0_0_70px_rgba(212,175,55,.3)]
                    "

                  >

                    <Orbit
                      size={42}
                      className="text-[#D4AF37]"
                    />

                  </motion.div>



                  <h3
                    className="
                      mt-8
                      font-serif
                      text-2xl
                      text-[#3B2600]
                    "
                  >
                    Awakening Your Blueprint
                  </h3>



                  <p
                    className="
                      mt-3
                      text-sm
                      text-[#5A3908]
                    "
                  >
                    Aligning planetary intelligence...
                  </p>


                </motion.div>

              )
            }








            {/* PREVIEW STATE */}

            {
              stage==="preview" && (

                <motion.div

                  key="preview"

                  initial={{
                    opacity:0,
                    scale:.95
                  }}

                  animate={{
                    opacity:1,
                    scale:1
                  }}

                  transition={{
                    duration:.8
                  }}

                  className="
                    flex
                    min-h-[420px]
                    flex-col
                    items-center
                    justify-center
                    text-center
                  "

                >


                  <motion.div

                    animate={{
                      scale:[1,1.08,1]
                    }}

                    transition={{
                      duration:4,
                      repeat:Infinity
                    }}

                    className="
                      flex
                      h-36
                      w-36
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#D4AF37]/50
                      bg-[#120C08]
                      shadow-[0_0_70px_rgba(212,175,55,.25)]
                    "

                  >

                    <ScrollText
                      size={42}
                      className="text-[#D4AF37]"
                    />

                  </motion.div>




                  <h3
                    className="
                      mt-8
                      font-serif
                      text-3xl
                      text-[#3B2600]
                    "
                  >

                    Your Cosmic Blueprint

                    <br/>

                    Is Ready

                  </h3>




                  <p
                    className="
                      mt-4
                      max-w-md
                      text-sm
                      text-[#5A3908]
                    "
                  >

                    Your personal Vedic intelligence map
                    has been prepared.

                  </p>



                </motion.div>

              )
            }



          </AnimatePresence>



        </motion.div>


      </div>


    </section>

  );

}