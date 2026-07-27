"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";



export default function CreateTransitIntelligencePage(){


  const router = useRouter();


  const [loading,setLoading] = useState(false);







  const [form,setForm] = useState<any>({


    name:"",

    slug:"",


    planet:"",


    fromSign:"",


    toSign:"",


    transitType:"planetary",


    duration:"",





    effects:{


      positive:[],


      negative:[],


      neutral:[],


    },





    houseImpact:{},




    category:"career",





    remedies:[],





    advice:"",





    description:"",





    seo:{


      title:"",


      description:"",


    },





    status:"draft",



  });













  const updateField=(

    key:string,

    value:any

  )=>{


    setForm({


      ...form,


      [key]:value,


    });


  };









  const submit = async()=>{


    try{


      setLoading(true);





      const res = await fetch(

        "/api/admin/transit-intelligence",

        {


          method:"POST",


          headers:{


            "Content-Type":

            "application/json",


          },


          body:JSON.stringify(form),



        }

      );





      const data = await res.json();





      if(data.success){


        router.push(

          "/admin/astro/transit-intelligence"

        );


      }

      else{


        alert(data.message);


      }



    }

    catch(error){


      console.error(error);


    }

    finally{


      setLoading(false);


    }


  };









return (

<div className="min-h-screen bg-[#0f172a] text-white p-8">







<h1 className="text-3xl font-bold mb-2">

🪐 Create Transit Rule

</h1>




<p className="text-gray-400 mb-8">

Planetary movement intelligence management

</p>









<div className="bg-[#1e293b] rounded-xl p-8 space-y-8">







{/* BASIC */}



<div>


<h2 className="text-xl font-bold mb-4">

Basic Information

</h2>





<div className="grid md:grid-cols-2 gap-4">



<input

placeholder="Transit Name"

value={form.name}

onChange={(e)=>

updateField(

"name",

e.target.value

)

}

className="bg-black p-3 rounded"

/>







<input

placeholder="Slug"

value={form.slug}

onChange={(e)=>

updateField(

"slug",

e.target.value

)

}

className="bg-black p-3 rounded"

/>







<input

placeholder="Planet"

value={form.planet}

onChange={(e)=>

updateField(

"planet",

e.target.value

)

}

className="bg-black p-3 rounded"

/>







<input

placeholder="From Sign"

value={form.fromSign}

onChange={(e)=>

updateField(

"fromSign",

e.target.value

)

}

className="bg-black p-3 rounded"

/>







<input

placeholder="To Sign"

value={form.toSign}

onChange={(e)=>

updateField(

"toSign",

e.target.value

)

}

className="bg-black p-3 rounded"

/>









<select

value={form.transitType}

onChange={(e)=>

updateField(

"transitType",

e.target.value

)

}

className="bg-black p-3 rounded"

>


<option value="planetary">

Planetary

</option>


<option value="retrograde">

Retrograde

</option>


<option value="combust">

Combust

</option>


<option value="stationary">

Stationary

</option>


<option value="direct">

Direct

</option>


</select>








<input

placeholder="Duration"

value={form.duration}

onChange={(e)=>

updateField(

"duration",

e.target.value

)

}

className="bg-black p-3 rounded"

/>



</div>


</div>









{/* CATEGORY */}



<div>


<h2 className="text-xl font-bold mb-4">

Prediction Category

</h2>





<select

value={form.category}

onChange={(e)=>

updateField(

"category",

e.target.value

)

}

className="bg-black p-3 rounded"

>


<option value="love">

Love

</option>


<option value="career">

Career

</option>


<option value="finance">

Finance

</option>


<option value="health">

Health

</option>


<option value="marriage">

Marriage

</option>


<option value="education">

Education

</option>


<option value="travel">

Travel

</option>


</select>


</div>









{/* CONTENT */}



<textarea

placeholder="Advice"

value={form.advice}

onChange={(e)=>

updateField(

"advice",

e.target.value

)

}

className="w-full bg-black p-3 rounded"

rows={3}

/>








<textarea

placeholder="Description"

value={form.description}

onChange={(e)=>

updateField(

"description",

e.target.value

)

}

className="w-full bg-black p-3 rounded"

rows={5}

/>









{/* SEO */}



<input

placeholder="SEO Title"

value={form.seo.title}

onChange={(e)=>

setForm({

...form,


seo:{


...form.seo,


title:e.target.value


}


})

}

className="w-full bg-black p-3 rounded"

/>









<textarea

placeholder="SEO Description"

value={form.seo.description}

onChange={(e)=>

setForm({

...form,


seo:{


...form.seo,


description:e.target.value


}


})

}

className="w-full bg-black p-3 rounded"

rows={3}

/>









<select

value={form.status}

onChange={(e)=>

updateField(

"status",

e.target.value

)

}

className="bg-black p-3 rounded"

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

className="bg-orange-600 px-8 py-3 rounded-xl"

>


{

loading

?

"Saving..."

:

"Create Transit Rule"

}



</button>








</div>







</div>


);


}