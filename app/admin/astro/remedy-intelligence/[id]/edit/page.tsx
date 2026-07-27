"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO REMEDY INTELLIGENCE CMS
//
// Edit Page
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";






export default function EditRemedyIntelligencePage(){


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

`/api/admin/remedy-intelligence/${id}`,

{

cache:"no-store",

}

);



const data = await res.json();





if(data.success){



const item = data.data;





setForm({


...item,



relatedPlanets:

item.relatedPlanets?.join(", ") || "",



relatedDoshas:

item.relatedDoshas?.join(", ") || "",



relatedProblems:

item.relatedProblems?.join(", ") || "",



benefits:

item.benefits?.join("\n") || "",



materials:

item.materials?.join("\n") || "",



precautions:

item.precautions?.join("\n") || "",



suitableFor:

item.suitableFor?.join("\n") || "",



avoidFor:

item.avoidFor?.join("\n") || "",




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









//////////////////////////////////////////////////////////////
// UPDATE
//////////////////////////////////////////////////////////////

const update = async()=>{


try{


setSaving(true);






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

`/api/admin/remedy-intelligence/${id}`,

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

Edit Remedy Intelligence

</h1>







<div className="bg-[#1e293b] rounded-xl p-6 space-y-5">








<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Remedy Name"

value={form.remedy || ""}

onChange={(e)=>

updateField(

"remedy",

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









<textarea

className="w-full bg-slate-800 p-3 rounded"

placeholder="Benefits"

value={form.benefits || ""}

onChange={(e)=>

updateField(

"benefits",

e.target.value

)}

 />









<textarea

className="w-full bg-slate-800 p-3 rounded"

placeholder="Procedure"

value={form.procedure || ""}

onChange={(e)=>

updateField(

"procedure",

e.target.value

)}

 />









<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Mantra"

value={form.mantra || ""}

onChange={(e)=>

updateField(

"mantra",

e.target.value

)}

 />








<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Gemstone"

value={form.gemstone || ""}

onChange={(e)=>

updateField(

"gemstone",

e.target.value

)}

 />









<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Day"

value={form.day || ""}

onChange={(e)=>

updateField(

"day",

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


{saving ? "Updating..." : "Update Remedy"}


</button>







</div>





</div>

);


}