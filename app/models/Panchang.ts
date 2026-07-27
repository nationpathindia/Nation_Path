//////////////////////////////////////////////////////////////
// NATIONPATH PANCHANG CMS MODEL
//
// Responsibility:
// Daily Panchang master data management.
//
// Does NOT:
// - calculate astronomy
// - run Swiss Ephemeris
// - generate predictions
//////////////////////////////////////////////////////////////

import mongoose, { Schema, Model } from "mongoose";






const PanchangSchema = new Schema(


  {


    //////////////////////////////////////////////////////////
    // BASIC
    //////////////////////////////////////////////////////////


    date:{


      type:String,

      required:true,

    },



    location:{


      type:String,

      required:true,

      default:"India",

    },







    //////////////////////////////////////////////////////////
    // SUN TIMINGS
    //////////////////////////////////////////////////////////


    sunrise:{


      type:String,

      default:"",

    },



    sunset:{


      type:String,

      default:"",

    },








    //////////////////////////////////////////////////////////
    // TITHI
    //////////////////////////////////////////////////////////


    tithi:{


      name:{


        type:String,

        default:"",

      },



      paksha:{


        type:String,


        enum:[

          "Shukla",

          "Krishna",

          ""

        ],


        default:"",


      },



      endingTime:{


        type:String,

        default:"",

      },


    },









    //////////////////////////////////////////////////////////
    // NAKSHATRA
    //////////////////////////////////////////////////////////


    nakshatra:{


      name:{


        type:String,

        default:"",

      },



      endingTime:{


        type:String,

        default:"",

      },


    },









    //////////////////////////////////////////////////////////
    // YOGA
    //////////////////////////////////////////////////////////


    yoga:{


      type:String,

      default:"",

    },








    //////////////////////////////////////////////////////////
    // KARANA
    //////////////////////////////////////////////////////////


    karana:{


      type:String,

      default:"",

    },









    //////////////////////////////////////////////////////////
    // RASHI DATA
    //////////////////////////////////////////////////////////


    moonRashi:{


      type:String,

      default:"",

    },



    sunRashi:{


      type:String,

      default:"",

    },









    //////////////////////////////////////////////////////////
    // IMPORTANT TIMINGS
    //////////////////////////////////////////////////////////


    timings:{


      rahuKaal:{


        type:String,

        default:"",

      },



      yamaganda:{


        type:String,

        default:"",

      },



      gulika:{


        type:String,

        default:"",

      },


    },









    //////////////////////////////////////////////////////////
    // FESTIVAL / MUHURAT
    //////////////////////////////////////////////////////////


    festival:{


      type:String,

      default:"",

    },



    muhurat:{


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







const Panchang:

Model<any> =

  mongoose.models.Panchang ||

  mongoose.model(

    "Panchang",

    PanchangSchema

  );







export default Panchang;