"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Create Yoga Intelligence
//////////////////////////////////////////////////////////////

import { useState } from "react";
import { useRouter } from "next/navigation";



export default function CreateYogaPage(){


  const router = useRouter();


  const [loading,setLoading] = useState(false);





  const [form,setForm] = useState<any>({


    name:"",

    slug:"",



    names:{


      en:"",

      hi:"",

      ne:"",


    },



    category:"raj_yoga",


    type:"",



    planets:"",


    houses:"",



    formation:"",



    positiveEffects:"",

    negativeEffects:"",

    challenges:"",




    career:"",

    finance:"",

    marriage:"",

    health:"",

    spirituality:"",





    remedies:{


      mantra:"",

      gemstone:"",

      donation:"",

      ritual:"",

      puja:"",

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









  const submit = async()=>{


    try{


      setLoading(true);





      const payload={


        ...form,



        planets:

        form.planets

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),




        houses:

        form.houses

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


        },



      };









      const res = await fetch(

        "/api/admin/yoga-intelligence",

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

          "Yoga created successfully"

        );



        router.push(

          "/admin/astro/yoga-intelligence"

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

🪐 Create Yoga Intelligence

</h1>







<div className="bg-[#1e293b] rounded-xl p-8 space-y-8">







<Section title="Basic Information">



<div className="grid md:grid-cols-2 gap-4">


<Input

label="Yoga Name"

value={form.name}

onChange={(v)=>

setForm({

...form,

name:v

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



</Section>









<Section title="Languages">



<div className="grid md:grid-cols-3 gap-4">



<Input

label="English"

value={form.names.en}

onChange={(v)=>

updateNested(

"names",

"en",

v

)

}

/>




<Input

label="Hindi"

value={form.names.hi}

onChange={(v)=>

updateNested(

"names",

"hi",

v

)

}

/>





<Input

label="Nepali"

value={form.names.ne}

onChange={(v)=>

updateNested(

"names",

"ne",

v

)

}

/>



</div>



</Section>









<Section title="Yoga Details">



<Input

label="Planets involved"

value={form.planets}

onChange={(v)=>

setForm({

...form,

planets:v

})

}

/>




<Input

label="Houses involved"

value={form.houses}

onChange={(v)=>

setForm({

...form,

houses:v

})

}

/>




<textarea

placeholder="Formation / Explanation"

value={form.formation}

onChange={(e)=>

setForm({

...form,

formation:e.target.value

})

}

className="w-full bg-black p-3 rounded"

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

label="Challenges"

value={form.challenges}

onChange={(v)=>

setForm({

...form,

challenges:v

})

}

/>



</Section>









<Section title="Life Areas">



<Input

label="Career"

value={form.career}

onChange={(v)=>

setForm({

...form,

career:v

})

}

/>





<Input

label="Finance"

value={form.finance}

onChange={(v)=>

setForm({

...form,

finance:v

})

}

/>





<Input

label="Marriage"

value={form.marriage}

onChange={(v)=>

setForm({

...form,

marriage:v

})

}

/>





<Input

label="Health"

value={form.health}

onChange={(v)=>

setForm({

...form,

health:v

})

}

/>





<Input

label="Spirituality"

value={form.spirituality}

onChange={(v)=>

setForm({

...form,

spirituality:v

})

}

/>



</Section>









<Section title="Remedies">



<Input

label="Mantra"

value={form.remedies.mantra}

onChange={(v)=>

updateNested(

"remedies",

"mantra",

v

)

}

/>



<Input

label="Gemstone"

value={form.remedies.gemstone}

onChange={(v)=>

updateNested(

"remedies",

"gemstone",

v

)

}

/>



<Input

label="Donation"

value={form.remedies.donation}

onChange={(v)=>

updateNested(

"remedies",

"donation",

v

)

}

/>



</Section>









<Section title="Description">



<textarea

value={form.description}

placeholder="Yoga description"

onChange={(e)=>

setForm({

...form,

description:e.target.value

})

}

className="w-full bg-black p-3 rounded"

/>



</Section>









<button

disabled={loading}

onClick={submit}

className="bg-orange-600 px-8 py-3 rounded-xl"

>

{

loading

?

"Saving..."

:

"Create Yoga"

}

</button>





</div>





</div>


  );


}









function Section({

title,

children

}:{

title:string;

children:React.ReactNode;

}){


return (

<section className="space-y-4">

<h2 className="text-xl font-semibold">

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