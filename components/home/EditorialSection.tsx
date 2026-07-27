import Link from "next/link";
import SectionHeader from "@/components/common/SectionHeader";


interface EditorialSectionProps {
  articles:any[];
}



export default function EditorialSection({
  articles,
}:EditorialSectionProps){


if(!articles?.length)
return null;




const featured = articles[0];

const others = articles.slice(1);




return (

<section

className="
py-12
sm:py-16
border-t
border-black/10
"

>





<SectionHeader title="Editorial"/>








<div

className="
grid
grid-cols-1
lg:grid-cols-12
gap-8
"

>








{/* FEATURE EDITORIAL */}


<Link

href={`/editorial/${featured.slug}`}

className="
lg:col-span-7
group
block
border
border-black/10
rounded-xl
p-6
sm:p-8
hover:shadow-md
transition
"

>





<div

className="
flex
items-center
gap-3
mb-5
"

>


<span

className="
w-8
h-[2px]
bg-[#0b2a6f]
"

/>



<span

className="
text-[11px]
uppercase
tracking-[0.28em]
font-semibold
text-[#0b2a6f]
"

>

Opinion Desk

</span>



</div>








<h2

className="
font-serif
font-bold
text-3xl
sm:text-4xl
leading-tight
tracking-tight
text-[#111]
group-hover:text-[#0b2a6f]
transition-colors
"

>

{featured.title}

</h2>







<p

className="
mt-5
text-gray-600
leading-7
line-clamp-3
"

>

{featured.excerpt || "Analysis, perspectives and expert opinions from NationPath Editorial Desk."}

</p>







<div

className="
mt-6
text-[10px]
uppercase
tracking-widest
text-gray-500
"

>

NationPath Editorial

</div>






</Link>









{/* OTHER EDITORIALS */}


<div

className="
lg:col-span-5
divide-y
divide-black/10
"

>


{

others.map((article:any)=>(


<Link

key={article.id}

href={`/editorial/${article.slug}`}

className="
block
py-5
first:pt-0
group
"

>





<div

className="
flex
items-center
gap-2
mb-2
"

>


<span

className="
w-4
h-[2px]
bg-[#0b2a6f]
"

/>



<span

className="
text-[10px]
uppercase
tracking-[0.22em]
font-semibold
text-[#0b2a6f]
"

>

Editorial

</span>



</div>







<h3

className="
font-serif
text-xl
leading-snug
text-[#111]
group-hover:text-[#0b2a6f]
transition-colors
"

>

{article.title}

</h3>






<div

className="
mt-3
text-[10px]
uppercase
tracking-widest
text-gray-500
"

>

NationPath Desk

</div>





</Link>


))

}



</div>








</div>






</section>

);


}