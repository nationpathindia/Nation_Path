"use client";

import { useEffect, useState } from "react";
import Link from "next/link";



export default function PlanetIntelligencePage(){


  const [planets,setPlanets] = useState<any[]>([]);


  const [filtered,setFiltered] = useState<any[]>([]);


  const [search,setSearch] = useState("");

  const [nature,setNature] = useState("all");

  const [status,setStatus] = useState("all");



  const loadPlanets = async()=>{


    try{


      const res = await fetch(

        "/api/admin/planet-intelligence"

      );


      const data = await res.json();




      if(data.success){


        setPlanets(data.data);

        setFiltered(data.data);


      }



    }

    catch(error){


      console.error(error);


    }


  };







  useEffect(()=>{


    loadPlanets();


  },[]);







  useEffect(()=>{


    let result = [...planets];




    if(search){


      result = result.filter((item)=>

        item.planet

        .toLowerCase()

        .includes(

          search.toLowerCase()

        )

      );


    }






    if(nature !== "all"){


      result = result.filter((item)=>

        item.nature === nature

      );


    }






    if(status !== "all"){


      result = result.filter((item)=>

        item.status === status

      );


    }






    setFiltered(result);



  },[

    search,

    nature,

    status,

    planets

  ]);










  const removePlanet = async(id:string)=>{


    const ok = confirm(

      "Delete this planet?"

    );



    if(!ok) return;





    await fetch(

      `/api/admin/planet-intelligence/${id}`,

      {

        method:"DELETE"

      }

    );



    loadPlanets();


  };










  return (

<div className="min-h-screen bg-[#0f172a] text-white p-8">





<div className="flex justify-between items-center mb-8">


<div>


<h1 className="text-3xl font-bold">

🪐 Planet Intelligence CMS

</h1>


<p className="text-gray-400 mt-2">

Astrology knowledge management

</p>


</div>





<Link

href="/admin/astro/planet-intelligence/create"

className="bg-orange-600 px-6 py-3 rounded-xl"

>

+ Add Planet

</Link>



</div>









{/* STATS */}


<div className="grid md:grid-cols-4 gap-4 mb-8">



<Stat

title="Total"

value={planets.length}

/>



<Stat

title="Published"

value={

planets.filter(

x=>x.status==="published"

).length

}

/>



<Stat

title="Draft"

value={

planets.filter(

x=>x.status==="draft"

).length

}

/>



<Stat

title="Benefic"

value={

planets.filter(

x=>x.nature==="benefic"

).length

}

/>



</div>









{/* FILTER */}



<div className="bg-[#1e293b] p-6 rounded-xl mb-8">


<div className="grid md:grid-cols-3 gap-4">



<input

placeholder="Search planet"

value={search}

onChange={(e)=>

setSearch(e.target.value)

}

className="bg-black p-3 rounded"

/>





<select

value={nature}

onChange={(e)=>

setNature(e.target.value)

}

className="bg-black p-3 rounded"

>


<option value="all">

All Nature

</option>


<option value="benefic">

Benefic

</option>


<option value="malefic">

Malefic

</option>


<option value="neutral">

Neutral

</option>


</select>








<select

value={status}

onChange={(e)=>

setStatus(e.target.value)

}

className="bg-black p-3 rounded"

>


<option value="all">

All Status

</option>


<option value="published">

Published

</option>


<option value="draft">

Draft

</option>


</select>





</div>


</div>









{/* TABLE */}



<div className="bg-[#1e293b] rounded-xl overflow-hidden">



<table className="w-full">


<thead className="bg-black">


<tr>


<th className="p-4 text-left">

Planet

</th>


<th className="p-4">

Nature

</th>


<th className="p-4">

Category

</th>


<th className="p-4">

Status

</th>


<th className="p-4">

Action

</th>


</tr>


</thead>







<tbody>


{

filtered.map((planet)=>(



<tr

key={planet._id}

className="border-t border-gray-700"

>


<td className="p-4">


<div className="font-semibold">

{planet.names?.english ||

planet.planet}

</div>


<div className="text-sm text-gray-400">

{planet.planet}

</div>


</td>





<td className="text-center">


{planet.nature}


</td>





<td className="text-center">


{planet.category || "-"}


</td>





<td className="text-center">


<span className="px-3 py-1 rounded-full bg-black">

{planet.status}

</span>


</td>





<td className="text-center space-x-3">



<Link

href={

`/admin/astro/planet-intelligence/${planet._id}/edit`

}

className="text-orange-400"

>

Edit

</Link>





<button

onClick={()=>removePlanet(planet._id)}

className="text-red-400"

>

Delete

</button>



</td>



</tr>



))


}



</tbody>



</table>




</div>






</div>

  );


}









function Stat({

title,

value

}:{

title:string;

value:number;

}){


return (

<div className="bg-[#1e293b] p-6 rounded-xl">


<p className="text-gray-400">

{title}

</p>


<h2 className="text-3xl font-bold mt-2">

{value}

</h2>


</div>

);


}