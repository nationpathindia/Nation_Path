"use client";

import {
  ArrowUpRight,
  BookOpen,
  Eye,
  FileText,
  Flame,
  Share2,
  TrendingUp,
} from "lucide-react";


export interface AnalyticsMostReadItem {
  id:string;
  title:string;

  views?:number;
  reads?:number;
  shares?:number;

  category?:{
    name?:string|null;
  }|null;

  contentType?:
  |"news"
  |"editorial"
  |"astro"
  |string;
}


interface AnalyticsMostReadProps{
  articles?:AnalyticsMostReadItem[];
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



function contentLabel(type?:string){

if(type==="astro")
return "Astro";

if(type==="editorial")
return "Editorial";

return "News";

}



function contentStyle(type?:string){

if(type==="astro")
return "bg-orange-500/10 text-orange-400";

if(type==="editorial")
return "bg-blue-500/10 text-blue-300";

return "bg-emerald-500/10 text-emerald-400";

}



function rankStyle(index:number){

if(index===0)
return "bg-orange-500/15 text-orange-400 border-orange-500/20";

if(index===1)
return "bg-white/10 text-gray-300";

if(index===2)
return "bg-blue-500/10 text-blue-300";

return "bg-white/[0.04] text-gray-500";

}



function engagementScore(
article:AnalyticsMostReadItem
){

const views=number(article.views);
const reads=number(article.reads);
const shares=number(article.shares);


if(!views)
return 0;


return Math.min(
100,
Math.round(
(
(reads/views)*70+
(shares/views)*30
)*100
)
);

}





function ArticleRow({
article,
index
}:{
article:AnalyticsMostReadItem;
index:number;
}){


const views=number(article.views);
const reads=number(article.reads);
const shares=number(article.shares);

const score=engagementScore(article);



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
${rankStyle(index)}
`}
>

{
index===0 &&
<Flame size={13} className="mr-1"/>
}

{index+1}

</div>





<div className="min-w-0 flex-1">


<div className="
flex
items-center
gap-2
">


<p
className="
truncate
text-sm
font-semibold
text-gray-200
group-hover:text-white
"
>
{article.title}
</p>


<ArrowUpRight
size={13}
className="
hidden
text-gray-600
group-hover:text-gray-300
sm:block
"
/>


</div>




<div
className="
mt-2
flex
items-center
gap-2
"
>

<span
className="
truncate
text-xs
text-gray-500
"
>
{article.category?.name || "Uncategorized"}
</span>


<span className="text-gray-700">
•
</span>


<span
className={`
rounded-md
px-2
py-0.5
text-[10px]
font-semibold
${contentStyle(article.contentType)}
`}
>
{contentLabel(article.contentType)}
</span>


</div>





<div
className="
mt-3
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
transition-all
"
style={{
width:`${score}%`
}}
/>

</div>


<span
className="
text-[10px]
font-semibold
text-gray-500
"
>
{score}
</span>


</div>


</div>







<div
className="
hidden
items-center
gap-6
md:flex
"
>


<div className="text-right">

<p className="text-[10px] text-gray-600">
VIEWS
</p>

<p className="mt-1 text-sm font-semibold text-white">
{compactNumber(views)}
</p>

</div>




<div className="text-right">

<p className="text-[10px] text-gray-600">
READS
</p>

<p className="mt-1 text-sm font-semibold text-white">
{compactNumber(reads)}
</p>

</div>




<div className="text-right">

<p className="text-[10px] text-gray-600">
SHARES
</p>

<p className="mt-1 text-sm font-semibold text-white">
{compactNumber(shares)}
</p>

</div>


</div>



</div>

)

}







export default function AnalyticsMostRead({
articles=[]
}:AnalyticsMostReadProps){


const items=articles.slice(0,10);



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
border-white/[0.07]
px-5
py-5
"
>


<div>

<div className="flex items-center gap-2">

<BookOpen
size={17}
className="text-orange-400"
/>

<h2 className="
text-lg
font-semibold
text-white
">
Most Read Intelligence
</h2>

</div>


<p className="
mt-1
text-sm
text-gray-500
">
Top content ranked by reading behaviour and engagement.
</p>


</div>




<div
className="
flex
items-center
gap-2
rounded-lg
border
border-white/10
bg-white/[0.04]
px-3
py-1.5
text-xs
text-gray-400
"
>

<FileText size={12}/>

Top {items.length}

</div>


</div>





{
items.length===0 ?

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
No reading data available
</div>

:

<div
className="
divide-y
divide-white/[0.06]
"
>

{
items.map(
(article,index)=>(

<ArticleRow
key={article.id || index}
article={article}
index={index}
/>

))
}

</div>

}




{
items.length>0 &&

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

<span className="text-xs text-gray-600">
Ranked by reading engagement
</span>


<div className="
flex
items-center
gap-1
text-xs
text-gray-600
">

<TrendingUp size={12}/>

Live ranking

</div>


</div>

}


</section>

)

}