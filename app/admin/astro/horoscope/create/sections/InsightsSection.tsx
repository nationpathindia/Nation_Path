//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// INSIGHTS SECTION
//
// Responsibility:
// Manage cosmic intelligence editorial content
//
// Does NOT:
// - calculate planets
// - use astrology engine
// - generate AI prediction
// - call API
//////////////////////////////////////////////////////////////

"use client";


import SectionCard from "../components/SectionCard";

import TextArea from "../components/TextArea";

import ArrayEditor from "../components/ArrayEditor";






interface InsightsSectionProps {


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









export default function InsightsSection({

  form,

  updateSection,

  addArrayItem,

  updateArrayItem,

  removeArrayItem,

}:InsightsSectionProps){



return (

<SectionCard

title="🪐 Cosmic Intelligence Scanner"

subtitle="Energy, guidance and cosmic experience content"

icon="🪐"

>









<TextArea

label="Planetary Influence"

value={form.insights?.planetaryInfluence}

placeholder="Describe planetary influence"

rows={6}

onChange={(value)=>

updateSection(

"insights",

"planetaryInfluence",

value

)

}

/>









<TextArea

label="Energy"

value={form.insights?.energy}

placeholder="Current energy theme"

rows={5}

onChange={(value)=>

updateSection(

"insights",

"energy",

value

)

}

/>









<TextArea

label="Guidance"

value={form.insights?.guidance}

placeholder="Life guidance message"

rows={6}

onChange={(value)=>

updateSection(

"insights",

"guidance",

value

)

}

/>









<TextArea

label="Remedy"

value={form.insights?.remedy}

placeholder="Spiritual remedy guidance"

rows={5}

onChange={(value)=>

updateSection(

"insights",

"remedy",

value

)

}

/>









<ArrayEditor

title="Strengths"

items={form.insights?.strengths || []}



onAdd={()=>


addArrayItem(

"insights",

"strengths"

)


}



onChange={(index,value)=>


updateArrayItem(

"insights",

"strengths",

index,

value

)


}



onRemove={(index)=>


removeArrayItem(

"insights",

"strengths",

index

)


}

/>









<ArrayEditor

title="Challenges"

items={form.insights?.challenges || []}



onAdd={()=>


addArrayItem(

"insights",

"challenges"

)


}



onChange={(index,value)=>


updateArrayItem(

"insights",

"challenges",

index,

value

)


}



onRemove={(index)=>


removeArrayItem(

"insights",

"challenges",

index

)


}

/>









</SectionCard>

);


}