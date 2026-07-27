import { ASTRO_API_ERRORS } from "./errors";


export interface AstroLocationInput {
  latitude?: number;
  longitude?: number;
  lat?: number;
  lon?: number;
  altitude?: number;
}


export interface NormalizedLocation {
  latitude: number;
  longitude: number;
  altitude: number;
}


export function validateDate(
  date: unknown
): Date | null {

  if (!date) {
    return null;
  }

  const parsed = new Date(
    String(date)
  );

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}


export function normalizeLocation(
  input: AstroLocationInput
): NormalizedLocation | null {

  const latitude =
    input.latitude ??
    input.lat;


  const longitude =
    input.longitude ??
    input.lon;


  if (
    latitude === undefined ||
    longitude === undefined
  ) {
    return null;
  }


  if (
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return null;
  }


  return {

    latitude,

    longitude,

    altitude:
      input.altitude ?? 0,

  };
}


export function getValidationError(
  type:
    | "date"
    | "location"
) {

  if (type === "date") {
    return ASTRO_API_ERRORS.INVALID_DATE;
  }


  return ASTRO_API_ERRORS.INVALID_LOCATION;
}