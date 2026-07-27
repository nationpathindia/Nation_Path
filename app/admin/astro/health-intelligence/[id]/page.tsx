"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Health Intelligence View Page
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";



export default function HealthViewPage(){


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


        `/api/admin/health-intelligence/${id}`


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


      "Delete this Health Intelligence?"


    );







    if(!ok)

      return;









    const res = await fetch(


      `/api/admin/health-intelligence/${id}`,


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


        "/admin/astro/health-intelligence"


      );



    }



  };













  if(loading){


    return (


      <div className="bg-[#0f172a] min-h-screen text-white p-8">


        Loading Health Intelligence...


      </div>


    );


  }












  if(!data){


    return (


      <div className="bg-[#0f172a] min-h-screen text-white p-8">


        Health Intelligence not found


      </div>


    );


  }














  return (



<div className="min-h-screen bg-[#0f172a] text-white p-8">







<div className="flex justify-between items-center mb-8">






<div>




<h1 className="text-3xl font-bold">


🩺 Health Intelligence


</h1>







<p className="text-gray-400 mt-2">


{data.title}


</p>







</div>









<div className="flex gap-3">






<button


onClick={()=>


router.push(


`/admin/astro/health-intelligence/${id}/edit`


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

label="Title"

value={data.title}

/>






<Item

label="Slug"

value={data.slug}

/>






<Item

label="Health Type"

value={data.healthType}

/>







<Item

label="Category"

value={data.category}

/>







</Grid>





</Section>















<Section title="Astrology Factors">






<Item

label="Planets"

value={data.planets?.join(", ")}

/>







<Item

label="Zodiac Signs"

value={data.zodiacSigns?.join(", ")}

/>







<Item

label="Houses"

value={data.houses?.join(", ")}

/>







</Section>














<Section title="Health Knowledge">






<Item

label="Body Areas"

value={data.bodyAreas?.join(", ")}

/>







<Item

label="Health Associations"

value={data.healthAssociations?.join(", ")}

/>







<Item

label="Wellness Guidance"

value={data.wellnessGuidance?.join(", ")}

/>







<Item

label="Lifestyle Suggestions"

value={data.lifestyleSuggestions?.join(", ")}

/>







<Item

label="Strengths"

value={data.strengths?.join(", ")}

/>







<Item

label="Challenges"

value={data.challenges?.join(", ")}

/>







</Section>















<Section title="Influence Interpretation">






<Item

label="Planetary Influence"

value={data.planetaryInfluence}

/>







<Item

label="Zodiac Influence"

value={data.zodiacInfluence}

/>







<Item

label="House Influence"

value={data.houseInfluence}

/>







<Item

label="Interpretation"

value={data.interpretation}

/>







</Section>














<Section title="Remedies">






<Item

label="Remedies"

value={data.remedies}

/>







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