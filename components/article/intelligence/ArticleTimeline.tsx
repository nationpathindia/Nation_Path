interface TimelineItem {
  date?: string;
  title: string;
  description?: string;
}


interface ArticleTimelineProps {
  timeline: TimelineItem[];
}



export default function ArticleTimeline({

  timeline,

}: ArticleTimelineProps) {


if(
  !Array.isArray(timeline) ||
  timeline.length === 0
){

  return null;

}



return (

<div

className="
relative
space-y-8
"

>


{/* TIMELINE LINE */}

<div

className="
absolute
left-[11px]
top-5
bottom-5
w-[2px]
bg-gradient-to-b
from-[#EA661B]/40
via-[#163C80]/30
to-transparent
"

/>







{

timeline.map((item,index)=>(


<div

key={`${item.title}-${index}`}

className="
relative
pl-10
group
"

>



{/* TIMELINE POINT */}

<div

className="
absolute
left-0
top-5
h-6
w-6
rounded-full
bg-white
border-4
border-[#163C80]
shadow-md
z-10
transition
group-hover:scale-110
"

/>








{/* CARD */}


<div

className="
rounded-2xl
border
border-gray-100
bg-gradient-to-br
from-white
to-[#FAFAF8]
p-5
shadow-sm
transition-all
duration-300

hover:-translate-y-1
hover:shadow-md
"

>




{


item.date &&

<div

className="
mb-3
inline-flex
items-center
rounded-full
bg-[#FFF3EA]
px-3
py-1
text-[11px]
font-bold
uppercase
tracking-[0.18em]
text-[#EA661B]
"

>

{item.date}

</div>

}





<h4

className="
text-lg
font-semibold
tracking-tight
text-[#111827]
"

>

{item.title}

</h4>







{

item.description &&

<p

className="
mt-3
text-sm
leading-7
text-gray-600
"

>

{item.description}

</p>


}





</div>





</div>


))


}



</div>


);

}