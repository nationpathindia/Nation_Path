"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import {
LineChart,
Line,
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
CartesianGrid
} from "recharts"


interface DashboardData{

stats:any

latest:any[]

top:any[]

trending:any[]

viral:any[]

activity:any[]

chart:any[]

categories:any[]

}



export default function AdminDashboard(){


const [data,setData] =
useState<DashboardData | null>(null)



useEffect(()=>{


fetch("/api/admin/dashboard")

.then(res=>res.json())

.then(res=>setData(res))


},[])





if(!data){

return(

<div className="p-10 text-white">

Loading dashboard...

</div>

)

}





const {

stats,

latest,

top,

trending,

viral,

activity,

chart,

categories

}=data






return(


<div className="p-8 space-y-10 text-white">





{/* HEADER */}


<div className="flex flex-col md:flex-row md:justify-between gap-5">


<div>

<h1 className="text-3xl font-bold">

NationPath Newsroom Control Center

</h1>


<p className="text-gray-400 mt-2">

Monitor publishing, audience growth and content performance.

</p>


</div>





<div className="flex gap-3 flex-wrap">


<Link

href="/admin/posts/create"

className="bg-orange-600 px-5 py-3 rounded-xl font-semibold"

>

+ Create Article

</Link>



<Link

href="/admin/posts"

className="bg-blue-700 px-5 py-3 rounded-xl font-semibold"

>

Manage Articles

</Link>


</div>



</div>








{/* CORE METRICS */}



<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">


<Card
title="Articles"
value={stats.totalArticles}
/>


<Card
title="Published Today"
value={stats.publishedToday}
/>



<Card
title="Pending Review"
value={stats.pendingArticles}
/>



<Card
title="Drafts"
value={stats.drafts}
/>



<Card
title="Views"
value={stats.totalViews}
/>



<Card
title="Users"
value={stats.totalUsers}
/>



</div>







{/* EDITORIAL PIPELINE */}



<div className="grid md:grid-cols-4 gap-5">


<Card

title="This Week"

value={stats.weekArticles}

/>


<Card

title="This Month"

value={stats.monthArticles}

/>


<Card

title="Comments"

value={stats.totalComments}

/>


<Card

title="Active Ads"

value={stats.activeAds}

/>


</div>









{/* ANALYTICS */}



<div className="grid lg:grid-cols-2 gap-8">





<div className="panel">


<h2 className="heading">

Traffic Analytics

</h2>



<ResponsiveContainer width="100%" height={300}>


<LineChart data={chart}>


<CartesianGrid stroke="#1f2937"/>


<XAxis

dataKey="day"

stroke="#888"

/>


<YAxis stroke="#888"/>


<Tooltip/>


<Line

type="monotone"

dataKey="views"

stroke="#ff7a18"

strokeWidth={3}

/>


</LineChart>


</ResponsiveContainer>



</div>








<div className="panel">


<h2 className="heading">

Content Distribution

</h2>



<ResponsiveContainer width="100%" height={300}>


<BarChart data={categories}>


<CartesianGrid stroke="#1f2937"/>


<XAxis

dataKey="name"

stroke="#888"

/>


<YAxis stroke="#888"/>


<Tooltip/>


<Bar

dataKey="count"

fill="#f97316"

/>


</BarChart>


</ResponsiveContainer>


</div>




</div>









{/* CONTENT PERFORMANCE */}



<div className="grid lg:grid-cols-2 gap-8">



<Panel title="Most Viewed">


{top?.map((a:any)=>(

<Row

key={a.id}

title={a.title}

value={`${a.views} views`}

/>

))}



</Panel>





<Panel title="Trending News">


{trending?.map((a:any)=>(


<Row

key={a.id}

title={a.title}

value={`Score ${a.trendingScore}`}

/>


))}


</Panel>



</div>









<div className="grid lg:grid-cols-2 gap-8">



<Panel title="Viral Articles">


{viral?.map((a:any)=>(


<Row

key={a.id}

title={a.title}

value={`${a.views} views`}

/>


))}



</Panel>





<Panel title="Recent Activity">


{activity?.map((a:any)=>(


<Row

key={a.id}

title={a.title}

value={a.time}

/>


))}



</Panel>



</div>









{/* LATEST NEWS */}



<div className="panel">


<h2 className="heading mb-5">

Latest Published Articles

</h2>



<div className="space-y-4">


{latest?.map((a:any)=>(


<div

key={a.id}

className="border-b border-gray-800 pb-4"

>


<h3 className="font-semibold">

{a.title}

</h3>



<div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-2">


<span>

{a.category?.name || "News"}

</span>



<span>

{a.status}

</span>



<span>

{a.views} views

</span>



</div>



</div>


))}



</div>


</div>






</div>


)


}








function Card({

title,

value

}:{

title:string,

value:number

}){


return(


<div className="bg-[#0e1726] border border-gray-800 rounded-xl p-5">


<p className="text-gray-400 text-sm">

{title}

</p>


<h3 className="text-2xl font-bold mt-2">

{value?.toLocaleString()}

</h3>


</div>


)


}








function Panel({

title,

children

}:{

title:string,

children:any

}){


return(


<div className="bg-[#0e1726] border border-gray-800 rounded-xl p-6">


<h2 className="text-lg font-semibold mb-5">

{title}

</h2>


<div className="space-y-3">

{children}

</div>


</div>


)

}








function Row({

title,

value

}:{

title:string,

value?:string

}){


return(


<div className="flex justify-between gap-4 border-b border-gray-800 pb-2">


<span className="hover:text-orange-400">

{title}

</span>



<span className="text-gray-400 text-sm">

{value}

</span>



</div>


)


}