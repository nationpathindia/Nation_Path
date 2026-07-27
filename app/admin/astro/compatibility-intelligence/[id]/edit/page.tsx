"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Edit Compatibility Intelligence
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";



export default function EditCompatibilityPage(){


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


        `/api/admin/compatibility-intelligence/${id}`


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


        `/api/admin/compatibility-intelligence/${id}`,


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


          "Compatibility intelligence updated successfully"


        );



        router.push(


          `/admin/astro/compatibility-intelligence/${id}`


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


💞 Edit Compatibility Intelligence


</h1>









<div className="bg-[#1e293b] rounded-xl p-8 space-y-8">







<section>



<h2 className="text-xl font-semibold mb-4">


Basic Information


</h2>





<div className="grid md:grid-cols-2 gap-4">





<Input

label="Title"

value={form.title}

onChange={(v)=>

setForm({

...form,

title:v

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






<Input

label="Compatibility Type"

value={form.compatibilityType}

onChange={(v)=>

setForm({

...form,

compatibilityType:v

})

}

/>





</div>



</section>









<section>



<h2 className="text-xl font-semibold mb-4">


Astrology Factors


</h2>






<Input

label="Planets"

value={

form.planets?.join(", ")

}

onChange={(v)=>

setForm({

...form,

planets:v.split(",").map((x:string)=>x.trim()).filter(Boolean)

})

}

/>







<Input

label="Zodiac Signs"

value={

form.zodiacSigns?.join(", ")

}

onChange={(v)=>

setForm({

...form,

zodiacSigns:v.split(",").map((x:string)=>x.trim()).filter(Boolean)

})

}

/>







<Input

label="Nakshatra"

value={

form.nakshatra?.join(", ")

}

onChange={(v)=>

setForm({

...form,

nakshatra:v.split(",").map((x:string)=>x.trim()).filter(Boolean)

})

}

/>





</section>









<section>



<h2 className="text-xl font-semibold mb-4">


Compatibility Knowledge


</h2>







<Input

label="Guna Milan"

value={form.gunaMilan}

onChange={(v)=>

setForm({

...form,

gunaMilan:v

})

}

/>







<Input

label="Relationship Type"

value={form.relationshipType}

onChange={(v)=>

setForm({

...form,

relationshipType:v

})

}

/>







<Input

label="Positive Factors"

value={form.positiveFactors?.join(", ")}

onChange={(v)=>

setForm({

...form,

positiveFactors:v.split(",").map((x:string)=>x.trim()).filter(Boolean)

})

}

/>







<Input

label="Negative Factors"

value={form.negativeFactors?.join(", ")}

onChange={(v)=>

setForm({

...form,

negativeFactors:v.split(",").map((x:string)=>x.trim()).filter(Boolean)

})

}

/>







<Input

label="Challenges"

value={form.challenges?.join(", ")}

onChange={(v)=>

setForm({

...form,

challenges:v.split(",").map((x:string)=>x.trim()).filter(Boolean)

})

}

/>





</section>









<section>



<h2 className="text-xl font-semibold mb-4">


Interpretation


</h2>







<textarea

placeholder="Interpretation"

value={form.interpretation}

onChange={(e)=>

setForm({

...form,

interpretation:e.target.value

})

}

className="w-full bg-black p-3 rounded"

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

placeholder="Relationship"

value={form.relationship}

onChange={(e)=>

setForm({

...form,

relationship:e.target.value

})

}

className="w-full bg-black p-3 rounded mt-4"

/>







<textarea

placeholder="Remedies"

value={form.remedies}

onChange={(e)=>

setForm({

...form,

remedies:e.target.value

})

}

className="w-full bg-black p-3 rounded mt-4"

/>





</section>









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

"Update Compatibility"


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