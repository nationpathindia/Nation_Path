// components/admin/posts/sections/SEOSection.tsx

"use client";


import {
  useEffect
} from "react";


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



  metaLocked:boolean;



  setMetaLocked:
  (
    value:boolean
  )=>void;



}







function stripHtml(
html:string
){


return html

.replace(
/<[^>]*>/g,
""
)

.trim();


}









export default function SEOSection({

form,

updateField,

metaLocked,

setMetaLocked

}:Props){





useEffect(()=>{


if(

metaLocked

&&

form.title

){


updateField(

"metaTitle",

form.title.substring(
0,
60
)

);


}


},[

form.title,

metaLocked

]);










useEffect(()=>{


if(

metaLocked

&&

form.content

){



const text =

stripHtml(
form.content
);



updateField(

"metaDescription",

text.substring(
0,
160
)

);


}



},[

form.content,

metaLocked

]);









return (


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



<div

className="
flex
justify-between
items-center
"

>


<div>


<h2 className="font-semibold">

SEO

</h2>


<p className="text-xs text-gray-400 mt-1">

Auto generated but manually editable

</p>


</div>





<button

type="button"

onClick={()=>setMetaLocked(!metaLocked)}

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

metaLocked

?

"Auto SEO"

:

"Manual SEO"

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


placeholder="Meta Title"



value={form.metaTitle}



onChange={(e)=>

updateField(

"metaTitle",

e.target.value

)

}



/>









<textarea


className="
w-full
h-28
p-3
rounded-xl
bg-black/30
border
border-white/10
"



placeholder="Meta Description"



value={form.metaDescription}



onChange={(e)=>

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


placeholder="Meta Keywords (comma separated)"



value={form.metaKeywords}



onChange={(e)=>

updateField(

"metaKeywords",

e.target.value

)

}



/>









</div>


);


}