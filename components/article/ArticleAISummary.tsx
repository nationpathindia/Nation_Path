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
rounded-3xl
border
border-[#D4AF37]/30
bg-[#08111F]
p-5
shadow-xl
"

>



<div

className="
absolute
-right-20
-top-20
h-52
w-52
rounded-full
bg-[#D4AF37]/20
blur-3xl
"

/>






<div className="relative">





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
text-[#D4AF37]
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
text-white
"

>

Beyond The Headline

</h2>





<p

className="
text-xs
text-gray-400
mt-1
"

>

AI analysis of this {categoryName} story

</p>



</div>







<div

className="
rounded-full
border
border-green-400/30
bg-green-400/10
px-3
py-1
text-[10px]
text-green-300
"

>

AI ASSISTED

</div>



</div>









<div

className="
mt-5
h-[170px]
rounded-2xl
border
border-white/10
bg-white/[0.04]
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
border-white/10
bg-white/[0.05]
p-3
h-[110px]
"

>



<p

className="
text-[9px]
tracking-widest
text-[#D4AF37]
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
text-gray-300
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
text-[#D4AF37]
"

>

{insights[active].icon}

</span>





<p

className="
text-xs
font-bold
tracking-[0.25em]
text-[#D4AF37]
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
text-gray-300
"

>

{insights[active].text}

</p>





</motion.div>



}



</AnimatePresence>



</div>









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

"w-8 bg-[#D4AF37]"

:

"w-2 bg-white/30"

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