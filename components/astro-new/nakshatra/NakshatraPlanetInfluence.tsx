"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// NAKSHATRA PLANET INFLUENCE
//
// Planetary Intelligence Chamber
//
// Luxury Ancient Wisdom UI
//
// UI ONLY
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";

import {
  Orbit,
  Sparkles,
  Star,
  Moon,
  Crown,
  CircleDot,
} from "lucide-react";





//////////////////////////////////////////////////////////////
// PLANETARY INSIGHTS
//////////////////////////////////////////////////////////////

const planetaryInsights = [


{
icon:Sparkles,

title:
"Spiritual Intelligence",

description:
"Ketu connects lunar energy with intuition, inner awareness and deeper understanding beyond the visible reality."

},



{
icon:Star,

title:
"Transformative Energy",

description:
"This planetary influence encourages evolution through experiences, self-discovery and personal transformation."

},



{
icon:Orbit,

title:
"Independent Nature",

description:
"Ketu inspires freedom, originality and the courage to follow an uncommon path."

}



];









export default function NakshatraPlanetInfluence(){



return (


<section

className="
relative
overflow-hidden
bg-[#FFF9E8]
px-4
py-20
md:px-8
"

>





{/* DARK PLANETARY AURA */}


<div

className="
pointer-events-none
absolute
right-[-120px]
top-20
h-[420px]
w-[420px]
rounded-full
bg-[#8B5E00]/10
blur-[150px]
"

/>





<motion.div


initial={{

opacity:0,

y:30

}}


whileInView={{

opacity:1,

y:0

}}


viewport={{

once:true

}}


transition={{

duration:.7

}}


className="
relative
mx-auto
max-w-6xl
"

>






{/* HEADER */}


<div

className="
mb-12
text-center
"

>


<div

className="
inline-flex
items-center
gap-2
rounded-full
bg-[#120C08]
px-4
py-2
text-sm
text-[#D4AF37]
"

>


<Orbit size={16}/>


Planetary Intelligence


</div>







<h2

className="
mt-6
font-serif
text-3xl
font-semibold
text-[#3B2600]
md:text-5xl
"

>


The Planet Guiding Your Lunar Energy


</h2>







<p

className="
mx-auto
mt-4
max-w-2xl
leading-relaxed
text-[#5A3908]
"

>


Every Nakshatra carries the vibration
of its ruling planet. This planetary
energy shapes instincts, emotions
and inner direction.


</p>



</div>









{/* MAIN CHAMBER */}


<div

className="
overflow-hidden
rounded-3xl
border
border-[#D4AF37]/40
bg-[#120C08]
p-6
shadow-[0_30px_90px_rgba(18,12,8,0.25)]
md:p-10
"

>



<div

className="
grid
items-center
gap-10
lg:grid-cols-[320px_1fr]
"

>









{/* PLANET IDENTITY */}


<div

className="
text-center
"

>


<div

className="
relative
mx-auto
flex
h-40
w-40
items-center
justify-center
rounded-full
border
border-[#D4AF37]
bg-[#1B120A]
shadow-[0_0_60px_rgba(212,175,55,0.2)]
"

>



<div

className="
absolute
inset-4
rounded-full
border
border-[#D4AF37]/30
"

/>





<Orbit

size={58}

className="
text-[#D4AF37]
"

/>




</div>






<div

className="
mt-6
flex
items-center
justify-center
gap-2
text-xs
uppercase
tracking-[0.25em]
text-[#D4AF37]
"

>


<Crown size={15}/>


Planetary Lord


</div>






<h3

className="
mt-4
font-serif
text-4xl
font-semibold
text-[#FFF9E8]
"

>


Ketu


</h3>






<p

className="
mt-3
text-[#D8C49A]
"

>


The Spiritual Navigator


</p>





</div>




{/* PLANET INTELLIGENCE */}


<div

className="
space-y-5
"

>


{

planetaryInsights.map((item,index)=>{


const Icon=item.icon;



return (


<motion.div


key={item.title}


initial={{

opacity:0,

x:25,

}}


whileInView={{

opacity:1,

x:0,

}}


viewport={{

once:true,

}}


transition={{

delay:index * .12,

}}



className="
group
rounded-2xl
border
border-[#D4AF37]/25
bg-[#1B120A]
p-5
transition
hover:border-[#D4AF37]/70
hover:bg-[#24170D]
"

>


<div

className="
flex
gap-4
"

>



<div

className="
flex
h-11
w-11
shrink-0
items-center
justify-center
rounded-full
border
border-[#D4AF37]/40
bg-[#120C08]
text-[#D4AF37]
transition
group-hover:border-[#D4AF37]
"

>


<Icon size={19}/>


</div>







<div>


<h4

className="
font-serif
text-xl
font-semibold
text-[#FFF9E8]
"

>

{item.title}

</h4>






<p

className="
mt-2
leading-relaxed
text-sm
text-[#D8C49A]
"

>

{item.description}

</p>




</div>




</div>





</motion.div>


);


})


}



</div>








</div>


</div>










{/* PLANET CONNECTION */}


<div

className="
mt-10
flex
flex-col
items-center
justify-center
gap-3
text-center
text-[#D4AF37]
sm:flex-row
"

>


<div

className="
flex
items-center
gap-2
text-sm
uppercase
tracking-[0.25em]
"

>

<Moon size={17}/>


Moon


</div>







<CircleDot

size={12}

/>








<div

className="
flex
items-center
gap-2
text-sm
uppercase
tracking-[0.25em]
"

>


Planet


<Sparkles size={17}/>


</div>





</div>







</motion.div>


</section>


);


}