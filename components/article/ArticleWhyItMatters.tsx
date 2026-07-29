"use client";


interface Props {

  whyItMatters?: string | null;

}



export default function ArticleWhyItMatters({

  whyItMatters,

}: Props) {


  if(!whyItMatters){

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

      border-[#FFD9B8]

      bg-white

      p-5

      sm:p-6

      shadow-[0_12px_35px_rgba(234,102,27,0.08)]

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

        from-[#EA661B]

        to-[#F5B041]

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

          bg-[#EA661B]

          text-white

          text-sm

          shadow

          "

        >

          💡

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

            Editorial Analysis

          </p>




          <h2

            className="

            mt-0.5

            text-xl

            sm:text-2xl

            font-serif

            font-bold

            text-[#C65312]

            "

          >

            Why It Matters

          </h2>



        </div>




      </div>









      {/* CONTENT */}



      <div

        className="

        rounded-xl

        border

        border-orange-100

        bg-[#FFF9F4]

        px-4

        py-4

        sm:px-5

        "

      >



        <p

          className="

          text-sm

          sm:text-base

          leading-[1.85]

          text-[#374151]

          "

        >

          {whyItMatters}


        </p>



      </div>






    </section>


  );

}