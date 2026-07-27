"use client";

import { useEffect, useState } from "react";
import Link from "next/link";


interface Topic {

  id: string;

  name: string;

  slug: string;

}



export default function TrendingTopics() {


  const [topics, setTopics] = useState<Topic[]>([]);





  useEffect(() => {


    async function load() {


      try {


        const res = await fetch(
          "/api/trending-topics",
          {
            cache: "no-store",
          }
        );



        const data = await res.json();



        setTopics(data);



      }
      catch {


        setTopics([]);


      }


    }



    load();



  }, []);








  if (!topics.length)
    return null;









  return (


    <section


      className="
        border-t
        border-b
        border-[var(--news-border)]
        py-6
      "


      aria-labelledby="trending-topics-heading"


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



        <h2


          id="trending-topics-heading"


          className="
            text-xs
            uppercase
            tracking-[0.25em]
            font-bold
            text-[var(--news-text)]
          "


        >

          Trending Topics


        </h2>





        <span


          className="
            w-2
            h-2
            rounded-full
            bg-[var(--news-orange)]
          "


        />



      </div>









      {/* TOPIC LIST */}


      <div


        className="
          flex
          flex-wrap
          gap-2
        "


      >



        {


          topics.map((topic) => (



            <Link


              key={topic.id}


              href={`/${topic.slug}`}


              className="
                px-3
                py-1.5
                rounded-full
                bg-[var(--news-cream)]
                border
                border-[var(--news-border)]
                text-xs
                font-medium
                text-[var(--news-text)]
                hover:border-[var(--news-orange)]
                hover:text-[var(--news-orange)]
                transition
              "


            >


              #{topic.name}



            </Link>



          ))


        }



      </div>






    </section>


  );


}