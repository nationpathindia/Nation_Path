"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO DASHBOARD
// Life Timeline Intelligence Component
//////////////////////////////////////////////////////////////

import {
  Clock3,
  Sparkles,
} from "lucide-react";


interface TimelineItem {

  period: string;

  title: string;

  description: string;

}


interface AstroTimelineCardProps {

  timeline?: TimelineItem[];

}



export default function AstroTimelineCard({

  timeline = [

    {
      period: "2026 - 2028",
      title: "Learning Phase",
      description:
        "Skill development, knowledge expansion and personal transformation.",
    },

    {
      period: "2029 - 2033",
      title: "Growth Phase",
      description:
        "Career opportunities, financial progress and major decisions.",
    },

    {
      period: "2034 - 2038",
      title: "Expansion Phase",
      description:
        "Leadership, stability and long-term achievements.",
    },

  ],

}: AstroTimelineCardProps) {



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
            bg-blue-500/10
            text-blue-400
          "
        >

          <Clock3 size={22}/>

        </div>



        <div>

          <h2
            className="
              font-semibold
              text-white
            "
          >

            Life Timeline Intelligence

          </h2>


          <p
            className="
              text-xs
              text-slate-400
            "
          >

            Future phases based on Dasha & Transit

          </p>


        </div>


      </div>




      <div
        className="
          relative
          space-y-6
        "
      >


        {
          timeline.map(
            (item,index)=>(

              <div

                key={item.period}

                className="
                  relative
                  flex
                  gap-4
                "

              >


                {
                  index !== timeline.length - 1 && (

                    <div
                      className="
                        absolute
                        left-[11px]
                        top-7
                        h-full
                        w-px
                        bg-slate-800
                      "
                    />

                  )
                }




                <div
                  className="
                    relative
                    mt-1
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-yellow-500/20
                    text-yellow-400
                  "
                >

                  <Sparkles size={13}/>

                </div>




                <div>

                  <p
                    className="
                      text-sm
                      font-semibold
                      text-yellow-400
                    "
                  >

                    {item.period}

                  </p>


                  <h3
                    className="
                      mt-1
                      font-medium
                      text-white
                    "
                  >

                    {item.title}

                  </h3>


                  <p
                    className="
                      mt-1
                      text-sm
                      text-slate-400
                    "
                  >

                    {item.description}

                  </p>


                </div>


              </div>


            )
          )
        }


      </div>


    </section>

  );

}