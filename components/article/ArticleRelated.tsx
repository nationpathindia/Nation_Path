import Image from "next/image";
import Link from "next/link";


interface ArticleRelatedProps {

  articles:any[];

}



export default function ArticleRelated({

  articles,

}:ArticleRelatedProps){



  if(!articles || articles.length === 0){

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






      {/* ================= HEADER ================= */}


      <div

        className="
        mb-8

        flex

        items-center

        gap-4

        "

      >



        <h2

          className="
          shrink-0

          text-[11px]

          font-bold

          uppercase

          tracking-[0.35em]

          text-[#111]

          "

        >

          Related Stories


        </h2>





        <div

          className="
          h-px

          flex-1

          bg-black/10

          "

        />



      </div>









      {/* ================= GRID ================= */}


      <div

        className="
        grid

        gap-8

        sm:grid-cols-2

        lg:grid-cols-3

        "

      >





        {
          articles.slice(0,6).map((article)=>(



            <article

              key={article.id}

              className="
              group

              "

            >





              <Link

                href={`/${article.category?.slug}/${article.slug}`}

                className="
                block

                "

              >






                {/* IMAGE */}



                {
                  article.images?.[0] && (


                    <div

                      className="
                      relative

                      aspect-[16/9]

                      overflow-hidden

                      rounded-2xl

                      bg-[#F5F5F5]

                      "

                    >



                      <Image

                        src={article.images[0]}

                        alt={article.title}

                        fill

                        sizes="
                        (max-width:640px) 100vw,
                        (max-width:1024px) 50vw,
                        33vw
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









                {/* CATEGORY */}



                <p

                  className="
                  mt-5

                  text-[10px]

                  font-bold

                  uppercase

                  tracking-[0.3em]

                  text-[#8B6A25]

                  "

                >

                  {article.category?.name || "News"}


                </p>









                {/* TITLE */}



                <h3

                  className="
                  mt-3

                  font-serif

                  text-xl

                  font-bold

                  leading-snug

                  text-[#111]

                  transition-colors

                  group-hover:text-[#163C80]

                  "

                >

                  {article.title}


                </h3>









                {/* DATE */}



                <p

                  className="
                  mt-4

                  text-[11px]

                  uppercase

                  tracking-[0.15em]

                  text-gray-500

                  "

                >



                  {
                    new Date(article.createdAt)
                    .toLocaleDateString(

                      "en-IN",

                      {

                        day:"numeric",

                        month:"short",

                        year:"numeric",

                      }

                    )
                  }




                </p>







              </Link>





            </article>



          ))
        }





      </div>





    </section>


  );

}