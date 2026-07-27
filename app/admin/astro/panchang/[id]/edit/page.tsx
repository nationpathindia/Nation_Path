"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";



export default function EditPanchangPage(){


  const router = useRouter();

  const params = useParams();


  const id = params.id as string;



  const [loading,setLoading] =

    useState(true);



  const [saving,setSaving] =

    useState(false);






  const [form,setForm] =

  useState<any>({


    date:"",

    location:"",

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









  useEffect(()=>{


    loadData();


  },[]);








  const loadData = async()=>{


    try{


      const res = await fetch(

        `/api/admin/panchang/${id}`

      );


      const data = await res.json();



      if(data.success){


        setForm(data.data);


      }


    }


    catch(error){


      console.error(error);


    }


    finally{


      setLoading(false);


    }


  };









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


      setSaving(true);




      const res = await fetch(

        `/api/admin/panchang/${id}`,

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




      const data = await res.json();





      if(data.success){


        alert(

          "Panchang updated successfully"

        );


        router.push(

          "/admin/astro/panchang"

        );


      }


      else{


        alert(

          data.message || "Update failed"

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

        Loading...

      </div>

    );


  }









  return (

<div className="min-h-screen bg-[#0f172a] text-white p-8">





<h1 className="text-3xl font-bold mb-8">

🪔 Edit Panchang

</h1>






<div className="bg-[#1e293b] p-8 rounded-xl space-y-8">







<Section title="Basic Information">


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


</Section>









<Section title="Tithi">


<div className="grid md:grid-cols-3 gap-4">


<Input

label="Name"

value={form.tithi?.name}

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

value={form.tithi?.paksha}

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

value={form.tithi?.endingTime}

onChange={(v)=>

update(

"tithi",

"endingTime",

v

)

}

/>


</div>


</Section>









<Section title="Nakshatra">


<div className="grid md:grid-cols-2 gap-4">


<Input

label="Name"

value={form.nakshatra?.name}

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

value={form.nakshatra?.endingTime}

onChange={(v)=>

update(

"nakshatra",

"endingTime",

v

)

}

/>


</div>


</Section>









<Section title="Astro Data">


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


</Section>









<Section title="Timings">


<div className="grid md:grid-cols-3 gap-4">


<Input

label="Rahu Kaal"

value={form.timings?.rahuKaal}

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

value={form.timings?.yamaganda}

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

value={form.timings?.gulika}

onChange={(v)=>

update(

"timings",

"gulika",

v

)

}

/>


</div>


</Section>









<Section title="Festival">


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


</Section>









<Section title="SEO">


<Input

label="SEO Title"

value={form.seo?.title}

onChange={(v)=>

update(

"seo",

"title",

v

)

}

/>



<textarea

value={form.seo?.description || ""}

onChange={(e)=>

update(

"seo",

"description",

e.target.value

)

}

className="w-full bg-black p-3 rounded"

/>


</Section>









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

"Update Panchang"

}

</button>






</div>


</div>

  );


}








function Section({

title,

children

}:{

title:string;

children:React.ReactNode;

}){


return (

<section>


<h2 className="text-xl font-semibold mb-4">

{title}

</h2>


{children}


</section>

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