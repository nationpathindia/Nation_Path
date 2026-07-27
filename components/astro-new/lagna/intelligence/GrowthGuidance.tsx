"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// LAGNA INTELLIGENCE EXPERIENCE
//
// WISDOM CHAMBER
//
// Identity:
// Ascendant evolution path
//
// Feeling:
// Sacred Vedic manuscript + cinematic reveal
//
// Future:
// Dynamic guidance API
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import {
  Compass,
  Flame,
  Sparkles,
  ScrollText,
  Crown,
} from "lucide-react";

import type { LagnaProfile } from "../types";



interface GrowthGuidanceProps {
  profile: LagnaProfile;
}



export default function GrowthGuidance({

  profile,

}: GrowthGuidanceProps) {



return (

<section

className="
relative
overflow-hidden
bg-[#1A1008]
px-5
py-14
sm:px-8
"

>





{/* AMBIENT GOLD */}



<div

className="
pointer-events-none
absolute
left-1/2
top-[-160px]
h-[380px]
w-[380px]
-translate-x-1/2
rounded-full
bg-[#D4AF37]/20
blur-[150px]
"

/>






<div

className="
relative
mx-auto
max-w-4xl
"

>








{/* HEADER */}



<motion.div

initial={{
opacity:0,
y:20
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{once:true}}

className="
text-center
"

>


<div

className="
mx-auto
inline-flex
items-center
gap-2
rounded-full
border
border-[#D4AF37]/40
bg-[#241607]
px-4
py-2
text-xs
tracking-wide
text-[#D4AF37]
"

>

<ScrollText size={15}/>

Wisdom Chamber

</div>







<h2

className="
mt-5
text-3xl
font-semibold
text-[#FFF9E8]
"

>

Your Growth Path

</h2>







<p

className="
mx-auto
mt-4
max-w-lg
text-sm
leading-7
text-[#C9B27C]
"

>

The lessons that transform your Ascendant energy into conscious wisdom.

</p>





</motion.div>









{/* CHAMBER */}



<motion.div

initial={{
opacity:0,
y:25
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{once:true}}

className="
relative
mt-10
rounded-[32px]
border
border-[#D4AF37]/30
bg-[#241607]
p-5
shadow-[0_25px_70px_rgba(0,0,0,0.35)]
sm:p-7
"

>





{/* INNER FRAME */}



<div

className="
absolute
inset-3
rounded-[26px]
border
border-[#D4AF37]/10
pointer-events-none
"

/>









<div

className="
relative
space-y-5
"

>





{

profile.guidance.map((item,index)=>(



<motion.div

key={item.title}

initial={{
opacity:0,
x:-15
}}

whileInView={{
opacity:1,
x:0
}}

viewport={{once:true}}

transition={{
duration:.5,
delay:index*.12
}}

className="
relative
flex
gap-4
rounded-2xl
border
border-[#D4AF37]/20
bg-[#120C08]
p-4
"

>









{/* ICON */}



<div

className="
flex
h-10
w-10
shrink-0
items-center
justify-center
rounded-full
border
border-[#D4AF37]/40
bg-[#241607]
"

>

{

index===0 ?

<Flame

size={19}

className="text-[#D4AF37]"
/>

:

index===1 ?

<Compass

size={19}

className="text-[#D4AF37]"
/>

:

<Sparkles

size={19}

className="text-[#D4AF37]"
/>

}



</div>








<div className="flex-1">


<p

className="
text-[9px]
uppercase
tracking-[0.45em]
text-[#D4AF37]
"

>

Chapter {index+1}

</p>





<h3

className="
mt-1
text-lg
font-semibold
text-[#FFF9E8]
"

>

{item.title}

</h3>





<p

className="
mt-2
text-sm
leading-6
text-[#C9B27C]
"

>

{item.description}

</p>






{

item.keyword && (

<span

className="
mt-3
inline-flex
rounded-full
border
border-[#D4AF37]/30
px-3
py-1
text-[11px]
text-[#D4AF37]
"

>

{item.keyword}

</span>

)

}





</div>







</motion.div>



))

}



</div>










{/* FINAL SEAL */}



<div

className="
mt-7
flex
items-center
justify-center
gap-3
rounded-full
border
border-[#D4AF37]/20
bg-[#120C08]
px-5
py-3
"

>


<Crown

size={17}

className="text-[#D4AF37]"
/>



<p

className="
text-xs
italic
text-[#C9B27C]
"

>

Ascendant Wisdom Unfolds

</p>



</div>







</motion.div>








</div>



</section>


);

}