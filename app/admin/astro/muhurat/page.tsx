"use client";

import { useEffect, useState } from "react";
import Link from "next/link";



export default function MuhuratListPage(){


  const [list,setList] = useState<any[]>([]);


  const [loading,setLoading] = useState(true);


  const [search,setSearch] = useState("");


  const [status,setStatus] = useState("all");


  const [category,setCategory] = useState("all");








  useEffect(()=>{


    loadMuhurat();


  },[]);







  const loadMuhurat = async()=>{


    try{


      const res = await fetch(

        "/api/admin/muhurat"

      );


      const data = await res.json();




      if(data.success){


        setList(data.data);


      }


    }


    catch(error){


      console.error(error);


    }


    finally{


      setLoading(false);


    }


  };









  const remove = async(id:string)=>{


    const ok = confirm(

      "Delete this Muhurat?"

    );



    if(!ok)

      return;







    const res = await fetch(

      `/api/admin/muhurat/${id}`,

      {


        method:"DELETE",


      }


    );





    const data = await res.json();





    if(data.success){


      loadMuhurat();


    }


  };









  const filtered = list.filter((item)=>{


    const text =

      `${item.title}

      ${item.category}

      ${item.date}`

      .toLowerCase();





    const matchSearch =

      text.includes(

        search.toLowerCase()

      );





    const matchStatus =

      status==="all"

      ||

      item.status===status;






    const matchCategory =

      category==="all"

      ||

      item.category===category;






    return (

      matchSearch &&

      matchStatus &&

      matchCategory

    );


  });









  if(loading){


    return (

      <div className="min-h-screen bg-[#0f172a] text-white p-8">

        Loading Muhurat...

      </div>

    );


  }







  return (

<div className="min-h-screen bg-[#0f172a] text-white p-8">






<div className="flex justify-between items-center mb-8">



<div>


<h1 className="text-3xl font-bold">

🙏 Muhurat CMS

</h1>



<p className="text-gray-400 mt-2">

Auspicious Timing Management

</p>


</div>







<Link

href="/admin/astro/muhurat/create"

className="bg-orange-600 px-6 py-3 rounded-xl font-semibold"

>

+ Create Muhurat

</Link>



</div>









<div className="grid md:grid-cols-3 gap-5 mb-8">



<Card

title="Total"

value={list.length}

/>



<Card

title="Published"

value={

list.filter(

x=>x.status==="published"

).length

}

/>



<Card

title="Draft"

value={

list.filter(

x=>x.status==="draft"

).length

}

/>



</div>









<div className="bg-[#1e293b] p-6 rounded-xl mb-8">



<div className="grid md:grid-cols-3 gap-4">





<input

placeholder="Search Muhurat..."

value={search}

onChange={(e)=>

setSearch(e.target.value)

}

className="bg-black p-3 rounded-lg"

/>







<select

value={status}

onChange={(e)=>

setStatus(e.target.value)

}

className="bg-black p-3 rounded-lg"

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








<select

value={category}

onChange={(e)=>

setCategory(e.target.value)

}

className="bg-black p-3 rounded-lg"

>


<option value="all">

All Categories

</option>


<option>

Marriage

</option>


<option>

Griha Pravesh

</option>


<option>

Business

</option>


<option>

Vehicle Purchase

</option>


<option>

Education

</option>


<option>

Travel

</option>


<option>

Puja

</option>


<option>

Investment

</option>


</select>



</div>


</div>









<div className="bg-[#1e293b] rounded-xl overflow-hidden">



<table className="w-full">


<thead className="bg-black">


<tr>


<th className="p-4 text-left">

Title

</th>


<th className="p-4 text-left">

Category

</th>


<th className="p-4 text-left">

Date

</th>


<th className="p-4 text-left">

Status

</th>


<th className="p-4 text-left">

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

{item.title}

</td>



<td className="p-4">

{item.category}

</td>



<td className="p-4">

{item.date}

</td>




<td className="p-4">


<span

className={`px-3 py-1 rounded-full ${
item.status==="published"

?

"bg-green-700"

:

"bg-gray-700"

}`}

>

{item.status}

</span>


</td>







<td className="p-4 flex gap-3">


<Link

href={`/admin/astro/muhurat/${item._id}`}

className="bg-blue-600 px-3 py-2 rounded"

>

View

</Link>





<Link

href={`/admin/astro/muhurat/${item._id}/edit`}

className="bg-orange-600 px-3 py-2 rounded"

>

Edit

</Link>






<button

onClick={()=>remove(item._id)}

className="bg-red-600 px-3 py-2 rounded"

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









function Card({

title,

value

}:{

title:string;

value:number;

}){


return (

<div className="bg-[#1e293b] p-6 rounded-xl">


<div className="text-gray-400">

{title}

</div>


<div className="text-3xl font-bold mt-2">

{value}

</div>


</div>

);


}