"use client";


import Link from "next/link";



export default function PostsActions(){


return(


<div

className="
flex
justify-end
gap-3
mb-6
"

>



<Link

href="/admin/posts/create"

className="
bg-[#163C80]
hover:bg-[#1d4fa3]
px-4
py-2
rounded-lg
text-sm
font-semibold
border
border-white/10
transition
"

>

+ News

</Link>






<Link

href="/admin/posts/editorial/create"

className="
bg-purple-600/90
hover:bg-purple-700
px-4
py-2
rounded-lg
text-sm
font-semibold
border
border-white/10
transition
"

>

+ Editorial

</Link>



</div>


);


}