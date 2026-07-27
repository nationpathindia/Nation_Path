"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Yoga Intelligence View Page
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";



export default function YogaViewPage(){


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

        `/api/admin/yoga-intelligence/${id}`

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

      "Delete this Yoga?"

    );



    if(!ok)

      return;







    const res = await fetch(

      `/api/admin/yoga-intelligence/${id}`,

      {

        method:"DELETE",

      }

    );






    const json = await res.json();





    if(json.success){


      alert(

        "Yoga deleted"

      );


      router.push(

        "/admin/astro/yoga-intelligence"

      );


    }


  };









  if(loading){


    return (

<div className="bg-[#0f172a] min-h-screen text-white p-8">

Loading Yoga...

</div>

    );


  }








  if(!data){


    return (

<div className="bg-[#0f172a] min-h-screen text-white p-8">

Yoga not found

</div>

    );


  }








  return (

<div className="min-h-screen bg-[#0f172a] text-white p-8">





<div className="flex justify-between items-center mb-8">



<div>


<h1 className="text-3xl font-bold">

🪐 {data.name}

</h1>



<p className="text-gray-400 mt-2">

{data.names?.en}

</p>



</div>






<div className="flex gap-3">



<button

onClick={()=>


router.push(

`/admin/astro/yoga-intelligence/${id}/edit`

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

label="Category"

value={data.category}

/>


<Item

label="Type"

value={data.type}

/>


<Item

label="Status"

value={data.status}

/>



</Grid>



</Section>









<Section title="Planet & House Combination">



<Grid>


<Item

label="Planets"

value={

data.planets?.join(", ")

}

/>



<Item

label="Houses"

value={

data.houses?.join(", ")

}

/>



</Grid>



</Section>









<Section title="Formation">



<Item

label="Formation"

value={data.formation}

/>



</Section>









<Section title="Effects">



<Item

label="Positive Effects"

value={

data.positiveEffects?.join(", ")

}

/>




<Item

label="Negative Effects"

value={

data.negativeEffects?.join(", ")

}

/>



<Item

label="Challenges"

value={

data.challenges?.join(", ")

}

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

label="Spirituality"

value={data.spirituality}

/>



</Grid>



</Section>









<Section title="Remedies">



<Grid>


<Item

label="Mantra"

value={data.remedies?.mantra}

/>



<Item

label="Gemstone"

value={data.remedies?.gemstone}

/>



<Item

label="Donation"

value={data.remedies?.donation}

/>



<Item

label="Ritual"

value={data.remedies?.ritual}

/>



</Grid>



</Section>









<Section title="Description">


<Item

label="Description"

value={data.description}

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


<div className="space-y-4">

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