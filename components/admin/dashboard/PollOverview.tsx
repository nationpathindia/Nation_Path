"use client";


interface Props{

poll:any;

recent:any[];

}



export default function PollOverview({

poll,

recent

}:Props){



return(


<div

className="
bg-black/30
backdrop-blur-xl
border
border-white/10
rounded-xl
p-6
"

>



<h2 className="text-lg font-semibold mb-5">

Poll Intelligence

</h2>



{

poll ? (


<div>


<p

className="
font-medium
mb-4
"

>

{poll.question}

</p>



<div className="space-y-3">


{
poll.options?.map((option:any)=>(


<div

key={option.id}

className="
flex
justify-between
text-sm
"

>

<span>

{option.text}

</span>


<span className="text-gray-400">

{option.votes}

</span>


</div>


))

}


</div>



<p

className="
text-sm
text-gray-400
mt-4
"

>

Total Votes: {poll.totalVotes || 0}

</p>


</div>


)

:


<p className="text-gray-400">

No active poll

</p>


}



</div>


)


}