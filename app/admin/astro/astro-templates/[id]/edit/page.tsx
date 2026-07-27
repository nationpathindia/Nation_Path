"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";



export default function EditAstroTemplatePage(){


  const params = useParams();


  const router = useRouter();


  const id = params.id as string;





  const [loading,setLoading] = useState(true);


  const [saving,setSaving] = useState(false);







  const [form,setForm] = useState<any>({


    templateName:"",

    slug:"",

    category:"daily_rashifal",

    language:"hindi",


    structure:{


      headline:"",

      introduction:"",

      prediction:"",

      advice:"",

      remedies:"",


    },


    variables:{


      planet:false,

      zodiac:false,

      nakshatra:false,

      dasha:false,

      transit:false,


    },


    seo:{


      title:"",

      description:"",


    },


    status:"draft",


  });









  const loadTemplate = async()=>{


    try{


      const res = await fetch(

        `/api/admin/astro-templates/${id}`

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


      loadTemplate();


    }


  },[id]);












  const updateField = (

    key:string,

    value:any

  )=>{


    setForm({

      ...form,

      [key]:value,


    });


  };









  const updateNested = (

    parent:string,

    key:string,

    value:any

  )=>{


    setForm({

      ...form,


      [parent]:{


        ...form[parent],


        [key]:value,


      },


    });


  };













  const updateTemplate = async()=>{


    try{


      setSaving(true);





      const res = await fetch(

        `/api/admin/astro-templates/${id}`,

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

          `/admin/astro/astro-templates/${id}`

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

✏️ Edit Astro Template

</h1>




<p className="text-gray-400 mb-8">

Update AI prediction response template

</p>









<div className="bg-[#1e293b] rounded-xl p-8 space-y-8">







{/* BASIC */}



<div>


<h2 className="text-xl font-bold mb-4">

Basic Information

</h2>





<div className="grid md:grid-cols-2 gap-4">



<input

value={form.templateName}

onChange={(e)=>

updateField(

"templateName",

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


<option value="daily_rashifal">

Daily Rashifal

</option>


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








<select

value={form.language}

onChange={(e)=>

updateField(

"language",

e.target.value

)

}

className="bg-black p-3 rounded"

>


<option value="hindi">

Hindi

</option>


<option value="english">

English

</option>


<option value="nepali">

Nepali

</option>


<option value="gujarati">

Gujarati

</option>


</select>





</div>


</div>









{/* STRUCTURE */}



<div>


<h2 className="text-xl font-bold mb-4">

Template Structure

</h2>







{

[

"headline",

"introduction",

"prediction",

"advice",

"remedies"

].map((field)=>(



<textarea

key={field}

value={form.structure?.[field] || ""}

onChange={(e)=>

updateNested(

"structure",

field,

e.target.value

)

}

className="w-full bg-black p-3 rounded mb-3"

rows={3}

/>



))


}




</div>









{/* VARIABLES */}



<div>


<h2 className="text-xl font-bold mb-4">

AI Variables

</h2>







<div className="grid md:grid-cols-5 gap-4">





{

Object.keys(form.variables || {})

.map((item)=>(



<label

key={item}

className="bg-black p-3 rounded flex gap-2"

>



<input

type="checkbox"

checked={

form.variables[item]

}

onChange={(e)=>

updateNested(

"variables",

item,

e.target.checked

)

}


/>


{item}



</label>



))


}



</div>



</div>









{/* SEO */}



<div>


<h2 className="text-xl font-bold mb-4">

SEO

</h2>







<input

value={form.seo?.title || ""}

onChange={(e)=>

updateNested(

"seo",

"title",

e.target.value

)

}

className="w-full bg-black p-3 rounded mb-3"

/>








<textarea

value={form.seo?.description || ""}

onChange={(e)=>

updateNested(

"seo",

"description",

e.target.value

)

}

className="w-full bg-black p-3 rounded"

rows={3}

/>




</div>









{/* STATUS */}



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

onClick={updateTemplate}

disabled={saving}

className="bg-orange-600 px-8 py-3 rounded-xl"

>


{

saving

?

"Updating..."

:

"Update Template"

}



</button>







</div>







</div>


);


}