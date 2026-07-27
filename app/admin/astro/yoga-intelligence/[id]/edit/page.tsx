"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Yoga Intelligence Edit Page
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";



export default function EditYogaPage(){


  const params = useParams();

  const router = useRouter();


  const id = params.id as string;





  const [loading,setLoading] = useState(true);

  const [saving,setSaving] = useState(false);




  const [form,setForm] = useState<any>(null);








  useEffect(()=>{


    loadData();


  },[]);







  const loadData = async()=>{


    try{


      const res = await fetch(

        `/api/admin/yoga-intelligence/${id}`

      );


      const json = await res.json();





      if(json.success){


        const item = json.data;



        setForm({


          ...item,


          planets:

          item.planets?.join(", ") || "",



          houses:

          item.houses?.join(", ") || "",



          positiveEffects:

          item.positiveEffects?.join(", ") || "",



          negativeEffects:

          item.negativeEffects?.join(", ") || "",



          challenges:

          item.challenges?.join(", ") || "",



          seo:{


            ...item.seo,


            keywords:

            item.seo?.keywords?.join(", ") || "",


          },


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








  const submit = async()=>{


    try{


      setSaving(true);






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

        `/api/admin/yoga-intelligence/${id}`,

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







      const json = await res.json();






      if(json.success){


        alert(

          "Yoga updated successfully"

        );



        router.push(

          `/admin/astro/yoga-intelligence/${id}`

        );



      }


      else{


        alert(

          json.message || "Failed"

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









  if(loading || !form){


    return (

<div className="min-h-screen bg-[#0f172a] text-white p-8">

Loading...

</div>

    );


  }









  return (

<div className="min-h-screen bg-[#0f172a] text-white p-8">





<h1 className="text-3xl font-bold mb-8">

✏️ Edit Yoga Intelligence

</h1>







<div className="bg-[#1e293b] rounded-xl p-8 space-y-8">









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









<Input

label="Planets"

value={form.planets}

onChange={(v)=>

setForm({

...form,

planets:v

})

}

/>








<Input

label="Houses"

value={form.houses}

onChange={(v)=>

setForm({

...form,

houses:v

})

}

/>









<textarea

value={form.formation}

onChange={(e)=>

setForm({

...form,

formation:e.target.value

})

}

className="w-full bg-black p-3 rounded"

placeholder="Formation"

/>









<textarea

value={form.description}

onChange={(e)=>

setForm({

...form,

description:e.target.value

})

}

className="w-full bg-black p-3 rounded"

placeholder="Description"

/>










<button

disabled={saving}

onClick={submit}

className="bg-orange-600 px-8 py-3 rounded-xl"

>

{

saving

?

"Saving..."

:

"Update Yoga"

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