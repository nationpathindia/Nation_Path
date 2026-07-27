"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";



export default function AstroScoreViewPage(){


  const params = useParams();


  const id = params.id as string;





  const [score,setScore] = useState<any>(null);


  const [loading,setLoading] = useState(true);









  const loadScore = async()=>{


    try{


      const res = await fetch(

        `/api/admin/astro-scoring/${id}`

      );


      const data = await res.json();





      if(data.success){


        setScore(data.data);


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


      loadScore();


    }


  },[id]);









  if(loading){


    return (

      <div className="min-h-screen bg-[#0f172a] text-white p-8">

        Loading...

      </div>

    );


  }









  if(!score){


    return (

      <div className="min-h-screen bg-[#0f172a] text-white p-8">

        Score rule not found

      </div>

    );


  }









return (

<div className="min-h-screen bg-[#0f172a] text-white p-8">







<div className="flex justify-between items-center mb-8">



<div>


<h1 className="text-3xl font-bold">

⚖️ Astro Score Details

</h1>


<p className="text-gray-400 mt-2">

Prediction scoring intelligence rule

</p>


</div>








<Link

href={

`/admin/astro/astro-scoring/${score._id}/edit`

}

className="bg-orange-600 px-6 py-3 rounded-xl"

>

Edit Rule

</Link>



</div>









<div className="grid md:grid-cols-2 gap-6">








<Card

title="Name"

value={score.name}

/>








<Card

title="Slug"

value={score.slug}

/>








<Card

title="Type"

value={score.type}

/>








<Card

title="Category"

value={score.category}

/>








<Card

title="Weight"

value={score.weight}

/>








<Card

title="Priority"

value={score.priority}

/>








<Card

title="Status"

value={score.status}

/>





</div>









{/* SCORE */}



<div className="bg-[#1e293b] p-6 rounded-xl mt-8">



<h2 className="text-xl font-bold mb-5">

Score Impact

</h2>





<div className="grid md:grid-cols-3 gap-4">





<Card

title="Positive"

value={score.score?.positive}

/>





<Card

title="Negative"

value={score.score?.negative}

/>





<Card

title="Neutral"

value={score.score?.neutral}

/>





</div>



</div>









{/* TARGET */}



<div className="bg-[#1e293b] p-6 rounded-xl mt-8">



<h2 className="text-xl font-bold mb-5">

Target Reference

</h2>






<Info

title="Planet"

value={score.target?.planet}

/>







<Info

title="Zodiac"

value={score.target?.zodiac}

/>







<Info

title="House"

value={score.target?.house}

/>







<Info

title="Nakshatra"

value={score.target?.nakshatra}

/>





</div>









{/* CONDITIONS */}



<div className="bg-[#1e293b] p-6 rounded-xl mt-8">



<h2 className="text-xl font-bold mb-5">

Conditions

</h2>






<Info

title="Planet"

value={score.conditions?.planet}

/>







<Info

title="Aspect"

value={score.conditions?.aspect}

/>







<Info

title="House"

value={score.conditions?.house}

/>







<Info

title="Sign"

value={score.conditions?.sign}

/>





</div>









{/* DESCRIPTION */}



<div className="bg-[#1e293b] p-6 rounded-xl mt-8">



<h2 className="text-xl font-bold mb-5">

Description

</h2>



<div className="bg-black p-4 rounded">

{score.description || "-"}

</div>



</div>









{/* SEO */}



<div className="bg-[#1e293b] p-6 rounded-xl mt-8">



<h2 className="text-xl font-bold mb-5">

SEO

</h2>






<Info

title="SEO Title"

value={score.seo?.title}

/>






<Info

title="SEO Description"

value={score.seo?.description}

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

{value ?? "-"}

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