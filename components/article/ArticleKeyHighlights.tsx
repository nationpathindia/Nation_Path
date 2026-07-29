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
      my-14

      relative
      overflow-hidden

      rounded-[32px]

      border
      border-[#D7E3FF]

      bg-gradient-to-br
      from-[#F8FBFF]
      via-white
      to-[#EEF5FF]

      p-6
      sm:p-8

      shadow-[0_20px_50px_rgba(22,60,128,0.10)]

      "

    >


      {/* subtle accent */}

      <div

        className="
        absolute
        top-0
        left-0

        h-full
        w-1.5

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
        justify-between

        mb-8

        "

      >



        <div

          className="
          flex
          items-center
          gap-4

          "

        >


          <div

            className="
            w-12
            h-12

            rounded-2xl

            bg-[#163C80]

            flex
            items-center
            justify-center

            text-white

            text-xl

            shadow-lg

            "

          >

            ⭐

          </div>



          <div>


            <p

              className="
              text-xs
              tracking-[0.2em]

              uppercase

              text-[#EA661B]

              font-semibold

              "

            >

              Editorial Insight

            </p>



            <h2

              className="
              text-2xl
              sm:text-3xl

              font-bold

              text-[#163C80]

              "

            >

              Key Highlights

            </h2>


          </div>


        </div>



      </div>







      {/* HIGHLIGHTS */}


      <div

        className="
        space-y-4

        "

      >


        {
          highlights.map(

            (item,index)=>(


              <div

                key={index}

                className="
                group

                flex
                gap-4

                rounded-2xl

                bg-white

                border
                border-[#E5EDFF]

                p-4
                sm:p-5

                transition-all

                hover:shadow-md

                "

              >



                <div

                  className="
                  shrink-0

                  w-9
                  h-9

                  rounded-xl

                  bg-[#163C80]

                  flex
                  items-center
                  justify-center

                  text-white

                  text-sm

                  font-bold

                  "

                >

                  {String(index + 1).padStart(2,"0")}


                </div>





                <p

                  className="
                  text-[#333]

                  leading-relaxed

                  text-[15px]
                  sm:text-base

                  "

                >

                  {item}


                </p>



              </div>


            )

          )
        }


      </div>



    </section>


  );

}