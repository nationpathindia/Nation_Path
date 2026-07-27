//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// VEDIC SECTION
//
// Responsibility:
// Manage Vedic guidance content
//
// Does NOT:
// - calculate astrology
// - generate prediction
// - use engine
// - call API
//////////////////////////////////////////////////////////////

"use client";


import SectionCard from "../components/SectionCard";

import ArrayEditor from "../components/ArrayEditor";







interface VedicSectionProps {


  form:any;


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









export default function VedicSection({

  form,

  addArrayItem,

  updateArrayItem,

  removeArrayItem,

}:VedicSectionProps){



return (

<SectionCard

title="📿 Vedic Intelligence"

subtitle="Favorable energies and things to avoid"

icon="📿"

>









<ArrayEditor

title="Favorable"

items={form.vedic?.favorable || []}



onAdd={()=>


addArrayItem(

"vedic",

"favorable"

)


}



onChange={(index,value)=>


updateArrayItem(

"vedic",

"favorable",

index,

value

)


}



onRemove={(index)=>


removeArrayItem(

"vedic",

"favorable",

index

)


}

/>









<ArrayEditor

title="Avoid"

items={form.vedic?.avoid || []}



onAdd={()=>


addArrayItem(

"vedic",

"avoid"

)


}



onChange={(index,value)=>


updateArrayItem(

"vedic",

"avoid",

index,

value

)


}



onRemove={(index)=>


removeArrayItem(

"vedic",

"avoid",

index

)


}

/>









</SectionCard>

);


}