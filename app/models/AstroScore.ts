//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO SCORE CMS MODEL
//
// Responsibility:
// Astrology scoring rule management.
//
// Does NOT:
// - calculate planetary positions
// - modify Swiss Ephemeris
// - generate predictions
//////////////////////////////////////////////////////////////

import mongoose, { Schema, Model } from "mongoose";







const AstroScoreSchema = new Schema(


  {


    //////////////////////////////////////////////////////////
    // BASIC INFORMATION
    //////////////////////////////////////////////////////////


    name:{


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









    //////////////////////////////////////////////////////////
    // SCORING TYPE
    //////////////////////////////////////////////////////////


    type:{


      type:String,


      enum:[


        "planet",

        "zodiac",

        "house",

        "nakshatra",

        "dasha",

        "transit",


      ],


      default:"planet",


    },









    //////////////////////////////////////////////////////////
    // TARGET REFERENCE
    //////////////////////////////////////////////////////////


    target:{


      planet:{


        type:String,


        default:"",


      },





      zodiac:{


        type:String,


        default:"",


      },





      house:{


        type:String,


        default:"",


      },





      nakshatra:{


        type:String,


        default:"",


      },


    },









    //////////////////////////////////////////////////////////
    // SCORE IMPACT
    //////////////////////////////////////////////////////////


    score:{


      positive:{


        type:Number,


        default:0,


      },





      negative:{


        type:Number,


        default:0,


      },





      neutral:{


        type:Number,


        default:0,


      },


    },









    //////////////////////////////////////////////////////////
    // PRIORITY & WEIGHT
    //////////////////////////////////////////////////////////


    weight:{


      type:Number,


      default:1,


    },





    priority:{


      type:Number,


      default:1,


    },









    //////////////////////////////////////////////////////////
    // PREDICTION CATEGORY
    //////////////////////////////////////////////////////////


    category:{


      type:String,


      enum:[


        "love",

        "career",

        "finance",

        "health",

        "marriage",

        "education",

        "travel",


      ],


      default:"career",


    },









    //////////////////////////////////////////////////////////
    // CONDITIONS
    //////////////////////////////////////////////////////////


    conditions:{


      planet:{


        type:String,


        default:"",


      },





      aspect:{


        type:String,


        default:"",


      },





      house:{


        type:String,


        default:"",


      },





      sign:{


        type:String,


        default:"",


      },


    },









    //////////////////////////////////////////////////////////
    // CONTENT
    //////////////////////////////////////////////////////////


    description:{


      type:String,


      default:"",


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









const AstroScore:


Model<any> =


  mongoose.models.AstroScore ||


  mongoose.model(


    "AstroScore",


    AstroScoreSchema


  );









export default AstroScore;