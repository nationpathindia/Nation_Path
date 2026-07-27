"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Edit Education Intelligence
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";



export default function EditEducationPage(){


  const params = useParams();

  const router = useRouter();


  const id = params.id as string;






  const [loading,setLoading] = useState(true);

  const [saving,setSaving] = useState(false);







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



    status:"draft",



  });









  useEffect(()=>{


    loadData();


  },[]);









  const loadData = async()=>{


    try{


      const res = await fetch(


        `/api/admin/education-intelligence/${id}`


      );


      const json = await res.json();







      if(json.success){


        const item = json.data;






        setForm({



          ...item,




          planets:item.planets?.join(", ") || "",



          zodiacSigns:item.zodiacSigns?.join(", ") || "",



          houses:item.houses?.join(", ") || "",



          learningAreas:item.learningAreas?.join(", ") || "",



          studyPatterns:item.studyPatterns?.join(", ") || "",



          educationStrengths:item.educationStrengths?.join(", ") || "",



          academicChallenges:item.academicChallenges?.join(", ") || "",



          skills:item.skills?.join(", ") || "",



          subjects:item.subjects?.join(", ") || "",



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



      };








      const res = await fetch(


        `/api/admin/education-intelligence/${id}`,


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


          "Education intelligence updated successfully"


        );






        router.push(


          "/admin/astro/education-intelligence"


        );



      }

      else{


        alert(json.message || "Failed");


      }







    }

    catch(error){


      console.error(error);


      alert("Server error");


    }

    finally{


      setSaving(false);


    }


  };












  if(loading){


    return (


      <div className="min-h-screen bg-[#0f172a] text-white p-8">


        Loading Education Intelligence...


      </div>


    );


  }









  return (



<div className="min-h-screen bg-[#0f172a] text-white p-8">







<h1 className="text-3xl font-bold mb-8">


📚 Edit Education Intelligence


</h1>








<div className="bg-[#1e293b] rounded-xl p-8 space-y-8">









<section>


<h2 className="text-xl font-semibold mb-4">


Basic Information


</h2>





<Input label="Title" value={form.title}

onChange={(v)=>setForm({...form,title:v})}

/>





<Input label="Slug" value={form.slug}

onChange={(v)=>setForm({...form,slug:v})}

/>





<Input label="Education Type" value={form.educationType}

onChange={(v)=>setForm({...form,educationType:v})}

/>






</section>









<section>


<h2 className="text-xl font-semibold mb-4">


Astrology Factors


</h2>





<Input label="Planets" value={form.planets}

onChange={(v)=>setForm({...form,planets:v})}

/>





<Input label="Zodiac Signs" value={form.zodiacSigns}

onChange={(v)=>setForm({...form,zodiacSigns:v})}

/>





<Input label="Houses" value={form.houses}

onChange={(v)=>setForm({...form,houses:v})}

/>






</section>









<section>


<h2 className="text-xl font-semibold mb-4">


Education Knowledge


</h2>





<Input label="Learning Areas" value={form.learningAreas}

onChange={(v)=>setForm({...form,learningAreas:v})}

/>





<Input label="Study Patterns" value={form.studyPatterns}

onChange={(v)=>setForm({...form,studyPatterns:v})}

/>





<Input label="Education Strengths" value={form.educationStrengths}

onChange={(v)=>setForm({...form,educationStrengths:v})}

/>





<Input label="Academic Challenges" value={form.academicChallenges}

onChange={(v)=>setForm({...form,academicChallenges:v})}

/>





<Input label="Skills" value={form.skills}

onChange={(v)=>setForm({...form,skills:v})}

/>





<Input label="Subjects" value={form.subjects}

onChange={(v)=>setForm({...form,subjects:v})}

/>






</section>









<section>


<h2 className="text-xl font-semibold mb-4">


Interpretation


</h2>








<TextArea label="Learning Ability" value={form.learningAbility}

onChange={(v)=>setForm({...form,learningAbility:v})}

/>








<TextArea label="Higher Education" value={form.higherEducation}

onChange={(v)=>setForm({...form,higherEducation:v})}

/>








<TextArea label="Career Education" value={form.careerEducation}

onChange={(v)=>setForm({...form,careerEducation:v})}

/>








<TextArea label="Planetary Influence" value={form.planetaryInfluence}

onChange={(v)=>setForm({...form,planetaryInfluence:v})}

/>








<TextArea label="Zodiac Influence" value={form.zodiacInfluence}

onChange={(v)=>setForm({...form,zodiacInfluence:v})}

/>








<TextArea label="House Influence" value={form.houseInfluence}

onChange={(v)=>setForm({...form,houseInfluence:v})}

/>








<TextArea label="Interpretation" value={form.interpretation}

onChange={(v)=>setForm({...form,interpretation:v})}

/>








<TextArea label="Guidance" value={form.guidance}

onChange={(v)=>setForm({...form,guidance:v})}

/>








<TextArea label="Remedies" value={form.remedies}

onChange={(v)=>setForm({...form,remedies:v})}

/>






</section>









<section>


<h2 className="text-xl font-semibold mb-4">


Status


</h2>





<select


value={form.status}


onChange={(e)=>setForm({...form,status:e.target.value})}


className="w-full bg-black p-3 rounded-lg"


>


<option value="draft">


Draft


</option>


<option value="published">


Published


</option>


</select>





</section>









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

"Update Education"


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


<div className="mb-4">


<label className="text-sm text-gray-400">


{label}


</label>



<input


value={value || ""}


onChange={(e)=>onChange(e.target.value)}


className="w-full bg-black p-3 rounded-lg mt-1"


/>



</div>


);


}








function TextArea({

label,

value,

onChange


}:{

label:string;

value:any;

onChange:(v:string)=>void;


}){


return (


<div className="mb-4">


<label className="text-sm text-gray-400">


{label}


</label>



<textarea


value={value || ""}


onChange={(e)=>onChange(e.target.value)}


className="w-full bg-black p-3 rounded-lg mt-1 h-32"


/>



</div>


);


}