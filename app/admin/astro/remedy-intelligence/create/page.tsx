"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO REMEDY INTELLIGENCE CMS
//
// Create Page
//////////////////////////////////////////////////////////////

import { useState } from "react";

import { useRouter } from "next/navigation";





export default function CreateRemedyIntelligencePage(){


  const router = useRouter();




  const [loading,setLoading] =

    useState(false);




  const [form,setForm] =

    useState<any>({


      remedy:"",

      slug:"",

      category:"other",


      relatedPlanets:"",

      relatedDoshas:"",

      relatedProblems:"",


      description:"",

      benefits:"",

      procedure:"",

      materials:"",

      duration:"",


      precautions:"",

      suitableFor:"",

      avoidFor:"",


      mantra:"",

      gemstone:"",

      metal:"",

      day:"",

      color:"",



      seo:{


        title:"",


        description:"",


        keywords:"",


      },


      status:"draft",


    });











const updateField = (

key:string,

value:any

)=>{


setForm((prev:any)=>({


 ...prev,


 [key]:value,


}));


};









const updateSEO = (

key:string,

value:string

)=>{


setForm((prev:any)=>({


 ...prev,


 seo:{


  ...prev.seo,


  [key]:value,


 },


}));


};









//////////////////////////////////////////////////////////////
// SUBMIT
//////////////////////////////////////////////////////////////

const submit = async()=>{


try{


setLoading(true);





const payload = {


 ...form,




 relatedPlanets:


  form.relatedPlanets

  .split(",")

  .map((x:string)=>x.trim())

  .filter(Boolean),





 relatedDoshas:


  form.relatedDoshas

  .split(",")

  .map((x:string)=>x.trim())

  .filter(Boolean),






 relatedProblems:


  form.relatedProblems

  .split(",")

  .map((x:string)=>x.trim())

  .filter(Boolean),






 benefits:


  form.benefits

  .split("\n")

  .filter(Boolean),





 materials:


  form.materials

  .split("\n")

  .filter(Boolean),





 precautions:


  form.precautions

  .split("\n")

  .filter(Boolean),





 suitableFor:


  form.suitableFor

  .split("\n")

  .filter(Boolean),





 avoidFor:


  form.avoidFor

  .split("\n")

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

"/api/admin/remedy-intelligence",

{


method:"POST",


headers:{


"Content-Type":"application/json",


},


body:JSON.stringify(payload),


}

);







const data = await res.json();







if(data.success){


router.push(

"/admin/astro/remedy-intelligence"

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


setLoading(false);


}



};









return (

<div className="min-h-screen bg-[#0f172a] text-white p-6">





<h1 className="text-3xl font-bold mb-8">

Create Remedy Intelligence

</h1>








<div className="bg-[#1e293b] rounded-xl p-6 space-y-5">







<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Remedy Name"

value={form.remedy}

onChange={(e)=>

updateField(

"remedy",

e.target.value

)}

 />








<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Slug"

value={form.slug}

onChange={(e)=>

updateField(

"slug",

e.target.value

)}

 />









<select

className="w-full bg-slate-800 p-3 rounded"

value={form.category}

onChange={(e)=>

updateField(

"category",

e.target.value

)}

>


<option value="mantra">

Mantra

</option>


<option value="puja">

Puja

</option>


<option value="daan">

Daan

</option>


<option value="gemstone">

Gemstone

</option>


<option value="lifestyle">

Lifestyle

</option>


<option value="other">

Other

</option>


</select>








<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Related Planets (comma separated)"

value={form.relatedPlanets}

onChange={(e)=>

updateField(

"relatedPlanets",

e.target.value

)}

 />







<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Related Doshas"

value={form.relatedDoshas}

onChange={(e)=>

updateField(

"relatedDoshas",

e.target.value

)}

 />








<textarea

className="w-full bg-slate-800 p-3 rounded"

placeholder="Description"

value={form.description}

onChange={(e)=>

updateField(

"description",

e.target.value

)}

 />








<textarea

className="w-full bg-slate-800 p-3 rounded"

placeholder="Benefits (one per line)"

value={form.benefits}

onChange={(e)=>

updateField(

"benefits",

e.target.value

)}

 />








<textarea

className="w-full bg-slate-800 p-3 rounded"

placeholder="Procedure"

value={form.procedure}

onChange={(e)=>

updateField(

"procedure",

e.target.value

)}

 />








<textarea

className="w-full bg-slate-800 p-3 rounded"

placeholder="Materials (one per line)"

value={form.materials}

onChange={(e)=>

updateField(

"materials",

e.target.value

)}

 />








<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Duration"

value={form.duration}

onChange={(e)=>

updateField(

"duration",

e.target.value

)}

 />








<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Mantra"

value={form.mantra}

onChange={(e)=>

updateField(

"mantra",

e.target.value

)}

 />








<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Gemstone"

value={form.gemstone}

onChange={(e)=>

updateField(

"gemstone",

e.target.value

)}

 />








<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Day"

value={form.day}

onChange={(e)=>

updateField(

"day",

e.target.value

)}

 />








<select

className="w-full bg-slate-800 p-3 rounded"

value={form.status}

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

onClick={submit}

disabled={loading}

className="bg-orange-600 px-6 py-3 rounded-lg"

>


{loading ? "Saving..." : "Create Remedy"}


</button>







</div>






</div>

);


}