"use client";


interface Props {

  highlights?: string[];

}



export default function ArticleKeyHighlights({

  highlights = [],

}: Props) {


  if(!highlights.length){

    return null;

  }




  return (


    <section

      className="

      my-10

      relative

      overflow-hidden

      rounded-2xl

      border

      border-[#D7E3FF]

      bg-white

      p-5

      sm:p-6

      shadow-[0_12px_35px_rgba(22,60,128,0.08)]

      "

    >





      {/* Accent Line */}


      <div

        className="

        absolute

        left-0

        top-0

        h-full

        w-1

        bg-gradient-to-b

        from-[#163C80]

        to-[#EA661B]

        "

      />







      {/* HEADER */}


      <div

        className="

        flex

        items-center

        gap-3

        mb-5

        "

      >



        <div

          className="

          flex

          h-9

          w-9

          items-center

          justify-center

          rounded-xl

          bg-[#163C80]

          text-white

          text-sm

          shadow

          "

        >

          ★

        </div>





        <div>


          <p

            className="

            text-[10px]

            uppercase

            tracking-[0.25em]

            font-bold

            text-[#EA661B]

            "

          >

            Editorial Insight

          </p>




          <h2

            className="

            mt-0.5

            text-xl

            sm:text-2xl

            font-serif

            font-bold

            text-[#163C80]

            "

          >

            Key Highlights

          </h2>



        </div>



      </div>









      {/* ITEMS */}


      <div

        className="

        grid

        gap-3

        "

      >


        {

          highlights

          .slice(0,6)

          .map((item,index)=>(



            <div

              key={index}

              className="

              group

              flex

              items-start

              gap-3

              rounded-xl

              border

              border-[#EDF2FF]

              bg-[#FAFCFF]

              px-3

              py-3

              transition

              hover:border-[#163C80]/20

              hover:shadow-sm

              "

            >





              <span

                className="

                shrink-0

                flex

                h-7

                w-7

                items-center

                justify-center

                rounded-lg

                bg-[#163C80]

                text-white

                text-[11px]

                font-bold

                "

              >

                {index + 1}

              </span>







              <p

                className="

                text-sm

                leading-relaxed

                text-[#374151]

                "

              >

                {item}

              </p>





            </div>



          ))

        }



      </div>





    </section>


  );

}