"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// NAKSHATRA CONSTELLATION CARD
//
// Premium 27 Lunar Star Selector
//
// Ancient Star Archive Experience
//////////////////////////////////////////////////////////////

import { Star } from "lucide-react";


interface NakshatraCardProps {

  name:string;

  planet:string;

  active?:boolean;

  onClick?:()=>void;

}



export default function NakshatraCard({

  name,

  planet,

  active=false,

  onClick,

}:NakshatraCardProps){


return (

<button

type="button"

onClick={onClick}

className={`
group
relative
flex
min-h-[92px]
w-full
flex-col
items-center
justify-center
overflow-hidden
rounded-2xl
border
transition-all
duration-300
active:scale-95

${
active

?

`
border-[#D4AF37]
bg-[#24170D]
shadow-[0_0_35px_rgba(212,175,55,0.25)]
`

:

`
border-[#D4AF37]/25
bg-[#1B120A]
hover:-translate-y-1
hover:border-[#D4AF37]/70
hover:bg-[#24170D]
`

}

`}

>





{/* GOLD CONSTELLATION AURA */}

<div

className="
pointer-events-none
absolute
right-[-20px]
top-[-20px]
h-24
w-24
rounded-full
bg-gradient-to-br
from-[#D4AF37]/25
via-[#8B5E00]/20
to-transparent
blur-2xl
"

/>





{/* ACTIVE GOLD CROWN LINE */}

{

active &&

<div

className="
absolute
left-5
right-5
top-0
h-[2px]
bg-gradient-to-r
from-transparent
via-[#D4AF37]
to-transparent
"

/>

}







<div

className="
relative
z-10
flex
flex-col
items-center
"

>





{/* STAR ICON */}

<div

className={`
flex
h-9
w-9
items-center
justify-center
rounded-full
border
transition-all
duration-300

${
active

?

`
scale-110
border-[#D4AF37]
bg-[#8B5E00]/30
`

:

`
border-[#D4AF37]/40
bg-[#120C08]
group-hover:border-[#D4AF37]
`

}

`}

>


<Star

size={15}

strokeWidth={2}

className="
text-[#D4AF37]
"

/>


</div>









{/* NAME */}

<p

className="
mt-2
max-w-[90px]
truncate
px-1
text-center
text-[11px]
font-semibold
leading-tight
tracking-wide
text-[#FFF9E8]
"

>

{name}

</p>







{/* PLANET */}

<p

className="
mt-1
text-[9px]
uppercase
tracking-[0.22em]
text-[#D4AF37]
"

>

{planet}

</p>



</div>








{/* HOVER LIGHT */}

<div

className="
pointer-events-none
absolute
inset-0
bg-gradient-to-t
from-[#D4AF37]/10
to-transparent
opacity-0
transition-opacity
duration-300
group-hover:opacity-100
"

/>




</button>


);

}