//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// FORTUNE SECTION
//
// Responsibility:
// Manage lucky factors experience
//
// Does NOT:
// - calculate lucky factors
// - use astrology engine
// - generate AI content
// - call API
//////////////////////////////////////////////////////////////

"use client";


import SectionCard from "../components/SectionCard";

import Input from "../components/Input";







interface FortuneSectionProps {


  form:any;


  updateSection:(

    section:string,

    key:string,

    value:any

  )=>void;


}









export default function FortuneSection({

  form,

  updateSection,

}:FortuneSectionProps){



return (

<SectionCard

title="✨ Fortune Signature"

subtitle="Lucky factors and positive energy markers"

icon="✨"

>









<Input

label="Lucky Number"

value={form.lucky?.number}

placeholder="Example: 18"

onChange={(value)=>

updateSection(

"lucky",

"number",

value

)

}

/>









<Input

label="Lucky Color"

value={form.lucky?.color}

placeholder="Example: Red"

onChange={(value)=>

updateSection(

"lucky",

"color",

value

)

}

/>









<Input

label="Lucky Direction"

value={form.lucky?.direction}

placeholder="Example: East"

onChange={(value)=>

updateSection(

"lucky",

"direction",

value

)

}

/>









<Input

label="Lucky Time"

value={form.lucky?.time}

placeholder="Example: Morning"

onChange={(value)=>

updateSection(

"lucky",

"time",

value

)

}

/>









<Input

label="Gemstone"

value={form.lucky?.gemstone}

placeholder="Example: Ruby"

onChange={(value)=>

updateSection(

"lucky",

"gemstone",

value

)

}

/>









<Input

label="Metal"

value={form.lucky?.metal}

placeholder="Example: Gold"

onChange={(value)=>

updateSection(

"lucky",

"metal",

value

)

}

/>









</SectionCard>

);


}