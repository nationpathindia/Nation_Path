//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// SCHEDULE SECTION
//
// FINAL META CMS VERSION
//
// Responsibility:
//
// Manage horoscope timeline metadata
//
// Controls:
//
// - Start Date
// - End Date
// - Published At
// - Scheduled At
//
// Does NOT:
//
// - execute cron
// - publish automatically
// - calculate astrology
//////////////////////////////////////////////////////////////

"use client";


import SectionCard from "../components/SectionCard";

import Input from "../components/Input";





interface ScheduleSectionProps {


form:any;



updateSection:(

section:string,

key:string,

value:any

)=>void;



}









export default function ScheduleSection({

form,

updateSection,

}:ScheduleSectionProps){





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

title="📅 Schedule Control"

subtitle="Manage horoscope publishing timeline"

icon="📅"

>





<div className="space-y-6">







{/* DATE RANGE */}



<div className="grid gap-4 md:grid-cols-2">



<Input

label="Content Start Date"

type="datetime-local"

value={meta.startDate || ""}

onChange={(value)=>

updateMeta(

"startDate",

value

)

}

/>






<Input

label="Content End Date"

type="datetime-local"

value={meta.endDate || ""}

onChange={(value)=>

updateMeta(

"endDate",

value

)

}

/>





</div>









{/* PUBLISHED AT */}



<Input

label="Published At"

type="datetime-local"

value={meta.publishedAt || ""}

onChange={(value)=>

updateMeta(

"publishedAt",

value

)

}

/>









{/* SCHEDULED AT */}



<Input

label="Scheduled Publish Time"

type="datetime-local"

value={meta.scheduledAt || ""}

onChange={(value)=>

updateMeta(

"scheduledAt",

value

)

}

/>









{/* INFORMATION */}



<div

className="
rounded-xl
border
border-yellow-400/20
bg-yellow-400/5
p-4
text-sm
text-gray-300
"

>



<p className="font-semibold text-yellow-400">

CMS Scheduling Flow

</p>




<p className="mt-2 leading-relaxed">

Schedule metadata is stored inside horoscope CMS.
Future automation services may consume this data.

</p>



</div>








</div>





</SectionCard>


);


}