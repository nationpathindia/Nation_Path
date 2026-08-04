"use client";

import {
  useEffect,
  useState
} from "react";

import Link from "next/link";



interface PollOption {

  id:string;

  text:string;

  votes:number;

  percentage:number;

}



interface PollData {

  id:string;

  question:string;

  category?:string | null;

  totalVotes:number;

  expiresAt:string;

  options:PollOption[];

}






export default function PollOfDay(){



const [poll,setPoll] =
useState<PollData | null>(null);



const [selected,setSelected] =
useState<string | null>(null);



const [loading,setLoading] =
useState(true);



const [voting,setVoting] =
useState(false);



const [voted,setVoted] =
useState(false);



const [message,setMessage] =
useState("");









/*
====================================================
 LOAD ACTIVE POLL
====================================================
*/


useEffect(()=>{


async function loadPoll(){


try{


const res =
await fetch(

"/api/polls",

{
cache:"no-store"
}

);



const data =
await res.json();




if(data.success){


setPoll(data.poll);


}


}
catch(error){


console.error(

"Poll load error",

error

);


}
finally{


setLoading(false);


}



}



loadPoll();



},[]);












/*
====================================================
 SUBMIT VOTE
====================================================
*/


async function submitVote(){



if(
!poll ||
!selected ||
voting ||
voted
)
return;




try{


setVoting(true);

setMessage("");





const res =
await fetch(

`/api/polls/${poll.id}/vote`,

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},


body:JSON.stringify({

optionId:selected

})


}

);





const data =
await res.json();






if(!data.success){


setMessage(

data.error ||
"Vote failed"

);


return;


}







setPoll({

...poll,


totalVotes:
data.poll.totalVotes,


options:
data.poll.options


});





setVoted(true);



setMessage(

"Your vote has been recorded"

);





}
catch(error){


console.error(

"Vote error",

error

);



setMessage(

"Something went wrong"

);



}
finally{


setVoting(false);


}



}









if(
loading ||
!poll
)

return null;








return (


<section

className="
mt-8
"

>


<div

className="
border
border-gray-200
bg-white
"

>







{/* HEADER */}

<div

className="
bg-[#0B1F3A]
px-6
py-5
flex
items-center
justify-between
"

>


<div>


<p

className="
text-[11px]
uppercase
tracking-[0.3em]
font-semibold
text-orange-300
"

>

NationPath Opinion

</p>



<h2

className="
text-xl
font-bold
text-white
mt-1
"

>

Poll of the Day

</h2>


</div>








<Link

href="/polls"

className="
text-sm
font-semibold
text-white
hover:text-[#EA661B]
transition
"

>

View Full Poll →

</Link>



</div>









{/* CONTENT */}


<div

className="
p-6
"

>





{

poll.category &&


<p

className="
text-xs
uppercase
tracking-widest
text-[#EA661B]
font-semibold
mb-3
"

>

{poll.category}

</p>


}









<h3

className="
text-2xl
font-bold
leading-snug
text-[#0B1F3A]
mb-6
"

>

{poll.question}

</h3>









<div

className="
space-y-4
"

>





{

poll.options.map(

(option)=>(



<button


key={option.id}



disabled={

voted ||

voting

}



onClick={()=>{


setSelected(option.id);


setMessage("");



}}





className={`

w-full

text-left

border

p-4

transition


${
selected===option.id

?

"border-[#EA661B] bg-orange-50"

:

"border-gray-200 hover:border-[#0B1F3A]"

}


${
voted

?

"cursor-default"

:

""

}


`}



>







<div

className="
flex
justify-between
items-center
gap-4
"

>


<span

className="
font-medium
text-gray-800
"

>

{option.text}

</span>




<span

className="
font-bold
text-[#0B1F3A]
"

>

{option.percentage}%

</span>



</div>










<div

className="
mt-3
h-2
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







</button>



)

)



}



</div>












<button


onClick={submitVote}



disabled={

!selected ||

voting ||

voted

}




className={`

mt-6

w-full

py-3

text-sm

font-semibold

transition


${
selected && !voted

?

"bg-[#0B1F3A] text-white hover:bg-[#142B4A]"

:

"bg-gray-200 text-gray-500"

}

`}


>



{

voting

?

"Submitting..."

:

voted

?

"Vote Submitted ✓"

:

"Vote Now"

}


</button>









{

message &&


<p

className="
mt-3
text-center
text-sm
text-gray-500
"

>

{message}

</p>


}









<div

className="
mt-6
pt-5
border-t
border-gray-200
flex
justify-between
text-sm
text-gray-500
"

>


<span>

{poll.totalVotes.toLocaleString()} votes

</span>




<span>

Ends:

{" "}

{

new Date(
poll.expiresAt
)
.toLocaleTimeString(

[],

{

hour:"2-digit",

minute:"2-digit"

}

)

}


</span>




</div>






</div>







</div>



</section>


);


}