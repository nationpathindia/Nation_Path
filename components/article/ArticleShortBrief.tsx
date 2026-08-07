import Image from "next/image";


interface ArticleShortBriefProps {

  shortBrief:string;

}



export default function ArticleShortBrief({

  shortBrief,

}:ArticleShortBriefProps){



if(

  !shortBrief

  ||

  !shortBrief.trim()

){

  return null;

}





const paragraphs = shortBrief

.split(/\n+/)

.map((text)=>text.trim())

.filter(Boolean);





return (

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
pl-7
pr-4
py-4
sm:pl-8
sm:pr-5
sm:py-5
shadow-sm
transition-all
duration-300
hover:shadow-md
"

>



{/* LEFT THREE SHADE ACCENT */}


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
bg-[#234E9A]
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







{/* TOP GLASS LINE */}


<div

className="
absolute
left-0
top-0
h-[2px]
w-full
"

>


<div

className="
h-full
w-full
bg-gradient-to-r
from-[#163C80]
via-[#234E9A]
to-[#D9E5FF]
"

/>



</div>







{/* HEADER */}


<div

className="
flex
flex-col
gap-3
border-b
border-gray-200
pb-3
sm:flex-row
sm:items-center
sm:justify-between
"

>



<div

className="
flex
items-center
gap-3
"

>


<div

className="
flex
h-9
w-9
items-center
justify-center
overflow-hidden
rounded-lg
border
border-gray-200
bg-white
shadow-sm
"

>


<Image

src="/idlogo.png"

alt="NationPath India"

width={28}

height={28}

priority

/>


</div>





<div>


<h2

className="
text-xl
font-black
tracking-tight
text-[#163C80]
"

>

NationPath Brief

</h2>



<p

className="
mt-0.5
text-[11px]
font-medium
text-gray-500
"

>

Essential context before you continue reading

</p>



</div>


</div>







<span

className="
rounded-full
border
border-[#163C80]/20
bg-[#163C80]/5
px-3
py-1
text-[10px]
font-bold
uppercase
tracking-wider
text-[#163C80]
"

>

30 sec overview

</span>



</div>







{/* THREE EDITORIAL GLASS MARKS */}


<div

className="
my-3
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
bg-[#163C80]
"

/>



<div

className="
h-[2px]
w-10
rounded-full
bg-[#234E9A]
"

/>



<div

className="
h-[2px]
w-10
rounded-full
bg-[#D9E5FF]
"

/>



</div>







{/* BODY */}


<div

className="
mx-auto
max-w-4xl
"

>



<div

className="
flex
items-start
gap-3
"

>


<span

className="
select-none
text-4xl
font-bold
leading-none
text-[#EA661B]/30
"

>

“

</span>





<div

className="
flex-1
space-y-3
text-[15px]
leading-7
text-gray-700
sm:text-[16px]
"

>


{

paragraphs.map(

(paragraph,index)=>(


<p

key={index}

>

{paragraph}

</p>


)

)

}



</div>



</div>



</div>







{/* FOOTER */}


<div

className="
mt-3
flex
items-center
gap-2
border-t
border-gray-200
pt-2
text-[11px]
"

>


<span

className="
h-2
w-2
rounded-full
bg-[#EA661B]
"

/>



<span

className="
font-semibold
text-[#163C80]
"

>

Editorial Brief

</span>



<span

className="
text-gray-400
"

>

• Quick summary curated for readers

</span>



</div>





</section>

);

}