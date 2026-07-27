"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";



export default function CreateAstroScorePage(){


  const router = useRouter();


  const [loading,setLoading] = useState(false);







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









  const submit = async()=>{


    try{


      setLoading(true);





      const res = await fetch(

        "/api/admin/astro-scoring",

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

          "/admin/astro/astro-scoring"

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

⚖️ Create Astro Score Rule

</h1>



<p className="text-gray-400 mb-8">

Prediction intelligence scoring configuration

</p>









<div className="bg-[#1e293b] rounded-xl p-8 space-y-8">







{/* BASIC */}



<div>


<h2 className="text-xl font-bold mb-4">

Basic Information

</h2>




<div className="grid md:grid-cols-2 gap-4">



<input

placeholder="Rule Name"

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

placeholder="Planet"

value={form.target.planet}

onChange={(e)=>

updateNested(

"target",

"planet",

e.target.value

)

}

className="bg-black p-3 rounded"

/>






<input

placeholder="Zodiac"

value={form.target.zodiac}

onChange={(e)=>

updateNested(

"target",

"zodiac",

e.target.value

)

}

className="bg-black p-3 rounded"

/>







<input

placeholder="House"

value={form.target.house}

onChange={(e)=>

updateNested(

"target",

"house",

e.target.value

)

}

className="bg-black p-3 rounded"

/>







<input

placeholder="Nakshatra"

value={form.target.nakshatra}

onChange={(e)=>

updateNested(

"target",

"nakshatra",

e.target.value

)

}

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

placeholder="Positive"

value={form.score.positive}

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

placeholder="Negative"

value={form.score.negative}

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

placeholder="Neutral"

value={form.score.neutral}

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









{/* DESCRIPTION */}



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

updateNested(

"seo",

"title",

e.target.value

)

}

className="w-full bg-black p-3 rounded"

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

"Create Score Rule"

}



</button>









</div>





</div>


);


}