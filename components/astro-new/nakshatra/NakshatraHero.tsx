"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO NAKSHATRA HERO
//
// Premium Vedic Lunar Intelligence Experience
//
// Future:
// Dynamic Nakshatra API Integration
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import {
  Moon,
  Sparkles,
  Star,
  Orbit,
  ArrowRight,
} from "lucide-react";


interface NakshatraHeroProps {

  title?: string;

  description?: string;

  ctaText?: string;

}





export default function NakshatraHero({

  title =
  "Discover Your Birth Nakshatra",

  description =
  "Explore ancient Vedic lunar wisdom through Moon Intelligence, personality insights and cosmic guidance powered by NationPath Astro.",

  ctaText =
  "Discover My Nakshatra",

}: NakshatraHeroProps) {



return (

<section

className="
relative
overflow-hidden
bg-[#FFF9E8]
px-5
py-16
sm:px-8
lg:px-16
"

>





{/* LUNAR AMBIENCE */}



<div

className="
pointer-events-none
absolute
left-1/2
top-[-180px]
h-[560px]
w-[560px]
-translate-x-1/2
rounded-full
bg-[#D4AF37]/20
blur-[150px]
"

/>





<div

className="
pointer-events-none
absolute
right-[-120px]
bottom-[-120px]
h-[420px]
w-[420px]
rounded-full
bg-[#8B5E00]/10
blur-[140px]
"

/>








<div

className="
relative
z-10
mx-auto
max-w-6xl
"

>



<div

className="
grid
items-center
gap-12
lg:grid-cols-2
"

>









{/* TEXT */}



<motion.div

initial={{
opacity:0,
y:30,
}}

animate={{
opacity:1,
y:0,
}}

transition={{
duration:0.7,
}}

className="
text-center
lg:text-left
"

>







<div

className="
mb-6
inline-flex
items-center
gap-2
rounded-full
border
border-[#D4AF37]/40
bg-[#F8F1DE]
px-4
py-2
text-sm
font-medium
text-[#8B5E00]
"

>

<Moon

size={16}

/>


Moon Intelligence


</div>









<h1

className="
text-4xl
font-semibold
leading-tight
text-[#3B2600]
sm:text-5xl
lg:text-6xl
"

>

{title}


</h1>








<p

className="
mx-auto
mt-6
max-w-xl
text-base
leading-8
text-[#6B4A16]
sm:text-lg
lg:mx-0
"

>

{description}


</p>









<button

className="
mt-8
inline-flex
items-center
gap-3
rounded-full
bg-[#120C08]
px-7
py-4
text-sm
font-medium
text-[#FFF9E8]
transition
hover:bg-[#3B2600]
"

>

{ctaText}



<ArrowRight

size={18}

/>


</button>








</motion.div>













{/* MOON VISUAL */}





<motion.div

initial={{
opacity:0,
scale:0.9,
}}

animate={{
opacity:1,
scale:1,
}}

transition={{
duration:0.8,
}}

className="
relative
mx-auto
flex
h-[320px]
w-[320px]
items-center
justify-center
sm:h-[400px]
sm:w-[400px]
"

>









{/* OUTER ORBIT */}



<motion.div

animate={{

rotate:360,

}}

transition={{

duration:40,

repeat:Infinity,

ease:"linear",

}}

className="
absolute
inset-0
rounded-full
border
border-[#D4AF37]/30
"

>







<Star

size={22}

className="
absolute
left-10
top-20
text-[#D4AF37]
"

/>





<Star

size={18}

className="
absolute
right-14
bottom-24
text-[#8B5E00]
"

/>





</motion.div>










{/* INNER RING */}



<div

className="
absolute
inset-10
rounded-full
border
border-[#8B5E00]/20
"

/>







{/* MOON GLOW */}



<div

className="
absolute
h-64
w-64
rounded-full
bg-[#D4AF37]/10
blur-3xl
"

/>









{/* MOON CORE */}



<motion.div

animate={{

y:[0,-8,0],

}}

transition={{

duration:5,

repeat:Infinity,

ease:"easeInOut",

}}

className="
relative
flex
h-44
w-44
items-center
justify-center
rounded-full
bg-[#F8F1DE]
shadow-[0_0_100px_rgba(212,175,55,0.45)]
"

>





<Moon

size={96}

strokeWidth={1.1}

className="
text-[#D4AF37]
"

/>





</motion.div>









{/* FLOATING ENERGY */}



<motion.div

animate={{

rotate:360,

}}

transition={{

duration:25,

repeat:Infinity,

ease:"linear",

}}

className="
absolute
inset-0
"

>





<Sparkles

size={28}

className="
absolute
right-12
top-24
text-[#D4AF37]
"

/>






<Orbit

size={30}

className="
absolute
bottom-20
left-14
text-[#8B5E00]
"

/>





</motion.div>









</motion.div>








</div>







</div>







</section>


);

}