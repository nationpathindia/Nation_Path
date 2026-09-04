//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// ZODIAC MASTER SEED
//
// Collection:
// MongoDB -> zodiacs
//
// Purpose:
// Master zodiac intelligence data
//
// No horoscope generation
// No engine dependency
//////////////////////////////////////////////////////////////

import "dotenv/config";

import { connectMongoDB } from "@/lib/mongodb";

import Zodiac from "@/app/models/Zodiac";



//////////////////////////////////////////////////////////////
// ZODIAC MASTER DATA
//////////////////////////////////////////////////////////////

const zodiacData = [

  //////////////////////////////////////////////////////////////
// ARIES
//////////////////////////////////////////////////////////////

{
  zodiac: "aries",

  slug: "aries",

  names: {
    english: "Aries",
    hindi: "मेष",
    sanskrit: "मेष",
  },

  symbol: "/zodiac/aries.png",

  element: "fire",

  modality: "cardinal",

  rulingPlanet: "Mars",

  identity: {

    rashi: "मेष राशि",

    sanskritName: "मेष",

    dates: "March 21 - April 19",

    description:
      "Aries represents courage, initiative and leadership energy.",

    energy: "Mars Energy",

    nameInitials: [
      "चू",
      "चे",
      "चो",
      "ला",
      "ली",
      "लू",
      "ले",
      "लो",
      "अ",
    ],

  },

  traits: {

    strengths: [
      "Courage",
      "Leadership",
      "Initiative",
    ],

    weaknesses: [
      "Impatient",
      "Impulsive",
    ],

    personality:
      "A dynamic fire sign driven by courage and purposeful action.",

  },

  lucky: {

    color: "Red",

    number: "9",

    day: "Tuesday",

  },

  media: {

    icon: "/zodiac/aries.png",

    banner: "",

  },

  seo: {

    title: "Aries Zodiac",

    description:
      "Aries astrology intelligence.",

  },

  status: "published",

},



//////////////////////////////////////////////////////////////
// TAURUS
//////////////////////////////////////////////////////////////

{
  zodiac: "taurus",

  slug: "taurus",

  names: {
    english: "Taurus",
    hindi: "वृषभ",
    sanskrit: "वृषभ",
  },

  symbol: "/zodiac/taurus.png",

  element: "earth",

  modality: "fixed",

  rulingPlanet: "Venus",

  identity: {

    rashi: "वृषभ राशि",

    sanskritName: "वृषभ",

    dates: "April 20 - May 20",

    description:
      "Taurus represents stability, patience and grounded strength.",

    energy: "Venus Energy",

    nameInitials: [
      "ई",
      "ऊ",
      "ए",
      "ओ",
      "वा",
      "वी",
      "वू",
      "वे",
      "वो",
    ],

  },

  traits: {

    strengths: [
      "Patience",
      "Stability",
      "Loyalty",
    ],

    weaknesses: [
      "Stubborn",
      "Possessive",
    ],

    personality:
      "A grounded earth sign that values stability and lasting growth.",

  },

  lucky: {

    color: "White",

    number: "6",

    day: "Friday",

  },

  media: {

    icon: "/zodiac/taurus.png",

    banner: "",

  },

  seo: {

    title: "Taurus Zodiac",

    description:
      "Taurus astrology intelligence.",

  },

  status: "published",

},



//////////////////////////////////////////////////////////////
// GEMINI
//////////////////////////////////////////////////////////////

{
  zodiac: "gemini",

  slug: "gemini",

  names: {
    english: "Gemini",
    hindi: "मिथुन",
    sanskrit: "मिथुन",
  },

  symbol: "/zodiac/gemini.png",

  element: "air",

  modality: "mutable",

  rulingPlanet: "Mercury",

  identity: {

    rashi: "मिथुन राशि",

    sanskritName: "मिथुन",

    dates: "May 21 - June 20",

    description:
      "Gemini represents curiosity, communication and intellectual versatility.",

    energy: "Mercury Energy",

    nameInitials: [
      "का",
      "की",
      "कू",
      "घ",
      "ङ",
      "के",
      "को",
      "हा",
      "ही",
    ],

  },

  traits: {

    strengths: [
      "Curiosity",
      "Communication",
      "Adaptability",
    ],

    weaknesses: [
      "Restless",
      "Inconsistent",
    ],

    personality:
      "An intelligent air sign driven by curiosity and communication.",

  },

  lucky: {

    color: "Green",

    number: "5",

    day: "Wednesday",

  },

  media: {

    icon: "/zodiac/gemini.png",

    banner: "",

  },

  seo: {

    title: "Gemini Zodiac",

    description:
      "Gemini astrology intelligence.",

  },

  status: "published",

},



//////////////////////////////////////////////////////////////
// CANCER
//////////////////////////////////////////////////////////////

{
  zodiac: "cancer",

  slug: "cancer",

  names: {
    english: "Cancer",
    hindi: "कर्क",
    sanskrit: "कर्क",
  },

  symbol: "/zodiac/cancer.png",

  element: "water",

  modality: "cardinal",

  rulingPlanet: "Moon",

  identity: {

    rashi: "कर्क राशि",

    sanskritName: "कर्क",

    dates: "June 21 - July 22",

    description:
      "Cancer represents emotional depth, nurturing nature and protective strength.",

    energy: "Moon Energy",

    nameInitials: [
      "ही",
      "हू",
      "हे",
      "हो",
      "डा",
      "डी",
      "डू",
      "डे",
      "डो",
    ],

  },

  traits: {

    strengths: [
      "Compassion",
      "Protection",
      "Intuition",
    ],

    weaknesses: [
      "Sensitive",
      "Moody",
    ],

    personality:
      "A deeply intuitive water sign guided by emotion and care.",

  },

  lucky: {

    color: "White",

    number: "2",

    day: "Monday",

  },

  media: {

    icon: "/zodiac/cancer.png",

    banner: "",

  },

  seo: {

    title: "Cancer Zodiac",

    description:
      "Cancer astrology intelligence.",

  },

  status: "published",

},



//////////////////////////////////////////////////////////////
// LEO
//////////////////////////////////////////////////////////////

{
  zodiac: "leo",

  slug: "leo",

  names: {
    english: "Leo",
    hindi: "सिंह",
    sanskrit: "सिंह",
  },

  symbol: "/zodiac/leo.png",

  element: "fire",

  modality: "fixed",

  rulingPlanet: "Sun",

  identity: {

    rashi: "सिंह राशि",

    sanskritName: "सिंह",

    dates: "July 23 - August 22",

    description:
      "Leo represents confidence, creativity and natural leadership.",

    energy: "Sun Energy",

    nameInitials: [
      "मा",
      "मी",
      "मू",
      "मे",
      "मो",
      "टा",
      "टी",
      "टू",
      "टे",
    ],

  },

  traits: {

    strengths: [
      "Confidence",
      "Leadership",
      "Creativity",
    ],

    weaknesses: [
      "Pride",
      "Stubbornness",
    ],

    personality:
      "A confident fire sign with strong creative and leadership energy.",

  },

  lucky: {

    color: "Gold",

    number: "1",

    day: "Sunday",

  },

  media: {

    icon: "/zodiac/leo.png",

    banner: "",

  },

  seo: {

    title: "Leo Zodiac",

    description:
      "Leo astrology intelligence.",

  },

  status: "published",

},



//////////////////////////////////////////////////////////////
// VIRGO
//////////////////////////////////////////////////////////////

{
  zodiac: "virgo",

  slug: "virgo",

  names: {
    english: "Virgo",
    hindi: "कन्या",
    sanskrit: "कन्या",
  },

  symbol: "/zodiac/virgo.png",

  element: "earth",

  modality: "mutable",

  rulingPlanet: "Mercury",

  identity: {

    rashi: "कन्या राशि",

    sanskritName: "कन्या",

    dates: "August 23 - September 22",

    description:
      "Virgo represents precision, intelligence and thoughtful service.",

    energy: "Mercury Energy",

    nameInitials: [
      "टो",
      "पा",
      "पी",
      "पू",
      "ष",
      "ण",
      "ठ",
      "पे",
      "पो",
    ],

  },

  traits: {

    strengths: [
      "Analysis",
      "Precision",
      "Practicality",
    ],

    weaknesses: [
      "Overthinking",
      "Critical",
    ],

    personality:
      "A practical earth sign guided by analysis and thoughtful action.",

  },

  lucky: {

    color: "Green",

    number: "5",

    day: "Wednesday",

  },

  media: {

    icon: "/zodiac/virgo.png",

    banner: "",

  },

  seo: {

    title: "Virgo Zodiac",

    description:
      "Virgo astrology intelligence.",

  },

  status: "published",

},



//////////////////////////////////////////////////////////////
// LIBRA
//////////////////////////////////////////////////////////////

{
  zodiac: "libra",

  slug: "libra",

  names: {
    english: "Libra",
    hindi: "तुला",
    sanskrit: "तुला",
  },

  symbol: "/zodiac/libra.png",

  element: "air",

  modality: "cardinal",

  rulingPlanet: "Venus",

  identity: {

    rashi: "तुला राशि",

    sanskritName: "तुला",

    dates: "September 23 - October 22",

    description:
      "Libra represents balance, harmony and thoughtful relationships.",

    energy: "Venus Energy",

    nameInitials: [
      "रा",
      "री",
      "रू",
      "रे",
      "रो",
      "ता",
      "ती",
      "तू",
      "ते",
    ],

  },

  traits: {

    strengths: [
      "Diplomacy",
      "Balance",
      "Harmony",
    ],

    weaknesses: [
      "Indecisive",
      "Avoidant",
    ],

    personality:
      "A balanced air sign seeking harmony, beauty and meaningful connection.",

  },

  lucky: {

    color: "White",

    number: "6",

    day: "Friday",

  },

  media: {

    icon: "/zodiac/libra.png",

    banner: "",

  },

  seo: {

    title: "Libra Zodiac",

    description:
      "Libra astrology intelligence.",

  },

  status: "published",

},

];

