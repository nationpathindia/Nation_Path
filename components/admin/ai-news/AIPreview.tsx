"use client";

import {
useState
} from "react";

import AIArticleEditor from "./AIArticleEditor";
import AIEditorialPreview from "./AIEditorialPreview";


interface Props {

article:any;

onUpdate?:
(article:any)=>void;

onSaveDraft?:
()=>void;

onSendToCMS?:
()=>void;

onRegenerate?:
()=>void;

onClear?:
()=>void;

}



export default function AIPreview({

article,

onUpdate,

onSaveDraft,

onSendToCMS,

onRegenerate,

onClear

}:Props){



const [showPreview,setShowPreview] =
useState(false);



const quality =
article?.quality || {};



const sourceDesk =
article?.sourceDesk || {};



const seo =
article?.seo || {};



const validation =
article?.validation || {};



const imageGallery =
article?.imageGallery || [];



return (

<div
className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
space-y-6
"
>


<h2
className="
text-2xl
font-bold
"
>
AI Article Preview
</h2>


<p
className="
text-gray-400
"
>
Human editorial review before CMS transfer
</p>



<div
className="
bg-orange-500/10
border
border-orange-500/20
rounded-xl
p-4
"
>

AI DRAFT

</div>




<div
className="
grid
md:grid-cols-3
gap-4
"
>

<div
className="
bg-white/5
rounded-xl
p-4
"
>

AI Confidence

<br/>

<b>
{
quality.confidence ||
"N/A"
}
</b>

</div>



<div
className="
bg-white/5
rounded-xl
p-4
"
>

Fact Check

<br/>

<b>
{
quality.factCheckStatus ||
"Pending"
}
</b>

</div>



<div
className="
bg-white/5
rounded-xl
p-4
"
>

Editorial Status

<br/>

<b>
{
quality.editorialReviewStatus ||
"Review Required"
}
</b>

</div>


</div>





<div>

<h3
className="
font-semibold
text-orange-400
mb-2
"
>
AI Summary
</h3>


<p
className="
text-gray-200
"
>
{
article?.shortBrief ||
article?.summary ||
"No AI summary available"
}
</p>

</div>





<div>

<h3
className="
font-semibold
text-orange-400
mb-2
"
>
Source Intelligence
</h3>


<p>
Primary Source:
{" "}
{
sourceDesk.primarySource ||
"N/A"
}
</p>


<p>
Agency:
{" "}
{
sourceDesk.agency ||
"N/A"
}
</p>


<p>
Verification:
{" "}
{
sourceDesk.verificationStatus ||
"Pending"
}
</p>


</div>





<div>

<h3
className="
font-semibold
text-orange-400
mb-2
"
>
SEO Summary
</h3>


<p>
Title:
{" "}
{
seo.title ||
"N/A"
}
</p>


<p>
Keywords:
{" "}
{

Array.isArray(seo.keywords)

?

seo.keywords.join(", ")

:

"N/A"

}

</p>


</div>





{

imageGallery.length>0 &&

<div>

<h3
className="
font-semibold
text-orange-400
mb-3
"
>
Image Intelligence
</h3>


<div
className="
grid
md:grid-cols-3
gap-4
"
>

{

imageGallery.map(

(image:any,index:number)=>(

<div
key={index}
className="
rounded-xl
overflow-hidden
border
border-white/10
bg-black/20
"
>


<img

src={image.url}

alt={
image.alt ||
"AI generated image"
}

className="
w-full
h-40
object-cover
"

/>


<div
className="
p-3
"
>

{
image.caption
}


{

image.isPrimary &&

<div
className="
text-orange-400
mt-2
text-sm
"
>
Primary Image
</div>

}


</div>


</div>

)

)

}

</div>


</div>

}







<div
className="
flex
flex-wrap
gap-3
"
>


<button

onClick={()=>setShowPreview(true)}

className="
px-5
py-3
rounded-xl
bg-green-600
font-semibold
"

>

Preview Article

</button>





{

onRegenerate &&

<button

onClick={onRegenerate}

className="
px-5
py-3
rounded-xl
bg-white/10
border
border-white/10
"

>

Regenerate

</button>

}



{

onClear &&

<button

onClick={onClear}

className="
px-5
py-3
rounded-xl
bg-white/5
border
border-white/10
"

>

Clear

</button>

}




{

onSaveDraft &&

<button

onClick={onSaveDraft}

className="
px-5
py-3
rounded-xl
bg-blue-600
font-semibold
"

>

Save AI Draft

</button>

}




{

onSendToCMS &&

<button

onClick={onSendToCMS}

className="
px-5
py-3
rounded-xl
bg-orange-600
font-semibold
"

>

Send To CMS

</button>

}


</div>





<AIArticleEditor

article={article}

onUpdate={onUpdate}

/>





{

showPreview &&

<AIEditorialPreview

article={article}

onClose={()=>
setShowPreview(false)
}

/>

}



</div>

);

}