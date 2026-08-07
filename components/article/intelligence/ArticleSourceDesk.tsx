interface ArticleSourceDeskProps {

  sourceDesk:string;

}



export default function ArticleSourceDesk({

  sourceDesk,

}:ArticleSourceDeskProps){



if(

  !sourceDesk

  ||

  !sourceDesk.trim()

){

  return null;

}





return (

<div

className="
mx-auto
w-full
md:w-[85%]
"

>


<div

className="
relative
overflow-hidden
rounded-xl
border
border-slate-200
bg-gradient-to-br
from-[#F8FAFC]
via-white
to-white
px-5
py-4
shadow-sm
transition-all
duration-300
hover:shadow-md
"

>



{/* SOURCE TRUST ACCENT SYSTEM */}

<div

className="
absolute
left-0
top-0
h-full
w-[2px]
bg-[#334155]
"

/>



<div

className="
absolute
left-2
top-0
h-full
w-[1px]
bg-[#334155]/40
"

/>



<div

className="
absolute
left-4
top-0
h-full
w-[1px]
bg-[#334155]/20
"

/>







<div

className="
pl-6
flex
items-center
justify-between
gap-5
"

>



{/* SOURCE INFO */}

<div>


<p

className="
text-[11px]
font-bold
uppercase
tracking-[0.2em]
text-[#334155]
"

>

Editorial Source

</p>



<h4

className="
mt-2
text-base
font-semibold
text-gray-900
"

>

{sourceDesk}

</h4>



</div>







{/* VERIFIED */}

<div

className="
flex
shrink-0
items-center
gap-2
rounded-full
border
border-green-200
bg-green-50
px-3
py-1.5
text-xs
font-semibold
text-green-700
"

>


<span

className="
h-2
w-2
rounded-full
bg-green-500
"

></span>


Verified Desk


</div>





</div>



</div>



</div>

);

}