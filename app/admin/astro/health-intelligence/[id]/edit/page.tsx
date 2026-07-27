"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Edit Health Intelligence
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";



export default function EditHealthPage(){


  const params = useParams();

  const router = useRouter();


  const id = params.id as string;





  const [loading,setLoading] = useState(true);

  const [saving,setSaving] = useState(false);






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


    status:"draft",


  });









  useEffect(()=>{


    loadData();


  },[]);









  const loadData = async()=>{


    try{


      const res = await fetch(


        `/api/admin/health-intelligence/${id}`


      );


      const json = await res.json();





      if(json.success){


        const item = json.data;





        setForm({



          ...item,



          planets:

          item.planets?.join(", ") || "",




          zodiacSigns:

          item.zodiacSigns?.join(", ") || "",




          houses:

          item.houses?.join(", ") || "",




          bodyAreas:

          item.bodyAreas?.join(", ") || "",




          healthAssociations:

          item.healthAssociations?.join(", ") || "",




          wellnessGuidance:

          item.wellnessGuidance?.join(", ") || "",




          lifestyleSuggestions:

          item.lifestyleSuggestions?.join(", ") || "",




          strengths:

          item.strengths?.join(", ") || "",




          challenges:

          item.challenges?.join(", ") || "",




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









  const update = async()=>{



    try{



      setSaving(true);







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



      };









      const res = await fetch(


        `/api/admin/health-intelligence/${id}`,


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


          "Health intelligence updated successfully"


        );




        router.push(


          "/admin/astro/health-intelligence"


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












  if(loading){


    return (


      <div className="bg-[#0f172a] min-h-screen text-white p-8">


        Loading Health Intelligence...


      </div>


    );


  }












  return (



<div className="min-h-screen bg-[#0f172a] text-white p-8">







<h1 className="text-3xl font-bold mb-8">


🩺 Edit Health Intelligence


</h1>








<div className="bg-[#1e293b] rounded-xl p-8 space-y-8">








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

className="w-full bg-black p-3 rounded"

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

className="w-full bg-black p-3 rounded"

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

className="w-full bg-black p-3 rounded"

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

className="w-full bg-black p-3 rounded"

/>









<select


value={form.status}


onChange={(e)=>

setForm({

...form,

status:e.target.value

})

}


className="w-full bg-black p-3 rounded"


>


<option value="draft">


Draft


</option>



<option value="published">


Published


</option>



</select>









<button


disabled={saving}


onClick={update}


className="bg-orange-600 px-8 py-3 rounded-xl font-semibold"


>


{

saving

?

"Updating..."

:

"Update Health"


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