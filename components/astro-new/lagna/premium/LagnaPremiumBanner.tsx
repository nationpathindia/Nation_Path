"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// LAGNA INTELLIGENCE EXPERIENCE
//
// PREMIUM REVEAL CHAPTER
//
// Identity:
// Complete Ascendant Blueprint Gateway
//
// Feeling:
// Royal manuscript reveal
//
// Future:
// Premium subscription unlock
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import {
  Crown,
  Sparkles,
  ArrowRight,
  ScrollText,
  Star,
} from "lucide-react";



interface LagnaPremiumBannerProps {

  ascendant?: string;

}





export default function LagnaPremiumBanner({

  ascendant = "Your Ascendant",

}: LagnaPremiumBannerProps) {



return (

<section

className="
relative
overflow-hidden
bg-[#F8F1DE]
px-5
py-14
sm:px-8
"

>







{/* GOLD LIGHT */}



<div

className="
pointer-events-none
absolute
left-1/2
top-[-160px]
h-[420px]
w-[420px]
-translate-x-1/2
rounded-full
bg-[#D4AF37]/20
blur-[150px]
"

/>









<motion.div

initial={{

opacity:0,
y:30

}}

whileInView={{

opacity:1,
y:0

}}

viewport={{once:true}}

className="
relative
mx-auto
max-w-7xl
overflow-hidden
rounded-[42px]
border
border-[#D4AF37]/40
bg-[#FFF9E8]
px-6
py-10
shadow-[0_30px_90px_rgba(18,12,8,0.15)]
sm:px-10
lg:aspect-[21/8]
lg:flex
lg:items-center
"

>








{/* INNER FRAME */}



<div

className="
pointer-events-none
absolute
inset-4
rounded-[34px]
border
border-[#D4AF37]/20
"

/>









<div

className="
relative
grid
items-center
gap-10
lg:grid-cols-[1.2fr_0.8fr]
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
inline-flex
items-center
gap-3
rounded-full
border
border-[#D4AF37]/40
bg-[#F8F1DE]
px-5
py-2
text-xs
tracking-[0.3em]
text-[#8B5E00]
"

>


<ScrollText size={15}/>

PREMIUM REVEAL


</div>









<h2

className="
mt-6
text-4xl
font-semibold
leading-tight
text-[#3B2600]
sm:text-5xl
"

>

Complete {ascendant} Blueprint

</h2>








<p

className="
mt-5
max-w-xl
leading-8
text-[#6B4A16]
"

>

Reveal your complete Ascendant intelligence with deeper personality patterns, hidden strengths and your evolutionary path.

</p>









<div

className="
mt-7
flex
flex-wrap
gap-3
"

>


{

[
"Identity",
"Strength",
"Growth",
"Direction"

].map((item)=>(


<span

key={item}

className="
rounded-full
border
border-[#D4AF37]/30
bg-[#F8F1DE]
px-4
py-2
text-xs
text-[#8B5E00]
"

>

✓ {item}

</span>


))


}



</div>








<button

className="
mt-8
inline-flex
items-center
gap-3
rounded-full
bg-[#120C08]
px-8
py-4
text-sm
font-medium
text-[#FFF9E8]
transition
hover:scale-105
"

>

Unlock Complete Report

<ArrowRight size={18}/>

</button>







</div>













{/* ROYAL SEAL */}



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
mx-auto
flex
h-60
w-60
items-center
justify-center
rounded-full
border
border-[#D4AF37]/50
bg-[#120C08]
shadow-[0_0_80px_rgba(212,175,55,0.25)]
"

>








<div

className="
absolute
inset-5
rounded-full
border
border-[#D4AF37]/30
"

/>








<Crown

size={70}

strokeWidth={1}

className="
text-[#D4AF37]
"

/>






<Star

size={18}

className="
absolute
right-12
top-12
text-[#D4AF37]
"

/>



<Sparkles

size={20}

className="
absolute
bottom-12
left-12
text-[#D4AF37]
"

/>







</motion.div>









</div>







</motion.div>









</section>


);

}