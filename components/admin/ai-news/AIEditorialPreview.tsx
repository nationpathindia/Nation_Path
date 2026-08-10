"use client";

interface Props {
  article:any;
  onClose?:()=>void;
}


export default function AIEditorialPreview({
  article,
  onClose
}:Props){


return (

<div
className="
fixed
inset-0
z-50
bg-black/80
overflow-y-auto
p-4
md:p-8
"
>


<div
className="
max-w-5xl
mx-auto
bg-[#050816]
border
border-white/10
rounded-2xl
p-6
md:p-10
space-y-10
text-white
"
>


<div
className="
flex
justify-between
items-start
gap-4
"
>

<div>

<h1
className="
text-3xl
font-bold
leading-tight
"
>
{article?.title ||
article?.headline ||
"Untitled Article"}
</h1>


<p
className="
text-gray-400
mt-3
"
>
Editorial Preview
</p>

</div>


{
onClose &&
<button

onClick={onClose}

className="
px-4
py-2
rounded-lg
bg-white/10
border
border-white/10
"
>
Close
</button>
}


</div>



<section>

<h2
className="
text-xl
font-semibold
mb-3
text-orange-400
"
>
Short Brief
</h2>

<p
className="
text-gray-200
leading-7
"
>
{
article?.shortBrief ||
article?.brief ||
"No summary available"
}
</p>

</section>




<section>

<h2
className="
text-xl
font-semibold
mb-3
text-orange-400
"
>
Article Story
</h2>


<div
className="
whitespace-pre-line
text-gray-200
leading-8
"
>
{
article?.content ||
article?.body ||
"No article content available"
}
</div>

</section>




<section>

<h2
className="
text-xl
font-semibold
mb-3
text-orange-400
"
>
Background
</h2>

<p
className="
whitespace-pre-line
text-gray-200
leading-7
"
>
{
article?.background ||
"N/A"
}
</p>

</section>





<section>

<h2
className="
text-xl
font-semibold
mb-3
text-orange-400
"
>
Why It Matters
</h2>


<p
className="
whitespace-pre-line
text-gray-200
leading-7
"
>
{
article?.whyItMatters ||
"N/A"
}
</p>


</section>






<section>

<h2
className="
text-xl
font-semibold
mb-3
text-orange-400
"
>
Key Highlights
</h2>


<ul
className="
space-y-2
text-gray-200
"
>

{

Array.isArray(article?.keyHighlights)

?

article.keyHighlights.map(
(item:string,index:number)=>(

<li
key={index}
>
• {item}
</li>

)

)

:

<li>
No highlights available
</li>

}

</ul>


</section>






<section>

<h2
className="
text-xl
font-semibold
mb-3
text-orange-400
"
>
Timeline
</h2>


<div
className="
space-y-3
"
>

{

Array.isArray(article?.timeline)

?

article.timeline.map(
(item:any,index:number)=>(

<div
key={index}
className="
bg-white/5
rounded-xl
p-4
"
>

{
typeof item==="string"
?
item
:
JSON.stringify(item)
}

</div>

)

)

:

"N/A"

}


</div>


</section>






<section>

<h2
className="
text-xl
font-semibold
mb-3
text-orange-400
"
>
Fact Check
</h2>


<div
className="
space-y-3
"
>

{

Array.isArray(article?.factCheck)

?

article.factCheck.map(
(item:any,index:number)=>(

<div
key={index}
className="
bg-white/5
rounded-xl
p-4
"
>

<strong>
Claim:
</strong>

{" "}

{
item.claim
}


<br/>


<strong>
Status:
</strong>

{" "}

{
item.status
}


</div>

)

)

:

"N/A"

}


</div>


</section>






<section>

<h2
className="
text-xl
font-semibold
mb-3
text-orange-400
"
>
FAQ
</h2>


<div
className="
space-y-4
"
>

{

Array.isArray(article?.faq)

?

article.faq.map(
(item:any,index:number)=>(

<div
key={index}
className="
bg-white/5
rounded-xl
p-4
"
>

<strong>
Q:
</strong>

{" "}

{
item.question
}


<br/>


<strong>
A:
</strong>

{" "}

{
item.answer
}


</div>

)

)

:

"N/A"

}


</div>


</section>






<section>

<h2
className="
text-xl
font-semibold
mb-3
text-orange-400
"
>
SEO Preview
</h2>


<div
className="
bg-white/5
rounded-xl
p-5
space-y-2
"
>

<p>
<strong>
Title:
</strong>

{" "}

{
article?.seoTitle ||
article?.seo?.title ||
"N/A"
}

</p>


<p>
<strong>
Description:
</strong>

{" "}

{
article?.metaDescription ||
article?.seo?.description ||
"N/A"
}

</p>


<p>
<strong>
Keywords:
</strong>

{" "}

{

Array.isArray(article?.metaKeywords)

?

article.metaKeywords.join(", ")

:

"N/A"

}

</p>


</div>


</section>



</div>


</div>

);

}