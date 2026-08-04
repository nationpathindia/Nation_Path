import Link from "next/link";



interface PollOption {

  id:string;

  text:string;

  votes:number;

  percentage:number;

}





interface Poll {

  id:string;

  slug?:string | null;

  question:string;

  category?:string | null;

  totalVotes:number;

  expiresAt:string;

  options:PollOption[];

}





interface Props {

  polls:Poll[];

}









export default function PollArchive({

  polls

}:Props){





if(
!polls ||
polls.length===0
){

return null;

}







return (


<section

className="
max-w-6xl
mx-auto
px-5
pb-14
"

>


<div

className="
border-t
border-gray-200
pt-10
"

>





<p

className="
text-xs
uppercase
tracking-[0.25em]
font-semibold
text-[#EA661B]
mb-3
"

>

ARCHIVE

</p>






<h2

className="
text-3xl
font-bold
text-[#163C80]
mb-8
"

>

Previous Polls

</h2>









<div

className="
grid
md:grid-cols-2
gap-8
"

>





{

polls.map(

poll=>(


<Link

key={poll.id}

href={

poll.slug

?

`/polls/${poll.slug}`

:

"#"

}

className="

block

group

"

>


<article

className="

border

border-gray-200

bg-white

p-6

transition

duration-300

hover:shadow-lg

hover:border-[#163C80]

"

>







{
poll.category &&

<p

className="
text-xs
uppercase
tracking-wide
text-gray-500
mb-3
"

>

{poll.category}

</p>

}









<h3

className="
text-xl
font-bold
text-[#163C80]
leading-snug
group-hover:text-[#EA661B]
transition
"

>

{poll.question}

</h3>









<div

className="
mt-4
flex
gap-5
text-sm
text-gray-500
"

>


<span>

Closed:

{" "}

{

new Date(

poll.expiresAt

)

.toLocaleDateString()

}

</span>



<span>

{poll.totalVotes.toLocaleString()}

votes

</span>



</div>











<div

className="
mt-6
space-y-4
"

>


{

poll.options.map(

option=>(


<div

key={option.id}

>


<div

className="
flex
justify-between
text-sm
mb-1
"

>


<span

className="
text-gray-700
"

>

{option.text}

</span>




<span

className="
font-bold
text-[#163C80]
"

>

{option.percentage}%

</span>




</div>








<div

className="
h-2
bg-gray-100
overflow-hidden
"

>


<div

className="
h-full
bg-[#163C80]
transition-all
duration-500
"

style={{

width:

`${option.percentage}%`

}}


/>


</div>





</div>


)

)



}






</div>









<div

className="
mt-6
text-sm
font-semibold
text-[#EA661B]
"

>

View Full Results →

</div>







</article>



</Link>



)

)



}








</div>







</div>



</section>



);


}