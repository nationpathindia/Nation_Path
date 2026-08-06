import NewsCard from "@/components/news/NewsCard";


interface FeaturedGridProps {
  articles: any[];
}



export default function FeaturedGrid({
  articles,
}: FeaturedGridProps) {


  if (!articles?.length)
    return null;



  const main =
    articles[0];


  const supporting =
    articles[4];


  const side =
    articles.slice(1,4);







  return (

    <section

      className="
        border-b
        border-[var(--news-border)]
        py-10
        sm:py-14
      "

      aria-labelledby="featured-stories-heading"

    >







      {/* SECTION HEADER */}

      <div

        className="
          flex
          items-center
          gap-4
          mb-8
        "

      >


        <h2

          id="featured-stories-heading"

          className="
            news-section-title
            whitespace-nowrap
          "

        >

          Featured Stories


        </h2>



        <div

          className="
            h-px
            flex-1
            bg-[var(--news-border)]
          "

        />


      </div>










      {/* EDITORIAL GRID */}


      <div

        className="
          grid
          grid-cols-1
          lg:grid-cols-12
          gap-8
          lg:gap-10
        "

      >







        {/* LEFT FEATURE AREA */}


        <div

          className="
            lg:col-span-7
          "

        >



          <div

            className="
              lg:border-r
              lg:border-[var(--news-border)]
              lg:pr-8
            "

          >



            <NewsCard

              article={
                main
              }

              size="large"

            />





            {
              supporting && (

                <div

                  className="
                    mt-8
                    pt-8
                    border-t
                    border-[var(--news-border)]
                  "

                >

                  <NewsCard

                    article={
                      supporting
                    }

                    size="compact"

                  />


                </div>

              )
            }



          </div>



        </div>










        {/* RIGHT STORIES */}


        <div

          className="
            lg:col-span-5
            divide-y
            divide-[var(--news-border)]
          "

        >




          {
            side.map(
              (article:any)=>(


                <article

                  key={
                    article.id
                  }

                  className="
                    py-6
                    first:pt-0
                    last:pb-0
                  "

                >


                  <NewsCard

                    article={
                      article
                    }

                    size="compact"

                  />


                </article>


              )
            )
          }



        </div>






      </div>






    </section>

  );

}