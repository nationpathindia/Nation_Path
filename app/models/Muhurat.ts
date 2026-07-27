//////////////////////////////////////////////////////////////
// NATIONPATH MUHURAT CMS MODEL
//
// Responsibility:
// Auspicious timing master data management.
//
// Does NOT:
// - calculate muhurat
// - run astrology engine
// - generate predictions
//////////////////////////////////////////////////////////////

import mongoose, { Schema, Model } from "mongoose";






const MuhuratSchema = new Schema(


  {


    //////////////////////////////////////////////////////////
    // BASIC INFORMATION
    //////////////////////////////////////////////////////////


    title:{


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


        "Marriage",

        "Griha Pravesh",

        "Business",

        "Vehicle Purchase",

        "Education",

        "Travel",

        "Naming Ceremony",

        "Puja",

        "Investment",


      ],


      default:"Puja",


    },









    //////////////////////////////////////////////////////////
    // DATE & TIME
    //////////////////////////////////////////////////////////


    date:{


      type:String,

      required:true,


    },




    timing:{


      start:{


        type:String,

        default:"",


      },


      end:{


        type:String,

        default:"",


      },


    },









    //////////////////////////////////////////////////////////
    // ASTRO DETAILS
    //////////////////////////////////////////////////////////


    astrology:{


      tithi:{


        type:String,

        default:"",


      },



      nakshatra:{


        type:String,

        default:"",


      },



      yoga:{


        type:String,

        default:"",


      },


    },









    //////////////////////////////////////////////////////////
    // PURPOSE
    //////////////////////////////////////////////////////////


    suitableFor:{


      type:[String],


      default:[],


    },





    avoidFor:{


      type:[String],


      default:[],


    },









    //////////////////////////////////////////////////////////
    // CONTENT
    //////////////////////////////////////////////////////////


    benefits:{


      type:[String],


      default:[],


    },





    description:{


      type:String,


      default:"",


    },









    //////////////////////////////////////////////////////////
    // DOSHA RULES
    //////////////////////////////////////////////////////////


    doshaRules:{


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








const Muhurat:

Model<any> =


  mongoose.models.Muhurat ||


  mongoose.model(

    "Muhurat",

    MuhuratSchema

  );






export default Muhurat;