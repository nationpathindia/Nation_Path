"use client";

import {
  Activity,
  BookOpen,
  Eye,
  Monitor,
  Smartphone,
  Tablet,
  Users,
  UserPlus,
  UserCheck,
  TrendingUp,
} from "lucide-react";

export interface AnalyticsAudiencePanelData {
  totalUsers?: number;
  uniqueUsers?: number;
  uniqueSessions?: number;

  newUsers?: number;
  returningUsers?: number;

  desktop?: number;
  mobile?: number;
  tablet?: number;

  viewsPerSession?: number;
  readsPerSession?: number;
}

interface AnalyticsAudiencePanelProps {
  data?: AnalyticsAudiencePanelData;

  platform?: {
    totalUsers?: number;
  };
}


function number(value?: number) {
  return Number(value) || 0;
}


function formatNumber(value:number){
  if(value >= 1000000){
    return `${(value/1000000).toFixed(1)}M`;
  }

  if(value >= 1000){
    return `${(value/1000).toFixed(1)}K`;
  }

  return value.toLocaleString("en-IN");
}


function percentage(
  value:number,
  total:number
){
  if(!total) return 0;

  return Math.round(
    (value / total) * 100
  );
}



function MetricCard({
  icon:Icon,
  label,
  value,
  description,
}:{
  icon:any;
  label:string;
  value:string;
  description:string;
}){

return(
<div
className="
rounded-2xl
border
border-white/[0.08]
bg-white/[0.035]
p-4
transition
hover:border-white/20
"
>

<div className="flex items-center gap-2">

<div
className="
flex
h-8
w-8
items-center
justify-center
rounded-lg
bg-[#EA661B]/10
text-[#EA661B]
"
>
<Icon size={15}/>
</div>


<p className="text-xs text-gray-500">
{label}
</p>


</div>


<p
className="
mt-3
text-2xl
font-bold
text-white
"
>
{value}
</p>


<p className="mt-1 text-[10px] text-gray-600">
{description}
</p>


</div>
)

}





function DeviceRow({
icon:Icon,
label,
value,
total
}:{
icon:any;
label:string;
value:number;
total:number;
}){


const percent =
percentage(value,total);


return(

<div>

<div
className="
flex
items-center
justify-between
"
>

<div className="flex items-center gap-2">

<Icon
size={15}
className="text-gray-500"
/>

<span className="text-xs text-gray-400">
{label}
</span>

</div>


<div className="flex items-center gap-2">

<span className="text-xs font-semibold text-white">
{formatNumber(value)}
</span>

<span className="text-[10px] text-gray-600">
{percent}%
</span>

</div>

</div>



<div
className="
mt-2
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
bg-[#163C80]
transition-all
"
style={{
width:`${percent}%`
}}
/>

</div>


</div>

)

}





function AudienceSplit({
label,
value,
total,
type
}:{
label:string;
value:number;
total:number;
type:"new"|"returning";
}){


const percent =
percentage(value,total);


return(

<div
className="
rounded-xl
border
border-white/[0.07]
bg-white/[0.025]
p-4
"
>


<div
className="
flex
items-center
justify-between
"
>

<div className="flex items-center gap-2">

{
type==="new"
?
<UserPlus size={14} className="text-orange-400"/>
:
<UserCheck size={14} className="text-blue-400"/>
}


<span className="text-xs text-gray-500">
{label}
</span>


</div>


<span className="text-sm font-semibold text-white">
{formatNumber(value)}
</span>


</div>



<div
className="
mt-3
h-2
overflow-hidden
rounded-full
bg-white/[0.06]
"
>

<div
className={`
h-full
rounded-full
${type==="new"
?"bg-orange-500"
:"bg-blue-500"}
`}
style={{
width:`${Math.max(percent, value ? 3:0)}%`
}}
/>


</div>



<p className="mt-2 text-[10px] text-gray-600">
{percent}% of audience
</p>


</div>

)

}




export default function AnalyticsAudiencePanel({
data,
platform
}:AnalyticsAudiencePanelProps){


const totalUsers =
number(platform?.totalUsers);


const uniqueUsers =
number(data?.uniqueUsers);


const sessions =
number(data?.uniqueSessions);


const newUsers =
number(data?.newUsers);


const returningUsers =
number(data?.returningUsers);


const desktop =
number(data?.desktop);


const mobile =
number(data?.mobile);


const tablet =
number(data?.tablet);


const deviceTotal =
desktop+mobile+tablet;


const viewsSession =
number(data?.viewsPerSession);


const readsSession =
number(data?.readsPerSession);



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


{/* HEADER */}

<div
className="
border-b
border-white/[0.07]
px-5
py-5
"
>

<div className="flex items-center gap-2">

<Users
size={18}
className="text-orange-400"
/>


<h2
className="
text-lg
font-semibold
text-white
"
>
Audience Intelligence
</h2>


</div>


<p className="mt-1 text-sm text-gray-500">
Understand audience growth, behaviour and consumption patterns.
</p>


</div>




<div className="space-y-6 p-5">


{/* TOP METRICS */}

<div
className="
grid
gap-4
sm:grid-cols-2
xl:grid-cols-4
"
>


<MetricCard
icon={Users}
label="Total Users"
value={formatNumber(totalUsers)}
description="Platform accounts"
/>


<MetricCard
icon={Activity}
label="Active Users"
value={formatNumber(uniqueUsers)}
description="Unique visitors"
/>


<MetricCard
icon={Eye}
label="Sessions"
value={formatNumber(sessions)}
description="Audience sessions"
/>


<MetricCard
icon={TrendingUp}
label="Views / Session"
value={viewsSession.toFixed(1)}
description="Average consumption"
/>


</div>





{/* AUDIENCE MIX */}


<div>

<div className="mb-3">

<h3 className="text-sm font-semibold text-white">
Audience Mix
</h3>

<p className="text-xs text-gray-600">
New vs returning visitors intelligence
</p>

</div>


<div
className="
grid
gap-4
md:grid-cols-2
"
>


<AudienceSplit
label="New Users"
value={newUsers}
total={newUsers+returningUsers}
type="new"
/>


<AudienceSplit
label="Returning Users"
value={returningUsers}
total={newUsers+returningUsers}
type="returning"
/>


</div>


</div>






{/* DEVICE */}

<div>

<div className="mb-4">

<h3 className="text-sm font-semibold text-white">
Device Intelligence
</h3>

<p className="text-xs text-gray-600">
Audience access distribution
</p>

</div>



<div className="space-y-5">

<DeviceRow
icon={Monitor}
label="Desktop"
value={desktop}
total={deviceTotal}
/>


<DeviceRow
icon={Smartphone}
label="Mobile"
value={mobile}
total={deviceTotal}
/>


<DeviceRow
icon={Tablet}
label="Tablet"
value={tablet}
total={deviceTotal}
/>


</div>


</div>






{/* ENGAGEMENT */}

<div
className="
grid
gap-4
sm:grid-cols-2
"
>


<MetricCard
icon={BookOpen}
label="Reads / Session"
value={readsSession.toFixed(1)}
description="Average reading depth"
/>


<MetricCard
icon={Activity}
label="Engaged Audience"
value={formatNumber(uniqueUsers)}
description="Users generating activity"
/>


</div>



</div>


</section>

)

}