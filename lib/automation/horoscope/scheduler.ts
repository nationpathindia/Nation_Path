//////////////////////////////////////////////////////////////
// NATIONPATH AI AUTOMATION
//
// ASTRO HOROSCOPE SCHEDULER
//
// Responsibility:
//
// Daily Automation Controller
//
// Flow:
//
// Cron Trigger
//      ↓
// Scheduler
//      ↓
// 12 Zodiac Loop
//      ↓
// Generator
//      ↓
// CMS Ready Data
//
// Rules:
//
// NO database logic
// NO publishing logic
// NO astrology logic
//////////////////////////////////////////////////////////////


import {
  generateAutomatedHoroscope,
} from "./generator";




//////////////////////////////////////////////////////////////
// ZODIAC MASTER LIST
//////////////////////////////////////////////////////////////

export const DEFAULT_ZODIACS = [

  "aries",

  "taurus",

  "gemini",

  "cancer",

  "leo",

  "virgo",

  "libra",

  "scorpio",

  "sagittarius",

  "capricorn",

  "aquarius",

  "pisces",

];









//////////////////////////////////////////////////////////////
// INPUT
//////////////////////////////////////////////////////////////

export interface HoroscopeScheduleInput {


  date?:Date;


  zodiacList?:string[];


}









//////////////////////////////////////////////////////////////
// DAILY HOROSCOPE RUNNER
//////////////////////////////////////////////////////////////

export async function runDailyHoroscopeAutomation(

 input:HoroscopeScheduleInput = {}

){



 const date =

   input.date

   ||

   new Date();





 const zodiacList =

   input.zodiacList

   ||

   DEFAULT_ZODIACS;







 const results = [];







 for(

   const zodiac of zodiacList

 ){



   try{



     const result =

       await generateAutomatedHoroscope({

         zodiac,


         date,


         period:"daily",


         language:"english",


       });





     results.push(

       result

     );





     console.log(

       `✅ Horoscope generated: ${zodiac}`

     );




   }

   catch(error){



     console.error(

       `❌ Horoscope generation failed: ${zodiac}`,

       error

     );



   }



 }







 return {


   total:

     zodiacList.length,



   generated:

     results.length,



   failed:

     zodiacList.length -

     results.length,



   data:

     results,



   generatedAt:

     new Date(),


 };



}









//////////////////////////////////////////////////////////////
// WEEKLY AUTOMATION READY
//////////////////////////////////////////////////////////////

export async function runWeeklyHoroscopeAutomation(

 date:Date

){


 return runPeriodAutomation(

   "weekly",

   date

 );


}









//////////////////////////////////////////////////////////////
// MONTHLY AUTOMATION READY
//////////////////////////////////////////////////////////////

export async function runMonthlyHoroscopeAutomation(

 date:Date

){


 return runPeriodAutomation(

   "monthly",

   date

 );


}









//////////////////////////////////////////////////////////////
// INTERNAL PERIOD RUNNER
//////////////////////////////////////////////////////////////

async function runPeriodAutomation(

 period:

 "weekly"

 |

 "monthly",

 date:Date

){



 const results = [];




 for(

  const zodiac of DEFAULT_ZODIACS

 ){


   const result =

     await generateAutomatedHoroscope({

       zodiac,


       date,


       period,


       language:"english",


     });



   results.push(

     result

   );


 }





 return results;


}









//////////////////////////////////////////////////////////////
// EXPORT
//////////////////////////////////////////////////////////////

export default {


 runDailyHoroscopeAutomation,


 runWeeklyHoroscopeAutomation,


 runMonthlyHoroscopeAutomation,


 DEFAULT_ZODIACS,


};