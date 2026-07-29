"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Editor from "@/components/Editor";

export const dynamic = "force-dynamic";


/* =====================================================
   HELPERS
===================================================== */

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



function convertHighlights(value:string){

  return value
    .split("\n")
    .map(item=>item.trim())
    .filter(Boolean);

}



function createEmptyFAQ(){

  return {

    question:"",

    answer:""

  };

}





/* =====================================================
   CREATE POST
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

videoPosition:"top",




breaking:false,

featured:false,



breakingPriority:0,

homepagePriority:0,



breakingDuration:"30",

featuredDuration:"24",




keyHighlights:"",

whyItMatters:"",




faqItems:[] as {
question:string;
answer:string;
}[],



publishedAt:"",




metaTitle:"",

metaDescription:"",

metaKeywords:"",




status:"pending",


live:true


});






/* =====================================================
   FAQ HANDLERS
===================================================== */


function addFAQ(){

setForm(prev=>({

...prev,

faqItems:[

...prev.faqItems,

createEmptyFAQ()

]

}));

}



function updateFAQ(
index:number,
key:"question"|"answer",
value:string
){


setForm(prev=>({


...prev,


faqItems:

prev.faqItems.map(
(item,i)=>

i===index

?

{

...item,

[key]:value

}

:

item

)


}));

}




function removeFAQ(index:number){


setForm(prev=>({


...prev,


faqItems:

prev.faqItems.filter(
(_,i)=>i!==index
)


}));

}





/* =====================================================
   LOAD CATEGORY
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
"Category fetch error",
err
);


setCategories([]);


}


}



loadCategories();


},[]);







/* =====================================================
   AUTO SLUG
===================================================== */


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
prev.metaTitle ||
prev.title


}));


}


},[
form.title,
slugLocked
]);







/* =====================================================
   AUTO DESCRIPTION
===================================================== */


useEffect(()=>{


if(
form.content &&
!form.metaDescription
){


const clean =
stripHtml(form.content);



setForm(prev=>({


...prev,


metaDescription:
clean.substring(0,160)


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
   IMAGE REMOVE
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



fd.append(
"upload_preset",
process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
);





const response =
await fetch(

`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,

{

method:"POST",

body:fd

}

);



const data =
await response.json();



if(data.secure_url){

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
"Upload failed"
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
!form.title.trim() ||
!form.content.trim()
){

setError(
"Title and content required"
);


setLoading(false);

return;

}




if(
form.postType==="news" &&
!form.categoryId
){

setError(
"Category required"
);


setLoading(false);

return;

}





try{


const payload = {


...form,


keyHighlights:

convertHighlights(
form.keyHighlights
),



publishedAt:

form.publishedAt
?
new Date(
form.publishedAt
).toISOString()
:
null


};
console.log("EDITOR HTML:", form.content);




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

JSON.stringify(payload)

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







if(form.breaking){


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
"CREATE ERROR",
err
);



setError(
err.message ||
"Failed"
);



}
finally{


setLoading(false);


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

Create {typeFromUrl.toUpperCase()} Post

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







<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>


<label className="text-gray-400 text-sm">

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
outline-none
"


value={form.title}



placeholder="Enter headline"



onChange={(e)=>

updateField(
"title",
e.target.value
)

}



/>

</div>









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


<label className="text-gray-400">

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
text-xs
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

className="
w-full
h-36
p-4
rounded-xl
bg-black/30
border
border-white/10
"


value={form.keyHighlights}



placeholder="
Important update

Major point

Reader benefit
"



onChange={(e)=>

updateField(
"keyHighlights",
e.target.value
)

}


/>


</div>








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

className="
w-full
h-36
p-4
rounded-xl
bg-black/30
border
border-white/10
"



value={form.whyItMatters}



placeholder="Explain why this news matters..."



onChange={(e)=>

updateField(
"whyItMatters",
e.target.value
)

}


/>


</div>








{/* FAQ MODULE */}



<div

className="
bg-[#0e1726]
border
border-white/10
rounded-2xl
p-6
"

>


<div className="flex justify-between items-center mb-5">


<h2 className="font-semibold">

FAQ Section ⭐

</h2>



<button

type="button"

onClick={addFAQ}

className="
bg-blue-600
px-4
py-2
rounded-lg
text-sm
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
rounded-xl
bg-black/20
border
border-white/10
"

>


<div className="flex justify-between mb-3">


<span className="text-orange-400 text-sm">

FAQ {index+1}

</span>



<button

type="button"

onClick={()=>removeFAQ(index)}

className="
text-red-400
text-sm
"

>

Remove

</button>



</div>





<input

className="
w-full
mb-3
p-3
rounded-xl
bg-black/30
border
border-white/10
"


placeholder="Question"



value={item.question}



onChange={(e)=>

updateFAQ(
index,
"question",
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


placeholder="Answer"



value={item.answer}



onChange={(e)=>

updateFAQ(
index,
"answer",
e.target.value
)

}


/>



</div>


)

)

}



</div>
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




            <div className="flex gap-4 flex-wrap mt-5">


              {
                form.images.map(
                  (img,index)=>(

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










        {/* RIGHT COLUMN */}


        <div className="space-y-6">






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




            <select

              className="
                w-full
                p-3
                rounded-xl
                bg-black/30
                border
                border-white/10
              "


              value={form.categoryId}


              onChange={(e)=>

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
                border
                border-white/10
              "


              value={form.publishedAt}


              onChange={(e)=>

                updateField(
                  "publishedAt",
                  e.target.value
                )

              }


            />



            <p className="text-xs text-gray-400 mt-3">

              Leave empty for immediate publishing.

            </p>


          </div>










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

              Status

            </label>



            <select

              className="
                w-full
                mt-3
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

                <option value="360">
                  6 Hours
                </option>

                <option value="1440">
                  24 Hours
                </option>


              </select>

            }






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



          </div>









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










          <button

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

              "Create Post"

            }


          </button>






        </div>





      </form>


    </div>

  );


}