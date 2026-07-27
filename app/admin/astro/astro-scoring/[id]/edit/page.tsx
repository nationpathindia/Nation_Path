"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";



export default function EditAstroScorePage(){


  const params = useParams();


  const router = useRouter();


  const id = params.id as string;





  const [loading,setLoading] = useState(true);


  const [saving,setSaving] = useState(false);







  const [form,setForm] = useState<any>({


    name:"",

    slug:"",

    type:"planet",



    target:{


      planet:"",

      zodiac:"",

      house:"",

      nakshatra:"",


    },



    score:{


      positive:0,

      negative:0,

      neutral:0,


    },



    weight:1,


    priority:1,



    category:"career",



    conditions:{


      planet:"",

      aspect:"",

      house:"",

      sign:"",


    },



    description:"",



    seo:{


      title:"",

      description:"",


    },



    status:"draft",


  });









  const loadScore = async()=>{


    try{


      const res = await fetch(

        `/api/admin/astro-scoring/${id}`

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


      loadScore();


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









  const updateNested=(

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













  const updateScore = async()=>{


    try{


      setSaving(true);





      const res = await fetch(

        `/api/admin/astro-scoring/${id}`,

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

          `/admin/astro/astro-scoring/${id}`

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

✏️ Edit Astro Score Rule

</h1>




<p className="text-gray-400 mb-8">

Update prediction intelligence scoring

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








<select

value={form.type}

onChange={(e)=>

updateField(

"type",

e.target.value

)

}

className="bg-black p-3 rounded"

>


<option value="planet">

Planet

</option>


<option value="zodiac">

Zodiac

</option>


<option value="house">

House

</option>


<option value="nakshatra">

Nakshatra

</option>


<option value="dasha">

Dasha

</option>


<option value="transit">

Transit

</option>


</select>








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


</div>









{/* TARGET */}



<div>


<h2 className="text-xl font-bold mb-4">

Target Reference

</h2>






<div className="grid md:grid-cols-2 gap-4">



<input

value={form.target?.planet || ""}

onChange={(e)=>

updateNested(

"target",

"planet",

e.target.value

)

}

placeholder="Planet"

className="bg-black p-3 rounded"

/>






<input

value={form.target?.zodiac || ""}

onChange={(e)=>

updateNested(

"target",

"zodiac",

e.target.value

)

}

placeholder="Zodiac"

className="bg-black p-3 rounded"

/>







<input

value={form.target?.house || ""}

onChange={(e)=>

updateNested(

"target",

"house",

e.target.value

)

}

placeholder="House"

className="bg-black p-3 rounded"

/>







<input

value={form.target?.nakshatra || ""}

onChange={(e)=>

updateNested(

"target",

"nakshatra",

e.target.value

)

}

placeholder="Nakshatra"

className="bg-black p-3 rounded"

/>



</div>


</div>









{/* SCORE */}



<div>


<h2 className="text-xl font-bold mb-4">

Score Impact

</h2>





<div className="grid md:grid-cols-3 gap-4">





<input

type="number"

value={form.score?.positive || 0}

onChange={(e)=>

updateNested(

"score",

"positive",

Number(e.target.value)

)

}

className="bg-black p-3 rounded"

/>








<input

type="number"

value={form.score?.negative || 0}

onChange={(e)=>

updateNested(

"score",

"negative",

Number(e.target.value)

)

}

className="bg-black p-3 rounded"

/>








<input

type="number"

value={form.score?.neutral || 0}

onChange={(e)=>

updateNested(

"score",

"neutral",

Number(e.target.value)

)

}

className="bg-black p-3 rounded"

/>





</div>


</div>









{/* PRIORITY */}



<div>


<h2 className="text-xl font-bold mb-4">

Weight & Priority

</h2>






<div className="grid md:grid-cols-2 gap-4">



<input

type="number"

value={form.weight}

onChange={(e)=>

updateField(

"weight",

Number(e.target.value)

)

}

className="bg-black p-3 rounded"

/>







<input

type="number"

value={form.priority}

onChange={(e)=>

updateField(

"priority",

Number(e.target.value)

)

}

className="bg-black p-3 rounded"

/>




</div>


</div>









<textarea

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

updateNested(

"seo",

"title",

e.target.value

)

}

className="w-full bg-black p-3 rounded"

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

onClick={updateScore}

disabled={saving}

className="bg-orange-600 px-8 py-3 rounded-xl"

>


{

saving

?

"Updating..."

:

"Update Score Rule"

}



</button>







</div>







</div>


);


}