"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";



export default function MuhuratDetailPage(){


  const params = useParams();

  const router = useRouter();


  const id = params.id as string;



  const [data,setData] = useState<any>(null);


  const [loading,setLoading] = useState(true);








  useEffect(()=>{


    fetchData();


  },[]);









  const fetchData = async()=>{


    try{


      const res = await fetch(

        `/api/admin/muhurat/${id}`

      );


      const result = await res.json();





      if(result.success){


        setData(result.data);


      }



    }


    catch(error){


      console.error(error);


    }


    finally{


      setLoading(false);


    }


  };









  if(loading){


    return (

      <div className="min-h-screen bg-[#0f172a] text-white p-8">

        Loading Muhurat...

      </div>

    );


  }








  if(!data){


    return (

      <div className="min-h-screen bg-[#0f172a] text-white p-8">

        Muhurat not found

      </div>

    );


  }









  return (

<div className="min-h-screen bg-[#0f172a] text-white p-8">






<div className="flex justify-between items-center mb-8">


<div>


<h1 className="text-3xl font-bold">

🙏 {data.title}

</h1>


<p className="text-gray-400 mt-2">

Muhurat Details

</p>


</div>





<button

onClick={()=>


router.push(

`/admin/astro/muhurat/${id}/edit`

)

}

className="bg-orange-600 px-6 py-3 rounded-xl"

>

Edit

</button>




</div>









<div className="bg-[#1e293b] rounded-xl p-8 space-y-8">









<Section title="Basic Information">


<Grid>


<Item

label="Title"

value={data.title}

/>


<Item

label="Slug"

value={data.slug}

/>


<Item

label="Category"

value={data.category}

/>


<Item

label="Date"

value={data.date}

/>


</Grid>


</Section>









<Section title="Timing">


<Grid>


<Item

label="Start"

value={data.timing?.start}

/>



<Item

label="End"

value={data.timing?.end}

/>



</Grid>


</Section>









<Section title="Astrology">


<Grid>


<Item

label="Tithi"

value={data.astrology?.tithi}

/>



<Item

label="Nakshatra"

value={data.astrology?.nakshatra}

/>



<Item

label="Yoga"

value={data.astrology?.yoga}

/>



</Grid>


</Section>









<Section title="Suitable For">


<TagList

items={data.suitableFor}

/>


</Section>









<Section title="Avoid For">


<TagList

items={data.avoidFor}

/>


</Section>









<Section title="Benefits">


<TagList

items={data.benefits}

/>


</Section>









<Section title="Description">


<p className="text-gray-300 leading-7">

{data.description || "-"}

</p>


</Section>









<Section title="Dosha Rules">


<p className="text-gray-300 leading-7">

{data.doshaRules || "-"}

</p>


</Section>









<Section title="SEO">


<Grid>


<Item

label="SEO Title"

value={data.seo?.title}

/>


<Item

label="SEO Description"

value={data.seo?.description}

/>


</Grid>


</Section>









<Section title="Status">


<span

className={`px-4 py-2 rounded-full ${
data.status==="published"

?

"bg-green-700"

:

"bg-gray-700"

}`}

>

{data.status}

</span>


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


{children}


</section>

);


}









function Grid({

children

}:{

children:React.ReactNode;

}){


return (

<div className="grid md:grid-cols-3 gap-4">

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


<p className="text-gray-400 text-sm">

{label}

</p>


<p className="mt-2">

{value || "-"}

</p>


</div>

);


}









function TagList({

items

}:{

items:string[];

}){


if(!items || items.length===0)

return (

<p className="text-gray-500">

-

</p>

);





return (

<div className="flex flex-wrap gap-3">


{

items.map((item,index)=>(


<span

key={index}

className="bg-black px-4 py-2 rounded-full"

>

{item}

</span>


))

}


</div>

);


}