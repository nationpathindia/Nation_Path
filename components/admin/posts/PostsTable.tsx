"use client";

import Link from "next/link";


interface Props {

  posts:any[];

  loading:boolean;

  updateStatus:(id:string,value:string)=>void;

  deletePost:(id:string)=>void;

}




export default function PostsTable({

  posts,

  loading,

  updateStatus,

  deletePost


}:Props){





function getDisplayStatus(post:any){

  if(
    post.status==="approved" &&
    post.publishedAt
  ){

    const publishDate =
    new Date(post.publishedAt);


    if(
      publishDate > new Date()
    ){

      return "scheduled";

    }

  }


  if(
    post.status==="approved"
  ){

    return "published";

  }


  return post.status || "draft";

}








function statusStyle(value:string){


if(
value==="scheduled"
)

return "bg-orange-500/20 text-orange-400 border-orange-500/30";



if(
value==="published" ||
value==="approved"
)

return "bg-green-500/20 text-green-400 border-green-500/30";



if(
value==="pending"
)

return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";



if(
value==="draft"
)

return "bg-slate-500/20 text-slate-300 border-slate-500/30";



if(
value==="rejected"
)

return "bg-red-500/20 text-red-400 border-red-500/30";



if(
value==="archived"
)

return "bg-gray-500/20 text-gray-300 border-gray-500/30";



return "bg-white/10 text-gray-300 border-white/10";


}









function intelligenceScore(post:any){


let count=0;



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




fields.forEach((field)=>{


if(

post[field]

&&

(

Array.isArray(post[field])

?

post[field].length>0

:

true

)

)

count++;


});



return count;


}









return(


<div

className="
hidden
md:block
bg-black/30
backdrop-blur-xl
border
border-white/10
rounded-xl
overflow-hidden
"

>


<table

className="
w-full
table-fixed
text-xs
"

>


<thead

className="
bg-white/5
text-gray-400
uppercase
tracking-wider
text-[10px]
"

>


<tr>


<th className="
p-3
text-left
w-[32%]
">

Article

</th>



<th className="
w-[12%]
">

Type

</th>




<th className="
w-[14%]
">

Status

</th>




<th className="
w-[10%]
">

Intel

</th>




<th className="
w-[16%]
">

Flags

</th>




<th className="
w-[16%]
">

Actions

</th>


</tr>


</thead>





<tbody>


{

loading ?


<tr>

<td

colSpan={6}

className="
p-8
text-center
text-gray-400
"

>

Loading newsroom data...

</td>

</tr>





:




posts.length===0 ?


<tr>

<td

colSpan={6}

className="
p-8
text-center
text-gray-400
"

>

No articles found

</td>

</tr>





:


posts.map((post)=>{


const displayStatus =
getDisplayStatus(post);



return (

<tr

key={post.id}

className="
border-t
border-white/10
hover:bg-white/5
transition
"

>
  <td

className="
p-3
w-[32%]
"

>


<div

className="
text-xs
font-semibold
text-white
line-clamp-1
truncate
"

>

{post.title}

</div>




<div

className="
flex
gap-2
mt-1
text-[10px]
text-gray-500
"

>


<span>

{post.category?.name || "General"}

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


</td>







<td>


{

post.isEditorial ?


<span

className="
px-2
py-1
rounded-md
text-[10px]
bg-purple-500/20
text-purple-300
border
border-purple-500/30
whitespace-nowrap
"

>

Editorial

</span>


:


<span

className="
px-2
py-1
rounded-md
text-[10px]
bg-blue-500/20
text-blue-300
border
border-blue-500/30
whitespace-nowrap
"

>

News

</span>


}


</td>









<td>


<select


value={

displayStatus==="published"

?

"approved"

:

displayStatus

}




onChange={(e)=>{


if(
e.target.value==="scheduled"
){

return;

}



updateStatus(

post.id,

e.target.value

);



}}




className={`

text-[10px]

rounded-md

px-2

py-1

border

outline-none

max-w-[100px]

${statusStyle(displayStatus)}

`}


>



<option value="pending">

Pending

</option>



<option value="approved">

Approved

</option>



<option value="draft">

Draft

</option>



<option value="rejected">

Rejected

</option>



<option value="archived">

Archived

</option>




{

displayStatus==="scheduled" &&


<option value="scheduled">

Scheduled

</option>


}



</select>



</td>









<td>


<span

className="
text-orange-400
font-semibold
text-xs
"

>

{

intelligenceScore(post)

}

</span>



<span

className="
text-gray-500
"

>

/8

</span>



</td>









<td>


<div

className="
flex
gap-1
flex-wrap
"

>


{

post.breaking &&


<span

className="
px-1.5
py-0.5
rounded
text-[9px]
bg-orange-500/20
text-orange-300
"

>

🔥 Break

</span>


}





{

post.featured &&


<span

className="
px-1.5
py-0.5
rounded
text-[9px]
bg-yellow-500/20
text-yellow-300
"

>

⭐ Feature

</span>


}





{

post.flash &&


<span

className="
px-1.5
py-0.5
rounded
text-[9px]
bg-blue-500/20
text-blue-300
"

>

⚡ Flash

</span>


}



</div>


</td>









<td>


<div

className="
flex
gap-1
whitespace-nowrap
"

>


<Link

href={`/admin/posts/edit/${post.id}`}

className="
px-2
py-1
rounded-md
bg-[#163C80]
text-[10px]
font-semibold
"

>

Edit

</Link>







<Link

href={`/article/${post.slug}`}

target="_blank"

className="
px-2
py-1
rounded-md
bg-green-600/80
text-[10px]
font-semibold
"

>

View

</Link>







<button

onClick={()=>deletePost(post.id)}

className="
px-2
py-1
rounded-md
bg-red-600/80
text-[10px]
font-semibold
"

>

Delete

</button>



</div>


</td>






</tr>


);


})


}


</tbody>


</table>


</div>


);


}