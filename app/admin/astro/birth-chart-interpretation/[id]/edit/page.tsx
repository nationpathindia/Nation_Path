"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH BIRTH CHART INTERPRETATION CMS
//
// Edit Page
//
// Responsibility:
// Astrology knowledge content update only.
//
// Does NOT:
// - calculate astrology
// - modify astro engine
// - generate predictions
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";








export default function EditBirthChartInterpretation(){



const params = useParams();

const router = useRouter();



const id = params.id as string;








const [loading,setLoading] =

useState(true);



const [saving,setSaving] =

useState(false);



const [error,setError] =

useState("");









const [form,setForm] = useState<any>({



title:"",

slug:"",

category:"general",

subject:"",

planet:"",

house:"",

zodiac:"",

aspect:"",



keywords:"",



interpretation:"",



positiveEffects:"",



negativeEffects:"",



remedies:"",



strengths:"",



weaknesses:"",



examples:"",



language:"multi",



seoTitle:"",

seoDescription:"",

seoKeywords:"",



status:"draft",



priority:1,



});









//////////////////////////////////////////////////////////////
// LOAD DATA
//////////////////////////////////////////////////////////////

const fetchData = async()=>{


try{


const res = await fetch(

`/api/admin/astro/birth-chart-interpretation/${id}`,

{

cache:"no-store",

}

);






const data = await res.json();







if(data.success){


const item = data.data;





setForm({


title:item.title || "",


slug:item.slug || "",


category:item.category || "general",


subject:item.subject || "",


planet:item.planet || "",


house:item.house || "",


zodiac:item.zodiac || "",


aspect:item.aspect || "",



keywords:

(item.keywords || []).join(","),



interpretation:

item.interpretation || "",



positiveEffects:

(item.positiveEffects || []).join("\n"),



negativeEffects:

(item.negativeEffects || []).join("\n"),



remedies:

(item.remedies || []).join("\n"),



strengths:

(item.strengths || []).join("\n"),



weaknesses:

(item.weaknesses || []).join("\n"),



examples:

item.examples || "",



language:item.language || "multi",



seoTitle:

item.seo?.title || "",



seoDescription:

item.seo?.description || "",



seoKeywords:

(item.seo?.keywords || []).join(","),



status:item.status || "draft",



priority:item.priority || 1,



});





}

else{


setError(

data.message

);


}


}

catch(err:any){


setError(

err.message

);


}

finally{


setLoading(false);


}



};









useEffect(()=>{


if(id)

fetchData();


},[id]);









const updateField=(

key:string,

value:any

)=>{


setForm((prev:any)=>(

{

...prev,

[key]:value,

}

));


};









//////////////////////////////////////////////////////////////
// UPDATE
//////////////////////////////////////////////////////////////

const submit = async()=>{


try{


setSaving(true);

setError("");








const payload = {


...form,




house:

form.house

?

Number(form.house)

:

undefined,






keywords:

form.keywords

.split(",")

.map((x:string)=>x.trim())

.filter(Boolean),






positiveEffects:

form.positiveEffects

.split("\n")

.filter(Boolean),






negativeEffects:

form.negativeEffects

.split("\n")

.filter(Boolean),






remedies:

form.remedies

.split("\n")

.filter(Boolean),






strengths:

form.strengths

.split("\n")

.filter(Boolean),






weaknesses:

form.weaknesses

.split("\n")

.filter(Boolean),






seo:{


title:form.seoTitle,


description:form.seoDescription,


keywords:

form.seoKeywords

.split(",")

.map((x:string)=>x.trim())

.filter(Boolean),



},


};









delete payload.seoTitle;

delete payload.seoDescription;

delete payload.seoKeywords;









const res = await fetch(

`/api/admin/astro/birth-chart-interpretation/${id}`,

{


method:"PUT",


headers:{


"Content-Type":"application/json",

},


body:JSON.stringify(payload),


}

);








const data = await res.json();







if(!data.success){


throw new Error(

data.message ||

"Update failed"

);


}







router.push(

`/admin/astro/birth-chart-interpretation/${id}`

);






}

catch(err:any){


setError(

err.message

);


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

Edit Birth Chart Interpretation

</h1>









{error && (

<div className="bg-red-600 p-4 rounded-lg mb-5">

{error}

</div>

)}









<div className="bg-[#1e293b] p-6 rounded-xl grid gap-5">









{[

["title","Title"],

["slug","Slug"],

["subject","Subject"],

["planet","Planet"],

["zodiac","Zodiac"],

["aspect","Aspect"],

].map(([key,label])=>(



<input

key={key}

value={form[key]}

placeholder={label}

onChange={(e)=>

updateField(

key,

e.target.value

)

}

className="bg-slate-800 p-3 rounded-lg"

/>



))}









<select

value={form.category}

onChange={(e)=>

updateField(

"category",

e.target.value

)

}

className="bg-slate-800 p-3 rounded-lg"

>

<option value="general">

General

</option>

<option value="planet">

Planet

</option>

<option value="house">

House

</option>

<option value="aspect">

Aspect

</option>

<option value="sign">

Sign

</option>

<option value="combination">

Combination

</option>


</select>









<input

placeholder="House"

value={form.house}

onChange={(e)=>

updateField(

"house",

e.target.value

)

}

className="bg-slate-800 p-3 rounded-lg"

/>









<textarea

placeholder="Keywords"

value={form.keywords}

onChange={(e)=>

updateField(

"keywords",

e.target.value

)

}

className="bg-slate-800 p-3 rounded-lg"

/>









<textarea

placeholder="Interpretation"

value={form.interpretation}

onChange={(e)=>

updateField(

"interpretation",

e.target.value

)

}

className="bg-slate-800 p-3 rounded-lg h-40"

/>









<textarea

placeholder="Positive Effects"

value={form.positiveEffects}

onChange={(e)=>

updateField(

"positiveEffects",

e.target.value

)

}

className="bg-slate-800 p-3 rounded-lg"

/>









<textarea

placeholder="Negative Effects"

value={form.negativeEffects}

onChange={(e)=>

updateField(

"negativeEffects",

e.target.value

)

}

className="bg-slate-800 p-3 rounded-lg"

/>









<textarea

placeholder="Remedies"

value={form.remedies}

onChange={(e)=>

updateField(

"remedies",

e.target.value

)

}

className="bg-slate-800 p-3 rounded-lg"

/>









<textarea

placeholder="Strengths"

value={form.strengths}

onChange={(e)=>

updateField(

"strengths",

e.target.value

)

}

className="bg-slate-800 p-3 rounded-lg"

/>









<textarea

placeholder="Weaknesses"

value={form.weaknesses}

onChange={(e)=>

updateField(

"weaknesses",

e.target.value

)

}

className="bg-slate-800 p-3 rounded-lg"

/>









<textarea

placeholder="Examples"

value={form.examples}

onChange={(e)=>

updateField(

"examples",

e.target.value

)

}

className="bg-slate-800 p-3 rounded-lg"

/>









<input

placeholder="SEO Title"

value={form.seoTitle}

onChange={(e)=>

updateField(

"seoTitle",

e.target.value

)

}

className="bg-slate-800 p-3 rounded-lg"

/>









<textarea

placeholder="SEO Description"

value={form.seoDescription}

onChange={(e)=>

updateField(

"seoDescription",

e.target.value

)

}

className="bg-slate-800 p-3 rounded-lg"

/>









<input

placeholder="SEO Keywords"

value={form.seoKeywords}

onChange={(e)=>

updateField(

"seoKeywords",

e.target.value

)

}

className="bg-slate-800 p-3 rounded-lg"

/>









<select

value={form.status}

onChange={(e)=>

updateField(

"status",

e.target.value

)

}

className="bg-slate-800 p-3 rounded-lg"

>

<option value="draft">

Draft

</option>

<option value="published">

Published

</option>

</select>









<input

type="number"

value={form.priority}

onChange={(e)=>

updateField(

"priority",

Number(e.target.value)

)

}

className="bg-slate-800 p-3 rounded-lg"

/>









<button

onClick={submit}

disabled={saving}

className="bg-orange-600 px-6 py-3 rounded-lg"

>


{saving

?

"Updating..."

:

"Update Interpretation"

}


</button>









</div>









</div>

);


}