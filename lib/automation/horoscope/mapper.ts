//////////////////////////////////////////////////////////////
// NATIONPATH AI AUTOMATION
//
// ASTRO HOROSCOPE CMS MAPPER v2
//
// Engine Result
//        ↓
// Prediction Result
//        ↓
// Zodiac Master Snapshot
//        ↓
// CMS Horoscope Document
//
// RESPONSIBILITY:
// ONLY TRANSFORMATION
//
// LOCKED:
// NO calculation
// NO prediction modification
// NO AI generation
//////////////////////////////////////////////////////////////


import type {
  HoroscopeResult,
} from "@/lib/astro/horoscope/types";


import {
  generateLuckyData,
} from "./lucky";





//////////////////////////////////////////////////////////////
// ZODIAC MASTER SNAPSHOT
//////////////////////////////////////////////////////////////

interface ZodiacMasterSnapshot {


  zodiac:string;


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



  element?:string;



  rulingPlanet?:string;



  media?:{

    icon?:string;

    banner?:string;

  };


}








interface MapperInput {


  horoscope:HoroscopeResult;


  zodiac:string;



  zodiacMaster?:ZodiacMasterSnapshot;



  period:

  | "daily"

  | "weekly"

  | "monthly"

  | "yearly";



  date:Date;


}









//////////////////////////////////////////////////////////////
// INDIA TIME DATE RANGE
//////////////////////////////////////////////////////////////

function buildDateRange(

date:Date,

period:string

){


const IST_OFFSET =
5.5 * 60 * 60 * 1000;



const istDate =
new Date(
date.getTime()+IST_OFFSET
);



const startIST =
new Date(
Date.UTC(

istDate.getUTCFullYear(),

istDate.getUTCMonth(),

istDate.getUTCDate(),

0,

0,

0,

0

)

);



const endIST =
new Date(startIST);



if(period==="daily")

endIST.setUTCDate(
endIST.getUTCDate()+1
);



if(period==="weekly")

endIST.setUTCDate(
endIST.getUTCDate()+7
);



if(period==="monthly")

endIST.setUTCMonth(
endIST.getUTCMonth()+1
);



if(period==="yearly")

endIST.setUTCFullYear(
endIST.getUTCFullYear()+1
);




return {


startDate:

new Date(
startIST.getTime()-IST_OFFSET
),



endDate:

new Date(
endIST.getTime()-IST_OFFSET
)


};


}









//////////////////////////////////////////////////////////////
// PLANET INTELLIGENCE
//
// Prediction source only
//////////////////////////////////////////////////////////////

function mapPlanets(

prediction:any

){


return (

prediction.opportunities || []

).map(

(planet:any)=>(


{


planetKey:

planet.title
?.split(" ")[0]
?.toLowerCase()
||
"planet",



name:

planet.title
||
"Planet",



title:

"Planetary Influence",



message:

planet.description
||
"",



strength:

planet.priority >=80
?
"High"
:
"Balanced",



energyLevel:

planet.priority >=80
?
"Strong"
:
"Balanced"


}


)

);


}









//////////////////////////////////////////////////////////////
// LIFE INTELLIGENCE
//////////////////////////////////////////////////////////////

function mapLife(

prediction:any

){


const ranking =

prediction.predictionRanking || [];



return {


career:

ranking.find(

(x:any)=>

x.category==="career"

)?.reason
||
"",



love:

ranking.find(

(x:any)=>

x.category==="relationship"

)?.reason
||
"",



finance:

ranking.find(

(x:any)=>

x.category==="wealth"

)?.reason
||
"",



health:

ranking.find(

(x:any)=>

x.category==="health"

)?.reason
||
"",



};


}









//////////////////////////////////////////////////////////////
// MAIN CMS MAPPER
//////////////////////////////////////////////////////////////

