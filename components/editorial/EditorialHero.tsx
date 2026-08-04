"use client";

import Image from "next/image";
import Link from "next/link";

interface Props {
  article:any;
  shareUrl:string;
}


export default function EditorialHero({
  article,
  shareUrl
}:Props){


const image =
article.images?.[0] || null;



return (

<section

className="
mb-12
"

>


{/* IMAGE */}

{
image &&

<div

className="
relative
w-full
aspect-video
rounded-3xl
overflow-hidden
mb-8
"

>

<Image

src={image}

alt={
article.title ||
"NationPath Insight"
}

fill

priority

className="
object-cover
"

/>

</div>

}





{/* CATEGORY */}

<p

className="
text-sm
uppercase
tracking-[0.2em]
text-orange-600
font-semibold
mb-4
"

>

NationPath Insight

</p>






{/* TITLE */}

<h1

className="
text-4xl
md:text-5xl
font-bold
leading-tight
text-[#163C80]
mb-6
"

>

{article.title}

</h1>






{/* EXCERPT */}

{

article.excerpt &&

<p

className="
text-xl
leading-relaxed
text-gray-600
mb-8
"

>

{article.excerpt}

</p>

}







{/* META */}

<div

className="
flex
flex-wrap
gap-6
text-sm
text-gray-500
border-t
pt-5
"

>

<span>

NationPath Editorial Desk

</span>


<span>

{
new Date(
article.publishedAt || article.createdAt
).toLocaleDateString(
"en-IN"
)

}

</span>



</div>







{/* SHARE */}

<div

className="
mt-6
"

>

<Link

href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}

target="_blank"

className="
inline-flex
items-center
px-5
py-2
rounded-full
bg-[#163C80]
text-white
text-sm
"

>

Share Insight

</Link>


</div>



</section>


);

}