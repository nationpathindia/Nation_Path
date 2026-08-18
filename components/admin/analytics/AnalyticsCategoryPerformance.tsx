"use client";

import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Eye,
  FolderTree,
  Flame,
  Share2,
  TrendingUp,
  Users,
} from "lucide-react";


export interface AnalyticsCategoryItem {

  id:string;

  name:string;

  views?:number;

  reads?:number;

  shares?:number;

  events?:number;

  users?:number;

  growth?:number;

  score?:number;

  percentage?:number;

}



interface AnalyticsCategoryPerformanceProps{

 categories?:AnalyticsCategoryItem[];

}



function number(value?:number){

 return Number(value)||0;

}



function score(item:AnalyticsCategoryItem){

 if(typeof item.score==="number")
 return item.score;


 return (
  number(item.views)
  +
  number(item.reads)*2
  +
  number(item.shares)*4
 );

}



function engagementRate(item:AnalyticsCategoryItem){

 const views=number(item.views);

 if(!views)
 return 0;


 return Math.round(
 (
 (
 number(item.reads)
 +
 number(item.shares)
 )
 /
 views
 )
 *100
 );

}



function growthLabel(value:number){

 if(value>=50)
 return "Explosive";

 if(value>=20)
 return "Growing";

 if(value>0)
 return "Rising";

 return "Stable";

}



function growthClass(value:number){

 if(value>=50)
 return "text-emerald-400";


 if(value>0)
 return "text-[#EA661B]";


 return "text-gray-500";

}



function CategoryMetric({
icon:Icon,
label,
value
}:{
icon:any;
label:string;
value:number|string;
}){


return(

<div className="
rounded-lg
bg-white/[0.025]
border
border-white/[0.05]
p-3
">

<div className="
flex
items-center
gap-2
">

<Icon
size={13}
className="text-gray-500"
/>


<span className="
text-[10px]
uppercase
tracking-wide
text-gray-600
">
{label}
</span>

</div>


<p className="
mt-2
text-sm
font-semibold
text-white
">

{value}

</p>


</div>

)

}




function CategoryRow({
item,
index,
maxScore
}:{
item:AnalyticsCategoryItem;
index:number;
maxScore:number;
}){


const views=number(item.views);

const reads=number(item.reads);

const shares=number(item.shares);

const users=number(item.users);


const performance=score(item);


const rate=
engagementRate(item);



const width=
maxScore
?
(performance/maxScore)*100
:
0;



return(

<div
className="
group
px-5
py-5
transition
hover:bg-white/[0.025]
"
>


<div className="
flex
gap-4
">


<div>

<div
className={`
h-9
w-9
rounded-xl
flex
items-center
justify-center
text-xs
font-bold
${
index===0
?
"bg-orange-500/10 text-orange-400"
:
"bg-white/[0.04] text-gray-500"
}
`}
>

{
index===0
?
<Flame size={14}/>
:
index+1
}

</div>

</div>



<div className="
flex-1
min-w-0
">


<div className="
flex
justify-between
gap-4
">


<div>


<div className="
flex
items-center
gap-2
">


<h3 className="
text-sm
font-semibold
text-gray-100
group-hover:text-white
">

{item.name}

</h3>


<ArrowUpRight
size={13}
className="
text-gray-600
"
/>


</div>



<div className="
mt-1
flex
items-center
gap-2
">


<span className="
text-xs
text-gray-600
">

{growthLabel(item.growth||0)}

</span>


<span className="
text-gray-700
">
•
</span>


<span
className={`
text-xs
font-medium
${growthClass(item.growth||0)}
`}
>

+{item.growth||0}%

</span>


</div>


</div>



<div className="text-right">


<p className="
text-sm
font-bold
text-white
">

{performance.toLocaleString()}

</p>


<p className="
text-[10px]
text-gray-600
">

score

</p>


</div>


</div>




<div className="mt-4">


<div className="
flex
justify-between
text-[10px]
text-gray-600
">

<span>
Category impact
</span>


<span>
{Math.round(width)}%
</span>


</div>



<div className="
mt-2
h-1.5
rounded-full
bg-white/[0.06]
overflow-hidden
">


<div
className="
h-full
rounded-full
bg-[#EA661B]
"
style={{
width:`${Math.min(100,width)}%`
}}
/>


</div>


</div>




<div className="
mt-4
grid
grid-cols-2
gap-3
sm:grid-cols-5
">


<CategoryMetric
icon={Eye}
label="Views"
value={views.toLocaleString()}
/>


<CategoryMetric
icon={BookOpen}
label="Reads"
value={reads.toLocaleString()}
/>


<CategoryMetric
icon={Share2}
label="Shares"
value={shares.toLocaleString()}
/>


<CategoryMetric
icon={Users}
label="Users"
value={users.toLocaleString()}
/>


<CategoryMetric
icon={BarChart3}
label="Engage"
value={`${rate}%`}
/>


</div>


</div>


</div>


</div>

)

}




export default function AnalyticsCategoryPerformance({

categories=[]

}:AnalyticsCategoryPerformanceProps){


const data=
categories
.slice(0,10)
.sort(
(a,b)=>
score(b)-score(a)
);



const maxScore=
Math.max(
...data.map(score),
1
);



return(

<section
className="
overflow-hidden
rounded-2xl
border
border-white/10
bg-white/[0.035]
"
>


<div className="
flex
items-center
justify-between
border-b
border-white/[0.07]
px-5
py-5
">


<div>


<div className="
flex
items-center
gap-2
">

<FolderTree
size={17}
className="text-orange-400"
/>


<h2 className="
text-lg
font-semibold
text-white
">

Category Intelligence

</h2>


</div>



<p className="
mt-1
text-sm
text-gray-500
">

Category performance powered by audience behaviour.

</p>


</div>


<div className="
flex
items-center
gap-2
text-xs
text-orange-400
">

<TrendingUp size={13}/>

Live Ranking

</div>


</div>



{
data.length===0

?

<div className="
h-48
flex
items-center
justify-center
text-gray-500
">

No category intelligence data

</div>


:


<div className="
divide-y
divide-white/[0.06]
">

{
data.map(
(item,index)=>(

<CategoryRow

key={item.id}

item={item}

index={index}

maxScore={maxScore}

/>

)

)

}

</div>

}



</section>

)

}