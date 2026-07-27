"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO NAKSHATRA PREMIUM BANNER
//
// Premium Report Conversion Layer
//
// Future:
// Connect Subscription + Personalized Reports
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import {
  Crown,
  Sparkles,
  Moon,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";



interface NakshatraPremiumBannerProps {

title?:string;

description?:string;

ctaText?:string;

features?:string[];

}





const DEFAULT_FEATURES = [

"Personalized Birth Nakshatra Analysis",

"Planetary Influence Report",

"Life Pattern Intelligence",

"Vedic Guidance & Remedies",

];







export default function NakshatraPremiumBanner({

title =
"Unlock Your Complete Nakshatra Intelligence Report",

description =
"Go deeper into your Moon's cosmic identity with personalized insights, planetary patterns and detailed Vedic guidance.",

ctaText =
"Unlock Premium Report",

features = DEFAULT_FEATURES,

}:NakshatraPremiumBannerProps){



return (

<section

className="
px-5
py-16
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
y:30,
}}

whileInView={{
opacity:1,
y:0,
}}

viewport={{
once:true,
}}

className="
relative
overflow-hidden
rounded-[2.5rem]
bg-[#120C08]
px-8
py-10
text-[#FFF9E8]
sm:px-12
sm:py-14
"

>







{/* PREMIUM GOLD GLOW */}



<div

className="
pointer-events-none
absolute
right-[-120px]
top-[-120px]
h-80
w-80
rounded-full
bg-[#D4AF37]/20
blur-[130px]
"

/>







<div

className="
pointer-events-none
absolute
bottom-[-100px]
left-[-100px]
h-72
w-72
rounded-full
bg-[#8B5E00]/20
blur-[120px]
"

/>








<div

className="
relative
z-10
grid
gap-10
lg:grid-cols-2
lg:items-center
"

>







{/* CONTENT */}



<div>





<div

className="
inline-flex
items-center
gap-2
rounded-full
border
border-[#D4AF37]/40
bg-[#8B5E00]/20
px-4
py-2
text-sm
text-[#D4AF37]
"

>

<Crown

size={16}

/>


Premium Nakshatra Report


</div>








<h2

className="
mt-6
text-3xl
font-semibold
leading-tight
sm:text-4xl
"

>

{title}

</h2>








<p

className="
mt-5
max-w-xl
leading-8
text-[#F8F1DE]
"

>

{description}

</p>









<button

className="
mt-8
inline-flex
items-center
gap-3
rounded-full
bg-[#D4AF37]
px-7
py-4
font-medium
text-[#120C08]
transition
hover:bg-[#E6C45A]
"

>

{ctaText}


<ArrowRight

size={18}

/>


</button>






</div>









{/* FEATURES */}



<div

className="
rounded-3xl
border
border-[#D4AF37]/30
bg-[#FFF9E8]/5
p-6
"

>





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


<div

className="
font-medium
"

>

Moon Intelligence Includes

</div>


</div>







<div

className="
mt-6
space-y-4
"

>


{features.map((feature)=>(


<div

key={feature}

className="
flex
items-center
gap-3
text-sm
text-[#F8F1DE]
"

>


<ShieldCheck

size={17}

className="
text-[#D4AF37]
"

/>



<span>

{feature}

</span>



</div>


))}



</div>







<div

className="
mt-8
flex
items-center
gap-2
text-sm
text-[#D4AF37]
"

>

<Sparkles

size={16}

/>


Ancient wisdom powered by modern Astro Intelligence


</div>








</div>








</div>







</motion.div>






</div>





</section>


);

}