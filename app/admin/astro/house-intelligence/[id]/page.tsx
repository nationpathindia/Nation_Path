"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// House Intelligence View Page
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";



export default function HouseViewPage(){


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

        `/api/admin/house-intelligence/${id}`

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

      "Delete this House Intelligence?"

    );



    if(!ok)

      return;







    const res = await fetch(

      `/api/admin/house-intelligence/${id}`,

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

        "/admin/astro/house-intelligence"

      );


    }


  };











  if(loading){


    return (

      <div className="bg-[#0f172a] min-h-screen text-white p-8">

        Loading House Intelligence...

      </div>

    );


  }










  if(!data){


    return (

      <div className="bg-[#0f172a] min-h-screen text-white p-8">

        House not found

      </div>

    );


  }









  return (


<div className="min-h-screen bg-[#0f172a] text-white p-8">







<div className="flex justify-between items-center mb-8">



<div>



<h1 className="text-3xl font-bold">


🏠 House Intelligence


</h1>





<p className="text-gray-400 mt-2">


House {data.houseNumber}


</p>




</div>







<div className="flex gap-3">





<button


onClick={()=>


router.push(

`/admin/astro/house-intelligence/${id}/edit`

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

label="House Number"

value={data.houseNumber}

/>





<Item

label="Slug"

value={data.slug}

/>





<Item

label="English Name"

value={data.names?.en}

/>





</Grid>



</Section>









<Section title="Classification">



<Grid>



<Item

label="Name"

value={data.classification?.name}

/>





<Item

label="Category"

value={data.classification?.category}

/>





<Item

label="Element"

value={data.classification?.element}

/>





</Grid>



</Section>









<Section title="Significations">



<Item

label="Core Significations"

value={data.significations?.join(", ")}

/>





<Item

label="Life Areas"

value={data.lifeAreas?.join(", ")}

/>





<Item

label="Relationships"

value={data.relationships?.join(", ")}

/>





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





<Item

label="Education"

value={data.education}

/>





<Item

label="Children"

value={data.children}

/>





<Item

label="Property"

value={data.property}

/>





<Item

label="Spirituality"

value={data.spirituality}

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