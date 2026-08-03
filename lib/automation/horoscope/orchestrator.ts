//////////////////////////////////////////////////////////////
//
// NATIONPATH AI AUTOMATION
//
// HOROSCOPE AUTOMATION ORCHESTRATOR
//
// PRODUCTION LIFECYCLE
//
// Existing Published Horoscope
//          ↓
// Archive Previous Active Version
//          ↓
// Horoscope Generator
//          ↓
// CMS Transformation
//          ↓
// Duplicate Protection
//          ↓
// Create New Published Horoscope
//          ↓
// MongoDB CMS
//
//
//
// Responsibility:
//
// Automation workflow controller
//
//
//
// NO:
//
// - Astrology calculation
// - Swiss Ephemeris
// - Planet calculation
// - Prediction generation
// - AI generation
//
//////////////////////////////////////////////////////////////


import Horoscope from "@/app/models/Horoscope";

import connectDB from "@/lib/mongodb";


import {
  generateAutomatedHoroscope,
} from "./generator";





//////////////////////////////////////////////////////////////
// INPUT
//////////////////////////////////////////////////////////////

export interface HoroscopeAutomationInput {


  period?:

    | "daily"
    | "weekly"
    | "monthly"
    | "yearly";


  language?:

    | "english"
    | "hindi"
    | "marathi"
    | "tamil"
    | "telugu"
    | "nepali";


  startDate:Date;


  endDate:Date;


}







//////////////////////////////////////////////////////////////
// ARCHIVE ACTIVE HOROSCOPE SET
//////////////////////////////////////////////////////////////

async function archivePreviousHoroscopes(

  input:HoroscopeAutomationInput

){


  const currentSlugDate =

    new Intl.DateTimeFormat(

      "en-CA",

      {
        timeZone:"Asia/Kolkata"
      }

    ).format(input.startDate);





  const result =

    await Horoscope.updateMany(


      {


        "meta.period":

          input.period || "daily",



        "meta.language":

          input.language || "english",



        "meta.status":

          "published",



        "meta.slugDate":

          {
            $ne:currentSlugDate
          }


      },


      {


        $set:{


          "meta.status":

            "archived",



          "meta.archivedAt":

            new Date(),



          updatedBy:

            "nationpath-ai",


        }


      }


    );





  console.log(

    "📦 Previous horoscope set archived",

    {


      archived:

        result.modifiedCount,


      protectedDate:

        currentSlugDate,


    }

  );





  return result;


}







//////////////////////////////////////////////////////////////
// CREATE NEW HOROSCOPE
//
// Atomic Upsert
//
// Prevent duplicate:
// zodiac + period + language + date
//
//////////////////////////////////////////////////////////////

async function createNewHoroscope(

  data:any

){


  const {


    createdBy,

    updatedBy,


    ...cleanData


  } = data;





  const created =


    await Horoscope.findOneAndUpdate(


      {


        zodiac:

          cleanData.zodiac,


        "meta.period":

          cleanData.meta?.period,


        "meta.language":

          cleanData.meta?.language,


        "meta.startDate":

          cleanData.meta?.startDate,


        "meta.endDate":

          cleanData.meta?.endDate,


      },


      {


        $set:{


          ...cleanData,



          meta:{


            ...cleanData.meta,


            status:

              "published",



            publishedAt:

              new Date(),


          },



          updatedBy:

            "nationpath-ai",


        },



        $setOnInsert:{


          createdBy:

            "nationpath-ai",


        }


      },


      {


        new:true,


        upsert:true,


      }


    );






  console.log(

    `✅ Horoscope published: ${created.slug}`

  );






  return {


    status:

      "generated",



    document:

      created,


  };


}









//////////////////////////////////////////////////////////////
// SAVE CMS DOCUMENT
//////////////////////////////////////////////////////////////

async function saveHoroscopeCMS(

  data:any

){


  return await createNewHoroscope(

    data

  );


}









//////////////////////////////////////////////////////////////
// MAIN AUTOMATION
//////////////////////////////////////////////////////////////

export async function runHoroscopeAutomation(


  zodiacList:any[],


  input:HoroscopeAutomationInput


){



  await connectDB();





  const documents:any[] = [];



  let generated = 0;



  let failed = 0;







  console.log(

    "🚀 Horoscope automation started",

    {


      total:

        zodiacList.length,



      period:

        input.period || "daily",



      language:

        input.language || "english",



      date:

        input.startDate,


    }

  );









  ////////////////////////////////////////////////////////////
  //
  // STEP 0
  //
  // ARCHIVE CURRENT LIVE HOROSCOPE
  //
  ////////////////////////////////////////////////////////////

  await archivePreviousHoroscopes(

    input

  );









  ////////////////////////////////////////////////////////////
  //
  // STEP 1
  //
  // GENERATE NEW ZODIAC CONTENT
  //
  ////////////////////////////////////////////////////////////

  for(const zodiac of zodiacList){


    

    try {



      console.log(

        `🔮 Generating horoscope: ${zodiac.zodiac}`

      );







      const automationResult =

        await generateAutomatedHoroscope({



          zodiac:

            zodiac.zodiac,



          zodiacMaster:

            zodiac,



          date:

            input.startDate,



          period:

            input.period || "daily",



          language:

            input.language || "english",


        });







      const result =


        await saveHoroscopeCMS(


          automationResult.cms


        );







      documents.push(

        result.document

      );





      generated++;





    }


    catch(error){



      failed++;




      console.error(

        `❌ Horoscope failed: ${zodiac.zodiac}`,

        error

      );


    }



  }









  console.log(

    "🏁 Horoscope automation completed",

    {


      generated,


      failed,


    }

  );







  return {


    success:

      failed === 0,



    total:

      zodiacList.length,



    generated,



    failed,



    data:

      documents,



    completedAt:

      new Date(),


  };



}









//////////////////////////////////////////////////////////////
// EXPORT
//////////////////////////////////////////////////////////////

export default {


  runHoroscopeAutomation,


};