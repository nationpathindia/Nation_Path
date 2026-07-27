//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE CMS MODEL
//
// CMS FIRST ARCHITECTURE
//
// NO ENGINE
// NO AI
// NO CALCULATION
//
// MongoDB CMS CONTENT ONLY
//////////////////////////////////////////////////////////////

import mongoose, {
  Schema,
  Document,
  Model,
} from "mongoose";



//////////////////////////////////////////////////////////////
// DOCUMENT TYPE
//////////////////////////////////////////////////////////////

export interface IHoroscope extends Document {


  zodiac:string;

  slug:string;


  symbol?:string;

  element?:string;

  modality?:string;

  rulingPlanet?:string;



  hero?:{

    badge?:string;

    title?:string;

    subtitle?:string;

    description?:string;

    image?:string;

    cosmicLabel?:string;

    theme?:string;

  };




  identity?:{

    rashi?:string;

    sanskritName?:string;

    dates?:string;

    symbol?:string;

    element?:string;

    nature?:string;

    rulingPlanet?:string;

    energy?:string;

    description?:string;

  };




  editorial?:{

    headline?:string;

    overview?:string;

    prediction?:string;

    quote?:string;

  };





  life?:{

    career?:string;

    love?:string;

    finance?:string;

    health?:string;

  };





  insights?:{

    planetaryInfluence?:string;

    energy?:string;

    guidance?:string;

    remedy?:string;

    strengths?:string[];

    challenges?:string[];

  };





  planets?:Array<{

    planetKey?:string;

    name?:string;

    title?:string;

    message?:string;

    strength?:string;

    icon?:string;

    energyLevel?:string;

  }>;





  lucky?:{

    number?:string;

    color?:string;

    direction?:string;

    time?:string;

    gemstone?:string;

    metal?:string;

  };





  remedy?:{

    category?:string;

    title?:string;

    practice?:string;

    guidance?:string;

    reason?:string;

  };





  vedic?:{

    favorable?:string[];

    avoid?:string[];

  };





  compatibility?:{

    title?:string;

    description?:string;

    link?:string;

  };





  premium?:{

    title?:string;

    description?:string;

    features?:string[];

  };





  seo?:{

    title?:string;

    description?:string;

    keywords?:string[];

    ogImage?:string;

    canonical?:string;

  };





  status:
  "draft"
  |
  "published";


  publishedAt?:Date;


  version?:string;


  createdBy?:string;


}









//////////////////////////////////////////////////////////////
// SCHEMA
//////////////////////////////////////////////////////////////

const HoroscopeSchema =
new Schema<IHoroscope>(



{


zodiac:{


type:String,

required:true,

lowercase:true,

trim:true,


},





slug:{


type:String,

required:true,

lowercase:true,

trim:true,


},





symbol:{

type:String,

default:"",

},



element:{

type:String,

default:"",

},



modality:{

type:String,

default:"",

},



rulingPlanet:{

type:String,

default:"",

},







hero:{


badge:{
type:String,
default:"",
},


title:{
type:String,
default:"",
},


subtitle:{
type:String,
default:"",
},


description:{
type:String,
default:"",
},


image:{
type:String,
default:"",
},


cosmicLabel:{
type:String,
default:"",
},


theme:{
type:String,
default:"",
},


},







identity:{


rashi:{
type:String,
default:"",
},


sanskritName:{
type:String,
default:"",
},


dates:{
type:String,
default:"",
},


symbol:{
type:String,
default:"",
},


element:{
type:String,
default:"",
},


nature:{
type:String,
default:"",
},


rulingPlanet:{
type:String,
default:"",
},


energy:{
type:String,
default:"",
},


description:{
type:String,
default:"",
},


},








editorial:{


headline:{
type:String,
default:"",
},


overview:{
type:String,
default:"",
},


prediction:{
type:String,
default:"",
},


quote:{
type:String,
default:"",
},


},









life:{


career:{
type:String,
default:"",
},


love:{
type:String,
default:"",
},


finance:{
type:String,
default:"",
},


health:{
type:String,
default:"",
},


},









insights:{


planetaryInfluence:{
type:String,
default:"",
},


energy:{
type:String,
default:"",
},


guidance:{
type:String,
default:"",
},


remedy:{
type:String,
default:"",
},


strengths:[String],


challenges:[String],


},









planets:[

{


planetKey:{
type:String,
default:"",
},


name:{
type:String,
default:"",
},


title:{
type:String,
default:"",
},


message:{
type:String,
default:"",
},


strength:{
type:String,
default:"",
},


icon:{
type:String,
default:"",
},


energyLevel:{
type:String,
default:"",
},


}

],







lucky:{


number:{
type:String,
default:"",
},


color:{
type:String,
default:"",
},


direction:{
type:String,
default:"",
},


time:{
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


},









remedy:{


category:{
type:String,
default:"",
},


title:{
type:String,
default:"",
},


practice:{
type:String,
default:"",
},


guidance:{
type:String,
default:"",
},


reason:{
type:String,
default:"",
},


},









vedic:{


favorable:[String],


avoid:[String],


},









compatibility:{


title:{
type:String,
default:"",
},


description:{
type:String,
default:"",
},


link:{
type:String,
default:"",
},


},









premium:{


title:{
type:String,
default:"",
},


description:{
type:String,
default:"",
},


features:[String],


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


keywords:[String],


ogImage:{
type:String,
default:"",
},


canonical:{
type:String,
default:"",
},


},









status:{


type:String,


enum:[

"draft",

"published"

],


default:"draft",


index:true,


},





publishedAt:{

type:Date,

default:null,

},




version:{

type:String,

default:"1.0",

},





createdBy:{

type:String,

default:"admin",

},



},



{
timestamps:true
}



);










//////////////////////////////////////////////////////////////
// INDEXES
//////////////////////////////////////////////////////////////

HoroscopeSchema.index(
{
zodiac:1
},
{
unique:true
}
);



HoroscopeSchema.index(
{
slug:1
},
{
unique:true
}
);



HoroscopeSchema.index(
{
status:1,
zodiac:1
}
);











//////////////////////////////////////////////////////////////
// MODEL EXPORT
//////////////////////////////////////////////////////////////

const Horoscope =
(mongoose.models.Horoscope as Model<IHoroscope>)
||
mongoose.model<IHoroscope>(
"Horoscope",
HoroscopeSchema
);



export default Horoscope;