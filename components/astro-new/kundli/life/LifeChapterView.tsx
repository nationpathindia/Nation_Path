"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// KUNDLI INTELLIGENCE EXPERIENCE
//
// LIFE CHAPTER VIEW
//
// Open Cosmic Book Chapter
//////////////////////////////////////////////////////////////

import { motion } from "framer-motion";
import {
  Sparkles,
  Orbit,
  Home,
  Star,
} from "lucide-react";

import type { LifeChapter } from "./lifeData";


interface Props {

  chapter: LifeChapter;

}



export default function LifeChapterView({
  chapter,
}:Props){


return (

<motion.div

initial={{
 opacity:0,
 rotateY:-12,
 x:40
}}

animate={{
 opacity:1,
 rotateY:0,
 x:0
}}

transition={{
 duration:.6
}}

className="
relative
overflow-hidden
rounded-[34px]
border
border-[#D4AF37]/40
bg-[#1B120A]
p-6
text-[#F8F1DE]
shadow-[0_30px_90px_rgba(139,94,0,0.25)]
md:p-10
"

>


{/* Glow */}

<div

className="
pointer-events-none
absolute
right-0
top-0
h-72
w-72
rounded-full
bg-[#D4AF37]/10
blur-[120px]
"

/>





<div

className="
relative
grid
gap-8
md:grid-cols-2
"

>





{/* LEFT PAGE */}

<div>


<p

className="
text-xs
uppercase
tracking-[0.4em]
text-[#D4AF37]
"

>

Chapter {chapter.chapter}

</p>



<h2

className="
mt-4
font-serif
text-4xl
"

>

{chapter.title}

</h2>




<p

className="
mt-2
text-[#C9B58A]
"

>

{chapter.subtitle}

</p>





<div

className="
mt-8
border-t
border-[#D4AF37]/25
pt-6
"

>


<p

className="
text-sm
leading-relaxed
text-[#F8F1DE]
"

>

{chapter.description}

</p>



</div>





<div

className="
mt-6
flex
items-center
gap-2
text-sm
text-[#D4AF37]
"

>

<Sparkles size={16}/>

{chapter.insight}

</div>



</div>










{/* RIGHT PAGE */}

<div

className="
space-y-5
"

>





<div

className="
rounded-2xl
border
border-[#D4AF37]/25
bg-[#120C08]
p-5
"

>


<div

className="
flex
items-center
gap-2
text-xs
uppercase
tracking-wider
text-[#D4AF37]
"

>

<Orbit size={14}/>

Planet Influence

</div>



<div

className="
mt-4
flex
flex-wrap
gap-3
"

>

{
chapter.planets.map((planet)=>(


<span

key={planet}

className="
rounded-full
border
border-[#D4AF37]/30
px-4
py-2
text-sm
text-[#F8F1DE]
"

>

{planet}

</span>


))
}

</div>


</div>









<div

className="
rounded-2xl
border
border-[#D4AF37]/25
bg-[#120C08]
p-5
"

>


<div

className="
flex
items-center
gap-2
text-xs
uppercase
tracking-wider
text-[#D4AF37]
"

>

<Home size={14}/>

Life Chambers

</div>



<div

className="
mt-4
flex
flex-wrap
gap-3
"

>

{
chapter.houses.map((house)=>(


<span

key={house}

className="
rounded-full
border
border-[#D4AF37]/30
px-4
py-2
text-sm
text-[#F8F1DE]
"

>

{house}

</span>


))
}


</div>


</div>









<div

className="
rounded-2xl
border
border-[#D4AF37]/25
bg-[#120C08]
p-5
"

>

<div

className="
flex
items-center
gap-2
text-xs
uppercase
tracking-wider
text-[#D4AF37]
"

>

<Star size={14}/>

Core Themes

</div>



<p

className="
mt-4
text-sm
leading-relaxed
text-[#C9B58A]
"

>

{chapter.theme.join(" • ")}

</p>



</div>





</div>



</div>




</motion.div>

);

}