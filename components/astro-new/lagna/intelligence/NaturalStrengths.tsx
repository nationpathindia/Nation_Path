"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// LAGNA INTELLIGENCE EXPERIENCE
//
// GOLDEN GIFTS CHAMBER
//
// Identity:
// Sacred gifts carried by Ascendant
//
// Feeling:
// Royal treasure manuscript
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import {
  Crown,
  Gem,
  Sparkles,
  Shield,
  Star,
} from "lucide-react";

import type { LagnaProfile } from "../types";


interface NaturalStrengthsProps {
  profile: LagnaProfile;
}



export default function NaturalStrengths({

  profile,

}: NaturalStrengthsProps) {


return (

<section

className="
relative
overflow-hidden
bg-[#F8F1DE]
px-5
py-16
sm:px-8
lg:px-12
"

>





{/* GOLD LIGHT */}

<div

className="
pointer-events-none
absolute
left-1/2
top-[-140px]
h-[450px]
w-[450px]
-translate-x-1/2
rounded-full
bg-[#D4AF37]/15
blur-[150px]
"

/>







<div

className="
relative
mx-auto
max-w-5xl
"

>









{/* TITLE */}



<motion.div

initial={{

opacity:0,
y:20

}}

whileInView={{

opacity:1,
y:0

}}

viewport={{once:true}}

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
text-[#8B5E00]
"

>

Sacred Collection

</p>




<h2

className="
mt-4
text-3xl
font-semibold
text-[#3B2600]
sm:text-4xl
"

>

Golden Gifts

</h2>





<div

className="
mx-auto
mt-4
flex
items-center
justify-center
gap-3
"

>

<span className="h-px w-12 bg-[#D4AF37]/40"/>

<Star

size={14}

className="text-[#D4AF37]"
/>

<span className="h-px w-12 bg-[#D4AF37]/40"/>

</div>




<p

className="
mx-auto
mt-5
max-w-xl
text-sm
leading-7
text-[#6B4A16]
"

>

The rare qualities and blessings your Ascendant naturally carries.

</p>


</motion.div>









{/* TREASURE ROOM */}



<motion.div

initial={{

opacity:0,
scale:.97

}}

whileInView={{

opacity:1,
scale:1

}}

viewport={{once:true}}

className="
relative
border
border-[#D4AF37]/35
bg-[#FFF9E8]
p-5
sm:p-8
shadow-[0_25px_80px_rgba(18,12,8,0.12)]
"

>






<div

className="
absolute
inset-4
border
border-[#D4AF37]/15
pointer-events-none
"

/>









<div

className="
relative
grid
gap-6
lg:grid-cols-[0.9fr_1.1fr]
"

>









{/* MAIN GIFT */}



<div

className="
flex
flex-col
items-center
justify-center
border
border-[#D4AF37]/35
bg-[#120C08]
p-8
text-center
"

>



<motion.div

animate={{

y:[0,-8,0]

}}

transition={{

duration:5,
repeat:Infinity,
ease:"easeInOut"

}}

className="
flex
h-24
w-24
items-center
justify-center
rounded-full
border
border-[#D4AF37]/40
bg-[#F8F1DE]
shadow-[0_0_60px_rgba(212,175,55,0.3)]
"

>

<Crown

size={42}

className="text-[#D4AF37]"
/>


</motion.div>






<p

className="
mt-7
text-[10px]
uppercase
tracking-[0.45em]
text-[#D4AF37]
"

>

Primary Gift

</p>



<h3

className="
mt-3
text-2xl
font-semibold
text-[#FFF9E8]
"

>

Natural Presence

</h3>



<p

className="
mt-4
text-sm
leading-7
text-[#D8C59A]
"

>

{profile.identity}

</p>



</div>









{/* SECONDARY GIFTS */}



<div

className="
space-y-5
"

>






<div

className="
border
border-[#D4AF37]/25
bg-[#120C08]
p-5
"

>


<div className="flex items-center gap-4">


<div

className="
flex
h-12
w-12
items-center
justify-center
border
border-[#D4AF37]/30
"

>

<Gem

size={22}

className="text-[#D4AF37]"
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

Hidden Treasure

</p>


<h4

className="
mt-1
text-lg
text-[#FFF9E8]
"

>

Inner Potential

</h4>


</div>


</div>





<p

className="
mt-4
text-sm
leading-7
text-[#D8C59A]
"

>

Qualities that reveal themselves through experience.

</p>



</div>









<div

className="
border
border-[#D4AF37]/25
bg-[#120C08]
p-5
"

>


<div className="flex items-center gap-4">


<div

className="
flex
h-12
w-12
items-center
justify-center
border
border-[#D4AF37]/30
"

>

<Shield

size={22}

className="text-[#D4AF37]"
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

Sacred Strength

</p>



<h4

className="
mt-1
text-lg
text-[#FFF9E8]
"

>

Inner Power

</h4>



</div>


</div>





<p

className="
mt-4
text-sm
leading-7
text-[#D8C59A]
"

>

The invisible force supporting your evolution.

</p>



</div>








</div>






</div>









<div

className="
mt-8
flex
items-center
justify-center
gap-3
border-t
border-[#D4AF37]/25
pt-6
"

>


<Sparkles

size={18}

className="text-[#D4AF37]"
/>



<p

className="
text-sm
italic
text-[#6B4A16]
"

>

Every Ascendant carries a treasure waiting to awaken.

</p>


</div>







</motion.div>







</div>



</section>


);

}