"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Sparkles,
  FileText,
  CalendarDays,
  Orbit,
  WandSparkles,
  Search,
  Settings,
  Moon,
  Home,
  Sun,
  Activity,
  Heart,
  Briefcase,
  GraduationCap,
  Wallet,
  ShieldCheck,
  Plus,
  Database,
} from "lucide-react";



export default function AstroCMSPage() {



const [dashboard,setDashboard] =
useState<any>(null);


const [loading,setLoading] =
useState(true);



const [error,setError] =
useState("");




useEffect(()=>{


async function loadDashboard(){


try{


const res =
await fetch(
"/api/admin/astro/dashboard"
);



const json =
await res.json();



if(json.success){

setDashboard(json.data);

}
else{

setError(
json.message
);

}



}catch(err){


setError(
"Unable to load dashboard"
);


}

finally{

setLoading(false);

}


}


loadDashboard();



},[]);






const modules = [


{
title:"Horoscope",
description:"Daily, weekly and monthly horoscope.",
href:"/admin/astro/horoscope",
icon:Sun
},


{
title:"Zodiac",
description:"12 zodiac knowledge database.",
href:"/admin/astro/zodiac",
icon:Sparkles
},


{
title:"Panchang",
description:"Panchang intelligence management.",
href:"/admin/astro/panchang",
icon:CalendarDays
},


{
title:"Planet Intelligence",
description:"Planet effects and knowledge.",
href:"/admin/astro/planet-intelligence",
icon:Orbit
},


{
title:"Nakshatra Intelligence",
description:"27 Nakshatra database.",
href:"/admin/astro/nakshatra-intelligence",
icon:Moon
},


{
title:"House Intelligence",
description:"12 houses intelligence.",
href:"/admin/astro/house-intelligence",
icon:Home
},


{
title:"Lagna Intelligence",
description:"Ascendant intelligence.",
href:"/admin/astro/lagna-intelligence",
icon:Sparkles
},


{
title:"Dasha Intelligence",
description:"Dasha interpretation.",
href:"/admin/astro/dasha-intelligence",
icon:Activity
},


{
title:"Dosha Intelligence",
description:"Dosha knowledge.",
href:"/admin/astro/dosha-intelligence",
icon:ShieldCheck
},


{
title:"Yoga Intelligence",
description:"Yoga database.",
href:"/admin/astro/yoga-intelligence",
icon:Sparkles
},


{
title:"Muhurat",
description:"Auspicious timings.",
href:"/admin/astro/muhurat",
icon:CalendarDays
},


{
title:"Remedy Intelligence",
description:"Astro remedies.",
href:"/admin/astro/remedy-intelligence",
icon:Heart
},


{
title:"Compatibility",
description:"Relationship matching.",
href:"/admin/astro/compatibility-intelligence",
icon:Heart
},


{
title:"Career Intelligence",
description:"Career astrology.",
href:"/admin/astro/career-intelligence",
icon:Briefcase
},


{
title:"Education Intelligence",
description:"Education patterns.",
href:"/admin/astro/education-intelligence",
icon:GraduationCap
},


{
title:"Finance Intelligence",
description:"Finance astrology.",
href:"/admin/astro/finance-intelligence",
icon:Wallet
},


{
title:"Health Intelligence",
description:"Health astrology.",
href:"/admin/astro/health-intelligence",
icon:Activity
},


{
title:"Business Intelligence",
description:"Business astrology.",
href:"/admin/astro/business-intelligence",
icon:Briefcase
},


{
title:"Foreign Settlement",
description:"Foreign settlement.",
href:"/admin/astro/foreign-settlement-intelligence",
icon:Sparkles
},


{
title:"Birth Chart",
description:"Birth chart interpretation.",
href:"/admin/astro/birth-chart-interpretation",
icon:FileText
},


{
title:"Templates",
description:"Prediction templates.",
href:"/admin/astro/astro-templates",
icon:WandSparkles
},


{
title:"Astro FAQ",
description:"FAQ management.",
href:"/admin/astro/astro-faq",
icon:FileText
},


{
title:"SEO Management",
description:"Astro SEO system.",
href:"/admin/astro/seo",
icon:Search
},


{
title:"Astro Settings",
description:"CMS settings.",
href:"/admin/astro/settings",
icon:Settings
},


];






if(loading){


return (

<div className="p-10 text-gray-400">

Loading Astro Dashboard...

</div>

);


}







return (

<div className="space-y-8">





<div className="flex items-center gap-4">


<div
className="
p-4
rounded-2xl
bg-gradient-to-br
from-[#ff4d4d]
via-[#ff6a3d]
to-[#ffb347]
"
>

<Sparkles
size={30}
className="text-white"
/>

</div>


<div>

<h1 className="text-3xl font-bold">

Astro Intelligence Dashboard

</h1>


<p className="text-gray-400">

NationPath Astrology Knowledge System

</p>


</div>


</div>






{
error &&

<div className="p-4 rounded-xl bg-red-500/20 text-red-300">

{error}

</div>

}







<div className="grid md:grid-cols-4 gap-5">


<StatCard

title="Total Content"

value={
dashboard?.summary?.totalContent ?? 0
}

/>


<StatCard

title="Published"

value={
dashboard?.summary?.published ?? 0
}

/>


<StatCard

title="Draft"

value={
dashboard?.summary?.drafts ?? 0
}

/>


<StatCard

title="Active Modules"

value={
dashboard?.summary?.activeModules ?? 0
}

/>


</div>







<div>

<h2 className="text-xl font-semibold mb-4">

Quick Actions

</h2>


<div className="grid md:grid-cols-4 gap-4">


<QuickAction
title="Add Horoscope"
href="/admin/astro/horoscope/create"
/>


<QuickAction
title="Add Zodiac"
href="/admin/astro/zodiac/create"
/>


<QuickAction
title="Add Planet"
href="/admin/astro/planet-intelligence/create"
/>


<QuickAction
title="Add Knowledge"
href="/admin/astro/astro-knowledge/create"
/>


</div>


</div>








<div>


<h2 className="text-xl font-semibold mb-5">

Astro Modules

</h2>


<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">


{
modules.map((module)=>{


const Icon =
module.icon;



return (

<Link

key={module.title}

href={module.href}

className="
p-6
rounded-2xl
bg-black/30
border
border-white/10
hover:border-orange-400/40
transition
"

>


<div className="flex gap-4 items-center">


<div className="p-3 rounded-xl bg-white/10">

<Icon size={24}/>

</div>


<h3 className="font-semibold">

{module.title}

</h3>


</div>



<p className="mt-4 text-sm text-gray-400">

{module.description}

</p>


</Link>

);


})

}



</div>


</div>








<div className="grid md:grid-cols-3 gap-5">


<StatusCard

title="Horoscope Coverage"

value={

dashboard?.horoscope?.completed +

"/12"

}

/>



<StatusCard

title="Recently Added"

value={

dashboard?.recentAdded?.length ?? 0

}

/>



<StatusCard

title="Recently Updated"

value={

dashboard?.recentlyUpdated?.length ?? 0

}

/>



</div>







</div>


);


}







function StatCard({

title,

value,

}:{

title:string;

value:number;

}){


return (

<div className="
p-5
rounded-2xl
bg-black/30
border
border-white/10
">

<p className="text-gray-400 text-sm">

{title}

</p>


<h3 className="text-3xl font-bold mt-2">

{value}

</h3>


</div>

)

}





function QuickAction({

title,

href

}:{

title:string;

href:string;

}){


return (

<Link

href={href}

className="
flex
items-center
gap-3
p-4
rounded-xl
bg-white/5
border
border-white/10
hover:bg-orange-500/20
"

>

<Plus size={18}/>

{title}

</Link>

)

}





function StatusCard({

title,

value

}:{

title:string;

value:number|string;

}){


return (

<div
className="
p-5
rounded-2xl
bg-black/30
border
border-white/10
"
>

<p className="text-gray-400 text-sm">

{title}

</p>


<div className="flex items-center gap-2 mt-3">

<Database size={18}/>

<span className="font-semibold">

{value}

</span>


</div>


</div>

)

}