export const ASTRO_API_ERRORS = {
  INVALID_REQUEST: {
    code: "INVALID_REQUEST",
    message: "Invalid request parameters",
  },

  MISSING_PARAMETERS: {
    code: "MISSING_PARAMETERS",
    message: "Required parameters are missing",
  },

  INVALID_DATE: {
    code: "INVALID_DATE",
    message: "Invalid date provided",
  },

  INVALID_LOCATION: {
    code: "INVALID_LOCATION",
    message: "Invalid latitude or longitude",
  },

  CALCULATION_FAILED: {
    code: "CALCULATION_FAILED",
    message: "Astro calculation failed",
  },

  INTERNAL_ERROR: {
    code: "INTERNAL_ERROR",
    message: "Internal server error",
  },
} as const;


export type AstroApiErrorCode =
  typeof ASTRO_API_ERRORS[keyof typeof ASTRO_API_ERRORS]["code"];