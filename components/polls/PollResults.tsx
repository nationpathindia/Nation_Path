interface PollOption {

  id:string;

  text:string;

  votes:number;

  percentage:number;

}



interface Poll {

  question:string;

  totalVotes:number;

  options:PollOption[];

}



interface Props {

  poll:Poll;

}







export default function PollResults({

  poll

}:Props){



return (

<div

className="
max-w-3xl
"

>



{/* Result Header */}


<div

className="
mb-8
"

>


<p

className="
text-xs
uppercase
tracking-[0.25em]
font-semibold
text-[#EA661B]
mb-2
"

>

LIVE RESULTS

</p>



<h3

className="
text-2xl
font-bold
text-[#163C80]
"

>

Public Opinion Snapshot

</h3>



<p

className="
mt-2
text-sm
text-gray-500
"

>

Based on

{" "}

<strong>

{poll.totalVotes.toLocaleString()}

</strong>

{" "}

votes

</p>



</div>









{/* Results */}


<div

className="
space-y-7
"

>



{

poll.options.map(

(option)=>(


<div

key={option.id}

>



<div

className="
flex
justify-between
items-center
mb-2
"

>


<span

className="
text-base
font-medium
text-gray-800
"

>

{option.text}

</span>




<span

className="
text-lg
font-bold
text-[#163C80]
"

>

{option.percentage}%

</span>



</div>







<div

className="
h-3
bg-gray-100
overflow-hidden
"

>


<div

className="
h-full
bg-[#EA661B]
transition-all
duration-700
"

style={{

width:

`${option.percentage}%`

}}



/>


</div>







<p

className="
mt-2
text-xs
text-gray-500
"

>

{option.votes.toLocaleString()}
votes

</p>




</div>


)

)



}





</div>








{/* Footer */}


<div

className="
mt-10
pt-6
border-t
border-gray-200
"

>


<p

className="
text-sm
text-gray-500
"

>

Thank you for participating in NationPath Opinion.

</p>



</div>





</div>


);


}