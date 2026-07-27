"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  Sparkles,
  Shield,
  TrendingUp,
  Trophy,
  Brain,
  Landmark,
  Globe,
  HeartPulse,
  Stars,
} from "lucide-react";



interface ArticleAstroBannerProps {

  categoryName?: string;

  categorySlug?: string;

}





const ARTICLE_ASTRO_MAP = {


  defence: {

    title:"Defence Intelligence",

    description:
    "Explore leadership patterns, strategic timing and decision insights through NationPath Astro Intelligence.",

    icon:Shield,

    cta:"Explore",

  },


  economy: {

    title:"Business Intelligence",

    description:
    "Discover cycles, opportunities and decision windows through personalised Astro Intelligence insights.",

    icon:TrendingUp,

    cta:"Explore",

  },


  business: {

    title:"Founder Intelligence",

    description:
    "Unlock strategic timing and leadership insights designed for entrepreneurs.",

    icon:Brain,

    cta:"Explore",

  },


  sports: {

    title:"Performance Intelligence",

    description:
    "Explore focus patterns, performance cycles and mental strength insights.",

    icon:Trophy,

    cta:"Explore",

  },


  politics: {

    title:"Leadership Intelligence",

    description:
    "Discover leadership patterns and strategic timing insights.",

    icon:Landmark,

    cta:"Explore",

  },


  international: {

    title:"Global Intelligence",

    description:
    "Explore global patterns and strategic perspectives through Astro Intelligence.",

    icon:Globe,

    cta:"Explore",

  },


  health: {

    title:"Wellness Intelligence",

    description:
    "Discover lifestyle patterns and personalised wellness insights.",

    icon:HeartPulse,

    cta:"Explore",

  },


};







export default function ArticleAstroBanner({

  categoryName,

  categorySlug,

}:ArticleAstroBannerProps){



  const normalizedSlug =

    categorySlug
    ?.toLowerCase()
    ||
    categoryName
    ?.toLowerCase()
    .replace(/\s+/g,"")
    ||
    "";





  const content =

    ARTICLE_ASTRO_MAP[
      normalizedSlug as keyof typeof ARTICLE_ASTRO_MAP
    ]

    ||

    {

      title:"NationPath Astro Intelligence",

      description:
      "Discover Kundli, Rashifal, Panchang and personalised insights powered by NationPath Astro Engine.",

      icon:Sparkles,

      cta:"Explore",

    };





  const Icon = content.icon;






  return (



    <section

      className="
      my-10

      "

    >





      <motion.div


        initial={{
          opacity:0,
          y:12
        }}


        whileInView={{
          opacity:1,
          y:0
        }}


        viewport={{
          once:true
        }}


        transition={{
          duration:0.4
        }}


        className="
        relative

        overflow-hidden

        rounded-3xl

        border

        border-[#D4AF37]/40

        bg-[#FAF7F1]

        shadow-[0_10px_35px_rgba(212,175,55,0.12)]

        "

      >





        <motion.div


          animate={{

            y:[0,-10,0],

            opacity:[0.3,0.7,0.3]

          }}


          transition={{

            duration:6,

            repeat:Infinity

          }}



          className="
          absolute

          right-5

          top-3

          text-[#D4AF37]/25

          "

        >

          <Stars size={65}/>


        </motion.div>







        <div

          className="
          relative

          flex

          items-center

          gap-4

          p-4

          sm:p-6

          "

        >





          <div

            className="
            flex

            h-11

            w-11

            shrink-0

            items-center

            justify-center

            rounded-full

            bg-[#FFF3C4]

            text-[#8B5E00]

            "

          >

            <Icon size={22}/>


          </div>








          <div

            className="
            flex-1

            "

          >



            <p

              className="
              text-[9px]

              font-bold

              uppercase

              tracking-[0.3em]

              text-[#8B5E00]

              "

            >

              NationPath Astro Intelligence


            </p>






            <h3

              className="
              mt-1

              font-serif

              text-lg

              font-bold

              text-[#4A3000]

              sm:text-xl

              "

            >

              {content.title}


            </h3>






            <p

              className="
              mt-2

              hidden

              text-sm

              leading-relaxed

              text-[#6B4A10]

              md:block

              "

            >

              {content.description}


            </p>



          </div>








          <Link

            href="/astro"


            className="
            shrink-0

            rounded-full

            bg-[#8B5E00]

            px-4

            py-2

            text-[11px]

            font-bold

            text-white

            transition

            hover:bg-[#6F4800]

            "

          >

            {content.cta}


          </Link>







        </div>





      </motion.div>




    </section>


  );

}