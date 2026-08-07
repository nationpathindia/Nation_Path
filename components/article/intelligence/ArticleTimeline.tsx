"use client";

import {
  useState
} from "react";


interface TimelineItem {

  date?: string;

  title:string;

  description?:string;

}



interface ArticleTimelineProps {

  timeline:TimelineItem[];

}



export default function ArticleTimeline({

  timeline,

}:ArticleTimelineProps){



const [expanded,setExpanded] = useState(false);



if(

  !Array.isArray(timeline)

  ||

  timeline.length===0

){

  return null;

}



const visibleTimeline = expanded

?

timeline

:

timeline.slice(0,3);





return (

<div

className="
mx-auto
w-full
md:w-[85%]
relative
"

>





{/* TIMELINE RAIL */}

<div

className="
absolute
left-0
top-2
bottom-8
w-[2px]
bg-[#163C80]
"

/>



<div

className="
absolute
left-2
top-2
bottom-8
w-[1px]
bg-[#163C80]/40
"

/>



<div

className="
absolute
left-4
top-2
bottom-8
w-[1px]
bg-[#163C80]/20
"

/>





{/* EVENTS */}

<div

className="
space-y-5
pl-8
"

>


{

visibleTimeline.map(

(item,index)=>(

<div

key={`${item.title}-${index}`}

className="
relative
rounded-xl
border
border-gray-200
bg-white
px-5
py-4
shadow-sm
transition-all
duration-300
hover:shadow-md
"

>


{/* EVENT DOT */}

<div

className="
absolute
-left-[40px]
top-5
h-3
w-3
rounded-full
bg-[#163C80]
ring-4
ring-white
"

></div>





{

item.date &&

<div

className="
mb-2
inline-flex
rounded-full
border
border-[#163C80]/20
bg-[#F3F7FF]
px-3
py-1
text-[11px]
font-bold
uppercase
tracking-wide
text-[#163C80]
"

>

{item.date}

</div>

}





<h3

className="
text-lg
font-bold
leading-7
text-gray-900
"

>

{item.title}

</h3>





{

item.description &&

<p

className="
mt-2
text-sm
leading-7
text-gray-600
"

>

{item.description}

</p>

}





</div>

)

)

}



</div>







{

timeline.length > 3 &&

<div

className="
mt-8
flex
justify-center
"

>

<button

type="button"

onClick={()=>setExpanded(!expanded)}

className="
rounded-xl
bg-[#163C80]
px-5
py-2.5
text-sm
font-semibold
text-white
shadow-sm
transition-all
duration-300
hover:-translate-y-0.5
hover:bg-[#102e63]
"

>

{

expanded

?

"Show Less Timeline ↑"

:

`View Full Timeline (${timeline.length} Events) →`

}

</button>

</div>

}





</div>

);

}