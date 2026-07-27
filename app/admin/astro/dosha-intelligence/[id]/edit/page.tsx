"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO DOSHA INTELLIGENCE CMS
//
// Edit Page
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";






export default function EditDoshaIntelligencePage(){


  const params = useParams();

  const router = useRouter();


  const id = params.id as string;





  const [loading,setLoading] =

    useState(true);



  const [saving,setSaving] =

    useState(false);






  const [form,setForm] =

    useState<any>({});









//////////////////////////////////////////////////////////////
// LOAD DATA
//////////////////////////////////////////////////////////////

useEffect(()=>{


  const load = async()=>{


    try{


      const res = await fetch(

        `/api/admin/dosha-intelligence/${id}`,

        {


          cache:"no-store",

        }

      );



      const data = await res.json();




      if(data.success){


        const item = data.data;



        setForm({

          ...item,


          planetsInvolved:

            item.planetsInvolved?.join(", ") || "",


          housesInvolved:

            item.housesInvolved?.join(", ") || "",


          causes:

            item.causes?.join("\n") || "",


          positiveEffects:

            item.positiveEffects?.join("\n") || "",


          negativeEffects:

            item.negativeEffects?.join("\n") || "",


          challenges:

            item.challenges?.join("\n") || "",


          remedies:

            item.remedies?.join("\n") || "",


          mantras:

            item.mantras?.join("\n") || "",


          rituals:

            item.rituals?.join("\n") || "",


          gemstones:

            item.gemstones?.join(", ") || "",


          metals:

            item.metals?.join(", ") || "",


          seo:{


            ...item.seo,


            keywords:

              item.seo?.keywords?.join(", ") || "",


          },


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



  if(id)

    load();



},[id]);









const updateField = (

 key:string,

 value:any

)=>{


 setForm((prev:any)=>({


  ...prev,


  [key]:value,


 }));


};








const updateNested = (

 parent:string,

 key:string,

 value:string

)=>{


 setForm((prev:any)=>({


  ...prev,


  [parent]:{


    ...prev[parent],


    [key]:value,


  },


 }));


};









//////////////////////////////////////////////////////////////
// UPDATE
//////////////////////////////////////////////////////////////

const update = async()=>{


 try{


  setSaving(true);




  const payload = {


    ...form,



    planetsInvolved:

      form.planetsInvolved

      .split(",")

      .map((x:string)=>x.trim())

      .filter(Boolean),



    housesInvolved:

      form.housesInvolved

      .split(",")

      .map((x:string)=>x.trim())

      .filter(Boolean),




    causes:

      form.causes

      .split("\n")

      .filter(Boolean),




    positiveEffects:

      form.positiveEffects

      .split("\n")

      .filter(Boolean),




    negativeEffects:

      form.negativeEffects

      .split("\n")

      .filter(Boolean),




    challenges:

      form.challenges

      .split("\n")

      .filter(Boolean),




    remedies:

      form.remedies

      .split("\n")

      .filter(Boolean),




    mantras:

      form.mantras

      .split("\n")

      .filter(Boolean),




    rituals:

      form.rituals

      .split("\n")

      .filter(Boolean),




    gemstones:

      form.gemstones

      .split(",")

      .map((x:string)=>x.trim())

      .filter(Boolean),




    metals:

      form.metals

      .split(",")

      .map((x:string)=>x.trim())

      .filter(Boolean),




    seo:{


      ...form.seo,


      keywords:

        form.seo.keywords

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),


    },


  };









  const res = await fetch(

    `/api/admin/dosha-intelligence/${id}`,

    {


      method:"PUT",


      headers:{


        "Content-Type":"application/json",


      },


      body:JSON.stringify(payload),


    }


  );






  const data = await res.json();






  if(data.success){


    router.push(

      "/admin/astro/dosha-intelligence"

    );


  }


  else{


    alert(data.message);


  }






 }

 catch(error:any){


  alert(error.message);


 }

 finally{


  setSaving(false);


 }



};









if(loading){


 return (


  <div className="min-h-screen bg-[#0f172a] text-white p-6">


   Loading...


  </div>


 );


}









return (

<div className="min-h-screen bg-[#0f172a] text-white p-6">





<h1 className="text-3xl font-bold mb-8">

Edit Dosha Intelligence

</h1>






<div className="bg-[#1e293b] rounded-xl p-6 space-y-5">







<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Dosha Name"

value={form.dosha || ""}

onChange={(e)=>

updateField(

"dosha",

e.target.value

)}

 />







<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Slug"

value={form.slug || ""}

onChange={(e)=>

updateField(

"slug",

e.target.value

)}

 />









<select

className="w-full bg-slate-800 p-3 rounded"

value={form.category || "other"}

onChange={(e)=>

updateField(

"category",

e.target.value

)}

>


<option value="planetary">

Planetary

</option>


<option value="ancestral">

Ancestral

</option>


<option value="marriage">

Marriage

</option>


<option value="birth-chart">

Birth Chart

</option>


<option value="other">

Other

</option>


</select>









<textarea

className="w-full bg-slate-800 p-3 rounded"

placeholder="Formation Explanation"

value={form.formationExplanation || ""}

onChange={(e)=>

updateField(

"formationExplanation",

e.target.value

)}

 />









<textarea

className="w-full bg-slate-800 p-3 rounded"

placeholder="Description"

value={form.description || ""}

onChange={(e)=>

updateField(

"description",

e.target.value

)}

 />









<h2 className="text-xl font-semibold">

Life Areas

</h2>





{[

"career",

"finance",

"marriage",

"health",

"spirituality"

].map((item)=>(


<textarea

key={item}

className="w-full bg-slate-800 p-3 rounded"

placeholder={item}

value={form.lifeAreas?.[item] || ""}

onChange={(e)=>

updateNested(

"lifeAreas",

item,

e.target.value

)}

 />



))}









<textarea

className="w-full bg-slate-800 p-3 rounded"

placeholder="Remedies"

value={form.remedies || ""}

onChange={(e)=>

updateField(

"remedies",

e.target.value

)}

 />









<textarea

className="w-full bg-slate-800 p-3 rounded"

placeholder="Mantras"

value={form.mantras || ""}

onChange={(e)=>

updateField(

"mantras",

e.target.value

)}

 />









<select

className="w-full bg-slate-800 p-3 rounded"

value={form.status || "draft"}

onChange={(e)=>

updateField(

"status",

e.target.value

)}

>


<option value="draft">

Draft

</option>


<option value="published">

Published

</option>


</select>








<button

onClick={update}

disabled={saving}

className="bg-orange-600 px-6 py-3 rounded-lg"


>


{saving ? "Updating..." : "Update Dosha"}


</button>







</div>





</div>

);


}