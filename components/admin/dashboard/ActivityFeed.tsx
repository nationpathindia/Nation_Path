"use client";

import {
  Activity,
  User
} from "lucide-react";


interface Props{

activity:any[];

}



export default function ActivityFeed({

activity

}:Props){



const items =
activity?.slice(0,8) || [];





return(


<div

className="
bg-black/30
backdrop-blur-xl
border
border-white/10
rounded-2xl
p-5
h-full
"

>





<div

className="
flex
items-center
justify-between
mb-5
"

>


<div>


<h2

className="
text-lg
font-semibold
"

>

Activity Feed

</h2>


<p

className="
text-xs
text-gray-400
mt-1
"

>

Latest system actions

</p>


</div>



<Activity

size={20}

className="
text-orange-400
"

/>


</div>









<div

className="
space-y-4
"

>


{


items.map((item:any,index)=>(



<div

key={item.id}

className="
flex
gap-3
relative
"

>





{/* TIMELINE */}

<div

className="
flex
flex-col
items-center
"

>


<div

className="
w-8
h-8
rounded-full
bg-orange-500/20
flex
items-center
justify-center
"

>

<Activity

size={14}

className="
text-orange-400
"

/>


</div>




{
index !== items.length-1 &&

<div

className="
w-px
h-full
bg-white/10
mt-2
"

/>

}


</div>









<div

className="
flex-1
pb-3
"

>


<div

className="
flex
justify-between
gap-2
"

>


<p

className="
text-sm
font-medium
line-clamp-1
"

>

{item.title}

</p>



<span

className="
text-[11px]
text-gray-500
whitespace-nowrap
"

>

{item.time}

</span>



</div>





<div

className="
flex
items-center
gap-2
mt-1
"

>


<User

size={12}

className="
text-gray-500
"

/>



<p

className="
text-xs
text-gray-400
"

>

{item.user || "System"}

</p>



</div>





</div>





</div>



))


}




{

items.length===0 &&

<p className="
text-sm
text-gray-500
">

No recent activity

</p>

}



</div>





</div>


)


}