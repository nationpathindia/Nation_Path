"use client";


interface Props {

  whyItMatters?: string | null;

}



export default function ArticleWhyItMatters({

  whyItMatters,

}:Props){



if(

  !whyItMatters

  ||

  !whyItMatters.trim()

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
border-orange-200
bg-gradient-to-br
from-[#FFF8F0]
via-white
to-white
p-5
shadow-sm
transition-all
duration-300
hover:shadow-md
"

>



{/* LEFT THREE SHADE LINES */}


<div

className="
absolute
left-0
top-0
h-full
w-[2px]
bg-[#EA661B]
"

/>



<div

className="
absolute
left-2
top-0
h-full
w-[1px]
bg-[#F6B37A]
"

/>



<div

className="
absolute
left-4
top-0
h-full
w-[1px]
bg-[#FDE8D3]
"

/>







<div

className="
pl-7
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

Editorial Analysis

</p>



<h2

className="
mt-1
text-2xl
font-black
tracking-tight
text-gray-900
"

>

Why This Matters

</h2>






{/* THREE HORIZONTAL SHADE LINES */}


<div

className="
mt-4
flex
items-center
gap-2
"

>


<div

className="
h-[2px]
w-10
rounded-full
bg-[#EA661B]
"

/>



<div

className="
h-[2px]
w-10
rounded-full
bg-[#F6B37A]
"

/>



<div

className="
h-[2px]
w-10
rounded-full
bg-[#FDE8D3]
"

/>



</div>



</div>







{/* CONTENT */}


<div

className="
rounded-lg
border
border-orange-100
bg-white/70
px-5
py-4
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




</div>



</section>



</div>

);

}