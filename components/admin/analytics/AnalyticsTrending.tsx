"use client";

import {
  ArrowUpRight,
  BookOpen,
  Eye,
  Flame,
  Share2,
  TrendingUp,
} from "lucide-react";


export interface AnalyticsTrendingItem {
  id:string;
  title:string;

  views?:number;
  reads?:number;
  shares?:number;
  score?:number;

  category?:{
    name?:string|null;
  }|null;

  contentType?:
  |"news"
  |"editorial"
  |"astro"
  |string;
}


interface AnalyticsTrendingProps{
  articles?:AnalyticsTrendingItem[];
}



function number(value?:number){
  return Number(value)||0;
}



function compactNumber(value:number){

if(value>=1000000)
return `${(value/1000000).toFixed(1)}M`;

if(value>=1000)
return `${(value/1000).toFixed(1)}K`;

return value.toLocaleString("en-IN");

}




function momentum(article:AnalyticsTrendingItem){

if(typeof article.score==="number")
return article.score;


return (
number(article.views)
+
number(article.reads)*2
+
number(article.shares)*4
);

}




function momentumLabel(score:number){

if(score>=1000)
return "Viral";

if(score>=500)
return "Hot";

if(score>=100)
return "Rising";

return "Building";

}




function typeLabel(type?:string){

if(type==="astro")
return "Astro";

if(type==="editorial")
return "Editorial";

return "News";

}




function typeStyle(type?:string){

if(type==="astro")
return "bg-orange-500/10 text-orange-400";

if(type==="editorial")
return "bg-blue-500/10 text-blue-300";


return "bg-emerald-500/10 text-emerald-400";

}





function TrendingRow({
article,
index
}:{
article:AnalyticsTrendingItem;
index:number;
}){


const views=number(article.views);
const reads=number(article.reads);
const shares=number(article.shares);

const score=momentum(article);


const intensity=Math.min(
100,
Math.round(
(score/1000)*100
)
);



return(

<div
className="
group
flex
gap-4
px-5
py-4
transition
hover:bg-white/[0.035]
"
>


{/* RANK */}

<div
className={`
flex
h-10
w-10
shrink-0
items-center
justify-center
rounded-xl
border
border-white/[0.08]
text-xs
font-bold
${index===0
?"bg-orange-500/15 text-orange-400"
:"bg-white/[0.04] text-gray-400"}
`}
>

{
index===0 &&
<Flame size={13} className="mr-1"/>
}

{index+1}

</div>





<div className="min-w-0 flex-1">


<div
className="
flex
items-start
justify-between
gap-3
"
>


<div className="min-w-0">

<p
className="
truncate
text-sm
font-semibold
text-gray-100
group-hover:text-white
"
>
{article.title}
</p>


<div
className="
mt-2
flex
items-center
gap-2
"
>

<span className="
truncate
text-xs
text-gray-500
">
{article.category?.name || "Uncategorized"}
</span>


<span className="
h-1
w-1
rounded-full
bg-gray-700
"/>


<span
className={`
rounded-md
px-2
py-0.5
text-[10px]
font-semibold
${typeStyle(article.contentType)}
`}
>
{typeLabel(article.contentType)}
</span>


</div>


</div>




<div
className="
hidden
sm:flex
items-center
gap-1
rounded-lg
bg-orange-500/10
px-2
py-1
text-[10px]
font-semibold
text-orange-400
"
>

<TrendingUp size={11}/>

{momentumLabel(score)}

</div>


</div>





{/* MOMENTUM BAR */}


<div
className="
mt-4
flex
items-center
gap-3
"
>

<div
className="
h-1.5
flex-1
overflow-hidden
rounded-full
bg-white/[0.05]
"
>

<div
className="
h-full
rounded-full
bg-orange-500
"
style={{
width:`${intensity}%`
}}
/>


</div>


<span className="
text-[10px]
text-gray-600
">
{score.toLocaleString()}
</span>


</div>





{/* METRICS */}

<div
className="
mt-4
flex
items-center
gap-6
"
>


<div className="
flex
items-center
gap-1.5
text-xs
text-gray-500
">
<Eye size={12}/>
{compactNumber(views)}
</div>



<div className="
flex
items-center
gap-1.5
text-xs
text-gray-500
">
<BookOpen size={12}/>
{compactNumber(reads)}
</div>



<div className="
flex
items-center
gap-1.5
text-xs
text-gray-500
">
<Share2 size={12}/>
{compactNumber(shares)}
</div>


</div>


</div>




<ArrowUpRight
size={14}
className="
hidden
text-gray-700
transition
group-hover:text-gray-300
sm:block
"
/>



</div>

)

}






export default function AnalyticsTrending({
articles=[]
}:AnalyticsTrendingProps){


const data=articles.slice(0,10);



return(

<section
className="
overflow-hidden
rounded-2xl
border
border-white/[0.08]
bg-black/30
backdrop-blur-xl
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

<div className="
flex
items-center
gap-2
">

<Flame
size={17}
className="text-orange-400"
/>


<h2 className="
text-lg
font-semibold
text-white
">
Trending Intelligence
</h2>


</div>


<p className="
mt-1
text-sm
text-gray-500
">
Real-time content momentum across NationPath.
</p>


</div>




<div
className="
flex
items-center
gap-1.5
rounded-full
border
border-orange-500/20
bg-orange-500/10
px-3
py-1
text-[10px]
font-semibold
text-orange-400
"
>

<TrendingUp size={11}/>

LIVE

</div>


</div>





{
data.length===0 ?

<div
className="
flex
h-48
items-center
justify-center
text-sm
text-gray-500
"
>
No trending activity yet
</div>


:

<div
className="
divide-y
divide-white/[0.06]
"
>

{
data.map(
(article,index)=>(

<TrendingRow
key={
article.id ||
`${index}-${article.title}`
}
article={article}
index={index}
/>

))
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

Ranked by engagement momentum

</div>



</section>

);

}