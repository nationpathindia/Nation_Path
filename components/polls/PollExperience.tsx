"use client";

import {
  useEffect,
  useState
} from "react";

import PollOption from "./PollOption";
import PollResults from "./PollResults";



interface PollOptionType {

  id:string;

  text:string;

  votes:number;

  percentage:number;

}



interface PollType {

  id:string;

  question:string;

  category?:string | null;

  totalVotes:number;

  expiresAt:string;

  options:PollOptionType[];

}



interface Props {

  poll:PollType;

}




export default function PollExperience({

  poll

}:Props){



const [currentPoll,setCurrentPoll] =
useState(poll);



const [selectedOption,setSelectedOption] =
useState("");



const [voted,setVoted] =
useState(false);



const [loading,setLoading] =
useState(false);



const [timeLeft,setTimeLeft] =
useState("");





/*
========================================
COUNTDOWN
========================================
*/


useEffect(()=>{


const timer = setInterval(()=>{


const diff =
new Date(
currentPoll.expiresAt
).getTime()
-
Date.now();



if(diff <= 0){

setTimeLeft(
"Closed"
);

return;

}



const hours =
Math.floor(
diff /
(1000*60*60)
);



const minutes =
Math.floor(
(diff %
(1000*60*60))
/
(1000*60)
);



setTimeLeft(
`${hours}h ${minutes}m remaining`
);



},1000);



return ()=>clearInterval(timer);



},[
currentPoll.expiresAt
]);








/*
========================================
VOTE
========================================
*/


async function submitVote(){


if(
!selectedOption ||
loading ||
voted
)
return;



try{


setLoading(true);



const res =
await fetch(

`/api/polls/${currentPoll.id}/vote`,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

optionId:selectedOption

})

}

);





const data =
await res.json();





if(data.success){


setCurrentPoll(
data.poll
);


setVoted(true);


}



}
catch(error){


console.error(
error
);


}
finally{


setLoading(false);


}



}








return (

<section

className="
max-w-6xl
mx-auto
px-5
py-12
"

>


<div

className="
border-y
border-gray-200
py-10
"

>





{/* TITLE */}


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
mb-3
"

>

NationPath Opinion

</p>




<h1

className="
text-3xl
md:text-5xl
font-bold
text-[#163C80]
leading-tight
"

>

{currentPoll.question}

</h1>






<div

className="
mt-5
flex
flex-wrap
gap-5
text-sm
text-gray-500
"

>


{
currentPoll.category &&

<span>

{currentPoll.category}

</span>

}




<span>

{currentPoll.totalVotes.toLocaleString()}
votes

</span>



<span>

{timeLeft}

</span>



</div>




</div>









{
voted ?



<PollResults

poll={currentPoll}

/>



:



<div

className="
max-w-3xl
space-y-4
"

>


{

currentPoll.options.map(

(option)=>(


<PollOption

key={option.id}

option={option}

selected={
selectedOption === option.id
}

onSelect={
setSelectedOption
}

/>


)

)



}




<button

onClick={submitVote}

disabled={
!selectedOption ||
loading
}


className="

mt-6

px-8
py-3

bg-[#163C80]

text-white

font-semibold

text-sm

tracking-wide

hover:bg-[#EA661B]

transition

disabled:opacity-40

"

>

{

loading

?

"CASTING..."

:

"CAST YOUR VOTE →"

}


</button>



</div>



}





</div>


</section>


);


}