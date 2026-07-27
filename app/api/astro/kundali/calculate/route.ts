import { NextRequest, NextResponse } from "next/server";

import {
  calculateHoroscope,
} from "@/lib/astro/horoscope/engine";



//////////////////////////////////////////////////////////////
// NATIONPATH KUNDALI CALCULATE API
//////////////////////////////////////////////////////////////


export async function POST(
  request: NextRequest
) {


  const startTime =
    Date.now();



  try {


    const body =
      await request.json();



    const {

      date,

      latitude,

      longitude,

      timezone = "Asia/Kolkata",

      language = "english",

    } = body;





    if(

      !date ||

      latitude === undefined ||

      longitude === undefined

    ){


      return NextResponse.json(

        {

          success:false,

          error:
          "Birth date, latitude and longitude are required"

        },

        {
          status:400
        }

      );

    }






    const birthDate =
      new Date(date);





    if(

      isNaN(
        birthDate.getTime()
      )

    ){


      return NextResponse.json(

        {

          success:false,

          error:
          "Invalid birth date"

        },

        {
          status:400
        }

      );

    }





    const birthDetails = {


      date:
        birthDate,


      latitude:
        Number(latitude),


      longitude:
        Number(longitude),


      timezone,


    };







    const result =

      await calculateHoroscope({

        date:
          birthDate,


        language,


        birthDetails,


      });







    //////////////////////////////////////////////////////////////
    // KUNDALI PROFILE
    //////////////////////////////////////////////////////////////


    const kundaliProfile = {


      birthDetails:{


        date:
          birthDate,


        latitude:
          birthDetails.latitude,


        longitude:
          birthDetails.longitude,


        timezone:
          birthDetails.timezone,


      },





      lagna:

        result.ascendant,





      signs:{


        sun:
          result.sunSign,


        moon:
          result.moonSign,


      },





      planets:

        result.planets,





      houses:

        result.houses,





      nakshatra:{


        moon:

          result.planets.moon?.nakshatra ?? null,


      },





      dasha:

        result.dasha,





      //////////////////////////////////////////////////////////////
      // DIVISIONAL CHARTS
      //////////////////////////////////////////////////////////////


      charts:

        result.charts,



    };








    return NextResponse.json(

      {


        success:true,



        engine:{


          name:

          "NationPath Vedic Astrology Engine",



          version:

          "1.0",



          phase:

          "Birth Chart Core + Nakshatra + Houses + Dasha + Navamsa",




          calculationTimeMs:

          Date.now() - startTime,


        },





        data:{


          kundaliProfile,



          analysis:

            result.analysis,



          interpretation:

            result.interpretation,



          prediction:

            result.prediction,



          summary:

            result.summary,


        },


      }


    );





  }

  catch(error){



    return NextResponse.json(

      {


        success:false,



        engine:{


          name:

          "NationPath Vedic Astrology Engine",



          status:

          "failed",


        },



        error:

          error instanceof Error

          ?

          error.message

          :

          "Unknown error",


      },

      {

        status:500

      }


    );


  }


}