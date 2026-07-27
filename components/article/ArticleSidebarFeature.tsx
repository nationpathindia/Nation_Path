import Link from "next/link";
import { ArrowRight, Sparkles, Stars } from "lucide-react";


export default function ArticleSidebarFeature(){


  return (


    <section

      className="
      relative

      overflow-hidden

      rounded-3xl

      border

      border-[#D4AF37]/40

      bg-[#FAF7F1]

      p-5

      "

    >



      {/* GOLD GLOW */}


      <div

        className="
        absolute

        -right-8

        -top-8

        h-32

        w-32

        rounded-full

        bg-[#D4AF37]/20

        blur-3xl

        "

      />






      <div

        className="
        relative

        "

      >





        {/* HEADER */}


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

            h-10

            w-10

            items-center

            justify-center

            rounded-full

            bg-[#8B5E00]

            text-white

            "

          >

            <Sparkles size={18}/>


          </div>






          <div>


            <p

              className="
              text-[9px]

              font-bold

              uppercase

              tracking-[0.35em]

              text-[#8B5E00]

              "

            >

              NationPath


            </p>




            <h3

              className="
              font-serif

              text-lg

              font-bold

              text-[#111]

              "

            >

              Astro Intelligence


            </h3>



          </div>




        </div>











        {/* DESCRIPTION */}


        <p

          className="
          mt-4

          text-sm

          leading-relaxed

          text-[#6B4A10]

          "

        >

          Discover personalised insights, timing patterns
          and intelligence reports powered by NationPath Astro Engine.


        </p>









        {/* FEATURES */}



        <div

          className="
          mt-4

          flex

          flex-wrap

          gap-2

          "

        >



          {
            [
              "Kundli Intelligence",
              "Daily Insights",
              "Premium Reports",
            ]
            .map((item)=>(


              <span

                key={item}

                className="
                rounded-full

                border

                border-[#D4AF37]/40

                bg-white

                px-3

                py-1.5

                text-[10px]

                font-semibold

                text-[#6B4500]

                "

              >

                ✦ {item}


              </span>


            ))
          }





        </div>











        {/* CTA */}



        <Link


          href="/astro"


          className="
          mt-5

          inline-flex

          items-center

          gap-2

          rounded-full

          bg-[#8B5E00]

          px-5

          py-2.5

          text-xs

          font-bold

          text-white

          transition

          hover:bg-[#6F4800]

          "

        >



          Explore Astro

          <ArrowRight size={14}/>



        </Link>






      </div>





    </section>


  );

}