"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// NAKSHATRA REMEDY
//
// Sacred Guidance Chamber
//
// Vedic Wisdom Experience
//
// UI EXPERIENCE ONLY
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";

import {
  Sparkles,
  Moon,
  Heart,
  Sun,
  Star,
} from "lucide-react";





const remedies = [


{
icon:Sparkles,

title:
"Sacred Mantra",

subtitle:
"Sound Intelligence",

description:
"Traditional mantra practices are associated with focus, awareness and deeper connection with inner consciousness.",

tone:
"bg-[#1B120A]",

},




{
icon:Moon,

title:
"Meditation Practice",

subtitle:
"Emotional Balance",

description:
"Meditative practices encourage calmness, emotional clarity and mindful awareness.",

tone:
"bg-[#21160D]",

},




{
icon:Heart,

title:
"Charity & Karma",

subtitle:
"Positive Action",

description:
"Acts of kindness and selfless service represent traditional pathways of balancing personal energy.",

tone:
"bg-[#24170D]",

},




{
icon:Sun,

title:
"Spiritual Discipline",

subtitle:
"Inner Growth",

description:
"Consistent spiritual routines encourage reflection, discipline and personal transformation.",

tone:
"bg-[#120C08]",

},


];









export default function NakshatraRemedy(){


return (


<section

className="
relative
overflow-hidden
bg-[#F8F1DE]
px-4
py-20
md:px-8
"

>





{/* WARM GOLD AURA */}


<div

className="
pointer-events-none
absolute
bottom-[-120px]
left-1/2
h-[450px]
w-[450px]
-translate-x-1/2
rounded-full
bg-[#D4AF37]/15
blur-[150px]
"

/>







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


transition={{

duration:.7,

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
border
border-[#D4AF37]/40
bg-[#120C08]
px-4
py-2
text-sm
text-[#D4AF37]
"

>


<Star size={16}/>


Sacred Guidance


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


Traditional Wisdom For Inner Balance


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


Ancient Vedic traditions associate
certain practices with awareness,
discipline and personal growth.


</p>





</div>









{/* REMEDY GRID */}



<div

className="
grid
gap-6
md:grid-cols-2
"

>





{

remedies.map((item,index)=>{


const Icon=item.icon;



return (



<motion.div


key={item.title}


initial={{

opacity:0,

y:25,

}}


whileInView={{

opacity:1,

y:0,

}}


viewport={{

once:true,

}}


transition={{

delay:index*.12,

}}



className={`

group

relative

overflow-hidden

rounded-3xl

border

border-[#D4AF37]/35

${item.tone}

p-6

transition-all

duration-300

hover:-translate-y-1

hover:border-[#D4AF37]

hover:shadow-[0_20px_60px_rgba(212,175,55,0.18)]

`}

>







{/* CARD GOLD AURA */}



<div

className="
pointer-events-none
absolute
right-[-40px]
top-[-40px]
h-36
w-36
rounded-full
bg-[#D4AF37]/10
blur-3xl
"

/>








<div

className="
relative
z-10
"

>







{/* ICON */}



<div

className="
flex
h-14
w-14
items-center
justify-center
rounded-full
border
border-[#D4AF37]/50
bg-[#120C08]
text-[#D4AF37]
shadow-[0_0_35px_rgba(212,175,55,0.15)]
"

>


<Icon size={24}/>


</div>








<h3

className="
mt-6
font-serif
text-2xl
font-semibold
text-[#FFF9E8]
"

>


{item.title}


</h3>








<p

className="
mt-2
text-xs
uppercase
tracking-[0.25em]
text-[#D4AF37]
"

>


{item.subtitle}


</p>








<p

className="
mt-5
leading-relaxed
text-[#D8C49A]
"

>


{item.description}


</p>








<div

className="
mt-6
h-px
w-full
bg-[#D4AF37]/20
"

/>








<div

className="
mt-4
flex
items-center
gap-2
text-sm
text-[#D4AF37]
"

>


<Sparkles size={14}/>


Vedic Guidance Path


</div>







</div>





</motion.div>



);


})


}



</div>









{/* FOOTER */}



<div

className="
mt-12
flex
items-center
justify-center
gap-3
text-sm
uppercase
tracking-[0.25em]
text-[#8B5E00]
"

>


<Moon size={18}/>


Sacred Lunar Practices


<Sparkles size={18}/>



</div>







</motion.div>



</section>


);


}