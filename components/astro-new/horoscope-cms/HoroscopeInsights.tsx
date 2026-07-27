"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// COSMIC INTELLIGENCE SCANNER
//
// PREMIUM VEDIC EXPERIENCE
//
// CMS ONLY
//////////////////////////////////////////////////////////////

import {
  Sparkles,
  Shield,
  AlertCircle,
  Lightbulb
} from "lucide-react";

import { motion } from "framer-motion";

import type {
  CmsHoroscopeInsights
} from "./types";



interface Props {
  insights: CmsHoroscopeInsights;
}




function SignalBox({

  title,

  subtitle,

  icon: Icon,

  items

}:{

  title:string;

  subtitle:string;

  icon:any;

  items?:string[];

}){


return (

<motion.div

whileHover={{
y:-4
}}

transition={{
type:"spring",
stiffness:220
}}

className="
rounded-[26px]
border
border-[#D4AF37]/25
bg-[#FFF9E8]
p-5
shadow-[0_12px_35px_rgba(139,94,0,.06)]
sm:p-6
"

>


<div

className="
flex
items-center
gap-4
"

>


<div

className="
flex
h-11
w-11
shrink-0
items-center
justify-center
rounded-2xl
border
border-[#D4AF37]/35
bg-[#EFE0BC]
"

>


<Icon

size={20}

className="
text-[#8B5E00]
"

/>


</div>





<div>


<p

className="
text-[9px]
uppercase
tracking-[0.35em]
text-[#8B5E00]
"

>

{subtitle}

</p>



<h3

className="
mt-1
font-serif
text-lg
font-bold
text-[#3B2600]
sm:text-xl
"

>

{title}

</h3>


</div>



</div>





<div

className="
my-5
h-px
bg-[#D4AF37]/20
"

/>






<ul

className="
space-y-3
"

>


{

items?.map((item,index)=>(


<li

key={index}

className="
flex
gap-3
text-sm
leading-6
text-[#6B4A16]
"

>


<span

className="
mt-2
h-1.5
w-1.5
shrink-0
rounded-full
bg-[#D4AF37]
"

/>


{item}


</li>


))

}


</ul>



</motion.div>

);

}









export default function HoroscopeInsights({

insights

}:Props){



return (

<section

className="
px-4
py-8
sm:px-8
lg:px-16
"

>


<div

className="
mx-auto
max-w-6xl
"

>



<div

className="
relative
overflow-hidden
rounded-[34px]
border
border-[#D4AF37]/30
bg-[#F8F1DE]
p-5
shadow-[0_25px_70px_rgba(139,94,0,.10)]
sm:p-9
"

>




{/* COSMIC GLOW */}


<div

className="
absolute
right-[-80px]
top-[-70px]
h-72
w-72
rounded-full
bg-[#D4AF37]/10
blur-[130px]
"

/>



<div

className="
relative
"

>





{/* HEADER */}


<motion.div

initial={{
opacity:0,
y:15
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

className="
flex
items-center
gap-3
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
border
border-[#D4AF37]/30
bg-[#D4AF37]/10
"

>

<Sparkles

size={15}

className="
text-[#8B5E00]
"

/>

</div>





<p

className="
text-[10px]
font-bold
uppercase
tracking-[0.45em]
text-[#8B5E00]
"

>

Astro Intelligence

</p>



</motion.div>







<h2

className="
mt-4
font-serif
text-3xl
font-bold
leading-tight
text-[#3B2600]
sm:text-5xl
"

>

Cosmic Scanner

</h2>






<p

className="
mt-4
max-w-xl
text-sm
leading-7
text-[#6B4A16]
sm:text-base
"

>

Your planetary patterns translated into
daily awareness and guidance.

</p>








<div

className="
mt-7
grid
gap-5
lg:grid-cols-2
"

>


{

insights.strengths &&

<SignalBox

title="Strength Energy"

subtitle="Positive Signals"

icon={Shield}

items={insights.strengths}

/>

}





{

insights.challenges &&

<SignalBox

title="Challenge Zone"

subtitle="Awareness Signals"

icon={AlertCircle}

items={insights.challenges}

/>

}




</div>









{

insights.guidance &&


<motion.div

initial={{
opacity:0,
y:20
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

whileHover={{
y:-3
}}

className="
mt-5
rounded-[28px]
border
border-[#D4AF37]/35
bg-[#EFE0BC]
p-5
sm:p-7
"

>



<div

className="
flex
items-center
gap-3
"

>


<div

className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
bg-[#D4AF37]/15
"

>


<Lightbulb

size={20}

className="
text-[#8B5E00]
"

/>


</div>





<p

className="
text-[10px]
font-bold
uppercase
tracking-[0.35em]
text-[#8B5E00]
"

>

Vedic Guidance

</p>



</div>







<p

className="
mt-5
font-serif
text-lg
leading-8
text-[#5B3A12]
sm:text-xl
sm:leading-9
"

>

{insights.guidance}

</p>




</motion.div>


}









<div

className="
mt-8
flex
items-center
gap-3
"

>


<div

className="
h-px
flex-1
bg-[#D4AF37]/20
"

/>



<p

className="
text-center
text-[9px]
uppercase
tracking-[0.35em]
text-[#8B5E00]
"

>

NationPath Astro Intelligence

</p>



<div

className="
h-px
flex-1
bg-[#D4AF37]/20
"

/>



</div>





</div>


</div>


</div>


</section>

);


}