"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// ZODIAC HOME EXPLORER
//
// MASTER ZODIAC DISCOVERY
//
// CMS READY
//
// NO ENGINE
// NO CALCULATION
//////////////////////////////////////////////////////////////

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";


interface ZodiacItem {

  zodiac?: string;

  slug?: string;

  name?: string;

  image?: string;

  planet?: string;

  element?: string;

}




interface Props {

  zodiacList?: ZodiacItem[];

}



const defaultZodiac: ZodiacItem[] = [

{
name:"Aries",
slug:"aries",
image:"/zodiac/aries.png",
planet:"Mars",
element:"Fire"
},

{
name:"Taurus",
slug:"taurus",
image:"/zodiac/taurus.png",
planet:"Venus",
element:"Earth"
},

{
name:"Gemini",
slug:"gemini",
image:"/zodiac/gemini.png",
planet:"Mercury",
element:"Air"
},

{
name:"Cancer",
slug:"cancer",
image:"/zodiac/cancer.png",
planet:"Moon",
element:"Water"
},

{
name:"Leo",
slug:"leo",
image:"/zodiac/leo.png",
planet:"Sun",
element:"Fire"
},

{
name:"Virgo",
slug:"virgo",
image:"/zodiac/virgo.png",
planet:"Mercury",
element:"Earth"
},

{
name:"Libra",
slug:"libra",
image:"/zodiac/libra.png",
planet:"Venus",
element:"Air"
},

{
name:"Scorpio",
slug:"scorpio",
image:"/zodiac/scorpio.png",
planet:"Mars",
element:"Water"
},

{
name:"Sagittarius",
slug:"sagittarius",
image:"/zodiac/sagittarius.png",
planet:"Jupiter",
element:"Fire"
},

{
name:"Capricorn",
slug:"capricorn",
image:"/zodiac/capricorn.png",
planet:"Saturn",
element:"Earth"
},

{
name:"Aquarius",
slug:"aquarius",
image:"/zodiac/aquarius.png",
planet:"Saturn",
element:"Air"
},

{
name:"Pisces",
slug:"pisces",
image:"/zodiac/pisces.png",
planet:"Jupiter",
element:"Water"
}

];





export default function ZodiacHomeExplorer({

zodiacList = [],

}:Props){



const signs = zodiacList.length
?
zodiacList
:
defaultZodiac;



return (

<section

className="
relative
px-4
py-12
sm:px-8
lg:px-16
"

>


<div

className="
mx-auto
max-w-7xl
"

>



{/* HEADER */}

<div

className="
mb-8
"

>


<div

className="
flex
items-center
gap-2
text-xs
font-bold
uppercase
tracking-[0.35em]
text-[#8B5E00]
"

>

<Sparkles size={15}/>

Zodiac Intelligence

</div>




<h2

className="
mt-3
font-serif
text-3xl
font-bold
text-[#3B2600]
sm:text-4xl
"

>

Explore All Rashis

</h2>




<p

className="
mt-3
max-w-2xl
text-sm
leading-7
text-[#6B4A16]
"

>

Discover your Vedic zodiac identity
and explore complete horoscope intelligence.

</p>


</div>








{/* GRID */}


<div

className="
grid
grid-cols-2
gap-4
sm:grid-cols-3
lg:grid-cols-6
"

>


{signs.map((item,index)=>(


<motion.div

key={item.slug || index}

whileHover={{

y:-5

}}

className="
group
relative
overflow-hidden
rounded-[28px]
border
border-[#D4AF37]/30
bg-white/70
p-4
text-center
shadow-md
backdrop-blur
"

>



<div

className="
absolute
inset-0
bg-[radial-gradient(circle_at_center,rgba(212,175,55,.18),transparent_65%)]
opacity-0
transition
group-hover:opacity-100
"

/>





<div

className="
relative
"

>


<div

className="
mx-auto
flex
h-16
w-16
items-center
justify-center
rounded-full
border
border-[#D4AF37]/50
bg-gradient-to-br
from-[#7A1F1F]
via-[#5B1515]
to-[#3B2600]
shadow-[0_0_30px_rgba(212,175,55,.25)]
"

>


<Image

src={item.image || "/zodiac/aries.png"}

alt={item.name || "zodiac"}

width={52}

height={52}

className="
object-contain
brightness-0
invert
opacity-90
"

/>


</div>





<h3

className="
mt-4
font-serif
text-base
font-bold
text-[#3B2600]
"

>

{item.name || item.zodiac}

</h3>




<p

className="
mt-1
text-[10px]
uppercase
tracking-[0.3em]
text-[#8B5E00]
"

>

{item.element}

</p>




<p

className="
mt-2
text-xs
font-semibold
text-[#7A1F1F]
"

>

{item.planet}

</p>



</div>



</motion.div>


))}


</div>



</div>


</section>

);

}