//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HEALTH INTELLIGENCE CMS MODEL
//
// Responsibility:
// Astrology health knowledge management only.
//
// Does NOT:
// - provide medical diagnosis
// - calculate horoscope
// - modify prediction engine
// - modify Swiss Ephemeris
//////////////////////////////////////////////////////////////

import mongoose from "mongoose";





const HealthIntelligenceSchema = new mongoose.Schema(


  {


    title:{


      type:String,

      required:true,


    },







    slug:{


      type:String,

      required:true,

      unique:true,


    },









    category:{


      type:String,

      default:"health",


    },









    healthType:{


      type:String,

      default:"general",


    },









    planets:[{


      type:String,


    }],










    zodiacSigns:[{


      type:String,


    }],










    houses:[{


      type:String,


    }],










    bodyAreas:[{


      type:String,


    }],










    healthAssociations:[{


      type:String,


    }],










    wellnessGuidance:[{


      type:String,


    }],










    lifestyleSuggestions:[{


      type:String,


    }],










    strengths:[{


      type:String,


    }],










    challenges:[{


      type:String,


    }],










    planetaryInfluence:{


      type:String,

      default:"",


    },









    zodiacInfluence:{


      type:String,

      default:"",


    },









    houseInfluence:{


      type:String,

      default:"",


    },









    interpretation:{


      type:String,

      default:"",


    },









    remedies:{


      type:String,

      default:"",


    },









    media:{


      image:{


        type:String,

        default:"",


      },



      icon:{


        type:String,

        default:"",


      },



      video:{


        type:String,

        default:"",


      },


    },









    seo:{


      title:{


        type:String,

        default:"",


      },



      description:{


        type:String,

        default:"",


      },



      keywords:[{


        type:String,


      }],


    },









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









export default mongoose.models.HealthIntelligence ||


mongoose.model(


  "HealthIntelligence",


  HealthIntelligenceSchema


);