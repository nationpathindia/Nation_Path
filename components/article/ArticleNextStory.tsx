import Image from "next/image";
import Link from "next/link";


interface ArticleNextStoryProps {

  article:any;

}



export default function ArticleNextStory({

  article,

}:ArticleNextStoryProps){



  if(!article){

    return null;

  }






  return (


    <section

      className="
      mt-16

      border-t

      border-black/10

      pt-10

      "

    >







      {/* HEADER */}

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



        <p

          className="
          text-[11px]

          font-bold

          uppercase

          tracking-[0.35em]

          text-[#163C80]

          "

        >

          Next Story

        </p>



      </div>









      <Link

        href={`/${article.category?.slug}/${article.slug}`}

        className="
        group

        block

        "

      >







        <div

          className="
          grid

          grid-cols-1

          overflow-hidden

          rounded-2xl

          border

          border-black/10

          bg-white

          transition-all

          duration-300

          hover:shadow-xl


          md:grid-cols-[320px_1fr]

          "

        >







          {/* IMAGE */}


          {
            article.images?.[0] && (


              <div

                className="
                relative

                aspect-[16/10]

                overflow-hidden


                md:aspect-auto

                "

              >



                <Image

                  src={article.images[0]}

                  alt={article.title}

                  fill

                  sizes="
                  (max-width:768px) 100vw,
                  320px
                  "

                  className="
                  object-cover

                  transition-transform

                  duration-700

                  group-hover:scale-105

                  "

                />


              </div>


            )

          }









          {/* CONTENT */}


          <div

            className="
            flex

            flex-col

            justify-center

            p-5


            sm:p-7

            "

          >






            <div

              className="
              flex

              items-center

              gap-3

              "

            >



              <span

                className="
                text-[10px]

                font-bold

                uppercase

                tracking-[0.28em]

                text-[#EA661B]

                "

              >

                {article.category?.name || "News"}

              </span>



            </div>









            <h3

              className="
              mt-3

              font-serif

              text-xl

              font-bold

              leading-snug

              tracking-tight

              text-[#111]


              transition-colors

              group-hover:text-[#163C80]


              sm:text-3xl

              "

            >

              {article.title}

            </h3>









            {

              article.excerpt && (


                <p

                  className="
                  mt-3

                  line-clamp-2

                  text-sm

                  leading-relaxed

                  text-gray-600

                  "

                >

                  {article.excerpt}

                </p>


              )

            }









            <div

              className="
              mt-5

              inline-flex

              items-center

              gap-2

              text-xs

              font-bold

              uppercase

              tracking-widest

              text-[#163C80]

              "

            >

              Read Full Story


              <span

                className="
                transition-transform

                group-hover:translate-x-1

                "

              >

                →

              </span>


            </div>







          </div>








        </div>






      </Link>







    </section>


  );

}