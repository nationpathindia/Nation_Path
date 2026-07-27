import { NextRequest } from "next/server";

import {
  calculateSunrise,
} from "@/lib/astro/calculations/sunrise";

import {
  calculateSunset,
} from "@/lib/astro/calculations/sunset";

import {
  divideTimeRange,
} from "@/lib/astro/calculations/timeDivision";

import {
  astroSuccess,
  astroError,
} from "@/lib/astro/api/response";

import {
  ASTRO_API_ERRORS,
} from "@/lib/astro/api/errors";

import {
  validateDate,
  normalizeLocation,
} from "@/lib/astro/api/validation";


export async function GET(
  request: NextRequest
) {

  try {

    const {
      searchParams,
    } = new URL(request.url);


    const date =
      validateDate(
        searchParams.get("date")
      );


    if (!date) {

      return astroError(
        ASTRO_API_ERRORS.INVALID_DATE.code,
        ASTRO_API_ERRORS.INVALID_DATE.message,
        400
      );

    }


    const location =
      normalizeLocation({

        latitude:
          searchParams.get("latitude")
            ? Number(
                searchParams.get("latitude")
              )
            : undefined,

        longitude:
          searchParams.get("longitude")
            ? Number(
                searchParams.get("longitude")
              )
            : undefined,

        lat:
          searchParams.get("lat")
            ? Number(
                searchParams.get("lat")
              )
            : undefined,

        lon:
          searchParams.get("lon")
            ? Number(
                searchParams.get("lon")
              )
            : undefined,

      });


    if (!location) {

      return astroError(
        ASTRO_API_ERRORS.INVALID_LOCATION.code,
        ASTRO_API_ERRORS.INVALID_LOCATION.message,
        400
      );

    }


    const calculationRequest = {

      date,

      latitude:
        location.latitude,

      longitude:
        location.longitude,

    };


    const sunrise =
      calculateSunrise(
        calculationRequest
      );


    const sunset =
      calculateSunset(
        calculationRequest
      );


    const data =
      divideTimeRange(
        sunrise.date,
        sunset.date,
        8
      );


    return astroSuccess(
      data,
      {

        requestedDate:
          date.toISOString(),

        location: {

          latitude:
            location.latitude,

          longitude:
            location.longitude,

          source:
            "request",

        },

      }
    );


  } catch (error) {

    console.error(
      "Day Parts API Error:",
      error
    );


    return astroError(
      ASTRO_API_ERRORS.INTERNAL_ERROR.code,
      ASTRO_API_ERRORS.INTERNAL_ERROR.message,
      500,
      error instanceof Error
        ? error.message
        : undefined
    );

  }

}