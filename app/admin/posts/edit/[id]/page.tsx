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



timeline:string;



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



timeline:"",



expertOpinion:{


name:"",


role:"",


quote:""


},




factCheck:{


claim:"",


status:"",


explanation:"",


sources:""


},





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



const router=useRouter();






const [loading,setLoading]=useState(true);


const [saving,setSaving]=useState(false);



const [uploading,setUploading]=useState(false);



const [categories,setCategories]=useState<any[]>([]);



const [error,setError]=useState("");



const [message,setMessage]=useState("");



const [aiLoading,setAiLoading]=useState(false);



const [aiSummary,setAiSummary]=useState<AISummary|null>(null);





const [slugLocked,setSlugLocked]=useState(true);





const [form,setForm]=useState<ArticleForm>(
initialForm
);








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
"Article not found"
);

}





const article=data.article;








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
article.breakingDuration || "30",




featuredDuration:
article.featuredDuration || "24",






keyHighlights:

Array.isArray(article.keyHighlights)

?

article.keyHighlights.join("\n")

:

"",





whyItMatters:
article.whyItMatters || "",







shortBrief:
article.shortBrief || "",





background:
article.background || "",





timeline:
article.timeline || "",





expertOpinion:

article.expertOpinion || {

name:"",

role:"",

quote:""

},





factCheck:

article.factCheck || {

claim:"",

status:"",

explanation:"",

sources:""

},






whatsNext:
article.whatsNext || "",






keyTakeaways:

Array.isArray(article.keyTakeaways)

?

article.keyTakeaways.join("\n")

:

"",





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

"",





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
// SLUG LOCK
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

prev.metaTitle || value



}));



}







function toggleSlugLock(){


setSlugLocked(
prev=>!prev
);


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
file.size > 2*1024*1024
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





const payload:any={



...form,



keyHighlights:

form.keyHighlights

.split("\n")

.map(x=>x.trim())

.filter(Boolean),





keyTakeaways:

form.keyTakeaways

.split("\n")

.map(x=>x.trim())

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
"Update failed"
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



<div className="max-w-7xl mx-auto">



<div className="mb-8">


<h1 className="text-3xl font-bold">

Edit Article

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





{/* ================= LEFT COLUMN ================= */}



<div

className="
xl:col-span-2
space-y-6
"

>









{/* ARTICLE INFO */}


<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>



<h2 className="font-semibold mb-5">

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
p-4
rounded-xl
bg-black/30
border
border-white/10
"


/>





<div className="grid md:grid-cols-2 gap-4 mt-5">



<div>



<div className="flex justify-between">


<label className="text-gray-400 text-sm">

Slug

</label>




<button

type="button"

onClick={toggleSlugLock}

className="text-orange-400 text-xs"

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
w-full
mt-2
p-3
rounded-xl
bg-black/30
border
border-white/10
"





/>



</div>









<div>



<label className="text-gray-400 text-sm">

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
w-full
mt-2
p-3
rounded-xl
bg-black/30
border
border-white/10
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
bg-white
rounded-2xl
overflow-hidden
"

>


<Editor


value={form.content}



onChange={(value)=>

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
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>


<h2 className="font-semibold mb-4">

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
Important update

Major point

Reader benefit
"




className="
w-full
h-36
p-4
rounded-xl
bg-black/30
border
border-white/10
"



/>



</div>













{/* WHY IT MATTERS */}




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

Why It Matters ⭐⭐⭐

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
Explain why this news matters...
"




className="
w-full
h-36
p-4
rounded-xl
bg-black/30
border
border-white/10
"



/>



</div>












{/* FAQ */}



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


{
question:"",
answer:""
}


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
form.faqItems.map((item,index)=>(


<div

key={index}

className="
bg-black/20
rounded-xl
p-4
mb-4
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
w-full
mb-3
p-3
rounded-xl
bg-black/30
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
w-full
h-28
p-3
rounded-xl
bg-black/30
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


className="text-red-400 mt-3"

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
p-3
rounded-xl
bg-black/30
border
border-white/10
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
w-full
mt-4
p-3
rounded-xl
bg-black/30
border
border-white/10
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



onChange={e=>{

if(e.target.files)

uploadImage(
e.target.files
)

}}



 />






{
uploading &&

<p className="text-orange-400 mt-3">

Uploading...

</p>

}





<div className="
flex
flex-wrap
gap-4
mt-5
">


{
form.images.map((img,index)=>(


<div

key={index}

className="relative"

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


onClick={()=>removeImage(index)}



className="
absolute
-top-2
-right-2
bg-red-600
rounded-full
w-7
h-7
"

>

×

</button>



</div>



))
}





</div>



</div>














{/* AI SUMMARY EXTRA */}



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

AI Summary Intelligence 🤖

</h2>



<button


type="button"


disabled={aiLoading}



onClick={generateAISummary}



className="
bg-blue-600
px-5
py-3
rounded-xl
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
bg-black/30
rounded-xl
p-4
space-y-3
"

>


<h3>

Overview

</h3>


<p>

{aiSummary.overview}

</p>




<h3>

Key Points

</h3>



<ul>

{

aiSummary.points?.map((p,i)=>(

<li key={i}>

{p}

</li>

))

}

</ul>




<h3>

Impact

</h3>


<p>

{aiSummary.impact}

</p>




<h3>

Takeaway

</h3>


<p>

{aiSummary.takeaway}

</p>



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
p-3
rounded-xl
bg-black/30
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
w-full
mt-4
p-3
rounded-xl
bg-black/30
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
flex
justify-between
mt-4
">


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
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
space-y-5
"

>


<h2 className="font-semibold">

News Controls

</h2>





<label className="
flex
justify-between
">


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
p-3
rounded-xl
bg-black/30
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


<option value="360">

6 Hours

</option>


<option value="1440">

24 Hours

</option>



</select>


}







<label className="
flex
justify-between
">


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
p-3
rounded-xl
bg-black/30
"



/>



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
p-3
rounded-xl
bg-black/30
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
w-full
h-28
p-3
rounded-xl
bg-black/30
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
p-3
rounded-xl
bg-black/30
"



/>



</div>












<button


disabled={saving}



className="
w-full
py-4
rounded-xl
bg-orange-600
font-semibold
text-lg
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