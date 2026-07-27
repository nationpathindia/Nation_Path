"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";



export default function TransitIntelligenceViewPage(){


  const params = useParams();


  const id = params.id as string;





  const [transit,setTransit] = useState<any>(null);


  const [loading,setLoading] = useState(true);









  const loadTransit = async()=>{


    try{


      const res = await fetch(

        `/api/admin/transit-intelligence/${id}`

      );


      const data = await res.json();





      if(data.success){


        setTransit(data.data);


      }



    }

    catch(error){


      console.error(error);


    }

    finally{


      setLoading(false);


    }


  };









  useEffect(()=>{


    if(id){


      loadTransit();


    }


  },[id]);









  if(loading){


    return (

      <div className="min-h-screen bg-[#0f172a] text-white p-8">

        Loading...

      </div>

    );


  }









  if(!transit){


    return (

      <div className="min-h-screen bg-[#0f172a] text-white p-8">

        Transit rule not found

      </div>

    );


  }









return (

<div className="min-h-screen bg-[#0f172a] text-white p-8">







<div className="flex justify-between items-center mb-8">



<div>


<h1 className="text-3xl font-bold">

🪐 Transit Intelligence Details

</h1>


<p className="text-gray-400 mt-2">

Planetary movement knowledge

</p>


</div>








<Link

href={

`/admin/astro/transit-intelligence/${transit._id}/edit`

}

className="bg-orange-600 px-6 py-3 rounded-xl"

>

Edit Transit

</Link>



</div>









<div className="grid md:grid-cols-2 gap-6">








<Card

title="Name"

value={transit.name}

/>








<Card

title="Slug"

value={transit.slug}

/>








<Card

title="Planet"

value={transit.planet}

/>








<Card

title="Transit Type"

value={transit.transitType}

/>








<Card

title="From Sign"

value={transit.fromSign}

/>








<Card

title="To Sign"

value={transit.toSign}

/>








<Card

title="Duration"

value={transit.duration}

/>








<Card

title="Category"

value={transit.category}

/>








<Card

title="Status"

value={transit.status}

/>





</div>









{/* EFFECTS */}



<div className="bg-[#1e293b] p-6 rounded-xl mt-8">



<h2 className="text-xl font-bold mb-5">

Transit Effects

</h2>






<Info

title="Positive Effects"

value={

transit.effects?.positive?.join(", ")

}

/>






<Info

title="Negative Effects"

value={

transit.effects?.negative?.join(", ")

}

/>






<Info

title="Neutral Effects"

value={

transit.effects?.neutral?.join(", ")

}

/>





</div>









{/* HOUSE IMPACT */}



<div className="bg-[#1e293b] p-6 rounded-xl mt-8">



<h2 className="text-xl font-bold mb-5">

House Impact

</h2>






<div className="grid md:grid-cols-3 gap-4">



{

Object.entries(

transit.houseImpact || {}

)

.map(([key,value]:any)=>(


<Card

key={key}

title={key}

value={value}

/>


))


}



</div>


</div>









{/* REMEDIES */}



<div className="bg-[#1e293b] p-6 rounded-xl mt-8">



<h2 className="text-xl font-bold mb-5">

Remedies

</h2>





<div className="bg-black p-4 rounded">


{

transit.remedies?.join(", ")

||

"-"

}


</div>



</div>









{/* ADVICE */}



<div className="bg-[#1e293b] p-6 rounded-xl mt-8">



<h2 className="text-xl font-bold mb-5">

Advice

</h2>




<div className="bg-black p-4 rounded">


{

transit.advice || "-"

}


</div>



</div>









{/* DESCRIPTION */}



<div className="bg-[#1e293b] p-6 rounded-xl mt-8">



<h2 className="text-xl font-bold mb-5">

Description

</h2>




<div className="bg-black p-4 rounded">


{

transit.description || "-"

}


</div>



</div>









{/* SEO */}



<div className="bg-[#1e293b] p-6 rounded-xl mt-8">



<h2 className="text-xl font-bold mb-5">

SEO

</h2>






<Info

title="SEO Title"

value={transit.seo?.title}

/>






<Info

title="SEO Description"

value={transit.seo?.description}

/>





</div>









</div>


);


}









function Card({

title,

value

}:{

title:string;

value:any;

}){


return (


<div className="bg-[#1e293b] p-6 rounded-xl">


<p className="text-gray-400">

{title}

</p>



<h3 className="text-xl font-bold mt-2">

{value || "-"}

</h3>



</div>


);


}









function Info({

title,

value

}:{

title:string;

value:any;

}){


return (


<div className="mb-5">


<p className="text-gray-400 mb-1">

{title}

</p>



<div className="bg-black p-4 rounded">


{value || "-"}

</div>



</div>


);


}