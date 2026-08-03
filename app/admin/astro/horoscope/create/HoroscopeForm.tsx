//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// HOROSCOPE FORM
//
// CREATE + EDIT MODE
//
// CMS FIRST ARCHITECTURE
//
// Supports:
//
// Daily Horoscope
// Weekly Horoscope
// Monthly Horoscope
//
// Does NOT:
// - calculate astrology
// - use Swiss Ephemeris
// - touch prediction engine
// - generate AI content
//////////////////////////////////////////////////////////////

"use client";


import {
  useEffect,
  useState,
} from "react";


import {
  useRouter,
} from "next/navigation";



//////////////////////////////////////////////////////////////
// CMS SECTIONS
//////////////////////////////////////////////////////////////

import ZodiacMasterSection from "./sections/ZodiacMasterSection";

import HeroSection from "./sections/HeroSection";

import IdentitySection from "./sections/IdentitySection";

import TraitsSection from "./sections/TraitsSection";

import EditorialSection from "./sections/EditorialSection";

import LifeSection from "./sections/LifeSection";

import InsightsSection from "./sections/InsightsSection";

import PlanetSection from "./sections/PlanetSection";

import FortuneSection from "./sections/FortuneSection";

import RemedySection from "./sections/RemedySection";

import VedicSection from "./sections/VedicSection";

import CompatibilitySection from "./sections/CompatibilitySection";

import ScheduleSection from "./sections/ScheduleSection";

import PublicationSection from "./sections/PublicationSection";

import CompletenessScore from "./components/CompletenessScore";




//////////////////////////////////////////////////////////////
// PROPS
//////////////////////////////////////////////////////////////

interface HoroscopeFormProps {


mode?:

"create"

|

"edit";


id?:string;


initialData?:any;


}






//////////////////////////////////////////////////////////////
// DEFAULT FORM
//////////////////////////////////////////////////////////////

const DEFAULT_FORM = {


//////////////////////////////////////////////////////////////
// MASTER
//////////////////////////////////////////////////////////////

zodiac:"",

slug:"",


symbol:"",

element:"",

modality:"",

rulingPlanet:"",




//////////////////////////////////////////////////////////////
// PUBLICATION META
//////////////////////////////////////////////////////////////

meta:{


period:"daily",


startDate:"",

endDate:"",


publishedAt:"",


scheduledAt:"",


status:"draft",


priority:0,


featured:false,


version:"1.0",


language:"english",


},






//////////////////////////////////////////////////////////////
// HERO
//////////////////////////////////////////////////////////////

hero:{


badge:"",


title:"",


subtitle:"",


description:"",


image:"",


cosmicLabel:"",


theme:"",


background:"",


},






//////////////////////////////////////////////////////////////
// IDENTITY
//////////////////////////////////////////////////////////////

identity:{


rashi:"",


sanskritName:"",


sanskrit:"",


dates:"",


symbol:"",


element:"",


rulingPlanet:"",


nature:"",


energy:"",


description:"",


},






//////////////////////////////////////////////////////////////
// TRAITS
//////////////////////////////////////////////////////////////

traits:{


strengths:[],


weaknesses:[],


personality:"",


},






//////////////////////////////////////////////////////////////
// EDITORIAL
//////////////////////////////////////////////////////////////

editorial:{


headline:"",


overview:"",


prediction:"",


quote:"",


},






//////////////////////////////////////////////////////////////
// LIFE INTELLIGENCE
//////////////////////////////////////////////////////////////

life:{


career:"",


love:"",


finance:"",


health:"",


},






//////////////////////////////////////////////////////////////
// INSIGHTS
//////////////////////////////////////////////////////////////

insights:{


planetaryInfluence:"",


energy:"",


guidance:"",


remedy:"",


strengths:[],


challenges:[],


},






//////////////////////////////////////////////////////////////
// PLANETS
//////////////////////////////////////////////////////////////

planets:[],






//////////////////////////////////////////////////////////////
// LUCK
//////////////////////////////////////////////////////////////

lucky:{


number:"",


color:"",


direction:"",


time:"",


gemstone:"",


metal:"",


},






//////////////////////////////////////////////////////////////
// REMEDY
//////////////////////////////////////////////////////////////

remedy:{


category:"",


title:"",


practice:"",


guidance:"",


reason:"",


},






//////////////////////////////////////////////////////////////
// VEDIC
//////////////////////////////////////////////////////////////

vedic:{


favorable:[],


avoid:[],


},






//////////////////////////////////////////////////////////////
// COMPATIBILITY
//////////////////////////////////////////////////////////////

compatibility:{


title:"",


description:"",


link:"",


},






//////////////////////////////////////////////////////////////
// PREMIUM
//////////////////////////////////////////////////////////////

premium:{


title:"",


description:"",


features:[],


},






//////////////////////////////////////////////////////////////
// SEO
//////////////////////////////////////////////////////////////

seo:{


title:"",


description:"",


keywords:[],


ogImage:"",


canonical:"",


},




};
//////////////////////////////////////////////////////////////
// SAFE DEEP MERGE
//////////////////////////////////////////////////////////////

