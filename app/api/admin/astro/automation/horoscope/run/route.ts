//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO AUTOMATION
//
// HOROSCOPE AUTOMATION TRIGGER API
//
// POST
//      ↓
// Run Horoscope Automation
//      ↓
// Orchestrator
//      ↓
// Load Published Zodiac Masters
//      ↓
// Generate / Update CMS Entries
//      ↓
// Return Batch Result
//
// IMPORTANT:
//
// Zodiac Master loading is owned by the orchestrator.
// This route only triggers the automation pipeline.
//
//
//////////////////////////////////////////////////////////////

import { NextResponse } from "next/server";

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
    // AUTOMATION DATE
    //////////////////////////////////////////////////////////

    const today = new Date();



    //////////////////////////////////////////////////////////
    // RUN AUTOMATION
    //
    // Orchestrator owns:
    // - DB connection
    // - Zodiac Master loading
    // - Archive handling
    // - Generation
    // - Publishing
    //
    //////////////////////////////////////////////////////////

    const result =
      await runHoroscopeAutomation({

        period: "daily",

        language: "english",

        startDate: today,

        endDate: today,

      });



    //////////////////////////////////////////////////////////
    // SUCCESS RESPONSE
    //////////////////////////////////////////////////////////

    return NextResponse.json({

      success:
        result.success,

      period:
        "daily",

      generated:
        result.generated || 0,

      failed:
        result.failed || 0,

      total:
        result.total || 0,

      startedAt,

      completedAt:
        result.completedAt ||
        new Date(),

      data:
        result.data || [],

    });

  }

  catch (error: any) {

    //////////////////////////////////////////////////////////
    // ERROR LOG
    //////////////////////////////////////////////////////////

    console.error(

      "❌ Horoscope Automation Error",

      error

    );



    //////////////////////////////////////////////////////////
    // SAFE ERROR RESPONSE
    //////////////////////////////////////////////////////////

    return NextResponse.json(

      {

        success: false,

        period: "daily",

        generated: 0,

        failed: 1,

        startedAt,

        completedAt:
          new Date(),

        error:
          error?.message ||
          "Horoscope automation failed",

      },

      {

        status: 500,

      }

    );

  }

}



//////////////////////////////////////////////////////////////
// END OF HOROSCOPE AUTOMATION TRIGGER API
//////////////////////////////////////////////////////////////

