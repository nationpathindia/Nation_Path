"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Create Health Intelligence
//////////////////////////////////////////////////////////////

import { useState } from "react";
import { useRouter } from "next/navigation";



export default function CreateHealthPage(){


  const router = useRouter();


  const [loading,setLoading] = useState(false);





  const [form,setForm] = useState<any>({



    title:"",

    slug:"",



    category:"health",



    healthType:"general",



    planets:"",



    zodiacSigns:"",



    houses:"",



    bodyAreas:"",



    healthAssociations:"",



    wellnessGuidance:"",



    lifestyleSuggestions:"",



    strengths:"",



    challenges:"",



    planetaryInfluence:"",



    zodiacInfluence:"",



    houseInfluence:"",



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







        bodyAreas:

        form.bodyAreas

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







        healthAssociations:

        form.healthAssociations

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







        wellnessGuidance:

        form.wellnessGuidance

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







        lifestyleSuggestions:

        form.lifestyleSuggestions

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


        "/api/admin/health-intelligence",


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


          "Health intelligence created successfully"


        );







        router.push(


          "/admin/astro/health-intelligence"


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


🩺 Create Health Intelligence


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

label="Health Type"

value={form.healthType}

onChange={(v)=>

setForm({

...form,

healthType:v

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


Health Knowledge


</h2>







<Input

label="Body Areas"

value={form.bodyAreas}

onChange={(v)=>

setForm({

...form,

bodyAreas:v

})

}

/>







<Input

label="Health Associations"

value={form.healthAssociations}

onChange={(v)=>

setForm({

...form,

healthAssociations:v

})

}

/>







<Input

label="Wellness Guidance"

value={form.wellnessGuidance}

onChange={(v)=>

setForm({

...form,

wellnessGuidance:v

})

}

/>







<Input

label="Lifestyle Suggestions"

value={form.lifestyleSuggestions}

onChange={(v)=>

setForm({

...form,

lifestyleSuggestions:v

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

placeholder="Planetary Influence"

value={form.planetaryInfluence}

onChange={(e)=>

setForm({

...form,

planetaryInfluence:e.target.value

})

}

className="w-full bg-black p-3 rounded"

/>








<textarea

placeholder="Zodiac Influence"

value={form.zodiacInfluence}

onChange={(e)=>

setForm({

...form,

zodiacInfluence:e.target.value

})

}

className="w-full bg-black p-3 rounded mt-4"

/>








<textarea

placeholder="House Influence"

value={form.houseInfluence}

onChange={(e)=>

setForm({

...form,

houseInfluence:e.target.value

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

"Create Health"

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