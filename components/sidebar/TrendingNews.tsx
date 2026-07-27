"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SectionHeader from "@/components/common/SectionHeader";


type Article = {

  id:string;

  title:string;

  slug:string;

  category?:{

    slug:string;

    name:string;

  };

};





export default function TrendingNews(){



  const [news,setNews] = useState<Article[]>([]);

  const [loading,setLoading] = useState(true);






  const fetchTrending = async()=>{


    try{


      const res = await fetch(

        "/api/trending",

        {
          cache:"no-store",
        }

      );



      const data = await res.json();




      const list:Array<Article> =


        Array.isArray(data)

        ? data


        : Array.isArray(data?.articles)

        ? data.articles


        : Array.isArray(data?.news)

        ? data.news


        : Array.isArray(data?.data)

        ? data.data


        : [];




      setNews(list);



    }
    catch(err){


      console.log(
        "Trending error:",
        err
      );


      setNews([]);



    }
    finally{


      setLoading(false);


    }


  };








  useEffect(()=>{


    fetchTrending();



    const interval = setInterval(
      fetchTrending,
      30000
    );



    return ()=>clearInterval(interval);



  },[]);










  const articleUrl = (item:Article)=>{


    if(item?.category?.slug)

      return `/${item.category.slug}/${item.slug}`;



    return `/article/${item.slug}`;


  };









  return (


    <section


      className="
        border-t
        border-[var(--news-border)]
        pt-6
      "


    >







      {/* HEADER */}


      <div


        className="
          flex
          items-center
          justify-between
          mb-5
        "


      >



        <SectionHeader title="Trending Now"/>





        <span


          className="
            flex
            items-center
            gap-2
            text-[10px]
            uppercase
            font-bold
            tracking-[0.18em]
            text-[var(--news-orange)]
          "


        >


          LIVE



          <span


            className="
              w-2
              h-2
              rounded-full
              bg-[var(--news-orange)]
            "


          />



        </span>




      </div>









      {
        loading && (


          <p


            className="
              text-xs
              text-[var(--news-light-text)]
              pb-4
            "


          >

            Loading trending...


          </p>


        )
      }









      <div


        className="
          divide-y
          divide-[var(--news-border)]
        "


      >





        {


          news

          .slice(0,6)

          .map((item,index)=>(



            <Link


              key={item.id}


              href={articleUrl(item)}


              className="
                group
                block
                py-4
              "


            >






              <div


                className="
                  flex
                  gap-4
                "


              >





                {/* RANK */}


                <span


                  className="
                    text-xl
                    font-serif
                    font-bold
                    text-[var(--news-editorial-gold)]
                    w-5
                    shrink-0
                  "


                >


                  {index + 1}



                </span>









                {/* STORY */}



                <div>


                  <p


                    className="
                      font-serif
                      text-base
                      leading-snug
                      text-[var(--news-text)]
                      group-hover:text-[var(--news-orange)]
                      transition
                      line-clamp-2
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
                          uppercase
                          tracking-[0.18em]
                          text-[var(--news-light-text)]
                        "


                      >


                        {item.category.name}



                      </p>


                    )


                  }





                </div>






              </div>






            </Link>



          ))



        }




      </div>






    </section>


  );

}