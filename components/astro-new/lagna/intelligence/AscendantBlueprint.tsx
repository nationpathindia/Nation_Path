"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// LAGNA INTELLIGENCE EXPERIENCE
//
// ASCENDANT BLUEPRINT SCROLL
//
// Purpose:
// Explain how the rising identity operates
//
// Future:
// Dynamic Lagna Intelligence API
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import {
  Compass,
  ScrollText,
  Sun,
  Sparkles,
  Flame,
} from "lucide-react";

import type { LagnaProfile } from "../types";



interface AscendantBlueprintProps {

  profile: LagnaProfile;

}





export default function AscendantBlueprint({

  profile,

}: AscendantBlueprintProps) {



return (

<section

className="
relative
overflow-hidden
bg-[#FFF9E8]
px-5
py-12
sm:px-8
lg:px-12
"

>



<div

className="
mx-auto
max-w-5xl
"

>






{/* HEADER */}



<div

className="
mb-8
text-center
"

>


<p

className="
text-[10px]
uppercase
tracking-[0.5em]
text-[#8B5E00]
"

>

Ancient Blueprint

</p>



<h2

className="
mt-3
text-2xl
font-semibold
text-[#3B2600]
sm:text-3xl
"

>

The Rising Pattern

</h2>


</div>











{/* BLUEPRINT PANEL */}



<div

className="
grid
gap-5
lg:grid-cols-[0.8fr_1.2fr]
"

>









{/* SCROLL */}



<motion.div

initial={{

opacity:0,
x:-20

}}

whileInView={{

opacity:1,
x:0

}}

viewport={{

once:true

}}

className="
relative
border
border-[#D4AF37]/40
bg-[#F8F1DE]
p-6
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
bg-[#FFF9E8]
"

>


<Compass

size={26}

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
tracking-[0.4em]
text-[#8B5E00]
"

>

Ascendant Scroll

</p>








<div

className="
my-5
h-px
bg-[#D4AF37]/30
"

/>








<div

className="
space-y-4
text-left
"

>



<div>

<p

className="
text-[10px]
uppercase
tracking-widest
text-[#8B5E00]
"

>

Rising Sign

</p>


<p

className="
mt-1
text-2xl
font-semibold
text-[#3B2600]
"

>

{profile.ascendant}

</p>

</div>







<div>

<p

className="
text-[10px]
uppercase
tracking-widest
text-[#8B5E00]
"

>

Element

</p>


<div

className="
mt-1
flex
items-center
gap-2
text-[#5A3908]
"

>

<Flame size={15}/>

{profile.element}

</div>


</div>








<div>

<p

className="
text-[10px]
uppercase
tracking-widest
text-[#8B5E00]
"

>

Guiding Planet

</p>


<p

className="
mt-1
text-[#5A3908]
"

>

{profile.rulingPlanet}

</p>


</div>





</div>







</div>



</motion.div>













{/* INTERPRETATION */}



<motion.div

initial={{

opacity:0,
x:20

}}

whileInView={{

opacity:1,
x:0

}}

viewport={{

once:true

}}

className="
border
border-[#D4AF37]/25
bg-[#F8F1DE]
p-6
sm:p-8
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


<Sparkles size={17}/>



<span

className="
text-[10px]
uppercase
tracking-[0.35em]
"

>

Identity Intelligence

</span>



</div>







<p

className="
mt-5
text-base
leading-8
text-[#5A3908]
"

>

{profile.identity}

</p>







<div

className="
mt-6
border-l
border-[#D4AF37]/50
pl-5
"

>


<div

className="
flex
items-center
gap-3
"

>


<ScrollText

size={18}

className="
text-[#D4AF37]
"

/>



<h3

className="
text-lg
font-medium
text-[#3B2600]
"

>

How Your Rising Energy Works

</h3>


</div>





<p

className="
mt-3
text-sm
leading-7
text-[#6B4A16]
"

>

Your Ascendant shapes the way your inner consciousness meets the outer world. It influences your expression, approach and the path others experience through you.

</p>




</div>







<div

className="
mt-6
flex
items-center
gap-3
border-t
border-[#D4AF37]/20
pt-5
"

>


<Sun

size={20}

className="
text-[#D4AF37]
"

/>



<p

className="
text-sm
italic
text-[#6B4A16]
"

>

The first impression becomes the doorway of destiny.

</p>



</div>








</motion.div>








</div>







</div>


</section>


);

}