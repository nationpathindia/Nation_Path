"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO TOOLS
//
// Premium Astrology Intelligence Hub
//
// Future:
// Connect with Astro Engine APIs
//////////////////////////////////////////////////////////////

import {
  Sparkles,
  Orbit,
  Heart,
  CalendarDays,
  CircleUserRound,
} from "lucide-react";

import AstroToolCard from "./AstroToolCard";





const TOOLS = [

{
 title:"Birth Chart",
 description:
 "Generate your Vedic Kundli and discover planetary influences based on your birth details.",
 icon:CircleUserRound,
 tag:"Kundli",
 href:"/astrology/kundli",
},


{
 title:"Nakshatra Finder",
 description:
 "Discover your lunar constellation and understand your emotional blueprint.",
 icon:Sparkles,
 tag:"Moon",
 href:"/astrology/nakshatra",
},


{
 title:"Kundli Compatibility",
 description:
 "Explore relationship harmony through traditional Vedic matching.",
 icon:Heart,
 tag:"Match",
 href:"/astrology/compatibility",
},


{
 title:"Muhurat Finder",
 description:
 "Find auspicious timings for important life events.",
 icon:CalendarDays,
 tag:"Timing",
 href:"/astrology/muhurat",
},


{
 title:"Planet Intelligence",
 description:
 "Understand planetary strengths and their impact on your journey.",
 icon:Orbit,
 tag:"Planets",
 href:"/astrology/planets",
},


];







export default function AstroTools(){



return (

<section

className="
relative
overflow-hidden
bg-[#F8F1DE]
px-5
py-20
sm:px-8
lg:px-16
"

>


{/* BACKGROUND GLOW */}

<div

className="
pointer-events-none
absolute
right-0
top-20
h-96
w-96
rounded-full
bg-[#D4AF37]/10
blur-[110px]
"

/>





<div

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
"

>


<p

className="
text-xs
font-bold
uppercase
tracking-[0.4em]
text-[#8B5E00]
"

>

Astro Intelligence Tools

</p>





<h2

className="
mt-4
font-serif
text-3xl
font-bold
text-[#3B2600]
sm:text-4xl
"

>

Explore Your Cosmic Blueprint

</h2>






<p

className="
mt-5
max-w-xl
text-sm
leading-relaxed
text-[#6B4A16]
sm:text-base
"

>

Powerful Vedic astrology tools
designed with ancient wisdom and modern intelligence.

</p>



</div>









{/* TOOL GRID */}



<div

className="
grid
gap-6
sm:grid-cols-2
lg:grid-cols-3
"

>


{

TOOLS.map((tool)=>(


<AstroToolCard

key={tool.title}

{...tool}

/>


))


}



</div>







</div>



</section>


);


}