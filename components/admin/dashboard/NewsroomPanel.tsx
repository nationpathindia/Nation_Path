"use client";

import Link from "next/link";
import { useState } from "react";

interface Props {
  latest:any[];
}


export default function NewsroomPanel({
  latest
}:Props){


const [page,setPage] = useState(1);


const perPage = 5;


const totalPages = Math.ceil(
  (latest?.length || 0) / perPage
);


const start = (page-1) * perPage;


const articles =
latest?.slice(
  start,
  start + perPage
) || [];




return(

<div

className="
bg-black/30
backdrop-blur-xl
border
border-white/10
rounded-2xl
p-6
"

>



{/* HEADER */}

<div

className="
flex
justify-between
items-start
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
Newsroom Intelligence
</h2>


<p

className="
text-sm
text-gray-400
mt-1
"

>
Latest publishing activity
</p>


</div>





<div className="flex gap-3 items-center">


<span

className="
text-xs
text-gray-400
"

>

{latest?.length || 0} Articles

</span>



<Link

href="/admin/posts/create"

className="
bg-[#EA661B]
px-4
py-2
rounded-xl
text-sm
font-semibold
hover:opacity-90
"

>

+ Article

</Link>


</div>



</div>









{/* TABLE */}


<div

className="
overflow-hidden
rounded-xl
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
bg-white/5
"

>


<tr

className="
text-gray-400
"

>


<th className="text-left px-4 py-3">
Article
</th>


<th className="text-left px-4 py-3">
Category
</th>


<th className="text-left px-4 py-3">
Status
</th>


<th className="text-right px-4 py-3">
Views
</th>


</tr>


</thead>





<tbody>


{

articles.map((article:any)=>(



<tr

key={article.id}

className="
border-t
border-white/10
hover:bg-white/5
transition
"

>


<td

className="
px-4
py-4
max-w-md
"

>


<Link

href={`/admin/posts/${article.id}/edit`}

className="
font-medium
line-clamp-1
hover:text-orange-400
"

>

{article.title}

</Link>




<div className="flex gap-2 mt-2">


{
article.breaking &&

<span

className="
text-[11px]
px-2
py-1
rounded-full
bg-red-500/20
text-red-400
"

>
Breaking
</span>

}



{
article.featured &&

<span

className="
text-[11px]
px-2
py-1
rounded-full
bg-orange-500/20
text-orange-400
"

>
Featured
</span>

}


</div>



</td>







<td

className="
px-4
text-gray-300
"

>

{article.category?.name || "News"}

</td>







<td className="px-4">


<StatusBadge

status={article.status}

/>


</td>








<td

className="
px-4
text-right
text-gray-400
"

>

{article.views?.toLocaleString() || 0}

</td>




</tr>


))


}





</tbody>


</table>



</div>









{/* PAGINATION */}


<div

className="
flex
justify-between
items-center
mt-5
"

>


<button

disabled={page===1}

onClick={()=>setPage(page-1)}

className="
px-4
py-2
rounded-lg
bg-white/10
disabled:opacity-30
text-sm
"

>

← Previous

</button>





<div

className="
text-xs
text-gray-400
"

>

Page {page} / {totalPages || 1}

</div>





<button

disabled={page===totalPages}

onClick={()=>setPage(page+1)}

className="
px-4
py-2
rounded-lg
bg-white/10
disabled:opacity-30
text-sm
"

>

Next →

</button>



</div>





</div>


)

}





function StatusBadge({

status

}:{
status:string
}){


const styles:any={


approved:
"bg-green-500/20 text-green-400",


pending:
"bg-yellow-500/20 text-yellow-400",


draft:
"bg-gray-500/20 text-gray-300",


rejected:
"bg-red-500/20 text-red-400"


};



return(

<span

className={`
px-3
py-1
rounded-full
text-xs
${styles[status] || styles.draft}
`}

>

{status}

</span>

)

}