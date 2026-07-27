"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO DASHBOARD
// Premium Astro Report Card Component
//////////////////////////////////////////////////////////////

import {
  Lock,
  Sparkles,
  ArrowRight,
  FileText,
} from "lucide-react";


interface AstroReport {

  title: string;

  description: string;

  premium?: boolean;

  status?: string;

}


interface AstroReportCardProps {

  reports?: AstroReport[];

}



export default function AstroReportCard({

  reports = [

    {
      title: "Personality Intelligence",
      description:
        "Character, strengths and behaviour analysis",
      status: "Ready",
    },

    {
      title: "Career Intelligence",
      description:
        "Career direction and growth periods",
      premium: true,
    },

    {
      title: "Finance Intelligence",
      description:
        "Wealth pattern and financial phases",
      premium: true,
    },

    {
      title: "Relationship Intelligence",
      description:
        "Marriage and partner compatibility",
      premium: true,
    },

    {
      title: "Life Timeline",
      description:
        "Important phases based on Dasha and Transit",
      premium: true,
    },

  ],

}: AstroReportCardProps) {



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
            bg-purple-500/10
            text-purple-400
          "
        >

          <FileText size={22}/>

        </div>


        <div>

          <h2
            className="
              font-semibold
              text-white
            "
          >

            Astro Intelligence Reports

          </h2>


          <p
            className="
              text-xs
              text-slate-400
            "
          >

            Personalized life analysis

          </p>


        </div>


      </div>




      <div
        className="
          grid
          gap-4
          md:grid-cols-2
        "
      >


        {
          reports.map(
            (report)=>(


              <div

                key={report.title}

                className="
                  rounded-2xl
                  border
                  border-slate-800
                  bg-slate-900
                  p-5
                  transition
                  hover:border-yellow-500/30
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

                      {report.title}

                    </h3>


                    <p
                      className="
                        mt-2
                        text-sm
                        text-slate-400
                      "
                    >

                      {report.description}

                    </p>


                  </div>



                  {
                    report.premium && (

                      <Lock
                        size={18}
                        className="
                          text-yellow-400
                        "
                      />

                    )
                  }


                </div>




                <button

                  className="
                    mt-5
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-yellow-400
                  "

                >

                  {
                    report.premium
                      ?
                      "Unlock Report"
                      :
                      "View Report"
                  }


                  {
                    report.premium
                      ?
                      <Sparkles size={15}/>
                      :
                      <ArrowRight size={15}/>
                  }


                </button>


              </div>


            )
          )
        }


      </div>


    </section>

  );

}