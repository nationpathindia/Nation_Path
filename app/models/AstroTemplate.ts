//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO TEMPLATE CMS MODEL
//
// Responsibility:
// AI + Prediction response template management.
//
// Does NOT:
// - calculate planetary positions
// - modify Swiss Ephemeris
// - generate horoscope predictions
//////////////////////////////////////////////////////////////

import mongoose, { Schema, Model } from "mongoose";







const AstroTemplateSchema = new Schema(


  {


    //////////////////////////////////////////////////////////
    // BASIC INFORMATION
    //////////////////////////////////////////////////////////


    templateName:{


      type:String,

      required:true,

      trim:true,


    },





    slug:{


      type:String,

      required:true,

      unique:true,

      lowercase:true,

      trim:true,


    },





    category:{


      type:String,


      enum:[


        "daily_rashifal",

        "love",

        "career",

        "finance",

        "health",

        "marriage",

        "education",

        "travel",


      ],


      default:"daily_rashifal",


    },





    language:{


      type:String,


      enum:[


        "hindi",

        "english",

        "nepali",

        "gujarati",


      ],


      default:"hindi",


    },









    //////////////////////////////////////////////////////////
    // TEMPLATE STRUCTURE
    //////////////////////////////////////////////////////////


    structure:{


      headline:{


        type:String,


        default:"",


      },





      introduction:{


        type:String,


        default:"",


      },





      prediction:{


        type:String,


        default:"",


      },





      advice:{


        type:String,


        default:"",


      },





      remedies:{


        type:String,


        default:"",


      },


    },









    //////////////////////////////////////////////////////////
    // AI VARIABLES
    //////////////////////////////////////////////////////////


    variables:{


      planet:{


        type:Boolean,


        default:false,


      },





      zodiac:{


        type:Boolean,


        default:false,


      },





      nakshatra:{


        type:Boolean,


        default:false,


      },





      dasha:{


        type:Boolean,


        default:false,


      },





      transit:{


        type:Boolean,


        default:false,


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

        "published"


      ],


      default:"draft",


    },



  },


  {


    timestamps:true,


  }


);









const AstroTemplate:


Model<any> =


  mongoose.models.AstroTemplate ||


  mongoose.model(


    "AstroTemplate",


    AstroTemplateSchema


  );









export default AstroTemplate;