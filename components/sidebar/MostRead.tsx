import Link from "next/link";
import SectionHeader from "@/components/common/SectionHeader";


interface MostReadProps {
  articles:any[];
}



export default function MostRead({
  articles,
}:MostReadProps){



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





      <SectionHeader title="Most Read"/>








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
                  flex
                  gap-4
                  py-5
                  first:pt-0
                "


              >







                {/* RANK NUMBER */}



                <span


                  className="
                    font-serif
                    font-bold
                    text-4xl
                    sm:text-5xl
                    leading-none
                    text-[var(--news-border)]
                    w-10
                    sm:w-14
                    shrink-0
                    transition
                    group-hover:text-[var(--news-orange)]
                  "


                >



                  {
                    String(index + 1)
                    .padStart(2,"0")
                  }



                </span>









                {/* STORY */}



                <div


                  className="
                    flex-1
                  "


                >





                  {


                    article?.category?.name && (



                      <p


                        className="
                          text-[10px]
                          uppercase
                          tracking-[0.25em]
                          font-bold
                          text-[var(--news-orange)]
                          mb-2
                        "


                      >


                        {article.category.name}



                      </p>


                    )


                  }









                  <h4


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



                  </h4>







                </div>






              </Link>



            ))



        }




      </div>






    </section>


  );


}