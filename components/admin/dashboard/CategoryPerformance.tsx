"use client";


import {

ResponsiveContainer,

BarChart,

Bar,

XAxis,

YAxis,

Tooltip,

CartesianGrid,

Cell

} from "recharts";



interface Props{

data:any[];

}




const COLORS = [

"#EA661B",

"#163C80",

"#22C55E",

"#EAB308",

"#8B5CF6",

"#EC4899",

"#06B6D4",

"#F43F5E"

];







export default function CategoryPerformance({

data

}:Props){





const categories = data || [];



const totalCategories =
categories.length;



const totalArticles =
categories.reduce(
(sum,item)=>
sum + (item.articles || 0),
0
);



const totalViews =
categories.reduce(
(sum,item)=>
sum + (item.views || 0),
0
);





const topCategory =

[...categories]

.sort(

(a,b)=>

b.views-a.views

)[0]

||

{

name:"-",

views:0

};





const topThree =

[...categories]

.sort(

(a,b)=>

b.views-a.views

)

.slice(0,3);









return(


<div

className="
bg-black/30
backdrop-blur-xl
border
border-white/10
rounded-xl
p-6
"

>





{/* HEADER */}

<div className="mb-6">


<h2

className="
text-lg
font-semibold
"

>

Category Performance

</h2>



<p

className="
text-sm
text-gray-400
mt-1
"

>

Category wise traffic and content intelligence

</p>


</div>









{/* SUMMARY STRIP */}


<div

className="
grid
md:grid-cols-3
gap-4
mb-8
"

>


<div

className="
bg-white/5
rounded-xl
p-4
"

>

<p className="text-xs text-gray-400">

Total Categories

</p>


<h3 className="text-2xl font-bold mt-2">

{totalCategories}

</h3>


</div>






<div

className="
bg-white/5
rounded-xl
p-4
"

>

<p className="text-xs text-gray-400">

Published Articles

</p>


<h3 className="text-2xl font-bold mt-2">

{totalArticles}

</h3>


</div>







<div

className="
bg-white/5
rounded-xl
p-4
"

>

<p className="text-xs text-gray-400">

Top Category

</p>


<h3 className="text-lg font-bold mt-2">

{topCategory.name}

</h3>


<p className="text-xs text-green-400 mt-1">

{topCategory.views?.toLocaleString()} views

</p>


</div>





</div>









{/* TOP 3 CATEGORY STRIPE */}



<div className="mb-8">


<h3

className="
text-sm
font-semibold
mb-4
text-gray-300
"

>

🏆 Top Performing Categories

</h3>





<div

className="
grid
md:grid-cols-3
gap-4
"

>



{

topThree.map((category,index)=>{


const medals = [

"🥇",

"🥈",

"🥉"

];



const percentage =

totalViews

?

(

(category.views / totalViews)

*

100

).toFixed(1)

:

0;





return(


<div

key={category.name}

className="

rounded-2xl

border

border-white/10

bg-gradient-to-br

from-white/10

to-white/5

p-5

"

>


<div

className="
flex
justify-between
items-center
"

>


<span className="text-2xl">

{medals[index]}

</span>



<span

className="
text-xs
text-orange-400
font-bold
"

>

#{index+1}

</span>



</div>







<h4

className="
mt-4
text-lg
font-bold
"

>

{category.name}

</h4>








<div

className="
mt-4
space-y-2
text-sm
"

>


<div className="flex justify-between">

<span className="text-gray-400">

Articles

</span>


<span>

{category.articles}

</span>


</div>






<div className="flex justify-between">

<span className="text-gray-400">

Views

</span>


<span>

{category.views?.toLocaleString()}

</span>


</div>






<div className="flex justify-between">

<span className="text-gray-400">

Traffic Share

</span>


<span className="text-green-400 font-semibold">

{percentage}%

</span>


</div>




</div>



</div>


)


})


}



</div>



</div>









{/* CATEGORY CHART */}



<ResponsiveContainer

width="100%"

height={360}

>


<BarChart

data={categories}

layout="vertical"

margin={{

left:20

}}

>



<CartesianGrid

stroke="#334155"

/>







<XAxis

type="number"

stroke="#94a3b8"

/>





<YAxis

type="category"

dataKey="name"

stroke="#94a3b8"

width={110}

/>







<Tooltip


cursor={{

fill:"rgba(255,255,255,0.05)"

}}


formatter={(value:number)=>[

value.toLocaleString(),

"Views"

]}


contentStyle={{

background:"#111827",

border:"1px solid #374151",

borderRadius:"14px",

color:"#fff"

}}


labelStyle={{

color:"#fff"

}}


itemStyle={{

color:"#fff"

}}


/>







<Bar

dataKey="views"

radius={[0,10,10,0]}

barSize={22}

>



{

categories.map((entry,index)=>(


<Cell

key={`cell-${index}`}

fill={COLORS[index % COLORS.length]}

/>


))


}



</Bar>





</BarChart>


</ResponsiveContainer>





</div>


)


}