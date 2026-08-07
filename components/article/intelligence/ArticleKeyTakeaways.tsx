interface ArticleKeyTakeawaysProps {

  keyTakeaways:string[];

}



export default function ArticleKeyTakeaways({

  keyTakeaways,

}:ArticleKeyTakeawaysProps){



if(

  !Array.isArray(keyTakeaways)

  ||

  keyTakeaways.length===0

){

  return null;

}





return (

<div

className="
mx-auto
w-full
md:w-[85%]
space-y-3
"

>


{

keyTakeaways.map(

(item,index)=>(


<div

key={`${item}-${index}`}

className="
relative
overflow-hidden
rounded-xl
border
border-[#FED7AA]
bg-gradient-to-br
from-[#FFF8F0]
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



{/* INSIGHT ACCENT SYSTEM */}

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
bg-[#EA661B]/40
"

/>



<div

className="
absolute
left-4
top-0
h-full
w-[1px]
bg-[#EA661B]/20
"

/>





<div

className="
pl-6
flex
items-start
gap-3
"

>



<div

className="
mt-2
h-2
w-2
shrink-0
rounded-full
bg-[#EA661B]
"

></div>





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



</div>


)

)

}



</div>

);

}