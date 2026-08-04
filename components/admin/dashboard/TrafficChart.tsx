"use client";

import {
ResponsiveContainer,
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
CartesianGrid
} from "recharts";


interface Props{

data:any[];

}



export default function TrafficChart({

data=[]

}:Props){



const totalViews = data.reduce(

(sum,item)=>sum + (item.views || 0),

0

);



const averageViews = data.length

?

Math.round(totalViews / data.length)

:

0;



const peakDay = data.length

?

data.reduce(

(max,item)=>

item.views > max.views

?

item

:

max

)

:

null;



return(


<div
className="
bg-[#0e1726]
border
border-gray-800
rounded-xl
p-6
shadow-sm
"
>



{/* HEADER */}


<div
className="
flex
justify-between
items-start
mb-6
flex-wrap
gap-4
"
>


<div>

<h2
className="
text-xl
font-semibold
"
>

Traffic Intelligence

</h2>


<p
className="
text-sm
text-gray-400
mt-1
"
>

Daily article views performance

</p>


</div>





<div
className="
text-right
"
>


<p
className="
text-xs
text-gray-400
"
>

Last 30 Days

</p>


<p
className="
text-sm
text-orange-400
font-semibold
"
>

Audience Analytics

</p>


</div>



</div>







{/* STATS */}


<div
className="
grid
grid-cols-3
gap-4
mb-8
"
>


<div
className="
bg-black/20
rounded-lg
p-4
border
border-white/5
"
>

<p
className="
text-xs
text-gray-400
"
>

Total Views

</p>


<h3
className="
text-xl
font-bold
mt-1
"
>

{totalViews.toLocaleString()}

</h3>


</div>





<div
className="
bg-black/20
rounded-lg
p-4
border
border-white/5
"
>

<p
className="
text-xs
text-gray-400
"
>

Daily Average

</p>


<h3
className="
text-xl
font-bold
mt-1
"
>

{averageViews.toLocaleString()}

</h3>


</div>






<div
className="
bg-black/20
rounded-lg
p-4
border
border-white/5
"
>

<p
className="
text-xs
text-gray-400
"
>

Peak Day

</p>


<h3
className="
text-sm
font-bold
mt-2
"
>

{peakDay?.date || "-"}

</h3>


</div>



</div>







{

!data.length ?


<div
className="
h-[320px]
flex
items-center
justify-center
text-gray-400
"
>

No traffic data available

</div>


:





<ResponsiveContainer

width="100%"

height={320}

>


<LineChart

data={data}

>


<CartesianGrid

stroke="#1f2937"

/>



<XAxis

dataKey="date"

stroke="#9ca3af"

/>




<YAxis

stroke="#9ca3af"

/>




<Tooltip

formatter={(value:any)=>

[

`${Number(value).toLocaleString()} views`,

"Traffic"

]

}

/>




<Line

type="monotone"

dataKey="views"

stroke="#EA661B"

strokeWidth={3}

dot={false}

activeDot={{r:6}}

/>



</LineChart>


</ResponsiveContainer>



}



</div>


)

}