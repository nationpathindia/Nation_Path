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





      <p

        className="
        mb-6

        text-[11px]

        font-bold

        uppercase

        tracking-[0.35em]

        text-gray-500

        "

      >

        Continue Reading


      </p>







      <Link

        href={`/${article.category?.slug}/${article.slug}`}

        className="
        group
        block

        "

      >





        <div

          className="
          overflow-hidden

          rounded-3xl

          border
          border-black/10

          bg-[#FAF7F1]

          transition

          duration-300

          hover:shadow-lg

          "

        >







          {
            article.images?.[0] && (


              <div

                className="
                relative

                aspect-[16/9]

                w-full

                overflow-hidden

                "

              >



                <Image

                  src={article.images[0]}

                  alt={article.title}

                  fill

                  sizes="
                  (max-width:640px) 100vw,
                  900px
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









          <div

            className="
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
                h-[2px]

                w-8

                bg-[#EA661B]

                "

              />



              <p

                className="
                text-[10px]

                font-bold

                uppercase

                tracking-[0.3em]

                text-[#8B6A25]

                "

              >

                {article.category?.name || "News"}

              </p>



            </div>









            <h3

              className="
              mt-4

              font-serif

              text-2xl

              font-bold

              leading-snug

              text-[#111]

              transition-colors

              group-hover:text-[#163C80]

              sm:text-3xl

              "

            >

              {article.title}


            </h3>









            <div

              className="
              mt-6

              inline-flex

              items-center

              gap-2

              text-sm

              font-semibold

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