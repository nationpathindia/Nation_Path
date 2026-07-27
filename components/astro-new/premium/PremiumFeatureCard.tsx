"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO PREMIUM FEATURE CARD
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";


interface PremiumFeatureCardProps {

title:string;

description:string;

icon:LucideIcon;

}



export default function PremiumFeatureCard({

title,

description,

icon:Icon,

}:PremiumFeatureCardProps){


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
rounded-3xl
border
border-[#D4AF37]/30
bg-[#FFF9E8]/5
p-5
backdrop-blur-sm
transition
hover:border-[#D4AF37]/80
hover:bg-[#FFF9E8]/10
"

>


<div

className="
flex
h-12
w-12
items-center
justify-center
rounded-full
border
border-[#D4AF37]/50
bg-[#D4AF37]/10
"

>


<Icon

size={22}

className="
text-[#D4AF37]
transition
group-hover:scale-110
"

/>


</div>





<h3

className="
mt-5
font-serif
text-lg
font-bold
text-[#FFF9E8]
"

>

{title}

</h3>






<p

className="
mt-3
text-sm
leading-relaxed
text-[#C8A96A]
"

>

{description}

</p>




</motion.div>


);


}