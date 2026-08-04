"use client";

import Image from "next/image";
import Link from "next/link";


interface Props{

articles:any[];

}



export default function EditorialGrid({
articles
}:Props){



if(
!articles ||
articles.length===0
){

return null;

}





return (

<section

className="
mt-16
border-t
pt-12
"

>



<h2

className="
text-3xl
font-bold
text-[#163C80]
mb-8
"

>

More Insights

</h2>





<div

className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-3
gap-8
"

>


{

articles.map(
(item:any,index:number)=>(


<article

key={item.id || index}

className="
rounded-2xl
overflow-hidden
border
bg-white
hover:shadow-xl
transition
"

>





{
item.images?.[0] &&


<div

className="
relative
aspect-video
"

>


<Image

src={
item.images[0]
}

alt={
item.title ||
"NationPath Insight image"
}

fill

className="
object-cover
"

/>


</div>


}





<div

className="
p-5
"

>



<p

className="
text-xs
uppercase
tracking-widest
text-orange-600
mb-3
"

>

Insight

</p>






<h3

className="
text-xl
font-bold
leading-snug
text-gray-900
"

>

<Link

href={`/editorial/${item.slug}`}

>

{item.title}

</Link>

</h3>





{
item.excerpt &&

<p

className="
mt-3
text-gray-600
line-clamp-3
"

>

{item.excerpt}

</p>

}





<Link

href={`/editorial/${item.slug}`}

className="
inline-block
mt-5
font-semibold
text-[#163C80]
"

>

Read Analysis →

</Link>




</div>



</article>


)

)


}


</div>




</section>


);


}