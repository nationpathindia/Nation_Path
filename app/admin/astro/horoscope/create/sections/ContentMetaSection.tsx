//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// CONTENT META SECTION
//
// Responsibility:
// Manage horoscope content lifecycle dates
//
// Controls:
// - Start Date
// - End Date
// - Scheduled Publish
// - Published Date
//
// Does NOT:
// - execute scheduler
// - run cron
// - generate content
// - calculate astrology
//////////////////////////////////////////////////////////////

"use client";


import SectionCard from "../components/SectionCard";

import Input from "../components/Input";





interface ContentMetaSectionProps {


  form:any;


  updateField:(

    key:string,

    value:any

  )=>void;


}








export default function ContentMetaSection({

  form,

  updateField,

}:ContentMetaSectionProps){






return (


<SectionCard

title="📅 Content Timeline"

subtitle="Manage horoscope availability and publishing dates"

icon="📅"

>


<div className="space-y-5">








{/* START DATE */}


<Input

label="Content Start Date"

type="datetime-local"

value={

form.startDate || ""

}

onChange={(value)=>

updateField(

"startDate",

value

)

}

/>








{/* END DATE */}


<Input

label="Content End Date"

type="datetime-local"

value={

form.endDate || ""

}

onChange={(value)=>

updateField(

"endDate",

value

)

}

/>









{/* SCHEDULED AT */}


<Input

label="Scheduled Publish Time"

type="datetime-local"

value={

form.scheduledAt || ""

}

onChange={(value)=>

updateField(

"scheduledAt",

value

)

}

/>









{/* PUBLISHED AT */}


<Input

label="Published Date"

type="datetime-local"

value={

form.publishedAt || ""

}

onChange={(value)=>

updateField(

"publishedAt",

value

)

}

/>








<div

className="
rounded-xl
border
border-yellow-400/20
bg-yellow-400/5
p-4
"

>


<p className="
text-sm
font-semibold
text-yellow-400
">

CMS Timeline Logic

</p>



<p className="
mt-2
text-sm
leading-relaxed
text-gray-400
">

Start date defines when this horoscope becomes
valid. End date controls expiry. Scheduled publish
allows future release while published date keeps
editorial history.

</p>


</div>








</div>



</SectionCard>


);


}