// components/admin/posts/sections/FAQSection.tsx


"use client";


import type {
  PostFormData,
  FAQItem
} from "../types";





interface Props {


  form:PostFormData;


  updateField:
  (
    key:keyof PostFormData,
    value:any
  )=>void;


}








function createFAQ():FAQItem{


return {

question:"",

answer:""

};


}








export default function FAQSection({

form,

updateField

}:Props){







function addFAQ(){



updateField(

"faqItems",

[

...form.faqItems,

createFAQ()

]

);



}









function updateFAQ(

index:number,

key:keyof FAQItem,

value:string

){



updateField(

"faqItems",


form.faqItems.map(

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


);



}








function removeFAQ(
index:number
){



updateField(

"faqItems",


form.faqItems.filter(

(_,i)=>

i!==index

)


);



}









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

FAQ Section ⭐

</h2>


<p className="text-xs text-gray-400 mt-1">

SEO friendly questions and answers

</p>


</div>







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
bg-black/20
rounded-xl
p-4
space-y-3
"

>






<input


className="
w-full
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








<button


type="button"



onClick={()=>removeFAQ(index)}



className="
text-red-400
text-sm
"

>


Remove FAQ


</button>








</div>



)


)



}








{

form.faqItems.length===0 &&


<p className="text-sm text-gray-500">

No FAQ added yet

</p>


}







</div>



);



}