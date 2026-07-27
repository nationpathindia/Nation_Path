"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// COSMIC IDENTITY EXPERIENCE
//
// PREMIUM VEDIC INTELLIGENCE HERO
//
// CMS FIRST
//
// NO ENGINE
// NO CALCULATION
//////////////////////////////////////////////////////////////

import Image from "next/image";
import { motion } from "framer-motion";

import {
  Crown,
  CalendarDays,
  CircleDot,
  Sparkles,
} from "lucide-react";


import type {
  CmsHoroscopeHero,
  CmsHoroscopeIdentity,
} from "./types";



interface Props {

  hero: CmsHoroscopeHero;

  identity?: CmsHoroscopeIdentity;

}



export default function HoroscopeHero({

hero,

identity,

}: Props){



const zodiacImage =
getZodiacImage(identity?.rashi);



const sanskritName =
identity?.sanskritName ||
identity?.sanskrit ||
"-";





return (

<section

className="
relative
overflow-hidden
bg-[#FFF9E8]
px-4
py-10
sm:px-8
sm:py-14
lg:px-16
"

>


{/* GOLD COSMIC LIGHT */}

<div

className="
absolute
left-1/2
top-[-220px]
h-[650px]
w-[650px]
-translate-x-1/2
rounded-full
bg-[#D4AF37]/20
blur-[160px]
"

/>



{/* MAROON AURA */}

<div

className="
absolute
right-[-160px]
top-40
h-[400px]
w-[400px]
rounded-full
bg-[#7A1F1F]/15
blur-[140px]
"

/>





{/* PARTICLES */}

<div className="
absolute
inset-0
pointer-events-none
">


<span

className="
absolute
left-[15%]
top-24
h-2
w-2
rounded-full
bg-[#D4AF37]
animate-pulse
"

/>


<span

className="
absolute
right-[20%]
top-36
h-1.5
w-1.5
rounded-full
bg-[#D4AF37]
"

/>


<span

className="
absolute
bottom-40
left-1/2
h-1
w-1
rounded-full
bg-[#7A1F1F]
"

/>


</div>







<div

className="
relative
mx-auto
max-w-7xl
"

>



<div

className="
grid
items-center
gap-8
lg:gap-12
lg:grid-cols-2
"

>








{/* LEFT CONTENT */}


<motion.div

initial={{

opacity:0,

x:-30

}}

animate={{

opacity:1,

x:0

}}

transition={{

duration:.7

}}

>



<div

className="
flex
items-center
gap-2
text-[10px]
font-bold
uppercase
tracking-[0.45em]
text-[#8B5E00]
"

>

<Sparkles size={14}/>

{hero.badge || "COSMIC PROFILE"}

</div>







{hero.cosmicLabel && (

<p

className="
mt-5
text-xs
uppercase
tracking-[0.35em]
text-[#8B5E00]
"

>

{hero.cosmicLabel}

</p>

)}







<h1

className="
mt-5
font-serif
text-4xl
font-bold
leading-tight
text-[#3B2600]
sm:text-6xl
"

>

{hero.title}

</h1>







<p

className="
mt-5
font-serif
text-xl
italic
text-[#7A1F1F]
"

>

{hero.subtitle}

</p>







<p

className="
mt-6
max-w-xl
text-sm
leading-8
text-[#6B4A16]
sm:text-base
"

>

{hero.description}

</p>







{/* PREMIUM SUMMARY */}


<div

className="
mt-8
flex
flex-wrap
gap-3
"

>


<MiniIdentity

label="Rashi"

value={identity?.rashi}

/>


<MiniIdentity

label="Nature"

value={identity?.nature}

/>


<MiniIdentity

label="Element"

value={identity?.element}

/>


</div>





</motion.div>






{/* RIGHT COSMIC CHAMBER */}



<motion.div

initial={{

opacity:0,

scale:.9

}}

animate={{

opacity:1,

scale:1

}}

transition={{

duration:.8

}}

className="
flex
justify-center
"

>



<div

className="
relative
mt-8
h-[270px]
w-[270px]
sm:h-[430px]
sm:w-[430px]
"

>





{/* OUTER GOLD ORBIT */}


<motion.div

animate={{

rotate:360

}}

transition={{

duration:80,

repeat:Infinity,

ease:"linear"

}}

className="
absolute
inset-0
rounded-full
border
border-[#D4AF37]/40
"

/>







{/* INNER MAROON ORBIT */}


<motion.div

animate={{

rotate:-360

}}

transition={{

duration:100,

repeat:Infinity,

ease:"linear"

}}

className="
absolute
inset-10
rounded-full
border
border-[#7A1F1F]/20
"

/>








{/* ZODIAC CHAMBER */}



<div

className="
absolute
left-1/2
top-1/2
flex
h-44
w-44
-translate-x-1/2
-translate-y-1/2
items-center
justify-center
rounded-full
border
border-[#D4AF37]/60
bg-gradient-to-br
from-[#FFFDF7]
via-[#F8E7B0]
to-[#D4AF37]/60
shadow-[0_30px_100px_rgba(212,175,55,.45)]
sm:h-64
sm:w-64
"

>





{/* INNER GOLD RING */}


<div

className="
absolute
inset-3
rounded-full
border
border-[#D4AF37]/30
"

/>








{/* ZODIAC IMAGE */}



<motion.div

animate={{

y:[0,-8,0]

}}

transition={{

duration:4,

repeat:Infinity,

ease:"easeInOut"

}}

className="
relative
z-10
flex
items-center
justify-center
"

>


<Image

src={zodiacImage}

alt={identity?.rashi || "zodiac"}

width={180}

height={180}

priority

className="
object-contain
drop-shadow-[0_0_30px_rgba(212,175,55,.7)]
sm:h-[220px]
sm:w-[220px]
"

/>


</motion.div>






{/* ENERGY GLOW */}


<div

className="
absolute
inset-0
rounded-full
bg-[radial-gradient(circle,rgba(122,31,31,.15),transparent_65%)]
pointer-events-none
"

/>



</div>







{/* ZODIAC NAME */}



<div

className="
absolute
bottom-[-55px]
left-1/2
-translate-x-1/2
text-center
sm:bottom-3
"

>


<p

className="
font-serif
text-2xl
font-bold
text-[#3B2600]
sm:text-3xl
"

>

{identity?.rashi || "-"}

</p>



<p

className="
mt-1
text-[10px]
uppercase
tracking-[0.35em]
text-[#8B5E00]
sm:text-xs
"

>

{sanskritName}

</p>


</div>





</div>





</motion.div>







</div>







{/* PLANET GLASS CARD */}



<motion.div

initial={{

opacity:0,

y:20

}}

animate={{

opacity:1,

y:0

}}

transition={{

delay:.6

}}

className="
absolute
right-0
top-10
hidden
rounded-3xl
border
border-[#D4AF37]/40
bg-[#FFF9E8]/90
p-5
shadow-xl
backdrop-blur
sm:block
"

>


<Crown

size={18}

className="
text-[#D4AF37]
"

/>



<p

className="
mt-3
text-[9px]
uppercase
tracking-[0.35em]
text-[#8B5E00]
"

>

Ruling Planet

</p>



<p

className="
mt-1
font-serif
text-lg
font-bold
text-[#3B2600]
"

>

{identity?.rulingPlanet || "-"}

</p>



</motion.div>








{/* MOBILE PLANET */}



<div

className="
mt-16
flex
justify-center
sm:hidden
"

>


<div

className="
rounded-full
border
border-[#D4AF37]/40
bg-white/70
px-6
py-3
text-sm
font-bold
text-[#3B2600]
"

>


<span

className="text-[#8B5E00]"
>

Planet:

</span>{" "}


{identity?.rulingPlanet || "-"}


</div>



</div>





{/* IDENTITY PANEL */}



<motion.div

initial={{

opacity:0,

y:25

}}

whileInView={{

opacity:1,

y:0

}}

viewport={{

once:true

}}

transition={{

duration:.6

}}

className="
mt-12
rounded-[32px]
border
border-[#D4AF37]/30
bg-gradient-to-r
from-[#FFFDF7]
via-[#F8E7B0]
to-[#FFFDF7]
p-6
shadow-xl
"

>



<div

className="
grid
grid-cols-1
gap-5
sm:grid-cols-2
lg:grid-cols-7
"

>



<IdentityItem

icon={<CircleDot size={14}/>}

label="Rashi"

value={identity?.rashi}

/>




<IdentityItem

icon={<Sparkles size={14}/>}

label="Sanskrit"

value={
identity?.sanskritName ||
identity?.sanskrit
}

/>




<IdentityItem

icon={<CalendarDays size={14}/>}

label="Birth Dates"

value={identity?.dates}

/>





<IdentityItem

label="Element"

value={identity?.element}

/>





<IdentityItem

label="Planet"

value={identity?.rulingPlanet}

/>





<IdentityItem

label="Energy"

value={identity?.energy}

/>



</div>



</motion.div>





</div>


</section>


);

}









//////////////////////////////////////////////////////////////
// MINI IDENTITY
//////////////////////////////////////////////////////////////


function MiniIdentity({

label,

value,

}:{

label:string;

value?:string;

}){


return (

<div

className="
rounded-full
border
border-[#D4AF37]/30
bg-white/60
px-5
py-2
backdrop-blur
"

>


<span

className="
text-[10px]
uppercase
tracking-widest
text-[#8B5E00]
"

>

{label}

</span>




<span

className="
ml-2
font-bold
text-[#3B2600]
"

>

{value || "-"}

</span>


</div>


);


}









//////////////////////////////////////////////////////////////
// IDENTITY ITEM
//////////////////////////////////////////////////////////////


function IdentityItem({

icon,

label,

value,

}:{

icon?:React.ReactNode;

label:string;

value?:string;

}){


return (

<div>


<div

className="
flex
items-center
gap-2
text-[#8B5E00]
"

>


{icon}



<span

className="
text-[9px]
uppercase
tracking-[0.3em]
"

>

{label}

</span>



</div>





<p

className="
mt-2
font-serif
text-sm
font-bold
text-[#3B2600]
"

>

{value || "-"}

</p>



</div>


);


}









//////////////////////////////////////////////////////////////
// ZODIAC IMAGE MAP
//////////////////////////////////////////////////////////////


function getZodiacImage(sign?:string){


const value =

sign

?.toLowerCase()

.trim();




const map:Record<string,string>={



mesha:"/zodiac/aries.png",
aries:"/zodiac/aries.png",



vrishabha:"/zodiac/taurus.png",
taurus:"/zodiac/taurus.png",



mithuna:"/zodiac/gemini.png",
gemini:"/zodiac/gemini.png",



karka:"/zodiac/cancer.png",
cancer:"/zodiac/cancer.png",



simha:"/zodiac/leo.png",
leo:"/zodiac/leo.png",



kanya:"/zodiac/virgo.png",
virgo:"/zodiac/virgo.png",



tula:"/zodiac/libra.png",
libra:"/zodiac/libra.png",



vrishchika:"/zodiac/scorpio.png",
scorpio:"/zodiac/scorpio.png",



dhanu:"/zodiac/sagittarius.png",
sagittarius:"/zodiac/sagittarius.png",



makara:"/zodiac/capricorn.png",
capricorn:"/zodiac/capricorn.png",



kumbha:"/zodiac/aquarius.png",
aquarius:"/zodiac/aquarius.png",



meena:"/zodiac/pisces.png",
pisces:"/zodiac/pisces.png",



};



return map[value || ""] || "/zodiac/aries.png";


}