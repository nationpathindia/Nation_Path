"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Create Compatibility Intelligence
//////////////////////////////////////////////////////////////

import { useState } from "react";
import { useRouter } from "next/navigation";



export default function CreateCompatibilityPage(){


  const router = useRouter();


  const [loading,setLoading] = useState(false);





  const [form,setForm] = useState<any>({



    title:"",

    slug:"",



    category:"",



    compatibilityType:"",



    planets:"",



    zodiacSigns:"",



    nakshatra:"",



    gunaMilan:"",



    relationshipType:"",



    positiveFactors:"",



    negativeFactors:"",



    challenges:"",



    interpretation:"",



    marriage:"",



    relationship:"",



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





        nakshatra:

        form.nakshatra

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),





        positiveFactors:

        form.positiveFactors

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),





        negativeFactors:

        form.negativeFactors

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


        "/api/admin/compatibility-intelligence",


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



          "Compatibility intelligence created successfully"



        );




        router.push(


          "/admin/astro/compatibility-intelligence"


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


💞 Create Compatibility Intelligence


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

label="Nakshatra"

value={form.nakshatra}

onChange={(v)=>

setForm({

...form,

nakshatra:v

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

value={form.positiveFactors}

onChange={(v)=>

setForm({

...form,

positiveFactors:v

})

}

/>







<Input

label="Negative Factors"

value={form.negativeFactors}

onChange={(v)=>

setForm({

...form,

negativeFactors:v

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


disabled={loading}


onClick={submit}


className="bg-orange-600 px-8 py-3 rounded-xl font-semibold"


>



{

loading

?

"Saving..."

:

"Create Compatibility"

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