"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Create Education Intelligence
//////////////////////////////////////////////////////////////

import { useState } from "react";
import { useRouter } from "next/navigation";



export default function CreateEducationPage(){


  const router = useRouter();


  const [loading,setLoading] = useState(false);





  const [form,setForm] = useState<any>({



    title:"",

    slug:"",



    category:"education",



    educationType:"general",



    planets:"",



    zodiacSigns:"",



    houses:"",



    learningAreas:"",



    studyPatterns:"",



    educationStrengths:"",



    academicChallenges:"",



    skills:"",



    subjects:"",



    learningAbility:"",



    higherEducation:"",



    careerEducation:"",



    planetaryInfluence:"",



    zodiacInfluence:"",



    houseInfluence:"",



    interpretation:"",



    guidance:"",



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







        learningAreas:

        form.learningAreas

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







        studyPatterns:

        form.studyPatterns

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







        educationStrengths:

        form.educationStrengths

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







        academicChallenges:

        form.academicChallenges

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







        skills:

        form.skills

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







        subjects:

        form.subjects

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


        "/api/admin/education-intelligence",


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


          "Education intelligence created successfully"


        );







        router.push(


          "/admin/astro/education-intelligence"


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


📚 Create Education Intelligence


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

label="Education Type"

value={form.educationType}

onChange={(v)=>

setForm({

...form,

educationType:v

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


Education Knowledge


</h2>







<Input

label="Learning Areas"

value={form.learningAreas}

onChange={(v)=>

setForm({

...form,

learningAreas:v

})

}

/>







<Input

label="Study Patterns"

value={form.studyPatterns}

onChange={(v)=>

setForm({

...form,

studyPatterns:v

})

}

/>







<Input

label="Education Strengths"

value={form.educationStrengths}

onChange={(v)=>

setForm({

...form,

educationStrengths:v

})

}

/>







<Input

label="Academic Challenges"

value={form.academicChallenges}

onChange={(v)=>

setForm({

...form,

academicChallenges:v

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

label="Subjects"

value={form.subjects}

onChange={(v)=>

setForm({

...form,

subjects:v

})

}

/>





</section>









<section>



<h2 className="text-xl font-semibold mb-4">


Interpretation


</h2>







<textarea

placeholder="Learning Ability"

value={form.learningAbility}

onChange={(e)=>

setForm({

...form,

learningAbility:e.target.value

})

}

className="w-full bg-black p-3 rounded"

/>








<textarea

placeholder="Higher Education"

value={form.higherEducation}

onChange={(e)=>

setForm({

...form,

higherEducation:e.target.value

})

}

className="w-full bg-black p-3 rounded mt-4"

/>








<textarea

placeholder="Career Education"

value={form.careerEducation}

onChange={(e)=>

setForm({

...form,

careerEducation:e.target.value

})

}

className="w-full bg-black p-3 rounded mt-4"

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

className="w-full bg-black p-3 rounded mt-4"

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

placeholder="Guidance"

value={form.guidance}

onChange={(e)=>

setForm({

...form,

guidance:e.target.value

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

"Create Education"


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