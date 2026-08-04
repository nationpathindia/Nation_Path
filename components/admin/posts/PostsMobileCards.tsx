"use client";


import Link from "next/link";



interface Props {

  posts:any[];

  deletePost:(id:string)=>void;

}



export default function PostsMobileCards({

  posts,

  deletePost


}:Props){





function statusStyle(status:string){


if(status==="approved")
return "bg-green-500/20 text-green-300";


if(status==="pending")
return "bg-yellow-500/20 text-yellow-300";


if(status==="draft")
return "bg-slate-500/20 text-slate-300";


return "bg-white/10 text-gray-300";


}





function intel(post:any){


const fields=[

"shortBrief",
"background",
"timeline",
"expertOpinion",
"factCheck",
"whatsNext",
"keyTakeaways",
"sourceDesk"

];


return fields.filter(

(field)=>

post[field] &&

(

Array.isArray(post[field])

?

post[field].length

:

true

)

).length;


}







return(


<div

className="

md:hidden

space-y-3

"

>


{


posts.map((post)=>(



<div

key={post.id}

className="

bg-black/30

backdrop-blur-xl

border

border-white/10

rounded-xl

p-3

"

>





<div

className="

flex

justify-between

gap-3

"

>


<h3

className="

text-sm

font-semibold

text-white

line-clamp-2

leading-snug

"

>

{post.title}

</h3>



<span

className="

text-[10px]

text-orange-400

font-semibold

whitespace-nowrap

"

>

{intel(post)}/8

</span>



</div>









<div

className="

flex

items-center

gap-2

mt-2

text-[11px]

text-gray-400

"

>

<span>

{

post.category?.name || "General"

}

</span>


<span>

•

</span>


<span>

{

post.createdAt

?

new Date(post.createdAt)
.toLocaleDateString()

:

""

}

</span>


</div>









<div

className="

flex

gap-2

flex-wrap

mt-3

"

>


<span

className={`

px-2

py-1

rounded-md

text-[10px]

${

post.isEditorial

?

"bg-purple-500/20 text-purple-300"

:

"bg-blue-500/20 text-blue-300"

}

`}

>

{

post.isEditorial

?

"Editorial"

:

"News"

}

</span>





<span

className={`

px-2

py-1

rounded-md

text-[10px]

${statusStyle(post.status)}

`}

>

{

post.status

}

</span>






{

post.breaking &&

<span

className="

px-2

py-1

rounded-md

text-[10px]

bg-orange-500/20

text-orange-300

"

>

🔥 Breaking

</span>

}





{

post.featured &&

<span

className="

px-2

py-1

rounded-md

text-[10px]

bg-yellow-500/20

text-yellow-300

"

>

⭐ Featured

</span>

}



</div>









<div

className="

flex

gap-2

mt-4

"

>


<Link

href={`/admin/posts/edit/${post.id}`}

className="

px-3

py-1.5

rounded-lg

bg-[#163C80]

text-[11px]

font-semibold

"

>

Edit

</Link>







<button

onClick={()=>deletePost(post.id)}

className="

px-3

py-1.5

rounded-lg

bg-red-600/80

text-[11px]

font-semibold

"

>

Delete

</button>



</div>







</div>


))


}



</div>


);


}