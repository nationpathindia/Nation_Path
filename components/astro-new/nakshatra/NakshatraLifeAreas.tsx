"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// NAKSHATRA LIFE AREAS
//
// Life Journey Intelligence Map
//
// UI EXPERIENCE ONLY
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";

import {
  Sun,
  Heart,
  Sparkles,
  ArrowRight,
} from "lucide-react";





//////////////////////////////////////////////////////////////
// LIFE INTELLIGENCE DATA
//////////////////////////////////////////////////////////////

const lifeAreas = [


{
icon:Sun,

title:
"Career Intelligence",

description:

"Your Nakshatra energy influences your natural abilities, working style and the environments where your purpose can grow.",


points:[

"Natural talents",

"Creative expression",

"Leadership approach",

],


tone:
"bg-[#1B120A]"

},






{
icon:Heart,

title:
"Relationships",

description:

"The lunar pattern reflects emotional connection, communication style and the qualities you seek in meaningful bonds.",


points:[

"Emotional expression",

"Connection style",

"Relationship harmony",

],


tone:
"bg-[#21160D]"

},






{
icon:Sparkles,

title:
"Spiritual Growth",

description:

"Every Nakshatra carries a deeper purpose connected with awareness, transformation and inner evolution.",


points:[

"Self discovery",

"Inner wisdom",

"Conscious growth",

],


tone:
"bg-[#120C08]"

},



];









export default function NakshatraLifeAreas(){



return (


<section

className="
relative
overflow-hidden
bg-[#120C08]
px-4
py-20
md:px-8
"

>






{/* GOLD LIFE AURA */}


<div

className="
pointer-events-none
absolute
left-1/2
top-[-100px]
h-[450px]
w-[450px]
-translate-x-1/2
rounded-full
bg-[#D4AF37]/10
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
px-4
py-2
text-sm
text-[#D4AF37]
"

>


<Sparkles size={16}/>


Life Journey Intelligence


</div>









<h2

className="
mt-6
font-serif
text-3xl
font-semibold
text-[#FFF9E8]
md:text-5xl
"

>


How Your Nakshatra Shapes Your Life


</h2>








<p

className="
mx-auto
mt-4
max-w-2xl
leading-relaxed
text-[#D8C49A]
"

>


Your lunar constellation influences your
abilities, relationships and the journey
towards personal evolution.


</p>





</div>









{/* JOURNEY MAP PANEL */}



<div

className="
rounded-3xl
border
border-[#D4AF37]/30
bg-[#1B120A]
p-6
shadow-[0_30px_80px_rgba(0,0,0,0.3)]
md:p-10
"

>
  




{/* LIFE JOURNEY CARDS */}


<div

className="
grid
gap-6
md:grid-cols-3
"

>


{

lifeAreas.map((area,index)=>{


const Icon = area.icon;



return (



<motion.div


key={area.title}


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

delay:index * .12,

}}



className={`
group
relative
overflow-hidden
rounded-3xl
border
border-[#D4AF37]/30
${area.tone}
p-6
transition
hover:-translate-y-1
hover:border-[#D4AF37]/80
`}



>







{/* GOLD CORNER LIGHT */}


<div

className="
pointer-events-none
absolute
right-[-40px]
top-[-40px]
h-32
w-32
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
h-12
w-12
items-center
justify-center
rounded-full
border
border-[#D4AF37]/40
bg-[#120C08]
text-[#D4AF37]
"

>


<Icon size={22}/>


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


{area.title}


</h3>








<p

className="
mt-4
leading-relaxed
text-[#D8C49A]
"

>


{area.description}


</p>









<ul

className="
mt-6
space-y-3
"

>


{

area.points.map(point=>(


<li


key={point}


className="
flex
items-center
gap-3
text-sm
text-[#E8D9B5]
"

>


<span

className="
flex
h-5
w-5
items-center
justify-center
rounded-full
border
border-[#D4AF37]/40
"

>


<ArrowRight

size={11}

className="
text-[#D4AF37]
"

/>


</span>





{point}



</li>


))


}



</ul>







</div>





</motion.div>



);


})


}



</div>








</div>






{/* FOOTER CONNECTION */}


<div

className="
mt-10
flex
items-center
justify-center
gap-2
text-sm
uppercase
tracking-[0.25em]
text-[#D4AF37]
"

>


<Sparkles size={16}/>


Lunar Energy • Life Direction


</div>







</motion.div>



</section>


);


}