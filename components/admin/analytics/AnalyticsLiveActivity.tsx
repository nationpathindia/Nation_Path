"use client";

import {
 Activity,
 BookOpen,
 Eye,
 FileText,
 Heart,
 MousePointerClick,
 Radio,
 Share2,
 Sparkles,
 UserRound,
 TrendingUp,
 Flame,
 Users,
 Zap
} from "lucide-react";


export interface AnalyticsLiveActivityItem {

 id?:string;

 eventType?:string;

 articleId?:string;

 articleTitle?:string;

 title?:string;

 contentType?:
 |"news"
 |"editorial"
 |"astro"
 |string;


 userId?:string|null;

 sessionId?:string|null;

 createdAt?:string|Date;

 metadata?:Record<string,unknown>;

}



interface Props{

 activity?:AnalyticsLiveActivityItem[];

 updatedAt?:string|Date;

}




function eventLabel(type?:string){

const map:any={

view:"Viewed",

open:"Opened",

read:"Reading",

scroll:"Scrolling",

like:"Liked",

reaction:"Reacted",

share:"Shared",

video_play:"Watching video",

video_complete:"Completed video"

};


return map[type||""] || 
type?.replaceAll("_"," ") ||
"Activity";

}





function eventIcon(type?:string){

switch(type){

case"view":
return Eye;

case"open":
return MousePointerClick;

case"read":
return BookOpen;

case"like":
return Heart;

case"share":
return Share2;

case"reaction":
return Sparkles;

case"video_play":
case"video_complete":
return Radio;


default:
return Activity;

}

}





function eventTheme(type?:string){

if(
type==="share"||
type==="like"||
type==="reaction"
)

return {
box:"bg-orange-500/10 text-orange-400",
dot:"bg-orange-400"
};


if(
type==="read"
)

return {
box:"bg-emerald-500/10 text-emerald-400",
dot:"bg-emerald-400"
};


if(
type==="view"||
type==="open"
)

return {
box:"bg-blue-500/10 text-blue-300",
dot:"bg-blue-400"
};



return {
box:"bg-white/[0.05] text-gray-400",
dot:"bg-gray-500"
};


}





function contentStyle(type?:string){

switch(type){

case"astro":
return "bg-orange-500/10 text-orange-400";

case"editorial":
return "bg-blue-500/10 text-blue-300";


default:
return "bg-emerald-500/10 text-emerald-400";

}

}





function contentLabel(type?:string){

if(type==="astro")
return "Astrology";

if(type==="editorial")
return "Editorial";


return "News";

}





function ago(value?:string|Date){

if(!value)
return "now";


const date =
value instanceof Date
?
value
:
new Date(value);


const sec =
(Date.now()-date.getTime())/1000;



if(sec<10)
return "now";


if(sec<60)
return `${Math.floor(sec)}s`;


if(sec<3600)
return `${Math.floor(sec/60)}m`;


return `${Math.floor(sec/3600)}h`;

}





function ActivityRow({
item,
index
}:{
item:AnalyticsLiveActivityItem;
index:number;
}){


const Icon =
eventIcon(item.eventType);


const style =
eventTheme(item.eventType);



return(

<div
className="
group
flex
gap-4
px-5
py-4
hover:bg-white/[0.025]
transition
"
>


<div className="relative">


<div
className={`
h-10
w-10
rounded-xl
flex
items-center
justify-center
${style.box}
`}
>

<Icon size={17}/>

</div>


<span
className={`
absolute
right-0
bottom-0
h-2
w-2
rounded-full
ring-2
ring-[#111318]
${style.dot}
`}
/>


</div>




<div className="
flex-1
min-w-0
">


<div className="
flex
justify-between
gap-3
">


<div>


<div className="
flex
items-center
gap-2
">

<p className="
text-xs
font-semibold
text-gray-200
">

{eventLabel(
item.eventType
)}

</p>



{
index===0 &&

<span className="
flex
items-center
gap-1
rounded-full
bg-orange-500/10
px-2
py-0.5
text-[9px]
text-orange-400
">

<Flame size={9}/>

Hot

</span>

}


</div>



<p className="
mt-1
truncate
text-xs
text-gray-500
">

{
item.articleTitle ||
item.title ||
"Content interaction"
}

</p>


</div>



<span className="
text-[10px]
text-gray-600
">

{ago(item.createdAt)}

</span>



</div>




<div className="
mt-2
flex
gap-2
items-center
">

{
item.contentType &&

<span className={`
rounded-md
px-1.5
py-0.5
text-[9px]
font-medium
${contentStyle(
item.contentType
)}
`}
>

{contentLabel(
item.contentType
)}

</span>

}



{
item.sessionId &&

<span className="
flex
gap-1
items-center
text-[9px]
text-gray-700
">

<UserRound size={9}/>

Session

</span>

}



</div>



</div>



</div>

)

}







export default function AnalyticsLiveActivity({

activity=[],

updatedAt

}:Props){



const items =
activity.slice(0,20);



const total =
items.length;



const users =
new Set(
items
.map(x=>x.userId||x.sessionId)
.filter(Boolean)
)
.size;



const shares =
items.filter(
x=>x.eventType==="share"
).length;



const engagement =
total
?
Math.round(
(
(shares*3+
items.filter(
x=>x.eventType==="read"
).length*2
)
/total
)*100
)
:
0;




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



<div className="
border-b
border-white/[0.07]
px-5
py-5
">


<div className="
flex
justify-between
"
>


<div>

<div className="
flex
items-center
gap-2
">


<Activity
size={17}
className="text-orange-400"
/>


<h2 className="
text-lg
font-semibold
text-white
">

Live Activity Intelligence

</h2>


</div>


<p className="
mt-1
text-sm
text-gray-500
">

Real-time audience behaviour stream.

</p>


</div>



<div className="
flex
items-center
gap-2
text-xs
text-emerald-400
">

<span className="
h-2
w-2
rounded-full
bg-emerald-400
animate-pulse
"/>

LIVE

</div>


</div>



<div className="
grid
grid-cols-3
gap-3
mt-5
">


<div className="
rounded-xl
bg-white/[0.03]
p-3
">

<Users size={14}/>

<p className="text-lg text-white font-bold">
{users}
</p>

<span className="text-[10px] text-gray-600">
active users
</span>

</div>



<div className="
rounded-xl
bg-white/[0.03]
p-3
">

<Zap size={14}/>

<p className="text-lg text-white font-bold">
{total}
</p>

<span className="text-[10px] text-gray-600">
events
</span>

</div>




<div className="
rounded-xl
bg-white/[0.03]
p-3
">

<TrendingUp size={14}/>

<p className="text-lg text-white font-bold">
{engagement}%
</p>

<span className="text-[10px] text-gray-600">
engagement
</span>

</div>



</div>


</div>





{
items.length===0 ?

<div className="
h-52
flex
items-center
justify-center
text-gray-500
">

No live activity

</div>


:

<div className="
max-h-[560px]
overflow-y-auto
divide-y
divide-white/[0.06]
">

{
items.map(
(item,index)=>(

<ActivityRow

key={
item.id ||
`${item.eventType}-${index}`
}

item={item}

index={index}

/>

)

)

}

</div>

}




<div className="
flex
justify-between
border-t
border-white/[0.06]
px-5
py-3
">

<span className="
text-[10px]
text-gray-600
">

<FileText size={11} className="inline mr-1"/>

{total} recent events

</span>



{
updatedAt &&
<span className="
text-[10px]
text-gray-600
">

Updated {ago(updatedAt)}

</span>
}


</div>



</section>


)

}