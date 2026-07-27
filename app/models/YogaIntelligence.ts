//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO CMS
// Yoga Intelligence Model
//
// Purpose:
// Astrology Yoga knowledge management only.
//
// Handles:
// - Raj Yoga
// - Dhana Yoga
// - Gaja Kesari Yoga
// - Neecha Bhanga Yoga
// - Vipreet Raj Yoga
// - Other planetary combinations
//
// IMPORTANT:
// This model DOES NOT calculate Yoga.
// Calculation handled by Astro Engine only.
//////////////////////////////////////////////////////////////

import mongoose, {
  Schema,
  Document,
  Model,
} from "mongoose";





export interface IYogaIntelligence extends Document {


  name:string;


  slug:string;




  // Multilingual

  names:{

    en?:string;

    hi?:string;

    ne?:string;

  };





  // Classification

  category:

  | "raj_yoga"

  | "dhana_yoga"

  | "career_yoga"

  | "spiritual_yoga"

  | "dosha_related"

  | "other";





  type:string;





  // Knowledge

  planets:string[];

  houses:string[];




  formation:string;




  // Effects

  positiveEffects:string[];

  negativeEffects:string[];

  challenges:string[];





  // Life Areas

  career:string;

  finance:string;

  marriage:string;

  health:string;

  spirituality:string;






  // Remedies

  remedies:{

    mantra?:string;

    gemstone?:string;

    donation?:string;

    ritual?:string;

    puja?:string;

  };







  // Content

  description:string;







  // Media

  media:{

    image?:string;

    icon?:string;

    video?:string;

  };








  // SEO

  seo:{

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









const YogaIntelligenceSchema =

new Schema<IYogaIntelligence>(



{


name:{


type:String,

required:true,

},




slug:{


type:String,

required:true,

unique:true,

lowercase:true,

},






names:{


en:String,

hi:String,

ne:String,


},







category:{


type:String,


enum:[


"raj_yoga",


"dhana_yoga",


"career_yoga",


"spiritual_yoga",


"dosha_related",


"other",


],



default:"other",


},






type:{


type:String,

default:"",


},







planets:[


{

type:String,


}

],






houses:[


{

type:String,


}

],







formation:{


type:String,

default:"",


},







positiveEffects:[


{

type:String,


}

],






negativeEffects:[


{

type:String,


}

],







challenges:[


{

type:String,


}

],







career:{


type:String,

default:"",

},






finance:{


type:String,

default:"",

},






marriage:{


type:String,

default:"",

},






health:{


type:String,

default:"",

},






spirituality:{


type:String,

default:"",

},







remedies:{


mantra:String,

gemstone:String,

donation:String,

ritual:String,

puja:String,


},







description:{


type:String,

required:true,

},







media:{


image:String,

icon:String,

video:String,


},








seo:{


title:String,

description:String,


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









const YogaIntelligence:

Model<IYogaIntelligence> =

mongoose.models.YogaIntelligence ||

mongoose.model<IYogaIntelligence>(

"YogaIntelligence",

YogaIntelligenceSchema

);







export default YogaIntelligence;