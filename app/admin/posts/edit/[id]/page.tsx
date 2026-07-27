"use client";

import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useRouter
} from "next/navigation";


export default function EditPost(){


const {id} = useParams();

const router = useRouter();



const [loading,setLoading] =
useState(true);


const [saving,setSaving] =
useState(false);



const [error,setError] =
useState("");




const [form,setForm] =
useState({

title:"",
content:"",
images:[] as string[],
videoUrl:"",

breaking:false,
featured:false,

status:"pending",

metaTitle:"",
metaDescription:"",
metaKeywords:"",

slug:"",
category:""

});







/* ================= FETCH ARTICLE ================= */


useEffect(()=>{


if(!id)
return;



fetch(
`/api/articles/${id}`
)

.then(res=>res.json())

.then(data=>{


if(data.success){


const article =
data.article;



setForm({

title:article.title || "",

content:article.content || "",

images:article.images || [],

videoUrl:
article.videoUrl || "",


breaking:
article.breaking || false,


featured:
article.featured || false,


status:
article.status || "pending",


metaTitle:
article.metaTitle || "",


metaDescription:
article.metaDescription || "",


metaKeywords:
article.metaKeywords || "",


slug:
article.slug || "",


category:
article.category?.name || ""

});


}


})

.catch(()=>{

setError(
"Failed to load article"
);

})

.finally(()=>{

setLoading(false);

});


},[id]);










/* ================= SEO ================= */


function generateSEO(){


setForm(prev=>({

...prev,

metaTitle:
prev.title,


metaDescription:
prev.content
.replace(/<[^>]*>?/gm,"")
.slice(0,160),


metaKeywords:
prev.title
.toLowerCase()
.split(" ")
.join(", ")

}));



}









/* ================= REMOVE IMAGE ================= */


function removeImage(
index:number
){


setForm(prev=>({

...prev,

images:
prev.images.filter(
(_,i)=>i!==index
)

}));


}










/* ================= UPDATE ================= */


async function handleSubmit(
e:React.FormEvent
){


e.preventDefault();


try{


setSaving(true);

setError("");



const res =
await fetch(
`/api/articles/${id}`,
{

method:"PUT",

headers:{

"Content-Type":
"application/json"

},

body:JSON.stringify(form)

}

);



const data =
await res.json();



if(data.success){


alert(
"Article Updated Successfully ✅"
);


router.push(
"/admin/posts"
);


}

else{


setError(
data.error ||
"Update failed"
);


}



}

catch(err){


setError(
"Something went wrong"
);


}

finally{


setSaving(false);


}



}









if(loading){


return (

<div
className="
min-h-screen
bg-[#020617]
text-white
flex
items-center
justify-center
"
>

Loading Article...

</div>


);


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


<div
className="
max-w-5xl
mx-auto
"
>


<h1

className="
text-3xl
font-bold
mb-8
"

>
Edit Article
</h1>





{
error &&

<div
className="
bg-red-600
p-4
rounded-xl
mb-5
"
>
{error}
</div>

}







<form

onSubmit={handleSubmit}

className="
space-y-6
"

>








{/* ARTICLE INFO */}


<div

className="
bg-[#0f172a]
border
border-white/10
rounded-2xl
p-5
space-y-4
"

>


<h2 className="text-xl font-semibold">
Article Information
</h2>



<div className="
grid
md:grid-cols-2
gap-4
">


<div>

<label className="text-sm text-gray-400">
Slug
</label>


<input

value={form.slug}

readOnly

className="
w-full
bg-black/40
p-3
rounded-lg
text-gray-400
"

/>

</div>




<div>

<label className="text-sm text-gray-400">
Category
</label>


<input

value={form.category}

readOnly

className="
w-full
bg-black/40
p-3
rounded-lg
text-gray-400
"

/>

</div>



</div>






<input

value={form.title}

onChange={(e)=>

setForm({

...form,

title:e.target.value

})

}

className="
w-full
p-3
rounded-lg
bg-white
text-black
"

placeholder="Article Title"

/>







<textarea

value={form.content}

onChange={(e)=>

setForm({

...form,

content:e.target.value

})

}

rows={10}

className="
w-full
p-3
rounded-lg
bg-white
text-black
"

placeholder="Content"

/>


</div>









{/* CONTROLS */}


<div

className="
bg-[#0f172a]
border
border-white/10
rounded-2xl
p-5
"

>


<h2 className="text-xl font-semibold mb-4">
Publishing Controls
</h2>




<select

value={form.status}

onChange={(e)=>

setForm({

...form,

status:e.target.value

})

}

className="
bg-white
text-black
p-3
rounded-lg
"

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






<div className="flex gap-6 mt-5">


<label>

<input

type="checkbox"

checked={form.breaking}

onChange={(e)=>

setForm({

...form,

breaking:e.target.checked

})

}

/>

{" "}
Breaking News

</label>





<label>

<input

type="checkbox"

checked={form.featured}

onChange={(e)=>

setForm({

...form,

featured:e.target.checked

})

}

/>

{" "}
Featured

</label>


</div>



</div>









{/* IMAGES */}


<div

className="
bg-[#0f172a]
border
border-white/10
rounded-2xl
p-5
"

>


<h2 className="text-xl font-semibold mb-4">
Images
</h2>



<div className="
flex
gap-4
flex-wrap
">


{

form.images.map(
(img,index)=>(


<div
key={index}
className="
relative
"
>


<img

src={img}

className="
w-40
h-28
object-cover
rounded-lg
"

/>


<button

type="button"

onClick={()=>removeImage(index)}

className="
absolute
top-1
right-1
bg-red-600
rounded-full
px-2
"

>
×
</button>


</div>


)

)

}


</div>



</div>









{/* SEO */}


<div

className="
bg-[#0f172a]
border
border-white/10
rounded-2xl
p-5
space-y-4
"

>


<div className="flex justify-between">

<h2 className="text-xl font-semibold">
SEO
</h2>



<button

type="button"

onClick={generateSEO}

className="
bg-purple-600
px-4
py-2
rounded-lg
"

>
Generate SEO
</button>


</div>





<input

value={form.metaTitle}

onChange={(e)=>

setForm({

...form,

metaTitle:e.target.value

})

}

className="
w-full
p-3
rounded-lg
bg-white
text-black
"

placeholder="Meta Title"

/>





<textarea

value={form.metaDescription}

onChange={(e)=>

setForm({

...form,

metaDescription:e.target.value

})

}

className="
w-full
p-3
rounded-lg
bg-white
text-black
"

placeholder="Meta Description"

/>






<input

value={form.metaKeywords}

onChange={(e)=>

setForm({

...form,

metaKeywords:e.target.value

})

}

className="
w-full
p-3
rounded-lg
bg-white
text-black
"

placeholder="Meta Keywords"

/>



</div>









<button

disabled={saving}

className="
bg-[#EA661B]
px-8
py-3
rounded-xl
font-semibold
disabled:opacity-50
"

>


{
saving
?
"Updating..."
:
"Update Article"
}


</button>







</form>



</div>



</div>


);


}