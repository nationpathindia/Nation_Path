"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// HOROSCOPE HOME HERO
//
// PREMIUM VEDIC INTELLIGENCE EXPERIENCE
//
// HOMEPAGE ONLY
//
// NO ENGINE
// NO AI
// NO CALCULATION
//////////////////////////////////////////////////////////////

import Image from "next/image";
import { useState } from "react";

import { motion } from "framer-motion";

import {
  Sparkles,
  ArrowRight,
  Star,
  Moon,
  Sun,
} from "lucide-react";

import ZodiacSelectorModal from "./ZodiacSelectorModal";





interface HoroscopeHomeHeroProps {

  zodiac?: string;

  image?: string;

  energy?: number;

  theme?: string;

  highlights?: string[];

}







const zodiacImages = [

"/zodiac/aries.png",
"/zodiac/taurus.png",
"/zodiac/gemini.png",
"/zodiac/cancer.png",
"/zodiac/leo.png",
"/zodiac/virgo.png",
"/zodiac/libra.png",
"/zodiac/scorpio.png",
"/zodiac/sagittarius.png",
"/zodiac/capricorn.png",
"/zodiac/aquarius.png",
"/zodiac/pisces.png",

];








export default function HoroscopeHomeHero({

  zodiac,

  image,

  energy,

  theme,

  highlights,

}: HoroscopeHomeHeroProps){



const [openSelector,setOpenSelector] =
useState(false);




return (

<section

className="
relative
overflow-hidden
bg-[#FFF9E8]
px-4
py-12
sm:px-8
sm:py-16
lg:px-16
"

>



{/* AMBIENT LIGHT */}


<div

aria-hidden

className="
absolute
left-1/2
top-[-180px]
h-[520px]
w-[520px]
-translate-x-1/2
rounded-full
bg-[#D4AF37]/15
blur-[160px]
"

/>



<div

aria-hidden

className="
absolute
right-[-120px]
top-20
h-[320px]
w-[320px]
rounded-full
bg-[#7A1F1F]/10
blur-[140px]
"

/>







<div

className="
relative
mx-auto
max-w-7xl
"

>


<div

className="
grid
items-center
gap-10
lg:grid-cols-2
"

>




{/* LEFT */}


<motion.div

initial={{
opacity:0,
x:-20
}}

animate={{
opacity:1,
x:0
}}

transition={{
duration:.6
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
bg-[#D4AF37]/10
px-4
py-2
text-[10px]
font-bold
uppercase
tracking-[0.3em]
text-[#8B5E00]
"

>


<Sparkles size={13}/>

Vedic Intelligence

</div>








<h1

className="
mt-6
font-serif
text-4xl
font-bold
leading-tight
text-[#3B2600]
sm:text-5xl
lg:text-6xl
"

>

Your Daily

<br/>

Horoscope Journey

</h1>







<p

className="
mt-5
max-w-xl
text-sm
leading-7
text-[#6B4A16]
sm:text-base
"

>

Explore authentic Vedic astrology,
daily horoscope guidance,
zodiac wisdom and planetary insights
through NationPath Astro.

</p>








<div

className="
mt-7
flex
flex-wrap
gap-3
"

>


<FeatureChip

icon={<Star size={13}/>}

text={
highlights?.[0]
||
"12 Zodiac Signs"
}

/>



<FeatureChip

icon={<Moon size={13}/>}

text={
highlights?.[1]
||
"Daily Horoscope"
}

/>



<FeatureChip

icon={<Sun size={13}/>}

text={
highlights?.[2]
||
"Planetary Wisdom"
}

/>



</div>








<button

onClick={()=>setOpenSelector(true)}

className="
mt-8
flex
items-center
gap-3
rounded-full
bg-[#7A1F1F]
px-6
py-3
text-sm
font-bold
text-[#FFF9E8]
shadow-xl
shadow-[#7A1F1F]/20
transition
hover:-translate-y-1
"

>

Explore Horoscope

<ArrowRight size={15}/>

</button>




</motion.div>









{/* RIGHT ORB */}


<motion.div

initial={{
opacity:0,
scale:.95
}}

animate={{
opacity:1,
scale:1
}}

transition={{
duration:.8
}}

className="
flex
justify-center
"

>


<div

className="
relative
h-[280px]
w-[280px]
sm:h-[340px]
sm:w-[340px]
"

>





{/* ROTATING RING */}


<motion.div

animate={{
rotate:360
}}

transition={{

duration:180,

repeat:Infinity,

ease:"linear"

}}

className="
absolute
inset-0
rounded-full
border
border-[#D4AF37]/35
"

/>










{zodiacImages.map((item,index)=>(


<div

key={item}

className="
absolute
left-1/2
top-1/2
"

>


<div

style={{

transform:
`translate(-50%,-50%) rotate(${index*30}deg) translateY(-135px)`

}}

className="
h-8
w-8
rounded-full
border
border-[#D4AF37]/30
bg-[#FFF9E8]
p-1
shadow-md
"

>


<Image

src={item}

alt="zodiac sign"

width={28}

height={28}

priority={index<3}

className="
object-contain
"

/>


</div>


</div>


))}








<div

className="
absolute
left-1/2
top-1/2
h-52
w-52
-translate-x-1/2
-translate-y-1/2
rounded-full
bg-[#D4AF37]/20
blur-3xl
"

/>









<div

className="
absolute
left-1/2
top-1/2
flex
h-44
w-44
-translate-x-1/2
-translate-y-1/2
flex-col
items-center
justify-center
rounded-full
border
border-[#D4AF37]/60
bg-gradient-to-br
from-[#FFF9E8]
via-[#D4AF37]/60
to-[#8B5E00]
shadow-[0_25px_80px_rgba(212,175,55,.35)]
sm:h-52
sm:w-52
"

>


<Sparkles

size={30}

className="text-[#7A1F1F]"

/>


<p

className="
mt-3
text-center
font-serif
text-lg
font-bold
text-[#3B2600]
"

>

Vedic

<br/>

Horoscope

</p>



<p

className="
mt-2
text-[10px]
font-bold
uppercase
tracking-[0.35em]
text-[#7A1F1F]
"

>

Intelligence

</p>




</div>




</div>


</motion.div>




</div>

</div>








<ZodiacSelectorModal

open={openSelector}

onClose={()=>setOpenSelector(false)}

/>



</section>

);


}









function FeatureChip({

icon,

text,

}:{

icon:React.ReactNode;

text:string;

}){


return (

<div

className="
flex
items-center
gap-2
rounded-full
border
border-[#D4AF37]/30
bg-white/70
px-4
py-2
text-xs
font-semibold
text-[#3B2600]
backdrop-blur
"

>


<span className="text-[#8B5E00]">

{icon}

</span>


{text}


</div>

);


}