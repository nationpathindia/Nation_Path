"use client";


import {
  useEffect,
  useState
} from "react";


import {
  useRouter,
  useSearchParams
} from "next/navigation";


import {
  createDefaultPost
} from "./createDefaultPost";


import type {
  PostFormData
} from "./types";


import {
  usePostSubmit
} from "./hooks/usePostSubmit";


import BasicSection from "./sections/BasicSection";
import MediaSection from "./sections/MediaSection";
import VideoSection from "./sections/VideoSection";
import IntelligenceSection from "./sections/IntelligenceSection";
import FAQSection from "./sections/FAQSection";
import PublishSection from "./sections/PublishSection";
import ControlsSection from "./sections/ControlsSection";
import SEOSection from "./sections/SEOSection";





interface ArticleFormProps {


  mode?:

  "create"

  |

  "edit";



  initialData?:

  Partial<PostFormData>;



  postType?:

  "news"

  |

  "editorial";



}







export default function ArticleForm({

  mode="create",

  initialData,

  postType

}:ArticleFormProps){



const router = useRouter();


const searchParams =
useSearchParams();





const typeFromUrl =

(

postType

||

searchParams.get("type")

||

"news"

) as "news" | "editorial";








const [form,setForm] =

useState<PostFormData>(

createDefaultPost(typeFromUrl)

);







const [categories,setCategories] =

useState<any[]>([]);



const [uploading,setUploading] =

useState(false);



const [localError,setLocalError] =

useState("");







const [

slugLocked,

setSlugLocked

]

=

useState(

mode==="create"

);







const [

metaLocked,

setMetaLocked

]

=

useState(

mode==="create"

);








const {

submitPost,

loading,

message,

error

}

=

usePostSubmit();












/*
 EDIT DATA LOAD
*/


useEffect(()=>{


if(

mode==="edit"

&&

initialData

){



setForm(prev=>({



...prev,



...createDefaultPost(

initialData.postType || typeFromUrl

),



...initialData,



id:

initialData.id,




postType:

postType

||

initialData.postType

||

typeFromUrl,





isEditorial:

(

postType

||

initialData.postType

||

typeFromUrl

)

===

"editorial"




}));



}



},[

mode,

initialData,

typeFromUrl,

postType

]);












function updateField(

key:keyof PostFormData,

value:any

){



setForm(prev=>({

...prev,

[key]:value


}));



}









/*
 AUTO SLUG
*/


useEffect(()=>{


if(

slugLocked

&&

form.title

){



const slug =


form.title

.toLowerCase()

.trim()

.replace(

/[^a-z0-9]+/g,

"-"

)

.replace(

/^-+|-+$/g,

""

);






setForm(prev=>({

...prev,

slug

}));



}



},[

form.title,

slugLocked

]);









/*
 AUTO SEO
*/


useEffect(()=>{


if(

metaLocked

&&

form.title

){



setForm(prev=>({


...prev,


metaTitle:

form.title.substring(

0,

60

),




metaDescription:


form.shortBrief

?

form.shortBrief.substring(

0,

160

)

:

form.title.substring(

0,

160

)



}));



}



},[

form.title,

form.shortBrief,

metaLocked

]);









/*
 LOAD CATEGORIES
*/


useEffect(()=>{


async function loadCategories(){


try{


const res =

await fetch(

"/api/categories"

);



const data =

await res.json();





setCategories(

Array.isArray(data)

?

data

:

data?.categories || []

);



}

catch(err){


console.error(

"Category loading failed",

err

);



setCategories([]);

}



}



loadCategories();



},[]);









/*
 AI IMPORT
*/


useEffect(()=>{


if(

mode==="edit"

)

return;





const stored =

sessionStorage.getItem(

"nationpath_ai_article"

);



if(!stored)

return;







try{



const aiArticle =

JSON.parse(stored);






setForm(prev=>({



...prev,



...aiArticle,




postType:

typeFromUrl,





isEditorial:

typeFromUrl==="editorial",




status:

"draft"



}));







sessionStorage.removeItem(

"nationpath_ai_article"

);



}

catch(err){


console.error(

"AI import failed",

err

);



}



},[

mode,

typeFromUrl

]);











async function handleSubmit(

e:React.FormEvent

){


e.preventDefault();



setLocalError("");





const success =

await submitPost(

form,

mode

);







if(success){



setTimeout(()=>{


router.push(

"/admin/posts"

);



},1000);



}



}











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



<div className="mb-8">


<h1 className="text-3xl font-bold">


{

mode==="edit"

?

`Edit ${typeFromUrl.toUpperCase()} Post`

:

`Create ${typeFromUrl.toUpperCase()} Post`

}



</h1>




<p className="mt-2 text-orange-400">


NationPath Editorial CMS


</p>



</div>









{

(message || localError)

&&


<div className="mb-5 rounded-xl border border-blue-500 bg-blue-600/20 p-4 text-blue-300">


{message || localError}


</div>



}







{

error

&&


<div className="mb-5 rounded-xl border border-red-500 bg-red-600/20 p-4 text-red-300">


{error}


</div>



}








<form

onSubmit={handleSubmit}

className="grid grid-cols-1 gap-8 xl:grid-cols-3"

>



<div className="space-y-6 xl:col-span-2">



<BasicSection

form={form}

updateField={updateField}

slugLocked={slugLocked}

setSlugLocked={setSlugLocked}

/>






<IntelligenceSection

form={form}

updateField={updateField}

/>






<MediaSection

form={form}

updateField={updateField}

uploading={uploading}

setUploading={setUploading}

setError={setLocalError}

/>






<VideoSection

form={form}

updateField={updateField}

/>






<FAQSection

form={form}

updateField={updateField}

/>





</div>









<div className="space-y-6">



<PublishSection

form={form}

updateField={updateField}

categories={categories}

/>






<ControlsSection

form={form}

updateField={updateField}

/>






<SEOSection

form={form}

updateField={updateField}

metaLocked={metaLocked}

setMetaLocked={setMetaLocked}

/>







<button

disabled={loading}

className="w-full rounded-xl bg-orange-600 py-4 font-semibold transition hover:bg-orange-700 disabled:opacity-50"

>


{

loading

?

mode==="edit"

?

"Updating..."

:

"Saving..."

:

mode==="edit"

?

"Update Post"

:

"Create Post"

}



</button>






</div>





</form>






</div>


);



}