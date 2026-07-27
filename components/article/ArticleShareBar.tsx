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
      my-8
      flex
      flex-wrap
      items-center
      gap-3

      border-y
      border-black/10

      py-5
      "

    >




      <span

        className="
        mr-1

        text-[11px]
        font-bold
        uppercase
        tracking-[0.3em]

        text-gray-500

        "

      >

        Share


      </span>







      <div

        className="
        flex
        items-center
        gap-2
        "

      >



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
                h-10
                w-10
                items-center
                justify-center

                rounded-full

                border
                border-black/10

                text-gray-600

                transition-all

                hover:border-[#163C80]

                hover:text-[#163C80]

                "

              >


                <Icon size={17}/>


              </a>


            );


          })
        }



      </div>









      <button

        onClick={copyLink}

        type="button"

        className="
        inline-flex
        h-10

        items-center
        gap-2

        rounded-full

        border
        border-black/10

        px-4

        text-xs
        font-semibold

        text-gray-600

        transition-all

        hover:border-[#EA661B]

        hover:text-[#EA661B]

        "

      >


        {
          copied
          ?
          <Check size={15}/>
          :
          <LinkIcon size={15}/>
        }



        {
          copied
          ?
          "Copied"
          :
          "Copy Link"
        }



      </button>





    </div>


  );

}