//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS
//
// HOROSCOPE FORM
//
// CREATE + EDIT MODE
//
// CMS FIRST ARCHITECTURE
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
// SECTIONS
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

import CompletenessScore from "./components/CompletenessScore";






//////////////////////////////////////////////////////////////
// PROPS
//////////////////////////////////////////////////////////////

interface HoroscopeFormProps {


mode?:

"create"

|

"edit";



id?:

string;



initialData?:

any;



}









//////////////////////////////////////////////////////////////
// DEFAULT CMS FORM
//////////////////////////////////////////////////////////////

const DEFAULT_FORM = {


zodiac:"",

slug:"",



symbol:"",

element:"",

modality:"",

rulingPlanet:"",





hero:{


badge:"",

title:"",

subtitle:"",

description:"",

image:"",

cosmicLabel:"",

theme:"",


},





identity:{


rashi:"",

sanskritName:"",

dates:"",

symbol:"",

element:"",

rulingPlanet:"",

nature:"",

energy:"",

description:"",


},





traits:{


strengths:[],

weaknesses:[],

personality:"",


},





editorial:{


headline:"",

overview:"",

prediction:"",

quote:"",


},





life:{


career:"",

love:"",

finance:"",

health:"",


},





insights:{


planetaryInfluence:"",

energy:"",

guidance:"",

remedy:"",

strengths:[],

challenges:[],


},





planets:[],





lucky:{


number:"",

color:"",

direction:"",

time:"",

gemstone:"",

metal:"",


},





remedy:{


category:"",

title:"",

practice:"",

guidance:"",

reason:"",


},





vedic:{


favorable:[],

avoid:[],


},





compatibility:{


title:"",

description:"",

link:"",


},





seo:{


title:"",

description:"",

keywords:[],

ogImage:"",

canonical:"",


},





schedule:{


enabled:false,

publishDate:"",

expiryDate:"",


},





status:"draft",



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





seo:{


...DEFAULT_FORM.seo,


...(data?.seo || {}),


},





schedule:{


...DEFAULT_FORM.schedule,


...(data?.schedule || {}),


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
// ROOT FIELD UPDATE
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


const updated = [

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


zodiac:selected.zodiac || "",


slug:selected.slug || "",





symbol:selected.symbol || "",


element:selected.element || "",


modality:selected.modality || "",


rulingPlanet:selected.rulingPlanet || "",






identity:{


...prev.identity,


rashi:selected.identity?.rashi || "",


sanskritName:selected.identity?.sanskritName || "",


dates:selected.identity?.dates || "",


symbol:selected.symbol || "",


element:selected.element || "",


rulingPlanet:selected.rulingPlanet || "",


nature:selected.identity?.nature || "",


energy:selected.identity?.energy || "",


description:selected.identity?.description || "",


},







traits:{


...prev.traits,


strengths:selected.traits?.strengths || [],


weaknesses:selected.traits?.weaknesses || [],


personality:selected.traits?.personality || "",


}



}));


};









//////////////////////////////////////////////////////////////
// COMPLETENESS DATA
//////////////////////////////////////////////////////////////

const completeness = {


zodiac:!!form.zodiac,


hero:!!form.hero.title,


identity:!!form.identity.rashi,



editorial:!!form.editorial.headline,



life:

Boolean(

form.life.career ||

form.life.love ||

form.life.finance ||

form.life.health

),



insights:!!form.insights.guidance,



planets:

form.planets.length > 0,



remedy:!!form.remedy.title,



vedic:

form.vedic.favorable.length > 0,



};
//////////////////////////////////////////////////////////////
// SUBMIT CREATE / UPDATE HOROSCOPE
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
// PREPARE PAYLOAD
//////////////////////////////////////////////////////////////

const payload = {


...form,



publishAt:

form.schedule?.publishDate

?

new Date(

form.schedule.publishDate

)

:

null,






expireAt:

form.schedule?.expiryDate

?

new Date(

form.schedule.expiryDate

)

:

null,





updatedBy:

"admin",



};









//////////////////////////////////////////////////////////////
// API MODE SWITCH
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

"✨ Horoscope Experience Created"

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








{/* LIFE */}

<LifeSection

form={form}

updateSection={updateSection}

/>








{/* INSIGHTS */}

<InsightsSection

form={form}

updateSection={updateSection}

addArrayItem={addArrayItem}

updateArrayItem={updateArrayItem}

removeArrayItem={removeArrayItem}

/>








{/* PLANETS */}

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








{/* SAVE BUTTON */}

<div

className="

flex

justify-end

pt-6

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

transition

hover:scale-105

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