//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// PUBLICATION SECTION
//
// FINAL META CMS VERSION
//
// Responsibility:
//
// Manage horoscope publishing controls
//
// Controls:
//
// - Period
// - Status
// - Priority
// - Featured
// - Language
//
// Does NOT:
//
// - publish automatically
// - execute cron
// - calculate astrology
//////////////////////////////////////////////////////////////

"use client";


import SectionCard from "../components/SectionCard";

import Input from "../components/Input";





interface PublicationSectionProps {


form:any;



updateSection:(

section:string,

key:string,

value:any

)=>void;



}







export default function PublicationSection({

form,

updateSection,

}:PublicationSectionProps){





const meta = form.meta || {};





const updateMeta = (

key:string,

value:any

)=>{


updateSection(

"meta",

key,

value

);


};







return (

<SectionCard

title="📢 Publication Control"

subtitle="Manage horoscope publishing workflow"

icon="📢"

>



<div className="space-y-5">







{/* PERIOD */}

<div>


<label className="mb-2 block text-sm font-medium text-gray-300">

Horoscope Period

</label>




<select

value={meta.period || "daily"}

onChange={(e)=>

updateMeta(

"period",

e.target.value

)

}

className="
w-full
rounded-xl
border
border-white/10
bg-black/30
px-4
py-3
text-white
outline-none
"

>


<option value="daily">

Daily

</option>



<option value="weekly">

Weekly

</option>



<option value="monthly">

Monthly

</option>



<option value="yearly">

Yearly

</option>



</select>


</div>









{/* STATUS */}

<div>


<label className="mb-2 block text-sm font-medium text-gray-300">

Content Status

</label>




<select

value={meta.status || "draft"}

onChange={(e)=>

updateMeta(

"status",

e.target.value

)

}

className="
w-full
rounded-xl
border
border-white/10
bg-black/30
px-4
py-3
text-white
outline-none
"

>


<option value="draft">

Draft

</option>


<option value="review">

Review

</option>


<option value="published">

Published

</option>


<option value="archived">

Archived

</option>



</select>


</div>









{/* PRIORITY */}


<Input

label="Priority"

type="number"

value={meta.priority ?? 0}

onChange={(value)=>

updateMeta(

"priority",

Number(value)

)

}

/>









{/* LANGUAGE */}

<div>


<label className="mb-2 block text-sm font-medium text-gray-300">

Language

</label>



<select

value={meta.language || "english"}

onChange={(e)=>

updateMeta(

"language",

e.target.value

)

}

className="
w-full
rounded-xl
border
border-white/10
bg-black/30
px-4
py-3
text-white
outline-none
"

>


<option value="english">

English

</option>



<option value="hindi">

Hindi

</option>



<option value="marathi">

Marathi

</option>



<option value="tamil">

Tamil

</option>



<option value="telugu">

Telugu

</option>



<option value="nepali">

Nepali

</option>



</select>


</div>









{/* FEATURED */}


<div

className="
flex
items-center
justify-between
rounded-xl
border
border-white/10
bg-black/20
p-4
"

>


<div>


<p className="font-semibold">

Featured Horoscope

</p>


<p className="text-sm text-gray-400">

Highlight this horoscope experience

</p>


</div>





<input

type="checkbox"

checked={

meta.featured || false

}

onChange={(e)=>

updateMeta(

"featured",

e.target.checked

)

}

className="
h-5
w-5
accent-yellow-400
"

/>



</div>







</div>



</SectionCard>


);


}