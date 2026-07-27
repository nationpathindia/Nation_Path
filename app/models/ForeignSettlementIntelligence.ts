import mongoose from "mongoose";



const ForeignSettlementIntelligenceSchema = new mongoose.Schema(


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

      default:"foreign-settlement",


    },





    settlementType:{


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





    countries:[{


      type:String,


    }],





    foreignTravel:[{


      type:String,


    }],





    migrationIndicators:[{


      type:String,


    }],





    overseasCareer:[{


      type:String,


    }],





    internationalOpportunities:[{


      type:String,


    }],





    foreignConnections:[{


      type:String,


    }],





    relocationFactors:[{


      type:String,


    }],





    challenges:[{


      type:String,


    }],





    opportunities:[{


      type:String,


    }],





    travel:{


      type:String,


      default:"",


    },





    settlement:{


      type:String,


      default:"",


    },





    career:{


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







export default mongoose.models.ForeignSettlementIntelligence ||


mongoose.model(


  "ForeignSettlementIntelligence",


  ForeignSettlementIntelligenceSchema


);