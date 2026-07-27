"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO PANCHANG CARD
//
// Premium Vedic Time Intelligence Card
//////////////////////////////////////////////////////////////

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";


interface PanchangCardProps {

title:string;

value:string;

description?:string;

icon:LucideIcon;

}



export default function PanchangCard({

title,

value,

description,

icon:Icon,

}:PanchangCardProps){


return (

<motion.div

whileHover={{
y:-6
}}

transition={{
duration:0.3
}}

className="
group
relative
overflow-hidden
rounded-3xl
border
border-[#D4AF37]/35
bg-gradient-to-b
from-[#FFF9E8]
to-[#F8F1DE]
p-5
shadow-[0_8px_25px_rgba(139,94,0,0.08)]
transition
hover:border-[#D4AF37]
hover:shadow-[0_20px_45px_rgba(139,94,0,0.15)]
"

>


<div

className="
pointer-events-none
absolute
inset-0
bg-gradient-to-br
from-[#D4AF37]/15
via-transparent
to-transparent
opacity-0
transition
duration-500
group-hover:opacity-100
"

/>



<div

className="
relative
flex
items-center
gap-4
"

>


<div

className="
flex
h-12
w-12
shrink-0
items-center
justify-center
rounded-full
border
border-[#D4AF37]/50
bg-[#F8F1DE]
shadow-[0_0_20px_rgba(212,175,55,0.18)]
"

>

<Icon

size={22}

className="text-[#8B5E00]"

/>


</div>




<div>


<p

className="
text-[10px]
font-bold
uppercase
tracking-[0.35em]
text-[#8B5E00]
"

>

{title}

</p>



<h3

className="
mt-1
font-serif
text-lg
font-bold
text-[#3B2600]
"

>

{value}

</h3>


</div>



</div>





{
description && (

<p

className="
relative
mt-5
border-t
border-[#D4AF37]/20
pt-4
text-xs
leading-relaxed
text-[#6B4A16]
"

>

{description}

</p>

)

}



</motion.div>

);


}