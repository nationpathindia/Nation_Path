"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// SACRED ALIGNMENT EXPERIENCE
//
// PREMIUM VEDIC REMEDY CHAMBER
//
// CMS ONLY
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";

import {
  Sparkles,
  Flame,
  Compass,
  ScrollText
} from "lucide-react";


import type {
  CmsHoroscopeRemedy
} from "./types";





interface Props {

  remedy:CmsHoroscopeRemedy;

}







export default function HoroscopeRemedy({

remedy

}:Props){



if(!remedy) return null;



return (

<section

className="
px-4
py-7
sm:px-8
lg:px-16
"

>


<div

className="
mx-auto
max-w-6xl
"

>






<motion.div

initial={{

opacity:0,

y:25

}}

whileInView={{

opacity:1,

y:0

}}

viewport={{

once:true

}}

transition={{

duration:.6

}}

className="
relative
overflow-hidden
rounded-[32px]
border
border-[#D4AF37]/35
bg-[#24140B]
p-5
shadow-[0_25px_70px_rgba(59,38,0,.32)]
sm:p-8
"

>









{/* GOLD AURA */}



<motion.div

animate={{

scale:[1,1.15,1]

}}

transition={{

duration:8,

repeat:Infinity,

ease:"easeInOut"

}}

className="
absolute
right-[-100px]
top-[-100px]
h-80
w-80
rounded-full
bg-[#D4AF37]/15
blur-[130px]
"

/>






<div

className="
absolute
left-5
top-4
font-serif
text-[100px]
text-[#D4AF37]/10
"

>

ॐ

</div>









<div

className="
relative
"

>









{/* HEADER */}



<div

className="
flex
items-center
gap-3
"

>



<div

className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
border
border-[#D4AF37]/40
bg-[#D4AF37]/10
"

>


<Sparkles

size={18}

className="
text-[#D4AF37]
"

/>


</div>







<div>


<p

className="
text-[10px]
font-bold
uppercase
tracking-[0.45em]
text-[#D4AF37]
"

>

Sacred Alignment

</p>





<h2

className="
mt-1
font-serif
text-xl
font-bold
text-[#FFF4D6]
sm:text-3xl
"

>

Today's Vedic Remedy

</h2>





</div>



</div>













{/* REMEDY GRID */}



<div

className="
mt-6
grid
gap-4
md:grid-cols-[1fr_220px]
"

>









{/* MAIN PRACTICE */}



<motion.div

whileHover={{

y:-3

}}

transition={{

type:"spring",

stiffness:220

}}

className="
rounded-[24px]
border
border-[#D4AF37]/20
bg-[#FFF9E8]/5
p-5
"

>





<div

className="
flex
items-center
gap-3
"

>


<Flame

size={20}

className="
text-[#D4AF37]
"

/>





<p

className="
text-[10px]
uppercase
tracking-[0.35em]
text-[#D4AF37]
"

>

Sacred Practice

</p>





</div>









<p

className="
mt-4
font-serif
text-xl
font-bold
leading-snug
text-[#FFF4D6]
"

>

{remedy.title}

</p>









{

remedy.practice &&

<p

className="
mt-3
text-sm
leading-7
text-[#D9C6A3]
"

>

{remedy.practice}

</p>

}





</motion.div>













{/* COSMIC PILLAR */}



<motion.div

whileHover={{

y:-3

}}

transition={{

type:"spring",

stiffness:220

}}

className="
rounded-[24px]
border
border-[#D4AF37]/25
bg-[#3B2600]
p-5
"

>



<div

className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
bg-[#D4AF37]/10
"

>

<Compass

size={20}

className="
text-[#D4AF37]
"

/>

</div>






<p

className="
mt-4
text-[10px]
uppercase
tracking-[0.3em]
text-[#D4AF37]
"

>

Cosmic Focus

</p>





<p

className="
mt-2
font-serif
text-xl
text-[#FFF4D6]
"

>

Balance

</p>





</motion.div>








</div>














{/* GUIDANCE */}



{

remedy.guidance &&


<motion.div

initial={{

opacity:0

}}

whileInView={{

opacity:1

}}

viewport={{

once:true

}}

transition={{

duration:.5

}}

className="
mt-5
flex
gap-3
rounded-[22px]
border
border-[#D4AF37]/20
bg-[#FFF9E8]/5
p-4
"

>



<ScrollText

size={18}

className="
mt-1
shrink-0
text-[#D4AF37]
"

/>






<p

className="
text-sm
leading-7
text-[#D9C6A3]
"

>

{remedy.guidance}

</p>





</motion.div>


}









{/* FOOTER */}



<div

className="
mt-6
flex
items-center
gap-3
"

>



<div

className="
h-px
flex-1
bg-[#D4AF37]/20
"

/>





<p

className="
text-center
text-[9px]
uppercase
tracking-[0.4em]
text-[#D4AF37]
"

>

Ancient Wisdom • Modern Intelligence

</p>





<div

className="
h-px
flex-1
bg-[#D4AF37]/20
"

/>





</div>









</div>







</motion.div>







</div>






</section>


);


}