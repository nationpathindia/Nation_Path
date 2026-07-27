"use client";

import { useEffect, useState } from "react";
import Link from "next/link";



export default function AstroScoringPage(){


  const [scores,setScores] = useState<any[]>([]);


  const [filtered,setFiltered] = useState<any[]>([]);


  const [search,setSearch] = useState("");


  const [type,setType] = useState("all");


  const [status,setStatus] = useState("all");









  const loadScores = async()=>{


    try{


      const res = await fetch(

        "/api/admin/astro-scoring"

      );


      const data = await res.json();





      if(data.success){


        setScores(data.data);

        setFiltered(data.data);


      }



    }

    catch(error){


      console.error(error);


    }


  };









  useEffect(()=>{


    loadScores();


  },[]);









  useEffect(()=>{


    let result = [...scores];







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


        item.type === type


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

    scores

  ]);












  const removeScore = async(id:string)=>{


    const ok = confirm(

      "Delete this scoring rule?"

    );



    if(!ok) return;






    await fetch(

      `/api/admin/astro-scoring/${id}`,

      {

        method:"DELETE"

      }

    );





    loadScores();



  };









return (

<div className="min-h-screen bg-[#0f172a] text-white p-8">







<div className="flex justify-between items-center mb-8">



<div>


<h1 className="text-3xl font-bold">

⚖️ Astro Scoring CMS

</h1>


<p className="text-gray-400 mt-2">

Prediction intelligence scoring management

</p>


</div>








<Link

href="/admin/astro/astro-scoring/create"

className="bg-orange-600 px-6 py-3 rounded-xl"

>

+ Add Score Rule

</Link>



</div>












{/* STATS */}



<div className="grid md:grid-cols-4 gap-4 mb-8">





<Stat

title="Total"

value={scores.length}

/>







<Stat

title="Published"

value={

scores.filter(

x=>x.status==="published"

).length

}

/>







<Stat

title="Draft"

value={

scores.filter(

x=>x.status==="draft"

).length

}

/>







<Stat

title="Planet Rules"

value={

scores.filter(

x=>x.type==="planet"

).length

}

/>







</div>














{/* FILTER */}



<div className="bg-[#1e293b] p-6 rounded-xl mb-8">



<div className="grid md:grid-cols-3 gap-4">







<input


placeholder="Search scoring rule"


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


<option value="planet">

Planet

</option>


<option value="zodiac">

Zodiac

</option>


<option value="house">

House

</option>


<option value="nakshatra">

Nakshatra

</option>


<option value="dasha">

Dasha

</option>


<option value="transit">

Transit

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

Rule

</th>




<th className="p-4">

Type

</th>




<th className="p-4">

Category

</th>




<th className="p-4">

Weight

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

filtered.map((score)=>(




<tr

key={score._id}

className="border-t border-gray-700"

>






<td className="p-4">



<div className="font-semibold">


{score.name}


</div>



<div className="text-sm text-gray-400">


{score.slug}


</div>



</td>








<td className="text-center">


{score.type}


</td>








<td className="text-center">


{score.category}


</td>








<td className="text-center">


{score.weight}


</td>








<td className="text-center">


<span className="px-3 py-1 rounded-full bg-black">


{score.status}


</span>


</td>








<td className="text-center space-x-3">





<Link

href={

`/admin/astro/astro-scoring/${score._id}/edit`

}

className="text-orange-400"

>

Edit

</Link>








<button

onClick={()=>removeScore(score._id)}

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