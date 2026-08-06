"use client";

import {
  useState
} from "react";

import {
  useRouter
} from "next/navigation";


import AIImporter from "@/components/admin/ai-news/AIImporter";
import AIPreview from "@/components/admin/ai-news/AIPreview";







export default function AINewsPage(){



const router = useRouter();




const [article,setArticle] =
useState<any>(null);



const [saving,setSaving] =
useState(false);



const [message,setMessage] =
useState("");



const [reviewStep,setReviewStep] =
useState<
"import" |
"review" |
"saved"
>("import");










async function saveDraft(){



if(!article){

return;

}



setSaving(true);

setMessage("");







try{



const payload = {


...article,


status:

"draft",



aiGenerated:

true,



aiVersion:

"nationpath-ai-v1",



humanReview:

true



};







const res =

await fetch(

"/api/articles",

{

method:"POST",

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







if(!data.success){


throw new Error(

data.error ||

"Failed to save AI draft"

);


}









setMessage(

"AI Article saved as draft successfully. Continue review from CMS."

);



setReviewStep("saved");





}


catch(error:any){


setMessage(

error.message ||

"Draft save failed"

);


}



finally{


setSaving(false);



}



}









function sendToCMS(){



if(!article){

return;

}





/*

Existing Create Post CMS handover.

No auto publish.

Article data remains editable.

*/


const cmsPayload = {


...article,


aiGenerated:

true,


aiVersion:

"nationpath-ai-v1",


status:

"draft"



};





sessionStorage.setItem(

"nationpath_ai_article",

JSON.stringify(cmsPayload)

);





setMessage(

"AI draft prepared for Existing Create Post CMS."

);





router.push(

"/admin/posts/create"

);



}









function regenerate(){



if(!article){

return;

}



setArticle(null);

setReviewStep("import");

setMessage(

"Paste source again to generate a new AI draft."

);



}









function clearArticle(){



setArticle(null);

setMessage("");

setReviewStep("import");



}









return (



<div

className="
space-y-8
text-white
"

>








<div>



<h1 className="text-3xl font-bold">

🤖 NationPath AI Newsroom

</h1>



<p className="
text-gray-400
mt-2
"

>

AI creates structured drafts. Editors verify before CMS transfer and publishing.

</p>



</div>









<div className="
flex
flex-wrap
gap-3
text-sm
"

>



<div

className={`
px-4
py-2
rounded-full
border
${
reviewStep==="import"
?
"bg-orange-600/20 border-orange-500/40 text-orange-300"
:
"border-white/10 text-gray-400"
}
`}

>

1. Import

</div>





<div

className={`
px-4
py-2
rounded-full
border
${
reviewStep==="review"
?
"bg-orange-600/20 border-orange-500/40 text-orange-300"
:
"border-white/10 text-gray-400"
}
`}

>

2. Human Review

</div>





<div

className={`
px-4
py-2
rounded-full
border
${
reviewStep==="saved"
?
"bg-green-600/20 border-green-500/40 text-green-300"
:
"border-white/10 text-gray-400"
}
`}

>

3. CMS Draft

</div>



</div>









<div

className="
grid
xl:grid-cols-2
gap-6
"

>









<div>


<AIImporter


onGenerated={

(article)=>{


setArticle(article);

setReviewStep("review");


}

}


/>


</div>









<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>



<h2 className="text-xl font-semibold mb-4">

AI Workflow

</h2>







<div className="
space-y-3
text-sm
text-gray-300
"

>


<p>

✓ Raw news ingestion

</p>



<p>

✓ AI article intelligence generation

</p>



<p>

✓ Editorial review required

</p>



<p>

✓ Save as draft

</p>



<p>

✓ Transfer to existing CMS

</p>



<p>

✓ Manual publishing only

</p>



</div>







</div>









</div>









{

article &&


<div className="
space-y-5
"

>



<AIPreview


article={article}


onUpdate={setArticle}



onSaveDraft={saveDraft}



onSendToCMS={sendToCMS}



onRegenerate={regenerate}



onClear={clearArticle}



/>





</div>


}









{

saving &&


<div className="
bg-blue-500/10
border
border-blue-400/20
rounded-xl
p-4
"

>

Saving AI draft...

</div>


}









{

message &&


<div

className="
bg-blue-500/10
border
border-blue-400/20
rounded-xl
p-4
"

>

{message}


</div>


}









</div>


);


}