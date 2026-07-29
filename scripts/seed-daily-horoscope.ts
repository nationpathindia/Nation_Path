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

    status: "published",

    startDate:
      new Date("2026-07-28T18:30:00.000Z"),

    endDate:
      new Date("2026-07-29T18:29:59.000Z"),

    publishedAt:
      new Date("2026-07-28T18:30:00.000Z"),

    scheduledAt: null,

    slugDate:
      "2026-07-29",

    version: "1.0",

    contentVersion: 1,

    priority: 1,

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
      "Intuition, compassion and spiritual growth",

    description:
      "A day to trust your intuition, embrace creativity and move forward with emotional clarity.",

    image:
      "/zodiac/pisces.png",

    cosmicLabel:
      "Jupiter Energy",

    theme:
      "water",

  },



  identity: {

    rashi:
      "Meena",

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

    ],

    weaknesses: [

      "Emotional sensitivity",

      "Escapism",

    ],

    personality:
      "A deeply intuitive water sign guided by imagination, empathy and emotional wisdom.",

  },



  editorial: {

    headline:
      "Pisces Daily Horoscope Today",

    overview:
      "Today encourages Pisces to trust inner wisdom while creating harmony in personal and professional life.",

    prediction:
      "Your creativity and intuition help you discover meaningful opportunities.",

    quote:
      "Inner wisdom guides the path forward.",

  },



  life: {

    career:
      "Creative thinking and emotional intelligence support professional growth.",

    love:
      "Understanding and compassion strengthen relationships.",

    finance:
      "Follow practical planning while trusting your instincts.",

    health:
      "Focus on emotional balance and peaceful routines.",

  },



  insights: {

    planetaryInfluence:
      "Jupiter enhances wisdom, spirituality and creative expression.",

    energy:
      "Calm",

    guidance:
      "Trust your intuition while staying grounded in reality.",

    remedy:
      "Practice meditation, gratitude and peaceful reflection.",

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
        "Jupiter strengthens wisdom, compassion and spiritual growth.",

      strength:
        "High",

      icon:
        "/planets/jupiter.png",

      energyLevel:
        "Strong",

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
      "Jupiter Wisdom Meditation",

    practice:
      "Begin the day with meditation, gratitude and peaceful spiritual reflection.",

    guidance:
      "Strengthen Jupiter energy through devotion and positive thoughts. Chant: ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः",

    reason:
      "Helps enhance wisdom, spiritual balance and positive growth.",

  },



  vedic: {

    favorable: [

      "Creative activities",

      "Learning",

      "Spiritual practices",

    ],

    avoid: [

      "Emotional decisions",

      "Ignoring practical matters",

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
      "Discover personalized birth chart insights, planetary strengths and deeper life guidance.",

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
      "Read Pisces daily horoscope with Vedic astrology insights, Jupiter guidance and personalized cosmic wisdom.",

    keywords: [

      "Pisces Horoscope",

      "Meena Rashi",

      "Daily Horoscope",

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

    views: 0,

    clicks: 0,

    premiumClicks: 0,

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
          zodiac: horoscope.zodiac,

          slug: horoscope.slug,

          "meta.period": horoscope.meta.period,

          "meta.startDate": horoscope.meta.startDate,

        },


        {
          $set: horoscope,
        },


        {
          upsert: true,
          new: true,
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