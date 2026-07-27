//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// COMPATIBILITY SECTION
//
// Responsibility:
// Manage relationship intelligence content
//
// Does NOT:
// - calculate compatibility
// - generate matching score
// - use astrology engine
// - call API
//////////////////////////////////////////////////////////////

"use client";


import SectionCard from "../components/SectionCard";

import Input from "../components/Input";

import TextArea from "../components/TextArea";







interface CompatibilitySectionProps {


  form:any;


  updateSection:(

    section:string,

    key:string,

    value:any

  )=>void;


}









export default function CompatibilitySection({

  form,

  updateSection,

}:CompatibilitySectionProps){



return (

<SectionCard

title="💫 Compatibility Intelligence"

subtitle="Relationship and zodiac connection experience"

icon="💫"

>









<Input

label="Compatibility Title"

value={form.compatibility?.title}

placeholder="Example: Natural Zodiac Connections"

onChange={(value)=>

updateSection(

"compatibility",

"title",

value

)

}

/>









<TextArea

label="Compatibility Description"

value={form.compatibility?.description}

placeholder="Describe relationship compatibility insights"

rows={7}

onChange={(value)=>

updateSection(

"compatibility",

"description",

value

)

}

/>









<Input

label="Reference Link"

value={form.compatibility?.link}

placeholder="Optional internal link"

onChange={(value)=>

updateSection(

"compatibility",

"link",

value

)

}

/>









</SectionCard>

);


}