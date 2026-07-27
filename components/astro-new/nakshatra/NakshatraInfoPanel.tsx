"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// NAKSHATRA DETAIL PANEL
//
// Purpose:
// Selected Nakshatra Intelligence Display
//
// Role:
// Right side explorer detail view
//
// Not a hero section
// Not a landing card
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";

import {
  Star,
  Crown,
  Sparkles,
  Compass,
} from "lucide-react";



interface NakshatraInfoPanelProps {

name?: string;

deity?: string;

planet?: string;

symbol?: string;

meaning?: string;

}



export default function NakshatraDetailPanel({

name = "Ashwini",

deity = "Ashwini Kumaras",

planet = "Ketu",

symbol = "Horse",

meaning =
"Represents speed, healing energy, courage and the power of new beginnings.",

}: NakshatraInfoPanelProps){



return (

<motion.div

key={name}

initial={{
opacity:0,
y:12,
}}

animate={{
opacity:1,
y:0,
}}

transition={{
duration:0.25,
}}

className="
relative
overflow-hidden
rounded-3xl
border
border-[#D4AF37]/30
bg-[#FFF9E8]
p-6
shadow-[0_20px_50px_rgba(139,94,0,0.08)]
"

>


{/* subtle gold light */}

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




<div className="relative z-10">



{/* STAR IDENTITY */}


<div

className="
text-center
"

>


<div

className="
mx-auto
flex
h-12
w-12
items-center
justify-center
rounded-full
border
border-[#D4AF37]/40
bg-white
"

>

<Star

size={20}

className="text-[#D4AF37]"

/>

</div>




<h2

className="
mt-4
text-3xl
font-semibold
text-[#3B2600]
"

>

{name}

</h2>



<p

className="
mt-1
text-xs
uppercase
tracking-[0.25em]
text-[#8B5E00]
"

>

First Lunar Mansion

</p>



</div>







{/* DIVIDER */}


<div

className="
my-6
h-px
bg-[#D4AF37]/20
"

/>







{/* DETAILS */}



<div

className="
space-y-5
"

>


<InfoRow

icon={<Crown size={15}/>}

label="Presiding Deity"

value={deity}

/>



<InfoRow

icon={<Sparkles size={15}/>}

label="Planetary Ruler"

value={planet}

/>



<InfoRow

icon={<Compass size={15}/>}

label="Sacred Symbol"

value={symbol}

/>



</div>







{/* NATURE */}


<div

className="
mt-6
border-t
border-[#D4AF37]/20
pt-5
"

>


<p

className="
text-xs
uppercase
tracking-[0.25em]
text-[#8B5E00]
"

>

Moon Nature

</p>



<p

className="
mt-3
font-medium
text-[#3B2600]
"

>

Healing · Speed · Courage

</p>


</div>







{/* DESCRIPTION */}



<p

className="
mt-6
text-sm
leading-7
text-[#6B4A16]
"

>

{meaning}

</p>






</div>


</motion.div>


);

}








function InfoRow({

icon,

label,

value,

}:{

icon:React.ReactNode;

label:string;

value:string;

}){


return (

<div

className="
flex
items-start
gap-3
"

>


<div

className="
mt-1
text-[#D4AF37]
"

>

{icon}

</div>



<div>


<p

className="
text-[11px]
uppercase
tracking-[0.2em]
text-[#8B5E00]
"

>

{label}

</p>



<p

className="
mt-1
font-semibold
text-[#3B2600]
"

>

{value}

</p>



</div>



</div>


);

}