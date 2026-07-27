"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// FORTUNE SIGNATURE EXPERIENCE
//
// PREMIUM VEDIC COSMIC COMPASS
//
// CMS ONLY
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";

import {
  Sparkles,
  Compass,
  Gem,
  Clock3,
  Hash
} from "lucide-react";


import type {
  CmsHoroscopeLucky
} from "./types";





interface Props {

  lucky:CmsHoroscopeLucky;

}





export default function HoroscopeLucky({

lucky

}:Props){



if(!lucky) return null;



return (

<section

className="
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
overflow-hidden
rounded-[30px]
border
border-[#D4AF37]/35
bg-[#FFF9E8]
p-5
shadow-[0_22px_65px_rgba(139,94,0,.10)]
sm:p-7
"

>






{/* GOLD COSMIC GLOW */}



<div

className="
absolute
right-[-90px]
top-[-90px]
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
"

>







{/* HEADER */}



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
rounded-xl
border
border-[#D4AF37]/40
bg-[#EFE0BC]
"

>


<Sparkles

size={15}

className="
text-[#8B5E00]
"

/>


</div>






<div>


<p

className="
text-[10px]
font-bold
uppercase
tracking-[0.4em]
text-[#8B5E00]
"

>

Fortune Signature

</p>




<h2

className="
mt-1
font-serif
text-xl
font-bold
text-[#3B2600]
sm:text-3xl
"

>

Your Cosmic Alignment

</h2>



</div>



</div>









{/* FORTUNE GRID */}



<div

className="
mt-6
grid
items-center
gap-6
md:grid-cols-[170px_1fr]
"

>









{/* NUMBER CHAMBER */}



<motion.div

animate={{

scale:[1,1.03,1]

}}

transition={{

duration:5,

repeat:Infinity,

ease:"easeInOut"

}}

className="
relative
mx-auto
flex
h-32
w-32
items-center
justify-center
rounded-full
border
border-[#D4AF37]/50
bg-[#3B2600]
shadow-[0_20px_55px_rgba(59,38,0,.25)]
sm:h-36
sm:w-36
"

>



<div

className="
absolute
inset-3
rounded-full
border
border-[#D4AF37]/25
"

/>






<div

className="
relative
text-center
"

>


<Hash

size={17}

className="
mx-auto
text-[#D4AF37]
"

/>



<p

className="
mt-1
text-[9px]
uppercase
tracking-[0.35em]
text-[#D4AF37]
"

>

Lucky

</p>




<p

className="
mt-1
font-serif
text-4xl
font-bold
text-[#FFF9E8]
sm:text-5xl
"

>

{lucky.number}

</p>




</div>




</motion.div>









{/* SIGNAL CARDS */}



<div

className="
grid
gap-3
sm:grid-cols-3
"

>





{

lucky.color &&

<FortuneSignal

icon={<Gem size={17}/>}

title="Energy Color"

value={lucky.color}

/>

}





{

lucky.direction &&

<FortuneSignal

icon={<Compass size={17}/>}

title="Direction"

value={lucky.direction}

/>

}





{

lucky.time &&

<FortuneSignal

icon={<Clock3 size={17}/>}

title="Power Window"

value={lucky.time}

/>

}




</div>







</div>









{/* FOOTER */}



<div

className="
mt-6
flex
items-center
gap-3
"

>


<div

className="
h-px
flex-1
bg-[#D4AF37]/25
"

/>





<p

className="
text-center
text-[9px]
uppercase
tracking-[0.4em]
text-[#8B5E00]
"

>

Vedic Fortune Mapping

</p>





<div

className="
h-px
flex-1
bg-[#D4AF37]/25
"

/>



</div>






</div>







</motion.div>





</div>



</section>


);

}









function FortuneSignal({

icon,

title,

value

}:{

icon:React.ReactNode;

title:string;

value:string;

}){



return (

<motion.div

whileHover={{

y:-4

}}

transition={{

type:"spring",

stiffness:220

}}

className="
rounded-[20px]
border
border-[#D4AF37]/25
bg-[#F8F1DE]
p-3
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
shrink-0
items-center
justify-center
rounded-xl
border
border-[#D4AF37]/30
bg-[#FFF9E8]
text-[#8B5E00]
"

>


{icon}


</div>







<div>


<p

className="
text-[9px]
font-bold
uppercase
tracking-[0.25em]
text-[#8B5E00]
"

>

{title}

</p>





<p

className="
mt-1
font-serif
text-base
font-bold
text-[#3B2600]
sm:text-lg
"

>

{value}

</p>




</div>






</div>





</motion.div>

);


}