import Link from "next/link";
import { prisma } from "@/lib/prisma";


export const dynamic = "force-dynamic";



export default async function PollsPage(){


const now = new Date();



const polls =
await prisma.poll.findMany({

include:{
options:true
},

orderBy:{
createdAt:"desc"
}

});




const total =
polls.length;



const active =
polls.filter(

(poll)=>

poll.status==="published"

&&

poll.expiresAt

&&

poll.expiresAt > now

).length;



const expired =
polls.filter(

(poll)=>

poll.expiresAt

&&

poll.expiresAt <= now

).length;



const totalVotes =
polls.reduce(

(sum,poll)=>

sum + (poll.totalVotes || 0),

0

);





return (

<div

className="
min-h-screen
bg-[#050816]
text-white
p-4
md:p-8
space-y-8
"

>





{/* HEADER */}

<div

className="
flex
flex-col
md:flex-row
md:justify-between
md:items-center
gap-5
"

>


<div>


<h1

className="
text-3xl
font-bold
"

>

Poll Management

</h1>



<p

className="
text-orange-400
mt-2
"

>

NationPath Poll of the Day Control Center

</p>


</div>




<Link

href="/admin/polls/create"

className="
bg-orange-600
hover:bg-orange-700
text-white
px-5
py-3
rounded-xl
font-semibold
transition
"

>

+ Create Poll

</Link>



</div>







{/* STATS */}


<div

className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-5
"

>


<Card

title="Total Polls"

value={total}

/>




<Card

title="Active"

value={active}

color="text-green-400"

/>




<Card

title="Expired"

value={expired}

color="text-red-400"

/>





<Card

title="Total Votes"

value={totalVotes.toLocaleString()}

color="text-orange-400"

/>



</div>










{/* TABLE */}


<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
overflow-hidden
"

>





<div

className="
px-6
py-5
border-b
border-white/10
flex
justify-between
items-center
"

>


<h2

className="
font-semibold
text-lg
"

>

All Polls

</h2>



<span

className="
text-sm
text-gray-400
"

>

{polls.length} records

</span>



</div>









<div

className="
overflow-x-auto
"

>


<table

className="
w-full
text-left
"

>




<thead

className="
bg-black/30
text-sm
text-gray-400
"

>


<tr>


<th className="p-4">
Poll
</th>


<th className="p-4">
Options
</th>


<th className="p-4">
Status
</th>


<th className="p-4">
Votes
</th>


<th className="p-4">
Expiry
</th>


<th className="p-4">
Action
</th>


</tr>


</thead>







<tbody>


{

polls.map(

(poll)=>(


<tr

key={poll.id}

className="
border-t
border-white/10
hover:bg-white/5
transition
"

>



<td

className="
p-4
max-w-sm
"

>


<p

className="
font-semibold
"

>

{poll.question}

</p>



<p

className="
text-xs
text-gray-400
mt-2
"

>

{poll.category || "General"}

</p>


</td>







<td

className="
p-4
"

>


<div

className="
space-y-2
"

>


{

poll.options

.slice(0,3)

.map(

(option)=>(


<div

key={option.id}

className="
text-sm
text-gray-300
"

>

{option.text}


<span

className="
ml-2
text-orange-400
font-semibold
"

>

({option.votes})

</span>


</div>


)

)

}



</div>


</td>









<td

className="
p-4
"

>


<StatusBadge

status={poll.status}

expired={

Boolean(
poll.expiresAt &&
poll.expiresAt <= now
)

}

/>


</td>







<td

className="
p-4
font-semibold
"

>

{poll.totalVotes}



</td>









<td

className="
p-4
text-sm
text-gray-400
"

>


{

poll.expiresAt

?

new Date(
poll.expiresAt
)
.toLocaleString()

:

"-"

}



</td>









<td

className="
p-4
"

>


<Link


href={`/admin/polls/${poll.id}/edit`}


className="
text-orange-400
font-semibold
hover:text-orange-300
transition
"

>

Manage

</Link>



</td>







</tr>


)


)

}








{

polls.length===0 &&


<tr>

<td

colSpan={6}

className="
p-12
text-center
text-gray-400
"

>

No polls created yet

</td>

</tr>


}



</tbody>





</table>



</div>





</div>






</div>


);

}










function Card({

title,

value,

color="text-white"

}:{

title:string;

value:any;

color?:string;

}){


return (

<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-5
"

>


<p

className="
text-sm
text-gray-400
"

>

{title}

</p>



<h2

className={`
text-3xl
font-bold
mt-2
${color}
`}

>

{value}

</h2>



</div>

);


}









function StatusBadge({

status,

expired

}:{

status:string;

expired:boolean;

}){



if(expired)

return (

<span

className="
px-3
py-1
rounded-full
text-xs
font-semibold
bg-orange-500/20
text-orange-400
"

>

Expired

</span>

);



return (

<span

className={`

px-3
py-1
rounded-full
text-xs
font-semibold


${

status==="published"

?

"bg-green-500/20 text-green-400"

:

"bg-gray-500/20 text-gray-300"

}

`}

>

{status}

</span>

);


}