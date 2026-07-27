"use client";

//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO
//
// PREMIUM ASTROLOGY CTA
//
// LUXURY VEDIC CONVERSION MODULE
//
// NO ENGINE
// NO AI
// NO CALCULATION
//
//////////////////////////////////////////////////////////////

import Link from "next/link";

import {
  Sparkles,
  Crown,
  ArrowRight,
  Moon,
  Star,
  Orbit,
  ShieldCheck,
} from "lucide-react";

import { motion } from "framer-motion";



export default function PremiumAstrologyCTA(){


return (

<section

className="
relative
mx-4
mt-8
overflow-hidden
rounded-[34px]
border
border-[#D4AF37]/40
bg-gradient-to-br
from-[#220B0B]
via-[#3A1414]
to-[#5A2418]
p-6
shadow-[0_30px_90px_rgba(122,31,31,.35)]
sm:mx-0
"

>





{/* GOLD ENERGY AURA */}


<motion.div

animate={{

scale:[1,1.15,1],

opacity:[0.18,0.35,0.18]

}}

transition={{

duration:5,

repeat:Infinity

}}

className="
absolute
right-[-90px]
top-[-90px]
h-72
w-72
rounded-full
bg-[#D4AF37]
blur-[100px]
"

/>






<motion.div

animate={{

rotate:[0,360]

}}

transition={{

duration:40,

repeat:Infinity,

ease:"linear"

}}

className="
absolute
left-[-100px]
bottom-[-100px]
h-56
w-56
rounded-full
border
border-[#D4AF37]/20
"

/>








<div

className="
relative
flex
flex-col
gap-7
lg:flex-row
lg:items-center
lg:justify-between
"

>







{/* CONTENT */}



<div

className="
max-w-2xl
"

>



<div

className="
flex
items-center
gap-2
text-[11px]
font-bold
uppercase
tracking-[0.35em]
text-[#D4AF37]
"

>


<Sparkles size={14}/>


Premium Vedic Intelligence


</div>








<h2

className="
mt-3
font-serif
text-3xl
font-bold
leading-tight
text-[#FFF9E8]
sm:text-4xl
"

>

Unlock Your Complete Astrology Journey

</h2>







<p

className="
mt-3
max-w-xl
text-sm
leading-7
text-[#E7D8B4]
"

>

Discover deeper Vedic insights with your
personal Kundali, Birth Chart Intelligence,
Dasha Timeline and Premium Reports.

</p>









{/* PREMIUM FEATURES */}


<div

className="
mt-5
flex
flex-wrap
gap-3
"

>


<Feature

icon={<Moon size={13}/>}

text="Kundali"

/>



<Feature

icon={<Star size={13}/>}

text="Birth Chart"

/>



<Feature

icon={<Orbit size={13}/>}

text="Dasha"

/>



<Feature

icon={<ShieldCheck size={13}/>}

text="Reports"

/>



</div>






</div>












{/* CTA AREA */}



<div

className="
flex
flex-col
items-center
gap-3
"

>


<Link

href="/register"

className="
group
flex
items-center
gap-3
rounded-full
bg-gradient-to-r
from-[#D4AF37]
to-[#F4D47C]
px-8
py-3.5
text-sm
font-bold
text-[#3B2600]
shadow-[0_15px_50px_rgba(212,175,55,.35)]
transition
hover:scale-105
"

>


<Crown size={17}/>


Create Free Account



<ArrowRight

size={16}

className="
transition
group-hover:translate-x-1
"

/>



</Link>






<div

className="
flex
items-center
gap-2
text-[10px]
uppercase
tracking-[0.25em]
text-[#D4AF37]
"

>

<Sparkles size={11}/>

Begin Your Journey

</div>





</div>







</div>







</section>


);

}









function Feature({

icon,

text,

}:{

icon:React.ReactNode;

text:string;

}){


return (

<motion.div

whileHover={{

y:-3

}}

className="
flex
items-center
gap-2
rounded-full
border
border-[#D4AF37]/30
bg-[#FFF9E8]/10
px-3
py-1.5
text-xs
font-semibold
text-[#FFF9E8]
backdrop-blur
"

>


<span

className="
text-[#D4AF37]
"

>

{icon}

</span>



{text}



</motion.div>

);

}