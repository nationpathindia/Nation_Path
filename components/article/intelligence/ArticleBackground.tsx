interface ArticleBackgroundProps {

  background:string;

}



export default function ArticleBackground({

  background,

}:ArticleBackgroundProps){



if(

  !background ||

  !background.trim()

){

  return null;

}



return (

<div

className="
relative
mx-auto
w-full
md:w-[85%]
overflow-hidden
rounded-xl
border
border-[#E7DFD2]
bg-gradient-to-br
from-[#FAF7F1]
to-white
px-6
py-5
shadow-sm
"

>



{/* EDITORIAL ACCENT SYSTEM */}

<div

className="
absolute
left-0
top-0
h-full
w-[2px]
bg-[#8B6A25]
"

/>



<div

className="
absolute
left-2
top-0
h-full
w-[1px]
bg-[#B8862D]/40
"

/>



<div

className="
absolute
left-4
top-0
h-full
w-[1px]
bg-[#B8862D]/20
"

/>



<div

className="
absolute
left-6
top-0
h-full
w-[1px]
bg-[#B8862D]/10
"

/>





{/* CONTENT */}

<div

className="
pl-6
"

>


<p

className="
text-[15px]
leading-8
text-gray-700
"

>

{background}

</p>



</div>



</div>

);

}