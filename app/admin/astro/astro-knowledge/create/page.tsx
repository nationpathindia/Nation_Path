"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO KNOWLEDGE CMS
//
// Create Page
//////////////////////////////////////////////////////////////

import { useState } from "react";

import { useRouter } from "next/navigation";






export default function CreateAstroKnowledgePage(){


  const router = useRouter();




  const [loading,setLoading] =

    useState(false);





  const [form,setForm] =

    useState<any>({



      title:"",

      slug:"",


      category:"other",


      language:"english",


      shortDescription:"",


      content:"",



      relatedZodiac:"",


      relatedPlanets:"",


      relatedDoshas:"",


      relatedYogas:"",


      relatedDashas:"",


      relatedRemedies:"",



      tags:"",





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





tags:


form.tags

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

"/api/admin/astro-knowledge",

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

"/admin/astro/astro-knowledge"

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

Create Astro Knowledge

</h1>









<div className="bg-[#1e293b] rounded-xl p-6 space-y-5">








<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Article Title"

value={form.title}

onChange={(e)=>

updateField(

"title",

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


<option value="beginner">

Beginner

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


<option value="other">

Other

</option>


</select>








<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Language"

value={form.language}

onChange={(e)=>

updateField(

"language",

e.target.value

)}

 />









<textarea

className="w-full bg-slate-800 p-3 rounded"

placeholder="Short Description"

value={form.shortDescription}

onChange={(e)=>

updateField(

"shortDescription",

e.target.value

)}

 />









<textarea

className="w-full bg-slate-800 p-3 rounded h-40"

placeholder="Full Content"

value={form.content}

onChange={(e)=>

updateField(

"content",

e.target.value

)}

 />








<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Related Zodiac"

value={form.relatedZodiac}

onChange={(e)=>

updateField(

"relatedZodiac",

e.target.value

)}

 />








<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Related Planets"

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








<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Related Yogas"

value={form.relatedYogas}

onChange={(e)=>

updateField(

"relatedYogas",

e.target.value

)}

 />








<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Related Dashas"

value={form.relatedDashas}

onChange={(e)=>

updateField(

"relatedDashas",

e.target.value

)}

 />








<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Related Remedies"

value={form.relatedRemedies}

onChange={(e)=>

updateField(

"relatedRemedies",

e.target.value

)}

 />








<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Tags"

value={form.tags}

onChange={(e)=>

updateField(

"tags",

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


{loading ? "Saving..." : "Create Article"}


</button>







</div>






</div>

);


}