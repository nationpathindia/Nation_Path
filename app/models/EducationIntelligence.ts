//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO EDUCATION INTELLIGENCE CMS MODEL
//
// Responsibility:
// Astrology education knowledge management only.
//
// Does NOT:
// - calculate horoscope
// - modify prediction engine
// - modify Swiss Ephemeris
//////////////////////////////////////////////////////////////

import mongoose from "mongoose";







const EducationIntelligenceSchema = new mongoose.Schema(


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

      default:"education",


    },









    educationType:{


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









    learningAreas:[{


      type:String,


    }],









    studyPatterns:[{


      type:String,


    }],









    educationStrengths:[{


      type:String,


    }],









    academicChallenges:[{


      type:String,


    }],









    skills:[{


      type:String,


    }],









    subjects:[{


      type:String,


    }],









    learningAbility:{


      type:String,

      default:"",


    },









    higherEducation:{


      type:String,

      default:"",


    },









    careerEducation:{


      type:String,

      default:"",


    },









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









    guidance:{


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









export default mongoose.models.EducationIntelligence ||


mongoose.model(


  "EducationIntelligence",


  EducationIntelligenceSchema


);