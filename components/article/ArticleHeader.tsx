import Link from "next/link";
import LikeButton from "@/components/LikeButton";


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
      mb-12
      "

    >




      {/* ================= CATEGORY ================= */}


      <Link

        href={`/${category.slug}`}

        className="
        inline-flex
        items-center
        border-l-4
        border-[#EA661B]
        pl-3
        text-xs
        font-bold
        uppercase
        tracking-[0.2em]
        text-[#163C80]
        transition
        hover:text-[#EA661B]
        "

      >

        {category.name}

      </Link>








      {/* ================= TITLE ================= */}


      <h1

        className="
        mt-6
        max-w-5xl
        font-serif
        text-3xl
        leading-[1.12]
        tracking-tight
        text-[#111]

        sm:text-5xl
        sm:leading-[1.08]

        lg:text-[4.5rem]
        lg:leading-[1.04]
        "

      >

        {article.title}

      </h1>








      {/* ================= EXCERPT ================= */}


      {
        article.excerpt && (


          <p

            className="
            mt-6
            max-w-3xl
            text-base
            leading-relaxed
            text-gray-600

            sm:text-xl
            "

          >

            {article.excerpt}

          </p>


        )
      }









      {/* ================= META ================= */}


      <div

        className="
        mt-8
        flex
        flex-col
        gap-3

        border-y
        border-black/10

        py-5

        text-sm
        text-gray-500

        sm:flex-row
        sm:flex-wrap
        sm:items-center
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





        <span className="hidden sm:block">

          •

        </span>





        <span>

          {publishedDate}

        </span>





        <span>

          •

        </span>





        <span>

          {readingTime} min read

        </span>





        <span>

          •

        </span>





        <span>

          {article.views} views

        </span>




      </div>








      {/* ================= LIKE ================= */}


      <div

        className="
        mt-6
        "

      >

        <LikeButton

          articleId={article.id}

          initialLikes={article.likes || 0}

        />

      </div>






    </header>


  );

}