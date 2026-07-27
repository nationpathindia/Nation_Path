//////////////////////////////////////////////////////////////
// NATIONPATH PLANET INTELLIGENCE CMS MODEL
//
// Responsibility:
// Planet knowledge master data management.
//
// Does NOT:
// - calculate planetary positions
// - modify Swiss Ephemeris
// - generate horoscope
//////////////////////////////////////////////////////////////

import mongoose, { Schema, Model } from "mongoose";







const PlanetIntelligenceSchema = new Schema(


  {


    //////////////////////////////////////////////////////////
    // BASIC INFORMATION
    //////////////////////////////////////////////////////////


    planet:{


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


    nature:{


      type:String,


      enum:[


        "benefic",

        "malefic",

        "neutral",


      ],


      default:"neutral",


    },





    element:{


      type:String,


      default:"",


    },





    category:{


      type:String,


      default:"",


    },









    //////////////////////////////////////////////////////////
    // ASTRO KNOWLEDGE
    //////////////////////////////////////////////////////////


    karakatva:{


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









    //////////////////////////////////////////////////////////
    // EFFECTS
    //////////////////////////////////////////////////////////


    positiveEffects:{


      type:[String],


      default:[],


    },







    negativeEffects:{


      type:[String],


      default:[],


    },







    weaknesses:{


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







    metal:{


      type:String,


      default:"",


    },







    day:{


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

        "published"


      ],


      default:"draft",


    },



  },


  {


    timestamps:true,


  }


);








const PlanetIntelligence:

Model<any> =


  mongoose.models.PlanetIntelligence ||


  mongoose.model(

    "PlanetIntelligence",

    PlanetIntelligenceSchema

  );







export default PlanetIntelligence;