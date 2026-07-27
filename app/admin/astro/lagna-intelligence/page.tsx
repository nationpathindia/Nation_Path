"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Lagna Intelligence Admin List
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import Link from "next/link";



export default function LagnaIntelligencePage(){


  const [data,setData] = useState<any[]>([]);

  const [loading,setLoading] = useState(true);

  const [search,setSearch] = useState("");








  useEffect(()=>{


    loadData();


  },[]);









  const loadData = async()=>{


    try{


      const res = await fetch(

        "/api/admin/lagna-intelligence"

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









  const filtered = data.filter((item)=>{



    const text =


      `${item.lagna}

      ${item.slug}

      ${item.names?.en}

      ${item.description}`


      .toLowerCase();





    return text.includes(


      search.toLowerCase()


    );



  });











  return (


<div className="min-h-screen bg-[#0f172a] text-white p-8">






<div className="flex justify-between items-center mb-8">





<div>



<h1 className="text-3xl font-bold">


🌅 Lagna Intelligence


</h1>




<p className="text-gray-400 mt-2">


Ascendant Knowledge Management


</p>



</div>








<Link


href="/admin/astro/lagna-intelligence/create"


className="bg-orange-600 px-6 py-3 rounded-xl font-semibold"


>


+ Create Lagna


</Link>






</div>









<div className="bg-[#1e293b] rounded-xl p-6 mb-6">





<input


placeholder="Search lagna, slug..."


value={search}


onChange={(e)=>


setSearch(e.target.value)


}


className="w-full bg-black p-3 rounded-lg"


/>





</div>









<div className="bg-[#1e293b] rounded-xl overflow-hidden">






{


loading ? (


<div className="p-8">


Loading...


</div>



)



:



filtered.length === 0 ? (


<div className="p-8 text-gray-400">


No Lagna records found


</div>


)



:



(



<div className="divide-y divide-gray-700">





{


filtered.map((item)=>(




<div


key={item._id}


className="p-6 flex justify-between items-center"


>







<div>





<h2 className="text-xl font-semibold capitalize">


{item.lagna}


</h2>






<p className="text-gray-400">


{item.names?.en || "-"}


</p>






<div className="flex gap-3 mt-3">






<span className="bg-black px-3 py-1 rounded">


{item.slug}


</span>






<span


className={


item.status === "published"


?


"bg-green-600 px-3 py-1 rounded"


:


"bg-gray-600 px-3 py-1 rounded"


}


>


{item.status}


</span>





</div>





</div>









<div className="flex gap-3">





<Link


href={`/admin/astro/lagna-intelligence/${item._id}`}


className="bg-blue-600 px-4 py-2 rounded-lg"


>


View


</Link>







<Link


href={`/admin/astro/lagna-intelligence/${item._id}/edit`}


className="bg-orange-600 px-4 py-2 rounded-lg"


>


Edit


</Link>






</div>







</div>





))


}





</div>



)


}





</div>







</div>


  );


}