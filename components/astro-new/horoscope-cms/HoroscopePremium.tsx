"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// PREMIUM ASTRO STUDIO GATEWAY
//
// PERSONAL COSMIC IDENTITY EXPERIENCE
//
// CMS ONLY
// NO ENGINE
// NO CALCULATION
//////////////////////////////////////////////////////////////

import {
  Sparkles,
  Crown,
  ArrowRight,
  Orbit,
  ScrollText,
  Gem,
  Star
} from "lucide-react";

import { motion } from "framer-motion";

import type {
  CmsHoroscopePremium
} from "./types";



interface Props {

  premium: CmsHoroscopePremium;

}





export default function HoroscopePremium({

  premium

}: Props) {



if(!premium){

  return null;

}



return (

<section

className="
px-5
py-10
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



<motion.div

initial={{
opacity:0,
y:25
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
overflow-hidden
rounded-[38px]
border
border-[#D4AF37]/40
bg-[#F8F1DE]
p-6
shadow-[0_30px_90px_rgba(139,94,0,.15)]
sm:p-10
"

>





{/* GOLD ATMOSPHERE */}



<motion.div

animate={{
scale:[1,1.15,1]
}}

transition={{
duration:6,
repeat:Infinity
}}

className="
absolute
right-[-100px]
top-[-100px]
h-96
w-96
rounded-full
bg-[#D4AF37]/20
blur-[140px]
"

/>





<div

className="
absolute
right-10
top-8
font-serif
text-[160px]
text-[#D4AF37]/10
"

>

☉

</div>








<div

className="
relative
grid
items-center
gap-8
lg:grid-cols-[1fr_420px]
"

>









{/* LEFT CONTENT */}





<div>


<div

className="
flex
items-center
gap-3
"

>


<Crown

size={18}

className="
text-[#8B5E00]
"

/>



<p

className="
text-[10px]
font-bold
uppercase
tracking-[0.45em]
text-[#8B5E00]
"

>

NationPath Astro Premium

</p>


</div>







<h2

className="
mt-5
font-serif
text-3xl
font-bold
leading-tight
text-[#3B2600]
sm:text-5xl
"

>

Unlock Your
Personal Cosmos

</h2>







<p

className="
mt-4
max-w-xl
leading-7
text-[#6B4A16]
"

>

Your birth details create a unique cosmic
identity. Unlock personalized Birth Charts,
Kundali insights and deeper Astro Intelligence.

</p>







<div

className="
mt-7
flex
flex-wrap
gap-3
"

>


<FeatureTag

icon={<Orbit size={14}/>}

text="Birth Chart"

/>


<FeatureTag

icon={<ScrollText size={14}/>}

text="Kundali"

/>


<FeatureTag

icon={<Gem size={14}/>}

text="AI Reports"

/>



</div>







<motion.button

whileHover={{
scale:1.04
}}

whileTap={{
scale:.96
}}

className="
mt-8
flex
items-center
gap-3
rounded-full
bg-[#3B2600]
px-6
py-3
text-sm
font-semibold
text-[#F8E7B0]
shadow-[0_15px_40px_rgba(59,38,0,.25)]
"

>


Explore Premium

<ArrowRight size={17}/>


</motion.button>



</div>









{/* COSMIC PORTAL */}





<CosmicChartPreview />








</div>






</motion.div>



</div>



</section>

);

}









//////////////////////////////////////////////////////////////
//
// COSMIC BIRTH PORTAL
//
//////////////////////////////////////////////////////////////


function CosmicChartPreview(){



const planets = [

"Mars",

"Jupiter",

"Saturn",

"Moon"

];



return (

<div

className="
relative
flex
h-[360px]
items-center
justify-center
"

>





{/* OUTER ZODIAC ORBIT */}



<motion.div

animate={{
rotate:360
}}

transition={{
duration:35,
repeat:Infinity,
ease:"linear"
}}

className="
absolute
h-72
w-72
rounded-full
border
border-dashed
border-[#D4AF37]/40
"

/>







{/* INNER ORBIT */}



<motion.div

animate={{
rotate:-360
}}

transition={{
duration:20,
repeat:Infinity,
ease:"linear"
}}

className="
absolute
h-52
w-52
rounded-full
border
border-[#8B5E00]/30
"

/>








{/* PLANET ENERGY */}



{

planets.map((planet,index)=>(


<motion.div

key={planet}

animate={{
y:[0,-12,0]
}}

transition={{
duration:3+index,
repeat:Infinity
}}

className={`
absolute
flex
h-10
w-10
items-center
justify-center
rounded-full
border
border-[#D4AF37]/40
bg-[#FFF9E8]
text-[9px]
font-bold
text-[#8B5E00]
shadow-lg
${
index===0
?"top-6"
:index===1
?"right-10"
:index===2
?"left-10"
:"bottom-8"
}
`}

>

<Star size={12}/>

</motion.div>


))

}










{/* CENTER CORE */}



<motion.div

animate={{
scale:[1,1.05,1]
}}

transition={{
duration:4,
repeat:Infinity
}}

className="
relative
z-10
flex
h-40
w-40
items-center
justify-center
rounded-full
border
border-[#D4AF37]
bg-[#FFF9E8]
shadow-[0_0_80px_rgba(212,175,55,.45)]
"

>





<div

className="
text-center
"

>


<div

className="
mx-auto
flex
h-12
w-12
items-center
justify-center
rounded-full
bg-[#EFE0BC]
"

>

<Orbit

size={24}

className="
text-[#8B5E00]
"

/>


</div>





<p

className="
mt-3
text-[9px]
uppercase
tracking-[0.35em]
text-[#8B5E00]
"

>

Cosmic

</p>




<h3

className="
font-serif
text-xl
font-bold
text-[#3B2600]
"

>

Identity

</h3>



</div>



</motion.div>









{/* FLOATING MODULES */}



<FloatingChip

position="left-0 bottom-24"

text="Birth Chart"

/>



<FloatingChip

position="right-0 top-24"

text="Kundali"

/>



<FloatingChip

position="bottom-4"

text="AI Astro Reports"

/>






</div>

);

}









function FloatingChip({

text,

position

}:{

text:string;

position:string;

}){


return (

<motion.div

animate={{
y:[0,-8,0]
}}

transition={{
duration:4,
repeat:Infinity
}}

className={`
absolute
${position}
rounded-full
border
border-[#D4AF37]/30
bg-[#EFE0BC]
px-4
py-2
text-xs
font-semibold
text-[#5B3A12]
shadow-sm
`}

>

✦ {text}

</motion.div>

);

}








function FeatureTag({

icon,

text

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
bg-[#EFE0BC]
px-4
py-2
text-xs
font-semibold
text-[#5B3A12]
"

>

{icon}

{text}

</div>

);

}