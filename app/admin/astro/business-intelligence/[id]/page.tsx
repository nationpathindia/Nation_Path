"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// View Business Intelligence
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";



export default function ViewBusinessPage(){


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


        `/api/admin/business-intelligence/${id}`


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


        Loading Business Intelligence...


      </div>


    );


  }









  if(!data){


    return (


      <div className="min-h-screen bg-[#0f172a] text-white p-8">


        Business Intelligence not found


      </div>


    );


  }









  return (



<div className="min-h-screen bg-[#0f172a] text-white p-8">







<div className="flex justify-between items-center mb-8">





<div>



<h1 className="text-3xl font-bold">


💼 {data.title}


</h1>





<p className="text-gray-400 mt-2">


Business Astrology Knowledge


</p>





</div>







<Link


href={`/admin/astro/business-intelligence/${id}/edit`}


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


<b>Business Type:</b> {data.businessType}


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


Business Knowledge


</h2>







<p>


<b>Industries:</b>


</p>


<p className="text-gray-300">


{data.industries?.join(", ")}


</p>







<p className="mt-3">


<b>Entrepreneurship:</b>


</p>


<p className="text-gray-300">


{data.entrepreneurship?.join(", ")}


</p>







<p className="mt-3">


<b>Leadership Qualities:</b>


</p>


<p className="text-gray-300">


{data.leadershipQualities?.join(", ")}


</p>







<p className="mt-3">


<b>Professional Strengths:</b>


</p>


<p className="text-gray-300">


{data.professionalStrengths?.join(", ")}


</p>







<p className="mt-3">


<b>Wealth Creation:</b>


</p>


<p className="text-gray-300">


{data.wealthCreation?.join(", ")}


</p>







<p className="mt-3">


<b>Business Skills:</b>


</p>


<p className="text-gray-300">


{data.businessSkills?.join(", ")}


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


<b>Startup:</b>


<br/>


{data.startup}


</p>







<p>


<b>Business Growth:</b>


<br/>


{data.businessGrowth}


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