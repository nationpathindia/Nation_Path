"use client";

import { useEffect, useState } from "react";
import Link from "next/link";



export default function AstroTemplatesPage(){


  const [templates,setTemplates] = useState<any[]>([]);


  const [filtered,setFiltered] = useState<any[]>([]);


  const [search,setSearch] = useState("");


  const [category,setCategory] = useState("all");


  const [status,setStatus] = useState("all");






  const loadTemplates = async()=>{


    try{


      const res = await fetch(

        "/api/admin/astro-templates"

      );


      const data = await res.json();





      if(data.success){


        setTemplates(data.data);

        setFiltered(data.data);


      }



    }

    catch(error){


      console.error(error);


    }


  };









  useEffect(()=>{


    loadTemplates();


  },[]);









  useEffect(()=>{


    let result = [...templates];







    if(search){


      result = result.filter((item)=>


        item.templateName

        ?.toLowerCase()

        .includes(

          search.toLowerCase()

        )


      );


    }









    if(category !== "all"){


      result = result.filter((item)=>


        item.category === category


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

    category,

    status,

    templates

  ]);












  const removeTemplate = async(id:string)=>{


    const ok = confirm(

      "Delete this astro template?"

    );



    if(!ok) return;






    await fetch(

      `/api/admin/astro-templates/${id}`,

      {

        method:"DELETE"

      }

    );





    loadTemplates();



  };












return (

<div className="min-h-screen bg-[#0f172a] text-white p-8">







<div className="flex justify-between items-center mb-8">



<div>


<h1 className="text-3xl font-bold">

✨ Astro Templates CMS

</h1>


<p className="text-gray-400 mt-2">

AI prediction response template management

</p>


</div>








<Link

href="/admin/astro/astro-templates/create"

className="bg-orange-600 px-6 py-3 rounded-xl"

>

+ Add Template

</Link>



</div>












{/* STATS */}



<div className="grid md:grid-cols-4 gap-4 mb-8">





<Stat

title="Total"

value={templates.length}

/>







<Stat

title="Published"

value={

templates.filter(

x=>x.status==="published"

).length

}

/>







<Stat

title="Draft"

value={

templates.filter(

x=>x.status==="draft"

).length

}

/>







<Stat

title="Daily Rashifal"

value={

templates.filter(

x=>x.category==="daily_rashifal"

).length

}

/>







</div>














{/* FILTER */}



<div className="bg-[#1e293b] p-6 rounded-xl mb-8">



<div className="grid md:grid-cols-3 gap-4">







<input


placeholder="Search template"


value={search}


onChange={(e)=>

setSearch(e.target.value)

}


className="bg-black p-3 rounded"


/>









<select


value={category}


onChange={(e)=>

setCategory(e.target.value)

}


className="bg-black p-3 rounded"


>



<option value="all">

All Category

</option>


<option value="daily_rashifal">

Daily Rashifal

</option>


<option value="love">

Love

</option>


<option value="career">

Career

</option>


<option value="finance">

Finance

</option>


<option value="health">

Health

</option>


<option value="marriage">

Marriage

</option>


<option value="education">

Education

</option>


<option value="travel">

Travel

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

Template

</th>




<th className="p-4">

Category

</th>




<th className="p-4">

Language

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

filtered.map((template)=>(




<tr

key={template._id}

className="border-t border-gray-700"

>






<td className="p-4">



<div className="font-semibold">


{template.templateName}


</div>



<div className="text-sm text-gray-400">


{template.slug}


</div>



</td>








<td className="text-center">


{template.category}


</td>








<td className="text-center">


{template.language}


</td>








<td className="text-center">


<span className="px-3 py-1 rounded-full bg-black">


{template.status}


</span>


</td>








<td className="text-center space-x-3">





<Link

href={

`/admin/astro/astro-templates/${template._id}/edit`

}

className="text-orange-400"

>

Edit

</Link>








<button

onClick={()=>removeTemplate(template._id)}

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