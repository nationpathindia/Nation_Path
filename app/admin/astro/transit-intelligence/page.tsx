"use client";

import { useEffect, useState } from "react";
import Link from "next/link";



export default function TransitIntelligencePage(){


  const [transits,setTransits] = useState<any[]>([]);


  const [filtered,setFiltered] = useState<any[]>([]);


  const [search,setSearch] = useState("");


  const [type,setType] = useState("all");


  const [status,setStatus] = useState("all");









  const loadTransits = async()=>{


    try{


      const res = await fetch(

        "/api/admin/transit-intelligence"

      );


      const data = await res.json();





      if(data.success){


        setTransits(data.data);

        setFiltered(data.data);


      }



    }

    catch(error){


      console.error(error);


    }


  };









  useEffect(()=>{


    loadTransits();


  },[]);









  useEffect(()=>{


    let result = [...transits];









    if(search){


      result = result.filter((item)=>


        item.name

        ?.toLowerCase()

        .includes(

          search.toLowerCase()

        )


      );


    }









    if(type !== "all"){


      result = result.filter((item)=>


        item.transitType === type


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

    type,

    status,

    transits

  ]);












  const removeTransit = async(id:string)=>{


    const ok = confirm(

      "Delete this transit rule?"

    );



    if(!ok) return;






    await fetch(

      `/api/admin/transit-intelligence/${id}`,

      {


        method:"DELETE"


      }

    );





    loadTransits();



  };









return (

<div className="min-h-screen bg-[#0f172a] text-white p-8">







<div className="flex justify-between items-center mb-8">



<div>


<h1 className="text-3xl font-bold">

🪐 Transit Intelligence CMS

</h1>


<p className="text-gray-400 mt-2">

Planetary movement knowledge management

</p>


</div>








<Link

href="/admin/astro/transit-intelligence/create"

className="bg-orange-600 px-6 py-3 rounded-xl"

>

+ Add Transit Rule

</Link>



</div>












{/* STATS */}



<div className="grid md:grid-cols-4 gap-4 mb-8">





<Stat

title="Total"

value={transits.length}

/>







<Stat

title="Published"

value={

transits.filter(

x=>x.status==="published"

).length

}

/>







<Stat

title="Draft"

value={

transits.filter(

x=>x.status==="draft"

).length

}

/>







<Stat

title="Planetary"

value={

transits.filter(

x=>x.transitType==="planetary"

).length

}

/>







</div>














{/* FILTER */}



<div className="bg-[#1e293b] p-6 rounded-xl mb-8">



<div className="grid md:grid-cols-3 gap-4">







<input


placeholder="Search transit rule"


value={search}


onChange={(e)=>

setSearch(e.target.value)

}


className="bg-black p-3 rounded"


/>









<select


value={type}


onChange={(e)=>

setType(e.target.value)

}


className="bg-black p-3 rounded"


>



<option value="all">

All Type

</option>


<option value="planetary">

Planetary

</option>


<option value="retrograde">

Retrograde

</option>


<option value="combust">

Combust

</option>


<option value="stationary">

Stationary

</option>


<option value="direct">

Direct

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

Transit

</th>




<th className="p-4">

Planet

</th>




<th className="p-4">

Movement

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

filtered.map((item)=>(




<tr

key={item._id}

className="border-t border-gray-700"

>






<td className="p-4">



<div className="font-semibold">


{item.name}


</div>



<div className="text-sm text-gray-400">


{item.slug}


</div>



</td>








<td className="text-center">


{item.planet}


</td>








<td className="text-center">


{item.fromSign || "-"}

&nbsp;→&nbsp;

{item.toSign || "-"}


</td>








<td className="text-center">


{item.category}


</td>








<td className="text-center">


<span className="px-3 py-1 rounded-full bg-black">


{item.status}


</span>


</td>








<td className="text-center space-x-3">





<Link

href={

`/admin/astro/transit-intelligence/${item._id}/edit`

}

className="text-orange-400"

>

Edit

</Link>








<button

onClick={()=>removeTransit(item._id)}

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