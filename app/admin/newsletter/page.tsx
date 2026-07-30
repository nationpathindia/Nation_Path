"use client";

import { useEffect, useState } from "react";


export const dynamic = "force-dynamic";



export default function NewsletterPage(){


const [subs,setSubs] = useState<any[]>([]);

const [search,setSearch] = useState("");

const [loading,setLoading] = useState(true);







useEffect(()=>{

loadSubs();

},[]);







async function loadSubs(){


try{


setLoading(true);


const res = await fetch(
"/api/admin/newsletter"
);


const data = await res.json();



if(data.success){

setSubs(
data.subscribers || []
);

}else{

setSubs([]);

}


}

catch(error){

console.error(
"Newsletter Load Error",
error
);

setSubs([]);

}

finally{

setLoading(false);

}


}








async function deleteSub(
id:string
){


const confirmDelete =
window.confirm(
"Delete this subscriber?"
);


if(!confirmDelete)
return;



await fetch(
"/api/newsletter/delete",
{
method:"DELETE",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
id
})
}
);



loadSubs();


}









function exportCSV(){


const rows =
subs
.map(
(sub)=>sub.email
)
.join("\n");



const blob =
new Blob(
[
`email\n${rows}`
],
{
type:"text/csv"
}
);



const url =
URL.createObjectURL(blob);



const link =
document.createElement("a");


link.href=url;

link.download=
"nationpath-newsletter.csv";


link.click();



URL.revokeObjectURL(url);


}







const filtered =
subs.filter(
(sub)=>

sub.email
.toLowerCase()
.includes(
search.toLowerCase()
)

);








return(


<div className="
p-8
space-y-8
text-white
">






{/* HEADER */}


<div>


<h1 className="
text-2xl
font-bold
">

Newsletter Subscribers

</h1>


<p className="
text-gray-400
mt-1
">

Manage NationPath India newsletter community

</p>


</div>








{/* STATS */}


<div className="
grid
grid-cols-1
md:grid-cols-3
gap-6
">



<StatCard

title="Total Subscribers"

value={subs.length}

/>



<StatCard

title="Status"

value="Active"

/>



<StatCard

title="Export Ready"

value="CSV"

/>



</div>









{/* MAIN PANEL */}


<div className="
bg-[#0e1726]
border
border-gray-800
rounded-xl
p-6
">





<div className="
flex
flex-col
md:flex-row
justify-between
gap-4
mb-6
">





<input

type="text"

placeholder="Search email..."

value={search}

onChange={
(e)=>setSearch(e.target.value)
}

className="
bg-[#111827]
border
border-gray-700
rounded-lg
px-4
py-2
text-sm
outline-none
w-full
md:w-80
focus:border-orange-400
"

/>






<button

onClick={exportCSV}

disabled={!subs.length}

className="
bg-orange-500
hover:bg-orange-600
disabled:opacity-50
px-5
py-2
rounded-lg
text-sm
font-semibold
transition
"

>

Export CSV

</button>




</div>









{
loading ?

(

<div className="
text-center
py-10
text-gray-400
">

Loading subscribers...

</div>

)

:

filtered.length===0 ?

(

<div className="
text-center
py-10
text-gray-400
">

No subscribers found

</div>

)

:

(


<div className="
overflow-x-auto
">


<table className="
w-full
text-sm
">


<thead>


<tr className="
border-b
border-gray-800
text-gray-400
">


<th className="
text-left
py-4
">

Email

</th>


<th className="
text-left
py-4
">

Joined

</th>


<th className="
text-left
py-4
">

Action

</th>


</tr>


</thead>





<tbody>


{

filtered.map(
(sub)=>(


<tr

key={sub.id}

className="
border-b
border-gray-800
hover:bg-white/5
transition
"

>


<td className="
py-4
">

{sub.email}

</td>





<td className="
py-4
text-gray-400
">

{
new Date(
sub.createdAt
)
.toLocaleDateString()
}

</td>





<td className="
py-4
">


<button

onClick={()=>deleteSub(sub.id)}

className="
text-red-400
hover:text-red-300
font-medium
"

>

Delete

</button>



</td>





</tr>


)

)

}



</tbody>



</table>


</div>


)


}





</div>





</div>


);


}









function StatCard(
{
title,
value
}
:
{
title:string;
value:any;
}
){


return(


<div className="
bg-[#0e1726]
border
border-gray-800
rounded-xl
p-5
hover:border-orange-400
transition
">


<p className="
text-gray-400
text-sm
">

{title}

</p>


<h3 className="
text-2xl
font-bold
mt-2
">

{value}

</h3>


</div>


);


}