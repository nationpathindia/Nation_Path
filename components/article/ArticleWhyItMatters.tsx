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
      my-14

      relative
      overflow-hidden

      rounded-[32px]

      border
      border-[#FFD9B8]

      bg-gradient-to-br
      from-[#FFF8F1]
      via-white
      to-[#FFF0E5]

      p-6
      sm:p-8

      shadow-[0_20px_50px_rgba(234,102,27,0.10)]

      "

    >



      {/* Accent */}

      <div

        className="
        absolute

        top-0
        left-0

        h-full

        w-1.5

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
        gap-4

        mb-7

        "

      >



        <div

          className="
          w-12
          h-12

          rounded-2xl

          bg-[#EA661B]

          flex
          items-center
          justify-center

          text-white

          text-xl

          shadow-lg

          "

        >

          💡

        </div>





        <div>


          <p

            className="
            text-xs

            uppercase

            tracking-[0.2em]

            font-semibold

            text-[#EA661B]

            "

          >

            Editorial Analysis

          </p>



          <h2

            className="
            text-2xl
            sm:text-3xl

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
        rounded-2xl

        bg-white/70

        border

        border-orange-100

        p-5
        sm:p-6

        "

      >


        <p

          className="
          text-[#333]

          leading-[1.9]

          text-justify

          text-[15px]
          sm:text-base

          "

        >

          {whyItMatters}


        </p>


      </div>




    </section>


  );

}