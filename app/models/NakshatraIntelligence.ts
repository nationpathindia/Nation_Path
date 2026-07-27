//////////////////////////////////////////////////////////////
// NATIONPATH NAKSHATRA INTELLIGENCE CMS MODEL
//
// Responsibility:
// Nakshatra knowledge master data management.
//
// Does NOT:
// - calculate planetary positions
// - modify Swiss Ephemeris
// - generate horoscope
//////////////////////////////////////////////////////////////

import mongoose, { Schema, Model } from "mongoose";

const NakshatraIntelligenceSchema = new Schema(

  {

    //////////////////////////////////////////////////////////
    // BASIC INFORMATION
    //////////////////////////////////////////////////////////

    nakshatra:{

      type:String,

      required:true,

      trim:true,

      lowercase:true,

    },



    slug:{

      type:String,

      required:true,

      unique:true,

      lowercase:true,

      trim:true,

    },



    number:{

      type:Number,

      required:true,

      min:1,

      max:27,

    },



    names:{

      english:{

        type:String,

        default:"",

      },

      hindi:{

        type:String,

        default:"",

      },

      sanskrit:{

        type:String,

        default:"",

      },

    },



    //////////////////////////////////////////////////////////
    // CLASSIFICATION
    //////////////////////////////////////////////////////////

    ruler:{

      type:String,

      default:"",

    },



    deity:{

      type:String,

      default:"",

    },



    symbol:{

      type:String,

      default:"",

    },



    gana:{

      type:String,

      default:"",

    },



    guna:{

      type:String,

      default:"",

    },



    yoni:{

      type:String,

      default:"",

    },



    nadi:{

      type:String,

      default:"",

    },



    varna:{

      type:String,

      default:"",

    },



    element:{

      type:String,

      default:"",

    },



    nature:{

      type:String,

      default:"",

    },



    motivation:{

      type:String,

      default:"",

    },



    gender:{

      type:String,

      default:"",

    },



    direction:{

      type:String,

      default:"",

    },



    animal:{

      type:String,

      default:"",

    },



    tree:{

      type:String,

      default:"",

    },



    //////////////////////////////////////////////////////////
    // ASTRO KNOWLEDGE
    //////////////////////////////////////////////////////////

    personality:{

      type:[String],

      default:[],

    },



    strengths:{

      type:[String],

      default:[],

    },



    weaknesses:{

      type:[String],

      default:[],

    },



    profession:{

      type:[String],

      default:[],

    },



    relationships:{

      type:[String],

      default:[],

    },



    health:{

      type:[String],

      default:[],

    },



    spirituality:{

      type:[String],

      default:[],

    },



    keywords:{

      type:[String],

      default:[],

    },



    //////////////////////////////////////////////////////////
    // REMEDIES
    //////////////////////////////////////////////////////////

    remedies:{

      type:[String],

      default:[],

    },



    mantra:{

      type:String,

      default:"",

    },



    gemstone:{

      type:String,

      default:"",

    },



    color:{

      type:String,

      default:"",

    },



    //////////////////////////////////////////////////////////
    // CONTENT
    //////////////////////////////////////////////////////////

    description:{

      type:String,

      default:"",

    },



    //////////////////////////////////////////////////////////
    // MEDIA
    //////////////////////////////////////////////////////////

    media:{

      icon:{

        type:String,

        default:"",

      },

      banner:{

        type:String,

        default:"",

      },

    },



    //////////////////////////////////////////////////////////
    // SEO
    //////////////////////////////////////////////////////////

    seo:{

      title:{

        type:String,

        default:"",

      },

      description:{

        type:String,

        default:"",

      },

    },



    //////////////////////////////////////////////////////////
    // STATUS
    //////////////////////////////////////////////////////////

    status:{

      type:String,

      enum:[

        "draft",

        "published",

      ],

      default:"draft",

    },

  },

  {

    timestamps:true,

  }

);

const NakshatraIntelligence: Model<any> =

  mongoose.models.NakshatraIntelligence ||

  mongoose.model(

    "NakshatraIntelligence",

    NakshatraIntelligenceSchema

  );

export default NakshatraIntelligence;