//////////////////////////////////////////////////////////////
// SEED
//////////////////////////////////////////////////////////////

async function seed() {

  try {

    await connectMongoDB();

    console.log("Connected MongoDB");


    //////////////////////////////////////////////////////////
    // UPDATE / INSERT
    //////////////////////////////////////////////////////////

    for (const item of zodiacData) {

      await (Zodiac as any).findOneAndUpdate(

        {
          slug: item.slug,
        },

        {
          $set: {

            zodiac: item.zodiac,

            slug: item.slug,

            names: item.names,

            symbol: item.symbol,

            element: item.element,

            modality: item.modality,

            rulingPlanet: item.rulingPlanet,

            identity: item.identity,

            traits: item.traits,

            lucky: item.lucky,

            media: item.media,

            seo: item.seo,

            status: item.status,

          },
        },

        {
          upsert: true,

          new: true,
        }

      );

      console.log(
        "Updated / Seeded:",
        item.zodiac
      );

    }


    //////////////////////////////////////////////////////////
    // COMPLETED
    //////////////////////////////////////////////////////////

    console.log(
      "Zodiac master seed completed successfully."
    );


    process.exit(0);

  }

  catch (error) {

    console.error(
      "ZODIAC SEED ERROR",
      error
    );

    process.exit(1);

  }

}



//////////////////////////////////////////////////////////////
// RUN
//////////////////////////////////////////////////////////////

seed();