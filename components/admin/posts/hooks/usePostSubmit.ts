"use client";


import {
  useState
} from "react";


import type {
  PostFormData
} from "../types";









export function usePostSubmit(){



const [loading,setLoading] =
useState(false);



const [message,setMessage] =
useState("");



const [error,setError] =
useState("");









function buildPayload(
  form:PostFormData
){



const primaryImage =


form.imageGallery?.find(

img=>img.isPrimary

)

||

form.imageGallery?.[0];







return {



...form,







images:


primaryImage

?

[

primaryImage.url

]

:

[],







imageGallery:


Array.isArray(form.imageGallery)

?

form.imageGallery

:

[],











videoUrl:


form.videoUrl || "",



videoEmbed:


form.videoEmbed || "",



videoThumbnail:


form.videoThumbnail || "",



videoTitle:


form.videoTitle || "",



videoPosition:


form.videoPosition || "top",











keyHighlights:


Array.isArray(form.keyHighlights)

?

form.keyHighlights.filter(

item=>

item.trim()

)

:

[],









timeline:


Array.isArray(form.timeline)

?

form.timeline

:

[],











expertOpinion:


Array.isArray(form.expertOpinion)

?

form.expertOpinion

:

[],









factCheck:


Array.isArray(form.factCheck)

?

form.factCheck

:

[],











keyTakeaways:


Array.isArray(form.keyTakeaways)

?

form.keyTakeaways

:

[],











faqItems:


Array.isArray(form.faqItems)

?

form.faqItems

:

[],









publishedAt:


form.publishedAt

?


new Date(

form.publishedAt

).toISOString()

:

null,











scheduledAt:


form.scheduledAt

?


new Date(

form.scheduledAt

).toISOString()

:

null,





};



}













async function submitPost(

form:PostFormData,

mode:"create"|"edit"="create"

){



setLoading(true);


setError("");

setMessage("");









try{



if(

!form.title.trim()

||

!form.content.trim()

){



throw new Error(

"Title and content required"

);



}









if(

form.postType==="news"

&&

!form.categoryId

){



throw new Error(

"Category required"

);



}









const payload =

buildPayload(form);









const isEdit =

mode==="edit"

&&

Boolean(form.id);









const endpoint =


isEdit

?

`/api/articles/${form.id}`

:

"/api/articles";









const method =


isEdit

?

"PUT"

:

"POST";









console.log(

isEdit

?

"ARTICLE UPDATE PAYLOAD"

:

"ARTICLE CREATE PAYLOAD",

payload

);









const res =

await fetch(

endpoint,

{


method,


headers:{


"Content-Type":

"application/json"


},


body:

JSON.stringify(payload)



}

);









const data =

await res.json();









if(!res.ok){



throw new Error(

data.error

||

(

isEdit

?

"Update failed"

:

"Create failed"

)

);



}






// CONTINUED PART 2/2








/*
  BREAKING PUSH
  Only on CREATE
*/


if(

!isEdit

&&

form.breaking

){



await fetch(

"/api/push-breaking",

{


method:"POST",


headers:{


"Content-Type":

"application/json"


},


body:

JSON.stringify({

type:"article_created",

breaking:true,

id:data.article?.id

})


}

);



}









/*
 CACHE REVALIDATION
*/


await fetch(

"/api/revalidate-breaking",

{

method:"POST"

}

);









setMessage(


isEdit

?

"Post updated successfully ✅"

:

"Post created successfully 🎉"


);









return true;









}

catch(err:any){



console.error(

"POST SUBMIT ERROR",

err

);







setError(


err.message

||

"Failed to save post"


);







return false;








}

finally{


setLoading(false);


}





}













return {


submitPost,


loading,


message,


error


};






}