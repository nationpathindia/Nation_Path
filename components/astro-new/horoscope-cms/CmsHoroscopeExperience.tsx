"use client";

//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO
//
// PREMIUM HOROSCOPE EXPERIENCE SHELL
//
// CMS FIRST ARCHITECTURE
//
// SINGLE SOURCE OF TRUTH:
// MongoDB CMS
//
// NO ENGINE
// NO CALCULATION
// NO AI GENERATION
//
//////////////////////////////////////////////////////////////

import {
  useEffect,
  useRef
} from "react";


import type {
  CmsHoroscopeData
} from "./types";


import PanchangHeroBanner from "./PanchangHeroBanner";

import HoroscopeHero from "./HoroscopeHero";
import HoroscopeEditorial from "./HoroscopeEditorial";
import HoroscopeLifeCards from "./HoroscopeLifeCards";
import HoroscopeIntelligencePanel from "./HoroscopeIntelligencePanel";
import HoroscopePlanetary from "./HoroscopePlanetary";
import ZodiacExplorerPanel from "./ZodiacExplorerPanel";
import HoroscopeLucky from "./HoroscopeLucky";
import HoroscopeRemedy from "./HoroscopeRemedy";
import HoroscopePremium from "./HoroscopePremium";
import HoroscopeNavigationCTA from "./HoroscopeNavigationCTA";





interface Props {

data:CmsHoroscopeData;

currentSign?:string;

slug?:string;

}





export default function CmsHoroscopeExperience({

data,

currentSign,

slug

}:Props){



const viewTracked = useRef(false);





//////////////////////////////////////////////////////////////
//
// HOROSCOPE PAGE VIEW TRACKING
//
// Responsibilities:
//
// 1. Increase analytics.views
// 2. Update live reader session
//
//////////////////////////////////////////////////////////////


useEffect(()=>{


if(
viewTracked.current
){

return;

}



if(
!data?.zodiac ||
!slug
){

return;

}



viewTracked.current=true;




let sessionId =

localStorage.getItem(

"nationpath_horoscope_session"

);



if(!sessionId){


sessionId =

crypto.randomUUID();



localStorage.setItem(

"nationpath_horoscope_session",

sessionId

);


}





fetch(

"/api/astro/horoscope/view",

{


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify({


sessionId,


zodiac:data.zodiac,


slug


})


}

)

.catch((error)=>{


console.error(

"NATIONPATH HOROSCOPE VIEW TRACKING ERROR",

error

);


});





},[

data?.zodiac,

slug

]);







return (

<main

className="
relative
min-h-screen
overflow-hidden
bg-[#FFF9E8]
text-[#3B2600]
"

>





<div

className="
pointer-events-none
absolute
inset-0
overflow-hidden
"

>



<div

className="
absolute
left-1/2
top-[-250px]
h-[600px]
w-[600px]
-translate-x-1/2
rounded-full
bg-[#D4AF37]/10
blur-[160px]
"

/>



<div

className="
absolute
right-[-180px]
top-[40%]
h-[350px]
w-[350px]
rounded-full
bg-[#8B5E00]/8
blur-[140px]
"

/>



<div

className="
absolute
left-[-120px]
bottom-[10%]
h-[280px]
w-[280px]
rounded-full
bg-[#D4AF37]/8
blur-[120px]
"

/>



</div>







<div

className="
relative
z-10
space-y-6
pb-12
"

>



<PanchangHeroBanner />





{

(data.hero || data.identity) &&

<HoroscopeHero

hero={data.hero}

identity={data.identity}

/>

}





{

data.editorial &&

<HoroscopeEditorial

editorial={data.editorial}

/>

}





{

data.life &&

<HoroscopeLifeCards

life={data.life}

/>

}





{

data.insights &&

<HoroscopeIntelligencePanel

insights={data.insights}

/>

}





{

data.planets &&

data.planets.length > 0 &&

<HoroscopePlanetary

planets={

data.planets.map((planet)=>(

{

name:
planet.name ||
planet.planetKey ||
"Planet",


title:
planet.title,


message:
planet.message,


strength:
planet.strength,

}

))

}

/>

}





<ZodiacExplorerPanel

zodiac={data.zodiacList || []}

active={currentSign}

/>





{

data.lucky &&

<HoroscopeLucky

lucky={data.lucky}

/>

}





{

data.remedy &&

<HoroscopeRemedy

remedy={data.remedy}

/>

}





{

data.premium &&

<HoroscopePremium

premium={data.premium}

/>

}





<HoroscopeNavigationCTA />





</div>






</main>

);


}