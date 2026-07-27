"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";



export default function EditMuhuratPage(){


  const router = useRouter();

  const params = useParams();


  const id = params.id as string;





  const [loading,setLoading] =

    useState(true);



  const [saving,setSaving] =

    useState(false);








  const [form,setForm] =

  useState<any>({


    title:"",

    slug:"",

    category:"Puja",

    date:"",


    timing:{


      start:"",

      end:"",


    },


    astrology:{


      tithi:"",

      nakshatra:"",

      yoga:"",


    },


    suitableFor:"",

    avoidFor:"",

    benefits:"",


    description:"",


    doshaRules:"",



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

        `/api/admin/muhurat/${id}`

      );


      const data = await res.json();





      if(data.success){


        const item = data.data;




        setForm({


          ...item,


          suitableFor:

            item.suitableFor?.join(", ") || "",



          avoidFor:

            item.avoidFor?.join(", ") || "",



          benefits:

            item.benefits?.join(", ") || "",



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









  const submit = async()=>{


    try{


      setSaving(true);




      const payload = {


        ...form,



        suitableFor:

          form.suitableFor

          .split(",")

          .map((x:string)=>x.trim())

          .filter(Boolean),





        avoidFor:

          form.avoidFor

          .split(",")

          .map((x:string)=>x.trim())

          .filter(Boolean),





        benefits:

          form.benefits

          .split(",")

          .map((x:string)=>x.trim())

          .filter(Boolean),



      };








      const res = await fetch(

        `/api/admin/muhurat/${id}`,

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







      const data = await res.json();





      if(data.success){


        alert(

          "Muhurat updated successfully"

        );



        router.push(

          "/admin/astro/muhurat"

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

      <div className="min-h-screen bg-[#0f172a] text-white p-8">

        Loading...

      </div>

    );


  }









  return (

<div className="min-h-screen bg-[#0f172a] text-white p-8">





<h1 className="text-3xl font-bold mb-8">

🙏 Edit Muhurat

</h1>







<div className="bg-[#1e293b] rounded-xl p-8 space-y-8">







<Section title="Basic Information">


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

label="Date"

value={form.date}

onChange={(v)=>

setForm({

...form,

date:v

})

}

/>



<select

value={form.category}

onChange={(e)=>

setForm({

...form,

category:e.target.value

})

}

className="bg-black p-3 rounded"

>


<option>

Marriage

</option>


<option>

Griha Pravesh

</option>


<option>

Business

</option>


<option>

Vehicle Purchase

</option>


<option>

Education

</option>


<option>

Travel

</option>


<option>

Naming Ceremony

</option>


<option>

Puja

</option>


<option>

Investment

</option>


</select>


</div>


</Section>









<Section title="Timing">


<div className="grid md:grid-cols-2 gap-4">


<Input

label="Start Time"

value={form.timing?.start}

onChange={(v)=>

updateNested(

"timing",

"start",

v

)

}

/>



<Input

label="End Time"

value={form.timing?.end}

onChange={(v)=>

updateNested(

"timing",

"end",

v

)

}

/>


</div>


</Section>









<Section title="Astrology">


<div className="grid md:grid-cols-3 gap-4">


<Input

label="Tithi"

value={form.astrology?.tithi}

onChange={(v)=>

updateNested(

"astrology",

"tithi",

v

)

}

/>



<Input

label="Nakshatra"

value={form.astrology?.nakshatra}

onChange={(v)=>

updateNested(

"astrology",

"nakshatra",

v

)

}

/>



<Input

label="Yoga"

value={form.astrology?.yoga}

onChange={(v)=>

updateNested(

"astrology",

"yoga",

v

)

}

/>


</div>


</Section>









<Section title="Purpose">


<Input

label="Suitable For"

value={form.suitableFor}

onChange={(v)=>

setForm({

...form,

suitableFor:v

})

}

/>



<Input

label="Avoid For"

value={form.avoidFor}

onChange={(v)=>

setForm({

...form,

avoidFor:v

})

}

/>



<Input

label="Benefits"

value={form.benefits}

onChange={(v)=>

setForm({

...form,

benefits:v

})

}

/>


</Section>









<Section title="Content">


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





<textarea

placeholder="Dosha Rules"

value={form.doshaRules}

onChange={(e)=>

setForm({

...form,

doshaRules:e.target.value

})

}

className="w-full bg-black p-3 rounded mt-4"

/>


</Section>









<Section title="SEO">


<Input

label="SEO Title"

value={form.seo?.title}

onChange={(v)=>

updateNested(

"seo",

"title",

v

)

}

/>



<textarea

placeholder="SEO Description"

value={form.seo?.description}

onChange={(e)=>

updateNested(

"seo",

"description",

e.target.value

)

}

className="w-full bg-black p-3 rounded"

/>


</Section>









<Section title="Status">


<select

value={form.status}

onChange={(e)=>

setForm({

...form,

status:e.target.value

})

}

className="bg-black p-3 rounded"

>


<option value="draft">

Draft

</option>


<option value="published">

Published

</option>


</select>


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

"Update Muhurat"

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