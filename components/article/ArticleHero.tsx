import Image from "next/image";


interface ArticleHeroProps {

  image?: string;

  title:string;

}



export default function ArticleHero({

  image,

  title,

}:ArticleHeroProps){



  if(!image){

    return null;

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

          src={image}

          alt={title}

          fill

          priority

          sizes="
          (max-width:640px) 100vw,
          (max-width:1024px) 90vw,
          900px
          "

          className="
          object-cover
          transition
          duration-700
          hover:scale-[1.02]
          "

        />



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