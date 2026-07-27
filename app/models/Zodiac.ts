//////////////////////////////////////////////////////////////
// NATIONPATH ZODIAC MASTER MODEL
//
// Responsibility:
// Store zodiac knowledge database.
//
// Used for:
// - Horoscope pages
// - Zodiac information
// - SEO pages
// - Astro intelligence
//
// Does NOT:
// - calculate horoscope
// - prediction engine
// - AI generation
//////////////////////////////////////////////////////////////

import mongoose, {
  Schema,
  Document,
  Model,
} from "mongoose";





//////////////////////////////////////////////////////////////
// TYPE
//////////////////////////////////////////////////////////////

export interface IZodiac extends Document {


  zodiac:string;

  slug:string;


  names?:{

    english:string;

    hindi?:string;

    sanskrit?:string;

    gujarati?:string;

    nepali?:string;

  };



  identity?:{

    rashi?:string;

    sanskritName?:string;

    dates?:string;

    description?:string;

    energy?:string;

  };



  symbol?:string;


  element?:
  |
  "fire"
  |
  "earth"
  |
  "air"
  |
  "water";



  modality?:
  |
  "cardinal"
  |
  "fixed"
  |
  "mutable";



  rulingPlanet?:string;



  traits?:{

    strengths?:string[];

    weaknesses?:string[];

    personality?:string;

  };



  lucky?:{

    color?:string;

    number?:string;

    day?:string;

  };



  media?:{

    icon?:string;

    banner?:string;

  };



  seo?:{

    title?:string;

    description?:string;

  };



  status:
  |
  "draft"
  |
  "published";



}









//////////////////////////////////////////////////////////////
// SCHEMA
//////////////////////////////////////////////////////////////

const ZodiacSchema =
new Schema<IZodiac>(



{


//////////////////////////////////////////////////////////////
// BASIC IDENTITY
//////////////////////////////////////////////////////////////

zodiac:{


type:String,

required:true,

lowercase:true,

unique:true,

trim:true,


},




slug:{


type:String,

required:true,

unique:true,

lowercase:true,

trim:true,


},









//////////////////////////////////////////////////////////////
// MULTI LANGUAGE NAME
//////////////////////////////////////////////////////////////

names:{


english:{


type:String,

required:true,


},



hindi:String,


sanskrit:String,


gujarati:String,


nepali:String,


},









//////////////////////////////////////////////////////////////
// IDENTITY
//////////////////////////////////////////////////////////////

identity:{


rashi:String,


sanskritName:String,


dates:String,


description:String,


energy:String,


},









//////////////////////////////////////////////////////////////
// ASTRO INFO
//////////////////////////////////////////////////////////////

symbol:String,



element:{


type:String,


enum:[

"fire",

"earth",

"air",

"water",

],


},




modality:{


type:String,


enum:[

"cardinal",

"fixed",

"mutable",

],


},




rulingPlanet:String,









//////////////////////////////////////////////////////////////
// PERSONALITY
//////////////////////////////////////////////////////////////

traits:{


strengths:[String],


weaknesses:[String],


personality:String,


},









//////////////////////////////////////////////////////////////
// LUCK
//////////////////////////////////////////////////////////////

lucky:{


color:String,


number:String,


day:String,


},









//////////////////////////////////////////////////////////////
// MEDIA
//////////////////////////////////////////////////////////////

media:{


icon:String,


banner:String,


},









//////////////////////////////////////////////////////////////
// SEO
//////////////////////////////////////////////////////////////

seo:{


title:String,


description:String,


},









//////////////////////////////////////////////////////////////
// STATUS
//////////////////////////////////////////////////////////////

status:{


type:String,


enum:[

"draft",

"published",

],


default:"draft",


index:true,


},



},



{


timestamps:true,


}



);









//////////////////////////////////////////////////////////////
// INDEXES
//////////////////////////////////////////////////////////////

ZodiacSchema.index(
{
zodiac:1
},
{
unique:true
}
);



ZodiacSchema.index(
{
slug:1
},
{
unique:true
}
);



ZodiacSchema.index(
{
status:1
}
);









//////////////////////////////////////////////////////////////
// EXPORT MODEL
//////////////////////////////////////////////////////////////

const Zodiac =
(mongoose.models.Zodiac as Model<IZodiac>)
||
mongoose.model<IZodiac>(
"Zodiac",
ZodiacSchema
);



export default Zodiac;