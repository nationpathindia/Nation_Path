"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Create Career Intelligence
//////////////////////////////////////////////////////////////

import { useState } from "react";
import { useRouter } from "next/navigation";



export default function CreateCareerPage(){


  const router = useRouter();


  const [loading,setLoading] = useState(false);





  const [form,setForm] = useState<any>({



    title:"",

    slug:"",



    category:"career",



    careerType:"general",



    planets:"",



    zodiacSigns:"",



    houses:"",



    professions:"",



    industries:"",



    skills:"",



    strengths:"",



    challenges:"",



    careerGrowth:"",



    business:"",



    job:"",



    interpretation:"",



    remedies:"",





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












  const submit = async()=>{



    try{



      setLoading(true);






      const payload = {



        ...form,






        planets:

        form.planets

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),






        zodiacSigns:

        form.zodiacSigns

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),






        houses:

        form.houses

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),






        professions:

        form.professions

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),






        industries:

        form.industries

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),






        skills:

        form.skills

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),






        strengths:

        form.strengths

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


        "/api/admin/career-intelligence",


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


          "Career intelligence created successfully"


        );




        router.push(


          "/admin/astro/career-intelligence"


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


💼 Create Career Intelligence


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

label="Career Type"

value={form.careerType}

onChange={(v)=>

setForm({

...form,

careerType:v

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

value={form.planets}

onChange={(v)=>

setForm({

...form,

planets:v

})

}

/>






<Input

label="Zodiac Signs"

value={form.zodiacSigns}

onChange={(v)=>

setForm({

...form,

zodiacSigns:v

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





</section>









<section>



<h2 className="text-xl font-semibold mb-4">


Career Knowledge


</h2>






<Input

label="Professions"

value={form.professions}

onChange={(v)=>

setForm({

...form,

professions:v

})

}

/>






<Input

label="Industries"

value={form.industries}

onChange={(v)=>

setForm({

...form,

industries:v

})

}

/>






<Input

label="Skills"

value={form.skills}

onChange={(v)=>

setForm({

...form,

skills:v

})

}

/>






<Input

label="Strengths"

value={form.strengths}

onChange={(v)=>

setForm({

...form,

strengths:v

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





</section>









<section>



<h2 className="text-xl font-semibold mb-4">


Interpretation


</h2>






<textarea

placeholder="Career Growth"

value={form.careerGrowth}

onChange={(e)=>

setForm({

...form,

careerGrowth:e.target.value

})

}

className="w-full bg-black p-3 rounded"

/>







<textarea

placeholder="Business"

value={form.business}

onChange={(e)=>

setForm({

...form,

business:e.target.value

})

}

className="w-full bg-black p-3 rounded mt-4"

/>






<textarea

placeholder="Job"

value={form.job}

onChange={(e)=>

setForm({

...form,

job:e.target.value

})

}

className="w-full bg-black p-3 rounded mt-4"

/>


<textarea

placeholder="Interpretation"

value={form.interpretation}

onChange={(e)=>

setForm({

...form,

interpretation:e.target.value

})

}

className="w-full bg-black p-3 rounded mt-4"

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

"Create Career"


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