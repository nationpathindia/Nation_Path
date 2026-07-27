"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Career Intelligence View Page
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";



export default function CareerViewPage(){


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


        `/api/admin/career-intelligence/${id}`


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


      "Delete this Career Intelligence?"


    );





    if(!ok)

      return;








    const res = await fetch(


      `/api/admin/career-intelligence/${id}`,


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


        "/admin/astro/career-intelligence"


      );



    }



  };













  if(loading){


    return (


      <div className="bg-[#0f172a] min-h-screen text-white p-8">


        Loading Career Intelligence...


      </div>


    );


  }









  if(!data){


    return (


      <div className="bg-[#0f172a] min-h-screen text-white p-8">


        Career not found


      </div>


    );


  }












  return (


<div className="min-h-screen bg-[#0f172a] text-white p-8">








<div className="flex justify-between items-center mb-8">





<div>



<h1 className="text-3xl font-bold">


💼 Career Intelligence


</h1>






<p className="text-gray-400 mt-2">


{data.title}


</p>





</div>







<div className="flex gap-3">






<button


onClick={()=>



router.push(


`/admin/astro/career-intelligence/${id}/edit`


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

label="Career Type"

value={data.careerType}

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









<Section title="Career Knowledge">





<Item

label="Professions"

value={data.professions?.join(", ")}

/>







<Item

label="Industries"

value={data.industries?.join(", ")}

/>







<Item

label="Skills"

value={data.skills?.join(", ")}

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









<Section title="Career Interpretation">





<Item

label="Career Growth"

value={data.careerGrowth}

/>







<Item

label="Business"

value={data.business}

/>







<Item

label="Job"

value={data.job}

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