"use client";


interface Props {

  highlights?: string[];

}



export default function ArticleKeyHighlights({

  highlights = [],

}:Props){



if(
  !highlights.length
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





{/* LEFT ACCENT */}

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

mb-7

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

bg-[#163C80]

text-white

text-lg

"

>

★

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

Editorial Insight

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

Key Highlights

</h2>



</div>




</header>









{/* HIGHLIGHTS */}

<div

className="

space-y-3

"

>


{

highlights

.slice(0,6)

.map((item,index)=>(


<div

key={`${item}-${index}`}

className="

flex

items-start

gap-4

rounded-xl

bg-gray-50

px-4

py-4

transition

hover:bg-[#FAFCFF]

"

>


<span

className="

mt-0.5

flex

h-7

w-7

shrink-0

items-center

justify-center

rounded-full

bg-[#163C80]

text-xs

font-bold

text-white

"

>

{index+1}

</span>





<p

className="

text-[15px]

leading-7

text-gray-700

"

>

{item}

</p>



</div>


))


}


</div>






</section>


);

}