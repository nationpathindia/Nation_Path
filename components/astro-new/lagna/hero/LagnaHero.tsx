"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// LAGNA INTELLIGENCE EXPERIENCE
//
// HERO CHAPTER
//
// Identity:
// The Rising Identity Gateway
//
// Feeling:
// Ancient manuscript + Vedic intelligence
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import {
  Sun,
  Compass,
  Sparkles,
  ArrowRight,
} from "lucide-react";



interface LagnaHeroProps {

  title?: string;

  description?: string;

  buttonText?: string;

}




export default function LagnaHero({

  title =
    "Discover Your Rising Identity",

  description =
    "The Ascendant is the sacred point where your journey meets the world. Discover your presence, expression and the path through which life experiences you.",

  buttonText =
    "Begin Your Ascendant Journey",

}: LagnaHeroProps) {



return (

<section

className="
relative
overflow-hidden
bg-[#FFF9E8]
px-5
py-24
sm:px-8
lg:px-16
"

>



{/* GOLD HORIZON */}

<div

className="
pointer-events-none
absolute
left-1/2
top-[-220px]
h-[650px]
w-[650px]
-translate-x-1/2
rounded-full
bg-[#D4AF37]/20
blur-[170px]
"

/>





<div

className="
relative
mx-auto
max-w-6xl
"

>


<div

className="
grid
items-center
gap-16
lg:grid-cols-2
"

>





{/* TEXT */}

<motion.div

initial={{

opacity:0,
y:40

}}

animate={{

opacity:1,
y:0

}}

transition={{

duration:0.8

}}

className="
text-center
lg:text-left
"

>



<div

className="
mb-8
inline-flex
items-center
gap-3
border-b
border-[#D4AF37]/40
pb-3
text-xs
uppercase
tracking-[0.35em]
text-[#8B5E00]
"

>

<Compass size={16}/>

Ascendant Intelligence

</div>







<h1

className="
text-5xl
font-semibold
leading-[1.1]
text-[#3B2600]
sm:text-6xl
"

>

{title}

</h1>







<p

className="
mx-auto
mt-7
max-w-xl
text-lg
leading-8
text-[#6B4A16]
lg:mx-0
"

>

{description}

</p>








<button

className="
group
mt-10
inline-flex
items-center
gap-4
rounded-full
bg-[#120C08]
px-9
py-4
text-sm
font-medium
text-[#FFF9E8]
transition
hover:bg-[#3B2600]
"

>

{buttonText}


<span

className="
flex
h-8
w-8
items-center
justify-center
rounded-full
bg-[#D4AF37]
text-[#120C08]
transition
group-hover:translate-x-1
"

>

<ArrowRight size={16}/>

</span>


</button>





</motion.div>









{/* ASCENDANT SEAL */}



<motion.div

initial={{

opacity:0,
scale:.85

}}

animate={{

opacity:1,
scale:1

}}

transition={{

duration:1

}}

className="
relative
mx-auto
flex
h-[360px]
w-[360px]
items-center
justify-center
sm:h-[440px]
sm:w-[440px]
"

>








{/* OUTER SACRED RING */}



<motion.div

animate={{

rotate:360

}}

transition={{

duration:80,
repeat:Infinity,
ease:"linear"

}}

className="
absolute
inset-0
rounded-full
border
border-[#D4AF37]/40
"

>


<div

className="
absolute
left-1/2
top-0
h-3
w-3
-translate-x-1/2
rounded-full
bg-[#D4AF37]
"

/>


<div

className="
absolute
bottom-0
left-1/2
h-2
w-2
-translate-x-1/2
rounded-full
bg-[#8B5E00]
"

/>



</motion.div>








{/* INNER PAPER SEAL */}



<div

className="
absolute
inset-14
rounded-full
border
border-[#D4AF37]/30
bg-[#F8F1DE]
shadow-inner
"

/>









{/* CENTRAL SUN */}



<motion.div

animate={{

y:[0,-10,0]

}}

transition={{

duration:5,
repeat:Infinity,
ease:"easeInOut"

}}

className="
relative
flex
h-48
w-48
items-center
justify-center
rounded-full
bg-[#FFF9E8]
shadow-[0_0_120px_rgba(212,175,55,0.35)]
"

>



<Sun

size={95}

strokeWidth={1}

className="
text-[#D4AF37]
"

/>



</motion.div>









{/* SYMBOLS */}



<Sparkles

size={30}

className="
absolute
right-16
top-24
text-[#D4AF37]
"

/>




<Compass

size={34}

className="
absolute
bottom-24
left-14
text-[#8B5E00]
"

/>






</motion.div>






</div>



</div>


</section>


);

}