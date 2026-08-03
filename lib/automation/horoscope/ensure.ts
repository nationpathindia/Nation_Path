//////////////////////////////////////////////////////////////
//
// NATIONPATH AI AUTOMATION
//
// HOROSCOPE DAILY ENSURE SERVICE
//
// EVENT BASED GENERATION CONTROLLER
//
// Responsibility:
//
// Viewer Request
//        ↓
// Check Today's Published Horoscope
//        ↓
// Exists
//        ↓
// Return Ready
//
// Missing
//        ↓
// Generation Lock
//        ↓
// Load Zodiac Master
//        ↓
// Trigger Full Horoscope Automation
//        ↓
// Generate 12 Zodiac
//        ↓
// Publish Today's Horoscope
//
//
//
// NO:
//
// - Astrology calculation
// - Swiss Ephemeris
// - Prediction modification
// - AI generation logic
//
//////////////////////////////////////////////////////////////


import {

  getHoroscopeByPeriod,

} from "@/lib/services/horoscopeContentService";



import Zodiac from "@/app/models/Zodiac";



import {

  runHoroscopeAutomation,

} from "./orchestrator";



import {

  isHoroscopeGenerationRunning,

  acquireHoroscopeGenerationLock,

  releaseHoroscopeGenerationLock,

} from "./lock";







//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

export interface EnsureDailyHoroscopeResult {


  generated:boolean;



  generating:boolean;



  source:

    | "cms"

    | "automation";



  message?:string;



  zodiac?:string;



}









//////////////////////////////////////////////////////////////
// LOAD ZODIAC MASTER SNAPSHOT
//
// Required by CMS Mapper
//
// Zodiac Collection
//        ↓
// Automation Payload
//
//////////////////////////////////////////////////////////////

async function getAutomationZodiacList(){


  const zodiacList = await Zodiac.find({

    status:"published",

  })

  .select({

    zodiac:1,

    slug:1,

    names:1,

    symbol:1,

    element:1,

    rulingPlanet:1,

    identity:1,

    media:1,

  })

  .lean();





  return zodiacList;


}









//////////////////////////////////////////////////////////////
// ENSURE TODAY HOROSCOPE
//////////////////////////////////////////////////////////////

export async function ensureDailyHoroscopeGenerated(



  zodiacSign:string,



  options?:{

  language?:

    | "english"

    | "hindi"

    | "marathi"

    | "tamil"

    | "telugu"

    | "nepali";

}



):Promise<EnsureDailyHoroscopeResult>{





  const language =

    options?.language

    ||

    "english";





  const today = new Date();








  ////////////////////////////////////////////////////////////
  //
  // STEP 1
  //
  // CMS FIRST CHECK
  //
  ////////////////////////////////////////////////////////////

  const existing =

    await getHoroscopeByPeriod(


      zodiacSign,


      "daily",


      today,


      language


    );







  if(existing){



    return {


      generated:false,


      generating:false,


      source:"cms",


      zodiac:zodiacSign,


      message:

        "Today's horoscope already available",


    };


  }









  ////////////////////////////////////////////////////////////
  //
  // STEP 2
  //
  // CHECK ACTIVE GENERATION
  //
  ////////////////////////////////////////////////////////////

  const alreadyRunning =

    await isHoroscopeGenerationRunning();





  if(alreadyRunning){



    return {


      generated:false,


      generating:true,


      source:"automation",


      zodiac:zodiacSign,


      message:


        "Preparing today's horoscope. Please wait.",


    };


  }









  ////////////////////////////////////////////////////////////
  //
  // STEP 3
  //
  // ACQUIRE LOCK
  //
  ////////////////////////////////////////////////////////////

  const lockAcquired =

    await acquireHoroscopeGenerationLock();






  if(!lockAcquired){



    return {


      generated:false,


      generating:true,


      source:"automation",


      zodiac:zodiacSign,


      message:


        "Today's horoscope generation is already running.",


    };


  }









  try{



    console.log(

      "🌌 Today's horoscope missing. Starting automation.",

      {

        zodiac:zodiacSign,

        date:today,

      }

    );









    //////////////////////////////////////////////////////////
    //
    // STEP 4
    //
    // LOAD ZODIAC MASTER DATA
    //
    //////////////////////////////////////////////////////////

    const zodiacList =

      await getAutomationZodiacList();







    if(!zodiacList.length){


      throw new Error(

        "No published zodiac master data found"

      );


    }









    //////////////////////////////////////////////////////////
    //
    // STEP 5
    //
    // GENERATE ALL 12 HOROSCOPES
    //
    //////////////////////////////////////////////////////////

    await runHoroscopeAutomation(


      zodiacList,


      {


        period:"daily",


        language,


        startDate:today,


        endDate:today,


      }


    );









    //////////////////////////////////////////////////////////
    //
    // STEP 6
    //
    // VERIFY REQUESTED SIGN
    //
    //////////////////////////////////////////////////////////

    const refreshed =


      await getHoroscopeByPeriod(


        zodiacSign,


        "daily",


        today,


        language


      );









    return {



      generated:true,


      generating:false,


      source:"automation",


      zodiac:zodiacSign,


      message:



        refreshed


        ?


        "Today's horoscope generated successfully"


        :


        "Generation completed but verification pending",



    };





  }

  catch(error){



    console.error(

      "[HOROSCOPE_AUTOMATION_FAILED]",

      error

    );



    return {


      generated:false,


      generating:false,


      source:"automation",


      zodiac:zodiacSign,


      message:


        "Unable to prepare today's horoscope.",


    };



  }






  finally{



    //////////////////////////////////////////////////////////
    //
    // ALWAYS RELEASE LOCK
    //
    //////////////////////////////////////////////////////////

    await releaseHoroscopeGenerationLock();


  }





}









//////////////////////////////////////////////////////////////
// EXPORT
//////////////////////////////////////////////////////////////

export default {


  ensureDailyHoroscopeGenerated,


};