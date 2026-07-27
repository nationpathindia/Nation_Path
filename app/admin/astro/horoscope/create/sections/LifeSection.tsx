//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// LIFE SECTION
//
// Responsibility:
// Manage life area horoscope intelligence
//
// Does NOT:
// - calculate astrology
// - generate prediction
// - call API
//////////////////////////////////////////////////////////////

"use client";


import SectionCard from "../components/SectionCard";

import TextArea from "../components/TextArea";






interface LifeSectionProps {


  form:any;


  updateSection:(

    section:string,

    key:string,

    value:any

  )=>void;


}









export default function LifeSection({

  form,

  updateSection,

}:LifeSectionProps){



return (

<SectionCard

title="🌍 Life Intelligence"

subtitle="Career, love, finance and health experience content"

icon="🌍"

>









<TextArea

label="Career"

value={form.life?.career}

placeholder="Career and professional guidance"

rows={6}

onChange={(value)=>

updateSection(

"life",

"career",

value

)

}

/>









<TextArea

label="Love"

value={form.life?.love}

placeholder="Love and relationship guidance"

rows={6}

onChange={(value)=>

updateSection(

"life",

"love",

value

)

}

/>









<TextArea

label="Finance"

value={form.life?.finance}

placeholder="Financial intelligence guidance"

rows={6}

onChange={(value)=>

updateSection(

"life",

"finance",

value

)

}

/>









<TextArea

label="Health"

value={form.life?.health}

placeholder="Health and wellness guidance"

rows={6}

onChange={(value)=>

updateSection(

"life",

"health",

value

)

}

/>








</SectionCard>

);


}