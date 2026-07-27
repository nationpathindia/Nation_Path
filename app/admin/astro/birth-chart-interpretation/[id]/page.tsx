"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH BIRTH CHART INTERPRETATION CMS
//
// View Single Page
//
// Responsibility:
// Astrology knowledge content viewing only.
//
// Does NOT:
// - calculate astrology
// - modify astro engine
// - generate predictions
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";

import Link from "next/link";

import { useParams } from "next/navigation";








export default function BirthChartInterpretationViewPage(){



const params = useParams();



const id = params.id as string;







const [item,setItem] =

useState<any>(null);



const [loading,setLoading] =

useState(true);



const [error,setError] =

useState("");









//////////////////////////////////////////////////////////////
// FETCH SINGLE INTERPRETATION
//////////////////////////////////////////////////////////////

const fetchInterpretation = async()=>{


try{


setLoading(true);






const res = await fetch(

`/api/admin/astro/birth-chart-interpretation/${id}`,

{

cache:"no-store",

}

);








const data = await res.json();







if(data.success){


setItem(data.data);


}

else{


setError(

data.message ||

"Failed to load interpretation"

);


}







}

catch(err:any){


setError(

err.message

);


}

finally{


setLoading(false);


}



};









useEffect(()=>{


if(id)

fetchInterpretation();



},[id]);














if(loading){


return (

<div className="min-h-screen bg-[#0f172a] text-white p-6">

Loading interpretation...

</div>

);


}









if(error){


return (

<div className="min-h-screen bg-[#0f172a] text-white p-6">


<div className="bg-red-600 p-5 rounded-lg">

{error}

</div>


</div>

);


}









return (

<div className="min-h-screen bg-[#0f172a] text-white p-6">









<div className="flex justify-between items-center mb-8">







<div>


<h1 className="text-3xl font-bold">

{item.title}

</h1>






<p className="text-gray-400 mt-2">

{item.slug}

</p>





</div>








<Link

href={`/admin/astro/birth-chart-interpretation/${id}/edit`}

className="bg-green-600 px-5 py-3 rounded-lg"

>


Edit


</Link>







</div>









<div className="grid gap-6">









<div className="bg-[#1e293b] p-6 rounded-xl">


<h2 className="text-xl font-semibold mb-4">

Astro Reference

</h2>





<div className="flex flex-wrap gap-3">


<span className="bg-slate-700 px-3 py-1 rounded">

{item.category}

</span>






{item.planet && (

<span className="bg-slate-700 px-3 py-1 rounded">

Planet: {item.planet}

</span>

)}








{item.house && (

<span className="bg-slate-700 px-3 py-1 rounded">

House: {item.house}

</span>

)}








{item.zodiac && (

<span className="bg-slate-700 px-3 py-1 rounded">

Zodiac: {item.zodiac}

</span>

)}






</div>



</div>













<div className="bg-[#1e293b] p-6 rounded-xl">


<h2 className="text-xl font-semibold mb-4">

Interpretation

</h2>




<p className="text-gray-300 whitespace-pre-line">

{item.interpretation}

</p>



</div>













<div className="bg-[#1e293b] p-6 rounded-xl">


<h2 className="text-xl font-semibold mb-4">

Positive Effects

</h2>




<ul className="list-disc ml-6 text-gray-300">

{item.positiveEffects?.map(

(effect:string,index:number)=>(


<li key={index}>

{effect}

</li>


)

)}


</ul>


</div>













<div className="bg-[#1e293b] p-6 rounded-xl">


<h2 className="text-xl font-semibold mb-4">

Negative Effects

</h2>




<ul className="list-disc ml-6 text-gray-300">

{item.negativeEffects?.map(

(effect:string,index:number)=>(


<li key={index}>

{effect}

</li>


)

)}


</ul>


</div>













<div className="bg-[#1e293b] p-6 rounded-xl">


<h2 className="text-xl font-semibold mb-4">

Remedies

</h2>




<ul className="list-disc ml-6 text-gray-300">

{item.remedies?.map(

(effect:string,index:number)=>(


<li key={index}>

{effect}

</li>


)

)}


</ul>


</div>













<div className="bg-[#1e293b] p-6 rounded-xl">


<h2 className="text-xl font-semibold mb-4">

SEO Information

</h2>





<p>

Title:

{item.seo?.title || "-"}

</p>





<p>

Description:

{item.seo?.description || "-"}

</p>



</div>













<div className="bg-[#1e293b] p-6 rounded-xl">


<div className="flex gap-3">



<span className="bg-slate-700 px-3 py-1 rounded">

Status: {item.status}

</span>






<span className="bg-slate-700 px-3 py-1 rounded">

Priority: {item.priority}

</span>





<span className="bg-slate-700 px-3 py-1 rounded">

Language: {item.language}

</span>




</div>


</div>









</div>








</div>

);


}