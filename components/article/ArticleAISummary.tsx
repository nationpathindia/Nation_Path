interface ArticleAISummaryProps {

  categoryName:string;

  summary?:{

    overview?:string;

    points?:string[];

    impact?:string;

    takeaway?:string;

  };

  premium?:boolean;

}





export default function ArticleAISummary({

  categoryName,

  summary,

  premium=false,

}:ArticleAISummaryProps){



  const points = summary?.points || [

    "Key developments explained in a simple format.",

    "Important context behind the latest update.",

    "Major factors readers should understand.",

  ];






  return (


    <section

      className="
      relative
      my-12

      overflow-hidden

      rounded-3xl

      border
      border-[#D4AF37]/40

      bg-[#FAF7F1]

      p-5

      sm:p-8

      "

    >





      {/* GOLD EFFECT */}


      <div

        className="
        pointer-events-none
        absolute
        -right-16
        -top-16

        h-48
        w-48

        rounded-full

        bg-[#D4AF37]/20

        blur-3xl

        "

      />







      <div className="relative">







        {/* HEADER */}


        <div

          className="
          flex
          flex-col
          gap-4

          sm:flex-row
          sm:items-start
          sm:justify-between

          "

        >



          <div>


            <p

              className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.35em]

              text-[#8B5E00]

              "

            >

              NationPath AI Brief

            </p>





            <h2

              className="
              mt-3

              max-w-2xl

              font-serif

              text-2xl

              font-bold

              leading-tight

              text-[#163C80]

              sm:text-3xl

              "

            >

              Understand the story beyond headlines

            </h2>



          </div>






          <span

            className="
            inline-flex
            w-fit

            rounded-full

            border
            border-green-200

            bg-green-50

            px-3
            py-1

            text-[11px]

            font-semibold

            text-green-700

            "

          >

            AI Assisted

          </span>





        </div>









        {/* INTRO */}



        <p

          className="
          mt-5

          max-w-3xl

          text-sm

          leading-relaxed

          text-gray-600

          sm:text-base

          "

        >

          A quick intelligence layer analysing this{" "}


          <span className="font-semibold text-gray-900">

            {categoryName}

          </span>


          {" "}story with context, important developments
          and reader-focused insights.



        </p>









        {/* INSIGHTS */}



        <div

          className="
          mt-8

          grid

          gap-4

          md:grid-cols-3

          "

        >



          <InsightCard

            title="WHAT HAPPENED"

            text={
              summary?.overview ||
              "A concise explanation of the latest developments and events."
            }

          />



          <InsightCard

            title="WHY IT MATTERS"

            text={
              summary?.impact ||
              "The broader impact and significance of this development."
            }

          />



          <InsightCard

            title="KEY TAKEAWAY"

            text={
              summary?.takeaway ||
              "The most important point readers should remember."
            }

          />



        </div>









        {/* KEY POINTS */}



        <div

          className="
          mt-8

          rounded-2xl

          border
          border-black/5

          bg-white

          p-5

          "

        >



          <h3

            className="
            text-sm

            font-bold

            uppercase

            tracking-wide

            text-[#163C80]

            "

          >

            Key Points

          </h3>






          <ul

            className="
            mt-4

            space-y-3

            "

          >



            {
              points.map((point,index)=>(


                <li

                  key={index}

                  className="
                  flex

                  gap-3

                  text-sm

                  leading-relaxed

                  text-gray-600

                  "

                >



                  <span

                    className="
                    mt-2

                    h-1.5
                    w-1.5

                    shrink-0

                    rounded-full

                    bg-[#EA661B]

                    "

                  />



                  <span>

                    {point}

                  </span>



                </li>


              ))
            }



          </ul>



        </div>









        {/* FOOTER CTA */}



        <div

          className="
          mt-8

          flex

          flex-col

          gap-4


          sm:flex-row

          sm:items-center

          sm:justify-between

          "

        >



          <p

            className="
            text-xs

            text-gray-500

            "

          >

            AI insights help readers understand news faster.

          </p>





          <a

            href="/astro"

            className="
            inline-flex

            items-center
            justify-center

            rounded-full

            bg-[#163C80]

            px-6

            py-3

            text-sm

            font-semibold

            text-white

            transition

            hover:bg-[#102d61]

            "

          >

            {
              premium
              ?
              "Unlock Full Intelligence →"
              :
              "Explore Intelligence →"
            }


          </a>



        </div>






      </div>





    </section>


  );


}









function InsightCard({

  title,

  text,

}:{

  title:string;

  text:string;

}){


  return (


    <div

      className="
      rounded-xl

      border

      border-black/5

      bg-white

      p-5

      "

    >



      <p

        className="
        text-xs

        font-bold

        tracking-wide

        text-[#163C80]

        "

      >

        {title}

      </p>





      <p

        className="
        mt-3

        text-sm

        leading-relaxed

        text-gray-500

        "

      >

        {text}

      </p>




    </div>


  );


}