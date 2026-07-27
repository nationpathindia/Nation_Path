//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO FINANCE INTELLIGENCE CMS MODEL
//
// Responsibility:
// Astrology finance knowledge management only.
//
// Does NOT:
// - calculate horoscope
// - modify prediction engine
// - modify Swiss Ephemeris
//////////////////////////////////////////////////////////////

import mongoose from "mongoose";





const FinanceIntelligenceSchema = new mongoose.Schema(


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

      default:"finance",


    },







    financeType:{


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







    wealthSources:[{


      type:String,


    }],







    incomePatterns:[{


      type:String,


    }],







    investments:[{


      type:String,


    }],







    strengths:[{


      type:String,


    }],







    challenges:[{


      type:String,


    }],







    moneyManagement:{


      type:String,


      default:"",


    },







    businessFinance:{


      type:String,


      default:"",


    },







    careerFinance:{


      type:String,


      default:"",


    },







    wealthCreation:{


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









export default mongoose.models.FinanceIntelligence ||


mongoose.model(


  "FinanceIntelligence",


  FinanceIntelligenceSchema


);