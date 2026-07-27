"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// LAGNA INTELLIGENCE EXPERIENCE
//
// ASCENDANT REVELATION CHAMBER
//
// Layout:
//
// 1. Chart Chamber
// 2. Identity Manuscript
// 3. Cosmic Signature
//
// Future:
// Dynamic Lagna SVG + API Integration
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import {
  Sun,
  Crown,
  Sparkles,
  ScrollText,
  Compass,
  Flame,
  Orbit,
} from "lucide-react";

import type { LagnaProfile } from "../types";



interface LagnaRevealProps {

  profile: LagnaProfile;

}





export default function LagnaReveal({

  profile,

}: LagnaRevealProps) {



if (!profile) return null;



return (

<section

className="
relative
overflow-hidden
bg-[#120C08]
px-5
py-10
sm:px-8
lg:px-12
"

>





{/* AMBIENT GOLD */}

<div

className="
pointer-events-none
absolute
left-1/2
top-[-220px]
h-[420px]
w-[420px]
-translate-x-1/2
rounded-full
bg-[#D4AF37]/15
blur-[130px]
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



<div

className="
mb-7
text-center
"

>


<p

className="
text-[10px]
uppercase
tracking-[0.5em]
text-[#D4AF37]
"

>

Ascendant Revelation

</p>


<h2

className="
mt-3
text-2xl
font-semibold
text-[#FFF9E8]
sm:text-3xl
"

>

Your Rising Identity

</h2>



</div>









{/* THREE CHAMBERS */}



<div

className="
grid
gap-4
lg:grid-cols-3
"

>









{/* CHART CHAMBER */}



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

className="
relative
flex
min-h-[270px]
items-center
justify-center
border
border-[#D4AF37]/25
bg-[#1B120A]
"

>



<div

className="
absolute
inset-3
border
border-[#D4AF37]/10
"

/>





<div

className="
relative
text-center
"

>



<div

className="
mx-auto
flex
h-14
w-14
items-center
justify-center
rounded-full
border
border-[#D4AF37]/40
bg-[#120C08]
"

>


<Compass

size={24}

className="
text-[#D4AF37]
"

/>



</div>





<p

className="
mt-5
text-[10px]
uppercase
tracking-[0.35em]
text-[#D4AF37]
"

>

Chart Chamber

</p>




<p

className="
mt-2
px-5
text-xs
leading-6
text-[#D8C59A]
"

>

Future Lagna SVG and planetary map.

</p>





</div>






</motion.div>













{/* IDENTITY PANEL */}



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

delay:.1

}}

className="
border
border-[#D4AF37]/30
bg-[#F8F1DE]
p-5
"

>






<div

className="
flex
items-center
gap-2
text-[#8B5E00]
"

>

<Sun size={17}/>


<span

className="
text-[10px]
uppercase
tracking-[0.35em]
"

>

Ascendant

</span>


</div>








<h3

className="
mt-5
text-3xl
font-semibold
text-[#3B2600]
"

>

{profile.ascendant}

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

Rising Sign

</p>







<div

className="
mt-5
border-t
border-[#D4AF37]/30
pt-5
"

>


<p

className="
text-sm
leading-7
text-[#5A3908]
"

>

{profile.identity}

</p>



</div>





</motion.div>













{/* COSMIC SIGNATURE */}



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

delay:.2

}}

className="
border
border-[#D4AF37]/25
bg-[#1B120A]
p-5
"

>





<div

className="
flex
items-center
gap-2
text-[#D4AF37]
"

>


<Sparkles size={17}/>



<span

className="
text-[10px]
uppercase
tracking-[0.35em]
"

>

Cosmic Signature

</span>


</div>









<div

className="
mt-6
space-y-4
"

>






<div

className="
flex
items-center
gap-3
border-b
border-[#D4AF37]/15
pb-3
"

>


<Crown

size={18}

className="
text-[#D4AF37]
"

/>


<div>

<p

className="
text-[10px]
uppercase
text-[#D4AF37]
"

>

Ruling Planet

</p>


<p

className="
text-sm
text-[#FFF9E8]
"

>

{profile.rulingPlanet}

</p>


</div>


</div>









<div

className="
flex
items-center
gap-3
border-b
border-[#D4AF37]/15
pb-3
"

>


<Flame

size={18}

className="
text-[#D4AF37]
"

/>


<div>

<p

className="
text-[10px]
uppercase
text-[#D4AF37]
"

>

Element

</p>


<p

className="
text-sm
text-[#FFF9E8]
"

>

{profile.element}

</p>


</div>


</div>









<div

className="
flex
items-center
gap-3
"

>


<Orbit

size={18}

className="
text-[#D4AF37]
"

/>


<div>

<p

className="
text-[10px]
uppercase
text-[#D4AF37]
"

>

Expression

</p>


<p

className="
text-sm
text-[#FFF9E8]
"

>

Outer Identity

</p>


</div>


</div>







</div>







</motion.div>








</div>






</div>



</section>


);

}