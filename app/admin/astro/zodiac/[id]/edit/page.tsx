"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";


export default function EditZodiacPage(){


  const router = useRouter();

  const params = useParams();

  const id = params.id as string;



  const [loading,setLoading] =
    useState(false);


  const [fetching,setFetching] =
    useState(true);



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







  useEffect(()=>{


    loadZodiac();


  },[]);







  const loadZodiac = async()=>{


    try{


      const res = await fetch(

        `/api/admin/zodiac/${id}`

      );


      const data =
        await res.json();




      if(data.success){


        const zodiac =
          data.data;



        setForm({


          ...zodiac,


          traits:{


            strengths:

              Array.isArray(
                zodiac.traits?.strengths
              )

              ?

              zodiac.traits.strengths.join(", ")

              :

              "",



            weaknesses:

              Array.isArray(
                zodiac.traits?.weaknesses
              )

              ?

              zodiac.traits.weaknesses.join(", ")

              :

              "",



            personality:

              zodiac.traits?.personality || "",



          }



        });



      }


    }


    catch(error){


      console.error(error);


      alert(
        "Failed loading zodiac"
      );


    }


    finally{


      setFetching(false);


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


      setLoading(true);




      const payload = {


        ...form,



        traits:{


          strengths:

            form.traits.strengths

            .split(",")

            .map((x:string)=>
              x.trim()
            )

            .filter(Boolean),




          weaknesses:

            form.traits.weaknesses

            .split(",")

            .map((x:string)=>
              x.trim()
            )

            .filter(Boolean),




          personality:

            form.traits.personality,


        }



      };







      const res = await fetch(

        `/api/admin/zodiac/${id}`,

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






      const data =
        await res.json();






      if(data.success){


        alert(

          "Zodiac updated successfully"

        );



        router.push(

          "/admin/astro/zodiac"

        );


      }

      else{


        alert(

          data.message ||

          "Update failed"

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







  if(fetching){


    return (

      <div className="p-8 bg-[#0f172a] min-h-screen text-white">

        Loading Zodiac...

      </div>

    );


  }









  return (


<div className="p-8 bg-[#0f172a] text-white min-h-screen">



<h1 className="text-3xl font-bold mb-8">

🔮 Edit Zodiac

</h1>






<div className="bg-[#1e293b] rounded-xl p-8 space-y-8">







<section>


<h2 className="text-xl font-semibold mb-4">

Basic Information

</h2>



<div className="grid md:grid-cols-2 gap-4">


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









<section>


<h2 className="text-xl font-semibold mb-4">

Language Names

</h2>



<div className="grid md:grid-cols-2 gap-4">


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









<section>


<h2 className="text-xl font-semibold mb-4">

Astrology Data

</h2>



<div className="grid md:grid-cols-2 gap-4">



<select

value={form.element}

onChange={(e)=>

setForm({

...form,

element:e.target.value

})

}

className="bg-black p-3 rounded"

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

className="bg-black p-3 rounded"

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









<section>


<h2 className="text-xl font-semibold mb-4">

Personality

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



<textarea

placeholder="Personality"

value={form.traits.personality}

onChange={(e)=>

update(

"traits",

"personality",

e.target.value

)

}

className="w-full bg-black p-3 rounded"

/>



</section>









<section>


<h2 className="text-xl font-semibold mb-4">

Lucky Details

</h2>



<div className="grid md:grid-cols-3 gap-4">


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









<section>


<h2 className="text-xl font-semibold mb-4">

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

"Updating..."

:

"Update Zodiac"

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

onChange(
e.target.value
)

}

className="w-full bg-black p-3 rounded-lg mt-1"

/>


</div>

);


}