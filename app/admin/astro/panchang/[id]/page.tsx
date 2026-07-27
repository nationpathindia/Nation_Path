"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";



export default function PanchangDetailPage(){


  const params = useParams();

  const router = useRouter();


  const id = params.id as string;




  const [data,setData] = useState<any>(null);


  const [loading,setLoading] = useState(true);







  useEffect(()=>{


    loadData();


  },[]);







  const loadData = async()=>{


    try{


      const res = await fetch(

        `/api/admin/panchang/${id}`

      );


      const json = await res.json();



      if(json.success){


        setData(json.data);


      }



    }

    catch(error){


      console.error(error);


    }


    finally{


      setLoading(false);


    }


  };









  const remove = async()=>{


    const ok = confirm(

      "Delete this Panchang?"

    );


    if(!ok)

      return;






    const res = await fetch(

      `/api/admin/panchang/${id}`,

      {

        method:"DELETE",

      }

    );




    const json = await res.json();




    if(json.success){


      alert(

        "Panchang deleted"

      );


      router.push(

        "/admin/astro/panchang"

      );


    }


  };








  if(loading){


    return (

      <div className="bg-[#0f172a] min-h-screen text-white p-8">

        Loading Panchang...

      </div>

    );


  }







  if(!data){


    return (

      <div className="bg-[#0f172a] min-h-screen text-white p-8">

        Panchang not found

      </div>

    );


  }








  return (

<div className="min-h-screen bg-[#0f172a] text-white p-8">





<div className="flex justify-between items-center mb-8">



<div>

<h1 className="text-3xl font-bold">

🪔 Panchang Details

</h1>


<p className="text-gray-400 mt-2">

{data.date} - {data.location}

</p>


</div>







<div className="flex gap-3">


<button

onClick={()=>


router.push(

`/admin/astro/panchang/${id}/edit`

)

}

className="bg-orange-600 px-6 py-3 rounded-xl"

>

Edit

</button>





<button

onClick={remove}

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

label="Date"

value={data.date}

/>


<Item

label="Location"

value={data.location}

/>


<Item

label="Sunrise"

value={data.sunrise}

/>


<Item

label="Sunset"

value={data.sunset}

/>


</Grid>


</Section>









<Section title="Tithi">


<Grid>


<Item

label="Name"

value={data.tithi?.name}

/>


<Item

label="Paksha"

value={data.tithi?.paksha}

/>


<Item

label="Ending Time"

value={data.tithi?.endingTime}

/>


</Grid>


</Section>









<Section title="Nakshatra">


<Grid>


<Item

label="Name"

value={data.nakshatra?.name}

/>



<Item

label="Ending Time"

value={data.nakshatra?.endingTime}

/>


</Grid>


</Section>









<Section title="Astrology Data">


<Grid>


<Item

label="Yoga"

value={data.yoga}

/>



<Item

label="Karana"

value={data.karana}

/>



<Item

label="Moon Rashi"

value={data.moonRashi}

/>



<Item

label="Sun Rashi"

value={data.sunRashi}

/>


</Grid>


</Section>


<Section title="Important Timings">


<Grid>


<Item

label="Rahu Kaal"

value={data.timings?.rahuKaal}

/>


<Item

label="Yamaganda"

value={data.timings?.yamaganda}

/>


<Item

label="Gulika"

value={data.timings?.gulika}

/>


</Grid>


</Section>









<Section title="Festival & Muhurat">


<Item

label="Festival"

value={data.festival}

/>



<Item

label="Muhurat"

value={data.muhurat}

/>



</Section>









<Section title="SEO">


<Item

label="SEO Title"

value={data.seo?.title}

/>



<Item

label="SEO Description"

value={data.seo?.description}

/>



</Section>









<Section title="Status">


<Item

label="Current Status"

value={data.status}

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


<div className="mt-2 break-words">

{value || "-"}

</div>


</div>

);


}