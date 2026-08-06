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

article.postType || "news",



isEditorial:

Boolean(article.isEditorial)



};

}





export default function EditPostPage(){



const params =
useParams();



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





async function loadArticle(){


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

data.error || "Article not found"

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

"EDIT ARTICLE LOAD ERROR",

err

);



setError(

err.message || "Failed loading article"

);



}

finally{


setLoading(false);


}



}



loadArticle();



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

Loading article...

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


{error || "Article not found"}


</div>

);


}









return (


<ArticleForm


mode="edit"


postType={

article.postType === "editorial"

?

"editorial"

:

"news"

}


initialData={article}


/>


);


}