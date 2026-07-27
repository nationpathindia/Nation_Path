"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";



export default function EditPlanetPage(){


  const router = useRouter();

  const params = useParams();


  const id = params.id as string;



  const [loading,setLoading] = useState(true);

  const [saving,setSaving] = useState(false);





  const [form,setForm] = useState<any>({


    planet:"",

    slug:"",


    names:{


      english:"",

      hindi:"",

      sanskrit:"",

    },


    nature:"neutral",


    element:"",

    category:"",



    karakatva:"",

    profession:"",

    relationships:"",



    positiveEffects:"",

    negativeEffects:"",

    weaknesses:"",



    remedies:"",



    mantra:"",

    gemstone:"",

    metal:"",

    day:"",

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









  useEffect(()=>{


    loadPlanet();


  },[]);









  const loadPlanet = async()=>{


    try{


      const res = await fetch(

        `/api/admin/planet-intelligence/${id}`

      );


      const data = await res.json();





      if(data.success){


        const item=data.data;




        setForm({


          ...item,



          karakatva:

            item.karakatva?.join(", ") || "",



          profession:

            item.profession?.join(", ") || "",



          relationships:

            item.relationships?.join(", ") || "",



          positiveEffects:

            item.positiveEffects?.join(", ") || "",



          negativeEffects:

            item.negativeEffects?.join(", ") || "",



          weaknesses:

            item.weaknesses?.join(", ") || "",



          remedies:

            item.remedies?.join(", ") || "",



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









  const updateNested=(

    section:string,

    key:string,

    value:string

  )=>{


    setForm((prev:any)=>({


      ...prev,


      [section]:{


        ...prev[section],


        [key]:value,


      }


    }));


  };









  const submit=async()=>{


    try{


      setSaving(true);




      const payload={


        ...form,



        karakatva:

          splitArray(form.karakatva),



        profession:

          splitArray(form.profession),



        relationships:

          splitArray(form.relationships),



        positiveEffects:

          splitArray(form.positiveEffects),



        negativeEffects:

          splitArray(form.negativeEffects),



        weaknesses:

          splitArray(form.weaknesses),



        remedies:

          splitArray(form.remedies),



      };








      const res = await fetch(

        `/api/admin/planet-intelligence/${id}`,

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








      const data = await res.json();





      if(data.success){


        alert(

          "Planet updated successfully"

        );



        router.push(

          "/admin/astro/planet-intelligence"

        );


      }


      else{


        alert(

          data.message || "Update failed"

        );


      }




    }


    catch(error){


      console.error(error);


      alert(

        "Server error"

      );


    }


    finally{


      setSaving(false);


    }


  };









  if(loading){


    return (

      <div className="min-h-screen bg-[#0f172a] text-white p-8">

        Loading...

      </div>

    );


  }









  return (

<div className="min-h-screen bg-[#0f172a] text-white p-8">





<h1 className="text-3xl font-bold mb-8">

🪐 Edit Planet Intelligence

</h1>








<div className="bg-[#1e293b] rounded-xl p-8 space-y-8">









<Section title="Basic Information">


<div className="grid md:grid-cols-2 gap-4">


<Input

label="Planet"

value={form.planet}

onChange={(v)=>

setForm({

...form,

planet:v

})

}

/>





<Input

label="Slug"

value={form.slug}

onChange={(v)=>

setForm({

...form,

slug:v

})

}

/>





<Input

label="Category"

value={form.category}

onChange={(v)=>

setForm({

...form,

category:v

})

}

/>





<select

value={form.nature}

onChange={(e)=>

setForm({

...form,

nature:e.target.value

})

}

className="bg-black p-3 rounded"

>


<option value="benefic">

Benefic

</option>


<option value="malefic">

Malefic

</option>


<option value="neutral">

Neutral

</option>


</select>


</div>


</Section>









<Section title="Names">


<div className="grid md:grid-cols-3 gap-4">


{

Object.keys(form.names || {})

.map(key=>(


<Input

key={key}

label={key}

value={form.names[key]}

onChange={(v)=>

updateNested(

"names",

key,

v

)

}

/>


))


}


</div>


</Section>









<Section title="Astrology Knowledge">


<Input

label="Karakatva"

value={form.karakatva}

onChange={(v)=>

setForm({

...form,

karakatva:v

})

}

/>



<Input

label="Profession"

value={form.profession}

onChange={(v)=>

setForm({

...form,

profession:v

})

}

/>



<Input

label="Relationships"

value={form.relationships}

onChange={(v)=>

setForm({

...form,

relationships:v

})

}

/>


</Section>









<Section title="Effects">


<Input

label="Positive Effects"

value={form.positiveEffects}

onChange={(v)=>

setForm({

...form,

positiveEffects:v

})

}

/>




<Input

label="Negative Effects"

value={form.negativeEffects}

onChange={(v)=>

setForm({

...form,

negativeEffects:v

})

}

/>




<Input

label="Weakness"

value={form.weaknesses}

onChange={(v)=>

setForm({

...form,

weaknesses:v

})

}

/>



</Section>









<Section title="Remedies">


<Input

label="Remedies"

value={form.remedies}

onChange={(v)=>

setForm({

...form,

remedies:v

})

}

/>




<Input

label="Mantra"

value={form.mantra}

onChange={(v)=>

setForm({

...form,

mantra:v

})

}

/>



<div className="grid md:grid-cols-4 gap-4">


<Input

label="Gemstone"

value={form.gemstone}

onChange={(v)=>

setForm({

...form,

gemstone:v

})

}

/>



<Input

label="Metal"

value={form.metal}

onChange={(v)=>

setForm({

...form,

metal:v

})

}

/>



<Input

label="Day"

value={form.day}

onChange={(v)=>

setForm({

...form,

day:v

})

}

/>



<Input

label="Color"

value={form.color}

onChange={(v)=>

setForm({

...form,

color:v

})

}

/>


</div>


</Section>









<Section title="Description">


<textarea

value={form.description}

onChange={(e)=>

setForm({

...form,

description:e.target.value

})

}

className="w-full bg-black p-3 rounded"

/>


</Section>









<Section title="SEO">


<Input

label="SEO Title"

value={form.seo?.title}

onChange={(v)=>

updateNested(

"seo",

"title",

v

)

}

/>




<textarea

value={form.seo?.description}

onChange={(e)=>

updateNested(

"seo",

"description",

e.target.value

)

}

className="w-full bg-black p-3 rounded"

/>


</Section>









<button

disabled={saving}

onClick={submit}

className="bg-orange-600 px-8 py-3 rounded-xl font-semibold"

>


{

saving

?

"Updating..."

:

"Update Planet"

}


</button>







</div>


</div>

  );


}









function splitArray(value:string){

return value

.split(",")

.map(x=>x.trim())

.filter(Boolean);

}









function Section({

title,

children

}:{

title:string;

children:React.ReactNode;

}){


return (

<section>


<h2 className="text-xl font-semibold mb-4">

{title}

</h2>


{children}


</section>

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

<div>


<label className="text-sm text-gray-400">

{label}

</label>


<input

value={value || ""}

onChange={(e)=>

onChange(e.target.value)

}

className="w-full bg-black p-3 rounded-lg mt-1"

/>


</div>

);


}