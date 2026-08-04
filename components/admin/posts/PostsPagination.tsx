"use client";


interface Props {

  page:number;

  totalPages:number;

  setPage:(value:number | ((prev:number)=>number))=>void;

}



export default function PostsPagination({

  page,

  totalPages,

  setPage


}:Props){


return (

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


disabled={page<=1}


onClick={()=>{

setPage(
(page)=>page-1
);

}}


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





<span

className="
text-gray-300
"

>

Page {page} / {totalPages}

</span>






<button


disabled={page>=totalPages}


onClick={()=>{

setPage(
(page)=>page+1
);

}}


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


);


}