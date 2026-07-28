"use client";

//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// HOROSCOPE DATA CONTROLLER
//
// CMS FIRST ARCHITECTURE
//
// Flow:
//
// UI Component
//      ↓
// useHoroscope()
//      ↓
// CMS Horoscope API
//      ↓
// Horoscope Mongo CMS
//      ↓
// Editorial Layer
//      ↓
// Experience Layer
//      ↓
// UI Compatible Prediction Contract
//
// Locked:
//
// ✅ No calculations
// ✅ No Swiss Ephemeris
// ✅ No engine modification
// ✅ No prediction modification
// ✅ Data orchestration only
//////////////////////////////////////////////////////////////


import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";





//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////
export type HoroscopePeriod =

  | "daily"

  | "weekly"

  | "monthly"

  | "yearly";
  

export type HoroscopeLanguage =
  | "english"
  | "hindi"
  | "marathi"
  | "tamil"
  | "telugu"
  | "nepali";






interface UseHoroscopeOptions {


  sign?:string;


  period?:HoroscopePeriod;


  language?:HoroscopeLanguage;


  date?:Date;


  enabled?:boolean;


  endpoint?:string;


}






//////////////////////////////////////////////////////////////
// RESPONSE CONTRACT
//////////////////////////////////////////////////////////////

export interface HoroscopeHookResponse {


  date?:string;


  language?:string;


  zodiacSign?:string;



  cms?:any;



  editorial?:any;



  experience?:any;



  prediction?:any;



  life?:any;



  planets?:any[];



  lucky?:any;



  remedy?:any;



  vedic?:any;



  premium?:any;



  meta?:any;



  [key:string]:any;


}






interface UseHoroscopeResult {


  data:
  HoroscopeHookResponse|null;



  loading:boolean;



  error:string|null;



  refetch:
  ()=>Promise<void>;


}









//////////////////////////////////////////////////////////////
// CMS RESPONSE NORMALIZER
//
// API:
//
// /api/astro/horoscope/cms
//
// Converts CMS payload into
// existing UI contract
//////////////////////////////////////////////////////////////

function normalizeHoroscopeResponse(

response:any

):HoroscopeHookResponse|null{



if(!response){

return null;

}




const payload =

response.data

??

response.result

??

response;





if(!payload){

return null;

}






const cms =

payload.cms

??

{};







const editorial =

payload.editorial

??

cms.editorial

??

null;







const experience =

payload.experience

??

{


hero:

cms.hero

??

null,



insights:

cms.insights

??

null,



planetaryInfluence:

cms.insights?.planetaryInfluence

??

null,



luckyFactors:

cms.lucky

??

null,



remedy:

cms.remedy

??

null,



opportunities:

cms.vedic?.favorable

??

[],



cautions:

cms.vedic?.avoid

??

[],



};









//////////////////////////////////////////////////////////////
// UI PREDICTION COMPATIBILITY
//////////////////////////////////////////////////////////////

const prediction = {


headline:

editorial?.headline

??

"Planetary Guidance",




overview:

editorial?.overview

??

"",




naturalSummary:

editorial?.prediction

??

"",





life:

payload.life

??

cms.life

??

{





career:

cms.life?.career

??

"",




love:

cms.life?.love

??

"",




finance:

cms.life?.finance

??

"",




health:

cms.life?.health

??

"",



},






planets:

payload.planets

??

cms.planets

??

[],







guidance:


cms.remedy?.guidance

?

[

cms.remedy.guidance

]

:

[],








experience,





};








return {



...payload,





cms,





zodiacSign:

payload.zodiacSign

??

payload.zodiac

??

null,






editorial,






experience,






prediction,






life:

payload.life

??

cms.life

??

null,






planets:

payload.planets

??

cms.planets

??

[],






lucky:

payload.lucky

??

cms.lucky

??

null,






remedy:

payload.remedy

??

cms.remedy

??

null,






vedic:

payload.vedic

??

cms.vedic

??

null,






premium:

payload.premium

??

cms.premium

??

null,






date:

payload.date

??

null,






language:

payload.language

??

null,






meta:

payload.meta

??

null,



};



}









