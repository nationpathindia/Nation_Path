"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// COSMIC INTELLIGENCE CHAMBER
//
// PREMIUM VEDIC ENERGY BLUEPRINT
//
// CMS ONLY
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";

import {
  Sparkles,
  Flame,
  Compass,
  Shield,
  Sun,
} from "lucide-react";


import type {
  CmsHoroscopeInsights
} from "./types";



interface Props {

insights:CmsHoroscopeInsights;

}







export default function HoroscopeIntelligencePanel({

insights

}:Props){



return (


<section

className="
relative
px-4
py-7
sm:px-8
lg:px-16
overflow-hidden
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
shadow-[0_0_25px_rgba(212,175,55,.2)]
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

Astro Intelligence

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

Cosmic Energy Blueprint

</h2>


</div>



</motion.div>









{/* MAIN ENERGY CORE */}



<motion.div


initial={{
opacity:0,
scale:.98
}}


whileInView={{
opacity:1,
scale:1
}}


viewport={{
once:true
}}


transition={{
duration:.7
}}



className="
group
relative
mt-6
overflow-hidden
rounded-[34px]
border
border-[#D4AF37]/35
bg-gradient-to-br
from-[#3B2600]
via-[#24140B]
to-[#120B06]
p-5
shadow-[0_30px_90px_rgba(59,38,0,.25)]
sm:p-8
"

>



{/* MOVING GOLD RAY */}


<motion.div

animate={{

x:[
"-80%",
"140%"
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
w-[50%]
bg-gradient-to-r
from-transparent
via-[#D4AF37]
to-transparent
opacity-80
"

/>






{/* ORBIT */}



<motion.div

animate={{

rotate:360

}}

transition={{

duration:50,

repeat:Infinity,

ease:"linear"

}}

className="
absolute
right-[-80px]
top-[-80px]
h-64
w-64
rounded-full
border
border-[#D4AF37]/20
"

 />





<div

className="
absolute
right-[-100px]
top-[-100px]
h-72
w-72
rounded-full
bg-[#D4AF37]/20
blur-[120px]
"

/>






<div

className="
relative
flex
items-start
gap-5
"

>



<div

className="
flex
h-14
w-14
shrink-0
items-center
justify-center
rounded-2xl
border
border-[#D4AF37]/40
bg-[#D4AF37]/10
"

>

<Flame

size={24}

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
tracking-[0.35em]
text-[#D4AF37]
"

>

Planetary Influence

</p>




<p

className="
mt-4
text-sm
leading-7
text-[#FFF4D6]
sm:text-lg
"

>

{

insights.planetaryInfluence ||

"Cosmic forces are shaping your current journey."

}


</p>


</div>



</div>







{/* ENERGY FOOT LINE */}


<div

className="
relative
mt-7
h-px
bg-gradient-to-r
from-transparent
via-[#D4AF37]/50
to-transparent
"

/>




</motion.div>









{/* SIGNALS */}



<div

className="
mt-5
grid
gap-4
sm:grid-cols-3
"

>



<SignalBox

icon={<Sun size={17}/>}

title="Energy"

text={insights.energy}

/>



<SignalBox

icon={<Compass size={17}/>}

title="Guidance"

text={insights.guidance}

/>



<SignalBox

icon={<Shield size={17}/>}

title="Balance"

text={insights.remedy}

/>



</div>







</div>


</section>


);

}









function SignalBox({

icon,

title,

text

}:{

icon:React.ReactNode;

title:string;

text?:string;

}){


return (


<motion.div


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
p-4
shadow-[0_15px_40px_rgba(59,38,0,.08)]
"


>


<div

className="
absolute
right-[-20px]
top-[-20px]
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
flex
items-center
gap-3
"

>


<div

className="
text-[#8B5E00]
"

>

{icon}

</div>




<p

className="
text-[10px]
font-bold
uppercase
tracking-[0.3em]
text-[#8B5E00]
"

>

{title}

</p>



</div>






<p

className="
relative
mt-3
text-sm
leading-6
text-[#5B3A12]
"

>

{

text ||

"Aligned with your cosmic rhythm."

}


</p>



</motion.div>


);

}