"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO FAQ INTELLIGENCE CMS
//
// Admin List Page
//
// Responsibility:
// FAQ knowledge management only
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";

import Link from "next/link";





export default function AstroFAQPage(){


  const [faqs,setFaqs] =

    useState<any[]>([]);



  const [loading,setLoading] =

    useState(true);



  const [error,setError] =

    useState("");









//////////////////////////////////////////////////////////////
// FETCH FAQ
//////////////////////////////////////////////////////////////

const fetchFaqs = async()=>{


try{


setLoading(true);





const res = await fetch(

"/api/admin/astro-faq",

{


cache:"no-store",


}

);






const data = await res.json();








if(data.success){


setFaqs(data.data);


}

else{


setError(

data.message ||

"Failed to load FAQ"

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


fetchFaqs();


},[]);









//////////////////////////////////////////////////////////////
// DELETE FAQ
//////////////////////////////////////////////////////////////

const deleteFAQ = async(id:string)=>{


const confirmDelete =

confirm(

"Delete this FAQ?"

);





if(!confirmDelete)

return;







try{


await fetch(

`/api/admin/astro-faq/${id}`,

{


method:"DELETE",


}

);





fetchFaqs();




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

Astro FAQ Intelligence CMS

</h1>




<p className="text-gray-400 mt-2">

Manage astrology FAQ knowledge

</p>



</div>







<Link

href="/admin/astro/astro-faq/create"

className="bg-orange-600 px-5 py-3 rounded-lg"

>


+ Add FAQ


</Link>





</div>









{loading && (


<div className="text-gray-400">

Loading FAQ...

</div>


)}









{error && (


<div className="bg-red-600 p-4 rounded-lg">


{error}


</div>


)}









{!loading && faqs.length===0 && (


<div className="bg-[#1e293b] p-6 rounded-xl">


No FAQ found.


</div>


)}









<div className="grid gap-5">



{faqs.map((item)=>(



<div

key={item._id}

className="bg-[#1e293b] rounded-xl p-6"


>







<div className="flex justify-between items-start">





<div>


<h2 className="text-xl font-semibold">

{item.question}

</h2>





<p className="text-gray-400 text-sm mt-2">

{item.slug}

</p>






<div className="flex gap-3 mt-3">


<span className="bg-slate-700 px-3 py-1 rounded text-sm">

{item.category}

</span>




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

href={`/admin/astro/astro-faq/${item._id}`}

className="bg-blue-600 px-4 py-2 rounded-lg"

>


View


</Link>








<Link

href={`/admin/astro/astro-faq/${item._id}/edit`}

className="bg-green-600 px-4 py-2 rounded-lg"

>


Edit


</Link>








<button

onClick={()=>deleteFAQ(item._id)}

className="bg-red-600 px-4 py-2 rounded-lg"

>


Delete


</button>





</div>






</div>









<p className="text-gray-300 mt-5">

{item.answer?.slice(0,250)}

{item.answer?.length>250 && "..."}

</p>







</div>



))}



</div>







</div>

);


}