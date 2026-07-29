"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ArticleShareBar from "@/components/article/ArticleShareBar";


interface ArticleHeroProps {

  image?: string;

  images?: string[];

  title:string;

  shareUrl:string;

}



export default function ArticleHero({

  image,

  images = [],

  title,

  shareUrl,

}:ArticleHeroProps){



  const gallery =

    images.length > 0

    ? images

    : image

    ? [image]

    : [];





  const [activeIndex,setActiveIndex] = useState(0);





  useEffect(()=>{


    if(gallery.length <= 1){

      return;

    }


    const timer = setInterval(()=>{


      setActiveIndex((prev)=>

        prev === gallery.length - 1

        ? 0

        : prev + 1

      );


    },5000);



    return ()=>clearInterval(timer);



  },[gallery.length]);







  if(!gallery.length){

    return null;

  }







  function nextImage(){


    setActiveIndex((prev)=>

      prev === gallery.length - 1

      ? 0

      : prev + 1

    );


  }







  function previousImage(){


    setActiveIndex((prev)=>

      prev === 0

      ? gallery.length - 1

      : prev - 1

    );


  }








  return (


    <figure

      className="
      mb-12
      "

    >




      <div

        className="
        group
        relative

        aspect-[16/10]

        sm:aspect-[16/9]

        w-full

        overflow-hidden

        rounded-2xl

        bg-black/5

        "

      >





        <Image

          key={gallery[activeIndex]}

          src={gallery[activeIndex]}

          alt={title}

          fill

          priority={activeIndex === 0}

          sizes="
          (max-width:640px) 100vw,
          (max-width:1024px) 90vw,
          900px
          "

          className="
          object-cover

          scale-100

          group-hover:scale-105

          transition-all

          duration-[1200ms]

          ease-out

          "

        />








        {
          gallery.length > 1 &&

          <>


            <button

              type="button"

              onClick={previousImage}

              aria-label="Previous image"

              className="
              absolute

              left-4

              top-1/2

              -translate-y-1/2

              flex

              items-center

              justify-center

              h-10

              w-10

              rounded-full

              bg-black/40

              backdrop-blur-md

              border

              border-white/20

              text-white

              text-xl

              "

            >

              ‹

            </button>







            <button

              type="button"

              onClick={nextImage}

              aria-label="Next image"

              className="
              absolute

              right-4

              top-1/2

              -translate-y-1/2

              flex

              items-center

              justify-center

              h-10

              w-10

              rounded-full

              bg-black/40

              backdrop-blur-md

              border

              border-white/20

              text-white

              text-xl

              "

            >

              ›

            </button>








            <div

              className="
              absolute

              bottom-5

              left-1/2

              -translate-x-1/2

              flex

              gap-2

              "

            >


              {
                gallery.map((_,index)=>(


                  <button

                    key={index}

                    type="button"

                    onClick={()=>setActiveIndex(index)}

                    aria-label={`Go to image ${index + 1}`}

                    className={`

                    h-2

                    rounded-full

                    transition-all


                    ${
                      activeIndex === index

                      ?

                      "w-6 bg-white"

                      :

                      "w-2 bg-white/60"

                    }

                    `}

                  />


                ))

              }


            </div>



          </>


        }





      </div>









      {/* ================= HERO FOOTER ================= */}


      <figcaption

        className="
        mt-2

        flex

        flex-col

        gap-3


        sm:flex-row

        sm:items-center

        sm:justify-between

        "

      >





        {/* LEFT */}

        <div

          className="
          flex

          items-center

          gap-3

          text-xs

          uppercase

          tracking-[0.18em]

          text-gray-500

          "

        >


          <span

            className="
            h-[1px]

            w-8

            bg-[#EA661B]

            "

          />


          NationPath Visual Report


        </div>








        {/* RIGHT */}

        <ArticleShareBar

          title={title}

          url={shareUrl}

        />





      </figcaption>







    </figure>


  );

}