function mergeHoroscopeData(
data:any
){

return {


...DEFAULT_FORM,


...data,





meta:{

...DEFAULT_FORM.meta,

...(data?.meta || {}),

},





hero:{

...DEFAULT_FORM.hero,

...(data?.hero || {}),

},





identity:{

...DEFAULT_FORM.identity,

...(data?.identity || {}),

},





traits:{

...DEFAULT_FORM.traits,

...(data?.traits || {}),

},





editorial:{

...DEFAULT_FORM.editorial,

...(data?.editorial || {}),

},





life:{

...DEFAULT_FORM.life,

...(data?.life || {}),

},





insights:{

...DEFAULT_FORM.insights,

...(data?.insights || {}),

},





lucky:{

...DEFAULT_FORM.lucky,

...(data?.lucky || {}),

},





remedy:{

...DEFAULT_FORM.remedy,

...(data?.remedy || {}),

},





vedic:{

...DEFAULT_FORM.vedic,

...(data?.vedic || {}),

},





compatibility:{

...DEFAULT_FORM.compatibility,

...(data?.compatibility || {}),

},





premium:{

...DEFAULT_FORM.premium,

...(data?.premium || {}),

},





seo:{

...DEFAULT_FORM.seo,

...(data?.seo || {}),

},



};


}









//////////////////////////////////////////////////////////////
// COMPONENT
//////////////////////////////////////////////////////////////

