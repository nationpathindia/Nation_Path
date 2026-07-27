"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO ZODIAC CARD
//
// Premium Vedic Zodiac Entry Card
//
// Features:
// - Zodiac Artwork
// - Horoscope Link
// - Luxury Gold Styling
// - Subtle Motion
//////////////////////////////////////////////////////////////

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";


interface ZodiacCardProps {

  sign:string;

  symbol?:string;

  image?:string;

}



export default function ZodiacCard({

  sign,

  symbol,

  image,

}:ZodiacCardProps){



return (

<motion.div

whileHover={{
  y:-8
}}

whileTap={{
  scale:0.97
}}

transition={{
  duration:0.3
}}

className="h-full"

>


<Link

href={`/astrology/horoscope/${sign.toLowerCase()}`}

className="
group
relative
flex
h-full
flex-col
items-center
overflow-hidden
rounded-3xl
border
border-[#D4AF37]/40
bg-gradient-to-b
from-[#FFF9E8]
to-[#F8F1DE]
p-4
text-center
shadow-[0_8px_25px_rgba(139,94,0,0.06)]
transition-all
duration-500
hover:border-[#D4AF37]
hover:shadow-[0_20px_45px_rgba(139,94,0,0.18)]
"

>


{/* PREMIUM INNER BORDER */}

<div

className="
pointer-events-none
absolute
inset-[6px]
rounded-2xl
border
border-[#D4AF37]/10
"

/>





{/* GOLD LIGHT EFFECT */}


<div

className="
pointer-events-none
absolute
inset-0
bg-gradient-to-br
from-[#D4AF37]/20
via-transparent
to-transparent
opacity-0
transition
duration-700
group-hover:opacity-100
"

/>





{/* ZODIAC ARTWORK */}


<div

className="
relative
mt-2
flex
h-20
w-20
items-center
justify-center
rounded-full
border
border-[#D4AF37]/60
bg-[#F8F1DE]
shadow-[0_0_25px_rgba(212,175,55,0.25)]
"

>


<div

className="
absolute
inset-1
rounded-full
border
border-[#D4AF37]/20
"

/>



{

image ? (

<Image

src={image}

alt={`${sign} zodiac symbol`}

fill

sizes="80px"

className="
object-contain
p-3
transition
duration-700
group-hover:scale-110
"

priority={false}

/>

)

:(

<span

className="
text-3xl
text-[#8B5E00]
"

>

{symbol}

</span>

)

}



</div>






{/* NAME */}


<h3

className="
relative
mt-5
font-serif
text-base
font-bold
capitalize
text-[#3B2600]
"

>

{sign}

</h3>






{/* CATEGORY */}


<p

className="
mt-2
text-[10px]
font-semibold
uppercase
tracking-[0.3em]
text-[#8B5E00]
"

>

Daily Horoscope

</p>






{/* GOLD DIVIDER */}


<div

className="
mt-4
h-px
w-8
bg-[#D4AF37]/60
transition-all
duration-500
group-hover:w-14
"

/>






</Link>


</motion.div>

);


}