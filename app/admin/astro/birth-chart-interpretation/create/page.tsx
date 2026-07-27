"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH BIRTH CHART INTERPRETATION CMS
//
// Create Page
//
// Responsibility:
// Astrology knowledge content creation only.
//
// Does NOT:
// - calculate astrology
// - modify astro engine
// - generate predictions
//////////////////////////////////////////////////////////////

import { useState } from "react";

import { useRouter } from "next/navigation";







export default function CreateBirthChartInterpretation(){



const router = useRouter();







const [loading,setLoading] =

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









const updateField = (

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









const submit = async()=>{


try{


setLoading(true);

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



title:

form.seoTitle,



description:

form.seoDescription,



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

"/api/admin/astro/birth-chart-interpretation",

{


method:"POST",


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

"Failed to create interpretation"

);


}








router.push(

"/admin/astro/birth-chart-interpretation"

);






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









return (

<div className="min-h-screen bg-[#0f172a] text-white p-6">







<h1 className="text-3xl font-bold mb-8">

Create Birth Chart Interpretation

</h1>









{error && (

<div className="bg-red-600 p-4 rounded-lg mb-5">

{error}

</div>

)}









<div className="bg-[#1e293b] rounded-xl p-6 grid gap-5">







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

placeholder={label}

value={form[key]}

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

placeholder="House Number"

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

placeholder="Keywords comma separated"

value={form.keywords}

onChange={(e)=>

updateField(

"keywords",

e.target.value

)

}

className="bg-slate-800 p-3 rounded-lg h-24"

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

placeholder="Positive Effects (one per line)"

value={form.positiveEffects}

onChange={(e)=>

updateField(

"positiveEffects",

e.target.value

)

}

className="bg-slate-800 p-3 rounded-lg h-32"

/>









<textarea

placeholder="Negative Effects (one per line)"

value={form.negativeEffects}

onChange={(e)=>

updateField(

"negativeEffects",

e.target.value

)

}

className="bg-slate-800 p-3 rounded-lg h-32"

/>









<textarea

placeholder="Remedies (one per line)"

value={form.remedies}

onChange={(e)=>

updateField(

"remedies",

e.target.value

)

}

className="bg-slate-800 p-3 rounded-lg h-32"

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

placeholder="Priority"

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

disabled={loading}

className="bg-orange-600 px-6 py-3 rounded-lg"

>


{loading

?

"Saving..."

:

"Create Interpretation"

}


</button>









</div>







</div>

);


}