import { NextRequest } from "next/server";

import {
  getPanchang,
} from "@/lib/astro/calculations/panchang";

import {
  astroSuccess,
  astroError,
} from "@/lib/astro/api/response";

import {
  ASTRO_API_ERRORS,
} from "@/lib/astro/api/errors";

import {
  validateDate,
} from "@/lib/astro/api/validation";



//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// PANCHANG API
//
// DATE HANDLING:
// Asia/Kolkata timezone
//
// LOCKED:
// Calculation logic untouched
//
//////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////
// INDIA CURRENT DATE
//////////////////////////////////////////////////////////////

function getIndiaDate() {

  return new Intl.DateTimeFormat(
    "en-CA",
    {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  ).format(
    new Date()
  );

}





export async function GET(
  request: NextRequest
) {

  try {


    const {
      searchParams,
    } = new URL(request.url);



    const dateParam =
      searchParams.get("date");



    //////////////////////////////////////////////////////////
    // USE USER DATE OR INDIA CURRENT DATE
    //////////////////////////////////////////////////////////

    const requestedDate =
      dateParam ||
      getIndiaDate();



    const date =
      validateDate(
        requestedDate
      );



    if (!date) {


      return astroError(

        ASTRO_API_ERRORS.INVALID_DATE.code,

        ASTRO_API_ERRORS.INVALID_DATE.message,

        400

      );


    }




    //////////////////////////////////////////////////////////
    // PANCHANG CALCULATION
    //
    // DO NOT MODIFY ENGINE
    //////////////////////////////////////////////////////////

    const data =
      getPanchang(
        date
      );





    return astroSuccess(

      data,

      {

        requestedDate,

        timezone:
          "Asia/Kolkata",

      }

    );




  } catch (error) {


    console.error(
      "Panchang API Error:",
      error instanceof Error
        ? error.message
        : error
    );



    return astroError(

      ASTRO_API_ERRORS.INTERNAL_ERROR.code,

      ASTRO_API_ERRORS.INTERNAL_ERROR.message,

      500

    );


  }

}