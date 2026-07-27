"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO DASHBOARD
// Current Transit Intelligence Component
//////////////////////////////////////////////////////////////

import {
  Orbit,
  CalendarDays,
  Sparkles,
} from "lucide-react";


interface TransitItem {

  planet: string;

  movement: string;

  impact: string;

  date?: string;

}


interface AstroTransitCardProps {

  transits?: TransitItem[];

}



export default function AstroTransitCard({

  transits = [

    {
      planet: "Jupiter",
      movement: "Entering New Sign",
      impact:
        "Growth opportunities in learning and career.",
      date: "August 2026",
    },

    {
      planet: "Saturn",
      movement: "Active Transit",
      impact:
        "Discipline, responsibility and long-term planning.",
      date: "2026",
    },

    {
      planet: "Rahu",
      movement: "Changing Influence",
      impact:
        "New experiences and unexpected opportunities.",
      date: "2026",
    },

  ],

}: AstroTransitCardProps) {



  return (

    <section
      className="
        rounded-3xl
        border
        border-slate-800
        bg-slate-950
        p-6
        shadow-lg
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
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-indigo-500/10
            text-indigo-400
          "
        >

          <Orbit size={22}/>

        </div>



        <div>

          <h2
            className="
              font-semibold
              text-white
            "
          >

            Current Astro Transit

          </h2>


          <p
            className="
              text-xs
              text-slate-400
            "
          >

            Planetary movements affecting your life

          </p>


        </div>


      </div>




      <div
        className="
          space-y-4
        "
      >


        {
          transits.map(
            (item)=>(

              <div

                key={item.planet}

                className="
                  rounded-2xl
                  border
                  border-slate-800
                  bg-slate-900
                  p-4
                "

              >


                <div
                  className="
                    flex
                    items-start
                    justify-between
                  "
                >


                  <div>

                    <h3
                      className="
                        font-medium
                        text-white
                      "
                    >

                      {item.planet}

                    </h3>


                    <p
                      className="
                        mt-1
                        text-sm
                        text-yellow-400
                      "
                    >

                      {item.movement}

                    </p>


                  </div>


                  <Sparkles
                    size={18}
                    className="text-yellow-400"
                  />


                </div>




                <p
                  className="
                    mt-3
                    text-sm
                    text-slate-400
                  "
                >

                  {item.impact}

                </p>




                {
                  item.date && (

                    <div
                      className="
                        mt-3
                        flex
                        items-center
                        gap-2
                        text-xs
                        text-slate-500
                      "
                    >

                      <CalendarDays size={14}/>

                      {item.date}

                    </div>

                  )
                }


              </div>


            )
          )
        }


      </div>


    </section>

  );

}