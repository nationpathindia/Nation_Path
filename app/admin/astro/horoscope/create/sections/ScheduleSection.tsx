//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// SCHEDULE SECTION
//
// Responsibility:
// Manage horoscope publishing schedule
//
// Does NOT:
// - execute cron jobs
// - generate horoscope content
// - calculate astrology
// - call API
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



return (

<SectionCard

title="⏰ Publishing Automation"

subtitle="Schedule horoscope visibility"

icon="⏰"

>









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

Enable Schedule

</p>


<p className="text-sm text-gray-400">

Future automated publishing control

</p>


</div>







<input

type="checkbox"

checked={

form.schedule?.enabled || false

}

onChange={(e)=>

updateSection(

"schedule",

"enabled",

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









<Input

label="Publish Date"

type="datetime-local"

value={form.schedule?.publishDate}

onChange={(value)=>

updateSection(

"schedule",

"publishDate",

value

)

}

/>









<Input

label="Expiry Date"

type="datetime-local"

value={form.schedule?.expiryDate}

onChange={(value)=>

updateSection(

"schedule",

"expiryDate",

value

)

}

/>









</SectionCard>

);


}