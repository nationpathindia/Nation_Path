//////////////////////////////////////////////////////////////
// NATIONPATH HOROSCOPE CONTENT SERVICE
//
// CMS FIRST CONTENT DELIVERY LAYER
//
// FINAL LOCKED META CMS ARCHITECTURE
//
// Responsibility:
//
// Mongo Horoscope CMS
//        ↓
// Service Layer
//        ↓
// Horoscope API
//        ↓
// Premium Experience UI
//
// LOCKED:
//
// ✅ CMS ONLY
// ✅ No Swiss Ephemeris
// ✅ No Calculation
// ✅ No Prediction Engine
// ✅ No AI Generation
//
// Supports:
//
// ✅ Daily
// ✅ Weekly
// ✅ Monthly
// ✅ Yearly
// ✅ Archive System
// ✅ SEO History
//
//////////////////////////////////////////////////////////////


import Horoscope from "@/app/models/Horoscope";
import Zodiac from "@/app/models/Zodiac";

import {
  connectMongoDB,
} from "@/lib/mongodb";

import type {
  HoroscopeStatus,
  HoroscopePeriod,
} from "@/components/astro-new/horoscope-cms/types";




//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

export type HoroscopeLanguage =
| "english"
| "hindi"
| "marathi"
| "tamil"
| "telugu"
| "nepali";









//////////////////////////////////////////////////////////////
// RESPONSE TYPE
//////////////////////////////////////////////////////////////

export interface HoroscopeCMSResult {



meta?: {


period?: HoroscopePeriod;


language?: HoroscopeLanguage;


status?: HoroscopeStatus;



startDate?: Date;


endDate?: Date;



publishedAt?: Date;


scheduledAt?: Date;



//////////////////////////////////////////////////////////////
// ARCHIVE META
//////////////////////////////////////////////////////////////

archivedAt?: Date;


slugDate?: string;


contentVersion?: number;





version?: string;


priority?: number;





featured?: {


homepage?: boolean;


trending?: boolean;


seo?: boolean;


};



};







hero?:any;


identity?:any;


traits?:any;


editorial?:any;


life?:any;


insights?:any;


planets?:any[];


lucky?:any;


remedy?:any;


vedic?:any;


compatibility?:any;


premium?:any;


seo?:any;


media?:any;



zodiacList?:any[];



}









//////////////////////////////////////////////////////////////
// ZODIAC ORDER
//////////////////////////////////////////////////////////////

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











//////////////////////////////////////////////////////////////
// DATE NORMALIZER
//////////////////////////////////////////////////////////////

function normalizeDate(

date?:Date|string

){



if(!date){


return new Date();


}




return new Date(date);



}











//////////////////////////////////////////////////////////////
// ZODIAC EXPLORER
//////////////////////////////////////////////////////////////