export function mapHoroscopeToCms(

input:MapperInput

){



const {


horoscope,

zodiac,

period,

date,

zodiacMaster


}=input;







//////////////////////////////////////////////////////////////
// LOCKED PREDICTION SOURCE
//////////////////////////////////////////////////////////////

const prediction:any =

(horoscope as any).prediction

||

{};







console.log(

"🔥 FINAL HOROSCOPE CMS MAPPER",

{

zodiac,

headline:

prediction.headline,

summary:

prediction.naturalSummary

}

);







const range =

buildDateRange(

date,

period

);









return {





//////////////////////////////////////////////////////////////
// BASIC
//////////////////////////////////////////////////////////////

zodiac,



slug:

`${zodiac}-${period}`,







//////////////////////////////////////////////////////////////
// ZODIAC IDENTITY SNAPSHOT
//
// Static master data only
//////////////////////////////////////////////////////////////

identity:{


rashi:

zodiacMaster?.identity?.rashi
||
"",



sanskritName:

zodiacMaster?.identity?.sanskritName
||
zodiacMaster?.names?.sanskrit
||
"",



dates:

zodiacMaster?.identity?.dates
||
"",



description:

zodiacMaster?.identity?.description
||
"",



energy:

zodiacMaster?.identity?.energy
||
"",



element:

zodiacMaster?.element
||
"",



rulingPlanet:

zodiacMaster?.rulingPlanet
||
"",



symbol:

zodiacMaster?.symbol
||
"",


},







//////////////////////////////////////////////////////////////
// META
//////////////////////////////////////////////////////////////

meta:{


period,


language:

horoscope.language
||
"english",



status:

"approved",



startDate:

range.startDate,



endDate:

range.endDate,



scheduledAt:

new Date(),



slugDate:

new Intl.DateTimeFormat(

"en-CA",

{

timeZone:"Asia/Kolkata"

}

).format(date),



version:

"1.0",



contentVersion:

1,


priority:

1,



featured:{


homepage:true,

trending:false,

seo:true


},



visibility:{


public:true,

premium:false,

featured:true


}


},







//////////////////////////////////////////////////////////////
// HERO
//////////////////////////////////////////////////////////////

hero:{


badge:

`${period} Horoscope`,



title:

`${zodiacMaster?.names?.english || zodiac} ${period} Horoscope`,


subtitle:

prediction.narrative?.opening
||
prediction.naturalSummary
||
"",



description:

prediction.narrative?.development
||
prediction.naturalSummary
||
"",



cosmicLabel:

"NationPath Astro Intelligence",



theme:

"cosmic",



image:

zodiacMaster?.media?.banner
||
zodiacMaster?.media?.icon
||
"",


},









//////////////////////////////////////////////////////////////
// EDITORIAL
//////////////////////////////////////////////////////////////

editorial:{


headline:

prediction.headline
||
"",



overview:

prediction.naturalSummary
||
"",



prediction:

prediction.narrative?.development
||
"",



quote:

prediction.narrative?.closing
||

"Your cosmic journey unfolds through awareness and wisdom.",


},









//////////////////////////////////////////////////////////////
// LIFE
//////////////////////////////////////////////////////////////

life:

mapLife(

prediction

),









//////////////////////////////////////////////////////////////
// INSIGHTS
//////////////////////////////////////////////////////////////

insights:{


energy:

prediction.predictionConfidence

?

`Confidence ${prediction.predictionConfidence}%`

:

"Balanced",



guidance:

prediction.guidance?.join(" ")

||

"",



strengths:

prediction.opportunities
?.map(

(x:any)=>

x.title

)

||

[],



challenges:

prediction.cautions
?.map(

(x:any)=>

x.title

)

||

[],


},









//////////////////////////////////////////////////////////////
// PLANETS
//////////////////////////////////////////////////////////////

planets:

mapPlanets(

prediction

),









//////////////////////////////////////////////////////////////
// LUCK
//
// LOCKED ENGINE OUTPUT
//////////////////////////////////////////////////////////////

lucky:

prediction.lucky

||

generateLuckyData(

zodiac

),









//////////////////////////////////////////////////////////////
// REMEDY
//
// LOCKED PREDICTION GUIDANCE
//////////////////////////////////////////////////////////////

remedy:{


category:

"Planetary Guidance",



title:

"Astro Balance Practice",



practice:

prediction.guidance?.[0]
||
"",



guidance:

prediction.guidance?.join(" ")
||
"",



reason:

"Follow positive planetary guidance for balance.",


},









//////////////////////////////////////////////////////////////
// PREMIUM
//////////////////////////////////////////////////////////////

premium:{


title:

"Unlock Personal Astro Intelligence",



description:

"Detailed birth chart and personalized planetary insights.",



features:[

"Birth Chart",

"Life Intelligence",

"AI Astro Reports"

],


},









//////////////////////////////////////////////////////////////
// SEO
//////////////////////////////////////////////////////////////

seo:{


title:

`${zodiacMaster?.names?.english || zodiac} ${period} Horoscope Today | NationPath Astro`,



description:

`Read ${zodiacMaster?.names?.english || zodiac} horoscope with planetary insights, life guidance and Vedic astrology predictions.`,



keywords:[


`${zodiac} horoscope`,


`${period} horoscope`,


`${zodiac} rashifal`,


"Vedic Astrology",


"NationPath Astro"


],



canonical:

`/astro/horoscope/${zodiac}`


},









//////////////////////////////////////////////////////////////
// VERSION TRACKING
//////////////////////////////////////////////////////////////

intelligence:{


mapperVersion:

"2.0",



source:

"nationpath-ai",



generatedAt:

new Date()


},









createdBy:

"nationpath-ai",



updatedBy:

"nationpath-ai"





};


}