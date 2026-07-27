"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO NAKSHATRA INTELLIGENCE CMS
//
// Create Page
//////////////////////////////////////////////////////////////

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function CreateNakshatraIntelligencePage(){

  const router = useRouter();

  const [loading,setLoading] =

    useState(false);

  const [form,setForm] =

    useState<any>({

      nakshatra:"",

      slug:"",

      number:1,

      names:{

        english:"",

        hindi:"",

        sanskrit:"",

      },

      ruler:"",

      deity:"",

      symbol:"",

      gana:"",

      guna:"",

      yoni:"",

      nadi:"",

      varna:"",

      element:"",

      nature:"",

      motivation:"",

      gender:"",

      direction:"",

      animal:"",

      tree:"",

      personality:"",

      strengths:"",

      weaknesses:"",

      profession:"",

      relationships:"",

      health:"",

      spirituality:"",

      keywords:"",

      remedies:"",

      mantra:"",

      gemstone:"",

      color:"",

      description:"",

      media:{

        icon:"",

        banner:"",

      },

      seo:{

        title:"",

        description:"",

      },

      status:"draft",

    });



//////////////////////////////////////////////////////////////
// HANDLE CHANGE
//////////////////////////////////////////////////////////////

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
// SUBMIT
//////////////////////////////////////////////////////////////

  const submit = async()=>{

    try{

      setLoading(true);

      const payload = {

        ...form,

        personality:

          form.personality
          .split("\n")
          .map((x:string)=>x.trim())
          .filter(Boolean),

        strengths:

          form.strengths
          .split("\n")
          .map((x:string)=>x.trim())
          .filter(Boolean),

        weaknesses:

          form.weaknesses
          .split("\n")
          .map((x:string)=>x.trim())
          .filter(Boolean),

        profession:

          form.profession
          .split("\n")
          .map((x:string)=>x.trim())
          .filter(Boolean),

        relationships:

          form.relationships
          .split("\n")
          .map((x:string)=>x.trim())
          .filter(Boolean),

        health:

          form.health
          .split("\n")
          .map((x:string)=>x.trim())
          .filter(Boolean),

        spirituality:

          form.spirituality
          .split("\n")
          .map((x:string)=>x.trim())
          .filter(Boolean),

        keywords:

          form.keywords
          .split(",")
          .map((x:string)=>x.trim())
          .filter(Boolean),

        remedies:

          form.remedies
          .split("\n")
          .map((x:string)=>x.trim())
          .filter(Boolean),

      };

      const res = await fetch(

        "/api/admin/nakshatra-intelligence",

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

          "/admin/astro/nakshatra-intelligence"

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

//////////////////////////////////////////////////////////////
// UI
//////////////////////////////////////////////////////////////

return(

<div className="min-h-screen bg-[#0f172a] p-6 text-white">

<h1 className="text-3xl font-bold mb-8">

Create Nakshatra Intelligence

</h1>

<div className="bg-[#1e293b] rounded-xl p-6 space-y-5">

<input
className="w-full bg-slate-800 p-3 rounded"
placeholder="Nakshatra"
value={form.nakshatra}
onChange={(e)=>updateField("nakshatra",e.target.value)}
/>

<input
className="w-full bg-slate-800 p-3 rounded"
placeholder="Slug"
value={form.slug}
onChange={(e)=>updateField("slug",e.target.value)}
/>

<input
type="number"
className="w-full bg-slate-800 p-3 rounded"
placeholder="Number"
value={form.number}
onChange={(e)=>updateField("number",Number(e.target.value))}
/>

<input
className="w-full bg-slate-800 p-3 rounded"
placeholder="Ruler Planet"
value={form.ruler}
onChange={(e)=>updateField("ruler",e.target.value)}
/>

<textarea
className="w-full bg-slate-800 p-3 rounded"
placeholder="Description"
value={form.description}
onChange={(e)=>updateField("description",e.target.value)}
/>
<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Deity"

value={form.deity}

onChange={(e)=>

updateField(

"deity",

e.target.value

)}

 />




<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Symbol"

value={form.symbol}

onChange={(e)=>

updateField(

"symbol",

e.target.value

)}

 />




<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Gana"

value={form.gana}

onChange={(e)=>

updateField(

"gana",

e.target.value

)}

 />




<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Guna"

value={form.guna}

onChange={(e)=>

updateField(

"guna",

e.target.value

)}

 />




<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Yoni"

value={form.yoni}

onChange={(e)=>

updateField(

"yoni",

e.target.value

)}

 />




<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Nadi"

value={form.nadi}

onChange={(e)=>

updateField(

"nadi",

e.target.value

)}

 />




<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Varna"

value={form.varna}

onChange={(e)=>

updateField(

"varna",

e.target.value

)}

 />




<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Element"

value={form.element}

onChange={(e)=>

updateField(

"element",

e.target.value

)}

 />




<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Nature"

value={form.nature}

onChange={(e)=>

updateField(

"nature",

e.target.value

)}

 />




<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Motivation"

value={form.motivation}

onChange={(e)=>

updateField(

"motivation",

e.target.value

)}

 />




<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Gender"

value={form.gender}

onChange={(e)=>

updateField(

"gender",

e.target.value

)}

 />




<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Direction"

value={form.direction}

onChange={(e)=>

updateField(

"direction",

e.target.value

)}

 />




<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Animal"

value={form.animal}

onChange={(e)=>

updateField(

"animal",

e.target.value

)}

 />




<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Tree"

value={form.tree}

onChange={(e)=>

updateField(

"tree",

e.target.value

)}

 />




<textarea

className="w-full bg-slate-800 p-3 rounded"

placeholder="Personality (One per line)"

value={form.personality}

onChange={(e)=>

updateField(

"personality",

e.target.value

)}

 />




<textarea

className="w-full bg-slate-800 p-3 rounded"

placeholder="Strengths (One per line)"

value={form.strengths}

onChange={(e)=>

updateField(

"strengths",

e.target.value

)}

 />




<textarea

className="w-full bg-slate-800 p-3 rounded"

placeholder="Weaknesses (One per line)"

value={form.weaknesses}

onChange={(e)=>

updateField(

"weaknesses",

e.target.value

)}

 />
 <textarea

className="w-full bg-slate-800 p-3 rounded"

placeholder="Profession (One per line)"

value={form.profession}

onChange={(e)=>

updateField(

"profession",

e.target.value

)}

 />



<textarea

className="w-full bg-slate-800 p-3 rounded"

placeholder="Relationships (One per line)"

value={form.relationships}

onChange={(e)=>

updateField(

"relationships",

e.target.value

)}

 />



<textarea

className="w-full bg-slate-800 p-3 rounded"

placeholder="Health (One per line)"

value={form.health}

onChange={(e)=>

updateField(

"health",

e.target.value

)}

 />



<textarea

className="w-full bg-slate-800 p-3 rounded"

placeholder="Spirituality (One per line)"

value={form.spirituality}

onChange={(e)=>

updateField(

"spirituality",

e.target.value

)}

 />



<textarea

className="w-full bg-slate-800 p-3 rounded"

placeholder="Keywords (comma separated)"

value={form.keywords}

onChange={(e)=>

updateField(

"keywords",

e.target.value

)}

 />



<textarea

className="w-full bg-slate-800 p-3 rounded"

placeholder="Remedies (One per line)"

value={form.remedies}

onChange={(e)=>

updateField(

"remedies",

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

placeholder="Color"

value={form.color}

onChange={(e)=>

updateField(

"color",

e.target.value

)}

 />



<h2 className="text-xl font-semibold">

Media

</h2>



<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Icon URL"

value={form.media.icon}

onChange={(e)=>

updateNested(

"media",

"icon",

e.target.value

)}

 />



<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Banner URL"

value={form.media.banner}

onChange={(e)=>

updateNested(

"media",

"banner",

e.target.value

)}

 />



<h2 className="text-xl font-semibold">

SEO

</h2>



<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="SEO Title"

value={form.seo.title}

onChange={(e)=>

updateNested(

"seo",

"title",

e.target.value

)}

 />



<textarea

className="w-full bg-slate-800 p-3 rounded"

placeholder="SEO Description"

value={form.seo.description}

onChange={(e)=>

updateNested(

"seo",

"description",

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

className="bg-orange-600 px-6 py-3 rounded-lg hover:bg-orange-700 disabled:opacity-50"

>

{loading ? "Saving..." : "Create Nakshatra"}

</button>



</div>

</div>

);

}