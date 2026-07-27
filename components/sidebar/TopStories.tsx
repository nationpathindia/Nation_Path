import Link from "next/link";
import SectionHeader from "@/components/common/SectionHeader";


interface TopStoriesProps {
  articles:any[];
}



export default function TopStories({
  articles,
}:TopStoriesProps){



  if(!articles?.length)
    return null;






  const articleUrl = (article:any)=>{


    if(!article?.category?.slug || !article?.slug)

      return "#";



    return `/${article.category.slug}/${article.slug}`;


  };









  return (


    <section


      className="
        border-t
        border-[var(--news-border)]
        pt-6
      "


    >





      <SectionHeader title="Top Stories"/>








      <div


        className="
          divide-y
          divide-[var(--news-border)]
          mt-5
        "


      >





        {


          articles

          .slice(0,5)

          .map(
            (article:any,index:number)=>(



              <Link


                key={article.id}


                href={articleUrl(article)}


                className="
                  group
                  block
                  py-5
                  first:pt-0
                "


              >





                <div


                  className="
                    flex
                    gap-4
                  "


                >





                  {/* NUMBER */}



                  <span


                    className="
                      text-xs
                      font-bold
                      text-[var(--news-orange)]
                      mt-1
                      tracking-[0.1em]
                    "


                  >


                    {
                      String(index + 1)
                      .padStart(2,"0")
                    }



                  </span>









                  {/* STORY */}



                  <div>



                    <h3


                      className="
                        font-serif
                        text-lg
                        sm:text-xl
                        leading-snug
                        text-[var(--news-text)]
                        transition
                        group-hover:text-[var(--news-orange)]
                      "


                    >


                      {article.title}



                    </h3>









                    <div


                      className="
                        mt-2
                        text-[11px]
                        uppercase
                        tracking-[0.18em]
                        text-[var(--news-light-text)]
                      "


                    >



                      {article?.category?.name || "News"}






                      {


                        article?.createdAt && (


                          <>

                            {" • "}



                            {
                              new Date(article.createdAt)

                              .toLocaleDateString(

                                "en-IN",

                                {

                                  day:"numeric",

                                  month:"short"

                                }

                              )
                            }


                          </>


                        )

                      }



                    </div>






                  </div>






                </div>






              </Link>



            ))



        }





      </div>






    </section>


  );


}