"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// NAKSHATRA TRAITS
//
// Personality Intelligence Layer
//
// UI EXPERIENCE ONLY
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";

import {
  Sparkles,
  Heart,
  Shield,
  Star,
} from "lucide-react";




const traits = [

  {
    icon: Star,

    title:
    "Core Personality",

    type:
    "main",

    text:
    "Ashwini carries the energy of movement, healing and fearless beginnings. This lunar nature seeks exploration, growth and meaningful action.",

    style:
    "bg-[#FFF9E8]",

  },



  {
    icon: Sparkles,

    title:
    "Strengths",

    type:
    "list",

    points:[

      "Quick decision making",

      "Natural healing ability",

      "Independent thinking",

      "Courage during challenges",

    ],

    style:
    "bg-[#F6E8C8]",

  },



  {
    icon: Shield,

    title:
    "Challenges",

    type:
    "list",

    points:[

      "Impatience with delays",

      "Restless energy",

      "Acting too quickly",

      "Difficulty slowing down",

    ],

    style:
    "bg-[#EFE0C2]",

  },



  {
    icon: Heart,

    title:
    "Emotional Nature",

    type:
    "main",

    text:

    "The Moon's connection reflects an emotional pattern that values freedom, movement and the courage to begin new journeys.",

    style:
    "bg-[#F8F1DE]",

  },

];





export default function NakshatraTraits(){



return (


<section

className="
relative
overflow-hidden
bg-[#FFF9E8]
px-4
py-20
md:px-8
"

>



{/* GOLD AMBIENCE */}

<div

className="
pointer-events-none
absolute
right-0
top-20
h-[350px]
w-[350px]
rounded-full
bg-[#D4AF37]/10
blur-[130px]
"

/>






<motion.div


initial={{

opacity:0,

y:30,

}}


whileInView={{

opacity:1,

y:0,

}}


viewport={{

once:true,

}}


transition={{

duration:.7,

}}



className="
relative
mx-auto
max-w-6xl
"

>







{/* HEADER */}

<div

className="
mb-12
text-center
"

>


<div

className="
inline-flex
items-center
gap-2
rounded-full
bg-[#120C08]
px-4
py-2
text-sm
text-[#D4AF37]
"

>


<Sparkles size={15}/>


Personality Intelligence


</div>





<h2

className="
mt-6
font-serif
text-3xl
font-semibold
text-[#3B2600]
md:text-5xl
"

>


The Nature Hidden Within Your Stars


</h2>





<p

className="
mx-auto
mt-4
max-w-2xl
leading-relaxed
text-[#5A3908]
"

>

Your Nakshatra reflects emotional patterns,
natural abilities and the inner qualities
connected with your lunar identity.

</p>



</div>









{/* TRAITS GRID */}



<div

className="
grid
gap-6
md:grid-cols-2
"

>



{

traits.map((item,index)=>{


const Icon=item.icon;



return (


<motion.div


key={item.title}


initial={{

opacity:0,

y:25,

}}


whileInView={{

opacity:1,

y:0,

}}


viewport={{

once:true,

}}


transition={{

delay:index * .12,

}}



className={`
rounded-3xl
border
border-[#D4AF37]/30
${item.style}
p-6
shadow-[0_15px_40px_rgba(139,94,0,0.06)]
transition
hover:border-[#D4AF37]
`}



>



{/* ICON HEADER */}


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
h-11
w-11
items-center
justify-center
rounded-full
bg-[#120C08]
text-[#D4AF37]
"

>


<Icon size={20}/>


</div>





<h3

className="
font-serif
text-2xl
font-semibold
text-[#3B2600]
"

>


{item.title}


</h3>



</div>









{/* TEXT */}


{

item.text &&

<p

className="
mt-5
leading-relaxed
text-[#5A3908]
"

>

{item.text}

</p>

}








{/* LIST */}

{

item.points &&

<ul

className="
mt-5
space-y-3
"

>


{

item.points.map(point=>(


<li

key={point}

className="
flex
items-center
gap-3
text-[#5A3908]
"

>


<span

className="
h-2
w-2
rounded-full
bg-[#D4AF37]
"

/>


{point}


</li>


))

}


</ul>

}



</motion.div>


);


})


}



</div>





</motion.div>



</section>


);


}