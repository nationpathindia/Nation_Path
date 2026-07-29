"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


interface ArticleAISummaryProps {

  categoryName:string;

  summary?:{

    overview?:string;

    impact?:string;

    perspective?:string;

    takeaway?:string;

  };

}




export default function ArticleAISummary({

categoryName,

summary,

}:ArticleAISummaryProps){



const insights = [


{

label:"AI PERSPECTIVE",

icon:"◈",

text:

summary?.overview ||

"Understanding the deeper context behind this development."

},



{

label:"READER IMPACT",

icon:"◉",

text:

summary?.impact ||

"Understanding the possible impact of this story."

},



{

label:"KEY INTELLIGENCE",

icon:"◆",

text:

summary?.perspective ||

summary?.takeaway ||

summary?.overview ||

"The essential insight readers should remember."

}


];







const [active,setActive]=useState(0);

const [compact,setCompact]=useState(false);








useEffect(()=>{


let timer:any;



if(!compact){


timer=setInterval(()=>{


setActive(prev=>{


if(prev===insights.length-1){


setCompact(true);


return 0;


}


return prev+1;


});


},5000);



}

else{


timer=setTimeout(()=>{


setCompact(false);

setActive(0);



},10000);



}



return ()=>clearTimeout(timer);



},[compact]);








return (


<section

className="
relative
my-10

overflow-hidden

rounded-xl

border
border-[#163C80]/40

bg-[#163C80]/10

backdrop-blur-md

px-5
py-5

sm:px-6
sm:py-6

shadow-lg

"

>







{/* ACCENT LINE */}

<div

className="
absolute
top-0
left-0

h-[2px]

w-full

overflow-hidden

"

>

<div

className="
h-full
w-1/3

bg-[#EA661B]

animate-[slide_3s_linear_infinite]

"

/>

</div>









{/* SOFT GLOW */}


<div

className="
absolute
-right-20
-top-20

h-52
w-52

rounded-full

bg-[#EA661B]/15

blur-3xl

"

/>







<div className="relative">







{/* HEADER */}


<div

className="
flex

items-center

justify-between

"

>





<div>



<p

className="
text-[10px]

tracking-[0.35em]

uppercase

font-bold

text-[#EA661B]

"

>

NationPath AI Intelligence

</p>







<h2

className="
mt-2

text-xl

font-serif

font-bold

text-[#111]

"

>

Beyond The Headline

</h2>







<p

className="
mt-1

text-xs

text-gray-600

"

>

AI analysis of this {categoryName} story

</p>



</div>









<div

className="
rounded-full

border

border-[#163C80]/30

bg-[#163C80]/10

px-3

py-1

text-[10px]

font-semibold

text-[#163C80]

"

>

AI ASSISTED

</div>





</div>













{/* CONTENT AREA */}


<div

className="
mt-5

h-[170px]

rounded-xl

border

border-black/10

bg-white/[0.45]

p-5

overflow-hidden

"

>





<AnimatePresence mode="wait">





{

compact ?





<motion.div

key="compact"

initial={{

opacity:0

}}

animate={{

opacity:1

}}

transition={{

duration:.5

}}

className="
grid

grid-cols-3

gap-3

h-full

items-center

"

>



{


insights.map((item,index)=>(



<div

key={index}

className="
rounded-xl

border

border-black/10

bg-white/[0.55]

p-3

h-[110px]

"

>





<p

className="
text-[9px]

tracking-widest

text-[#EA661B]

font-bold

"

>

{item.label}

</p>







<p

className="
mt-2

text-xs

leading-relaxed

text-gray-600

line-clamp-4

"

>

{item.text}

</p>





</div>



))



}



</motion.div>






:







<motion.div

key={active}

initial={{

opacity:0,

y:15

}}

animate={{

opacity:1,

y:0

}}

exit={{

opacity:0,

y:-15

}}

transition={{

duration:.4

}}

className="
h-full

"

>






<div

className="
flex

items-center

gap-3

"

>





<span

className="
text-xl

text-[#EA661B]

"

>

{insights[active].icon}

</span>







<p

className="
text-xs

font-bold

tracking-[0.25em]

text-[#163C80]

"

>

{insights[active].label}

</p>






</div>







<p

className="
mt-4

text-sm

leading-relaxed

text-gray-600

"

>

{insights[active].text}

</p>







</motion.div>



}





</AnimatePresence>





</div>









{/* INDICATORS */}


<div

className="
mt-4

flex

justify-center

gap-2

"

>



{


[0,1,2].map(index=>(



<span

key={index}

className={`

h-1.5

rounded-full

transition-all


${

active===index && !compact

?

"w-8 bg-[#EA661B]"

:

"w-2 bg-[#163C80]/30"

}

`}

/>



))


}



</div>







</div>






</section>


);


}