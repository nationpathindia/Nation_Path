"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO DASHBOARD
// Astro Intelligence Score Card Component
//////////////////////////////////////////////////////////////

import {
  Sparkles,
  TrendingUp,
} from "lucide-react";


interface AstroScoreItem {

  title: string;

  score: number;

}


interface AstroScoreCardProps {

  overallScore?: number;

  scores?: AstroScoreItem[];

}



export default function AstroScoreCard({

  overallScore = 82,

  scores = [

    {
      title: "Career Intelligence",
      score: 82,
    },

    {
      title: "Finance Intelligence",
      score: 78,
    },

    {
      title: "Relationship",
      score: 85,
    },

  ],

}: AstroScoreCardProps) {



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
          justify-between
        "
      >

        <div
          className="
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
              bg-yellow-500/10
              text-yellow-400
            "
          >

            <Sparkles size={22}/>

          </div>


          <div>

            <h2
              className="
                font-semibold
                text-white
              "
            >

              Astro Intelligence Score

            </h2>


            <p
              className="
                text-xs
                text-slate-400
              "
            >

              Based on planetary patterns

            </p>


          </div>


        </div>



        <div
          className="
            text-right
          "
        >

          <p
            className="
              text-3xl
              font-bold
              text-yellow-400
            "
          >

            {overallScore}

          </p>


          <p
            className="
              text-xs
              text-slate-500
            "
          >

            /100

          </p>


        </div>


      </div>




      <div
        className="
          space-y-5
        "
      >


        {
          scores.map(
            (item)=>(


              <div
                key={item.title}
              >

                <div
                  className="
                    mb-2
                    flex
                    items-center
                    justify-between
                  "
                >

                  <span
                    className="
                      text-sm
                      text-slate-300
                    "
                  >

                    {item.title}

                  </span>


                  <span
                    className="
                      flex
                      items-center
                      gap-1
                      text-sm
                      text-green-400
                    "
                  >

                    <TrendingUp size={14}/>

                    {item.score}

                  </span>


                </div>



                <div
                  className="
                    h-2
                    overflow-hidden
                    rounded-full
                    bg-slate-800
                  "
                >

                  <div

                    className="
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      from-yellow-500
                      to-orange-400
                    "

                    style={{
                      width:`${item.score}%`,
                    }}

                  />

                </div>


              </div>


            )
          )
        }


      </div>


    </section>

  );

}