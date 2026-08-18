"use client";

import {
  CheckCircle2,
  Clock3,
  RefreshCw,
} from "lucide-react";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import type {
  AnalyticsDashboardData,
} from "@/lib/analytics/dashboard";

import type {
  AnalyticsTimeRange,
} from "@/lib/analytics/types";


/* =========================================================
   COMPONENTS
========================================================= */

import AnalyticsHeader from "@/components/admin/analytics/AnalyticsHeader";

import AnalyticsKpiGrid from "@/components/admin/analytics/AnalyticsKpiGrid";

import AnalyticsTrafficChart from "@/components/admin/analytics/AnalyticsTrafficChart";

import AnalyticsAudiencePanel from "@/components/admin/analytics/AnalyticsAudiencePanel";

import AnalyticsLocationPanel from "@/components/admin/analytics/AnalyticsLocationPanel";

import AnalyticsContentPerformance from "@/components/admin/analytics/AnalyticsContentPerformance";

import AnalyticsMostRead from "@/components/admin/analytics/AnalyticsMostRead";

import AnalyticsTrending from "@/components/admin/analytics/AnalyticsTrending";

import AnalyticsCategoryPerformance from "@/components/admin/analytics/AnalyticsCategoryPerformance";

import AnalyticsTopContent from "@/components/admin/analytics/AnalyticsTopContent";

import AnalyticsEngagementPanel from "@/components/admin/analytics/AnalyticsEngagementPanel";

import AnalyticsSourcePanel from "@/components/admin/analytics/AnalyticsSourcePanel";

import AnalyticsAdsPanel from "@/components/admin/analytics/AnalyticsAdsPanel";

import AnalyticsRevenuePanel from "@/components/admin/analytics/AnalyticsRevenuePanel";

import AnalyticsLiveActivity from "@/components/admin/analytics/AnalyticsLiveActivity";


import {
  AnalyticsErrorState,
  AnalyticsLoadingState,
} from "@/components/admin/analytics/AnalyticsState";


const AUTO_REFRESH_MS = 30000;


/* =========================================================
   PAGE
========================================================= */

