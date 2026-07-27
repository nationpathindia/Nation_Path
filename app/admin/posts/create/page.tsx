"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Editor from "@/components/Editor";

export const dynamic = "force-dynamic";


/* =====================================================
   HELPERS
===================================================== */

function generateSlug(title: string) {

  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

}


function stripHtml(html:string){

  return html.replace(/<[^>]*>?/gm,"");

}




/* =====================================================
   CREATE POST PAGE
===================================================== */


export default function CreatePost(){


const router = useRouter();

const searchParams = useSearchParams();



const typeFromUrl =
searchParams.get("type") || "news";



/* =====================================================
   STATES
===================================================== */


const [categories,setCategories] =
useState<any[]>([]);



const [loading,setLoading] =
useState(false);



const [uploading,setUploading] =
useState(false);



const [message,setMessage] =
useState("");



const [error,setError] =
useState("");



const [slugLocked,setSlugLocked] =
useState(true);




/* =====================================================
   FORM
===================================================== */


const [form,setForm] =
useState({


title:"",

slug:"",

content:"",


categoryId:"",


postType:typeFromUrl,



images:[] as string[],



videoUrl:"",




/* NEWS FEATURES */


breaking:false,

flash:false,

featured:false,



breakingPriority:0,

flashPriority:0,




/* STATUS */


status:"pending",




/* SEO */


metaTitle:"",

metaDescription:"",

metaKeywords:"",




live:true



});






/* =====================================================
   CATEGORY FETCH
===================================================== */


useEffect(()=>{


async function loadCategories(){


try{


const res =
await fetch("/api/categories");


const data =
await res.json();



const list =
Array.isArray(data)
?
data
:
data?.categories || [];



setCategories(list);



}
catch(err){


console.error(
"Category load error",
err
);


setCategories([]);


}


}



loadCategories();



},[]);






/* =====================================================
   AUTO SLUG + META TITLE
===================================================== */


useEffect(()=>{


if(
form.title &&
slugLocked
){


setForm(prev=>({

...prev,


slug:
generateSlug(
prev.title
),



metaTitle:
prev.metaTitle ||
prev.title



}));



}


},[
form.title,
slugLocked
]);






/* =====================================================
   AUTO META DESCRIPTION
===================================================== */


useEffect(()=>{


if(
form.content &&
!form.metaDescription
){


const clean =
stripHtml(
form.content
);



setForm(prev=>({

...prev,


metaDescription:
clean.substring(
0,
155
)



}));



}


},[
form.content
]);






/* =====================================================
   UPDATE FIELD
===================================================== */


function updateField(
key:string,
value:any
){


setForm(prev=>({

...prev,

[key]:value


}));


}
 
/* =====================================================
   REMOVE IMAGE
===================================================== */


function removeImage(index:number){


setForm(prev=>({

...prev,


images:
prev.images.filter(
(_,i)=>i!==index
)


}));


}







/* =====================================================
   IMAGE UPLOAD
===================================================== */


async function handleImageUpload(
files:FileList
){


if(
files.length + form.images.length > 5
){

setError(
"Maximum 5 images allowed"
);

return;

}



setUploading(true);

setError("");



try{


const uploaded:string[]=[];



for(
const file of Array.from(files)
){



if(
file.size > 2 * 1024 * 1024
){

throw new Error(
"Each image must be under 2MB"
);

}




const formData =
new FormData();



formData.append(
"file",
file
);



formData.append(
"upload_preset",
process.env
.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
);





const response =
await fetch(

`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,

{

method:"POST",

body:formData

}

);





const data =
await response.json();




if(
data.secure_url
){

uploaded.push(
data.secure_url
);

}


}





setForm(prev=>({

...prev,


images:[
...prev.images,
...uploaded
]


}));




}
catch(err:any){


setError(
err.message ||
"Image upload failed"
);


}
finally{


setUploading(false);


}



}









/* =====================================================
   SUBMIT POST
===================================================== */


async function handleSubmit(
e:React.FormEvent
){


e.preventDefault();



setLoading(true);

setError("");

setMessage("");





if(
!form.title.trim() ||
!form.content.trim()
){


setError(
"Title and content are required"
);


setLoading(false);


return;


}






if(
form.postType==="news" &&
!form.categoryId
){


setError(
"Category required for news"
);



setLoading(false);


return;


}







if(
form.breaking &&
form.breakingPriority <= 0
){


setError(
"Breaking priority required"
);



setLoading(false);


return;


}








try{


const res =
await fetch(
"/api/articles",
{

method:"POST",

headers:{

"Content-Type":
"application/json"

},


body:
JSON.stringify(form)


}

);







const data =
await res.json();






if(!res.ok){


throw new Error(
data.error ||
"Create failed"
);


}







setMessage(
"Post created successfully 🎉"
);







/* BREAKING PUSH */


if(
form.breaking
){


await fetch(
"/api/push-breaking",
{

method:"POST",

headers:{

"Content-Type":
"application/json"

},


body:
JSON.stringify({

type:"article_created",

breaking:true,

id:data.id


})


}

);


}







/* CACHE REFRESH */


await fetch(
"/api/revalidate-breaking",
{

method:"POST"

}

);







setTimeout(()=>{


router.push(
"/admin/posts"
);



},1200);







}
catch(err:any){


console.error(
"CREATE POST ERROR",
err
);



setError(
err.message ||
"Failed to create post"
);



}
finally{


setLoading(false);


}



}



// =====================================================
// UI
// =====================================================


return (

<div
className="
min-h-screen
bg-[#050816]
text-white
p-4
md:p-8
"
>


{/* HEADER */}

<div className="mb-8">


<h1
className="
text-3xl
font-bold
"
>

Create {typeFromUrl.toUpperCase()} Post

</h1>


<p
className="
text-orange-400
mt-2
"
>

NationPath Editorial CMS

</p>


</div>





{/* ALERT */}

{

message &&

<div
className="
mb-6
p-4
rounded-xl
bg-green-600/20
border
border-green-500
text-green-300
"
>

{message}

</div>

}




{

error &&

<div
className="
mb-6
p-4
rounded-xl
bg-red-600/20
border
border-red-500
text-red-300
"
>

{error}

</div>

}








<form

onSubmit={handleSubmit}

className="
grid
grid-cols-1
xl:grid-cols-3
gap-8
"

>





{/* ================= LEFT ================= */}



<div

className="
xl:col-span-2
space-y-6
"

>







{/* TITLE */}

<div
className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"
>


<label
className="
text-sm
text-gray-400
"
>

Headline

</label>



<input

className="
w-full
mt-3
p-4
rounded-xl
bg-black/30
border
border-white/10
focus:border-orange-500
outline-none
"


placeholder="
Enter article headline
"


value={
form.title
}


onChange={
(e)=>
updateField(
"title",
e.target.value
)
}


/>


</div>









{/* SLUG */}



<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>


<div
className="
flex
justify-between
items-center
mb-3
"
>


<label
className="
text-sm
text-gray-400
"
>

URL Slug

</label>



<button

type="button"

onClick={()=>setSlugLocked(!slugLocked)}

className="
px-4
py-2
rounded-lg
bg-orange-600
text-xs
"

>

{

slugLocked
?
"Auto Locked"
:
"Manual"

}

</button>


</div>





<input

className="
w-full
p-3
rounded-xl
bg-black/30
border
border-white/10
"

value={
form.slug
}


disabled={
slugLocked
}


onChange={
(e)=>
updateField(
"slug",
e.target.value
)
}


/>


</div>









{/* EDITOR */}


<div
className="
bg-white
rounded-2xl
overflow-hidden
text-black
"
>


<Editor

value={
form.content
}


onChange={
(v:string)=>
updateField(
"content",
v
)
}


/>


</div>









{/* VIDEO */}


<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>


<label
className="
text-gray-400
text-sm
"
>

Video URL

</label>



<input

className="
w-full
mt-3
p-3
rounded-xl
bg-black/30
border
border-white/10
"


placeholder="
YouTube video URL
"


value={
form.videoUrl
}


onChange={
(e)=>
updateField(
"videoUrl",
e.target.value
)
}


/>



</div>









{/* MEDIA */}


<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>


<h2
className="
font-semibold
mb-4
"
>

Media Gallery

</h2>



<input

type="file"

multiple

accept="image/*"


onChange={
(e)=>
e.target.files &&
handleImageUpload(
e.target.files
)
}


/>



{

uploading &&

<p
className="
text-orange-400
mt-3
"
>

Uploading...

</p>

}





<div
className="
flex
gap-4
flex-wrap
mt-5
"
>


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
w-32
h-24
object-cover
rounded-xl
"

/>



<button

type="button"

onClick={()=>
removeImage(index)
}


className="
absolute
-top-2
-right-2
bg-red-600
rounded-full
w-6
h-6
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







</div>



{/* ================= RIGHT SIDEBAR ================= */}


<div
className="
space-y-6
"
>





{/* PUBLISHING */}


<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>


<h2
className="
font-semibold
mb-4
"
>

Publishing

</h2>




<select

className="
w-full
p-3
rounded-xl
bg-black/30
border
border-white/10
"

value={
form.categoryId
}


onChange={
(e)=>
updateField(
"categoryId",
e.target.value
)
}


>


<option value="">

Select Category

</option>



{

categories.map(
(cat)=>(


<option

key={cat.id}

value={cat.id}

>

{cat.name}

</option>


)

)

}



</select>



</div>









{/* STATUS */}



<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>


<label
className="
text-sm
text-gray-400
"
>

Status

</label>



<select

className="
w-full
mt-3
p-3
rounded-xl
bg-black/30
border
border-white/10
"


value={
form.status
}


onChange={
(e)=>
updateField(
"status",
e.target.value
)
}


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


</div>









{/* NEWS CONTROL */}



<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
space-y-5
"

>


<h2
className="
font-semibold
"
>

News Controls

</h2>







<label

className="
flex
justify-between
items-center
"

>

Breaking


<input

type="checkbox"

checked={
form.breaking
}


onChange={
(e)=>
updateField(
"breaking",
e.target.checked
)
}


/>


</label>





{

form.breaking &&


<input

type="number"

placeholder="Breaking Priority"


className="
w-full
p-3
rounded-xl
bg-red-900/20
border
border-red-500/30
"


value={
form.breakingPriority
}


onChange={
(e)=>
updateField(
"breakingPriority",
Number(
e.target.value
)
)
}


/>


}









<label

className="
flex
justify-between
items-center
"

>

Flash News


<input

type="checkbox"

checked={
form.flash
}


onChange={
(e)=>
updateField(
"flash",
e.target.checked
)
}


/>


</label>







{

form.flash &&


<input

type="number"

placeholder="Flash Priority"


className="
w-full
p-3
rounded-xl
bg-orange-900/20
border
border-orange-500/30
"


value={
form.flashPriority
}


onChange={
(e)=>
updateField(
"flashPriority",
Number(
e.target.value
)
)
}


/>


}





<label

className="
flex
justify-between
items-center
"

>

Featured Article



<input

type="checkbox"

checked={
form.featured
}


onChange={
(e)=>
updateField(
"featured",
e.target.checked
)
}


/>


</label>





</div>









{/* SEO */}



<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
space-y-4
"

>


<h2
className="
font-semibold
"
>

SEO Settings

</h2>




<input

className="
w-full
p-3
rounded-xl
bg-black/30
border
border-white/10
"

placeholder="Meta Title"


value={
form.metaTitle
}


onChange={
(e)=>
updateField(
"metaTitle",
e.target.value
)
}


/>







<textarea

className="
w-full
p-3
rounded-xl
bg-black/30
border
border-white/10
h-28
"

placeholder="Meta Description"


value={
form.metaDescription
}


onChange={
(e)=>
updateField(
"metaDescription",
e.target.value
)
}


/>








<input

className="
w-full
p-3
rounded-xl
bg-black/30
border
border-white/10
"

placeholder="Meta Keywords"


value={
form.metaKeywords
}


onChange={
(e)=>
updateField(
"metaKeywords",
e.target.value
)
}


/>



</div>









{/* SUBMIT */}



<button

disabled={
loading
}


className="
w-full
py-4
rounded-xl
bg-orange-600
hover:bg-orange-700
font-semibold
transition
disabled:opacity-50
"

>


{

loading

?

"Publishing..."

:

"Create Post"

}



</button>





</div>







</form>





</div>


);

}