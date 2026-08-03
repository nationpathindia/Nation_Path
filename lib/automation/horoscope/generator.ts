//////////////////////////////////////////////////////////////
// NATIONPATH AI AUTOMATION
//
// ASTRO HOROSCOPE GENERATOR
//
// Responsibility:
//
// Daily / Weekly / Monthly Horoscope Automation
//
// Flow:
//
// Automation Request
//        ↓
// Horoscope Service
//        ↓
// Astro Engine
//        ↓
// Prediction Engine
//        ↓
// CMS Mapper
//        ↓
// MongoDB Horoscope CMS
//
// Rules:
//
// NO calculation
// NO planetary modification
// NO AI generation here
//
// Engine remains source of truth
//////////////////////////////////////////////////////////////


import {
  generateHoroscope,
} from "@/lib/services/horoscopeService";


import {
  mapHoroscopeToCms,
} from "./mapper";


import type {
  HoroscopeLanguage,
} from "@/lib/astro/horoscope/types";





//////////////////////////////////////////////////////////////
// INPUT
//////////////////////////////////////////////////////////////

export interface HoroscopeAutomationInput {


  zodiac:

    string;



  ////////////////////////////////////////////////////////////
  // ZODIAC MASTER SNAPSHOT
  //
  // Static CMS intelligence
  //
  // Passed to mapper only
  ////////////////////////////////////////////////////////////

  zodiacMaster?:any;



  date:

    Date | string;



  language?:

    HoroscopeLanguage;



  period?:

    "daily"
    |
    "weekly"
    |
    "monthly"
    |
    "yearly";



}









//////////////////////////////////////////////////////////////
// OUTPUT
//////////////////////////////////////////////////////////////

export interface HoroscopeAutomationResult {


  zodiac:

    string;



  period:

    string;



  cms:

    any;



  generatedAt:

    Date;



}









//////////////////////////////////////////////////////////////
// DATE NORMALIZER
//////////////////////////////////////////////////////////////

function normalizeDate(

 value:Date | string

):Date {


 if(value instanceof Date){

   return value;

 }



 return new Date(value);


}











//////////////////////////////////////////////////////////////
// DAILY HOROSCOPE GENERATOR
//////////////////////////////////////////////////////////////

export async function generateAutomatedHoroscope(

 input:HoroscopeAutomationInput

):Promise<HoroscopeAutomationResult>{



 const date =

   normalizeDate(

     input.date

   );






 if(

   Number.isNaN(

    date.getTime()

   )

 ){

   throw new Error(

    "Invalid horoscope date"

   );

 }









 ////////////////////////////////////////////////////////////
 // STEP 1
 //
 // RUN EXISTING HOROSCOPE SERVICE
 //
 // ENGINE SOURCE OF TRUTH
 ////////////////////////////////////////////////////////////

 const horoscope =

   await generateHoroscope({

     horoscopeDate:

       date,


     language:

       input.language,


     zodiacSign:

       input.zodiac,


   });









 ////////////////////////////////////////////////////////////
 // STEP 2
 //
 // MAP ENGINE RESULT TO CMS FORMAT
 //
 // Static Zodiac Master Snapshot
 // + Prediction Result
 //
 ////////////////////////////////////////////////////////////

 const cmsData =

   mapHoroscopeToCms({

     horoscope,


     zodiac:

       input.zodiac,



     zodiacMaster:

       input.zodiacMaster,



     period:

       input.period || "daily",



     date,


   });











 ////////////////////////////////////////////////////////////
 // STEP 3
 //
 // RETURN AUTOMATION RESULT
 ////////////////////////////////////////////////////////////

 return {


   zodiac:

     input.zodiac,



   period:

     input.period || "daily",



   cms:

     cmsData,



   generatedAt:

     new Date(),


 };



}













//////////////////////////////////////////////////////////////
// BULK GENERATOR
//
// 12 ZODIAC AUTOMATION
//////////////////////////////////////////////////////////////

export async function generateAllDailyHoroscopes(

 zodiacs:string[],

 date:Date

){


 const results = [];




 for(const zodiac of zodiacs){


   const horoscope =

     await generateAutomatedHoroscope({

       zodiac,


       date,


       period:"daily",


     });



   results.push(

     horoscope

   );


 }



 return results;


}













//////////////////////////////////////////////////////////////
// DEFAULT EXPORT
//////////////////////////////////////////////////////////////

export default {


 generateAutomatedHoroscope,


 generateAllDailyHoroscopes,


};