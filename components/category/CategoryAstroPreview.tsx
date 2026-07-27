"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  Sparkles,
  Shield,
  TrendingUp,
  Trophy,
  GraduationCap,
  Car,
  Brain,
  HeartPulse,
  Clapperboard,
  Landmark,
  Globe,
  UserRound,
  FlaskConical,
  Leaf,
  Plane,
  ScrollText,
  Compass,
  Gem,
  Stars,
} from "lucide-react";



interface CategoryAstroPreviewProps {

  categoryName?: string;

  categorySlug?: string;

}






const CATEGORY_ASTRO_MAP = {


  defence:{

    title:"Defence Intelligence",

    description:
    "Explore leadership patterns, strategic timing and decision insights through the NationPath Astro Intelligence framework.",

    features:[
      "Leadership Patterns",
      "Strategic Timing",
      "Decision Guidance",
    ],

    cta:
    "Explore Defence Insights",

    icon:Shield

  },



  economy:{

    title:"Business & Market Intelligence",

    description:
    "Understand cycles, opportunities and decision windows through personalised intelligence insights.",

    features:[
      "Market Cycles",
      "Growth Timing",
      "Decision Support",
    ],

    cta:
    "Explore Market Insights",

    icon:TrendingUp

  },



  business:{

    title:"Founder Intelligence",

    description:
    "Discover strategic timing, leadership patterns and growth insights designed for entrepreneurs.",

    features:[
      "Founder Profile",
      "Launch Timing",
      "Growth Insights",
    ],

    cta:
    "Unlock Founder Insights",

    icon:Brain

  },



  sports:{

    title:"Performance Intelligence",

    description:
    "Explore focus patterns, performance cycles and mental strength insights through Astro Intelligence.",

    features:[
      "Performance Patterns",
      "Mental Strength",
      "Timing Insights",
    ],

    cta:
    "Unlock Performance Profile",

    icon:Trophy

  },



  education:{

    title:"Learning & Career Intelligence",

    description:
    "Discover learning patterns, strengths and career direction through personalised insights.",

    features:[
      "Learning Style",
      "Career Direction",
      "Skill Growth",
    ],

    cta:
    "Explore Career Insights",

    icon:GraduationCap

  },



  technology:{

    title:"Innovation Intelligence",

    description:
    "Explore creativity cycles, innovation patterns and technology focused insights.",

    features:[
      "Innovation Cycles",
      "Creator Patterns",
      "Future Trends",
    ],

    cta:
    "Explore Innovation Insights",

    icon:Brain

  },



  automobile:{

    title:"Vehicle Intelligence",

    description:
    "Explore personalised timing insights for vehicle purchases, journeys and mobility decisions.",

    features:[
      "Vehicle Muhurat",
      "Travel Timing",
      "Decision Support",
    ],

    cta:
    "Explore Vehicle Insights",

    icon:Car

  },



  health:{

    title:"Wellness Intelligence",

    description:
    "Discover lifestyle patterns and wellness focused insights through personalised guidance.",

    features:[
      "Lifestyle Patterns",
      "Wellness Cycles",
      "Personal Guidance",
    ],

    cta:
    "Explore Wellness Insights",

    icon:HeartPulse

  },



  entertainment:{

    title:"Creative Intelligence",

    description:
    "Explore creativity patterns, recognition cycles and artistic intelligence insights.",

    features:[
      "Creative Patterns",
      "Recognition Cycles",
      "Talent Insights",
    ],

    cta:
    "Explore Creative Insights",

    icon:Clapperboard

  },



  politics:{

    title:"Leadership Intelligence",

    description:
    "Explore leadership patterns, public influence cycles and strategic insights.",

    features:[
      "Leadership Patterns",
      "Influence Cycles",
      "Strategic Timing",
    ],

    cta:
    "Explore Leadership Insights",

    icon:Landmark

  },



  international:{

    title:"Global Intelligence",

    description:
    "Explore global patterns, cycles and world trend perspectives through intelligence insights.",

    features:[
      "Global Cycles",
      "Trend Patterns",
      "Strategic View",
    ],

    cta:
    "Explore Global Insights",

    icon:Globe

  },



  lifestyle:{

    title:"Personal Growth Intelligence",

    description:
    "Discover personal patterns, choices and growth opportunities through personalised insights.",

    features:[
      "Self Discovery",
      "Life Patterns",
      "Growth Guidance",
    ],

    cta:
    "Explore Personal Insights",

    icon:UserRound

  },



  science:{

    title:"Discovery Intelligence",

    description:
    "Explore knowledge cycles, innovation patterns and discovery insights.",

    features:[
      "Research Patterns",
      "Innovation Cycles",
      "Discovery Insights",
    ],

    cta:
    "Explore Discovery Insights",

    icon:FlaskConical

  },



  environment:{

    title:"Earth Intelligence",

    description:
    "Explore natural cycles and environmental perspectives through intelligence insights.",

    features:[
      "Nature Cycles",
      "Environmental Patterns",
      "Future Awareness",
    ],

    cta:
    "Explore Earth Insights",

    icon:Leaf

  },



  travel:{

    title:"Journey Intelligence",

    description:
    "Explore travel timing, movement patterns and journey insights.",

    features:[
      "Travel Timing",
      "Journey Planning",
      "Location Insights",
    ],

    cta:
    "Explore Travel Insights",

    icon:Plane

  },



  culture:{

    title:"Heritage Intelligence",

    description:
    "Explore traditions, cultural cycles and historical intelligence patterns.",

    features:[
      "Cultural Patterns",
      "Historical Cycles",
      "Heritage Insights",
    ],

    cta:
    "Explore Heritage Insights",

    icon:ScrollText

  },


};







