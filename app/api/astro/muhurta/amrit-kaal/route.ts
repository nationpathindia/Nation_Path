import { NextRequest, NextResponse } from "next/server";

import {
  getAmritKaal,
} from "@/lib/astro/calculations/muhurta/amritKaal";


export async function GET(
  request: NextRequest
) {

  try {

    const { searchParams } =
      new URL(
        request.url
      );


    const dateParam =
      searchParams.get(
        "date"
      );


    const date =
      dateParam
        ? new Date(dateParam)
        : new Date();



    if(
      Number.isNaN(
        date.getTime()
      )
    ){

      return NextResponse.json(
        {
          success:false,
          error:"Invalid date"
        },
        {
          status:400
        }
      );

    }



    const data =
      getAmritKaal(
        date
      );



    return NextResponse.json({

      success:true,

      timestamp:
        new Date()
          .toISOString(),

      requestedDate:
        date.toISOString(),

      data

    });


  }
  catch(error){

    console.error(
      "Amrit Kaal API Error:",
      error
    );


    return NextResponse.json(
      {
        success:false,
        error:
          "Failed to calculate Amrit Kaal"
      },
      {
        status:500
      }
    );

  }

}