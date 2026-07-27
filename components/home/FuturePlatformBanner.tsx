"use client";


//////////////////////////////////////////////////////////////
// NATIONPATH KIDS
//
// FUTURE LEARNING UNIVERSE
//
// PREMIUM HOMEPAGE MODULE
//
// THEME DRIVEN
//////////////////////////////////////////////////////////////


import { motion } from "framer-motion";

import {
  Globe2,
  Brain,
  BookOpen,
  Bot,
  Palette,
  Rocket,
  Sparkles,
  ArrowRight,
  Star
} from "lucide-react";






const features = [


{
icon:Globe2,
title:"World Explorer",
text:"Countries, cultures & discoveries",
color:"bg-sky-500"
},



{
icon:Brain,
title:"Smart Learning",
text:"Science, maths & logic",
color:"bg-yellow-500"
},



{
icon:BookOpen,
title:"Story Universe",
text:"Stories & imagination",
color:"bg-purple-500"
},



{
icon:Bot,
title:"AI Companion",
text:"Personal learning guide",
color:"bg-green-500"
},



{
icon:Palette,
title:"Creative Studio",
text:"Art & expression",
color:"bg-pink-500"
},



{
icon:Rocket,
title:"Future Skills",
text:"AI, coding & communication",
color:"bg-blue-600"
}



];









export default function FuturePlatformBanner(){



return (


<section


className="
kids-theme
relative
overflow-hidden
rounded-[40px]
border
border-[var(--kids-border)]
bg-[var(--kids-background)]
p-5
shadow-[var(--kids-shadow)]
sm:p-8
lg:p-10
"


>







{/* BACKGROUND GLOW */}



<div

className="
absolute
right-[-120px]
top-[-120px]
h-[350px]
w-[350px]
rounded-full
bg-[var(--kids-sky)]
opacity-30
blur-[130px]
"

/>





<div

className="
absolute
bottom-[-120px]
left-[-120px]
h-[320px]
w-[320px]
rounded-full
bg-[var(--kids-yellow)]
opacity-30
blur-[120px]
"

/>





<div

className="
absolute
left-1/2
top-[-80px]
h-[220px]
w-[220px]
-translate-x-1/2
rounded-full
bg-[var(--kids-purple)]
opacity-20
blur-[100px]
"

/>








<div

className="
relative
"

>









{/* HEADER */}



<div

className="
flex
flex-col
gap-6
lg:flex-row
lg:items-center
lg:justify-between
"

>





<div

className="
max-w-xl
"

>






<div

className="
inline-flex
items-center
gap-2
rounded-full
border
border-[var(--kids-primary)]
bg-white/80
px-4
py-2
text-[10px]
font-bold
uppercase
tracking-[0.35em]
text-[var(--kids-primary)]
"

>


<Sparkles size={14}/>


Future Learning Platform


</div>








<h2

className="
mt-5
font-serif
text-3xl
font-bold
leading-tight
text-[var(--kids-heading)]
sm:text-4xl
"

>


NationPath Kids


<span

className="
block
text-[var(--kids-primary)]
"

>

Learning Universe

</span>


</h2>








<p

className="
mt-4
text-sm
leading-7
text-[var(--kids-text)]
sm:text-base
"

>


A future learning ecosystem where children
explore knowledge, build creativity and develop
future-ready skills through intelligent learning.


</p>




</div>









{/* COMING SOON */}



<motion.div


whileHover={{

y:-6

}}



className="
rounded-[30px]
border
border-[var(--kids-border)]
bg-white/80
p-5
text-center
shadow-lg
backdrop-blur
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
bg-[var(--kids-primary)]
text-white
"

>


<Star size={20}/>


</div>





<p

className="
mt-3
text-[10px]
font-bold
uppercase
tracking-[0.35em]
text-[var(--kids-primary)]
"

>

Coming Soon


</p>





<p

className="
mt-2
font-semibold
text-[var(--kids-heading)]
"

>

Learn • Explore • Create

</p>



</motion.div>






</div>












{/* FEATURES */}



<div

className="
mt-8
grid
grid-cols-2
gap-3
sm:grid-cols-3
lg:grid-cols-6
"

>





{

features.map((item,index)=>{


const Icon=item.icon;



return (



<motion.div


key={item.title}


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

delay:index*0.05

}}



whileHover={{

y:-8

}}



className="
group
relative
overflow-hidden
rounded-[24px]
border
border-[var(--kids-border)]
bg-white/80
p-4
text-center
backdrop-blur
transition
"

>







<div

className="
absolute
inset-0
bg-[var(--kids-sky)]
opacity-0
transition
group-hover:opacity-10
"

/>






<div

className="
relative
"

>





<div

className={`
mx-auto
flex
h-11
w-11
items-center
justify-center
rounded-2xl
text-white
shadow-lg
transition
group-hover:scale-110
${item.color}
`}

>

<Icon size={20}/>


</div>







<h3

className="
mt-3
text-xs
font-bold
text-[var(--kids-heading)]
"

>

{item.title}


</h3>







<p

className="
mt-1
hidden
text-[10px]
leading-4
text-[var(--kids-muted)]
sm:block
"

>

{item.text}


</p>






</div>





</motion.div>



)


})


}



</div>












{/* CTA */}



<div

className="
mt-8
flex
justify-center
"

>



<button


className="
group
inline-flex
items-center
gap-3
rounded-full
bg-[var(--kids-primary)]
px-7
py-3
text-sm
font-bold
text-white
shadow-xl
transition
hover:scale-105
"

>


Explore Future Platform



<ArrowRight

size={17}

className="
transition
group-hover:translate-x-1
"

/>



</button>



</div>







</div>






</section>


);


}