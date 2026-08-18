"use client";

import {
  ArrowUpRight,
  Globe2,
  Link2,
  Search,
  Share2,
  TrendingUp,
  Users,
} from "lucide-react";

export interface AnalyticsSourceItem {
  id?: string;
  name: string;

  type?:
    | "direct"
    | "search"
    | "social"
    | "referral"
    | string;

  users?: number;
  sessions?: number;
  views?: number;
  percentage?: number;
}

interface AnalyticsSourcePanelProps {
  sources?: AnalyticsSourceItem[];
}


function number(value?:number){
  return Number(value)||0;
}


function compact(value:number){

 if(value>=1000000)
  return `${(value/1000000).toFixed(1)}M`;

 if(value>=1000)
  return `${(value/1000).toFixed(1)}K`;

 return value.toLocaleString("en-IN");
}



function icon(type?:string){

 switch(type){

 case "search":
  return Search;

 case "social":
  return Share2;

 case "referral":
  return Link2;

 default:
  return Globe2;

 }

}



function label(type?:string){

 switch(type){

 case "search":
  return "Search";

 case "social":
  return "Social";

 case "referral":
  return "Referral";

 case "direct":
  return "Direct";

 default:
  return "Other";

 }

}



function badge(type?:string){

 switch(type){

 case "search":
 return "bg-blue-500/10 text-blue-300";


 case "social":
 return "bg-orange-500/10 text-orange-400";


 case "referral":
 return "bg-emerald-500/10 text-emerald-400";


 default:
 return "bg-white/[0.06] text-gray-400";

 }

}



function SourceRow({
source,
index,
totalViews
}:{
source:AnalyticsSourceItem;
index:number;
totalViews:number;
}){


const Icon=icon(source.type);

const views=number(source.views);
const users=number(source.users);
const sessions=number(source.sessions);


const share=
totalViews
?
Math.round((views/totalViews)*100)
:
0;


const quality=
sessions
?
Math.round(
(users/sessions)*100
)
:
0;



return(

<div
className="
group
px-5
py-4
transition
hover:bg-white/[0.025]
"
>


<div className="flex gap-4">


{/* RANK */}

<div
className={`
flex
h-8
w-8
shrink-0
items-center
justify-center
rounded-lg
text-xs
font-bold

${
index===0
?
"bg-orange-500/15 text-orange-400"
:
"bg-white/[0.04] text-gray-500"
}

`}
>

{index+1}

</div>



<div className="flex-1 min-w-0">


<div
className="
flex
justify-between
gap-4
"
>


<div className="min-w-0">


<div
className="
flex
items-center
gap-2
"
>

<Icon
size={15}
className="text-orange-400"
/>


<p
className="
truncate
text-sm
font-semibold
text-gray-100
group-hover:text-white
"
>

{source.name}

</p>


</div>


<div className="mt-2 flex items-center gap-2">

<span
className={`
rounded-md
px-2
py-0.5
text-[10px]
font-medium
${badge(source.type)}
`}
>

{label(source.type)}

</span>


{
index===0 &&
<span
className="
rounded-md
bg-orange-500/10
px-2
py-0.5
text-[10px]
text-orange-400
"
>
Top Source
</span>
}


</div>


</div>



<div className="text-right">

<p className="text-sm font-bold text-white">
{compact(views)}
</p>

<p className="text-[10px] text-gray-600">
views
</p>

</div>


</div>




{/* SHARE BAR */}


<div className="mt-4">


<div
className="
flex
justify-between
text-[10px]
uppercase
tracking-wider
text-gray-600
"
>

<span>
Traffic Share
</span>


<span>
{share}%
</span>


</div>


<div
className="
mt-1.5
h-1.5
overflow-hidden
rounded-full
bg-white/[0.06]
"
>

<div
className="
h-full
rounded-full
bg-orange-500
"
style={{
width:`${share}%`
}}
/>


</div>


</div>




{/* METRICS */}


<div
className="
mt-4
grid
grid-cols-3
gap-3
"
>


<div>

<p className="text-[10px] text-gray-600">
USERS
</p>

<p className="mt-1 text-xs font-semibold text-gray-300">
{compact(users)}
</p>

</div>



<div>

<p className="text-[10px] text-gray-600">
SESSIONS
</p>

<p className="mt-1 text-xs font-semibold text-gray-300">
{compact(sessions)}
</p>

</div>



<div>

<p className="text-[10px] text-gray-600">
QUALITY
</p>

<p className="mt-1 text-xs font-semibold text-gray-300">
{quality}%
</p>

</div>


</div>


</div>


</div>


</div>

)

}



export default function AnalyticsSourcePanel({
sources=[]
}:AnalyticsSourcePanelProps){


const data=sources.slice(0,10);


const totalViews=
data.reduce(
(sum,item)=>
sum+number(item.views),
0
);



return(

<section
className="
overflow-hidden
rounded-2xl
border
border-white/[0.08]
bg-white/[0.035]
"
>


<div
className="
flex
items-center
justify-between
border-b
border-white/[0.06]
px-5
py-5
"
>


<div>

<div className="flex items-center gap-2">

<Globe2
size={17}
className="text-orange-400"
/>

<h2 className="text-lg font-semibold text-white">
Traffic Intelligence
</h2>


</div>


<p className="mt-1 text-sm text-gray-500">
Audience acquisition performance.
</p>


</div>


<TrendingUp
size={18}
className="text-orange-400"
/>


</div>




{
data.length===0 ?


<div
className="
h-48
flex
items-center
justify-center
text-sm
text-gray-500
"
>
No source data available
</div>


:


<div className="divide-y divide-white/[0.06]">

{
data.map(
(source,index)=>(

<SourceRow

key={
source.id ||
index
}

source={source}

index={index}

totalViews={totalViews}

/>

)

)

}

</div>


}




<div
className="
border-t
border-white/[0.06]
px-5
py-3
text-xs
text-gray-600
"
>

Direct • Search • Social • Referral acquisition

</div>


</section>

)

}