export default function AdminAnalyticsPage(){

const [range,setRange]
=
useState<AnalyticsTimeRange>("24h");


const [data,setData]
=
useState<AnalyticsDashboardData|null>(null);


const [loading,setLoading]
=
useState(true);


const [refreshing,setRefreshing]
=
useState(false);


const [error,setError]
=
useState<string|null>(null);


const [lastUpdated,setLastUpdated]
=
useState<Date|null>(null);



/* =========================================================
 FETCH
========================================================= */


const fetchAnalytics =
useCallback(
async(
silent=false
)=>{

try{


if(silent){
setRefreshing(true);
}
else{
setLoading(true);
}


setError(null);



const response =
await fetch(
`/api/analytics/dashboard?range=${encodeURIComponent(range)}`,
{
cache:"no-store",
}
);



const result =
await response.json();



if(
!response.ok ||
!result.success
){
throw new Error(
result?.error ||
"Analytics failed"
);
}



setData(result.data);

setLastUpdated(new Date());


}
catch(err){


console.error(
"NATIONPATH ANALYTICS",
err
);


setError(
err instanceof Error
?
err.message
:
"Analytics failed"
);


}
finally{

setLoading(false);
setRefreshing(false);

}


},
[range]
);



/* LOAD */

useEffect(()=>{

void fetchAnalytics(false);

},[fetchAnalytics]);



/* AUTO REFRESH */

useEffect(()=>{


const timer =
window.setInterval(()=>{

void fetchAnalytics(true);

},AUTO_REFRESH_MS);



return()=>{

window.clearInterval(timer);

};


},[fetchAnalytics]);



const refresh =
()=>{

void fetchAnalytics(true);

};




/* =========================================================
 STATES
========================================================= */


if(
loading &&
!data
){

return(

<div className="min-h-full bg-[#0B0F17] text-white">

<div className="mx-auto max-w-[1600px] px-6 py-8">

<AnalyticsLoadingState/>

</div>

</div>

);

}



if(
error &&
!data
){

return(

<div className="min-h-full bg-[#0B0F17] text-white">

<div className="mx-auto max-w-[1600px] px-6 py-8">

<AnalyticsErrorState

message={error}

onRetry={()=>
void fetchAnalytics(false)
}

isRetrying={loading}

/>

</div>

</div>

);

}



/* =========================================================
 DASHBOARD
========================================================= */


return(

<div className="min-h-full bg-[#0B0F17] text-white">


<div className="
mx-auto
max-w-[1600px]
space-y-10
px-4
py-6
md:px-6
lg:px-8
">


{/* HEADER */}

<AnalyticsHeader

range={range}

onRangeChange={setRange}

loading={
loading ||
refreshing
}

onRefresh={refresh}

/>



{/* STATUS BAR */}

<div className="
flex
items-center
justify-between
rounded-xl
border
border-white/[0.07]
bg-white/[0.025]
px-4
py-3
">


<div className="
flex
items-center
gap-2
text-xs
text-gray-500
">


<CheckCircle2
size={14}
className="text-emerald-400"
/>


Analytics Connected


<span className="text-gray-700">
•
</span>


{data?.overview?.range || range}


</div>



<div className="
flex
items-center
gap-2
text-xs
text-gray-600
">


<Clock3 size={13}/>


{
lastUpdated
?
lastUpdated.toLocaleTimeString()
:
"Updating"
}



<span>
•
</span>


Auto refresh 30s



{
refreshing &&
<RefreshCw
size={12}
className="
animate-spin
text-[#EA661B]
"
/>
}


</div>


</div>





{/* =====================================================
01 EXECUTIVE OVERVIEW
===================================================== */}


<section>

<div className="mb-4">

<h2 className="text-lg font-semibold">
Executive Overview
</h2>

<p className="text-sm text-gray-500">
Platform health and performance snapshot.
</p>

</div>


<AnalyticsKpiGrid

range={range}

platform={data?.platform}

overview={data?.overview}

/>


</section>






{/* =====================================================
02 TRAFFIC INTELLIGENCE
===================================================== */}


<section className="space-y-4">


<div>

<h2 className="text-lg font-semibold">
Traffic Intelligence
</h2>


<p className="text-sm text-gray-500">
Views, reads and visitor activity trends.
</p>


</div>


<AnalyticsTrafficChart

data={data?.traffic || []}

/>


</section>







{/* =====================================================
03 AUDIENCE INTELLIGENCE
===================================================== */}


<section className="space-y-4">


<div>

<h2 className="text-lg font-semibold">
Audience Intelligence
</h2>

<p className="text-sm text-gray-500">
Visitor behaviour and geographic signals.
</p>


</div>


<AnalyticsAudiencePanel

data={data?.overview}

platform={data?.platform}

/>



<AnalyticsLocationPanel

locations={data?.locations || []}

/>


</section>








{/* =====================================================
04 CONTENT INTELLIGENCE
===================================================== */}


<section className="space-y-5">


<div>

<h2 className="text-lg font-semibold">
Content Intelligence
</h2>


<p className="text-sm text-gray-500">
News, Astro and Editorial performance.
</p>


</div>



<AnalyticsContentPerformance

news={data?.news}

editorial={data?.editorial}

astrology={data?.astrology}

/>



<div className="
grid
gap-6
xl:grid-cols-2
">


<AnalyticsMostRead

articles={data?.mostRead || []}

/>



<AnalyticsTrending

articles={data?.trending || []}

/>


</div>



<AnalyticsCategoryPerformance

categories={
data?.trendingCategories || []
}

/>



<AnalyticsTopContent

articles={
data?.mostRead || []
}

/>



</section>







{/* =====================================================
05 ENGAGEMENT
===================================================== */}


<AnalyticsEngagementPanel

data={data?.overview}

/>






{/* =====================================================
06 ACQUISITION
===================================================== */}


<section className="space-y-4">


<div>

<h2 className="text-lg font-semibold">
Acquisition Intelligence
</h2>


<p className="text-sm text-gray-500">
Traffic sources and referrals.
</p>


</div>



<AnalyticsSourcePanel/>


</section>








{/* =====================================================
07 MONETIZATION
===================================================== */}


<section className="space-y-5">


<div>

<h2 className="text-lg font-semibold">
Monetization Intelligence
</h2>


<p className="text-sm text-gray-500">
Ads and revenue performance.
</p>


</div>



<AnalyticsAdsPanel/>


<AnalyticsRevenuePanel/>


</section>







{/* =====================================================
08 LIVE
===================================================== */}


<section className="space-y-4">


<div>

<h2 className="text-lg font-semibold">
Live Intelligence
</h2>


<p className="text-sm text-gray-500">
Current platform signals.
</p>


</div>



<AnalyticsLiveActivity/>


</section>






<footer className="
border-t
border-white/[0.06]
pt-5
text-xs
text-gray-600
flex
justify-between
">


<span>
NationPath Analytics Intelligence Center
</span>


<span>
● Live Analytics
</span>


</footer>




</div>

</div>

);


}