"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HERO VISUAL
//
// Premium Vedic Intelligence Artifact
//
// Layers:
// - Zodiac Wheel
// - Sacred Geometry
// - Orbital Energy Field
// - Fixed Astro Seal
// - AI Insight
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import {
  Sparkles,
  Sun,
  Moon,
  Star,
} from "lucide-react";



const PLANETS = [
  {
    name:"Sun",
    icon:Sun,
    angle:20,
  },
  {
    name:"Moon",
    icon:Moon,
    angle:140,
  },
  {
    name:"Jupiter",
    icon:Star,
    angle:260,
  },
];



const ORBITS = [
  {
    size:420,
    duration:28,
    reverse:false,
  },
  {
    size:470,
    duration:38,
    reverse:true,
  },
  {
    size:520,
    duration:55,
    reverse:false,
  },
];



const PARTICLES = [
  {
    x:"50%",
    y:"0%",
  },
  {
    x:"100%",
    y:"50%",
  },
  {
    x:"50%",
    y:"100%",
  },
  {
    x:"0%",
    y:"50%",
  },
  {
    x:"20%",
    y:"15%",
  },
  {
    x:"80%",
    y:"80%",
  },
];



export default function AstroHeroVisual(){


return (

<div

className="
relative
flex
h-[430px]
w-full
items-center
justify-center
overflow-hidden
"

>



{/* GOLDEN AURA */}


<motion.div

animate={{

opacity:[
0.25,
0.45,
0.25
],

scale:[
1,
1.08,
1
]

}}

transition={{

duration:8,
repeat:Infinity

}}

className="
absolute
h-[390px]
w-[390px]
rounded-full
bg-[#D4AF37]/20
blur-[110px]
"

/>









{/* ORBITAL ENERGY RINGS */}


{
ORBITS.map((orbit,index)=>(


<motion.div

key={index}

animate={{

rotate: orbit.reverse
?
-360
:
360

}}

transition={{

duration:orbit.duration,
repeat:Infinity,
ease:"linear"

}}

className="
absolute
rounded-full
border
border-[#D4AF37]/10
"

style={{

height:orbit.size,
width:orbit.size,

}}

/>


))
}








{/* OUTER MOVING PARTICLES */}



{
PARTICLES.map((particle,index)=>(


<motion.div

key={index}

animate={{

rotate:
index%2===0
?
360
:
-360

}}

transition={{

duration:
18 + index*5,

repeat:Infinity,

ease:"linear"

}}

className="
absolute
h-[300px]
w-[300px]
"

>


<div

className="
absolute
h-3
w-3
rounded-full
bg-[#D4AF37]
shadow-[0_0_18px_rgba(212,175,55,0.8)]
"

style={{

left:particle.x,
top:particle.y

}}

/>


</motion.div>


))
}









{/* SACRED KUNDLI GEOMETRY */}



<div

className="
absolute
h-[260px]
w-[260px]
rotate-45
border
border-[#D4AF37]/20
"

>


<div

className="
absolute
left-1/2
top:0
h-full
border-l
border-[#D4AF37]/20
"

/>


<div

className="
absolute
left-0
top-1/2
w-full
border-t
border-[#D4AF37]/20
"

/>


</div>









{/* ROTATING ZODIAC CORE */}



<motion.div

animate={{

rotate:360

}}

transition={{

duration:120,
repeat:Infinity,
ease:"linear"

}}

className="
absolute
flex
h-[330px]
w-[330px]
items-center
justify-center
rounded-full
border
border-[#D4AF37]/60
"

>





{
Array.from({
length:12
}).map((_,index)=>(


<div

key={index}

className="
absolute
h-2
w-2
rounded-full
bg-[#D4AF37]
"

style={{

transform:
`
rotate(${index*30}deg)
translateY(-155px)
`

}}

/>


))
}






{
PLANETS.map((planet)=>(


<div

key={planet.name}

className="
absolute
"

style={{

transform:
`
rotate(${planet.angle}deg)
translateY(-112px)
`

}}

>


<div

className="
flex
h-9
w-9
items-center
justify-center
rounded-full
border
border-[#D4AF37]/50
bg-[#FFF9E8]
shadow-lg
"

>


<planet.icon

size={16}

className="
text-[#8B5E00]
"

/>


</div>


</div>


))
}



</motion.div>









{/* FIXED ASTRO SEAL */}



<div

className="
relative
z-10
flex
h-32
w-32
flex-col
items-center
justify-center
rounded-full
border
border-[#D4AF37]/50
bg-[#FFF9E8]
shadow-[0_20px_70px_rgba(139,94,0,0.25)]
"

>


<div

className="
absolute
inset-3
rounded-full
border
border-[#D4AF37]/20
"

/>


<Sparkles

size={34}

className="
relative
text-[#D4AF37]
"

/>


<p

className="
relative
mt-2
font-serif
text-lg
font-bold
text-[#3B2600]
"

>
ASTRO
</p>


<p

className="
relative
text-[9px]
tracking-[0.35em]
text-[#8B5E00]
"

>
INTELLIGENCE
</p>


</div>









{/* AI INSIGHT */}



<motion.div

animate={{

opacity:[
0.85,
1,
0.85
]

}}

transition={{

duration:5,
repeat:Infinity

}}

className="
absolute
bottom-5
right-3
z-20
rounded-2xl
border
border-[#D4AF37]/40
bg-[#120C08]
px-5
py-4
shadow-2xl
"

>


<div

className="
flex
items-center
gap-2
text-xs
font-bold
tracking-widest
text-[#D4AF37]
"

>

<Sparkles size={14}/>

AI INSIGHT

</div>


<p

className="
mt-2
text-sm
font-bold
text-[#FFF9E8]
"

>
Your Cosmic Pattern
</p>


<p

className="
mt-1
text-xs
text-[#C8A96A]
"

>
Vedic Wisdom + Intelligence
</p>


</motion.div>





</div>

);

}