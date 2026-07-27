"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";



export default function PlanetDetailPage(){


  const params = useParams();

  const router = useRouter();


  const id = params.id as string;



  const [planet,setPlanet] = useState<any>(null);

  const [loading,setLoading] = useState(true);








  useEffect(()=>{


    fetchPlanet();


  },[]);








  const fetchPlanet = async()=>{


    try{


      const res = await fetch(

        `/api/admin/planet-intelligence/${id}`

      );


      const data = await res.json();





      if(data.success){


        setPlanet(data.data);


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

        Loading Planet...

      </div>

    );


  }









  if(!planet){


    return (

      <div className="min-h-screen bg-[#0f172a] text-white p-8">

        Planet not found

      </div>

    );


  }









  return (

<div className="min-h-screen bg-[#0f172a] text-white p-8">






<div className="flex justify-between items-center mb-8">


<div>


<h1 className="text-3xl font-bold">

🪐 {planet.names?.english || planet.planet}

</h1>


<p className="text-gray-400 mt-2">

Planet Intelligence Profile

</p>


</div>





<button

onClick={()=>


router.push(

`/admin/astro/planet-intelligence/${id}/edit`

)

}

className="bg-orange-600 px-6 py-3 rounded-xl"

>

Edit Planet

</button>



</div>









<div className="bg-[#1e293b] rounded-xl p-8 space-y-8">









<Section title="Basic Information">


<Grid>


<Item

label="Planet"

value={planet.planet}

/>



<Item

label="Sanskrit"

value={planet.names?.sanskrit}

/>



<Item

label="Hindi"

value={planet.names?.hindi}

/>



<Item

label="Nature"

value={planet.nature}

/>



<Item

label="Category"

value={planet.category}

/>



<Item

label="Element"

value={planet.element}

/>


</Grid>


</Section>









<Section title="Astrology Significance">


<TagList

items={planet.karakatva}

/>


</Section>









<Section title="Profession">


<TagList

items={planet.profession}

/>


</Section>









<Section title="Relationships">


<TagList

items={planet.relationships}

/>


</Section>









<Section title="Positive Effects">


<TagList

items={planet.positiveEffects}

/>


</Section>









<Section title="Negative Effects">


<TagList

items={planet.negativeEffects}

/>


</Section>









<Section title="Weakness">


<TagList

items={planet.weaknesses}

/>


</Section>









<Section title="Remedies">


<TagList

items={planet.remedies}

/>


</Section>









<Section title="Spiritual Details">


<Grid>


<Item

label="Mantra"

value={planet.mantra}

/>



<Item

label="Gemstone"

value={planet.gemstone}

/>



<Item

label="Metal"

value={planet.metal}

/>



<Item

label="Day"

value={planet.day}

/>



<Item

label="Color"

value={planet.color}

/>



</Grid>


</Section>









<Section title="Description">


<p className="text-gray-300 leading-7">

{planet.description || "-"}

</p>


</Section>









<Section title="SEO">


<Grid>


<Item

label="SEO Title"

value={planet.seo?.title}

/>



<Item

label="SEO Description"

value={planet.seo?.description}

/>



</Grid>


</Section>









<Section title="Status">


<span className="px-4 py-2 bg-black rounded-full">

{planet.status}

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


<p className="text-sm text-gray-400">

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