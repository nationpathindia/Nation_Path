"use client";

import {
  useCallback,
  useEffect,
  useState
} from "react";

import Link from "next/link";


export default function AdminPostsPage() {


const [posts,setPosts] =
useState<any[]>([]);


const [loading,setLoading] =
useState(false);



const [status,setStatus] =
useState("");



const [category,setCategory] =
useState("");



const [search,setSearch] =
useState("");



const [breaking,setBreaking] =
useState("");



const [featured,setFeatured] =
useState("");



const [flash,setFlash] =
useState("");



const [page,setPage] =
useState(1);



const [totalPages,setTotalPages] =
useState(1);





const [stats,setStats] =
useState({

totalArticles:0,

approvedArticles:0,

pendingArticles:0,

draftArticles:0,

featuredArticles:0,

breakingArticles:0

});






const categories = [

"politics",
"defence",
"international",
"economy",
"business",
"technology",
"sports",
"education",
"health",
"science",
"environment",
"automobile",
"entertainment",
"lifestyle",
"travel",
"culture"

];






/* ================= FETCH POSTS ================= */


const fetchPosts =
useCallback(async()=>{


try{


setLoading(true);



const params =
new URLSearchParams();



params.set(
"page",
String(page)
);



params.set(
"limit",
"20"
);




if(search)
params.set(
"search",
search
);



if(status)
params.set(
"status",
status
);



if(category)
params.set(
"category",
category
);



if(breaking)
params.set(
"breaking",
breaking
);



if(featured)
params.set(
"featured",
featured
);



if(flash)
params.set(
"flash",
flash
);





const res =
await fetch(
`/api/articles?${params.toString()}`
);



const data =
await res.json();




if(data.success){


setPosts(
data.articles || []
);



setTotalPages(
data.pagination?.totalPages || 1
);


}



}
catch(error){


console.error(
"Fetch posts error",
error
);


}
finally{


setLoading(false);


}



},[
page,
search,
status,
category,
breaking,
featured,
flash
]);









/* ================= FETCH STATS ================= */


const fetchStats =
useCallback(async()=>{


try{


const res =
await fetch(
"/api/articles/stats"
);



const data =
await res.json();





if(data.success && data.stats){


setStats({

totalArticles:
data.stats.totalArticles ?? 0,


approvedArticles:
data.stats.approvedArticles ?? 0,


pendingArticles:
data.stats.pendingArticles ?? 0,


draftArticles:
data.stats.draftArticles ?? 0,


featuredArticles:
data.stats.featuredArticles ?? 0,


breakingArticles:
data.stats.breakingArticles ?? 0

});


}



}
catch(error){


console.error(
"Stats loading error",
error
);


}



},[]);







useEffect(()=>{


fetchPosts();

fetchStats();


},[
fetchPosts,
fetchStats
]);








/* ================= ACTIONS ================= */


async function updateStatus(
id:string,
value:string
){


await fetch(
`/api/articles/${id}`,
{

method:"PATCH",

headers:{
"Content-Type":
"application/json"
},


body:JSON.stringify({

status:value

})

}

);



fetchPosts();

}





async function deletePost(
id:string
){


if(
!confirm(
"Delete this article?"
)
)
return;



await fetch(
`/api/articles/${id}`,
{

method:"DELETE",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

id

})

}

);



fetchPosts();

fetchStats();


}






function clearFilters(){


setSearch("");

setStatus("");

setCategory("");

setBreaking("");

setFeatured("");

setFlash("");

setPage(1);


}





