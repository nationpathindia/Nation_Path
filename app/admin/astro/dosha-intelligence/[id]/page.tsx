"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO DOSHA INTELLIGENCE CMS
//
// View Page
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";

import Link from "next/link";

import { useParams } from "next/navigation";





export default function ViewDoshaIntelligencePage(){


  const params = useParams();


  const id = params.id as string;





  const [dosha,setDosha] =

    useState<any>(null);



  const [loading,setLoading] =

    useState(true);









//////////////////////////////////////////////////////////////
// FETCH SINGLE DOSHA
//////////////////////////////////////////////////////////////

useEffect(()=>{


  const loadData = async()=>{


    try{


      const res = await fetch(

        `/api/admin/dosha-intelligence/${id}`,

        {


          cache:"no-store",

        }


      );



      const data =

        await res.json();




      if(data.success){


        setDosha(data.data);


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









if(!dosha){


  return (


    <div className="min-h-screen bg-[#0f172a] text-white p-6">


      Dosha not found


    </div>


  );


}









return (

<div className="min-h-screen bg-[#0f172a] text-white p-6">





<div className="flex justify-between items-center mb-8">



<div>


<h1 className="text-3xl font-bold">

{dosha.dosha}

</h1>


<p className="text-gray-400">

{dosha.slug}

</p>


</div>





<Link

href={`/admin/astro/dosha-intelligence/${id}/edit`}

className="bg-orange-600 px-5 py-3 rounded-lg"

>


Edit


</Link>



</div>









<div className="grid gap-6">







<div className="bg-[#1e293b] p-6 rounded-xl">


<h2 className="text-xl font-semibold mb-3">

Basic Information

</h2>


<p>

Category:

{" "}

{dosha.category}

</p>



<p>

Status:

{" "}

{dosha.status}

</p>



<p className="mt-3 text-gray-300">

{dosha.description}

</p>



</div>









<div className="bg-[#1e293b] p-6 rounded-xl">


<h2 className="text-xl font-semibold mb-3">

Formation Explanation

</h2>


<p className="text-gray-300">

{dosha.formationExplanation || "-"}

</p>


</div>









<div className="bg-[#1e293b] p-6 rounded-xl">


<h2 className="text-xl font-semibold mb-3">

Causes

</h2>



<ul className="list-disc ml-5">


{dosha.causes?.map(

(item:string,index:number)=>(


<li key={index}>

{item}

</li>


))}


</ul>


</div>









<div className="bg-[#1e293b] p-6 rounded-xl">


<h2 className="text-xl font-semibold mb-3">

Effects

</h2>



<h3 className="text-green-400">

Positive Effects

</h3>


<ul className="list-disc ml-5 mb-5">


{dosha.positiveEffects?.map(

(item:string,index:number)=>(


<li key={index}>

{item}

</li>


))}


</ul>





<h3 className="text-red-400">

Negative Effects

</h3>


<ul className="list-disc ml-5">


{dosha.negativeEffects?.map(

(item:string,index:number)=>(


<li key={index}>

{item}

</li>


))}


</ul>


</div>









<div className="bg-[#1e293b] p-6 rounded-xl">


<h2 className="text-xl font-semibold mb-3">

Life Areas

</h2>



<div className="space-y-2">


<p>

Career:

{" "}

{dosha.lifeAreas?.career}

</p>


<p>

Finance:

{" "}

{dosha.lifeAreas?.finance}

</p>


<p>

Marriage:

{" "}

{dosha.lifeAreas?.marriage}

</p>


<p>

Health:

{" "}

{dosha.lifeAreas?.health}

</p>


<p>

Spirituality:

{" "}

{dosha.lifeAreas?.spirituality}

</p>


</div>


</div>









<div className="bg-[#1e293b] p-6 rounded-xl">


<h2 className="text-xl font-semibold mb-3">

Remedies

</h2>



<ul className="list-disc ml-5">


{dosha.remedies?.map(

(item:string,index:number)=>(


<li key={index}>

{item}

</li>


))}


</ul>


</div>









<div className="bg-[#1e293b] p-6 rounded-xl">


<h2 className="text-xl font-semibold mb-3">

Mantras

</h2>



<ul className="list-disc ml-5">


{dosha.mantras?.map(

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