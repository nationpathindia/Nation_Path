"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// LAGNA INTELLIGENCE EXPERIENCE
//
// LIFE APPROACH CHAPTER
//
// Identity:
// The way your rising energy moves through life
//
// Feeling:
// Cinematic journey + ancient wisdom
//
// Future:
// Dynamic Lagna Intelligence API
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import {
  Compass,
  ArrowDown,
  Sparkles,
  Footprints,
  Sunrise,
} from "lucide-react";

import type { LagnaProfile } from "../types";



interface LifeApproachProps {

  profile: LagnaProfile;

}





export default function LifeApproach({

  profile,

}: LifeApproachProps) {



return (

<section

className="
relative
overflow-hidden
bg-[#120C08]
px-5
py-14
sm:px-8
lg:px-12
"

>






{/* GOLD PATH LIGHT */}



<div

className="
pointer-events-none
absolute
left-1/2
top-0
h-[350px]
w-[350px]
-translate-x-1/2
rounded-full
bg-[#D4AF37]/10
blur-[140px]
"

/>








<div

className="
relative
mx-auto
max-w-5xl
"

>








{/* HEADER */}



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
mb-10
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

Life Journey

</p>



<h2

className="
mt-3
text-3xl
font-semibold
text-[#FFF9E8]
"

>

The Path You Walk

</h2>



<p

className="
mx-auto
mt-4
max-w-xl
text-sm
leading-7
text-[#D8C59A]
"

>

Your Ascendant influences the way you approach experiences, choices and transformation.

</p>



</motion.div>









{/* JOURNEY MAP */}



<motion.div

initial={{

opacity:0,
scale:.96

}}

whileInView={{

opacity:1,
scale:1

}}

viewport={{

once:true

}}

className="
relative
border
border-[#D4AF37]/25
bg-[#1B120A]
p-6
sm:p-10
"

>






<div

className="
absolute
left-1/2
top-10
hidden
h-[80%]
w-px
-translate-x-1/2
bg-[#D4AF37]/20
lg:block
"

/>








<div

className="
relative
grid
gap-6
"

>








{/* STEP 1 */}



<div

className="
flex
items-center
gap-5
border
border-[#D4AF37]/20
bg-[#120C08]
p-5
"

>


<div

className="
flex
h-12
w-12
items-center
justify-center
rounded-full
border
border-[#D4AF37]/40
"

>


<Sunrise

size={22}

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
tracking-widest
text-[#D4AF37]
"

>

First Movement

</p>


<p

className="
mt-2
text-sm
leading-7
text-[#FFF9E8]
"

>

How your rising energy enters new situations and creates impressions.

</p>


</div>




</div>









<ArrowDown

className="
mx-auto
text-[#D4AF37]
lg:hidden
"

/>










{/* STEP 2 */}



<div

className="
flex
items-center
gap-5
border
border-[#D4AF37]/20
bg-[#120C08]
p-5
"

>


<div

className="
flex
h-12
w-12
items-center
justify-center
rounded-full
border
border-[#D4AF37]/40
"

>


<Compass

size={22}

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
tracking-widest
text-[#D4AF37]
"

>

Decision Energy

</p>



<p

className="
mt-2
text-sm
leading-7
text-[#FFF9E8]
"

>

Your natural approach towards choices, challenges and opportunities.

</p>


</div>



</div>









<ArrowDown

className="
mx-auto
text-[#D4AF37]
lg:hidden
"

/>









{/* STEP 3 */}



<div

className="
flex
items-center
gap-5
border
border-[#D4AF37]/20
bg-[#120C08]
p-5
"

>



<div

className="
flex
h-12
w-12
items-center
justify-center
rounded-full
border
border-[#D4AF37]/40
"

>


<Footprints

size={22}

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
tracking-widest
text-[#D4AF37]
"

>

Growth Direction

</p>



<p

className="
mt-2
text-sm
leading-7
text-[#FFF9E8]
"

>

The evolving path where your identity finds maturity.

</p>


</div>




</div>









</div>







{/* FOOT NOTE */}



<div

className="
mt-8
flex
items-center
justify-center
gap-3
border-t
border-[#D4AF37]/20
pt-6
"

>


<Sparkles

size={18}

className="
text-[#D4AF37]
"

/>



<p

className="
text-sm
italic
text-[#D8C59A]
"

>

Every rising sign carries a unique journey.

</p>



</div>






</motion.div>







</div>



</section>


);

}