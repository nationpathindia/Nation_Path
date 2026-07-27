"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH VIKRAM SAMVAT CARD
//
// Traditional Indian Calendar Identity
//////////////////////////////////////////////////////////////

import { CalendarDays, Sparkles } from "lucide-react";
import { motion } from "framer-motion";


export default function VikramSamvatCard(){


return (

<motion.div

whileHover={{
y:-6
}}

transition={{
duration:0.3
}}

className="
relative
overflow-hidden
rounded-3xl
border
border-[#D4AF37]/50
bg-[#120C08]
p-6
text-[#FFF9E8]
shadow-[0_20px_50px_rgba(18,12,8,0.25)]
"

>


<div

className="
absolute
right-0
top-0
h-52
w-52
rounded-full
bg-[#D4AF37]/20
blur-3xl
"

/>



<div

className="
relative
"

>


<div

className="
flex
items-center
justify-between
"

>

<CalendarDays

size={28}

className="text-[#D4AF37]"

/>



<div

className="
rounded-full
border
border-[#D4AF37]/40
px-3
py-1
"

>

<p

className="
text-[9px]
uppercase
tracking-[0.3em]
text-[#D4AF37]
"

>

Current Era

</p>

</div>


</div>





<h2

className="
mt-5
font-serif
text-2xl
font-bold
"

>

Vikram Samvat 2083

</h2>




<div

className="
my-5
h-px
bg-[#D4AF37]/30
"

/>






<div

className="
grid
grid-cols-2
gap-5
"

>


<div>

<p className="
text-[10px]
uppercase
tracking-widest
text-[#C8A96A]
">

Month

</p>


<p className="mt-1 font-bold">

Ashadha

</p>

</div>




<div>

<p className="
text-[10px]
uppercase
tracking-widest
text-[#C8A96A]
">

Paksha

</p>


<p className="mt-1 font-bold">

Shukla

</p>

</div>



</div>






<p

className="
mt-6
flex
gap-2
text-sm
text-[#E8D6A3]
"

>

<Sparkles size={16}/>

Ancient calendar wisdom powered by Astro Intelligence.

</p>


</div>


</motion.div>


);


}