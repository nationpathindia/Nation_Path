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

<div

className="
mx-auto
my-10
w-full
md:w-[85%]
"

>


<section

className="
relative
overflow-hidden
rounded-xl
border
border-[#D9E5FF]
bg-gradient-to-br
from-[#F3F7FF]
via-white
to-white
p-5
shadow-sm
transition-all
duration-300
hover:shadow-md
"

>



{/* THREE SHADE ACCENT */}

<div

className="
absolute
left-0
top-0
h-full
w-[2px]
bg-[#163C80]
"

/>



<div

className="
absolute
left-2
top-0
h-full
w-[1px]
bg-[#234E9A]/50
"

/>



<div

className="
absolute
left-4
top-0
h-full
w-[1px]
bg-[#D9E5FF]
"

/>







<div

className="
pl-6
"

>



{/* HEADER */}

<div

className="
mb-5
"

>


<p

className="
text-[11px]
font-bold
uppercase
tracking-[0.22em]
text-[#EA661B]
"

>

Editorial Insight

</p>



<h2

className="
mt-1
text-2xl
font-black
tracking-tight
text-[#163C80]
"

>

Key Highlights

</h2>



<p

className="
mt-1
text-sm
leading-6
text-gray-500
"

>

Important points readers should notice.

</p>



</div>







{/* CONTENT */}

<div

className="
space-y-2
"

>


{

highlights

.slice(0,6)

.map(

(item,index)=>(


<div

key={`${item}-${index}`}

className="
flex
items-start
gap-3
rounded-lg
border
border-gray-100
bg-white/70
px-4
py-3
transition-all
duration-300
hover:bg-[#FAFCFF]
"

>


<span

className="
mt-2
h-2
w-2
shrink-0
rounded-full
bg-[#EA661B]
"

/>



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


)

)



}



</div>



</div>



</section>



</div>

);

}