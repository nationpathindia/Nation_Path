"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Finance Intelligence View Page
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";



export default function FinanceViewPage(){


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


        `/api/admin/finance-intelligence/${id}`


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


      "Delete this Finance Intelligence?"


    );





    if(!ok)

      return;









    const res = await fetch(


      `/api/admin/finance-intelligence/${id}`,


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


        "/admin/astro/finance-intelligence"


      );



    }



  };













  if(loading){



    return (


      <div className="min-h-screen bg-[#0f172a] text-white p-8">


        Loading Finance Intelligence...


      </div>


    );


  }








  if(!data){



    return (


      <div className="min-h-screen bg-[#0f172a] text-white p-8">


        Finance not found


      </div>


    );


  }













  return (


<div className="min-h-screen bg-[#0f172a] text-white p-8">








<div className="flex justify-between items-center mb-8">






<div>



<h1 className="text-3xl font-bold">


💰 Finance Intelligence


</h1>







<p className="text-gray-400 mt-2">


{data.title}


</p>






</div>









<div className="flex gap-3">





<button


onClick={()=>


router.push(


`/admin/astro/finance-intelligence/${id}/edit`


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

label="Finance Type"

value={data.financeType}

/>





<Item

label="Status"

value={data.status}

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









<Section title="Finance Knowledge">



<Item

label="Wealth Sources"

value={data.wealthSources?.join(", ")}

/>





<Item

label="Income Patterns"

value={data.incomePatterns?.join(", ")}

/>





<Item

label="Investments"

value={data.investments?.join(", ")}

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









<Section title="Interpretation">





<Item

label="Money Management"

value={data.moneyManagement}

/>





<Item

label="Business Finance"

value={data.businessFinance}

/>





<Item

label="Career Finance"

value={data.careerFinance}

/>





<Item

label="Wealth Creation"

value={data.wealthCreation}

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