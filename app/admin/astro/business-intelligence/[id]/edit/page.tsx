"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Edit Business Intelligence
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";



export default function EditBusinessPage(){


  const params = useParams();

  const router = useRouter();


  const id = params.id as string;





  const [loading,setLoading] = useState(true);

  const [saving,setSaving] = useState(false);







  const [form,setForm] = useState<any>({



    title:"",

    slug:"",

    category:"business",

    businessType:"general",



    planets:"",

    zodiacSigns:"",

    houses:"",



    industries:"",

    entrepreneurship:"",

    leadershipQualities:"",

    professionalStrengths:"",

    wealthCreation:"",

    businessSkills:"",

    challenges:"",

    opportunities:"",



    startup:"",

    businessGrowth:"",

    career:"",

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


        `/api/admin/business-intelligence/${id}`


      );


      const json = await res.json();






      if(json.success){


        const item = json.data;






        setForm({



          ...item,





          planets:item.planets?.join(", ") || "",



          zodiacSigns:item.zodiacSigns?.join(", ") || "",



          houses:item.houses?.join(", ") || "",



          industries:item.industries?.join(", ") || "",



          entrepreneurship:item.entrepreneurship?.join(", ") || "",



          leadershipQualities:item.leadershipQualities?.join(", ") || "",



          professionalStrengths:item.professionalStrengths?.join(", ") || "",



          wealthCreation:item.wealthCreation?.join(", ") || "",



          businessSkills:item.businessSkills?.join(", ") || "",



          challenges:item.challenges?.join(", ") || "",



          opportunities:item.opportunities?.join(", ") || "",



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







        industries:


        form.industries

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







        entrepreneurship:


        form.entrepreneurship

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







        leadershipQualities:


        form.leadershipQualities

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







        professionalStrengths:


        form.professionalStrengths

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







        wealthCreation:


        form.wealthCreation

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







        businessSkills:


        form.businessSkills

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







        challenges:


        form.challenges

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







        opportunities:


        form.opportunities

        .split(",")

        .map((x:string)=>x.trim())

        .filter(Boolean),







      };









      const res = await fetch(


        `/api/admin/business-intelligence/${id}`,


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


          "Business intelligence updated successfully"


        );







        router.push(


          "/admin/astro/business-intelligence"


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


        Loading Business Intelligence...


      </div>


    );


  }













  return (



<div className="min-h-screen bg-[#0f172a] text-white p-8">







<h1 className="text-3xl font-bold mb-8">


💼 Edit Business Intelligence


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







<Input label="Business Type" value={form.businessType}

onChange={(v)=>setForm({...form,businessType:v})}

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


Business Knowledge


</h2>







<Input label="Industries" value={form.industries}

onChange={(v)=>setForm({...form,industries:v})}

/>







<Input label="Entrepreneurship" value={form.entrepreneurship}

onChange={(v)=>setForm({...form,entrepreneurship:v})}

/>







<Input label="Leadership Qualities" value={form.leadershipQualities}

onChange={(v)=>setForm({...form,leadershipQualities:v})}

/>







<Input label="Professional Strengths" value={form.professionalStrengths}

onChange={(v)=>setForm({...form,professionalStrengths:v})}

/>







<Input label="Wealth Creation" value={form.wealthCreation}

onChange={(v)=>setForm({...form,wealthCreation:v})}

/>







<Input label="Business Skills" value={form.businessSkills}

onChange={(v)=>setForm({...form,businessSkills:v})}

/>







<Input label="Challenges" value={form.challenges}

onChange={(v)=>setForm({...form,challenges:v})}

/>







<Input label="Opportunities" value={form.opportunities}

onChange={(v)=>setForm({...form,opportunities:v})}

/>







</section>









<section>


<h2 className="text-xl font-semibold mb-4">


Interpretation


</h2>







<TextArea label="Startup" value={form.startup}

onChange={(v)=>setForm({...form,startup:v})}

/>







<TextArea label="Business Growth" value={form.businessGrowth}

onChange={(v)=>setForm({...form,businessGrowth:v})}

/>







<TextArea label="Career" value={form.career}

onChange={(v)=>setForm({...form,career:v})}

/>







<TextArea label="Interpretation" value={form.interpretation}

onChange={(v)=>setForm({...form,interpretation:v})}

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

"Update Business"


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