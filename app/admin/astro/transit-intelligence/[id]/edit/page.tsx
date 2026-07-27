"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";



export default function EditTransitIntelligencePage(){


  const params = useParams();


  const router = useRouter();


  const id = params.id as string;





  const [loading,setLoading] = useState(true);


  const [saving,setSaving] = useState(false);







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













  const loadTransit = async()=>{


    try{


      const res = await fetch(

        `/api/admin/transit-intelligence/${id}`

      );


      const data = await res.json();





      if(data.success){


        setForm(data.data);


      }


    }

    catch(error){


      console.error(error);


    }

    finally{


      setLoading(false);


    }


  };









  useEffect(()=>{


    if(id){


      loadTransit();


    }


  },[id]);













  const updateField=(

    key:string,

    value:any

  )=>{


    setForm({


      ...form,


      [key]:value,


    });


  };









  const updateSEO=(

    key:string,

    value:string

  )=>{


    setForm({


      ...form,


      seo:{


        ...form.seo,


        [key]:value,


      }


    });


  };












  const updateTransit = async()=>{


    try{


      setSaving(true);





      const res = await fetch(

        `/api/admin/transit-intelligence/${id}`,

        {


          method:"PUT",


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

          `/admin/astro/transit-intelligence/${id}`

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







<h1 className="text-3xl font-bold mb-2">

✏️ Edit Transit Rule

</h1>




<p className="text-gray-400 mb-8">

Update planetary transit intelligence

</p>









<div className="bg-[#1e293b] rounded-xl p-8 space-y-8">







{/* BASIC */}



<div>


<h2 className="text-xl font-bold mb-4">

Basic Information

</h2>





<div className="grid md:grid-cols-2 gap-4">



<input

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

value={form.fromSign || ""}

onChange={(e)=>

updateField(

"fromSign",

e.target.value

)

}

className="bg-black p-3 rounded"

/>







<input

value={form.toSign || ""}

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

value={form.duration || ""}

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









{/* EFFECTS */}



<div>


<h2 className="text-xl font-bold mb-4">

Effects

</h2>





<textarea

placeholder="Positive effects comma separated"

value={

form.effects?.positive?.join(", ")

}


onChange={(e)=>

setForm({

...form,


effects:{


...form.effects,


positive:e.target.value

.split(",")

.map((x:string)=>x.trim())

.filter(Boolean)


}


})

}

className="w-full bg-black p-3 rounded"

rows={3}

/>








<textarea

placeholder="Negative effects comma separated"

value={

form.effects?.negative?.join(", ")

}


onChange={(e)=>

setForm({

...form,


effects:{


...form.effects,


negative:e.target.value

.split(",")

.map((x:string)=>x.trim())

.filter(Boolean)


}


})

}

className="w-full bg-black p-3 rounded"

rows={3}

/>



</div>









{/* CATEGORY */}



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









<textarea

placeholder="Advice"

value={form.advice || ""}

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

value={form.description || ""}

onChange={(e)=>

updateField(

"description",

e.target.value

)

}

className="w-full bg-black p-3 rounded"

rows={5}

/>









<input

value={form.seo?.title || ""}

onChange={(e)=>

updateSEO(

"title",

e.target.value

)

}

className="w-full bg-black p-3 rounded"

/>









<textarea

value={form.seo?.description || ""}

onChange={(e)=>

updateSEO(

"description",

e.target.value

)

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

onClick={updateTransit}

disabled={saving}

className="bg-orange-600 px-8 py-3 rounded-xl"

>


{

saving

?

"Updating..."

:

"Update Transit Rule"

}



</button>








</div>







</div>


);


}