"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO REMEDY INTELLIGENCE CMS
//
// View Page
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";

import Link from "next/link";

import { useParams } from "next/navigation";






export default function ViewRemedyIntelligencePage(){


  const params = useParams();


  const id = params.id as string;





  const [remedy,setRemedy] =

    useState<any>(null);



  const [loading,setLoading] =

    useState(true);









//////////////////////////////////////////////////////////////
// FETCH REMEDY
//////////////////////////////////////////////////////////////

useEffect(()=>{


const loadData = async()=>{


try{


const res = await fetch(

`/api/admin/remedy-intelligence/${id}`,

{

cache:"no-store",

}

);



const data = await res.json();




if(data.success){


setRemedy(data.data);


}



}

catch(error){


console.error(error);


}

finally{


setLoading(false);


}



};



if(id)

loadData();



},[id]);









if(loading){


return (


<div className="min-h-screen bg-[#0f172a] text-white p-6">


Loading...


</div>


);


}









if(!remedy){


return (


<div className="min-h-screen bg-[#0f172a] text-white p-6">


Remedy not found


</div>


);


}









return (

<div className="min-h-screen bg-[#0f172a] text-white p-6">





<div className="flex justify-between items-center mb-8">



<div>


<h1 className="text-3xl font-bold">

{remedy.remedy}

</h1>


<p className="text-gray-400">

{remedy.slug}

</p>


</div>





<Link

href={`/admin/astro/remedy-intelligence/${id}/edit`}

className="bg-orange-600 px-5 py-3 rounded-lg"

>


Edit


</Link>




</div>









<div className="grid gap-6">







<div className="bg-[#1e293b] rounded-xl p-6">


<h2 className="text-xl font-semibold mb-3">

Basic Information

</h2>



<p>

Category:

{" "}

{remedy.category}

</p>



<p>

Status:

{" "}

{remedy.status}

</p>




<p className="mt-3 text-gray-300">

{remedy.description}

</p>



</div>









<div className="bg-[#1e293b] rounded-xl p-6">


<h2 className="text-xl font-semibold mb-3">

Related Information

</h2>




<p>

Planets:

{" "}

{remedy.relatedPlanets?.join(", ") || "-"}

</p>




<p>

Doshas:

{" "}

{remedy.relatedDoshas?.join(", ") || "-"}

</p>



<p>

Problems:

{" "}

{remedy.relatedProblems?.join(", ") || "-"}

</p>



</div>









<div className="bg-[#1e293b] rounded-xl p-6">


<h2 className="text-xl font-semibold mb-3">

Procedure

</h2>



<p className="text-gray-300">

{remedy.procedure || "-"}

</p>



</div>









<div className="bg-[#1e293b] rounded-xl p-6">


<h2 className="text-xl font-semibold mb-3">

Benefits

</h2>




<ul className="list-disc ml-5">


{remedy.benefits?.map(

(item:string,index:number)=>(


<li key={index}>

{item}

</li>


))}



</ul>



</div>









<div className="bg-[#1e293b] rounded-xl p-6">


<h2 className="text-xl font-semibold mb-3">

Details

</h2>



<p>

Duration:

{" "}

{remedy.duration || "-"}

</p>



<p>

Mantra:

{" "}

{remedy.mantra || "-"}

</p>



<p>

Gemstone:

{" "}

{remedy.gemstone || "-"}

</p>



<p>

Metal:

{" "}

{remedy.metal || "-"}

</p>



<p>

Day:

{" "}

{remedy.day || "-"}

</p>



<p>

Color:

{" "}

{remedy.color || "-"}

</p>



</div>









<div className="bg-[#1e293b] rounded-xl p-6">


<h2 className="text-xl font-semibold mb-3">

Precautions

</h2>



<ul className="list-disc ml-5">


{remedy.precautions?.map(

(item:string,index:number)=>(


<li key={index}>

{item}

</li>


))}



</ul>



</div>









</div>






</div>

);


}