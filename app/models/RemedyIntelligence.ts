//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO REMEDY INTELLIGENCE CMS MODEL
//
// Purpose:
// Astrology remedy knowledge management only.
//
// IMPORTANT:
// - No calculation logic
// - No prediction logic
// - No astro engine dependency
//////////////////////////////////////////////////////////////

import mongoose, { Schema, Document, Model } from "mongoose";



export interface IRemedyIntelligence extends Document {


  remedy:string;


  slug:string;



  category:
    | "mantra"
    | "puja"
    | "daan"
    | "gemstone"
    | "lifestyle"
    | "other";



  relatedPlanets?:string[];


  relatedDoshas?:string[];


  relatedProblems?:string[];



  description?:string;



  benefits?:string[];



  procedure?:string;



  materials?:string[];



  duration?:string;



  precautions?:string[];



  suitableFor?:string[];



  avoidFor?:string[];



  mantra?:string;



  gemstone?:string;



  metal?:string;



  day?:string;



  color?:string;



  media?:{


    image?:string;


    video?:string;


  };



  seo?:{


    title?:string;


    description?:string;


    keywords?:string[];


  };



  status:
    | "draft"
    | "published";



  createdAt:Date;


  updatedAt:Date;


}




const RemedyIntelligenceSchema =

new Schema<IRemedyIntelligence>(


{


  remedy:{


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


      "mantra",


      "puja",


      "daan",


      "gemstone",


      "lifestyle",


      "other",


    ],


    default:"other",


  },



  relatedPlanets:[


    {


      type:String,


    }


  ],



  relatedDoshas:[


    {


      type:String,


    }


  ],



  relatedProblems:[


    {


      type:String,


    }


  ],



  description:{


    type:String,


    default:"",


  },



  benefits:[


    {


      type:String,


    }


  ],



  procedure:{


    type:String,


    default:"",


  },



  materials:[


    {


      type:String,


    }


  ],



  duration:{


    type:String,


    default:"",


  },



  precautions:[


    {


      type:String,


    }


  ],



  suitableFor:[


    {


      type:String,


    }


  ],



  avoidFor:[


    {


      type:String,


    }


  ],



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



  media:{


    image:{


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


    keywords:[


      {


        type:String,


      }


    ],


  },



  status:{


    type:String,


    enum:[


      "draft",


      "published",


    ],


    default:"draft",


  },


},


{


  timestamps:true,


}


);




const RemedyIntelligence:Model<IRemedyIntelligence> =


mongoose.models.RemedyIntelligence ||


mongoose.model<IRemedyIntelligence>(


  "RemedyIntelligence",


  RemedyIntelligenceSchema


);



export default RemedyIntelligence;