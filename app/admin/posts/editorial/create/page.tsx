"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Editor from "@/components/Editor";
import ArticleIntelligenceForm from "@/components/admin/article/ArticleIntelligenceForm";


export const dynamic = "force-dynamic";



type ImageGalleryItem = {

  url:string;

  alt:string;

  caption:string;

  isPrimary:boolean;

};



type FAQItem = {

  question:string;

  answer:string;

};



type ExpertOpinion = {

  name:string;

  role:string;

  quote:string;

  opinion?:string;

};



type FactCheck = {

  claim:string;

  status:string;

  explanation:string;

  sources?:string;

};





function generateSlug(title:string){

  return title

    .toLowerCase()

    .trim()

    .replace(/[^a-z0-9\s-]/g,"")

    .replace(/\s+/g,"-")

    .replace(/-+/g,"-");

}





function stripHtml(html:string){

  return html.replace(/<[^>]*>?/gm,"");

}





function createEmptyFAQ():FAQItem{

  return {

    question:"",

    answer:""

  };

}







export default function CreateEditorial(){


const router = useRouter();




const [loading,setLoading] = useState(false);


const [uploading,setUploading] = useState(false);


const [message,setMessage] = useState("");


const [error,setError] = useState("");



const [slugLocked,setSlugLocked] = useState(true);







const [form,setForm] = useState({


title:"",

slug:"",

content:"",



postType:"editorial",

isEditorial:true,


category:"Editorial",




imageGallery:

[] as ImageGalleryItem[],



images:

[] as string[],





videoUrl:"",

videoPosition:"top",




breaking:false,

featured:false,


breakingPriority:0,

homepagePriority:0,


breakingDuration:"30",

featuredDuration:"24",





keyHighlights: [] as string[],

whyItMatters:"",





shortBrief:"",

background:"",

timeline:"",




expertOpinion:

[] as ExpertOpinion[],





factCheck:

[] as FactCheck[],





whatsNext:"",





keyTakeaways:

[] as string[],





sourceDesk:"",





faqItems:

[] as FAQItem[],





publishedAt:"",



metaTitle:"",

metaDescription:"",

metaKeywords:"",





status:"pending",

live:true



});









function updateField(

key:string,

value:any

){


setForm(prev=>({

...prev,

[key]:value


}));



}









useEffect(()=>{


if(

form.title &&

slugLocked

){



setForm(prev=>({


...prev,


slug:

generateSlug(prev.title),



metaTitle:

prev.metaTitle || prev.title



}));



}



},[

form.title,

slugLocked

]);









useEffect(()=>{


if(

form.content &&

!form.metaDescription

){



const clean = stripHtml(

form.content

);



setForm(prev=>({


...prev,


metaDescription:

clean.substring(0,160)


}));



}



},[

form.content

]);









function syncPrimaryImages(

gallery:ImageGalleryItem[]

){


const primary =


gallery.find(

img=>img.isPrimary

)

||

gallery[0];




return {



imageGallery:



gallery.map(

(img,index)=>(


{

...img,


isPrimary:

primary

?

img.url===primary.url

:

index===0



}



)

),




images:



primary

?

[primary.url]

:

[]



};



}









function setPrimaryImage(index:number){



setForm(prev=>{



const updated =


prev.imageGallery.map(

(img,i)=>(


{

...img,


isPrimary:

i===index



}



)

);





return {


...prev,


...syncPrimaryImages(updated)



};



});



}









function removeImage(index:number){



setForm(prev=>{



const filtered =


prev.imageGallery.filter(

(_,i)=>i!==index

);




return {


...prev,


...syncPrimaryImages(filtered)



};



});



}







async function handleImageUpload(

files:FileList

){



if(

files.length + form.imageGallery.length > 5

){


setError(

"Maximum 5 images allowed"

);


return;


}





setUploading(true);

setError("");



try{



const uploaded:ImageGalleryItem[]=[];



for(

const file of Array.from(files)

){



if(

file.size > 2 * 1024 * 1024

){


throw new Error(

"Image size must be under 2MB"

);


}




const fd = new FormData();



fd.append(

"file",

file

);





fd.append(

"upload_preset",

process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!

);







const response = await fetch(


`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,

{

method:"POST",

body:fd

}


);





const data = await response.json();





if(data.secure_url){



uploaded.push({


url:data.secure_url,



alt:

form.title

?

`${form.title} - NationPath Editorial Image`

:

"NationPath Editorial Image",




caption:

form.title ||

"NationPath Editorial",




isPrimary:false



});



}



}






setForm(prev=>{



const merged=[


...prev.imageGallery,


...uploaded



];




return {



...prev,


...syncPrimaryImages(merged)



};



});





}

catch(err:any){



setError(

err.message || "Upload failed"

);



}

finally{


setUploading(false);


}



}
/* =====================================================
   SUBMIT
===================================================== */


async function handleSubmit(
e:React.FormEvent
){

e.preventDefault();


setLoading(true);

setError("");

setMessage("");



if(
!form.title.trim()
||
!form.content.trim()
){

setError(
"Title and content required"
);


setLoading(false);


return;

}





try{


const primaryImage =


form.imageGallery.find(

img=>img.isPrimary

)

||

form.imageGallery[0];




const payload = {


...form,

keyHighlights:

Array.isArray(form.keyHighlights)

?

form.keyHighlights
.filter(
(item:string)=>item.trim()
)

:

[],


images:

primaryImage

?

[primaryImage.url]

:

[],




publishedAt:


form.publishedAt

?

new Date(

form.publishedAt

).toISOString()

:

null,






expertOpinion:


Array.isArray(form.expertOpinion)

?

form.expertOpinion

:

[],






factCheck:


Array.isArray(form.factCheck)

?

form.factCheck

:

[],







keyTakeaways:


Array.isArray(form.keyTakeaways)

?

form.keyTakeaways

:

[],







faqItems:


Array.isArray(form.faqItems)

?

form.faqItems

:

[]



};







console.log(
"EDITORIAL PAYLOAD",
payload
);






const res = await fetch(

"/api/articles",

{

method:"POST",

headers:{


"Content-Type":

"application/json"


},


body:

JSON.stringify(payload)


}

);






const data = await res.json();







if(!res.ok){


throw new Error(

data.error ||

"Editorial create failed"

);


}





setMessage(

"Editorial created successfully 🚀"

);





setTimeout(()=>{


router.push(

"/admin/posts"

);


},1200);





}

catch(err:any){



setError(

err.message ||

"Failed"

);



}

finally{


setLoading(false);


}



}









/* =====================================================
   RETURN
===================================================== */



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

Create Editorial

</h1>



<p className="text-orange-400 mt-2">

NationPath Editorial CMS

</p>



</div>









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









{/* LEFT COLUMN */}


<div

className="
xl:col-span-2
space-y-6
"

>











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


<label>

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
"


placeholder="Enter editorial headline"



value={form.title}




onChange={(e)=>


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



<div className="flex justify-between mb-3">



<label>

URL Slug

</label>





<button


type="button"


onClick={()=>setSlugLocked(!slugLocked)}



className="
bg-orange-600
px-4
py-2
rounded-lg
text-sm
"

>


{


slugLocked

?

"Auto"

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


disabled={slugLocked}



value={form.slug}





onChange={(e)=>


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


value={form.content}



onChange={(v:string)=>


updateField(

"content",

v

)


}



/>



</div>














{/* ARTICLE INTELLIGENCE */}



<ArticleIntelligenceForm


form={form}


updateField={updateField}


/>





{/* FAQ SECTION */}



<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>


<div className="flex justify-between mb-5">


<h2 className="font-semibold">

FAQ Section ⭐

</h2>




<button


type="button"


onClick={()=>


setForm(prev=>({


...prev,


faqItems:[


...prev.faqItems,


createEmptyFAQ()


]



}))


}



className="
bg-blue-600
px-4
py-2
rounded-lg
"

>


+ Add FAQ


</button>



</div>








{


form.faqItems.map(

(item,index)=>(


<div

key={index}

className="
mb-5
p-4
bg-black/20
rounded-xl
"

>


<input


className="
w-full
mb-3
p-3
rounded-xl
bg-black/30
"

placeholder="Question"



value={item.question}




onChange={(e)=>


setForm(prev=>({


...prev,


faqItems:


prev.faqItems.map(

(f,i)=>

i===index

?

{

...f,

question:e.target.value

}

:

f

)


}))



}



/>









<textarea


className="
w-full
h-28
p-3
rounded-xl
bg-black/30
"


placeholder="Answer"



value={item.answer}





onChange={(e)=>


setForm(prev=>({


...prev,


faqItems:


prev.faqItems.map(

(f,i)=>

i===index

?

{

...f,

answer:e.target.value

}

:

f

)


}))



}




/>







<button


type="button"



onClick={()=>


setForm(prev=>({


...prev,


faqItems:


prev.faqItems.filter(

(_,i)=>i!==index

)



}))



}



className="
text-red-400
mt-3
"

>


Remove


</button>






</div>


)


)


}







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



<h2 className="font-semibold mb-4">

Video

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



placeholder="YouTube URL"



value={form.videoUrl}





onChange={(e)=>


updateField(

"videoUrl",

e.target.value

)


}





/>







<select


className="
w-full
mt-4
p-3
rounded-xl
bg-black/30
border
border-white/10
"


value={form.videoPosition}




onChange={(e)=>


updateField(

"videoPosition",

e.target.value

)


}



>


<option value="top">

Top

</option>


<option value="middle">

Middle

</option>


<option value="bottom">

Bottom

</option>



</select>






</div>













{/* MEDIA GALLERY */}



<div


className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"


>


<h2 className="font-semibold mb-4">

Media Gallery

</h2>






<input


type="file"


multiple


accept="image/*"




onChange={(e)=>


e.target.files &&

handleImageUpload(

e.target.files

)



}


/>







{


uploading &&


<p className="text-orange-400 mt-3">

Uploading...

</p>



}









<div className="space-y-6 mt-6">






{


form.imageGallery.map(

(img,index)=>(



<div


key={index}



className="
bg-black/20
rounded-xl
p-4
"


>







<img


src={img.url}


alt={img.alt}



className="
w-full
h-48
object-cover
rounded-xl
mb-4
"


/>










<input


className="
w-full
mb-3
p-3
rounded-xl
bg-black/30
"


placeholder="Alt text"



value={img.alt}




onChange={(e)=>


setForm(prev=>({


...prev,


imageGallery:


prev.imageGallery.map(

(item,i)=>


i===index

?

{

...item,

alt:e.target.value

}

:

item


)



}))



}



/>









<input


className="
w-full
mb-3
p-3
rounded-xl
bg-black/30
"



placeholder="Caption"



value={img.caption}




onChange={(e)=>


setForm(prev=>({


...prev,


imageGallery:


prev.imageGallery.map(

(item,i)=>


i===index

?

{

...item,

caption:e.target.value

}

:

item


)



}))



}



/>









<div className="flex gap-3">





<button


type="button"


onClick={()=>setPrimaryImage(index)}



className="
bg-orange-600
px-4
py-2
rounded-lg
"

>


{


img.isPrimary

?

"⭐ Primary"

:

"Set Primary"



}



</button>








<button


type="button"



onClick={()=>removeImage(index)}



className="
bg-red-600
px-4
py-2
rounded-lg
"

>


Remove


</button>






</div>






</div>



)



)



}






</div>






</div>






</div>






{/* RIGHT COLUMN */}



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



<h2 className="font-semibold mb-4">

Publishing

</h2>





<div

className="
p-3
rounded-xl
bg-black/30
"

>


Editorial


</div>





<p className="text-xs text-gray-400 mt-3">

Editorial category locked

</p>





</div>















{/* SCHEDULE */}



<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>


<h2 className="font-semibold mb-4">

Schedule Publish

</h2>





<input


type="datetime-local"


className="
w-full
p-3
rounded-xl
bg-black/30
"




value={form.publishedAt}




onChange={(e)=>


updateField(

"publishedAt",

e.target.value

)


}



/>



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


<h2 className="font-semibold mb-4">

Status

</h2>






<select


className="
w-full
p-3
rounded-xl
bg-black/30
"




value={form.status}





onChange={(e)=>


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



</select>





</div>















{/* CONTROLS */}



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



<h2 className="font-semibold">

Editorial Controls

</h2>








<label className="flex justify-between">


Featured




<input


type="checkbox"



checked={form.featured}





onChange={(e)=>


updateField(

"featured",

e.target.checked

)


}



/>



</label>









<label className="flex justify-between">


Breaking




<input


type="checkbox"



checked={form.breaking}





onChange={(e)=>


updateField(

"breaking",

e.target.checked

)


}



/>



</label>









{

form.breaking &&





<select


className="
w-full
p-3
rounded-xl
bg-black/30
"




value={form.breakingDuration}





onChange={(e)=>


updateField(

"breakingDuration",

e.target.value

)


}




>


<option value="30">

30 Minutes

</option>


<option value="60">

1 Hour

</option>


<option value="180">

3 Hours

</option>


<option value="1440">

24 Hours

</option>



</select>




}





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



<h2 className="font-semibold">

SEO

</h2>







<input


className="
w-full
p-3
rounded-xl
bg-black/30
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
"




placeholder="Meta Keywords"




value={form.metaKeywords}




onChange={(e)=>


updateField(

"metaKeywords",

e.target.value

)


}




/>





</div>















{/* SUBMIT */}



<button


type="submit"



disabled={loading}



className="
w-full
py-4
rounded-xl
bg-orange-600
font-semibold
"

>


{


loading

?

"Publishing..."

:

"Create Editorial"



}



</button>







</div>








</form>






</div>



);

}