function badge(
value:string
){


if(value==="approved")
return "bg-green-600";


if(value==="pending")
return "bg-yellow-600";


if(value==="rejected")
return "bg-red-600";


if(value==="draft")
return "bg-slate-600";


return "bg-gray-600";


}
return (

<div
className="
min-h-screen
bg-[#020617]
text-white
p-5
md:p-10
"
>


{/* HEADER */}

<header className="mb-8">


<h1
className="
text-3xl
md:text-4xl
font-bold
"
>
Newsroom Control Center
</h1>


<p
className="
text-gray-400
mt-2
"
>
Manage articles, publishing and editorial workflow
</p>


</header>






{/* STATS */}

<div
className="
grid
grid-cols-2
md:grid-cols-6
gap-4
mb-8
"
>


{[

[
"Total",
stats.totalArticles
],

[
"Approved",
stats.approvedArticles
],

[
"Pending",
stats.pendingArticles
],

[
"Draft",
stats.draftArticles
],

[
"Featured",
stats.featuredArticles
],

[
"Breaking",
stats.breakingArticles
]



].map(
(item:any)=>(


<div

key={item[0]}

className="
bg-[#0f172a]
border
border-white/10
rounded-xl
p-5
"

>


<p
className="
text-gray-400
text-sm
"
>
{item[0]}
</p>


<h2
className="
text-3xl
font-bold
mt-2
"
>
{item[1]}
</h2>


</div>


)


)}



</div>








{/* FILTERS */}

<div
className="
bg-[#0f172a]
border
border-white/10
rounded-2xl
p-5
mb-8
"
>


<div
className="
grid
grid-cols-1
md:grid-cols-7
gap-4
"
>


<input

value={search}

onChange={(e)=>{

setSearch(
e.target.value
);

setPage(1);

}}

placeholder="Search articles..."

className="
bg-[#020617]
border
border-white/10
rounded-lg
px-4
py-3
outline-none
"

/>





<select

value={category}

onChange={(e)=>{

setCategory(
e.target.value
);

setPage(1);

}}

className="
bg-[#020617]
border
border-white/10
rounded-lg
px-3
"

>

<option value="">
Category
</option>


{
categories.map(
(item)=>(

<option
key={item}
value={item}
>
{item}
</option>

)

)

}


</select>







<select

value={status}

onChange={(e)=>{

setStatus(
e.target.value
);

setPage(1);

}}

className="
bg-[#020617]
border
border-white/10
rounded-lg
"

>

<option value="">
Status
</option>

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


</select>







<select

value={breaking}

onChange={(e)=>{

setBreaking(
e.target.value
);

setPage(1);

}}

className="
bg-[#020617]
border
border-white/10
rounded-lg
"

>

<option value="">
Breaking
</option>

<option value="true">
Yes
</option>

<option value="false">
No
</option>


</select>







<select

value={featured}

onChange={(e)=>{

setFeatured(
e.target.value
);

setPage(1);

}}

className="
bg-[#020617]
border
border-white/10
rounded-lg
"

>

<option value="">
Featured
</option>

<option value="true">
Yes
</option>

<option value="false">
No
</option>


</select>







<select

value={flash}

onChange={(e)=>{

setFlash(
e.target.value
);

setPage(1);

}}

className="
bg-[#020617]
border
border-white/10
rounded-lg
"

>

<option value="">
Flash
</option>

<option value="true">
Yes
</option>

<option value="false">
No
</option>


</select>






<button

onClick={clearFilters}

className="
bg-[#EA661B]
rounded-lg
font-semibold
px-4
"

>
Clear
</button>




</div>


</div>








{/* CREATE BUTTON */}

<div
className="
flex
justify-end
mb-6
"
>


<Link

href="/admin/posts/create"

className="
bg-[#EA661B]
px-5
py-3
rounded-xl
font-semibold
"

>
+ Create News
</Link>


</div>









{/* DESKTOP TABLE */}

<div
className="
hidden
md:block
bg-[#0f172a]
rounded-2xl
overflow-hidden
border
border-white/10
"
>


<table
className="
w-full
text-sm
"
>


<thead
className="
bg-[#0b1220]
text-gray-400
"
>

<tr>

<th className="p-4 text-left">
Title
</th>

<th>
Category
</th>

<th>
Status
</th>

<th>
Flags
</th>

<th>
Actions
</th>


</tr>


</thead>





<tbody>


{

loading ?


<tr>

<td
colSpan={5}
className="
p-10
text-center
"
>
Loading...
</td>

</tr>


:


posts.length===0 ?


<tr>

<td
colSpan={5}
className="
p-10
text-center
text-gray-400
"
>
No articles found
</td>

</tr>



:


posts.map(
(post)=>(


<tr

key={post.id}

className="
border-t
border-white/10
hover:bg-white/5
"

>


<td
className="
p-4
max-w-md
"
>

<p className="font-medium">
{post.title}
</p>


</td>





<td>

{
post.category?.name
||
"-"
}


</td>






<td>


<select

value={post.status}

onChange={(e)=>

updateStatus(
post.id,
e.target.value
)

}

className={`
rounded-lg
px-3
py-2
${badge(post.status)}
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


</select>


</td>






<td>

{

post.breaking &&

<div className="text-orange-400">
Breaking
</div>

}


{

post.featured &&

<div className="text-yellow-400">
Featured
</div>

}


{

post.flash &&

<div className="text-blue-400">
Flash
</div>

}


</td>






<td>


<div
className="
flex
gap-2
"
>


<Link

href={
`/admin/posts/edit/${post.id}`
}

className="
bg-[#163C80]
px-3
py-2
rounded-lg
"

>
Edit
</Link>



<button

onClick={()=>
deletePost(post.id)
}

className="
bg-red-600
px-3
py-2
rounded-lg
"

>
Delete
</button>


</div>


</td>






</tr>


)


)


}



</tbody>


</table>


</div>









{/* MOBILE CARDS */}

<div
className="
md:hidden
space-y-4
"
>


{

posts.map(
(post)=>(


<div

key={post.id}

className="
bg-[#0f172a]
border
border-white/10
rounded-xl
p-4
"

>


<h3
className="
font-semibold
"
>
{post.title}
</h3>



<p
className="
text-gray-400
text-sm
mt-2
"
>
{post.category?.name || "-"}
</p>



<div
className="
flex
gap-2
mt-4
"
>


<Link

href={
`/admin/posts/edit/${post.id}`
}

className="
bg-[#163C80]
px-3
py-2
rounded-lg
"

>
Edit
</Link>


<button

onClick={()=>
deletePost(post.id)
}

className="
bg-red-600
px-3
py-2
rounded-lg
"

>
Delete
</button>


</div>


</div>



)


)



}



</div>









{/* PAGINATION */}

<div

className="
flex
justify-center
items-center
gap-5
mt-8
"

>


<button

disabled={
page<=1
}

onClick={()=>
setPage(
p=>p-1
)
}

className="
bg-[#163C80]
px-4
py-2
rounded-lg
disabled:opacity-40
"

>
Previous
</button>




<span>

Page {page} / {totalPages}

</span>





<button

disabled={
page>=totalPages
}

onClick={()=>
setPage(
p=>p+1
)
}

className="
bg-[#163C80]
px-4
py-2
rounded-lg
disabled:opacity-40
"

>
Next
</button>



</div>







</div>

);


}