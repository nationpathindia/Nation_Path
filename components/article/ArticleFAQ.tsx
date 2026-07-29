"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";


interface FAQItem {

  question:string;

  answer:string;

}


interface ArticleFAQProps {

  faqItems?: FAQItem[];

}



export default function ArticleFAQ({

  faqItems = []

}: ArticleFAQProps){


const [openIndex,setOpenIndex] =
useState<number | null>(0);



if(
!faqItems.length
){

return null;

}



return (

<section

className="
my-10
md:my-14
"

>


<div

className="
rounded-2xl
border
border-blue-100
bg-white
shadow-sm
overflow-hidden
"

>


<div

className="
px-5
py-5
md:px-8
border-b
border-blue-100
bg-gradient-to-r
from-blue-50
to-orange-50
"

>


<h2

className="
text-xl
md:text-2xl
font-bold
text-slate-900
"

>

Frequently Asked Questions

</h2>


<p

className="
text-sm
text-slate-600
mt-2
"

>

Important questions explained for readers.

</p>


</div>





<div

className="
divide-y
divide-gray-100
"

>


{

faqItems.map(

(item,index)=>(


<div

key={index}

className="
px-5
md:px-8
"

>


<button

type="button"

onClick={()=>


setOpenIndex(

openIndex === index

?

null

:

index

)


}

className="
w-full
flex
items-center
justify-between
gap-4
py-5
text-left
"

>


<span

className="
font-semibold
text-slate-900
text-sm
md:text-base
"

>

{item.question}

</span>



<ChevronDown

size={20}

className={`

text-orange-500

transition-transform

${

openIndex === index

?

"rotate-180"

:

""

}

`}

/>


</button>





{

openIndex === index &&

<div

className="
pb-5
text-sm
md:text-base
leading-7
text-slate-600
"

>

{item.answer}

</div>

}



</div>


)

)


}


</div>


</div>


</section>

);


}