"use client";


export default function PostsHeader(){


return(


<header

className="
mb-8
"

>


<div

className="
flex
flex-col
md:flex-row
md:items-center
md:justify-between
gap-5
"

>



<div>



<div

className="
flex
items-center
gap-3
mb-2
"

>


<div

className="
w-2
h-8
bg-orange-500
rounded-full
"

/>


<h1

className="
text-3xl
md:text-4xl
font-bold
text-white
"

>

Newsroom Intelligence Center

</h1>


</div>





<p

className="
text-gray-400
text-sm
md:text-base
"

>

Manage publishing workflow, editorial quality and content intelligence

</p>



</div>







<div

className="
flex
items-center
gap-3
"

>


<div

className="
bg-black/30
backdrop-blur-xl
border
border-white/10
rounded-xl
px-4
py-3
"

>


<p

className="
text-[10px]
uppercase
tracking-widest
text-gray-400
"

>

Workspace

</p>


<p

className="
text-sm
font-semibold
text-white
mt-1
"

>

Editorial CMS

</p>



</div>





</div>





</div>


</header>


);


}