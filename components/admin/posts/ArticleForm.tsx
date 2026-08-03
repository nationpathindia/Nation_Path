"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Editor from "@/components/Editor";


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



export default function ArticleForm(){


const router = useRouter();

const searchParams = useSearchParams();


const typeFromUrl =
searchParams.get("type") || "news";



const [loading,setLoading]=useState(false);

const [message,setMessage]=useState("");

const [error,setError]=useState("");



const [form,setForm]=useState({

title:"",

slug:"",

content:"",

categoryId:"",

postType:typeFromUrl,


images:[] as string[],



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



faqItems:[] as {

question:string;

answer:string;

}[],



status:"pending"

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




async function handleSubmit(
e:React.FormEvent
){

e.preventDefault();


console.log(
"ARTICLE FORM DATA",
form
);


}



return (

<div

className="
min-h-screen
bg-[#050816]
text-white
p-6
"

>


<h1 className="text-3xl font-bold mb-8">

NationPath Article Form

</h1>



<form

onSubmit={handleSubmit}

className="
space-y-6
"

>


<div className="
bg-[#0e1726]
rounded-2xl
p-6
">


<label>
Headline
</label>


<input

className="
w-full
mt-3
p-3
rounded-xl
bg-black/30
"

value={form.title}


onChange={(e)=>

updateField(
"title",
e.target.value
)

}

/>


</div>



<button

className="
bg-orange-600
px-6
py-3
rounded-xl
"

>

Save Article

</button>


</form>


</div>

);


}