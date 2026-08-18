"use client";

import {
  Activity,
  BookOpen,
  Eye,
  Heart,
  MousePointerClick,
  Share2,
  Users,
} from "lucide-react";


export interface AnalyticsEngagementPanelData {
  views?: number;
  opens?: number;
  reads?: number;
  shares?: number;
  reactions?: number;
  likes?: number;
  uniqueUsers?: number;
  uniqueSessions?: number;
}


interface Props {
  data?: AnalyticsEngagementPanelData;
}



function number(value?:number){
  return Number(value)||0;
}



function rate(
 value:number,
 total:number
){
 if(!total) return 0;

 return Math.min(
 100,
 Math.round((value/total)*100)
 );
}



const styles = {

orange:{
 icon:"text-orange-400 bg-orange-500/10",
 bar:"bg-orange-500"
},

green:{
 icon:"text-emerald-400 bg-emerald-500/10",
 bar:"bg-emerald-500"
},

blue:{
 icon:"text-blue-300 bg-blue-500/10",
 bar:"bg-blue-400"
}

};



function Metric({
 label,
 value,
 icon:Icon,
 percent,
 color="orange"
}:{
 label:string;
 value:number;
 icon:any;
 percent?:number;
 color?:keyof typeof styles;
}){


const style=styles[color];


return (

<div
className="
rounded-xl
border
border-white/[0.07]
bg-black/20
px-4
py-3
transition
hover:border-white/15
"
>


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
uppercase
tracking-widest
text-gray-600
"
>

{label}

</p>


<p
className="
mt-1
text-xl
font-semibold
text-white
"
>

{value.toLocaleString()}

</p>

</div>



<div
className={`
flex
h-7
w-7
items-center
justify-center
rounded-lg
${style.icon}
`}
>

<Icon
size={14}
/>

</div>


</div>



{
typeof percent==="number" &&

<div
className="
mt-3
"
>


<div
className="
flex
justify-between
text-[10px]
text-gray-600
"
>

<span>
Rate
</span>

<span>
{percent}%
</span>

</div>


<div
className="
mt-1
h-1
overflow-hidden
rounded-full
bg-white/[0.06]
"
>

<div
className={`
h-full
rounded-full
${style.bar}
`}
style={{
width:`${percent}%`
}}
/>

</div>


</div>

}



</div>

);

}






export default function AnalyticsEngagementPanel({
data
}:Props){


const views=number(data?.views);
const reads=number(data?.reads);
const opens=number(data?.opens);
const shares=number(data?.shares);
const reactions=number(data?.reactions);
const likes=number(data?.likes);

const users=number(data?.uniqueUsers);
const sessions=number(data?.uniqueSessions);


const total=
opens+
reads+
shares+
reactions+
likes;


const readRate=rate(reads,views);
const shareRate=rate(shares,views);
const reactionRate=rate(
reactions+likes,
views
);



return (

<section
className="
overflow-hidden
rounded-2xl
border
border-white/[0.08]
bg-white/[0.035]
"
>


{/* HEADER */}

<div
className="
border-b
border-white/[0.06]
px-5
py-4
"
>


<div
className="
flex
items-center
gap-2
"
>

<Activity
size={15}
className="text-orange-400"
/>


<h2
className="
text-base
font-semibold
text-white
"
>

Engagement Intelligence

</h2>


</div>


<p
className="
mt-1
text-xs
text-gray-500
"
>

Visitor behaviour and content interaction quality

</p>


</div>





{/* MAIN */}

<div
className="
grid
gap-3
p-5
sm:grid-cols-2
xl:grid-cols-4
"
>


<Metric
label="Views"
value={views}
icon={Eye}
percent={100}
/>


<Metric
label="Reads"
value={reads}
icon={BookOpen}
percent={readRate}
color="green"
/>


<Metric
label="Shares"
value={shares}
icon={Share2}
percent={shareRate}
/>


<Metric
label="Reactions"
value={reactions+likes}
icon={Heart}
percent={reactionRate}
color="blue"
/>



</div>





{/* SECONDARY */}

<div
className="
grid
gap-3
border-t
border-white/[0.06]
p-5
sm:grid-cols-3
"
>


<div
className="
rounded-xl
bg-white/[0.025]
px-4
py-3
"
>

<div className="flex items-center gap-2">

<MousePointerClick
size={13}
className="text-gray-500"
/>

<span className="text-xs text-gray-500">
Opens
</span>

</div>


<p
className="
mt-2
text-lg
font-semibold
text-white
"
>

{opens.toLocaleString()}

</p>


</div>





<div
className="
rounded-xl
bg-white/[0.025]
px-4
py-3
"
>


<div className="flex items-center gap-2">

<Users
size={13}
className="text-gray-500"
/>

<span className="text-xs text-gray-500">
Users
</span>

</div>


<p
className="
mt-2
text-lg
font-semibold
text-white
"
>

{users.toLocaleString()}

</p>


</div>





<div
className="
rounded-xl
bg-white/[0.025]
px-4
py-3
"
>


<div className="flex items-center gap-2">

<Activity
size={13}
className="text-gray-500"
/>

<span className="text-xs text-gray-500">
Sessions
</span>

</div>


<p
className="
mt-2
text-lg
font-semibold
text-white
"
>

{sessions.toLocaleString()}

</p>


</div>



</div>






{/* FOOTER */}

<div
className="
flex
items-center
justify-between
border-t
border-white/[0.06]
px-5
py-3
"
>


<div>

<p
className="
text-xs
text-gray-400
"
>

Meaningful Interactions

</p>

<p
className="
text-[10px]
text-gray-600
"
>

Reads + Shares + Reactions

</p>

</div>


<p
className="
text-lg
font-bold
text-white
"
>

{total.toLocaleString()}

</p>


</div>



</section>

);

}