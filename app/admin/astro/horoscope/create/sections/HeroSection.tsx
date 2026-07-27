//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// HERO SECTION
//
// Responsibility:
// Manage premium horoscope hero experience
//
// Does NOT:
// - calculate astrology
// - generate content
// - call API
//////////////////////////////////////////////////////////////

"use client";


import SectionCard from "../components/SectionCard";

import Input from "../components/Input";

import TextArea from "../components/TextArea";





interface HeroSectionProps {


  form:any;


  updateSection:(

    section:string,

    key:string,

    value:any

  )=>void;


}







export default function HeroSection({

  form,

  updateSection,

}:HeroSectionProps){



return (

<SectionCard

title="🌠 Hero Experience"

subtitle="Premium opening section for horoscope experience"

icon="🌠"

>



<Input

label="Badge"

value={form.hero?.badge}

placeholder="Example: Vedic Intelligence"

onChange={(value)=>

updateSection(

"hero",

"badge",

value

)

}

/>







<Input

label="Title"

value={form.hero?.title}

placeholder="Example: Aries Cosmic Journey"

onChange={(value)=>

updateSection(

"hero",

"title",

value

)

}

/>








<Input

label="Subtitle"

value={form.hero?.subtitle}

placeholder="Example: Courage, fire and leadership energy"

onChange={(value)=>

updateSection(

"hero",

"subtitle",

value

)

}

/>








<TextArea

label="Description"

value={form.hero?.description}

placeholder="Premium horoscope introduction"

rows={6}

onChange={(value)=>

updateSection(

"hero",

"description",

value

)

}

/>








<Input

label="Image URL"

value={form.hero?.image}

placeholder="Hero image URL"

onChange={(value)=>

updateSection(

"hero",

"image",

value

)

}

/>








<Input

label="Cosmic Label"

value={form.hero?.cosmicLabel}

placeholder="Example: Mars Fire Intelligence"

onChange={(value)=>

updateSection(

"hero",

"cosmicLabel",

value

)

}

/>








<Input

label="Theme"

value={form.hero?.theme}

placeholder="Example: Fire / Earth / Air / Water"

onChange={(value)=>

updateSection(

"hero",

"theme",

value

)

}

/>







</SectionCard>

);


}