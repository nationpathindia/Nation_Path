"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Create Business Intelligence
//////////////////////////////////////////////////////////////

import { useState } from "react";
import { useRouter } from "next/navigation";



export default function CreateBusinessPage(){


  const router = useRouter();


  const [loading,setLoading] = useState(false);







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



        "/api/admin/business-intelligence",



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


          "Business intelligence created successfully"


        );








        router.push(


          "/admin/astro/business-intelligence"


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


💼 Create Business Intelligence


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

label="Business Type"

value={form.businessType}

onChange={(v)=>


setForm({


...form,


businessType:v


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


Business Knowledge


</h2>







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

label="Entrepreneurship"

value={form.entrepreneurship}

onChange={(v)=>


setForm({


...form,


entrepreneurship:v


})


}

/>







<Input

label="Leadership Qualities"

value={form.leadershipQualities}

onChange={(v)=>


setForm({


...form,


leadershipQualities:v


})


}

/>







<Input

label="Professional Strengths"

value={form.professionalStrengths}

onChange={(v)=>


setForm({


...form,


professionalStrengths:v


})


}

/>







<Input

label="Wealth Creation"

value={form.wealthCreation}

onChange={(v)=>


setForm({


...form,


wealthCreation:v


})


}

/>







<Input

label="Business Skills"

value={form.businessSkills}

onChange={(v)=>


setForm({


...form,


businessSkills:v


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







<Input

label="Opportunities"

value={form.opportunities}

onChange={(v)=>


setForm({


...form,


opportunities:v


})


}

/>







</section>









<section>



<h2 className="text-xl font-semibold mb-4">


Interpretation


</h2>







<TextArea

label="Startup"

value={form.startup}

onChange={(v)=>


setForm({


...form,


startup:v


})


}

/>







<TextArea

label="Business Growth"

value={form.businessGrowth}

onChange={(v)=>


setForm({


...form,


businessGrowth:v


})


}

/>







<TextArea

label="Career"

value={form.career}

onChange={(v)=>


setForm({


...form,


career:v


})


}

/>







<TextArea

label="Interpretation"

value={form.interpretation}

onChange={(v)=>


setForm({


...form,


interpretation:v


})


}

/>







<TextArea

label="Remedies"

value={form.remedies}

onChange={(v)=>


setForm({


...form,


remedies:v


})


}

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

"Create Business"


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



<div>



<label className="text-sm text-gray-400">


{label}


</label>







<textarea


value={value || ""}


onChange={(e)=>


onChange(e.target.value)


}


className="w-full bg-black p-3 rounded-lg mt-1 h-32"



/>







</div>



);



}