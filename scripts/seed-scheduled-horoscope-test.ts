import "dotenv/config";

import connectDB from "@/lib/mongodb";
import Horoscope from "@/app/models/Horoscope";


const scheduledHoroscope = {

  zodiac: "pisces",

  slug: "pisces-daily-scheduled-test",


  meta: {

    period: "daily",

    language: "english",


    // IMPORTANT
    // Publish Cron will pick this
    status: "approved",


    startDate:
      new Date(
        Date.now() + 5 * 60 * 1000
      ),


    endDate:
      new Date(
        Date.now() + 24 * 60 * 60 * 1000
      ),


    publishedAt: null,


    // Cron trigger time
    scheduledAt:
      new Date(
        Date.now() + 5 * 60 * 1000
      ),


    slugDate:
      new Date()
        .toISOString()
        .split("T")[0],


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
      "Scheduled Horoscope Cron Test",


    description:
      "Testing automated horoscope publishing workflow through cron system.",


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
      "Meena Rashi represents intuition, imagination and emotional wisdom.",

  },



  traits: {

    strengths: [

      "Compassion",

      "Creativity",

      "Intuition",

    ],


    weaknesses: [

      "Emotional sensitivity",

      "Overthinking",

    ],


    personality:
      "A deeply intuitive water sign guided by imagination and empathy.",

  },



  editorial: {

    headline:
      "Pisces Daily Horoscope Scheduled Test",


    overview:
      "This horoscope verifies scheduled publishing workflow.",


    prediction:
      "Cron automation should publish this horoscope automatically.",


    quote:
      "Trust your intuition.",

  },



  life: {

    career:
      "Creative thinking supports professional growth.",


    love:
      "Understanding improves relationships.",


    finance:
      "Practical planning supports financial stability.",


    health:
      "Balanced routines improve wellbeing.",

  },



  insights: {

    planetaryInfluence:
      "Jupiter enhances wisdom and growth.",


    energy:
      "Calm",


    guidance:
      "Follow intuition with practical thinking.",


    remedy:
      "Meditation and gratitude practice.",


    strengths: [

      "Intuition",

      "Creativity",

      "Compassion",

    ],


    challenges: [

      "Overthinking",

      "Sensitivity",

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
        "Jupiter strengthens wisdom and optimism.",


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
      "Meditation and positive reflection.",


    guidance:
      "Strengthen wisdom through learning and kindness.",


    reason:
      "Supports emotional balance.",

  },



  vedic: {

    favorable: [

      "Learning",

      "Creative work",

      "Spiritual practice",

    ],


    avoid: [

      "Impulsive decisions",

      "Emotional reactions",

    ],

  },



  compatibility: {

    title:
      "Natural Zodiac Connections",


    description:
      "Pisces connects with compassionate signs.",


    link:
      "/astro/compatibility/pisces",

  },



  premium: {

    title:
      "Unlock Pisces Personal Intelligence",


    description:
      "Explore deeper personalized astrology insights.",


    features: [

      "Birth Chart",

      "Life Intelligence",

      "AI Astro Reports",

    ],

  },



  seo: {

    title:
      "Pisces Daily Horoscope Test | NationPath Astro",


    description:
      "Scheduled horoscope automation testing.",


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

};



async function seedScheduledHoroscope() {

  try {

    await connectDB();


    await Horoscope.findOneAndUpdate(

      {
        zodiac:
          scheduledHoroscope.zodiac,

        slug:
          scheduledHoroscope.slug,

      },


      {
        $set:
          scheduledHoroscope,
      },


      {
        upsert: true,

        new: true,

      }

    );


    console.log(
      "✅ Scheduled Horoscope Test Seed Completed"
    );


    console.log({

      status:
        scheduledHoroscope.meta.status,

      scheduledAt:
        scheduledHoroscope.meta.scheduledAt,

    });


    process.exit(0);


  } catch(error) {


    console.error(
      "❌ Scheduled Horoscope Seed Failed",
      error
    );


    process.exit(1);

  }

}



seedScheduledHoroscope();