"use client";


import {
  useEffect,
  useState
} from "react";


import {
  useParams
} from "next/navigation";


import ArticleForm from "@/components/admin/posts/ArticleForm";





function normalizeArticle(article:any){


return {


...article,



imageGallery:

Array.isArray(article.imageGallery)

?

article.imageGallery

:

[],





images:

Array.isArray(article.images)

?

article.images

:

[],







keyHighlights:

Array.isArray(article.keyHighlights)

?

article.keyHighlights

:

[],







timeline:

Array.isArray(article.timeline)

?

article.timeline

:

[],







expertOpinion:

Array.isArray(article.expertOpinion)

?

article.expertOpinion

:

[],







factCheck:

Array.isArray(article.factCheck)

?

article.factCheck

:

[],







keyTakeaways:

Array.isArray(article.keyTakeaways)

?

article.keyTakeaways

:

[],







faqItems:

Array.isArray(article.faqItems)

?

article.faqItems

:

[],







postType:

"editorial",





isEditorial:

true





};


}









export default function EditEditorialPage(){





const params = useParams();



const id =
params?.id as string;





const [loading,setLoading] =
useState(true);



const [article,setArticle] =
useState<any>(null);



const [error,setError] =
useState("");









useEffect(()=>{


if(!id)

return;





async function loadEditorial(){



try{


setLoading(true);





const res =

await fetch(

`/api/articles/${id}`

);





const data =

await res.json();








if(!data.success){


throw new Error(

data.error || "Editorial not found"

);


}









setArticle(

normalizeArticle(

{

...data.article,

id:data.article.id

}

)

);





}

catch(err:any){


console.error(

"EDIT EDITORIAL LOAD ERROR",

err

);




setError(

err.message ||

"Failed loading editorial"

);




}

finally{


setLoading(false);


}



}





loadEditorial();





},[id]);












if(loading){



return (


<div

className="

min-h-screen

bg-[#050816]

text-white

flex

items-center

justify-center

"

>


Loading editorial...


</div>


);


}









if(error || !article){


return (


<div

className="

min-h-screen

bg-[#050816]

text-red-400

p-8

"

>


{error || "Editorial not found"}



</div>


);


}









return (



<ArticleForm



mode="edit"



postType="editorial"



initialData={article}



/>



);


}