export default function HoroscopeForm({

mode="create",

id,

initialData,

}:HoroscopeFormProps){



const router = useRouter();




const [loading,setLoading] =

useState(false);






//////////////////////////////////////////////////////////////
// FORM STATE
//////////////////////////////////////////////////////////////

const [form,setForm] =

useState<any>(


initialData

?

mergeHoroscopeData(initialData)

:

mergeHoroscopeData({})


);








//////////////////////////////////////////////////////////////
// ZODIAC MASTER
//////////////////////////////////////////////////////////////

const [

zodiacList,

setZodiacList

] = useState<any[]>([]);





const [

zodiacLoading,

setZodiacLoading

] = useState(true);










//////////////////////////////////////////////////////////////
// LOAD ZODIAC MASTER
//////////////////////////////////////////////////////////////

useEffect(()=>{


async function loadZodiac(){


try{


const response = await fetch(

"/api/admin/zodiac"

);



const json = await response.json();




if(json.success){


setZodiacList(

json.data || []

);


}



}

catch(error){


console.error(

"ZODIAC LOAD ERROR",

error

);


}

finally{


setZodiacLoading(false);


}



}



loadZodiac();



},[]);









//////////////////////////////////////////////////////////////
// ROOT UPDATE
//////////////////////////////////////////////////////////////

const updateField = (

key:string,

value:any

)=>{


setForm((prev:any)=>({


...prev,


[key]:value


}));


};









//////////////////////////////////////////////////////////////
// SECTION UPDATE
//////////////////////////////////////////////////////////////

const updateSection = (

section:string,

key:string,

value:any

)=>{


setForm((prev:any)=>({


...prev,


[section]:{


...prev[section],


[key]:value


}


}));


};









//////////////////////////////////////////////////////////////
// ARRAY ADD
//////////////////////////////////////////////////////////////

const addArrayItem = (

section:string,

key:string

)=>{


setForm((prev:any)=>({


...prev,


[section]:{


...prev[section],


[key]:[


...(prev[section]?.[key] || []),


""



]


}



}));


};









//////////////////////////////////////////////////////////////
// ARRAY UPDATE
//////////////////////////////////////////////////////////////

const updateArrayItem = (

section:string,

key:string,

index:number,

value:string

)=>{


setForm((prev:any)=>{


const updated=[

...(prev[section]?.[key] || [])

];



updated[index]=value;



return {


...prev,


[section]:{


...prev[section],


[key]:updated


}


};



});


};









//////////////////////////////////////////////////////////////
// ARRAY REMOVE
//////////////////////////////////////////////////////////////

const removeArrayItem = (

section:string,

key:string,

index:number

)=>{


setForm((prev:any)=>({


...prev,


[section]:{


...prev[section],


[key]:


(prev[section]?.[key] || [])

.filter(

(_:any,i:number)=>i!==index

)



}



}));


};









//////////////////////////////////////////////////////////////
// PLANET ADD
//////////////////////////////////////////////////////////////

const addPlanet = ()=>{


setForm((prev:any)=>({


...prev,


planets:[


...prev.planets,


{


planetKey:"",


name:"",


title:"",


message:"",


strength:"",


icon:"",


energyLevel:""


}


]


}));


};









//////////////////////////////////////////////////////////////
// PLANET UPDATE
//////////////////////////////////////////////////////////////

const updatePlanet = (

index:number,

key:string,

value:string

)=>{


setForm((prev:any)=>{


const planets=[

...prev.planets

];



planets[index]={


...planets[index],


[key]:value


};




return {


...prev,


planets


};


});


};









//////////////////////////////////////////////////////////////
// PLANET REMOVE
//////////////////////////////////////////////////////////////

const removePlanet = (

index:number

)=>{


setForm((prev:any)=>({


...prev,


planets:

prev.planets.filter(

(_:any,i:number)=>i!==index

)



}));


};
//////////////////////////////////////////////////////////////
// ZODIAC MASTER AUTO FILL
//////////////////////////////////////////////////////////////

const handleZodiacChange = (

value:string

)=>{


const selected = zodiacList.find(

(item:any)=>

item.zodiac === value

);



if(!selected){

return;

}





setForm((prev:any)=>({


...prev,



zodiac:

selected.zodiac || "",



slug:

selected.slug || "",



symbol:

selected.symbol || "",



element:

selected.element || "",



modality:

selected.modality || "",



rulingPlanet:

selected.rulingPlanet || "",






identity:{


...prev.identity,



rashi:

selected.identity?.rashi || "",



sanskritName:

selected.identity?.sanskritName || "",



sanskrit:

selected.identity?.sanskrit || "",



dates:

selected.identity?.dates || "",



symbol:

selected.symbol || "",



element:

selected.element || "",



rulingPlanet:

selected.rulingPlanet || "",



nature:

selected.identity?.nature || "",



energy:

selected.identity?.energy || "",



description:

selected.identity?.description || "",



},







traits:{


...prev.traits,



strengths:

selected.traits?.strengths || [],



weaknesses:

selected.traits?.weaknesses || [],



personality:

selected.traits?.personality || "",



}



}));


};









//////////////////////////////////////////////////////////////
// COMPLETENESS SCORE
//////////////////////////////////////////////////////////////

const completeness = {


zodiac:

Boolean(form.zodiac),



hero:

Boolean(form.hero?.title),



identity:

Boolean(form.identity?.rashi),



editorial:

Boolean(form.editorial?.headline),



life:

Boolean(

form.life?.career ||

form.life?.love ||

form.life?.finance ||

form.life?.health

),



insights:

Boolean(form.insights?.guidance),



planets:

form.planets?.length > 0,



remedy:

Boolean(form.remedy?.title),



vedic:

form.vedic?.favorable?.length > 0,



seo:

Boolean(form.seo?.title),


};









//////////////////////////////////////////////////////////////
// SUBMIT CREATE / UPDATE
//////////////////////////////////////////////////////////////

const submit = async()=>{


if(loading){

return;

}





if(!form.zodiac){


alert(

"Please select zodiac"

);


return;


}





try{


setLoading(true);






//////////////////////////////////////////////////////////////
// PAYLOAD PREPARATION
//////////////////////////////////////////////////////////////

const payload = {


...form,





period:

form.meta?.period || "daily",





startDate:

form.meta?.startDate

?

new Date(

form.meta.startDate

)

:

new Date(),





endDate:

form.meta?.endDate

?

new Date(

form.meta.endDate

)

:

new Date(),






publishedAt:

form.meta?.publishedAt

?

new Date(

form.meta.publishedAt

)

:

null,






scheduledAt:

form.meta?.scheduledAt

?

new Date(

form.meta.scheduledAt

)

:

null,






status:

form.meta?.status || "draft",






priority:

Number(

form.meta?.priority || 0

),






featured:

Boolean(

form.meta?.featured

),




meta:{

...form.meta,

language:

form.meta?.language || "english",

},





updatedBy:

"admin",




};









//////////////////////////////////////////////////////////////
// API MODE
//////////////////////////////////////////////////////////////

const endpoint =


mode === "edit"

&& id


?


`/api/admin/horoscope/${id}`


:


"/api/admin/horoscope";







const method =


mode === "edit"

&& id


?


"PUT"


:


"POST";











const response = await fetch(

endpoint,

{


method,


headers:{


"Content-Type":

"application/json"


},


body:

JSON.stringify(payload)



}

);







const result = await response.json();









if(result.success){



alert(


mode === "edit"


?


"✨ Horoscope Updated Successfully"


:


"✨ Horoscope Created Successfully"



);





router.push(

"/admin/astro/horoscope"

);





}

else{


alert(

result.message ||

"Operation failed"

);


}





}

catch(error){



console.error(

"HOROSCOPE SAVE ERROR",

error

);



alert(

"Server error"

);



}

finally{


setLoading(false);


}



};
//////////////////////////////////////////////////////////////
// RENDER
//////////////////////////////////////////////////////////////

return (

<div

className="
min-h-screen
bg-[#050816]
p-5
md:p-10
text-white
"

>


<div

className="
mx-auto
max-w-7xl
space-y-8
"

>






{/* COMPLETENESS */}

<CompletenessScore

form={form}

/>









{/* ZODIAC MASTER */}

<ZodiacMasterSection

form={form}

zodiacList={zodiacList}

zodiacLoading={zodiacLoading}

handleZodiacChange={handleZodiacChange}

/>









{/* PUBLICATION CONTROL */}

<PublicationSection

form={form}

updateSection={updateSection}

/>









{/* HERO */}

<HeroSection

form={form}

updateSection={updateSection}

/>









{/* IDENTITY */}

<IdentitySection

form={form}

updateSection={updateSection}

/>









{/* TRAITS */}

<TraitsSection

form={form}

updateSection={updateSection}

addArrayItem={addArrayItem}

updateArrayItem={updateArrayItem}

removeArrayItem={removeArrayItem}

/>









{/* EDITORIAL */}

<EditorialSection

form={form}

updateSection={updateSection}

/>









{/* LIFE INTELLIGENCE */}

<LifeSection

form={form}

updateSection={updateSection}

/>









{/* COSMIC INSIGHTS */}

<InsightsSection

form={form}

updateSection={updateSection}

addArrayItem={addArrayItem}

updateArrayItem={updateArrayItem}

removeArrayItem={removeArrayItem}

/>









{/* PLANETARY INTELLIGENCE */}

<PlanetSection

form={form}

addPlanet={addPlanet}

updatePlanet={updatePlanet}

removePlanet={removePlanet}

/>









{/* FORTUNE */}

<FortuneSection

form={form}

updateSection={updateSection}

/>









{/* REMEDY */}

<RemedySection

form={form}

updateSection={updateSection}

/>









{/* VEDIC */}

<VedicSection

form={form}

addArrayItem={addArrayItem}

updateArrayItem={updateArrayItem}

removeArrayItem={removeArrayItem}

/>









{/* COMPATIBILITY */}

<CompatibilitySection

form={form}

updateSection={updateSection}

/>









{/* SCHEDULE */}

<ScheduleSection

form={form}

updateSection={updateSection}

/>









{/* SAVE */}

<div

className="
flex
justify-end
pt-8
"

>


<button


type="button"


disabled={loading}


onClick={submit}


className="

rounded-2xl

bg-gradient-to-r

from-yellow-400

to-orange-500

px-10

py-4

font-bold

text-black

shadow-lg

transition

hover:scale-105

disabled:cursor-not-allowed

disabled:opacity-50

"


>


{


loading


?


"Saving Horoscope..."


:


mode === "edit"


?


"Update Horoscope"


:


"Create Horoscope"


}



</button>



</div>









</div>


</div>


);


}