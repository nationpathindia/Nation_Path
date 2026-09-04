//////////////////////////////////////////////////////////////
//
// NATIONPATH ZODIAC MASTER MODEL
//
// Responsibility:
//
// Store canonical Zodiac Master knowledge.
//
// Used for:
// - Horoscope pages
// - Zodiac information
// - SEO pages
// - Astro intelligence
// - Zodiac Explorer
// - Name Initials
//
// Does NOT:
// - calculate horoscope
// - run prediction engine
// - generate AI content
// - calculate name initials
//
//////////////////////////////////////////////////////////////

import mongoose, {
  Schema,
  Document,
  Model,
} from "mongoose";

//////////////////////////////////////////////////////////////
// TYPE
//////////////////////////////////////////////////////////////

export interface IZodiac extends Document {

  ////////////////////////////////////////////////////////////
  // BASIC IDENTITY
  ////////////////////////////////////////////////////////////

  zodiac: string;

  slug: string;


  ////////////////////////////////////////////////////////////
  // MULTI LANGUAGE NAMES
  ////////////////////////////////////////////////////////////

  names?: {

    english: string;

    hindi?: string;

    sanskrit?: string;

    gujarati?: string;

    nepali?: string;

  };


  ////////////////////////////////////////////////////////////
  // IDENTITY
  ////////////////////////////////////////////////////////////

  identity?: {

    rashi?: string;

    sanskritName?: string;

    dates?: string;

    description?: string;

    energy?: string;

  };


  ////////////////////////////////////////////////////////////
  // NAME INITIALS
  //
  // IMPORTANT:
  //
  // MongoDB canonical structure stores this field
  // at TOP LEVEL.
  //
  // Example:
  //
  // nameInitials: [
  //   "चू",
  //   "चे",
  //   "चो",
  //   "ला",
  //   "ली",
  //   "लू",
  //   "ले",
  //   "लो",
  //   "अ"
  // ]
  //
  // This is static Zodiac Master knowledge.
  //
  // NEVER CALCULATE.
  // NEVER GENERATE.
  //
  ////////////////////////////////////////////////////////////

  nameInitials?: string[];


  ////////////////////////////////////////////////////////////
  // ASTRO INFO
  ////////////////////////////////////////////////////////////

  symbol?: string;


  element?:
    | "fire"
    | "earth"
    | "air"
    | "water";


  modality?:
    | "cardinal"
    | "fixed"
    | "mutable";


  rulingPlanet?: string;


  ////////////////////////////////////////////////////////////
  // PERSONALITY
  ////////////////////////////////////////////////////////////

  traits?: {

    strengths?: string[];

    weaknesses?: string[];

    personality?: string;

  };


  ////////////////////////////////////////////////////////////
  // LUCK
  ////////////////////////////////////////////////////////////

  lucky?: {

    color?: string;

    number?: string;

    day?: string;

  };


  ////////////////////////////////////////////////////////////
  // MEDIA
  ////////////////////////////////////////////////////////////

  media?: {
  icon?: string;
  banner?: string;
  modality?:
    | "cardinal"
    | "fixed"
    | "mutable";
};


  ////////////////////////////////////////////////////////////
  // SEO
  ////////////////////////////////////////////////////////////

  seo?: {

    title?: string;

    description?: string;

  };


  ////////////////////////////////////////////////////////////
  // STATUS
  ////////////////////////////////////////////////////////////

  status:
    | "draft"
    | "published";

}


//////////////////////////////////////////////////////////////
// SCHEMA
//////////////////////////////////////////////////////////////

const ZodiacSchema =
  new Schema<IZodiac>(
    {

      //////////////////////////////////////////////////////////
      // BASIC IDENTITY
      //////////////////////////////////////////////////////////

      zodiac: {

        type: String,

        required: true,

        lowercase: true,

        unique: true,

        trim: true,

      },


      slug: {

        type: String,

        required: true,

        unique: true,

        lowercase: true,

        trim: true,

      },


      //////////////////////////////////////////////////////////
      // MULTI LANGUAGE NAMES
      //////////////////////////////////////////////////////////

      names: {

        english: {

          type: String,

          required: true,

        },

        hindi: String,

        sanskrit: String,

        gujarati: String,

        nepali: String,

      },


      //////////////////////////////////////////////////////////
      // IDENTITY
      //////////////////////////////////////////////////////////

      identity: {

        rashi: String,

        sanskritName: String,

        dates: String,

        description: String,

        energy: String,

      },


      //////////////////////////////////////////////////////////
      // NAME INITIALS
      //
      // IMPORTANT:
      //
      // TOP LEVEL FIELD.
      //
      // This matches the actual MongoDB document:
      //
      // {
      //   ...
      //   identity: {
      //     rashi: "...",
      //     sanskritName: "...",
      //     ...
      //   },
      //
      //   nameInitials: [
      //     "चू",
      //     "चे",
      //     "चो",
      //     "ला",
      //     "ली",
      //     "लू",
      //     "ले",
      //     "लो",
      //     "अ"
      //   ]
      // }
      //
      //////////////////////////////////////////////////////////

      nameInitials: {

        type: [String],

        default: [],

      },


      //////////////////////////////////////////////////////////
      // ASTRO INFO
      //////////////////////////////////////////////////////////

      symbol: String,


      element: {

        type: String,

        enum: [

          "fire",

          "earth",

          "air",

          "water",

        ],

      },


      modality: {

        type: String,

        enum: [

          "cardinal",

          "fixed",

          "mutable",

        ],

      },


      rulingPlanet: String,


      //////////////////////////////////////////////////////////
      // PERSONALITY
      //////////////////////////////////////////////////////////

      traits: {

        strengths: [String],

        weaknesses: [String],

        personality: String,

      },


      //////////////////////////////////////////////////////////
      // LUCK
      //////////////////////////////////////////////////////////

      lucky: {

        color: String,

        number: String,

        day: String,

      },


      //////////////////////////////////////////////////////////
      // MEDIA
      //////////////////////////////////////////////////////////

      media: {

        icon: String,

        banner: String,

      },


      //////////////////////////////////////////////////////////
      // SEO
      //////////////////////////////////////////////////////////

      seo: {

        title: String,

        description: String,

      },


      //////////////////////////////////////////////////////////
      // STATUS
      //////////////////////////////////////////////////////////

      status: {

        type: String,

        enum: [

          "draft",

          "published",

        ],

        default: "draft",

        index: true,

      },

    },

    {

      timestamps: true,

    }
  );


//////////////////////////////////////////////////////////////
// INDEXES
//////////////////////////////////////////////////////////////

ZodiacSchema.index(
  {
    zodiac: 1,
  },
  {
    unique: true,
  }
);


ZodiacSchema.index(
  {
    slug: 1,
  },
  {
    unique: true,
  }
);


ZodiacSchema.index(
  {
    status: 1,
  }
);


//////////////////////////////////////////////////////////////
// EXPORT MODEL
//////////////////////////////////////////////////////////////

const Zodiac =
  (mongoose.models.Zodiac as Model<IZodiac>) ||
  mongoose.model<IZodiac>(
    "Zodiac",
    ZodiacSchema
  );


export default Zodiac;