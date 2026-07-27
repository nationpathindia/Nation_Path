"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Edit Foreign Settlement Intelligence
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";



export default function EditForeignSettlementPage(){


  const params = useParams();

  const router = useRouter();


  const id = params.id as string;





  const [loading,setLoading] = useState(true);

  const [saving,setSaving] = useState(false);







  const [form,setForm] = useState<any>({



    title:"",

    slug:"",

    category:"foreign-settlement",

    settlementType:"general",



    planets:"",

    zodiacSigns:"",

    houses:"",



    countries:"",

    foreignTravel:"",

    migrationIndicators:"",

    overseasCareer:"",

    internationalOpportunities:"",

    foreignConnections:"",

    relocationFactors:"",

    challenges:"",

    opportunities:"",



    travel:"",

    settlement:"",

    career:"",

    interpretation:"",

    remedies:"",



    status:"draft",



  });









  useEffect(()=>{


    loadData();


  },[]);









  const loadData = async()=>{


    try{


      const res = await fetch(


        `/api/admin/foreign-settlement-intelligence/${id}`


      );


      const json = await res.json();






      if(json.success){


        const item = json.data;






        setForm({



          ...item,





          planets:item.planets?.join(", ") || "",



          zodiacSigns:item.zodiacSigns?.join(", ") || "",



          houses:item.houses?.join(", ") || "",



          countries:item.countries?.join(", ") || "",



          foreignTravel:item.foreignTravel?.join(", ") || "",



          migrationIndicators:item.migrationIndicators?.join(", ") || "",



          overseasCareer:item.overseasCareer?.join(", ") || "",



          internationalOpportunities:item.internationalOpportunities?.join(", ") || "",



          foreignConnections:item.foreignConnections?.join(", ") || "",



          relocationFactors:item.relocationFactors?.join(", ") || "",



          challenges:item.challenges?.join(", ") || "",



          opportunities:item.opportunities?.join(", ") || "",



        });



      }



    }

    catch(error){


      console.error(error);


    }

    finally{


      setLoading(false);


    }


  };













  const update = async()=>{


    try{


      setSaving(true);







      const payload = {





        ...form,








        planets:


        form.planets

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







        zodiacSigns:


        form.zodiacSigns

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







        houses:


        form.houses

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







        countries:


        form.countries

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







        foreignTravel:


        form.foreignTravel

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







        migrationIndicators:


        form.migrationIndicators

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







        overseasCareer:


        form.overseasCareer

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







        internationalOpportunities:


        form.internationalOpportunities

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







        foreignConnections:


        form.foreignConnections

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







        relocationFactors:


        form.relocationFactors

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







        challenges:


        form.challenges

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







        opportunities:


        form.opportunities

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







      };









      const res = await fetch(


        `/api/admin/foreign-settlement-intelligence/${id}`,


        {


          method:"PUT",



          headers:{



            "Content-Type":

            "application/json",



          },



          body:


          JSON.stringify(payload),



        }


      );









      const json = await res.json();








      if(json.success){



        alert(


          "Foreign settlement intelligence updated successfully"


        );







        router.push(


          "/admin/astro/foreign-settlement-intelligence"


        );



      }


      else{


        alert(json.message || "Failed");


      }






    }


    catch(error){


      console.error(error);


      alert("Server error");


    }


    finally{


      setSaving(false);


    }



  };













  if(loading){


    return (


      <div className="min-h-screen bg-[#0f172a] text-white p-8">


        Loading Foreign Settlement Intelligence...


      </div>


    );


  }













  return (



<div className="min-h-screen bg-[#0f172a] text-white p-8">







<h1 className="text-3xl font-bold mb-8">


🌍 Edit Foreign Settlement Intelligence


</h1>









<div className="bg-[#1e293b] rounded-xl p-8 space-y-8">







<section>


<h2 className="text-xl font-semibold mb-4">


Basic Information


</h2>







<Input label="Title" value={form.title}

onChange={(v)=>setForm({...form,title:v})}

/>







<Input label="Slug" value={form.slug}

onChange={(v)=>setForm({...form,slug:v})}

/>







<Input label="Settlement Type" value={form.settlementType}

onChange={(v)=>setForm({...form,settlementType:v})}

/>







</section>









<section>


<h2 className="text-xl font-semibold mb-4">


Astrology Factors


</h2>







<Input label="Planets" value={form.planets}

onChange={(v)=>setForm({...form,planets:v})}

/>







<Input label="Zodiac Signs" value={form.zodiacSigns}

onChange={(v)=>setForm({...form,zodiacSigns:v})}

/>







<Input label="Houses" value={form.houses}

onChange={(v)=>setForm({...form,houses:v})}

/>







</section>









<section>


<h2 className="text-xl font-semibold mb-4">


Foreign Settlement Knowledge


</h2>







<Input label="Countries" value={form.countries}

onChange={(v)=>setForm({...form,countries:v})}

/>







<Input label="Foreign Travel" value={form.foreignTravel}

onChange={(v)=>setForm({...form,foreignTravel:v})}

/>







<Input label="Migration Indicators" value={form.migrationIndicators}

onChange={(v)=>setForm({...form,migrationIndicators:v})}

/>







<Input label="Overseas Career" value={form.overseasCareer}

onChange={(v)=>setForm({...form,overseasCareer:v})}

/>







<Input label="International Opportunities" value={form.internationalOpportunities}

onChange={(v)=>setForm({...form,internationalOpportunities:v})}

/>







<Input label="Foreign Connections" value={form.foreignConnections}

onChange={(v)=>setForm({...form,foreignConnections:v})}

/>







<Input label="Relocation Factors" value={form.relocationFactors}

onChange={(v)=>setForm({...form,relocationFactors:v})}

/>







<Input label="Challenges" value={form.challenges}

onChange={(v)=>setForm({...form,challenges:v})}

/>







<Input label="Opportunities" value={form.opportunities}

onChange={(v)=>setForm({...form,opportunities:v})}

/>







</section>









<section>


<h2 className="text-xl font-semibold mb-4">


Interpretation


</h2>







<TextArea label="Travel" value={form.travel}

onChange={(v)=>setForm({...form,travel:v})}

/>







<TextArea label="Settlement" value={form.settlement}

onChange={(v)=>setForm({...form,settlement:v})}

/>







<TextArea label="Career" value={form.career}

onChange={(v)=>setForm({...form,career:v})}

/>







<TextArea label="Interpretation" value={form.interpretation}

onChange={(v)=>setForm({...form,interpretation:v})}

/>







<TextArea label="Remedies" value={form.remedies}

onChange={(v)=>setForm({...form,remedies:v})}

/>







</section>









<section>


<h2 className="text-xl font-semibold mb-4">


Status


</h2>







<select


value={form.status}


onChange={(e)=>setForm({...form,status:e.target.value})}


className="w-full bg-black p-3 rounded-lg"


>


<option value="draft">


Draft


</option>


<option value="published">


Published


</option>


</select>







</section>









<button


disabled={saving}


onClick={update}


className="bg-orange-600 px-8 py-3 rounded-xl font-semibold"


>


{


saving

?

"Updating..."

:

"Update Foreign Settlement"


}



</button>









</div>








</div>



  );


}









function Input({

label,

value,

onChange


}:{

label:string;

value:any;

onChange:(v:string)=>void;


}){


return (


<div className="mb-4">


<label className="text-sm text-gray-400">


{label}


</label>





<input


value={value || ""}


onChange={(e)=>onChange(e.target.value)}


className="w-full bg-black p-3 rounded-lg mt-1"


/>





</div>


);


}









function TextArea({

label,

value,

onChange


}:{

label:string;

value:any;

onChange:(v:string)=>void;


}){


return (


<div className="mb-4">


<label className="text-sm text-gray-400">


{label}


</label>





<textarea


value={value || ""}


onChange={(e)=>onChange(e.target.value)}


className="w-full bg-black p-3 rounded-lg mt-1 h-32"


/>





</div>


);


}