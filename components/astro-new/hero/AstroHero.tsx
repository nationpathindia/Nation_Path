"use client";

import Link from "next/link";

import {
  Sparkles,
  Star,
  Sun,
  Moon,
  ArrowRight,
} from "lucide-react";

import { motion } from "framer-motion";

import AstroHeroVisual from "./AstroHeroVisual";



const FEATURES = [

  {
    icon: Star,
    title: "12 Zodiac Signs",
    text: "Daily cosmic guidance",
  },

  {
    icon: Sun,
    title: "Panchang",
    text: "Ancient calculations",
  },

  {
    icon: Sparkles,
    title: "AI Intelligence",
    text: "Modern insights",
  },

  {
    icon: Moon,
    title: "Vedic System",
    text: "Authentic astrology",
  },

];




export default function AstroHero(){


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


{/* BACKGROUND */}

<div

className="
pointer-events-none
absolute
inset-0
"

>


<div

className="
absolute
left-1/2
top-0
h-[500px]
w-[500px]
-translate-x-1/2
rounded-full
bg-[#D4AF37]/20
blur-[120px]
"

/>



<div

className="
absolute
bottom-0
right-0
h-[350px]
w-[350px]
rounded-full
bg-[#8B5E00]/10
blur-[120px]
"

/>


</div>





<div

className="
relative
z-10
mx-auto
grid
max-w-7xl
items-center
gap-14
lg:grid-cols-2
"

>





{/* CONTENT */}


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
duration:.8,
}}

>



<div

className="
inline-flex
items-center
gap-2
rounded-full
border
border-[#D4AF37]/40
bg-[#FFF9E8]
px-5
py-2
text-xs
font-bold
tracking-[0.25em]
text-[#8B5E00]
"

>

<Sparkles size={14}/>

NATIONPATH ASTRO INTELLIGENCE

</div>





<h1

className="
mt-7
font-serif
text-4xl
font-bold
leading-tight
text-[#3B2600]
sm:text-5xl
lg:text-6xl
"

>

Ancient Wisdom.

<br/>

<span

className="
text-[#8B5E00]
"

>

Modern Astro Intelligence.

</span>


</h1>





<p

className="
mt-6
max-w-xl
text-lg
leading-relaxed
text-[#6B4A16]
"

>

Discover daily horoscope, Panchang,
Kundli insights and personalised Vedic
guidance powered by authentic
astronomical calculations and
NationPath Astro Intelligence.

</p>






<div

className="
mt-8
flex
flex-col
gap-4
sm:flex-row
"

>


<Link

href="/astro/horoscope"

className="
group
inline-flex
items-center
justify-center
gap-2
rounded-full
bg-[#8B5E00]
px-8
py-3.5
font-bold
text-[#FFF9E8]
transition
hover:bg-[#6F4800]
"

>

Explore Horoscope

<ArrowRight

size={16}

className="
transition
group-hover:translate-x-1
"

/>

</Link>





<Link

href="/pricing"

className="
rounded-full
border
border-[#D4AF37]
bg-[#FFF9E8]
px-8
py-3.5
font-bold
text-[#8B5E00]
transition
hover:bg-[#D4AF37]/20
"

>

Unlock Premium Astrology

</Link>


</div>








<div

className="
mt-10
grid
grid-cols-2
gap-3
sm:grid-cols-4
"

>


{

FEATURES.map((item)=>(


<div

key={item.title}

className="
rounded-2xl
border
border-[#D4AF37]/30
bg-[#FFF9E8]/80
p-4
backdrop-blur
"

>


<item.icon

size={18}

className="
text-[#8B5E00]
"

/>



<p

className="
mt-3
text-sm
font-bold
text-[#3B2600]
"

>

{item.title}

</p>



<p

className="
mt-1
text-xs
text-[#6B4A16]
"

>

{item.text}

</p>


</div>


))


}


</div>






</motion.div>








{/* VISUAL */}

<div>

<AstroHeroVisual />

</div>







</div>





</section>


);


}