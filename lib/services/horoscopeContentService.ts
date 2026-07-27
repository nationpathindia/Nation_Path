//////////////////////////////////////////////////////////////
// NATIONPATH HOROSCOPE CONTENT SERVICE
//
// CMS FIRST CONTENT FETCH LAYER
//
// Responsibility:
//
// Fetch horoscope experience content
// Fetch zodiac master explorer data
//
// Flow:
//
// Horoscope CMS Mongo
//          ↓
// Service Layer
//          ↓
// Horoscope API
//          ↓
// Premium Experience UI
//
// Zodiac Explorer:
//
// Zodiac Master Mongo
//          ↓
// zodiacList
//          ↓
// ZodiacExplorerPanel
//
// LOCKED:
//
// ✅ No Swiss Ephemeris
// ✅ No Calculation
// ✅ No Engine
// ✅ No AI Generation
//////////////////////////////////////////////////////////////


import Horoscope from "@/app/models/Horoscope";

import Zodiac from "@/app/models/Zodiac";


import {
  connectMongoDB,
} from "@/lib/mongodb";






//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

export interface HoroscopeCMSResult {


  hero?: {

    badge?: string;

    title?: string;

    subtitle?: string;

    description?: string;

    image?: string;

    cosmicLabel?: string;

    theme?: string;

  };




  identity?: {

    rashi?: string;

    sanskritName?: string;

    dates?: string;

    symbol?: string;

    element?: string;

    nature?: string;

    rulingPlanet?: string;

    energy?: string;

    description?: string;

  };





  editorial?: {

    headline?: string;

    overview?: string;

    prediction?: string;

    quote?: string;

  };





  life?: {

    career?: string;

    love?: string;

    finance?: string;

    health?: string;

  };





  insights?: {

    planetaryInfluence?: string;

    energy?: string;

    guidance?: string;

    remedy?: string;

    strengths?: string[];

    challenges?: string[];

  };






  planets?: Array<{

    planetKey?: string;

    name?: string;

    title?: string;

    message?: string;

    strength?: string;

    icon?: string;

    energyLevel?: string;

  }>;






  lucky?: {

    number?: string;

    color?: string;

    direction?: string;

    time?: string;

    gemstone?: string;

    metal?: string;

  };






  remedy?: {

    category?: string;

    title?: string;

    practice?: string;

    guidance?: string;

    reason?: string;

  };






  vedic?: {

    favorable?: string[];

    avoid?: string[];

  };






  compatibility?: {

    title?: string;

    description?: string;

    link?: string;

  };






  premium?: {

    title?: string;

    description?: string;

    features?: string[];

  };







  seo?: {

    title?: string;

    description?: string;

    keywords?: string[];

    ogImage?: string;

    canonical?: string;

  };







  ////////////////////////////////////////////////////////////
  // ZODIAC EXPLORER
  ////////////////////////////////////////////////////////////

  zodiacList?: Array<{

    zodiac:string;

    slug:string;

    name?:string;

    symbol?:string;

    planet?:string;

    element?:string;

    energy?:string;

    image?:string;

  }>;



}









//////////////////////////////////////////////////////////////
// GET HOROSCOPE CMS CONTENT
//////////////////////////////////////////////////////////////

export async function getHoroscopeContent(

  zodiacSign:string

):Promise<HoroscopeCMSResult|null>{



try{



//////////////////////////////////////////////////////////////
// DATABASE CONNECTION
//////////////////////////////////////////////////////////////

await connectMongoDB();





console.log(
  "HOROSCOPE DB",
  Horoscope.db.name
);



console.log(
  "HOROSCOPE COLLECTION",
  Horoscope.collection.name
);



console.log(
  "ZODIAC COLLECTION",
  Zodiac.collection.name
);









//////////////////////////////////////////////////////////////
// NORMALIZE SIGN
//////////////////////////////////////////////////////////////

const slug =

zodiacSign

.trim()

.toLowerCase();





if(!slug){

return null;

}







//////////////////////////////////////////////////////////////
// FETCH HOROSCOPE CONTENT
//////////////////////////////////////////////////////////////

const content = await Horoscope.findOne({

slug: slug,

status:"published",

})
.lean();





if(!content){


console.warn(

"[HOROSCOPE_CMS_NOT_FOUND]",

slug

);


return null;


}









//////////////////////////////////////////////////////////////
// FETCH ZODIAC MASTER LIST
//////////////////////////////////////////////////////////////
const zodiacList = await Zodiac.find({

status:"published",

})

.select({

zodiac:1,

slug:1,

names:1,

symbol:1,

element:1,

rulingPlanet:1,

identity:1,

media:1,

})

.lean();



const zodiacOrder = [

"aries",

"taurus",

"gemini",

"cancer",

"leo",

"virgo",

"libra",

"scorpio",

"sagittarius",

"capricorn",

"aquarius",

"pisces",

];



zodiacList.sort(

(a:any,b:any)=>{


return (

zodiacOrder.indexOf(a.zodiac)

-

zodiacOrder.indexOf(b.zodiac)

);


}

);






//////////////////////////////////////////////////////////////
// MAP ZODIAC EXPLORER DATA
//////////////////////////////////////////////////////////////
const explorer = zodiacList.map(

(z:any)=>(

{

zodiac:z.zodiac,

slug:z.slug,


name:

z.names?.english

||

z.zodiac,



symbol:

z.media?.icon

||

z.symbol

||

z.identity?.symbol

||

"",



image:

z.media?.icon

||

"",



planet:

z.rulingPlanet

||

"",



element:

z.element

||

"",



energy:

z.identity?.energy

||

"",


}

)

);


//////////////////////////////////////////////////////////////
// RESPONSE CONTRACT
//////////////////////////////////////////////////////////////

return {


hero:

content.hero,



identity:

content.identity,



editorial:

content.editorial,



life:

content.life,



insights:

content.insights,



planets:

content.planets,



lucky:

content.lucky,



remedy:

content.remedy,



vedic:

content.vedic,



compatibility:

content.compatibility,



premium:

content.premium,



seo:

content.seo,




zodiacList: explorer,



};








}

catch(error){



console.error(

"[HOROSCOPE_CONTENT_SERVICE_ERROR]",

error

);



return null;


}



}