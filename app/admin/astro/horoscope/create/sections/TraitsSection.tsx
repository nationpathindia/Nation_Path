//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// TRAITS SECTION
//
// Responsibility:
// Manage zodiac personality intelligence
//
// Does NOT:
// - calculate astrology
// - generate prediction
// - call API
//////////////////////////////////////////////////////////////

"use client";


import SectionCard from "../components/SectionCard";

import TextArea from "../components/TextArea";

import ArrayEditor from "../components/ArrayEditor";






interface TraitsSectionProps {


  form:any;


  updateSection:(

    section:string,

    key:string,

    value:any

  )=>void;



  addArrayItem:(

    section:string,

    key:string

  )=>void;



  updateArrayItem:(

    section:string,

    key:string,

    index:number,

    value:string

  )=>void;



  removeArrayItem:(

    section:string,

    key:string,

    index:number

  )=>void;


}









export default function TraitsSection({

  form,

  updateSection,

  addArrayItem,

  updateArrayItem,

  removeArrayItem,

}:TraitsSectionProps){



return (

<SectionCard

title="✨ Personality Intelligence"

subtitle="Zodiac strengths, challenges and personality profile"

icon="✨"

>







<TextArea

label="Personality"

value={form.traits?.personality}

placeholder="Describe zodiac personality"

rows={6}

onChange={(value)=>

updateSection(

"traits",

"personality",

value

)

}

/>









<ArrayEditor

title="Strengths"

items={form.traits?.strengths || []}



onAdd={()=>


addArrayItem(

"traits",

"strengths"

)


}



onChange={(index,value)=>


updateArrayItem(

"traits",

"strengths",

index,

value

)


}



onRemove={(index)=>


removeArrayItem(

"traits",

"strengths",

index

)


}

/>









<ArrayEditor

title="Weaknesses"

items={form.traits?.weaknesses || []}



onAdd={()=>


addArrayItem(

"traits",

"weaknesses"

)


}



onChange={(index,value)=>


updateArrayItem(

"traits",

"weaknesses",

index,

value

)


}



onRemove={(index)=>


removeArrayItem(

"traits",

"weaknesses",

index

)


}

/>







</SectionCard>

);


}