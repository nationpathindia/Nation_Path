"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO DOSHA INTELLIGENCE CMS
//
// Create Page
//////////////////////////////////////////////////////////////

import { useState } from "react";

import { useRouter } from "next/navigation";





export default function CreateDoshaIntelligencePage(){


  const router = useRouter();




  const [loading,setLoading] =

    useState(false);



  const [form,setForm] =

    useState<any>({


      dosha:"",

      slug:"",

      category:"other",

      multilingualNames:{


        hindi:"",

        english:"",

        nepali:"",

      },


      planetsInvolved:"",

      housesInvolved:"",

      formationExplanation:"",

      causes:"",

      positiveEffects:"",

      negativeEffects:"",

      challenges:"",


      lifeAreas:{


        career:"",

        finance:"",

        marriage:"",

        health:"",

        spirituality:"",

      },


      remedies:"",

      mantras:"",

      rituals:"",

      gemstones:"",

      metals:"",

      description:"",


      seo:{


        title:"",

        description:"",

        keywords:"",

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

          .filter(Boolean),





        metals:

          form.metals

          .split(",")

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

        "/api/admin/dosha-intelligence",

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

          "/admin/astro/dosha-intelligence"

        );


      }

      else{


        alert(

          data.message

        );


      }



    }


    catch(error:any){


      alert(

        error.message

      );


    }


    finally{


      setLoading(false);


    }


  };









//////////////////////////////////////////////////////////////
// UI
//////////////////////////////////////////////////////////////

return (


<div className="min-h-screen bg-[#0f172a] p-6 text-white">



<h1 className="text-3xl font-bold mb-8">

Create Dosha Intelligence

</h1>






<div className="bg-[#1e293b] rounded-xl p-6 space-y-5">





<input

className="w-full bg-slate-800 p-3 rounded"

placeholder="Dosha Name"

value={form.dosha}

onChange={(e)=>

updateField(

"dosha",

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

value={form.formationExplanation}

onChange={(e)=>

updateField(

"formationExplanation",

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

value={form.lifeAreas[item]}

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

placeholder="Causes (one per line)"

value={form.causes}

onChange={(e)=>

updateField(

"causes",

e.target.value

)}

 />







<textarea

className="w-full bg-slate-800 p-3 rounded"

placeholder="Positive Effects (one per line)"

value={form.positiveEffects}

onChange={(e)=>

updateField(

"positiveEffects",

e.target.value

)}

 />







<textarea

className="w-full bg-slate-800 p-3 rounded"

placeholder="Negative Effects (one per line)"

value={form.negativeEffects}

onChange={(e)=>

updateField(

"negativeEffects",

e.target.value

)}

 />







<textarea

className="w-full bg-slate-800 p-3 rounded"

placeholder="Remedies (one per line)"

value={form.remedies}

onChange={(e)=>

updateField(

"remedies",

e.target.value

)}

 />







<textarea

className="w-full bg-slate-800 p-3 rounded"

placeholder="Mantras (one per line)"

value={form.mantras}

onChange={(e)=>

updateField(

"mantras",

e.target.value

)}

 />









<button

onClick={submit}

disabled={loading}

className="bg-orange-600 px-6 py-3 rounded-lg"

>


{loading ? "Saving..." : "Create Dosha"}


</button>





</div>


</div>


);


}