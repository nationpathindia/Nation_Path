"use client";

import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useRouter
} from "next/navigation";


import Editor from "@/components/Editor";

import VideoPreview from "@/components/admin/article/VideoPreview";

import ArticleIntelligenceForm from "@/components/admin/article/ArticleIntelligenceForm";





interface AISummary {

  overview:string;

  points:string[];

  impact:string;

  takeaway:string;

}





interface FAQItem {

  question:string;

  answer:string;

}





interface ArticleForm {


  title:string;


  slug:string;


  content:string;



  categoryId:string;



  images:string[];



  videoUrl:string;


  videoPosition:string;




  breaking:boolean;


  featured:boolean;



  breakingPriority:number;


  homepagePriority:number;



  breakingDuration:string;


  featuredDuration:string;





  keyHighlights:string;


  whyItMatters:string;





  shortBrief:string;


  background:string;


  timeline:any;



  expertOpinion:any;


  factCheck:any;



  whatsNext:string;


  keyTakeaways:string;


  sourceDesk:string;




  faqItems:FAQItem[];





  publishedAt:string;





  metaTitle:string;


  metaDescription:string;


  metaKeywords:string;




  status:string;


  live:boolean;


}









const initialForm:ArticleForm={



  title:"",


  slug:"",



  content:"",



  categoryId:"",



  images:[],


  videoUrl:"",


  videoPosition:"top",





  breaking:false,


  featured:false,



  breakingPriority:0,


  homepagePriority:0,



  breakingDuration:"30",


  featuredDuration:"24",







  keyHighlights:"",


  whyItMatters:"",





  shortBrief:"",


  background:"",


  timeline:[],




  expertOpinion:[],


  factCheck:[],





  whatsNext:"",


  keyTakeaways:"",


  sourceDesk:"",





  faqItems:[],





  publishedAt:"",





  metaTitle:"",


  metaDescription:"",


  metaKeywords:"",




  status:"pending",


  live:true



};
export default function EditPost(){



const {
id
}=useParams();



const router = useRouter();






const [loading,setLoading] =
useState(true);


const [saving,setSaving] =
useState(false);



const [uploading,setUploading] =
useState(false);



const [categories,setCategories] =
useState<any[]>([]);



const [error,setError] =
useState("");



const [message,setMessage] =
useState("");



const [aiLoading,setAiLoading] =
useState(false);



const [aiSummary,setAiSummary] =
useState<AISummary | null>(null);




const [slugLocked,setSlugLocked] =
useState(true);




const [form,setForm] =
useState<ArticleForm>(initialForm);










// =====================================================
// LOAD ARTICLE
// =====================================================


useEffect(()=>{


if(!id) return;



async function loadArticle(){


try{


setLoading(true);



const res =
await fetch(
`/api/articles/${id}`
);



const data =
await res.json();




if(!data.success){

throw new Error(
data.error || "Article not found"
);

}




const article =
data.article;







setForm({



title:
article.title || "",




slug:
article.slug || "",




content:
article.content || "",





categoryId:
article.categoryId || "",






images:

Array.isArray(article.images)

?

article.images

:

[],







videoUrl:
article.videoUrl || "",




videoPosition:
article.videoPosition || "top",







breaking:
Boolean(article.breaking),




featured:
Boolean(article.featured),






breakingPriority:
article.breakingPriority || 0,



homepagePriority:
article.homepagePriority || 0,





breakingDuration:
"30",





featuredDuration:
"24",







keyHighlights:

Array.isArray(article.keyHighlights)

?

article.keyHighlights.join("\n")

:

""

,







whyItMatters:

article.whyItMatters || "",







shortBrief:

article.shortBrief || "",






background:

article.background || "",






timeline:

article.timeline || [],







expertOpinion:

article.expertOpinion || [],






factCheck:

article.factCheck || [],







whatsNext:

article.whatsNext || "",






keyTakeaways:

Array.isArray(article.keyTakeaways)

?

article.keyTakeaways.join("\n")

:

""

,






sourceDesk:

article.sourceDesk || "",








faqItems:

Array.isArray(article.faqItems)

?

article.faqItems

:

[],







publishedAt:

article.publishedAt

?

new Date(article.publishedAt)
.toISOString()
.slice(0,16)

:

""

,







metaTitle:

article.metaTitle || "",





metaDescription:

article.metaDescription || "",





metaKeywords:

article.metaKeywords || "",







status:

article.status || "pending",





live:

article.live ?? true





});







if(article.aiSummary){

setAiSummary(
article.aiSummary
);

}





}
catch(err:any){


setError(
err.message ||
"Failed loading article"
);



}
finally{


setLoading(false);


}



}



loadArticle();



},[id]);











// =====================================================
// LOAD CATEGORIES
// =====================================================


useEffect(()=>{


async function loadCategories(){


try{


const res =
await fetch(
"/api/categories"
);



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
"Category loading failed",
err
);



setCategories([]);


}



}




loadCategories();



},[]);

