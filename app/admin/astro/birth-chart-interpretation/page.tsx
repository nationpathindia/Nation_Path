"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH BIRTH CHART INTERPRETATION CMS
//
// Admin List Page
//
// Responsibility:
// Birth chart interpretation knowledge management only.
//
// Does NOT:
// - calculate astrology
// - modify astro engine
// - generate predictions
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";

import Link from "next/link";








export default function BirthChartInterpretationPage(){



  const [items,setItems] =

    useState<any[]>([]);



  const [loading,setLoading] =

    useState(true);



  const [error,setError] =

    useState("");









//////////////////////////////////////////////////////////////
// FETCH INTERPRETATIONS
//////////////////////////////////////////////////////////////

const fetchInterpretations = async()=>{


try{


setLoading(true);





const res = await fetch(

"/api/admin/astro/birth-chart-interpretation",

{


cache:"no-store",

}

);







const data = await res.json();







if(data.success){


setItems(data.data);


}


else{


setError(

data.message ||

"Failed to load birth chart interpretations"

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


fetchInterpretations();


},[]);









//////////////////////////////////////////////////////////////
// DELETE INTERPRETATION
//////////////////////////////////////////////////////////////

const deleteInterpretation = async(id:string)=>{


const confirmDelete =

confirm(

"Delete this birth chart interpretation?"

);







if(!confirmDelete)

return;








try{


await fetch(

`/api/admin/astro/birth-chart-interpretation/${id}`,

{


method:"DELETE",

}

);






fetchInterpretations();




}

catch(error){


console.error(error);


}



};









return (

<div className="min-h-screen bg-[#0f172a] text-white p-6">








<div className="flex justify-between items-center mb-8">







<div>


<h1 className="text-3xl font-bold">

Birth Chart Interpretation CMS

</h1>





<p className="text-gray-400 mt-2">

Manage astrology birth chart knowledge

</p>




</div>









<Link

href="/admin/astro/birth-chart-interpretation/create"

className="bg-orange-600 px-5 py-3 rounded-lg"

>


+ Add Interpretation


</Link>








</div>









{loading && (


<div className="text-gray-400">

Loading interpretations...

</div>


)}









{error && (


<div className="bg-red-600 p-4 rounded-lg">


{error}


</div>


)}









{!loading && items.length===0 && (


<div className="bg-[#1e293b] p-6 rounded-xl">


No interpretation found.


</div>


)}









<div className="grid gap-5">






{items.map((item)=>(




<div

key={item._id}

className="bg-[#1e293b] rounded-xl p-6"

>









<div className="flex justify-between items-start">








<div>


<h2 className="text-xl font-semibold">

{item.title}

</h2>







<p className="text-gray-400 text-sm mt-2">

{item.slug}

</p>








<div className="flex flex-wrap gap-3 mt-3">





<span className="bg-slate-700 px-3 py-1 rounded text-sm">

{item.category}

</span>







{item.planet && (

<span className="bg-slate-700 px-3 py-1 rounded text-sm">

Planet: {item.planet}

</span>

)}









{item.house && (

<span className="bg-slate-700 px-3 py-1 rounded text-sm">

House: {item.house}

</span>

)}










<span className="bg-slate-700 px-3 py-1 rounded text-sm">

Priority {item.priority}

</span>








<span className="bg-slate-700 px-3 py-1 rounded text-sm">

{item.status}

</span>






</div>






</div>









<div className="flex gap-3">









<Link

href={`/admin/astro/birth-chart-interpretation/${item._id}`}

className="bg-blue-600 px-4 py-2 rounded-lg"

>


View


</Link>









<Link

href={`/admin/astro/birth-chart-interpretation/${item._id}/edit`}

className="bg-green-600 px-4 py-2 rounded-lg"

>


Edit


</Link>









<button

onClick={()=>deleteInterpretation(item._id)}

className="bg-red-600 px-4 py-2 rounded-lg"

>


Delete


</button>








</div>









</div>









<p className="text-gray-300 mt-5">


{item.interpretation?.slice(0,250)}


{item.interpretation?.length>250 && "..."}



</p>









</div>






))}








</div>








</div>

);


}