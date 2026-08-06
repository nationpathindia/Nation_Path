"use client";


import AIArticleEditor from "./AIArticleEditor";



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






<div className="
flex
items-center
justify-between
gap-4
"

>


<div>


<h2 className="text-xl font-bold">

AI Article Preview

</h2>



<p className="
text-sm
text-gray-400
mt-1
"

>

Human editorial review before CMS transfer

</p>


</div>





<div className="
px-3
py-1
rounded-full
bg-orange-600/20
border
border-orange-500/30
text-orange-400
text-xs
font-semibold
"

>

AI DRAFT

</div>



</div>









<div className="
grid
md:grid-cols-3
gap-4
"

>





<div className="
rounded-xl
bg-black/20
border
border-white/10
p-4
"

>

<p className="text-gray-400 text-sm">

AI Confidence

</p>


<p className="text-lg font-bold">

{

quality.confidence ||

"N/A"

}

</p>


</div>








<div className="
rounded-xl
bg-black/20
border
border-white/10
p-4
"

>

<p className="text-gray-400 text-sm">

Fact Check

</p>


<p className="text-lg font-bold">

{

quality.factCheckStatus ||

"Pending"

}

</p>


</div>







<div className="
rounded-xl
bg-black/20
border
border-white/10
p-4
"

>

<p className="text-gray-400 text-sm">

Editorial Status

</p>


<p className="text-lg font-bold">

{

quality.editorialReviewStatus ||

"Review Required"

}

</p>


</div>




</div>









<div className="
rounded-xl
border
border-white/10
bg-black/20
p-5
"

>


<h3 className="font-semibold mb-3">

AI Summary

</h3>



<p className="text-gray-300 text-sm leading-relaxed">

{

article?.shortBrief ||

article?.summary ||

"No AI summary available"

}


</p>


</div>









<div className="
grid
md:grid-cols-2
gap-4
"

>





<div className="
rounded-xl
border
border-white/10
p-4
"

>


<h3 className="font-semibold mb-3">

Source Intelligence

</h3>



<p className="text-sm text-gray-300">

Primary Source:

{" "}

{

sourceDesk.primarySource ||

"N/A"

}

</p>



<p className="text-sm text-gray-300 mt-1">

Agency:

{" "}

{

sourceDesk.agency ||

"N/A"

}

</p>



<p className="text-sm text-gray-300 mt-1">

Verification:

{" "}

{

sourceDesk.verificationStatus ||

"Pending"

}

</p>



</div>








<div className="
rounded-xl
border
border-white/10
p-4
"

>


<h3 className="font-semibold mb-3">

SEO Summary

</h3>



<p className="text-sm text-gray-300">

Title:

{" "}

{

seo.title ||

"N/A"

}

</p>



<p className="text-sm text-gray-300 mt-1">

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




</div>









{

imageGallery.length > 0 &&


<div className="
rounded-xl
border
border-white/10
p-4
"

>


<h3 className="font-semibold mb-4">

Image Intelligence

</h3>




<div className="
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

alt={image.alt || "AI generated image"}

className="
w-full
h-40
object-cover
"

/>



<div className="
p-3
text-xs
text-gray-300
"

>

<p>

{image.caption}

</p>



{

image.isPrimary &&

<span className="
inline-block
mt-2
text-orange-400
"

>

Primary Image

</span>

}


</div>



</div>


)


)

}



</div>


</div>


}









{

validation &&


<div className="
rounded-xl
border
border-yellow-500/30
bg-yellow-500/10
p-4
"

>


<h3 className="
font-semibold
text-yellow-300
mb-2
"

>

Validation Summary

</h3>



<pre className="
text-xs
whitespace-pre-wrap
text-gray-300
"

>

{

JSON.stringify(

validation,

null,

2

)

}

</pre>



</div>


}









<div className="
rounded-xl
border
border-blue-500/30
bg-blue-500/10
p-4
text-sm
text-blue-200
"

>


<p className="font-semibold">

Human Editorial Review Required

</p>



<p className="mt-1">

AI generated content must be verified by editors before transferring into the existing CMS workflow.

</p>



</div>









<div className="
flex
flex-wrap
gap-3
"

>





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









<div className="
pt-4
border-t
border-white/10
"

>


<AIArticleEditor

article={article}

onUpdate={onUpdate}

/>


</div>






</div>


);


}