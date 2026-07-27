//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// ZODIAC MASTER SECTION
//
// Responsibility:
// Select zodiac master snapshot
//
// Does NOT:
// - calculate astrology
// - call engine
// - save CMS
//////////////////////////////////////////////////////////////

"use client";


import SectionCard from "../components/SectionCard";





interface ZodiacMasterSectionProps {


  form:any;


  zodiacList:any[];


  zodiacLoading:boolean;


  handleZodiacChange:(

    value:string

  )=>void;


}







export default function ZodiacMasterSection({

  form,

  zodiacList,

  zodiacLoading,

  handleZodiacChange,

}:ZodiacMasterSectionProps){



return (

<SectionCard

title="♈ Zodiac Master Intelligence"

subtitle="Select zodiac master and load base identity snapshot"

icon="♈"

>



<select


value={form.zodiac || ""}



disabled={zodiacLoading}



onChange={(e)=>

handleZodiacChange(

e.target.value

)

}



className="
w-full
rounded-xl
border
border-white/10
bg-black/40
px-4
py-3
text-white
outline-none
focus:border-yellow-400/50
"



>


<option value="">

{

zodiacLoading

?

"Loading Zodiac..."

:

"Select Zodiac"

}

</option>





{

zodiacList.map((item:any)=>(



<option

key={item.zodiac}

value={item.zodiac}

>

{

item.names?.english ||

item.zodiac

}



</option>



))

}



</select>








{

form.zodiac && (

<div

className="
mt-6
grid
grid-cols-1
gap-4
sm:grid-cols-2
lg:grid-cols-4
"

>


<SnapshotCard

label="Symbol"

value={form.symbol}

/>



<SnapshotCard

label="Element"

value={form.element}

/>



<SnapshotCard

label="Modality"

value={form.modality}

/>



<SnapshotCard

label="Ruling Planet"

value={form.rulingPlanet}

/>



<SnapshotCard

label="Rashi"

value={form.identity?.rashi}

/>



<SnapshotCard

label="Energy"

value={form.identity?.energy}

/>



</div>

)

}





</SectionCard>

);


}








function SnapshotCard({

label,

value,

}:{

label:string;

value:string;

}){


return (

<div

className="
rounded-2xl
border
border-white/10
bg-white/[0.03]
p-4
"

>


<p

className="
text-xs
uppercase
tracking-wide
text-gray-500
"

>

{label}

</p>




<p

className="
mt-2
font-semibold
text-white
"

>

{

value || "-"

}

</p>



</div>

);


}