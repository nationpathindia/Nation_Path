"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";


export default function ZodiacDetailPage(){


  const params = useParams();

  const router = useRouter();


  const id = params.id as string;



  const [zodiac,setZodiac] =
    useState<any>(null);


  const [loading,setLoading] =
    useState(true);





  useEffect(()=>{


    fetchZodiac();


  },[]);







  const fetchZodiac = async()=>{


    try{


      const res = await fetch(

        `/api/admin/zodiac/${id}`

      );


      const data =
        await res.json();




      if(data.success){


        setZodiac(data.data);


      }



    }


    catch(error){


      console.error(error);


    }


    finally{


      setLoading(false);


    }


  };









  const deleteZodiac = async()=>{


    const confirmDelete =
      confirm(

        "Delete this zodiac?"

      );



    if(!confirmDelete)

      return;





    const res = await fetch(

      `/api/admin/zodiac/${id}`,

      {

        method:"DELETE",

      }

    );




    const data =
      await res.json();




    if(data.success){


      alert(

        "Zodiac deleted"

      );


      router.push(

        "/admin/astro/zodiac"

      );


    }


  };








  if(loading){


    return (

      <div className="min-h-screen bg-[#0f172a] text-white p-8">

        Loading Zodiac...

      </div>

    );


  }








  if(!zodiac){


    return (

      <div className="min-h-screen bg-[#0f172a] text-white p-8">

        Zodiac not found

      </div>

    );


  }








  return (

<div className="min-h-screen bg-[#0f172a] text-white p-8">





<div className="flex justify-between items-center mb-8">


<h1 className="text-3xl font-bold">

🔮 {zodiac.names?.english || zodiac.zodiac}

</h1>



<div className="flex gap-3">


<button

onClick={()=>


router.push(

`/admin/astro/zodiac/${id}/edit`

)

}

className="bg-orange-600 px-6 py-3 rounded-xl"

>

Edit

</button>




<button

onClick={deleteZodiac}

className="bg-red-600 px-6 py-3 rounded-xl"

>

Delete

</button>


</div>


</div>









<div className="bg-[#1e293b] rounded-xl p-8 space-y-8">







<Section title="Basic Information">


<Grid>


<Item

label="Zodiac"

value={zodiac.zodiac}

/>


<Item

label="Slug"

value={zodiac.slug}

/>


<Item

label="Symbol"

value={zodiac.symbol}

/>


<Item

label="Element"

value={zodiac.element}

/>


<Item

label="Modality"

value={zodiac.modality}

/>


<Item

label="Ruling Planet"

value={zodiac.rulingPlanet}

/>


</Grid>


</Section>









<Section title="Language Names">


<Grid>


<Item

label="English"

value={zodiac.names?.english}

/>


<Item

label="Hindi"

value={zodiac.names?.hindi}

/>


<Item

label="Sanskrit"

value={zodiac.names?.sanskrit}

/>


<Item

label="Gujarati"

value={zodiac.names?.gujarati}

/>


<Item

label="Nepali"

value={zodiac.names?.nepali}

/>


</Grid>


</Section>









<Section title="Personality">


<Item

label="Strengths"

value={

zodiac.traits?.strengths?.join(", ")

}

/>



<Item

label="Weakness"

value={

zodiac.traits?.weaknesses?.join(", ")

}

/>



<Item

label="Personality"

value={

zodiac.traits?.personality

}

/>


</Section>









<Section title="Lucky Details">


<Grid>


<Item

label="Lucky Color"

value={zodiac.lucky?.color}

/>


<Item

label="Lucky Number"

value={zodiac.lucky?.number}

/>


<Item

label="Lucky Day"

value={zodiac.lucky?.day}

/>


</Grid>


</Section>









<Section title="Media">


<Grid>


<Item

label="Icon"

value={zodiac.media?.icon}

/>


<Item

label="Banner"

value={zodiac.media?.banner}

/>


</Grid>


</Section>









<Section title="SEO">


<Item

label="SEO Title"

value={zodiac.seo?.title}

/>



<Item

label="SEO Description"

value={zodiac.seo?.description}

/>


</Section>









<Section title="Status">


<Item

label="Current Status"

value={zodiac.status}

/>


</Section>









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


<div className="space-y-3">

{children}

</div>


</section>

);


}









function Grid({

children

}:{

children:React.ReactNode;

}){


return (

<div className="grid md:grid-cols-2 gap-4">

{children}

</div>

);


}









function Item({

label,

value

}:{

label:string;

value:any;

}){


return (

<div className="bg-black rounded-lg p-4">


<div className="text-sm text-gray-400">

{label}

</div>


<div className="mt-1 text-white break-words">

{

value || "-"

}

</div>


</div>

);


}