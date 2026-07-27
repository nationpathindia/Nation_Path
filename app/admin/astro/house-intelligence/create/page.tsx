"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Create House Intelligence
//////////////////////////////////////////////////////////////

import { useState } from "react";
import { useRouter } from "next/navigation";



export default function CreateHousePage(){


  const router = useRouter();


  const [loading,setLoading] = useState(false);






  const [form,setForm] = useState<any>({


    houseNumber:"",

    slug:"",



    names:{


      en:"",

      hi:"",

      ne:"",


    },



    classification:{


      name:"",

      element:"",

      category:"",

      description:"",


    },



    significations:"",

    lifeAreas:"",

    bodyParts:"",

    relationships:"",



    naturalSignificator:"",

    rulingThemes:"",



    strongHouseEffects:"",

    weakHouseEffects:"",



    positiveEffects:"",

    negativeEffects:"",

    challenges:"",




    career:"",

    finance:"",

    marriage:"",

    health:"",

    education:"",

    children:"",

    property:"",

    spirituality:"",






    remedies:{


      mantra:"",

      gemstone:"",

      metal:"",

      donation:"",

      ritual:"",


    },





    description:"",




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









  const convertArray = (value:string)=>{


    return value

      .split(",")

      .map((x:string)=>x.trim())

      .filter(Boolean);


  };









  const submit = async()=>{


    try{


      setLoading(true);





      const payload = {



        ...form,



        houseNumber:

        Number(form.houseNumber),




        significations:

        convertArray(form.significations),



        lifeAreas:

        convertArray(form.lifeAreas),



        bodyParts:

        convertArray(form.bodyParts),



        relationships:

        convertArray(form.relationships),



        naturalSignificator:

        convertArray(form.naturalSignificator),



        rulingThemes:

        convertArray(form.rulingThemes),




        strongHouseEffects:

        convertArray(form.strongHouseEffects),



        weakHouseEffects:

        convertArray(form.weakHouseEffects),



        positiveEffects:

        convertArray(form.positiveEffects),



        negativeEffects:

        convertArray(form.negativeEffects),



        challenges:

        convertArray(form.challenges),





        seo:{


          ...form.seo,



          keywords:

          convertArray(form.seo.keywords),



        }



      };









      const res = await fetch(


        "/api/admin/house-intelligence",


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

          "House intelligence created successfully"

        );



        router.push(

          "/admin/astro/house-intelligence"

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


🏠 Create House Intelligence


</h1>










<div className="bg-[#1e293b] rounded-xl p-8 space-y-8">







<section>


<h2 className="text-xl font-semibold mb-4">


Basic Information


</h2>





<div className="grid md:grid-cols-2 gap-4">





<Input

label="House Number"

value={form.houseNumber}

onChange={(v)=>

setForm({

...form,

houseNumber:v

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





</div>


</section>











<section>


<h2 className="text-xl font-semibold mb-4">


Names


</h2>





<div className="grid md:grid-cols-3 gap-4">





<Input

label="English"

value={form.names.en}

onChange={(v)=>

updateNested(

"names",

"en",

v

)

}

/>






<Input

label="Hindi"

value={form.names.hi}

onChange={(v)=>

updateNested(

"names",

"hi",

v

)

}

/>






<Input

label="Nepali"

value={form.names.ne}

onChange={(v)=>

updateNested(

"names",

"ne",

v

)

}

/>





</div>


</section>









<section>


<h2 className="text-xl font-semibold mb-4">


Knowledge


</h2>





<Input

label="Significations"

value={form.significations}

onChange={(v)=>

setForm({

...form,

significations:v

})

}

/>





<Input

label="Life Areas"

value={form.lifeAreas}

onChange={(v)=>

setForm({

...form,

lifeAreas:v

})

}

/>





<textarea

placeholder="Description"

value={form.description}

onChange={(e)=>

setForm({

...form,

description:e.target.value

})

}

className="w-full bg-black p-3 rounded"

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


"Create House"


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