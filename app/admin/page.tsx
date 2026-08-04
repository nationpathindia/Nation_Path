"use client";


import { useEffect, useState } from "react";

import Link from "next/link";


import StatsGrid from "@/components/admin/dashboard/StatsGrid";

import TrafficChart from "@/components/admin/dashboard/TrafficChart";

import PublishingTrend from "@/components/admin/dashboard/PublishingTrend";

import CategoryPerformance from "@/components/admin/dashboard/CategoryPerformance";

import NewsroomPanel from "@/components/admin/dashboard/NewsroomPanel";

import PollOverview from "@/components/admin/dashboard/PollOverview";

import AstroStatus from "@/components/admin/dashboard/AstroStatus";

import ActivityFeed from "@/components/admin/dashboard/ActivityFeed";

import SystemHealth from "@/components/admin/dashboard/SystemHealth";

import AdsOverview from "@/components/admin/dashboard/AdsOverview";





interface DashboardData{


stats:any;

latest:any[];

top:any[];

trending:any[];

viral:any[];


activity:any[];


charts:{

dailyViews:any[];

publishingTrend:any[];

categoryPerformance:any[];

};


poll?:any;

astro?:any;

system?:any;


}






export default function AdminDashboard(){



const [data,setData] = useState<DashboardData|null>(null);





useEffect(()=>{


fetch("/api/admin/dashboard")

.then(res=>res.json())

.then(res=>setData(res))


},[]);






if(!data){


return(

<div className="p-10 text-white">

Loading NationPath Intelligence Center...

</div>

)

}







const ads={


activeAds:data.stats?.activeAds || 0,


adViews:data.stats?.adViews || 0,


adClicks:data.stats?.adClicks || 0


};








return(


<div

className="
space-y-10
text-white
"

>







{/* HEADER */}


<div

className="
flex
justify-between
items-center
flex-wrap
gap-5
"

>


<div>


<h1 className="text-3xl font-bold">

NationPath CMS Intelligence Center

</h1>



<p className="text-gray-400 mt-2">

Newsroom, audience, publishing and platform intelligence.

</p>



</div>







<div className="flex gap-3">


<Link

href="/admin/posts/create"

className="
bg-[#EA661B]
px-5
py-3
rounded-xl
font-semibold
"

>

Create Article

</Link>





<Link

href="/admin/polls"

className="
bg-[#163C80]
px-5
py-3
rounded-xl
font-semibold
"

>

Manage Polls

</Link>



</div>


</div>









{/* CORE METRICS */}


<StatsGrid

stats={data.stats}

/>









{/* TRAFFIC */}


<div

className="
grid
xl:grid-cols-2
gap-6
"

>


<TrafficChart

data={data.charts.dailyViews}

/>



<PublishingTrend

data={data.charts.publishingTrend}

/>



</div>









{/* CATEGORY */}


<CategoryPerformance

data={data.charts.categoryPerformance}

/>









{/* NEWSROOM */}


<div

className="
grid
xl:grid-cols-[minmax(0,3fr)_360px]
gap-6
items-start
"

>




<div>


<NewsroomPanel

latest={data.latest}

/>


</div>









<div

className="
space-y-6
"

>


<ActivityFeed

activity={data.activity}

/>






<PollOverview

poll={data.poll}

recent={data.poll?.recent || []}

/>






<AstroStatus

astro={data.astro}

/>






<AdsOverview

ads={ads}

/>





</div>



</div>









{/* STRIPE REVENUE BANNER */}


<div

className="
bg-[#163C80]/30
border
border-blue-400/20
rounded-xl
px-6
py-5
flex
justify-between
items-center
flex-wrap
gap-5
"

>


<div>


<h2 className="font-semibold text-lg">

Revenue Intelligence

</h2>


<p className="text-sm text-gray-400 mt-1">

Stripe subscription and payment analytics

</p>


</div>





<div className="text-right">


<p className="text-xs text-gray-400">

Stripe Status

</p>


<p className="font-semibold">

Not Connected

</p>


</div>



</div>









{/* SYSTEM */}


<SystemHealth

system={data.system}

/>







</div>


)


}