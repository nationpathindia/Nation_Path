"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";



export default function AstroTemplateViewPage(){


  const params = useParams();


  const id = params.id as string;




  const [template,setTemplate] = useState<any>(null);


  const [loading,setLoading] = useState(true);









  const loadTemplate = async()=>{


    try{


      const res = await fetch(

        `/api/admin/astro-templates/${id}`

      );


      const data = await res.json();





      if(data.success){


        setTemplate(data.data);


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

      loadTemplate();

    }


  },[id]);









  if(loading){


    return (

      <div className="min-h-screen bg-[#0f172a] text-white p-8">

        Loading...

      </div>

    );


  }









  if(!template){


    return (

      <div className="min-h-screen bg-[#0f172a] text-white p-8">

        Template not found

      </div>

    );


  }









return (

<div className="min-h-screen bg-[#0f172a] text-white p-8">







<div className="flex justify-between items-center mb-8">



<div>


<h1 className="text-3xl font-bold">

✨ Astro Template Details

</h1>


<p className="text-gray-400 mt-2">

AI prediction response template

</p>


</div>








<Link

href={

`/admin/astro/astro-templates/${template._id}/edit`

}

className="bg-orange-600 px-6 py-3 rounded-xl"

>

Edit Template

</Link>



</div>









<div className="grid md:grid-cols-2 gap-6">








<Card

title="Template Name"

value={template.templateName}

/>








<Card

title="Slug"

value={template.slug}

/>








<Card

title="Category"

value={template.category}

/>








<Card

title="Language"

value={template.language}

/>








<Card

title="Status"

value={template.status}

/>





</div>









{/* STRUCTURE */}



<div className="bg-[#1e293b] p-6 rounded-xl mt-8">



<h2 className="text-xl font-bold mb-5">

Template Structure

</h2>






<Info

title="Headline"

value={

template.structure?.headline

}


/>






<Info

title="Introduction"

value={

template.structure?.introduction

}


/>







<Info

title="Prediction"

value={

template.structure?.prediction

}


/>







<Info

title="Advice"

value={

template.structure?.advice

}


/>







<Info

title="Remedies"

value={

template.structure?.remedies

}


/>





</div>









{/* VARIABLES */}



<div className="bg-[#1e293b] p-6 rounded-xl mt-8">



<h2 className="text-xl font-bold mb-5">

AI Variables

</h2>





<div className="grid md:grid-cols-5 gap-4">





{

Object.entries(

template.variables || {}

)

.map(([key,value]:any)=>(



<div

key={key}

className="bg-black p-3 rounded"

>


<p className="text-gray-400">

{key}

</p>


<p className="font-bold">

{

value

?

"Enabled"

:

"Disabled"

}

</p>



</div>



))


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

value={

template.seo?.title

}

/>






<Info

title="SEO Description"

value={

template.seo?.description

}

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