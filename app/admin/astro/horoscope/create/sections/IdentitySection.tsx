//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// IDENTITY SECTION
//
// Responsibility:
// Manage zodiac identity experience
//
// Does NOT:
// - calculate astrology
// - use Swiss Ephemeris
// - generate prediction
//////////////////////////////////////////////////////////////

"use client";


import SectionCard from "../components/SectionCard";

import Input from "../components/Input";

import TextArea from "../components/TextArea";





interface IdentitySectionProps {


  form:any;


  updateSection:(

    section:string,

    key:string,

    value:any

  )=>void;


}







export default function IdentitySection({

  form,

  updateSection,

}:IdentitySectionProps){



return (

<SectionCard

title="🌌 Zodiac Identity"

subtitle="Frontend zodiac intelligence snapshot"

icon="🌌"

>





<Input

label="Rashi"

value={form.identity?.rashi}

placeholder="Example: Mesha"

onChange={(value)=>

updateSection(

"identity",

"rashi",

value

)

}

/>







<Input

label="Sanskrit Name"

value={form.identity?.sanskritName}

placeholder="Example: Mesha Rashi"

onChange={(value)=>

updateSection(

"identity",

"sanskritName",

value

)

}

/>








<Input

label="Dates"

value={form.identity?.dates}

placeholder="Example: March 21 - April 19"

onChange={(value)=>

updateSection(

"identity",

"dates",

value

)

}

/>








<Input

label="Nature"

value={form.identity?.nature}

placeholder="Example: Dynamic and ambitious"

onChange={(value)=>

updateSection(

"identity",

"nature",

value

)

}

/>








<Input

label="Energy"

value={form.identity?.energy}

placeholder="Example: Fire Energy"

onChange={(value)=>

updateSection(

"identity",

"energy",

value

)

}

/>








<TextArea

label="Identity Description"

value={form.identity?.description}

placeholder="Describe zodiac personality and energy"

rows={6}

onChange={(value)=>

updateSection(

"identity",

"description",

value

)

}

/>








</SectionCard>

);


}