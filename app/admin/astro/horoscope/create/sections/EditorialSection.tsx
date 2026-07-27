//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// EDITORIAL SECTION
//
// Responsibility:
// Manage premium horoscope editorial experience
//
// Does NOT:
// - calculate astrology
// - generate prediction
// - use AI engine
// - call API
//////////////////////////////////////////////////////////////

"use client";


import SectionCard from "../components/SectionCard";

import Input from "../components/Input";

import TextArea from "../components/TextArea";





interface EditorialSectionProps {


  form:any;


  updateSection:(

    section:string,

    key:string,

    value:any

  )=>void;


}







export default function EditorialSection({

  form,

  updateSection,

}:EditorialSectionProps){



return (

<SectionCard

title="🔮 Editorial Horoscope"

subtitle="Human curated premium horoscope content"

icon="🔮"

>







<Input

label="Headline"

value={form.editorial?.headline}

placeholder="Example: Mars energy activates courage today"

onChange={(value)=>

updateSection(

"editorial",

"headline",

value

)

}

/>









<TextArea

label="Overview"

value={form.editorial?.overview}

placeholder="Write overall horoscope overview"

rows={6}

onChange={(value)=>

updateSection(

"editorial",

"overview",

value

)

}

/>









<TextArea

label="Prediction"

value={form.editorial?.prediction}

placeholder="Detailed horoscope prediction"

rows={8}

onChange={(value)=>

updateSection(

"editorial",

"prediction",

value

)

}

/>









<TextArea

label="Quote"

value={form.editorial?.quote}

placeholder="Inspirational zodiac quote"

rows={4}

onChange={(value)=>

updateSection(

"editorial",

"quote",

value

)

}

/>







</SectionCard>

);


}