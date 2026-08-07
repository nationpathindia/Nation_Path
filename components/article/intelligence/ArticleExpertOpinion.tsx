interface ExpertOpinionItem {

  name:string;

  role?:string;

  quote?:string;

  opinion:string;

}



interface ArticleExpertOpinionProps {

  expertOpinion:ExpertOpinionItem[];

}



export default function ArticleExpertOpinion({

  expertOpinion,

}:ArticleExpertOpinionProps){



if(

  !Array.isArray(expertOpinion)

  ||

  expertOpinion.length===0

){

  return null;

}





return (

<div

className="
mx-auto
w-full
md:w-[85%]
space-y-5
"

>


{

expertOpinion.map(

(expert,index)=>(


<article

key={`${expert.name}-${index}`}

className="
relative
overflow-hidden
rounded-xl
border
border-[#DDD6FE]
bg-gradient-to-br
from-[#F8F7FF]
via-white
to-white
px-5
py-5
shadow-sm
transition-all
duration-300
hover:shadow-md
"

>



{/* THOUGHT ACCENT SYSTEM */}

<div

className="
absolute
left-0
top-0
h-full
w-[2px]
bg-[#6D5CE7]
"

/>



<div

className="
absolute
left-2
top-0
h-full
w-[1px]
bg-[#6D5CE7]/40
"

/>



<div

className="
absolute
left-4
top-0
h-full
w-[1px]
bg-[#6D5CE7]/20
"

/>





<div

className="
pl-6
"

>


<div

className="
grid
gap-5
md:grid-cols-[190px_1fr]
md:items-center
"

>




{/* EXPERT PROFILE */}

<div

className="
flex
items-center
gap-4
border-b
border-gray-100
pb-4
md:block
md:border-b-0
md:border-r
md:pb-0
md:pr-5
md:text-center
"

>


<div

className="
mx-auto
flex
h-12
w-12
items-center
justify-center
rounded-full
bg-[#6D5CE7]
text-base
font-bold
text-white
shadow-sm
"

>

{

expert.name

?

expert.name
.charAt(0)
.toUpperCase()

:

"E"

}

</div>





<h4

className="
mt-3
text-base
font-bold
text-gray-900
"

>

{expert.name}

</h4>





{

expert.role &&

<p

className="
mt-1
text-[11px]
font-bold
uppercase
tracking-[0.15em]
text-[#6D5CE7]
"

>

{expert.role}

</p>

}



</div>









{/* OPINION CONTENT */}

<div>



{

expert.quote &&

<div

className="
mb-4
rounded-lg
border-l-2
border-[#6D5CE7]
bg-white/70
px-4
py-3
"

>


<p

className="
text-sm
italic
leading-7
text-gray-500
"

>

"{expert.quote}"

</p>


</div>

}







{

expert.opinion &&

<p

className="
text-[15px]
leading-8
text-gray-700
"

>

{expert.opinion}

</p>

}



</div>






</div>



</div>



</article>


)

)

}



</div>

);

}