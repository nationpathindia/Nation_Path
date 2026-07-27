"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";



export default function CreatePlanetPage(){


  const router = useRouter();


  const [loading,setLoading] = useState(false);





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


      setLoading(true);




      const payload={


        ...form,



        karakatva:

        form.karakatva

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),





        profession:

        form.profession

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),





        relationships:

        form.relationships

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),






        positiveEffects:

        form.positiveEffects

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),





        negativeEffects:

        form.negativeEffects

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),






        weaknesses:

        form.weaknesses

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),





        remedies:

        form.remedies

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),



      };









      const res=await fetch(

        "/api/admin/planet-intelligence",

        {


          method:"POST",


          headers:{


            "Content-Type":

            "application/json",


          },


          body:

          JSON.stringify(payload),


        }

      );








      const data=

      await res.json();








      if(data.success){


        alert(

          "Planet created successfully"

        );


        router.push(

          "/admin/astro/planet-intelligence"

        );


      }

      else{


        alert(

          data.message || "Failed"

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


      setLoading(false);


    }


  };









return (

<div className="min-h-screen bg-[#0f172a] text-white p-8">





<h1 className="text-3xl font-bold mb-8">

🪐 Create Planet Intelligence

</h1>








<div className="bg-[#1e293b] rounded-xl p-8 space-y-8">







<section>


<h2 className="text-xl font-semibold mb-4">

Basic Information

</h2>




<div className="grid md:grid-cols-2 gap-4">



<Input

label="Planet ID"

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


</section>









<section>


<h2 className="text-xl font-semibold mb-4">

Language Names

</h2>



<div className="grid md:grid-cols-3 gap-4">


{

Object.keys(form.names)

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


</section>









<section>


<h2 className="text-xl font-semibold mb-4">

Astrology Knowledge

</h2>




<Input

label="Karakatva comma separated"

value={form.karakatva}

onChange={(v)=>

setForm({

...form,

karakatva:v

})

}

/>




<Input

label="Profession comma separated"

value={form.profession}

onChange={(v)=>

setForm({

...form,

profession:v

})

}

/>


<Input

label="Relationships comma separated"

value={form.relationships}

onChange={(v)=>

setForm({

...form,

relationships:v

})

}

/>




</section>









<section>


<h2 className="text-xl font-semibold mb-4">

Effects

</h2>




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



</section>









<section>


<h2 className="text-xl font-semibold mb-4">

Remedies

</h2>




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



</section>









<section>


<h2 className="text-xl font-semibold mb-4">

Description + SEO

</h2>



<textarea

placeholder="Planet description"

value={form.description}

onChange={(e)=>

setForm({

...form,

description:e.target.value

})

}

className="w-full bg-black p-3 rounded"

/>





<Input

label="SEO Title"

value={form.seo.title}

onChange={(v)=>

updateNested(

"seo",

"title",

v

)

}

/>





<textarea

placeholder="SEO Description"

value={form.seo.description}

onChange={(e)=>

updateNested(

"seo",

"description",

e.target.value

)

}

className="w-full bg-black p-3 rounded"

/>



</section>









<button

disabled={loading}

onClick={submit}

className="bg-orange-600 px-8 py-3 rounded-xl font-semibold"

>

{

loading

?

"Saving..."

:

"Create Planet"

}


</button>







</div>


</div>

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