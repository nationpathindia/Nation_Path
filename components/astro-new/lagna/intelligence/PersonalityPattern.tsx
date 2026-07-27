"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// LAGNA INTELLIGENCE EXPERIENCE
//
// PERSONALITY PATTERN CHAPTER
//
// Identity:
// How the world experiences your rising energy
//
// Feeling:
// Cinematic manuscript + self discovery
//
// Future:
// Dynamic Lagna Intelligence API
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import {
  Eye,
  Sparkles,
  Shield,
  Compass,
  Flame,
} from "lucide-react";

import type { LagnaProfile } from "../types";



interface PersonalityPatternProps {

  profile: LagnaProfile;

}





export default function PersonalityPattern({

  profile,

}: PersonalityPatternProps) {



return (

<section

className="
relative
overflow-hidden
bg-[#F8F1DE]
px-5
py-14
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
top-0
h-[300px]
w-[300px]
-translate-x-1/2
rounded-full
bg-[#D4AF37]/10
blur-[120px]
"

/>






<div

className="
relative
mx-auto
max-w-5xl
"

>







{/* CHAPTER TITLE */}



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
text-[#8B5E00]
"

>

Personality Chapter

</p>



<h2

className="
mt-3
text-3xl
font-semibold
text-[#3B2600]
"

>

Your Rising Expression

</h2>



<p

className="
mx-auto
mt-4
max-w-xl
text-sm
leading-7
text-[#6B4A16]
"

>

The Ascendant shapes the first impression you create and the energy through which you approach life.

</p>



</motion.div>









{/* CINEMATIC PANEL */}



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
border-[#D4AF37]/30
bg-[#FFF9E8]
p-6
sm:p-10
"

>





<div

className="
absolute
inset-4
border
border-[#D4AF37]/10
pointer-events-none
"

/>









<div

className="
relative
grid
gap-8
lg:grid-cols-2
"

>









{/* LEFT STORY */}



<div

className="
flex
flex-col
justify-center
"

>


<div

className="
flex
items-center
gap-3
"

>

<Eye

size={22}

className="
text-[#D4AF37]
"

/>



<h3

className="
text-xl
font-medium
text-[#3B2600]
"

>

How Others Experience You

</h3>


</div>







<p

className="
mt-5
leading-8
text-[#5A3908]
"

>

{profile.identity}

</p>









<div

className="
mt-8
border-l
border-[#D4AF37]/50
pl-5
"

>


<p

className="
text-xs
uppercase
tracking-widest
text-[#8B5E00]
"

>

Behaviour Signature

</p>



<p

className="
mt-3
text-lg
italic
text-[#3B2600]
"

>

Your {profile.ascendant} energy creates a unique presence in the world.

</p>



</div>







</div>









{/* RIGHT SYMBOLS */}



<div

className="
grid
gap-4
"

>






<div

className="
border
border-[#D4AF37]/25
bg-[#F8F1DE]
p-5
"

>


<div

className="
flex
items-center
gap-3
"

>

<Sparkles

size={20}

className="
text-[#D4AF37]
"

/>



<h4

className="
text-lg
font-medium
text-[#3B2600]
"

>

Natural Presence

</h4>



</div>



<p

className="
mt-3
text-sm
leading-7
text-[#6B4A16]
"

>

The energy people notice when you enter a space.

</p>



</div>









<div

className="
border
border-[#D4AF37]/25
bg-[#F8F1DE]
p-5
"

>


<div

className="
flex
items-center
gap-3
"

>

<Flame

size={20}

className="
text-[#D4AF37]
"

/>



<h4

className="
text-lg
font-medium
text-[#3B2600]
"

>

Inner Strength

</h4>


</div>



<p

className="
mt-3
text-sm
leading-7
text-[#6B4A16]
"

>

The qualities that naturally support your journey.

</p>



</div>









<div

className="
border
border-[#D4AF37]/25
bg-[#F8F1DE]
p-5
"

>


<div

className="
flex
items-center
gap-3
"

>

<Shield

size={20}

className="
text-[#D4AF37]
"

/>



<h4

className="
text-lg
font-medium
text-[#3B2600]
"

>

Growth Path

</h4>


</div>



<p

className="
mt-3
text-sm
leading-7
text-[#6B4A16]
"

>

The lessons that transform your rising energy.

</p>



</div>









</div>







</div>






</motion.div>







</div>


</section>


);

}