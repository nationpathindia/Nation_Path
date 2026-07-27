"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Dasha Intelligence View Page
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";



export default function DashaViewPage(){


  const params = useParams();

  const router = useRouter();


  const id = params.id as string;




  const [data,setData] = useState<any>(null);

  const [loading,setLoading] = useState(true);







  useEffect(()=>{


    loadData();


  },[]);







  const loadData = async()=>{


    try{


      const res = await fetch(

        `/api/admin/dasha-intelligence/${id}`

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








  const remove = async()=>{


    const ok = confirm(

      "Delete this Dasha Intelligence?"

    );



    if(!ok)

      return;






    const res = await fetch(

      `/api/admin/dasha-intelligence/${id}`,

      {

        method:"DELETE",

      }

    );





    const json = await res.json();




    if(json.success){


      alert(

        "Deleted successfully"

      );



      router.push(

        "/admin/astro/dasha-intelligence"

      );


    }


  };







  if(loading){


    return (

      <div className="bg-[#0f172a] min-h-screen text-white p-8">

        Loading Dasha Intelligence...

      </div>

    );


  }








  if(!data){


    return (

      <div className="bg-[#0f172a] min-h-screen text-white p-8">

        Dasha not found

      </div>

    );


  }








  return (

<div className="min-h-screen bg-[#0f172a] text-white p-8">





<div className="flex justify-between items-center mb-8">


<div>


<h1 className="text-3xl font-bold">

🪐 Dasha Intelligence

</h1>



<p className="text-gray-400 mt-2 capitalize">

{data.planet}

</p>



</div>






<div className="flex gap-3">



<button

onClick={()=>


router.push(

`/admin/astro/dasha-intelligence/${id}/edit`

)

}

className="bg-orange-600 px-6 py-3 rounded-xl"

>

Edit

</button>





<button

onClick={remove}

className="bg-red-600 px-6 py-3 rounded-xl"

>

Delete

</button>



</div>



</div>









<div className="bg-[#1e293b] rounded-xl p-8 space-y-8">







<Section title="Basic Information">


<Grid>


<Item

label="Planet"

value={data.planet}

/>



<Item

label="Slug"

value={data.slug}

/>



<Item

label="Dasha Type"

value={data.dashaType?.type}

/>



<Item

label="Parent Planet"

value={data.dashaType?.parentPlanet}

/>



</Grid>


</Section>









<Section title="Names">


<Grid>


<Item

label="English"

value={data.names?.en}

/>


<Item

label="Hindi"

value={data.names?.hi}

/>


<Item

label="Nepali"

value={data.names?.ne}

/>



</Grid>


</Section>









<Section title="Duration">


<Grid>


<Item

label="Years"

value={data.duration?.years}

/>



<Item

label="Months"

value={data.duration?.months}

/>



</Grid>


</Section>









<Section title="Effects">


<Item

label="Positive Effects"

value={data.positiveEffects?.join(", ")}

/>



<Item

label="Negative Effects"

value={data.negativeEffects?.join(", ")}

/>



<Item

label="Challenges"

value={data.challenges?.join(", ")}

/>



</Section>









<Section title="Life Areas">


<Grid>


<Item

label="Career"

value={data.career}

/>



<Item

label="Finance"

value={data.finance}

/>



<Item

label="Marriage"

value={data.marriage}

/>



<Item

label="Health"

value={data.health}

/>



</Grid>


</Section>









<Section title="Remedies">


<Item

label="Mantra"

value={data.remedies?.mantra}

/>



<Item

label="Gemstone"

value={data.remedies?.gemstone}

/>



<Item

label="Metal"

value={data.remedies?.metal}

/>



</Section>









<Section title="Description">


<p className="bg-black rounded-lg p-4">

{data.description}

</p>


</Section>









<Section title="Status">


<Item

label="Current Status"

value={data.status}

/>


</Section>







</div>





</div>

  );


}








function Section({

title,

children

}:{

title:string;

children:React.ReactNode;

}){


return (

<section>


<h2 className="text-xl font-semibold mb-4">

{title}

</h2>


<div className="space-y-3">

{children}

</div>


</section>

);


}








function Grid({

children

}:{

children:React.ReactNode;

}){


return (

<div className="grid md:grid-cols-2 gap-4">

{children}

</div>

);


}








function Item({

label,

value

}:{

label:string;

value:any;

}){


return (

<div className="bg-black rounded-lg p-4">


<div className="text-sm text-gray-400">

{label}

</div>



<div className="mt-2 break-words">

{value || "-"}

</div>



</div>

);


}