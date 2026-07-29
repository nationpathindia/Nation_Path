import Link from "next/link";


interface ArticleHeaderProps {

  article:any;

  category:any;

  readingTime:number;

}



export default function ArticleHeader({

  article,

  category,

  readingTime,

}:ArticleHeaderProps){



  const publishedDate = new Date(

    article.createdAt

  ).toLocaleDateString(

    "en-IN",

    {

      day:"numeric",

      month:"long",

      year:"numeric",

    }

  );





  return (


    <header

      className="
      mb-10
      "

    >





      {/* ================= CATEGORY ================= */}


      <Link

        href={`/${category.slug}`}

        className="
        group

        inline-flex

        items-center

        gap-3

        text-[11px]

        font-bold

        uppercase

        tracking-[0.28em]

        text-[#163C80]

        transition

        hover:text-[#EA661B]

        "

      >



        <span

          className="
          h-7

          w-1

          rounded-full

          bg-[#EA661B]

          "

        />



        <span>

          {category.name}

        </span>



      </Link>









      {/* ================= TITLE ================= */}


      <h1

        className="
        mt-6

        max-w-4xl

        font-serif

        font-bold

        text-3xl

        leading-[1.16]

        tracking-[-0.025em]

        text-[#111]


        sm:text-4xl

        sm:leading-[1.12]


        lg:text-[2.8rem]

        lg:leading-[1.12]

        "

      >

        {article.title}

      </h1>









      {/* ================= META ================= */}


      <div

        className="
        mt-8

        flex

        flex-wrap

        items-center

        gap-x-3

        gap-y-3


        border-y

        border-black/10

        py-4


        text-xs

        tracking-wide

        text-gray-500

        "

      >





        <span

          className="
          font-semibold

          text-[#111]

          "

        >

          Nation Path News Desk

        </span>








        <span

          className="
          text-gray-300

          "

        >

          |

        </span>








        <time>

          {publishedDate}

        </time>








        <span

          className="
          text-gray-300

          "

        >

          |

        </span>








        <span>

          {readingTime} min read

        </span>







        {

          article.views > 0 && (


            <>

              <span

                className="
                text-gray-300

                "

              >

                |

              </span>





              <span>

                {article.views.toLocaleString()} views

              </span>


            </>


          )

        }







      </div>







    </header>


  );

}