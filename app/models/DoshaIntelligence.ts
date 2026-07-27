//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO DOSHA INTELLIGENCE CMS MODEL
//
// Purpose:
// Knowledge management layer only
//
// IMPORTANT:
// - No astrology calculation
// - No dosha detection logic
// - No prediction generation
// - Pure CMS content storage
//////////////////////////////////////////////////////////////

import mongoose, { Schema, Document, Model } from "mongoose";


export interface IDoshaIntelligence extends Document {

  dosha: string;

  slug: string;


  multilingualNames?: {

    hindi?: string;
    english?: string;
    nepali?: string;

  };


  category:
    | "planetary"
    | "ancestral"
    | "marriage"
    | "birth-chart"
    | "other";


  planetsInvolved?: string[];

  housesInvolved?: string[];


  formationExplanation?: string;


  causes?: string[];


  positiveEffects?: string[];


  negativeEffects?: string[];


  challenges?: string[];


  lifeAreas?: {

    career?: string;

    finance?: string;

    marriage?: string;

    health?: string;

    spirituality?: string;

  };


  remedies?: string[];


  mantras?: string[];


  rituals?: string[];


  gemstones?: string[];


  metals?: string[];


  relatedDoshas?: string[];


  description?: string;


  media?: {

    image?: string;

    video?: string;

  };


  seo?: {

    title?: string;

    description?: string;

    keywords?: string[];

  };


  status:
    | "draft"
    | "published";


  createdAt: Date;

  updatedAt: Date;

}



const DoshaIntelligenceSchema =
  new Schema<IDoshaIntelligence>(

    {


      dosha: {

        type: String,

        required: true,

        trim: true,

      },


      slug: {

        type: String,

        required: true,

        unique: true,

        lowercase: true,

        trim: true,

      },



      multilingualNames: {

        hindi: {

          type: String,

          default: "",

        },


        english: {

          type: String,

          default: "",

        },


        nepali: {

          type: String,

          default: "",

        },

      },



      category: {

        type: String,

        enum: [

          "planetary",

          "ancestral",

          "marriage",

          "birth-chart",

          "other",

        ],

        default: "other",

      },



      planetsInvolved: [

        {

          type: String,

        },

      ],



      housesInvolved: [

        {

          type: String,

        },

      ],



      formationExplanation: {

        type: String,

        default: "",

      },



      causes: [

        {

          type: String,

        },

      ],



      positiveEffects: [

        {

          type: String,

        },

      ],



      negativeEffects: [

        {

          type: String,

        },

      ],



      challenges: [

        {

          type: String,

        },

      ],



      lifeAreas: {

        career: {

          type: String,

          default: "",

        },


        finance: {

          type: String,

          default: "",

        },


        marriage: {

          type: String,

          default: "",

        },


        health: {

          type: String,

          default: "",

        },


        spirituality: {

          type: String,

          default: "",

        },

      },



      remedies: [

        {

          type: String,

        },

      ],



      mantras: [

        {

          type: String,

        },

      ],



      rituals: [

        {

          type: String,

        },

      ],



      gemstones: [

        {

          type: String,

        },

      ],



      metals: [

        {

          type: String,

        },

      ],



      relatedDoshas: [

        {

          type: String,

        },

      ],



      description: {

        type: String,

        default: "",

      },



      media: {

        image: {

          type: String,

          default: "",

        },


        video: {

          type: String,

          default: "",

        },

      },



      seo: {

        title: {

          type: String,

          default: "",

        },


        description: {

          type: String,

          default: "",

        },


        keywords: [

          {

            type: String,

          },

        ],

      },



      status: {

        type: String,

        enum: [

          "draft",

          "published",

        ],

        default: "draft",

      },


    },


    {

      timestamps: true,

    }

  );



const DoshaIntelligence: Model<IDoshaIntelligence> =
  mongoose.models.DoshaIntelligence ||
  mongoose.model<IDoshaIntelligence>(
    "DoshaIntelligence",
    DoshaIntelligenceSchema
  );



export default DoshaIntelligence;