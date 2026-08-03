//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO AUTOMATION
//
// HOROSCOPE AUTOMATION TRIGGER API
//
// POST
//      ↓
// Load Published Zodiac Masters
//      ↓
// Run Horoscope Automation
//      ↓
// Generate / Update CMS Entries
//      ↓
// Return Batch Result
//
//////////////////////////////////////////////////////////////

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Zodiac from "@/app/models/Zodiac";

import {
  runHoroscopeAutomation,
} from "@/lib/automation/horoscope";





//////////////////////////////////////////////////////////////
// POST
//////////////////////////////////////////////////////////////

export async function POST() {


  const startedAt = new Date();



  try {


    //////////////////////////////////////////////////////////
    // DATABASE
    //////////////////////////////////////////////////////////

    await connectDB();




    //////////////////////////////////////////////////////////
    // LOAD ZODIAC MASTER
    //////////////////////////////////////////////////////////

    const zodiacList = await Zodiac.find({

      status:"published",

    }).lean();





    if(!zodiacList.length){


      return NextResponse.json(

        {

          success:false,

          generated:0,

          failed:0,

          message:
            "No published zodiac masters found.",


        },


        {

          status:404,

        }

      );


    }





    //////////////////////////////////////////////////////////
    // AUTOMATION DATE
    //////////////////////////////////////////////////////////

    const today = new Date();





    //////////////////////////////////////////////////////////
    // RUN AUTOMATION
    //////////////////////////////////////////////////////////

    const result = await runHoroscopeAutomation(

      zodiacList,


      {

        period:"daily",

        language:"english",

        startDate:today,

        endDate:today,


      }

    );






    //////////////////////////////////////////////////////////
    // SUCCESS RESPONSE
    //////////////////////////////////////////////////////////

    return NextResponse.json(

      {


        success:true,


        period:"daily",


        generated:

        result.generated || 0,


        failed:

          result.failed || 0,



        startedAt,


        completedAt:

          new Date(),



        data:

          result.data || [],



      }

    );



  }

  catch(error:any){



    console.error(

      "❌ Horoscope Automation Error",

      error

    );




    //////////////////////////////////////////////////////////
    // SAFE ERROR RESPONSE
    //////////////////////////////////////////////////////////


    return NextResponse.json(

      {


        success:false,


        generated:0,


        failed:1,


        startedAt,


        completedAt:

          new Date(),



        error:

          error?.message ||

          "Horoscope automation failed",



      },


      {


        status:500,


      }

    );


  }


}