async function getZodiacExplorer(){



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







zodiacList.sort(

(a:any,b:any)=>{


return (

zodiacOrder.indexOf(a.zodiac)

-

zodiacOrder.indexOf(b.zodiac)

);


}

);







return zodiacList.map(


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



}
//////////////////////////////////////////////////////////////
// CORE HOROSCOPE FETCH
//////////////////////////////////////////////////////////////

export async function getHoroscopeByPeriod(

zodiacSign:string,

period:HoroscopePeriod,

date?:Date|string,

language:HoroscopeLanguage="english"

):Promise<HoroscopeCMSResult|null>{



try{


await connectMongoDB();





const zodiac = zodiacSign

.trim()

.toLowerCase();






const selectedDate = normalizeDate(date);







console.log(

"NATIONPATH HOROSCOPE CMS SEARCH",

{

zodiac,

period,

language,

selectedDate

}

);









//////////////////////////////////////////////////////////////
// CURRENT PUBLISHED CMS QUERY
//////////////////////////////////////////////////////////////

const content = await Horoscope.findOne({



zodiac,



"meta.period":

period,




"meta.language":

language,





"meta.status":

"published",





"meta.startDate":

{

$lte:selectedDate

},





"meta.endDate":

{

$gte:selectedDate

},



})

.sort({

"meta.priority":-1,


"meta.publishedAt":-1,


})

.lean();









console.log(

"NATIONPATH HOROSCOPE CMS FOUND",

content ? content.slug : null

);









if(!content){



console.warn(

"[HOROSCOPE_CONTENT_NOT_FOUND]",

{

zodiac,

period,

language,

date:selectedDate

}

);



return null;



}









const zodiacList = await getZodiacExplorer();









return {



meta:{



period:

content.meta?.period,





language:

content.meta?.language,





status:

content.meta?.status,





startDate:

content.meta?.startDate,





endDate:

content.meta?.endDate,





publishedAt:

content.meta?.publishedAt,





scheduledAt:

content.meta?.scheduledAt,






archivedAt:

content.meta?.archivedAt,





slugDate:

content.meta?.slugDate,






version:

content.meta?.version,





contentVersion:

content.meta?.contentVersion,





priority:

content.meta?.priority,





featured:

content.meta?.featured,





},







hero:

content.hero,





identity:

content.identity,





traits:

content.traits,





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





media:

content.media,






zodiacList,





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
//////////////////////////////////////////////////////////////
// ARCHIVED HOROSCOPE FETCH
//////////////////////////////////////////////////////////////

export async function getArchivedHoroscope(

zodiacSign:string,

date:Date|string,

period:HoroscopePeriod="daily",

language:HoroscopeLanguage="english"

):Promise<HoroscopeCMSResult|null>{



try{


await connectMongoDB();





const zodiac = zodiacSign

.trim()

.toLowerCase();





const selectedDate = normalizeDate(date);







const content = await Horoscope.findOne({



zodiac,



"meta.period":

period,





"meta.language":

language,





"meta.status":

"archived",





"meta.startDate":

{

$lte:selectedDate

},





"meta.endDate":

{

$gte:selectedDate

},



})

.sort({

"meta.publishedAt":-1

})

.lean();








if(!content){



return null;



}







const zodiacList = await getZodiacExplorer();







return {



meta:{



period:

content.meta?.period,





language:

content.meta?.language,





status:

content.meta?.status,





startDate:

content.meta?.startDate,





endDate:

content.meta?.endDate,





publishedAt:

content.meta?.publishedAt,





scheduledAt:

content.meta?.scheduledAt,





archivedAt:

content.meta?.archivedAt,





slugDate:

content.meta?.slugDate,





version:

content.meta?.version,





contentVersion:

content.meta?.contentVersion,





priority:

content.meta?.priority,





featured:

content.meta?.featured,





},





hero:

content.hero,





identity:

content.identity,





traits:

content.traits,





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





media:

content.media,





zodiacList,





};



}



catch(error){



console.error(

"[ARCHIVED_HOROSCOPE_SERVICE_ERROR]",

error

);



return null;



}



}









//////////////////////////////////////////////////////////////
// HOROSCOPE ARCHIVE DATES
//////////////////////////////////////////////////////////////

export async function getHoroscopeArchiveDates(

zodiacSign:string,

period:HoroscopePeriod="daily",

language:HoroscopeLanguage="english"

){



try{


await connectMongoDB();





const zodiac = zodiacSign

.trim()

.toLowerCase();






const archives = await Horoscope.find({



zodiac,



"meta.period":

period,





"meta.language":

language,





"meta.status":

"archived",



})

.select({

"meta.startDate":1,

"meta.slugDate":1,

"meta.publishedAt":1,

})

.sort({

"meta.startDate":-1

})

.lean();







return archives;



}



catch(error){



console.error(

"[HOROSCOPE_ARCHIVE_DATES_ERROR]",

error

);



return [];

}



}









//////////////////////////////////////////////////////////////
// SHORTCUT SERVICES
//////////////////////////////////////////////////////////////

export async function getDailyHoroscopeContent(

zodiacSign:string,

date?:Date|string,

language:HoroscopeLanguage="english"

){


return getHoroscopeByPeriod(

zodiacSign,

"daily",

date,

language

);


}








export async function getWeeklyHoroscopeContent(

zodiacSign:string,

date?:Date|string,

language:HoroscopeLanguage="english"

){


return getHoroscopeByPeriod(

zodiacSign,

"weekly",

date,

language

);


}








export async function getMonthlyHoroscopeContent(

zodiacSign:string,

date?:Date|string,

language:HoroscopeLanguage="english"

){


return getHoroscopeByPeriod(

zodiacSign,

"monthly",

date,

language

);


}








export async function getYearlyHoroscopeContent(

zodiacSign:string,

date?:Date|string,

language:HoroscopeLanguage="english"

){


return getHoroscopeByPeriod(

zodiacSign,

"yearly",

date,

language

);


}









//////////////////////////////////////////////////////////////
// LEGACY COMPATIBILITY
//////////////////////////////////////////////////////////////

export async function getHoroscopeContent(

zodiacSign:string,

language:HoroscopeLanguage="english"

){



return getDailyHoroscopeContent(

zodiacSign,

new Date(),

language

);



}