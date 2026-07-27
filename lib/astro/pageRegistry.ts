export type AstroPageType =
  | "zodiac"
  | "panchang"
  | "muhurat"
  | "tool"
  | "timing";


export interface AstroPageConfig {
  slug: string;
  title: string;
  description: string;
  type: AstroPageType;
  seoTitle: string;
  seoDescription: string;
}


export const astroPageRegistry: AstroPageConfig[] = [

  // Zodiac Pages

  {
    slug: "aries",
    title: "Aries Horoscope Today",
    description:
      "Daily Aries horoscope with career, love, health and planetary insights.",
    type: "zodiac",
    seoTitle:
      "Aries Horoscope Today | Daily Predictions",
    seoDescription:
      "Read Aries daily horoscope predictions including career, love and health insights.",
  },

  {
    slug: "taurus",
    title: "Taurus Horoscope Today",
    description:
      "Daily Taurus horoscope and astrology guidance.",
    type: "zodiac",
    seoTitle:
      "Taurus Horoscope Today | Daily Predictions",
    seoDescription:
      "Read Taurus horoscope predictions with astrology insights.",
  },


  // Panchang

  {
    slug: "today-panchang",
    title: "Today's Panchang",
    description:
      "Complete Vedic Panchang including Tithi, Nakshatra, Yoga and Karana.",
    type: "panchang",
    seoTitle:
      "Today's Panchang | Hindu Calendar",
    seoDescription:
      "Check today's Panchang details including Tithi, Nakshatra and auspicious timings.",
  },


  // Muhurat

  {
    slug: "marriage-muhurat",
    title: "Marriage Muhurat",
    description:
      "Find auspicious marriage timings according to Vedic astrology.",
    type: "muhurat",
    seoTitle:
      "Marriage Muhurat | Auspicious Wedding Dates",
    seoDescription:
      "Explore marriage Muhurat and auspicious wedding timings.",
  },


  // Timing Tools

  {
    slug: "rahu-kaal",
    title: "Rahu Kaal Today",
    description:
      "Check today's Rahu Kaal timing.",
    type: "timing",
    seoTitle:
      "Rahu Kaal Today",
    seoDescription:
      "Find Rahu Kaal timings for your location.",
  },


  {
    slug: "varjyam",
    title: "Varjyam Today",
    description:
      "Find daily Varjyam timings.",
    type: "timing",
    seoTitle:
      "Varjyam Today",
    seoDescription:
      "Check Varjyam timings based on Vedic calculations.",
  },


  // Tools

  {
    slug: "compatibility",
    title: "Zodiac Compatibility",
    description:
      "Check relationship compatibility between zodiac signs.",
    type: "tool",
    seoTitle:
      "Zodiac Compatibility Calculator",
    seoDescription:
      "Explore zodiac compatibility using astrology.",
  },

];


export function getAstroPage(slug: string) {
  return astroPageRegistry.find(
    (page) => page.slug === slug
  );
}