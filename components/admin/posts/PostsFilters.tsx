"use client";


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



interface Props {


search:string;
setSearch:(value:string)=>void;

category:string;
setCategory:(value:string)=>void;

status:string;
setStatus:(value:string)=>void;

editorial:string;
setEditorial:(value:string)=>void;

schedule:string;
setSchedule:(value:string)=>void;

breaking:string;
setBreaking:(value:string)=>void;

featured:string;
setFeatured:(value:string)=>void;

flash:string;
setFlash:(value:string)=>void;

clearFilters:()=>void;


}





export default function PostsFilters({

search,
setSearch,

category,
setCategory,

status,
setStatus,

editorial,
setEditorial,

schedule,
setSchedule,

breaking,
setBreaking,

featured,
setFeatured,

flash,
setFlash,

clearFilters


}:Props){



const inputStyle = `

bg-black/30

backdrop-blur-xl

border

border-white/10

rounded-lg

px-3

py-2

text-sm

text-white

outline-none

focus:border-orange-500/50

transition

`;





return(


<div

className="

bg-black/30

backdrop-blur-xl

border

border-white/10

rounded-xl

p-4

mb-6

"

>


<div

className="

grid

grid-cols-1

md:grid-cols-4

lg:grid-cols-8

gap-3

"

>



<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search articles..."

className={inputStyle}

/>





<select

value={category}

onChange={(e)=>setCategory(e.target.value)}

className={inputStyle}

>

<option value="">
Category
</option>


{
categories.map((c)=>(

<option

key={c}

value={c}

>

{c}

</option>

))
}


</select>







<select

value={status}

onChange={(e)=>setStatus(e.target.value)}

className={inputStyle}

>

<option value="">
Status
</option>

<option value="approved">
Published
</option>

<option value="pending">
Pending
</option>

<option value="draft">
Draft
</option>

<option value="rejected">
Rejected
</option>

</select>








<select

value={editorial}

onChange={(e)=>setEditorial(e.target.value)}

className={inputStyle}

>

<option value="">
Type
</option>

<option value="true">
Editorial
</option>

<option value="false">
News
</option>

</select>








<select

value={schedule}

onChange={(e)=>setSchedule(e.target.value)}

className={inputStyle}

>

<option value="">
Publishing
</option>

<option value="scheduled">
Scheduled
</option>

<option value="published">
Published
</option>

</select>








<select

value={breaking}

onChange={(e)=>setBreaking(e.target.value)}

className={inputStyle}

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

onChange={(e)=>setFeatured(e.target.value)}

className={inputStyle}

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

onChange={(e)=>setFlash(e.target.value)}

className={inputStyle}

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

text-sm

font-semibold

hover:opacity-90

transition

"

>

Clear

</button>




</div>


</div>


);


}