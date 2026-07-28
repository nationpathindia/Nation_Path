//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// PREMIUM SECTION
//
// Responsibility:
// Manage premium horoscope experience content
//
// Does NOT:
// - generate AI content
// - calculate astrology
// - access engine
//////////////////////////////////////////////////////////////

"use client";


import SectionCard from "../components/SectionCard";

import Input from "../components/Input";

import TextArea from "../components/TextArea";




interface PremiumSectionProps {


  form:any;


  updateSection:(

    section:string,

    key:string,

    value:any

  )=>void;


}





export default function PremiumSection({

  form,

  updateSection,

}:PremiumSectionProps){



const addFeature = ()=>{


updateSection(

"premium",

"features",

[

...(form.premium?.features || []),

""

]

);


};





const updateFeature = (

index:number,

value:string

)=>{


const updated = [

...(form.premium?.features || [])

];


updated[index]=value;



updateSection(

"premium",

"features",

updated

);


};






const removeFeature = (

index:number

)=>{


const updated =

(form.premium?.features || [])

.filter(

(_:string,i:number)=>i!==index

);



updateSection(

"premium",

"features",

updated

);


};






return (


<SectionCard

title="✨ Premium Experience"

subtitle="Premium horoscope journey configuration"

icon="✨"

>


<div className="space-y-5">



<Input

label="Premium Title"

value={

form.premium?.title || ""

}

onChange={(value)=>

updateSection(

"premium",

"title",

value

)

}

/>





<TextArea

label="Premium Description"

value={

form.premium?.description || ""

}

onChange={(value)=>

updateSection(

"premium",

"description",

value

)

}

/>







<div>


<div className="mb-3 flex items-center justify-between">


<p className="font-semibold">

Premium Features

</p>



<button

type="button"

onClick={addFeature}

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

(form.premium?.features || [])

.map(

(feature:string,index:number)=>(


<div

key={index}

className="
flex
gap-3
"

>


<input

value={feature}

onChange={(e)=>

updateFeature(

index,

e.target.value

)

}

className="
flex-1
rounded-xl
border
border-white/10
bg-black/30
px-4
py-3
text-white
outline-none
"

placeholder="Premium feature"

/>





<button

type="button"

onClick={()=>removeFeature(index)}

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