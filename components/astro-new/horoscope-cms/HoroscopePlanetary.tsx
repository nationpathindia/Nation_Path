"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// PLANETARY SIGNALS EXPERIENCE
//
// PREMIUM CELESTIAL SKY
//
// CMS ONLY
// NO ENGINE
// NO CALCULATION
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";

import {
  Sparkles,
  Orbit,
  Star,
} from "lucide-react";




interface PlanetItem {

  name:string;

  title?:string;

  message?:string;

  strength?:string;

}




interface Props {

  planets:PlanetItem[];

}







export default function HoroscopePlanetary({

planets

}:Props){



const featured = planets?.[0];

const secondary = planets?.slice(1,4);



if(!planets?.length) return null;




return (

<section

className="
relative
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





{/* HEADER */}


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

size={17}

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
text-[#8B5E00]
"

>

Planetary Signals

</p>



<h2

className="
mt-1
font-serif
text-2xl
font-bold
text-[#3B2600]
sm:text-3xl
"

>

Celestial Influence

</h2>


</div>


</motion.div>









{/* FEATURE PLANET */}



{

featured &&


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

duration:.6

}}

className="
relative
mt-6
overflow-hidden
rounded-[34px]
border
border-[#D4AFG37]/30
bg-[#3B2600]
p-6
shadow-[0_30px_80px_rgba(59,38,0,.25)]
sm:p-8
"

>


<motion.div

animate={{

x:[

"-80%",

"120%"

]

}}

transition={{

duration:10,

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
right-[-70px]
top-[-70px]
h-56
w-56
rounded-full
border
border-[#D4AF37]/20
"

 />






<div

className="
relative
flex
flex-col
gap-5
sm:flex-row
"

>



<div

className="
flex
h-16
w-16
items-center
justify-center
rounded-3xl
border
border-[#D4AF37]/40
bg-[#D4AF37]/10
"

>


<Orbit

size={32}

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
tracking-[0.35em]
text-[#D4AF37]
"

>

Dominant Planet

</p>




<h3

className="
mt-2
font-serif
text-3xl
font-bold
text-[#FFF4D6]
"

>

{featured.name}

</h3>





{

featured.title &&


<p

className="
mt-2
text-sm
font-semibold
text-[#D4AF37]
"

>

{featured.title}

</p>


}




<p

className="
mt-4
text-sm
leading-7
text-[#FFF4D6]
sm:text-base
"

>

{

featured.message ||

"Planetary energy is shaping today's cosmic rhythm."

}

</p>



</div>



</div>



</motion.div>


}









{/* SECONDARY PLANETS */}



<div

className="
mt-5
grid
gap-4
sm:grid-cols-3
"

>


{

secondary?.map((planet,index)=>(


<motion.div

key={index}

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

duration:.5,

delay:index*.1

}}

whileHover={{

y:-5

}}

className="
relative
overflow-hidden
rounded-[24px]
border
border-[#D4AF37]/25
bg-[#FFF9E8]
p-5
shadow-[0_15px_40px_rgba(59,38,0,.08)]
"

>



<div

className="
absolute
right-[-25px]
top-[-25px]
h-20
w-20
rounded-full
bg-[#D4AF37]/20
blur-2xl
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
h-9
w-9
items-center
justify-center
rounded-full
border
border-[#D4AF37]/40
bg-[#F8E7B0]
"

>


<Star

size={15}

className="
text-[#8B5E00]
"

/>


</div>



<p

className="
text-[11px]
font-bold
uppercase
tracking-[0.25em]
text-[#8B5E00]
"

>

{planet.name}

</p>



</div>







{

planet.title &&


<p

className="
mt-4
font-serif
font-bold
text-[#3B2600]
"

>

{planet.title}

</p>


}





<p

className="
mt-3
text-sm
leading-6
text-[#6B4A16]
"

>

{

planet.message ||

"Cosmic influence active."

}


</p>







{

planet.strength &&


<p

className="
mt-4
inline-block
rounded-full
border
border-[#D4AF37]/30
bg-[#F8E7B0]
px-3
py-1
text-[9px]
font-bold
uppercase
tracking-widest
text-[#8B5E00]
"

>

Strength: {planet.strength}

</p>


}





</div>



</motion.div>


))


}


</div>








{/* FOOTER */}



<div

className="
mt-8
flex
items-center
gap-4
"

>


<div

className="
h-px
flex-1
bg-[#D4AF37]/30
"

/>



<div

className="
flex
items-center
gap-2
"

>

<Orbit

size={12}

className="
text-[#8B5E00]
"

/>



<p

className="
text-[9px]
uppercase
tracking-[0.4em]
text-[#8B5E00]
"

>

Vedic Planetary Intelligence

</p>


</div>




<div

className="
h-px
flex-1
bg-[#D4AF37]/30
"

/>


</div>






</div>


</section>


);


}