export default function CategoryAstroPreview({

  categoryName,

  categorySlug,

}:CategoryAstroPreviewProps){



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
  CATEGORY_ASTRO_MAP[
    normalizedSlug as keyof typeof CATEGORY_ASTRO_MAP
  ]
  ||
  {


    title:"Astro Intelligence",


    description:
    "Discover personalised astrology insights, planetary patterns and premium reports powered by NationPath Astro Engine.",


    features:[

      "Daily Insights",
      "Kundli Intelligence",
      "Premium Reports"

    ],


    cta:
    "Explore Astro Intelligence",


    icon:Sparkles


  };





  const Icon =
  content.icon;




  return (


    <section

      className="
      mt-14
      mb-10
      "

    >



      <motion.div

        initial={{
          opacity:0,
          y:20
        }}

        whileInView={{
          opacity:1,
          y:0
        }}

        viewport={{
          once:true
        }}

        transition={{
          duration:0.5
        }}


        className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-[#D4AF37]/40
        bg-[#FAF7F1]
        shadow-[0_15px_40px_rgba(212,175,55,0.12)]
        "

      >




        <motion.div

          animate={{

            y:[0,-12,0],
            opacity:[0.4,0.8,0.4]

          }}

          transition={{

            duration:5,
            repeat:Infinity

          }}

          className="
          absolute
          right-8
          top-8
          text-[#D4AF37]/30
          "

        >

          <Stars size={90}/>

        </motion.div>







        <div

          className="
          relative
          p-6
          sm:p-8
          "

        >



          <div

            className="
            flex
            items-center
            gap-4
            "

          >


            <div

              className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-[#FFF3C4]
              text-[#8B5E00]
              "

            >

              <Icon size={24}/>

            </div>



            <div>


              <p

                className="
                text-[10px]
                uppercase
                tracking-[0.3em]
                font-bold
                text-[#8B5E00]
                "

              >

                NationPath Astro Intelligence

              </p>


              <h3

                className="
                mt-1
                font-serif
                text-2xl
                font-bold
                text-[#4A3000]
                "

              >

                {content.title}

              </h3>


            </div>


          </div>





          <p

            className="
            mt-5
            max-w-3xl
            text-sm
            sm:text-base
            leading-relaxed
            text-[#6B4A10]
            "

          >

            {content.description}

          </p>






          <div

            className="
            mt-5
            flex
            flex-wrap
            gap-2
            "

          >

            {content.features.map((feature)=>(


              <span

                key={feature}

                className="
                rounded-full
                border
                border-[#D4AF37]/40
                bg-white
                px-4
                py-2
                text-xs
                font-medium
                text-[#6B4500]
                "

              >

                ✦ {feature}

              </span>


            ))}


          </div>







          <div

            className="
            mt-7
            flex
            flex-wrap
            gap-3
            "

          >


            <Link

              href="/astro"

              className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-[#8B5E00]
              px-6
              py-3
              text-sm
              font-bold
              text-white
              hover:bg-[#6F4800]
              transition
              "

            >

              {content.cta}

              <Compass size={16}/>

            </Link>



            <div

              className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#D4AF37]/50
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-[#6B4500]
              "

            >

              <Gem size={16}/>

              Premium Reports

            </div>


          </div>



        </div>


      </motion.div>


    </section>


  );

}