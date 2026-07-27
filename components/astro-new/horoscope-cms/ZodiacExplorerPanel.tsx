"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// PREMIUM ZODIAC EXPLORER PANEL
//
// CMS ONLY
//
// SOURCE:
// Zodiac Master Mongo
//
// NO ENGINE
// NO CALCULATION
// NO AI
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";

import {
  Sparkles,
  Crown,
  Orbit,
  ChevronRight,
} from "lucide-react";

import { useRouter } from "next/navigation";

import type {
  CmsZodiacItem,
} from "./types";




interface Props {

  zodiac: CmsZodiacItem[];

  active?: string;

  onSelect?: (
    slug:string
  )=>void;

}





export default function ZodiacExplorerPanel({

zodiac,

active,

onSelect,

}:Props){


const router = useRouter();




if(!zodiac?.length){

return null;

}





const normalizedActive =
active
?.toLowerCase()
.replace("rashi","")
.trim();







return (

<section

className="
relative
px-4
py-10
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
flex
items-center
justify-between
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
rounded-full
border
border-[#D4AF37]/40
bg-[#D4AF37]/10
"

>

<Sparkles

size={20}

className="
text-[#D4AF37]
"

/>

</div>



<div>

<p

className="
text-[10px]
uppercase
tracking-[0.5em]
font-bold
text-[#8B5E00]
"

>

Zodiac Explorer

</p>


<h2

className="
font-serif
text-xl
sm:text-2xl
font-bold
text-[#3B2600]
"

>

Explore Cosmic Identities

</h2>


</div>


</div>



<ChevronRight

className="
text-[#8B5E00]
"

size={22}

/>


</div>







{/* GRID */}

<div

className="
mt-8
grid
grid-cols-2
gap-4
sm:grid-cols-3
lg:grid-cols-6
"

>


{

zodiac.map((item,index)=>{


const slug =
item.slug
?.toLowerCase()
.trim();



const isActive =
normalizedActive === slug;





return (


<motion.button


key={slug}



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

duration:.35,

delay:index*.04

}}



whileHover={{

y:-6

}}



whileTap={{

scale:.96

}}



onClick={()=>{


if(onSelect){

onSelect(slug);

}

else{


router.push(
`/astro/horoscope/${slug}`
);


}


}}



className={`

relative

overflow-hidden

rounded-[28px]

border

p-4

text-center

transition-all

duration-500


${

isActive

?


`

border-[#D4AF37]

bg-gradient-to-br

from-[#3B2600]

to-[#120900]

shadow-[0_0_45px_rgba(212,175,55,0.45)]

`


:


`

border-[#D4AF37]/30

bg-white/70

hover:border-[#D4AF37]

hover:shadow-[0_15px_40px_rgba(212,175,55,.18)]

`

}


`

}

>





{/* STRIPE */}

<div

className={`

absolute

top-0

left-0

h-1

w-full


${

isActive

?

"bg-[#D4AF37]"

:

"bg-[#D4AF37]/40"

}

`}

/>







{/* GOLD GLOW */}

<div

className="

absolute

right-[-30px]

top-[-30px]

h-24

w-24

rounded-full

bg-[#D4AF37]/20

blur-3xl

"

/>







<div

className="
relative
z-10
"

>







{/* SYMBOL IMAGE */}

<div

className={`

mx-auto

flex

h-16

w-16

items-center

justify-center

rounded-2xl

border


${

isActive

?

`

border-[#D4AF37]

bg-[#D4AF37]/20

`

:

`

border-[#D4AF37]/30

bg-[#FFF9E8]

`

}


`

}

>


{

item.image || item.symbol

?


<img

src={

item.image ||

item.symbol

}

alt={

item.name ||

item.zodiac

}

className={`

h-10

w-10

object-contain


${

isActive

?

"brightness-0 invert drop-shadow-[0_0_12px_#D4AF37]"

:

"brightness-75 sepia saturate-[2]"

}


`}

/>


:


<Orbit

size={28}

className={

isActive

?

"text-[#FFF9E8]"

:

"text-[#8B5E00]"

}

/>


}




</div>







{/* NAME */}

<h3

className={`

mt-4

font-serif

font-bold

text-base


${

isActive

?

"text-[#FFF9E8]"

:

"text-[#3B2600]"

}

`

}

>

{

item.name ||

item.zodiac

}


</h3>








{/* PLANET */}

<p

className={`

mt-1

text-[9px]

uppercase

tracking-[0.25em]


${

isActive

?

"text-[#D4AF37]"

:

"text-[#8B5E00]"

}

`

}

>

{

item.planet ||

"Cosmic Energy"

}


</p>







{/* ELEMENT */}

{

item.element &&


<p

className={`

mt-2

text-xs


${

isActive

?

"text-white/70"

:

"text-[#6B4A16]"

}

`

}

>

{item.element}

</p>

}







{

isActive &&


<div

className="
mt-3
flex
justify-center
items-center
gap-1
text-[9px]
uppercase
tracking-widest
text-[#D4AF37]
font-bold
"

>

<Crown size={11}/>

Current Rashi

</div>


}





</div>




</motion.button>


)


})

}


</div>





</div>


</section>


);

}