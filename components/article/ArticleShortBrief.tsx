interface ArticleShortBriefProps {

  shortBrief:string;

}



export default function ArticleShortBrief({

  shortBrief,

}:ArticleShortBriefProps){



if(
  !shortBrief ||
  !shortBrief.trim()
){

  return null;

}





return (

<section

className="

my-10

relative

overflow-hidden

rounded-3xl

border

border-gray-200

bg-gradient-to-br

from-gray-50

to-white

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

w-1.5

bg-[#EA661B]

"

/>







<div

className="

relative

"

>





{/* HEADER */}

<div

className="

mb-5

flex

items-center

gap-3

"

>


<span

className="

flex

h-8

w-8

items-center

justify-center

rounded-full

bg-[#163C80]

text-sm

font-bold

text-white

"

>

N

</span>





<p

className="

text-xs

font-bold

uppercase

tracking-[0.22em]

text-[#163C80]

"

>

NationPath Brief

</p>



</div>








{/* CONTENT */}

<p

className="

max-w-3xl

text-base

leading-8

text-gray-800

sm:text-lg

"

>

{shortBrief}

</p>







{/* FOOTER */}

<div

className="

mt-6

flex

items-center

gap-2

text-xs

font-medium

uppercase

tracking-wider

text-gray-400

"

>


<span

className="

h-1.5

w-1.5

rounded-full

bg-[#EA661B]

"

/>



Editorial Snapshot



</div>






</div>





</section>


);

}