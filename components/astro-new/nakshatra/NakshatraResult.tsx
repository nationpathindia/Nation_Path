"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO NAKSHATRA RESULT
//
// Personalized Nakshatra Identity Card
//
// Future:
// Direct Astro Engine API Response
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import {
  Moon,
  Sparkles,
  Crown,
  Star,
  Orbit,
} from "lucide-react";



interface NakshatraResultProps {

nakshatra?:string;

pada?:string;

rashi?:string;

planet?:string;

deity?:string;

symbol?:string;

summary?:string;

}



export default function NakshatraResult({

nakshatra = "Ashwini",

pada = "Pada 2",

rashi = "Mesha Rashi",

planet = "Ketu",

deity = "Ashwini Kumaras",

symbol = "Horse",

summary =
"Your Nakshatra represents speed, healing energy, courage and the ability to begin new journeys.",

}:NakshatraResultProps){



return (

<section

className="
bg-[#FFF9E8]
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
scale:0.96,
}}

whileInView={{
opacity:1,
scale:1,
}}

viewport={{
once:true,
}}

className="
relative
overflow-hidden
rounded-[2.5rem]
bg-[#120C08]
p-8
text-[#FFF9E8]
sm:p-10
"

>





{/* GOLD ENERGY */}



<div

className="
pointer-events-none
absolute
right-[-100px]
top-[-100px]
h-80
w-80
rounded-full
bg-[#D4AF37]/20
blur-[130px]
"

/>








<div

className="
relative
z-10
"

>








{/* HEADER */}



<div

className="
flex
items-center
gap-3
text-[#D4AF37]
"

>

<Moon

size={22}

/>


<span

className="
text-sm
font-medium
"

>

Your Birth Nakshatra

</span>


</div>







<div

className="
mt-8
grid
gap-8
lg:grid-cols-2
lg:items-center
"

>









{/* MAIN IDENTITY */}



<div>



<h2

className="
text-5xl
font-semibold
"

>

{nakshatra}

</h2>





<p

className="
mt-3
text-xl
text-[#D4AF37]
"

>

{rashi}

</p>







<p

className="
mt-6
max-w-xl
leading-8
text-[#F8F1DE]
"

>

{summary}

</p>







<div

className="
mt-8
flex
flex-wrap
gap-3
"

>


<div

className="
rounded-full
border
border-[#D4AF37]/40
px-4
py-2
text-sm
"

>

{pada}

</div>





<div

className="
rounded-full
border
border-[#D4AF37]/40
px-4
py-2
text-sm
"

>

{planet}

</div>






<div

className="
rounded-full
border
border-[#D4AF37]/40
px-4
py-2
text-sm
"

>

{symbol}

</div>



</div>






</div>









{/* DETAILS PANEL */}



<div

className="
grid
gap-4
sm:grid-cols-2
"

>





<div

className="
rounded-3xl
bg-[#FFF9E8]/10
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

<Crown

size={18}

/>


Deity


</div>


<p

className="
mt-3
font-medium
"

>

{deity}

</p>


</div>








<div

className="
rounded-3xl
bg-[#FFF9E8]/10
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

<Orbit

size={18}

/>


Planet Energy


</div>


<p

className="
mt-3
font-medium
"

>

{planet}


</p>


</div>








<div

className="
rounded-3xl
bg-[#FFF9E8]/10
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

<Star

size={18}

/>


Birth Symbol


</div>


<p

className="
mt-3
font-medium
"

>

{symbol}

</p>


</div>








<div

className="
rounded-3xl
bg-[#D4AF37]/10
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

<Sparkles

size={18}

/>


Moon Intelligence


</div>


<p

className="
mt-3
text-sm
leading-6
"

>

Personalized emotional and life pattern analysis.

</p>


</div>








</div>








</div>









</div>







</motion.div>








</div>





</section>


);

}