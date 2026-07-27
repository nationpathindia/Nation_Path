//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// REMEDY SECTION
//
// Responsibility:
// Manage Vedic remedy experience content
//
// Does NOT:
// - calculate remedies
// - use astrology engine
// - generate AI content
// - call API
//////////////////////////////////////////////////////////////

"use client";


import SectionCard from "../components/SectionCard";

import Input from "../components/Input";

import TextArea from "../components/TextArea";







interface RemedySectionProps {


  form:any;


  updateSection:(

    section:string,

    key:string,

    value:any

  )=>void;


}









export default function RemedySection({

  form,

  updateSection,

}:RemedySectionProps){



return (

<SectionCard

title="🕉 Sacred Remedy"

subtitle="Premium Vedic remedy experience content"

icon="🕉"

>









<Input

label="Category"

value={form.remedy?.category}

placeholder="Example: Spiritual Practice"

onChange={(value)=>

updateSection(

"remedy",

"category",

value

)

}

/>









<Input

label="Remedy Title"

value={form.remedy?.title}

placeholder="Example: Morning Sun Meditation"

onChange={(value)=>

updateSection(

"remedy",

"title",

value

)

}

/>









<TextArea

label="Practice"

value={form.remedy?.practice}

placeholder="Describe the remedy practice"

rows={6}

onChange={(value)=>

updateSection(

"remedy",

"practice",

value

)

}

/>









<TextArea

label="Guidance"

value={form.remedy?.guidance}

placeholder="How user should follow this remedy"

rows={6}

onChange={(value)=>

updateSection(

"remedy",

"guidance",

value

)

}

/>









<TextArea

label="Reason"

value={form.remedy?.reason}

placeholder="Why this remedy is recommended"

rows={5}

onChange={(value)=>

updateSection(

"remedy",

"reason",

value

)

}

/>









</SectionCard>

);


}