// =====================================================
// UPDATE FIELD
// =====================================================


function updateField(
  key:keyof ArticleForm,
  value:any
){


setForm(prev=>({

...prev,

[key]:value


}));


}









// =====================================================
// SLUG SYSTEM
// =====================================================


function createSlug(
value:string
){


return value

.toLowerCase()

.trim()

.replace(/[^a-z0-9\s-]/g,"")

.replace(/\s+/g,"-")

.replace(/-+/g,"-");


}







function handleTitleChange(
value:string
){


setForm(prev=>({


...prev,


title:value,



slug:

slugLocked

?

createSlug(value)

:

prev.slug,




metaTitle:

prev.metaTitle

?

prev.metaTitle

:

value



}));


}








function toggleSlugLock(){


setSlugLocked(prev=>!prev);


}










// =====================================================
// IMAGE REMOVE
// =====================================================


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











// =====================================================
// IMAGE UPLOAD
// =====================================================


async function uploadImage(
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
"Image size must be under 2MB"
);

}






const fd =
new FormData();



fd.append(
"file",
file
);





const res =
await fetch(
"/api/upload",
{

method:"POST",

body:fd

}

);





const data =
await res.json();





if(data.url){

uploaded.push(
data.url
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

"Upload failed"

);


}
finally{


setUploading(false);


}



}












// =====================================================
// AI SUMMARY
// =====================================================


async function generateAISummary(){


if(!id) return;





try{


setAiLoading(true);



const res =
await fetch(

`/api/articles/${id}/ai-summary`,

{

method:"POST"

}

);






const data =
await res.json();






if(!data.success){


throw new Error(

data.error ||

"AI Summary failed"

);


}







setAiSummary(
data.summary
);





setMessage(
"AI Summary generated successfully ✅"
);




}
catch(err:any){



setError(

err.message ||

"AI Summary failed"

);


}
finally{


setAiLoading(false);


}



}

// =====================================================
// SUBMIT UPDATE
// =====================================================


