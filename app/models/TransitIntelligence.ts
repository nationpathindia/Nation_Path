//////////////////////////////////////////////////////////////
// NATIONPATH TRANSIT INTELLIGENCE CMS MODEL
//
// Responsibility:
// Planetary transit knowledge management.
//
// Does NOT:
// - calculate planetary positions
// - modify Swiss Ephemeris
// - generate predictions
//////////////////////////////////////////////////////////////

import mongoose, { Schema, Model } from "mongoose";







const TransitIntelligenceSchema = new Schema(


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
    // TRANSIT TYPE
    //////////////////////////////////////////////////////////


    planet:{


      type:String,


      required:true,


      default:"",


    },





    fromSign:{


      type:String,


      default:"",


    },





    toSign:{


      type:String,


      default:"",


    },









    //////////////////////////////////////////////////////////
    // TRANSIT DETAILS
    //////////////////////////////////////////////////////////


    transitType:{


      type:String,


      enum:[


        "planetary",

        "retrograde",

        "combust",

        "stationary",

        "direct",


      ],


      default:"planetary",


    },









    duration:{


      type:String,


      default:"",


    },









    //////////////////////////////////////////////////////////
    // ASTRO EFFECTS
    //////////////////////////////////////////////////////////


    effects:{


      positive:{


        type:[String],


        default:[],


      },





      negative:{


        type:[String],


        default:[],


      },





      neutral:{


        type:[String],


        default:[],


      },


    },









    //////////////////////////////////////////////////////////
    // HOUSE IMPACT
    //////////////////////////////////////////////////////////


    houseImpact:{


      first:{


        type:String,


        default:"",


      },





      second:{


        type:String,


        default:"",


      },





      third:{


        type:String,


        default:"",


      },









      fourth:{


        type:String,


        default:"",


      },





      fifth:{


        type:String,


        default:"",


      },





      sixth:{


        type:String,


        default:"",


      },









      seventh:{


        type:String,


        default:"",


      },





      eighth:{


        type:String,


        default:"",


      },





      ninth:{


        type:String,


        default:"",


      },









      tenth:{


        type:String,


        default:"",


      },





      eleventh:{


        type:String,


        default:"",


      },





      twelfth:{


        type:String,


        default:"",


      },


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
    // REMEDIES
    //////////////////////////////////////////////////////////


    remedies:{


      type:[String],


      default:[],


    },









    advice:{


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









const TransitIntelligence:


Model<any> =


  mongoose.models.TransitIntelligence ||


  mongoose.model(


    "TransitIntelligence",


    TransitIntelligenceSchema


  );









export default TransitIntelligence;