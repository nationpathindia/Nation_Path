import "dotenv/config";

import connectDB from "@/lib/mongodb";
import Horoscope from "@/app/models/Horoscope";

const dailyHoroscopes = [
 {
  zodiac: "pisces",

  slug: "pisces-daily",

  meta: {
    period: "daily",
    language: "english",

    status: "approved",

    startDate:
      new Date("2026-07-30T18:30:00.000Z"),

    endDate:
      new Date("2026-07-31T18:29:59.000Z"),

    publishedAt: null,

    scheduledAt:
      new Date("2026-07-30T18:32:00.000Z"),

    archivedAt: null,

    slugDate:
      "2026-07-31",

    version:
      "1.0",

    contentVersion:
      1,

    priority:
      1,

    featured: {
      homepage: true,
      trending: false,
      seo: true,
    },

    visibility: {
      public: true,
      premium: false,
      featured: true,
    },
  },


  symbol:
    "/zodiac/pisces.png",

  element:
    "water",

  modality:
    "mutable",

  rulingPlanet:
    "Jupiter",



  hero: {

    badge:
      "Daily Horoscope",

    title:
      "Pisces Daily Horoscope",

    subtitle:
      "Intuition, creativity and spiritual growth",

    description:
      "A day to trust your intuition, embrace creativity and move forward with emotional clarity and wisdom.",

    image:
      "/zodiac/pisces.png",

    cosmicLabel:
      "Jupiter Energy",

    theme:
      "water",

  },



  identity: {

    rashi:
      "Meen",

    sanskritName:
      "Meena Rashi",

    dates:
      "February 19 - March 20",

    symbol:
      "♓",

    element:
      "water",

    nature:
      "Sensitive and intuitive",

    rulingPlanet:
      "Jupiter",

    energy:
      "Creative and spiritual",

    description:
      "Meena Rashi represents intuition, imagination, compassion and spiritual awareness.",

  },



  traits: {

    strengths: [

      "Compassion",

      "Creativity",

      "Intuition",

      "Emotional wisdom",

    ],

    weaknesses: [

      "Overthinking",

      "Emotional sensitivity",

      "Escaping reality",

    ],

    personality:
      "A deeply intuitive water sign guided by imagination, empathy and spiritual understanding.",

  },



  editorial: {

    headline:
      "Pisces Daily Horoscope Today",

    overview:
      "Today encourages Pisces natives to trust their inner wisdom while maintaining balance between dreams and practical responsibilities.",

    prediction:
      "Jupiter supports growth, learning and spiritual awareness. Your intuition can guide you toward meaningful opportunities.",

    quote:
      "When intuition meets wisdom, the path becomes clear.",

  },



  life: {

    career:
      "Creative ideas and intuitive decisions may support professional growth. Focus on meaningful work and avoid unnecessary confusion.",

    love:
      "Emotional understanding strengthens relationships. Express your feelings openly and value mutual support.",

    finance:
      "Maintain practical financial planning and avoid decisions based only on emotions. Long-term stability should remain the priority.",

    health:
      "Emotional balance is important. Meditation, peaceful routines and proper rest will support overall wellbeing.",

  },



  insights: {

    planetaryInfluence:
      "Jupiter enhances wisdom, spirituality and expansion while water energy increases intuition and emotional awareness.",

    energy:
      "Calm",

    guidance:
      "Follow your intuition but combine it with practical thinking for better results.",

    remedy:
      "Practice meditation, offer prayers to Lord Vishnu and chant Jupiter mantra for wisdom and positivity.",

    strengths: [

      "Intuition",

      "Creativity",

      "Compassion",

    ],

    challenges: [

      "Emotional sensitivity",

      "Overthinking",

    ],

  },



  planets: [

    {

      planetKey:
        "jupiter",

      name:
        "Jupiter",

      title:
        "Dominant Planet",

      message:
        "Jupiter strengthens wisdom, prosperity, spiritual growth and positive thinking.",

      strength:
        "High",

      icon:
        "/planets/jupiter.png",

      energyLevel:
        "Strong",

    },

    {

      planetKey:
        "moon",

      name:
        "Moon",

      title:
        "Supportive Planet",

      message:
        "Moon enhances intuition, creativity and emotional understanding.",

      strength:
        "Positive",

      icon:
        "/planets/moon.png",

      energyLevel:
        "Balanced",

    },

  ],



  lucky: {

    number:
      "3",

    color:
      "Sea Green",

    direction:
      "North-East",

    time:
      "Morning",

    gemstone:
      "Yellow Sapphire",

    metal:
      "Gold",

  },



  remedy: {

    category:
      "Jupiter Energy Practice",

    title:
      "Wisdom and Spiritual Balance Practice",

    practice:
      "Spend time in meditation, gratitude and learning activities that expand your awareness.",

    guidance:
      "Strengthen Jupiter energy by chanting: ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः and practicing kindness.",

    reason:
      "Helps improve wisdom, positivity and emotional balance.",

  },



  vedic: {

    favorable: [

      "Creative activities",

      "Learning",

      "Meditation",

      "Spiritual practices",

    ],

    avoid: [

      "Emotional decisions",

      "Ignoring practical matters",

      "Negative thinking",

    ],

  },



  compatibility: {

    title:
      "Natural Zodiac Connections",

    description:
      "Pisces connects naturally with compassionate, creative and emotionally aware zodiac signs.",

    link:
      "/astro/compatibility/pisces",

  },



  premium: {

    title:
      "Unlock Pisces Personal Intelligence",

    description:
      "Discover personalized birth chart insights, Jupiter influence, emotional patterns, spiritual guidance and deeper life predictions.",

    features: [

      "Birth Chart",

      "Life Intelligence",

      "AI Astro Reports",

    ],

  },



  seo: {

    title:
      "Pisces Daily Horoscope Today | NationPath Astro",

    description:
      "Read Pisces daily horoscope for July 31, 2026 with Vedic astrology insights, Jupiter influence, career, love, finance, health predictions and remedies.",

    keywords: [

      "Pisces Horoscope",

      "Meen Rashi",

      "Daily Horoscope",

      "Pisces July 31 2026",

      "Vedic Astrology",

    ],

    ogImage:
      "/zodiac/pisces.png",

    canonical:
      "/astro/horoscope/pisces",

  },



  media: {

    heroImage:
      "/zodiac/pisces.png",

    backgroundImage:
      "",

    zodiacIcon:
      "/zodiac/pisces.png",

  },



  analytics: {

    views:
      0,

    clicks:
      0,

    premiumClicks:
      0,

  },


  createdBy:
    "admin",

  updatedBy:
    "admin",
}


];

async function seedDailyHoroscope() {

  try {

    await connectDB();


    for (const horoscope of dailyHoroscopes) {


      await Horoscope.findOneAndUpdate(

        {
          slug: horoscope.slug,
        },

        {
          $set: horoscope,
        },

        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }

      );


      console.log(
        `✅ ${horoscope.slug} seeded`
      );

    }


    console.log(
      "✅ Daily Horoscope CMS Seed Completed"
    );


    process.exit(0);


  } catch(error) {

    console.error(
      "❌ Seed failed",
      error
    );


    process.exit(1);

  }

}


seedDailyHoroscope();