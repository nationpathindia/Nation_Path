"use client";

import Image from "next/image";
import { useEffect, useState } from "react";


interface ArticleHeroProps {

  image?: string;

  images?: string[];

  title:string;

}



export default function ArticleHero({

  image,

  images = [],

  title,

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
        relative
        aspect-[4/3]
        sm:aspect-[16/9]
        w-full
        overflow-hidden
        rounded-2xl
        bg-[#F5F5F5]
        "

      >



        <Image

          key={gallery[activeIndex]}

          src={gallery[activeIndex]}

          alt={title}

          fill

          priority={activeIndex===0}

          sizes="
          (max-width:640px) 100vw,
          (max-width:1024px) 90vw,
          900px
          "

          className="
          object-cover
          transition
          duration-700
          "

        />






        {
          gallery.length > 1 &&

          <>


            <button

              onClick={previousImage}

              aria-label="Previous image"

              className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              bg-black/40
              text-white
              w-10
              h-10
              rounded-full
              backdrop-blur-sm
              "

            >

              ‹

            </button>





            <button

              onClick={nextImage}

              aria-label="Next image"

              className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              bg-black/40
              text-white
              w-10
              h-10
              rounded-full
              backdrop-blur-sm
              "

            >

              ›

            </button>






            <div

              className="
              absolute
              bottom-4
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

                    onClick={()=>setActiveIndex(index)}

                    aria-label={`Go to image ${index+1}`}

                    className={`
                    w-2
                    h-2
                    rounded-full

                    ${
                      activeIndex===index
                      ?
                      "bg-white"
                      :
                      "bg-white/50"
                    }

                    `}

                  />

                ))
              }


            </div>



          </>


        }




      </div>








      <figcaption

        className="
        mt-3
        flex
        items-center
        gap-2
        text-xs
        tracking-wide
        text-gray-500
        "

      >


        <span

          className="
          h-[1px]
          w-6
          bg-[#EA661B]
          "

        />



        Nation Path Visual Report



      </figcaption>





    </figure>


  );

}