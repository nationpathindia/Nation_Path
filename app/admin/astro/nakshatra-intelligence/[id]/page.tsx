"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO NAKSHATRA INTELLIGENCE CMS
//
// View Page
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";

import Link from "next/link";

import { useParams } from "next/navigation";

export default function ViewNakshatraIntelligencePage(){

  const params = useParams();

  const id = params.id as string;

  const [nakshatra,setNakshatra] =

    useState<any>(null);

  const [loading,setLoading] =

    useState(true);

//////////////////////////////////////////////////////////////
// FETCH SINGLE
//////////////////////////////////////////////////////////////

useEffect(()=>{

  const loadData = async()=>{

    try{

      const res = await fetch(

        `/api/admin/nakshatra-intelligence/${id}`,

        {

          cache:"no-store",

        }

      );

      const data = await res.json();

      if(data.success){

        setNakshatra(data.data);

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

  return(

    <div className="min-h-screen bg-[#0f172a] text-white p-6">

      Loading...

    </div>

  );

}

if(!nakshatra){

  return(

    <div className="min-h-screen bg-[#0f172a] text-white p-6">

      Nakshatra not found

    </div>

  );

}

return(

<div className="min-h-screen bg-[#0f172a] text-white p-6">

<div className="flex justify-between items-center mb-8">

<div>

<h1 className="text-3xl font-bold">

{nakshatra.nakshatra}

</h1>

<p className="text-gray-400">

{nakshatra.slug}

</p>

</div>

<Link

href={`/admin/astro/nakshatra-intelligence/${id}/edit`}

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

Number: {nakshatra.number}

</p>

<p>

Ruler: {nakshatra.ruler || "-"}

</p>

<p>

Deity: {nakshatra.deity || "-"}

</p>

<p>

Status: {nakshatra.status}

</p>

<p className="mt-3 text-gray-300">

{nakshatra.description}

</p>

</div>
<div className="bg-[#1e293b] p-6 rounded-xl">

<h2 className="text-xl font-semibold mb-3">

Classification

</h2>

<div className="space-y-2">

<p>Gana: {nakshatra.gana || "-"}</p>

<p>Guna: {nakshatra.guna || "-"}</p>

<p>Yoni: {nakshatra.yoni || "-"}</p>

<p>Nadi: {nakshatra.nadi || "-"}</p>

<p>Varna: {nakshatra.varna || "-"}</p>

<p>Element: {nakshatra.element || "-"}</p>

<p>Nature: {nakshatra.nature || "-"}</p>

<p>Motivation: {nakshatra.motivation || "-"}</p>

<p>Gender: {nakshatra.gender || "-"}</p>

<p>Direction: {nakshatra.direction || "-"}</p>

<p>Animal: {nakshatra.animal || "-"}</p>

<p>Tree: {nakshatra.tree || "-"}</p>

</div>

</div>





<div className="bg-[#1e293b] p-6 rounded-xl">

<h2 className="text-xl font-semibold mb-3">

Personality

</h2>

<ul className="list-disc ml-5">

{nakshatra.personality?.map(

(item:string,index:number)=>(

<li key={index}>

{item}

</li>

)

)}

</ul>

</div>





<div className="bg-[#1e293b] p-6 rounded-xl">

<h2 className="text-xl font-semibold mb-3">

Strengths

</h2>

<ul className="list-disc ml-5">

{nakshatra.strengths?.map(

(item:string,index:number)=>(

<li key={index}>

{item}

</li>

)

)}

</ul>

</div>





<div className="bg-[#1e293b] p-6 rounded-xl">

<h2 className="text-xl font-semibold mb-3">

Weaknesses

</h2>

<ul className="list-disc ml-5">

{nakshatra.weaknesses?.map(

(item:string,index:number)=>(

<li key={index}>

{item}

</li>

)

)}

</ul>

</div>





<div className="bg-[#1e293b] p-6 rounded-xl">

<h2 className="text-xl font-semibold mb-3">

Profession

</h2>

<ul className="list-disc ml-5">

{nakshatra.profession?.map(

(item:string,index:number)=>(

<li key={index}>

{item}

</li>

)

)}

</ul>

</div>





<div className="bg-[#1e293b] p-6 rounded-xl">

<h2 className="text-xl font-semibold mb-3">

Relationships

</h2>

<ul className="list-disc ml-5">

{nakshatra.relationships?.map(

(item:string,index:number)=>(

<li key={index}>

{item}

</li>

)

)}

</ul>

</div>





<div className="bg-[#1e293b] p-6 rounded-xl">

<h2 className="text-xl font-semibold mb-3">

Health

</h2>

<ul className="list-disc ml-5">

{nakshatra.health?.map(

(item:string,index:number)=>(

<li key={index}>

{item}

</li>

)

)}

</ul>

</div>





<div className="bg-[#1e293b] p-6 rounded-xl">

<h2 className="text-xl font-semibold mb-3">

Spirituality

</h2>

<ul className="list-disc ml-5">

{nakshatra.spirituality?.map(

(item:string,index:number)=>(

<li key={index}>

{item}

</li>

)

)}

</ul>

</div>





<div className="bg-[#1e293b] p-6 rounded-xl">

<h2 className="text-xl font-semibold mb-3">

Remedies

</h2>

<ul className="list-disc ml-5">

{nakshatra.remedies?.map(

(item:string,index:number)=>(

<li key={index}>

{item}

</li>

)

)}

</ul>

<p className="mt-5">

<strong>Mantra:</strong>

{" "}

{nakshatra.mantra || "-"}

</p>

<p>

<strong>Gemstone:</strong>

{" "}

{nakshatra.gemstone || "-"}

</p>

<p>

<strong>Color:</strong>

{" "}

{nakshatra.color || "-"}

</p>

</div>





<div className="bg-[#1e293b] p-6 rounded-xl">

<h2 className="text-xl font-semibold mb-3">

SEO

</h2>

<p>

Title:

{" "}

{nakshatra.seo?.title || "-"}

</p>

<p>

Description:

{" "}

{nakshatra.seo?.description || "-"}

</p>

</div>





<div className="bg-[#1e293b] p-6 rounded-xl">

<h2 className="text-xl font-semibold mb-3">

Media

</h2>

<p>

Icon:

{" "}

{nakshatra.media?.icon || "-"}

</p>

<p>

Banner:

{" "}

{nakshatra.media?.banner || "-"}

</p>

</div>

</div>

</div>

);

}