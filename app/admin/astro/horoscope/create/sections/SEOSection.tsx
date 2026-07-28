//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// SEO SECTION
//
// Responsibility:
// Manage horoscope SEO metadata
//
// Does NOT:
// - generate SEO automatically
// - call external service
//////////////////////////////////////////////////////////////

"use client";


import SectionCard from "../components/SectionCard";

import Input from "../components/Input";

import TextArea from "../components/TextArea";





interface SEOSectionProps {


form:any;


updateSection:(

section:string,

key:string,

value:any

)=>void;


}







export default function SEOSection({

form,

updateSection,

}:SEOSectionProps){





const addKeyword = ()=>{


updateSection(

"seo",

"keywords",

[

...(form.seo?.keywords || []),

""

]

);


};





const updateKeyword = (

index:number,

value:string

)=>{


const keywords=[

...(form.seo?.keywords || [])

];


keywords[index]=value;



updateSection(

"seo",

"keywords",

keywords

);


};






const removeKeyword=(

index:number

)=>{


updateSection(

"seo",

"keywords",

(form.seo?.keywords || [])

.filter(

(_:string,i:number)=>i!==index

)

);


};







return (


<SectionCard

title="🔍 SEO Intelligence"

subtitle="Search engine optimization metadata"

icon="🔍"

>


<div className="space-y-5">



<Input

label="SEO Title"

value={

form.seo?.title || ""

}

onChange={(value)=>

updateSection(

"seo",

"title",

value

)

}

/>






<TextArea

label="SEO Description"

value={

form.seo?.description || ""

}

onChange={(value)=>

updateSection(

"seo",

"description",

value

)

}

/>







<Input

label="OG Image"

value={

form.seo?.ogImage || ""

}

onChange={(value)=>

updateSection(

"seo",

"ogImage",

value

)

}

/>







<Input

label="Canonical URL"

value={

form.seo?.canonical || ""

}

onChange={(value)=>

updateSection(

"seo",

"canonical",

value

)

}

/>







<div>


<div className="mb-3 flex justify-between">


<p className="font-semibold">

SEO Keywords

</p>



<button

type="button"

onClick={addKeyword}

className="
rounded-lg
bg-yellow-400
px-3
py-1
text-sm
font-bold
text-black
"

>

+ Add

</button>


</div>






<div className="space-y-3">


{

(form.seo?.keywords || [])

.map(

(keyword:string,index:number)=>(


<div

key={index}

className="
flex
gap-3
"


>


<input

value={keyword}

onChange={(e)=>

updateKeyword(

index,

e.target.value

)

}

placeholder="Keyword"

className="
flex-1
rounded-xl
border
border-white/10
bg-black/30
px-4
py-3
text-white
"

/>





<button

type="button"

onClick={()=>removeKeyword(index)}

className="
rounded-xl
border
border-red-500/30
px-3
text-red-400
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


</SectionCard>


);


}