import Link from "next/link";

import AdRenderer from "@/components/ads/AdRenderer";

import TrendingWidget from "./TrendingWidget";
import ArticleSidebarFeature from "./ArticleSidebarFeature";



interface ArticleSidebarProps {

  mostRead:any[];

}





export default function ArticleSidebar({

  mostRead,

}:ArticleSidebarProps){



  return (


    <aside

      className="
      space-y-10

      lg:sticky
      lg:top-24

      lg:self-start

      "

    >







      {/* ================= MOST READ ================= */}



      <section

        className="
        rounded-3xl

        border
        border-black/5

        bg-white

        p-5

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



          <span

            className="
            h-[2px]

            w-8

            bg-[#EA661B]

            "

          />



          <h3

            className="
            text-[11px]

            font-bold

            uppercase

            tracking-[0.35em]

            text-[#111]

            "

          >

            Most Read


          </h3>




        </div>









        <div

          className="
          divide-y

          divide-black/10

          "

        >




          {
            mostRead
            .slice(0,5)
            .map((item,index)=>(



              <Link


                key={item.id}


                href={`/${item.category?.slug}/${item.slug}`}


                className="
                group

                flex

                gap-4

                py-5

                first:pt-0

                last:pb-0

                "

              >






                <span

                  className="
                  min-w-[42px]

                  font-serif

                  text-4xl

                  font-bold

                  leading-none

                  text-[#163C80]/15

                  transition-colors

                  group-hover:text-[#EA661B]

                  "

                >

                  {
                    String(index+1)
                    .padStart(2,"0")
                  }


                </span>









                <div

                  className="
                  flex-1

                  "

                >



                  <p

                    className="
                    font-serif

                    text-[15px]

                    leading-snug

                    text-[#111]

                    transition-colors

                    group-hover:text-[#163C80]

                    "

                  >

                    {item.title}


                  </p>






                  {
                    item.category?.name && (


                      <p

                        className="
                        mt-2

                        text-[10px]

                        font-semibold

                        uppercase

                        tracking-[0.25em]

                        text-gray-400

                        "

                      >

                        {item.category.name}


                      </p>


                    )
                  }






                </div>







              </Link>



            ))
          }





        </div>







      </section>











      {/* ================= TRENDING ================= */}



      <section

        className="
        rounded-3xl

        border

        border-[#163C80]/15

        bg-[#F8FAFC]

        p-5

        "

      >



        <TrendingWidget />



      </section>









      {/* ================= AD ================= */}



      <div

        className="
        flex

        justify-center

        "

      >



        <AdRenderer

          placement="article_sidebar"

        />



      </div>









      {/* ================= FEATURE ================= */}



      <ArticleSidebarFeature />







    </aside>


  );


}