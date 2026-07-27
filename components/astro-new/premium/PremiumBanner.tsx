"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO PREMIUM BANNER
//
// Premium Conversion Section
//////////////////////////////////////////////////////////////

import Link from "next/link";
import {
  Sparkles,
  Moon,
  Sun,
  FileText,
} from "lucide-react";

import PremiumFeatureCard from "./PremiumFeatureCard";




const FEATURES=[

{
icon:Sparkles,
title:"Personal Birth Chart",
description:
"Complete Vedic chart analysis with planetary strengths, houses and cosmic influences."
},


{
icon:Moon,
title:"Marriage Intelligence",
description:
"Understand compatibility patterns, relationship timing and planetary harmony."
},


{
icon:Sun,
title:"Career Guidance",
description:
"Discover professional opportunities through advanced planetary analysis."
},


{
icon:FileText,
title:"AI Astro Reports",
description:
"Personalized astrology reports powered by NationPath Astro Intelligence."
},


];







export default function PremiumBanner(){



return (

<section

className="
relative
overflow-hidden
bg-[#F8F1DE]
px-5
py-20
sm:px-8
lg:px-16
"

>


<div

className="
pointer-events-none
absolute
left-1/2
top-20
h-96
w-96
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
max-w-6xl
overflow-hidden
rounded-[2.5rem]
border
border-[#D4AF37]/50
bg-[#120C08]
p-8
shadow-[0_30px_80px_rgba(18,12,8,0.35)]
sm:p-12
"

>



<div

className="
absolute
right-0
top-0
h-72
w-72
rounded-full
bg-[#D4AF37]/15
blur-3xl
"

/>







<div

className="
relative
grid
items-center
gap-12
lg:grid-cols-2
"

>





{/* CONTENT */}


<div>


<p

className="
flex
items-center
gap-2
text-xs
font-bold
uppercase
tracking-[0.4em]
text-[#D4AF37]
"

>


<Sparkles size={14}/>

NationPath Premium Astro


</p>







<h2

className="
mt-5
font-serif
text-3xl
font-bold
leading-tight
text-[#FFF9E8]
sm:text-5xl
"

>

Unlock Your Complete Cosmic Intelligence

</h2>







<p

className="
mt-6
max-w-lg
text-sm
leading-relaxed
text-[#C8A96A]
sm:text-base
"

>

Move beyond daily horoscope.
Discover personalized Vedic insights,
birth chart intelligence and AI-powered
astrology reports.

</p>








<Link

href="/pricing"

className="
mt-8
inline-flex
rounded-full
bg-[#D4AF37]
px-8
py-3
text-sm
font-bold
uppercase
tracking-[0.25em]
text-[#120C08]
transition
duration-300
hover:bg-[#F0C95A]
hover:shadow-[0_10px_35px_rgba(212,175,55,0.35)]
"

>

Unlock Premium Astrology

</Link>



</div>










{/* FEATURES */}



<div

className="
grid
gap-4
sm:grid-cols-2
"

>


{

FEATURES.map((feature)=>(


<PremiumFeatureCard

key={feature.title}

{...feature}

/>


))


}



</div>






</div>





</div>



</section>


);


}