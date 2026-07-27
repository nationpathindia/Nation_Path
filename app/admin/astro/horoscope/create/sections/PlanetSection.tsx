//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// PLANET SECTION
//
// Responsibility:
// Manage planetary editorial cards
//
// Does NOT:
// - calculate planetary positions
// - use Swiss Ephemeris
// - generate prediction
// - call API
//////////////////////////////////////////////////////////////

"use client";


import SectionCard from "../components/SectionCard";

import Input from "../components/Input";

import TextArea from "../components/TextArea";







interface PlanetSectionProps {


  form:any;


  addPlanet:()=>void;


  updatePlanet:(

    index:number,

    key:string,

    value:string

  )=>void;



  removePlanet:(

    index:number

  )=>void;


}









export default function PlanetSection({

  form,

  addPlanet,

  updatePlanet,

  removePlanet,

}:PlanetSectionProps){



return (

<SectionCard

title="🌌 Planetary Signals"

subtitle="Planet intelligence editorial cards"

icon="🌌"

>









<div

className="
space-y-5
"

>


{

(form.planets || []).map((planet:any,index:number)=>(



<div

key={index}

className="
rounded-2xl
border
border-white/10
bg-black/20
p-5
space-y-4
"

>







<div

className="
flex
items-center
justify-between
"

>


<h3

className="
font-semibold
text-yellow-400
"

>

Planet {index + 1}

</h3>




<button

type="button"

onClick={()=>removePlanet(index)}

className="
rounded-xl
border
border-red-500/30
bg-red-500/10
px-4
py-2
text-sm
text-red-400
"

>

Remove

</button>


</div>









<Input

label="Planet Key"

value={planet.planetKey}

placeholder="Example: mars"

onChange={(value)=>

updatePlanet(

index,

"planetKey",

value

)

}

/>









<Input

label="Planet Name"

value={planet.name}

placeholder="Example: Mars"

onChange={(value)=>

updatePlanet(

index,

"name",

value

)

}

/>









<Input

label="Title"

value={planet.title}

placeholder="Example: Courage Activation"

onChange={(value)=>

updatePlanet(

index,

"title",

value

)

}

/>









<TextArea

label="Message"

value={planet.message}

placeholder="Planet message"

rows={5}

onChange={(value)=>

updatePlanet(

index,

"message",

value

)

}

/>









<Input

label="Strength"

value={planet.strength}

placeholder="Strong / Medium / Low"

onChange={(value)=>

updatePlanet(

index,

"strength",

value

)

}

/>









<Input

label="Icon"

value={planet.icon}

placeholder="Planet icon"

onChange={(value)=>

updatePlanet(

index,

"icon",

value

)

}

/>









<Input

label="Energy Level"

value={planet.energyLevel}

placeholder="Example: 85%"

onChange={(value)=>

updatePlanet(

index,

"energyLevel",

value

)

}

/>







</div>



))

}



</div>









<button

type="button"

onClick={addPlanet}

className="
rounded-xl
border
border-yellow-400/30
bg-yellow-400/10
px-5
py-3
font-semibold
text-yellow-300
transition
hover:bg-yellow-400/20
"

>

+ Add Planet Signal

</button>









</SectionCard>

);


}