import { NextResponse } from "next/server";

import { calculateHoroscope } from "@/lib/astro/horoscope/engine";


export async function GET() {

  const startTime = Date.now();


  try {

    const birthDetails = {

      date: new Date("1990-05-15T10:30:00Z"),

      latitude: 21.1702,

      longitude: 72.8311,

      timezone: "Asia/Kolkata",

    };


    const result = await calculateHoroscope({

      date: birthDetails.date,

      language: "english",

      birthDetails,

    });


    const calculationTime =
      Date.now() - startTime;


    return NextResponse.json({

      success: true,


      engine: {

        name:
          "NationPath Vedic Astrology Engine",

        phase:
          "Birth Chart Core Engine Phase 1",

        status:
          "running",

        calculationTimeMs:
          calculationTime,

      },


      input: {

        birthDate:
          birthDetails.date,

        latitude:
          birthDetails.latitude,

        longitude:
          birthDetails.longitude,

        timezone:
          birthDetails.timezone,

      },


     verification: {


  ascendant:

    result.ascendant,


  sunSign:

    result.sunSign,


  moonSign:

    result.moonSign,


  houses:

    result.houses,


  planets:

    result.planets,


  d9:

  result.charts?.d9,


  marriage:

    result.predictions?.marriage,


},

      fullResult:

        result,


    });


  } catch(error) {


    return NextResponse.json(

      {

        success: false,


        engine: {

          name:
            "NationPath Vedic Astrology Engine",

          phase:
            "Birth Chart Core Engine Phase 1",

          status:
            "failed",

        },


        error:

          error instanceof Error

            ? error.message

            : "Unknown error",


      },

      {

        status: 500,

      }

    );

  }

}