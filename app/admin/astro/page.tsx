"use client";


//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO
//
// ADMIN INTELLIGENCE CENTER
//
// CMS
// AUTOMATION
// ANALYTICS
// LIVE VISITORS
// ARCHIVE
//
//////////////////////////////////////////////////////////////


import {
useEffect,
useState
} from "react";


import {

Sparkles,
Play,
CheckCircle,
Clock,
Archive,
Eye,
Users,
Sun,
Moon,
Orbit,
Activity,
Heart,
Wallet,
Briefcase,
ShieldCheck,
CalendarDays

} from "lucide-react";







export default function AstroAdminPage(){



const [dashboard,setDashboard]=useState<any>(null);

const [loading,setLoading]=useState(true);

const [archiveOpen,setArchiveOpen]=useState(false);

const [generating,setGenerating]=useState(false);







async function loadDashboard(){


try{


const response = await fetch(

"/api/admin/astro/dashboard",

{
cache:"no-store"
}

);


const json = await response.json();


if(json.success){

setDashboard(json.data);

}


}
catch(error){

console.error(error);

}
finally{

setLoading(false);

}


}








useEffect(()=>{

loadDashboard();

const interval=setInterval(()=>{

loadDashboard();

},30000);


return ()=>clearInterval(interval);


},[]);










async function generateHoroscope(){


if(

dashboard?.today?.ready ||

dashboard?.automation?.running

)

return;



setGenerating(true);



try{


await fetch(

"/api/admin/astro/automation/horoscope/run",

{

method:"POST"

}

);


setTimeout(()=>{

loadDashboard();

},2000);



}
catch(error){

console.error(error);

}
finally{

setGenerating(false);

}


}









if(loading){

return(

<div className="p-10 text-gray-400">

Loading Astro Intelligence Center...

</div>

)

}







const todayReady =
dashboard?.today?.ready;


const running =
dashboard?.automation?.running;







return(


<div className="p-8 space-y-10 text-white">







{/* HEADER */}


<div className="flex justify-between flex-wrap gap-5">


<div>


<h1 className="text-3xl font-bold flex gap-3 items-center">

<Sparkles/>

Astro Intelligence Center

</h1>


<p className="text-gray-400 mt-2">

NationPath Astro CMS + Automation + Analytics

</p>


</div>







<button

onClick={generateHoroscope}

disabled={
todayReady ||
running ||
generating
}

className={`
px-5 py-3 rounded-xl flex items-center gap-2 font-semibold

${
todayReady ||
running ||
generating

?

"bg-gray-700 cursor-not-allowed"

:

"bg-orange-600 hover:bg-orange-500"

}

`}

>


{

generating

?

<>

<Clock size={18}/>

Generating...

</>


:

todayReady

?

<>

<CheckCircle size={18}/>

Today's Horoscope Published

</>


:

running

?

<>

<Clock size={18}/>

Generation Running

</>


:

<>

<Play size={18}/>

Generate Horoscope

</>

}



</button>


</div>









{/* CMS SUMMARY */}



<div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-5">


<Card title="Total CMS" value={dashboard.summary.totalContent}/>

<Card title="Published" value={dashboard.summary.published}/>

<Card title="Draft" value={dashboard.summary.draft}/>

<Card title="Review" value={dashboard.summary.review}/>

<Card title="Approved" value={dashboard.summary.approved}/>

<Card title="Archived" value={dashboard.summary.archived}/>

<Card title="Published Today" value={dashboard.summary.publishedToday}/>

<Card title="Total Views" value={dashboard.analytics.totalViews}/>


</div>









{/* LIVE VISITORS */}



<Panel title="LIVE HOROSCOPE VISITORS">


<div className="flex items-center gap-4">


<Users className="text-green-400"/>


<div>

<h2 className="text-3xl font-bold">

{dashboard.liveVisitors.total}

</h2>


<p className="text-gray-400">

People reading now

</p>


</div>


</div>





<div className="grid md:grid-cols-4 gap-4 mt-6">


{

dashboard.liveVisitors.byZodiac.map(

(item:any)=>(


<div

key={item.zodiac}

className="
rounded-xl
bg-black/20
border
border-white/10
p-4
"

>

<div className="capitalize">

{item.zodiac}

</div>


<div className="text-green-400 font-bold mt-2">

{item.viewers}

</div>


</div>


)

)

}


</div>



</Panel>









{/* AUTOMATION */}



<Panel title="Today's Horoscope Automation">


<div className="flex justify-between items-center">


<div>


<p className="text-gray-400">

Coverage

</p>


<h2 className="text-3xl font-bold">

{dashboard.today.completed}/12

</h2>


</div>




<div>

{

todayReady

?

<span className="text-green-400 flex gap-2">

<CheckCircle/>

Published

</span>


:

running

?

<span className="text-yellow-400 flex gap-2">

<Clock/>

Running

</span>


:

<span className="text-orange-400 flex gap-2">

<Clock/>

Waiting

</span>


}


</div>



</div>


</Panel>









{/* ZODIAC COVERAGE */}



<Panel title="Zodiac Coverage">


<div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4">


{

dashboard.zodiacStatus.map(

(item:any)=>(


<div

key={item.zodiac}

className={`
p-4 rounded-xl border

${
item.published

?

"border-green-500/30 bg-green-500/10"

:

"border-red-500/30 bg-red-500/10"

}

`}

>


<div className="flex justify-between">


<span className="capitalize">

{item.zodiac}

</span>


{

item.published

?

<CheckCircle size={18}/>

:

<Clock size={18}/>

}


</div>



<div className="text-gray-400 mt-3 flex gap-2">

<Eye size={15}/>

{item.views} views

</div>



</div>


)

)

}



</div>

</Panel>









{/* MOST VIEWED */}



<Panel title="Most Viewed Rashifal">


{

dashboard.analytics.topViewed.map(

(item:any,index:number)=>(


<div

key={index}

className="
flex
justify-between
border-b
border-white/10
py-3

"

>


<span>

#{index+1} {item.zodiac}

</span>


<span className="text-gray-400">

{item.analytics?.views || 0} views

</span>


</div>


)

)


}


</Panel>









{/* RECENT */}



<div className="grid md:grid-cols-2 gap-6">


<Panel title="Recent Published">


{

dashboard.recentPublished.map(

(item:any,index:number)=>(


<div key={index}

className="border-b border-white/10 py-3"

>


<div className="capitalize">

{item.zodiac}

</div>


<div className="text-gray-400 text-sm">

{
new Date(
item.meta.publishedAt
).toLocaleDateString()

}

</div>


</div>


)

)


}


</Panel>







<Panel title="Recent Generated">


{

dashboard.recentGeneration.map(

(item:any,index:number)=>(


<div key={index}

className="border-b border-white/10 py-3"

>


<div className="capitalize">

{item.zodiac}

</div>


<div className="text-gray-400 text-sm">

{
new Date(
item.createdAt
).toLocaleDateString()

}

</div>


</div>


)

)


}


</Panel>


</div>









{/* ARCHIVE */}



<Panel>


<button

onClick={()=>setArchiveOpen(!archiveOpen)}

className="flex gap-3 items-center text-xl"

>

<Archive/>

Archive History Last 3 Days

</button>




{

archiveOpen &&

<div className="mt-5">


{

dashboard.archiveHistory.map(

(item:any,index:number)=>(


<div

key={index}

className="border-b border-white/10 py-3"

>


<div className="capitalize">

{item.zodiac}

</div>


<div className="text-gray-400">

{
new Date(
item.meta.archivedAt
).toLocaleDateString()

}

</div>


</div>


)

)


}


</div>


}



</Panel>









{/* FUTURE MODULES */}



<Panel title="Astro Intelligence Modules">


<div className="grid md:grid-cols-3 xl:grid-cols-4 gap-5">


<Module name="Horoscope" active icon={Sun}/>

<Module name="Zodiac Intelligence" active icon={Sparkles}/>

<Module name="Panchang" icon={CalendarDays}/>

<Module name="Planet Intelligence" icon={Orbit}/>

<Module name="Nakshatra" icon={Moon}/>

<Module name="Lagna" icon={Sun}/>

<Module name="Dasha" icon={Activity}/>

<Module name="Dosha" icon={ShieldCheck}/>

<Module name="Yoga" icon={Activity}/>

<Module name="Compatibility" icon={Heart}/>

<Module name="Career" icon={Briefcase}/>

<Module name="Finance" icon={Wallet}/>


</div>


</Panel>









</div>


)


}









function Card({

title,

value

}:{

title:string;

value:number;

}){


return(

<div className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-5
">


<p className="text-gray-400 text-sm">

{title}

</p>


<h3 className="text-2xl font-bold mt-2">

{value || 0}

</h3>


</div>

)

}









function Panel({

title,

children

}:any){


return(

<div className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
">


{

title &&

<h2 className="text-xl font-semibold mb-5">

{title}

</h2>

}


{children}


</div>

)

}









function Module({

name,

active,

icon:Icon

}:any){


return(

<div className="
rounded-xl
bg-black/20
border
border-white/10
p-5
flex
gap-3
items-center

">


<Icon size={22}/>


<div>

<h3 className="font-semibold">

{name}

</h3>


<p className="text-sm text-gray-400">

{active?"Active":"Coming Soon"}

</p>


</div>


</div>

)

}