import mongoose from "mongoose";



const BusinessIntelligenceSchema = new mongoose.Schema(


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

      default:"business",


    },





    businessType:{


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





    industries:[{


      type:String,


    }],





    entrepreneurship:[{


      type:String,


    }],





    leadershipQualities:[{


      type:String,


    }],





    professionalStrengths:[{


      type:String,


    }],





    wealthCreation:[{


      type:String,


    }],





    businessSkills:[{


      type:String,


    }],





    challenges:[{


      type:String,


    }],





    opportunities:[{


      type:String,


    }],





    startup:{


      type:String,


      default:"",


    },





    businessGrowth:{


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







export default mongoose.models.BusinessIntelligence ||


mongoose.model(


  "BusinessIntelligence",


  BusinessIntelligenceSchema


);