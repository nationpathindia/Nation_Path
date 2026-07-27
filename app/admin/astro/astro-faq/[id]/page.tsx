"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO FAQ INTELLIGENCE CMS
//
// View Page
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";

import Link from "next/link";

import { useParams } from "next/navigation";







export default function ViewAstroFAQPage(){


const params = useParams();


const id = params.id as string;






const [faq,setFaq] =

useState<any>(null);



const [loading,setLoading] =

useState(true);









//////////////////////////////////////////////////////////////
// LOAD FAQ
//////////////////////////////////////////////////////////////

useEffect(()=>{


const loadFAQ = async()=>{


try{


const res = await fetch(

`/api/admin/astro-faq/${id}`,

{


cache:"no-store",


}

);






const data = await res.json();







if(data.success){


setFaq(data.data);


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

loadFAQ();





},[id]);









if(loading){


return (


<div className="min-h-screen bg-[#0f172a] text-white p-6">


Loading...


</div>


);


}









if(!faq){


return (


<div className="min-h-screen bg-[#0f172a] text-white p-6">


FAQ not found


</div>


);


}









return (

<div className="min-h-screen bg-[#0f172a] text-white p-6">






<div className="flex justify-between items-center mb-8">





<div>


<h1 className="text-3xl font-bold">

{faq.question}

</h1>




<p className="text-gray-400 mt-2">

{faq.slug}

</p>



</div>








<Link

href={`/admin/astro/astro-faq/${id}/edit`}

className="bg-orange-600 px-5 py-3 rounded-lg"

>


Edit


</Link>





</div>









<div className="grid gap-6">








<div className="bg-[#1e293b] p-6 rounded-xl">


<h2 className="text-xl font-semibold mb-4">

Answer

</h2>



<p className="text-gray-300 whitespace-pre-line">

{faq.answer}

</p>



</div>









<div className="bg-[#1e293b] p-6 rounded-xl">


<h2 className="text-xl font-semibold mb-4">

Information

</h2>





<p>

Category:

{" "}

{faq.category}

</p>





<p>

Language:

{" "}

{faq.language}

</p>





<p>

Priority:

{" "}

{faq.priority}

</p>





<p>

Status:

{" "}

{faq.status}

</p>



</div>









<div className="bg-[#1e293b] p-6 rounded-xl">


<h2 className="text-xl font-semibold mb-4">

Related Knowledge

</h2>





<p>

Zodiac:

{" "}

{faq.relatedZodiac?.join(", ") || "-"}

</p>





<p>

Planets:

{" "}

{faq.relatedPlanets?.join(", ") || "-"}

</p>





<p>

Doshas:

{" "}

{faq.relatedDoshas?.join(", ") || "-"}

</p>





<p>

Yogas:

{" "}

{faq.relatedYogas?.join(", ") || "-"}

</p>





<p>

Dashas:

{" "}

{faq.relatedDashas?.join(", ") || "-"}

</p>





<p>

Remedies:

{" "}

{faq.relatedRemedies?.join(", ") || "-"}

</p>





</div>









<div className="bg-[#1e293b] p-6 rounded-xl">


<h2 className="text-xl font-semibold mb-4">

Keywords

</h2>



<p>

{faq.keywords?.join(", ") || "-"}

</p>



</div>









<div className="bg-[#1e293b] p-6 rounded-xl">


<h2 className="text-xl font-semibold mb-4">

SEO

</h2>




<p>

Title:

{" "}

{faq.seo?.title || "-"}

</p>





<p>

Description:

{" "}

{faq.seo?.description || "-"}

</p>





<p>

Keywords:

{" "}

{faq.seo?.keywords?.join(", ") || "-"}

</p>





</div>







</div>






</div>

);


}