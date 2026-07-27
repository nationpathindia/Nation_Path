"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Edit Finance Intelligence
//////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";



export default function EditFinancePage(){


  const params = useParams();

  const router = useRouter();


  const id = params.id as string;





  const [loading,setLoading] = useState(true);

  const [saving,setSaving] = useState(false);





  const [form,setForm] = useState<any>(null);









  useEffect(()=>{


    loadData();


  },[]);








  const loadData = async()=>{


    try{


      const res = await fetch(


        `/api/admin/finance-intelligence/${id}`


      );



      const json = await res.json();







      if(json.success){


        setForm(json.data);


      }



    }

    catch(error){


      console.error(error);


    }

    finally{


      setLoading(false);


    }


  };













  const submit = async()=>{


    try{


      setSaving(true);







      const res = await fetch(


        `/api/admin/finance-intelligence/${id}`,


        {


          method:"PUT",



          headers:{



            "Content-Type":

            "application/json",



          },



          body:


          JSON.stringify(form),



        }


      );








      const json = await res.json();








      if(json.success){



        alert(


          "Finance intelligence updated successfully"


        );





        router.push(


          `/admin/astro/finance-intelligence/${id}`


        );



      }



    }

    catch(error){



      console.error(error);



      alert(


        "Update failed"


      );



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









  if(!form){


    return null;


  }













  return (


<div className="min-h-screen bg-[#0f172a] text-white p-8">







<h1 className="text-3xl font-bold mb-8">


💰 Edit Finance Intelligence


</h1>








<div className="bg-[#1e293b] rounded-xl p-8 space-y-8">








<section>



<h2 className="text-xl font-semibold mb-4">


Basic Information


</h2>







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

label="Finance Type"

value={form.financeType}

onChange={(v)=>

setForm({

...form,

financeType:v

})

}

/>






</section>









<section>



<h2 className="text-xl font-semibold mb-4">


Astrology Factors


</h2>







<Input

label="Planets"

value={form.planets?.join(", ")}

onChange={(v)=>

setForm({

...form,

planets:v.split(",").map((x:string)=>x.trim()).filter(Boolean)

})

}

/>







<Input

label="Zodiac Signs"

value={form.zodiacSigns?.join(", ")}

onChange={(v)=>

setForm({

...form,

zodiacSigns:v.split(",").map((x:string)=>x.trim()).filter(Boolean)

})

}

/>







<Input

label="Houses"

value={form.houses?.join(", ")}

onChange={(v)=>

setForm({

...form,

houses:v.split(",").map((x:string)=>x.trim()).filter(Boolean)

})

}

/>






</section>









<section>



<h2 className="text-xl font-semibold mb-4">


Finance Knowledge


</h2>







<Input

label="Wealth Sources"

value={form.wealthSources?.join(", ")}

onChange={(v)=>

setForm({

...form,

wealthSources:v.split(",").map((x:string)=>x.trim()).filter(Boolean)

})

}

/>







<Input

label="Income Patterns"

value={form.incomePatterns?.join(", ")}

onChange={(v)=>

setForm({

...form,

incomePatterns:v.split(",").map((x:string)=>x.trim()).filter(Boolean)

})

}

/>







<Input

label="Investments"

value={form.investments?.join(", ")}

onChange={(v)=>

setForm({

...form,

investments:v.split(",").map((x:string)=>x.trim()).filter(Boolean)

})

}

/>








<Input

label="Strengths"

value={form.strengths?.join(", ")}

onChange={(v)=>

setForm({

...form,

strengths:v.split(",").map((x:string)=>x.trim()).filter(Boolean)

})

}

/>








<Input

label="Challenges"

value={form.challenges?.join(", ")}

onChange={(v)=>

setForm({

...form,

challenges:v.split(",").map((x:string)=>x.trim()).filter(Boolean)

})

}

/>






</section>









<section>



<h2 className="text-xl font-semibold mb-4">


Interpretation


</h2>









<textarea

placeholder="Money Management"

value={form.moneyManagement}

onChange={(e)=>

setForm({

...form,

moneyManagement:e.target.value

})

}

className="w-full bg-black p-3 rounded"

/>









<textarea

placeholder="Business Finance"

value={form.businessFinance}

onChange={(e)=>

setForm({

...form,

businessFinance:e.target.value

})

}

className="w-full bg-black p-3 rounded mt-4"

/>








<textarea

placeholder="Career Finance"

value={form.careerFinance}

onChange={(e)=>

setForm({

...form,

careerFinance:e.target.value

})

}

className="w-full bg-black p-3 rounded mt-4"

/>








<textarea

placeholder="Wealth Creation"

value={form.wealthCreation}

onChange={(e)=>

setForm({

...form,

wealthCreation:e.target.value

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


disabled={saving}


onClick={submit}


className="bg-orange-600 px-8 py-3 rounded-xl font-semibold"


>



{

saving

?

"Updating..."

:

"Update Finance"


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