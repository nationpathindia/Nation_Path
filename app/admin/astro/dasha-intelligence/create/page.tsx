"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Create Dasha Intelligence
//////////////////////////////////////////////////////////////

import { useState } from "react";
import { useRouter } from "next/navigation";



export default function CreateDashaPage(){


  const router = useRouter();


  const [loading,setLoading] = useState(false);





  const [form,setForm] = useState<any>({


    planet:"",

    slug:"",



    names:{


      en:"",

      hi:"",

      ne:"",


    },



    dashaType:{


      type:"mahadasha",

      parentPlanet:"",


    },



    nature:{


      benefic:false,

      description:"",


    },



    duration:{


      years:"",

      months:"",

      description:"",


    },



    karakatva:"",

    profession:"",

    relationships:"",



    positiveEffects:"",

    negativeEffects:"",

    challenges:"",



    career:"",

    finance:"",

    marriage:"",

    health:"",




    remedies:{


      mantra:"",

      gemstone:"",

      metal:"",

      donation:"",

      ritual:"",


    },




    description:"",




    media:{


      image:"",

      icon:"",

      video:"",


    },




    seo:{


      title:"",

      description:"",

      keywords:"",


    },



    status:"draft",



  });







  const updateNested = (

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







  const submit = async()=>{


    try{


      setLoading(true);





      const payload = {


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



        challenges:

        form.challenges

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


        }



      };








      const res = await fetch(

        "/api/admin/dasha-intelligence",

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






      const data = await res.json();





      if(data.success){


        alert(

          "Dasha intelligence created successfully"

        );


        router.push(

          "/admin/astro/dasha-intelligence"

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

🪐 Create Dasha Intelligence

</h1>






<div className="bg-[#1e293b] rounded-xl p-8 space-y-8">







<section>

<h2 className="text-xl font-semibold mb-4">

Basic Information

</h2>



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



</div>


</section>








<section>

<h2 className="text-xl font-semibold mb-4">

Names

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

Dasha Type

</h2>


<div className="grid md:grid-cols-2 gap-4">


<select

value={form.dashaType.type}

onChange={(e)=>

updateNested(

"dashaType",

"type",

e.target.value

)

}

className="bg-black p-3 rounded"

>


<option value="mahadasha">

Mahadasha

</option>


<option value="antardasha">

Antardasha

</option>


<option value="pratyantar">

Pratyantar

</option>


</select>



<Input

label="Parent Planet"

value={form.dashaType.parentPlanet}

onChange={(v)=>

updateNested(

"dashaType",

"parentPlanet",

v

)

}

/>



</div>


</section>








<section>

<h2 className="text-xl font-semibold mb-4">

Knowledge

</h2>



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




<textarea

placeholder="Description"

value={form.description}

onChange={(e)=>

setForm({

...form,

description:e.target.value

})

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

"Create Dasha"

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