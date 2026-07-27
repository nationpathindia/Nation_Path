"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Edit Lagna Intelligence
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";



export default function EditLagnaPage(){


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

        `/api/admin/lagna-intelligence/${id}`

      );



      const json = await res.json();





      if(json.success){


        setForm(json.data);


      }



    }

    catch(error){


      console.error(error);


    }


    finally{


      setLoading(false);


    }


  };









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


      setSaving(true);






      const res = await fetch(

        `/api/admin/lagna-intelligence/${id}`,

        {


          method:"PUT",


          headers:{


            "Content-Type":

            "application/json",


          },


          body:

          JSON.stringify(form),


        }


      );








      const json = await res.json();







      if(json.success){



        alert(

          "Lagna updated successfully"

        );




        router.push(

          `/admin/astro/lagna-intelligence/${id}`

        );



      }





    }

    catch(error){



      console.error(error);



      alert(

        "Update failed"

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











  if(!form){


    return null;


  }













  return (



<div className="min-h-screen bg-[#0f172a] text-white p-8">







<h1 className="text-3xl font-bold mb-8">


🌅 Edit Lagna Intelligence


</h1>









<div className="bg-[#1e293b] rounded-xl p-8 space-y-8">








<section>



<h2 className="text-xl font-semibold mb-4">


Basic Information


</h2>






<div className="grid md:grid-cols-2 gap-4">





<Input

label="Lagna"

value={form.lagna}

onChange={(v)=>

setForm({

...form,

lagna:v

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





<Input

label="English"

value={form.names?.en}

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

value={form.names?.hi}

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

value={form.names?.ne}

onChange={(v)=>

updateNested(

"names",

"ne",

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







<textarea


placeholder="Career"


value={form.career}


onChange={(e)=>

setForm({

...form,

career:e.target.value

})

}


className="w-full bg-black p-3 rounded mt-4"


/>








<textarea


placeholder="Finance"


value={form.finance}


onChange={(e)=>

setForm({

...form,

finance:e.target.value

})

}


className="w-full bg-black p-3 rounded mt-4"


/>









<textarea


placeholder="Marriage"


value={form.marriage}


onChange={(e)=>

setForm({

...form,

marriage:e.target.value

})

}


className="w-full bg-black p-3 rounded mt-4"


/>









<textarea


placeholder="Health"


value={form.health}


onChange={(e)=>

setForm({

...form,

health:e.target.value

})

}


className="w-full bg-black p-3 rounded mt-4"


/>









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


"Update Lagna"


}



</button>






</section>







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