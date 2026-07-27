"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function CreateZodiacPage(){


  const router = useRouter();


  const [loading,setLoading] = useState(false);



  const [form,setForm] = useState<any>({


    zodiac:"",

    slug:"",



    names:{


      english:"",

      hindi:"",

      sanskrit:"",

      gujarati:"",

      nepali:"",


    },



    identity:{


      rashi:"",

      sanskritName:"",

      dates:"",

      description:"",

      energy:"",


    },



    symbol:"",


    element:"",


    modality:"",


    rulingPlanet:"",





    traits:{


      strengths:"",

      weaknesses:"",

      personality:"",


    },





    lucky:{


      color:"",

      number:"",

      day:"",


    },





    media:{


      icon:"",

      banner:"",


    },





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




      const payload = {


        ...form,



        traits:{


          strengths:


            form.traits.strengths

            .split(",")

            .map((x:string)=>x.trim())

            .filter(Boolean),



          weaknesses:


            form.traits.weaknesses

            .split(",")

            .map((x:string)=>x.trim())

            .filter(Boolean),



          personality:


            form.traits.personality,


        },


      };





      const res = await fetch(

        "/api/admin/zodiac",

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

          "Zodiac created successfully"

        );


        router.push(

          "/admin/astro/zodiac"

        );


      }

      else{


        alert(

          data.message ||

          "Failed"

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


<div className="min-h-screen bg-[#0f172a] p-8 text-white">



<h1 className="mb-8 text-3xl font-bold">

🔮 Create Zodiac Master

</h1>





<div className="space-y-8 rounded-xl bg-[#1e293b] p-8">







{/* BASIC */}


<section>


<h2 className="mb-4 text-xl font-semibold">

Basic Identity

</h2>



<div className="grid gap-4 md:grid-cols-2">


<Input

label="Zodiac ID"

value={form.zodiac}

onChange={(v)=>

setForm({

...form,

zodiac:v

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

label="Symbol"

value={form.symbol}

onChange={(v)=>

setForm({

...form,

symbol:v

})

}

/>



<Input

label="Ruling Planet"

value={form.rulingPlanet}

onChange={(v)=>

setForm({

...form,

rulingPlanet:v

})

}

/>


</div>


</section>









{/* IDENTITY */}


<section>


<h2 className="mb-4 text-xl font-semibold">

Horoscope Identity

</h2>




<div className="grid gap-4 md:grid-cols-2">


<Input

label="Rashi"

value={form.identity.rashi}

onChange={(v)=>

update(

"identity",

"rashi",

v

)

}

/>




<Input

label="Sanskrit Name"

value={form.identity.sanskritName}

onChange={(v)=>

update(

"identity",

"sanskritName",

v

)

}

/>




<Input

label="Date Range"

value={form.identity.dates}

onChange={(v)=>

update(

"identity",

"dates",

v

)

}

/>


</div>





<TextArea

label="Description"

value={form.identity.description}

onChange={(v)=>

update(

"identity",

"description",

v

)

}

/>





<TextArea

label="Energy"

value={form.identity.energy}

onChange={(v)=>

update(

"identity",

"energy",

v

)

}

/>



</section>









{/* LANGUAGE */}


<section>


<h2 className="mb-4 text-xl font-semibold">

Language Names

</h2>



<div className="grid gap-4 md:grid-cols-2">


{

Object.keys(form.names)

.map((key)=>(


<Input

key={key}

label={key}

value={form.names[key]}

onChange={(v)=>

update(

"names",

key,

v

)

}

/>


))


}



</div>


</section>









{/* ASTRO */}


<section>


<h2 className="mb-4 text-xl font-semibold">

Astrology Data

</h2>



<div className="grid gap-4 md:grid-cols-2">



<select

value={form.element}

onChange={(e)=>

setForm({

...form,

element:e.target.value

})

}

className="rounded bg-black p-3"

>


<option value="">

Element

</option>


<option value="fire">

Fire

</option>


<option value="earth">

Earth

</option>


<option value="air">

Air

</option>


<option value="water">

Water

</option>


</select>






<select

value={form.modality}

onChange={(e)=>

setForm({

...form,

modality:e.target.value

})

}

className="rounded bg-black p-3"

>


<option value="">

Modality

</option>


<option value="cardinal">

Cardinal

</option>


<option value="fixed">

Fixed

</option>


<option value="mutable">

Mutable

</option>


</select>



</div>


</section>









{/* TRAITS */}


<section>


<h2 className="mb-4 text-xl font-semibold">

Personality Intelligence

</h2>



<Input

label="Strengths comma separated"

value={form.traits.strengths}

onChange={(v)=>

update(

"traits",

"strengths",

v

)

}

/>



<Input

label="Weakness comma separated"

value={form.traits.weaknesses}

onChange={(v)=>

update(

"traits",

"weaknesses",

v

)

}

/>



<TextArea

label="Personality"

value={form.traits.personality}

onChange={(v)=>

update(

"traits",

"personality",

v

)

}

/>



</section>









{/* LUCK */}


<section>


<h2 className="mb-4 text-xl font-semibold">

Lucky Information

</h2>



<div className="grid gap-4 md:grid-cols-3">


{

Object.keys(form.lucky)

.map(key=>(


<Input

key={key}

label={key}

value={form.lucky[key]}

onChange={(v)=>

update(

"lucky",

key,

v

)

}

/>


))


}


</div>


</section>









{/* MEDIA SEO */}


<section>


<h2 className="mb-4 text-xl font-semibold">

Media + SEO

</h2>



<Input

label="Icon URL"

value={form.media.icon}

onChange={(v)=>

update(

"media",

"icon",

v

)

}

/>



<Input

label="Banner URL"

value={form.media.banner}

onChange={(v)=>

update(

"media",

"banner",

v

)

}

/>




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




<TextArea

label="SEO Description"

value={form.seo.description}

onChange={(v)=>

update(

"seo",

"description",

v

)

}

/>



</section>









<button

disabled={loading}

onClick={submit}

className="rounded-xl bg-orange-600 px-8 py-3 font-semibold"

>


{

loading

?

"Saving..."

:

"Create Zodiac"

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

className="mt-1 w-full rounded-lg bg-black p-3"

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

value:string;

onChange:(v:string)=>void;

}){


return (

<div className="mt-4">


<label className="text-sm text-gray-400">

{label}

</label>


<textarea

value={value || ""}

onChange={(e)=>

onChange(e.target.value)

}

className="mt-1 min-h-[100px] w-full rounded-lg bg-black p-3"

/>


</div>

);


}