async function handleSubmit(
e:React.FormEvent
){


e.preventDefault();



if(!id) return;





try{


setSaving(true);


setError("");

setMessage("");







const payload = {


...form,





keyHighlights:

form.keyHighlights

.split("\n")

.map(item=>item.trim())

.filter(Boolean),







keyTakeaways:

form.keyTakeaways

.split("\n")

.map(item=>item.trim())

.filter(Boolean),






publishedAt:

form.publishedAt

?

new Date(
form.publishedAt
).toISOString()

:

null





};








const res =

await fetch(

`/api/articles/${id}`,

{

method:"PUT",


headers:{

"Content-Type":

"application/json"

},


body:

JSON.stringify(payload)


}

);








const data =

await res.json();






if(!data.success){


throw new Error(

data.error ||

"Article update failed"

);


}







setMessage(

"Article updated successfully ✅"

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

"Update failed"

);



}
finally{


setSaving(false);


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


<div

className="
max-w-7xl
mx-auto
"

>




<div

className="
mb-8
"

>


<h1

className="
text-3xl
font-bold
"

>

Edit Article

</h1>



<p

className="
mt-2
text-orange-400
"

>

NationPath Editorial CMS

</p>



</div>







{
message &&

<div

className="
mb-6
rounded-xl
border
border-green-500
bg-green-600/20
p-4
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
rounded-xl
border
border-red-500
bg-red-600/20
p-4
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
gap-8
xl:grid-cols-3
"

>









{/* ================= LEFT ================= */}



<div

className="
space-y-6
xl:col-span-2
"

>








{/* ARTICLE INFO */}


<div

className="
rounded-2xl
border
border-white/10
bg-[#0e1726]
p-6
"

>


<h2

className="
mb-5
font-semibold
"

>

Article Information

</h2>







<input


value={form.title}


onChange={e=>

handleTitleChange(
e.target.value
)

}


placeholder="Headline"



className="
w-full
rounded-xl
border
border-white/10
bg-black/30
p-4
"




/>








<div

className="
mt-5
grid
gap-4
md:grid-cols-2
"

>







<div>


<div

className="
flex
justify-between
"

>


<label

className="
text-sm
text-gray-400
"

>

Slug

</label>




<button

type="button"

onClick={toggleSlugLock}

className="
text-xs
text-orange-400
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


value={form.slug}



disabled={slugLocked}



onChange={e=>

updateField(

"slug",

e.target.value

)

}



className="
mt-2
w-full
rounded-xl
border
border-white/10
bg-black/30
p-3
"




/>



</div>











<div>


<label

className="
text-sm
text-gray-400
"

>

Category

</label>





<select


value={form.categoryId}



onChange={e=>

updateField(

"categoryId",

e.target.value

)

}



className="
mt-2
w-full
rounded-xl
border
border-white/10
bg-black/30
p-3
"

>



<option value="">

Select Category

</option>




{

categories.map(cat=>(


<option

key={cat.id}

value={cat.id}

>

{cat.name}

</option>



))

}



</select>



</div>





</div>




</div>













{/* EDITOR */}



<div

className="
overflow-hidden
rounded-2xl
bg-white
"

>


<Editor


value={form.content}



onChange={value=>

updateField(

"content",

value

)

}


/>


</div>













{/* ARTICLE INTELLIGENCE */}



<ArticleIntelligenceForm


form={form}



updateField={updateField}


/>













{/* KEY HIGHLIGHTS */}



<div

className="
rounded-2xl
border
border-white/10
bg-[#0e1726]
p-6
"

>


<h2

className="
mb-4
font-semibold
"

>

Key Highlights ⭐

</h2>




<textarea


value={form.keyHighlights}



onChange={e=>

updateField(

"keyHighlights",

e.target.value

)

}



placeholder="
Important points
"




className="
h-36
w-full
rounded-xl
border
border-white/10
bg-black/30
p-4
"




/>



</div>












{/* WHY IT MATTERS */}



<div

className="
rounded-2xl
border
border-white/10
bg-[#0e1726]
p-6
"

>


<h2

className="
mb-4
font-semibold
"

>

Why It Matters ⭐

</h2>





<textarea


value={form.whyItMatters}



onChange={e=>

updateField(

"whyItMatters",

e.target.value

)

}




placeholder="
Explain why this matters...
"




className="
h-36
w-full
rounded-xl
border
border-white/10
bg-black/30
p-4
"




/>



</div>









{/* FAQ */}



<div

className="
rounded-2xl
border
border-white/10
bg-[#0e1726]
p-6
"

>


<div

className="
mb-5
flex
items-center
justify-between
"

>


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


{

question:"",

answer:""

}

]


}))


}


className="
rounded-lg
bg-blue-600
px-4
py-2
"

>

+ Add FAQ

</button>



</div>








{

form.faqItems.map((item,index)=>(


<div

key={index}

className="
mb-4
rounded-xl
bg-black/20
p-4
"

>


<input


value={item.question}



onChange={e=>

setForm(prev=>({


...prev,


faqItems:

prev.faqItems.map((f,i)=>

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



placeholder="Question"



className="
mb-3
w-full
rounded-xl
bg-black/30
p-3
"




/>





<textarea


value={item.answer}



onChange={e=>

setForm(prev=>({


...prev,


faqItems:

prev.faqItems.map((f,i)=>

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



placeholder="Answer"



className="
h-28
w-full
rounded-xl
bg-black/30
p-3
"




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
mt-3
text-red-400
"

>

Remove

</button>




</div>


))


}





</div>














{/* VIDEO */}



<div

className="
rounded-2xl
border
border-white/10
bg-[#0e1726]
p-6
"

>


<h2 className="mb-4 font-semibold">

Video

</h2>





<input


value={form.videoUrl}



onChange={e=>

updateField(

"videoUrl",

e.target.value

)

}



placeholder="YouTube URL"



className="
w-full
rounded-xl
bg-black/30
p-3
"




/>





<VideoPreview

url={form.videoUrl}

/>






<select


value={form.videoPosition}



onChange={e=>

updateField(

"videoPosition",

e.target.value

)

}



className="
mt-4
w-full
rounded-xl
bg-black/30
p-3
"

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
rounded-2xl
border
border-white/10
bg-[#0e1726]
p-6
"

>


<h2 className="mb-4 font-semibold">

Media Gallery

</h2>






<input


type="file"


multiple


accept="image/*"



onChange={e=>{


if(e.target.files)

uploadImage(

e.target.files

);


}}



/>






{

uploading &&

<p className="mt-3 text-orange-400">

Uploading...

</p>

}








<div

className="
mt-5
flex
flex-wrap
gap-4
"

>


{

form.images.map((img,index)=>(


<div

key={index}

className="relative"

>


<img


src={img}


className="
h-24
w-32
rounded-xl
object-cover
"




/>





<button


type="button"


onClick={()=>removeImage(index)}



className="
absolute
right-1
top-1
rounded-full
bg-red-600
px-2
"

>

×

</button>





</div>


))


}





</div>




</div>










{/* AI SUMMARY */}



<div

className="
rounded-2xl
border
border-white/10
bg-[#0e1726]
p-6
"

>


<h2 className="mb-4 font-semibold">

AI Summary Intelligence 🤖

</h2>





<button


type="button"



disabled={aiLoading}



onClick={generateAISummary}



className="
rounded-xl
bg-blue-600
px-5
py-3
"

>


{

aiLoading

?

"Generating..."

:

"Generate AI Summary"

}



</button>







{

aiSummary &&


<div

className="
mt-5
space-y-4
rounded-xl
bg-black/30
p-4
"

>



<div>

<h3 className="font-semibold">

Overview

</h3>

<p className="mt-2 text-gray-300">

{aiSummary.overview}

</p>

</div>






<div>

<h3 className="font-semibold">

Key Points

</h3>


<ul className="mt-2 list-disc pl-5 text-gray-300">

{

aiSummary.points?.map((item,index)=>(

<li key={index}>

{item}

</li>

))

}

</ul>

</div>







<div>

<h3 className="font-semibold">

Impact

</h3>


<p className="mt-2 text-gray-300">

{aiSummary.impact}

</p>


</div>







<div>

<h3 className="font-semibold">

Takeaway

</h3>


<p className="mt-2 text-gray-300">

{aiSummary.takeaway}

</p>


</div>





</div>


}





</div>







</div>














{/* ================= RIGHT COLUMN ================= */}




<div

className="
space-y-6
"

>








{/* PUBLISHING */}



<div

className="
rounded-2xl
border
border-white/10
bg-[#0e1726]
p-6
"

>


<h2 className="mb-4 font-semibold">

Publishing

</h2>





<input


type="datetime-local"



value={form.publishedAt}



onChange={e=>

updateField(

"publishedAt",

e.target.value

)

}



className="
w-full
rounded-xl
bg-black/30
p-3
"




/>







<select


value={form.status}



onChange={e=>

updateField(

"status",

e.target.value

)

}



className="
mt-4
w-full
rounded-xl
bg-black/30
p-3
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



<option value="archived">

Archived

</option>



</select>







<label className="
mt-4
flex
justify-between
"

>


Live



<input


type="checkbox"


checked={form.live}



onChange={e=>

updateField(

"live",

e.target.checked

)

}



/>


</label>






</div>













{/* NEWS CONTROLS */}



<div

className="
space-y-5
rounded-2xl
border
border-white/10
bg-[#0e1726]
p-6
"

>


<h2 className="font-semibold">

News Controls

</h2>






<label className="
flex
justify-between
"

>

Breaking


<input


type="checkbox"


checked={form.breaking}



onChange={e=>

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


value={form.breakingDuration}



onChange={e=>

updateField(

"breakingDuration",

e.target.value

)

}



className="
w-full
rounded-xl
bg-black/30
p-3
"

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








<label className="
flex
justify-between
"

>

Featured



<input


type="checkbox"


checked={form.featured}



onChange={e=>

updateField(

"featured",

e.target.checked

)

}



/>


</label>







<input


type="number"


value={form.homepagePriority}



onChange={e=>

updateField(

"homepagePriority",

Number(e.target.value)

)

}



placeholder="Homepage Priority"



className="
w-full
rounded-xl
bg-black/30
p-3
"




/>




</div>














{/* SEO */}



<div

className="
space-y-4
rounded-2xl
border
border-white/10
bg-[#0e1726]
p-6
"

>


<h2 className="font-semibold">

SEO

</h2>





<input


value={form.metaTitle}



onChange={e=>

updateField(

"metaTitle",

e.target.value

)

}



placeholder="Meta Title"



className="
w-full
rounded-xl
bg-black/30
p-3
"




/>






<textarea


value={form.metaDescription}



onChange={e=>

updateField(

"metaDescription",

e.target.value

)

}



placeholder="Meta Description"



className="
h-28
w-full
rounded-xl
bg-black/30
p-3
"




/>








<input


value={form.metaKeywords}



onChange={e=>

updateField(

"metaKeywords",

e.target.value

)

}



placeholder="Meta Keywords"



className="
w-full
rounded-xl
bg-black/30
p-3
"




/>





</div>













<button


disabled={saving}



className="
w-full
rounded-xl
bg-orange-600
py-4
text-lg
font-semibold
"

>


{

saving

?

"Updating Article..."

:

"Update Article"

}



</button>









</div>







</form>






</div>





</div>



);

}