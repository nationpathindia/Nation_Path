"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// LAGNA INTELLIGENCE EXPERIENCE
//
// COSMIC CALCULATION EXPERIENCE
//
// Identity:
// The sacred pause before revelation
//
// Future:
// Replace timer with API loading state
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import {
  Compass,
  Sun,
  Sparkles,
} from "lucide-react";



interface LagnaCalculatingProps {

  message?: string;

}





const steps = [

  "Aligning your birth coordinates",

  "Reading the eastern horizon",

  "Discovering your rising identity",

];






export default function LagnaCalculating({

  message =
    "Reading your celestial horizon..."

}: LagnaCalculatingProps) {



return (

<section

className="
relative
overflow-hidden
bg-[#120C08]
px-5
py-20
sm:px-8
lg:px-16
"

>





<div

className="
pointer-events-none
absolute
left-1/2
top-0
h-[400px]
w-[400px]
-translate-x-1/2
rounded-full
bg-[#D4AF37]/20
blur-[130px]
"

/>







<div

className="
relative
z-10
mx-auto
max-w-3xl
text-center
"

>







{/* CENTRAL SYMBOL */}



<motion.div

animate={{

rotate:360

}}

transition={{

duration:25,
repeat:Infinity,
ease:"linear"

}}

className="
mx-auto
flex
h-28
w-28
items-center
justify-center
rounded-full
border
border-[#D4AF37]/40
bg-[#1B120A]
"

>


<Compass

size={45}

strokeWidth={1}

className="
text-[#D4AF37]
"

/>



</motion.div>







<motion.div

animate={{

scale:[1,1.08,1]

}}

transition={{

duration:3,
repeat:Infinity

}}

className="
mx-auto
mt-8
flex
h-20
w-20
items-center
justify-center
rounded-full
bg-[#1B120A]
"

>

<Sun

size={42}

strokeWidth={1}

className="
text-[#D4AF37]
"

/>



</motion.div>









<p

className="
mt-10
text-xs
uppercase
tracking-[0.4em]
text-[#D4AF37]
"

>

NationPath Astro Intelligence

</p>








<h2

className="
mt-5
text-3xl
font-semibold
text-[#FFF9E8]
sm:text-4xl
"

>

{message}

</h2>







<p

className="
mx-auto
mt-4
max-w-xl
leading-8
text-[#D8C59A]
"

>

Ancient Vedic calculations are aligning with your birth moment to reveal your Ascendant blueprint.

</p>









{/* STEPS */}



<div

className="
mx-auto
mt-12
max-w-md
space-y-5
"

>



{

steps.map((step,index)=>(


<motion.div

key={step}

initial={{

opacity:0,
x:-20

}}

animate={{

opacity:1,
x:0

}}

transition={{

duration:0.5,
delay:index*0.5

}}

className="
flex
items-center
gap-4
rounded-2xl
border
border-[#D4AF37]/20
bg-[#1B120A]
px-5
py-4
text-left
"

>


<div

className="
flex
h-8
w-8
items-center
justify-center
rounded-full
bg-[#D4AF37]
text-xs
font-semibold
text-[#120C08]
"

>

{index+1}

</div>





<p

className="
text-sm
text-[#E8D9B5]
"

>

{step}

</p>




</motion.div>



))


}



</div>









<div

className="
mt-10
flex
justify-center
"

>

<Sparkles

size={22}

className="
animate-pulse
text-[#D4AF37]
"

/>


</div>









</div>



</section>


);

}