//////////////////////////////////////////////////////////////
// HOOK
//////////////////////////////////////////////////////////////

export function useHoroscope({


sign,


period="daily",


language="english",


date,


enabled=true,


endpoint="/api/astro/horoscope/cms",



}:UseHoroscopeOptions):UseHoroscopeResult{








//////////////////////////////////////////////////////////////
// SIGN NORMALIZATION
//////////////////////////////////////////////////////////////

const zodiacSlug = useMemo(()=>{


return sign

?.trim()

.toLowerCase()

.replace(/\s+/g,"-")

??

null;



},[sign]);








//////////////////////////////////////////////////////////////
// DATE
//////////////////////////////////////////////////////////////

const requestDate = useMemo(()=>{


if(

date instanceof Date

&&

!isNaN(date.getTime())

){

return date;

}



return new Date();



},[date]);









//////////////////////////////////////////////////////////////
// REQUEST CONTROL
//////////////////////////////////////////////////////////////

const controllerRef =

useRef<AbortController|null>(null);



const requestIdRef =

useRef(0);



const mountedRef =

useRef(true);









//////////////////////////////////////////////////////////////
// STATE
//////////////////////////////////////////////////////////////

const [data,setData]=

useState<HoroscopeHookResponse|null>(null);



const [loading,setLoading]=

useState(false);



const [error,setError]=

useState<string|null>(null);









//////////////////////////////////////////////////////////////
// FETCH CMS HOROSCOPE
//////////////////////////////////////////////////////////////

const load = useCallback(async()=>{



if(!enabled){

return;

}





if(!zodiacSlug){


setError(
"Invalid zodiac sign"
);


setData(null);


return;


}







controllerRef.current?.abort();






const controller =

new AbortController();



controllerRef.current =

controller;






const requestId =

++requestIdRef.current;







try{


setLoading(true);


setError(null);







const response = await fetch(

endpoint,

{


method:"POST",



headers:{


"Content-Type":

"application/json",


},



cache:"no-store",



signal:

controller.signal,



body:JSON.stringify({



zodiacSign:

zodiacSlug,



horoscopeDate:

requestDate.toISOString(),



language,



period,



}),


}

);








if(!response.ok){


throw new Error(

`Horoscope CMS API failed ${response.status}`

);


}








const json =

await response.json();


console.log(
  "RAW HOROSCOPE API JSON",
  JSON.stringify(json, null, 2)
);





if(

requestId !== requestIdRef.current

){

return;

}








const normalized =

normalizeHoroscopeResponse(json);


console.log(
  "NATIONPATH NORMALIZED DATA",
  JSON.stringify(normalized, null, 2)
);





if(!normalized){


throw new Error(

"Invalid horoscope CMS response"

);


}








if(mountedRef.current){


setData(normalized);


}








if(process.env.NODE_ENV==="development"){


console.log(

"NATIONPATH CMS HOROSCOPE NORMALIZED",

normalized

);


}



}



catch(err:any){



if(err?.name==="AbortError"){

return;

}






if(mountedRef.current){


setError(

err instanceof Error

?

err.message

:

"Horoscope loading failed"

);


}



}




finally{


if(

requestId===requestIdRef.current

){


setLoading(false);


}



}




},[


enabled,

zodiacSlug,

period,

language,

requestDate,

endpoint


]);









//////////////////////////////////////////////////////////////
// AUTO LOAD
//////////////////////////////////////////////////////////////

useEffect(()=>{


mountedRef.current=true;


void load();





return ()=>{


mountedRef.current=false;


controllerRef.current?.abort();



};



},[load]);









//////////////////////////////////////////////////////////////
// PUBLIC API
//////////////////////////////////////////////////////////////

return {


data,


loading,


error,


refetch:load,


};



}