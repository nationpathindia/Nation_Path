"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// LIFE INTELLIGENCE EXPERIENCE
//
// PREMIUM VEDIC LIFE BLUEPRINT
//
// CMS ONLY
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";

import {
  BriefcaseBusiness,
  Heart,
  Wallet,
  Leaf,
  Sparkles,
} from "lucide-react";


import type {
  CmsHoroscopeLife
} from "./types";




interface Props {

life:CmsHoroscopeLife;

}






export default function HoroscopeLifeCards({

life

}:Props){



return (


<section

className="
relative
overflow-hidden
px-4
py-7
sm:px-8
lg:px-16
"

>



{/* AMBIENT ENERGY */}


<div

className="
pointer-events-none
absolute
left-1/2
top-0
h-72
w-72
-translate-x-1/2
rounded-full
bg-[#D4AF37]/10
blur-[140px]
"

/>






<motion.div

animate={{

x:[

"-40%",

"120%"

]

}}

transition={{

duration:12,

repeat:Infinity,

ease:"linear"

}}

className="
pointer-events-none
absolute
top-0
left-0
h-[2px]
w-[45%]
bg-gradient-to-r
from-transparent
via-[#D4AF37]
to-transparent
opacity-60
"

/>







<div

className="
relative
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



transition={{

duration:.6

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

Life Intelligence

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

Your Cosmic Life Blueprint

</h2>



</div>



</motion.div>








{/* LIFE GRID */}



<div

className="
mt-7
grid
gap-5
lg:grid-cols-2
"

>






{/* CAREER */}



<LifeCard


icon={
<BriefcaseBusiness size={20}/>
}



title="Career Path"



text={life?.career}



hero

/>







<div

className="
grid
gap-5
"

>



<LifeCard


icon={
<Heart size={18}/>
}



title="Love Energy"



text={life?.love}



/>







<LifeCard


icon={
<Wallet size={18}/>
}



title="Financial Flow"



text={life?.finance}



/>



</div>






</div>








{/* HEALTH */}



<div className="mt-5">


<LifeCard


icon={
<Leaf size={18}/>
}



title="Health Rhythm"



text={life?.health}



wide

/>


</div>







</div>


</section>


);


}
function LifeCard({

icon,

title,

text,

hero,

wide

}:{

icon:React.ReactNode;

title:string;

text?:string;

hero?:boolean;

wide?:boolean;

}){



return (


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



whileHover={{

y:-6

}}



className={`

group

relative

overflow-hidden

rounded-[30px]

border

border-[#D4AF37]/35

bg-gradient-to-br

from-[#3B2600]

via-[#2B190B]

to-[#160D08]

p-5

shadow-[0_25px_80px_rgba(59,38,0,.25)]

transition-all

duration-500



${hero ? "min-h-[260px] sm:p-8" : ""}

${wide ? "sm:p-7" : ""}

`}



>







{/* MOVING GOLD LINE */}


<motion.div


animate={{

x:[

"-60%",

"120%"

]

}}



transition={{

duration:8,

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
opacity-80
"






/>








{/* GOLD ORBIT */}


<motion.div


animate={{

rotate:360

}}



transition={{

duration:45,

repeat:Infinity,

ease:"linear"

}}



className="
absolute
right-[-45px]
top-[-45px]
h-44
w-44
rounded-full
border
border-[#D4AF37]/20
"




/>







<div

className="
absolute
right-[-60px]
top-[-60px]
h-44
w-44
rounded-full
bg-[#D4AF37]/20
blur-3xl
"

/>







<div

className="
absolute
bottom-[-40px]
left-[-40px]
h-32
w-32
rounded-full
bg-[#7A1F1F]/30
blur-3xl
"

/>









<div

className="
relative
z-10
"

>






{/* TITLE AREA */}



<div

className="
flex
items-center
gap-4
"

>



<div

className="
flex
h-12
w-12
items-center
justify-center
rounded-2xl
border
border-[#D4AF37]/40
bg-[#D4AF37]/10
text-[#D4AF37]
shadow-[0_0_30px_rgba(212,175,55,.18)]
transition-transform
duration-500
group-hover:scale-110
"

>


{icon}


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

{title}

</p>



<p

className="
mt-1
text-[9px]
uppercase
tracking-widest
text-[#FFF9E8]/50
"

>

Vedic Intelligence

</p>



</div>




</div>









{/* CONTENT */}



<p

className={`

mt-6

leading-8

text-[#FFF4D6]

${

hero

?

"text-lg sm:text-xl"

:

"text-sm sm:text-base"

}

`}

>

{

text ||

"Cosmic influence is being aligned."

}


</p>








{/* FOOTER GLOW */}



<div

className="
mt-6
h-px
w-full
bg-gradient-to-r
from-[#D4AF37]/40
via-transparent
to-transparent
"

 />





</div>





</motion.div>



);

}