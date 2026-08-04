import React from "react";


interface ArticleIntelligenceSectionProps {

  title:string;

  children:React.ReactNode;

}





export default function ArticleIntelligenceSection({

  title,

  children,

}:ArticleIntelligenceSectionProps){



return (

<section

className="

border-b

border-gray-200

pb-10

last:border-b-0

last:pb-0

"

>



<h3

className="

mb-6

flex

items-center

gap-3

text-lg

font-bold

tracking-tight

text-[#163C80]

"

>


<span

className="

flex

h-2

w-2

shrink-0

rounded-full

bg-[#EA661B]

"

/>



{title}



</h3>







<div

className="

max-w-none

text-[15px]

leading-8

text-gray-700

"

>

{children}

</div>





</section>


);


}