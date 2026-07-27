"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";



export default function CreatePanchangPage(){


  const router = useRouter();


  const [loading,setLoading] =

    useState(false);




  const [form,setForm] =

  useState<any>({



    date:"",


    location:"India",



    sunrise:"",

    sunset:"",



    tithi:{


      name:"",

      paksha:"",

      endingTime:"",

    },



    nakshatra:{


      name:"",

      endingTime:"",

    },



    yoga:"",


    karana:"",



    moonRashi:"",

    sunRashi:"",



    timings:{


      rahuKaal:"",

      yamaganda:"",

      gulika:"",

    },



    festival:"",


    muhurat:"",



    seo:{


      title:"",

      description:"",

    },



    status:"draft",



  });









  const update = (

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




      const res = await fetch(

        "/api/admin/panchang",

        {


          method:"POST",


          headers:{


            "Content-Type":

              "application/json",


          },


          body:

            JSON.stringify(form),


        }


      );




      const data = await res.json();




      if(data.success){


        alert(

          "Panchang created successfully"

        );


        router.push(

          "/admin/astro/panchang"

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

🪔 Create Panchang

</h1>







<div className="bg-[#1e293b] rounded-xl p-8 space-y-8">







<section>


<h2 className="text-xl font-semibold mb-4">

Basic Information

</h2>



<div className="grid md:grid-cols-2 gap-4">


<Input

label="Date"

value={form.date}

onChange={(v)=>

setForm({

...form,

date:v

})

}

/>




<Input

label="Location"

value={form.location}

onChange={(v)=>

setForm({

...form,

location:v

})

}

/>



<Input

label="Sunrise"

value={form.sunrise}

onChange={(v)=>

setForm({

...form,

sunrise:v

})

}

/>




<Input

label="Sunset"

value={form.sunset}

onChange={(v)=>

setForm({

...form,

sunset:v

})

}

/>



</div>


</section>









<section>


<h2 className="text-xl font-semibold mb-4">

Tithi

</h2>



<div className="grid md:grid-cols-3 gap-4">



<Input

label="Name"

value={form.tithi.name}

onChange={(v)=>

update(

"tithi",

"name",

v

)

}

/>



<Input

label="Paksha"

value={form.tithi.paksha}

onChange={(v)=>

update(

"tithi",

"paksha",

v

)

}

/>



<Input

label="Ending Time"

value={form.tithi.endingTime}

onChange={(v)=>

update(

"tithi",

"endingTime",

v

)

}

/>



</div>


</section>









<section>


<h2 className="text-xl font-semibold mb-4">

Nakshatra

</h2>



<div className="grid md:grid-cols-2 gap-4">


<Input

label="Nakshatra Name"

value={form.nakshatra.name}

onChange={(v)=>

update(

"nakshatra",

"name",

v

)

}

/>




<Input

label="Ending Time"

value={form.nakshatra.endingTime}

onChange={(v)=>

update(

"nakshatra",

"endingTime",

v

)

}

/>



</div>


</section>









<section>


<h2 className="text-xl font-semibold mb-4">

Astro Data

</h2>


<div className="grid md:grid-cols-2 gap-4">



<Input

label="Yoga"

value={form.yoga}

onChange={(v)=>

setForm({

...form,

yoga:v

})

}

/>



<Input

label="Karana"

value={form.karana}

onChange={(v)=>

setForm({

...form,

karana:v

})

}

/>



<Input

label="Moon Rashi"

value={form.moonRashi}

onChange={(v)=>

setForm({

...form,

moonRashi:v

})

}

/>



<Input

label="Sun Rashi"

value={form.sunRashi}

onChange={(v)=>

setForm({

...form,

sunRashi:v

})

}

/>



</div>


</section>









<section>


<h2 className="text-xl font-semibold mb-4">

Important Timings

</h2>


<div className="grid md:grid-cols-3 gap-4">



<Input

label="Rahu Kaal"

value={form.timings.rahuKaal}

onChange={(v)=>

update(

"timings",

"rahuKaal",

v

)

}

/>




<Input

label="Yamaganda"

value={form.timings.yamaganda}

onChange={(v)=>

update(

"timings",

"yamaganda",

v

)

}

/>




<Input

label="Gulika"

value={form.timings.gulika}

onChange={(v)=>

update(

"timings",

"gulika",

v

)

}

/>



</div>


</section>









<section>


<h2 className="text-xl font-semibold mb-4">

Festival & Muhurat

</h2>



<Input

label="Festival"

value={form.festival}

onChange={(v)=>

setForm({

...form,

festival:v

})

}

/>




<Input

label="Muhurat"

value={form.muhurat}

onChange={(v)=>

setForm({

...form,

muhurat:v

})

}

/>



</section>









<section>


<h2 className="text-xl font-semibold mb-4">

SEO

</h2>



<Input

label="SEO Title"

value={form.seo.title}

onChange={(v)=>

update(

"seo",

"title",

v

)

}

/>




<textarea

placeholder="SEO Description"

value={form.seo.description}

onChange={(e)=>

update(

"seo",

"description",

e.target.value

)

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

"Create Panchang"

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

value:string;

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