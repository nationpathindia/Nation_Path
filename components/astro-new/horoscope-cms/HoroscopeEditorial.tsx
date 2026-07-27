"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// TODAY'S COSMIC READING EXPERIENCE
//
// PREMIUM VEDIC INTELLIGENCE
//
// CMS ONLY
// NO ENGINE
// NO CALCULATION
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";

import {
  Sparkles,
  ScrollText,
  Quote,
} from "lucide-react";


import type {
  CmsHoroscopeEditorial
} from "./types";




interface Props {

  editorial:CmsHoroscopeEditorial;

}






export default function HoroscopeEditorial({

editorial

}:Props){



return (


<section

className="
relative
overflow-hidden
px-4
py-6
sm:px-8
lg:px-16
"

>



{/* GOLD ENERGY */}


<div

className="
pointer-events-none
absolute
left-1/2
top-[-80px]
h-80
w-80
-translate-x-1/2
rounded-full
bg-[#D4AF37]/12
blur-[150px]
"

/>





<motion.div

animate={{

x:["-40%","120%"]

}}

transition={{

duration:10,

repeat:Infinity,

ease:"linear"

}}

className="
pointer-events-none
absolute
top-0
left-0
h-[2px]
w-[40%]
bg-gradient-to-r
from-transparent
via-[#D4AF37]
to-transparent
opacity-60
"

/>








<div

className="
relative
mx-auto
max-w-6xl
"

>






{/* SECTION TITLE */}



<motion.div


initial={{

opacity:0,

y:15

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
flex
items-center
gap-3
"

>



<div

className="
flex
h-9
w-9
items-center
justify-center
rounded-full
border
border-[#D4AF37]/40
bg-[#D4AF37]/10
shadow-[0_0_25px_rgba(212,175,55,.25)]
"

>


<Sparkles

size={16}

className="
text-[#D4AF37]
"

/>


</div>






<p

className="
text-[10px]
font-bold
uppercase
tracking-[0.45em]
text-[#8B5E00]
"

>

Today's Cosmic Reading

</p>



</motion.div>








{/* MAIN CONTENT */}


<div

className="
mt-6
grid
gap-5
lg:grid-cols-2
"

>






{/* GUIDANCE */}



<motion.div


initial={{

opacity:0,

x:-20

}}



whileInView={{

opacity:1,

x:0

}}



viewport={{

once:true

}}



transition={{

duration:.6

}}



whileHover={{

y:-4

}}



className="
group
relative
overflow-hidden
rounded-[28px]
border
border-[#D4AF37]/30
bg-[#FFF9E8]/80
p-5
backdrop-blur-xl
shadow-[0_20px_55px_rgba(59,38,0,.08)]
sm:p-7
"

>


{/* moving glow */}


<div

className="
absolute
right-[-60px]
top-[-60px]
h-40
w-40
rounded-full
bg-[#D4AF37]/15
blur-3xl
"

/>





<div

className="
relative
"

>



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
h-11
w-11
items-center
justify-center
rounded-xl
border
border-[#D4AF37]/30
bg-[#D4AF37]/10
"

>


<ScrollText

size={18}

className="
text-[#8B5E00]
"

/>


</div>




<p

className="
text-[10px]
font-bold
uppercase
tracking-[0.35em]
text-[#8B5E00]
"

>

Today's Guidance

</p>



</div>





<p

className="
mt-6
text-sm
leading-7
text-[#5B3A12]
sm:text-lg
"

>

{editorial.prediction ||

"Your cosmic guidance awaits."}

</p>



</div>



</motion.div>
{/* OVERVIEW */}



<motion.div


initial={{

opacity:0,

x:20

}}



whileInView={{

opacity:1,

x:0

}}



viewport={{

once:true

}}



transition={{

duration:.6

}}



whileHover={{

y:-4

}}



className="
relative
overflow-hidden
rounded-[28px]
border
border-[#D4AF37]/30
bg-[#F3E6C8]
p-5
shadow-[0_20px_55px_rgba(139,94,0,.10)]
sm:p-7
"

>



{/* GOLD AURA */}


<div

className="
absolute
right-[-70px]
top-[-70px]
h-52
w-52
rounded-full
bg-[#D4AF37]/25
blur-3xl
"

/>



<motion.div

animate={{

rotate:360

}}

transition={{

duration:40,

repeat:Infinity,

ease:"linear"

}}

className="
absolute
right-10
top-10
h-20
w-20
rounded-full
border
border-[#D4AF37]/20
"

/>





<div

className="
relative
"

>


<p

className="
text-[10px]
font-bold
uppercase
tracking-[0.35em]
text-[#8B5E00]
"

>

Cosmic Overview

</p>







<h2

className="
mt-4
font-serif
text-2xl
font-bold
leading-tight
text-[#3B2600]
sm:text-3xl
"

>


{

editorial.headline ||

"Your cosmic journey unfolds today."

}


</h2>






{

editorial.overview &&


<p

className="
mt-5
text-sm
leading-7
text-[#6B4A16]
sm:text-base
"

>

{editorial.overview}

</p>


}



</div>




</motion.div>







</div>









{/* WISDOM QUOTE */}



{

editorial.quote &&



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

duration:.7

}}



className="
relative
mt-6
overflow-hidden
rounded-[30px]
border
border-[#D4AF37]/30
bg-[#3B2600]
p-6
shadow-[0_25px_70px_rgba(59,38,0,.25)]
sm:p-8
"

>



{/* MOVING LIGHT */}


<motion.div


animate={{

x:[

"-50%",

"120%"

]

}}



transition={{

duration:9,

repeat:Infinity,

ease:"linear"

}}



className="
absolute
top-0
left-0
h-[2px]
w-[45%]
bg-gradient-to-r
from-transparent
via-[#D4AF37]
to-transparent
"







/>







<div

className="
absolute
right-[-50px]
top-[-50px]
h-48
w-48
rounded-full
bg-[#D4AF37]/20
blur-3xl
"

/>







<div

className="
relative
flex
gap-4
"

>



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
bg-[#D4AF37]/10
"

>



<Quote

size={19}

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
tracking-[0.4em]
text-[#D4AF37]
"

>

Ancient Wisdom

</p>







<blockquote

className="
mt-4
font-serif
text-lg
italic
leading-8
text-[#FFF9E8]
sm:text-xl
"

>

"{editorial.quote}"

</blockquote>





</div>



</div>






</motion.div>



}



</div>



</section>



);


}