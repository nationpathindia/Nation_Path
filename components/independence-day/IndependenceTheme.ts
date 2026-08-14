export const independenceTheme = {
  /*
   * =========================================================
   * NATIONPATH INDIA — INDEPENDENCE DAY 2026
   * FINAL CAMPAIGN DESIGN SYSTEM
   *
   * Theme rule:
   * - Do NOT use blue as the dominant page background.
   * - Blue = Ashoka Chakra / heritage / selected accents.
   * - Saffron + white/ivory + green = campaign identity.
   * - Surfaces remain warm and editorial.
   * - Tricolor motion stays subtle and premium.
   * =========================================================
   */

  colors: {
    /*
     * Ashoka / Blue family
     */
    navy: "#163C80",
    navyDeep: "#0B1F45",
    navySoft: "#28529A",

    /*
     * Indian tricolor
     */
    saffron: "#FF9933",
    green: "#138808",
    white: "#FFFFFF",

    /*
     * Warm editorial surfaces
     */
    ivory: "#FAF7F1",
    cream: "#F8F4EC",
    paper: "#FFFDF8",

    /*
     * Typography
     */
    ink: "#101827",
    inkSoft: "#1F2937",
    muted: "#64748B",
    mutedLight: "#94A3B8",

    /*
     * Heritage / Chakra
     */
    chakra: "#163C80",

    /*
     * Utility
     */
    transparent: "transparent",
  },

  /*
   * =========================================================
   * GRADIENTS
   * =========================================================
   */

  gradients: {
    /*
     * Existing hero gradient preserved.
     * Used only where a strong hero treatment is intended.
     */
    hero:
      "linear-gradient(135deg, #0B1F45 0%, #163C80 52%, #102F68 100%)",

    /*
     * Exact Indian tricolor.
     */
    tricolor:
      "linear-gradient(90deg, #FF9933 0%, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%, #138808 100%)",

    /*
     * Soft tricolor atmosphere.
     */
    subtleTricolor:
      "linear-gradient(90deg, rgba(255,153,51,0.16), rgba(255,255,255,0.05), rgba(19,136,8,0.16))",

    /*
     * Premium chapter selection.
     */
    tricolorSelection:
      "linear-gradient(90deg, rgba(255,153,51,0.18), rgba(255,253,248,0.96), rgba(19,136,8,0.18))",

    /*
     * Very soft background wash.
     */
    saffronWash:
      "radial-gradient(circle, rgba(255,153,51,0.08) 0%, rgba(255,153,51,0) 70%)",

    greenWash:
      "radial-gradient(circle, rgba(19,136,8,0.07) 0%, rgba(19,136,8,0) 70%)",

    chakraWash:
      "radial-gradient(circle, rgba(22,60,128,0.045) 0%, rgba(22,60,128,0) 70%)",
  },

  /*
   * =========================================================
   * SURFACES
   * =========================================================
   */

  surfaces: {
    page: "#F8F4EC",
    section: "#FAF7F1",
    paper: "#FFFDF8",
    white: "#FFFFFF",

    glass:
      "rgba(255,253,248,0.78)",

    glassStrong:
      "rgba(255,253,248,0.92)",
  },

  /*
   * =========================================================
   * BORDERS
   * =========================================================
   */

  borders: {
    subtle: "rgba(22,60,128,0.10)",
    soft: "rgba(16,24,39,0.08)",
    strong: "rgba(22,60,128,0.18)",

    saffron: "rgba(255,153,51,0.35)",
    green: "rgba(19,136,8,0.35)",
    chakra: "rgba(22,60,128,0.30)",
  },

  /*
   * =========================================================
   * SHADOWS
   * =========================================================
   */

  shadows: {
    soft:
      "0 8px 24px rgba(16,24,39,0.045)",

    card:
      "0 20px 60px rgba(16,24,39,0.10)",

    elevated:
      "0 24px 70px rgba(16,24,39,0.12)",

    chakra:
      "0 0 16px rgba(248,244,236,0.90)",
  },

  /*
   * =========================================================
   * RADII
   * =========================================================
   */

  radii: {
    card: "1.15rem",
    cardLarge: "1.5rem",
    pill: "9999px",
    soft: "0.75rem",
  },

  /*
   * =========================================================
   * TYPOGRAPHY
   * =========================================================
   */

  typography: {
    fontFamily: "inherit",

    eyebrow: {
      fontSize: "9px",
      fontWeight: 900,
      letterSpacing: "0.25em",
    },

    micro: {
      fontSize: "7px",
      fontWeight: 900,
      letterSpacing: "0.18em",
    },

    body: {
      fontSize: "13px",
      lineHeight: "1.7",
    },
  },

  /*
   * =========================================================
   * TRICOLOR RAILS
   *
   * Used by sections instead of manually rebuilding colors.
   * =========================================================
   */

  rails: {
    thin: {
      height: "2px",
      saffron: "#FF9933",
      white: "#FFFDF8",
      green: "#138808",
    },

    standard: {
      height: "7px",
      saffron: "#FF9933",
      white: "#FFFDF8",
      green: "#138808",
    },

    wide: {
      height: "10px",
      saffron: "#FF9933",
      white: "#FFFDF8",
      green: "#138808",
    },
  },

  /*
   * =========================================================
   * MOTION
   * =========================================================
   *
   * Important:
   * Chakra should NOT travel corner-to-corner.
   * Components should use these values for controlled motion.
   */

  motion: {
    ambientSaffron: 18,
    ambientGreen: 21,
    ambientChakra: 16,

    chakraRotation: 14,

    imageTransition: 0.9,
    sectionTransition: 0.38,

    tricolorSweep: 5.5,
    greenSweep: 6.5,

    ease: "easeInOut",
    linear: "linear",
  },

  /*
   * =========================================================
   * CHAPTER SYSTEM
   * =========================================================
   */

  chapters: {
    people: {
      accent: "#FF9933",
    },

    places: {
      accent: "#138808",
    },

    ideas: {
      accent: "#163C80",
    },

    future: {
      accent: "#FF9933",
    },
  },

  /*
   * =========================================================
   * CAMPAIGN IDENTITY
   * =========================================================
   */

  campaign: {
    title: "INDIA @ 80",
    eyebrow: "INDEPENDENCE DAY SPECIAL",
    date: "15 AUGUST 2026",
    tagline: "A Nation. A Journey. A Future.",

    /*
     * Editorial identity used across campaign sections.
     */
    themeName: "India @ 80",
    edition: "2026",
    milestone: "80 YEARS",
  },

  /*
   * =========================================================
   * DESIGN RULES
   * =========================================================
   *
   * These are documentation tokens only.
   * They make the intended visual language explicit.
   */

  rules: {
    dominantBackground: "ivory",
    primaryAccent: "saffron",
    secondaryAccent: "green",
    heritageAccent: "chakra",

    blueAsBackground: false,
    whiteAsPrimarySurface: false,

    useTricolorRails: true,
    useAshokaChakra: true,
    useAmbientColor: true,

    chakraMovement: "controlled",
    visualStyle: "editorial-independence",
  },
} as const;

