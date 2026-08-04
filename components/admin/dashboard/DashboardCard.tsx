"use client";


import Link from "next/link";

import {
  TrendingUp
} from "lucide-react";



interface Props{


title:string;

value:number;

link?:string;


}



export default function DashboardCard({

title,

value,

link

}:Props){





const content=(


<div

className="
group
relative
overflow-hidden
bg-black/30
backdrop-blur-xl
border
border-white/10
rounded-xl
px-3
py-2.5
h-[78px]
hover:border-orange-500/40
hover:-translate-y-0.5
hover:shadow-lg
transition-all
duration-300
cursor-pointer
"

>



<div

className="
absolute
right-0
top-0
w-14
h-14
bg-orange-500/10
blur-2xl
rounded-full
"

></div>





<div

className="
relative
z-10
flex
items-center
justify-between
h-full
"

>


<div>


<p

className="
text-[10px]
uppercase
tracking-widest
text-gray-400
"

>

{title}

</p>





<h3

className="
text-xl
font-bold
mt-1
text-white
leading-none
"

>

{value?.toLocaleString()}

</h3>



</div>







<div

className="
w-6
h-6
rounded-md
bg-white/5
flex
items-center
justify-center
group-hover:bg-orange-500/20
transition
"

>


<TrendingUp

size={12}

className="
text-orange-400
"

/>


</div>




</div>






</div>


);





if(link){


return(

<Link href={link}>

{content}

</Link>

)

}



return content;



}