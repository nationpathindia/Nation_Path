"use client";


interface Props {

  whyItMatters?: string | null;

}



export default function ArticleWhyItMatters({

  whyItMatters,

}:Props){



if(
  !whyItMatters ||
  !whyItMatters.trim()
){

  return null;

}





return (

<section

className="

my-12

relative

overflow-hidden

rounded-2xl

border

border-gray-200

bg-white

p-6

sm:p-8

"

>





{/* ACCENT */}

<div

className="

absolute

left-0

top-0

h-full

w-1

bg-[#EA661B]

"

/>








{/* HEADER */}

<header

className="

mb-6

flex

items-start

gap-4

"

>




<div

className="

flex

h-10

w-10

shrink-0

items-center

justify-center

rounded-xl

bg-[#EA661B]

text-white

text-lg

"

>

💡

</div>







<div>


<p

className="

text-[10px]

font-bold

uppercase

tracking-[0.25em]

text-[#EA661B]

"

>

Editorial Analysis

</p>





<h2

className="

mt-1

font-serif

text-2xl

font-bold

tracking-tight

text-gray-900

"

>

Why This Matters

</h2>




</div>




</header>









{/* CONTENT */}



<div

className="

rounded-xl

bg-[#FFF9F4]

px-5

py-5

sm:px-6

"

>


<p

className="

text-[15px]

leading-8

text-gray-700

sm:text-base

"

>

{whyItMatters}

</p>



</div>






</section>


);

}