"use client";

import {
  Facebook,
  Link as LinkIcon,
  MessageCircle,
  Twitter,
  Check,
} from "lucide-react";

import { useState } from "react";


interface ArticleShareBarProps {

  title:string;

  url:string;

}



export default function ArticleShareBar({

  title,

  url,

}:ArticleShareBarProps){



  const [copied,setCopied] = useState(false);



  const encodedTitle =
  encodeURIComponent(title);



  const encodedUrl =
  encodeURIComponent(url);





  const copyLink = async()=>{


    try{

      await navigator.clipboard.writeText(url);

      setCopied(true);


      setTimeout(()=>{

        setCopied(false);

      },2000);


    }catch{

      setCopied(false);

    }


  };







  const shareLinks = [


    {

      name:"WhatsApp",

      icon:MessageCircle,

      href:
      `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,

    },


    {

      name:"X",

      icon:Twitter,

      href:
      `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,

    },


    {

      name:"Facebook",

      icon:Facebook,

      href:
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,

    },


  ];







  return (


    <div

      className="
      flex
      items-center
      gap-2

      "

    >




      <span

        className="
        text-[10px]

        font-bold

        uppercase

        tracking-[0.25em]

        text-gray-500

        "

      >

        Share

      </span>







      {
        shareLinks.map((item)=>{


          const Icon = item.icon;



          return (


            <a

              key={item.name}

              href={item.href}

              target="_blank"

              rel="noopener noreferrer"

              aria-label={`Share on ${item.name}`}


              className="
              flex

              h-8

              w-8

              items-center

              justify-center

              rounded-full

              border

              border-black/10

              text-gray-500

              transition

              hover:border-[#163C80]

              hover:text-[#163C80]

              "

            >


              <Icon size={14}/>


            </a>


          );


        })
      }







      <button

        onClick={copyLink}

        type="button"


        className="
        flex

        h-8

        items-center

        gap-1.5

        rounded-full

        border

        border-black/10

        px-3

        text-[11px]

        font-semibold

        text-gray-500

        transition

        hover:border-[#EA661B]

        hover:text-[#EA661B]

        "

      >


        {
          copied

          ?

          <Check size={13}/>

          :

          <LinkIcon size={13}/>

        }



        {
          copied

          ?

          "Copied"

          :

          "Copy"

        }


      </button>






    </div>


  );

}