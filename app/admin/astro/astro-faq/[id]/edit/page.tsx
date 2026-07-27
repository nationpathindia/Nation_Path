"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO FAQ INTELLIGENCE CMS
//
// Edit Page
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";







export default function EditAstroFAQPage(){


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
// LOAD FAQ
//////////////////////////////////////////////////////////////

useEffect(()=>{


const load = async()=>{


try{


const res = await fetch(

`/api/admin/astro-faq/${id}`,

{


cache:"no-store",


}

);






const data = await res.json();







if(data.success){


const item = data.data;







setForm({


...item,





relatedZodiac:

item.relatedZodiac?.join(", ") || "",





relatedPlanets:

item.relatedPlanets?.join(", ") || "",





relatedDoshas:

item.relatedDoshas?.join(", ") || "",





relatedYogas:

item.relatedYogas?.join(", ") || "",





relatedDashas:

item.relatedDashas?.join(", ") || "",





relatedRemedies:

item.relatedRemedies?.join(", ") || "",





keywords:

item.keywords?.join(", ") || "",





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
// UPDATE FAQ
//////////////////////////////////////////////////////////////

const update = async()=>{


try{


setSaving(true);







const payload = {



...form,







relatedZodiac:


form.relatedZodiac

.split(",")

.map((x:string)=>x.trim())

.filter(Boolean),







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







relatedYogas:


form.relatedYogas

.split(",")

.map((x:string)=>x.trim())

.filter(Boolean),







relatedDashas:


form.relatedDashas

.split(",")

.map((x:string)=>x.trim())

.filter(Boolean),







relatedRemedies:


form.relatedRemedies

.split(",")

.map((x:string)=>x.trim())

.filter(Boolean),







keywords:


form.keywords

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

`/api/admin/astro-faq/${id}`,

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

"/admin/astro/astro-faq"

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

Edit Astro FAQ

</h1>









<div className="bg-[#1e293b] rounded-xl p-6 space-y-5">







<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Question"

value={form.question || ""}

onChange={(e)=>

updateField(

"question",

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









<textarea

className="w-full bg-slate-800 p-3 rounded h-40"

placeholder="Answer"

value={form.answer || ""}

onChange={(e)=>

updateField(

"answer",

e.target.value

)}

 />









<select

className="w-full bg-slate-800 p-3 rounded"

value={form.category || "general"}

onChange={(e)=>

updateField(

"category",

e.target.value

)}

>


<option value="general">

General

</option>


<option value="zodiac">

Zodiac

</option>


<option value="planet">

Planet

</option>


<option value="house">

House

</option>


<option value="nakshatra">

Nakshatra

</option>


<option value="panchang">

Panchang

</option>


<option value="dosha">

Dosha

</option>


<option value="yoga">

Yoga

</option>


<option value="dasha">

Dasha

</option>


<option value="remedy">

Remedy

</option>


<option value="kundli">

Kundli

</option>


<option value="other">

Other

</option>


</select>









<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Language"

value={form.language || ""}

onChange={(e)=>

updateField(

"language",

e.target.value

)}

 />








<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Related Zodiac"

value={form.relatedZodiac || ""}

onChange={(e)=>

updateField(

"relatedZodiac",

e.target.value

)}

 />








<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Related Planets"

value={form.relatedPlanets || ""}

onChange={(e)=>

updateField(

"relatedPlanets",

e.target.value

)}

 />








<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Related Doshas"

value={form.relatedDoshas || ""}

onChange={(e)=>

updateField(

"relatedDoshas",

e.target.value

)}

 />








<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Related Yogas"

value={form.relatedYogas || ""}

onChange={(e)=>

updateField(

"relatedYogas",

e.target.value

)}

 />








<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Related Dashas"

value={form.relatedDashas || ""}

onChange={(e)=>

updateField(

"relatedDashas",

e.target.value

)}

 />








<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Related Remedies"

value={form.relatedRemedies || ""}

onChange={(e)=>

updateField(

"relatedRemedies",

e.target.value

)}

 />








<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Keywords"

value={form.keywords || ""}

onChange={(e)=>

updateField(

"keywords",

e.target.value

)}

 />








<input

type="number"

className="w-full bg-slate-800 p-3 rounded"

placeholder="Priority"

value={form.priority || 1}

onChange={(e)=>

updateField(

"priority",

Number(e.target.value)

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


{saving ? "Updating..." : "Update FAQ"}


</button>








</div>






</div>

);


}