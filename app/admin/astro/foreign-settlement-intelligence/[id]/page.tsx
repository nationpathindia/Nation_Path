"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// View Foreign Settlement Intelligence
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";



export default function ViewForeignSettlementPage(){


  const params = useParams();


  const id = params.id as string;





  const [data,setData] = useState<any>(null);

  const [loading,setLoading] = useState(true);









  useEffect(()=>{


    loadData();


  },[]);









  const loadData = async()=>{


    try{


      const res = await fetch(


        `/api/admin/foreign-settlement-intelligence/${id}`


      );


      const json = await res.json();





      if(json.success){


        setData(json.data);


      }



    }

    catch(error){


      console.error(error);


    }

    finally{


      setLoading(false);


    }


  };









  if(loading){


    return (


      <div className="min-h-screen bg-[#0f172a] text-white p-8">


        Loading Foreign Settlement Intelligence...


      </div>


    );


  }









  if(!data){


    return (


      <div className="min-h-screen bg-[#0f172a] text-white p-8">


        Foreign Settlement Intelligence not found


      </div>


    );


  }









  return (



<div className="min-h-screen bg-[#0f172a] text-white p-8">







<div className="flex justify-between items-center mb-8">





<div>



<h1 className="text-3xl font-bold">


🌍 {data.title}


</h1>





<p className="text-gray-400 mt-2">


Foreign Settlement Astrology Knowledge


</p>





</div>







<Link


href={`/admin/astro/foreign-settlement-intelligence/${id}/edit`}


className="bg-orange-600 px-6 py-3 rounded-xl"


>


Edit


</Link>







</div>









<div className="bg-[#1e293b] rounded-xl p-8 space-y-8">







<section>


<h2 className="text-xl font-semibold mb-3">


Basic Information


</h2>







<p>


<b>Slug:</b> {data.slug}


</p>







<p>


<b>Settlement Type:</b> {data.settlementType}


</p>







<p>


<b>Status:</b> {data.status}


</p>







</section>









<section>


<h2 className="text-xl font-semibold mb-3">


Astrology Factors


</h2>







<p>


<b>Planets:</b>


</p>


<p className="text-gray-300">


{data.planets?.join(", ")}


</p>







<p className="mt-3">


<b>Zodiac Signs:</b>


</p>


<p className="text-gray-300">


{data.zodiacSigns?.join(", ")}


</p>







<p className="mt-3">


<b>Houses:</b>


</p>


<p className="text-gray-300">


{data.houses?.join(", ")}


</p>







</section>









<section>


<h2 className="text-xl font-semibold mb-3">


Foreign Settlement Knowledge


</h2>







<p>


<b>Countries:</b>


</p>


<p className="text-gray-300">


{data.countries?.join(", ")}


</p>







<p className="mt-3">


<b>Foreign Travel:</b>


</p>


<p className="text-gray-300">


{data.foreignTravel?.join(", ")}


</p>







<p className="mt-3">


<b>Migration Indicators:</b>


</p>


<p className="text-gray-300">


{data.migrationIndicators?.join(", ")}


</p>







<p className="mt-3">


<b>Overseas Career:</b>


</p>


<p className="text-gray-300">


{data.overseasCareer?.join(", ")}


</p>







<p className="mt-3">


<b>International Opportunities:</b>


</p>


<p className="text-gray-300">


{data.internationalOpportunities?.join(", ")}


</p>







<p className="mt-3">


<b>Foreign Connections:</b>


</p>


<p className="text-gray-300">


{data.foreignConnections?.join(", ")}


</p>







<p className="mt-3">


<b>Relocation Factors:</b>


</p>


<p className="text-gray-300">


{data.relocationFactors?.join(", ")}


</p>







<p className="mt-3">


<b>Challenges:</b>


</p>


<p className="text-gray-300">


{data.challenges?.join(", ")}


</p>







<p className="mt-3">


<b>Opportunities:</b>


</p>


<p className="text-gray-300">


{data.opportunities?.join(", ")}


</p>







</section>









<section>


<h2 className="text-xl font-semibold mb-3">


Interpretation


</h2>







<div className="space-y-4 text-gray-300">





<p>


<b>Travel:</b>


<br/>


{data.travel}


</p>







<p>


<b>Settlement:</b>


<br/>


{data.settlement}


</p>







<p>


<b>Career:</b>


<br/>


{data.career}


</p>







<p>


<b>Interpretation:</b>


<br/>


{data.interpretation}


</p>







<p>


<b>Remedies:</b>


<br/>


{data.remedies}


</p>







</div>







</section>









<section>


<h2 className="text-xl font-semibold mb-3">


SEO


</h2>







<p>


<b>SEO Title:</b>


<br/>


{data.seo?.title}


</p>







<p className="mt-3">


<b>Description:</b>


<br/>


{data.seo?.description}


</p>







<p className="mt-3">


<b>Keywords:</b>


<br/>


{data.seo?.keywords?.join(", ")}


</p>







</section>









</div>









</div>



  );


}