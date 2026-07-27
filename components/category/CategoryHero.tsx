import NewsCard from "@/components/news/NewsCard";
import LeadStory from "@/components/home/LeadStory";


interface CategoryHeroProps {
  articles: any[];
}


export default function CategoryHero({
  articles,
}: CategoryHeroProps) {


  if (!articles?.length) return null;



  const mainArticle = articles[0];

  const sideArticles = articles.slice(1, 4);



  return (

    <section

      className="
      border-b
      border-black/10
      pb-12
      mb-12
      "

    >



      <div

        className="
        grid
        grid-cols-1
        lg:grid-cols-12
        gap-8
        "

      >



        {/* MAIN STORY */}

        <div

          className="
          lg:col-span-7
          lg:border-r
          lg:border-black/10
          lg:pr-8
          "

        >

          <LeadStory

            article={mainArticle}

          />


        </div>





        {/* SIDE STORIES */}

        <div

          className="
          lg:col-span-5
          divide-y
          divide-black/10
          "

        >


          {
            sideArticles.map((article:any)=>(
              

              <article

                key={article.id}

                className="
                py-5
                first:pt-0
                last:pb-0
                "

              >


                <NewsCard

                  article={article}

                  size="compact"

                />


              </article>


            ))
          }



        </div>



      </div>




    </section>

  );

}