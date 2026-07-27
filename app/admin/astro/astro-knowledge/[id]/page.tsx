"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO KNOWLEDGE CMS
//
// View Page
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";

import Link from "next/link";

import { useParams } from "next/navigation";







export default function ViewAstroKnowledgePage(){


  const params = useParams();


  const id = params.id as string;





  const [article,setArticle] =

    useState<any>(null);



  const [loading,setLoading] =

    useState(true);









//////////////////////////////////////////////////////////////
// LOAD ARTICLE
//////////////////////////////////////////////////////////////

useEffect(()=>{


const loadArticle = async()=>{


try{


const res = await fetch(

`/api/admin/astro-knowledge/${id}`,

{

cache:"no-store",

}

);



const data = await res.json();





if(data.success){


setArticle(data.data);


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

loadArticle();



},[id]);









if(loading){


return (


<div className="min-h-screen bg-[#0f172a] text-white p-6">


Loading...


</div>


);


}








if(!article){


return (


<div className="min-h-screen bg-[#0f172a] text-white p-6">


Article not found


</div>


);


}









return (

<div className="min-h-screen bg-[#0f172a] text-white p-6">






<div className="flex justify-between items-center mb-8">



<div>


<h1 className="text-3xl font-bold">

{article.title}

</h1>



<p className="text-gray-400">

{article.slug}

</p>


</div>






<Link

href={`/admin/astro/astro-knowledge/${id}/edit`}

className="bg-orange-600 px-5 py-3 rounded-lg"

>


Edit


</Link>






</div>









<div className="grid gap-6">







<div className="bg-[#1e293b] p-6 rounded-xl">


<h2 className="text-xl font-semibold mb-4">

Basic Information

</h2>




<p>

Category:

{" "}

{article.category}

</p>



<p>

Language:

{" "}

{article.language}

</p>




<p>

Status:

{" "}

{article.status}

</p>




<p className="mt-4 text-gray-300">

{article.shortDescription}

</p>



</div>









<div className="bg-[#1e293b] p-6 rounded-xl">


<h2 className="text-xl font-semibold mb-4">

Content

</h2>




<p className="whitespace-pre-line text-gray-300">

{article.content}

</p>



</div>









<div className="bg-[#1e293b] p-6 rounded-xl">


<h2 className="text-xl font-semibold mb-4">

Related Knowledge

</h2>





<p>

Zodiac:

{" "}

{article.relatedZodiac?.join(", ") || "-"}

</p>





<p>

Planets:

{" "}

{article.relatedPlanets?.join(", ") || "-"}

</p>





<p>

Doshas:

{" "}

{article.relatedDoshas?.join(", ") || "-"}

</p>





<p>

Yogas:

{" "}

{article.relatedYogas?.join(", ") || "-"}

</p>





<p>

Dashas:

{" "}

{article.relatedDashas?.join(", ") || "-"}

</p>





<p>

Remedies:

{" "}

{article.relatedRemedies?.join(", ") || "-"}

</p>





</div>









<div className="bg-[#1e293b] p-6 rounded-xl">


<h2 className="text-xl font-semibold mb-4">

Tags

</h2>




<p>

{article.tags?.join(", ") || "-"}

</p>



</div>









{article.faq && article.faq.length>0 && (


<div className="bg-[#1e293b] p-6 rounded-xl">


<h2 className="text-xl font-semibold mb-4">

FAQ

</h2>






{article.faq.map(

(item:any,index:number)=>(


<div

key={index}

className="mb-4"


>


<p className="font-semibold">

Q: {item.question}

</p>



<p className="text-gray-300">

A: {item.answer}

</p>




</div>


))}



</div>


)}









<div className="bg-[#1e293b] p-6 rounded-xl">


<h2 className="text-xl font-semibold mb-4">

SEO

</h2>




<p>

Title:

{" "}

{article.seo?.title || "-"}

</p>




<p>

Description:

{" "}

{article.seo?.description || "-"}

</p>




<p>

Keywords:

{" "}

{article.seo?.keywords?.join(", ") || "-"}

</p>



</div>







</div>






</div>

);


}