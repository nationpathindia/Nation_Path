"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO REMEDY INTELLIGENCE CMS
//
// Admin List Page
//
// Responsibility:
// Remedy knowledge management only
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";

import Link from "next/link";





export default function RemedyIntelligencePage(){


  const [remedies,setRemedies] =

    useState<any[]>([]);



  const [loading,setLoading] =

    useState(true);



  const [error,setError] =

    useState("");









//////////////////////////////////////////////////////////////
// FETCH REMEDIES
//////////////////////////////////////////////////////////////

const fetchRemedies = async()=>{


  try{


    setLoading(true);




    const res = await fetch(

      "/api/admin/remedy-intelligence",

      {


        cache:"no-store",


      }


    );




    const data = await res.json();







    if(data.success){


      setRemedies(data.data);


    }

    else{


      setError(

        data.message ||

        "Failed to load remedies"

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


  fetchRemedies();


},[]);









//////////////////////////////////////////////////////////////
// DELETE REMEDY
//////////////////////////////////////////////////////////////

const deleteRemedy = async(id:string)=>{


  const confirmDelete =

    confirm(

      "Delete this remedy intelligence?"

    );




  if(!confirmDelete)

    return;







  try{


    await fetch(

      `/api/admin/remedy-intelligence/${id}`,

      {


        method:"DELETE",


      }


    );



    fetchRemedies();



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

Remedy Intelligence CMS

</h1>



<p className="text-gray-400 mt-2">

Manage astrology remedy knowledge

</p>


</div>







<Link

href="/admin/astro/remedy-intelligence/create"

className="bg-orange-600 px-5 py-3 rounded-lg hover:bg-orange-700"

>


+ Add Remedy


</Link>





</div>









{loading && (


<div className="text-gray-400">

Loading remedies...

</div>


)}









{error && (


<div className="bg-red-600 p-4 rounded-lg">


{error}


</div>


)}









{!loading && remedies.length===0 && (


<div className="bg-[#1e293b] p-6 rounded-xl">


No remedies found.


</div>


)}









<div className="grid gap-5">



{remedies.map((item)=>(



<div

key={item._id}

className="bg-[#1e293b] rounded-xl p-6"


>





<div className="flex justify-between items-start">





<div>


<h2 className="text-xl font-semibold">

{item.remedy}

</h2>




<p className="text-gray-400 text-sm mt-1">

{item.slug}

</p>







<div className="flex gap-3 mt-3">


<span className="bg-slate-700 px-3 py-1 rounded text-sm">

{item.category}

</span>



<span className="bg-slate-700 px-3 py-1 rounded text-sm">

{item.status}

</span>



</div>




</div>









<div className="flex gap-3">





<Link

href={`/admin/astro/remedy-intelligence/${item._id}`}

className="bg-blue-600 px-4 py-2 rounded-lg"

>


View


</Link>








<Link

href={`/admin/astro/remedy-intelligence/${item._id}/edit`}

className="bg-green-600 px-4 py-2 rounded-lg"

>


Edit


</Link>








<button

onClick={()=>deleteRemedy(item._id)}

className="bg-red-600 px-4 py-2 rounded-lg"

>


Delete


</button>





</div>





</div>








{item.description && (


<p className="text-gray-300 mt-5">


{item.description.slice(0,250)}


{item.description.length>250 && "..."}


</p>


)}






</div>



))}



</div>







</div>

);


}