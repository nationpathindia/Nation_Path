"use client";

import Editor from "@/components/Editor";

import type {
  PostFormData
} from "../types";


interface Props {

  form:PostFormData;

  updateField:
  (
    key:keyof PostFormData,
    value:any
  )=>void;


  slugLocked:boolean;


  setSlugLocked:
  (
    value:boolean
  )=>void;

}





function generateSlug(title:string){

  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g,"")
    .replace(/\s+/g,"-")
    .replace(/-+/g,"-");

}






export default function BasicSection({

form,

updateField,

slugLocked,

setSlugLocked

}:Props){





function handleTitleChange(
value:string
){


updateField(
"title",
value
);



if(slugLocked){


updateField(

"slug",

generateSlug(value)

);


}



}





function toggleSlugMode(){


const next =
!slugLocked;



setSlugLocked(
next
);



if(next){


updateField(

"slug",

generateSlug(
form.title
)

);


}



}







return (

<div className="space-y-6">





{/* HEADLINE */}

<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>


<label className="text-sm text-gray-300">

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
text-white
"

placeholder="Enter headline"


value={form.title}



onChange={(e)=>

handleTitleChange(
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


<label className="text-sm text-gray-300">

URL Slug

</label>




<button

type="button"

onClick={toggleSlugMode}

className="
bg-orange-600
hover:bg-orange-700
px-4
py-2
rounded-lg
text-xs
font-semibold
"

>


{

slugLocked

?

"Auto Slug"

:

"Manual Slug"

}


</button>



</div>






<input

disabled={slugLocked}

className="
w-full
p-3
rounded-xl
bg-black/30
border
border-white/10
text-white
disabled:opacity-50
"


placeholder="article-url-slug"



value={form.slug}



onChange={(e)=>

updateField(

"slug",

e.target.value

)

}



/>



<p className="text-xs text-gray-500 mt-2">


{

slugLocked

?

"Slug automatically generated from headline"

:

"Manual slug editing enabled"

}


</p>



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

value={form.content}



onChange={(value:string)=>

updateField(

"content",

value

)

}


/>


</div>






</div>


);


}