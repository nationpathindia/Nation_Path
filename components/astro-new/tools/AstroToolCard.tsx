"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO TOOL CARD
//
// Premium Astrology Intelligence Tool
//////////////////////////////////////////////////////////////

import Link from "next/link";
import { motion } from "framer-motion";
import {
  LucideIcon,
  ArrowRight,
} from "lucide-react";



interface AstroToolCardProps {

title:string;

description:string;

icon:LucideIcon;

href:string;

tag:string;

}




export default function AstroToolCard({

title,

description,

icon:Icon,

href,

tag,

}:AstroToolCardProps){



return (

<motion.div

whileHover={{
y:-8
}}

whileTap={{
scale:0.98
}}

transition={{
duration:0.3
}}

className="h-full"

>


<Link

href={href}

className="
group
relative
block
h-full
overflow-hidden
rounded-3xl
border
border-[#D4AF37]/40
bg-gradient-to-b
from-[#FFF9E8]
to-[#F8F1DE]
p-6
shadow-[0_10px_30px_rgba(139,94,0,0.08)]
transition
duration-500
hover:border-[#D4AF37]
hover:shadow-[0_25px_55px_rgba(139,94,0,0.18)]
"

>


{/* GOLD ENERGY */}

<div

className="
pointer-events-none
absolute
right-0
top-0
h-40
w-40
rounded-full
bg-[#D4AF37]/15
blur-3xl
"

/>




<div

className="
pointer-events-none
absolute
inset-2
rounded-2xl
border
border-[#D4AF37]/10
"

/>







{/* TOP AREA */}


<div

className="
relative
flex
items-start
justify-between
"

>



<div

className="
flex
h-14
w-14
items-center
justify-center
rounded-2xl
border
border-[#D4AF37]/50
bg-[#F8F1DE]
shadow-[0_0_25px_rgba(212,175,55,0.2)]
"

>


<Icon

size={26}

className="
text-[#8B5E00]
transition
duration-300
group-hover:scale-110
"

/>


</div>






<span

className="
rounded-full
border
border-[#D4AF37]/40
bg-[#FFF9E8]
px-3
py-1
text-[10px]
font-bold
uppercase
tracking-[0.3em]
text-[#8B5E00]
"

>

{tag}

</span>



</div>








{/* CONTENT */}



<h3

className="
relative
mt-7
font-serif
text-xl
font-bold
text-[#3B2600]
"

>

{title}

</h3>





<p

className="
relative
mt-3
text-sm
leading-relaxed
text-[#6B4A16]
"

>

{description}

</p>








{/* CTA */}



<div

className="
relative
mt-7
flex
items-center
justify-between
border-t
border-[#D4AF37]/20
pt-5
"

>


<span

className="
text-xs
font-bold
uppercase
tracking-[0.25em]
text-[#8B5E00]
"

>

Explore Tool

</span>




<div

className="
flex
h-8
w-8
items-center
justify-center
rounded-full
border
border-[#D4AF37]/40
transition
group-hover:bg-[#120C08]
"

>


<ArrowRight

size={15}

className="
text-[#8B5E00]
transition
group-hover:text-[#FFF9E8]
group-hover:translate-x-1
"

/>


</div>



</div>





</Link>


</motion.div>


);


}